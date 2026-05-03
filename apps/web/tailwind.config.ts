import { colorTokens, fontFamilyTokens, shadowTokens } from "@memorybook/design/tokens";
import type { Config } from "tailwindcss";

const config = {
  content: {
    relative: true,
    files: [
      "./src/**/*.{ts,tsx}",
      "../../packages/design/src/**/*.{ts,tsx}",
      "../../packages/templates/src/**/*.{ts,tsx}",
    ],
  },
  theme: {
    extend: {
      colors: colorTokens,
      fontFamily: {
        display: [...fontFamilyTokens.display],
        serif: [...fontFamilyTokens.serif],
        sans: [...fontFamilyTokens.sans],
        script: [...fontFamilyTokens.script],
        hand: [...fontFamilyTokens.hand],
        mono: [...fontFamilyTokens.mono],
      },
      boxShadow: shadowTokens,
    },
  },
  plugins: [],
} satisfies Config;

export default config;
