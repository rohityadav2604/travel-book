import type { SpreadDef } from "../../types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function buildCitySpreads(_photoCount?: number): SpreadDef[] {
  return [
    { id: "cover", templateName: "CityCover", slots: [] },
    { id: "back", templateName: "CityBackCover", slots: [] },
  ];
}
