import React from "react";
import HighlandCover from "./spreads/HighlandCover";
import HighlandHero from "./spreads/HighlandHero";
import HighlandGrid from "./spreads/HighlandGrid";
import HighlandJournal from "./spreads/HighlandJournal";
import HighlandQuote from "./spreads/HighlandQuote";
import HighlandBackCover from "./spreads/HighlandBackCover";
import type { SpreadComposerProps } from "../registry";

function opt<T>(value: T | undefined): T | undefined {
  return value;
}

export default function HighlandComposer({ templateName, slots, captions = undefined }: SpreadComposerProps): React.ReactElement {
  switch (templateName) {
    case "HighlandCover":
      return <HighlandCover heroUrl={slots.hero} title={opt(captions?.title)} date={opt(captions?.date)} />;

    case "HighlandHero":
      return <HighlandHero photoUrl={slots.hero} caption={opt(captions?.caption || captions?.hero)} subtitle={opt(captions?.subtitle)} />;

    case "HighlandGrid": {
      const pgProps: {
        heroUrl: string | undefined;
        heroCaption?: string;
        smallPhotos: Array<{ url: string | undefined; caption?: string }>;
        title?: string;
      } = {
        heroUrl: slots.hero || slots.left,
        smallPhotos: [
          { url: slots.topRight, ...(captions?.topRight ? { caption: captions.topRight } : {}) },
          { url: slots.bottomRight, ...(captions?.bottomRight ? { caption: captions.bottomRight } : {}) },
        ].filter((p) => p.url) as Array<{ url: string | undefined; caption?: string }>,
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
          topRightPhotoUrl={slots.topRight}
          bottomRightPhotoUrl={slots.bottomRight}
          quote={opt(captions?.quote)}
          date={opt(captions?.date)}
        />
      );

    case "HighlandQuote":
      return <HighlandQuote quote={opt(captions?.quote)} caption={opt(captions?.caption)} />;

    case "HighlandBackCover":
      return <HighlandBackCover brand={opt(captions?.brand)} />;

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
