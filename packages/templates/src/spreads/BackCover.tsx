import React from "react";
import { PageBg } from "../components/PageShell";
import { Flourish, Stamp, PassportStamp, Botanical, FernSprig } from "@memorybook/design/components/decorations";

export type BackCoverProps = {
  brand: string | undefined;
  texts?: Record<string, string> | undefined;
};

export default function BackCover({ brand, texts }: BackCoverProps): React.ReactElement {
  return (
    <PageBg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 50% 60%, rgba(255,220,170,.15), rgba(120,60,20,.18) 80%)",
          pointerEvents: "none",
        }}
      />

      {/* postage mark blocks like a letter back */}
      <div style={{ position: "absolute", top: 60, right: 60, display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
        <div style={{ transform: "rotate(-6deg)" }}>
          <Stamp country="MUNDO" value="∞" color="olive" />
        </div>
        <PassportStamp city={texts?.passportCity || "THE END"} date={texts?.passportDate || "MCMLXXIV"} color="terra" rotate={6} />
      </div>

      {/* address-block style memory */}
      <div style={{ position: "absolute", top: 120, left: 60, width: 280 }}>
        <div className="f-mono" style={{ fontSize: 10, color: "var(--ink-faded)", letterSpacing: "0.2em", marginBottom: 10 }}>
          {texts?.returnLabel || "-- RETURN TO --"}
        </div>
        <div className="f-script" style={{ fontSize: 24, color: "var(--ink)", marginBottom: 4 }}>
          {texts?.returnName || "the one who wandered"}
        </div>
        <div className="f-script" style={{ fontSize: 18, color: "var(--ink-soft)", lineHeight: 1.4 }}>
          {(texts?.returnAddress || "c/o the kitchen table\na small flat by the river\nsomewhere quiet, again").split("\n").map((line) => (
            <React.Fragment key={line}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* big sentiment */}
      <div style={{ position: "absolute", top: "44%", left: 60, right: 60, textAlign: "center" }}>
        <Flourish width={180} color="#8b3a1e" style={{ display: "block", margin: "0 auto 28px" }} />
        <p
          className="f-display"
          style={{
            fontSize: 36,
            fontStyle: "italic",
            lineHeight: 1.25,
            color: "var(--ink)",
            margin: 0,
            textWrap: "balance",
          }}
        >
          {(texts?.sentiment || "And so we came home,\nfull of weather & cheese\n& impossible light.").split("\n").map((line) => (
            <React.Fragment key={line}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>
        <Flourish width={180} color="#8b3a1e" style={{ display: "block", margin: "28px auto 0" }} />
      </div>

      {/* colophon */}
      <div style={{ position: "absolute", bottom: 110, left: 60, right: 60, textAlign: "center" }}>
        <div className="smallcaps" style={{ fontSize: 10, color: "var(--ink-faded)", letterSpacing: "0.4em" }}>
          {texts?.colophonLabel || "colophon"}
        </div>
        <p
          className="f-serif"
          style={{
            fontSize: 13,
            fontStyle: "italic",
            color: "var(--ink-soft)",
            lineHeight: 1.6,
            marginTop: 8,
            maxWidth: 360,
            margin: "8px auto 0",
          }}
        >
          {texts?.colophon || "Bound & printed in a small shop near the harbor. Set in Cormorant & Caveat. Two hundred copies -- this is no. 047."}
        </p>
      </div>

      {/* corner border */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 600 600"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      >
        <rect x="36" y="36" width="528" height="528" fill="none" stroke="#8b3a1e" strokeWidth="0.8" opacity="0.4" />
        <rect x="44" y="44" width="512" height="512" fill="none" stroke="#8b3a1e" strokeWidth="0.4" opacity="0.3" />
      </svg>

      <div style={{ position: "absolute", bottom: 50, left: 70, opacity: 0.5 }}>
        <Botanical size={70} rotate={-25} />
      </div>
      <div style={{ position: "absolute", bottom: 50, right: 70, opacity: 0.5 }}>
        <FernSprig size={60} rotate={20} />
      </div>

      <div
        className="f-mono"
        style={{
          position: "absolute",
          bottom: 22,
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: 10,
          letterSpacing: "0.25em",
          color: "var(--ink-faded)",
        }}
      >
        {brand || texts?.brand || "Wanderbound"} · ~ FIN ~
      </div>
    </PageBg>
  );
}
