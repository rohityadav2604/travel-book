import React from "react";

export default function CityCover({ heroUrl, title, date }: { heroUrl?: string | undefined; title?: string | undefined; date?: string | undefined }): React.ReactElement {
  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: "#1c2025" }}>
      {heroUrl ? (
        <>
          <img src={heroUrl} alt="" className="absolute inset-0 h-full w-full object-cover" style={{ filter: "saturate(.7) contrast(1.05) brightness(.6)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(15,19,24,0.2), rgba(15,19,24,0.85))" }} />
        </>
      ) : (
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #1c2025, #0f1318)" }} />
      )}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-8" style={{ textAlign: "center" }}>
        <div style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 10, letterSpacing: ".35em", textTransform: "uppercase", color: "#00d4aa", marginBottom: 20 }}>
          Travel Book
        </div>
        <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 48, fontWeight: 300, fontStyle: "italic", lineHeight: 1.1, color: "#e0e2e5" }}>
          {title || "City Lights"}
        </h1>
        {date && (
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: ".15em", color: "#6b7580", marginTop: 16 }}>
            {date}
          </p>
        )}
      </div>
    </div>
  );
}
