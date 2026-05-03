import { db } from "@memorybook/db";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const { id } = await params;

  const book = await db.book.findUnique({
    where: { id },
    include: {
      session: {
        include: {
          photos: {
            where: { excluded: false },
            orderBy: { displayOrder: "asc" },
          },
        },
      },
    },
  });

  if (!book) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 });
  }

  return NextResponse.json({
    book: {
      id: book.id,
      title: book.title,
      status: book.status,
      placementJson: book.placementJson,
      photos: book.session.photos.map((p) => ({
        id: p.id,
        storageKey: p.storageKey,
        thumbnailKey: p.thumbnailKey,
        width: p.width,
        height: p.height,
        displayOrder: p.displayOrder,
      })),
    },
  });
}
