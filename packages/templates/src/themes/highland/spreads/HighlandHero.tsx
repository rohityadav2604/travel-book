import React from "react";
import { HPageBg, HPhoto } from "../components/PageShell";

export type HighlandHeroProps = {
  photoUrl: string | undefined;
  caption?: string | undefined;
  subtitle?: string | undefined;
};

export default function HighlandHero({ photoUrl, caption, subtitle }: HighlandHeroProps): React.ReactElement {
  return (
    <HPageBg>
      <HPhoto src={photoUrl} style={{ position: "absolute", inset: 0 }} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, transparent 40%, rgba(20,30,25,.7) 100%)",
        }}
      />
      <div style={{ position: "absolute", inset: 24, border: "1px solid rgba(236,235,226,.3)", pointerEvents: "none" }} />

      <div style={{ position: "absolute", top: 56, left: 56, color: "#ecebe2" }}>
        <div className="m-caps" style={{ fontSize: 10, opacity: 0.8, letterSpacing: ".4em" }}>
          PLATE · VII
        </div>
      </div>
      <div style={{ position: "absolute", top: 56, right: 56, textAlign: "right", color: "#ecebe2" }}>
        <div className="m-mono" style={{ fontSize: 10, letterSpacing: ".25em", opacity: 0.8 }}>
          47°.32′N · 11°.84′E
        </div>
        <div className="m-mono" style={{ fontSize: 9, marginTop: 4, opacity: 0.6 }}>
          05:47 · ELEVATION 1,820m
        </div>
      </div>

      <div style={{ position: "absolute", left: 56, right: 56, bottom: 56, color: "#ecebe2" }}>
        <h2
          className="m-display"
          style={{ fontSize: 52, fontWeight: 300, fontStyle: "italic", lineHeight: 1, margin: "0 0 14px", letterSpacing: "-.02em" }}
        >
          {caption || "The river falls without ceremony."}
        </h2>
        <div className="m-script" style={{ fontSize: 22, color: "#b8c2a3" }}>
          {subtitle || "— north face, before the rain"}
        </div>
      </div>

      <div className="m-pagenum" style={{ left: "50%", transform: "translateX(-50%)", color: "#b8c2a3" }}>
        14
      </div>
    </HPageBg>
  );
}
