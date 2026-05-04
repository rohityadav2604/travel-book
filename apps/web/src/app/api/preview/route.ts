import { db } from "@memorybook/db";
import { assignPhotosToSpreads } from "@memorybook/templates/matcher";
import { getTheme } from "@memorybook/templates";
import { NextResponse } from "next/server";
import { z } from "zod";

const previewSchema = z.object({
  sessionId: z.string().min(1),
  theme: z.string().min(1).refine((id) => {
    try { getTheme(id); return true; } catch { return false; }
  }, { message: "Unknown theme" }),
});

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as unknown;
  const parsed = previewSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { sessionId, theme } = parsed.data;

  const photos = await db.photo.findMany({
    where: { sessionId, excluded: false, status: "ready" },
    orderBy: { displayOrder: "asc" },
  });

  if (photos.length === 0) {
    return NextResponse.json({ error: "No photos found" }, { status: 404 });
  }

  const photoInputs = photos.map((p) => ({
    id: p.id,
    width: p.width ?? 800,
    height: p.height ?? 600,
    pinned: p.pinned,
    displayOrder: p.displayOrder,
  }));

  const themeModule = getTheme(theme);
  const spreadTemplates = themeModule.buildSpreads(photos.length);
  const placements = assignPhotosToSpreads(photoInputs, spreadTemplates);

  // Pick 2 representative spreads: first with photos, and first multi-photo body spread
  const previewSpreads = placements.filter((p) => p.assignments.length > 0).slice(0, 2);

  // Build response with photo URLs
  const photoMap = new Map(photos.map((p) => [p.id, p]));
  const { getPublicUrl } = await import("@memorybook/shared/storage");

  const spreads = previewSpreads.map((placement) => {
    const slots: Record<string, string | undefined> = {};
    const captions: Record<string, string> = {};
    for (const a of placement.assignments) {
      const photo = photoMap.get(a.photoId);
      if (photo?.thumbnailKey) {
        slots[a.slotId] = getPublicUrl("public", photo.thumbnailKey);
      }
      if (photo?.caption) {
        captions[a.slotId] = photo.caption;
      }
    }
    return {
      spreadId: placement.spreadId,
      templateName: placement.templateName,
      slots,
      captions: Object.keys(captions).length > 0 ? captions : undefined,
    };
  });

  return NextResponse.json({ spreads, theme });
}
