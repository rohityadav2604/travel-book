import React from "react";
import { DestinationMotif, EphemeraScrap, PaperTexture, StampMark, TicketStub, TileBorder } from "../components/motifs";
import type { DestinationThemeConfig } from "../types";

export default function DestinationBackCover({
  config,
  brand,
  texts,
}: {
  config: DestinationThemeConfig;
  brand?: string | undefined;
  texts?: Record<string, string> | undefined;
}): React.ReactElement {
  const { palette, fonts, labels } = config;
  const { assetKit } = config;

  return (
    <div
      style={{
        position: "relative",
        width: 600,
        height: 600,
        overflow: "hidden",
        background: palette.paper2,
        color: palette.ink,
      }}
    >
      <PaperTexture config={config} />

      {/* Warm radial wash */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 50% 60%, ${palette.accent}18, ${palette.accentDeep}22 80%)`,
          pointerEvents: "none",
        }}
      />

      {/* Double border frame */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 600 600"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      >
        <rect x="36" y="36" width="528" height="528" fill="none" stroke={palette.accentDeep} strokeWidth="0.8" opacity="0.35" />
        <rect x="44" y="44" width="512" height="512" fill="none" stroke={palette.accentDeep} strokeWidth="0.4" opacity="0.25" />
      </svg>

      {/* Top-right stamp cluster */}
      <div style={{ position: "absolute", top: 55, right: 55, display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-end" }}>
        <div style={{ transform: "rotate(-6deg)" }}>
          <StampMark config={config} label={labels.stamp} style={{ opacity: 0.75 }} />
        </div>
        <TicketStub
          config={config}
          label={texts?.coordinates ?? assetKit.ephemera.secondaryTicket}
          style={{ transform: "rotate(5deg)", background: `${palette.paper}e6` }}
        />
      </div>
      <EphemeraScrap config={config} variant="receipt" style={{ right: 76, bottom: 184, transform: "rotate(7deg)", opacity: 0.86 }} />

      {/* Left address block */}
      <div style={{ position: "absolute", top: 115, left: 58, width: 260 }}>
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 10,
            letterSpacing: "0.2em",
            color: palette.inkFaded,
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          {texts?.returnLabel ?? "— RETURN TO —"}
        </div>
        <div
          style={{
            fontFamily: fonts.script,
            fontSize: 24,
            color: palette.ink,
            marginBottom: 4,
          }}
        >
          {texts?.returnName ?? "the one who wandered"}
        </div>
        <div
          style={{
            fontFamily: fonts.script,
            fontSize: 17,
            color: palette.inkSoft,
            lineHeight: 1.4,
          }}
        >
          {(texts?.returnAddress ?? "c/o the kitchen table\na small flat by the river\nsomewhere quiet, again").split("\n").map((line) => (
            <React.Fragment key={line}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Center sentiment */}
      <div style={{ position: "absolute", top: "42%", left: 60, right: 60, textAlign: "center" }}>
        {/* Decorative rules */}
        <div style={{ width: 100, height: 2, background: palette.accentDeep, opacity: 0.3, margin: "0 auto 28px" }} />
        <p
          style={{
            fontFamily: fonts.display,
            fontSize: 34,
            fontWeight: 700,
            fontStyle: "italic",
            lineHeight: 1.25,
            color: palette.ink,
            margin: 0,
            textWrap: "balance",
          }}
        >
          {(texts?.sentiment ?? "And so we came home,\nfull of weather & light\n& the smell of elsewhere.").split("\n").map((line) => (
            <React.Fragment key={line}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>
        <div style={{ width: 100, height: 2, background: palette.accentDeep, opacity: 0.3, margin: "28px auto 0" }} />
      </div>

      {/* Colophon */}
      <div style={{ position: "absolute", bottom: 108, left: 60, right: 60, textAlign: "center" }}>
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: palette.inkFaded,
          }}
        >
          {texts?.colophonLabel ?? "colophon"}
        </div>
        <p
          style={{
            fontFamily: fonts.serif,
            fontSize: 13,
            fontStyle: "italic",
            color: palette.inkSoft,
            lineHeight: 1.6,
            marginTop: 8,
            maxWidth: 380,
            margin: "8px auto 0",
          }}
        >
          {texts?.colophon ??
            `Bound in ${labels.title}. Set in Bodoni Moda & Source Serif 4. Printed on paper the color of old postcards — this copy belongs to you.`}
        </p>
      </div>

      {/* Bottom tile border */}
      <TileBorder config={config} style={{ left: 0, right: 0, bottom: 0 }} />

      {/* Corner botanical substitutes — small faded motifs */}
      <div style={{ position: "absolute", bottom: 50, left: 60, opacity: 0.12 }}>
        <DestinationMotif config={config} variant="small" />
      </div>
      <div style={{ position: "absolute", bottom: 50, right: 60, opacity: 0.12, transform: "scaleX(-1)" }}>
        <DestinationMotif config={config} variant="small" />
      </div>

      {/* Footer brand */}
      <div
        style={{
          position: "absolute",
          bottom: 22,
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: fonts.mono,
          fontSize: 10,
          letterSpacing: "0.25em",
          color: palette.inkFaded,
          textTransform: "uppercase",
        }}
      >
        {brand ?? texts?.brand ?? labels.title} · ~ FIN ~
      </div>
    </div>
  );
}
