"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import SpreadComposer from "@memorybook/templates/SpreadComposer";
import { imageUrl } from "@/lib/imageUrl";

export type BookData = {
  id: string;
  title: string | null;
  status: string;
  placementJson: Array<{
    spreadId: string;
    templateName: string;
    assignments: Array<{ slotId: string; photoId: string }>;
  }> | null;
  photos: Array<{
    id: string;
    storageKey: string;
    thumbnailKey: string | null;
    width: number | null;
    height: number | null;
    displayOrder: number;
    caption: string | null;
    filename: string;
  }>;
};

function ScaledPage({ children }: { children: React.ReactNode }): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth;
      setScale(w / 600);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative h-full w-full overflow-hidden">
      <div
        className="absolute"
        style={{
          width: 600,
          height: 600,
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default function BookPage(): React.ReactElement {
  const params = useParams();
  const bookId = params.id as string;

  const [book, setBook] = useState<BookData | null>(null);
  const [idx, setIdx] = useState(0);
  const [flipping, setFlipping] = useState<"next" | "prev" | null>(null);
  const [exportOpen, setExportOpen] = useState(false);
  const [exportUrls, setExportUrls] = useState<{ printUrl: string | null; screenUrl: string | null } | null>(null);

  useEffect(() => {
    if (!bookId) return;
    fetch(`/api/books/${bookId}`)
      .then((r) => r.json())
      .then((data) => setBook(data.book));
  }, [bookId]);

  const goto = useCallback(
    (next: number) => {
      if (flipping) return;
      const spreads = book?.placementJson ?? [];
      if (next < 0 || next >= spreads.length) return;
      setFlipping(next > idx ? "next" : "prev");
      setTimeout(() => {
        setIdx(next);
        setTimeout(() => setFlipping(null), 50);
      }, 520);
    },
    [book, flipping, idx]
  );

  const next = useCallback(() => goto(idx + 1), [goto, idx]);
  const prev = useCallback(() => goto(idx - 1), [goto, idx]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const downloadExport = useCallback(async () => {
    const res = await fetch(`/api/books/${bookId}/export`);
    const data = await res.json();
    setExportUrls(data);
  }, [bookId]);

  if (!book) {
    return (
      <div className="app-root flex min-h-screen items-center justify-center">
        <p className="f-serif text-xl" style={{ color: "rgba(243,231,209,.6)" }}>
          Loading your book...
        </p>
      </div>
    );
  }

  if (book.status === "placing") {
    return (
      <div className="app-root flex min-h-screen items-center justify-center">
        <p className="f-serif text-xl" style={{ color: "rgba(243,231,209,.6)" }}>
          Arranging your photos...
        </p>
      </div>
    );
  }

  const spreads = book.placementJson ?? [];
  const current = spreads[idx];

  const photoMap = new Map(book.photos.map((p) => [p.id, p]));

  const slots: Record<string, string | undefined> = {};
  const captions: Record<string, string> = {};
  if (current) {
    for (const a of current.assignments) {
      const photo = photoMap.get(a.photoId);
      if (photo) {
        slots[a.slotId] = imageUrl("public", photo.thumbnailKey);
        if (photo.caption) {
          captions[a.slotId] = photo.caption;
        }
      }
    }
  }

  const currentTemplate =
    current?.templateName ??
    (current?.spreadId === "cover"
      ? "Cover"
      : current?.spreadId.startsWith("spread-")
        ? parseInt(current.spreadId.replace("spread-", ""), 10) % 2 !== 0
          ? "GrandVista"
          : "JournalPage"
        : "GrandVista");

  const targetIdx = flipping === "next" ? idx + 1 : flipping === "prev" ? idx - 1 : idx;
  const target = spreads[targetIdx] ?? current;
  const flipPage = flipping === "next" ? current : flipping === "prev" ? spreads[idx - 1] : null;

  const targetTemplate =
    target?.templateName ??
    (target?.spreadId === "cover"
      ? "Cover"
      : target?.spreadId.startsWith("spread-")
        ? parseInt(target.spreadId.replace("spread-", ""), 10) % 2 !== 0
          ? "GrandVista"
          : "JournalPage"
        : "GrandVista");

  const flipTemplate =
    flipPage?.templateName ??
    (flipPage?.spreadId === "cover"
      ? "Cover"
      : flipPage?.spreadId.startsWith("spread-")
        ? parseInt(flipPage.spreadId.replace("spread-", ""), 10) % 2 !== 0
          ? "GrandVista"
          : "JournalPage"
        : "GrandVista");

  const buildSpreadData = (spread: (typeof spreads)[number] | undefined) => {
    const s: Record<string, string | undefined> = {};
    const c: Record<string, string> = {};
    if (!spread) return { slots: s, captions: c };
    for (const a of spread.assignments) {
      const photo = photoMap.get(a.photoId);
      if (photo) {
        s[a.slotId] = imageUrl("public", photo.thumbnailKey);
        if (photo.caption) {
          c[a.slotId] = photo.caption;
        }
      }
    }
    return { slots: s, captions: c };
  };

  const { slots: targetSlots, captions: targetCaptions } = buildSpreadData(target);
  const { slots: flipSlots, captions: flipCaptions } = buildSpreadData(flipPage ?? undefined);

  const templateLabel = (t: string) => {
    const labels: Record<string, string> = {
      Cover: "01 · Cover",
      InsideFront: "02 · Inside Front",
      ChapterDivider: "03 · Chapter Title",
      GrandVista: "04 · Full-Bleed Hero",
      JournalPage: "05 · Photo + Journal",
      PolaroidWall: "06 · Polaroid Collage",
      GoldenHour: "07 · Golden Hour",
      ContactSheet: "08 · Contact Sheet",
      MapPage: "09 · Map Page",
      QuotePage: "10 · Quote",
      Ephemera: "11 · Tickets & Ephemera",
      InsideBack: "12 · Inside Back",
      BackCover: "13 · Back Cover",
    };
    return labels[t] ?? t;
  };

  return (
    <div className="app-root flex min-h-screen flex-col">
      {/* Top bar */}
      <header className="topbar">
        <div className="topbar-title">
          <span className="f-display" style={{ fontStyle: "italic", fontSize: 22 }}>
            Wanderbound
          </span>
          <span className="topbar-sub">— {book.title || "Untitled Travel Book"} —</span>
        </div>
        <div className="topbar-meta">
          <span className="f-mono">
            {String(idx + 1).padStart(2, "0")}
            <span style={{ opacity: 0.4 }}> / {spreads.length}</span>
          </span>
        </div>
      </header>

      {/* Stage */}
      <main className="stage">
        {/* Dot strip */}
        <div className="strip">
          {spreads.map((s, i) => (
            <button
              key={s.spreadId}
              className={`strip-dot ${i === idx ? "active" : ""}`}
              onClick={() => goto(i)}
              title={`Spread ${i + 1}`}
            >
              <span className="strip-num">{String(i + 1).padStart(2, "0")}</span>
            </button>
          ))}
        </div>

        {/* Book wrap */}
        <div className="book-wrap">
          <button className="nav-btn nav-prev" onClick={prev} disabled={idx === 0} aria-label="Previous page">
            <svg width="28" height="28" viewBox="0 0 28 28">
              <path d="M18 6 L 10 14 L 18 22" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>

          {/* The book */}
          <div className="book">
            {/* Binding shadows */}
            <div className="book-binding-l" />
            <div className="book-binding-r" />

            <div className="page-stack">
              {/* Underneath = target page */}
              <div className="page-under">
                <div className="page-frame">
                  <ScaledPage>
                    <SpreadComposer templateName={targetTemplate} slots={targetSlots} captions={targetCaptions} />
                  </ScaledPage>
                </div>
              </div>

              {/* On top = current page that flips away */}
              {flipping && flipPage && (
                <div className={`page-flipper ${flipping}`}>
                  <div className="page-flipper-front">
                    <div className="page-frame">
                      <ScaledPage>
                        <SpreadComposer templateName={flipTemplate} slots={flipSlots} captions={flipCaptions} />
                      </ScaledPage>
                    </div>
                  </div>
                  <div className="page-flipper-back" />
                </div>
              )}

              {/* Normal: show current page */}
              {!flipping && current && (
                <div className="page-current">
                  <div className="page-frame">
                    <ScaledPage>
                        <SpreadComposer templateName={currentTemplate} slots={slots} captions={captions} />
                    </ScaledPage>
                  </div>
                </div>
              )}
            </div>
          </div>

          <button className="nav-btn nav-next" onClick={next} disabled={idx === spreads.length - 1} aria-label="Next page">
            <svg width="28" height="28" viewBox="0 0 28 28">
              <path d="M10 6 L 18 14 L 10 22" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>

        {/* Template name */}
        <div className="template-name">
          <span className="smallcaps">{templateLabel(currentTemplate)}</span>
        </div>
      </main>

      {/* Keyboard hint */}
      <div className="hint">← → arrow keys to turn pages</div>

      {/* Download button - floating */}
      <button
        onClick={() => setExportOpen(true)}
        className="fixed right-6 top-1/2 z-40 -translate-y-1/2 rounded-full border px-4 py-3 f-mono text-[10px] uppercase tracking-widest transition-all hover:scale-105"
        style={{
          borderColor: "rgba(243,231,209,.25)",
          color: "rgba(243,231,209,.7)",
          background: "rgba(243,231,209,.06)",
          writingMode: "vertical-rl",
          textOrientation: "mixed",
        }}
      >
        Download
      </button>

      {/* Export modal */}
      {exportOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(12,8,5,.65)" }}>
          <div className="w-full max-w-md rounded p-6" style={{ background: "#f3e7d1", boxShadow: "0 30px 60px rgba(0,0,0,.5)" }}>
            <h2 className="f-display text-2xl italic" style={{ color: "#2c1f15" }}>
              Download your book
            </h2>
            <div className="mt-4 space-y-3">
              {exportUrls?.printUrl ? (
                <a
                  href={exportUrls.printUrl}
                  download
                  className="block rounded px-4 py-3 text-center f-sans text-sm uppercase tracking-wider text-paper"
                  style={{ background: "#8b3a1e" }}
                >
                  Download Print PDF
                </a>
              ) : (
                <button
                  onClick={downloadExport}
                  className="block w-full rounded border px-4 py-3 text-center f-sans text-sm uppercase tracking-wider"
                  style={{ borderColor: "#6b4f3a", color: "#4a3526" }}
                >
                  Check for exports
                </button>
              )}
              {exportUrls?.screenUrl && (
                <a
                  href={exportUrls.screenUrl}
                  download
                  className="block rounded border px-4 py-3 text-center f-sans text-sm uppercase tracking-wider"
                  style={{ borderColor: "#6b4f3a", color: "#4a3526" }}
                >
                  Download Screen PDF
                </a>
              )}
            </div>
            <button
              onClick={() => setExportOpen(false)}
              className="mt-4 w-full rounded border py-2 f-sans text-xs uppercase tracking-wider"
              style={{ borderColor: "rgba(107,79,58,.3)", color: "#6b4f3a" }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
