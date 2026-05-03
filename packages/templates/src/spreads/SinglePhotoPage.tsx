import React from "react";
import { PageBg, Photo } from "../components/PageShell";
import { Flourish, Tape, PassportStamp } from "@memorybook/design/components/decorations";

export type SinglePhotoPageProps = {
  photoUrl: string | undefined;
  title?: string;
  date?: string;
  time?: string;
  caption?: string;
  location?: string;
  locationDate?: string;
};

export default function SinglePhotoPage({
  photoUrl,
  title = "A morning in Lisbon",
  date = "JUL · 03",
  time = "07:42",
  caption = "The yellow tram woke me before the bells did. I sat on the windowsill with cold coffee and watched the city remember itself.",
  location = "LISBOA",
  locationDate = "03·VII·74",
}: SinglePhotoPageProps): React.ReactElement {
  return (
    <PageBg>
      <div style={{ position: "absolute", top: 60, left: 60, right: 60 }}>
        <div className="smallcaps" style={{ fontSize: 11, color: "var(--ink-faded)", textAlign: "center", letterSpacing: ".5em" }}>
          — observed —
        </div>
        <h3 className="f-display" style={{ fontSize: 38, fontStyle: "italic", textAlign: "center", margin: "8px 0 4px", color: "var(--ink)" }}>
          {title}
        </h3>
        <Flourish width={80} color="#8b3a1e" style={{ display: "block", margin: "0 auto" }} />
      </div>

      <div style={{ position: "absolute", top: 170, left: 80, right: 80, bottom: 220 }}>
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            padding: 14,
            background: "#f7ecd4",
            boxShadow: "0 1px 2px rgba(0,0,0,.1), 0 18px 40px rgba(44,31,21,.22)",
          }}
        >
          <Photo src={photoUrl} style={{ position: "absolute", top: 14, left: 14, right: 14, bottom: 14 }} />
          <Tape width={64} color="terra" rotate={-8} style={{ position: "absolute", top: -10, left: 24 }} />
          <Tape width={64} color="terra" rotate={6} style={{ position: "absolute", top: -10, right: 24 }} />
        </div>
      </div>

      <div style={{ position: "absolute", left: 80, right: 80, bottom: 90, display: "flex", gap: 24, alignItems: "flex-start" }}>
        <div style={{ flex: "0 0 auto", width: 80 }}>
          <div className="f-mono" style={{ fontSize: 11, color: "var(--ink-faded)", letterSpacing: ".15em" }}>{date}</div>
          <div className="f-mono" style={{ fontSize: 9, color: "var(--ink-faded)", letterSpacing: ".15em", marginTop: 2 }}>{time}</div>
        </div>
        <div style={{ flex: 1, borderLeft: "1px solid var(--ink-faded)", paddingLeft: 24, opacity: 0.9 }}>
          <p className="f-script" style={{ fontSize: 22, lineHeight: 1.35, margin: 0, color: "var(--ink-soft)" }}>
            {caption}
          </p>
        </div>
      </div>

      <PassportStamp city={location} date={locationDate} color="terra" rotate={8} style={{ position: "absolute", top: 200, right: 28 }} />

      <div className="page-num">— 27 —</div>
    </PageBg>
  );
}
