import React from "react";
import { HPageBg, HPhoto } from "../components/PageShell";

export type HighlandQuoteProps = {
  quote?: string | undefined;
  caption?: string | undefined;
  texts?: Record<string, string> | undefined;
};

export default function HighlandQuote({ quote, caption, texts }: HighlandQuoteProps): React.ReactElement {
  return (
    <HPageBg variant="dark">
      <HPhoto src={undefined} slotId={undefined} style={{ position: "absolute", inset: 0, opacity: 0 }} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(20,30,25,.55), rgba(20,30,25,.85))",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 80px",
          textAlign: "center",
          color: "#ecebe2",
        }}
      >
        <div style={{ width: 50, height: 1, background: "#b8c2a3", opacity: 0.35 }} />
        <p
          className="m-display"
          style={{
            fontSize: 36,
            lineHeight: 1.25,
            fontStyle: "italic",
            margin: "30px 0",
            fontWeight: 300,
            textWrap: "balance",
            letterSpacing: "-.01em",
            textShadow: "0 2px 12px rgba(0,0,0,.5)",
          }}
        >
          {quote || texts?.quote || "We climb not to leave the world, but to look at it from a quieter window."}
        </p>
        <div style={{ width: 50, height: 1, background: "#b8c2a3", opacity: 0.35 }} />
        <div className="m-script" style={{ fontSize: 20, color: "#b8c2a3", marginTop: 24 }}>
          {caption || texts?.caption || "-- from the cabin journal"}
        </div>
      </div>

      <div className="m-pagenum" style={{ left: "50%", transform: "translateX(-50%)", color: "#b8c2a3" }}>
        {texts?.pageNumber || "-- 50 --"}
      </div>
    </HPageBg>
  );
}
