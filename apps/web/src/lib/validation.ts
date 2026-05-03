const VALID_MIME_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"]);
const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024;
const MAX_TOTAL_SIZE_BYTES = 500 * 1024 * 1024;
const MIN_PHOTOS = 5;
const MAX_PHOTOS = 50;

export type ValidationError = {
  type: "count" | "format" | "size" | "total-size";
  message: string;
};

export type ValidatedFile = {
  file: File;
  id: string;
  name: string;
  size: number;
  mimeType: string;
  errors: string[];
};

export function validateFiles(files: File[]): { validated: ValidatedFile[]; globalErrors: ValidationError[] } {
  const globalErrors: ValidationError[] = [];

  if (files.length < MIN_PHOTOS) {
    globalErrors.push({
      type: "count",
      message: `Please select at least ${MIN_PHOTOS} photos (you selected ${files.length}).`,
    });
  }

  if (files.length > MAX_PHOTOS) {
    globalErrors.push({
      type: "count",
      message: `Please select no more than ${MAX_PHOTOS} photos (you selected ${files.length}).`,
    });
  }

  let totalSize = 0;
  const validated: ValidatedFile[] = [];

  for (const file of files) {
    const errors: string[] = [];

    if (!VALID_MIME_TYPES.has(file.type.toLowerCase()) && !file.name.toLowerCase().endsWith(".heic")) {
      errors.push("Only JPEG, PNG, WebP, and HEIC files are supported.");
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      errors.push(`File exceeds ${MAX_FILE_SIZE_BYTES / 1024 / 1024}MB limit.`);
    }

    totalSize += file.size;

    validated.push({
      file,
      id: `${file.name}-${file.size}-${file.lastModified}`,
      name: file.name,
      size: file.size,
      mimeType: file.type || "image/jpeg",
      errors,
    });
  }

  if (totalSize > MAX_TOTAL_SIZE_BYTES) {
    globalErrors.push({
      type: "total-size",
      message: `Total upload size exceeds ${MAX_TOTAL_SIZE_BYTES / 1024 / 1024}MB.`,
    });
  }

  return { validated, globalErrors };
}

export function needsHeicConversion(file: File): boolean {
  return file.type.toLowerCase() === "image/heic" || file.name.toLowerCase().endsWith(".heic");
}
