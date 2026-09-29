# ts-web-template

A small full-stack template for later web projects. It is a pnpm workspace with a SolidJS app, a Node API, and one greeting that crosses both.

The greeting is a tracer bullet, not a product. It exists so a newcomer can see the architecture in a few files.

## Stack

- Node.js 24 and TypeScript 7
- pnpm workspaces
- API: `node:http`, Vitest
- Web: SolidJS 1.9, Vite, Vitest, happy-dom, i18next, solid-i18next
- Biome for format and lint
- Lefthook on pre-commit
- GitHub Actions for verification

Kobalte and UnoCSS are allowed later, when a screen needs them. They are not installed.

## Prerequisites

- Node.js 24 (`nvm use` reads `.nvmrc`)
- pnpm 12 (`packageManager` pins `pnpm@12.4.2`; Corepack can install it)

## Install

```bash
pnpm install
```

The `prepare` script installs the Lefthook pre-commit hook. The hook runs Biome on staged files. Typecheck, tests, and build run in CI so the hook stays fast.

## Commands

From the repository root:

| Command | What it does |
| --- | --- |
| `pnpm dev` | API on port 3001 and Vite on port 5173 |
| `pnpm test` | API and web tests |
| `pnpm test:watch` | Vitest watch mode in both apps |
| `pnpm typecheck` | `tsc --noEmit` in both apps |
| `pnpm lint` | `biome check` |
| `pnpm format` | `biome check --write` |
| `pnpm build` | Emit the API to `apps/api/dist` and build the web app |

Open `http://localhost:5173`. Vite proxies `/api` and `/health` to the API, so the browser talks only to the Vite origin.

Copy `.env.example` to `.env` when you need a port other than 3001. Existing environment variables win over the file.

## Structure

```text
apps/api     HTTP, use case, domain
apps/web     SolidJS app
docs/adr     architecture decisions
docs/architecture
docs/plans
.cursor      rules and specialists
```

There is no `packages/` directory and no `infra/` directory.

## Architecture

```text
Browser → greeting feature → POST /api/greetings
        → http → greet use case → Name
        → { "name": "Ada" }
        → Hello, Ada.
```

The sentence is translated in the browser. The API returns the normalized name, or `{ "code": "GREETING_NAME_REQUIRED" }`.

`GET /health` returns `{ "status": "ok" }`.

Details and the error-code table live in [docs/architecture/overview.md](docs/architecture/overview.md). Decisions live in [docs/adr](docs/adr).

## Tests and TDD

New behavior starts with a failing test beside the code it describes.

1. Write the smallest test.
2. Run it and watch it fail.
3. Make it pass.
4. Refactor.
5. Repeat.

Backend tests run in Node. Frontend tests run in happy-dom and assert English copy. An integration test in the web app boots the real API and submits the form.

```bash
pnpm test
pnpm --filter @app/api test
pnpm --filter @app/web test
```

## Add a feature

1. Write the acceptance criteria and the non-goals.
2. Add a failing domain test, then the rule, under `apps/api/src/domain`.
3. Add a failing use-case test, then the use case, under `apps/api/src/application`.
4. Add a failing HTTP test that calls `fetch`, then the route.
5. Return a new stable error code if the rule can fail. Do not return a sentence.
6. Add a feature slice in `apps/web/src/features/<name>` with `ui`, `api`, and `index.ts`.
7. Compose it from a page. Keep the page free of request details.
8. Add locale keys before writing the component. See below.

Skip a layer when it would only forward a call. Do not add a shared package until a second app needs the same module.

## Translations

Locale files live in `apps/web/src/shared/locales/en/`. `common.json` holds shared copy. Each feature gets its own namespace file.

1. Add a key such as `submit` or `errors.nameRequired`. The key is an identifier, not a sentence.
2. Register a new namespace in `apps/web/src/shared/lib/i18n/config.ts` and in the `resources` passed to i18next.
3. Read it with `const [t] = useTranslation("greeting")` and pass the namespace on the call: `t("result", { ns: "greeting", name })`. `solid-i18next` 0.0.5 does not bind the namespace for you.
4. Interpolate with `{{name}}` inside the JSON value.
5. Map an API `code` to a key in the feature. Do not render text from the API.

To add a locale later, create `shared/locales/<locale>/<namespace>.json` and pass those resources to the same i18next instance. This version does not ship a language switcher.

Accessible names, placeholders, document title, and alerts go through the same files.

## Dependencies

Runtime:

- `solid-js` — UI runtime required by the template.
- `i18next` — locale lookup, interpolation, and namespaces.
- `solid-i18next@0.0.5` — Solid bindings. Pinned because the package is experimental. See [docs/adr/0003-static-english-i18n.md](docs/adr/0003-static-english-i18n.md).

The API has no runtime dependencies.

Development additions beyond the required toolchain:

- `vite-plugin-solid` — compiles Solid JSX. Vite does not do that alone.
- `@solidjs/testing-library` — renders a Solid tree and queries it in tests, instead of a local renderer.
- `@types/node` — types for `node:http` and the rest of the API runtime.
- `@app/api` (web dev dependency) — lets one web test boot the real server. The production bundle does not import it.

## Cursor

`AGENTS.md` is the map. `.cursor/rules` holds the standing constraints. `.cursor/agents` holds five specialists: tech lead, product manager, designer, backend engineer, and frontend engineer. Call the specialist the task needs. A small change does not need all five.

## License

MIT. See [LICENSE](LICENSE).
