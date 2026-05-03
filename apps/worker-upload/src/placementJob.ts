import { assignPhotosToSpreads } from "@memorybook/templates/matcher";
import type { SpreadDef } from "@memorybook/templates/types";
import { db } from "@memorybook/db";
import { createRenderQueue, addRenderJob } from "@memorybook/shared/queue";
import type { PlacementJobPayload } from "@memorybook/shared/validators";

function buildSpreads(): SpreadDef[] {
  const spreads: SpreadDef[] = [
    // Opening spreads (no photos)
    { id: "cover", templateName: "Cover", slots: [] },
    { id: "spread-1", templateName: "InsideFront", slots: [] },

    // Chapter opener with hero photo
    { id: "spread-2", templateName: "ChapterDivider", slots: [{ id: "hero", aspectRatioRange: { min: 1.2, max: 2.5 }, sizeWeight: 1 }] },

    // Full-bleed landscape hero
    { id: "spread-3", templateName: "GrandVista", slots: [{ id: "hero", aspectRatioRange: { min: 1.2, max: 2.5 }, sizeWeight: 1 }] },

    // Journal: portrait left + 2 landscapes right
    { id: "spread-4", templateName: "JournalPage", slots: [
      { id: "left", aspectRatioRange: { min: 0.6, max: 0.9 }, sizeWeight: 1 },
      { id: "topRight", aspectRatioRange: { min: 1.2, max: 2.0 }, sizeWeight: 0.8 },
      { id: "bottomRight", aspectRatioRange: { min: 1.2, max: 2.0 }, sizeWeight: 0.8 },
    ]},

    // Polaroid scrapbook collage (5 photos, any ratio)
    { id: "spread-5", templateName: "PolaroidWall", slots: [
      { id: "photo-0", aspectRatioRange: { min: 0.5, max: 2.5 }, sizeWeight: 1 },
      { id: "photo-1", aspectRatioRange: { min: 0.5, max: 2.5 }, sizeWeight: 1 },
      { id: "photo-2", aspectRatioRange: { min: 0.5, max: 2.5 }, sizeWeight: 1 },
      { id: "photo-3", aspectRatioRange: { min: 0.5, max: 2.5 }, sizeWeight: 1 },
      { id: "photo-4", aspectRatioRange: { min: 0.5, max: 2.5 }, sizeWeight: 1 },
    ]},

    // GoldenHour: landscape left + 3 portraits right
    { id: "spread-6", templateName: "GoldenHour", slots: [
      { id: "left", aspectRatioRange: { min: 1.2, max: 2.5 }, sizeWeight: 1 },
      { id: "right-0", aspectRatioRange: { min: 0.6, max: 1.1 }, sizeWeight: 0.8 },
      { id: "right-1", aspectRatioRange: { min: 0.6, max: 1.1 }, sizeWeight: 0.8 },
      { id: "right-2", aspectRatioRange: { min: 0.6, max: 1.1 }, sizeWeight: 0.8 },
    ]},

    // Second journal page
    { id: "spread-7", templateName: "JournalPage", slots: [
      { id: "left", aspectRatioRange: { min: 0.6, max: 0.9 }, sizeWeight: 1 },
      { id: "topRight", aspectRatioRange: { min: 1.2, max: 2.0 }, sizeWeight: 0.8 },
      { id: "bottomRight", aspectRatioRange: { min: 1.2, max: 2.0 }, sizeWeight: 0.8 },
    ]},

    // ContactSheet 3x3 grid (up to 9 photos, near-square)
    { id: "spread-8", templateName: "ContactSheet", slots: Array.from({ length: 9 }).map((_, i) => ({
      id: `photo-${i}`,
      aspectRatioRange: { min: 0.8, max: 1.8 },
      sizeWeight: 1,
    })) },

    // Map page with optional hero
    { id: "spread-9", templateName: "MapPage", slots: [{ id: "hero", aspectRatioRange: { min: 1.0, max: 2.0 }, sizeWeight: 1 }] },

    // Palette cleansers (no photos)
    { id: "spread-10", templateName: "Ephemera", slots: [] },
    { id: "spread-11", templateName: "QuotePage", slots: [] },
    { id: "spread-12", templateName: "InsideBack", slots: [] },
    { id: "spread-13", templateName: "BackCover", slots: [] },
  ];

  return spreads;
}

export async function processPlacementJob(payload: PlacementJobPayload): Promise<void> {
  const photos = await db.photo.findMany({
    where: { sessionId: payload.sessionId, excluded: false },
    orderBy: { displayOrder: "asc" },
  });

  const photoInputs = photos.map((p) => ({
    id: p.id,
    width: p.width ?? 800,
    height: p.height ?? 600,
    pinned: p.pinned,
    displayOrder: p.displayOrder,
  }));

  const spreadTemplates = buildSpreads();
  const placements = assignPhotosToSpreads(photoInputs, spreadTemplates);

  await db.book.update({
    where: { id: payload.bookId },
    data: {
      placementJson: placements,
      status: "ready",
    },
  });

  const queue = createRenderQueue();
  await addRenderJob(queue, "render", {
    kind: "render",
    bookId: payload.bookId,
    quality: "print",
  });
  await queue.close();
}
