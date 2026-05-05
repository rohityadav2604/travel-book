import type { DestinationThemeConfig } from "./types";

export function createDestinationRenderStyles(config: DestinationThemeConfig): (quality?: "print" | "screen") => string {
  return function getDestinationRenderStyles(): string {
    const { palette, fontUrl } = config;

    return `
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="${fontUrl}" rel="stylesheet">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: ${palette.paper}; position: relative; width: 100%; height: 100%; overflow: hidden; }
        .page { position: relative; width: 600px; height: 600px; background: ${palette.paper}; overflow: hidden; }
        .photo { position: relative; overflow: hidden; background: ${palette.ink}; box-shadow: 0 1px 2px rgba(0,0,0,.12), 0 10px 24px rgba(0,0,0,.16); }
        .d-display { font-family: 'Bodoni Moda', 'DM Serif Display', Georgia, serif; font-weight: 700; }
        .d-serif { font-family: 'Source Serif 4', Georgia, serif; font-weight: 400; }
        .d-sans { font-family: 'Barlow Condensed', 'Arial Narrow', sans-serif; font-weight: 600; letter-spacing: .18em; text-transform: uppercase; }
        .d-mono { font-family: 'JetBrains Mono', 'Special Elite', monospace; font-weight: 400; }
        .d-script { font-family: 'Caveat', cursive; }
      </style>
    `;
  };
}
