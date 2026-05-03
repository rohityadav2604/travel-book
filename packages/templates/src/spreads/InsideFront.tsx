import { PaperGrain, Flourish } from "@memorybook/design/components/atoms";

export type InsideFrontProps = {
  quote: string | undefined;
  photoUrl: string | undefined;
};

export default function InsideFront({ quote, photoUrl }: InsideFrontProps): React.ReactElement {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center bg-paper p-8">
      <PaperGrain />
      {quote && (
        <div className="max-w-md text-center">
          <Flourish className="mx-auto mb-4 w-24" />
          <p className="font-serif text-xl italic leading-relaxed text-ink-soft">
            &ldquo;{quote}&rdquo;
          </p>
        </div>
      )}
      {photoUrl && (
        <div className="mt-8 w-48 overflow-hidden rounded-sm shadow-paper">
          <img src={photoUrl} alt="" className="h-full w-full object-cover" />
        </div>
      )}
    </div>
  );
}
