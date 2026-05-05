import { buildDynamicSpreads, MOSAIC_GRID_CAPACITY } from "../../lib/buildDynamicSpreads";
import type { SpreadDef } from "../../types";

export function buildDestinationSpreads(photoCount: number): SpreadDef[] {
  const bodySpreads: SpreadDef[] = [
    {
      id: "cover",
      templateName: "DestinationCover",
      slots: [{ id: "hero", aspectRatioRange: { min: 0.65, max: 2.5 }, sizeWeight: 2 }],
    },
    {
      id: "spread-1",
      templateName: "DestinationHero",
      slots: [{ id: "hero", aspectRatioRange: { min: 1.1, max: 2.7 }, sizeWeight: 2 }],
    },
    {
      id: "spread-2",
      templateName: "DestinationScrapbook",
      slots: [
        { id: "hero", aspectRatioRange: { min: 0.7, max: 1.8 }, sizeWeight: 1.8 },
        { id: "detail", aspectRatioRange: { min: 1.0, max: 2.6 }, sizeWeight: 1 },
        { id: "portrait", aspectRatioRange: { min: 0.45, max: 1.2 }, sizeWeight: 1 },
        { id: "memory", aspectRatioRange: { min: 0.7, max: 2.2 }, sizeWeight: 1 },
      ],
    },
    {
      id: "spread-3",
      templateName: "DestinationMap",
      slots: [{ id: "hero", aspectRatioRange: { min: 1.0, max: 2.5 }, sizeWeight: 1.2 }],
    },
  ];

  const endingSpreads: SpreadDef[] = [
    { id: "quote", templateName: "DestinationQuote", slots: [] },
    { id: "inside-back", templateName: "DestinationInsideBack", slots: [] },
    { id: "back-cover", templateName: "DestinationBackCover", slots: [] },
  ];

  return buildDynamicSpreads(bodySpreads, photoCount, "MosaicGrid", MOSAIC_GRID_CAPACITY, endingSpreads);
}
