"use client";

import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import DropZone from "@/components/DropZone";
import UploadStrip from "@/components/UploadStrip";
import {
  initiateUpload,
  uploadFileInChunks,
  completeUpload,
  type UploadInitResponse,
} from "@/lib/uploadClient";
import type { ValidatedFile } from "@/lib/validation";

export default function UploadPage(): React.ReactElement {
  const router = useRouter();
  const [files, setFiles] = useState<ValidatedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<Map<string, number>>(new Map());
  const [error, setError] = useState<string | null>(null);
  const uploadInProgress = useRef(false);

  const onFilesSelected = useCallback((selected: ValidatedFile[]) => {
    setFiles(selected);
    setError(null);
  }, []);

  const startUpload = useCallback(async () => {
    if (files.length === 0 || uploadInProgress.current) return;
    uploadInProgress.current = true;
    setUploading(true);
    setError(null);

    try {
      const initRes: UploadInitResponse = await initiateUpload(
        files.map((f) => ({
          name: f.name,
          size: f.size,
          mimeType: f.mimeType,
        })),
      );

      const progressMap = new Map<string, number>();

      await Promise.all(
        files.map(async (file, index) => {
          const upload = initRes.uploads[index];
          if (!upload) return;

          const parts = await uploadFileInChunks(
            file.file,
            upload.presignedUrls,
            upload.partSize,
            (uploaded) => {
              progressMap.set(file.id, uploaded);
              setProgress(new Map(progressMap));
            },
          );

          progressMap.set(file.id, file.size);
          setProgress(new Map(progressMap));

          await completeUpload({
            sessionId: initRes.sessionId,
            completions: [
              {
                photoId: upload.photoId,
                uploadId: upload.uploadId,
                parts,
              },
            ],
          });
        }),
      );

      router.push(`/review?session=${initRes.sessionId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
      setUploading(false);
      uploadInProgress.current = false;
    }
  }, [files, router]);

  const canStart = files.length >= 5 && files.length <= 50 && !uploading;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 py-16">
      <section className="w-full max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-terracotta-deep">
          Step 1 of 3
        </p>
        <h1 className="mt-4 font-display text-5xl leading-tight text-ink md:text-6xl">
          Upload your photos
        </h1>
        <p className="mt-4 font-serif text-xl text-ink-soft">
          Select 5 to 50 travel photos. We will turn them into a beautiful vintage
          photo book.
        </p>
      </section>

      <section className="mt-10 w-full">
        <DropZone onFilesSelected={onFilesSelected} />
      </section>

      {files.length > 0 && (
        <section className="mt-8 w-full">
          <UploadStrip files={files} progress={progress} uploading={uploading} />
        </section>
      )}

      {error && (
        <div className="mt-6 rounded border border-burgundy bg-burgundy/10 px-4 py-3">
          <p className="font-sans text-sm text-burgundy">{error}</p>
        </div>
      )}

      <div className="mt-8">
        <button
          onClick={startUpload}
          disabled={!canStart}
          className={`
            rounded px-8 py-4 font-sans text-sm uppercase tracking-[0.2em] transition-colors
            ${
              canStart
                ? "border border-terracotta-deep bg-terracotta-deep text-paper hover:bg-terracotta"
                : "cursor-not-allowed border border-ink-faded bg-paper-2 text-ink-faded"
            }
          `}
        >
          {uploading ? "Uploading..." : `Upload ${files.length} Photos`}
        </button>
      </div>
    </main>
  );
}
