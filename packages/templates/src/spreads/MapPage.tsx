import React from "react";
import { PageBg } from "../components/PageShell";
import { Compass, HandDrawnMap, Tape, PassportStamp, Botanical } from "@memorybook/design/components/decorations";

export type MapPageProps = {
  photoUrl: string | undefined;
  caption: string | undefined;
  texts?: Record<string, string> | undefined;
};

export default function MapPage({ caption, texts }: MapPageProps): React.ReactElement {
  return (
    <PageBg>
      {/* faint grid like old atlas */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(#8b3a1e 1px, transparent 1px) 0 0/40px 40px, linear-gradient(90deg, #8b3a1e 1px, transparent 1px) 0 0/40px 40px",
          opacity: 0.04,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 40,
          left: 60,
          right: 60,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div>
          <div className="smallcaps" style={{ fontSize: 10, color: "var(--ink-faded)" }}>{texts?.eyebrow || "itinerary · plate vii"}</div>
          <h3 className="f-display" style={{ fontSize: 30, fontStyle: "italic", margin: "4px 0 0", color: "var(--ink)" }}>
            {caption || texts?.caption || "The Route"}
          </h3>
        </div>
        <Compass size={56} style={{ opacity: 0.85 }} />
      </div>

      {/* the map */}
      <div
        style={{
          position: "absolute",
          top: 110,
          left: 40,
          right: 40,
          padding: 12,
          background: "#ecdcb9",
          boxShadow: "0 1px 2px rgba(0,0,0,.1), 0 14px 30px rgba(44,31,21,.18)",
        }}
      >
        <div style={{ border: "1px solid #6b4f3a", padding: 12, background: "#f3e7d1", overflow: "hidden" }}>
          <HandDrawnMap width={476} height={260} style={{ display: "block", margin: "0 auto" }} />
        </div>
        <div style={{ position: "absolute", top: -8, left: 30 }}>
          <Tape width={60} color="cream" rotate={-8} />
        </div>
        <div style={{ position: "absolute", top: -8, right: 30 }}>
          <Tape width={60} color="cream" rotate={6} />
        </div>
      </div>

      {/* route legend */}
      <div
        style={{
          position: "absolute",
          left: 60,
          right: 60,
          bottom: 60,
          display: "flex",
          gap: 24,
          justifyContent: "space-between",
        }}
      >
        <div style={{ flex: "0 0 180px" }}>
          <div className="smallcaps" style={{ fontSize: 10, color: "var(--terracotta-deep)", marginBottom: 6 }}>{texts?.routeHeader || "route"}</div>
          <div className="f-serif" style={{ fontSize: 13, lineHeight: 1.6, color: "var(--ink-soft)" }}>
            <div>{texts?.stop1 || "① Napoli   3 days"}</div>
            <div>{texts?.stop2 || "② Roma   5 days"}</div>
            <div>{texts?.stop3 || "③ Firenze   4 days"}</div>
            <div>{texts?.stop4 || "④ Venezia   3 days"}</div>
          </div>
        </div>
        <div style={{ flex: 1, fontStyle: "italic" }}>
          <p className="f-script" style={{ fontSize: 18, lineHeight: 1.3, color: "var(--ink-soft)", margin: 0 }}>
            {texts?.routeNote || "850 km of slow trains, three stolen siestas, & one entirely unintentional stop in a town with no name on any map."}
          </p>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 40, left: 40, opacity: 0.5 }}>
        <Botanical size={50} rotate={-10} />
      </div>

      <div style={{ position: "absolute", top: 80, right: 50 }}>
        <PassportStamp city={texts?.stampCity || "MAPPA"} date={texts?.stampDate || "VII·74"} color="teal" rotate={-6} />
      </div>

      <div className="page-num" style={{ left: "50%", transform: "translateX(-50%)" }}>
        {texts?.pageNumber || "-- 22 --"}
      </div>
    </PageBg>
  );
}
