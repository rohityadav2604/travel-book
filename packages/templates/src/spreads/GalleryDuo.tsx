import React from "react";
import { PageBg, Photo } from "../components/PageShell";

export type GalleryDuoProps = {
  leftUrl: string | undefined;
  leftSlotId?: string;
  rightUrl: string | undefined;
  rightSlotId?: string;
  leftCaption?: string | undefined;
  rightCaption?: string | undefined;
  title?: string | undefined;
  texts?: Record<string, string> | undefined;
};

export default function GalleryDuo({
  leftUrl,
  leftSlotId,
  rightUrl,
  rightSlotId,
  leftCaption,
  rightCaption,
  title,
  texts,
}: GalleryDuoProps): React.ReactElement {
  return (
    <PageBg>
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <div
          className="smallcaps"
          style={{
            fontSize: 10,
            color: "rgba(74,53,38,0.5)",
            letterSpacing: "0.4em",
          }}
        >
          {title || texts?.title || "Side by Side"}
        </div>
      </div>

      {/* Divider line */}
      <div
        style={{
          position: "absolute",
          top: 72,
          left: 80,
          right: 80,
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(44,31,21,.15), transparent)",
        }}
      />

      {/* Left photo */}
      <div
        style={{
          position: "absolute",
          top: 100,
          left: 48,
          width: 236,
          bottom: 100,
          background: "#e8d9c0",
          boxShadow: "inset 0 0 20px rgba(110,70,30,.08)",
        }}
      >
        <Photo
          src={leftUrl}
          slotId={leftSlotId}
          fit="contain"
          vintage={false}
          style={{
            position: "absolute",
            inset: 8,
            background: "transparent",
            boxShadow: "none",
          }}
        />
      </div>

      {/* Right photo */}
      <div
        style={{
          position: "absolute",
          top: 100,
          right: 48,
          width: 236,
          bottom: 100,
          background: "#e8d9c0",
          boxShadow: "inset 0 0 20px rgba(110,70,30,.08)",
        }}
      >
        <Photo
          src={rightUrl}
          slotId={rightSlotId}
          fit="contain"
          vintage={false}
          style={{
            position: "absolute",
            inset: 8,
            background: "transparent",
            boxShadow: "none",
          }}
        />
      </div>

      {/* Captions */}
      <div
        style={{
          position: "absolute",
          bottom: 48,
          left: 48,
          width: 236,
          textAlign: "center",
        }}
      >
        {(leftCaption || texts?.left) && (
          <div
            className="f-script"
            style={{
              fontSize: 18,
              color: "rgba(44,31,21,.75)",
            }}
          >
            {leftCaption || texts?.left}
          </div>
        )}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 48,
          right: 48,
          width: 236,
          textAlign: "center",
        }}
      >
        {(rightCaption || texts?.right) && (
          <div
            className="f-script"
            style={{
              fontSize: 18,
              color: "rgba(44,31,21,.75)",
            }}
          >
            {rightCaption || texts?.right}
          </div>
        )}
      </div>

      {/* Page number */}
      <div
        className="page-num"
        style={{ color: "rgba(74,53,38,0.45)" }}
      >
        {texts?.pageNumber || "--"}
      </div>
    </PageBg>
  );
}
