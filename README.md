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

## Brand Guide Files

This repo also includes generator scripts for internal presentation guides:

- `generate-guideline-pptx.mjs`
- `generate-color-guide-pptx.mjs`

Generate the internal decks with:

```bash
npm run build:guideline
npm run build:color-guide
```

## Deployment

Recommended Vercel settings:

- Framework: `Vite`
- Build command: `npm run build`
- Output directory: `dist`

## Notes

- The site follows the Red Dot Space BP backbone in a lighter public-web form.
- Internal reference and brand notes are captured in `DESIGN_REFERENCE.md`.
