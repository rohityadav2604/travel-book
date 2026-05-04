// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getCityRenderStyles(_quality?: "print" | "screen"): string {
  return `
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500&family=Fraunces:ital,opsz,wght@0,9..144,300;1,9..144,300&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;1,8..60,400&family=Caveat&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet">
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { background: #1c2025; position: relative; width: 100%; height: 100%; overflow: hidden; }
      .page { position: relative; width: 600px; height: 600px; background: #1c2025; overflow: hidden; }
      .photo { position: relative; overflow: hidden; background: #0f1318; box-shadow: 0 1px 2px rgba(0,0,0,.2), 0 8px 24px rgba(0,0,0,.35); }
      .c-display { font-family: 'Fraunces', Georgia, serif; font-weight: 300; }
      .c-serif { font-family: 'Source Serif 4', Georgia, serif; font-weight: 400; }
      .c-sans { font-family: 'Inter Tight', 'Helvetica Neue', system-ui, sans-serif; font-weight: 400; }
      .c-mono { font-family: 'JetBrains Mono', monospace; font-weight: 400; }
      .c-script { font-family: 'Caveat', cursive; }
      .c-caps { font-family: 'Inter Tight', sans-serif; letter-spacing: .22em; text-transform: uppercase; font-weight: 500; font-size: 11px; }
    </style>
  `;
}
