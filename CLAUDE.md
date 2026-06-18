# Neha Sehgal — Portfolio

A personal portfolio site for Neha Sehgal (Product Designer at Google).
Built to be **edited with Claude Code** — you can ask Claude to change content,
add projects, or restyle sections in plain English.

## How to make common edits

> Tip: open this folder in Claude Code and just describe what you want.

- **Change any text, bio, email, or social links** → edit `src/data/projects.ts`
  (the `site` object). This is the single source of truth for content.
- **Add / edit / reorder a project** → edit the `projects` array in
  `src/data/projects.ts`. Each project needs a `slug`, `title`, `summary`,
  `category`, `cover` image path, and `accent` color.
- **Write a full case study** → fill in the optional `detail` object on that
  project (role, timeline, overview, contributions, outcome). The case-study
  page at `/work/<slug>` renders it automatically; until then it shows a
  "coming soon" placeholder.
- **Add an image** → drop the file in `public/images/` and reference it as
  `/images/your-file.png`.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (tokens in `src/app/globals.css`)
- **Framer Motion** for scroll/entrance animations
- **React Three Fiber / Three.js** for the 3D particle hero
  (`src/components/hero/Hero3D.tsx`)

## Project structure

```
src/
├── app/
│   ├── layout.tsx            # fonts, <Nav>, <Footer>, metadata
│   ├── page.tsx              # home: Hero → WorkGrid → About → Contact
│   └── work/[slug]/page.tsx  # case-study detail (reads from projects.ts)
├── components/
│   ├── Nav.tsx  Footer.tsx
│   ├── hero/Hero.tsx  hero/Hero3D.tsx
│   ├── work/WorkGrid.tsx  work/ProjectCard.tsx
│   ├── About.tsx  Contact.tsx
└── data/projects.ts          # ← EDIT THIS for content
```

## Design tokens & theming

Colors and fonts live in `src/app/globals.css`.

- **Two themes** via `[data-theme="light|dark"]` on `<html>`:
  - Light bg = periwinkle `#eceaff`; Dark bg = deep grape `#141030` (neither
    black nor white). White "paper" cards (`--paper`) accent both.
- **Candy accent palette** (shared by both themes): `--pink #ff4d8d`,
  `--lime #b6e948`, `--cyan #57e2ff`, `--blue #5a6cff`, `--lavender #c99bf7`,
  `--yellow #ffd23f`. Each project card uses one as its background.
- **Fonts:** Bricolage Grotesque (display), Inter (body).
- **Theme switch** = a slow diagonal circular reveal (View Transitions API).
  Logic in `src/components/theme/ThemeProvider.tsx`; the clip-path keyframes
  (`theme-reveal`) live in `globals.css`. Falls back to an instant toggle in
  browsers without the API and respects `prefers-reduced-motion`.

Motion lives in the components via Framer Motion (springy hovers, scroll
parallax in `Hero`/`ProjectCard`, floating shapes, the marquee).

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Deploy

Easiest path: push to GitHub and import into **Vercel** (zero config for
Next.js). Every push to the main branch auto-deploys.

## Notes / TODO

- Case-study pages are currently **stubs** — the homepage cover images are real,
  but the per-project write-ups and internal images still need to be added
  (fill `detail` in `projects.ts`, drop images in `public/images/`).
- Cover images were migrated from the old Wix site at full resolution.
