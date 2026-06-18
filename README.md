# Neha Sehgal — Portfolio

A playful, animated portfolio for **Neha Sehgal**, Product Designer at Google.

🔗 **Live:** https://neha-portfolio-ashy.vercel.app

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![React](https://img.shields.io/badge/React-19-149eca)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)

## Highlights

- **Light & dark themes** with a slow diagonal circular reveal (View Transitions
  API) on toggle.
- **Interactive 3D confetti hero** (React Three Fiber) with pointer parallax.
- **Candy-colored work grid** of 9 case studies with springy hover and
  scroll-driven motion.
- Built to be **edited with [Claude Code](https://claude.com/claude-code)** —
  all content lives in one typed file.

## Tech stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
Framer Motion · React Three Fiber / Three.js

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build
npm run start    # serve the production build
```

## Editing content

All site content (bio, projects, links) lives in
[`src/data/projects.ts`](src/data/projects.ts). Add a project to the `projects`
array; write a full case study by filling in that project's `detail` object.
Images go in [`public/images/`](public/images/).

See [`CLAUDE.md`](CLAUDE.md) for the full editing guide, project structure, and
design-token reference.

## Deployment

Hosted on **Vercel**. Pushing to `main` triggers an automatic deploy.

> Note: the `neha-sehgal.com` custom domain is not yet pointed here — see the
> TODO in `CLAUDE.md`.
