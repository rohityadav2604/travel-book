# MemoryBook — Completed Features

> Features move here from `feature.md` when done.
> Format: same as feature.md with `[x]` + `Done: YYYY-MM-DD · commit {sha}` appended.
> Append-only — never resort. Preserves completion chronology.

---

## M0 — Foundation

- [x] M0-01 · P0 · Monorepo scaffold [infra]
      PRD: §8.2
      Acceptance: pnpm install runs clean from repo root; all workspace packages resolve
      Depends: —
      Files: pnpm-workspace.yaml, root package.json, tsconfig.base.json, .editorconfig, .gitignore, .nvmrc, .prettierrc, eslint.config.js, Makefile
      Done: 2026-05-03 · commit pending

- [x] M0-02 · P0 · Next.js 15 app skeleton [fe]
      PRD: §8.2 (Frontend SPA row)
      Acceptance: `pnpm dev` starts apps/web on :3000; / returns 200; TypeScript strict compiles clean
      Depends: M0-01
      Files: apps/web/ — Next.js 15 App Router, Tailwind, basic layout.tsx, health route
      Done: 2026-05-03 · commit pending

- [x] M0-03 · P0 · Design tokens module [design]
      PRD: §6.1.1
      Acceptance: packages/design/src/tokens.ts exports all Wanderbound CSS custom properties as TS consts; Tailwind config in apps/web extends these tokens
      Depends: M0-01
      Files: packages/design/src/tokens.ts, apps/web/tailwind.config.ts
      Note: source tokens from design/Wanderbound Travel Book _standalone_.html :root vars
      Done: 2026-05-03 · commit pending

- [x] M0-04 · P0 · PostgreSQL + Prisma setup [infra]
      PRD: §8.2 (Database row)
      Acceptance: `docker compose up db` starts Postgres; `pnpm db:migrate` applies schema; Prisma client generates cleanly
      Depends: M0-01
      Files: docker-compose.yml (db service), packages/db/prisma/schema.prisma (Session, Photo, Book models), packages/db/src/index.ts
      Done: 2026-05-03 · commit pending

- [x] M0-05 · P0 · S3-compatible storage + MinIO [infra]
      PRD: §8.2 (Object Storage row), §9 (Upload throughput)
      Acceptance: `docker compose up storage` starts MinIO; packages/shared/src/storage.ts can putObject / getSignedUrl against it
      Depends: M0-01
      Files: docker-compose.yml (minio service), packages/shared/src/storage.ts, infra/create-buckets.sh
      Done: 2026-05-03 · commit pending

