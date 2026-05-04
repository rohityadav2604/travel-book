import React from "react";
import HighlandCover from "./spreads/HighlandCover";
import HighlandHero from "./spreads/HighlandHero";
import HighlandGrid from "./spreads/HighlandGrid";
import HighlandJournal from "./spreads/HighlandJournal";
import HighlandQuote from "./spreads/HighlandQuote";
import HighlandBackCover from "./spreads/HighlandBackCover";
import MosaicGrid from "../../spreads/MosaicGrid";
import StorySpread from "../../spreads/StorySpread";
import GroupPhotoSpread from "../../spreads/GroupPhotoSpread";
import type { SpreadComposerProps } from "../registry";

function opt<T>(value: T | undefined): T | undefined {
  return value;
}

export default function HighlandComposer({ templateName, slots, captions = undefined }: SpreadComposerProps): React.ReactElement {
  switch (templateName) {
    case "HighlandCover":
      return <HighlandCover heroUrl={slots.hero} heroSlotId="hero" title={opt(captions?.title)} date={opt(captions?.date)} texts={captions} />;

    case "HighlandHero":
      return <HighlandHero photoUrl={slots.hero} photoSlotId="hero" caption={opt(captions?.caption || captions?.hero)} subtitle={opt(captions?.subtitle)} texts={captions} />;

    case "HighlandGrid": {
      const pgProps: {
        heroUrl: string | undefined;
        heroSlotId: string;
        heroCaption?: string;
        smallPhotos: Array<{ url: string | undefined; caption?: string; slotId: string }>;
        title?: string;
        texts?: Record<string, string> | undefined;
      } = {
        heroUrl: slots.hero || slots.left,
        heroSlotId: slots.hero ? "hero" : "left",
        texts: captions,
        smallPhotos: [
          { url: slots.topRight, slotId: "topRight", ...(captions?.topRight ? { caption: captions.topRight } : {}) },
          { url: slots.bottomRight, slotId: "bottomRight", ...(captions?.bottomRight ? { caption: captions.bottomRight } : {}) },
        ].filter((p) => p.url) as Array<{ url: string | undefined; caption?: string; slotId: string }>,
      };
      const hc = captions?.hero || captions?.left;
      if (hc) pgProps.heroCaption = hc;
      if (captions?.title) pgProps.title = captions.title;
      return <HighlandGrid {...pgProps} />;
    }

    case "HighlandJournal":
      return (
        <HighlandJournal
          leftPhotoUrl={slots.left}
          leftSlotId="left"
          topRightPhotoUrl={slots.topRight}
          topRightSlotId="topRight"
          bottomRightPhotoUrl={slots.bottomRight}
          bottomRightSlotId="bottomRight"
          quote={opt(captions?.quote)}
          date={opt(captions?.date)}
          texts={captions}
        />
      );

    case "HighlandQuote":
      return <HighlandQuote quote={opt(captions?.quote)} caption={opt(captions?.caption)} texts={captions} />;

    case "HighlandBackCover":
      return <HighlandBackCover brand={opt(captions?.brand)} texts={captions} />;

    case "MosaicGrid": {
      const mosaicPhotos = Object.entries(slots).map(([k, url]) => {
        const cap = captions?.[k];
        return cap ? { url, caption: cap, slotId: k } : { url, slotId: k };
      });
      return <MosaicGrid photos={mosaicPhotos} />;
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

    default:
      return (
        <div className="flex h-full w-full items-center justify-center" style={{ background: "#ecebe2" }}>
          <p className="m-mono text-xs uppercase" style={{ color: "#3a4438" }}>
            Unknown template: {templateName}
          </p>
        </div>
      );
  }
}
