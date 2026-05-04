import React from "react";
import { AdjustableImg } from "../components/PageShell";

export type MosaicPhoto = {
  url?: string | undefined;
  caption?: string | undefined;
  slotId: string;
};

export default function MosaicGrid({ photos }: { photos: MosaicPhoto[] }): React.ReactElement {
  const safe = photos.slice(0, 6);
  const count = safe.length;

  // Choose a pleasant grid shape based on photo count
  let cols = 2;
  let rows = 3;
  if (count <= 1) { cols = 1; rows = 1; }
  else if (count <= 2) { cols = 1; rows = 2; }
  else if (count <= 4) { cols = 2; rows = 2; }

  return (
    <div className="relative h-full w-full p-5" style={{ background: "inherit" }}>
      <div
        className="grid h-full w-full gap-3"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
      >
        {safe.map((p, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-sm"
            style={{
              background: "rgba(0,0,0,0.08)",
              boxShadow: "0 1px 2px rgba(0,0,0,0.08), 0 6px 20px rgba(0,0,0,0.12)",
            }}
          >
            {p.url ? (
              <>
                <AdjustableImg
                  src={p.url}
                  slotId={p.slotId}
                  className="h-full w-full"
                  imgStyle={{ filter: "saturate(.85) contrast(.95) sepia(.12) brightness(.98)" }}
                />
                {p.caption && (
                  <div
                    className="absolute bottom-0 left-0 right-0 px-2 py-1"
                    style={{ background: "rgba(0,0,0,0.35)" }}
                  >
                    <span
                      className="block truncate text-[10px] uppercase tracking-wider"
                      style={{
                        fontFamily: "'Inter Tight', 'Helvetica Neue', system-ui, sans-serif",
                        color: "#f3f1e8",
                      }}
                    >
                      {p.caption}
                    </span>
                  </div>
                )}
              </>
            ) : (
              <div className="h-full w-full" style={{ background: "rgba(0,0,0,0.06)" }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
