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
      return <GrandVista photoUrl={slots.hero} caption={opt(captions?.hero)} subtitle={opt(captions?.subtitle)} />;

    case "JournalPage":
      return (
        <JournalPage
          leftPhotoUrl={slots.left}
          topRightPhotoUrl={slots.topRight}
          bottomRightPhotoUrl={slots.bottomRight}
          date={opt(captions?.date)}
          weather={opt(captions?.weather)}
          location={opt(captions?.location)}
          body={opt(captions?.body || captions?.quote)}
          body2={opt(captions?.body2)}
          polaroidCaption={opt(captions?.polaroidCaption)}
          signature={opt(captions?.signature)}
        />
      );

    case "PolaroidWall": {
      const polaroidPhotos = Object.values(slots).map((url, i) => {
        const cap = captions?.[`photo-${i}`];
        return cap ? { url, caption: cap } : { url };
      });
      return <PolaroidWall photos={polaroidPhotos} />;
    }

    case "GoldenHour":
      return (
        <GoldenHour
          leftPhotoUrl={slots.left}
          rightPhotos={Object.entries(slots)
            .filter(([k]) => k.startsWith("right"))
            .map(([k, url]) => {
              const cap = captions?.[k];
              return cap ? { url, caption: cap } : { url };
            })}
        />
      );

    case "ContactSheet":
      return (
        <ContactSheet
          photos={Object.entries(slots).map(([k, url]) => {
            const cap = captions?.[k];
            return cap ? { url, caption: cap } : { url };
          })}
        />
      );

    case "Cover":
      return <Cover heroUrl={slots.hero} title={opt(captions?.title)} date={opt(captions?.date)} />;

    case "InsideFront":
      return <InsideFront quote={opt(captions?.quote)} photoUrl={slots.accent} />;

    case "InsideBack":
      return <InsideBack tripStats={captions?.stats ? JSON.parse(captions.stats) : undefined} />;

    case "BackCover":
      return <BackCover brand={opt(captions?.brand)} />;

    case "ChapterDivider":
      return <ChapterDivider photoUrl={slots.hero} label={captions?.label || "Chapter"} />;

    case "MapPage":
      return <MapPage photoUrl={slots.hero} caption={opt(captions?.caption)} />;

    case "QuotePage":
      return <QuotePage quote={opt(captions?.quote)} caption={opt(captions?.caption)} />;

    case "Ephemera":
      return <Ephemera photos={Object.values(slots)} />;

    case "IndexPage":
      return <IndexPage />;

    case "SinglePhotoPage": {
      const spProps: { photoUrl: string | undefined; caption?: string; title?: string; date?: string } = {
        photoUrl: slots.hero || slots.left,
      };
      const cap = captions?.caption || captions?.hero;
      if (cap) spProps.caption = cap;
      if (captions?.title) spProps.title = captions.title;
      if (captions?.date) spProps.date = captions.date;
      return <SinglePhotoPage {...spProps} />;
    }

    case "PhotoGrid": {
      const pgProps: {
        heroUrl: string | undefined;
        heroCaption?: string;
        smallPhotos: Array<{ url: string | undefined; caption?: string }>;
      } = {
        heroUrl: slots.hero || slots.left,
        smallPhotos: [
          { url: slots.topRight, ...(captions?.topRight ? { caption: captions.topRight } : {}) },
          { url: slots.bottomRight, ...(captions?.bottomRight ? { caption: captions.bottomRight } : {}) },
          { url: slots[`photo-0`], ...(captions?.[`photo-0`] ? { caption: captions[`photo-0`] } : {}) },
        ].filter((p) => p.url) as Array<{ url: string | undefined; caption?: string }>,
      };
      const hc = captions?.hero || captions?.left;
      if (hc) pgProps.heroCaption = hc;
      return <PhotoGrid {...pgProps} />;
    }

    case "PhotoJournal": {
      const pjProps: {
        photos: Array<{ url: string | undefined; caption?: string }>;
        title?: string;
      } = {
        photos: Object.entries(slots).map(([, url], i) => {
          const cap = captions?.[`photo-${i}`] || captions?.[`right-${i}`];
          return cap ? { url, caption: cap } : { url };
        }),
      };
      if (captions?.title) pjProps.title = captions.title;
      return <PhotoJournal {...pjProps} />;
    }

    case "HeroFocus":
      return (
        <HeroFocus
          photoUrl={slots.hero || slots.left || slots.photo}
          caption={opt(captions?.caption || captions?.hero)}
          subtitle={opt(captions?.subtitle)}
        />
      );

    case "GalleryDuo":
      return (
        <GalleryDuo
          leftUrl={slots.left || slots[`photo-0`]}
          rightUrl={slots.right || slots[`photo-1`]}
          leftCaption={opt(captions?.left || captions?.[`photo-0`])}
          rightCaption={opt(captions?.right || captions?.[`photo-1`])}
          title={opt(captions?.title)}
        />
      );

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
        <div className="flex h-full w-full items-center justify-center" style={{ background: "#f3e7d1" }}>
          <p className="f-mono text-xs uppercase" style={{ color: "#6b4f3a" }}>
            Unknown template: {templateName}
          </p>
        </div>
      );
  }
}
