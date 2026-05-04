// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getCityRenderStyles(_quality?: "print" | "screen"): string {
  return `
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500&display=swap" rel="stylesheet">
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { background: #1c2025; position: relative; width: 100%; height: 100%; overflow: hidden; }
      .page { position: relative; width: 600px; height: 600px; background: #1c2025; overflow: hidden; }
    </style>
  `;
}
