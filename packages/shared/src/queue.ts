import { Queue, Worker } from "bullmq";
import type { JobsOptions, Processor } from "bullmq";
import { redisEnvSchema, type PlacementJobPayload, type ProbeJobPayload, type RenderJobPayload, type ThumbnailJobPayload } from "./validators";

export const queueNames = {
  upload: "memorybook-upload",
  render: "memorybook-render",
} as const;

export type UploadJobName = "probe" | "thumbnail" | "placement";
export type RenderJobName = "probe" | "render";
export type UploadJobData = ProbeJobPayload | ThumbnailJobPayload | PlacementJobPayload;
export type RenderJobData = ProbeJobPayload | RenderJobPayload;
export type QueueJobResult = {
  ok: boolean;
  [key: string]: unknown;
};

type RedisConnectionOptions = {
  host: string;
  port: number;
  db: number;
  maxRetriesPerRequest: null;
  password?: string;
};

export function createRedisConnection(): RedisConnectionOptions {
  const env = redisEnvSchema.parse(process.env);
  const connection: RedisConnectionOptions = {
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
    db: env.REDIS_DB,
    maxRetriesPerRequest: null,
  };

  if (env.REDIS_PASSWORD) {
    connection.password = env.REDIS_PASSWORD;
  }

  return connection;
}

export function createUploadQueue(): Queue<UploadJobData, QueueJobResult, UploadJobName> {
  return new Queue<UploadJobData, QueueJobResult, UploadJobName>(queueNames.upload, {
    connection: createRedisConnection(),
  });
}

export function createRenderQueue(): Queue<RenderJobData, QueueJobResult, RenderJobName> {
  return new Queue<RenderJobData, QueueJobResult, RenderJobName>(queueNames.render, {
    connection: createRedisConnection(),
  });
}

export async function addUploadJob(
  queue: Queue<UploadJobData, QueueJobResult, UploadJobName>,
  name: UploadJobName,
  data: UploadJobData,
  opts?: JobsOptions,
): Promise<void> {
  await queue.add(name, data, opts);
}

export async function addRenderJob(
  queue: Queue<RenderJobData, QueueJobResult, RenderJobName>,
  name: RenderJobName,
  data: RenderJobData,
  opts?: JobsOptions,
): Promise<void> {
  await queue.add(name, data, opts);
}

export function createUploadWorker(
  processor: Processor<UploadJobData, QueueJobResult, UploadJobName>,
): Worker<UploadJobData, QueueJobResult, UploadJobName> {
  return new Worker<UploadJobData, QueueJobResult, UploadJobName>(queueNames.upload, processor, {
    connection: createRedisConnection(),
  });
}

export function createRenderWorker(
  processor: Processor<RenderJobData, QueueJobResult, RenderJobName>,
): Worker<RenderJobData, QueueJobResult, RenderJobName> {
  return new Worker<RenderJobData, QueueJobResult, RenderJobName>(queueNames.render, processor, {
    connection: createRedisConnection(),
  });
}
