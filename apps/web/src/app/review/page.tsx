"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ThumbnailStrip from "@/components/ThumbnailStrip";
import type { PhotoItem } from "@/components/ThumbnailStrip";

export default function ReviewPage(): React.ReactElement {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session");

  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchPhotos = useCallback(async () => {
    if (!sessionId) {
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(`/api/sessions/${sessionId}/photos`);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await res.json();
      setPhotos(data.photos);
    } catch {
      // Keep existing photos on polling error; just stop loading on first failure
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  useEffect(() => {
    void fetchPhotos();
    const interval = setInterval(fetchPhotos, 3000);
    return () => clearInterval(interval);
  }, [fetchPhotos]);

  const handleReorder = useCallback(
    async (reordered: PhotoItem[]) => {
      setPhotos(reordered);
      if (!sessionId) return;
      await fetch(`/api/sessions/${sessionId}/order`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: reordered.map((p) => p.id) }),
      });
    },
    [sessionId],
  );

  const handleTogglePin = useCallback(
    async (id: string) => {
      const photo = photos.find((p) => p.id === id);
      if (!photo || !sessionId) return;
      const newPinned = !photo.pinned;
      setPhotos((prev) => prev.map((p) => (p.id === id ? { ...p, pinned: newPinned } : p)));
      await fetch(`/api/sessions/${sessionId}/photos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pinned: newPinned }),
      });
    },
    [photos, sessionId],
  );

  const handleToggleExclude = useCallback(
    async (id: string) => {
      const photo = photos.find((p) => p.id === id);
      if (!photo || !sessionId) return;
      const newExcluded = !photo.excluded;
      setPhotos((prev) => prev.map((p) => (p.id === id ? { ...p, excluded: newExcluded } : p)));
      await fetch(`/api/sessions/${sessionId}/photos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ excluded: newExcluded }),
      });
    },
    [photos, sessionId],
  );

  const includedCount = photos.filter((p) => !p.excluded).length;
  const canCreate = includedCount >= 5 && includedCount <= 50;

  const createBook = useCallback(async () => {
    if (!sessionId || !canCreate) return;
    setSaving(true);
    const res = await fetch("/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId }),
    });
    const data = await res.json();
    if (data.bookId) {
      router.push(`/book/${data.bookId}`);
    } else {
      setSaving(false);
    }
  }, [sessionId, canCreate, router]);

  if (loading) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-5xl items-center justify-center px-6">
        <p className="font-serif text-xl text-ink-faded">Loading photos...</p>
      </main>
    );
  }

  if (!sessionId) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-5xl items-center justify-center px-6">
        <p className="font-serif text-xl text-burgundy">No session found. Please start from the upload page.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 py-16">
      <section className="w-full">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-terracotta-deep">
          Step 2 of 3
        </p>
        <h1 className="mt-4 font-display text-5xl leading-tight text-ink md:text-6xl">
          Review &amp; reorder
        </h1>
        <p className="mt-4 font-serif text-xl text-ink-soft">
          Drag to reorder. Pin must-have photos. Exclude any you do not want.
        </p>
      </section>

      <section className="mt-10 w-full">
        <div className="mb-4 flex items-center justify-between">
          <p className="font-mono text-xs uppercase tracking-wider text-ink-faded">
            {includedCount} of {photos.length} photos selected
          </p>
          {!canCreate && (
            <p className="font-sans text-sm text-burgundy">
              {includedCount < 5
                ? `Add ${5 - includedCount} more or unexclude photos`
                : `Exclude ${includedCount - 50} photos`}
            </p>
          )}
        </div>

        <ThumbnailStrip
          photos={photos}
          onReorder={handleReorder}
          onTogglePin={handleTogglePin}
          onToggleExclude={handleToggleExclude}
        />
      </section>

      <div className="mt-10">
        <button
          onClick={createBook}
          disabled={!canCreate || saving}
          className={`
            rounded px-8 py-4 font-sans text-sm uppercase tracking-[0.2em] transition-colors
            ${
              canCreate && !saving
                ? "border border-terracotta-deep bg-terracotta-deep text-paper hover:bg-terracotta"
                : "cursor-not-allowed border border-ink-faded bg-paper-2 text-ink-faded"
            }
          `}
        >
          {saving ? "Creating your book..." : `Create My Book (${includedCount})`}
        </button>
      </div>
    </main>
  );
}
