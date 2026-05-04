import React from "react";

export default function CityHero({ photoUrl, caption, subtitle }: { photoUrl?: string | undefined; caption?: string | undefined; subtitle?: string | undefined }): React.ReactElement {
  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: "#1c2025" }}>
      {photoUrl ? (
        <img src={photoUrl} alt="" className="absolute inset-0 h-full w-full object-cover" style={{ filter: "saturate(.75) contrast(1.02) brightness(.7)" }} />
      ) : (
        <div className="absolute inset-0" style={{ background: "#252b32" }} />
      )}
      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,19,24,0.9) 0%, rgba(15,19,24,0.3) 50%, transparent 100%)" }} />
      <div className="absolute bottom-0 left-0 right-0 px-8 pb-10">
        {caption && (
          <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 28, fontWeight: 300, fontStyle: "italic", lineHeight: 1.2, color: "#e0e2e5" }}>
            {caption}
          </h2>
        )}
        {subtitle && (
          <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: "#00d4aa", marginTop: 10 }}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
