"use client";

import React from "react";

export type BookCardProps = {
  id: string;
  title: string | null;
  theme: string;
  status: string;
  createdAt: string;
};

export default function BookCard({ id, title, theme, status, createdAt }: BookCardProps): React.ReactElement {
  const themeColors: Record<string, string> = {
    wanderbound: "#c89441",
    highland: "#4f5028",
    bangkok: "#d9a441",
    paris: "#a33a35",
    spain: "#cf4b2c",
  };

  const themeColor = themeColors[theme] ?? "#c89441";
  const dateStr = new Date(createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <a
      href={`/book/${id}`}
      className="group relative block overflow-hidden rounded-lg border border-ink-faded/15 transition-all duration-500 hover:border-terracotta-deep/40 hover:shadow-[0_12px_40px_rgba(44,31,21,0.15)]"
      style={{ background: "rgba(243,231,209,.4)" }}
    >
      {/* Book spine visual */}
      <div className="relative flex flex-col">
        <div
          className="relative h-32 w-full overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${themeColor}22, ${themeColor}44)` }}
        >
          {/* Decorative texture overlay */}
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          {/* Corner ornament */}
          <svg className="absolute right-3 top-3 opacity-30" width="24" height="24" viewBox="0 0 24 24">
            <path d="M4 4 L 20 4 M 4 4 L 4 20" stroke={themeColor} strokeWidth="1" fill="none" />
            <circle cx="4" cy="4" r="2" fill={themeColor} />
          </svg>
          <svg className="absolute bottom-3 left-3 opacity-30" width="24" height="24" viewBox="0 0 24 24">
            <path d="M20 20 L 4 20 M 20 20 L 20 4" stroke={themeColor} strokeWidth="1" fill="none" />
            <circle cx="20" cy="20" r="2" fill={themeColor} />
          </svg>
          {/* Status badge */}
          <div className="absolute left-3 top-3">
            <span
              className="inline-block rounded px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest"
              style={{
                background: status === "ready" ? "rgba(122,132,66,.2)" : "rgba(185,83,46,.15)",
                color: status === "ready" ? "#4f5028" : "#8b3a1e",
              }}
            >
              {status}
            </span>
          </div>
        </div>

        {/* Book info */}
        <div className="p-4">
          <h3 className="font-display text-xl italic leading-tight text-ink transition-colors group-hover:text-terracotta-deep">
            {title || "Untitled Travel Book"}
          </h3>
          <div className="mt-2 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-wider text-ink-faded">
              {theme}
            </span>
            <span className="font-mono text-[10px] text-ink-faded/60">{dateStr}</span>
          </div>
        </div>
      </div>

      {/* Hover line accent */}
      <div
        className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-500 group-hover:w-full"
        style={{ background: themeColor }}
      />
    </a>
  );
}
