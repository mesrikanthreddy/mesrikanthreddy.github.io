# Srikanth Reddy — Profile Site

Vite + React rebuild of the personal profile page, ready to host on GitHub Pages.

## Local development

```bash
npm install
npm run dev
```

## Before you deploy — base path

`vite.config.js` is set to `base: '/'` because this repo deploys as the
GitHub Pages *user site* — a repo literally named `mesrikanthreddy.github.io`,
served at `https://mesrikanthreddy.github.io/`.

If you ever move it to a normal project repo instead (deployed at
`https://mesrikanthreddy.github.io/<repo-name>/`), change `base` to
`'/<repo-name>/'`. Getting this wrong is the #1 cause of a blank white page
after deploying — assets get requested from the wrong path.

## Deploying — two options

### Option A: GitHub Actions (recommended, already set up)

This repo includes `.github/workflows/deploy.yml`. It builds and deploys
automatically on every push to `main`.

1. Push this project to a new GitHub repo.
2. In the repo, go to **Settings → Pages → Build and deployment → Source**
   and select **GitHub Actions**.
3. Push to `main` — the workflow builds and publishes to Pages
   automatically. Check the **Actions** tab for progress.

### Option B: `gh-pages` package (manual, one command)

Already configured in `package.json`.

```bash
npm run deploy
```

This builds the site and pushes `dist/` to a `gh-pages` branch. Then in
**Settings → Pages → Source**, choose **Deploy from a branch** → `gh-pages` →
`/ (root)`.

Use one option or the other, not both, to avoid conflicting deployments.

## Project structure

```
src/
  components/   One component per section (Nav, Hero, Capabilities, ...)
  hooks/         useReveal.js — scroll-reveal IntersectionObserver hook
  assets/        Hero image (webp + jpg fallback)
  index.css      All design tokens + section styles
  App.jsx        Assembles the page
```

## Updating content

Each section's copy lives as a small data array at the top of its component
file (e.g. `src/components/Projects.jsx` exports a `PROJECTS` array) — edit
those directly rather than hunting through JSX.
