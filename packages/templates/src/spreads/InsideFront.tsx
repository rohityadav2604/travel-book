import React from "react";
import { PageBg, Photo } from "../components/PageShell";
import { Flourish, PassportStamp, Botanical } from "@memorybook/design/components/decorations";

export type InsideFrontProps = {
  quote: string | undefined;
  photoUrl: string | undefined;
  texts?: Record<string, string> | undefined;
};

export default function InsideFront({ quote, photoUrl, texts }: InsideFrontProps): React.ReactElement {
  const renderedQuote = quote || texts?.quote || "The world is a book, and those who do not travel read only one page.";
  const attribution = texts?.attribution || "-- st. augustine";

  return (
    <PageBg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 60px",
        }}
      >
        <Flourish width={120} color="#8b3a1e" />
        <p
          className="f-serif"
          style={{
            fontStyle: "italic",
            fontSize: 22,
            lineHeight: 1.5,
            color: "var(--ink-soft)",
            textAlign: "center",
            margin: "24px 0",
            maxWidth: 420,
          }}
        >
          &ldquo;{renderedQuote}&rdquo;
        </p>
        <div className="smallcaps" style={{ fontSize: 11, color: "var(--ink-faded)", letterSpacing: "0.3em" }}>
          {attribution}
        </div>
        <Flourish width={120} color="#8b3a1e" style={{ marginTop: 24 }} />

        {photoUrl && (
          <div
            style={{
              marginTop: 32,
              padding: 10,
              background: "#f7ecd4",
              boxShadow: "0 8px 20px rgba(44,31,21,.18)",
              transform: "rotate(-3deg)",
            }}
          >
            <Photo src={photoUrl} style={{ position: "relative", width: 160, height: 160 }} />
          </div>
        )}
      </div>

      <div style={{ position: "absolute", top: 60, right: 60 }}>
        <PassportStamp city={texts?.stampCity || "DEPART"} date={texts?.stampDate || "01·I·74"} color="olive" rotate={-8} />
      </div>

      <div style={{ position: "absolute", bottom: 60, left: 50, opacity: 0.5 }}>
        <Botanical size={70} rotate={20} />
      </div>

      <div className="page-num" style={{ left: "50%", transform: "translateX(-50%)" }}>
        {texts?.pageNumber || "-- ii --"}
      </div>
    </PageBg>
  );
}
