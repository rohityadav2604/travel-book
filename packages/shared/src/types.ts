export type SessionId = string;
export type PhotoId = string;
export type BookId = string;

export type StorageBucket = "raw" | "public" | "ephemeral";

export type PhotoRecord = {
  id: PhotoId;
  sessionId: SessionId;
  storageKey: string;
  thumbnailKey: string | null;
  filename: string;
  mimeType: string;
  sizeBytes: number;
  displayOrder: number;
};
