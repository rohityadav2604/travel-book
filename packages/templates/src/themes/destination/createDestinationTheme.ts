import type { ThemeModule } from "../registry";
import { buildDestinationSpreads } from "./buildSpreads";
import DestinationComposer from "./DestinationComposer";
import { createDestinationRenderStyles } from "./renderStyles";
import type { DestinationThemeConfig } from "./types";

function buildTailwindColors(config: DestinationThemeConfig): string {
  const { palette } = config;

  return `
    paper: '${palette.paper}',
    'paper-2': '${palette.paper2}',
    'paper-3': '${palette.paper3}',
    ink: '${palette.ink}',
    'ink-soft': '${palette.inkSoft}',
    'ink-faded': '${palette.inkFaded}',
    accent: '${palette.accent}',
    'accent-deep': '${palette.accentDeep}',
    secondary: '${palette.secondary}',
    'secondary-deep': '${palette.secondaryDeep}',
    highlight: '${palette.highlight}',
    night: '${palette.night}',
  `;
}

function buildTailwindFonts(): string {
  return `
    display: ['Bodoni Moda', 'DM Serif Display', 'Georgia', 'serif'],
    serif: ['Source Serif 4', 'Georgia', 'serif'],
    sans: ['Barlow Condensed', 'Arial Narrow', 'sans-serif'],
    script: ['Caveat', 'cursive'],
    mono: ['JetBrains Mono', 'Special Elite', 'monospace'],
  `;
}

export function createDestinationTheme(config: DestinationThemeConfig): ThemeModule {
  return {
    id: config.id,
    name: config.name,
    description: config.description,
    previewColor: config.previewColor,
    assetCredits: config.assetCredits,
    buildSpreads: buildDestinationSpreads,
    SpreadComposer: DestinationComposer,
    renderStyles: createDestinationRenderStyles(config),
    fonts: [config.fontUrl],
    tailwindConfig: {
      colors: buildTailwindColors(config),
      fonts: buildTailwindFonts(),
      bodyBackground: config.palette.paper,
    },
  };
}
