import { registerTheme } from "../registry";
import type { ThemeModule } from "../registry";
import CityComposer from "./CityComposer";
import { buildCitySpreads } from "./buildSpreads";
import { getCityRenderStyles } from "./renderStyles";

const cityTheme: ThemeModule = {
  id: "city",
  name: "City Lights",
  description: "Urban architecture, neon, and concrete — a sleek modern travel book.",
  previewColor: "#3b4651",
  buildSpreads: buildCitySpreads,
  SpreadComposer: CityComposer,
  renderStyles: getCityRenderStyles,
  fonts: [
    "https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500&family=Fraunces:ital,opsz,wght@0,9..144,300;1,9..144,300&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;1,8..60,400&family=Caveat&family=JetBrains+Mono:wght@400&display=swap",
  ],
  tailwindConfig: {
    colors: `
      paper: '#1c2025',
      'paper-2': '#252b32',
      'paper-3': '#2e353d',
      ink: '#e0e2e5',
      'ink-soft': '#a8b0b0',
      'ink-faded': '#6b7580',
      neon: '#00d4aa',
      'neon-deep': '#00a884',
      concrete: '#8a9299',
      steel: '#4a5560',
      midnight: '#0f1318',
      amber: '#f5a623',
    `,
    fonts: `
      display: ['Fraunces', 'Georgia', 'serif'],
      serif: ['Source Serif 4', 'Georgia', 'serif'],
      sans: ['Inter Tight', 'system-ui', 'sans-serif'],
      script: ['Caveat', 'cursive'],
      mono: ['JetBrains Mono', 'monospace'],
    `,
    bodyBackground: "#1c2025",
  },
};

registerTheme(cityTheme);
