<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Neha Sehgal — Portfolio

> This is the shared guide for **any** coding agent working in this repo (Codex,
> Claude Code, etc.). It is the single source of truth; `CLAUDE.md` just points
> here. Keep this file current when you change how the project works.

A personal portfolio site for **Neha Sehgal**, a Product Designer at Google.
Built to be edited by describing the change you want ("update my bio", "add a
project", "write the Awfis case study", "make the hero calmer").

- **Live:** https://neha-portfolio-ashy.vercel.app
- **Repo:** https://github.com/vedantgupta96/neha-portfolio
- Pushing to `main` **auto-deploys** to Vercel (~1 min). The loop is:
  edit → `git push` → live.

## How to make common edits

> Almost everything you'll want to change is content, and content lives in one
> file: `src/data/projects.ts`.

- **Text, bio, email, social links** → the `site` object in
  `src/data/projects.ts` (single source of truth).
- **Add / edit / reorder a project** → the `projects` array in
  `src/data/projects.ts`. Each project needs `slug`, `title`, `summary`,
  `category`, `cover` (image path), and `accent` (a hex from the candy palette).
- **Write a full case study** → fill in the optional `detail` object on that
  project (`role`, `timeline`, `team`, `overview`, `contributions`, `outcome`).
  The page at `/work/<slug>` renders it automatically; until then it shows a
  "coming soon" placeholder.
- **Add an image** → drop the file in `public/images/` and reference it as
  `/images/your-file.png`.
- **Change colors / theme** → tokens live in `src/app/globals.css`.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript** — see the Next.js
  warning at the top of this file; Next 16 differs from older training data, so
  check `node_modules/next/dist/docs/` before writing routing/API code.
- **Tailwind CSS v4** (theme tokens in `src/app/globals.css`, no JS config)
- **Framer Motion** — scroll parallax, entrance + hover animations
- **React Three Fiber / Three.js** — the 3D confetti hero

## Project structure

```text
src/
├── app/
│   ├── layout.tsx              # fonts, no-FOUC theme script, <Nav>/<Footer>
│   ├── page.tsx                # home: Hero → WorkGrid → About → Contact
│   ├── globals.css             # theme tokens + keyframes (incl. theme reveal)
│   └── work/[slug]/page.tsx    # case-study detail (reads from projects.ts)
├── components/
│   ├── Nav.tsx  Footer.tsx  Marquee.tsx  FloatingShapes.tsx
│   ├── About.tsx  Contact.tsx
│   ├── hero/Hero.tsx  hero/Hero3D.tsx
│   ├── work/WorkGrid.tsx  work/ProjectCard.tsx
│   └── theme/ThemeProvider.tsx  theme/ThemeToggle.tsx
└── data/projects.ts            # ← EDIT THIS for content
```

## Design tokens & theming

Colors and fonts live in `src/app/globals.css`.

- **Two themes** via `[data-theme="light|dark"]` on `<html>`:
  Light bg = periwinkle `#eceaff`; Dark bg = deep grape `#141030` (deliberately
  neither black nor white). White "paper" cards (`--paper`) accent both.
- **Candy accent palette** (shared across both themes): `--pink #ff4d8d`,
  `--lime #b6e948`, `--cyan #57e2ff`, `--blue #5a6cff`, `--lavender #c99bf7`,
  `--yellow #ffd23f`. Each project card uses one as its background; card text
  color is auto-picked (black/white) for contrast in `ProjectCard.tsx`.
- **Fonts:** Bricolage Grotesque (display), Inter (body).
- **Signature theme switch** = a slow diagonal circular reveal (View
  Transitions API). Logic in `components/theme/ThemeProvider.tsx`; the clip-path
  keyframes (`theme-reveal`) live in `globals.css`. Falls back to an instant
  toggle where the API is unsupported, and respects `prefers-reduced-motion`.

Motion is per-component via Framer Motion: springy hovers, scroll parallax in
`Hero`/`ProjectCard`, floating shapes, and the marquee.

### Interactive touches (keep these accessible)

- **Cursor-reactive confetti** (`hero/Hero3D.tsx`) — each R3F particle springs
  away from the pointer and settles back. The per-particle interaction is gated
  behind `prefers-reduced-motion`; keep that guard if you touch it.
- **Figma "redline" card hover** (`work/ProjectCard.tsx`) — a CSS-only
  `group-hover` overlay draws a selection frame, corner handles, a layer-name
  tag, and a dimension pill over each cover. A designer's in-joke.

Design ethos: deepen what's already here (candy confetti, big Bricolage type,
the theme-reveal signature) and lean into product-design craft (Figma, redlines,
cursors) rather than adding generic decoration. Let the theme-reveal stay THE
signature — don't add effects that compete with it.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (run this before pushing if unsure)
```

There is no backend, database, or env vars — it's a static Next.js build.

## Current status & TODO

- **Case-study pages are stubs.** The 9 homepage cover images are real (migrated
  full-res from the old Wix site), but the per-project write-ups and internal
  images are not in yet → fill the `detail` field in `projects.ts` and drop
  images in `public/images/`. Source one-liners and the public-vs-contact-only
  split are catalogued in `Neha Portfolio Content.md`.
- **Custom domain not switched.** `neha-sehgal.com` still points to the old Wix
  site. Moving it to Vercel is a DNS change to do only once the new site is
  approved (it will replace the live Wix site).
