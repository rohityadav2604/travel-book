import React from "react";
import { PageBg } from "../components/PageShell";
import { Flourish, CoffeeStain, Stamp, Ticket } from "@memorybook/design/components/decorations";

export type EphemeraProps = {
  photos: (string | undefined)[];
  texts?: Record<string, string> | undefined;
};

export default function Ephemera({ texts }: EphemeraProps): React.ReactElement {
  return (
    <PageBg>
      <div style={{ position: "absolute", top: 50, left: 60, right: 60 }}>
        <div className="smallcaps" style={{ fontSize: 10, color: "var(--ink-faded)" }}>{texts?.eyebrow || "kept & collected"}</div>
        <h3 className="f-display" style={{ fontSize: 38, fontStyle: "italic", margin: "4px 0 0", color: "var(--ink)" }}>
          {texts?.title || "Things from pockets"}
        </h3>
        <Flourish width={140} color="#8b3a1e" style={{ marginTop: 12 }} />
      </div>

      <div style={{ position: "absolute", top: 250, left: 200, opacity: 0.35 }}>
        <CoffeeStain size={80} />
      </div>

      {/* ticket 1 */}
      <div style={{ position: "absolute", top: 150, left: 60, transform: "rotate(-3deg)", width: 320 }}>
        <Ticket from={texts?.ticketFrom || "LONDON"} to={texts?.ticketTo || "PARIS"} date={texts?.ticketDate || "22·IX·74"} seat={texts?.ticketSeat || "14B"} />
      </div>

      {/* boarding pass-style */}
      <div
        style={{
          position: "absolute",
          top: 220,
          right: 50,
          transform: "rotate(4deg)",
          background: "#ecdcb9",
          padding: "10px 14px",
          boxShadow: "0 8px 20px rgba(44,31,21,.18)",
          border: "1px solid #6b4f3a",
          width: 200,
        }}
      >
        <div className="f-mono" style={{ fontSize: 8, color: "var(--ink-faded)", letterSpacing: "0.2em", borderBottom: "1px dashed #6b4f3a", paddingBottom: 5 }}>
          {texts?.boardingHeader || "BOARDING PASS · 1stCLASS"}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
          <div>
            <div className="f-mono" style={{ fontSize: 7, color: "var(--ink-faded)" }}>{texts?.fromLabel || "FROM"}</div>
            <div className="f-display" style={{ fontSize: 20, color: "var(--ink)" }}>{texts?.fromCode || "CDG"}</div>
          </div>
          <div style={{ alignSelf: "center", color: "var(--terracotta)", fontSize: 18 }}>→</div>
          <div>
            <div className="f-mono" style={{ fontSize: 7, color: "var(--ink-faded)" }}>{texts?.toLabel || "TO"}</div>
            <div className="f-display" style={{ fontSize: 20, color: "var(--ink)" }}>{texts?.toCode || "FCO"}</div>
          </div>
        </div>
        <div className="f-mono" style={{ fontSize: 8, color: "var(--ink-soft)", marginTop: 6, letterSpacing: "0.15em" }}>
          {texts?.flightInfo || "FLT AZ-414 · 14:20 · GATE B7"}
        </div>
      </div>

      {/* postcard */}
      <div
        style={{
          position: "absolute",
          top: 320,
          left: 70,
          transform: "rotate(-1deg)",
          width: 260,
          padding: 6,
          background: "#f7ecd4",
          boxShadow: "0 12px 28px rgba(44,31,21,.2)",
        }}
      >
        <div style={{ border: "1px solid #8b3a1e", padding: 10, position: "relative" }}>
          <div className="f-display" style={{ fontSize: 16, fontStyle: "italic", color: "var(--terracotta-deep)" }}>{texts?.postcardTitle || "Greetings from Paris"}</div>
          <div className="f-script" style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 4, lineHeight: 1.3, paddingRight: 56 }}>
            {texts?.postcardBody || "The cafés are exactly as small & perfect as you said. I have eaten my weight in croissants. Wish you were here."}
          </div>
          <div className="f-script" style={{ fontSize: 14, color: "var(--ink)", marginTop: 4, textAlign: "right" }}>
            {texts?.postcardSignature || "-- love, A."}
          </div>
          <div style={{ position: "absolute", top: 8, right: 8 }}>
            <Stamp country={texts?.stampCountry || "FRANCE"} value={texts?.stampValue || "0,80F"} color="terra" />
          </div>
        </div>
      </div>

      {/* coins / tokens drawn */}
      <svg width="80" height="80" viewBox="0 0 80 80" style={{ position: "absolute", bottom: 90, right: 100, transform: "rotate(8deg)" }}>
        <circle cx="40" cy="40" r="32" fill="#c89441" opacity="0.7" stroke="#8b3a1e" strokeWidth="1" />
        <circle cx="40" cy="40" r="26" fill="none" stroke="#8b3a1e" strokeWidth="0.6" opacity="0.8" />
        <text x="40" y="32" textAnchor="middle" fontSize="8" fill="#3a2a1c" fontFamily="Cormorant SC, serif" letterSpacing="1">
          {texts?.coinTop || "REPVBLICA"}
        </text>
        <text x="40" y="48" textAnchor="middle" fontSize="14" fill="#3a2a1c" fontFamily="DM Serif Display, serif">
          {texts?.coinValue || "100"}
        </text>
        <text x="40" y="60" textAnchor="middle" fontSize="6" fill="#3a2a1c" fontFamily="Cormorant SC, serif" letterSpacing="1">
          {texts?.coinBottom || "LIRE"}
        </text>
      </svg>

      {/* matchbook */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: 70,
          transform: "rotate(-6deg)",
          width: 100,
          height: 60,
          background: "linear-gradient(180deg, #8b3a1e 0%, #8b3a1e 60%, #4a1a14 60%, #4a1a14 100%)",
          padding: "8px 10px",
          color: "#f3e7d1",
          boxShadow: "0 6px 14px rgba(0,0,0,.25)",
        }}
      >
        <div className="f-display" style={{ fontSize: 12, fontStyle: "italic", lineHeight: 1 }}>{texts?.matchbookLine1 || "Caffè"}</div>
        <div className="f-display" style={{ fontSize: 14, fontStyle: "italic", lineHeight: 1 }}>{texts?.matchbookLine2 || "Trastevere"}</div>
        <div className="f-mono" style={{ fontSize: 6, letterSpacing: "0.15em", marginTop: 4, opacity: 0.8 }}>
          {texts?.matchbookLine3 || "EST. 1894 · ROMA"}
        </div>
      </div>

      <div className="page-num" style={{ left: "50%", transform: "translateX(-50%)" }}>
        {texts?.pageNumber || "-- 56 --"}
      </div>
    </PageBg>
  );
}
