import React from "react";
import CityCover from "./spreads/CityCover";
import CityHero from "./spreads/CityHero";
import CityMap from "./spreads/CityMap";
import MosaicGrid from "../../spreads/MosaicGrid";
import StorySpread from "../../spreads/StorySpread";
import GroupPhotoSpread from "../../spreads/GroupPhotoSpread";
import type { SpreadComposerProps } from "../registry";

function opt<T>(value: T | undefined): T | undefined {
  return value;
}

export default function CityComposer({ templateName, slots, captions = undefined }: SpreadComposerProps): React.ReactElement {
  switch (templateName) {
    case "CityCover":
      return <CityCover heroUrl={slots.hero} title={opt(captions?.title)} date={opt(captions?.date)} texts={captions} />;

    case "CityHero":
      return <CityHero photoUrl={slots.hero} caption={opt(captions?.caption || captions?.hero)} subtitle={opt(captions?.subtitle)} texts={captions} />;

    case "CityMap":
      return <CityMap photoUrl={slots.hero} caption={opt(captions?.caption)} texts={captions} />;

    case "MosaicGrid": {
      const mosaicPhotos = Object.entries(slots).map(([k, url]) => {
        const cap = captions?.[k];
        return cap ? { url, caption: cap } : { url };
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
        <div className="flex h-full w-full items-center justify-center" style={{ background: "#1c2025" }}>
          <p className="text-xs uppercase" style={{ fontFamily: "'Inter Tight', sans-serif", letterSpacing: ".3em", color: "#4a5560" }}>
            Unknown template: {templateName}
          </p>
        </div>
      );
  }
}
