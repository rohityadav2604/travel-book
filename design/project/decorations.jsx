// Decorative SVG components — stamps, tape, botanicals, maps
// All in 1970s warm earthy palette

const Stamp = ({ country = "ITALIA", value = "L.250", color = "terra", style }) => {
  const palette = {
    terra: { bg: "#b9532e", ink: "#f3e7d1", accent: "#8b3a1e" },
    olive: { bg: "#6b6b3a", ink: "#f3e7d1", accent: "#4f5028" },
    mustard: { bg: "#d9a441", ink: "#3a2a1c", accent: "#a47828" },
    burgundy: { bg: "#6e2a23", ink: "#f3e7d1", accent: "#4a1a14" },
  }[color] || { bg: "#b9532e", ink: "#f3e7d1", accent: "#8b3a1e" };

  return (
    <div style={{ display: "inline-block", position: "relative", padding: 4, background: "#f3e7d1", filter: "drop-shadow(0 2px 3px rgba(0,0,0,.2))", ...style }}>
      {/* perforated edges via radial gradient */}
      <div style={{
        position: "absolute", inset: -3,
        background: "radial-gradient(circle, #f3e7d1 2.5px, transparent 3px) 0 0/7px 7px",
        zIndex: -1,
      }} />
      <svg width="80" height="100" viewBox="0 0 80 100" style={{ display: "block" }}>
        <rect x="0" y="0" width="80" height="100" fill={palette.bg} />
        <rect x="4" y="4" width="72" height="92" fill="none" stroke={palette.ink} strokeWidth="0.5" opacity=".6" />
        {/* abstract scene */}
        <circle cx="40" cy="38" r="16" fill="none" stroke={palette.ink} strokeWidth="1" opacity=".7" />
        <path d={`M 16 60 Q 30 50 40 55 Q 55 62 64 56`} fill="none" stroke={palette.ink} strokeWidth="1" opacity=".7" />
        <path d={`M 20 65 L 30 55 L 40 62 L 52 50 L 60 60`} fill="none" stroke={palette.ink} strokeWidth="0.8" opacity=".6" />
        <text x="40" y="80" textAnchor="middle" fill={palette.ink} fontSize="7" fontFamily="Cormorant SC, serif" letterSpacing="1">{country}</text>
        <text x="40" y="92" textAnchor="middle" fill={palette.ink} fontSize="6" fontFamily="Special Elite, monospace">{value}</text>
      </svg>
    </div>
  );
};

const PassportStamp = ({ city = "ROMA", date = "12.VI.74", color = "terra", shape = "rect", rotate = -8, style }) => {
  const colors = {
    terra: "#8b3a1e",
    olive: "#4f5028",
    teal: "#3f6b6b",
    burgundy: "#6e2a23",
  };
  const c = colors[color] || colors.terra;
  if (shape === "circle") {
    return (
      <div style={{
        width: 90, height: 90, borderRadius: "50%",
        border: `2px solid ${c}`, color: c,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        fontFamily: "Special Elite, monospace", fontSize: 9, letterSpacing: ".15em",
        textTransform: "uppercase", opacity: .78, mixBlendMode: "multiply",
        transform: `rotate(${rotate}deg)`, ...style,
      }}>
        <div style={{ borderTop: `1px solid ${c}`, borderBottom: `1px solid ${c}`, padding: "2px 0", width: "70%", textAlign: "center", fontSize: 11 }}>{city}</div>
        <div style={{ marginTop: 4, fontSize: 8 }}>{date}</div>
      </div>
    );
  }
  return (
    <div style={{
      border: `2px solid ${c}`, color: c,
      padding: "6px 14px", fontFamily: "Special Elite, monospace",
      fontSize: 11, letterSpacing: ".15em", textTransform: "uppercase",
      opacity: .82, mixBlendMode: "multiply",
      transform: `rotate(${rotate}deg)`,
      display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 2,
      ...style,
    }}>
      <div>{city}</div>
      <div style={{ fontSize: 9, letterSpacing: ".1em" }}>{date}</div>
    </div>
  );
};

