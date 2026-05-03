# MemoryBook — Claude Code Agent Guide

## Project Overview

MemoryBook is a travel photo-book webapp that transforms 30–50 user photos into a beautifully designed vintage-retro photo book, rendered in the browser and exportable as a high-resolution PDF. Full product spec: `docs/MemoryBook_PRD_v1.0.md`.

---

## Confirmed V1 Scope Decisions

| Decision | Choice | Rationale |
|---|---|---|
| **Stack** | All-TypeScript (Next.js + Node workers, pnpm monorepo) | Eliminates polyglot overhead for v1 |
| **Auth** | Anonymous sessions (signed-cookie session ID) | Under-10-min flow goal; no sign-up friction |
| **Image analysis** | Deferred to v2 | v1 uses manual reorder + simple aspect-ratio placement |
| **Assignment** | Simple aspect-ratio matcher (no Hungarian algorithm) | Fast enough for v1; Hungarian is v2 |

PRD §5.2 (analysis pipeline), §5.3.2 (filtered photos panel), and §6.4 (affinity scoring) are **v2 only**. Do not implement them in v1.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 15, App Router, React Server Components (default), Tailwind CSS |
| **Drag-and-drop** | dnd-kit |
| **Image processing** | sharp (Node) |
| **Database** | PostgreSQL via Prisma ORM |
| **Queue** | BullMQ on Redis |
| **Storage** | S3-compatible (MinIO in dev, AWS S3 / Cloudflare R2 in prod) |
| **PDF rendering** | Playwright (Chromium headless) |
| **PDF assembly** | pdf-lib |
| **Validation** | zod |
| **Testing** | Vitest (unit), Playwright (e2e) |
| **Lint/format** | ESLint + Prettier; TypeScript strict mode |

---

## Repo Layout

All application code lives under `src/` inside every app and package. Never place source files at the app/package root.

```
apps/
  web/
    src/
      app/            Next.js App Router — pages, layouts, API route.ts handlers
      components/     Shared UI components
      lib/            Utilities: session, storage client, uploadClient, imageUrl
  worker-upload/
    src/
      index.ts        BullMQ worker entry
      thumbnailJob.ts
      placementJob.ts
  worker-render/
    src/
      index.ts        BullMQ worker entry
      browser.ts      Playwright Chromium manager
      renderSpread.ts
      assemblePdf.ts

packages/
  db/
    src/index.ts      Prisma client export
    prisma/schema.prisma
  templates/
    src/
      types.ts        SlotDef, SpreadDef, PlacementResult
      matcher.ts      Aspect-ratio placement logic
      spreads/        GrandVista, JournalPage, PolaroidWall, GoldenHour, ContactSheet, Cover, …
      SpreadComposer.tsx
  design/
    src/
      tokens.ts       Design tokens (CSS vars → TS consts)
      components/     Tape, Stamp, PassportStamp, Flourish, Vignette, PaperGrain, …
  shared/
    src/
      storage.ts      S3 client (putObject, getSignedUrl)
      queue.ts        BullMQ queue definitions
      types.ts        Cross-package shared types
      validators.ts   Zod schemas for job payloads and API contracts

docs/
  MemoryBook_PRD_v1.0.md   Product spec (read-only)
  feature.md               Active backlog
  feature_completed.md     Completed features

design/
  Wanderbound Travel Book _standalone_.html   Visual ground truth (read-only, 8.8MB)

infra/              docker-compose.yml, CDN config, deployment files
```

---

## Run / Test Commands

> Commands will be filled in as features land in M0. Placeholders below.

```bash
# Start all local infra (Postgres, Redis, MinIO)
docker compose up

# Install all workspace deps
pnpm install

# Dev server (Next.js on :3000)
pnpm dev

# Run all workers locally
pnpm workers:dev

# Typecheck all packages
pnpm typecheck

# Lint all packages
pnpm lint

# Run unit tests
pnpm test

# Run e2e tests (requires dev server + infra running)
pnpm test:e2e

# Apply DB migrations
pnpm db:migrate

# Generate Prisma client
pnpm db:generate
```

---

## Coding Conventions

- **All source under `src/`** — every app and package keeps source files inside its own `src/` directory. Never create source files at the app/package root.
- **TypeScript strict** — `noImplicitAny: true`, no `any` casts. Explicit return types on public functions.
- **Zod at all system boundaries** — user input, API request/response, job payloads, env vars. Internal code trusts its types.
- **App Router defaults** — React Server Components everywhere unless interactivity is required. Add `"use client"` only when the component uses hooks or browser events.
- **No inline styles** — Tailwind utility classes only. Design tokens available via the Tailwind config (see `packages/design`). Exception: SVG `fill`/`stroke` attributes.
- **Comments** — only when the *why* is non-obvious (hidden constraint, workaround, subtle invariant). Never describe what the code does.
- **Conventional Commits** — `feat:`, `fix:`, `chore:`, `refactor:`, `test:`, `docs:`. Scope is the app/package name, e.g. `feat(web): add dropzone`.
- **No speculative abstractions** — implement only what the current feature requires. Three similar lines is fine.
- **No error handling for impossible cases** — trust internal code. Validate only at system boundaries.

