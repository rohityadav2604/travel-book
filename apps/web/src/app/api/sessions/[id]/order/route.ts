import { db } from "@memorybook/db";
import { NextResponse } from "next/server";
import { z } from "zod";

const orderSchema = z.object({
  order: z.array(z.string().min(1)),
});

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const { id } = await params;
  const body = (await request.json()) as unknown;
  const parsed = orderSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid order" }, { status: 400 });
  }

  const { order } = parsed.data;

  await db.$transaction(
    order.map((photoId, index) =>
      db.photo.update({
        where: { id: photoId, sessionId: id },
        data: { displayOrder: index },
      }),
    ),
  );

  return NextResponse.json({ ok: true });
}
