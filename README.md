# Red Dot Space Website

Public-facing marketing site for Red Dot Space, built with Vite + React.

## Stack

- React
- TypeScript
- Vite
- Motion
- Lucide React

## Development

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## Deployment

Deployed to GitHub Pages via `.github/workflows/deploy-pages.yml` on every push to `main`. The Vite `base` path is derived from the repo name at build time.
