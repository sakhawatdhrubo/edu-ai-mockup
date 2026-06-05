# edu-ai — Student UI Mockup

Static, clickable UI mockup of the full **student journey** for the Onnorokom EduAI SSC physics tutor. Bangla-first, phone-first. Built from a single spec.

## Files
- **[`student_wireframe.md`](student_wireframe.md)** — the spec / source of truth. ~58 screens (zones A–I), shared shell (§1), Bangla copy deck (Appendix C). Build from this.
- **[`PROGRESS.md`](PROGRESS.md)** — build tracker. **Read + update every session.** Survives context loss.

## Build
- **Astro + Tailwind**, static. **npm** (Node ≥ 18). No Docker, no DB, no backend.
- Latest Astro docs via MCP: `claude mcp add --transport http astro-docs https://mcp.docs.astro.build/mcp`

```bash
npm install        # after scaffold
npm run dev        # local preview at localhost:4321
npm run build      # static output → dist/  (host anywhere or open)
```

## Structure (after scaffold)
```
student_wireframe.md      spec
PROGRESS.md               tracker
src/
  layouts/Layout.astro    page shell (TopRails + BottomNav)
  components/             Button, Card, Banner, Modal, Toast, TopRails, BottomNav, ...
  pages/
    index.astro           clickable directory of all screens (prototype home)
    a1-landing.astro      one page per screen ID
    ...
tailwind.config.*         §1.1 design tokens
```

## Share / deploy (GitHub Pages)
The repo ships a workflow (`.github/workflows/deploy.yml`) that auto-publishes on every push to `main`.

1. Create a GitHub repo **named `edu-ai-mockup`** (the name must match `BASE_PATH` in the workflow; rename both if you use a different name).
2. Push:
   ```bash
   git remote add origin https://github.com/<you>/edu-ai-mockup.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Source = "GitHub Actions"**.
4. Wait for the green check in the **Actions** tab → live at `https://<you>.github.io/edu-ai-mockup/`. Share that link.

Local dev is unaffected (base stays `/`); the subpath base is applied only in CI via `BASE_PATH`. A small link-shim in `Layout.astro` makes the hand-written absolute links work under the subpath.

## Conventions
- One page per screen ID; shared UI as reused components (change once → everywhere).
- Use Appendix C Bangla strings verbatim; §1.1 tokens for color/type.
- Mockup only — no real auth/data/backend, no unit/e2e tests.
