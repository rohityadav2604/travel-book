import React from "react";
import { PageBg, Photo } from "../components/PageShell";
import { Flourish, PostageMark, Botanical } from "@memorybook/design/components/decorations";

export type PhotoJournalProps = {
  photos: Array<{ url: string | undefined; caption?: string }>;
  title?: string;
  header?: string;
  date?: string;
  journalDate?: string;
  bodyParagraphs?: string[];
  keptNote?: string;
};

export default function PhotoJournal({
  photos,
  title = "The drive to Provence",
  header = "field notes & photographs",
  date = "VIII · 1974",
  journalDate = "AUG · 08  ·  14:20",
  bodyParagraphs = [
    "We rented the smallest car they had — a Citroën the color of butter — and drove without a map. The lavender begins all at once: one bend in the road and the world is purple. I made M. stop three times in the first hour just to stand in it.",
    "For lunch — peaches, hard cheese, a baguette torn in half, warm rosé from a paper cup. We ate on the hood of the car and watched a man on a bicycle go by twice without explaining why.",
  ],
  keptNote = "three sprigs of lavender, pressed between p. 64 & p. 65.",
}: PhotoJournalProps): React.ReactElement {
  const leftPhotos = photos.slice(0, 2);

  return (
    <PageBg>
      <div style={{ position: "absolute", top: 56, left: 60, right: 60, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <div className="smallcaps" style={{ fontSize: 11, color: "var(--ink-faded)", letterSpacing: ".4em" }}>{header}</div>
        <div className="f-mono" style={{ fontSize: 10, color: "var(--ink-faded)", letterSpacing: ".15em" }}>{date}</div>
      </div>

      <h3 className="f-display" style={{ position: "absolute", top: 88, left: 60, right: 60, fontSize: 42, fontStyle: "italic", margin: 0, color: "var(--ink)" }}>
        {title}
      </h3>
      <Flourish width={520} color="#8b3a1e" style={{ position: "absolute", top: 142, left: 60 }} />

      {/* left column — photos */}
      <div style={{ position: "absolute", top: 170, left: 60, width: 240, display: "flex", flexDirection: "column", gap: 14 }}>
        {leftPhotos.map((p, i) => (
          <div key={i}>
            <Photo src={p.url} style={{ width: "100%", aspectRatio: i === 0 ? "4/3" : "4/5" }} />
            <div className="f-script" style={{ fontSize: 16, color: "var(--ink-soft)", textAlign: "center", marginTop: -6 }}>
              {p.caption || ""}
            </div>
          </div>
        ))}
      </div>

      {/* right column — journal */}
      <div style={{ position: "absolute", top: 170, left: 320, right: 60, bottom: 100 }}>
        <div className="f-mono" style={{ fontSize: 11, color: "var(--ink-faded)", letterSpacing: ".15em", marginBottom: 10 }}>
          {journalDate}
        </div>
        {bodyParagraphs.map((para, i) => (
          <p
            key={i}
            className={`f-serif ${i === 0 ? "dropcap" : ""}`}
            style={{
              fontSize: 17,
              lineHeight: 1.55,
              color: i === 0 ? "var(--ink)" : "var(--ink-soft)",
              textWrap: "pretty",
              margin: i === 0 ? 0 : "14px 0 0",
              fontStyle: i === 0 ? "normal" : "italic",
            }}
          >
            {para}
          </p>
        ))}

        <div style={{ marginTop: 18, padding: "14px 16px", borderLeft: "3px solid var(--terracotta)", background: "rgba(217,164,65,.12)" }}>
          <div className="smallcaps" style={{ fontSize: 9, color: "var(--terracotta-deep)" }}>kept</div>
          <div className="f-script" style={{ fontSize: 18, color: "var(--ink-soft)", marginTop: 4 }}>
            {keptNote}
          </div>
        </div>
      </div>

      <PostageMark city="VIA AVION" style={{ position: "absolute", bottom: 70, right: 80, transform: "rotate(-4deg)" }} />
      <Botanical size={50} rotate={-20} style={{ position: "absolute", bottom: 60, left: 30, opacity: 0.55 }} />

      <div className="page-num">— 64 —</div>
    </PageBg>
  );
}
