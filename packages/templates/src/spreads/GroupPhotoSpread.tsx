import React from "react";

export default function GroupPhotoSpread({
  photoUrl,
  caption,
  subtitle,
}: {
  photoUrl?: string | undefined;
  caption?: string | undefined;
  subtitle?: string | undefined;
}): React.ReactElement {
  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: "inherit" }}>
      {photoUrl ? (
        <>
          <img
            src={photoUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            style={{ filter: "saturate(.85) contrast(.95) sepia(.08) brightness(.96)" }}
          />
          {/* Bottom gradient for text legibility */}
          <div className="absolute inset-0" style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 40%, transparent 70%)",
          }} />
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.04)" }}>
          <p style={{
            fontFamily: "'Inter Tight', 'Helvetica Neue', system-ui, sans-serif",
            fontSize: 11,
            letterSpacing: ".2em",
            textTransform: "uppercase",
            color: "currentColor",
            opacity: 0.25,
          }}>
            Group Photo
          </p>
        </div>
      )}

      {/* Caption block */}
      <div className="absolute bottom-0 left-0 right-0 px-8 pb-10">
        {caption && (
          <h2 style={{
            fontFamily: "'Fraunces', 'DM Serif Display', Georgia, serif",
            fontSize: 26,
            fontWeight: 300,
            fontStyle: "italic",
            lineHeight: 1.2,
            color: "#f3f1e8",
            textShadow: "0 1px 4px rgba(0,0,0,0.4)",
          }}>
            {caption}
          </h2>
        )}
        {subtitle && (
          <p style={{
            fontFamily: "'Inter Tight', 'Helvetica Neue', system-ui, sans-serif",
            fontSize: 10,
            letterSpacing: ".2em",
            textTransform: "uppercase",
            color: "#a8b0b0",
            marginTop: 8,
            textShadow: "0 1px 3px rgba(0,0,0,0.4)",
          }}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