---

## Design Tokens

Sourced from `design/Wanderbound Travel Book _standalone_.html` `:root` and PRD §6.1.1. Canonical home: `packages/design/src/tokens.ts`.

```
--paper:    #f3e7d1   (page background, warm ivory)
--paper-2:  #ecdcb9   (slightly darker ivory, accents)
--paper-3:  #e3cfa3
--ink:      #2c1f15   (primary text, dark brown)
--ink-soft: #4a3526
--ink-faded:#6b4f3a
--terracotta:      #b9532e   (accent, headings)
--terracotta-deep: #8b3a1e
--ochre:    #c89441
--mustard:  #d9a441   (amber rules, highlights)
--olive:    #6b6b3a
--sage:     #9aa57a
--burgundy: #6e2a23
--teal:     #3f6b6b
```

**Typography**:
- Headline / display: DM Serif Display (→ Playfair Display fallback, then Georgia)
- Body serif: Cormorant Garamond
- Smallcaps / labels: Cormorant SC
- Handwritten / captions: Caveat (→ Homemade Apple fallback)
- Monospace / coordinates: Special Elite (→ Courier Prime fallback)

The Wanderbound HTML is the authoritative visual reference. Before considering a spread complete, compare it side-by-side with the equivalent Wanderbound template.

---

## Working with the Backlog

**Picking the next feature:**
1. Find the lowest open milestone in `docs/feature.md`.
2. Within that milestone, prefer P0 → P1 → P2.
3. All features listed in `Depends:` must already be `[x]` in `feature_completed.md`.
4. Prefer the feature whose tag (`[fe]`, `[api]`, `[worker]`, etc.) matches the area you're already in — minimises context switching.

**Marking a feature complete (the move-to-completed flow):**
1. Cut the entire feature block (the `- [ ] …` line plus the 4-line indent) from `feature.md`.
2. Flip the state marker from `[ ]` to `[x]`.
3. Append `Done: YYYY-MM-DD · commit {sha}` as a fifth indented line.
4. Paste the block at the bottom of the matching milestone section in `feature_completed.md`.
5. Commit both files in the same commit as the feature code, e.g.:
   `feat(infra): M0-01 monorepo scaffold`

---

## PRD Anchors

| Directory | PRD Section |
|---|---|
| `apps/web/src/app/upload` | §5.1 Upload Experience |
| `apps/web/src/app/review` | §5.3 Curation Review UI (simplified: manual reorder) |
| `apps/web/src/app/book` | §6.5 Web Renderer |
| `apps/worker-upload` | §8.3 steps 1–2 + §5.2 (v2 analysis pipeline) |
| `apps/worker-render` | §7 PDF Export, §6.5.1 server-side rendering |
| `packages/templates` | §6.2 Book Structure, §6.3 Spread Templates |
| `packages/design` | §6.1 Design Language & Aesthetics |
| `packages/db` | §8.2 Database, §9 Data Retention |
| `packages/shared` | §8.2 Job Queue, Object Storage |

---

## Open Questions (PRD §12)

| # | Question | Blocks |
|---|---|---|
| Q4 | HEIC: client-side `heic2any` vs server-side `sharp+libheif`? | M1-03 |
| Q5 | Inside-back map: decorative SVG vs real EXIF GPS route? | M4-04 — **default: decorative SVG** |
| Q6 | Font licensing: confirm Caveat OFL covers PDF embedding | M5-03 |

Q1 (vision model), Q2 (auth), Q3 (monetisation) resolved for v1 — deferred, anonymous, no paywall. Revisit in v2.

---

## Definition of Done

A feature is done when **all** of the following are true:

- [ ] TypeScript strict compiles clean (`pnpm typecheck`)
- [ ] ESLint + Prettier pass (`pnpm lint`)
- [ ] Unit tests pass for any pure logic added (`pnpm test`)
- [ ] For `[fe]` features: visually compared against Wanderbound reference HTML and PRD description
- [ ] For `[api]` / `[worker]` features: P95 latency targets from PRD §9 met or documented as deferred
- [ ] Feature block moved from `feature.md` to `feature_completed.md` with Done line
- [ ] Both backlog files committed in same commit as the feature code
