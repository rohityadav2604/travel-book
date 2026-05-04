// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getHighlandRenderStyles(_quality?: "print" | "screen"): string {
  return `
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;1,9..144,300&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;1,8..60,400&family=Inter+Tight:wght@400;500&family=Caveat&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet">
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { background: #ecebe2; position: relative; width: 100%; height: 100%; overflow: hidden; }
      .page { position: relative; width: 600px; height: 600px; background: #ecebe2; overflow: hidden; }
      .m-display { font-family: 'Fraunces', 'Cormorant Garamond', Georgia, serif; font-weight: 300; }
      .m-serif { font-family: 'Source Serif 4', 'Cormorant Garamond', Georgia, serif; font-weight: 400; }
      .m-sans { font-family: 'Inter Tight', 'Helvetica Neue', system-ui, sans-serif; font-weight: 400; }
      .m-mono { font-family: 'JetBrains Mono', 'Special Elite', monospace; font-weight: 400; }
      .m-script { font-family: 'Caveat', cursive; }
      .m-caps { font-family: 'Inter Tight', sans-serif; letter-spacing: .22em; text-transform: uppercase; font-weight: 500; font-size: 11px; }
      .m-pagenum { position: absolute; bottom: 24px; font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: .25em; color: #6b7568; }
      .photo { position: relative; overflow: hidden; background: #1a2218; box-shadow: 0 1px 2px rgba(20,30,20,.1), 0 14px 30px rgba(20,30,20,.18); }
      .photo-inner { position: absolute; inset: 0; background-size: cover; background-position: center; filter: contrast(.95) saturate(.85); }
      .paper-tex { position: absolute; inset: 0; background-image: radial-gradient(ellipse at 50% 50%, rgba(255,255,250,.5), transparent 70%), radial-gradient(ellipse at 20% 80%, rgba(60,80,60,.06), transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(60,80,60,.05), transparent 50%); pointer-events: none; }
      .grain { position: absolute; inset: 0; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.10, 0 0 0 0 0.14, 0 0 0 0 0.08, 0 0 0 0.14 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); mix-blend-mode: multiply; opacity: .25; pointer-events: none; }
      .edge { position: absolute; inset: 0; box-shadow: inset 0 0 50px rgba(40,55,40,.12); pointer-events: none; }
    </style>
  `;
}
