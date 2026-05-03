# MemoryBook — Agent Guide

> **Primary guide is `CLAUDE.md` — read it first.** This file provides a quick-reference summary for non-Claude agentic tools.

---

## Repo Layout (quick reference)

All application code lives under `src/` inside every app and package. Never place source files at the app/package root.

```
apps/
  web/
    src/
      app/          Next.js App Router — pages, layouts, API routes
      components/   Shared UI components
      lib/          Utilities (session, storage client, uploadClient, etc.)
  worker-upload/
    src/
      index.ts      BullMQ worker entry point
      thumbnailJob.ts
      placementJob.ts
  worker-render/
    src/
      index.ts      BullMQ worker entry point
      browser.ts    Playwright Chromium manager
      renderSpread.ts
      assemblePdf.ts

packages/
  db/
    src/
      index.ts      Prisma client export
    prisma/
      schema.prisma
  templates/
    src/
      types.ts      SlotDef, SpreadDef, PlacementResult types
      matcher.ts    Aspect-ratio placement logic
      spreads/      GrandVista, JournalPage, PolaroidWall, GoldenHour, ContactSheet, Cover, etc.
      SpreadComposer.tsx
  design/
    src/
      tokens.ts     Design tokens (CSS vars → TS consts)
      components/   Tape, Stamp, PassportStamp, Flourish, Vignette, PaperGrain, etc.
  shared/
    src/
      storage.ts    S3 client (putObject, getSignedUrl)
      queue.ts      BullMQ queue definitions
      types.ts      Cross-package shared types
      validators.ts Zod schemas for job payloads and API contracts

docs/               PRD (read-only), feature backlog, completed features
design/             Wanderbound reference HTML (read-only — visual ground truth)
infra/              docker-compose.yml, deployment configs
```

---

## Run Commands

```bash
docker compose up          # start Postgres + Redis + MinIO
pnpm install               # install all workspace deps
pnpm dev                   # Next.js dev server on :3000
pnpm workers:dev           # start upload + render workers
pnpm typecheck             # TypeScript strict check across all packages
pnpm lint                  # ESLint + Prettier
pnpm test                  # Vitest unit tests
pnpm test:e2e              # Playwright e2e tests
pnpm db:migrate            # apply Prisma migrations
pnpm db:generate           # regenerate Prisma client
```

---

## Backlog Flow

1. Pick next open feature from `docs/feature.md`: lowest milestone → P0 first → all `Depends:` items must be `[x]`.
2. When done: cut block from `feature.md`, flip to `[x]`, add `Done: YYYY-MM-DD · commit {sha}` line, paste into `docs/feature_completed.md`, commit both files with the feature.

---

## Key Constraints (v1)

- All-TypeScript stack — no Python services.
- **All source files must live under `src/`** inside their app or package directory.
- Anonymous sessions only — no user accounts.
- No image analysis in v1 — manual photo reorder, simple aspect-ratio placement.
- Visual source of truth: `design/Wanderbound Travel Book _standalone_.html`.
- Full coding conventions, design tokens, and PRD anchors: see `CLAUDE.md`.
