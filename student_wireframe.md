# Student UI Wireframe — Build Spec

*Onnorokom EduAI · SSC (→ HSC) AI Tutor · Bangla-first · Phone-first*
*The single, canonical wireframe. Standardized so every student-facing screen can be built as an HTML/Tailwind mockup directly from its block. Update this file in place — do not spawn new wireframe files.*

---

## 0. How to use & edit this file

**Goal:** one standardized entry per screen, build-ready. A designer (or a code agent) reads one screen block and produces one HTML/Tailwind page from it — no other context needed.

**Every screen follows the same template** (copy it to add a screen; pick the next free ID, e.g. insert `C4.5` between `C4` and `C5`):

```
### [ID] Screen name
`route` — one-line purpose. **From:** where the student arrives from.
**Layout:** ASCII sketch (key screens) or one-line arrangement.
**Blocks (top→bottom):** table — # · block · what shows (with Bangla copy) · variants.
**Actions:** control → destination.
**States:** loading · empty · error · conditional.
```

**Build status (minimal, non-blocking):** unmarked = exists today; **⊕** = to build (planned or new). For mockups, **build everything** — the marker is informational only, never a gate.

**Editing rules:** screens are self-contained — edit one without touching others. Shared UI (header, buttons, cards, states, colors) lives once in §1 and is referenced, so a global change is one edit. Log notable changes in **Appendix B**.

---

## Table of contents

- **§1 Global shell & shared patterns** — rails, nav, components, states, visual language, design rules & anti-patterns (§1.6), privacy boundaries (§1.7) — read first
- **§2 Sitemap** — how screens connect
- **§3 Screens**
  - **A · Getting in** — A1 Landing/Demo · A2 Login · A2.5 Recovery · A3 Signup · A4 OTP/Consent · A5 Onboarding · A6 Placement · A7 Placement result · A8 Profile switcher
  - **B · Home** — B1 Dashboard
  - **C · Core loop** — C1 Chooser · C2 Greeting/Engage · C3 Explanation · C4 Question · C5 Feedback · C6 Hint ladder · C7 Smart moments · C8 Notes · C9 Wellbeing · C10 Controls · C11 End/Reflect · C12 Summary
  - **D · Assess** — D1 Mock setup · D2 Mock runner · D3 Scorecard · D4 Formula sheet
  - **E · Review** — E1 History · E2 Replay · E3 Mistake log · E4 Calibration · E5 Notes library · E6 Worksheet export · E7 Concept search
  - **F · Motivation** — F1 Streak · F2 Badge wall · F3 Celebrations · F4 Daily goal · F5 Annual recap
  - **G · System & utility** — G1 Not-found · G2 Notifications · G3 Invite · G4 Feedback/bug
  - **H · Trust & people** — H1 Report/Crisis · H2 Help index · H3 Help article · H4 Settings · H5 Profile edit · H6 Notifications · H7 Data/delete · H8 Parent digest · H9 Parent dashboard · H10 Teacher console · H11 Teacher assign · H12 Legal
  - **I · Billing** — I1 Plans · I2 Payment · I3 Limit prompt · I4 Invoices
- **Appendix A** — behind-the-scenes helpers (informs personalization copy)
- **Appendix B** — change log
- **Appendix C** — Bangla copy deck (verbatim strings for mockups)

---

## §1 Global shell & shared patterns

### 1.1 Visual language (Tailwind tokens)

- **Colors (role → Tailwind family):** primary/active → `indigo` · success/correct/verified → `emerald` · error/wrong → `rose` · warning/nudge → `amber` · special unlock → `violet` · info → `sky` · neutral → `slate`. Every color needs a **dark-mode** variant.
- **Type:** Bangla `Noto Sans Bengali`/`SolaimanLipi`, relaxed line-height; bold headings; mono only for debug (hidden from students).
- **Shape:** cards = white, `border-slate-200`, `rounded-md`, `p-4`; tinted cards reuse the role color (`-50` bg + `-200` border).
- **Touch:** every control ≥ 44px (`min-h-touch`). One primary action per screen.
- **Motion:** purposeful only (bar fill, level-up, repair); all gated by `prefers-reduced-motion`.
- **Icons:** 🔥streak · 🎯goal · 📝mock · 📜history · 🗂notes · 📘formula · 🔊read-aloud · 🎤voice · 🌙dark · 🔔notify · 🔍search · ✓verified · ✗wrong · ✨unlock · ⓘinfo · ⚠report.

### 1.2 Global rails — top bar (every logged-in screen)

```
┌──────────────────────────────────────────────────────────────┐
│ edu-ai   🔍   🔔3   🌙   🔊   বাংলা▾        🔥7    [প্রোফাইল ▾] │
└──────────────────────────────────────────────────────────────┘
```
- Left: logo → Home. Center/right utilities: **🔍 search** (→ E7) ⊕ · **🔔 notifications** (dropdown) ⊕ · **🌙 dark-mode** ⊕ · **🔊 read-aloud default** ⊕ · **বাংলা▾ language** (bangla/mixed/english) ⊕ · **🔥 streak** badge · **প্রোফাইল▾** menu (My Account, Settings, Help, Logout).
- **Mobile:** utilities collapse into a ☰ menu; streak stays visible.

### 1.3 Global rails — bottom nav (mobile only)

`[ 🏠 হোম ] [ ▶ পড়া ] [ 📝 মক ] [ 🗂 নোট ] [ 📜 ইতিহাস ]` — 5 fixed tabs; active tab indigo.

### 1.4 Shared components

- **Button:** primary (indigo fill) · secondary (indigo outline) · ghost (text) · danger (rose). Loading label swaps in place (e.g. "জমা দাও" → "জমা হচ্ছে…", disabled).
- **Card / Banner / Modal / Toast / Pill / Progress-bar / Tabs / Accordion** — standard; tinted by role color.
- **Read-aloud control** ⊕ — a 🔊 on any text block; toggles TTS for that block.
- **Math** — KaTeX inline/block; never leak raw `$`.

### 1.5 Shared states (reference these by name)

