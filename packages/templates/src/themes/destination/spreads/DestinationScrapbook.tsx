import React from "react";
import { AdjustableImg } from "../../../components/PageShell";
import { DestinationMotif, EphemeraScrap, PaperTexture, StampMark, TapeStrip, TicketStub, TileBorder } from "../components/motifs";
import type { DestinationThemeConfig } from "../types";

type ScrapPhoto = {
  url?: string | undefined;
  slotId: string;
  caption?: string | undefined;
  style: React.CSSProperties;
  rotation: number;
};

function PhotoScrap({ config, photo }: { config: DestinationThemeConfig; photo: ScrapPhoto }): React.ReactElement {
  const { palette, fonts, assetKit } = config;

  return (
    <div
      style={{
        position: "absolute",
        padding: 10,
        background: assetKit.ephemera.paper,
        boxShadow: `0 16px 28px ${palette.ink}26`,
        transform: `rotate(${photo.rotation}deg)`,
        ...photo.style,
      }}
    >
      <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", background: `${palette.ink}14` }}>
        <AdjustableImg
          src={photo.url}
          slotId={photo.slotId}
          className="h-full w-full"
          imgStyle={{ filter: assetKit.photoTreatment.scrapbookFilter }}
        />
      </div>
      {photo.caption && (
        <div
          style={{
            position: "absolute",
            left: 12,
            right: 12,
            bottom: 4,
            color: palette.inkFaded,
            fontFamily: fonts.script,
            fontSize: 17,
            lineHeight: 1,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {photo.caption}
        </div>
      )}
    </div>
  );
}

export default function DestinationScrapbook({
  config,
  photos,
  texts,
}: {
  config: DestinationThemeConfig;
  photos: Array<{ url?: string | undefined; slotId: string; caption?: string | undefined }>;
  texts?: Record<string, string> | undefined;
}): React.ReactElement {
  const { palette, fonts, labels } = config;
  const { assetKit } = config;
  const getPhoto = (slotId: string): { url?: string | undefined; slotId: string; caption?: string | undefined } =>
    photos.find((photo) => photo.slotId === slotId) ?? { slotId };

  const scraps: ScrapPhoto[] = [
    { ...getPhoto("hero"), style: { left: 48, top: 84, width: 258, height: 326 }, rotation: -4 },
    { ...getPhoto("detail"), style: { right: 52, top: 74, width: 220, height: 152 }, rotation: 5 },
    { ...getPhoto("portrait"), style: { right: 70, top: 252, width: 170, height: 236 }, rotation: -3 },
    { ...getPhoto("memory"), style: { left: 92, bottom: 60, width: 188, height: 136 }, rotation: 4 },
  ];

  return (
    <div style={{ position: "relative", width: 600, height: 600, overflow: "hidden", background: palette.paper, color: palette.ink }}>
      <PaperTexture config={config} />
      <TileBorder config={config} style={{ left: 36, right: 36, top: 38 }} />

      <div style={{ position: "absolute", left: 34, top: 26, color: palette.accentDeep, fontFamily: fonts.sans, fontSize: 13, fontWeight: 600, letterSpacing: ".22em", textTransform: "uppercase" }}>
        {texts?.eyebrow || labels.scrapbookNote}
      </div>

      <div style={{ position: "absolute", right: 26, bottom: 24, opacity: 0.16 }}>
        <DestinationMotif config={config} variant="large" />
      </div>
      <EphemeraScrap config={config} variant="receipt" style={{ right: 240, top: 116, transform: "rotate(5deg)" }} />
      <EphemeraScrap config={config} variant="note" style={{ left: 324, bottom: 154, transform: "rotate(-6deg)" }} />

      {scraps.map((photo) => (
        <PhotoScrap key={photo.slotId} config={config} photo={photo} />
      ))}

      <TapeStrip config={config} style={{ left: 136, top: 66, transform: "rotate(-12deg)" }} />
      <TapeStrip config={config} variant="alternate" style={{ right: 98, top: 62, transform: "rotate(8deg)" }} />
      <TapeStrip config={config} style={{ right: 116, top: 236, transform: "rotate(-6deg)" }} />
      <TapeStrip config={config} variant="alternate" style={{ left: 132, bottom: 178, transform: "rotate(7deg)" }} />

      <TicketStub config={config} label={texts?.route || assetKit.ephemera.secondaryTicket} style={{ left: 318, bottom: 82, transform: "rotate(-7deg)" }} />
      <StampMark config={config} style={{ left: 44, bottom: 42, width: 72, height: 72, fontSize: 11, opacity: 0.74 }} />

      <div
        style={{
          position: "absolute",
          right: 42,
          bottom: 34,
          color: palette.inkSoft,
          fontFamily: fonts.serif,
          fontSize: 18,
          fontStyle: "italic",
          maxWidth: 205,
          lineHeight: 1.25,
        }}
      >
        {texts?.note || labels.heroCaption}
      </div>
    </div>
  );
}
