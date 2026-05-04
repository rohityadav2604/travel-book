import { getBrowser } from "./browser";
import { getTheme } from "@memorybook/templates";

export type SpreadRenderInput = {
  html: string;
  width: number;
  height: number;
  quality: "print" | "screen";
  theme?: string;
};

export async function renderSpread(input: SpreadRenderInput): Promise<Buffer> {
  const browser = await getBrowser();
  const page = await browser.newPage();

  await page.setViewportSize({
    width: input.width,
    height: input.height,
  });

  const theme = input.theme ? getTheme(input.theme) : null;
  const themeStyles = theme ? theme.renderStyles(input.quality) : "";
  const tailwindColors = theme?.tailwindConfig.colors ?? "";
  const tailwindFonts = theme?.tailwindConfig.fonts ?? "";
  const bodyBg = theme?.tailwindConfig.bodyBackground ?? "#f3e7d1";

  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <head>
        ${themeStyles}
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { background: ${bodyBg}; position: relative; width: ${input.width}px; height: ${input.height}px; overflow: hidden; }
          .page { position: relative; width: 600px; height: 600px; background: ${bodyBg}; overflow: hidden; }
        </style>
        <script src="https://cdn.tailwindcss.com"></script>
        <script>
          tailwind.config = {
            theme: {
              extend: {
                colors: { ${tailwindColors} },
                fontFamily: { ${tailwindFonts} },
              },
            },
          };
        </script>
      </head>
      <body>${input.html}</body>
    </html>
  `);

  await page.waitForLoadState("networkidle");
  await page.evaluate(() => document.fonts.ready);

  const pdf = await page.pdf({
    width: input.width,
    height: input.height,
    printBackground: true,
    preferCSSPageSize: false,
  });

  await page.close();
  return Buffer.from(pdf);
}
