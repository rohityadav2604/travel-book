"use client";

import { useMemo } from "react";
import type { ValidatedFile } from "@/lib/validation";

export type UploadStripProps = {
  files: ValidatedFile[];
  progress: Map<string, number>;
  uploading: boolean;
};

export default function UploadStrip({ files, progress, uploading }: UploadStripProps): React.ReactElement {
  const totalProgress = useMemo(() => {
    if (files.length === 0) return 0;
    let sum = 0;
    for (const file of files) {
      sum += progress.get(file.id) ?? 0;
    }
    return Math.round((sum / files.reduce((a, f) => a + f.size, 0)) * 100);
  }, [files, progress]);

  return (
    <div className="w-full">
      <div className="mb-3 flex items-center justify-between">
        <p className="font-mono text-xs uppercase tracking-wider text-ink-faded">
          Uploading {files.length} photos
        </p>
        <p className="font-mono text-xs uppercase tracking-wider text-ink-faded">
          {totalProgress}%
        </p>
      </div>

      <div className="mb-4 h-1 w-full overflow-hidden rounded bg-paper-2">
        <div
          className="h-full bg-terracotta transition-all duration-300"
          style={{ width: `${totalProgress}%` }}
        />
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2">
        {files.map((file) => {
          const fileProgress = progress.get(file.id) ?? 0;
          const percent = Math.round((fileProgress / file.size) * 100);

          return (
            <div
              key={file.id}
              className="relative flex-shrink-0 overflow-hidden rounded border border-ink-faded/20"
              style={{ width: 80, height: 80 }}
            >
              {file.file.type.startsWith("image/") && !file.file.name.endsWith(".heic") ? (
                <img
                  src={URL.createObjectURL(file.file)}
                  alt={file.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-paper-2">
                  <span className="font-mono text-[10px] text-ink-faded uppercase">
                    {file.name.split(".").pop()}
                  </span>
                </div>
              )}

              {uploading && percent < 100 && (
                <div className="absolute inset-0 flex items-end">
                  <div
                    className="h-1 bg-terracotta transition-all"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              )}

              {percent >= 100 && (
                <div className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-olive text-paper">
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
