import type { SpreadDef } from "../../types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function buildHighlandSpreads(_photoCount?: number): SpreadDef[] {
  const spreads: SpreadDef[] = [
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
    { id: "spread-4", templateName: "HighlandQuote", slots: [] },
    { id: "spread-5", templateName: "HighlandBackCover", slots: [] },
  ];
  return spreads;
}
