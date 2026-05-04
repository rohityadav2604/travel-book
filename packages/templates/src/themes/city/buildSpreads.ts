import type { SpreadDef } from "../../types";
import { buildDynamicSpreads, MOSAIC_GRID_CAPACITY } from "../../lib/buildDynamicSpreads";

export function buildCitySpreads(photoCount: number): SpreadDef[] {
  const bodySpreads: SpreadDef[] = [
    { id: "cover", templateName: "CityCover", slots: [] },
    { id: "spread-1", templateName: "CityHero", slots: [{ id: "hero", aspectRatioRange: { min: 1.2, max: 2.5 }, sizeWeight: 2 }] },
    { id: "spread-2", templateName: "CityMap", slots: [{ id: "hero", aspectRatioRange: { min: 1.0, max: 2.0 }, sizeWeight: 1 }] },
  ];

  const endingSpreads: SpreadDef[] = [];

  return buildDynamicSpreads(bodySpreads, photoCount, "MosaicGrid", MOSAIC_GRID_CAPACITY, endingSpreads);
}
