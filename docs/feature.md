# MemoryBook — Feature Backlog

> **Legend**: `[ ]` open · `[~]` in-progress · `[x]` done (done items move to `feature_completed.md`)
> **Priority**: P0 = must-have for milestone · P1 = important · P2 = nice-to-have
> **Tags**: `[fe]` frontend · `[api]` API route · `[worker]` background worker · `[infra]` infrastructure · `[design]` design system · `[docs]` documentation
> **Picking next**: lowest open milestone → P0 before P1 before P2 → all `Depends:` must be `[x]` → prefer tag matching area you're in
> **On complete**: cut block from this file → flip to `[x]` → append to `feature_completed.md` with `Done:` line → commit both files together

---

## M0 — Foundation

<!-- M0 features moved to feature_completed.md -->

---

## M1 — Upload Pipeline

<!-- M1 features moved to feature_completed.md -->

---

## M2 — Reorder UI

<!-- M2 features moved to feature_completed.md -->

---

## M3 — Template Engine (Grand Vista + Journal Page)

<!-- M3 features moved to feature_completed.md -->

---

## M4 — Full Template Set

<!-- M4 features moved to feature_completed.md -->

---

## M5 — PDF Export

<!-- M5 features moved to feature_completed.md -->

---

## M6 — Polish & QA

- [ ] M6-01 · P1 · WCAG 2.1 AA audit + fixes [fe]
      PRD: §9 (Accessibility row)
      Acceptance: axe-core run on all non-renderer routes returns 0 violations; renderer is keyboard-navigable (arrow keys, tab to strip); screen-reader labels on all interactive elements
      Depends: M4-07
      Files: various; audit first

- [ ] M6-02 · P1 · Lighthouse performance budget [fe]
      PRD: §9 (Renderer first-paint row)
      Acceptance: Lighthouse desktop score ≥ 80; book renderer first-paint P95 ≤ 3s measured with simulated photo set of 44 images
      Depends: M3-07
      Files: next.config.ts tuning, image optimisation

- [ ] M6-03 · P1 · Cross-browser smoke tests [infra]
      PRD: §9 (Browser support row)
      Acceptance: Playwright tests cover upload → reorder → preview → download flow in Chrome 120+, Safari 17+, Firefox 121+, Edge 120+; all pass in CI
      Depends: M5-06
      Files: e2e/tests/

- [x] M6-04 · P1 · Error boundaries + fallback UI [fe]
      PRD: §9 (API availability row)
      Acceptance: React error boundaries on all major surfaces; API errors show friendly toast (no raw error messages exposed); worker job failure sets Book.status=failed and shows retry prompt
      Depends: M3-07, M5-06
      Files: apps/web/src/components/ErrorBoundary.tsx

- [ ] M6-05 · P2 · Retention cleanup cron [worker]
      PRD: §9 (Data retention row)
      Acceptance: cron job runs daily; deletes raw S3 uploads older than 48h post-export; deletes generated PDFs older than 24h; DB records soft-deleted; no active session data deleted
      Depends: M0-04, M0-05
      Files: apps/worker-upload/src/retentionJob.ts

- [ ] M6-06 · P1 · Observability (Sentry + pino logs) [infra]
      PRD: §9
      Acceptance: Sentry installed in apps/web and both workers; pino structured logs in API routes (request/response + job events); no PII in logs
      Depends: M7-01
      Files: apps/web/src/lib/sentry.ts, workers sentry init

---

## M7 — Launch

- [~] M7-01 · P0 · Production deploy [infra]
      PRD: §11 M7
      Acceptance: apps/web deployed on Vercel; worker-upload and worker-render deployed on Railway/Fly/Render; all env vars set; smoke test against prod passes
      Depends: M6-03, M6-04
      Files: .env.example, vercel.json, fly.toml or railway.toml

- [ ] M7-02 · P0 · CDN + Cloudflare config [infra]
      PRD: §8.2 (CDN row), §9
      Acceptance: Cloudflare sits in front of public S3 bucket; Next.js Image serves thumbnails via CDN; cache-control headers set correctly; raw uploads not publicly accessible
      Depends: M7-01
      Files: infra/cloudflare-config.md (or Terraform)

- [ ] M7-03 · P1 · On-call runbook [docs]
      PRD: §11 M7
      Acceptance: docs/runbook.md covers deploy process, rollback steps, worker queue monitoring (BullMQ dashboard), DB backup schedule, common failure modes
      Depends: M7-01
      Files: docs/runbook.md

- [ ] M7-04 · P2 · Status page [infra]
      PRD: §9 (API availability 99.5% SLO)
      Acceptance: uptime monitoring configured (Betterstack or similar); alerts on API + worker unavailability; status page URL in README
      Depends: M7-01
      Files: infra/monitoring setup

---

## V2 Backlog (deferred — do not start in v1)

- Image analysis pipeline: blur/exposure scoring, pHash dedup, subject detection (ONNX or cloud vision) — PRD §5.2
- Smart curation algorithm (quality filter, duplicate removal, variety maximisation) — PRD §5.2.2
- Filtered photos panel with rejection reasons — PRD §5.3.2
- Hungarian algorithm assignment (affinity-scored photo→slot matching) — PRD §6.4.2
- User accounts + saved books — PRD §4 (V1.1 row)
- Social share link — PRD §4 (V1.1 row)
- Multiple book sizes (A5, square, US Letter) — PRD §13
- CMYK colour space conversion — PRD §13
- Print-on-demand fulfilment — PRD §4 (V2.0 row)
- AI-generated captions — PRD §13
- Mobile native apps — PRD §13
