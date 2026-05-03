import { PaperGrain, CoffeeStain } from "@memorybook/design/components/atoms";

export type PolaroidWallProps = {
  photos: { url: string | undefined; caption: string | undefined }[];
};

export default function PolaroidWall({ photos }: PolaroidWallProps): React.ReactElement {
  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: "#8b6914" }}>
      <PaperGrain />
      <CoffeeStain className="top-4 right-8" />

      <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-4 p-6">
        {photos.map((photo, i) => {
          const rotation = -3 + Math.random() * 6;
          return (
            <div
              key={i}
              className="relative bg-paper p-2 shadow-paper"
              style={{ transform: `rotate(${rotation}deg)`, width: 140, height: 170 }}
            >
              {photo.url && <img src={photo.url} alt="" className="h-[110px] w-full object-cover" />}
              {photo.caption && (
                <p className="mt-1 text-center font-script text-xs text-ink-soft">{photo.caption}</p>
              )}
              {/* Pin */}
              <div className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-burgundy shadow" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
