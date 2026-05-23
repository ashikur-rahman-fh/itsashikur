# Shared UI system

The design system lives in **`packages/shared/src/ui/`** and is consumed as **`@ashikur-portfolio/shared/ui`**.

## Default theme: Ashikur Portfolio

**Theme id:** `ashikur-portfolio`

A **Premium Engineering** portfolio look — light-first with deep navy primary, cyan accents, and teal success metrics for impact stats.

> Content stays in focus; homepage sections alternate **white** (`default`) and **light gray** (`muted`) bands. Navy **technical** tokens (`--surface-technical`) remain available for optional `dark` sections. Adjust tokens in `theme.css` when you refine the visual identity.

### Visual direction

- Calm, clean, professional — not flashy
- Light: `210 25% 98%` page background, **white cards**
- Primary: **deep navy** (`222 47% 14%` light); dark mode uses **cyan-forward** primary
- Accents: electric blue / cyan (`--accent-foreground`, `--info`); success metrics use teal (`--success`)
- Optional technical sections: deep navy (`--surface-technical`) via `Section` `variant="dark"` — not used on the main homepage
- Site-wide subtle line grid (`.surface-grid-*`); hero uses stronger grid + cyan glow (`.surface-grid-hero`); admin app uses a softer full-page variant (`.surface-grid-admin`)
- Typography: **Space Grotesk** (headings) + **Inter** (body) + **Consolas** (stats/code accents; system mono with fallbacks)
- Subtle borders, soft focus rings, **moderate** corner radius (not bubbly)

### Fonts

| Use | Stack |
| --- | ----- |
| Headings | Space Grotesk, Inter, … (`--font-display`) |
| UI (default) | Inter, ui-sans-serif, system-ui, … |
| Stats / metrics | Consolas via `font-mono text-stat` |
| Code / metadata | Consolas, SFMono-Regular, Liberation Mono, DejaVu Sans Mono, ui-monospace, monospace |

Inter and Space Grotesk load from Google Fonts in `globals.css`; mono uses system fonts (no webfont). Use semantic size utilities instead of ad-hoc Tailwind sizes (`text-sm`, `text-lg`, `text-3xl`, etc.) so the whole site scales from `theme.css`. Primitives (button, input, card, badge, alert) already use these tokens.

### Type scale

Defined in `theme.css` (`--text-*` with line-height and letter-spacing). Tailwind utilities:

| Utility | Use |
| --- | ----- |
| `text-hero` | Page hero `h1` |
| `text-section-title` | Section headings |
| `text-page-title` | Inner pages (e.g. resume) |
| `text-card-title` | Card titles |
| `text-stat` | Stat values (with `font-mono`) |
| `text-lead` | Hero / intro paragraphs |
| `text-body` | Default body (applied on `body`) |
| `text-body-sm` | Dense copy |
| `text-eyebrow` | Section labels (use `.type-eyebrow` for uppercase) |
| `text-ui` | Buttons, nav links, form labels, inputs |
| `text-ui-sm` | Badges, compact button `sm` size |

Do not use mono for body paragraphs or eyebrows. Default `p` elements inherit `text-body` from `globals.css`.

### Theme tokens

All colors and radius live in **[`packages/shared/src/ui/styles/theme.css`](../../packages/shared/src/ui/styles/theme.css)** as HSL channels:

`background`, `foreground`, `card`, `card-foreground`, `muted`, `muted-foreground`, `border`, `input`, `ring`, `primary`, `primary-foreground`, `secondary`, `secondary-foreground`, `destructive`, `destructive-foreground`, `warning`, `warning-foreground`, `success`, `success-foreground`, `info`, `info-foreground`

TypeScript: `portfolioThemeId`, `portfolioThemeName`, `semanticColorTokens`, `backgroundSurfaceTokens`, `radiusTokens`, `componentRadiusGuide` in `theme/`.

### Background system

Section surfaces and cards use dedicated tokens in `theme.css` (HSL channels). Prefer these over hardcoded colors or `bg-muted/50`.

| Token | Role | Tailwind utility |
| ----- | ---- | ---------------- |
| `--background` | Default page and default sections | `bg-background` |
| `--section-muted` | Softer blue-gray bands (CP → Production, About, Projects, Achievements, Contact) | `bg-section-muted` |
| `--surface-technical` | Optional navy bands (`Section` `variant="dark"`) | `bg-surface-technical` |
| `--surface-technical-foreground` | Text on technical bands | `text-surface-technical-foreground` |
| `--card` | Elevated cards on light/muted sections | `bg-card` |
| `--card-on-technical` | Panels on navy bands | `bg-card-on-technical` |
| `--border-on-technical` | Borders on technical panels | `border-border-on-technical` |
| `--grid-line` | Line grid overlays | used in `.surface-grid-*` |
| `--surface-accent` | Impact / highlight tint | `bg-surface-accent` |
| `--surface-dark` | **Alias** of `--surface-technical` (legacy) | `bg-surface-dark` |

**Section variants** (`Section` component):

| Variant | Background + grid |
| ------- | ----------------- |
| `default` | `bg-background` + `.surface-grid-default` |
| `muted` | `bg-section-muted` + `.surface-grid-muted` |
| `dark` | `bg-surface-technical` + `.surface-grid-technical` (optional; unused on main homepage) |

**Page-level surfaces** (not tied to `Section`):

| Class | Use |
| ----- | --- |
| `.surface-grid-hero` | Portfolio hero band — strongest grid + cyan glow on `--background` |
| `.surface-grid-admin` | Admin `PageShell` — hero-like glow/grid, slightly softer; full viewport via shell, glass footer |

