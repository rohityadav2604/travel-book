import { Vignette, PaperGrain, Stamp } from "@memorybook/design/components/atoms";

export type CoverProps = {
  heroUrl: string | undefined;
  title: string | undefined;
  date: string | undefined;
};

export default function Cover({ heroUrl, title, date }: CoverProps): React.ReactElement {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <PaperGrain />
      {heroUrl && <img src={heroUrl} alt="" className="absolute inset-0 h-full w-full object-cover" />}
      <Vignette />

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <Stamp text="TRAVEL" className="mb-4" />
        <h1 className="text-center font-display text-5xl text-paper drop-shadow-lg md:text-6xl">
          {title || "My Travel Book"}
        </h1>
        {date && (
          <p className="mt-4 font-mono text-sm uppercase tracking-[0.3em] text-paper/80">
            {date}
          </p>
        )}
      </div>
    </div>
  );
}
