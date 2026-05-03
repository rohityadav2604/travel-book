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

export function assignPhotosToSpreads(
  photos: PhotoInput[],
  spreads: SpreadDef[],
): PlacementResult[] {
  const unassigned = [...photos];
  const results: PlacementResult[] = [];

  for (const spread of spreads) {
    const assignments: PlacementResult["assignments"] = [];

    for (const slot of spread.slots) {
      if (unassigned.length === 0) break;

      let bestIndex = 0;
      let bestScore = -1;

      for (let i = 0; i < unassigned.length; i++) {
        const photo = unassigned[i];
        if (!photo) continue;
        const s = score(photo, slot);
        if (s > bestScore) {
          bestScore = s;
          bestIndex = i;
        }
      }

      const removed = unassigned.splice(bestIndex, 1);
      const chosen = removed[0];
      if (chosen) {
        assignments.push({ slotId: slot.id, photoId: chosen.id });
      }
    }

    results.push({ spreadId: spread.id, templateName: spread.templateName, assignments });
  }

  return results;
}
