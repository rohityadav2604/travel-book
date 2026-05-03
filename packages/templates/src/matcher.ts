import type { PhotoInput, PlacementResult, SpreadDef } from "./types";

function aspectRatio(photo: PhotoInput): number {
  return photo.width / photo.height;
}

function score(photo: PhotoInput, slot: SpreadDef["slots"][number]): number {
  const ar = aspectRatio(photo);
  const { min, max } = slot.aspectRatioRange;

  if (ar >= min && ar <= max) {
    return 1;
  }

  const dist = Math.min(Math.abs(ar - min), Math.abs(ar - max));
  return Math.max(0, 1 - dist);
}

function findBestPhoto(
  pool: PhotoInput[],
  slot: SpreadDef["slots"][number],
): { photo: PhotoInput; index: number } | null {
  let bestIndex = -1;
  let bestScore = -1;

  for (let i = 0; i < pool.length; i++) {
    const photo = pool[i];
    if (!photo) continue;
    const s = score(photo, slot);
    if (s > bestScore) {
      bestScore = s;
      bestIndex = i;
    }
  }

  if (bestIndex === -1) return null;
  const removed = pool.splice(bestIndex, 1);
  return removed[0] ? { photo: removed[0], index: bestIndex } : null;
}

export function assignPhotosToSpreads(
  photos: PhotoInput[],
  spreads: SpreadDef[],
): PlacementResult[] {
  const pinned = photos.filter((p) => p.pinned);
  const unpinned = photos.filter((p) => !p.pinned);
  const results: PlacementResult[] = [];

  for (const spread of spreads) {
    const assignments: PlacementResult["assignments"] = [];

    for (const slot of spread.slots) {
      // Try pinned pool first, then unpinned
      const fromPinned = pinned.length > 0 ? findBestPhoto(pinned, slot) : null;
      const chosen = fromPinned ?? (unpinned.length > 0 ? findBestPhoto(unpinned, slot) : null);

      if (chosen) {
        assignments.push({ slotId: slot.id, photoId: chosen.photo.id });
      }
    }

    results.push({ spreadId: spread.id, templateName: spread.templateName, assignments });
  }

  return results;
}
