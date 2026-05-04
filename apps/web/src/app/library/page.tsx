"use client";

import React, { useEffect, useState } from "react";
import BookCard from "@/components/BookCard";

type BookItem = {
  id: string;
  title: string | null;
  theme: string;
  status: string;
  createdAt: string;
};

export default function LibraryPage(): React.ReactElement {
  const [books, setBooks] = useState<BookItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/books")
      .then((r) => r.json())
      .then((data) => {
        setBooks(data.books ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <main className="app-root mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-16">
      {/* Header */}
      <section className="relative w-full">
        <div className="absolute -left-4 -top-4 h-16 w-16 opacity-10">
          <svg viewBox="0 0 64 64" fill="none">
            <rect x="8" y="8" width="48" height="48" stroke="currentColor" strokeWidth="1" />
            <rect x="16" y="16" width="32" height="32" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="32" cy="32" r="4" fill="currentColor" />
          </svg>
        </div>

        <p className="font-mono text-xs uppercase tracking-[0.3em] text-terracotta-deep">
          MemoryBook
        </p>
        <h1 className="mt-4 font-display text-5xl leading-tight text-ink md:text-6xl">
          Your Library
        </h1>
        <p className="mt-4 max-w-xl font-serif text-xl text-ink-soft">
          Every journey you have shaped lives here. Open a book to keep editing, or start a new one.
        </p>
      </section>

      {/* Actions */}
      <div className="mt-8 flex gap-3">
        <a
          href="/upload"
          className="rounded border border-terracotta-deep bg-terracotta-deep px-6 py-3 font-sans text-sm uppercase tracking-[0.2em] text-paper transition-colors hover:bg-terracotta"
        >
          Start a New Book
        </a>
      </div>

      {/* Divider */}
      <div className="my-10 flex items-center gap-4">
        <div className="h-px flex-1 bg-ink-faded/15" />
        <span className="font-mono text-[10px] uppercase tracking-widest text-ink-faded/50">
          {books.length} {books.length === 1 ? "book" : "books"}
        </span>
        <div className="h-px flex-1 bg-ink-faded/15" />
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex min-h-[300px] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-terracotta-deep border-t-transparent" />
        </div>
      ) : books.length === 0 ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center gap-4">
          <div className="font-display text-4xl italic text-ink-faded/30">Empty shelf</div>
          <p className="font-serif text-lg text-ink-faded/60">
            No books yet. Upload some photos to begin.
          </p>
          <a
            href="/upload"
            className="mt-2 rounded border border-ink-faded/30 px-5 py-2 font-sans text-sm uppercase tracking-wider text-ink-faded transition-colors hover:border-terracotta-deep hover:text-terracotta-deep"
          >
            Start a Book
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <BookCard key={book.id} {...book} />
          ))}
        </div>
      )}
    </main>
  );
}
