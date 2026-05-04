"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SpreadComposer from "@memorybook/templates/SpreadComposer";
import { listThemes } from "@memorybook/templates";

export type PreviewSpread = {
  spreadId: string;
  templateName: string;
  slots: Record<string, string | undefined>;
  captions: Record<string, string> | undefined;
};

function ScaledPreview({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <div className="relative w-full overflow-hidden" style={{ aspectRatio: "1 / 1" }}>
      <div
        className="absolute"
        style={{
          width: 600,
          height: 600,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) scale(0.5)",
          transformOrigin: "center center",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default function SelectThemePage(): React.ReactElement {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session");

  const themes = listThemes();
  const [selectedTheme, setSelectedTheme] = useState<string>("wanderbound");
  const [preview, setPreview] = useState<PreviewSpread[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);

  const fetchPreview = useCallback(
    async (themeId: string) => {
      if (!sessionId) return;
      setLoading(true);
      try {
        const res = await fetch("/api/preview", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId, theme: themeId }),
        });
        const data = await res.json();
        if (data.spreads) {
          setPreview(data.spreads);
        }
      } catch {
        setPreview(null);
      } finally {
        setLoading(false);
      }
    },
    [sessionId],
  );

  useEffect(() => {
    if (sessionId) {
      void fetchPreview("wanderbound");
    }
  }, [sessionId, fetchPreview]);

  const handleSelectTheme = useCallback(
    (themeId: string) => {
      setSelectedTheme(themeId);
      setPreview(null);
      void fetchPreview(themeId);
    },
    [fetchPreview],
  );

  const createBook = useCallback(async () => {
    if (!sessionId || !selectedTheme) return;
    setCreating(true);
    const res = await fetch("/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, theme: selectedTheme }),
    });
    const data = await res.json();
    if (data.bookId) {
      router.push(`/book/${data.bookId}`);
    } else {
      setCreating(false);
    }
  }, [sessionId, selectedTheme, router]);

  if (!sessionId) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-5xl items-center justify-center px-6">
        <p className="font-serif text-xl text-burgundy">No session found. Please start from the upload page.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-16">
      <section className="w-full">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-terracotta-deep">
          Step 3 of 3
        </p>
        <h1 className="mt-4 font-display text-5xl leading-tight text-ink md:text-6xl">
          Choose your style
        </h1>
        <p className="mt-4 font-serif text-xl text-ink-soft">
          Select a theme and preview how your photos will look.
        </p>
      </section>

      {/* Theme Cards */}
      <section className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => handleSelectTheme(theme.id)}
            disabled={theme.id === "city"}
            className={`relative rounded-lg border p-6 text-left transition-all ${
              selectedTheme === theme.id
                ? "border-terracotta-deep ring-2 ring-terracotta-deep/20"
                : "border-ink-faded/20 hover:border-ink-faded/40"
            } ${theme.id === "city" ? "cursor-not-allowed opacity-60" : ""}`}
            style={{
              background: selectedTheme === theme.id ? "rgba(243,231,209,.5)" : "transparent",
            }}
          >
            <div
              className="mb-4 h-24 w-full rounded"
              style={{ background: theme.previewColor }}
            />
            <h3 className="font-display text-2xl italic text-ink">{theme.name}</h3>
            <p className="mt-2 font-serif text-sm text-ink-soft">{theme.description}</p>
            {theme.id === "city" && (
              <span className="mt-2 inline-block rounded bg-ink-faded/10 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-ink-faded">
                Coming Soon
              </span>
            )}
          </button>
        ))}
      </section>

      {/* Preview Area */}
      <section className="mt-12 w-full">
        <h2 className="font-display text-2xl italic text-ink">Preview</h2>
        <p className="mt-2 font-serif text-sm text-ink-soft">
          {loading
            ? "Generating preview..."
            : preview
              ? `Showing 2 sample spreads in the ${themes.find((t) => t.id === selectedTheme)?.name} theme.`
              : "Select a theme to see a preview."}
        </p>

        {loading && (
          <div className="mt-6 flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-terracotta-deep border-t-transparent" />
          </div>
        )}

        {!loading && preview && (
          <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
            {preview.map((spread) => (
              <div key={spread.spreadId} className="rounded-lg border border-ink-faded/15 p-4">
                <p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-ink-faded">
                  {spread.templateName}
                </p>
                <ScaledPreview>
                  <SpreadComposer
                    theme={selectedTheme}
                    templateName={spread.templateName}
                    slots={spread.slots}
                    captions={spread.captions}
                  />
                </ScaledPreview>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <div className="mt-12">
        <button
          onClick={createBook}
          disabled={creating || selectedTheme === "city"}
          className={`
            rounded px-8 py-4 font-sans text-sm uppercase tracking-[0.2em] transition-colors
            ${
              !creating && selectedTheme !== "city"
                ? "border border-terracotta-deep bg-terracotta-deep text-paper hover:bg-terracotta"
                : "cursor-not-allowed border border-ink-faded bg-paper-2 text-ink-faded"
            }
          `}
        >
          {creating ? "Creating your book..." : "Create My Book"}
        </button>
      </div>
    </main>
  );
}
