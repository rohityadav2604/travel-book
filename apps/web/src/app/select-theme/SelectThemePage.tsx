"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SpreadComposer from "@memorybook/templates/SpreadComposer";
import { listThemes, type ThemeModule } from "@memorybook/templates";

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

function destinationSwatch(theme: ThemeModule): {
  background: string;
  accent: string;
  secondary: string;
  motif: "temple" | "tower" | "tile" | "generic";
} {
  if (theme.id === "bangkok") {
    return {
      background: "linear-gradient(135deg, #f2dcc4 0%, #d9a441 46%, #1e2630 100%)",
      accent: "#d9476f",
      secondary: "#3f8f8a",
      motif: "temple",
    };
  }

  if (theme.id === "paris") {
    return {
      background: "repeating-linear-gradient(90deg, #a33a35 0 18px, #f3e4cc 18px 36px, #2f6173 36px 40px, #f3e4cc 40px 58px)",
      accent: "#a33a35",
      secondary: "#2f6173",
      motif: "tower",
    };
  }

  if (theme.id === "spain") {
    return {
      background: "linear-gradient(135deg, #f4dfbd 0%, #d7a329 52%, #245f8f 100%)",
      accent: "#cf4b2c",
      secondary: "#245f8f",
      motif: "tile",
    };
  }

  return {
    background: theme.previewColor,
    accent: "rgba(255,255,255,.72)",
    secondary: "rgba(0,0,0,.18)",
    motif: "generic",
  };
}

function ThemeSwatch({ theme }: { theme: ThemeModule }): React.ReactElement {
  const swatch = destinationSwatch(theme);

  return (
    <div className="relative mb-4 h-24 w-full overflow-hidden rounded" style={{ background: swatch.background }}>
      <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "radial-gradient(circle at 24% 22%, #fff 0 2px, transparent 3px)" }} />
      {swatch.motif === "temple" && (
        <>
          <div className="absolute left-6 top-9 h-9 w-16" style={{ border: `3px solid ${swatch.accent}`, borderTop: 0 }} />
          <div className="absolute left-4 top-5 h-8 w-20" style={{ background: swatch.accent, clipPath: "polygon(50% 0, 100% 100%, 0 100%)", opacity: 0.88 }} />
          <div className="absolute bottom-5 left-24 h-5 w-28 rounded-full" style={{ borderTop: `4px solid ${swatch.secondary}` }} />
        </>
      )}
      {swatch.motif === "tower" && (
        <>
          <div className="absolute left-12 top-4 h-16 w-12" style={{ borderLeft: `4px solid ${swatch.secondary}`, borderRight: `4px solid ${swatch.secondary}`, transform: "skewX(-9deg)" }} />
          <div className="absolute left-9 top-14 h-2 w-20" style={{ background: swatch.accent }} />
          <div className="absolute bottom-4 right-7 h-8 w-20 rounded-t-full" style={{ border: `4px solid ${swatch.secondary}`, borderBottom: 0 }} />
        </>
      )}
      {swatch.motif === "tile" && (
        <>
          <div className="absolute left-5 top-4 grid grid-cols-3 gap-1">
            {Array.from({ length: 9 }, (_, index) => (
              <span key={index} className="block h-5 w-5" style={{ border: `2px solid ${index % 2 ? swatch.secondary : swatch.accent}`, background: "rgba(255,255,255,.28)" }} />
            ))}
          </div>
          <div className="absolute right-8 top-5 h-14 w-14 rounded-full" style={{ border: `5px solid ${swatch.accent}`, boxShadow: `0 0 0 8px ${swatch.secondary}55` }} />
        </>
      )}
      {swatch.motif === "generic" && <div className="absolute inset-x-5 bottom-5 h-5 rounded-full" style={{ background: swatch.secondary }} />}
    </div>
  );
}

export default function SelectThemePage(): React.ReactElement {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session");

  const themes = listThemes();
  const unavailableThemeIds = new Set<string>();
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
        {themes.map((theme) => {
          const isUnavailable = unavailableThemeIds.has(theme.id);

          return (
            <button
              key={theme.id}
              onClick={() => handleSelectTheme(theme.id)}
              disabled={isUnavailable}
              className={`relative rounded-lg border p-6 text-left transition-all ${
                selectedTheme === theme.id
                  ? "border-terracotta-deep ring-2 ring-terracotta-deep/20"
                  : "border-ink-faded/20 hover:border-ink-faded/40"
              } ${isUnavailable ? "cursor-not-allowed opacity-60" : ""}`}
              style={{
                background: selectedTheme === theme.id ? "rgba(243,231,209,.5)" : "transparent",
              }}
            >
              <ThemeSwatch theme={theme} />
              <h3 className="font-display text-2xl italic text-ink">{theme.name}</h3>
              <p className="mt-2 font-serif text-sm text-ink-soft">{theme.description}</p>
              {isUnavailable && (
                <span className="mt-2 inline-block rounded bg-ink-faded/10 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-ink-faded">
                  Coming Soon
                </span>
              )}
            </button>
          );
        })}
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
          disabled={creating || unavailableThemeIds.has(selectedTheme)}
          className={`
            rounded px-8 py-4 font-sans text-sm uppercase tracking-[0.2em] transition-colors
            ${
              !creating && !unavailableThemeIds.has(selectedTheme)
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
