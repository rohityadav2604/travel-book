import { db } from "@memorybook/db";
import { createUploadQueue, addUploadJob } from "@memorybook/shared/queue";
import { NextResponse } from "next/server";
import { z } from "zod";

const createSchema = z.object({
  sessionId: z.string().min(1),
  theme: z.enum(["wanderbound", "highland", "city"]).default("wanderbound"),
});

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as unknown;
  const parsed = createSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { sessionId, theme } = parsed.data;

  const includedPhotos = await db.photo.findMany({
    where: { sessionId, excluded: false },
    orderBy: { displayOrder: "asc" },
  });

  if (includedPhotos.length < 5 || includedPhotos.length > 50) {
    return NextResponse.json(
      { error: `Book requires 5-50 photos. You have ${includedPhotos.length}.` },
      { status: 400 },
    );
  }

  const book = await db.book.create({
    data: {
      sessionId,
      theme,
      status: "placing",
    },
  });

  const queue = createUploadQueue();
  await addUploadJob(queue, "placement", {
    kind: "placement",
    sessionId,
    bookId: book.id,
    theme,
  });
  await queue.close();

  return NextResponse.json({ bookId: book.id });
}
