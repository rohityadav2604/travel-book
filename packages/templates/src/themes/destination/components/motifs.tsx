import React from "react";
import type {
  DestinationPattern,
  DestinationRouteStyle,
  DestinationThemeConfig,
  DestinationTicketStyle,
} from "../types";

function patternWash(pattern: DestinationPattern, config: DestinationThemeConfig): string[] {
  const { palette } = config;

  if (pattern === "bistroPoster") {
    return [
      `radial-gradient(ellipse at 18% 12%, ${palette.accent}1f, transparent 38%)`,
      `radial-gradient(ellipse at 86% 78%, ${palette.secondary}24, transparent 44%)`,
      "linear-gradient(90deg, rgba(255,255,255,.2), transparent 38%, rgba(255,255,255,.16))",
    ];
  }

  if (pattern === "cobaltTile") {
    return [
      `radial-gradient(circle at 15% 14%, ${palette.highlight}24, transparent 34%)`,
      `radial-gradient(circle at 86% 76%, ${palette.secondary}24, transparent 40%)`,
      `linear-gradient(135deg, transparent 0 48%, ${palette.secondary}12 49% 51%, transparent 52%)`,
    ];
  }

  return [
    `radial-gradient(ellipse at 18% 12%, ${palette.accent}2b, transparent 42%)`,
    `radial-gradient(ellipse at 88% 78%, ${palette.secondary}24, transparent 46%)`,
    `linear-gradient(120deg, transparent 0 44%, ${palette.highlight}14 45% 48%, transparent 49%)`,
  ];
}

export function PaperTexture({ config }: { config: DestinationThemeConfig }): React.ReactElement {
  return (
    <>
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: [
            ...patternWash(config.assetKit.pattern, config),
            "radial-gradient(ellipse at 50% 50%, rgba(255,255,245,.28), transparent 68%)",
          ].join(", "),
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 220 220' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.72' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E\")",
          backgroundSize: "220px 220px",
          mixBlendMode: "multiply",
          opacity: 0.28,
          pointerEvents: "none",
        }}
      />
    </>
  );
}

function ticketProfile(style: DestinationTicketStyle): React.CSSProperties {
  if (style === "metro") {
    return { borderRadius: 2, borderStyle: "solid" };
  }

  if (style === "rail") {
    return { borderRadius: 0, borderStyle: "dashed" };
  }

  return { borderRadius: "18px 4px 18px 4px", borderStyle: "dotted" };
}

export function TicketStub({
  config,
  label,
  style,
}: {
  config: DestinationThemeConfig;
  label: string;
  style?: React.CSSProperties | undefined;
}): React.ReactElement {
  const { palette, fonts, assetKit } = config;
  const profile = ticketProfile(assetKit.ticketStyle);

  return (
    <div
      style={{
        position: "absolute",
        minWidth: 118,
        padding: "9px 16px",
        border: `1px ${profile.borderStyle ?? "solid"} ${palette.ink}3d`,
        background: `${assetKit.ephemera.paper}eb`,
        color: palette.inkSoft,
        fontFamily: fonts.sans,
        fontSize: 13,
        fontWeight: 600,
        letterSpacing: ".18em",
        textTransform: "uppercase",
        boxShadow: `0 10px 20px ${palette.ink}18`,
        ...profile,
        ...style,
      }}
    >
      <span
        style={{
          position: "absolute",
          top: "50%",
          left: -7,
          width: 14,
          height: 14,
          borderRadius: "999px",
          background: palette.paper,
          transform: "translateY(-50%)",
        }}
      />
      <span
        style={{
          position: "absolute",
          top: "50%",
          right: -7,
          width: 14,
          height: 14,
          borderRadius: "999px",
          background: palette.paper,
          transform: "translateY(-50%)",
        }}
      />
      <span
        style={{
          position: "absolute",
          left: 10,
          right: 10,
          bottom: 5,
          height: 2,
          background: `repeating-linear-gradient(90deg, ${assetKit.ephemera.tapeAlt} 0 8px, transparent 8px 13px)`,
          opacity: 0.42,
        }}
      />
      {label}
    </div>
  );
}

export function StampMark({
  config,
  label,
  style,
}: {
  config: DestinationThemeConfig;
  label?: string | undefined;
  style?: React.CSSProperties | undefined;
}): React.ReactElement {
  const { palette, fonts, labels, assetKit } = config;

  return (
    <div
      style={{
        position: "absolute",
        display: "grid",
        placeItems: "center",
        width: 82,
        height: 82,
        borderRadius: "50%",
        border: `2px solid ${palette.accentDeep}`,
        color: palette.accentDeep,
        fontFamily: fonts.mono,
        fontSize: 12,
        letterSpacing: ".18em",
        textAlign: "center",
        textTransform: "uppercase",
        transform: "rotate(-9deg)",
        opacity: 0.86,
        ...style,
      }}
    >
      <div style={{ position: "absolute", inset: 7, borderRadius: "50%", border: `1px solid ${palette.accentDeep}99` }} />
      <span>{label ?? labels.stamp}</span>
      <span
        style={{
          position: "absolute",
          bottom: 16,
          fontSize: 6,
          letterSpacing: ".18em",
          opacity: 0.72,
        }}
      >
        {assetKit.ephemera.stamp}
      </span>
    </div>
  );
}

