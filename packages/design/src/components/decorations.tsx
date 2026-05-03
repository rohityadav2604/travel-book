import React from "react";
/** Rich decoration components ported from the Wanderbound handoff bundle. */

// ─── Stamp ────────────────────────────────────────────────────────────────────

type StampColor = "terra" | "olive" | "mustard" | "burgundy";

const STAMP_PALETTES: Record<StampColor, { bg: string; ink: string; accent: string }> = {
  terra:    { bg: "#b9532e", ink: "#f3e7d1", accent: "#8b3a1e" },
  olive:    { bg: "#6b6b3a", ink: "#f3e7d1", accent: "#4f5028" },
  mustard:  { bg: "#d9a441", ink: "#3a2a1c", accent: "#a47828" },
  burgundy: { bg: "#6e2a23", ink: "#f3e7d1", accent: "#4a1a14" },
};

export function Stamp({
  country = "ITALIA",
  value = "L.250",
  color = "terra",
  style,
}: {
  country?: string;
  value?: string;
  color?: StampColor;
  style?: React.CSSProperties;
}): React.ReactElement {
  const p = STAMP_PALETTES[color];
  return (
    <div
      style={{
        display: "inline-block",
        position: "relative",
        padding: 4,
        background: "#f3e7d1",
        boxShadow: "0 2px 3px rgba(0,0,0,.2)",
        ...style,
      }}
    >
      {/* Perforation border */}
      <div
        style={{
          position: "absolute",
          inset: -3,
          backgroundImage: "radial-gradient(circle, #f3e7d1 2.5px, transparent 3px)",
          backgroundSize: "7px 7px",
          zIndex: -1,
        }}
      />
      <svg width={80} height={100} viewBox="0 0 80 100">
        <rect width={80} height={100} fill={p.bg} />
        <rect x={4} y={4} width={72} height={92} fill="none" stroke={p.ink} strokeWidth={0.5} opacity={0.6} />
        <circle cx={40} cy={38} r={16} fill="none" stroke={p.ink} strokeWidth={0.8} opacity={0.7} />
        <path d="M20 60 Q40 48 60 60" fill="none" stroke={p.ink} strokeWidth={0.8} opacity={0.7} />
        <path d="M24 72 L56 72" stroke={p.ink} strokeWidth={0.5} opacity={0.5} />
        <text x={40} y={80} textAnchor="middle" fontSize={7} fill={p.ink} fontFamily="'Cormorant SC', serif" letterSpacing={1}>
          {country}
        </text>
        <text x={40} y={92} textAnchor="middle" fontSize={6} fill={p.ink} fontFamily="'Special Elite', monospace">
          {value}
        </text>
      </svg>
    </div>
  );
}

// ─── PassportStamp ───────────────────────────────────────────────────────────

type PassportColor = "terra" | "olive" | "teal" | "burgundy";
const PASSPORT_COLORS: Record<PassportColor, string> = {
  terra:    "#8b3a1e",
  olive:    "#4f5028",
  teal:     "#3f6b6b",
  burgundy: "#6e2a23",
};

export function PassportStamp({
  city = "ROMA",
  date = "12.VI.74",
  color = "terra",
  shape = "rect",
  rotate = -8,
  style,
}: {
  city?: string;
  date?: string;
  color?: PassportColor;
  shape?: "rect" | "circle";
  rotate?: number;
  style?: React.CSSProperties;
}): React.ReactElement {
  const c = PASSPORT_COLORS[color];
  const base: React.CSSProperties = {
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "center",
    border: `2px solid ${c}`,
    color: c,
    opacity: shape === "circle" ? 0.78 : 0.82,
    mixBlendMode: "multiply",
    transform: `rotate(${rotate}deg)`,
    fontFamily: "'Special Elite', monospace",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    ...style,
  };

  if (shape === "circle") {
    return (
      <div style={{ ...base, width: 90, height: 90, borderRadius: "50%", justifyContent: "center", padding: "6px 0" }}>
        <div style={{ fontSize: 11, borderTop: `1px solid ${c}`, borderBottom: `1px solid ${c}`, padding: "2px 0", width: "70%", textAlign: "center" }}>
          {city}
        </div>
        <div style={{ marginTop: 4, fontSize: 8, letterSpacing: "0.1em" }}>{date}</div>
      </div>
    );
  }

  return (
    <div style={{ ...base, padding: "6px 14px", fontSize: 11 }}>
      <span>{city}</span>
      <span style={{ fontSize: 9, letterSpacing: "0.1em", marginTop: 2 }}>{date}</span>
    </div>
  );
}

