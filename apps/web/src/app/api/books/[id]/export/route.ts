import { db } from "@memorybook/db";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const { id } = await params;

  const book = await db.book.findUnique({
    where: { id },
  });

  if (!book) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 });
  }

  if (!book.printPdfKey && !book.screenPdfKey) {
    return NextResponse.json({ error: "Book not ready for export" }, { status: 404 });
  }

  const { getSignedUrl } = await import("@memorybook/shared/storage");

  const [printUrl, screenUrl] = await Promise.all([
    book.printPdfKey
      ? getSignedUrl({ bucket: "ephemeral", key: book.printPdfKey, expiresInSeconds: 86400 })
      : Promise.resolve(null),
    book.screenPdfKey
      ? getSignedUrl({ bucket: "ephemeral", key: book.screenPdfKey, expiresInSeconds: 86400 })
      : Promise.resolve(null),
  ]);

  return NextResponse.json({ printUrl, screenUrl });
}
