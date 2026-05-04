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
  const note = captions?.note;

  return (
    <div className="relative h-full w-full">
      <ThemeComposer templateName={templateName} slots={slots} captions={captions} />
      {note && (
        <div className="pointer-events-none absolute bottom-8 left-8 max-w-[260px] -rotate-2 bg-paper/85 px-4 py-2 font-script text-2xl leading-tight text-ink shadow-md">
          {note}
        </div>
      )}
    </div>
  );
}
