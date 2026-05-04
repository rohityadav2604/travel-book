import React from "react";
import ReactDOMServer from "react-dom/server";
import SpreadComposer from "@memorybook/templates/SpreadComposer";

export type SsrRenderInput = {
  templateName: string;
  slots: Record<string, string | undefined>;
  captions: Record<string, string> | undefined;
  width: number;
  height: number;
  quality: "print" | "screen";
  theme?: string;
};

export function renderSpreadToHtml(input: SsrRenderInput): string {
  const element = React.createElement(SpreadComposer, {
    templateName: input.templateName,
    slots: input.slots,
    captions: input.captions,
    theme: input.theme,
  });

  const bodyHtml = ReactDOMServer.renderToStaticMarkup(element);

  const scale = input.quality === "print" ? 4 : 1;

  return `<div style="width:${input.width / scale}px;height:${input.height / scale}px;transform:scale(${scale});transform-origin:top left;">
    ${bodyHtml}
  </div>`;
}
