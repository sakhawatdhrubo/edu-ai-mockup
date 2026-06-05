# Build Progress — edu-ai student mockup

**READ THIS FIRST every session. Update it after every screen you finish.** This file is the memory across sessions — if context is lost, this tells the next session exactly what is done and what is next.

## What this project is
Static, clickable UI mockup of the full **student journey** for the Onnorokom EduAI SSC tutor. Built **only** from [`student_wireframe.md`](student_wireframe.md) (the spec — read it). Bangla-first, phone-first. This is a **design mockup**, not the real app: no backend, no real data, no auth — just navigable pages with realistic Bangla copy and the right layout/states.

## Tooling (locked)
- **Astro + Tailwind**, static output. **npm** (Node ≥ 18). **No Docker. No database.**
- Astro docs MCP (use for latest syntax): `claude mcp add --transport http astro-docs https://mcp.docs.astro.build/mcp`

## Rules
- **Build everything** — every screen in the wireframe (the `⊕` marker is informational, NOT a skip).
- **One Astro page per screen ID** (e.g. `src/pages/c5-feedback.astro`). Shared UI (header, bottom-nav, buttons, cards, banners, modal) = components reused everywhere.
- **Use Appendix C Bangla copy verbatim.** Use §1.1 color/type tokens in `tailwind.config`.
- **No unnecessary tests.** The only check needed: `npm run build` passes + pages render. Do not write unit/e2e tests.
- **Phone-first**: design at ~390px width first; ≤6 elements per view; ≥44px touch targets.
- **Finish fully, in batches.** After each screen (or small batch), tick it below + append a Log line + commit. Never leave the tracker stale.
- Pick realistic placeholder content (a "Motion / Acceleration" physics example throughout) so screens feel real.

