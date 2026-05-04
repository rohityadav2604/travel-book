import { db } from "@memorybook/db";
import { addRenderJob, createRenderQueue } from "@memorybook/shared/queue";
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
    if (book.status === "ready") {
      await db.book.update({
        where: { id },
        data: { status: "rendering" },
      });

      const queue = createRenderQueue();
      try {
        await addRenderJob(queue, "render", {
          kind: "render",
          bookId: id,
          quality: "print",
        });
      } catch {
        await db.book.update({
          where: { id },
          data: { status: "ready" },
        });
        return NextResponse.json({ error: "Could not queue export" }, { status: 503 });
      } finally {
        await queue.close();
      }

      return NextResponse.json({ printUrl: null, screenUrl: null, status: "rendering" }, { status: 202 });
    }

    if (book.status === "rendering") {
      return NextResponse.json({ printUrl: null, screenUrl: null, status: "rendering" }, { status: 202 });
    }

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
