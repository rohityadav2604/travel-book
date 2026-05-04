import React from "react";
import { HPageBg, HPhoto } from "../components/PageShell";
import { AnimalTracks } from "@memorybook/design/components/highland";

export type HighlandJournalProps = {
  leftPhotoUrl: string | undefined;
  topRightPhotoUrl: string | undefined;
  bottomRightPhotoUrl: string | undefined;
  quote?: string | undefined;
  date?: string | undefined;
};

export default function HighlandJournal({ leftPhotoUrl, quote, date }: HighlandJournalProps): React.ReactElement {
  return (
    <HPageBg>
      <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: 260 }}>
        <HPhoto src={leftPhotoUrl} style={{ width: "100%", height: "100%" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(20,30,25,.2), rgba(20,30,25,.5))" }} />
        <div style={{ position: "absolute", top: 50, left: 24, right: 24, color: "#ecebe2" }}>
          <div className="m-caps" style={{ fontSize: 9, opacity: 0.9, letterSpacing: ".35em" }}>DAY 9</div>
          <h3
            className="m-display"
            style={{
              fontSize: 36,
              fontStyle: "italic",
              margin: "8px 0 0",
              lineHeight: 1,
              fontWeight: 300,
              letterSpacing: "-.02em",
              textShadow: "0 2px 6px rgba(0,0,0,.5)",
            }}
          >
            The saddle
          </h3>
        </div>
        <div style={{ position: "absolute", bottom: 30, left: 24, right: 24, color: "#b8c2a3" }}>
          <div className="m-mono" style={{ fontSize: 9, letterSpacing: ".15em" }}>
            {date || "OCT · 18 · 14h 06"}
          </div>
          <div className="m-mono" style={{ fontSize: 9, letterSpacing: ".15em", marginTop: 4, opacity: 0.8 }}>
            NW 22kt · -2°C
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", top: 56, left: 290, right: 56, bottom: 56 }}>
        <div className="m-caps" style={{ fontSize: 9, color: "#4a6346", letterSpacing: ".3em" }}>FIELD JOURNAL</div>
        <div style={{ width: 50, height: 1, background: "#4a6346", opacity: 0.35, marginTop: 10 }} />

        <p className="m-serif" style={{ fontSize: 13, lineHeight: 1.7, color: "#1a2218", margin: "20px 0 0", textWrap: "pretty", fontStyle: "italic" }}>
          {quote || "Crossed the saddle in low cloud. The cairns kept their distance and the wind kept ours."}
        </p>
        <p className="m-script" style={{ fontSize: 17, lineHeight: 1.4, color: "#3a4438", margin: "14px 0 0", textWrap: "pretty" }}>
          Saw a chamois. Did not photograph it.
        </p>

        <div style={{ marginTop: 22, paddingTop: 14, borderTop: "1px solid #6b7568" }}>
          <div className="m-caps" style={{ fontSize: 9, color: "#4a6346", letterSpacing: ".25em" }}>SIGHTINGS</div>
          <div className="m-mono" style={{ fontSize: 10, color: "#3a4438", marginTop: 8, lineHeight: 1.7 }}>
            chamois · 1 &nbsp;&nbsp; raven · 4
            <br />
            ibex sign · yes &nbsp;&nbsp; wolf · no
          </div>
          <AnimalTracks style={{ marginTop: 10, opacity: 0.8, width: "100%" }} />
        </div>

        <div className="m-script" style={{ position: "absolute", bottom: 0, right: 0, fontSize: 22, color: "#1f3528" }}>
          — E.
        </div>
      </div>

      <div className="m-pagenum">— 41 —</div>
    </HPageBg>
  );
}