const Tape = ({ width = 90, color = "mustard", rotate = -3, style }) => {
  const palettes = {
    mustard: ["rgba(217,164,65,.65)", "rgba(184,138,52,.6)"],
    cream: ["rgba(243,231,209,.75)", "rgba(225,210,180,.7)"],
    terra: ["rgba(185,83,46,.6)", "rgba(140,60,30,.55)"],
    olive: ["rgba(122,132,66,.6)", "rgba(80,86,40,.55)"],
  };
  const [a, b] = palettes[color] || palettes.mustard;
  return (
    <div style={{
      width, height: 26,
      background: `linear-gradient(180deg, ${a}, ${b})`,
      boxShadow: "0 2px 4px rgba(0,0,0,.10)",
      transform: `rotate(${rotate}deg)`,
      position: "relative",
      ...style,
    }}>
      <div style={{ position: "absolute", inset: 0,
        background: "repeating-linear-gradient(90deg, transparent 0 6px, rgba(255,255,255,.15) 6px 7px)" }} />
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: "linear-gradient(90deg, rgba(255,255,255,.3), transparent)" }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 4, background: "linear-gradient(-90deg, rgba(255,255,255,.3), transparent)" }} />
    </div>
  );
};

const Botanical = ({ size = 120, rotate = 0, style }) => (
  <svg width={size} height={size * 1.4} viewBox="0 0 120 168" style={{ transform: `rotate(${rotate}deg)`, ...style }}>
    {/* pressed flower / sprig */}
    <path d="M60 10 Q60 60 60 158" stroke="#6b6b3a" strokeWidth="1.2" fill="none" opacity=".75" />
    {/* leaves */}
    {[20, 45, 70, 95, 120].map((y, i) => (
      <g key={i} opacity=".75">
        <path d={`M60 ${y} Q ${i % 2 ? 30 : 90} ${y - 8} ${i % 2 ? 18 : 102} ${y + 4}`}
          stroke="#6b6b3a" strokeWidth="1" fill="none" />
        <ellipse cx={i % 2 ? 22 : 98} cy={y + 2} rx="14" ry="5"
          fill="#7a8442" opacity=".55" transform={`rotate(${i % 2 ? -18 : 18} ${i % 2 ? 22 : 98} ${y + 2})`} />
      </g>
    ))}
    {/* tiny flowers */}
    <g transform="translate(60 14)">
      {[0, 72, 144, 216, 288].map(a => (
        <ellipse key={a} cx="0" cy="-5" rx="2.5" ry="4" fill="#b9532e" opacity=".7" transform={`rotate(${a})`} />
      ))}
      <circle r="1.5" fill="#d9a441" />
    </g>
  </svg>
);

const FernSprig = ({ size = 80, rotate = 0, style }) => (
  <svg width={size} height={size * 2} viewBox="0 0 80 160" style={{ transform: `rotate(${rotate}deg)`, ...style }}>
    <path d="M40 5 Q40 80 40 158" stroke="#4f5028" strokeWidth="1" fill="none" opacity=".7" />
    {Array.from({ length: 14 }).map((_, i) => {
      const y = 12 + i * 10;
      const len = 28 - i * 1.4;
      return (
        <g key={i} opacity={.7}>
          <path d={`M40 ${y} Q ${40 - len * 0.6} ${y - 4} ${40 - len} ${y + 2}`} stroke="#6b7a3a" strokeWidth="0.8" fill="none" />
          <path d={`M40 ${y} Q ${40 + len * 0.6} ${y - 4} ${40 + len} ${y + 2}`} stroke="#6b7a3a" strokeWidth="0.8" fill="none" />
        </g>
      );
    })}
  </svg>
);

