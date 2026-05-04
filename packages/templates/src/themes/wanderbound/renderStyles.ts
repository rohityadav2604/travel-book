// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getWanderboundRenderStyles(_quality?: "print" | "screen"): string {
  return `
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=Cormorant+SC:wght@400&family=DM+Serif+Display&family=Caveat&family=Special+Elite&display=swap" rel="stylesheet">
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { background: #f3e7d1; position: relative; width: 100%; height: 100%; overflow: hidden; }
      .page { position: relative; width: 600px; height: 600px; background: #f3e7d1; overflow: hidden; }
      .paper-texture { position: absolute; inset: 0; background-image: radial-gradient(ellipse at 20% 15%, rgba(139,90,43,.10), transparent 40%), radial-gradient(ellipse at 80% 85%, rgba(139,90,43,.08), transparent 40%), radial-gradient(ellipse at 50% 50%, rgba(255,240,210,.25), transparent 60%); pointer-events: none; }
      .paper-grain { position: absolute; inset: 0; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); background-size: 200px 200px; mix-blend-mode: multiply; opacity: 0.35; pointer-events: none; }
      .paper-edge { position: absolute; inset: 0; box-shadow: inset 0 0 60px rgba(110,70,30,.18), inset 0 0 12px rgba(110,70,30,.12); pointer-events: none; }
      .photo { position: absolute; background: #2a2017; box-shadow: 0 1px 2px rgba(44,31,21,.08), 0 8px 30px rgba(44,31,21,.12); overflow: hidden; }
      .photo > div:first-child { position: absolute; inset: 0; background-size: cover; background-position: center; filter: saturate(.85) contrast(.95) sepia(.18) brightness(.98); }
      .f-display { font-family: 'DM Serif Display', Georgia, serif; }
      .f-serif { font-family: 'Cormorant Garamond', Georgia, serif; }
      .f-script { font-family: 'Caveat', cursive; }
      .f-mono { font-family: 'Special Elite', 'Courier Prime', monospace; }
      .f-sans { font-family: 'Cormorant SC', 'Cormorant Garamond', Georgia, serif; }
      .f-hand { font-family: 'Homemade Apple', 'Caveat', cursive; }
      .smallcaps { font-family: 'Cormorant SC', 'Cormorant Garamond', Georgia, serif; text-transform: uppercase; letter-spacing: 0.2em; }
      .page-num { position: absolute; bottom: 18px; left: 50%; transform: translateX(-50%); font-family: 'Special Elite', monospace; font-size: 10px; letter-spacing: 0.15em; color: rgba(74,53,38,0.5); }
      .dropcap::first-letter { float: left; font-family: 'DM Serif Display', Georgia, serif; font-size: 5.2em; line-height: 0.8; margin-right: 8px; margin-top: 4px; color: #b9532e; font-style: italic; }
    </style>
  `;
}
