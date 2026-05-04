import { db } from "@memorybook/db";
import {
  abortMultipartUpload,
  completeMultipartUpload,
  createMultipartUpload,
  createUploadQueue,
  addUploadJob,
  type StorageBucket,
} from "@memorybook/shared";
import { ensureSession } from "@/lib/session";
import { NextResponse } from "next/server";
import { z } from "zod";

const CHUNK_SIZE = 5 * 1024 * 1024;

const initSchema = z.object({
  files: z.array(
    z.object({
      name: z.string().min(1),
      size: z.number().int().positive(),
      mimeType: z.string().min(1),
    }),
  ),
});

const completeSchema = z.object({
  sessionId: z.string().min(1),
  completions: z.array(
    z.object({
      photoId: z.string().min(1),
      uploadId: z.string().min(1),
      parts: z.array(
        z.object({
          PartNumber: z.number().int().positive(),
          ETag: z.string().min(1),
        }),
      ),
    }),
  ),
});

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as unknown;
  const parsed = initSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { files } = parsed.data;

  if (files.length < 5 || files.length > 50) {
    return NextResponse.json(
      { error: `Please upload between 5 and 50 photos (received ${files.length}).` },
      { status: 400 },
    );
  }

  // Re-use the browser's anonymous session so books are tied to the same
  // cookie identity and show up in the library.
  const session = await ensureSession();
  const sessionId = session.id;

  const uploads: {
    photoId: string;
    storageKey: string;
    uploadId: string;
    presignedUrls: string[];
    partSize: number;
  }[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (!file) continue;
    const photoId = crypto.randomUUID();
    const ext = file.name.split(".").pop() || "jpg";
    const storageKey = `${sessionId}/${photoId}.${ext}`;
    const partCount = Math.ceil(file.size / CHUNK_SIZE);

    const { uploadId, presignedUrls } = await createMultipartUpload(
      "raw" as StorageBucket,
      storageKey,
      file.mimeType,
      partCount,
    );

    await db.photo.create({
      data: {
        id: photoId,
        sessionId,
        storageKey,
        filename: file.name,
        mimeType: file.mimeType,
        sizeBytes: file.size,
        displayOrder: i,
        status: "uploaded",
      },
    });

    uploads.push({
      photoId,
      storageKey,
      uploadId,
      presignedUrls,
      partSize: CHUNK_SIZE,
    });
  }

  return NextResponse.json({ sessionId, uploads });
}

export async function PATCH(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as unknown;
  const parsed = completeSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { sessionId, completions } = parsed.data;

  for (const completion of completions) {
    const photo = await db.photo.findFirst({
      where: { id: completion.photoId, sessionId },
    });

    if (!photo) {
      continue;
    }

    try {
      await completeMultipartUpload(
        "raw" as StorageBucket,
        photo.storageKey,
        completion.uploadId,
        completion.parts,
      );

      await db.photo.update({
        where: { id: photo.id },
        data: { status: "processing" },
      });
    } catch {
      await abortMultipartUpload("raw" as StorageBucket, photo.storageKey, completion.uploadId);
      await db.photo.update({
        where: { id: photo.id },
        data: { status: "failed" },
      });
    }
  }

  const readyCount = await db.photo.count({
    where: { sessionId, status: { not: "failed" } },
  });

  if (readyCount > 0) {
    const queue = createUploadQueue();
    const photos = await db.photo.findMany({
      where: { sessionId, status: { not: "failed" } },
      select: { id: true, storageKey: true, filename: true },
    });

    await addUploadJob(queue, "thumbnail", {
      kind: "thumbnail",
      sessionId,
      photos: photos.map((p) => ({ photoId: p.id, storageKey: p.storageKey, filename: p.filename })),
    });

    await queue.close();
  }

  return NextResponse.json({ ok: true, photos: readyCount });
}
