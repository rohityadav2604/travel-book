"use client";

import React from "react";

export default class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): { hasError: boolean; error: Error } {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-paper px-6">
          <h1 className="font-display text-4xl text-ink">Something went wrong</h1>
          <p className="mt-4 font-serif text-lg text-ink-soft">
            We are sorry — an unexpected error occurred.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-8 rounded border border-terracotta-deep bg-terracotta-deep px-6 py-3 font-sans text-sm uppercase tracking-wider text-paper"
          >
            Reload page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