// ─── Tape ────────────────────────────────────────────────────────────────────

type TapeColor = "mustard" | "cream" | "terra" | "olive";

const TAPE_GRADIENTS: Record<TapeColor, [string, string]> = {
  mustard: ["rgba(217,164,65,.65)",  "rgba(184,138,52,.60)"],
  cream:   ["rgba(243,231,209,.75)", "rgba(225,210,180,.70)"],
  terra:   ["rgba(185,83,46,.60)",   "rgba(140,60,30,.55)"],
  olive:   ["rgba(122,132,66,.60)",  "rgba(80,86,40,.55)"],
};

export function Tape({
  width = 90,
  color = "mustard",
  rotate = -3,
  style,
}: {
  width?: number;
  color?: TapeColor;
  rotate?: number;
  style?: React.CSSProperties;
}): React.ReactElement {
  const [a, b] = TAPE_GRADIENTS[color];
  return (
    <div
      style={{
        width,
        height: 26,
        background: `linear-gradient(180deg, ${a}, ${b})`,
        boxShadow: "0 2px 4px rgba(0,0,0,.10)",
        transform: `rotate(${rotate}deg)`,
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(90deg, transparent 0 6px, rgba(255,255,255,.15) 6px 7px)" }} />
      <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: 4, background: "linear-gradient(90deg, rgba(255,255,255,.3), transparent)" }} />
      <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: 4, background: "linear-gradient(-90deg, rgba(255,255,255,.3), transparent)" }} />
    </div>
  );
}

// ─── Botanical (pressed flower sprig) ────────────────────────────────────────

export function Botanical({
  size = 120,
  rotate = 0,
  style,
}: {
  size?: number;
  rotate?: number;
  style?: React.CSSProperties;
}): React.ReactElement {
  const h = size * 1.4;
  const leaves = [20, 45, 70, 95, 120];
  return (
    <svg
      width={size}
      height={h}
      viewBox="0 0 120 168"
      style={{ transform: `rotate(${rotate}deg)`, display: "block", ...style }}
    >
      <path d="M60 10 Q60 60 60 158" stroke="#6b6b3a" strokeWidth="1.2" fill="none" opacity=".75" />
      {leaves.map((y, i) => {
        const left = i % 2 === 0;
        const cx = left ? 22 : 98;
        const rot = left ? -18 : 18;
        return (
          <g key={i}>
            <path
              d={left
                ? `M60 ${y} Q40 ${y - 12} ${cx} ${y + 4}`
                : `M60 ${y} Q80 ${y - 12} ${cx} ${y + 4}`}
              stroke="#6b7a3a" strokeWidth="0.9" fill="none" opacity=".65"
            />
            <ellipse cx={cx} cy={y + 4} rx={14} ry={5} fill="#7a8442" opacity=".55" transform={`rotate(${rot} ${cx} ${y + 4})`} />
          </g>
        );
      })}
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse
          key={a}
          cx={60 + 6 * Math.sin((a * Math.PI) / 180)}
          cy={14 - 6 * Math.cos((a * Math.PI) / 180)}
          rx={2.5} ry={4} fill="#b9532e" opacity=".7"
          transform={`rotate(${a} ${60 + 6 * Math.sin((a * Math.PI) / 180)} ${14 - 6 * Math.cos((a * Math.PI) / 180)})`}
        />
      ))}
      <circle cx={60} cy={14} r={1.5} fill="#d9a441" />
    </svg>
  );
}

// ─── FernSprig ───────────────────────────────────────────────────────────────

