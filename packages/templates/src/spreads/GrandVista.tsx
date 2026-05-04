import React from "react";
import { PageBg, Photo } from "../components/PageShell";

export type GrandVistaProps = {
  photoUrl: string | undefined;
  caption: string | undefined;
  subtitle?: string | undefined;
};

export default function GrandVista({ photoUrl, caption, subtitle }: GrandVistaProps): React.ReactElement {
  return (
    <PageBg>
      <Photo src={photoUrl} style={{ position: "absolute", inset: 0 }} />

      {/* dark gradient at bottom for text */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(20,12,6,.65) 100%)",
        }}
      />
      {/* warm color overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(217,164,65,.08), rgba(139,58,30,.18))",
          mixBlendMode: "multiply",
        }}
      />

      {/* corner frame */}
      <div
        style={{ position: "absolute", inset: 24, border: "1px solid rgba(243,231,209,.35)", pointerEvents: "none" }}
      />
      <div
        style={{ position: "absolute", inset: 32, border: "0.5px solid rgba(243,231,209,.25)", pointerEvents: "none" }}
      />

      {/* tape at top corners */}
      <div
        style={{
          position: "absolute",
          top: 8,
          left: 36,
          width: 70,
          height: 18,
          background: "linear-gradient(180deg, rgba(243,231,209,.7), rgba(225,210,180,.7))",
          transform: "rotate(-12deg)",
          opacity: 0.9,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 8,
          right: 36,
          width: 70,
          height: 18,
          background: "linear-gradient(180deg, rgba(243,231,209,.7), rgba(225,210,180,.7))",
          transform: "rotate(10deg)",
          opacity: 0.9,
        }}
      />

      {/* caption block */}
      <div style={{ position: "absolute", left: 56, right: 56, bottom: 56, color: "#f3e7d1" }}>
        <div className="smallcaps" style={{ fontSize: 11, opacity: 0.8, letterSpacing: "0.4em" }}>
          plate xiv
        </div>
        <h2 className="f-display" style={{ fontSize: 52, lineHeight: 1, margin: "10px 0 8px", fontStyle: "italic" }}>
          {caption || "The first sight of the sea"}
        </h2>
        <div className="f-script" style={{ fontSize: 26, opacity: 0.92 }}>
          {subtitle || "— somewhere south of here, dawn —"}
        </div>
      </div>

      <div
        className="page-num"
        style={{ left: "50%", transform: "translateX(-50%)", color: "#f3e7d1", opacity: 0.6 }}
      >
        14
      </div>
    </PageBg>
  );
}
