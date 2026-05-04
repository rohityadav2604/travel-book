import { assignPhotosToSpreads } from "@memorybook/templates/matcher";
import { getTheme } from "@memorybook/templates";
import { db } from "@memorybook/db";
import { createRenderQueue, addRenderJob } from "@memorybook/shared/queue";
import type { PlacementJobPayload } from "@memorybook/shared/validators";

export async function processPlacementJob(payload: PlacementJobPayload): Promise<void> {
  const photos = await db.photo.findMany({
    where: { sessionId: payload.sessionId, excluded: false, status: "ready" },
    orderBy: { displayOrder: "asc" },
  });

  const photoInputs = photos.map((p) => ({
    id: p.id,
    width: p.width ?? 800,
    height: p.height ?? 600,
    pinned: p.pinned,
    displayOrder: p.displayOrder,
  }));

  const theme = getTheme(payload.theme);
  const spreadTemplates = theme.buildSpreads(photos.length);
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
