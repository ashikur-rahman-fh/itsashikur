# Shared UI system

The design system lives in **`packages/shared/src/ui/`** and is consumed as **`@ashikur-portfolio/shared/ui`**.

## Default theme: Ashikur Portfolio

**Theme id:** `ashikur-portfolio`

A **soft, light, muted** portfolio look — warm off-white backgrounds, white cards, slate text, and a **muted blue-gray primary** (not bright blue). Semantic colors are desaturated on purpose.

> The palette is **calm and understated** so content stays in focus; adjust tokens in `theme.css` when you refine the visual identity.

### Visual direction

- Calm, clean, professional — not flashy
- Low saturation, no gradients, minimal shadows
- Light: `210 20% 98%` page background, **white cards**
- Dark: soft neutral surfaces with subtle elevation
- Primary: **slate / blue-gray** (`215 24% 34%` light, `213 20% 74%` dark)
- Subtle borders, soft focus rings, **moderate** corner radius (not bubbly)

### Fonts

| Use | Stack |
| --- | ----- |
| UI (default) | Inter, ui-sans-serif, system-ui, … |
| Code / metadata | JetBrains Mono, SFMono-Regular, Consolas, monospace |

Fonts load from Google Fonts in `globals.css`. Use `font-mono` or `<code>` only for technical copy (API paths, env labels, version strings).

### Theme tokens

All colors and radius live in **[`packages/shared/src/ui/styles/theme.css`](../../packages/shared/src/ui/styles/theme.css)** as HSL channels:

`background`, `foreground`, `card`, `card-foreground`, `muted`, `muted-foreground`, `border`, `input`, `ring`, `primary`, `primary-foreground`, `secondary`, `secondary-foreground`, `destructive`, `destructive-foreground`, `warning`, `warning-foreground`, `success`, `success-foreground`, `info`, `info-foreground`

TypeScript: `portfolioThemeId`, `portfolioThemeName`, `semanticColorTokens`, `radiusTokens`, `componentRadiusGuide` in `theme/`.

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

**Rebrand checklist:**

1. Edit HSL values in `theme.css` (`:root` and `.dark`) — start with `--primary` and `--background`.
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

## Preview & tests

```bash
npx pnpm@9.15.0 --filter @ashikur-portfolio/frontend-main dev
npx pnpm@9.15.0 --filter @ashikur-portfolio/shared test
```
