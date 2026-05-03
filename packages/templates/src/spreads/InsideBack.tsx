import React from "react";
import { PageBg } from "../components/PageShell";
import { PassportStamp, Compass, Botanical } from "@memorybook/design/components/decorations";

export type InsideBackProps = {
  tripStats: { label: string; value: string }[] | undefined;
};

export default function InsideBack({ tripStats }: InsideBackProps): React.ReactElement {
  const stats = tripStats?.length
    ? tripStats
    : [
        { label: "Countries", value: "11" },
        { label: "Cities", value: "37" },
        { label: "Days", value: "94" },
        { label: "Photographs", value: "212" },
      ];

  return (
    <PageBg>
      {/* Decorative world map SVG */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 280" preserveAspectRatio="xMidYMid slice" style={{ opacity: 0.1 }}>
        <ellipse cx="200" cy="140" rx="180" ry="100" fill="none" stroke="#2c1f15" strokeWidth="0.5" />
        <path d="M50 140 Q100 80 200 100 T350 140" fill="none" stroke="#2c1f15" strokeWidth="0.3" />
        <path d="M60 160 Q120 200 200 180 T340 160" fill="none" stroke="#2c1f15" strokeWidth="0.3" />
        {/* Dotted route */}
        <path d="M 80 180 Q 150 120 220 140 T 320 100" fill="none" stroke="#b9532e" strokeWidth="1.5" strokeDasharray="3 6" />
        {/* Destination markers */}
        {[
          { x: 80, y: 180 },
          { x: 220, y: 140 },
          { x: 320, y: 100 },
        ].map((m, i) => (
          <g key={i}>
            <circle cx={m.x} cy={m.y} r={3} fill="#b9532e" />
            <circle cx={m.x} cy={m.y} r={6} fill="none" stroke="#b9532e" strokeWidth="0.5" opacity="0.5" />
          </g>
        ))}
      </svg>

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 60px",
        }}
      >
        <div className="smallcaps" style={{ fontSize: 11, color: "var(--ink-faded)", letterSpacing: "0.4em", marginBottom: 24 }}>
          the journey in numbers
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "32px 48px",
            textAlign: "center",
          }}
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="f-display" style={{ fontSize: 40, fontStyle: "italic", color: "var(--terracotta-deep)", lineHeight: 1 }}>
                {stat.value}
              </p>
              <p className="smallcaps" style={{ fontSize: 10, color: "var(--ink-faded)", marginTop: 6, letterSpacing: "0.3em" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40 }}>
          <PassportStamp city="THE WORLD" date="MCMLXXIV" color="terra" rotate={6} />
        </div>
      </div>

      <div style={{ position: "absolute", top: 60, right: 60, opacity: 0.6 }}>
        <Compass size={56} />
      </div>

      <div style={{ position: "absolute", bottom: 50, left: 60, opacity: 0.5 }}>
        <Botanical size={60} rotate={-15} />
      </div>

      <div className="page-num" style={{ left: "50%", transform: "translateX(-50%)" }}>
        — cvi —
      </div>
    </PageBg>
  );
}
