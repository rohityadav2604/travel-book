import React from "react";
import { HPageBg, HPhoto } from "../components/PageShell";

export type HighlandGridProps = {
  heroUrl: string | undefined;
  heroSlotId?: string;
  heroCaption?: string | undefined;
  smallPhotos: Array<{ url: string | undefined; caption?: string; slotId: string }>;
  title?: string | undefined;
  texts?: Record<string, string> | undefined;
};

export default function HighlandGrid({ heroUrl, heroSlotId, heroCaption, smallPhotos, title, texts }: HighlandGridProps): React.ReactElement {
  return (
    <HPageBg>
      <div style={{ position: "absolute", top: 30, left: 56, right: 56, display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16 }}>
        <h3 className="m-display" style={{ fontSize: 22, fontStyle: "italic", margin: 0, fontWeight: 300, color: "#1f3528", letterSpacing: "-.02em", whiteSpace: "nowrap" }}>
          {title || texts?.title || "Five days in the pines"}
        </h3>
        <div className="m-mono" style={{ fontSize: 9, color: "#6b7568", letterSpacing: ".2em", whiteSpace: "nowrap" }}>
          {texts?.issue || "X · MMXXIV"}
        </div>
      </div>

      <div style={{ position: "absolute", top: 70, left: 56, right: 56, bottom: 110, display: "grid", gridTemplateColumns: "1.4fr 1fr", gridTemplateRows: "1.3fr 1fr", gap: 8 }}>
        <div style={{ gridRow: "1 / span 2", position: "relative" }}>
          <HPhoto src={heroUrl} slotId={heroSlotId} style={{ width: "100%", height: "100%" }} />
          {(heroCaption || texts?.hero) && (
            <div className="m-caps" style={{ position: "absolute", bottom: 10, left: 12, fontSize: 8, color: "#ecebe2", letterSpacing: ".3em", textShadow: "0 1px 3px rgba(0,0,0,.6)" }}>
              {heroCaption || texts?.hero}
            </div>
          )}
        </div>
        {smallPhotos.slice(0, 2).map((p, i) => (
          <div key={i} style={{ position: "relative" }}>
            <HPhoto src={p.url} slotId={p.slotId} style={{ width: "100%", height: "100%" }} />
            {(p.caption || texts?.[i === 0 ? "topRight" : "bottomRight"]) && (
              <div className="m-caps" style={{ position: "absolute", bottom: 8, left: 10, fontSize: 8, color: "#ecebe2", letterSpacing: ".3em", textShadow: "0 1px 3px rgba(0,0,0,.6)" }}>
                {p.caption || texts?.[i === 0 ? "topRight" : "bottomRight"]}
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ position: "absolute", left: 56, right: 56, bottom: 50, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
        <p className="m-serif" style={{ fontSize: 12, color: "#3a4438", fontStyle: "italic", margin: 0, textWrap: "pretty", flex: 1 }}>
          &ldquo;{texts?.quote || "The forest does not perform -- it tolerates."}&rdquo;
        </p>
        <div className="m-mono" style={{ fontSize: 9, color: "#6b7568", letterSpacing: ".15em", whiteSpace: "nowrap" }}>
          {texts?.pageNumber || "-- 32"}
        </div>
      </div>
    </HPageBg>
  );
}
