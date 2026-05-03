import React from "react";
export type ContactSheetProps = {
  photos: Array<{ url: string | undefined; caption?: string }>;
};

export default function ContactSheet({ photos }: ContactSheetProps): React.ReactElement {
  const gridPhotos = photos.slice(0, 9);
  const cols = 3;
  const rows = Math.ceil(gridPhotos.length / cols);

  return (
    <div
      style={{
        position: "relative",
        width: 600,
        height: 600,
        background: "#2c1f15",
        overflow: "hidden",
        fontFamily: "'Cormorant Garamond', Georgia, serif",
      }}
    >
      {/* Paper grain for film feel */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
          mixBlendMode: "multiply",
          opacity: 0.15,
          pointerEvents: "none",
        }}
      />

      {/* Film perforations top */}
      <div style={{ position: "absolute", top: 20, left: 20, right: 20, display: "flex", gap: 6, justifyContent: "center" }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} style={{ width: 10, height: 12, borderRadius: 2, background: "rgba(243,231,209,.15)" }} />
        ))}
      </div>

      {/* Film header */}
      <div className="f-mono" style={{ position: "absolute", top: 42, left: 28, fontSize: 9, letterSpacing: "0.15em", color: "rgba(243,231,209,.4)" }}>
        KODAK TRI-X 400 · 36 EXP
      </div>
      <div className="f-mono" style={{ position: "absolute", top: 42, right: 28, fontSize: 9, letterSpacing: "0.15em", color: "rgba(243,231,209,.4)" }}>
        ROLL 07
      </div>

      {/* Photo grid */}
      <div
        style={{
          position: "absolute",
          top: 68,
          left: 24,
          right: 24,
          bottom: 48,
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          gap: 4,
        }}
      >
        {gridPhotos.map((p, i) => (
          <div key={i} style={{ position: "relative", overflow: "hidden", background: "#1a120c" }}>
            {p.url && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `url(${p.url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "saturate(.7) contrast(1.1) sepia(.25) brightness(.95)",
                }}
              />
            )}
            {/* Frame number */}
            <div
              className="f-mono"
              style={{
                position: "absolute",
                bottom: 2,
                right: 4,
                fontSize: 8,
                color: "rgba(243,231,209,.35)",
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </div>
            {p.caption && (
              <div
                className="f-mono"
                style={{
                  position: "absolute",
                  bottom: 2,
                  left: 4,
                  fontSize: 7,
                  color: "rgba(243,231,209,.45)",
                  maxWidth: "70%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {p.caption}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Film perforations bottom */}
      <div style={{ position: "absolute", bottom: 16, left: 20, right: 20, display: "flex", gap: 6, justifyContent: "center" }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} style={{ width: 10, height: 12, borderRadius: 2, background: "rgba(243,231,209,.15)" }} />
        ))}
      </div>
    </div>
  );
}
