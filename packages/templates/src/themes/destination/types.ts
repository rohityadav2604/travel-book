import type { AssetCredit } from "../registry";

export type DestinationThemeId = "bangkok" | "paris" | "spain";

export type DestinationPalette = {
  paper: string;
  paper2: string;
  paper3: string;
  ink: string;
  inkSoft: string;
  inkFaded: string;
  accent: string;
  accentDeep: string;
  secondary: string;
  secondaryDeep: string;
  highlight: string;
  night: string;
};

export type DestinationFontFamilies = {
  display: string;
  serif: string;
  sans: string;
  script: string;
  mono: string;
};

export type DestinationLabels = {
  eyebrow: string;
  title: string;
  subtitle: string;
  route: string;
  stamp: string;
  coordinates: string;
  heroCaption: string;
  mapCaption: string;
  scrapbookNote: string;
};

export type DestinationThemeConfig = {
  id: DestinationThemeId;
  name: string;
  description: string;
  previewColor: string;
  motif: DestinationThemeId;
  fontUrl: string;
  fonts: DestinationFontFamilies;
  palette: DestinationPalette;
  labels: DestinationLabels;
  assetCredits: AssetCredit[];
};
