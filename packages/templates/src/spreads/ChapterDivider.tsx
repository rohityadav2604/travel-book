import { Vignette, PaperGrain } from "@memorybook/design/components/atoms";

export type ChapterDividerProps = {
  photoUrl: string | undefined;
  label: string | undefined;
};

export default function ChapterDivider({ photoUrl, label }: ChapterDividerProps): React.ReactElement {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <PaperGrain />
      {photoUrl && <img src={photoUrl} alt="" className="absolute inset-0 h-full w-full object-cover" />}
      <Vignette />
      <div className="absolute inset-0 flex items-center justify-center">
        <h2 className="font-display text-4xl text-paper drop-shadow-lg md:text-5xl">
          {label}
        </h2>
      </div>
    </div>
  );
}
