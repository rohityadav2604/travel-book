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

export type DestinationLandmark = "riverTemple" | "ironSeine" | "sunTile";

export type DestinationPattern = "goldRiver" | "bistroPoster" | "cobaltTile";

export type DestinationTicketStyle = "boat" | "metro" | "rail";

export type DestinationRouteStyle = {
  variant: "river" | "seine" | "railCoast";
  marker: "lotus" | "bridge" | "sun";
};

export type DestinationEphemera = {
  primaryTicket: string;
  secondaryTicket: string;
  receiptTitle: string;
  receiptLines: [string, string, string];
  stamp: string;
  note: string;
  smallLabel: string;
  tape: string;
  tapeAlt: string;
  tab: string;
  paper: string;
};

export type DestinationPhotoTreatment = {
  coverFilter: string;
  heroFilter: string;
  scrapbookFilter: string;
  mapFilter: string;
  overlay: string;
};

export type DestinationAssetKit = {
  landmark: DestinationLandmark;
  pattern: DestinationPattern;
  ticketStyle: DestinationTicketStyle;
  routeStyle: DestinationRouteStyle;
  ephemera: DestinationEphemera;
  photoTreatment: DestinationPhotoTreatment;
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
  assetKit: DestinationAssetKit;
  assetCredits: AssetCredit[];
};