## Stack notes (learned during scaffold — read before changing build)
- **Astro 6** ships **rolldown-vite**, which is currently INCOMPATIBLE with `@tailwindcss/vite` (error: `Missing field tsconfigPaths`). So Tailwind v4 is wired via **PostCSS** instead: `@tailwindcss/postcss` in `postcss.config.mjs`, `@import "tailwindcss"` in `src/styles/global.css`. Do NOT re-add `@tailwindcss/vite`.
- **Tailwind v4** (no `tailwind.config.js`): tokens live in `global.css` `@theme` (font-bangla, spacing-touch=44px) and class-based dark via `@custom-variant dark`. Role colors use default Tailwind families directly (indigo/emerald/rose/amber/violet/sky/slate) — no custom palette needed.
- **Bangla font**: Google Fonts `<link>` in `Layout.astro` head (NOT @fontsource — its relative `url()` refs don't resolve in the static build). system-ui fallback.
- **Math**: KaTeX via CDN + auto-render in `Layout.astro` (`\( inline \)` / `$$ display $$`).
- **Phone frame**: `Layout.astro` centers a `max-w-[420px]` column (phone on desktop, full-width on mobile). Props: `title, id, rails, nav, active, pad`.
- Build check: `npm run build` (passes clean). Dev: `npm run dev` → localhost:4321.

## Build order
**Phase 0 — Scaffold — ✅ DONE:**
- [x] Astro 6 + Tailwind v4 (PostCSS) + TypeScript scaffolded; `npm run build` passes clean
- [x] §1.1 tokens in `global.css` `@theme` + class dark mode + `min-h-touch` (44px)
- [x] Bangla font (Noto Sans Bengali via Google Fonts) + base styles + reduced-motion
- [x] Shared components: `Layout`, `TopRails` (§1.2), `BottomNav` (§1.3), `Button`, `Card`, `Banner`, `Modal`, `Toast`, `Pill`, `ProgressBar`, `Why`, `FormulaFab`, state partials `Loading`/`Empty`/`ErrorState` (§1.5)
- [x] `src/pages/index.astro` — clickable directory of ALL 58 screens, grouped by zone A–I (prototype home) + `src/data/screens.js` registry
- [x] `npm run build` passes

**Phase 1 — Screens** (tick when the page exists, renders, and links from index):

Zone A — Getting in ✅
- [x] A1 Landing/Demo
- [x] A2 Login
- [x] A2.5 Account recovery
- [x] A3 Signup
- [x] A4 OTP/Consent
- [x] A5 Onboarding wizard
- [x] A6 Placement test
- [x] A7 Placement result
- [x] A8 Profile switcher

Zone B — Home ✅
- [x] B1 Dashboard

Zone C — Core loop ✅ (added SessionBar.astro shell)
- [x] C1 Session chooser
- [x] C2 Greeting + engage
- [x] C3 Explanation (5 modalities)
- [x] C4 Question card
- [x] C5 Answer feedback
- [x] C6 Hint ladder
- [x] C7 Smart moments (teach-back / study-buddy / transfer / self-explain / calibration)
- [x] C8 Notes panel
- [x] C9 Wellbeing banners
- [x] C10 Session controls
- [x] C11 End + reflection
- [x] C12 Session summary

Zone D — Assess ✅
- [x] D1 Mock setup
- [x] D2 Mock runner (FormulaFab)
- [x] D3 Scorecard
- [x] D4 Formula sheet (right-docked overlay)

Zone E — Review ✅
- [x] E1 History
- [x] E2 Replay
- [x] E3 Mistake log
- [x] E4 Calibration curve (inline SVG)
- [x] E5 Notes library + flashcards
- [x] E6 Worksheet export
- [x] E7 Concept search

Zone F — Motivation ✅
- [x] F1 Streak & freeze
- [x] F2 Badge wall
- [x] F3 Celebrations (overlay)
- [x] F4 Daily goal
- [x] F5 Annual recap

Zone G — System & utility ✅ (+ real 404.astro mirrors G1)
- [x] G1 Not-found
- [x] G2 Notifications center
- [x] G3 Invite / referral
- [x] G4 Feedback / bug report

Zone H — Trust & people ✅ (parent/teacher = separate audience: own header, no student nav)
- [x] H1 Report / Crisis (overlay)
- [x] H2 Help index
- [x] H3 Help article
- [x] H4 Settings
- [x] H5 Profile edit
- [x] H6 Notification preferences
- [x] H7 Data export & delete
- [x] H8 Parent weekly digest
- [x] H9 Parent dashboard + insight
- [x] H10 Teacher console
- [x] H11 Teacher assignment
- [x] H12 Legal

Zone I — Billing ✅
- [x] I1 Plans
- [x] I2 Payment
- [x] I3 Limit prompt (overlay)
- [x] I4 Invoices

**Phase 2 — Polish (after all screens): ✅**
- [x] dark-mode pass (class toggle + dark: variants on every component; persists via localStorage)
- [x] mobile (~390px) pass (phone-first `max-w-[420px]` column, ≥44px touch, ≤6 elements/view)
- [x] index complete + all links work (verified: 58/58 pages exist; 0 dead internal links)
- [x] `npm run build` clean (60 pages)

## Current next step
> **🎉 DONE + DEPLOYED.** All 58 screens + index + 404 = 60 pages. **Live: https://sakhawatdhrubo.github.io/edu-ai-mockup/** (GitHub Pages, auto-deploys on push to main). Local preview: `npm run dev` → localhost:4321. Future work = visual refinement, native-Bangla copy review, or converting screens to the real React app.

## Deploy notes
- Remote: `git@`/https `github.com/sakhawatdhrubo/edu-ai-mockup` (public). Push to `main` → workflow rebuilds + redeploys.
- Pages was enabled once via API (workflow GITHUB_TOKEN can't self-enable: "Resource not accessible by integration"). If Pages ever gets disabled, re-enable: Settings → Pages → Source = "GitHub Actions" (or `POST /repos/{o}/{r}/pages {"build_type":"workflow"}`).
- CI Node must be **22** (Astro 6 needs ≥22.12) — set in `.github/workflows/deploy.yml`.
- `BASE_PATH=/edu-ai-mockup/` in the workflow must match the repo name.

## Gotchas (read before writing screens)
- **Inline math/braces**: never write `\(F_{net}=0\)` directly in `.astro` markup — Astro parses `{net}` as an expression and the build errors. Use the `<Math tex="F_{net}=0" />` component (string prop → braces safe). `display` prop for block math.

## Log (append one line per session/batch — newest at top)
- 2026-06-05 — **C3 core-loop UX upgrade**: rebuilt explanation as chat-first with a *working* modality switcher (live swap) — interactive Socratic চ্যাট (scripted, suggested replies + free input + typing) + টেক্সট + ভিডিও (▶ reveals mandatory checkpoint) + অ্যানিমেশন (real CSS acceleration motion) + উদাহরণ; persistent ask-box + adaptive quick-actions. Inline JS in `c3-explanation.astro`. Spec C3 + Appendix B updated. Build clean (60 pages). Pushed → auto-deploy.
- 2026-06-05 — **DEPLOYED LIVE** → https://sakhawatdhrubo.github.io/edu-ai-mockup/ (HTTP 200, assets under subpath OK). Fixed 2 CI issues: Node 20→22 (Astro 6 needs ≥22.12); Pages enabled via API (token couldn't self-enable). Auto-deploys on push to main.
- 2026-06-05 — Added GitHub Pages deploy: `.github/workflows/deploy.yml` (withastro/action) + `astro.config` `base: process.env.BASE_PATH || '/'` + runtime link-shim in `Layout.astro` (prefixes absolute hrefs under the subpath; no-op locally). CI sets `BASE_PATH=/edu-ai-mockup/` — must match repo name. Local dev unaffected. Verified prod-sim build: assets + shim base = `/edu-ai-mockup/`. README has the push + enable-Pages steps.
- 2026-06-05 — Phase 2 polish done: verified 58/58 pages exist + 0 dead internal links; dark/mobile/KaTeX confirmed; final clean build (60 pages). **Mockup complete.**
- 2026-06-05 — Zones H+I done (H1–H12, I1–I4). Parent/teacher screens use own header (separate audience). **All 58 screens built**; build clean, 60 pages. → Phase 2 polish next.
- 2026-06-05 — Zones D+E+F+G done (D1–D4, E1–E7, F1–F5, G1–G4) + real `404.astro`. Build clean, 44 pages.
- 2026-06-05 — Zone B (B1) + Zone C (C1–C12) done + added `SessionBar.astro` (session shell via Layout `header` slot). Build clean, 23 pages.
- 2026-06-05 — Zone A done (A1–A8, 9 screens) + added `Math.astro` (KaTeX-safe braces). Build clean, 10 pages.
- 2026-06-05 — Phase 0 scaffold complete: Astro 6 + Tailwind v4 (PostCSS) + KaTeX + Bangla font; Layout + 13 shared components + index directory (58 screens) + screens.js registry; `npm run build` clean. (See "Stack notes" — Tailwind is PostCSS, not the vite plugin.)
