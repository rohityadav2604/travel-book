import { describe, expect, it } from "vitest";
import { assignPhotosToSpreads } from "../../matcher";
import { getTheme } from "../registry";
import { destinationThemeConfigs } from "./configs";
import "./index";

const destinationIds = ["bangkok", "paris", "spain"] as const;

function photos(count: number): Array<{ id: string; width: number; height: number; pinned: boolean; displayOrder: number }> {
  return Array.from({ length: count }, (_, index) => ({
    id: `photo-${index}`,
    width: index % 3 === 0 ? 900 : 1400,
    height: index % 3 === 0 ? 1200 : 900,
    pinned: false,
    displayOrder: index,
  }));
}

describe("destination themes", () => {
  it.each(destinationIds)("registers %s with enough spread capacity", (themeId) => {
    const theme = getTheme(themeId);
    const spreads = theme.buildSpreads(30);
    const capacity = spreads.reduce((sum, spread) => sum + spread.slots.length, 0);

    expect(theme.assetCredits?.length).toBeGreaterThan(0);
    expect(spreads.map((spread) => spread.templateName)).toContain("DestinationScrapbook");
    expect(capacity).toBeGreaterThanOrEqual(30);
  });

  it.each(destinationIds)("places a 30-photo book for %s without unknown templates", (themeId) => {
    const theme = getTheme(themeId);
    const placements = assignPhotosToSpreads(photos(30), theme.buildSpreads(30));
    const assignedCount = placements.reduce((sum, placement) => sum + placement.assignments.length, 0);

    expect(assignedCount).toBe(30);
    expect(placements.some((placement) => placement.templateName === "DestinationCover")).toBe(true);
    expect(placements.some((placement) => placement.templateName === "DestinationMap")).toBe(true);
  });

  it.each(destinationThemeConfigs)("defines a complete asset kit for $id", (config) => {
    expect(config.assetKit.landmark).toBeTruthy();
    expect(config.assetKit.pattern).toBeTruthy();
    expect(config.assetKit.ticketStyle).toBeTruthy();
    expect(config.assetKit.routeStyle.variant).toBeTruthy();
    expect(config.assetKit.routeStyle.marker).toBeTruthy();
    expect(config.assetKit.ephemera.receiptLines).toHaveLength(3);
    expect(config.assetKit.photoTreatment.coverFilter).toContain("saturate");
    expect(config.assetKit.photoTreatment.heroFilter).toContain("brightness");
  });
});
