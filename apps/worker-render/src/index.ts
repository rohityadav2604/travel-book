import {
  createRenderWorker,
  type QueueJobResult,
  type RenderJobData,
  type RenderJobName,
} from "@memorybook/shared/queue";
import { probeJobPayloadSchema, renderJobPayloadSchema } from "@memorybook/shared/validators";
import { db } from "@memorybook/db";
import { getPublicUrl, putObject, getStorageClient, getStorageConfig, GetObjectCommand } from "@memorybook/shared/storage";
import type { StorageBucket } from "@memorybook/shared/types";
import type { GetObjectCommandOutput } from "@memorybook/shared/storage";
import type { Job } from "bullmq";
import { renderSpread } from "./renderSpread";
import { renderSpreadToHtml } from "./renderSsr";
import { assemblePdf } from "./assemblePdf";
import { closeBrowser } from "./browser";

const worker = createRenderWorker(processRenderJob);

worker.on("completed", (job) => {
  console.log(`render worker completed ${job.name}:${job.id}`);
});

worker.on("failed", (job, error) => {
  console.error(`render worker failed ${job?.name}:${job?.id}`, error);
});

process.once("SIGINT", () => {
  void shutdown();
});

process.once("SIGTERM", () => {
  void shutdown();
});

async function fetchImageAsDataUri(bucket: StorageBucket, key: string): Promise<string | undefined> {
  try {
    const s3 = getStorageClient();
    const config = getStorageConfig();
    const result = (await s3.send(
      new GetObjectCommand({
        Bucket: config.buckets[bucket],
        Key: key,
      }),
    )) as GetObjectCommandOutput;
    if (!result.Body) return undefined;
    const bytes = await result.Body.transformToByteArray();
    const mimeType = result.ContentType || "image/jpeg";
    const base64 = Buffer.from(bytes).toString("base64");
    return `data:${mimeType};base64,${base64}`;
  } catch (err) {
    console.error("Failed to fetch image for embedding:", err);
    return undefined;
  }
}

async function processRenderJob(
  job: Job<RenderJobData, QueueJobResult, RenderJobName>,
): Promise<QueueJobResult> {
  if (job.name === "probe") {
    const payload = probeJobPayloadSchema.parse(job.data);
    return {
      ok: true,
      kind: "probe",
      processedAt: new Date().toISOString(),
      requestedAt: payload.requestedAt,
    };
  }

  if (job.name === "render") {
    const payload = renderJobPayloadSchema.parse(job.data);
    const book = await db.book.findUnique({
      where: { id: payload.bookId },
      include: {
        session: {
          include: {
            photos: { where: { excluded: false } },
          },
        },
      },
    });

    if (!book || !book.placementJson) {
      return { ok: false, kind: "render", error: "Book or placement not found" };
    }

    await db.book.update({
      where: { id: payload.bookId },
      data: { status: "rendering" },
    });

    const placements = book.placementJson as Array<{
      spreadId: string;
      templateName: string;
      assignments: Array<{ slotId: string; photoId: string }>;
      texts?: Record<string, string>;
    }>;

    const photoMap = new Map(book.session.photos.map((p) => [p.id, p]));
    const spreadBuffers: Buffer[] = [];

    const width = payload.quality === "print" ? 2400 : 600;
    const height = payload.quality === "print" ? 2400 : 600;

    for (const placement of placements) {
      const slots: Record<string, string | undefined> = {};
      const captions: Record<string, string> = {};
      for (const a of placement.assignments) {
        const photo = photoMap.get(a.photoId);
        // Use original storageKey for print quality; fallback to thumbnailKey
        const useOriginal = payload.quality === "print" && !!photo?.storageKey;
        const imageKey = useOriginal ? photo.storageKey : photo?.thumbnailKey;
        const bucket = useOriginal ? "raw" : "public";
        if (imageKey) {
          const dataUri = await fetchImageAsDataUri(bucket, imageKey);
          slots[a.slotId] = dataUri ?? getPublicUrl(bucket, imageKey);
        }
        if (photo?.caption) {
          captions[a.slotId] = photo.caption;
        }
      }
      for (const [key, value] of Object.entries(placement.texts ?? {})) {
        if (value) {
          captions[key] = value;
        }
      }

      const templateName = placement.templateName ?? "GrandVista";

      const html = renderSpreadToHtml({
        templateName,
        slots,
        captions: Object.keys(captions).length > 0 ? captions : undefined,
        width,
        height,
        quality: payload.quality,
        theme: book.theme,
      });

      const buffer = await renderSpread({ html, width, height, quality: payload.quality, theme: book.theme });
      spreadBuffers.push(buffer);
    }

    const pdfBytes = await assemblePdf(spreadBuffers);
    const key = `books/${payload.bookId}-${payload.quality}.pdf`;

    await putObject({
      bucket: "ephemeral" as StorageBucket,
      key,
      body: pdfBytes,
      contentType: "application/pdf",
    });

    const updateData: Record<string, string> = {};
    if (payload.quality === "print") {
      updateData.printPdfKey = key;
    } else {
      updateData.screenPdfKey = key;
    }

    await db.book.update({
      where: { id: payload.bookId },
      data: {
        ...updateData,
        status: "exported",
        exportedAt: new Date(),
      },
    });

    return { ok: true, kind: "render", bookId: payload.bookId, quality: payload.quality };
  }

  return { ok: true, kind: job.name, deferred: true };
}

async function shutdown(): Promise<void> {
  await worker.close();
  await closeBrowser();
}
