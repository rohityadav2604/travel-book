import { getBrowser } from "./browser";

export type SpreadRenderInput = {
  html: string;
  width: number;
  height: number;
  quality: "print" | "screen";
};

export async function renderSpread(input: SpreadRenderInput): Promise<Buffer> {
  const browser = await getBrowser();
  const page = await browser.newPage();

  const scale = input.quality === "print" ? 2 : 1;

  await page.setViewportSize({
    width: input.width * scale,
    height: input.height * scale,
  });

  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=Cormorant+SC:wght@400&family=DM+Serif+Display&family=Caveat&family=Special+Elite&display=swap');
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { background: #f3e7d1; }
        </style>
        <script src="https://cdn.tailwindcss.com"></script>
        <script>
          tailwind.config = {
            theme: {
              extend: {
                colors: {
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
                },
                fontFamily: {
                  display: ['DM Serif Display', 'Georgia', 'serif'],
                  serif: ['Cormorant Garamond', 'Georgia', 'serif'],
                  sans: ['Cormorant SC', 'Cormorant Garamond', 'Georgia', 'serif'],
                  script: ['Caveat', 'cursive'],
                  hand: ['Homemade Apple', 'Caveat', 'cursive'],
                  mono: ['Special Elite', 'Courier Prime', 'monospace'],
                },
              },
            },
          };
        </script>
      </head>
      <body>${input.html}</body>
    </html>
  `);

  await page.waitForLoadState("networkidle");

  const pdf = await page.pdf({
    width: input.width,
    height: input.height,
    printBackground: true,
    preferCSSPageSize: false,
  });

  await page.close();
  return Buffer.from(pdf);
}