export function TapeStrip({
  config,
  variant = "primary",
  style,
}: {
  config: DestinationThemeConfig;
  variant?: "primary" | "alternate";
  style?: React.CSSProperties | undefined;
}): React.ReactElement {
  const { palette, assetKit } = config;
  const color = variant === "alternate" ? assetKit.ephemera.tapeAlt : assetKit.ephemera.tape;

  return (
    <div
      style={{
        position: "absolute",
        width: 84,
        height: 22,
        background: `${color}99`,
        boxShadow: `0 1px 0 ${palette.ink}1f, inset 0 0 10px rgba(255,255,255,.24)`,
        transform: "rotate(-8deg)",
        ...style,
      }}
    />
  );
}

export function TileBorder({
  config,
  style,
}: {
  config: DestinationThemeConfig;
  style?: React.CSSProperties | undefined;
}): React.ReactElement {
  const { palette, assetKit } = config;
  let backgroundImage: string;
  let backgroundColor = "transparent";

  if (assetKit.pattern === "bistroPoster") {
    backgroundColor = palette.paper;
    backgroundImage = `repeating-linear-gradient(90deg, ${palette.accent} 0 18px, ${palette.paper} 18px 35px, ${palette.secondary} 35px 39px, ${palette.paper} 39px 58px)`;
  } else if (assetKit.pattern === "cobaltTile") {
    backgroundImage = [
      `linear-gradient(45deg, ${palette.secondary} 25%, transparent 25%)`,
      `linear-gradient(-45deg, ${palette.secondary} 25%, transparent 25%)`,
      `linear-gradient(45deg, transparent 75%, ${palette.accent} 75%)`,
      `linear-gradient(-45deg, transparent 75%, ${palette.accent} 75%)`,
      `radial-gradient(circle at 50% 50%, ${palette.highlight} 0 3px, transparent 4px)`,
    ].join(", ");
  } else {
    backgroundImage = [
      `repeating-linear-gradient(90deg, transparent 0 16px, ${palette.accent} 16px 18px, transparent 18px 34px)`,
      `linear-gradient(90deg, ${palette.secondary}55, ${palette.highlight}91, ${palette.accent}55)`,
    ].join(", ");
  }

  return (
    <div
      style={{
        position: "absolute",
        height: 24,
        backgroundColor,
        backgroundImage,
        backgroundPosition: "0 0, 0 12px, 12px -12px, -12px 0, 0 0",
        backgroundSize: assetKit.pattern === "cobaltTile" ? "24px 24px" : "auto",
        opacity: assetKit.pattern === "bistroPoster" ? 0.58 : 0.5,
        ...style,
      }}
    />
  );
}

