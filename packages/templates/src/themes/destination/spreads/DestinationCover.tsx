import React from "react";
import { AdjustableImg } from "../../../components/PageShell";
import { DestinationMotif, EphemeraScrap, PaperTexture, StampMark, TicketStub, TileBorder } from "../components/motifs";
import type { DestinationThemeConfig } from "../types";

export default function DestinationCover({
  config,
  heroUrl,
  heroSlotId,
  title,
  date,
  texts,
}: {
  config: DestinationThemeConfig;
  heroUrl?: string | undefined;
  heroSlotId?: string | undefined;
  title?: string | undefined;
  date?: string | undefined;
  texts?: Record<string, string> | undefined;
}): React.ReactElement {
  const { palette, fonts, labels } = config;
  const { assetKit } = config;
  const displayTitle = title || texts?.title || labels.title;

  return (
    <div style={{ position: "relative", width: 600, height: 600, overflow: "hidden", background: palette.paper, color: palette.ink }}>
      <PaperTexture config={config} />
      <TileBorder config={config} style={{ left: 0, right: 0, top: 28 }} />
      <TileBorder config={config} style={{ left: 0, right: 0, bottom: 28 }} />

      <div
        style={{
          position: "absolute",
          inset: "56px 52px",
          background: palette.paper2,
          border: `1px solid ${palette.ink}30`,
          boxShadow: `0 22px 45px ${palette.ink}24`,
        }}
      >
        {heroUrl ? (
          <>
            <AdjustableImg
              src={heroUrl}
              slotId={heroSlotId}
              className="absolute inset-0 h-full w-full"
              imgStyle={{ filter: assetKit.photoTreatment.coverFilter }}
            />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, ${palette.night}10 0%, ${palette.night}8f 100%)` }} />
            <div style={{ position: "absolute", inset: 0, background: assetKit.photoTreatment.overlay, mixBlendMode: "overlay" }} />
          </>
        ) : (
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${palette.paper2}, ${palette.paper3})` }} />
        )}

        <div style={{ position: "absolute", right: 22, top: 18, opacity: 0.28 }}>
          <DestinationMotif config={config} variant="large" />
        </div>
        <div style={{ position: "absolute", inset: 18, border: `2px solid ${palette.paper}99` }} />
      </div>

      <div style={{ position: "absolute", left: 84, right: 84, bottom: 104, textAlign: "center" }}>
        <div
          style={{
            display: "inline-block",
            marginBottom: 16,
            color: palette.paper,
            fontFamily: fonts.sans,
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: ".22em",
            textTransform: "uppercase",
          }}
        >
          {texts?.eyebrow || labels.eyebrow}
        </div>
        <h1
          style={{
            color: palette.paper,
            fontFamily: fonts.display,
            fontSize: displayTitle.length > 10 ? 62 : 76,
            fontWeight: 700,
            lineHeight: 0.95,
            textTransform: "uppercase",
          }}
        >
          {displayTitle}
        </h1>
        <p
          style={{
            margin: "18px auto 0",
            maxWidth: 360,
            color: `${palette.paper}d9`,
            fontFamily: fonts.serif,
            fontSize: 18,
            lineHeight: 1.35,
          }}
        >
          {texts?.subtitle || labels.subtitle}
        </p>
      </div>

      <TicketStub config={config} label={texts?.route || labels.route} style={{ left: 55, top: 82, transform: "rotate(-6deg)" }} />
      <EphemeraScrap config={config} variant="tab" style={{ right: 72, top: 92, transform: "rotate(8deg)" }} />
      <EphemeraScrap config={config} variant="label" style={{ left: 76, bottom: 88, transform: "rotate(-4deg)" }} />
      <StampMark config={config} style={{ right: 58, bottom: 62 }} />
      {(date || texts?.date) && (
        <div
          style={{
            position: "absolute",
            left: 72,
            bottom: 64,
            color: palette.inkSoft,
            fontFamily: fonts.mono,
            fontSize: 12,
            letterSpacing: ".16em",
            textTransform: "uppercase",
          }}
        >
          {date || texts?.date}
        </div>
      )}
    </div>
  );
}