const Compass = ({ size = 100, style }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={style}>
    <circle cx="50" cy="50" r="46" fill="none" stroke="#8b3a1e" strokeWidth="1.5" opacity=".7" />
    <circle cx="50" cy="50" r="38" fill="none" stroke="#8b3a1e" strokeWidth="0.6" opacity=".5" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map(a => (
      <line key={a} x1="50" y1="50" x2="50" y2="8"
        stroke="#8b3a1e" strokeWidth={a % 90 === 0 ? 1.2 : 0.5}
        opacity={a % 90 === 0 ? .8 : .4}
        transform={`rotate(${a} 50 50)`} />
    ))}
    {/* needle */}
    <polygon points="50,14 54,50 50,46 46,50" fill="#b9532e" opacity=".85" />
    <polygon points="50,86 54,50 50,54 46,50" fill="#2c1f15" opacity=".7" />
    <circle cx="50" cy="50" r="3" fill="#2c1f15" />
    {/* N E S W */}
    <text x="50" y="6" textAnchor="middle" fontSize="8" fill="#8b3a1e" fontFamily="Cormorant SC, serif" fontWeight="600">N</text>
    <text x="96" y="53" textAnchor="middle" fontSize="8" fill="#8b3a1e" fontFamily="Cormorant SC, serif">E</text>
    <text x="50" y="98" textAnchor="middle" fontSize="8" fill="#8b3a1e" fontFamily="Cormorant SC, serif">S</text>
    <text x="4" y="53" textAnchor="middle" fontSize="8" fill="#8b3a1e" fontFamily="Cormorant SC, serif">W</text>
  </svg>
);

const Flourish = ({ width = 200, color = "var(--terracotta)", style }) => (
  <svg width={width} height="20" viewBox="0 0 200 20" style={style}>
    <path d="M0 10 L 80 10" stroke={color} strokeWidth="0.8" opacity=".5" />
    <path d="M120 10 L 200 10" stroke={color} strokeWidth="0.8" opacity=".5" />
    <g transform="translate(100 10)">
      <circle r="2.5" fill={color} opacity=".8" />
      <circle r="6" fill="none" stroke={color} strokeWidth="0.6" opacity=".5" />
      <path d="M-14 0 Q-10 -3 -7 0 Q-10 3 -14 0" fill={color} opacity=".7" />
      <path d="M14 0 Q10 -3 7 0 Q10 3 14 0" fill={color} opacity=".7" />
    </g>
  </svg>
);

const Ticket = ({ from = "ROMA", to = "FIRENZE", date = "12 GIU 1974", seat = "14B", style }) => (
  <div style={{
    background: "#ecdcb9",
    border: "1px dashed #6b4f3a",
    padding: "10px 18px",
    fontFamily: "Special Elite, monospace",
    fontSize: 10,
    letterSpacing: ".12em",
    color: "#4a3526",
    position: "relative",
    display: "flex", alignItems: "center", gap: 16,
    boxShadow: "0 4px 10px rgba(44,31,21,.15)",
    ...style,
  }}>
    <div style={{ position: "absolute", left: -6, top: "50%", transform: "translateY(-50%)", width: 12, height: 12, borderRadius: "50%", background: "#f3e7d1" }} />
    <div style={{ position: "absolute", right: -6, top: "50%", transform: "translateY(-50%)", width: 12, height: 12, borderRadius: "50%", background: "#f3e7d1" }} />
    <div>
      <div style={{ fontSize: 7, opacity: .7 }}>FROM</div>
      <div style={{ fontSize: 14, fontWeight: 600 }}>{from}</div>
    </div>
    <div style={{ fontSize: 18, color: "#b9532e" }}>→</div>
    <div>
      <div style={{ fontSize: 7, opacity: .7 }}>TO</div>
      <div style={{ fontSize: 14, fontWeight: 600 }}>{to}</div>
    </div>
    <div style={{ borderLeft: "1px dashed #6b4f3a", paddingLeft: 12, marginLeft: 4 }}>
      <div style={{ fontSize: 7, opacity: .7 }}>DATE</div>
      <div>{date}</div>
    </div>
    <div>
      <div style={{ fontSize: 7, opacity: .7 }}>SEAT</div>
      <div>{seat}</div>
    </div>
  </div>
);

