import { db } from "@memorybook/db";
import { NextResponse } from "next/server";
import { z } from "zod";

const assignmentSchema = z.object({
  slotId: z.string().min(1),
  photoId: z.string().min(1),
});

const slotSchema = z.object({
  id: z.string().min(1),
  aspectRatioRange: z.object({
    min: z.number(),
    max: z.number(),
  }),
  preferredSubject: z.string().optional(),
  sizeWeight: z.number(),
});

const placementSchema = z.object({
  spreadId: z.string().min(1),
  templateName: z.string().min(1),
  assignments: z.array(assignmentSchema),
  slots: z.array(slotSchema).optional(),
  texts: z.record(z.string()).optional(),
});

const patchSchema = z.object({
  title: z.string().nullable().optional(),
  placementJson: z.array(placementSchema).optional(),
  sessionId: z.string().optional(),
});

type BookWithPhotos = {
  id: string;
  sessionId: string;
  title: string | null;
  theme: string;
  status: string;
  placementJson: unknown;
  session: {
    photos: Array<{
      id: string;
      storageKey: string;
      thumbnailKey: string | null;
      width: number | null;
      height: number | null;
      displayOrder: number;
      caption: string | null;
      filename: string;
    }>;
  };
};

function serializeBook(book: BookWithPhotos): Record<string, unknown> {
  return {
    id: book.id,
    sessionId: book.sessionId,
    title: book.title,
    theme: book.theme,
    status: book.status,
    placementJson: book.placementJson,
    photos: book.session.photos.map((p) => ({
      id: p.id,
      storageKey: p.storageKey,
      thumbnailKey: p.thumbnailKey,
      width: p.width,
      height: p.height,
      displayOrder: p.displayOrder,
      caption: p.caption,
      filename: p.filename,
    })),
  };
}

function findBookWithPhotos(id: string): Promise<BookWithPhotos | null> {
  return db.book.findUnique({
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
  }) as Promise<BookWithPhotos | null>;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const { id } = await params;

  const book = await findBookWithPhotos(id);

  if (!book) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 });
  }

  return NextResponse.json({ book: serializeBook(book) });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const { id } = await params;
  const sessionId = request.headers.get("x-memorybook-session-id");
  const body = (await request.json()) as unknown;
  const parsed = patchSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const book = await db.book.findUnique({
    where: { id },
    select: { sessionId: true },
  });

  if (!book) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 });
  }

  const bodySessionId = parsed.data.sessionId;
  const isAuthorized =
    (sessionId && book.sessionId === sessionId) ||
    (bodySessionId && book.sessionId === bodySessionId);

  if (!isAuthorized) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const data: Record<string, unknown> = {};
  if (parsed.data.title !== undefined) {
    data.title = parsed.data.title;
  }
  if (parsed.data.placementJson !== undefined) {
    data.placementJson = parsed.data.placementJson;
  }
  if (parsed.data.title !== undefined || parsed.data.placementJson !== undefined) {
    data.printPdfKey = null;
    data.screenPdfKey = null;
    data.exportedAt = null;
    data.status = "ready";
  }

  // If the book was created with an old upload session, migrate it to the
  // current browser cookie session so it appears in the library going forward.
  if (sessionId && book.sessionId !== sessionId) {
    data.sessionId = sessionId;
  }

  await db.book.update({
    where: { id },
    data,
  });

  const updated = await findBookWithPhotos(id);
  if (!updated) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 });
  }

  return NextResponse.json({ book: serializeBook(updated) });
}
