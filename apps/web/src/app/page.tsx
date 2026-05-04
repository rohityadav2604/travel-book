export default function HomePage(): React.ReactElement {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-6 py-16">
      <section className="max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-terracotta-deep">
          MemoryBook
        </p>
        <h1 className="mt-4 font-display text-6xl leading-none text-ink md:text-7xl">
          Travel books with a worn-in journal soul.
        </h1>
        <p className="mt-6 max-w-2xl font-serif text-2xl leading-8 text-ink-soft">
          Upload 5 to 50 travel photos, review the sequence, and render a warm vintage
          photo-book preview ready for export.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            className="rounded border border-terracotta-deep bg-terracotta-deep px-5 py-3 font-sans text-sm uppercase tracking-[0.2em] text-paper transition-colors hover:bg-terracotta"
            href="/upload"
          >
            Start a Book
          </a>
          <a
            className="rounded border border-ink-faded px-5 py-3 font-sans text-sm uppercase tracking-[0.2em] text-ink-soft transition-colors hover:border-terracotta-deep hover:text-terracotta-deep"
            href="/library"
          >
            My Books
          </a>
        </div>
      </section>
    </main>
  );
}
