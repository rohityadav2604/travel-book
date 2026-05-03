import { PaperGrain, Flourish, Stamp } from "@memorybook/design/components/atoms";

export type JournalPageProps = {
  leftPhotoUrl: string | undefined;
  topRightPhotoUrl: string | undefined;
  bottomRightPhotoUrl: string | undefined;
  quote: string | undefined;
  date: string | undefined;
};

export default function JournalPage({
  leftPhotoUrl,
  topRightPhotoUrl,
  bottomRightPhotoUrl,
  quote,
  date,
}: JournalPageProps): React.ReactElement {
  return (
    <div className="relative flex h-full w-full bg-paper">
      <PaperGrain />

      {/* Left page */}
      <div className="relative flex-1 overflow-hidden border-r border-ink/10 p-4">
        <div className="relative h-full w-full overflow-hidden rounded-sm">
          {leftPhotoUrl && <img src={leftPhotoUrl} alt="" className="h-full w-full object-cover" />}
          <div
            className="absolute bottom-0 left-0 right-0 h-8"
            style={{
              background: "linear-gradient(to bottom, transparent, rgba(243,231,209,0.9))",
            }}
          />
        </div>
      </div>

      {/* Right page */}
      <div className="relative flex flex-1 flex-col gap-3 p-4">
        <div className="relative h-1/2 w-full overflow-hidden rounded-sm">
          {topRightPhotoUrl && <img src={topRightPhotoUrl} alt="" className="h-full w-full object-cover" />}
        </div>

        {quote && (
          <div className="px-2">
            <Flourish className="mb-2 w-16" />
            <p className="font-serif text-sm italic leading-relaxed text-ink-soft">
              &ldquo;{quote}&rdquo;
            </p>
          </div>
        )}

        <div className="relative h-1/3 w-full overflow-hidden rounded-sm">
          {bottomRightPhotoUrl && <img src={bottomRightPhotoUrl} alt="" className="h-full w-full object-cover" />}
        </div>

        <div className="mt-auto flex items-center justify-between">
          {date && (
            <span className="font-mono text-[10px] uppercase tracking-wider text-ink-faded">
              {date}
            </span>
          )}
          <Stamp text="JOURNAL" />
        </div>
      </div>
    </div>
  );
}
