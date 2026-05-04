import React from "react";
import type { SpreadComposerProps } from "../registry";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function CityComposer(_props: SpreadComposerProps): React.ReactElement {
  return (
    <div className="flex h-full w-full items-center justify-center" style={{ background: "#1c2025" }}>
      <div style={{ textAlign: "center", color: "#a8b0b0", padding: "0 40px" }}>
        <div style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 11, letterSpacing: ".3em", textTransform: "uppercase", marginBottom: 16 }}>
          Coming Soon
        </div>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 42, fontWeight: 300, fontStyle: "italic", lineHeight: 1.1, color: "#ecebe2" }}>
          City Lights
        </h2>
        <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: 14, marginTop: 12, opacity: 0.7 }}>
          Urban architecture, neon, and concrete.<br />This theme is under construction.
        </p>
      </div>
    </div>
  );
}
