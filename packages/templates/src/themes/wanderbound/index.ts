import { registerTheme } from "../registry";
import type { ThemeModule } from "../registry";
import WanderboundComposer from "./WanderboundComposer";
import { buildWanderboundSpreads } from "./buildSpreads";
import { getWanderboundRenderStyles } from "./renderStyles";

const wanderboundTheme: ThemeModule = {
  id: "wanderbound",
  name: "Wanderbound",
  description: "A vintage travel journal — warm ambers, terracotta, and handwritten captions.",
  previewColor: "#c89441",
  buildSpreads: buildWanderboundSpreads,
  SpreadComposer: WanderboundComposer,
  renderStyles: getWanderboundRenderStyles,
  fonts: [
    "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=Cormorant+SC:wght@400&family=DM+Serif+Display&family=Caveat&family=Special+Elite&display=swap",
  ],
};

registerTheme(wanderboundTheme);
