import React from "react";
import { PageBg, Photo } from "../components/PageShell";
import { CoffeeStain, Stamp, PassportStamp, Botanical, Ticket } from "@memorybook/design/components/decorations";

export type PolaroidWallProps = {
  photos: { url: string | undefined; caption?: string; slotId: string }[];
  texts?: Record<string, string> | undefined;
};

type PolaroidConfig = {
  top: number;
  left?: number;
  right?: number;
  width: number;
  rotation: number;
  zIndex?: number;
  tapeWidth: number;
  tapeColor: "terra" | "cream" | "olive" | "mustard";
  tapeRotate: number;
};

const CONFIG: PolaroidConfig[] = [
  { top: 100, left: 40, width: 170, rotation: -5, tapeWidth: 60, tapeColor: "terra", tapeRotate: -12 },
  { top: 240, left: 190, width: 190, rotation: 3, zIndex: 2, tapeWidth: 70, tapeColor: "cream", tapeRotate: -6 },
  { top: 110, right: 40, width: 160, rotation: 7, tapeWidth: 56, tapeColor: "olive", tapeRotate: 8 },
  { top: 360, left: 60, width: 150, rotation: -3, tapeWidth: 50, tapeColor: "mustard", tapeRotate: -4 },
  { top: 340, right: 60, width: 140, rotation: 4, tapeWidth: 55, tapeColor: "cream", tapeRotate: 10 },
];

const TAPE_GRADIENTS: Record<PolaroidConfig["tapeColor"], [string, string]> = {
  mustard: ["rgba(217,164,65,.65)", "rgba(184,138,52,.60)"],
  cream: ["rgba(243,231,209,.75)", "rgba(225,210,180,.70)"],
  terra: ["rgba(185,83,46,.60)", "rgba(140,60,30,.55)"],
  olive: ["rgba(122,132,66,.60)", "rgba(80,86,40,.55)"],
};

export default function PolaroidWall({ photos, texts }: PolaroidWallProps): React.ReactElement {
  const items: Array<{ url: string | undefined; caption?: string; slotId: string } & PolaroidConfig> = [];
  for (let i = 0; i < Math.min(photos.length, CONFIG.length); i++) {
    const photo = photos[i]!;
    const config = CONFIG[i]!;
    const item: { url: string | undefined; caption?: string; slotId: string } & PolaroidConfig = { url: photo.url, slotId: photo.slotId, ...config };
    if (photo.caption) item.caption = photo.caption;
    items.push(item);
  }

  return (
    <PageBg>
      <div style={{ position: "absolute", top: 40, right: 80, opacity: 0.5 }}>
        <CoffeeStain size={110} />
      </div>

      <div style={{ position: "absolute", top: 50, left: 60 }}>
        <div className="smallcaps" style={{ fontSize: 10, color: "var(--ink-faded)" }}>{texts?.eyebrow || "scraps & souvenirs"}</div>
        <h3 className="f-display" style={{ fontSize: 36, fontStyle: "italic", margin: "4px 0 0", color: "var(--ink)" }}>
          {texts?.title || "Bits of the Journey"}
        </h3>
      </div>

      {items.map((p, i) => {
        const [a, b] = TAPE_GRADIENTS[p.tapeColor];
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              top: p.top,
              left: p.left,
              right: p.right,
              width: p.width,
              transform: `rotate(${p.rotation}deg)`,
              zIndex: p.zIndex,
            }}
          >
            <div
              style={{
                background: "#f7ecd4",
                padding: "10px 10px 36px",
                boxShadow: "0 12px 28px rgba(44,31,21,.22)",
                position: "relative",
              }}
            >
              <Photo src={p.url} slotId={p.slotId} style={{ position: "relative", width: "100%", aspectRatio: "1" }} />
              {p.caption && (
                <div
                  className="f-script"
                  style={{
                    position: "absolute",
                    bottom: 8,
                    left: 0,
                    right: 0,
                    textAlign: "center",
                    fontSize: 16,
                    color: "var(--ink-soft)",
                  }}
                >
                  {p.caption}
                </div>
              )}
            </div>
            {/* Tape */}
            <div
              style={{
                position: "absolute",
                top: -10,
                left: "50%",
                marginLeft: -p.tapeWidth / 2,
                width: p.tapeWidth,
                height: 18,
                background: `linear-gradient(180deg, ${a}, ${b})`,
                transform: `rotate(${p.tapeRotate}deg)`,
                boxShadow: "0 2px 4px rgba(0,0,0,.10)",
              }}
            />
            {/* Pin */}
            <div
              style={{
                position: "absolute",
                top: -4,
                left: "50%",
                transform: "translateX(-50%)",
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#6e2a23",
                boxShadow: "0 1px 2px rgba(0,0,0,.3)",
              }}
            />
          </div>
        );
      })}

      {/* ticket */}
      <div style={{ position: "absolute", bottom: 120, left: 60, transform: "rotate(-4deg)" }}>
        <Ticket from={texts?.ticketFrom || "ATHINA"} to={texts?.ticketTo || "HYDRA"} date={texts?.ticketDate || "14·VII·74"} seat={texts?.ticketSeat || "--"} />
      </div>

      {/* stamp */}
      <div style={{ position: "absolute", bottom: 180, right: 80, transform: "rotate(8deg)" }}>
        <Stamp country={texts?.stampCountry || "MUNDO"} value={texts?.stampValue || "∞"} color="burgundy" />
      </div>

      {/* handwritten note */}
      <div style={{ position: "absolute", bottom: 50, right: 70, transform: "rotate(-2deg)", maxWidth: 220 }}>
        <p className="f-script" style={{ fontSize: 22, lineHeight: 1.3, color: "var(--ink-soft)", margin: 0 }}>
          {texts?.noteText || "all the blue you've ever heard about -- & then more."}
        </p>
      </div>

      <div style={{ position: "absolute", bottom: 220, left: 220 }}>
        <PassportStamp city={texts?.passportCity || "ATHINA"} date={texts?.passportDate || "13·VII·74"} color="teal" rotate={-18} />
      </div>

      <div style={{ position: "absolute", top: 400, left: 20, opacity: 0.5 }}>
        <Botanical size={70} rotate={30} />
      </div>

      <div className="page-num" style={{ left: "50%", transform: "translateX(-50%)" }}>
        {texts?.pageNumber || "-- 38 --"}
      </div>
    </PageBg>
  );
}
