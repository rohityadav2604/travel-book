import { registerTheme } from "../registry";
import { destinationThemeConfigs } from "./configs";
import { createDestinationTheme } from "./createDestinationTheme";

export { destinationThemeConfigs, getDestinationConfig } from "./configs";
export type { DestinationThemeConfig, DestinationThemeId } from "./types";

for (const config of destinationThemeConfigs) {
  registerTheme(createDestinationTheme(config));
}
