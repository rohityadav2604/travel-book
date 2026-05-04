import React from "react";
import { PageBg, Photo } from "../components/PageShell";
import { Flourish, Stamp, PassportStamp, CoffeeStain, Botanical } from "@memorybook/design/components/decorations";

export type CoverProps = {
  heroUrl: string | undefined;
  heroSlotId?: string;
  title: string | undefined;
  date: string | undefined;
  texts?: Record<string, string> | undefined;
};

export default function Cover({ heroUrl, heroSlotId, title, date, texts }: CoverProps): React.ReactElement {
  return (
    <PageBg>
      {heroUrl && <Photo src={heroUrl} slotId={heroSlotId} style={{ position: "absolute", inset: 0 }} />}
      {/* warm vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 50% 40%, rgba(255,220,170,.15), rgba(120,60,20,.18) 80%)",
          pointerEvents: "none",
        }}
      />

      {/* top tape + stamp */}
      <div style={{ position: "absolute", top: 30, left: "50%", marginLeft: -70, transform: "rotate(-4deg)" }}>
        <div
          style={{
            width: 140,
            height: 18,
            background: "linear-gradient(180deg, rgba(243,231,209,.7), rgba(225,210,180,.7))",
            boxShadow: "0 2px 4px rgba(0,0,0,.10)",
          }}
        />
      </div>

      <div style={{ position: "absolute", top: 60, right: 48, display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
        <div style={{ transform: "rotate(6deg)" }}>
          <Stamp country="POSTE" value="L.500" color="terra" />
        </div>
      </div>

      <div style={{ position: "absolute", top: 110, left: 56 }}>
        <PassportStamp city="VOL.I" date="MCMLXXIV" color="terra" rotate={-12} />
      </div>

      {/* main title block */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 60px",
        }}
      >
        <div className="smallcaps" style={{ fontSize: 13, color: "var(--terracotta-deep)", marginBottom: 24 }}>
          {texts?.kicker || "-- A Travelogue --"}
        </div>
        <Flourish width={180} color="#8b3a1e" />
        <h1
          className="f-display"
          style={{
            fontSize: 74,
            lineHeight: 0.95,
            margin: "24px 0 8px",
            color: "var(--ink)",
            fontStyle: "italic",
            letterSpacing: "-.01em",
          }}
        >
          {title || "Wanderbound"}
        </h1>
        <div className="f-script" style={{ fontSize: 32, color: "var(--terracotta)", marginTop: -2 }}>
          {date || "& other small adventures"}
        </div>
        <Flourish width={180} color="#8b3a1e" style={{ marginTop: 28 }} />
        <div className="smallcaps" style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 32, lineHeight: 1.8 }}>
          {(texts?.contents || "Photographs · Letters · Maps\nVolume One · Summer Editions").split("\n").map((line) => (
            <React.Fragment key={line}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* subtle hand drawn border ornament */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 600 600"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      >
        <rect x="36" y="36" width="528" height="528" fill="none" stroke="#8b3a1e" strokeWidth="0.8" opacity="0.4" />
        <rect x="44" y="44" width="512" height="512" fill="none" stroke="#8b3a1e" strokeWidth="0.4" opacity="0.3" />
        {[
          [44, 44, 0],
          [556, 44, 90],
          [556, 556, 180],
          [44, 556, 270],
        ].map(([x, y, r], i) => (
          <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
            <path d="M0 0 L 24 0 M 0 0 L 0 24 M 4 4 Q 12 4 12 12" stroke="#8b3a1e" strokeWidth="0.8" fill="none" opacity="0.55" />
            <circle r="2" fill="#8b3a1e" opacity="0.7" />
          </g>
        ))}
      </svg>

      <div style={{ position: "absolute", bottom: 80, left: 60, opacity: 0.6 }}>
        <CoffeeStain size={110} />
      </div>
      <div style={{ position: "absolute", bottom: 50, right: 60, opacity: 0.6 }}>
        <Botanical size={70} rotate={-20} />
      </div>

      <div
        className="f-mono"
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: 11,
          letterSpacing: "0.2em",
          bottom: 22,
          color: "var(--ink-faded)",
        }}
      >
        {texts?.property || "Property of the Wanderer"}
      </div>
    </PageBg>
  );
}
