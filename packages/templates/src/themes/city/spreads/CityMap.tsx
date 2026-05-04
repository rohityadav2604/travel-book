import React from "react";

import { AdjustableImg } from "../../../components/PageShell";

export default function CityMap({
  photoUrl,
  photoSlotId,
  caption,
  texts,
}: {
  photoUrl?: string | undefined;
  photoSlotId?: string;
  caption?: string | undefined;
  texts?: Record<string, string> | undefined;
}): React.ReactElement {
  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: "#1c2025" }}>
      <div className="absolute inset-0" style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(0,212,170,0.06) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(0,212,170,0.06) 40px)" }} />
      {photoUrl && (
        <div className="absolute overflow-hidden rounded-sm" style={{ top: 60, left: 60, right: 60, bottom: 120, boxShadow: "0 8px 30px rgba(0,0,0,0.4)" }}>
          <AdjustableImg src={photoUrl} slotId={photoSlotId} className="h-full w-full" imgStyle={{ filter: "saturate(.7) contrast(1.05) brightness(.65)" }} />
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 px-8 pb-8">
        {(caption || texts?.caption) && (
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: ".15em", textTransform: "uppercase", color: "#00d4aa" }}>
            {caption || texts?.caption}
          </p>
        )}
      </div>
    </div>
  );
}
