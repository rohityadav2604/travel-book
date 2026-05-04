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
  tailwindConfig: {
    colors: `
      paper: '#f3e7d1',
      'paper-2': '#ecdcb9',
      'paper-3': '#e3cfa3',
      ink: '#2c1f15',
      'ink-soft': '#4a3526',
      'ink-faded': '#6b4f3a',
      terracotta: '#b9532e',
      'terracotta-deep': '#8b3a1e',
      rust: '#c66a3a',
      ochre: '#c89441',
      mustard: '#d9a441',
      olive: '#6b6b3a',
      'olive-deep': '#4f5028',
      moss: '#7a8442',
      sage: '#9aa57a',
      burgundy: '#6e2a23',
      teal: '#3f6b6b',
    `,
    fonts: `
      display: ['DM Serif Display', 'Georgia', 'serif'],
      serif: ['Cormorant Garamond', 'Georgia', 'serif'],
      sans: ['Cormorant SC', 'Cormorant Garamond', 'Georgia', 'serif'],
      script: ['Caveat', 'cursive'],
      hand: ['Homemade Apple', 'Caveat', 'cursive'],
      mono: ['Special Elite', 'Courier Prime', 'monospace'],
    `,
    bodyBackground: "#f3e7d1",
  },
};

registerTheme(wanderboundTheme);
