import { db } from "@memorybook/db";
import { getStorageClient, getStorageConfig, putObject } from "@memorybook/shared/storage";
import type { StorageBucket } from "@memorybook/shared/types";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";
import type { ThumbnailJobPayload } from "@memorybook/shared/validators";

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

      await db.photo.update({
        where: { id: photo.photoId },
        data: {
          thumbnailKey,
          width: metadata.width ?? null,
          height: metadata.height ?? null,
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
