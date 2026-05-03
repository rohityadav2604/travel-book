import React from "react";
import { colorTokens } from "../tokens";

export function Tape({ className }: { className?: string }): React.ReactElement {
  return (
    <div
      className={`pointer-events-none absolute opacity-70 ${className ?? ""}`}
      style={{
        width: 60,
        height: 18,
        background: "rgba(227, 207, 163, 0.85)",
        transform: "rotate(-12deg)",
        boxShadow: "0 1px 2px rgba(44,31,21,0.15)",
      }}
    />
  );
}

export function Stamp({
  text,
  className,
}: {
  text: string;
  className?: string;
}): React.ReactElement {
  return (
    <div
      className={`pointer-events-none flex items-center justify-center rounded-sm border-2 border-dashed border-terracotta/60 px-3 py-1 ${className ?? ""}`}
    >
      <span className="font-mono text-[10px] uppercase tracking-widest text-terracotta/80">
        {text}
      </span>
    </div>
  );
}

export function PassportStamp({
  city,
  date,
  className,
}: {
  city: string;
  date: string;
  className?: string;
}): React.ReactElement {
  return (
    <div
      className={`pointer-events-none flex flex-col items-center justify-center rounded-full border-2 border-double border-ink/30 px-4 py-3 ${className ?? ""}`}
    >
      <span className="font-mono text-[9px] uppercase tracking-wider text-ink/60">{city}</span>
      <span className="font-mono text-[8px] text-ink/40">{date}</span>
    </div>
  );
}

export function Flourish({ className }: { className?: string }): React.ReactElement {
  return (
    <svg
      className={`pointer-events-none ${className ?? ""}`}
      viewBox="0 0 100 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 10 Q25 0 50 10 T100 10"
        stroke={colorTokens.ochre}
        strokeWidth="0.5"
        fill="none"
        opacity="0.5"
      />
    </svg>
  );
}

export function Vignette({ className }: { className?: string }): React.ReactElement {
  return (
    <div
      className={`pointer-events-none absolute inset-0 ${className ?? ""}`}
      style={{
        background:
          "radial-gradient(ellipse at center, transparent 40%, rgba(44,31,21,0.25) 100%)",
      }}
    />
  );
}

export function PaperGrain({ className }: { className?: string }): React.ReactElement {
  return (
    <div
      className={`pointer-events-none absolute inset-0 opacity-[0.06] ${className ?? ""}`}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundSize: "200px 200px",
      }}
    />
  );
}

export function CoffeeStain({ className }: { className?: string }): React.ReactElement {
  return (
    <div
      className={`pointer-events-none absolute rounded-full opacity-10 ${className ?? ""}`}
      style={{
        width: 80,
        height: 80,
        background: "radial-gradient(circle, #6e2a23 0%, transparent 70%)",
        filter: "blur(2px)",
      }}
    />
  );
}

export function Ticket({
  text,
  className,
}: {
  text: string;
  className?: string;
}): React.ReactElement {
  return (
    <div
      className={`pointer-events-none flex items-center justify-center ${className ?? ""}`}
      style={{
        padding: "4px 10px",
        background: colorTokens.paper,
        border: `1px dashed ${colorTokens["ink-faded"]}`,
        transform: "rotate(-3deg)",
      }}
    >
      <span className="font-mono text-[9px] uppercase tracking-wider text-ink-faded">{text}</span>
    </div>
  );
}
