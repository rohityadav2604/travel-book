import React from "react";
import { PageBg, Photo } from "../components/PageShell";
import { Flourish, PassportStamp, Botanical } from "@memorybook/design/components/decorations";

export type GoldenHourProps = {
  leftPhotoUrl: string | undefined;
  rightPhotos: { url: string | undefined; caption?: string }[];
};

export default function GoldenHour({ leftPhotoUrl, rightPhotos }: GoldenHourProps): React.ReactElement {
  return (
    <PageBg>
      {/* Left page — full bleed warm landscape */}
      <div style={{ position: "absolute", top: 0, left: 0, width: 340, height: 600, overflow: "hidden" }}>
        {leftPhotoUrl && <Photo src={leftPhotoUrl} style={{ position: "absolute", inset: 0 }} />}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at center, transparent 40%, rgba(44,31,21,.25) 100%)",
            pointerEvents: "none",
          }}
        />
        {/* warm multiply overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(217,164,65,.12), rgba(139,58,30,.22))",
            mixBlendMode: "multiply",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Right page — cream column with portraits */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 340,
          width: 260,
          height: 600,
          background: "#f3e7d1",
          padding: "20px 16px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <div className="smallcaps" style={{ fontSize: 10, color: "var(--ink-faded)", marginBottom: 4 }}>golden hour · plate vi</div>
        <h3 className="f-display" style={{ fontSize: 26, fontStyle: "italic", margin: 0, color: "var(--ink)" }}>
          Evening Light
        </h3>
        <Flourish width={180} color="#8b3a1e" />

        {rightPhotos.slice(0, 3).map((photo, i) => (
          <div key={i} style={{ position: "relative", width: "100%", height: 140, overflow: "hidden", borderRadius: 2, border: "1px solid rgba(44,31,21,.1)" }}>
            {photo.url && <Photo src={photo.url} style={{ position: "absolute", inset: 0 }} />}
            {photo.caption && (
              <p
                className="f-script"
                style={{
                  position: "absolute",
                  bottom: 4,
                  right: 8,
                  fontSize: 14,
                  color: "rgba(243,231,209,.9)",
                  textShadow: "0 1px 3px rgba(0,0,0,.4)",
                }}
              >
                {photo.caption}
              </p>
            )}
          </div>
        ))}

        <div style={{ marginTop: "auto" }}>
          <p className="f-serif" style={{ fontStyle: "italic", fontSize: 13, lineHeight: 1.5, color: "var(--ink-soft)" }}>
            The light here arrives slowly and leaves all at once — by six the walls turn the color of saffron, and by seven they are violet.
          </p>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 50, left: 20, opacity: 0.5 }}>
        <Botanical size={60} rotate={-15} />
      </div>

      <div style={{ position: "absolute", top: 80, right: 20 }}>
        <PassportStamp city="GOLDEN" date="19·VIII·74" color="terra" rotate={12} />
      </div>

      <div className="page-num" style={{ left: "50%", transform: "translateX(-50%)" }}>
        — 22 —
      </div>
    </PageBg>
  );
}
