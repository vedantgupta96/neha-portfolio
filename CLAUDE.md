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

## Design tokens

Colors and fonts live in `src/app/globals.css`:
- `--accent` electric lime `#c6f24e` (primary)
- `--accent-2` violet `#7c5cff` (3D hero gradient)
- Fonts: Space Grotesk (display), Inter (body)

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
