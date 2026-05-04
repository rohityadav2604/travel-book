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
  const tailwindColors = theme?.id === "highland"
    ? `
      paper: '#ecebe2',
      'paper-2': '#dcdbcf',
      'paper-3': '#d4d8d2',
      bone: '#f3f1e8',
      pine: '#1f3528',
      forest: '#2c4a37',
      moss: '#4a6346',
      sage: '#8a9a7e',
      fern: '#5e7858',
      lichen: '#b8c2a3',
      slate: '#3b4651',
      stone: '#6b7280',
      fog: '#a8b0b0',
      charcoal: '#1c2025',
      river: '#4a6878',
      glacier: '#7a99a8',
      ink: '#1a2218',
      'ink-soft': '#3a4438',
      'ink-faded': '#6b7568',
      rust: '#8a5a3a',
    `
    : `
      paper: '#f3e7d1',
      'paper-2': '#ecdcb9',
      'paper-3': '#e3cfa3',
      ink: '#2c1f15',
      'ink-soft': '#4a3526',
      'ink-faded': '#6b4f3a',
      terracotta: '#b9532e',
      'terracotta-deep': '#8b3a1e',
      rust: '#c66a3a',
      ochre: '#c89441',
      mustard: '#d9a441',
      olive: '#6b6b3a',
      'olive-deep': '#4f5028',
      moss: '#7a8442',
      sage: '#9aa57a',
      burgundy: '#6e2a23',
      teal: '#3f6b6b',
    `;

  const tailwindFonts = theme?.id === "highland"
    ? `
      display: ['Fraunces', 'Georgia', 'serif'],
      serif: ['Source Serif 4', 'Georgia', 'serif'],
      sans: ['Inter Tight', 'system-ui', 'sans-serif'],
      script: ['Caveat', 'cursive'],
      mono: ['JetBrains Mono', 'monospace'],
    `
    : `
      display: ['DM Serif Display', 'Georgia', 'serif'],
      serif: ['Cormorant Garamond', 'Georgia', 'serif'],
      sans: ['Cormorant SC', 'Cormorant Garamond', 'Georgia', 'serif'],
      script: ['Caveat', 'cursive'],
      hand: ['Homemade Apple', 'Caveat', 'cursive'],
      mono: ['Special Elite', 'Courier Prime', 'monospace'],
    `;

  const bodyBg = theme?.id === "highland" ? "#ecebe2" : "#f3e7d1";

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