export function FernSprig({
  size = 80,
  rotate = 0,
  style,
}: {
  size?: number;
  rotate?: number;
  style?: React.CSSProperties;
}): React.ReactElement {
  return (
    <svg
      width={size}
      height={size * 2}
      viewBox="0 0 80 160"
      style={{ transform: `rotate(${rotate}deg)`, display: "block", ...style }}
    >
      <path d="M40 5 Q40 80 40 158" stroke="#4f5028" strokeWidth="1" fill="none" opacity=".7" />
      {Array.from({ length: 14 }).map((_, i) => {
        const y = 12 + i * 10;
        const len = 28 - i * 1.4;
        return (
          <g key={i} opacity=".7">
            <path d={`M40 ${y} Q${40 - len * 0.6} ${y - 4} ${40 - len} ${y + 2}`} stroke="#6b7a3a" strokeWidth="0.8" fill="none" />
            <path d={`M40 ${y} Q${40 + len * 0.6} ${y - 4} ${40 + len} ${y + 2}`} stroke="#6b7a3a" strokeWidth="0.8" fill="none" />
          </g>
        );
      })}
    </svg>
  );
}

// ─── Compass ─────────────────────────────────────────────────────────────────

export function Compass({
  size = 100,
  style,
}: {
  size?: number;
  style?: React.CSSProperties;
}): React.ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ display: "block", ...style }}>
      <circle cx={50} cy={50} r={46} fill="none" stroke="#8b3a1e" strokeWidth={1.5} opacity=".7" />
      <circle cx={50} cy={50} r={38} fill="none" stroke="#8b3a1e" strokeWidth={0.6} opacity=".5" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
        const rad = (a * Math.PI) / 180;
        const cardinal = a % 90 === 0;
        const x1 = 50 + 38 * Math.sin(rad);
        const y1 = 50 - 38 * Math.cos(rad);
        const x2 = 50 + 46 * Math.sin(rad);
        const y2 = 50 - 46 * Math.cos(rad);
        return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#8b3a1e" strokeWidth={cardinal ? 1.2 : 0.5} opacity={cardinal ? 0.8 : 0.4} />;
      })}
      <polygon points="50,14 54,50 50,46 46,50" fill="#b9532e" opacity=".85" />
      <polygon points="50,86 54,50 50,54 46,50" fill="#2c1f15" opacity=".7" />
      <circle cx={50} cy={50} r={3} fill="#2c1f15" />
      {[["N", 50, 6], ["E", 96, 53], ["S", 50, 98], ["W", 4, 53]].map(([l, x, y]) => (
        <text key={l as string} x={x as number} y={y as number} textAnchor="middle" fontSize={8} fill="#8b3a1e"
          fontFamily="'Cormorant SC', serif" fontWeight={l === "N" ? "600" : "400"}>{l}</text>
      ))}
    </svg>
  );
}

// ─── Flourish ────────────────────────────────────────────────────────────────

export function Flourish({
  width = 200,
  color = "var(--terracotta)",
  style,
}: {
  width?: number;
  color?: string;
  style?: React.CSSProperties;
}): React.ReactElement {
  return (
    <svg width={width} height={20} viewBox="0 0 200 20" style={{ display: "block", ...style }}>
      <line x1={0} y1={10} x2={80} y2={10} stroke={color} strokeWidth={0.8} opacity={0.5} />
      <line x1={120} y1={10} x2={200} y2={10} stroke={color} strokeWidth={0.8} opacity={0.5} />
      <g transform="translate(100 10)">
        <circle cx={0} cy={0} r={2.5} fill={color} opacity={0.8} />
        <circle cx={0} cy={0} r={6} fill="none" stroke={color} strokeWidth={0.6} opacity={0.5} />
        <path d="M-14 0 Q-10 -3 -7 0 Q-10 3 -14 0" fill={color} opacity={0.7} />
        <path d="M14 0 Q10 -3 7 0 Q10 3 14 0" fill={color} opacity={0.7} />
      </g>
    </svg>
  );
}

// ─── Ticket ──────────────────────────────────────────────────────────────────

