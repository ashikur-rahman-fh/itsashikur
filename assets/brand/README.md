# Brand assets

- `logo-source.jpg` — master logo (1024×1024). Update this file when the brand mark changes.
- Regenerate favicons for both Next.js apps and the portfolio OG image: `pnpm favicons:generate`

Generated outputs (per app):

| File | Size | Role |
|------|------|------|
| `src/app/favicon.ico` | 16, 32, 48, 96 | Legacy browsers, `/favicon.ico`, Google Search |
| `src/app/icon.png` | 48×48 | Primary tab icon (Google ≥48px) |
| `src/app/icon1.png` | 96×96 | Hi-DPI / Google 48px multiple |
| `src/app/apple-icon.png` | 180×180 | iOS home screen |
| `public/icon-192.png` | 192×192 | Web manifest / Android |
| `public/icon-512.png` | 512×512 | Web manifest splash |
| `public/og-image.png` | 1200×630 | Open Graph / Twitter preview (frontend-main only) |