export function DestinationMotif({
  config,
  variant = "large",
}: {
  config: DestinationThemeConfig;
  variant?: "large" | "small";
}): React.ReactElement {
  const size = variant === "large" ? 230 : 110;
  const { palette, assetKit } = config;

  if (assetKit.landmark === "ironSeine") {
    return (
      <svg width={size} height={size} viewBox="0 0 200 200" aria-hidden="true">
        <path d="M88 20 L112 20 L103 80 L146 178 L124 178 L100 112 L76 178 L54 178 L97 80 Z" fill="none" stroke={palette.ink} strokeWidth="5" strokeLinejoin="round" opacity=".5" />
        <path d="M76 70 H124 M68 104 H132 M52 178 H148" stroke={palette.accentDeep} strokeWidth="4" strokeLinecap="round" opacity=".78" />
        <path d="M30 132 C54 112 76 112 100 132 C124 152 147 150 176 122" fill="none" stroke={palette.secondary} strokeWidth="5" strokeLinecap="round" opacity=".62" />
        <path d="M34 138 C48 125 61 124 75 138 M83 138 C96 126 108 126 122 138 M130 138 C143 127 157 126 172 138" fill="none" stroke={palette.highlight} strokeWidth="3" strokeLinecap="round" opacity=".7" />
        <circle cx="42" cy="42" r="16" fill="none" stroke={palette.highlight} strokeWidth="3" opacity=".65" />
      </svg>
    );
  }

  if (assetKit.landmark === "sunTile") {
    return (
      <svg width={size} height={size} viewBox="0 0 200 200" aria-hidden="true">
        <circle cx="100" cy="88" r="36" fill={palette.highlight} opacity=".24" stroke={palette.accentDeep} strokeWidth="4" />
        {Array.from({ length: 12 }, (_, index) => {
          const angle = (index * 30 * Math.PI) / 180;
          const x1 = 100 + Math.cos(angle) * 46;
          const y1 = 88 + Math.sin(angle) * 46;
          const x2 = 100 + Math.cos(angle) * 62;
          const y2 = 88 + Math.sin(angle) * 62;
          return <line key={index} x1={x1} y1={y1} x2={x2} y2={y2} stroke={palette.accentDeep} strokeWidth="3" opacity=".62" />;
        })}
        <path d="M38 164 C38 124 64 106 100 106 C136 106 162 124 162 164" fill="none" stroke={palette.secondary} strokeWidth="6" strokeLinecap="round" />
        <path d="M50 164 H150 M65 137 H135 M82 116 H118" stroke={palette.accent} strokeWidth="4" strokeLinecap="round" opacity=".8" />
        <path d="M48 52 L70 52 L70 74 L48 74 Z M130 52 L152 52 L152 74 L130 74 Z" fill="none" stroke={palette.secondaryDeep} strokeWidth="4" opacity=".78" />
      </svg>
    );
  }

  return (
    <svg width={size} height={size} viewBox="0 0 200 200" aria-hidden="true">
      <path d="M28 136 C58 108 85 139 110 103 C130 75 150 78 174 55" fill="none" stroke={palette.highlight} strokeWidth="8" strokeLinecap="round" opacity=".75" />
      <path d="M72 138 H128 L119 82 L100 48 L81 82 Z" fill="none" stroke={palette.accentDeep} strokeWidth="5" strokeLinejoin="round" />
      <path d="M62 138 H138 M78 88 H122 M88 72 H112 M94 58 H106" stroke={palette.accentDeep} strokeWidth="4" strokeLinecap="round" />
      <path d="M68 118 Q100 98 132 118" fill="none" stroke={palette.accent} strokeWidth="4" strokeLinecap="round" opacity=".65" />
      <circle cx="154" cy="52" r="16" fill={palette.secondary} opacity=".55" />
      <path d="M43 151 C62 161 83 163 107 158 C129 154 151 145 169 132" fill="none" stroke={palette.secondaryDeep} strokeWidth="4" strokeLinecap="round" opacity=".55" />
    </svg>
  );
}

