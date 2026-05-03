import React from "react";
import { PageBg } from "../components/PageShell";
import { Flourish, FernSprig } from "@memorybook/design/components/decorations";

export type IndexPageProps = {
  chapters?: Array<{ num: string; title: string; sub: string; page: string }>;
  stats?: Array<{ num: string; label: string }>;
};

export default function IndexPage({
  chapters = [
    { num: "I", title: "How it began", sub: "London — a packing list, a postcard", page: "01" },
    { num: "II", title: "The long way to Tuscany", sub: "Naples · Rome · Florence · Venice", page: "24" },
    { num: "III", title: "An interlude in Provence", sub: "Lavender, butter-yellow Citroën", page: "62" },
    { num: "IV", title: "Bits of Greece", sub: "Athens · Hydra · Santorini", page: "84" },
    { num: "V", title: "All the way home", sub: "Marseille — and a long quiet train", page: "108" },
  ],
  stats = [
    { num: "11", label: "countries" },
    { num: "37", label: "cities" },
    { num: "94", label: "days" },
    { num: "212", label: "photographs" },
  ],
}: IndexPageProps): React.ReactElement {
  return (
    <PageBg>
      <div style={{ position: "absolute", top: 56, left: 60, right: 60, textAlign: "center" }}>
        <div className="smallcaps" style={{ fontSize: 11, color: "var(--ink-faded)", letterSpacing: ".5em" }}>contents</div>
        <h3 className="f-display" style={{ fontSize: 44, fontStyle: "italic", margin: "8px 0 4px", color: "var(--ink)" }}>
          The Whole Journey
        </h3>
        <Flourish width={160} color="#8b3a1e" style={{ display: "block", margin: "0 auto" }} />
      </div>

      <div style={{ position: "absolute", top: 170, left: 80, right: 80 }}>
        {chapters.map((c, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 18,
              padding: "14px 0",
              borderBottom: i < chapters.length - 1 ? "1px dashed rgba(74,53,38,.3)" : "none",
            }}
          >
            <div className="f-display" style={{ fontSize: 28, fontStyle: "italic", color: "var(--terracotta)", minWidth: 40 }}>
              {c.num}
            </div>
            <div style={{ flex: 1 }}>
              <div className="f-display" style={{ fontSize: 22, fontStyle: "italic", color: "var(--ink)" }}>{c.title}</div>
              <div className="f-script" style={{ fontSize: 16, color: "var(--ink-soft)", marginTop: 2 }}>{c.sub}</div>
            </div>
            <div style={{ flex: "0 0 auto", display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 40, height: 1, borderTop: "1px dotted var(--ink-faded)" }} />
              <div className="f-mono" style={{ fontSize: 13, color: "var(--ink-soft)", letterSpacing: ".1em" }}>p. {c.page}</div>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 70,
          left: 80,
          right: 80,
          display: "flex",
          justifyContent: "space-around",
          paddingTop: 18,
          borderTop: "1px solid var(--ink-faded)",
        }}
      >
        {stats.map((s, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div className="f-display" style={{ fontSize: 32, fontStyle: "italic", color: "var(--terracotta-deep)", lineHeight: 1 }}>
              {s.num}
            </div>
            <div className="smallcaps" style={{ fontSize: 9, color: "var(--ink-faded)", marginTop: 4, letterSpacing: ".3em" }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <FernSprig size={50} rotate={-15} style={{ position: "absolute", top: 130, left: 30, opacity: 0.5 }} />
      <FernSprig size={50} rotate={15} style={{ position: "absolute", top: 130, right: 30, opacity: 0.5, transform: "scaleX(-1)" }} />

      <div className="page-num" style={{ left: "50%", transform: "translateX(-50%)" }}>— iii —</div>
    </PageBg>
  );
}