- **Loading:** skeleton shimmer (24px rows) + "লোড হচ্ছে…".
- **Empty:** friendly line + one CTA to the next action (never a dead empty box).
- **Error:** rose inline text + retry; widget-level, never whole-page crash.
- **Offline** ⊕: amber top banner "অফলাইন — practice চলবে, উত্তর পরে sync হবে"; queued actions replay on reconnect.
- **Toast:** transient confirmation, bottom-center, ~3s.

### 1.6 Design rules & anti-patterns (bake into every screen)

- **Priority when rules conflict:** pedagogy > engagement > speed > polish.
- **Phone-first hard limits:** ≤ 6 elements per view · no hover-only states (touch) · never autoplay video+audio · onboarding ≤ 5 screens · target FCP ≤ 2s / TTI ≤ 4s · lazy-load video.
- **Transparency:** every system decision exposes a tappable **"কেন?"** (why) → plain-Bangla reason (progressive disclosure, not hidden).
- **Mastery display:** raw % is neutral slate (never the headline); color only on the skill-tier badge (অনুসন্ধানী→শিক্ষানবিস→অনুশীলনকারী→দক্ষ→মাস্টার). Tooltip example: "৭০% শক্ত — 'মাস্টার' হতে transfer task দরকার।"
- **Streak tone:** emerald on return; **never red/rose for a break**; freeze quietly, no shame.
- **Bangla:** author native Bangla; introduce an English term once in parens ("ভেক্টর (vector)") then Bangla freely; never romanize; everyday tone ("কেমন আছো?") not stiff.
- **Reject (anti-patterns):** fake points/badges without learning · public leaderboards · streak-break punishment · speed-only rewards · FOMO notifications · pop-ups that block the learning surface · dark-pattern paywalls/cancellation · emoji as the *only* signal (always pair with text/icon).

### 1.7 Privacy boundaries (parent & teacher surfaces)

| Audience | CAN see | CANNOT see |
|---|---|---|
| Parent | mastery as skill-titles, streak, sessions + minutes, misconceptions (plain Bangla), time-of-day pattern | specific wrong answers, teach-back text, reflection journal, raw question history |
| Teacher | per-outcome mastery, active misconceptions (Bangla), session duration + last-active, chapter mastery % | specific wrong answers, teach-back text, reflection text, parent contact, payment details |

Framing rule: **partner, not surveillance** — no public student/class comparison, no alarmist copy, bad weeks shown privately + constructively.

---

## §2 Sitemap

```
PUBLIC                LOGGED-IN
Landing A1            Home B1 ─┬─► Session chooser C1 ─► Core loop C2…C11 ─► Summary C12 ─► Home
 ├ Demo (no login)    │        ├─► Mock setup D1 ─► Runner D2 ─► Scorecard D3 ─► (drill)► C*
 ├ Login A2           │        ├─► History E1 ─► Replay E2
 ├ Signup A3 ─► OTP   │        ├─► Mistake log E3 · Calibration E4 · Notes E5 · Worksheet E6
 │   /Consent A4 ─►   │        ├─► Concept search E7 ─► Chooser C1
 │   Onboarding A5 ─► │        ├─► Streak F1 · Badges F2 · Daily goal F4 · Annual recap F5
 │   Placement A6 ─►  │        ├─► Help H2/H3 · Settings H4 (Profile H5 · Notify H6 · Data H7)
 │   Result A7 ─► Home│        └─► Billing I1 ─► Payment I2 · Invoices I4
 ├ Help H2/H3         │        └─► Utility (profile/🔔): Notifications G2 · Invite G3 · Feedback G4
 ├ Legal H12          Overlays anywhere: Formula D4 · Report/Crisis H1 · Celebrations F3 · Limit prompt I3
 └ Parent digest H8   Separate audiences: Parent dashboard H9 · Teacher console H10/H11
                      Any bad URL → Not-found G1
```

---

## §3 Screens

> Convention reminder: `route` · **From** · **Layout** · **Blocks** · **Actions** · **States**. ⊕ = to build.

---

### A · Getting in

#### A1 Landing / Demo ⊕
`/` (public) — Sell the promise in 15s; let a visitor *feel* the tutor before signup. **From:** ad, referral link, search.
**Layout:** hero headline + 60s video; "try it" + "start free"; trust strip.
**Blocks:** 1·Hero — Bangla one-liner + **[ ফ্রি-তে শুরু করো ]** + **( লগইন )**. 2·Demo — **[ লগইন ছাড়াই দেখো ]** → canned mini-session. 3·How-it-works — 3 icons (learn / practice / track). 4·Trust — "Bangla-first · phone-first · পরীক্ষার জন্য". 5·Referral note "বন্ধু আমন্ত্রণ করেছে?".
**Actions:** ফ্রি-তে শুরু → A3 · লগইন → A2 · দেখো → demo session (sandbox of C2–C5, no account).
**States:** default.

#### A2 Login
`/login` (public) — Sign in. **From:** A1, logout, any auth-required redirect.
**Blocks:** 1·Logo. 2·Form — "ফোন বা ইমেইল" + "পাসওয়ার্ড" + **[ লগইন করুন ]**. 3·Links — ( রেজিস্টার ) · ( পাসওয়ার্ড ভুলে গেছো? ).
**Actions:** লগইন → B1 (or A4 if consent pending) · ভুলে গেছো → OTP reset ⊕ · রেজিস্টার → A3.
**States:** error (wrong creds, inline rose) · loading.

#### A2.5 Account recovery ⊕
`/recover` (public) — Escalating recovery so a lost device never locks a student out. **From:** A2 "পাসওয়ার্ড ভুলে গেছো?".
**Blocks:** 1·Forgot password → phone **SMS OTP** → set new password (retry rate-limited + countdown). 2·Lost phone → reset via email (if on file). 3·Lost phone **and** SIM → support ticket with identity check (নাম · school · জন্মতারিখ · last session). 4·"নতুন device-এ একই নম্বরে login" → data restores from account.
**Actions:** verify → reset → A2/B1.
**States:** OTP sent / wrong / locked · email sent · ticket submitted.

#### A3 Signup
`/register` (public) — Create account (phone-as-username). **From:** A1/A2.
**Blocks:** 1·Form — নাম · ফোন · অভিভাবকের ফোন (minor) · বয়স · পাসওয়ার্ড. 2·**[ রেজিস্টার ]**. 3·( ইতিমধ্যে account আছে? লগইন ).
**Actions:** রেজিস্টার → A4 (OTP) → consent if <18.
**States:** validation per field · phone-format check ⊕ · error.

