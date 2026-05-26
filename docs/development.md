# Development

## Local prerequisites

- Docker Desktop (or Docker Engine) with Compose v2
- Node 20+ and Python 3.12+ for local editor tooling (Docker remains the runtime source of truth for apps)
- On Debian/Ubuntu, the host `python3` used for editor setup needs the matching **`python3.X-venv`** package (e.g. `python3.12-venv` or `python3.14-venv` for whatever `python3 --version` reports). Without it, `python3 -m venv` can create `apps/backend/.venv` with no `pip`

### Setup after clone

**Docker dev** (required on macOS before first `make dev-up`):

```bash
make dev-install-js
make dev-up
```

**Editor / local quality checks** (optional but recommended):

```bash
make editor-happy
```

Then open the repo root in VS Code/Cursor and run **Developer: Reload Window**. `editor-happy` installs host `node_modules` and `apps/backend/.venv`. On macOS, run `make dev-install-js` again before Docker dev so native JS binaries match Linux containers. See [Docker JS dependencies](#docker-js-dependencies-macos--bind-mounts).

See [Fixing editor import/package errors](#fixing-editor-importpackage-errors) if squiggles remain.

## Code quality (before PR)

Run the read-only quality gate from the repo root:

```bash
npx pnpm@9.15.0 check
# or: make check-code-quality
```

This matches CI **codebase-quality** (format, lint, typecheck, Vitest, Next builds, Ruff). Backend pytest and admin routing smoke run in Docker via `make test` (CI **docker-tests** job) — not part of `pnpm check`.

Auto-fix commands (JS/TS: Prettier formats, ESLint fixes logic/imports — `eslint-config-prettier` disables conflicting rules):

```bash
make fix-code-quality       # Prettier write + ESLint --fix (JS/TS) + Ruff format/lint --fix (Python)
# or:
npx pnpm@9.15.0 fix           # Prettier + ESLint only (no Python)
npx pnpm@9.15.0 format        # Prettier only
npx pnpm@9.15.0 lint:fix      # Prettier, then ESLint --fix
npx pnpm@9.15.0 python:format # Ruff format
npx pnpm@9.15.0 python:lint:fix
```

With format-on-save enabled, VS Code/Cursor uses Prettier for layout and ESLint for fixes (see `.vscode/settings.json`).

Full CI parity: `pnpm check` then `make test` (backend pytest + admin smoke in Docker). See [`testing.md`](testing.md).

### Blog (CMS + public site)

See [`blog.md`](blog.md) for workflows (save vs unpublish, SEO, resilience). For on-demand ISR after publish, set `BLOG_REVALIDATE_SECRET` and `FRONTEND_MAIN_URL` on admin and main (documented in [`environment-variables.md`](environment-variables.md)). Relevant tests: `apps/backend/tests/test_blog_posts.py`, `packages/shared/src/markdown/*.test.*`, `apps/frontend-admin/src/app/blog-posts/`, `apps/frontend-main/src/config/blog-metadata.test.ts`.

Deploying Docker images via a deployment branch uses the same test suite in CI first — see [`runbook-docker-deploy.md`](runbook-docker-deploy.md).

### Next.js production builds only

To confirm both frontends compile for production without running the full quality gate:

```bash
npx pnpm@9.15.0 build
# or: make build
```

This builds `frontend-main` and `frontend-admin` with `NEXT_PUBLIC_BACKEND_MAIN_API_URL` set (same as CI) and verifies each `.next/BUILD_ID` exists.

## Environment files

Copy examples:

```bash
cp infra/env/dev/.env.example infra/env/dev/.env
cp infra/env/test/.env.example infra/env/test/.env
```

Details: [`environment-variables.md`](environment-variables.md)

## Docker Compose location

- Compose files: **`infra/docker/compose/docker-compose.{dev,debug,test,prod}.yml`**
- Dockerfiles: **`infra/docker/<service>/`**
- Prefer **`make …`** targets; they run `docker compose --project-directory <repo-root> -f infra/docker/compose/...` so YAML paths resolve correctly.

Manual example (from repo root):

```bash
docker compose --project-directory "$(pwd)" -f infra/docker/compose/docker-compose.dev.yml up --build
```

## Start services

`make dev-up` and `make debug-up` start Compose **detached** (containers run in the background; that shell does not stream logs). Use **`make dev-logs`** / **`make debug-logs`** to follow all service logs, or run `docker compose ... logs -f <service>` for a single service.

Regular development:

```bash
make dev-up
```

On **macOS** (and other hosts where Docker runs Linux but you may install deps on the host), run `make dev-install-js` once before the first `make dev-up`, and again after `make editor-happy`. See [Docker JS dependencies (macOS / bind mounts)](#docker-js-dependencies-macos--bind-mounts).

Debug development (Django under debugpy):

```bash
make debug-up
```

## Database migrations

### How startup works

The **development backend container** does **not** run `makemigrations` on startup. It runs ([`apps/backend/docker-entrypoint-dev-common.sh`](../apps/backend/docker-entrypoint-dev-common.sh)):

1. `wait_for_db`
2. `makemigrations --check --dry-run` — fails if models changed but migration **files** are missing
3. `migrate --noinput` — applies committed migrations
4. `runserver` (or debugpy)

If step 2 fails, the container exits with:

```text
[backend] Model changes need migration files. Run: make backend-makemigrations
```

Logs may still show something like:

```text
Migrations for 'api':
  api/migrations/0001_initial.py
    + Create model ContactMessage
```

That is only a **preview** of what Django would generate (`--dry-run`). **No file is written** until you run `makemigrations` yourself.

Production and CI never auto-generate migrations; they only apply committed files.

### Create migration files after model changes

With the dev stack running and the `backend` service up:

```bash
make backend-makemigrations
```

Restart so migrations apply (`make dev-restart` or `make dev-up`). You usually do **not** need `make backend-migrate` after that — startup runs `migrate`.

**If the backend keeps crash-looping** (for example you deleted a migration file), `make backend-makemigrations` uses `exec` and needs a healthy container. Use a one-off container instead (postgres/redis must be up):

```bash
docker compose --project-directory . \
  -f infra/docker/compose/docker-compose.dev.yml \
  run --rm backend python manage.py makemigrations
```

Optional custom suffix (Django chooses the `0001_`, `0002_`, … prefix):

```bash
docker compose --project-directory . \
  -f infra/docker/compose/docker-compose.dev.yml \
  run --rm backend python manage.py makemigrations api --name contact_message
```

Creates `api/migrations/0001_contact_message.py` instead of `0001_initial.py`.

Limit to one app:

```bash
docker compose --project-directory . \
  -f infra/docker/compose/docker-compose.dev.yml \
  run --rm backend python manage.py makemigrations api
```

Confirm files exist on the host: `apps/backend/api/migrations/` (bind-mounted into the container).

### Migration file names

Django names files `{number}_{description}.py`, for example `0001_initial.py`:

| Part | Meaning |
|------|---------|
| `0001` | First migration for that app (then `0002`, …) |
| `initial` | Default label when it is the first migration that creates tables |

Use `--name your_suffix` when running `makemigrations` to replace `initial` with something clearer (e.g. `contact_message`). Do not rename migration files by hand after they exist unless you know how to fix dependencies and database state.

### Manual migrate

```bash
make backend-migrate
```

### Verify before a PR

```bash
make backend-check-migrations
```

Same idea as CI: `manage.py check` and `makemigrations --check --dry-run`.

### Common errors and fixes

#### Missing migration file (backend exits immediately)

**Symptoms**

- `make dev-logs` shows: `[backend] Model changes need migration files. Run: make backend-makemigrations`
- Logs may also show `Migrations for 'api':` and `+ Create model ContactMessage` — that is **not** a created file; it is the `--check --dry-run` preview (see [How startup works](#how-startup-works))
- `docker compose ps` shows `backend` restarting or exited
- Compose may show: `Container … backend … Error` and `dependency … failed` for **nginx**

**Cause**

You changed or added models in `apps/backend/` but there is no matching file under `apps/backend/<app>/migrations/`, or you deleted a migration file (for example `api/migrations/0001_initial.py`) while the model still exists.

**Fix**

1. Ensure postgres is running (`make dev-up` or at least postgres + redis).
2. Create migration files on the host (pick one):

   ```bash
   # Preferred when backend container is running
   make backend-makemigrations

   # When backend is crash-looping (one-off container; does not need backend to stay up)
   docker compose --project-directory . \
     -f infra/docker/compose/docker-compose.dev.yml \
     run --rm backend python manage.py makemigrations
   ```

3. Confirm the file exists: `ls apps/backend/api/migrations/` should list `0001_*.py` (or the next number if you already had earlier migrations).
4. Restart: `make dev-restart`
5. Optional: `make dev-logs` — you should see `[backend] Migrations completed.` and the server starting.

#### `make backend-makemigrations` fails (container not running)

**Symptoms**

- `service "backend" is not running` or `exec` errors when running `make backend-makemigrations`

**Fix**

Use `docker compose … run --rm backend python manage.py makemigrations` (see [Create migration files](#create-migration-files-after-model-changes)). `run` starts a temporary container; `exec` requires the long-lived `backend` service to be up.

#### Nginx / dependency failed but frontend-main started

**Symptoms**

```text
✘ Container …-backend-1  Error dependency …
✔ Container …-frontend-main-1  Started
```

**Cause**

[`docker-compose.dev.yml`](../infra/docker/compose/docker-compose.dev.yml) configures **nginx** with `depends_on: backend: condition: service_healthy`. If the backend never becomes healthy (often because of the migration check above), nginx fails. **frontend-main** only depends on `backend` starting, not being healthy, so it may still run on port **3000**.

**Fix**

Fix the backend first (missing migrations). Portfolio UI on :3000 may load, but API routes (contact form, health via nginx on :8080) need a healthy backend.

#### “Relation does not exist” / migration applied in DB but file missing (or the reverse)

**Symptoms**

- API errors mentioning `api_contactmessage` or similar tables missing
- Or migrations fail because DB state does not match files

**Fix**

- If the **file** is missing: recreate with `makemigrations` (see above), then `make dev-restart` (startup runs `migrate`).
- If you deleted the file but the **table already exists** in Postgres from an earlier run, you may need a one-off reset in dev only: stop stack, remove the postgres dev volume (wipes data), `make dev-up`, `makemigrations`, `migrate`, recreate superuser. See [Migration issues](runbook-troubleshooting.md#migration-issues).

#### Will removing all Docker images or volumes help?

**Usually no** for a missing migration file.

| Action | Effect |
|--------|--------|
| Delete **images** | Rebuild containers; does **not** recreate `api/migrations/*.py` on disk |
| Delete **postgres** volume | **Wipes the database**; you still must run `makemigrations` and `migrate` |

Migration files live under `apps/backend/` on your machine (bind mount), not inside a backend image or volume.

#### Inspect logs

```bash
make dev-logs
# backend only:
docker compose --project-directory . \
  -f infra/docker/compose/docker-compose.dev.yml logs backend --tail 80
```

See also [Migration issues](runbook-troubleshooting.md#migration-issues) in the troubleshooting runbook.

## Django admin superuser

**Interactive (one-off):**

```bash
make backend-createsuperuser
```

**Sync from environment (idempotent, all environments):**

1. Set `ADMIN_SUPERUSERS` in the environment file for that stack (see [`docs/environment-variables.md`](environment-variables.md)).
2. Run the matching Make target:

| Environment | Command |
| ----------- | ------- |
| Dev | `make backend-sync-superusers` |
| Prod | `make prod-sync-superusers` |
| Test DB | `make test-sync-superusers` |

By default, existing passwords are **not** overwritten. Set `ADMIN_SUPERUSER_UPDATE_PASSWORD=true` only when you intend to push a new password from env.

**Issue a temporary password (server console, existing user only):**

| Environment | Command |
| ----------- | ------- |
| Dev | `make backend-reset-user-password` |
| Prod | `make prod-reset-user-password` |
| Test DB | `make test-reset-user-password` (supports `--username` for automation) |

The temporary password is printed once. Instruct the user to sign in and change it from **Change password** on the profile page.

Use the same credentials to sign in to the **Next admin app** at `http://localhost:3001/login` (not only Django HTML admin at `http://localhost:8080/admin/`). Only **active superusers** can access the Next admin app.

## Next admin app authentication

| Route | Purpose |
| ----- | ------- |
| `/login` | Public sign-in page |
| `/` | Protected profile (requires session) |
| `/change-password` | Change own password (requires session) |

**Local flow:**

1. `make dev-up` and copy `infra/env/dev/.env` from the example.
2. `make backend-createsuperuser`
3. Open `http://localhost:3001/login` (admin UI) — API calls should use `NEXT_PUBLIC_BACKEND_MAIN_API_URL=http://localhost:8080` (Nginx → Django).
4. Sign in; you are redirected to `/` with your profile.
5. Sign out from the navbar button; you return to `/login`.

**Shared API usage (do not call `fetch`/`axios` in app components):**

```ts
import { adminAuthApi, ensureAdminCsrf } from '@ashikur-portfolio/shared/api';

await ensureAdminCsrf();
await adminAuthApi.login({ usernameOrEmail: 'admin', password: '…' });
const user = await adminAuthApi.getCurrentUser();
await adminAuthApi.updateProfile({ firstName: 'Ada', lastName: 'Admin', email: 'ada@example.com' });
await adminAuthApi.changePassword({
  currentPassword: '…',
  newPassword: '…',
  confirmPassword: '…',
});
await adminAuthApi.logout();
```

**Profile API:** `GET` / `PATCH` `/api/admin/auth/me/` — safe fields only (`firstName`, `lastName`, `email`). **Password:** `POST` `/api/admin/auth/change-password/` — requires current password; session stays valid after change.

`frontend-admin` wraps the app in `AdminAuthProvider` and uses `RequireAdminAuth` / `RedirectIfAuthenticated` guards. On refresh, the provider calls `ensureAdminCsrf()` then `getCurrentUser()` to restore the session.

**Adding another protected admin page:** place it under `src/app/`, wrap content with `RequireAdminAuth`, and use `useAdminAuth()` for user state.

**Backend tests:** `make test-backend` (includes `tests/test_admin_auth.py`).

**Frontend tests:** `npx pnpm@9.15.0 --filter @ashikur-portfolio/frontend-admin test`

## Release metadata

Public release information is served by **`GET /api/public/meta/`**. Values come from source-controlled code in [`apps/backend/api/app_metadata.py`](../apps/backend/api/app_metadata.py), not deployment environment variables. That keeps version updates intentional, reviewable, and tied to the code being deployed.

**Update before each release:**

1. Edit `APP_METADATA` in `app_metadata.py` (`version`, `releaseDate`, optional `releaseLabel`).
2. Run format and tests (see [Code quality (before PR)](#code-quality-before-pr)).
3. Verify the endpoint, for example: `curl -s http://localhost:8080/api/public/meta/`

**Example response:**

```json
{
  "appName": "Ashikur Portfolio",
  "version": "1.0.0",
  "releaseDate": "2026-05-16",
  "releaseLabel": "Latest Release"
}
```

Only expose public-safe fields in this endpoint (no commit SHA, build timestamps, hostnames, environment names, secrets, or infrastructure details).

### Release checklist

Before creating a release branch or deployment:

- [ ] Update `version` and `releaseDate` in `apps/backend/api/app_metadata.py`
- [ ] Update `releaseLabel` if needed
- [ ] Run `npx pnpm@9.15.0 python:format` and `make test` (or `make test-backend`)
- [ ] Confirm `GET /api/public/meta/` returns the expected JSON

## Shared package workflow

The shared library lives in `packages/shared` and is consumed via workspace protocol:

```json
"@ashikur-portfolio/shared": "workspace:*"
```

Next.js is configured to transpile the workspace dependency (`transpilePackages`).

### Shared UI

Import components from `@ashikur-portfolio/shared/ui` and styles once per app layout. See [`ui-system.md`](ui-system.md) for theming, shadcn CLI usage, and component rules.

```tsx
import { Button, Alert, Navbar } from '@ashikur-portfolio/shared/ui';
import '@ashikur-portfolio/shared/ui/styles/globals.css';
```

Run UI tests: `npx pnpm@9.15.0 --filter @ashikur-portfolio/shared test`

### Resume PDF (frontend-main)

The portfolio resume is served from [`apps/frontend-main/public/AshikurRahmanResume.pdf`](../apps/frontend-main/public/AshikurRahmanResume.pdf). Replace that file to update the downloadable PDF; `/resume` previews it inline.

Optional override for a CDN or alternate path: `NEXT_PUBLIC_RESUME_PDF_URL` (see [`site-links.ts`](../apps/frontend-main/src/config/site-links.ts)).

The nginx path must match the default PDF filename (`/AshikurRahmanResume.pdf`). Dev and prod nginx use [`security-headers-frameable.conf`](../infra/nginx/snippets/security-headers-frameable.conf) for that location so the PDF can load in a same-origin iframe (global nginx headers use `X-Frame-Options: DENY`).

If the iframe preview shows "refused to connect" or a CSP `frame-ancestors 'none'` error behind dev nginx (`:8080`), verify headers and restart nginx:

```bash
curl -I http://localhost:8080/AshikurRahmanResume.pdf | grep -Ei 'x-frame|content-security'
# Expected: X-Frame-Options: SAMEORIGIN (not DENY)
# Through nginx, upstream CSP is stripped; iframe embed relies on SAMEORIGIN + no frame-ancestors none.
# Direct Next (port 3000) should send frame-ancestors 'self':
curl -I http://localhost:3000/AshikurRahmanResume.pdf | grep -i content-security-policy
# Expected: frame-ancestors 'self', not 'none'

docker compose --project-directory . -f infra/docker/compose/docker-compose.dev.yml restart nginx
```

After changing the prod nginx template, re-render config with `make prod-nginx-config` before deploy.

### Backend API client

All browser-to-backend HTTP goes through `@ashikur-portfolio/shared`. **Do not** install or import Axios in `apps/frontend-main` or `apps/frontend-admin`.

**Typical usage (endpoint helper):**

```ts
import { getHello } from '@ashikur-portfolio/shared/api/hello';
import { useApi } from '@ashikur-portfolio/shared/hooks/useApi';

const { state, reload } = useApi(() => getHello());
```

**Direct client usage:**

```ts
import { backendMainApi, isApiError } from '@ashikur-portfolio/shared/api';

type HealthResponse = { status: string };

try {
  const health = await backendMainApi.get<HealthResponse>('/api/health/');
} catch (error) {
  if (isApiError(error)) {
    // error.message is safe for UI; error.isUnauthorized for future redirect
  }
}
```

**Adding another backend later:**

1. Add `NEXT_PUBLIC_BACKEND_SECONDARY_API_URL` to env templates and `packages/shared/src/api/core/env.ts`.
2. Create `packages/shared/src/api/clients/backend-secondary.ts` with `createApiClient(...)`.
3. Export from `packages/shared/src/api/index.ts`.
4. Use `backendSecondaryApi.get(...)` in app code.

**Developer rules:**

- Do not duplicate API clients inside frontend apps.
- Do not hardcode API URLs; use `NEXT_PUBLIC_BACKEND_MAIN_API_URL`.
- Do not expose raw backend or Axios errors to users.
- Do not log secrets, tokens, cookies, `Authorization`, CSRF headers, or sensitive request bodies.

**CSRF (admin session auth via `backendAdminApi`):**

The admin client uses `withCredentials: true` and `csrf.tokenProvider` backed by `GET /api/admin/auth/csrf/` (required in production because `CSRF_COOKIE_HTTPONLY=True`). `backendMainApi` remains stateless (`withCredentials: false`).

## Common commands

See the [Makefile reference](./TECHNICAL_SETUP.md#makefile-reference) in [TECHNICAL_SETUP.md](./TECHNICAL_SETUP.md).

## Regular dev vs debug dev

- **Regular dev** ([`infra/docker/compose/docker-compose.dev.yml`](../infra/docker/compose/docker-compose.dev.yml)): fastest iteration; Django `runserver` without debugpy.
- **Debug dev** ([`infra/docker/compose/docker-compose.debug.yml`](../infra/docker/compose/docker-compose.debug.yml)): same topology, exposes **5678** and runs Django under debugpy for IDE attach debugging.

## VS Code attach debugging

See [`runbook-development.md`](runbook-development.md#debug-django-with-vs-code) for the step-by-step attach flow.

## Docker JS dependencies (macOS / bind mounts)

Dev and debug Compose bind-mount the repo (`.:/workspace`), so frontends use **host** `node_modules`. Native packages (Tailwind’s `lightningcss`, `@tailwindcss/oxide`, etc.) must match the **Linux** container, not macOS.

### Symptoms

- `Cannot find module '../lightningcss.linux-arm64-gnu.node'` in `make dev-logs`
- `http://localhost:8080/` returns **500** with a CSS / PostCSS build error

### Fix

```bash
make dev-install-js
make dev-up
# or, if the stack is already up:
make dev-restart
```

For the debug stack: `make debug-install-js` then `make debug-up` (or `make debug-restart`).

This does **not** affect production: prod images install and build entirely inside Linux with no host `node_modules` mount.

### Host vs Docker tooling

| Goal | Command |
|------|---------|
| Run frontends in Docker (macOS) | `make dev-install-js` then `make dev-up` |
| VS Code/Cursor + local `pnpm check` on the host | `make editor-happy` |
| Both | `make editor-happy`, then `make dev-install-js` before `make dev-up` |

Do not run `make editor-happy` immediately before Docker dev on Apple Silicon without re-running `make dev-install-js` — host installs pull darwin binaries that Linux containers cannot load.

More detail: [`runbook-troubleshooting.md`](runbook-troubleshooting.md#frontend-build-error-lightningcsslinux-arm64-gnunode-docker-on-mac).

## Fixing editor import/package errors

### Quick fix

```bash
make editor-happy
```

Then **Developer: Reload Window** in VS Code/Cursor.

### Why errors appear

`node_modules` and `apps/backend/.venv` are gitignored. Language servers need local installs even when Docker runs the apps. Open the **repo root**, not `apps/frontend-main` or `apps/backend` alone.

### Confirm imports resolve

- **TypeScript:** open a frontend file — `@ashikur-portfolio/shared/...` and `react` should have no red squiggles
- **Python:** open `apps/backend/api/views.py` — `rest_framework` should resolve
- **Interpreter:** status bar should show `apps/backend/.venv/bin/python`

Optional checks from repo root:

```bash
npx pnpm@9.15.0 typecheck
source apps/backend/.venv/bin/activate && ruff check apps/backend
```

### Manual setup (if `make editor-happy` fails)

```bash
# Debian/Ubuntu: X = minor version from `python3 --version` (e.g. 3.14 -> python3.14-venv)
sudo apt install python3.X-venv
rm -rf apps/backend/.venv   # required if a prior run left a venv without pip

npx pnpm@9.15.0 install
python3 -m venv apps/backend/.venv
apps/backend/.venv/bin/python -m pip install -r apps/backend/requirements-dev.txt
```

Select interpreter: **Python: Select Interpreter** → `apps/backend/.venv`.

### Still complaining?

| Symptom                                                                  | Try                                                                                                                                                                                                                                                                                                          |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| JS/TS modules missing                                                    | Re-run `make editor-happy`; **TypeScript: Restart TS Server**; **TypeScript: Select TypeScript Version** → Use Workspace Version                                                                                                                                                                             |
| Python modules missing (`django`, `rest_framework`)                      | Re-run `make editor-happy`; **Python: Select Interpreter** → `apps/backend/.venv`; reload window. If using **BasedPyright** (Cursor default), repo settings point it at `apps/backend` — ensure you opened the **monorepo root**, not `apps/backend` alone                                                   |
| Works in VS Code but not **Cursor**                                      | Cursor uses built-in **Cursor Pyright** (`cursorpyright`), not Pylance. Run `make editor-happy` (creates a root `.venv` symlink), reload window, and select `apps/backend/.venv`. Disable the **BasedPyright** extension in Cursor if installed (it conflicts). Optional: **Cursor Pyright: Restart Server** |
| BasedPyright / Pyright `reportMissingImports`                            | Reload window. Root [`pyrightconfig.json`](../pyrightconfig.json) points at `apps/backend/.venv`                                                                                                                                                                                                             |
| `make editor-happy` fails with pnpm `ENOENT` on `node_modules/.pnpm/...` | Corrupted install — run `rm -rf node_modules && make editor-happy` (the script retries automatically on failure)                                                                                                                                                                                             |
| `make editor-happy`: `apps/backend/.venv/bin/pip: No such file or directory` (or script says pip is not available) | Install `python3.X-venv` for your `python3` version, `rm -rf apps/backend/.venv`, re-run `make editor-happy`. See [runbook-troubleshooting.md](runbook-troubleshooting.md#editor-setup-fails-missing-pip)                                                                                                                                                                  |
| `.next/types` warnings                                                   | Run `pnpm dev` once in a frontend app, or ignore until first dev session                                                                                                                                                                                                                                     |
| Wrong workspace                                                          | Close folder and re-open the **monorepo root**                                                                                                                                                                                                                                                               |
| Docker frontend **500**, `lightningcss.linux-arm64-gnu.node` in logs     | `make dev-install-js` then `make dev-up` or `make dev-restart` — see [Docker JS dependencies](#docker-js-dependencies-macos--bind-mounts)                                                                                                                                                                   |
