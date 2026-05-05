import React from "react";
import { DestinationMotif, EphemeraScrap, PaperTexture, StampMark, TileBorder } from "../components/motifs";
import type { DestinationThemeConfig } from "../types";

export default function DestinationQuote({
  config,
  texts,
}: {
  config: DestinationThemeConfig;
  texts?: Record<string, string> | undefined;
}): React.ReactElement {
  const { palette, fonts } = config;

  return (
    <div
      style={{
        position: "relative",
        width: 600,
        height: 600,
        overflow: "hidden",
        background: palette.paper,
        color: palette.ink,
      }}
    >
      <PaperTexture config={config} />
      <TileBorder config={config} style={{ left: 0, right: 0, top: 0 }} />

      {/* Faded motif top-right */}
      <div style={{ position: "absolute", right: -40, top: -30, opacity: 0.1 }}>
        <DestinationMotif config={config} variant="large" />
      </div>

      {/* Stamp mark bottom-left */}
      <StampMark
        config={config}
        label={texts?.stampCity ?? config.labels.stamp}
        style={{ left: 50, bottom: 55, transform: "rotate(-12deg)", opacity: 0.6 }}
      />
      <EphemeraScrap config={config} variant="tab" style={{ right: 58, bottom: 72, transform: "rotate(7deg)" }} />

      {/* Centered quote block */}
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
        }}
      >
        {/* Decorative rule */}
        <div
          style={{
            width: 60,
            height: 2,
            background: palette.accentDeep,
            opacity: 0.35,
            marginBottom: 32,
          }}
        />

        <p
          style={{
            fontFamily: fonts.display,
            fontSize: 32,
            fontWeight: 700,
            fontStyle: "italic",
            lineHeight: 1.25,
            color: palette.ink,
            textWrap: "balance",
            margin: 0,
          }}
        >
          {(texts?.quote ?? "Not all those who wander are lost —\nsome of us are simply taking\nthe long way home.").split("\n").map((line) => (
            <React.Fragment key={line}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>

        {/* Decorative rule */}
        <div
          style={{
            width: 60,
            height: 2,
            background: palette.accentDeep,
            opacity: 0.35,
            marginTop: 32,
          }}
        />

        <p
          style={{
            marginTop: 20,
            fontFamily: fonts.serif,
            fontSize: 15,
            fontStyle: "italic",
            color: palette.inkSoft,
          }}
        >
          {texts?.attribution ?? "— found in a guesthouse ledger"}
        </p>
      </div>

      {/* Page number */}
      <div
        style={{
          position: "absolute",
          bottom: 28,
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: fonts.mono,
          fontSize: 10,
          letterSpacing: "0.2em",
          color: palette.inkFaded,
          textTransform: "uppercase",
        }}
      >
        {texts?.pageNumber ?? "— fin —"}
      </div>
    </div>
  );
}