- [x] M0-06 · P0 · Anonymous session middleware [api]
      PRD: §8.3 step 1; PRD §12 Q2 resolved as anonymous
      Acceptance: any request to /api/* sets a signed-cookie session if absent; session row created in DB; session ID readable in subsequent requests
      Depends: M0-02, M0-04
      Files: apps/web/src/middleware.ts, apps/web/src/lib/session.ts
      Done: 2026-05-03 · commit pending

- [x] M0-07 · P0 · BullMQ + Redis queue setup [infra]
      PRD: §8.2 (Job Queue row)
      Acceptance: `docker compose up redis` starts Redis; packages/shared/src/queue.ts exports typed queues (upload, render); a test job enqueues and a worker processes it
      Depends: M0-01
      Files: docker-compose.yml (redis service), packages/shared/src/queue.ts
      Done: 2026-05-03 · commit pending

- [x] M0-08 · P0 · CI pipeline [infra]
      PRD: §11 M0 scope
      Acceptance: GitHub Actions workflow runs on every PR; jobs: lint, typecheck, test; all must pass before merge
      Depends: M0-01
      Files: .github/workflows/ci.yml
      Done: 2026-05-03 · commit pending

---

## M1 — Upload Pipeline

- [x] M1-01 · P0 · Dropzone upload UI [fe]
      PRD: §5.1.2
      Acceptance: drag-and-drop zone covers majority of viewport; vintage dashed border, sepia icon, handwritten-style copy; file-picker fallback works; correct design tokens used
      Depends: M0-02, M0-03
      Files: apps/web/src/app/upload/page.tsx, components/DropZone.tsx
      Done: 2026-05-03 · commit pending

- [x] M1-02 · P0 · Upload validation (count, format, size) [fe]
      PRD: §5.1.1
      Acceptance: < 30 or > 50 photos shows inline error; non-JPEG/HEIC/PNG/WebP shows per-file error; > 25MB single file blocked; > 500MB total blocked; CTA disabled until valid
      Depends: M1-01
      Files: apps/web/src/components/DropZone.tsx (validation logic)
      Done: 2026-05-03 · commit pending

- [~] M1-03 · P1 · HEIC→JPEG client-side conversion [fe]
      PRD: §12 Q4 (resolved: client-side)
      Acceptance: HEIC files silently converted to JPEG in-browser before upload begins; heic2any WASM loaded lazily; no visible delay for non-HEIC files
      Depends: M1-01
      Files: apps/web/src/lib/heicConvert.ts
      Note: Backend accepts HEIC files; client-side conversion deferred to v1.1
      Done: 2026-05-03 · commit pending

- [x] M1-04 · P0 · Chunked S3 multipart upload [api]
      PRD: §5.1.2 (chunked upload), §9 (5MB client chunk size, 1.25GB session)
      Acceptance: client sends 5MB chunks via presigned multipart URLs; upload survives a simulated network interruption and resumes; all 50×25MB completes without timeout
      Depends: M0-05, M0-06
      Files: apps/web/src/app/api/upload/route.ts (initiate/part/complete endpoints), apps/web/src/lib/uploadClient.ts
      Done: 2026-05-03 · commit pending

- [x] M1-05 · P0 · Film-strip upload progress UI [fe]
      PRD: §5.1.2
      Acceptance: each photo appears as a thumbnail in a horizontal strip as its chunk upload completes; loading animation on in-progress photos; overall session progress indicator
      Depends: M1-04
      Files: apps/web/src/components/UploadStrip.tsx
      Done: 2026-05-03 · commit pending

- [x] M1-06 · P0 · Upload-complete event → queue [api]
      PRD: §8.3 step 1-2
      Acceptance: when final part of final photo completes, enqueues a thumbnail job on the upload queue; job payload includes session ID + photo S3 keys
      Depends: M0-07, M1-04
      Files: apps/web/src/app/api/upload/route.ts (complete handler)
      Done: 2026-05-03 · commit pending

- [x] M1-07 · P0 · Thumbnail generation worker [worker]
      PRD: §8.3 step 2
      Acceptance: worker consumes upload queue; uses sharp to resize each photo to 400×400-max thumbnail; writes to public bucket; updates Photo.thumbnailKey in DB
      Depends: M0-04, M0-05, M0-07, M1-06
      Files: apps/worker-upload/src/index.ts, apps/worker-upload/src/thumbnailJob.ts
      Done: 2026-05-03 · commit pending

- [x] M1-08 · P0 · Session + photo record persistence [api]
      PRD: §8.3 step 1-2
      Acceptance: Session row created at upload init; Photo rows created per file (storageKey, filename, mimeType, sizeBytes, displayOrder); all queryable via /api/sessions/{id}/photos
      Depends: M0-04, M0-06, M1-04
      Files: apps/web/src/app/api/sessions/[id]/photos/route.ts, packages/db/prisma/schema.prisma (finalised Photo model)
      Done: 2026-05-03 · commit pending

---

## M2 — Reorder UI

- [x] M2-01 · P0 · Thumbnail strip view [fe]
      PRD: §5.3.1 (Selected Photos Panel, simplified — no AI filtering)
      Acceptance: after upload+processing completes, user sees all photos as thumbnails in upload order; WebSocket or polling detects processing-complete status
      Depends: M1-07, M1-08
      Files: apps/web/src/app/review/page.tsx, components/ThumbnailStrip.tsx
      Done: 2026-05-03 · commit pending

- [x] M2-02 · P0 · Drag-to-reorder (dnd-kit) [fe]
      PRD: §5.3.1 (drag-to-reorder)
      Acceptance: photos can be dragged within the strip to change sequence; touch-friendly; order change reflected immediately in UI; dnd-kit used (no other animation library)
      Depends: M2-01
      Files: apps/web/src/components/ThumbnailStrip.tsx (dnd-kit integration)
      Done: 2026-05-03 · commit pending

- [x] M2-03 · P0 · Sequence persistence [api]
      PRD: §5.3.1
      Acceptance: PATCH /api/sessions/{id}/order accepts ordered array of photo IDs; updates Photo.displayOrder in DB; idempotent
      Depends: M0-04, M2-02
      Files: apps/web/src/app/api/sessions/[id]/order/route.ts
      Done: 2026-05-03 · commit pending

- [x] M2-04 · P1 · Pin/exclude photo actions [fe]
      PRD: §5.3.1
      Acceptance: tap/click a thumbnail to toggle pinned (must include) or excluded state; excluded photos visually dimmed; pinned photos show a pin badge; state persisted via PATCH endpoint
      Depends: M2-01, M2-03
      Files: apps/web/src/components/ThumbnailStrip.tsx, apps/web/src/app/api/sessions/[id]/photos/[photoId]/route.ts
      Done: 2026-05-03 · commit pending

- [x] M2-05 · P0 · "Create My Book" gate [fe]
      PRD: §5.3.3
      Acceptance: CTA active only when non-excluded photo count is 30–50; if out of range shows delta hint ("Add 2 more or exclude 1"); clicking CTA triggers placement + navigates to /book/{id}
      Depends: M2-01, M2-04
      Files: apps/web/src/app/review/page.tsx
      Done: 2026-05-03 · commit pending

---

## M3 — Template Engine (Grand Vista + Journal Page)

- [x] M3-01 · P0 · Decorative atom components [design]
      PRD: §6.1 (design language)
      Acceptance: packages/design exports React components: Tape, Stamp, PassportStamp, Flourish, Vignette, PaperGrain, CoffeeStain, Ticket; each visually matches Wanderbound reference; uses only Tailwind + tokens, no inline styles
      Depends: M0-03
      Files: packages/design/src/components/*.tsx
      Done: 2026-05-03 · commit pending

- [x] M3-02 · P0 · Slot schema type [fe]
      PRD: §6.3, §6.4
      Acceptance: packages/templates/src/types.ts defines SlotDef (id, aspectRatioRange, preferredSubject, sizeWeight), SpreadDef (id, templateName, slots[]), PlacementResult (spreadId, assignments: {slotId, photoId}[])
      Depends: M0-01
      Files: packages/templates/src/types.ts
      Done: 2026-05-03 · commit pending

- [x] M3-03 · P0 · Aspect-ratio photo matcher [worker]
      PRD: §6.4 (simplified — no affinity scoring, no Hungarian; just best aspect-ratio fit)
      Acceptance: given ordered photo list + book slot definitions, assigns each photo to its best-matching slot by aspect ratio; output is PlacementResult JSON stored in DB (Book.placementJson); runs < 500ms for 50 photos
      Depends: M3-02, M2-03, M0-04
      Files: apps/worker-upload/src/placementJob.ts (or packages/templates/src/matcher.ts)
      Done: 2026-05-03 · commit pending

- [x] M3-04 · P0 · Grand Vista spread template [fe]
      PRD: §6.3.1
      Acceptance: single hero slot spans full two-page bleed; warm vignette overlay; caption area in lower-left in Caveat/handwritten font; matches Wanderbound TemplateHero visually
      Depends: M3-01, M3-02, M0-03
      Files: packages/templates/src/spreads/GrandVista.tsx
      Done: 2026-05-03 · commit pending

- [x] M3-05 · P0 · Journal Page spread template [fe]
      PRD: §6.3.2
      Acceptance: 3 photo slots; left page large portrait with torn-edge bottom; right page two stacked landscapes + pull-quote + date in Special Elite; matches Wanderbound TemplateJournal visually
      Depends: M3-01, M3-02, M0-03
      Files: packages/templates/src/spreads/JournalPage.tsx
      Done: 2026-05-03 · commit pending

- [x] M3-06 · P0 · Spread composition component [fe]
      PRD: §6.5.1
      Acceptance: <SpreadComposer spread={SpreadDef} placement={PlacementResult} photos={Photo[]} /> renders left + right 600×600 pages side-by-side; photos loaded from CDN URL; paper texture overlaid
      Depends: M3-04, M3-05, M3-01
      Files: packages/templates/src/SpreadComposer.tsx
      Done: 2026-05-03 · commit pending

- [x] M3-07 · P0 · Book renderer page [fe]
      PRD: §6.5, §10 step 7
      Acceptance: /book/{id} fetches PlacementResult + photos from /api/books/{id}; renders all spreads (cover → body → back) using SpreadComposer; first-paint ≤ 3s (P95)
      Depends: M3-06, M3-03
      Files: apps/web/src/app/book/[id]/page.tsx, apps/web/src/app/api/books/[id]/route.ts
      Done: 2026-05-03 · commit pending

- [x] M3-08 · P0 · Page-turn CSS 3D transition [fe]
      PRD: §6.5.2
      Acceptance: left/right arrow keys and horizontal swipe advance spreads; CSS perspective + rotateY animates the turn; no JS animation libraries; transition completes in ≤ 400ms
      Depends: M3-07
      Files: apps/web/src/components/BookViewer.tsx
      Done: 2026-05-03 · commit pending

- [x] M3-09 · P1 · Thumbnail navigation strip (renderer) [fe]
      PRD: §6.5.2
      Acceptance: horizontal strip at bottom of renderer shows all spreads as thumbnails; clicking any jumps directly; current spread highlighted; spread count shown as "3 / 18"
      Depends: M3-07
      Files: apps/web/src/components/BookViewer.tsx (strip section)
      Done: 2026-05-03 · commit pending

- [x] M3-10 · P0 · CDN-optimised image serving [infra]
      PRD: §6.5.1, §8.2 (CDN row)
      Acceptance: Next.js Image component configured with S3/MinIO domain; display-resolution images load from CDN-served public bucket; raw uploads never served directly to browser
      Depends: M0-05, M0-02
      Files: apps/web/next.config.ts (remotePatterns), apps/web/src/lib/imageUrl.ts
      Done: 2026-05-03 · commit pending

---

## M4 — Full Template Set

- [x] M4-01 · P0 · Polaroid Wall spread template [fe]
      PRD: §6.3.3
      Acceptance: 5–6 photo slots; photos rendered as polaroids (white border, shadow, Caveat caption); ±3° random rotation; corkboard background; hand-drawn pin SVG above centre image
      Depends: M3-01, M3-02
      Files: packages/templates/src/spreads/PolaroidWall.tsx
      Done: 2026-05-03 · commit pending

- [x] M4-02 · P0 · Golden Hour spread template [fe]
      PRD: §6.3.4
      Acceptance: 4 slots; left page full-bleed warm landscape with radial vignette; right page cream column with 3 portrait photos separated by amber rules + coordinate captions in Special Elite
      Depends: M3-01, M3-02
      Files: packages/templates/src/spreads/GoldenHour.tsx
      Done: 2026-05-03 · commit pending

- [x] M4-03 · P0 · Contact Sheet spread template [fe]
      PRD: §6.3.5
      Acceptance: 8 equal-size photo slots on ink (#2c1f15) background; 4px gutters; film-frame perforations along top and bottom edges (CSS pattern from Wanderbound .stamp::before donor)
      Depends: M3-01, M3-02
      Files: packages/templates/src/spreads/ContactSheet.tsx
      Done: 2026-05-03 · commit pending

- [x] M4-04 · P0 · Cover + inside-front + inside-back + back cover [fe]
      PRD: §6.2
      Acceptance: Cover: full-bleed hero, auto-generated title (trip start date), decorative stamp. Inside-front: dedication quote + accent photo. Inside-back: decorative SVG world map + trip stats. Back: solid texture + branding.
      Depends: M3-01, M3-06
      Files: packages/templates/src/spreads/Cover.tsx, InsideFront.tsx, InsideBack.tsx, BackCover.tsx
      Done: 2026-05-03 · commit pending

- [x] M4-05 · P0 · Chapter dividers (auto-insert) [fe]
      PRD: §6.2 (Chapter Divider row)
      Acceptance: placement engine auto-inserts a full-bleed atmospheric spread every 6–8 photos in the sequence; chapter label derived from position (e.g. "Chapter II"); atmospheric image selected from pool of remaining photos
      Depends: M3-03, M3-06
      Files: packages/templates/src/spreads/ChapterDivider.tsx, apps/worker-upload/src/placementJob.ts (divider logic)
      Done: 2026-05-03 · commit pending

- [~] M4-06 · P1 · Inline caption editing [fe]
      PRD: §6.5.3
      Acceptance: tapping any caption area enters contenteditable mode; changes auto-saved client-side; PATCH /api/books/{id}/captions persists; changes reflected when PDF is generated
      Depends: M3-07
      Files: apps/web/src/components/CaptionEditor.tsx, apps/web/src/app/api/books/[id]/captions/route.ts
      Note: UI supports captions prop; full editing deferred to v1.1
      Done: 2026-05-03 · commit pending

- [~] M4-07 · P1 · Book title editing [fe]
      PRD: §6.5.3
      Acceptance: tapping the cover title enters inline edit; PATCH /api/books/{id} persists new title; reflected in PDF export
      Depends: M4-04, M4-06
      Files: apps/web/src/components/BookViewer.tsx (cover title overlay)
      Note: Cover template accepts title prop; inline editing deferred to v1.1
      Done: 2026-05-03 · commit pending

---

## M5 — PDF Export

- [x] M5-01 · P0 · Puppeteer renderer worker setup [worker]
      PRD: §6.5.1, §8.2 (PDF Renderer row)
      Acceptance: apps/worker-render starts; Playwright (Chromium headless) launches headlessly; renders a single spread HTML page and returns a buffer; fonts load correctly
      Depends: M0-07, M3-06
      Files: apps/worker-render/src/index.ts, apps/worker-render/src/browser.ts
      Done: 2026-05-03 · commit pending

- [x] M5-02 · P0 · Server-side spread rendering at 300 DPI [worker]
      PRD: §6.5.1, §7.1
      Acceptance: each spread rendered via Playwright at 300 DPI, A4 portrait (210×297mm), 3mm bleed; output per-spread PDF buffer; paper textures and blend modes render correctly
      Depends: M5-01, M4-04
      Files: apps/worker-render/src/renderSpread.ts
      Done: 2026-05-03 · commit pending

- [x] M5-03 · P0 · PDF assembly + font embedding [worker]
      PRD: §7.1
      Acceptance: pdf-lib merges all spread PDFs in order; fonts Cormorant Garamond, Caveat, Special Elite subset-embedded; final PDF ≤ 60MB for 40-photo book; written to ephemeral S3 bucket
      Depends: M5-02
      Files: apps/worker-render/src/assemblePdf.ts
      Done: 2026-05-03 · commit pending

- [~] M5-04 · P1 · Screen PDF variant (150 DPI, no bleed) [worker]
      PRD: §7.1 (screen PDF row)
      Acceptance: second render pass at 150 DPI, no bleed, sRGB; same assembly flow; stored separately in ephemeral bucket
      Depends: M5-03
      Files: apps/worker-render/src/renderSpread.ts (resolution param)
      Note: render worker supports quality param; screen pass enqueued after print pass can be added
      Done: 2026-05-03 · commit pending

- [x] M5-05 · P0 · Signed download URL + 24h expiry [api]
      PRD: §7.2
      Acceptance: GET /api/books/{id}/export?quality=print|screen returns a presigned S3 URL expiring in 24h; URL only generated after render job completes; 404 if job still running
      Depends: M0-05, M5-03
      Files: apps/web/src/app/api/books/[id]/export/route.ts
      Done: 2026-05-03 · commit pending

- [x] M5-06 · P0 · Export UX (quality selector + progress bar) [fe]
      PRD: §7.2, §10 steps 9–11
      Acceptance: "Download Book" CTA in renderer toolbar; modal with print/screen toggle; progress bar with estimated time (target ≤90s for print); auto-download triggers when signed URL arrives; share link shown after download
      Depends: M5-05
      Files: apps/web/src/components/ExportModal.tsx
      Done: 2026-05-03 · commit pending

---

## M6 — Polish & QA

- [x] M6-04 · P1 · Error boundaries + fallback UI [fe]
      PRD: §9 (API availability row)
      Acceptance: React error boundaries on all major surfaces; API errors show friendly toast (no raw error messages exposed); worker job failure sets Book.status=failed and shows retry prompt
      Depends: M3-07, M5-06
      Files: apps/web/src/components/ErrorBoundary.tsx
      Done: 2026-05-03 · commit pending

---

## M7 — Launch

<!-- No M7 features completed yet -->

---

## Post-M7 — Theme Selection System

- [x] THEME-01 · P0 · Multi-theme book architecture [fe] [api] [worker] [design]
      Acceptance: Theme registry supports N themes; each theme owns spreads, composer, tokens, and render styles; Wanderbound (default), Highland (nature), and City (placeholder) registered
      Depends: M5-06
      Files: packages/templates/src/themes/*, packages/design/src/tokens/highland.ts, packages/design/src/components/highland/*
      Done: 2026-05-04 · commit pending

- [x] THEME-02 · P0 · Highland theme port [design] [fe]
      Acceptance: Highland Mountain Book design system ported into monorepo: 6 spread components (Cover, Hero, Grid, Journal, Quote, BackCover), custom decorations (compass, fern, topo map, etc.), distinct color palette and typography
      Depends: THEME-01
      Files: packages/templates/src/themes/highland/*, packages/design/src/components/highland/*
      Done: 2026-05-04 · commit pending

- [x] THEME-03 · P0 · Theme preview API [api]
      Acceptance: POST /api/preview returns 2 representative spreads with user's actual photos placed via aspect-ratio matcher for any selected theme; stateless, no DB writes
      Depends: THEME-01, M2-03
      Files: apps/web/src/app/api/preview/route.ts
      Done: 2026-05-04 · commit pending

- [x] THEME-04 · P0 · Theme selection UI with live preview [fe]
      Acceptance: /select-theme page shows theme cards (Wanderbound, Highland, City placeholder); clicking a theme fetches preview and renders 2 spreads with user's photos at reduced scale; CTA creates book with selected theme
      Depends: THEME-03, M2-04
      Files: apps/web/src/app/select-theme/page.tsx, apps/web/src/app/select-theme/SelectThemePage.tsx
      Done: 2026-05-04 · commit pending

- [x] THEME-05 · P0 · End-to-end theme flow integration [fe] [api] [worker]
      Acceptance: Review page CTA navigates to /select-theme; Book creation API accepts theme; placement engine uses theme-specific spread catalog; renderer injects theme CSS and fonts; existing Wanderbound books remain backward-compatible
      Depends: THEME-01, THEME-04, M5-06
      Files: apps/web/src/app/review/page.tsx, apps/web/src/app/api/books/route.ts, apps/web/src/app/book/[id]/page.tsx, apps/worker-upload/src/placementJob.ts, apps/worker-render/src/*
      Done: 2026-05-04 · commit pending
