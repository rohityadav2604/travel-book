import {
  createRenderWorker,
  type QueueJobResult,
  type RenderJobData,
  type RenderJobName,
} from "@memorybook/shared/queue";
import { probeJobPayloadSchema, renderJobPayloadSchema } from "@memorybook/shared/validators";
import { db } from "@memorybook/db";
import { getPublicUrl, putObject } from "@memorybook/shared/storage";
import type { StorageBucket } from "@memorybook/shared/types";
import type { Job } from "bullmq";
import { renderSpread } from "./renderSpread";
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
    }>;

    const photoMap = new Map(book.session.photos.map((p) => [p.id, p]));
    const spreadBuffers: Buffer[] = [];

    const width = payload.quality === "print" ? 2480 : 1240;
    const height = payload.quality === "print" ? 1754 : 877;

    for (const placement of placements) {
      const slots: Record<string, string> = {};
      for (const a of placement.assignments) {
        const photo = photoMap.get(a.photoId);
        if (photo?.thumbnailKey) {
          slots[a.slotId] = getPublicUrl("public", photo.thumbnailKey);
        }
      }

      const templateName =
        placement.templateName ??
        (placement.spreadId === "cover"
          ? "Cover"
          : placement.spreadId.startsWith("spread-")
            ? parseInt(placement.spreadId.replace("spread-", ""), 10) % 2 !== 0
              ? "GrandVista"
              : "JournalPage"
            : "GrandVista");

      const html = `
        <div style="width:${width}px;height:${height}px;background:#f3e7d1;overflow:hidden;">
          ${templateName === "GrandVista" || templateName === "Cover" || templateName === "ChapterDivider" ? `
            <div style="position:relative;width:100%;height:100%;overflow:hidden;">
              <img src="${slots.hero || ""}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;" />
              <div style="position:absolute;inset:0;background:radial-gradient(ellipse at center,transparent 40%,rgba(44,31,21,0.25) 100%);"></div>
            </div>
          ` : `
            <div style="display:flex;width:100%;height:100%;background:#f3e7d1;">
              <div style="flex:1;border-right:1px solid rgba(44,31,21,0.1);padding:16px;">
                <div style="position:relative;width:100%;height:100%;overflow:hidden;border-radius:2px;">
                  <img src="${slots.left || ""}" style="width:100%;height:100%;object-fit:cover;" />
                </div>
              </div>
              <div style="flex:1;display:flex;flex-direction:column;gap:12px;padding:16px;">
                <div style="flex:1;overflow:hidden;border-radius:2px;">
                  <img src="${slots.topRight || ""}" style="width:100%;height:100%;object-fit:cover;" />
                </div>
                <div style="flex:1;overflow:hidden;border-radius:2px;">
                  <img src="${slots.bottomRight || ""}" style="width:100%;height:100%;object-fit:cover;" />
                </div>
              </div>
            </div>
          `}
        </div>
      `;

      const buffer = await renderSpread({ html, width, height, quality: payload.quality });
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
