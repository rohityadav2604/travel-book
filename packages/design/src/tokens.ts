export const colorTokens = {
  paper: "#f3e7d1",
  "paper-2": "#ecdcb9",
  "paper-3": "#e3cfa3",
  ink: "#2c1f15",
  "ink-soft": "#4a3526",
  "ink-faded": "#6b4f3a",
  terracotta: "#b9532e",
  "terracotta-deep": "#8b3a1e",
  rust: "#c66a3a",
  ochre: "#c89441",
  mustard: "#d9a441",
  olive: "#6b6b3a",
  "olive-deep": "#4f5028",
  moss: "#7a8442",
  sage: "#9aa57a",
  burgundy: "#6e2a23",
  teal: "#3f6b6b",
} as const;

export const fontFamilyTokens = {
  display: ["DM Serif Display", "Playfair Display", "Georgia", "serif"],
  serif: ["Cormorant Garamond", "Georgia", "serif"],
  sans: ["Cormorant SC", "Cormorant Garamond", "Georgia", "serif"],
  script: ["Caveat", "Homemade Apple", "cursive"],
  hand: ["Homemade Apple", "Caveat", "cursive"],
  mono: ["Special Elite", "Courier Prime", "monospace"],
} as const;

export const shadowTokens = {
  paper: "0 1px 2px rgba(44, 31, 21, 0.08), 0 8px 30px rgba(44, 31, 21, 0.12)",
} as const;

export const cssVariables = {
  "--paper": colorTokens.paper,
  "--paper-2": colorTokens["paper-2"],
  "--paper-3": colorTokens["paper-3"],
  "--ink": colorTokens.ink,
  "--ink-soft": colorTokens["ink-soft"],
  "--ink-faded": colorTokens["ink-faded"],
  "--terracotta": colorTokens.terracotta,
  "--terracotta-deep": colorTokens["terracotta-deep"],
  "--rust": colorTokens.rust,
  "--ochre": colorTokens.ochre,
  "--mustard": colorTokens.mustard,
  "--olive": colorTokens.olive,
  "--olive-deep": colorTokens["olive-deep"],
  "--moss": colorTokens.moss,
  "--sage": colorTokens.sage,
  "--burgundy": colorTokens.burgundy,
  "--teal": colorTokens.teal,
  "--shadow": shadowTokens.paper,
} as const;

export type ColorToken = keyof typeof colorTokens;
export type FontFamilyToken = keyof typeof fontFamilyTokens;
