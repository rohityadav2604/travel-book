import React from "react";
import { AdjustableImg } from "../components/PageShell";

const defaultTitle = "The Road Behind & Ahead";

const defaultBody =
  "Every journey leaves marks that maps cannot capture. The laughter shared over a missed train, the silence of a sunrise that no camera could hold, the strangers who became friends before a single name was exchanged.\n\n" +
  "This book is a tribute to those fragments — the moments between the plans, the beauty between the borders, the stories that unfolded when we let the world lead the way.\n\n" +
  "Wherever the next path begins, these pages will remind us that the best part of travel is not the destination, but the company we keep along the way.";

export default function StorySpread({
  accentUrl,
  accentSlotId,
  title,
  body,
  author,
  date,
}: {
  accentUrl?: string | undefined;
  accentSlotId?: string;
  title?: string | undefined;
  body?: string | undefined;
  author?: string | undefined;
  date?: string | undefined;
}): React.ReactElement {
  const storyTitle = title || defaultTitle;
  const storyBody = body || defaultBody;
  // Explicit dark ink that reads well on both Highland (#ecebe2) and Wanderbound (#f3e7d1) paper
  const ink = "#2c1f15";
  const inkSoft = "#4a3526";

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Subtle ruled-paper lines */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.06,
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 31px, ${inkSoft} 32px)`,
        }}
      />

      <div className="absolute inset-0 flex flex-col justify-center px-10 py-12">
        {/* Decorative quotation mark */}
        <div
          style={{
            fontFamily: "'Fraunces', 'DM Serif Display', Georgia, serif",
            fontSize: 72,
            lineHeight: 1,
            color: ink,
            opacity: 0.12,
            marginBottom: -24,
          }}
        >
          &ldquo;
        </div>

        <h2
          style={{
            fontFamily: "'Fraunces', 'DM Serif Display', Georgia, serif",
            fontSize: 22,
            fontWeight: 300,
            fontStyle: "italic",
            lineHeight: 1.3,
            color: ink,
            marginBottom: 16,
            opacity: 0.9,
          }}
        >
          {storyTitle}
        </h2>

        <div className="flex gap-6">
          <div className="flex-1">
            <p
              style={{
                fontFamily: "'Source Serif 4', 'Cormorant Garamond', Georgia, serif",
                fontSize: 14,
                lineHeight: 1.7,
                color: ink,
                opacity: 0.75,
                whiteSpace: "pre-wrap",
              }}
            >
              {storyBody}
            </p>

            {(author || date) && (
              <div
                className="mt-6"
                style={{
                  fontFamily: "'Inter Tight', 'Helvetica Neue', system-ui, sans-serif",
                  fontSize: 10,
                  letterSpacing: ".2em",
                  textTransform: "uppercase",
                  color: ink,
                  opacity: 0.45,
                }}
              >
                {author && <span>{author}</span>}
                {author && date && <span style={{ margin: "0 8px", opacity: 0.4 }}>|</span>}
                {date && <span>{date}</span>}
              </div>
            )}
          </div>

          {accentUrl && (
            <div
              className="relative flex-shrink-0 overflow-hidden rounded-sm"
              style={{
                width: 160,
                height: 220,
                boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
              }}
            >
              <AdjustableImg
                src={accentUrl}
                slotId={accentSlotId}
                className="h-full w-full"
                imgStyle={{ filter: "saturate(.85) contrast(.95) sepia(.12) brightness(.98)" }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
