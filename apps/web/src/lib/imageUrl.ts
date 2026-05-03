import { getPublicUrl } from "@memorybook/shared/storage";
import type { StorageBucket } from "@memorybook/shared/types";

export function imageUrl(bucket: StorageBucket, key: string | null): string | undefined {
  if (!key) {
    return undefined;
  }
  return getPublicUrl(bucket, key);
}
