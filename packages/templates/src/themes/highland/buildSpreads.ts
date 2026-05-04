import type { SpreadDef } from "../../types";
import { buildDynamicSpreads, MOSAIC_GRID_CAPACITY } from "../../lib/buildDynamicSpreads";

export function buildHighlandSpreads(photoCount: number): SpreadDef[] {
  const bodySpreads: SpreadDef[] = [
    { id: "cover", templateName: "HighlandCover", slots: [] },
    { id: "spread-1", templateName: "HighlandHero", slots: [{ id: "hero", aspectRatioRange: { min: 1.2, max: 2.5 }, sizeWeight: 2 }] },
    { id: "spread-2", templateName: "HighlandGrid", slots: [
      { id: "left", aspectRatioRange: { min: 0.6, max: 1.2 }, sizeWeight: 1.2 },
      { id: "topRight", aspectRatioRange: { min: 1.0, max: 2.0 }, sizeWeight: 0.8 },
      { id: "bottomRight", aspectRatioRange: { min: 1.0, max: 2.0 }, sizeWeight: 0.8 },
    ]},
    { id: "spread-3", templateName: "HighlandJournal", slots: [
      { id: "left", aspectRatioRange: { min: 0.6, max: 0.9 }, sizeWeight: 1 },
      { id: "topRight", aspectRatioRange: { min: 1.2, max: 2.0 }, sizeWeight: 0.8 },
      { id: "bottomRight", aspectRatioRange: { min: 1.2, max: 2.0 }, sizeWeight: 0.8 },
    ]},
  ];

  const endingSpreads: SpreadDef[] = [
    { id: "spread-4", templateName: "HighlandQuote", slots: [] },
    { id: "spread-5", templateName: "HighlandBackCover", slots: [] },
  ];

  return buildDynamicSpreads(bodySpreads, photoCount, "MosaicGrid", MOSAIC_GRID_CAPACITY, endingSpreads);
}
