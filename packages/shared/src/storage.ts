import {
  AbortMultipartUploadCommand,
  CompleteMultipartUploadCommand,
  CreateMultipartUploadCommand,
  GetObjectCommand,
  type PutObjectCommandInput,
  PutObjectCommand,
  S3Client,
  UploadPartCommand,
  type GetObjectCommandOutput,
} from "@aws-sdk/client-s3";
import { getSignedUrl as presignGetObject } from "@aws-sdk/s3-request-presigner";
import type { StorageBucket } from "./types";
import { storageEnvSchema } from "./validators";

export { GetObjectCommand, type GetObjectCommandOutput };

export type StorageConfig = {
  endpoint: string;
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  forcePathStyle: boolean;
  buckets: Record<StorageBucket, string>;
};

export type PutObjectInput = {
  bucket: StorageBucket;
  key: string;
  body: NonNullable<PutObjectCommandInput["Body"]>;
  contentType?: string;
  cacheControl?: string;
};

export type SignedUrlInput = {
  bucket: StorageBucket;
  key: string;
  expiresInSeconds: number;
};

let client: S3Client | undefined;

export function getStorageConfig(): StorageConfig {
  const env = storageEnvSchema.parse(process.env);

  return {
    endpoint: env.S3_ENDPOINT,
    region: env.S3_REGION,
    accessKeyId: env.S3_ACCESS_KEY_ID,
    secretAccessKey: env.S3_SECRET_ACCESS_KEY,
    forcePathStyle: env.S3_FORCE_PATH_STYLE,
    buckets: {
      raw: env.S3_RAW_BUCKET,
      public: env.S3_PUBLIC_BUCKET,
      ephemeral: env.S3_EPHEMERAL_BUCKET,
    },
  };
}

export function getStorageClient(): S3Client {
  if (client) {
    return client;
  }

  const config = getStorageConfig();
  client = new S3Client({
    endpoint: config.endpoint,
    region: config.region,
    forcePathStyle: config.forcePathStyle,
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
  });

  return client;
}

export async function putObject(input: PutObjectInput): Promise<void> {
  const config = getStorageConfig();
  const commandInput: PutObjectCommandInput = {
    Bucket: config.buckets[input.bucket],
    Key: input.key,
    Body: input.body,
  };

  if (input.contentType) {
    commandInput.ContentType = input.contentType;
  }

  if (input.cacheControl) {
    commandInput.CacheControl = input.cacheControl;
  }

  await getStorageClient().send(new PutObjectCommand(commandInput));
}

export async function getSignedUrl(input: SignedUrlInput): Promise<string> {
  const config = getStorageConfig();
  const command = new GetObjectCommand({
    Bucket: config.buckets[input.bucket],
    Key: input.key,
  });

  return presignGetObject(getStorageClient(), command, {
    expiresIn: input.expiresInSeconds,
  });
}

export type MultipartInitResult = {
  uploadId: string;
  key: string;
  presignedUrls: string[];
};

export async function createMultipartUpload(
  bucket: StorageBucket,
  key: string,
  contentType: string,
  partCount: number,
): Promise<MultipartInitResult> {
  const config = getStorageConfig();
  const s3 = getStorageClient();

  const createResult = await s3.send(
    new CreateMultipartUploadCommand({
      Bucket: config.buckets[bucket],
      Key: key,
      ContentType: contentType,
    }),
  );

  const uploadId = createResult.UploadId;
  if (!uploadId) {
    throw new Error("Failed to create multipart upload");
  }

  const presignedUrls: string[] = [];
  for (let i = 1; i <= partCount; i++) {
    const command = new UploadPartCommand({
      Bucket: config.buckets[bucket],
      Key: key,
      UploadId: uploadId,
      PartNumber: i,
    });
    const url = await presignGetObject(s3, command, { expiresIn: 900 });
    presignedUrls.push(url);
  }

  return { uploadId, key, presignedUrls };
}

export async function completeMultipartUpload(
  bucket: StorageBucket,
  key: string,
  uploadId: string,
  parts: { PartNumber: number; ETag: string }[],
): Promise<void> {
  const config = getStorageConfig();
  await getStorageClient().send(
    new CompleteMultipartUploadCommand({
      Bucket: config.buckets[bucket],
      Key: key,
      UploadId: uploadId,
      MultipartUpload: { Parts: parts },
    }),
  );
}

export async function abortMultipartUpload(
  bucket: StorageBucket,
  key: string,
  uploadId: string,
): Promise<void> {
  const config = getStorageConfig();
  await getStorageClient().send(
    new AbortMultipartUploadCommand({
      Bucket: config.buckets[bucket],
      Key: key,
      UploadId: uploadId,
    }),
  );
}

export function getPublicUrl(bucket: StorageBucket, key: string): string {
  const config = getStorageConfig();
  const bucketName = config.buckets[bucket];

  if (config.forcePathStyle) {
    return `${config.endpoint}/${bucketName}/${key}`;
  }

  return `https://${bucketName}.${config.endpoint.replace(/^https?:\/\//, "")}/${key}`;
}
