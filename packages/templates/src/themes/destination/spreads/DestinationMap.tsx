import React from "react";
import { AdjustableImg } from "../../../components/PageShell";
import { DestinationMotif, PaperTexture, RouteMap, StampMark, TicketStub, TileBorder } from "../components/motifs";
import type { DestinationThemeConfig } from "../types";

export default function DestinationMap({
  config,
  photoUrl,
  photoSlotId,
  caption,
  texts,
}: {
  config: DestinationThemeConfig;
  photoUrl?: string | undefined;
  photoSlotId?: string | undefined;
  caption?: string | undefined;
  texts?: Record<string, string> | undefined;
}): React.ReactElement {
  const { palette, fonts, labels } = config;

  return (
    <div style={{ position: "relative", width: 600, height: 600, overflow: "hidden", background: palette.paper, color: palette.ink }}>
      <PaperTexture config={config} />
      <TileBorder config={config} style={{ left: 0, right: 0, top: 0 }} />

      <div
        style={{
          position: "absolute",
          left: 40,
          top: 54,
          right: 40,
          bottom: 52,
          border: `1px solid ${palette.ink}24`,
          background: `${palette.paper2}b5`,
          boxShadow: `inset 0 0 42px ${palette.ink}0f`,
        }}
      />

      <div style={{ position: "absolute", left: 40, top: 106, opacity: 0.95 }}>
        <RouteMap config={config} />
      </div>
      <div style={{ position: "absolute", right: 38, top: 78, opacity: 0.18 }}>
        <DestinationMotif config={config} variant="large" />
      </div>

      <div
        style={{
          position: "absolute",
          left: 66,
          top: 74,
          color: palette.accentDeep,
          fontFamily: fonts.sans,
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: ".24em",
          textTransform: "uppercase",
        }}
      >
        {texts?.eyebrow || labels.route}
      </div>

      <div
        style={{
          position: "absolute",
          right: 58,
          bottom: 82,
          width: 218,
          height: 154,
          padding: 9,
          background: palette.paper,
          boxShadow: `0 18px 32px ${palette.ink}26`,
          transform: "rotate(3deg)",
        }}
      >
        <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", background: `${palette.ink}14` }}>
          <AdjustableImg
            src={photoUrl}
            slotId={photoSlotId}
            className="h-full w-full"
            imgStyle={{ filter: "saturate(.8) contrast(.98) sepia(.1) brightness(.96)" }}
          />
        </div>
      </div>

      <TicketStub config={config} label={labels.coordinates} style={{ left: 70, bottom: 112, transform: "rotate(-5deg)" }} />
      <StampMark config={config} style={{ right: 76, top: 68, transform: "rotate(8deg)" }} />

      <div
        style={{
          position: "absolute",
          left: 68,
          right: 318,
          bottom: 66,
          color: palette.inkSoft,
          fontFamily: fonts.serif,
          fontSize: 20,
          fontStyle: "italic",
          lineHeight: 1.24,
        }}
      >
        {caption || texts?.caption || labels.mapCaption}
      </div>
    </div>
  );
}
