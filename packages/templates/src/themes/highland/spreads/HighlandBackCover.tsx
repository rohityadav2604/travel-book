import React from "react";
import { HPageBg } from "../components/PageShell";

export type HighlandBackCoverProps = {
  brand?: string | undefined;
};

export default function HighlandBackCover({ brand }: HighlandBackCoverProps): React.ReactElement {
  return (
    <HPageBg variant="dark">
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 60px", color: "#b8c2a3" }}>
        <div className="m-display" style={{ fontSize: 32, fontStyle: "italic", fontWeight: 300, letterSpacing: "-.02em" }}>
          {brand || "Highland"}
        </div>
        <div style={{ width: 60, height: 1, background: "#b8c2a3", opacity: 0.35, margin: "16px 0" }} />
        <div className="m-mono" style={{ fontSize: 9, letterSpacing: ".25em", opacity: 0.7 }}>
          A FIELD GUIDE TO THE QUIET COUNTRY
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 40, left: 0, right: 0, textAlign: "center" }}>
        <div className="m-mono" style={{ fontSize: 9, letterSpacing: ".15em", color: "#b8c2a3", opacity: 0.5 }}>
          PRINTED IN THE MOUNTAINS
        </div>
      </div>
      <div style={{ position: "absolute", inset: 30, border: "1px solid rgba(184,194,163,.15)", pointerEvents: "none" }} />
    </HPageBg>
  );
}
