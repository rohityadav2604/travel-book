"use client";

import { useCallback, useEffect, useState } from "react";
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
  }>;
};

export default function BookPage(): React.ReactElement {
  const params = useParams();
  const bookId = params.id as string;

  const [book, setBook] = useState<BookData | null>(null);
  const [currentSpread, setCurrentSpread] = useState(0);
  const [isTurning, setIsTurning] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [exportUrls, setExportUrls] = useState<{ printUrl: string | null; screenUrl: string | null } | null>(null);

  useEffect(() => {
    if (!bookId) return;
    fetch(`/api/books/${bookId}`)
      .then((r) => r.json())
      .then((data) => setBook(data.book));
  }, [bookId]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const goNext = useCallback(() => {
    if (!book?.placementJson) return;
    setIsTurning(true);
    setTimeout(() => {
      setCurrentSpread((i) => Math.min(i + 1, book.placementJson!.length - 1));
      setIsTurning(false);
    }, 200);
  }, [book]);

  const goPrev = useCallback(() => {
    setIsTurning(true);
    setTimeout(() => {
      setCurrentSpread((i) => Math.max(i - 1, 0));
      setIsTurning(false);
    }, 200);
  }, []);

  const downloadExport = useCallback(async () => {
    const res = await fetch(`/api/books/${bookId}/export`);
    const data = await res.json();
    setExportUrls(data);
  }, [bookId]);

  if (!book) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-paper">
        <p className="font-serif text-xl text-ink-faded">Loading your book...</p>
      </main>
    );
  }

  if (book.status === "placing") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-paper">
        <p className="font-serif text-xl text-ink-faded">Arranging your photos...</p>
      </main>
    );
  }

  const spreads = book.placementJson ?? [];
  const spread = spreads[currentSpread];

  const photoMap = new Map(book.photos.map((p) => [p.id, p]));

  const slots: Record<string, string | undefined> = {};
  if (spread) {
    for (const a of spread.assignments) {
      const photo = photoMap.get(a.photoId);
      if (photo) {
        slots[a.slotId] = imageUrl("public", photo.thumbnailKey);
      }
    }
  }

  return (
    <main className="flex min-h-screen flex-col bg-paper">
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-ink/10 px-6 py-3">
        <p className="font-mono text-xs uppercase tracking-wider text-ink-faded">
          {book.title || "Untitled Travel Book"}
        </p>
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-ink-faded">
            {currentSpread + 1} / {spreads.length}
          </span>
          <button
            onClick={() => setExportOpen(true)}
            className="rounded border border-terracotta-deep bg-terracotta-deep px-4 py-2 font-sans text-xs uppercase tracking-wider text-paper"
          >
            Download
          </button>
        </div>
      </div>

      {/* Book viewer */}
      <div className="flex flex-1 items-center justify-center p-8" style={{ perspective: 1200 }}>
        <div
          className="relative overflow-hidden rounded shadow-paper transition-transform duration-300"
          style={{
            width: 800,
            height: 560,
            transform: isTurning ? "rotateY(-8deg)" : "rotateY(0)",
            transformStyle: "preserve-3d",
          }}
        >
          {spread ? (
            <SpreadComposer
              templateName={
                spread.templateName ??
                (spread.spreadId === "cover"
                  ? "Cover"
                  : spread.spreadId.startsWith("spread-")
                    ? parseInt(spread.spreadId.replace("spread-", ""), 10) % 2 !== 0
                      ? "GrandVista"
                      : "JournalPage"
                    : "GrandVista")
              }
              slots={slots}
              captions={undefined}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <p className="font-serif text-xl text-ink-faded">No spreads yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-6 py-4">
        <button
          onClick={goPrev}
          disabled={currentSpread === 0}
          className="rounded-full border border-ink-faded p-2 text-ink-faded transition-colors hover:border-ink hover:text-ink disabled:opacity-30"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={goNext}
          disabled={currentSpread >= spreads.length - 1}
          className="rounded-full border border-ink-faded p-2 text-ink-faded transition-colors hover:border-ink hover:text-ink disabled:opacity-30"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Thumbnail strip */}
      <div className="flex gap-2 overflow-x-auto border-t border-ink/10 px-6 py-3">
        {spreads.map((s, i) => (
          <button
            key={s.spreadId}
            onClick={() => setCurrentSpread(i)}
            className={`flex-shrink-0 rounded border px-3 py-2 font-mono text-[10px] uppercase tracking-wider ${
              i === currentSpread
                ? "border-terracotta bg-terracotta text-paper"
                : "border-ink-faded/20 text-ink-faded"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Export modal */}
      {exportOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50">
          <div className="w-full max-w-md rounded bg-paper p-6 shadow-paper">
            <h2 className="font-display text-2xl text-ink">Download your book</h2>
            <div className="mt-4 space-y-3">
              {exportUrls?.printUrl ? (
                <a
                  href={exportUrls.printUrl}
                  download
                  className="block rounded border border-terracotta-deep bg-terracotta-deep px-4 py-3 text-center font-sans text-sm uppercase tracking-wider text-paper"
                >
                  Download Print PDF
                </a>
              ) : (
                <button
                  onClick={downloadExport}
                  className="block w-full rounded border border-ink-faded px-4 py-3 text-center font-sans text-sm uppercase tracking-wider text-ink-soft"
                >
                  Check for exports
                </button>
              )}
              {exportUrls?.screenUrl && (
                <a
                  href={exportUrls.screenUrl}
                  download
                  className="block rounded border border-ink-faded px-4 py-3 text-center font-sans text-sm uppercase tracking-wider text-ink-soft"
                >
                  Download Screen PDF
                </a>
              )}
            </div>
            <button
              onClick={() => setExportOpen(false)}
              className="mt-4 w-full rounded border border-ink-faded/30 py-2 font-sans text-xs uppercase tracking-wider text-ink-faded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
