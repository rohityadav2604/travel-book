import {
  addUploadJob,
  createUploadQueue,
  createUploadWorker,
  type QueueJobResult,
  type UploadJobData,
  type UploadJobName,
} from "@memorybook/shared/queue";
import {
  probeJobPayloadSchema,
  thumbnailJobPayloadSchema,
  placementJobPayloadSchema,
} from "@memorybook/shared/validators";
import type { Job } from "bullmq";
import { processThumbnailJob } from "./thumbnailJob";
import { processPlacementJob } from "./placementJob";

const worker = createUploadWorker(processUploadJob);

worker.on("completed", (job) => {
  console.log(`upload worker completed ${job.name}:${job.id}`);
});

worker.on("failed", (job, error) => {
  console.error(`upload worker failed ${job?.name}:${job?.id}`, error);
});

if (process.env.UPLOAD_WORKER_ENQUEUE_PROBE === "true") {
  const queue = createUploadQueue();
  await addUploadJob(queue, "probe", {
    kind: "probe",
    requestedAt: new Date().toISOString(),
  });
  await queue.close();
}

process.once("SIGINT", () => {
  void shutdown();
});

process.once("SIGTERM", () => {
  void shutdown();
});

async function processUploadJob(
  job: Job<UploadJobData, QueueJobResult, UploadJobName>,
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

  if (job.name === "thumbnail") {
    const payload = thumbnailJobPayloadSchema.parse(job.data);
    await processThumbnailJob(payload);
    return {
      ok: true,
      kind: "thumbnail",
      processedCount: payload.photos.length,
    };
  }

  if (job.name === "placement") {
    const payload = placementJobPayloadSchema.parse(job.data);
    await processPlacementJob(payload);
    return {
      ok: true,
      kind: "placement",
      bookId: payload.bookId,
    };
  }

  return {
    ok: true,
    kind: job.name,
    deferred: true,
  };
}

async function shutdown(): Promise<void> {
  await worker.close();
}
