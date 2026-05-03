import { PaperGrain } from "@memorybook/design/components/atoms";

export type ContactSheetProps = {
  photos: (string | undefined)[];
};

export default function ContactSheet({ photos }: ContactSheetProps): React.ReactElement {
  return (
    <div className="relative h-full w-full overflow-hidden p-4" style={{ background: "#2c1f15" }}>
      <PaperGrain />

      {/* Film perforations top */}
      <div className="mb-2 flex gap-1">
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className="h-3 w-2 rounded-sm bg-paper/20" />
        ))}
      </div>

      <div className="grid grid-cols-4 gap-1">
        {photos.map((url, i) => (
          <div key={i} className="aspect-square overflow-hidden">
            {url && <img src={url} alt="" className="h-full w-full object-cover" />}
          </div>
        ))}
      </div>

      {/* Film perforations bottom */}
      <div className="mt-2 flex gap-1">
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className="h-3 w-2 rounded-sm bg-paper/20" />
        ))}
      </div>
    </div>
  );
}
