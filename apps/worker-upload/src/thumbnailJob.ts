import { db } from "@memorybook/db";
import { getStorageClient, getStorageConfig, putObject } from "@memorybook/shared/storage";
import type { StorageBucket } from "@memorybook/shared/types";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";
import type { ThumbnailJobPayload } from "@memorybook/shared/validators";

function generateCaption(_metadata: sharp.Metadata, filename: string): string | null {
  const parts: string[] = [];

  // Filename heuristics: strip common prefixes and extract location words
  const clean = filename
    .replace(/\.(jpe?g|png|webp|heic|avif)$/i, "")
    .replace(/^(IMG_|DSC_|PXL_|100|IMG-|DSC-|MVIMG_|Screenshot_?|\d{4}-\d{2}-\d{2}[ _])/i, "")
    .replace(/\d{4,8}_\d{4,6}/g, "")
    .replace(/[_-]+/g, " ")
    .trim();

  const words = clean.split(/\s+/).filter((w) => w.length > 2 && !/^\d+$/.test(w));
  const locationWords = words.filter((w) => /^[A-Z]/.test(w)).slice(0, 2);

  if (locationWords.length > 0) {
    parts.push(locationWords.join(" "));
  } else if (words.length > 0) {
    parts.push(words.slice(0, 2).join(" "));
  }

  return parts.length > 0 ? parts.join(" · ") : null;
}

export async function processThumbnailJob(payload: ThumbnailJobPayload): Promise<void> {
  const s3 = getStorageClient();
  const config = getStorageConfig();

  for (const photo of payload.photos) {
    try {
      const getResult = await s3.send(
        new GetObjectCommand({
          Bucket: config.buckets.raw,
          Key: photo.storageKey,
        }),
      );

      const body = getResult.Body;
      if (!body) {
        throw new Error("Empty S3 body");
      }

      const bytes = await body.transformToByteArray();
      const resized = await sharp(Buffer.from(bytes))
        .resize(400, 400, { fit: "inside", withoutEnlargement: true })
        .jpeg({ quality: 85 })
        .toBuffer();

      const thumbnailKey = `thumbnails/${photo.photoId}.jpg`;

      await putObject({
        bucket: "public" as StorageBucket,
        key: thumbnailKey,
        body: resized,
        contentType: "image/jpeg",
        cacheControl: "public, max-age=86400",
      });

      const metadata = await sharp(Buffer.from(bytes)).metadata();

      // Auto-generate caption from EXIF date and filename heuristics
      const caption = generateCaption(metadata, photo.filename);

      await db.photo.update({
        where: { id: photo.photoId },
        data: {
          thumbnailKey,
          width: metadata.width ?? null,
          height: metadata.height ?? null,
          caption,
          status: "ready",
        },
      });
    } catch (error) {
      console.error(`Thumbnail failed for ${photo.photoId}:`, error);
      await db.photo.update({
        where: { id: photo.photoId },
        data: { status: "failed" },
      });
    }
  }
}
