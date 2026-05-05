import { bangkokAssetCredits, parisAssetCredits, spainAssetCredits } from "./assetCredits";
import type { DestinationThemeConfig } from "./types";

const sharedFontUrl =
  "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600&family=Bodoni+Moda:opsz,wght@6..96,500;6..96,700&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&family=Caveat:wght@500&family=JetBrains+Mono:wght@400&display=swap";

const sharedFonts = {
  display: "'Bodoni Moda', 'DM Serif Display', Georgia, serif",
  serif: "'Source Serif 4', Georgia, serif",
  sans: "'Barlow Condensed', 'Arial Narrow', sans-serif",
  script: "'Caveat', cursive",
  mono: "'JetBrains Mono', 'Special Elite', monospace",
} as const;

export const bangkokThemeConfig: DestinationThemeConfig = {
  id: "bangkok",
  name: "Bangkok",
  description: "Temple gold, river blues, market pinks, and layered night-stamp scraps.",
  previewColor: "#d9a441",
  motif: "bangkok",
  fontUrl: sharedFontUrl,
  fonts: sharedFonts,
  palette: {
    paper: "#f2dcc4",
    paper2: "#e8c99e",
    paper3: "#d9ad69",
    ink: "#251611",
    inkSoft: "#5a3527",
    inkFaded: "#8a604b",
    accent: "#d9a441",
    accentDeep: "#a45d22",
    secondary: "#d9476f",
    secondaryDeep: "#8b2445",
    highlight: "#3f8f8a",
    night: "#1e2630",
  },
  labels: {
    eyebrow: "market nights and river days",
    title: "Bangkok",
    subtitle: "temples, tuk-tuks, and humid gold",
    route: "Chao Phraya / Old City",
    stamp: "BKK",
    coordinates: "13.7563 N / 100.5018 E",
    heroCaption: "The city keeps glowing after sundown.",
    mapCaption: "river line, temple district, night market",
    scrapbookNote: "gold leaf, boat tickets, neon receipts",
  },
  assetCredits: bangkokAssetCredits,
};

export const destinationThemeConfigs: DestinationThemeConfig[] = [
  bangkokThemeConfig,
  {
    id: "paris",
    name: "Paris",
    description: "Bistro red, Seine blue, cream paper, and quiet poster-shop geometry.",
    previewColor: "#a33a35",
    motif: "paris",
    fontUrl: sharedFontUrl,
    fonts: sharedFonts,
    palette: {
      paper: "#f3e4cc",
      paper2: "#e7cfaa",
      paper3: "#d6b780",
      ink: "#211b19",
      inkSoft: "#55433b",
      inkFaded: "#7c6558",
      accent: "#a33a35",
      accentDeep: "#742823",
      secondary: "#2f6173",
      secondaryDeep: "#183f4f",
      highlight: "#c79547",
      night: "#1b2027",
    },
    labels: {
      eyebrow: "cafe receipts and blue-hour walks",
      title: "Paris",
      subtitle: "left bank notes, iron lines, red awnings",
      route: "Seine / Rive Gauche",
      stamp: "PAR",
      coordinates: "48.8566 N / 2.3522 E",
      heroCaption: "A slow walk between windows, bridges, and dinner light.",
      mapCaption: "river bend, bridge walk, cafe corner",
      scrapbookNote: "metro slips, terrace bills, poster paper",
    },
    assetCredits: parisAssetCredits,
  },
  {
    id: "spain",
    name: "Spain",
    description: "Sun-washed paper, saffron, cobalt, tile borders, and rail-ticket scraps.",
    previewColor: "#cf4b2c",
    motif: "spain",
    fontUrl: sharedFontUrl,
    fonts: sharedFonts,
    palette: {
      paper: "#f4dfbd",
      paper2: "#e8c58c",
      paper3: "#d7a45f",
      ink: "#24180f",
      inkSoft: "#5a3920",
      inkFaded: "#866044",
      accent: "#cf4b2c",
      accentDeep: "#8f2c18",
      secondary: "#245f8f",
      secondaryDeep: "#173d62",
      highlight: "#d7a329",
      night: "#20252c",
    },
    labels: {
      eyebrow: "rail tickets and tiled afternoons",
      title: "Spain",
      subtitle: "sun, plazas, coast roads, late dinners",
      route: "Madrid / Andalucia / Coast",
      stamp: "ESP",
      coordinates: "40.4637 N / 3.7492 W",
      heroCaption: "A warm route through plazas, coast air, and orange light.",
      mapCaption: "rail line, old quarters, sea road",
      scrapbookNote: "ceramic edges, train stubs, saffron paper",
    },
    assetCredits: spainAssetCredits,
  },
];

export function getDestinationConfig(id: string | undefined): DestinationThemeConfig {
  return destinationThemeConfigs.find((config) => config.id === id) ?? bangkokThemeConfig;
}