export function EphemeraScrap({
  config,
  variant,
  style,
}: {
  config: DestinationThemeConfig;
  variant: "receipt" | "note" | "label" | "tab";
  style?: React.CSSProperties | undefined;
}): React.ReactElement {
  const { palette, fonts, assetKit } = config;
  const { ephemera } = assetKit;

  if (variant === "receipt") {
    return (
      <div
        style={{
          position: "absolute",
          width: 132,
          padding: "12px 12px 14px",
          background: `${ephemera.paper}f2`,
          border: `1px solid ${palette.ink}26`,
          boxShadow: `0 14px 22px ${palette.ink}18`,
          color: palette.inkSoft,
          fontFamily: fonts.mono,
          fontSize: 8,
          letterSpacing: ".12em",
          textTransform: "uppercase",
          ...style,
        }}
      >
        <div style={{ color: palette.accentDeep, fontFamily: fonts.sans, fontSize: 11, letterSpacing: ".18em" }}>
          {ephemera.receiptTitle}
        </div>
        <div style={{ marginTop: 9, display: "grid", gap: 5 }}>
          {ephemera.receiptLines.map((line) => (
            <div key={line} style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
              <span>{line}</span>
              <span>--</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === "note") {
    return (
      <div
        style={{
          position: "absolute",
          width: 152,
          padding: "11px 13px",
          background: `${palette.paper}e8`,
          borderLeft: `5px solid ${ephemera.tab}`,
          boxShadow: `0 12px 18px ${palette.ink}14`,
          color: palette.inkSoft,
          fontFamily: fonts.script,
          fontSize: 17,
          lineHeight: 1.08,
          ...style,
        }}
      >
        {ephemera.note}
      </div>
    );
  }

  if (variant === "tab") {
    return (
      <div
        style={{
          position: "absolute",
          width: 76,
          height: 28,
          background: ephemera.tab,
          color: palette.ink,
          display: "grid",
          placeItems: "center",
          fontFamily: fonts.sans,
          fontSize: 9,
          fontWeight: 600,
          letterSpacing: ".16em",
          textTransform: "uppercase",
          boxShadow: `0 8px 14px ${palette.ink}12`,
          ...style,
        }}
      >
        {ephemera.smallLabel}
      </div>
    );
  }

  return (
    <div
      style={{
        position: "absolute",
        padding: "6px 10px",
        background: palette.night,
        color: palette.paper,
        fontFamily: fonts.sans,
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: ".2em",
        textTransform: "uppercase",
        boxShadow: `0 8px 16px ${palette.ink}18`,
        ...style,
      }}
    >
      {ephemera.secondaryTicket}
    </div>
  );
}

function routePaths(routeStyle: DestinationRouteStyle): {
  path: string;
  highlight: string;
  points: Array<{ x: number; y: number }>;
} {
  if (routeStyle.variant === "seine") {
    return {
      path: "M34 172 C78 132 113 154 150 126 C191 94 229 138 270 105 C318 67 361 92 405 70 C445 50 470 59 494 42",
      highlight: "M58 206 C90 181 118 183 147 202 M170 174 C205 149 234 151 264 174 M295 136 C334 112 367 112 405 134",
      points: [
        { x: 82, y: 137 },
        { x: 190, y: 98 },
        { x: 316, y: 88 },
        { x: 454, y: 55 },
      ],
    };
  }

  if (routeStyle.variant === "railCoast") {
    return {
      path: "M46 244 C104 202 126 154 182 164 C244 176 262 110 320 111 C387 112 418 76 482 92",
      highlight: "M64 274 C126 250 180 260 240 236 C308 209 359 218 432 184 M54 104 C111 82 166 90 218 72 C284 48 345 61 404 38",
      points: [
        { x: 92, y: 214 },
        { x: 184, y: 164 },
        { x: 320, y: 111 },
        { x: 454, y: 87 },
      ],
    };
  }

  return {
    path: "M46 236 C96 178 135 227 182 169 C229 112 266 141 313 100 C368 53 412 85 472 44",
    highlight: "M58 258 C112 214 143 250 195 198 C246 146 285 169 333 130 C389 84 422 105 484 72",
    points: [
      { x: 72, y: 215 },
      { x: 182, y: 169 },
      { x: 313, y: 100 },
      { x: 455, y: 58 },
    ],
  };
}

function RouteMarker({
  config,
  x,
  y,
}: {
  config: DestinationThemeConfig;
  x: number;
  y: number;
}): React.ReactElement {
  const { palette, assetKit } = config;

  if (assetKit.routeStyle.marker === "bridge") {
    return (
      <g transform={`translate(${x} ${y})`}>
        <rect x="-13" y="-9" width="26" height="18" fill={palette.paper} stroke={palette.accentDeep} strokeWidth="3" opacity=".95" />
        <path d="M-10 6 C-5 -4 5 -4 10 6" fill="none" stroke={palette.secondary} strokeWidth="2" />
      </g>
    );
  }

  if (assetKit.routeStyle.marker === "sun") {
    return (
      <g transform={`translate(${x} ${y})`}>
        <circle r="10" fill={palette.highlight} stroke={palette.accentDeep} strokeWidth="3" />
        <path d="M0 -20 V-14 M0 14 V20 M-20 0 H-14 M14 0 H20 M-14 -14 L-10 -10 M14 -14 L10 -10 M-14 14 L-10 10 M14 14 L10 10" stroke={palette.accentDeep} strokeWidth="2" strokeLinecap="round" />
      </g>
    );
  }

  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r="9" fill={palette.accentDeep} />
      <path d="M0 -18 C8 -10 8 -1 0 8 C-8 -1 -8 -10 0 -18 Z" fill={palette.highlight} opacity=".78" />
      <circle r="19" fill="none" stroke={palette.accentDeep} strokeWidth="2" opacity=".34" />
    </g>
  );
}

export function RouteMap({ config }: { config: DestinationThemeConfig }): React.ReactElement {
  const { palette, labels, assetKit } = config;
  const route = routePaths(assetKit.routeStyle);

  return (
    <svg viewBox="0 0 520 320" width="520" height="320" aria-hidden="true">
      <rect x="0" y="0" width="520" height="320" fill="transparent" />
      <path d={route.highlight} fill="none" stroke={palette.highlight} strokeWidth="3" strokeLinecap="round" opacity=".28" />
      <path d={route.path} fill="none" stroke={palette.secondary} strokeWidth="8" strokeLinecap="round" opacity=".58" />
      <path d={route.path} fill="none" stroke={palette.paper} strokeWidth="2" strokeLinecap="round" opacity=".75" strokeDasharray={assetKit.routeStyle.variant === "railCoast" ? "8 8" : undefined} />
      {route.points.map((point) => (
        <RouteMarker key={`${point.x}-${point.y}`} config={config} x={point.x} y={point.y} />
      ))}
      <text x="36" y="292" fill={palette.inkSoft} fontFamily={config.fonts.mono} fontSize="12" letterSpacing="2">
        {labels.coordinates}
      </text>
      <text x="36" y="310" fill={palette.accentDeep} fontFamily={config.fonts.sans} fontSize="10" letterSpacing="2">
        {assetKit.ephemera.primaryTicket}
      </text>
    </svg>
  );
}
