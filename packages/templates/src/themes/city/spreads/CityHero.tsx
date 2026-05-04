import React from "react";

import { AdjustableImg } from "../../../components/PageShell";

export default function CityHero({
  photoUrl,
  photoSlotId,
  caption,
  subtitle,
  texts,
}: {
  photoUrl?: string | undefined;
  photoSlotId?: string;
  caption?: string | undefined;
  subtitle?: string | undefined;
  texts?: Record<string, string> | undefined;
}): React.ReactElement {
  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: "#1c2025" }}>
      {photoUrl ? (
        <AdjustableImg src={photoUrl} slotId={photoSlotId} className="absolute inset-0 h-full w-full" imgStyle={{ filter: "saturate(.75) contrast(1.02) brightness(.7)" }} />
      ) : (
        <div className="absolute inset-0" style={{ background: "#252b32" }} />
      )}
      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,19,24,0.9) 0%, rgba(15,19,24,0.3) 50%, transparent 100%)" }} />
      <div className="absolute bottom-0 left-0 right-0 px-8 pb-10">
        {(caption || texts?.caption) && (
          <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 28, fontWeight: 300, fontStyle: "italic", lineHeight: 1.2, color: "#e0e2e5" }}>
            {caption || texts?.caption}
          </h2>
        )}
        {(subtitle || texts?.subtitle) && (
          <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: "#00d4aa", marginTop: 10 }}>
            {subtitle || texts?.subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
