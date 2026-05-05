import React from "react";
import MosaicGrid from "../../spreads/MosaicGrid";
import StorySpread from "../../spreads/StorySpread";
import GroupPhotoSpread from "../../spreads/GroupPhotoSpread";
import type { SpreadComposerProps } from "../registry";
import { getDestinationConfig } from "./configs";
import DestinationBackCover from "./spreads/DestinationBackCover";
import DestinationCover from "./spreads/DestinationCover";
import DestinationHero from "./spreads/DestinationHero";
import DestinationInsideBack from "./spreads/DestinationInsideBack";
import DestinationMap from "./spreads/DestinationMap";
import DestinationQuote from "./spreads/DestinationQuote";
import DestinationScrapbook from "./spreads/DestinationScrapbook";

function opt<T>(value: T | undefined): T | undefined {
  return value;
}

export default function DestinationComposer({ templateName, slots, captions = undefined, theme }: SpreadComposerProps): React.ReactElement {
  const config = getDestinationConfig(theme);

  switch (templateName) {
    case "DestinationCover":
      return <DestinationCover config={config} heroUrl={slots.hero} heroSlotId="hero" title={opt(captions?.title)} date={opt(captions?.date)} texts={captions} />;

    case "DestinationHero":
      return <DestinationHero config={config} photoUrl={slots.hero} photoSlotId="hero" caption={opt(captions?.caption || captions?.hero)} subtitle={opt(captions?.subtitle)} texts={captions} />;

    case "DestinationScrapbook": {
      const scrapbookPhotos = Object.entries(slots).map(([slotId, url]) => {
        const caption = captions?.[slotId];
        return caption ? { url, caption, slotId } : { url, slotId };
      });
      return <DestinationScrapbook config={config} photos={scrapbookPhotos} texts={captions} />;
    }

    case "DestinationMap":
      return <DestinationMap config={config} photoUrl={slots.hero} photoSlotId="hero" caption={opt(captions?.caption || captions?.hero)} texts={captions} />;

    case "MosaicGrid": {
      const mosaicPhotos = Object.entries(slots).map(([slotId, url]) => {
        const caption = captions?.[slotId];
        return caption ? { url, caption, slotId } : { url, slotId };
      });
      return (
        <div style={{ width: "100%", height: "100%", background: config.palette.paper }}>
          <MosaicGrid photos={mosaicPhotos} />
        </div>
      );
    }

    case "StorySpread":
      return (
        <StorySpread
          accentUrl={slots.accent}
          title={opt(captions?.title)}
          body={opt(captions?.body || captions?.caption)}
          author={opt(captions?.author)}
          date={opt(captions?.date)}
        />
      );

    case "GroupPhotoSpread":
      return (
        <GroupPhotoSpread
          photoUrl={slots.hero}
          caption={opt(captions?.caption || captions?.hero)}
          subtitle={opt(captions?.subtitle)}
        />
      );

    case "DestinationQuote":
      return <DestinationQuote config={config} texts={captions} />;

    case "DestinationInsideBack":
      return <DestinationInsideBack config={config} texts={captions} />;

    case "DestinationBackCover":
      return <DestinationBackCover config={config} brand={opt(captions?.brand)} texts={captions} />;

    default:
      return (
        <div className="flex h-full w-full items-center justify-center" style={{ background: config.palette.paper }}>
          <p style={{ color: config.palette.inkFaded, fontFamily: config.fonts.sans, fontSize: 12, letterSpacing: ".24em", textTransform: "uppercase" }}>
            Unknown template: {templateName}
          </p>
        </div>
      );
  }
}
