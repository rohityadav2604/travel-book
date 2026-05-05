import React from "react";
import type { DestinationThemeConfig } from "../types";

export function PaperTexture({ config }: { config: DestinationThemeConfig }): React.ReactElement {
  const { palette } = config;

  return (
    <>
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: [
            `radial-gradient(ellipse at 18% 12%, ${palette.accent}26, transparent 42%)`,
            `radial-gradient(ellipse at 88% 78%, ${palette.secondary}1f, transparent 46%)`,
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

export function TicketStub({
  config,
  label,
  style,
}: {
  config: DestinationThemeConfig;
  label: string;
  style?: React.CSSProperties | undefined;
}): React.ReactElement {
  const { palette, fonts } = config;

  return (
    <div
      style={{
        position: "absolute",
        padding: "9px 16px",
        border: `1px solid ${palette.ink}33`,
        background: `${palette.paper2}e6`,
        color: palette.inkSoft,
        fontFamily: fonts.sans,
        fontSize: 13,
        fontWeight: 600,
        letterSpacing: ".18em",
        textTransform: "uppercase",
        boxShadow: `0 10px 20px ${palette.ink}18`,
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
  const { palette, fonts, labels } = config;

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
        textTransform: "uppercase",
        transform: "rotate(-9deg)",
        opacity: 0.86,
        ...style,
      }}
    >
      <div style={{ position: "absolute", inset: 7, borderRadius: "50%", border: `1px solid ${palette.accentDeep}99` }} />
      <span>{label ?? labels.stamp}</span>
    </div>
  );
}

export function TapeStrip({
  config,
  style,
}: {
  config: DestinationThemeConfig;
  style?: React.CSSProperties | undefined;
}): React.ReactElement {
  const { palette } = config;

  return (
    <div
      style={{
        position: "absolute",
        width: 84,
        height: 22,
        background: `${palette.highlight}8c`,
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
  const { palette } = config;

  return (
    <div
      style={{
        position: "absolute",
        height: 24,
        backgroundImage: `linear-gradient(45deg, ${palette.secondary} 25%, transparent 25%), linear-gradient(-45deg, ${palette.secondary} 25%, transparent 25%), linear-gradient(45deg, transparent 75%, ${palette.accent} 75%), linear-gradient(-45deg, transparent 75%, ${palette.accent} 75%)`,
        backgroundPosition: "0 0, 0 12px, 12px -12px, -12px 0",
        backgroundSize: "24px 24px",
        opacity: 0.5,
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
  const { palette } = config;

  if (config.motif === "paris") {
    return (
      <svg width={size} height={size} viewBox="0 0 200 200" aria-hidden="true">
        <path d="M88 22 L112 22 L102 85 L145 178 L125 178 L100 111 L75 178 L55 178 L98 85 Z" fill="none" stroke={palette.ink} strokeWidth="5" strokeLinejoin="round" opacity=".5" />
        <path d="M76 72 H124 M67 104 H133 M52 178 H148" stroke={palette.accentDeep} strokeWidth="4" strokeLinecap="round" opacity=".75" />
        <path d="M31 132 C72 106 92 147 130 119 C147 107 162 106 175 112" fill="none" stroke={palette.secondary} strokeWidth="5" strokeLinecap="round" opacity=".65" />
        <circle cx="42" cy="42" r="16" fill="none" stroke={palette.highlight} strokeWidth="3" opacity=".65" />
      </svg>
    );
  }

  if (config.motif === "spain") {
    return (
      <svg width={size} height={size} viewBox="0 0 200 200" aria-hidden="true">
        <path d="M38 64 C58 45 91 38 124 49 C150 58 164 82 158 110 C153 134 132 139 123 158 C111 149 91 151 78 139 C62 124 39 125 32 103 C27 87 27 74 38 64 Z" fill={palette.accent} opacity=".16" stroke={palette.accentDeep} strokeWidth="5" />
        <path d="M58 116 C78 96 104 95 124 74 C137 61 150 61 163 66" fill="none" stroke={palette.secondary} strokeWidth="5" strokeLinecap="round" />
        <path d="M56 55 L76 55 L76 75 L56 75 Z M99 43 L119 43 L119 63 L99 63 Z M126 126 L146 126 L146 146 L126 146 Z" fill="none" stroke={palette.highlight} strokeWidth="4" opacity=".8" />
      </svg>
    );
  }

  return (
    <svg width={size} height={size} viewBox="0 0 200 200" aria-hidden="true">
      <path d="M28 136 C58 108 85 139 110 103 C130 75 150 78 174 55" fill="none" stroke={palette.highlight} strokeWidth="8" strokeLinecap="round" opacity=".75" />
      <path d="M72 136 H128 L118 82 L100 48 L82 82 Z" fill="none" stroke={palette.accentDeep} strokeWidth="5" strokeLinejoin="round" />
      <path d="M62 136 H138 M80 84 H120 M88 70 H112" stroke={palette.accentDeep} strokeWidth="4" strokeLinecap="round" />
      <circle cx="154" cy="52" r="16" fill={palette.secondary} opacity=".55" />
      <path d="M43 151 C62 161 83 163 107 158 C129 154 151 145 169 132" fill="none" stroke={palette.secondaryDeep} strokeWidth="4" strokeLinecap="round" opacity=".55" />
    </svg>
  );
}

export function RouteMap({ config }: { config: DestinationThemeConfig }): React.ReactElement {
  const { palette, labels } = config;
  const points = [
    { x: 72, y: 215 },
    { x: 182, y: 169 },
    { x: 313, y: 100 },
    { x: 455, y: 58 },
  ];

  return (
    <svg viewBox="0 0 520 320" width="520" height="320" aria-hidden="true">
      <rect x="0" y="0" width="520" height="320" fill="transparent" />
      <path d="M46 236 C96 178 135 227 182 169 C229 112 266 141 313 100 C368 53 412 85 472 44" fill="none" stroke={palette.secondary} strokeWidth="8" strokeLinecap="round" opacity=".58" />
      <path d="M54 244 C103 184 144 232 192 174 C239 117 275 147 323 106 C378 59 421 91 480 52" fill="none" stroke={palette.paper} strokeWidth="2" strokeLinecap="round" opacity=".75" />
      {points.map((point) => (
        <g key={point.x}>
          <circle cx={point.x} cy={point.y} r="10" fill={palette.accentDeep} />
          <circle cx={point.x} cy={point.y} r="20" fill="none" stroke={palette.accentDeep} strokeWidth="2" opacity=".36" />
        </g>
      ))}
      <text x="36" y="292" fill={palette.inkSoft} fontFamily={config.fonts.mono} fontSize="12" letterSpacing="2">
        {labels.coordinates}
      </text>
    </svg>
  );
}
