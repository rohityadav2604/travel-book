import React from "react";
import { HPageBg, HPhoto } from "../components/PageShell";
import { MountainSilhouette, MCompass } from "@memorybook/design/components/highland";

export type HighlandCoverProps = {
  heroUrl: string | undefined;
  title: string | undefined;
  date: string | undefined;
  texts?: Record<string, string> | undefined;
};

export default function HighlandCover({ heroUrl, title, date, texts }: HighlandCoverProps): React.ReactElement {
  return (
    <HPageBg variant="dark">
      {heroUrl && <HPhoto src={heroUrl} style={{ position: "absolute", inset: 0, opacity: 0.55 }} />}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(31,53,40,.55), rgba(20,30,25,.85))",
        }}
      />
      <MountainSilhouette width={600} height={260} color="#1a2218" style={{ position: "absolute", bottom: 0, left: 0 }} />

      <div style={{ position: "absolute", top: 60, left: 0, right: 0, textAlign: "center" }}>
        <div className="m-caps" style={{ color: "#b8c2a3", fontSize: 10 }}>
          {texts?.volumeLabel || "VOL · II / A FIELD GUIDE"}
        </div>
      </div>

      <div style={{ position: "absolute", top: 200, left: 0, right: 0, textAlign: "center", color: "#ecebe2" }}>
        <h1
          className="m-display"
          style={{
            fontSize: 96,
            fontWeight: 300,
            margin: 0,
            letterSpacing: "-.03em",
            lineHeight: 0.95,
            fontStyle: "italic",
          }}
        >
          {title || texts?.title || "Highland"}
        </h1>
        <div className="m-caps" style={{ marginTop: 16, fontSize: 10, color: "#b8c2a3", letterSpacing: ".5em" }}>
          {date || texts?.date || "NOTES FROM THE QUIET COUNTRY"}
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 60, left: 0, right: 0, textAlign: "center", color: "#b8c2a3" }}>
        <div className="m-mono" style={{ fontSize: 10, letterSpacing: ".25em" }}>
          {texts?.coords || "47°.32′N · 11°.84′E"}
        </div>
        <div className="m-mono" style={{ fontSize: 9, letterSpacing: ".2em", marginTop: 6, opacity: 0.7 }}>
          {texts?.season || "OCT -- NOV · MMXXIV"}
        </div>
      </div>

      <div style={{ position: "absolute", top: 60, right: 50 }}>
        <MCompass size={50} style={{ filter: "invert(1) opacity(.5)" }} />
      </div>
      <div style={{ position: "absolute", inset: 26, border: "1px solid rgba(184,194,163,.25)", pointerEvents: "none" }} />
    </HPageBg>
  );
}
