import React from "react";
import { getTheme } from "./themes/registry";
import "./themes/wanderbound/index";
import "./themes/highland/index";
import "./themes/city/index";

export type SpreadComposerProps = {
  templateName: string;
  slots: Record<string, string | undefined>;
  captions: Record<string, string> | undefined;
  theme?: string | undefined;
};

export default function SpreadComposer({ templateName, slots, captions, theme = "wanderbound" }: SpreadComposerProps): React.ReactElement {
  const themeModule = getTheme(theme);
  const ThemeComposer = themeModule.SpreadComposer;
  return <ThemeComposer templateName={templateName} slots={slots} captions={captions} />;
}
