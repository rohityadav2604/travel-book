import { z } from "zod";

const stringBooleanSchema = z.preprocess((value) => {
  if (value === "true") {
    return true;
  }

  if (value === "false") {
    return false;
  }

  return value;
}, z.boolean());

export const storageEnvSchema = z.object({
  S3_ENDPOINT: z.string().url().default("http://localhost:9000"),
  S3_REGION: z.string().min(1).default("us-east-1"),
  S3_ACCESS_KEY_ID: z.string().min(1).default("minioadmin"),
  S3_SECRET_ACCESS_KEY: z.string().min(1).default("minioadmin"),
  S3_FORCE_PATH_STYLE: stringBooleanSchema.default(true),
  S3_RAW_BUCKET: z.string().min(1).default("memorybook-raw"),
  S3_PUBLIC_BUCKET: z.string().min(1).default("memorybook-public"),
  S3_EPHEMERAL_BUCKET: z.string().min(1).default("memorybook-ephemeral"),
});

export const redisEnvSchema = z.object({
  REDIS_HOST: z.string().min(1).default("localhost"),
  REDIS_PORT: z.coerce.number().int().positive().default(6379),
  REDIS_PASSWORD: z.string().optional().default(""),
  REDIS_DB: z.coerce.number().int().min(0).default(0),
});

export const probeJobPayloadSchema = z.object({
  kind: z.literal("probe"),
  requestedAt: z.string().datetime(),
});

export const thumbnailJobPayloadSchema = z.object({
  kind: z.literal("thumbnail"),
  sessionId: z.string().min(1),
  photos: z.array(
    z.object({
      photoId: z.string().min(1),
      storageKey: z.string().min(1),
      filename: z.string().min(1),
    }),
  ),
});

export const placementJobPayloadSchema = z.object({
  kind: z.literal("placement"),
  sessionId: z.string().min(1),
  bookId: z.string().min(1),
});

export const renderJobPayloadSchema = z.object({
  kind: z.literal("render"),
  bookId: z.string().min(1),
  quality: z.enum(["print", "screen"]),
});

export type ProbeJobPayload = z.infer<typeof probeJobPayloadSchema>;
export type ThumbnailJobPayload = z.infer<typeof thumbnailJobPayloadSchema>;
export type PlacementJobPayload = z.infer<typeof placementJobPayloadSchema>;
export type RenderJobPayload = z.infer<typeof renderJobPayloadSchema>;