export function Ticket({
  from = "ROMA",
  to = "FIRENZE",
  date = "12 GIU 1974",
  seat = "14B",
  style,
}: {
  from?: string;
  to?: string;
  date?: string;
  seat?: string;
  style?: React.CSSProperties;
}): React.ReactElement {
  return (
    <div
      style={{
        position: "relative",
        background: "#ecdcb9",
        border: "1px dashed #6b4f3a",
        padding: "10px 18px",
        fontFamily: "'Special Elite', monospace",
        fontSize: 10,
        letterSpacing: "0.12em",
        color: "#4a3526",
        boxShadow: "0 4px 10px rgba(44,31,21,.15)",
        display: "flex",
        gap: 16,
        alignItems: "center",
        ...style,
      }}
    >
      {/* Notches */}
      <div style={{ position: "absolute", top: "50%", left: -6, width: 12, height: 12, borderRadius: "50%", background: "#f3e7d1", transform: "translateY(-50%)" }} />
      <div style={{ position: "absolute", top: "50%", right: -6, width: 12, height: 12, borderRadius: "50%", background: "#f3e7d1", transform: "translateY(-50%)" }} />
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 7, opacity: 0.7 }}>FROM</div>
        <div style={{ fontSize: 14, fontWeight: 600 }}>{from}</div>
      </div>
      <div style={{ color: "#b9532e", fontSize: 18 }}>→</div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 7, opacity: 0.7 }}>TO</div>
        <div style={{ fontSize: 14, fontWeight: 600 }}>{to}</div>
      </div>
      <div style={{ width: 1, height: 32, borderLeft: "1px dashed #6b4f3a", margin: "0 4px" }} />
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 7, opacity: 0.7 }}>DATE</div>
        <div style={{ fontSize: 10 }}>{date}</div>
      </div>
      {seat !== "—" && (
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 7, opacity: 0.7 }}>SEAT</div>
          <div style={{ fontSize: 10 }}>{seat}</div>
        </div>
      )}
    </div>
  );
}

// ─── HandDrawnMap ─────────────────────────────────────────────────────────────

export function HandDrawnMap({
  width = 460,
  height = 320,
  style,
}: {
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}): React.ReactElement {
  return (
    <svg width={width} height={height} viewBox="0 0 460 320" style={{ display: "block", ...style }}>
      {/* Coastlines */}
      <path d="M20 80 Q 60 60 100 90 T 180 100 Q 220 80 260 110 T 340 130 Q 380 110 430 140" fill="none" stroke="#3f6b6b" strokeWidth={1.4} opacity={0.7} />
      <path d="M20 220 Q 80 200 130 230 T 240 240 Q 290 220 340 250 T 440 260" fill="none" stroke="#3f6b6b" strokeWidth={1.4} opacity={0.7} />
      {/* Sea ripples */}
      {Array.from({ length: 6 }).map((_, i) => (
        <path key={i} d={`M${30 + i * 12} ${280 - i * 3} q 8 -3 14 0 t 14 0 t 14 0`} fill="none" stroke="#3f6b6b" strokeWidth={0.5} opacity={0.4} />
      ))}
      {/* Mountains */}
      <g opacity={0.75} stroke="#6b4f3a" strokeWidth={1} fill="#e3cfa3">
        <path d="M 90 165 l 18 -28 l 14 22 l 10 -16 l 16 22 z" />
        <path d="M 200 175 l 22 -32 l 16 26 l 12 -18 l 18 24 z" />
      </g>
      {/* Dotted route */}
      <path d="M 60 250 Q 130 180 200 200 T 360 130" fill="none" stroke="#b9532e" strokeWidth={2} strokeDasharray="2 6" />
      {/* Destination markers */}
      {[
        { label: "Napoli", x: 60, y: 250 },
        { label: "Roma", x: 200, y: 200 },
        { label: "Firenze", x: 280, y: 175 },
        { label: "Venezia", x: 360, y: 130 },
      ].map(({ label, x, y }) => (
        <g key={label}>
          <circle cx={x} cy={y} r={4} fill="#b9532e" />
          <circle cx={x} cy={y} r={8} fill="none" stroke="#b9532e" strokeWidth={1} opacity={0.5} />
          <text x={x + 12} y={y + 4} fontSize={18} fill="#2c1f15" fontFamily="'Caveat', cursive">{label}</text>
        </g>
      ))}
      {/* Mini compass */}
      <g transform="translate(395 50)" opacity={0.7}>
        <circle cx={0} cy={0} r={20} fill="none" stroke="#8b3a1e" strokeWidth={1} />
        <polygon points="0,-16 3,0 0,-4 -3,0" fill="#b9532e" opacity={0.85} />
        <polygon points="0,16 3,0 0,4 -3,0" fill="#2c1f15" opacity={0.7} />
        <text x={0} y={-24} textAnchor="middle" fontSize={7} fill="#8b3a1e" fontFamily="'Cormorant SC', serif">N</text>
      </g>
      {/* Scale */}
      <g transform="translate(40 295)">
        <line x1={0} y1={0} x2={60} y2={0} stroke="#6b4f3a" strokeWidth={1} />
        <line x1={0} y1={-4} x2={0} y2={4} stroke="#6b4f3a" strokeWidth={1} />
        <line x1={30} y1={-2} x2={30} y2={2} stroke="#6b4f3a" strokeWidth={1} />
        <line x1={60} y1={-4} x2={60} y2={4} stroke="#6b4f3a" strokeWidth={1} />
        <text x={30} y={14} textAnchor="middle" fontSize={8} fill="#6b4f3a" fontFamily="'Special Elite', monospace">100 km</text>
      </g>
    </svg>
  );
}