#### A4 OTP / Consent
`/consent` (public) — Verify phone + parental consent for minors. **From:** A3.
**Blocks:** 1·OTP — 6-box code + ( আবার পাঠাও ) with countdown ⊕. 2·Consent — plain-Bangla data-use note + links to Legal (H12) + **[ সম্মত ও চালিয়ে যাও ]**. 3·Offline-parent path ⊕ ("অভিভাবক পরে সম্মতি দেবেন").
**Actions:** verify+agree → A5.
**States:** OTP wrong/expired · resend rate-limit.

#### A5 Onboarding wizard ⊕
overlay after consent — From signup to first session < 10 min; collect identity, *then* tour. **From:** A4. (Replaces today's data-blind first-login tour.)
**Layout:** stepper, one choice per screen, "set later" on each.
**Blocks:** 1·নাম confirm. 2·শ্রেণি/grade. 3·ভাষা (বাংলা/mixed/english). 4·default modality — 1-tap sample of each (ভিডিও/টেক্সট/উদাহরণ/প্রশ্নোত্তর/অ্যানিমেশন). 5·🔊 read-aloud on/off. 6·লক্ষ্য (পাস / A+ / আত্মবিশ্বাস). 7·পরীক্ষার তারিখ → feeds exam countdown. 8·**[ Placement শুরু করি → ]**.
**Actions:** finish → A6 · skip any → sensible default.
**States:** progress N/8 · skip/set-later.

#### A6 Placement test
`/placement` — Adaptive diagnostic to set starting level. **From:** A5, Home (retake ⊕).
**Blocks:** 1·Intro — "🎯 Placement · ~১০ মিনিট" + progress hint + ( skip ) ⊕. 2·**[ Placement শুরু করো ]**. 3·Progress bar "X / Y প্রশ্ন". 4·Question card (adaptive). 5·**[ জমা দিন ]**.
**Actions:** submit each → next adapts · skip → Home (warm-up mode).
**States:** not-started · running · submitting · mid-test save on disconnect ⊕ · already-done (one-time today; **vision: retake after cooldown** ⊕).

#### A7 Placement result
`/placement` (result state) — Student-friendly level read-out + first goal. **From:** A6.
**Blocks:** 1·Result — "তুমি Motion-এ মাঝামাঝি" + starting topic, plain Bangla ⊕. 2·**[ টিউটর সেশন শুরু করো → ]**. 3·( ড্যাশবোর্ডে যাও ).
**Actions:** start → C1/C2 · dashboard → B1.

#### A8 Profile switcher (shared family phone) ⊕
on app open — One Android phone is often shared; keep each learner's progress separate. **From:** app launch when >1 profile exists on the device; profile menu "প্রোফাইল বদলাও".
**Blocks:** 1·"কে পড়বে?" + profile cards (name + face + "সর্বশেষ active") · **[ + নতুন প্রোফাইল ]**. 2·Optional per-profile **PIN** (older students).
**Actions:** pick profile → B1 (their own state; no data bleed) · add → A3.
**States:** single-profile → skipped · PIN wrong.

---

### B · Home

#### B1 Dashboard
`/me` — Launchpad: one obvious next action + glanceable progress + smart recommendations. **From:** login, end of any flow, logo tap.
**Layout:**
```
┌──────────────────────────────────────────────────────────────┐
│ [global rails — §1.2]                                          │
│  শুভ সন্ধ্যা, রিফাত 🌙   (time-aware, references yesterday)     │
│  ┌ আজকের লক্ষ্য ▓▓░ ০/১ ┐   ┌ পরীক্ষা পর্যন্ত: ৪২ দিন · on-track ┐│
│  ┏━━━━━━━━ HERO ━━━━━━━━┓                                       │
│  ┃ ▶ আজকের পড়া শুরু করো ┃  Acceleration · ১৫ মিনিট  (অন্য বেছে নাও)│
│  ┗━━━━━━━━━━━━━━━━━━━━━┛                                       │
│  «🟠 পুনঃ-পরীক্ষা: ৩টি (শুরু→)»   «🟢 মক রেডি! [দাও]»            │
│  ┌ 🎯 আমার অগ্রগতি ───┐   ┌ 🧠 ভুল-বোঝা heatmap ──┐            │
│  │ Acceleration ▓▓▓▓▓░ দক্ষ✓│ │ mass↔weight ▇▇▇░ (fix)│           │
│  └──────────────────┘   └──────────────────────┘            │
│  দ্রুত যাও: 📝মক  📜ইতিহাস  📘ফর্মুলা  🗂নোট  🔎খুঁজি           │
└──────────────────────────────────────────────────────────────┘
```
**Blocks:** 1·Greeting (time-aware, yesterday-ref) ⊕. 2·Daily-goal card ⊕. 3·Exam-countdown + regime badge ⊕. 4·**HERO "আজকের পড়া শুরু করো"** (planner pick + "অন্য concept বেছে নাও"). 5·Recommendation banners — retention-due · mock-ready · "review before you forget" ⊕ (dismissible, dedup-stacked). 6·Mastery card — bars + Bangla skill-title (অনুসন্ধানী→শিক্ষানবিস→অনুশীলনকারী→দক্ষ→মাস্টার) + ✓ transfer-verified; **tappable → drill** ⊕. 7·Misconception heatmap — colored bars (green=repaired … rose=active), tap→drill, **📜 visible "timeline" label** (not emoji-only) ⊕. 8·Quick-launch row.
**Actions:** HERO → C2 · choose another → C1 · banner → C*/D1 · mastery bar → C* ⊕ · heatmap bar → C* · quick row → D1/E1/D4/E5/E7.
**States:** new student (empty progress + single "শুরু করো") · loading · widget error.

---

### C · Core learning loop (the heart — most design attention)

> **Session shell (persistent across C2–C11):** one page, no full-screen jumps — the active panel swaps in place. A slim top bar always shows: **phase indicator** ("ধাপ ৪ · প্রশ্ন ৩/১০", or dots greet · warmup · engage · explain · practice · transfer · teach-back · summary) · **session timer** · **modality switcher** · **📘 formula** · **◼ pause**. Companion/wellbeing banners (C9) mount only when triggered. Loading shows an estimate when >2s ("ব্যাখ্যা তৈরি হচ্ছে… ~৩s").

#### C1 Session chooser — three honest options ⊕
`/tutor` (start gate) — Don't silently reroute around missing prerequisites; offer a choice. **From:** Home HERO/banner, search, drill link.
**Blocks:** 1·Resume prompt (if paused) — "আগের session আছে?" **[ চালিয়ে যাও ]** ( নতুন ). 2·Planner pick — "✨ সুপারিশ: Acceleration". 3·Three options: **[ সরাসরি শুরু ]** · **[ দ্রুত prereq কভার ]** · **[ পুরো prereq chapter আগে ]**. 4·Mode toggles when eligible — interleaved · retrieval-first ⊕. 5·Topic browser (accordion, multi-chapter) with mastery + ✨ recommendation.
**Actions:** any option → C2 · resume → C2 (hydrated) · pick topic → C2.
**States:** single-chapter → skip straight to C2 (quick-start) · no profile error · no content error.

#### C2 Session — greeting + engage
`/tutor` (active) — Frame *why this topic*, then prime with a prediction. **From:** C1.
**Blocks:** 1·Greeting (3-beat, remembers yesterday) + "কেন এই concept" rationale chip ⊕. 2·Engage — hook + **prediction question** committed before teaching ⊕. 3·Warm-up banner (if placement skipped, first 3 Q).
**Actions:** commit prediction → reveals C3.
**States:** loading greeting · companion banner may mount (C9).

#### C3 Session — explanation panel (5 modalities)
within `/tutor` — Teach the concept; student controls how. **From:** C2 / modality switch.
**Layout:** modality switcher (label **"অন্যভাবে বুঝতে চাও?"**; bottom-slide modal of 5 options, current highlighted, tap-outside dismiss) over a streaming content area. Switching re-renders the *same* outcome and does **not** change the saved preference.
**Blocks:** 1·Modality switcher — **প্রশ্নোত্তর(চ্যাট) · টেক্সট · ভিডিও · অ্যানিমেশন · উদাহরণ** (live switch, no reload; **chat-first** — interactive Socratic chat is the core teaching surface where the under-the-hood agents adapt to the student; the rest are alternates. Each modality renders as real UI in the mockup. Default = preference, not locked). 2·Content (streams live): **text** = Bangla prose+math · **video** = player (preload none, CC on by default, 2× speed, "আরেকবার দেখতে চাও?" replay) **+ mandatory checkpoint question after playback** (no passive watching) · **animation** = embed + 2–3 try-prompts · **worked-example** = collapsible ধাপ cards (each = action-verb step + one-line "কেন"; novices see all, masters hide more) → "চলো অনুশীলন করি" · **socratic** = prompt list → "এই concept নিয়ে আলোচনা করি" → 8-turn chat (exits on "বুঝলাম"). 3·🔊 read-aloud each block ⊕. 4·**[ এটা ছবি দিয়ে দেখাও ]** on-demand visual ⊕. 5·CTAs — ( আরো একটা ব্যাখ্যা পাও ) (≤3×) · multi-rep bridge auto-offer (shown together, not swapped) ⊕ · ( ⚠ Report ).
**Actions:** switch modality → re-stream same outcome · alt → new angle · visual → generated diagram · report → H1.
**States:** streaming skeleton · stream error+retry · **fallback chain** when a modality is missing (video→animation→text · animation→video→text · socratic→worked-example→text; **text is always the canonical fallback**), e.g. "ভিডিও এখনো নেই — টেক্সট দেখি?" · cost-downgrade one-shot notice.

#### C4 Session — question card
within `/tutor` — One question, the right input, confidence. **From:** C3.
**Blocks:** 1·"প্রশ্ন · [level]" + **ⓘ "কেন এই প্রশ্ন?"** tooltip. 2·Stem (Bangla+math, optional image). 3·Input — MCQ rows (A–F) · numerical field ("উদাহরণ: 12.5", unit) · subjective textarea **+ 🎤 voice input** ⊕. 4·Confidence 1–5 dial (default 3). 5·**[ জমা দাও ]**. 6·Struggle gate — hints unlock only after ~20s/attempt ⊕.
**Actions:** submit → C5.
**States:** input-validation disables submit · submitting · submit-error inline retry.

#### C5 Session — answer feedback
within `/tutor` — Verdict + teach. **From:** C4 submit.
**Blocks:** 1·Header — green **"✓ সঠিক!"** / rose **"✗ ভুল"** + live mastery % + skill-title. 2·Bangla feedback + encouragement pill. 3·**Wrong path:** confront-pattern reteach ("অনেকে ভাবে X, আসলে Y, কারণ Z") + **[ একই type-এর আরেকটা প্রশ্ন ]** (fully answerable — fix dead loop) ⊕. 4·Smart-moment slot → C7 (one at a time). 5·Footer **[ পরের প্রশ্ন → ]** (or graceful end one-liner).
**Actions:** next → C4 · similar → inline retry · smart moment → C7.
**States:** correct · wrong+reteach · topic-exhausted (→ C11/C12).

#### C6 Session — hint ladder
within `/tutor` — Scaffolded help with a visible, fair cost. **From:** always present while a question is active.
**Blocks:** 1·"হিন্ট সিঁড়ি · স্তর N/4". 2·Four rungs — নাজ ×1.0 · হিন্ট ×0.7 · ওয়ার্কড উদাহরণ ×0.4 · পূর্ণ সমাধান ×0.1 (scaled by pace; slow pays less). 3·**[ পরের হিন্ট ]** (fast-pace: "Hint 2 এ যাও"). 4·👍/👎 per hint.
**Actions:** reveal next rung · rate.
**States:** all-revealed ("সব হিন্ট শেষ") · slow-pace one-shot tooltip "penalty কম রাখা হলো".

#### C7 Session — smart moments (conditional)
within `/tutor` — The adaptive magic; never two at once. **From:** C5 conditions.
**Blocks (one of):**
- **Teach-back** (≈3 correct, 24h cooldown) — "বন্ধুকে কীভাবে বোঝাবে?" textarea **+ 🎤** ⊕ · **[ জমা দিন ]** · ( এখন না ) → verdict স্কোর X/৩ + mastery delta.
- **Study Buddy teach-back** ⊕ — explain to a friendly simulated peer who asks one naive follow-up.
- **Transfer challenge** (mastery hits 0.79 cap) — violet card "চ্যালেঞ্জ গ্রহণ করো" → **real-world prompt shown** ⊕ (fix blank prompt) → textarea (≥80 char) → verdict; pass → bar 79%→85% + ✨ Transfer-verified.
- **Self-explanation** (every 3rd correct) — "কেন এটাই উত্তর?" ⊕.
- **Calibration check** — confidence-vs-accuracy mirror + gentle mismatch banner ⊕.
- **Failure-driven modality switch** (2 wrong) — "চলো অন্যভাবে দেখি" ⊕.
**Actions:** submit/accept → verdict → **[ চালিয়ে যাও ]** · skip → C4 next.
**States:** offer · writing · verifying · pass/fail (retry ≤3 for transfer).

#### C8 Session — notes panel ⊕
slide-out within `/tutor` — Capture learning without a blank page. **From:** 🗂 button.
**Blocks:** 1·Auto-draft summary + flashcards (Scribe) ⊕. 2·Highlight-to-save from explanations. 3·Free note textarea. 4·"এই outcome-এর সব নোট" link → E5.
**Actions:** save → persists to Notes library (E5).
**States:** empty (auto-draft offered) · saved toast.

#### C9 Session — wellbeing & companion banners
within `/tutor` — Light, dismissible nudges. **From:** server cadence, once/session.
**Blocks:** banner kinds — streak-offer (rose) · wellbeing (violet) · fatigue (amber, suggest break) · distributed-practice (sky). **Pause-on-hover; dismissible** (fix too-fast 10s) ⊕.
**Actions:** dismiss ✕ (silenced for session).

#### C10 Session — controls
within `/tutor` — Stay in control of the session. **From:** header/right.
**Blocks:** 1·**◼ Pause / ▶ Resume** (reliable restore) ⊕. 2·Session timer + near-cap warning ⊕. 3·**[ আজকের মতো শেষ করি ]** graceful end ⊕ (fix "no end-now"). 4·Auto-save indicator.
**Actions:** pause · end → C11.
**States:** active · paused · quit-confirm modal ⊕.

#### C11 Session — end + reflection ⊕
within `/tutor` → leads to C12 — Close the loop with a reflection that carries forward. **From:** topic exhausted or "শেষ করি".
**Blocks:** 1·"আজ কী শিখলাম?" reflection field (carries to tomorrow's greeting). 2·Auto-summary preview (Scribe). 3·**[ সারাংশ দেখো → ]**.
**Actions:** → C12.

#### C12 Session summary
`/session/:id/summary` — Recap + a *real* next step. **From:** C11 (auto-navigate).
**Blocks:** 1·AI headline (or "সেশন সারাংশ") + ( ড্যাশবোর্ডে যাও ). 2·Recap card — what you did, strengths, focus next, numbers. 3·**"পরের পদক্ষেপ"** buttons — **deep-link to the actual drill/topic** (fix dead-end to Home) ⊕. 4·Deferred-goal CTA (🎯). 5·Streak/level changes shown here ⊕.
**Actions:** next-step → C* specific · deferred goal → C1 · dashboard → B1.
**States:** loading · success · fallback "সেশন শেষ! ড্যাশবোর্ডে ফিরে যাও।".

---

### D · Assess & rehearse

#### D1 Mock exam setup
`/mock` — Pick an exam to rehearse. **From:** Home, mock banner, scorecard "আরেকটি".
**Blocks:** 1·"📝 মক পরীক্ষা". 2·Preset grid — single-chapter (10–15Q/30m) · multi-chapter (25Q/60m) ⊕ · full (50Q/90m, no pause) ⊕; locked presets greyed + reason. 3·Confirm modal — "প্রস্তুত? ⚠️ মাঝপথে থামানো যাবে না। {N} মিনিট।" **[ শুরু করুন ]** ( বাতিল ).
**Actions:** preset → confirm → D2.
**States:** loading/error · locked presets.

#### D2 Mock exam runner
`/mock` (running) — Real-exam conditions. **From:** D1.
**Blocks:** 1·Sticky header — ⏱ countdown (server-anchored) · "প্রশ্ন {i}/{n}" · **[ জমা দিন ]**. 2·Question (MCQ/text), no hints, no feedback. 3·**◀ আগের / পরের ▶** free nav. 4·📘 formula sheet (D4, auto-available).
**Actions:** navigate · submit early / auto-submit at 0 → D3.
**States:** running · submit-error retry · auto-submit.

#### D3 Mock scorecard
`/mock` (result) — Honest performance read-out + drill path. **From:** D2.
**Blocks:** 1·"ফলাফল" — score X/Y (Z%) + auto/manual note. 2·Per-outcome table (আউটকাম/সঠিক/মোট) + time-per-Q ⊕. 3·Misconception flags from wrong patterns ⊕. 4·Weak-topic "Drill {topic}" pills → feed next review queue. 5·Cohort comparison "top 25%" ⊕ (data-gated). 6·**[ আরেকটি মক ]** ( ড্যাশবোর্ড ).
**Actions:** drill → C* · another → D1.
**States:** computing · result.

#### D4 Formula sheet
overlay (slide-in from the right, ~`max-w-md`) — Quick formula reference; study aid + mock realism (mirrors the formula sheet allowed in the real SSC exam). **From:** a floating round **"📘 ফর্মুলা"** button (bottom-right, emerald) on any session (C*) and mock (D2); Esc or ✕ closes. The page underneath stays untouched.
**Layout:** right-docked scrollable panel over the current screen.
**Blocks (top→bottom):**
| # | Block | Shows | Variants |
|---|-------|-------|----------|
| 1 | Header | "📘 ফর্মুলা" + ✕ close | — |
| 2 | Scope toggle | ☐ "সব অধ্যায়" (show all chapters) | shown only when a chapter is in scope; default = current chapter, checked = all |
| 3 | Mock notice | "🎓 মক পরীক্ষায় ফর্মুলা শিট দেখা যাচ্ছে — কেবল রেফারেন্সের জন্য।" (amber) | mock only; panel auto-opens once |
| 4 | Formula list | one row each: **নাম (বাংলা)** + (English name) · KaTeX block expression · "একক: {unit}" (if any) · optional context note (KaTeX) | scrollable, sorted by chapter order |
**Actions:** toggle "সব অধ্যায়" → filter current-chapter vs all · close → returns to the exact prior spot (never pauses the mock clock).
**States:** loading "লোড হচ্ছে…" · error "ফর্মুলা লোড করা যাচ্ছে না।" · empty "কোনো ফর্মুলা পাওয়া যায়নি।" · open/closed.

---

### E · Review & memory (cram-before-exam toolkit)

#### E1 History
`/history` — List of past sessions & mocks. **From:** quick row, bottom nav.
**Blocks:** 1·"📜 ইতিহাস" + back. 2·**Filter (মক/সেশন) · search · pagination** ⊕ (fix one-long-page). 3·Rows — icon + topic/preset · date · score (mock) / duration+complete (session).
**Actions:** row → E2.
**States:** empty ("কোনো সেশন নেই" + start CTAs) · loading · error.

#### E2 Session replay
`/history/:id` — Read-only timeline of a session. **From:** E1.
**Blocks:** step timeline — questions, answers, grading, hints, reteach, misconceptions, timestamps; mock = summary.
**Actions:** back → E1.
**States:** loading/error.

#### E3 Weekly mistake log ⊕
`/review/mistakes` — 4-week rolling list of what went wrong. **From:** quick row, Home.
**Blocks:** grouped by misconception · per item "fix it now" → C*. 4-week history.
**Actions:** fix → C*.

#### E4 Calibration curve ⊕
`/review/calibration` — Confidence vs accuracy over weeks. **From:** review.
**Blocks:** line/scatter chart + plain-Bangla read ("একটু overconfident").

#### E5 Notes library + flashcards ⊕
`/notes` — All saved notes + auto-flashcards. **From:** 🗂 quick row, C8.
**Blocks:** 1·Search/filter by outcome. 2·Note list (highlights + free notes). 3·Flashcard swipe-review mode (auto-generated). 
**Actions:** open note · review deck.

#### E6 Worksheet / PDF export ⊕
`/export` — Print questions for offline/paper practice. **From:** review, settings.
**Blocks:** pick N questions + answer-key toggle → **[ PDF বানাও ]**.

#### E7 Concept search ⊕
`/search` — Find any concept fast. **From:** 🔍 rail, quick row.
**Blocks:** search field → results (Bangla+English name + mastery + **[ শুরু করো ]**).
**Actions:** result → C1.

---

### F · Motivation & identity (pedagogy-first, not slot-machine)

#### F1 Streak & freeze
inline + `/streak` — Reward consistency, honestly. **From:** rail badge.
**Blocks:** 🔥 N-day · 2 freezes/month · **visible freeze marker** ("১টা freeze ব্যবহার হলো — streak বাঁচলো") ⊕ + calendar. 
**States:** active · frozen ⊕ · broken.

#### F2 Badge wall / milestones ⊕
`/badges` — Earned achievements. **Blocks:** milestone badges (30/100/365 days, transfer-verified, chapter-master) + locked previews.

#### F3 Celebrations (overlays)
anywhere — Brief, tasteful flourish. **Blocks:** level-up overlay (new skill-title at 0.2/0.4/0.6/0.8) ⊕ · repair celebration when misconception flips. All respect reduced-motion. (No sound today; opt-in chime later ⊕.)

#### F4 Daily goal ⊕
card on Home — Tiny self-set target. **Blocks:** set on first daily visit ("আজ ১টা session") · progress in greeting · evening nudge if unmet.

#### F5 Annual / term recap ⊕
`/recap` — Shareable "your learning" card for pride + word-of-mouth. **Blocks:** stats + highlights + share image.

---

### G · System & utility

#### G1 Not-found / broken link ⊕
`/*` (unknown route) — Friendly recovery so a bad/expired link never disorients. **From:** old/wrong/expired URL. *(Today the app silently redirects unknown → `/me`; vision shows a real page.)*
**Blocks:** 1·Small illustration + "এই page পাওয়া গেল না"। 2·"হয়তো link পুরোনো বা ভুল।" 3·**[ হোমে ফিরে যাও ]** · ( সাহায্য কেন্দ্র )。
**Actions:** home → B1 · help → H2.
**States:** default.

#### G2 Notifications center ⊕
`/notifications` — All alerts in one place (the 🔔 rail opens a short dropdown; this is the full list). **From:** 🔔 rail · "সব দেখো".
**Blocks:** 1·"🔔 নোটিফিকেশন" + ( সব পড়া হিসেবে চিহ্নিত করো )। 2·Grouped list — review-due · streak · mock-ready · parent-reply · system; each row: icon + Bangla text + time + unread dot. 3·Quiet-hours note → H6.
**Actions:** row → its destination · mark-all-read.
**States:** empty "কোনো নতুন notification নেই" · loading.

#### G3 Invite a friend / referral ⊕
`/invite` — Student shares the app (growth loop). **From:** profile menu, annual recap (F5), Home.
**Blocks:** 1·"বন্ধুকে আমন্ত্রণ করো" + reward line ("দুজনেই ৭ দিন Pro পাবে")। 2·Referral code + **[ কপি করো ]** + share buttons (WhatsApp / Messenger / SMS)। 3·Invited-friends status list.
**Actions:** copy / share.
**States:** default · copied toast.

#### G4 Feedback / bug report ⊕
`/feedback` — Report a bug or request a feature. **From:** profile menu, Help (H2), Report modal "অন্য সমস্যা"।
**Blocks:** 1·Type select — bug / feature idea / other. 2·Description textarea. 3·Optional screenshot upload. 4·**[ পাঠাও ]**।
**Actions:** submit → toast "ধন্যবাদ! আমরা দেখব।".
**States:** submitting · sent · error.

---

### H · Trust & people

#### H1 Report / Crisis
overlay in `/tutor` — Flag bad content; catch distress. **From:** ⚠ under any AI reply; free-text signals.
**Blocks:** 1·Report modal — "এই reply তে কী সমস্যা?" 4 reasons + comment + **[ Submit ]** ( বাতিল ) → toast. 2·**Crisis referral** ⊕ — on harm/distress signals, gently surface vetted Bangladeshi resources (e.g. Kaan Pete Roi) + "বিশ্বস্ত কারো সাথে কথা বলো"; never grade that moment wrong.
**States:** report submitting / rate-limited · crisis surfaced.

#### H2 Help index
`/help` (public) — Find answers without support. **Blocks:** title + বাংলা|English toggle + article list (how-to, mastery meaning, cancel/refund, privacy) + contact.
**Actions:** article → H3.

#### H3 Help article
`/help/:slug` (public) — One article. **Blocks:** back · formatted body · contact footer (email). **States:** missing (not-found + back) · language fallback note.

#### H4 Settings (full) ⊕
`/settings` — All preferences in one place (fix "no preferences"). **Blocks:** 1·Profile edit (→H5). 2·Language. 3·Read-aloud default. 4·Dark mode. 5·Font size + high-contrast. 6·Notifications (→H6). 7·Data & account (→H7). 8·Subscription (→I1). 9·**Security** ⊕ — active sessions · "সব device-এ logout" · new-device login alert. 10·Profile switcher → A8.
**Actions:** each → its screen/toggle.

#### H5 Profile edit ⊕
`/settings/profile` — Edit name, grade, language, modality, tone, pace, exam date.

#### H6 Notification preferences ⊕
`/settings/notifications` — Per-channel opt-in (email/SMS/in-app/WhatsApp) + **quiet hours**.

#### H7 Data export & delete
`/settings/data` — User data rights. **Blocks:** 1·"তোমার data" download (JSON+CSV) with prepare/ready/expire states. 2·Danger zone — delete (type "DELETE" to confirm) → soft-delete + 30-day grace.

#### H8 Parent weekly digest
`/parent/digest/preview` (signed link) — Bangla weekly summary for a parent. **Blocks:** date range · 📚 sessions · ⏱ minutes · 🛠 misconception repairs · 🎯 top-3 mastery gains · encouragement · unsubscribe. **(Read-only; separate audience.)**

#### H9 Parent dashboard + insight ⊕
`/parent` — Mid-week snapshot + learning insight (not just minutes). **Blocks:** today + week-so-far · **Top-3 struggling outcomes** with plain-Bangla misconception + "what the system will do" + a dinner-table prompt. Privacy-respecting rollups only.

#### H10 Teacher console (read-only) ⊕
`/teacher` — Class progress at a glance + a live-class teaching tool. **From:** teacher login.
**Blocks:** 1·Class stats row — "Avg mastery on {chapter}: 58% · active this week: 27/30". 2·Class/subject selector + filter (active / chapter). 3·Student list **sorted "needs attention" first** (low mastery + days-inactive on top): name · mastery % · last-active · "Concern!" tag → tap → **read-only** student view (per §1.7). 4·**Class misconception heatmap** — rows = misconceptions, count of students with each active; tap a row → affected-student list + **[ ক্লাসে confront-pattern পড়াও ]** (projects the "অনেক ছাত্র ভাবে X… আসলে Y" slide for live class). 5·Student invite — class **join-code** or CSV; SMS "{teacher} class join করবে? Tap →". 6·Exports — CSV roster / styled PDF for parent-meeting.
**Actions:** student → read-only view · heatmap row → project-in-class · assign → H11 · export.
**States:** loading · empty class.

#### H11 Teacher assignment ⊕
`/teacher/assign` — Assign outcomes to students with due dates → appear atop the student's chooser (C1).

#### H12 Legal
`/privacy` `/terms` (+ `/bn` `/en`) (public) — Policy docs. **Blocks:** scrollable doc + language toggle + back.

---

### I · Billing (mostly parent-facing) ⊕

#### I1 Plans
`/billing` — Choose a tier. **Blocks:** Free / Pro (unlimited + parent digest) / School cards · 7-day Pro trial · feature compare.
**Actions:** choose → I2.

#### I2 Payment
`/billing/pay` — Pay via local rails. **Blocks:** **bKash · Nagad** first, card later · family/sibling plan · promo code.
**States:** processing · failed-payment retry.

#### I3 Limit prompt
overlay — Soft free-tier limit. **Blocks:** "ফ্রি-তে আজকের session শেষ — Pro-তে unlimited" + **[ Pro দেখো ]** ( কাল আবার ).

#### I4 Invoices
`/billing/invoices` — Receipts. **Blocks:** invoice list + download · cancel/pause subscription.

---

## Appendix A — behind-the-scenes helpers (informs copy, not UI)

The student feels **one warm tutor**. Behind it: the live **7** — Conductor (Orchestrator), Teacher, Quizmaster (Examiner), Marker (Grader), Detective (Diagnostician), Path-setter (Planner), Companion — plus proposed experience helpers that power surfaces above: **Memory Keeper** (continuity/greetings), **Voice** (read-aloud/voice-input), **Illustrator** (on-demand visuals), **Scribe** (notes/flashcards/recap), **Curator** (search/discovery), **Exam Strategist** (countdown/regime/mocks), **Coach** (goals/streak/re-engage), **Calibrator** (confidence mirror), **Guardian** (safety/crisis), **Parent Liaison** (digest/insight), **Teacher Aide** (class rollups), **Study Buddy** (peer teach-back), **Recommender** (method selection). Use these only to keep personalization copy consistent — never expose names to students.

## Appendix B — change log

- **2026-06-05** (mockup C-loop UX) — C3 rebuilt **chat-first** with a *working* modality switcher (live panel swap, no reload): interactive Socratic **চ্যাট** (suggested replies + free input + "typing" + transparency note "টিউটর তোমার উত্তর বুঝে পরের প্রশ্ন ঠিক করছে") as the core teaching surface; **টেক্সট** (prose + KaTeX + recap), **ভিডিও** (player + ▶ reveals a mandatory checkpoint question — no passive watching), **অ্যানিমেশন** (real CSS motion of acceleration + try-prompts, reduced-motion gated), **উদাহরণ** (collapsible worked steps). Added persistent "টিউটরকে জিজ্ঞেস করো…" input + adaptive quick-actions ("আরো সহজ করে", "আরেকটা উদাহরণ", "আরেকভাবে দেখাও") to surface agent adaptation.
- **2026-06-05** (planning-mined) — Folded valuable insights from `edu-ai-planning` 03-user-journey + 04-design: §1.6 design rules & anti-patterns, §1.7 privacy boundaries; A2.5 account recovery, A8 profile switcher (shared phone); Zone-C session shell (phase indicator + estimate loading); enriched C3 (modality fallback chain, video checkpoint + CC/2×/replay, switcher label "অন্যভাবে বুঝতে চাও?"); enriched H10 teacher console (class misconception heatmap + project-in-class, needs-attention sort, join-code/CSV invite, exports); H4 Security item; new **Appendix C — Bangla copy deck**.
- **2026-06-05** (later) — D4 Formula sheet corrected from the real `FormulaSheetPanel` (right slide-in panel, "📘 ফর্মুলা" floating button, "সব অধ্যায়" scope toggle, mock auto-open notice, real loading/error/empty copy). Added **Zone G · System & utility**: G1 Not-found · G2 Notifications center · G3 Invite/referral · G4 Feedback/bug report. TOC + sitemap updated.
- **2026-06-05** — Consolidated into single canonical file. Standardized every screen to one build-ready template; added all student-facing screens (A–I, ~50). Removed persona narratives. Minimized status to ⊕ (to-build) marker. Folded in prior `student_experience_vision.md` (now retired). Design departures from backlog baked in: Home HERO + tappable mastery; onboarding re-sequenced after identity; deep-linked summary next-steps; visible streak-freeze; graceful "end session"; answerable similar-question; real transfer prompt; crisis referral; Study Buddy + on-demand visuals (new).

---

## Appendix C — Bangla copy deck (use verbatim in mockups)

Authored strings (planning + live UI). Reuse exactly so every mockup reads natively. `{...}` = fill-in. All Bangla copy needs native-speaker review before merge.

**Placement**
- Intro: "১০টি প্রশ্ন — সঠিক / ভুল কোনোটাতেই অসুবিধা নেই।"
- Result: "তোমার শুরুর জায়গা পাওয়া গেছে — {outcome} দিয়ে শুরু করব।"

**Greeting (time-aware, remembers yesterday)**
- "{name}, কেমন আছো? কাল ছিল {topic} — তুমি {x}/{y} ঠিক করেছিলে। আজ {next} — শুরু করি?"
- Evening: "শুভ সন্ধ্যা! কাল ভালো করেছিলে — আজ আরো একটু এগিয়ে যাই?"

**Engage / hook**
- "একটি পালক আর একটি পাথর vacuum-এ একসাথে ছাড়লে — কোনটা আগে নিচে পৌঁছাবে?"
- Real-world tie: "ঢাকার রাস্তায় একই push দিলে রিকশা vs ট্রাক — কেমন পার্থক্য?"

**Question / hint**
- Hint button: "আরো clue চাও?" · pace tooltip: "তোমার pace অনুযায়ী hint penalty কম রাখা হয়েছে।"
- Why-this-question (ⓘ): "কেন এই প্রশ্ন? — তোমার level-এ সবচেয়ে informative প্রশ্ন।"

**Feedback**
- Correct: "✓ সঠিক!" · affirmations: "দারুণ!" · "সাবাশ!" · "ঠিক হয়েছে।"
- Wrong (no shame): "তোমার উত্তর এসেছে {ans}। চলো একসাথে দেখি।" · "কাছাকাছি — চল আরেকবার দেখি।"
- Misconception confront: "অনেক ছাত্র মনে করে {X}, কিন্তু আসলে {Y}, কারণ {Z}।"

**Smart moments**
- Self-explain: "নিজের ভাষায় বলো — এটা কেন কাজ করে?"
- Teach-back: "এক বাক্যে বলো — {concept} কী?" / "এই concept তোমার বন্ধুকে কীভাবে বোঝাবে?"
- Transfer: "চ্যালেঞ্জ গ্রহণ করো — তোমার বুঝকে বাস্তবে কাজে লাগাও।"
- Deferred goal: "{outcome} শেষ হয়েছে — কাল {next}-এ ফিরব?"

**Modality**
- Switcher: "অন্যভাবে বুঝতে চাও?" · suggest toast (2 wrong): "অন্যভাবে দেখব?"
- Video empty: "ভিডিও এই concept-এর জন্য এখনো নেই" · replay: "আরেকবার দেখতে চাও?"
- Worked-example → practice: "চলো অনুশীলন করি"

**Dashboard**
- Actions heading: "আজ তোমার সবচেয়ে দরকারি কাজ:"
- Empty mastery: "এখনো mastery নেই — প্রথম session শুরু করো।"
- Retention banner: "🔁 আজকের পুনঃ-পরীক্ষা: {n}টি আউটকাম"

**Wellbeing / safety**
- Wellness: "তুমি কিছু সময় ধরে কঠিন সময় পার করছ — এটা ঠিক আছে। ছোট break নাও। প্রয়োজন হলে কারো সাথে কথা বলো — পরিবার, বন্ধু, বা teacher। তুমি একা না।"
- Off-topic: "আমি SSC physics-এ help করতে পারি। অন্য বিষয়ে এখানে possible না — তুমি একজন বন্ধু বা teacher-এর সাথে কথা বলতে পারো।"

**System states**
- Generic error: "একটু সমস্যা হলো, আবার চেষ্টা করো।"
- Offline: "Network পাচ্ছি না — তুমি কাজ চালিয়ে যাও, আমরা পরে sync করব।"
- Loading (>2s): "ব্যাখ্যা তৈরি হচ্ছে… ~৩s"

**Parent / teacher**
- Digest subject: "{name}-এর এই সপ্তাহের অগ্রগতি"
- Concern (softened): "{name}-এর এই outcome-এ momentum কম — হয়তো animation version try করানো যায়।"
- Teacher assign → student: "{teacher} তোমাকে {outcome} অনুশীলন দিতে চেয়েছেন — শুরু করি?"
