import React from "react";
import GrandVista from "../../spreads/GrandVista";
import JournalPage from "../../spreads/JournalPage";
import PolaroidWall from "../../spreads/PolaroidWall";
import GoldenHour from "../../spreads/GoldenHour";
import ContactSheet from "../../spreads/ContactSheet";
import Cover from "../../spreads/Cover";
import InsideFront from "../../spreads/InsideFront";
import InsideBack from "../../spreads/InsideBack";
import BackCover from "../../spreads/BackCover";
import ChapterDivider from "../../spreads/ChapterDivider";
import MapPage from "../../spreads/MapPage";
import QuotePage from "../../spreads/QuotePage";
import Ephemera from "../../spreads/Ephemera";
import IndexPage from "../../spreads/IndexPage";
import SinglePhotoPage from "../../spreads/SinglePhotoPage";
import PhotoGrid from "../../spreads/PhotoGrid";
import PhotoJournal from "../../spreads/PhotoJournal";
import HeroFocus from "../../spreads/HeroFocus";
import GalleryDuo from "../../spreads/GalleryDuo";
import MosaicGrid from "../../spreads/MosaicGrid";
import StorySpread from "../../spreads/StorySpread";
import GroupPhotoSpread from "../../spreads/GroupPhotoSpread";
import type { SpreadComposerProps } from "../registry";

function opt<T>(value: T | undefined): T | undefined {
  return value;
}