// ─── PostageMark ─────────────────────────────────────────────────────────────

export function PostageMark({
  city = "AIR MAIL",
  style,
}: {
  city?: string;
  style?: React.CSSProperties;
}): React.ReactElement {
  return (
    <div
      style={{
        display: "inline-block",
        border: "1.5px solid #8b3a1e",
        padding: "4px 12px",
        color: "#8b3a1e",
        fontFamily: "'Cormorant SC', 'Cormorant Garamond', serif",
        letterSpacing: "0.25em",
        fontSize: 10,
        fontWeight: 600,
        opacity: 0.8,
        mixBlendMode: "multiply",
        textTransform: "uppercase",
        ...style,
      }}
    >
      {city}
    </div>
  );
}

// ─── AirmailBorder ───────────────────────────────────────────────────────────

export function AirmailBorder({ style }: { style?: React.CSSProperties }): React.ReactElement {
  return (
    <div
      style={{
        background: "repeating-linear-gradient(45deg, #b9532e 0 8px, transparent 8px 16px, #2c4a6b 16px 24px, transparent 24px 32px)",
        height: 8,
        ...style,
      }}
    />
  );
}

// ─── PaperBg (template wrapper) ───────────────────────────────────────────────

export function PaperBg({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <div
      style={{
        position: "relative",
        width: 600,
        height: 600,
        background: "#f3e7d1",
        overflow: "hidden",
      }}
    >
      {/* Paper texture stains */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: [
            "radial-gradient(ellipse at 20% 15%, rgba(139,90,43,.10), transparent 40%)",
            "radial-gradient(ellipse at 80% 85%, rgba(139,90,43,.08), transparent 40%)",
            "radial-gradient(ellipse at 50% 50%, rgba(255,240,210,.25), transparent 60%)",
          ].join(", "),
          pointerEvents: "none",
        }}
      />
      {/* Paper grain */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
          mixBlendMode: "multiply",
          opacity: 0.35,
          pointerEvents: "none",
        }}
      />
      {children}
      {/* Edge shadow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          boxShadow: "inset 0 0 60px rgba(110,70,30,.18), inset 0 0 12px rgba(110,70,30,.12)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

// ─── Photo (vintage photo with sepia filter) ──────────────────────────────────

export function Photo({
  src,
  style,
  className,
}: {
  src: string | undefined;
  style?: React.CSSProperties;
  className?: string;
}): React.ReactElement {
  return (
    <div
      style={{
        position: "absolute",
        background: "#2a2017",
        boxShadow: "0 1px 2px rgba(44,31,21,.08), 0 8px 30px rgba(44,31,21,.12)",
        overflow: "hidden",
        ...style,
      }}
      className={className}
    >
      {src && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "saturate(.85) contrast(.95) sepia(.18) brightness(.98)",
          }}
        />
      )}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(255,200,140,.08), rgba(180,90,40,.10))",
          mixBlendMode: "overlay",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

// ─── CoffeeStain ─────────────────────────────────────────────────────────────

export function CoffeeStain({
  size = 110,
  style,
}: {
  size?: number;
  style?: React.CSSProperties;
}): React.ReactElement {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(110,55,20,0) 50%, rgba(110,55,20,.32) 62%, rgba(110,55,20,.18) 72%, rgba(110,55,20,.08) 82%, transparent 92%)",
        filter: "blur(.5px)",
        mixBlendMode: "multiply",
        ...style,
      }}
    />
  );
}
