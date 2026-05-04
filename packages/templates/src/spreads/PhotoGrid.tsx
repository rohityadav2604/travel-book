import React from "react";
import { PageBg, Photo } from "../components/PageShell";
import { Flourish, Botanical } from "@memorybook/design/components/decorations";

export type PhotoGridProps = {
  heroUrl: string | undefined;
  heroSlotId?: string;
  heroCaption?: string;
  smallPhotos: Array<{ url: string | undefined; caption?: string; slotId: string }>;
  title?: string;
  date?: string;
  footerNote?: string;
  texts?: Record<string, string> | undefined;
};

export default function PhotoGrid({
  heroUrl,
  heroSlotId,
  heroCaption,
  smallPhotos,
  title,
  date,
  footerNote,
  texts,
}: PhotoGridProps): React.ReactElement {
  const photos = smallPhotos.slice(0, 3);
  const renderedTitle = title || texts?.title || "A week in Marrakesh";
  const renderedDate = date || texts?.date || "IV · MMXXIV";
  const renderedHeroCaption = heroCaption || texts?.hero || "the souk at dusk";
  const renderedFooterNote =
    footerNote ||
    texts?.footerNote ||
    "Seven days were not nearly enough. The light here arrives slowly and leaves all at once -- by six the walls turn the color of saffron, and by seven they are violet.";

  return (
    <PageBg>
      <div style={{ position: "absolute", top: 50, left: 60, right: 60, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <h3 className="f-display" style={{ fontSize: 32, fontStyle: "italic", margin: 0, color: "var(--ink)" }}>
          {renderedTitle}
        </h3>
        <div className="f-mono" style={{ fontSize: 10, color: "var(--ink-faded)", letterSpacing: ".2em" }}>{renderedDate}</div>
      </div>
      <Flourish width={480} color="#8b3a1e" style={{ position: "absolute", top: 92, left: 60 }} />

      {/* hero on left */}
      <div style={{ position: "absolute", top: 120, left: 60, width: 260, height: 240 }}>
        <Photo src={heroUrl} slotId={heroSlotId} style={{ width: "100%", height: "100%" }} />
        <div className="f-script" style={{ fontSize: 16, color: "var(--ink-soft)", marginTop: 4, textAlign: "center" }}>
          {renderedHeroCaption}
        </div>
      </div>

      {/* 3 small on right */}
      <div style={{ position: "absolute", top: 120, right: 60, width: 170, display: "flex", flexDirection: "column", gap: 4 }}>
        {photos.map((p, i) => (
          <div key={i}>
            <Photo src={p.url} slotId={p.slotId} style={{ width: "100%", height: 78 }} />
            <div className="f-script" style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: -1, textAlign: "center" }}>
              {p.caption || ""}
            </div>
          </div>
        ))}
      </div>

      {/* footer journal note */}
      <div style={{ position: "absolute", left: 60, right: 60, bottom: 60, display: "flex", gap: 20, alignItems: "flex-start" }}>
        <Botanical size={40} rotate={-15} style={{ flex: "0 0 auto", opacity: 0.6, marginTop: -6 }} />
        <p className="f-serif" style={{ fontStyle: "italic", fontSize: 14, lineHeight: 1.45, color: "var(--ink-soft)", margin: 0, flex: 1 }}>
          {renderedFooterNote}
        </p>
      </div>

      <div className="page-num">{texts?.pageNumber || "-- 32 --"}</div>
    </PageBg>
  );
}
