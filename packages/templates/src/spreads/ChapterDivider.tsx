import React from "react";
import { PageBg } from "../components/PageShell";
import { Flourish, PassportStamp, Botanical, FernSprig } from "@memorybook/design/components/decorations";

export type ChapterDividerProps = {
  photoUrl: string | undefined;
  label: string | undefined;
  texts?: Record<string, string> | undefined;
};

export default function ChapterDivider({ label, texts }: ChapterDividerProps): React.ReactElement {
  return (
    <PageBg>
      <div style={{ position: "absolute", top: 56, left: 56, right: 56, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div className="smallcaps" style={{ fontSize: 11, color: "var(--ink-faded)" }}>{texts?.chapterHeader || "Chapter Two"}</div>
        <div className="smallcaps" style={{ fontSize: 11, color: "var(--ink-faded)" }}>{texts?.pageRange || "pp. 24 - 47"}</div>
      </div>

      <Flourish width={120} color="#8b3a1e" style={{ position: "absolute", top: 92, left: "50%", transform: "translateX(-50%)" }} />

      {/* large overlapping number */}
      <div
        className="f-display"
        style={{
          position: "absolute",
          top: "26%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: 280,
          lineHeight: 1,
          color: "var(--terracotta)",
          opacity: 0.14,
          fontStyle: "italic",
          pointerEvents: "none",
        }}
      >
        {texts?.numeral || "II"}
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 80px",
        }}
      >
        <div className="f-script" style={{ fontSize: 32, color: "var(--terracotta-deep)", marginBottom: 8 }}>
          {texts?.pretitle || "the long way to"}
        </div>
        <h2 className="f-display" style={{ fontSize: 86, lineHeight: 1, margin: 0, color: "var(--ink)", fontStyle: "italic" }}>
          {label || texts?.label || "Chapter"}
        </h2>
        <div className="smallcaps" style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 24, letterSpacing: ".4em" }}>
          {texts?.dateRange || "June · July · 1974"}
        </div>
        <div style={{ marginTop: 40, maxWidth: 380 }}>
          <p className="f-serif" style={{ fontStyle: "italic", fontSize: 18, lineHeight: 1.6, color: "var(--ink-soft)", textWrap: "pretty" }}>
            &ldquo;{texts?.quote || "We took the slow train south, the kind with windows that open and a conductor who hummed the same six bars all the way to Orvieto."}&rdquo;
          </p>
        </div>
      </div>

      <Botanical size={90} rotate={-12} style={{ position: "absolute", bottom: 70, left: 70, opacity: 0.55 }} />
      <FernSprig size={70} rotate={20} style={{ position: "absolute", bottom: 60, right: 90, opacity: 0.55 }} />

      <PassportStamp city={texts?.stampCity || "TUSCANIA"} date={texts?.stampDate || "VI · MCMLXXIV"} shape="circle" color="olive" rotate={-15} style={{ position: "absolute", top: 140, right: 60 }} />

      <Flourish width={120} color="#8b3a1e" style={{ position: "absolute", bottom: 100, left: "50%", transform: "translateX(-50%)" }} />
      <div className="page-num" style={{ left: "50%", transform: "translateX(-50%)" }}>{texts?.pageNumber || "-- ii --"}</div>
    </PageBg>
  );
}
