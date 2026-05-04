import React from "react";
import { PageBg, Photo } from "../components/PageShell";
import { PassportStamp } from "@memorybook/design/components/decorations";

export type JournalPageProps = {
  leftPhotoUrl: string | undefined;
  leftSlotId?: string;
  topRightPhotoUrl: string | undefined;
  topRightSlotId?: string;
  bottomRightPhotoUrl: string | undefined;
  bottomRightSlotId?: string;
  date: string | undefined;
  weather?: string | undefined;
  location?: string | undefined;
  body?: string | undefined;
  body2?: string | undefined;
  polaroidCaption?: string | undefined;
  signature?: string | undefined;
  texts?: Record<string, string> | undefined;
};

export default function JournalPage({
  leftPhotoUrl,
  leftSlotId,
  topRightPhotoUrl,
  topRightSlotId,
  bottomRightPhotoUrl,
  bottomRightSlotId,
  date,
  weather,
  location,
  body,
  body2,
  polaroidCaption,
  signature,
  texts,
}: JournalPageProps): React.ReactElement {
  const bodyText =
    body ||
    texts?.body ||
    "Today began before the sun did. We climbed Fushimi Inari while the gates were still wet from morning rain, and the foxes seemed to watch us from every shrine. M. counted 412 torii before she stopped counting. I lost count somewhere around the seventh switchback, when I sat on a stone bench and ate a peach so ripe it stained my journal. I have left the page in. It looks like a sunset.";
  const secondBodyText =
    body2 ||
    texts?.body2 ||
    "We took the slow train back. A boy across the aisle offered me a paper crane. I am keeping it here, between this page and the next.";

  return (
    <PageBg>
      {/* ruled lines */}
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 80,
          right: 80,
          bottom: 100,
          backgroundImage: "linear-gradient(transparent 27px, rgba(74,53,38,.2) 28px)",
          backgroundSize: "100% 28px",
          pointerEvents: "none",
        }}
      />
      {/* margin red line */}
      <div
        style={{
          position: "absolute",
          top: 60,
          bottom: 60,
          left: 130,
          width: 1,
          background: "rgba(185,83,46,.45)",
        }}
      />

      {/* header date */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 80,
          right: 230,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          gap: 12,
          paddingBottom: 8,
          borderBottom: "1px solid var(--ink-faded)",
        }}
      >
        <div className="f-script" style={{ fontSize: 22, color: "var(--ink-soft)", whiteSpace: "nowrap" }}>
          {date || texts?.date || "Tuesday, the 16th"}
        </div>
        <div className="f-mono" style={{ fontSize: 8, color: "var(--ink-faded)", letterSpacing: ".15em", whiteSpace: "nowrap" }}>
          {weather || texts?.weather || "FAIR & WINDY"}
        </div>
      </div>

      <div
        className="f-display"
        style={{ position: "absolute", top: 92, left: 80, fontSize: 28, fontStyle: "italic", color: "var(--terracotta-deep)" }}
      >
        {location || texts?.location || "Kyoto, evening"}
      </div>

      {/* journal text */}
      <div style={{ position: "absolute", top: 180, left: 145, right: 80, bottom: 110 }}>
        <p
          className="f-script dropcap"
          style={{ fontSize: 21, lineHeight: 1.33, color: "var(--ink-soft)", margin: 0, textWrap: "pretty" }}
        >
          {bodyText}
        </p>
        <p className="f-script" style={{ fontSize: 21, lineHeight: 1.33, color: "var(--ink-soft)", marginTop: 16, textWrap: "pretty" }}>
          {secondBodyText}
        </p>
      </div>

      {/* paperclip + small photo */}
      <div style={{ position: "absolute", top: 110, right: 60, transform: "rotate(6deg)" }}>
        <div style={{ background: "#f7ecd4", padding: "8px 8px 22px", boxShadow: "0 8px 18px rgba(44,31,21,.2)", width: 130 }}>
          <Photo src={leftPhotoUrl} slotId={leftSlotId} style={{ width: "100%", aspectRatio: 1 }} />
          <div className="f-script" style={{ position: "absolute", bottom: 4, left: 0, right: 0, textAlign: "center", fontSize: 13, color: "var(--ink-soft)" }}>
            {polaroidCaption || texts?.polaroidCaption || "Fushimi"}
          </div>
        </div>
        {/* paperclip */}
        <svg width="40" height="60" viewBox="0 0 40 60" style={{ position: "absolute", top: -20, left: 50 }}>
          <path
            d="M10 8 Q 10 4 14 4 L 28 4 Q 32 4 32 8 L 32 48 Q 32 54 26 54 Q 20 54 20 48 L 20 14 Q 20 10 24 10 L 24 42"
            stroke="#7a6a5a"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </div>

      {/* small photos stacked on right margin */}
      <div style={{ position: "absolute", top: 360, right: 60, width: 100, display: "flex", flexDirection: "column", gap: 6 }}>
        <Photo src={topRightPhotoUrl} slotId={topRightSlotId} style={{ width: "100%", height: 70 }} />
        <Photo src={bottomRightPhotoUrl} slotId={bottomRightSlotId} style={{ width: "100%", height: 70 }} />
      </div>

      {/* signature */}
      <div style={{ position: "absolute", bottom: 60, right: 100 }}>
        <div className="f-script" style={{ fontSize: 28, color: "var(--ink)", transform: "rotate(-4deg)" }}>{signature || texts?.signature || "-- E."}</div>
      </div>

      <PassportStamp city={texts?.stampCity || "KYOTO"} date={texts?.stampDate || "16·X·74"} shape="circle" color="burgundy" rotate={12} style={{ position: "absolute", bottom: 130, left: 50 }} />

      <div className="page-num">{texts?.pageNumber || "-- 41 --"}</div>
    </PageBg>
  );
}
