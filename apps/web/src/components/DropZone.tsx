"use client";

import { useCallback, useState } from "react";
import { validateFiles, type ValidatedFile, type ValidationError } from "@/lib/validation";

export type DropZoneProps = {
  onFilesSelected: (files: ValidatedFile[]) => void;
};

export default function DropZone({ onFilesSelected }: DropZoneProps): React.ReactElement {
  const [isDragOver, setIsDragOver] = useState(false);
  const [globalErrors, setGlobalErrors] = useState<ValidationError[]>([]);

  const handleFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList || fileList.length === 0) return;

      const files = Array.from(fileList);
      const { validated, globalErrors: errors } = validateFiles(files);
      setGlobalErrors(errors);

      const validFiles = validated.filter((f) => f.errors.length === 0);
      if (validFiles.length > 0) {
        onFilesSelected(validFiles);
      }
    },
    [onFilesSelected],
  );

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles],
  );

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFiles(e.target.files);
    },
    [handleFiles],
  );

  return (
    <div className="w-full">
      <label
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`
          flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed
          px-8 py-16 transition-colors
          ${isDragOver ? "border-terracotta bg-paper-2" : "border-ink-faded bg-paper"}
        `}
      >
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/heic,.heic"
          multiple
          className="hidden"
          onChange={onChange}
        />
        <svg
          className="mb-4 h-12 w-12 text-terracotta"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a2.25 2.25 0 002.25-2.25V5.25A2.25 2.25 0 0019.5 3H4.5a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 004.5 21z"
          />
        </svg>
        <p className="font-script text-xl text-ink">
          Drag & drop your travel photos here
        </p>
        <p className="mt-2 font-serif text-sm text-ink-faded">
          or click to browse — 5 to 50 photos, JPEG/PNG/WebP/HEIC
        </p>
      </label>

      {globalErrors.length > 0 && (
        <div className="mt-4 rounded border border-burgundy bg-burgundy/10 px-4 py-3">
          {globalErrors.map((err) => (
            <p key={err.type} className="font-sans text-sm text-burgundy">
              {err.message}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
