import { registerTheme } from "../registry";
import type { ThemeModule } from "../registry";
import HighlandComposer from "./HighlandComposer";
import { buildHighlandSpreads } from "./buildSpreads";
import { getHighlandRenderStyles } from "./renderStyles";

const highlandTheme: ThemeModule = {
  id: "highland",
  name: "Highland",
  description: "A moody mountain field guide — deep forest greens, slate, and misty cream.",
  previewColor: "#1f3528",
  buildSpreads: buildHighlandSpreads,
  SpreadComposer: HighlandComposer,
  renderStyles: getHighlandRenderStyles,
  fonts: [
    "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;1,9..144,300&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;1,8..60,400&family=Inter+Tight:wght@400;500&family=Caveat&family=JetBrains+Mono:wght@400&display=swap",
  ],
};

registerTheme(highlandTheme);
