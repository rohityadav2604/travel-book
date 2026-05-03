import { assignPhotosToSpreads } from "@memorybook/templates/matcher";
import { db } from "@memorybook/db";
import { createRenderQueue, addRenderJob } from "@memorybook/shared/queue";
import type { PlacementJobPayload } from "@memorybook/shared/validators";

const SPREAD_TEMPLATES = [
  { id: "cover", templateName: "Cover", slots: [] },
  { id: "spread-1", templateName: "GrandVista", slots: [{ id: "hero", aspectRatioRange: { min: 1.2, max: 2.5 }, sizeWeight: 1 }] },
  { id: "spread-2", templateName: "JournalPage", slots: [
    { id: "left", aspectRatioRange: { min: 0.6, max: 0.9 }, sizeWeight: 1 },
    { id: "topRight", aspectRatioRange: { min: 1.2, max: 2.0 }, sizeWeight: 0.8 },
    { id: "bottomRight", aspectRatioRange: { min: 1.2, max: 2.0 }, sizeWeight: 0.8 },
  ]},
  { id: "spread-3", templateName: "GrandVista", slots: [{ id: "hero", aspectRatioRange: { min: 1.2, max: 2.5 }, sizeWeight: 1 }] },
  { id: "spread-4", templateName: "JournalPage", slots: [
    { id: "left", aspectRatioRange: { min: 0.6, max: 0.9 }, sizeWeight: 1 },
    { id: "topRight", aspectRatioRange: { min: 1.2, max: 2.0 }, sizeWeight: 0.8 },
    { id: "bottomRight", aspectRatioRange: { min: 1.2, max: 2.0 }, sizeWeight: 0.8 },
  ]},
];

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

  const placements = assignPhotosToSpreads(photoInputs, SPREAD_TEMPLATES);

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
