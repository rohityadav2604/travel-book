import { registerTheme } from "../registry";
import type { ThemeModule } from "../registry";
import CityComposer from "./CityComposer";
import { buildCitySpreads } from "./buildSpreads";
import { getCityRenderStyles } from "./renderStyles";

const cityTheme: ThemeModule = {
  id: "city",
  name: "City Lights",
  description: "Urban architecture, neon, and concrete — coming soon.",
  previewColor: "#3b4651",
  buildSpreads: buildCitySpreads,
  SpreadComposer: CityComposer,
  renderStyles: getCityRenderStyles,
  fonts: [
    "https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500&display=swap",
  ],
};

registerTheme(cityTheme);
