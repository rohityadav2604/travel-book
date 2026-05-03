import React from "react";
import { PageBg } from "../components/PageShell";
import { Flourish, FernSprig, Botanical } from "@memorybook/design/components/decorations";

export type QuotePageProps = {
  quote: string | undefined;
  caption: string | undefined;
};

export default function QuotePage({ quote, caption }: QuotePageProps): React.ReactElement {
  return (
    <PageBg>
      {/* warm vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center, rgba(255,220,170,.22), transparent 60%)",
        }}
      />

      {/* big quotation marks */}
      <div
        className="f-display"
        style={{
          position: "absolute",
          top: 70,
          left: 60,
          fontSize: 220,
          lineHeight: 1,
          color: "var(--terracotta)",
          opacity: 0.25,
          fontStyle: "italic",
        }}
      >
        “
      </div>
      <div
        className="f-display"
        style={{
          position: "absolute",
          bottom: 0,
          right: 60,
          fontSize: 220,
          lineHeight: 1,
          color: "var(--terracotta)",
          opacity: 0.25,
          fontStyle: "italic",
        }}
      >
        ”
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 90px",
          textAlign: "center",
        }}
      >
        <Flourish width={140} color="#8b3a1e" />
        <p
          className="f-display"
          style={{
            fontSize: 44,
            lineHeight: 1.2,
            fontStyle: "italic",
            color: "var(--ink)",
            margin: "32px 0",
            textWrap: "balance",
          }}
        >
          {quote || (
            <>
              Not all those who wander
              <br />
              are lost — some of us
              <br />
              are simply taking the long way home.
            </>
          )}
        </p>
        <Flourish width={140} color="#8b3a1e" />
        <div className="f-script" style={{ fontSize: 26, marginTop: 28, color: "var(--terracotta-deep)" }}>
          {caption || "— found in a guesthouse in Hanoi"}
        </div>
        <div className="smallcaps" style={{ fontSize: 10, color: "var(--ink-faded)", marginTop: 16, letterSpacing: "0.4em" }}>
          author unknown · 1971
        </div>
      </div>

      <div style={{ position: "absolute", top: 80, right: 60, opacity: 0.5 }}>
        <FernSprig size={70} rotate={-30} />
      </div>
      <div style={{ position: "absolute", bottom: 80, left: 50, opacity: 0.5 }}>
        <Botanical size={80} rotate={20} />
      </div>

      <div className="page-num" style={{ left: "50%", transform: "translateX(-50%)" }}>
        — 50 —
      </div>
    </PageBg>
  );
}
