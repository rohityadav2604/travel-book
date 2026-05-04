import type { SpreadDef } from "../types";

export const MOSAIC_GRID_CAPACITY = 6;

const storySpread: SpreadDef = {
  id: "story",
  templateName: "StorySpread",
  slots: [{ id: "accent", aspectRatioRange: { min: 0.5, max: 2.5 }, sizeWeight: 1 }],
};

const groupPhotoSpread: SpreadDef = {
  id: "group-photo",
  templateName: "GroupPhotoSpread",
  slots: [{ id: "hero", aspectRatioRange: { min: 1.2, max: 3.0 }, sizeWeight: 2 }],
};

export function buildDynamicSpreads(
  bodySpreads: SpreadDef[],
  photoCount: number,
  overflowTemplateName: string,
  slotsPerOverflow: number,
  endingSpreads: SpreadDef[],
): SpreadDef[] {
  const bodySlotCount = bodySpreads.reduce((sum, s) => sum + s.slots.length, 0);
  const endingSlotCount = endingSpreads.reduce((sum, s) => sum + s.slots.length, 0);
  const specialSlotCount = storySpread.slots.length + groupPhotoSpread.slots.length;

  // Total capacity before adding overflow = body + ending + story + groupPhoto
  const baseCapacity = bodySlotCount + endingSlotCount + specialSlotCount;
  const remaining = Math.max(0, photoCount - baseCapacity);

  const spreads: SpreadDef[] = [...bodySpreads];

  if (remaining > 0) {
    const overflowCount = Math.ceil(remaining / slotsPerOverflow);
    for (let i = 0; i < overflowCount; i++) {
      const slots: SpreadDef["slots"] = [];
      for (let j = 0; j < slotsPerOverflow; j++) {
        slots.push({
          id: `photo-${j}`,
          aspectRatioRange: { min: 0.5, max: 2.5 },
          sizeWeight: 1,
        });
      }
      spreads.push({
        id: `overflow-${i}`,
        templateName: overflowTemplateName,
        slots,
      });
    }
  }

  // Always insert Story and GroupPhoto before the ending spreads
  spreads.push(storySpread, groupPhotoSpread, ...endingSpreads);
  return spreads;
}
