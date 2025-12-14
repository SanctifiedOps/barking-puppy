# $WHITEHOUSE - Meme Office Site

Premium red-white-blue memecoin site inspired by iOS-style motion. Built with React + Vite, featuring glassmorphism, hover transitions, and hero space for the Whitehouse meme art.

## Quick start
- Install dependencies: `npm install`
- Run dev server: `npm run dev`
- Production build: `npm run build`
- Preview build: `npm run preview`

## Key files
- `src/App.jsx` - layout, memecoin copy, CTAs, and data for tiles/timeline.
- `src/index.css` - theme variables, gradients, glass panels, animations, and responsive tweaks.
- `public/wh-crest.svg` & `public/wh-fav.svg` - crest and favicon.
- `public/wh-meme.svg` - placeholder art for the hero; replace with your meme asset.

## Customizing
- Contract address: edit `contractAddress` in `src/App.jsx`.
- Links/CTAs: update the `links` array and hero buttons in `src/App.jsx`.
- Colors/feel: adjust `:root` variables and gradients in `src/index.css`.
- Imagery: replace `public/wh-meme.svg` with your preferred meme art; keep the aspect ratio for best results (or drop a PNG with the same name).

## Deployment
- Build output lives in `dist/` after `npm run build`.
- Host the `dist` folder on your platform of choice (GitHub Pages, Netlify, Vercel, etc.). Netlify users: keep your publish directory pointed at `dist`.
