import type { PhotoInput, PlacementResult, SpreadDef } from "./types";

function aspectRatio(photo: PhotoInput): number {
  return photo.width / photo.height;
}

function pixelArea(photo: PhotoInput): number {
  return photo.width * photo.height;
}

function score(photo: PhotoInput, slot: SpreadDef["slots"][number], pool: PhotoInput[]): number {
  const ar = aspectRatio(photo);
  const { min, max } = slot.aspectRatioRange;

  // Aspect ratio score (0-1)
  let arScore: number;
  if (ar >= min && ar <= max) {
    arScore = 1;
  } else {
    const dist = Math.min(Math.abs(ar - min), Math.abs(ar - max));
    arScore = Math.max(0, 1 - dist);
  }

  // Size score: prefer larger photos for slots with higher sizeWeight
  // Normalize against the max pixel area in the pool
  const maxArea = Math.max(...pool.map((p) => pixelArea(p)));
  const minArea = Math.min(...pool.map((p) => pixelArea(p)));
  const areaRange = maxArea - minArea || 1;
  const normalizedArea = (pixelArea(photo) - minArea) / areaRange;
  const sizeScore = 0.3 * normalizedArea * slot.sizeWeight;

  return arScore + sizeScore;
}

function findBestPhoto(
  pool: PhotoInput[],
  slot: SpreadDef["slots"][number],
  allPhotos: PhotoInput[],
): { photo: PhotoInput; index: number } | null {
  let bestIndex = -1;
  let bestScore = -1;

  for (let i = 0; i < pool.length; i++) {
    const photo = pool[i];
    if (!photo) continue;
    const s = score(photo, slot, allPhotos);
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
  const allPhotos = [...pinned, ...unpinned];
  const results: PlacementResult[] = [];

  for (const spread of spreads) {
    const assignments: PlacementResult["assignments"] = [];

    for (const slot of spread.slots) {
      // Try pinned pool first, then unpinned
      const fromPinned = pinned.length > 0 ? findBestPhoto(pinned, slot, allPhotos) : null;
      const chosen = fromPinned ?? (unpinned.length > 0 ? findBestPhoto(unpinned, slot, allPhotos) : null);

      if (chosen) {
        assignments.push({ slotId: slot.id, photoId: chosen.photo.id });
      }
    }

    results.push({ spreadId: spread.id, templateName: spread.templateName, assignments });
  }

  return results;
}