const HandDrawnMap = ({ width = 460, height = 320, style }) => (
  <svg width={width} height={height} viewBox="0 0 460 320" style={style}>
    {/* coastline */}
    <path d="M20 80 Q 60 60 100 90 T 180 100 Q 220 80 260 110 T 340 130 Q 380 110 430 140"
      stroke="#3f6b6b" strokeWidth="1.4" fill="none" opacity=".7" />
    <path d="M20 220 Q 80 200 130 230 T 240 240 Q 290 220 340 250 T 440 260"
      stroke="#3f6b6b" strokeWidth="1.4" fill="none" opacity=".7" />
    {/* sea texture */}
    {Array.from({ length: 6 }).map((_, i) => (
      <path key={i} d={`M${30 + i * 12} ${280 - i * 3} q 8 -3 14 0 t 14 0 t 14 0`}
        stroke="#3f6b6b" strokeWidth="0.5" fill="none" opacity=".4" />
    ))}
    {/* mountains */}
    <g opacity=".75">
      <path d="M 90 165 l 18 -28 l 14 22 l 10 -16 l 16 22 z" fill="none" stroke="#6b4f3a" strokeWidth="1" />
      <path d="M 200 175 l 22 -32 l 16 26 l 12 -18 l 18 24 z" fill="none" stroke="#6b4f3a" strokeWidth="1" />
    </g>
    {/* dotted travel route */}
    <path d="M 60 250 Q 130 180 200 200 T 360 130"
      stroke="#b9532e" strokeWidth="2" fill="none" strokeDasharray="2 6" />
    {/* destination markers */}
    {[
      { x: 60, y: 250, label: "Napoli" },
      { x: 200, y: 200, label: "Roma" },
      { x: 280, y: 175, label: "Firenze" },
      { x: 360, y: 130, label: "Venezia" },
    ].map((p, i) => (
      <g key={i}>
        <circle cx={p.x} cy={p.y} r="4" fill="#b9532e" />
        <circle cx={p.x} cy={p.y} r="8" fill="none" stroke="#b9532e" strokeWidth="1" opacity=".5" />
        <text x={p.x + 12} y={p.y + 4} fontFamily="Caveat, cursive" fontSize="18" fill="#2c1f15">{p.label}</text>
      </g>
    ))}
    {/* compass rose mini */}
    <g transform="translate(395 50)" opacity=".7">
      <circle r="20" fill="none" stroke="#8b3a1e" strokeWidth="1" />
      <polygon points="0,-18 3,0 0,-3 -3,0" fill="#b9532e" />
      <polygon points="0,18 3,0 0,3 -3,0" fill="#2c1f15" />
      <text y="-24" textAnchor="middle" fontSize="7" fill="#8b3a1e" fontFamily="Cormorant SC, serif">N</text>
    </g>
    {/* scale */}
    <g transform="translate(40 295)">
      <line x1="0" y1="0" x2="60" y2="0" stroke="#4a3526" strokeWidth="1" />
      <line x1="0" y1="-3" x2="0" y2="3" stroke="#4a3526" strokeWidth="1" />
      <line x1="30" y1="-3" x2="30" y2="3" stroke="#4a3526" strokeWidth="1" />
      <line x1="60" y1="-3" x2="60" y2="3" stroke="#4a3526" strokeWidth="1" />
      <text x="30" y="14" textAnchor="middle" fontSize="8" fill="#4a3526" fontFamily="Special Elite, monospace">100 km</text>
    </g>
    {/* decorative wavy fish */}
    <path d="M 380 240 q 6 -3 12 0 q -6 3 -12 0" fill="none" stroke="#3f6b6b" strokeWidth="0.6" opacity=".5" />
  </svg>
);

const PostageMark = ({ city = "AIR MAIL", style }) => (
  <div style={{
    border: "1.5px solid #8b3a1e",
    padding: "4px 12px",
    color: "#8b3a1e",
    fontFamily: "Cormorant SC, serif",
    letterSpacing: ".25em",
    fontSize: 10,
    fontWeight: 600,
    opacity: .8,
    mixBlendMode: "multiply",
    display: "inline-block",
    ...style,
  }}>{city}</div>
);

const AirmailBorder = ({ style }) => (
  <div style={{
    background: "repeating-linear-gradient(45deg, #b9532e 0 8px, transparent 8px 16px, #2c4a6b 16px 24px, transparent 24px 32px)",
    height: 8,
    ...style,
  }} />
);

Object.assign(window, {
  Stamp, PassportStamp, Tape, Botanical, FernSprig, Compass, Flourish, Ticket, HandDrawnMap, PostageMark, AirmailBorder
});
