import React from "react";
/** Reusable page shell and photo wrapper ported from the Wanderbound design reference. */

export function PageBg({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <div
      style={{
        position: "relative",
        width: 600,
        height: 600,
        background: "#f3e7d1",
        overflow: "hidden",
        color: "#2c1f15",
        fontFamily: "'Cormorant Garamond', Georgia, serif",
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
