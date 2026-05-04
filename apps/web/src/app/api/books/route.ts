import { db } from "@memorybook/db";
import { createUploadQueue, addUploadJob } from "@memorybook/shared/queue";
import { getTheme } from "@memorybook/templates";
import { NextResponse } from "next/server";
import { z } from "zod";

const createSchema = z.object({
  sessionId: z.string().min(1),
  theme: z.string().min(1).refine((id) => {
    try { getTheme(id); return true; } catch { return false; }
  }, { message: "Unknown theme" }),
});

export async function GET(request: Request): Promise<NextResponse> {
  const sessionId = request.headers.get("x-memorybook-session-id");
  if (!sessionId) {
    return NextResponse.json({ books: [] });
  }

  const books = await db.book.findMany({
    where: { sessionId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      theme: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return NextResponse.json({ books });
}

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as unknown;
  const parsed = createSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { sessionId, theme } = parsed.data;

  const includedPhotos = await db.photo.findMany({
    where: { sessionId, excluded: false, status: "ready" },
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