export default function WanderboundComposer({ templateName, slots, captions = undefined }: SpreadComposerProps): React.ReactElement {
  switch (templateName) {
    case "GrandVista":
      return <GrandVista photoUrl={slots.hero} photoSlotId="hero" caption={opt(captions?.hero)} subtitle={opt(captions?.subtitle)} texts={captions} />;

    case "JournalPage":
      return (
        <JournalPage
          leftPhotoUrl={slots.left}
          leftSlotId="left"
          topRightPhotoUrl={slots.topRight}
          topRightSlotId="topRight"
          bottomRightPhotoUrl={slots.bottomRight}
          bottomRightSlotId="bottomRight"
          date={opt(captions?.date)}
          weather={opt(captions?.weather)}
          location={opt(captions?.location)}
          body={opt(captions?.body || captions?.quote)}
          body2={opt(captions?.body2)}
          polaroidCaption={opt(captions?.polaroidCaption)}
          signature={opt(captions?.signature)}
          texts={captions}
        />
      );

    case "PolaroidWall": {
      const polaroidPhotos = Object.entries(slots).map(([k, url], i) => {
        const cap = captions?.[`photo-${i}`];
        return cap ? { url, caption: cap, slotId: k } : { url, slotId: k };
      });
      return <PolaroidWall photos={polaroidPhotos} texts={captions} />;
    }

    case "GoldenHour":
      return (
        <GoldenHour
          leftPhotoUrl={slots.left}
          leftSlotId="left"
          texts={captions}
          rightPhotos={Object.entries(slots)
            .filter(([k]) => k.startsWith("right"))
            .map(([k, url]) => {
              const cap = captions?.[k];
              return cap ? { url, caption: cap, slotId: k } : { url, slotId: k };
            })}
        />
      );

    case "ContactSheet":
      return (
        <ContactSheet
          texts={captions}
          photos={Object.entries(slots).map(([k, url]) => {
            const cap = captions?.[k];
            return cap ? { url, caption: cap, slotId: k } : { url, slotId: k };
          })}
        />
      );

    case "Cover":
      return <Cover heroUrl={slots.hero} heroSlotId="hero" title={opt(captions?.title)} date={opt(captions?.date)} texts={captions} />;

    case "InsideFront":
      return <InsideFront quote={opt(captions?.quote)} photoUrl={slots.accent} photoSlotId="accent" texts={captions} />;

    case "InsideBack":
      return <InsideBack tripStats={captions?.stats ? JSON.parse(captions.stats) : undefined} texts={captions} />;

    case "BackCover":
      return <BackCover brand={opt(captions?.brand)} texts={captions} />;

    case "ChapterDivider":
      return <ChapterDivider photoUrl={slots.hero} photoSlotId="hero" label={captions?.label || "Chapter"} texts={captions} />;

    case "MapPage":
      return <MapPage photoUrl={slots.hero} photoSlotId="hero" caption={opt(captions?.caption)} texts={captions} />;

    case "QuotePage":
      return <QuotePage quote={opt(captions?.quote)} caption={opt(captions?.caption)} texts={captions} />;

    case "Ephemera":
      return <Ephemera photos={Object.entries(slots).map(([k, url]) => ({ url, slotId: k }))} texts={captions} />;

    case "IndexPage":
      return <IndexPage texts={captions} />;

    case "SinglePhotoPage": {
      const slotId = slots.hero ? "hero" : slots.left ? "left" : "photo";
      const spProps: { photoUrl: string | undefined; photoSlotId: string; caption?: string; title?: string; date?: string; texts?: Record<string, string> | undefined } = {
        photoUrl: slots.hero || slots.left,
        photoSlotId: slotId,
      };
      const cap = captions?.caption || captions?.hero;
      if (cap) spProps.caption = cap;
      if (captions?.title) spProps.title = captions.title;
      if (captions?.date) spProps.date = captions.date;
      spProps.texts = captions;
      return <SinglePhotoPage {...spProps} />;
    }

    case "PhotoGrid": {
      const pgProps: {
        heroUrl: string | undefined;
        heroSlotId: string;
        heroCaption?: string;
        smallPhotos: Array<{ url: string | undefined; caption?: string; slotId: string }>;
        texts?: Record<string, string> | undefined;
      } = {
        heroUrl: slots.hero || slots.left,
        heroSlotId: slots.hero ? "hero" : "left",
        texts: captions,
        smallPhotos: [
          { url: slots.topRight, slotId: "topRight", ...(captions?.topRight ? { caption: captions.topRight } : {}) },
          { url: slots.bottomRight, slotId: "bottomRight", ...(captions?.bottomRight ? { caption: captions.bottomRight } : {}) },
          { url: slots[`photo-0`], slotId: "photo-0", ...(captions?.[`photo-0`] ? { caption: captions[`photo-0`] } : {}) },
        ].filter((p) => p.url) as Array<{ url: string | undefined; caption?: string; slotId: string }>,
      };
      const hc = captions?.hero || captions?.left;
      if (hc) pgProps.heroCaption = hc;
      return <PhotoGrid {...pgProps} />;
    }

    case "PhotoJournal": {
      const pjProps: {
        photos: Array<{ url: string | undefined; caption?: string; slotId: string }>;
        title?: string;
        texts?: Record<string, string> | undefined;
      } = {
        texts: captions,
        photos: Object.entries(slots).map(([k, url], i) => {
          const cap = captions?.[`photo-${i}`] || captions?.[`right-${i}`];
          return cap ? { url, caption: cap, slotId: k } : { url, slotId: k };
        }),
      };
      if (captions?.title) pjProps.title = captions.title;
      return <PhotoJournal {...pjProps} />;
    }

    case "HeroFocus":
      return (
        <HeroFocus
          photoUrl={slots.hero || slots.left || slots.photo}
          photoSlotId={slots.hero ? "hero" : slots.left ? "left" : "photo"}
          caption={opt(captions?.caption || captions?.hero)}
          subtitle={opt(captions?.subtitle)}
          texts={captions}
        />
      );

    case "GalleryDuo":
      return (
        <GalleryDuo
          leftUrl={slots.left || slots[`photo-0`]}
          leftSlotId={slots.left ? "left" : "photo-0"}
          rightUrl={slots.right || slots[`photo-1`]}
          rightSlotId={slots.right ? "right" : "photo-1"}
          leftCaption={opt(captions?.left || captions?.[`photo-0`])}
          rightCaption={opt(captions?.right || captions?.[`photo-1`])}
          title={opt(captions?.title)}
          texts={captions}
        />
      );

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
          accentSlotId="accent"
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
          photoSlotId="hero"
          caption={opt(captions?.caption || captions?.hero)}
          subtitle={opt(captions?.subtitle)}
        />
      );

    default:
      return (
        <div className="flex h-full w-full items-center justify-center" style={{ background: "#f3e7d1" }}>
          <p className="f-mono text-xs uppercase" style={{ color: "#6b4f3a" }}>
            Unknown template: {templateName}
          </p>
        </div>
      );
  }
}
