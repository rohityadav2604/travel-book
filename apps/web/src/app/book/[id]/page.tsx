"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getTemplateTextFields, resolveTemplateTextValue } from "@memorybook/templates";
import SpreadComposer from "@memorybook/templates/SpreadComposer";
import type { PhotoAdjustment } from "@memorybook/templates";
import { imageUrl } from "@/lib/imageUrl";

type PhotoItem = {
  id: string;
  storageKey: string;
  thumbnailKey: string | null;
  width: number | null;
  height: number | null;
  displayOrder: number;
  caption: string | null;
  filename: string;
};

type SpreadData = {
  spreadId: string;
  templateName: string;
  assignments: Array<{ slotId: string; photoId: string; adjustments?: PhotoAdjustment }>;
  slots?: Array<{ id: string; aspectRatioRange: { min: number; max: number }; sizeWeight: number }>;
  texts?: Record<string, string>;
};

export type BookData = {
  id: string;
  sessionId: string;
  title: string | null;
  theme: string;
  status: string;
  placementJson: SpreadData[] | null;
  photos: PhotoItem[];
};

type SelectedSlot = {
  spreadIndex: number;
  slotId: string;
};

type UsedPhotoLocation = SelectedSlot & {
  spreadLabel: string;
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

/* ------------------------------------------------------------------ */
/*  Slide gesture overlay (drag to pan, wheel to zoom)                 */
/* ------------------------------------------------------------------ */

function SlideGestureOverlay({
  selectedSlotId,
  onAdjust,
}: {
  selectedSlotId: string;
  onAdjust: (delta: Partial<PhotoAdjustment>) => void;
}): React.ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    dragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    const container = containerRef.current;
    if (!container) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    lastPos.current = { x: e.clientX, y: e.clientY };

    const rect = container.getBoundingClientRect();
    const pctX = (dx / rect.width) * 100;
    const pctY = (dy / rect.height) * 100;

    onAdjust({ offsetX: pctX, offsetY: pctY });
  }, [onAdjust]);

  const handlePointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY * -0.001;
    onAdjust({ zoom: delta });
  }, [onAdjust]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-10 cursor-move"
      style={{ touchAction: "none" }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onWheel={handleWheel}
      title={`Drag to pan · Scroll to zoom · Selected: ${selectedSlotId}`}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Adjustment controls                                                */
/* ------------------------------------------------------------------ */

function AdjustmentControls({
  adjustments,
  onChange,
}: {
  adjustments?: PhotoAdjustment | undefined;
  onChange: (delta: Partial<PhotoAdjustment>) => void;
}): React.ReactElement {
  const zoom = adjustments?.zoom ?? 1;
  const rotation = adjustments?.rotation ?? 0;

  return (
    <div className="mt-3 space-y-3">
      <div>
        <div className="flex items-center justify-between">
          <label className="font-mono text-[9px] uppercase tracking-wider text-ink-faded/70">Zoom</label>
          <span className="font-mono text-[9px] text-ink-faded/60">{zoom.toFixed(2)}×</span>
        </div>
        <input
          type="range"
          min={0.5}
          max={3}
          step={0.05}
          value={zoom}
          onChange={(e) => onChange({ zoom: parseFloat(e.target.value) - zoom })}
          className="mt-1 w-full accent-terracotta-deep"
        />
      </div>
      <div>
        <div className="flex items-center justify-between">
          <label className="font-mono text-[9px] uppercase tracking-wider text-ink-faded/70">Rotation</label>
          <span className="font-mono text-[9px] text-ink-faded/60">{Math.round(rotation)}°</span>
        </div>
        <input
          type="range"
          min={-180}
          max={180}
          step={1}
          value={rotation}
          onChange={(e) => onChange({ rotation: parseFloat(e.target.value) })}
          className="mt-1 w-full accent-terracotta-deep"
        />
      </div>
      <button
        onClick={() =>
          onChange({
            offsetX: -(adjustments?.offsetX ?? 0),
            offsetY: -(adjustments?.offsetY ?? 0),
            zoom: 1 - zoom,
            rotation: 0,
          })
        }
        className="rounded border border-ink-faded/20 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-ink-faded transition-colors hover:border-terracotta-deep hover:text-terracotta-deep"
      >
        Reset
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Edit sidebar                                                       */
/* ------------------------------------------------------------------ */

function EditSidebar({
  book,
  currentIdx,
  selectedSlot,
  onSelectSlot,
  onSwap,
  onReplaceSlotPhoto,
  onUpdateText,
  onUpdateCaption,
  onAdjust,
  onSave,
  onDiscard,
  saving,
  hasChanges,
  onClose,
}: {
  book: BookData;
  currentIdx: number;
  selectedSlot: SelectedSlot | null;
  onSelectSlot: (spreadIndex: number, slotId: string) => void;
  onSwap: (from: SelectedSlot, to: SelectedSlot) => void;
  onReplaceSlotPhoto: (target: SelectedSlot, photoId: string) => void;
  onUpdateText: (spreadIndex: number, key: string, value: string) => void;
  onUpdateCaption: (photoId: string, caption: string) => void;
  onAdjust: (spreadIndex: number, slotId: string, delta: Partial<PhotoAdjustment>) => void;
  onSave: () => void;
  onDiscard: () => void;
  saving: boolean;
  hasChanges: boolean;
  onClose: () => void;
}): React.ReactElement {
  const spreads = book.placementJson ?? [];
  const currentSpread = spreads[currentIdx];
  const photoMap = useMemo(() => new Map(book.photos.map((p) => [p.id, p])), [book.photos]);

  const slotList = useMemo(() => {
    if (!currentSpread) return [];
    const ids = new Set<string>();
    for (const slot of currentSpread.slots ?? []) {
      ids.add(slot.id);
    }
    for (const assignment of currentSpread.assignments) {
      ids.add(assignment.slotId);
    }
    return Array.from(ids).map((id) => ({ id }));
  }, [currentSpread]);

  const photoUsage = useMemo(() => {
    const usage = new Map<string, UsedPhotoLocation>();
    spreads.forEach((spread, spreadIndex) => {
      spread.assignments.forEach((assignment) => {
        if (!usage.has(assignment.photoId)) {
          usage.set(assignment.photoId, {
            spreadIndex,
            slotId: assignment.slotId,
            spreadLabel: `Page ${String(spreadIndex + 1).padStart(2, "0")}`,
          });
        }
      });
    });
    return usage;
  }, [spreads]);

  const selectedPhotoId = useMemo(() => {
    if (!selectedSlot) return null;
    const spread = spreads[selectedSlot.spreadIndex];
    if (!spread) return null;
    const a = spread.assignments.find((x) => x.slotId === selectedSlot.slotId);
    return a?.photoId ?? null;
  }, [selectedSlot, spreads]);

  const selectedPhoto = selectedPhotoId ? photoMap.get(selectedPhotoId) : undefined;
  const editableTextFields = useMemo(
    () =>
      getTemplateTextFields(
        currentSpread?.templateName ?? "",
        slotList.map((slot) => slot.id),
        currentSpread?.texts,
      ),
    [currentSpread?.templateName, currentSpread?.texts, slotList],
  );

  const isSlotSelected = (slotId: string) =>
    selectedSlot?.spreadIndex === currentIdx && selectedSlot?.slotId === slotId;
  const selectedSlotLabel = selectedSlot
    ? `Page ${String(selectedSlot.spreadIndex + 1).padStart(2, "0")} / ${selectedSlot.slotId}`
    : "Choose a slot first";

  return (
    <div className="flex min-h-0 w-96 flex-col self-stretch overflow-hidden border-l border-ink-faded/15 text-ink shadow-[-8px_0_24px_rgba(0,0,0,0.08)]" style={{ background: "#f3e7d1" }}>
      <div className="flex flex-none items-center justify-between border-b border-ink-faded/10 px-5 py-4">
        <div>
          <h3 className="font-display text-lg italic text-ink">Editor&apos;s Desk</h3>
          <p className="mt-0.5 font-mono text-[9px] uppercase tracking-widest text-ink-faded">
            Page {String(currentIdx + 1).padStart(2, "0")}
          </p>
        </div>
        <button onClick={onClose} className="rounded p-1 text-ink-faded transition-colors hover:bg-ink-faded/10 hover:text-ink" aria-label="Close editor">
          <svg width="18" height="18" viewBox="0 0 18 18" stroke="currentColor" strokeWidth="1.5" fill="none">
            <path d="M4 4 L 14 14 M 14 4 L 4 14" />
          </svg>
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
        <section>
          <div className="flex items-end justify-between gap-3">
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-ink-faded">Photos on this page</h4>
            <span className="font-mono text-[9px] uppercase tracking-wider text-terracotta-deep">{selectedSlotLabel}</span>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {slotList.map((slot) => {
              const assignment = currentSpread?.assignments.find((a) => a.slotId === slot.id);
              const photo = assignment ? photoMap.get(assignment.photoId) : undefined;
              const url = photo ? imageUrl("public", photo.thumbnailKey) : undefined;
              const active = isSlotSelected(slot.id);

              return (
                <button
                  key={slot.id}
                  onClick={() => {
                    if (selectedSlot && (selectedSlot.spreadIndex !== currentIdx || selectedSlot.slotId !== slot.id)) {
                      onSwap(selectedSlot, { spreadIndex: currentIdx, slotId: slot.id });
                    } else {
                      onSelectSlot(currentIdx, slot.id);
                    }
                  }}
                  className={`group relative aspect-square overflow-hidden rounded border transition-all ${
                    active
                      ? "border-terracotta-deep ring-2 ring-terracotta-deep/30"
                      : "border-ink-faded/20 hover:border-terracotta/50"
                  }`}
                  title={slot.id}
                >
                  {url ? (
                    <img src={url} alt={photo?.filename ?? slot.id} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-1" style={{ background: "rgba(243,231,209,.5)" }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" className="text-ink-faded/40">
                        <path d="M8 2 L 8 14 M 2 8 L 14 8" stroke="currentColor" strokeWidth="1" />
                      </svg>
                      <span className="font-mono text-[8px] uppercase tracking-wider text-ink-faded/50">{slot.id}</span>
                    </div>
                  )}
                  {active && (
                    <div className="absolute inset-0 border-2 border-terracotta-deep/60" />
                  )}
                  <span className="absolute bottom-1 left-1 right-1 truncate rounded bg-ink/65 px-1 py-0.5 font-mono text-[7px] uppercase tracking-wider text-paper">
                    {slot.id}
                  </span>
                </button>
              );
            })}
          </div>

          {selectedSlot && selectedSlot.spreadIndex !== currentIdx && (
            <p className="mt-3 font-mono text-[9px] uppercase tracking-wider text-terracotta-deep">
              Select a photo here to swap with page {selectedSlot.spreadIndex + 1}
            </p>
          )}
        </section>

        <section className="mt-6 border-t border-ink-faded/10 pt-5">
          <h4 className="font-mono text-[10px] uppercase tracking-widest text-ink-faded">Replace with photo</h4>
          <p className="mt-1 font-serif text-sm italic text-ink-faded/70">
            {selectedSlot ? "Pick any uploaded photo. Used photos will swap with the selected slot." : "Select a slot above, then pick a replacement photo."}
          </p>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {book.photos.map((photo) => {
              const url = imageUrl("public", photo.thumbnailKey);
              const usage = photoUsage.get(photo.id);
              const active = photo.id === selectedPhotoId;
              const disabled = !selectedSlot || active;

              return (
                <button
                  key={photo.id}
                  onClick={() => {
                    if (selectedSlot) {
                      onReplaceSlotPhoto(selectedSlot, photo.id);
                    }
                  }}
                  disabled={disabled}
                  className={`relative aspect-square overflow-hidden rounded border transition-all ${
                    active
                      ? "border-terracotta-deep ring-2 ring-terracotta-deep/30"
                      : selectedSlot
                        ? "border-ink-faded/20 hover:border-terracotta/60 hover:shadow-md"
                        : "cursor-not-allowed border-ink-faded/10 opacity-50"
                  }`}
                  title={photo.filename}
                >
                  {url ? (
                    <img src={url} alt={photo.filename} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full bg-paper-2" />
                  )}
                  <span className="absolute bottom-1 left-1 right-1 truncate rounded bg-ink/65 px-1 py-0.5 font-mono text-[7px] uppercase tracking-wider text-paper">
                    {usage ? usage.spreadLabel : "Unused"}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {selectedPhoto && (
          <section className="mt-6 border-t border-ink-faded/10 pt-5">
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-ink-faded">Photo Caption</h4>
            <input
              type="text"
              value={selectedPhoto.caption ?? ""}
              onChange={(e) => onUpdateCaption(selectedPhoto.id, e.target.value)}
              placeholder="Add a caption..."
              className="mt-2 w-full rounded border border-ink-faded/20 bg-paper px-3 py-2 font-script text-sm text-ink placeholder:text-ink-faded/40 focus:border-terracotta-deep focus:outline-none"
            />
          </section>
        )}

        {selectedSlot && selectedSlot.spreadIndex === currentIdx && (
          <section className="mt-6 border-t border-ink-faded/10 pt-5">
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-ink-faded">Position & Zoom</h4>
            <p className="mt-1 font-serif text-sm italic text-ink-faded/70">
              Drag the slide to pan. Scroll to zoom.
            </p>
            <AdjustmentControls
              adjustments={currentSpread?.assignments.find((a) => a.slotId === selectedSlot.slotId)?.adjustments}
              onChange={(delta) => onAdjust(currentIdx, selectedSlot.slotId, delta)}
            />
          </section>
        )}

        <section className="mt-6 border-t border-ink-faded/10 pt-5">
          <h4 className="font-mono text-[10px] uppercase tracking-widest text-ink-faded">Text & Labels</h4>
          <div className="mt-3 space-y-3">
            {editableTextFields.length > 0 ? (
              <div className="space-y-3">
                {editableTextFields.map((field) => {
                  const value = currentSpread
                    ? resolveTemplateTextValue({
                        assignments: currentSpread.assignments,
                        field,
                        getPhotoCaption: (photoId) => photoMap.get(photoId)?.caption,
                        texts: currentSpread.texts,
                      })
                    : "";
                  return (
                    <div key={field.key}>
                      <label className="block font-mono text-[9px] uppercase tracking-wider text-ink-faded/70">{field.label}</label>
                      {field.multiline ? (
                        <textarea
                          value={value}
                          onChange={(e) => onUpdateText(currentIdx, field.key, e.target.value)}
                          placeholder={field.defaultValue}
                          rows={3}
                          className="mt-1 w-full resize-none rounded border border-ink-faded/20 bg-paper px-3 py-2 font-serif text-sm leading-snug text-ink placeholder:text-ink-faded/40 focus:border-terracotta-deep focus:outline-none"
                        />
                      ) : (
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => onUpdateText(currentIdx, field.key, e.target.value)}
                          placeholder={field.defaultValue}
                          className="mt-1 w-full rounded border border-ink-faded/20 bg-paper px-3 py-2 font-script text-sm text-ink placeholder:text-ink-faded/40 focus:border-terracotta-deep focus:outline-none"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="font-serif text-sm italic text-ink-faded/60">
                This slide has no predefined text fields. Add one only if the template supports a matching key.
              </p>
            )}

            <AddTextField onAdd={(key) => onUpdateText(currentIdx, key, "")} />
          </div>
        </section>
      </div>

      <div className="flex-none border-t border-ink-faded/10 px-5 py-4">
        <div className="flex gap-2">
          <button
            onClick={onSave}
            disabled={!hasChanges || saving}
            className={`flex-1 rounded px-3 py-2 font-sans text-xs uppercase tracking-wider transition-colors ${
              hasChanges && !saving
                ? "border border-terracotta-deep bg-terracotta-deep text-paper hover:bg-terracotta"
                : "cursor-not-allowed border border-ink-faded/20 bg-paper-2 text-ink-faded"
            }`}
          >
            {saving ? "Saving..." : "Save"}
          </button>
          <button
            onClick={onDiscard}
            disabled={!hasChanges || saving}
            className={`rounded px-3 py-2 font-sans text-xs uppercase tracking-wider transition-colors ${
              hasChanges && !saving
                ? "border border-ink-faded/30 text-ink-soft hover:border-ink-faded hover:text-ink"
                : "cursor-not-allowed border border-ink-faded/10 text-ink-faded/40"
            }`}
          >
            Discard
          </button>
        </div>
      </div>
    </div>
  );
}

function AddTextField({ onAdd }: { onAdd: (key: string) => void }): React.ReactElement {
  const [open, setOpen] = useState(false);
  const [key, setKey] = useState("");

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-ink-faded/60 transition-colors hover:text-terracotta-deep"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" className="text-current">
          <path d="M6 2 L 6 10 M 2 6 L 10 6" stroke="currentColor" strokeWidth="1" />
        </svg>
        Add text field
      </button>
    );
  }

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        placeholder="field name"
        className="flex-1 rounded border border-ink-faded/20 bg-paper px-2 py-1.5 font-mono text-[10px] uppercase tracking-wider text-ink placeholder:text-ink-faded/30 focus:border-terracotta-deep focus:outline-none"
        onKeyDown={(e) => {
          if (e.key === "Enter" && key.trim()) {
            onAdd(key.trim());
            setKey("");
            setOpen(false);
          }
        }}
        autoFocus
      />
      <button
        onClick={() => {
          if (key.trim()) {
            onAdd(key.trim());
            setKey("");
            setOpen(false);
          }
        }}
        className="rounded border border-terracotta-deep px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-terracotta-deep transition-colors hover:bg-terracotta-deep hover:text-paper"
      >
        Add
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main page                                                          */
/* ------------------------------------------------------------------ */

export default function BookPage(): React.ReactElement {
  const params = useParams();
  const bookId = params.id as string;

  const [book, setBook] = useState<BookData | null>(null);
  const [draftBook, setDraftBook] = useState<BookData | null>(null);
  const [idx, setIdx] = useState(0);
  const [exportOpen, setExportOpen] = useState(false);
  const [exportUrls, setExportUrls] = useState<{
    printUrl: string | null;
    screenUrl: string | null;
    status?: string;
    error?: string;
  } | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<SelectedSlot | null>(null);
  const [saving, setSaving] = useState(false);
  const [swapFlash, setSwapFlash] = useState<SelectedSlot | null>(null);

  const sliderRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  const fetchBook = useCallback(async () => {
    if (!bookId) return;
    const res = await fetch(`/api/books/${bookId}`);
    const data = await res.json();
    if (data.book) {
      setBook(data.book);
      setDraftBook(data.book);
    }
  }, [bookId]);

  useEffect(() => {
    void fetchBook();
  }, [fetchBook]);

  const spreads = draftBook?.placementJson ?? [];

  // IntersectionObserver to track which slide is centered
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || spreads.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const i = Number(entry.target.getAttribute("data-index"));
            if (!Number.isNaN(i)) {
              setIdx(i);
            }
          }
        });
      },
      { root: slider, threshold: 0.6 }
    );

    slideRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [spreads.length]);

  const scrollToIndex = useCallback((targetIdx: number) => {
    const slider = sliderRef.current;
    const slide = slideRefs.current[targetIdx];
    if (!slider || !slide) return;
    const sliderRect = slider.getBoundingClientRect();
    const slideRect = slide.getBoundingClientRect();
    const scrollLeft = slider.scrollLeft + slideRect.left - sliderRect.left - (sliderRect.width - slideRect.width) / 2;
    slider.scrollTo({ left: scrollLeft, behavior: "smooth" });
  }, []);

  const next = useCallback(() => {
    const target = Math.min(idx + 1, spreads.length - 1);
    scrollToIndex(target);
  }, [idx, spreads.length, scrollToIndex]);

  const prev = useCallback(() => {
    const target = Math.max(idx - 1, 0);
    scrollToIndex(target);
  }, [idx, scrollToIndex]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "Escape" && editMode) {
        setEditMode(false);
        setSelectedSlot(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, editMode]);

  const downloadExport = useCallback(async () => {
    const res = await fetch(`/api/books/${bookId}/export`);
    const data = await res.json();
    setExportUrls(data);
  }, [bookId]);

  const photoMap = useMemo(() => new Map(draftBook?.photos.map((p) => [p.id, p]) ?? []), [draftBook]);

  const resolveTemplate = (spread: SpreadData | undefined): string => {
    return (
      spread?.templateName ??
      (spread?.spreadId === "cover"
        ? "Cover"
        : spread?.spreadId.startsWith("spread-")
          ? parseInt(spread.spreadId.replace("spread-", ""), 10) % 2 !== 0
            ? "GrandVista"
            : "JournalPage"
          : "GrandVista")
    );
  };

  const buildSpreadData = useCallback(
    (spread: SpreadData | undefined) => {
      const s: Record<string, string | undefined> = {};
      const c: Record<string, string> = {};
      const a: Record<string, PhotoAdjustment> = {};
      if (!spread) return { slots: s, captions: c, adjustments: a };

      for (const asgn of spread.assignments) {
        const photo = photoMap.get(asgn.photoId);
        if (photo) {
          s[asgn.slotId] = imageUrl("public", photo.thumbnailKey);
          if (photo.caption) {
            c[asgn.slotId] = photo.caption;
          }
        }
        if (asgn.adjustments) {
          a[asgn.slotId] = asgn.adjustments;
        }
      }

      if (spread.texts) {
        for (const [key, value] of Object.entries(spread.texts)) {
          c[key] = value;
        }
      }

      return { slots: s, captions: c, adjustments: a };
    },
    [photoMap]
  );

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
      StorySpread: "· Our Story",
      GroupPhotoSpread: "· Group Photo",
      MosaicGrid: "· Photo Mosaic",
      HighlandCover: "· Cover",
      HighlandHero: "· Hero",
      HighlandGrid: "· Grid",
      HighlandJournal: "· Journal",
      HighlandQuote: "· Quote",
      HighlandBackCover: "· Back Cover",
      CityCover: "· Cover",
      CityHero: "· Hero",
      CityMap: "· Map",
    };
    return labels[t] ?? t;
  };

  /* ------------------ Edit actions ------------------ */

  const hasChanges = useMemo(() => {
    if (!book || !draftBook) return false;
    if (book.title !== draftBook.title) return true;
    if (JSON.stringify(book.placementJson) !== JSON.stringify(draftBook.placementJson)) return true;
    if (JSON.stringify(book.photos) !== JSON.stringify(draftBook.photos)) return true;
    return false;
  }, [book, draftBook]);

  const handleSelectSlot = useCallback((spreadIndex: number, slotId: string) => {
    setSelectedSlot((prev) => {
      if (prev && prev.spreadIndex === spreadIndex && prev.slotId === slotId) {
        return null;
      }
      return { spreadIndex, slotId };
    });
  }, []);

  const handleSwap = useCallback(
    (from: SelectedSlot, to: SelectedSlot) => {
      setDraftBook((prev) => {
        if (!prev) return prev;
        const next = structuredClone(prev);
        const fromSpread = next.placementJson?.[from.spreadIndex];
        const toSpread = next.placementJson?.[to.spreadIndex];
        if (!fromSpread || !toSpread) return prev;

        const fromA = fromSpread.assignments.find((a) => a.slotId === from.slotId);
        const toA = toSpread.assignments.find((a) => a.slotId === to.slotId);

        if (fromA && toA) {
          const tmp = fromA.photoId;
          fromA.photoId = toA.photoId;
          toA.photoId = tmp;
        } else if (fromA && !toA) {
          toSpread.assignments.push({ slotId: to.slotId, photoId: fromA.photoId });
          fromSpread.assignments = fromSpread.assignments.filter((a) => a.slotId !== from.slotId);
        } else if (!fromA && toA) {
          fromSpread.assignments.push({ slotId: from.slotId, photoId: toA.photoId });
          toSpread.assignments = toSpread.assignments.filter((a) => a.slotId !== to.slotId);
        }

        return next;
      });

      setSelectedSlot(null);
      setSwapFlash(to);
      setTimeout(() => setSwapFlash(null), 600);
    },
    []
  );

  const handleReplaceSlotPhoto = useCallback((target: SelectedSlot, photoId: string) => {
    setDraftBook((prev) => {
      if (!prev) return prev;
      const next = structuredClone(prev);
      const placements = next.placementJson;
      const targetSpread = placements?.[target.spreadIndex];
      if (!placements || !targetSpread) return prev;

      const targetAssignment = targetSpread.assignments.find((assignment) => assignment.slotId === target.slotId);
      if (targetAssignment?.photoId === photoId) return prev;

      let source:
        | {
            spread: SpreadData;
            assignment: { slotId: string; photoId: string };
          }
        | null = null;

      for (const spread of placements) {
        const assignment = spread.assignments.find((item) => item.photoId === photoId);
        if (assignment) {
          source = { spread, assignment };
          break;
        }
      }

      if (targetAssignment && source) {
        const previousPhotoId = targetAssignment.photoId;
        targetAssignment.photoId = photoId;
        source.assignment.photoId = previousPhotoId;
      } else if (!targetAssignment && source) {
        const sourceAssignment = source.assignment;
        targetSpread.assignments.push({ slotId: target.slotId, photoId });
        source.spread.assignments = source.spread.assignments.filter((assignment) => assignment !== sourceAssignment);
      } else if (targetAssignment) {
        targetAssignment.photoId = photoId;
      } else {
        targetSpread.assignments.push({ slotId: target.slotId, photoId });
      }

      return next;
    });

    setSelectedSlot(target);
    setSwapFlash(target);
    setTimeout(() => setSwapFlash(null), 600);
  }, []);

  const handleUpdateText = useCallback((spreadIndex: number, key: string, value: string) => {
    setDraftBook((prev) => {
      if (!prev) return prev;
      const next = structuredClone(prev);
      const spread = next.placementJson?.[spreadIndex];
      if (!spread) return prev;
      if (!spread.texts) spread.texts = {};
      spread.texts[key] = value;
      return next;
    });
  }, []);

  const handleUpdateCaption = useCallback((photoId: string, caption: string) => {
    setDraftBook((prev) => {
      if (!prev) return prev;
      const next = structuredClone(prev);
      const photo = next.photos.find((p) => p.id === photoId);
      if (photo) photo.caption = caption;
      return next;
    });
  }, []);

  const handleAdjust = useCallback((spreadIndex: number, slotId: string, delta: Partial<PhotoAdjustment>) => {
    setDraftBook((prev) => {
      if (!prev) return prev;
      const next = structuredClone(prev);
      const spread = next.placementJson?.[spreadIndex];
      if (!spread) return prev;
      const assignment = spread.assignments.find((a) => a.slotId === slotId);
      if (!assignment) return prev;
      if (!assignment.adjustments) {
        assignment.adjustments = { offsetX: 0, offsetY: 0, zoom: 1, rotation: 0 };
      }
      if (delta.offsetX !== undefined) assignment.adjustments.offsetX += delta.offsetX;
      if (delta.offsetY !== undefined) assignment.adjustments.offsetY += delta.offsetY;
      if (delta.zoom !== undefined) assignment.adjustments.zoom = Math.min(3, Math.max(0.5, assignment.adjustments.zoom + delta.zoom));
      if (delta.rotation !== undefined) assignment.adjustments.rotation = delta.rotation;
      return next;
    });
  }, []);

  const handleSave = useCallback(async () => {
    if (!book || !draftBook) return;
    setSaving(true);

    try {
      const captionPromises: Promise<Response>[] = [];
      for (const draftPhoto of draftBook.photos) {
        const original = book.photos.find((p) => p.id === draftPhoto.id);
        if (original && original.caption !== draftPhoto.caption) {
          captionPromises.push(
            fetch(`/api/sessions/${book.sessionId}/photos/${draftPhoto.id}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ caption: draftPhoto.caption }),
            })
          );
        }
      }

      const captionResponses = await Promise.all(captionPromises);
      if (captionResponses.some((response) => !response.ok)) {
        return;
      }

      const res = await fetch(`/api/books/${book.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: draftBook.title,
          placementJson: draftBook.placementJson,
          sessionId: book.sessionId,
        }),
      });

      if (!res.ok) {
        return;
      }
      const data = await res.json();
      setBook(data.book);
      setDraftBook(data.book);
      setSelectedSlot(null);
      setExportUrls(null);
    } finally {
      setSaving(false);
    }
  }, [book, draftBook]);

  const handleDiscard = useCallback(() => {
    if (!book) return;
    setDraftBook(structuredClone(book));
    setSelectedSlot(null);
  }, [book]);

  /* ------------------ Auto-save ------------------ */

  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!hasChanges || !book || !draftBook) return;
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    autoSaveTimer.current = setTimeout(() => {
      void handleSave();
    }, 1500);
    return () => {
      if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    };
  }, [hasChanges, book, draftBook, handleSave]);

  /* ------------------ Render ------------------ */

  if (!book || !draftBook) {
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

  const currentTemplate = resolveTemplate(spreads[idx]);

  return (
    <div className="app-root flex h-screen flex-col overflow-hidden">
      {/* Top bar */}
      <header className="topbar">
        <div className="topbar-title">
          <Link href="/" className="f-display transition-opacity hover:opacity-70" style={{ fontStyle: "italic", fontSize: 22 }}>
            Wanderbound
          </Link>
          <span className="topbar-sub">— {draftBook.title || "Untitled Travel Book"} —</span>
        </div>
        <div className="topbar-meta flex items-center gap-4">
          <Link
            href="/library"
            className="hidden rounded border border-paper/30 bg-paper/10 px-3 py-1.5 f-mono text-[10px] uppercase tracking-widest text-paper/80 transition-all hover:border-paper/60 hover:bg-paper/20 hover:text-paper sm:inline-block"
          >
            My Books
          </Link>
          <button
            onClick={() => {
              if (editMode) {
                setEditMode(false);
                setSelectedSlot(null);
              } else {
                setEditMode(true);
              }
            }}
            className={`rounded border px-3 py-1.5 f-mono text-[10px] uppercase tracking-widest transition-all ${
              editMode
                ? "border-terracotta-deep bg-terracotta-deep text-paper"
                : "border-paper/40 bg-paper/10 text-paper/90 hover:border-paper/70 hover:bg-paper/20 hover:text-paper"
            }`}
          >
            {editMode ? "Done Editing" : "Edit"}
          </button>
          <span className="f-mono">
            {String(idx + 1).padStart(2, "0")}
            <span style={{ opacity: 0.4 }}> / {spreads.length}</span>
          </span>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 overflow-hidden">
        {/* Main stage */}
        <main className="stage min-w-0 flex-1 overflow-hidden" style={{ opacity: editMode ? 0.85 : 1, transition: "opacity 0.4s ease" }}>
          <div className="slider-wrap">
            <button className="slider-nav slider-prev" onClick={prev} disabled={idx === 0} aria-label="Previous page">
              <svg width="28" height="28" viewBox="0 0 28 28">
                <path d="M18 6 L 10 14 L 18 22" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>

            <div className="slider-track" ref={sliderRef}>
              {spreads.map((spread, i) => {
                const template = resolveTemplate(spread);
                const { slots, captions, adjustments } = buildSpreadData(spread);
                const isFlashing = swapFlash?.spreadIndex === i;
                const isAdjusting = editMode && selectedSlot?.spreadIndex === i;

                return (
                  <div
                    key={spread.spreadId}
                    className={`slider-item ${i === idx ? "active" : ""}`}
                    data-index={i}
                    ref={(el) => { slideRefs.current[i] = el; }}
                  >
                    <div className="slider-page">
                      <div
                        className="page-frame relative transition-shadow duration-500"
                        style={{
                          boxShadow: isFlashing ? "0 0 0 4px rgba(201,148,65,.35)" : undefined,
                        }}
                      >
                        <ScaledPage>
                          <SpreadComposer
                            theme={draftBook.theme}
                            templateName={template}
                            slots={slots}
                            captions={captions}
                            adjustments={adjustments}
                            onAdjust={(slotId, delta) => handleAdjust(i, slotId, delta)}
                          />
                        </ScaledPage>
                        {isAdjusting && selectedSlot && (
                          <SlideGestureOverlay
                            selectedSlotId={selectedSlot.slotId}
                            onAdjust={(delta) => handleAdjust(i, selectedSlot.slotId, delta)}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button className="slider-nav slider-next" onClick={next} disabled={idx === spreads.length - 1} aria-label="Next page">
              <svg width="28" height="28" viewBox="0 0 28 28">
                <path d="M10 6 L 18 14 L 10 22" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>

          {/* Template name */}
          <div className="template-name">
            <span className="smallcaps">{templateLabel(currentTemplate)}</span>
          </div>

          {/* Keyboard hint */}
          {!editMode && <div className="hint">← → arrow keys to browse pages</div>}
        </main>

        {/* Edit sidebar */}
        {editMode && (
          <EditSidebar
            book={draftBook}
            currentIdx={idx}
            selectedSlot={selectedSlot}
            onSelectSlot={handleSelectSlot}
            onSwap={handleSwap}
            onReplaceSlotPhoto={handleReplaceSlotPhoto}
            onUpdateText={handleUpdateText}
            onUpdateCaption={handleUpdateCaption}
            onAdjust={handleAdjust}
            onSave={handleSave}
            onDiscard={handleDiscard}
            saving={saving}
            hasChanges={hasChanges}
            onClose={() => {
              setEditMode(false);
              setSelectedSlot(null);
            }}
          />
        )}
      </div>

      {/* Download button - floating */}
      {!editMode && (
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
      )}

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
                <>
                  <button
                    onClick={downloadExport}
                    className="block w-full rounded border px-4 py-3 text-center f-sans text-sm uppercase tracking-wider"
                    style={{ borderColor: "#6b4f3a", color: "#4a3526" }}
                  >
                    {exportUrls?.status === "rendering" ? "Rendering - Check Again" : "Prepare Export"}
                  </button>
                  {exportUrls?.error && (
                    <p className="text-center font-serif text-sm text-burgundy">{exportUrls.error}</p>
                  )}
                </>
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
