import type { PhotoAdjustment, SpreadDef } from "../types";
import type { ComponentType } from "react";

export type SpreadComposerProps = {
  templateName: string;
  slots: Record<string, string | undefined>;
  captions: Record<string, string> | undefined;
  theme?: string | undefined;
  adjustments?: Record<string, PhotoAdjustment> | undefined;
  onAdjust?: ((slotId: string, delta: Partial<PhotoAdjustment>) => void) | undefined;
};

export interface ThemeTailwindConfig {
  colors: string;
  fonts: string;
  bodyBackground: string;
}

export interface ThemeModule {
  id: string;
  name: string;
  description: string;
  previewColor: string;
  buildSpreads: (photoCount: number) => SpreadDef[];
  SpreadComposer: ComponentType<SpreadComposerProps>;
  renderStyles: (quality: "print" | "screen") => string;
  fonts: string[];
  tailwindConfig: ThemeTailwindConfig;
}

const registry = new Map<string, ThemeModule>();

export function registerTheme(theme: ThemeModule): void {
  registry.set(theme.id, theme);
}

export function getTheme(id: string): ThemeModule {
  const theme = registry.get(id);
  if (!theme) {
    throw new Error(`Unknown theme: ${id}`);
  }
  return theme;
}

export function listThemes(): ThemeModule[] {
  return Array.from(registry.values());
}
