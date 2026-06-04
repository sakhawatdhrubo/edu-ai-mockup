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

## Build order
**Phase 0 — Scaffold (do first):**
- [ ] `npm create astro` (empty/minimal, TypeScript) + add `@astrojs/tailwind`
- [ ] `tailwind.config` tokens from §1.1 (indigo/emerald/rose/amber/violet/sky/slate roles) + dark mode + `min-h-touch`/`min-w-touch` (44px)
- [ ] Bangla font (Noto Sans Bengali) wired (Google Fonts or local) + base styles
- [ ] Shared components: `Layout`, `TopRails` (§1.2), `BottomNav` (§1.3), `Button`, `Card`, `Banner`, `Modal`, `Toast`, `Pill`, `ProgressBar`, state partials (Loading/Empty/Error per §1.5)
- [ ] `src/pages/index.astro` — clickable directory of ALL screens, grouped by zone A–I (this is the prototype home)
- [ ] confirm `npm run dev` serves + `npm run build` passes

**Phase 1 — Screens** (tick when the page exists, renders, and links from index):

Zone A — Getting in
- [ ] A1 Landing/Demo
- [ ] A2 Login
- [ ] A2.5 Account recovery
- [ ] A3 Signup
- [ ] A4 OTP/Consent
- [ ] A5 Onboarding wizard
- [ ] A6 Placement test
- [ ] A7 Placement result
- [ ] A8 Profile switcher

Zone B — Home
- [ ] B1 Dashboard

Zone C — Core loop
- [ ] C1 Session chooser
- [ ] C2 Greeting + engage
- [ ] C3 Explanation (5 modalities)
- [ ] C4 Question card
- [ ] C5 Answer feedback
- [ ] C6 Hint ladder
- [ ] C7 Smart moments (teach-back / study-buddy / transfer / self-explain / calibration)
- [ ] C8 Notes panel
- [ ] C9 Wellbeing banners
- [ ] C10 Session controls
- [ ] C11 End + reflection
- [ ] C12 Session summary

Zone D — Assess
- [ ] D1 Mock setup
- [ ] D2 Mock runner
- [ ] D3 Scorecard
- [ ] D4 Formula sheet (overlay)

Zone E — Review
- [ ] E1 History
- [ ] E2 Replay
- [ ] E3 Mistake log
- [ ] E4 Calibration curve
- [ ] E5 Notes library + flashcards
- [ ] E6 Worksheet export
- [ ] E7 Concept search

Zone F — Motivation
- [ ] F1 Streak & freeze
- [ ] F2 Badge wall
- [ ] F3 Celebrations (overlays)
- [ ] F4 Daily goal
- [ ] F5 Annual recap

Zone G — System & utility
- [ ] G1 Not-found
- [ ] G2 Notifications center
- [ ] G3 Invite / referral
- [ ] G4 Feedback / bug report

Zone H — Trust & people
- [ ] H1 Report / Crisis (overlay)
- [ ] H2 Help index
- [ ] H3 Help article
- [ ] H4 Settings
- [ ] H5 Profile edit
- [ ] H6 Notification preferences
- [ ] H7 Data export & delete
- [ ] H8 Parent weekly digest
- [ ] H9 Parent dashboard + insight
- [ ] H10 Teacher console
- [ ] H11 Teacher assignment
- [ ] H12 Legal

Zone I — Billing
- [ ] I1 Plans
- [ ] I2 Payment
- [ ] I3 Limit prompt (overlay)
- [ ] I4 Invoices

**Phase 2 — Polish (after all screens):**
- [ ] dark-mode pass · [ ] mobile (~390px) pass on every page · [ ] index complete + all links work · [ ] `npm run build` clean

## Current next step
> **Start Phase 0 — scaffold the Astro project.** Nothing built yet.

## Log (append one line per session/batch — newest at top)
- (empty — first build session writes here)
