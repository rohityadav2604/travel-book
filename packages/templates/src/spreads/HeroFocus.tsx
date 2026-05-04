import React from "react";
import { PageBg, Photo } from "../components/PageShell";

export type HeroFocusProps = {
  photoUrl: string | undefined;
  caption?: string | undefined;
  subtitle?: string | undefined;
};

export default function HeroFocus({
  photoUrl,
  caption,
  subtitle = "— the journey continues —",
}: HeroFocusProps): React.ReactElement {
  return (
    <PageBg>
      {/* Outer frame */}
      <div
        style={{
          position: "absolute",
          inset: 28,
          border: "1px solid rgba(44,31,21,.12)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 36,
          border: "0.5px solid rgba(44,31,21,.08)",
          pointerEvents: "none",
        }}
      />

      {/* Photo area — generous padding so image floats on the paper */}
      <div
        style={{
          position: "absolute",
          top: 52,
          left: 52,
          right: 52,
          bottom: caption ? 130 : 100,
          background: "#e8d9c0",
          boxShadow: "inset 0 0 24px rgba(110,70,30,.10)",
        }}
      >
        <Photo
          src={photoUrl}
          fit="contain"
          vintage={false}
          style={{
            position: "absolute",
            inset: 10,
            background: "transparent",
            boxShadow: "none",
          }}
        />
      </div>

      {/* Caption area */}
      <div
        style={{
          position: "absolute",
          left: 60,
          right: 60,
          bottom: 52,
          textAlign: "center",
        }}
      >
        <div
          className="smallcaps"
          style={{
            fontSize: 10,
            color: "rgba(74,53,38,0.55)",
            letterSpacing: "0.35em",
            marginBottom: 6,
          }}
        >
          {subtitle}
        </div>
        {caption && (
          <div
            className="f-display"
            style={{
              fontSize: 28,
              fontStyle: "italic",
              lineHeight: 1.2,
              color: "#2c1f15",
            }}
          >
            {caption}
          </div>
        )}
      </div>

      {/* Page number */}
      <div
        className="page-num"
        style={{ color: "rgba(74,53,38,0.45)" }}
      >
        —
      </div>
    </PageBg>
  );
}
