import React from "react";
import { AdjustableImg } from "../../../components/PageShell";
import { DestinationMotif, PaperTexture, StampMark, TicketStub } from "../components/motifs";
import type { DestinationThemeConfig } from "../types";

export default function DestinationHero({
  config,
  photoUrl,
  photoSlotId,
  caption,
  subtitle,
  texts,
}: {
  config: DestinationThemeConfig;
  photoUrl?: string | undefined;
  photoSlotId?: string | undefined;
  caption?: string | undefined;
  subtitle?: string | undefined;
  texts?: Record<string, string> | undefined;
}): React.ReactElement {
  const { palette, fonts, labels } = config;

  return (
    <div style={{ position: "relative", width: 600, height: 600, overflow: "hidden", background: palette.night, color: palette.paper }}>
      {photoUrl ? (
        <AdjustableImg
          src={photoUrl}
          slotId={photoSlotId}
          className="absolute inset-0 h-full w-full"
          imgStyle={{ filter: "saturate(.74) contrast(1.02) sepia(.08) brightness(.72)" }}
        />
      ) : (
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${palette.night}, ${palette.secondaryDeep})` }} />
      )}
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(90deg, ${palette.night}d9 0%, ${palette.night}7a 48%, transparent 100%)` }} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 40%, ${palette.night}d9 100%)` }} />
      <PaperTexture config={config} />

      <div style={{ position: "absolute", right: -32, top: 36, opacity: 0.2, color: palette.paper }}>
        <DestinationMotif config={config} variant="large" />
      </div>

      <div style={{ position: "absolute", left: 54, top: 58, color: palette.highlight, fontFamily: fonts.sans, fontSize: 14, fontWeight: 600, letterSpacing: ".22em", textTransform: "uppercase" }}>
        {texts?.eyebrow || labels.eyebrow}
      </div>

      <div style={{ position: "absolute", left: 54, right: 170, bottom: 78 }}>
        <h2
          style={{
            color: palette.paper,
            fontFamily: fonts.display,
            fontSize: 48,
            fontWeight: 700,
            lineHeight: 1.02,
            textTransform: "uppercase",
          }}
        >
          {caption || texts?.caption || labels.heroCaption}
        </h2>
        <p
          style={{
            marginTop: 16,
            color: `${palette.paper}d9`,
            fontFamily: fonts.serif,
            fontSize: 17,
            lineHeight: 1.4,
          }}
        >
          {subtitle || texts?.subtitle || labels.subtitle}
        </p>
      </div>

      <TicketStub
        config={config}
        label={texts?.route || labels.route}
        style={{ right: 46, bottom: 74, transform: "rotate(7deg)", background: `${palette.paper}e8`, color: palette.inkSoft }}
      />
      <StampMark config={config} label={labels.stamp} style={{ right: 68, top: 86, color: palette.paper, borderColor: palette.paper, opacity: 0.7 }} />
    </div>
  );
}
