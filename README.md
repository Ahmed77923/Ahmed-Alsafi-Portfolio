# Ahmed Alsafi — Portfolio

Personal portfolio site for Ahmed Alsafi (Data Science & AI), built to showcase machine
learning, computer vision, and MLOps projects — with a focus on systems shipped end to end
rather than notebooks alone.

## Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- React Router (client-side routing for project case studies)

No UI/animation/state-management libraries beyond that — animations are hand-written CSS
transitions gated behind `prefers-reduced-motion`, and interactivity (theme, filters,
scroll reveals) is a handful of small custom hooks.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

Other scripts:

```bash
npm run build    # type-check + production build to dist/
npm run preview  # preview the production build locally
npm run lint     # oxlint
```

## Project structure

```
src/
  components/   reusable UI: Navbar, ProjectCard, PipelineDiagram, Tag, icons, etc.
  sections/     page sections composed from components: Hero, About, Projects, Skills, ...
  pages/        route-level pages: HomePage, CaseStudyPage, NotFoundPage
  layouts/      SiteLayout (navbar + footer + back-to-top shell)
  data/         content as data: site.ts, projects.ts, skills.ts, timeline.ts
  hooks/        useTheme, useSEO, useInView, useCountUp, useReducedMotion
  lib/          small shared utilities
```

Project and case-study content lives in `src/data/projects.ts` as plain objects — add a
project by adding an entry there; a card, a GitHub link, and a full case-study page
(`/projects/<slug>`) are generated from it automatically.

## Before you deploy

A few things are intentionally left as placeholders rather than invented:

- **Email** — `src/data/site.ts` has `email: ""`. Fill it in to enable the contact button
  on the Contact section (it renders a "coming soon" pill until then).
- **GitHub repo names** — `src/data/projects.ts` builds each project's GitHub link from
  `https://github.com/Ahmed77923/<repo>`. Double-check each `repo` value against your
  actual repository names (the Flight Delay Prediction slug was inferred as
  `Flight-Delay-Prediction`; the others were given directly).
- **Open Graph image** — `public/og-image.svg` is a generated placeholder matching the
  site's palette. Swap it for a real screenshot if you want link previews to show the
  actual site.

## Design notes

- Dark mode is the primary theme (toggle persists to `localStorage`); light mode is a
  fully designed second theme, not an inverted afterthought.
- Typography: Fraunces (display), IBM Plex Sans (body), IBM Plex Mono (metrics, tags,
  code-like labels) — loaded from Google Fonts in `index.html`.
- The hero's pipeline diagram animates once on mount; diagrams further down the page
  (architecture sections, project cards) animate once when scrolled into view. All motion
  is skipped for users with `prefers-reduced-motion: reduce`.
- Project visuals are generated architecture/pipeline diagrams rather than screenshots,
  since no project screenshots were supplied — this keeps the "systems, not just models"
  framing consistent throughout.
