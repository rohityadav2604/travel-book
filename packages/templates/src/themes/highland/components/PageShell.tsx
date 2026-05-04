import React from "react";
import { useSlotAdjustment } from "../../../components/AdjustmentContext";

export function HPageBg({
  children,
  variant = "light",
}: {
  children: React.ReactNode;
  variant?: "light" | "dark" | "slate" | "bone";
}): React.ReactElement {
  const bg =
    variant === "dark"
      ? "#1f3528"
      : variant === "slate"
        ? "#3b4651"
        : variant === "bone"
          ? "#f3f1e8"
          : "#ecebe2";
  const color = variant === "light" || variant === "bone" ? "#1a2218" : "#ecebe2";

  return (
    <div
      style={{
        position: "relative",
        width: 600,
        height: 600,
        background: bg,
        color,
        overflow: "hidden",
        fontFamily: "'Source Serif 4', Georgia, serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: [
            "radial-gradient(ellipse at 50% 50%, rgba(255,255,250,.5), transparent 70%)",
            "radial-gradient(ellipse at 20% 80%, rgba(60,80,60,.06), transparent 50%)",
            "radial-gradient(ellipse at 80% 20%, rgba(60,80,60,.05), transparent 50%)",
          ].join(", "),
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.10, 0 0 0 0 0.14, 0 0 0 0 0.08, 0 0 0 0.14 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          mixBlendMode: "multiply",
          opacity: 0.25,
          pointerEvents: "none",
        }}
      />
      {children}
      <div
        style={{
          position: "absolute",
          inset: 0,
          boxShadow: "inset 0 0 50px rgba(40,55,40,.12)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

function getAdjustmentTransform(adj?: { offsetX: number; offsetY: number; zoom: number; rotation: number }): React.CSSProperties {
  if (!adj) return {};
  return {
    transform: `translate(${adj.offsetX}%, ${adj.offsetY}%) scale(${adj.zoom}) rotate(${adj.rotation}deg)`,
    transformOrigin: "center center",
  };
}

export function HPhoto({
  src,
  style,
  archival,
  slotId,
}: {
  src: string | undefined;
  style?: React.CSSProperties;
  archival?: boolean;
  slotId?: string | undefined;
}): React.ReactElement {
  const adjustment = useSlotAdjustment(slotId);

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#1a2218",
        boxShadow: "0 1px 2px rgba(20,30,20,.1), 0 14px 30px rgba(20,30,20,.18)",
        ...style,
      }}
    >
      {src && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "contrast(.95) saturate(.85)",
            ...getAdjustmentTransform(adjustment),
          }}
        />
      )}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(120,140,120,.06), rgba(40,55,45,.10))",
          mixBlendMode: "multiply",
          pointerEvents: "none",
        }}
      />
      {archival && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            border: "1px solid #6b7568",
            padding: 4,
            background: "#f3f1e8",
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
}