**Main homepage section rhythm** (`frontend-main`): Hero (`default` / hero grid) → CP, About, Projects, Achievements, Contact (`muted`) → Experience, Skills, Testimonials (`default`).

**Layout utilities** (`globals.css`):

- `.layout-card-grid` / `.layout-card-grid-dense` — card grids (gap 6 / 4)
- `.portfolio-card` — hover lift + shadow on shared cards
- `.panel-on-technical` — bullet panels on navy bands
- `.panel-on-technical-interactive` — outline controls on technical sections

**Rebrand checklist (backgrounds):**

1. Tune `--surface-technical` and `--section-muted` in `:root` and `.dark` first.
2. Adjust `--grid-line` opacity via `.surface-grid-*` classes if needed.
3. Keep `--surface-dark` as alias only; use `--surface-technical` in new code.

### Radius scale

Centralized in `theme.css` — mapped to Tailwind `rounded-*` utilities:

| Token | Value | Tailwind | Typical use |
| ----- | ----- | -------- | ----------- |
| `--radius-xs` | 0.25rem | `rounded-xs` | Tiny controls, close buttons |
| `--radius-sm` | 0.375rem | `rounded-sm` | Compact chips |
| `--radius-md` | 0.5rem | `rounded-md` | **Buttons, inputs, badges** (default) |
| `--radius-lg` | 0.625rem | `rounded-lg` | **Cards, alerts, panels, toasts** |
| `--radius-xl` | 0.75rem | `rounded-xl` | Large dialogs (sparingly) |
| `--radius` | 0.5rem | default | Same as `md` |

**Guidelines:**

- Do **not** use `rounded-2xl` or `rounded-full` for default buttons/cards.
- Navbar (full-width): no radius on the bar itself.
- Prefer `rounded-md` for interactive controls, `rounded-lg` for surfaces.
- Change the scale in `theme.css` only — components use Tailwind classes, not hardcoded rem values.

**General rebrand checklist:**

1. Edit HSL values in `theme.css` (`:root` and `.dark`) — start with `--primary`, `--background`, and the [background system](#background-system) tokens.
2. Adjust `--radius-*` and `--shadow-*` if needed.
3. Optionally update `--font-sans` / Google Fonts in `globals.css`.
4. Never hardcode colors or excessive rounding in components — use semantic tokens and `rounded-md` / `rounded-lg`.

### Light / dark mode

`ThemeProvider` applies the `dark` class on `<html>`. Both frontends share the same CSS so main and admin stay aligned.

## Stack

| Layer | Role |
| ----- | ---- |
| **Tailwind CSS v4** | Utilities |
| **shadcn/ui** | Primitives in `primitives/shadcn/` |
| **Basecoat CSS** | Optional foundation utilities |
| **Custom components** | Public API in `components/` |

## Importing

```tsx
import { Button, Alert, Card, Navbar, PageShell, ThemeProvider } from '@ashikur-portfolio/shared/ui';
import '@ashikur-portfolio/shared/ui/styles/globals.css';
```

## Components

| Component | Style notes |
| --------- | ----------- |
| **Button** | `rounded-md`; muted primary; calm variants |
| **Alert** | `rounded-lg`; light tinted backgrounds |
| **Card** | `rounded-lg`; white, subtle border |
| **Navbar** | Full-width, no bar radius; links `rounded-md` |
| **Input** | `rounded-md`; subtle focus ring |
| **PasswordInput** | Password field with inline Eye / EyeOff toggle; `aria-label` for show/hide (no visible text on the button) |
| **Badge** | `rounded-md` (not pill-shaped) |

Pass `className` for app-level tweaks.

## Developer rules

1. Import reusable UI from `@ashikur-portfolio/shared/ui`.
2. Do not duplicate or hardcode brand colors in apps.
3. Customize via `theme.css` tokens only when rebranding.
4. Add tests and update this doc when changing the system.

## Admin app (`frontend-admin`)

The admin app reuses the same tokens and primitives but composes them for a focused dashboard experience in `apps/frontend-admin/src/components/`:

| Component | Role |
| --------- | ---- |
| **AdminShell** | Authenticated pages: `PageShell` + `surface-grid-admin`, glass nav slot, glass footer, link to portfolio |
| **AdminAuthShell** | Login, guards, centered forms: full-page admin grid surface; `asPageShell={false}` when nested inside **AdminShell** |
| **AdminNavbar** | `Navbar variant="glass"` — Home (`/`) + actions (e.g. logout); change password linked from profile card |
| **AdminFormCard** | Consistent `max-w-md` form card (`shadow-card`) |
| **AdminPageHeader** | Page-level `font-display text-page-title` above profile card |
| **AdminSkipLink** | Skip to `#main-content` (paired with main landmark wrapper) |

**Patterns:**

- Background: `surface-grid-admin` on `PageShell` shells (full viewport grid + cyan glow, not section-muted gray).
- Footer: glass `footerClassName` on admin shells so the surface shows through under the footer band.
- Feedback: `SuccessAlert` / `ErrorAlert` — avoid ad-hoc `text-green-*` success text.
- Typography: `text-page-title` for page headers, `text-card-title` inside cards, `text-ui` for labels.
- Portfolio link: `NEXT_PUBLIC_PORTFOLIO_URL` (default `https://itsashikur.com`) via `src/config/site-links.ts`.

```bash
npx pnpm@9.15.0 --filter @ashikur-portfolio/frontend-admin dev
```

## Preview & tests

```bash
npx pnpm@9.15.0 --filter @ashikur-portfolio/frontend-main dev
npx pnpm@9.15.0 --filter @ashikur-portfolio/frontend-admin test
npx pnpm@9.15.0 --filter @ashikur-portfolio/shared test
```
