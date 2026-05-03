import GrandVista from "./spreads/GrandVista";
import JournalPage from "./spreads/JournalPage";
import PolaroidWall from "./spreads/PolaroidWall";
import GoldenHour from "./spreads/GoldenHour";
import ContactSheet from "./spreads/ContactSheet";
import Cover from "./spreads/Cover";
import InsideFront from "./spreads/InsideFront";
import InsideBack from "./spreads/InsideBack";
import BackCover from "./spreads/BackCover";
import ChapterDivider from "./spreads/ChapterDivider";

export type SpreadComposerProps = {
  templateName: string;
  slots: Record<string, string | undefined>;
  captions: Record<string, string> | undefined;
};

export default function SpreadComposer({ templateName, slots, captions = undefined }: SpreadComposerProps): React.ReactElement {
  switch (templateName) {
    case "GrandVista":
      return <GrandVista photoUrl={slots.hero} caption={captions?.hero} />;

    case "JournalPage":
      return (
        <JournalPage
          leftPhotoUrl={slots.left}
          topRightPhotoUrl={slots.topRight}
          bottomRightPhotoUrl={slots.bottomRight}
          quote={captions?.quote}
          date={captions?.date}
        />
      );

    case "PolaroidWall": {
      const polaroidPhotos = Object.values(slots).map((url, i) => ({
        url,
        caption: captions?.[`photo-${i}`],
      }));
      return <PolaroidWall photos={polaroidPhotos} />;
    }

    case "GoldenHour":
      return (
        <GoldenHour
          leftPhotoUrl={slots.left}
          rightPhotos={Object.entries(slots)
            .filter(([k]) => k.startsWith("right"))
            .map(([k, url]) => ({ url, caption: captions?.[k] }))}
        />
      );

    case "ContactSheet":
      return <ContactSheet photos={Object.values(slots)} />;

    case "Cover":
      return <Cover heroUrl={slots.hero} title={captions?.title} date={captions?.date} />;

    case "InsideFront":
      return <InsideFront quote={captions?.quote} photoUrl={slots.accent} />;

    case "InsideBack":
      return <InsideBack tripStats={captions?.stats ? JSON.parse(captions.stats) : undefined} />;

    case "BackCover":
      return <BackCover brand={captions?.brand} />;

    case "ChapterDivider":
      return <ChapterDivider photoUrl={slots.hero} label={captions?.label || "Chapter"} />;

    default:
      return (
        <div className="flex h-full w-full items-center justify-center bg-paper">
          <p className="font-mono text-xs uppercase text-ink-faded">Unknown template: {templateName}</p>
        </div>
      );
  }
}
