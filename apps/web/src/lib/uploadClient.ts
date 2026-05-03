export type UploadInitResponse = {
  sessionId: string;
  uploads: {
    photoId: string;
    storageKey: string;
    uploadId: string;
    presignedUrls: string[];
    partSize: number;
  }[];
};

export type UploadCompleteRequest = {
  sessionId: string;
  completions: {
    photoId: string;
    uploadId: string;
    parts: { PartNumber: number; ETag: string }[];
  }[];
};

export type UploadCompleteResponse = {
  ok: boolean;
  photos: number;
};

export async function initiateUpload(
  files: { name: string; size: number; mimeType: string }[],
): Promise<UploadInitResponse> {
  const response = await fetch("/api/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ files }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({ error: "Upload initiation failed" }));
    throw new Error(err.error || "Upload initiation failed");
  }

  return response.json() as Promise<UploadInitResponse>;
}

export async function uploadFileInChunks(
  file: File,
  presignedUrls: string[],
  partSize: number,
  onProgress: (uploaded: number) => void,
): Promise<{ PartNumber: number; ETag: string }[]> {
  const parts: { PartNumber: number; ETag: string }[] = [];
  let uploaded = 0;

  for (let i = 0; i < presignedUrls.length; i++) {
    const url = presignedUrls[i];
    if (!url) continue;
    const start = i * partSize;
    const end = Math.min(start + partSize, file.size);
    const chunk = file.slice(start, end);

    const res = await fetch(url, {
      method: "PUT",
      body: chunk,
    });

    if (!res.ok) {
      throw new Error(`Chunk upload failed: ${res.status}`);
    }

    const eTag = res.headers.get("etag") || res.headers.get("ETag");
    if (!eTag) {
      throw new Error("Missing ETag from upload response");
    }

    parts.push({ PartNumber: i + 1, ETag: eTag });
    uploaded += chunk.size;
    onProgress(uploaded);
  }

  return parts;
}

export async function completeUpload(payload: UploadCompleteRequest): Promise<UploadCompleteResponse> {
  const response = await fetch("/api/upload", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const err = (await response.json().catch(() => ({ error: "Upload completion failed" }))) as { error?: string };
    throw new Error(err.error || "Upload completion failed");
  }

  return response.json() as Promise<UploadCompleteResponse>;
}
