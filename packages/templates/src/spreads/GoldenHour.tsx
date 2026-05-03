import { Vignette, PaperGrain } from "@memorybook/design/components/atoms";

export type GoldenHourProps = {
  leftPhotoUrl: string | undefined;
  rightPhotos: { url: string | undefined; caption: string | undefined }[];
};

export default function GoldenHour({ leftPhotoUrl, rightPhotos }: GoldenHourProps): React.ReactElement {
  return (
    <div className="relative flex h-full w-full bg-paper">
      <PaperGrain />

      {/* Left page — full bleed warm landscape */}
      <div className="relative flex-1 overflow-hidden">
        {leftPhotoUrl && <img src={leftPhotoUrl} alt="" className="h-full w-full object-cover" />}
        <Vignette />
      </div>

      {/* Right page — cream column with portraits */}
      <div className="relative flex w-2/5 flex-col gap-3 bg-paper p-4">
        <div className="flex-1 overflow-hidden rounded-sm border border-ink/10">
          {rightPhotos.map((photo, i) => (
            <div key={i} className="relative h-1/3 border-b border-mustard/30 py-2 last:border-b-0">
              {photo.url && <img src={photo.url} alt="" className="h-full w-full object-cover" />}
              {photo.caption && (
                <p className="absolute bottom-1 right-2 font-mono text-[9px] uppercase tracking-wider text-ink-faded">
                  {photo.caption}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
