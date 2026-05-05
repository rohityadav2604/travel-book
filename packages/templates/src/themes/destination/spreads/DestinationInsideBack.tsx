import React from "react";
import { PaperTexture, StampMark, TicketStub, RouteMap, DestinationMotif, TileBorder } from "../components/motifs";
import type { DestinationThemeConfig } from "../types";

export default function DestinationInsideBack({
  config,
  tripStats,
  texts,
}: {
  config: DestinationThemeConfig;
  tripStats?: { label: string; value: string }[] | undefined;
  texts?: Record<string, string> | undefined;
}): React.ReactElement {
  const { palette, fonts, labels } = config;

  const stats = tripStats?.length
    ? tripStats
    : [
        { label: texts?.stat1Label ?? "Countries", value: texts?.stat1Value ?? "11" },
        { label: texts?.stat2Label ?? "Cities", value: texts?.stat2Value ?? "37" },
        { label: texts?.stat3Label ?? "Days", value: texts?.stat3Value ?? "94" },
        { label: texts?.stat4Label ?? "Photographs", value: texts?.stat4Value ?? "212" },
      ];

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

      {/* Faded RouteMap as watermark */}
      <div style={{ position: "absolute", left: 30, top: 90, opacity: 0.08 }}>
        <RouteMap config={config} />
      </div>

      {/* Faded DestinationMotif */}
      <div style={{ position: "absolute", right: -30, bottom: -20, opacity: 0.08 }}>
        <DestinationMotif config={config} variant="large" />
      </div>

      {/* Content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 70px",
        }}
      >
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: palette.inkFaded,
            marginBottom: 36,
          }}
        >
          {texts?.heading ?? "the journey in numbers"}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "36px 56px",
            textAlign: "center",
          }}
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <p
                style={{
                  fontFamily: fonts.display,
                  fontSize: 42,
                  fontWeight: 700,
                  fontStyle: "italic",
                  color: palette.accentDeep,
                  lineHeight: 1,
                  margin: 0,
                }}
              >
                {stat.value}
              </p>
              <p
                style={{
                  fontFamily: fonts.sans,
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: palette.inkFaded,
                  marginTop: 8,
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 44 }}>
          <StampMark
            config={config}
            label={texts?.stampCity ?? "THE WORLD"}
            style={{ transform: "rotate(6deg)", opacity: 0.8 }}
          />
        </div>
      </div>

      {/* Coordinates ticket */}
      <TicketStub
        config={config}
        label={texts?.coordinates ?? labels.coordinates}
        style={{ left: 55, bottom: 52, transform: "rotate(-4deg)" }}
      />

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
        {texts?.pageNumber ?? "— cvi —"}
      </div>
    </div>
  );
}
