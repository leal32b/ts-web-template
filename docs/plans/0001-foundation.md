# Foundation plan

## Objective

Create a small pnpm monorepo that can host later web projects: a typed API, a SolidJS app, tests, formatting, a fast pre-commit check, CI, and a greeting that crosses the stack.

## Context

The repository starts as a template, not a product. The greeting exists to prove the path from the browser to a domain rule and back to a translated sentence.

## Scope

- Node 24, TypeScript 7, pnpm, Biome, Lefthook, Vitest.
- API on `node:http` with one use case and one value object.
- SolidJS app with Feature-Sliced slices and static English i18n.
- GitHub Actions for install, lint, typecheck, test, and build.
- Cursor rules and five specialists.

## Non-scope

Database, ORM, authentication, queues, cache, observability platform, deploy, Docker, cloud vendor, Playwright, ESLint, Prettier, commit lint, Kobalte, UnoCSS, language switcher, shared packages, and a design system.

## Steps

1. Record architecture, ADRs, Cursor rules, and specialists.
2. Add the workspace, TypeScript, Biome, and Lefthook.
3. Build the API test-first: name, use case, HTTP, health, config.
4. Build the web app test-first: locales, form, client.
5. Connect them with the Vite proxy and a UI test against the real server.
6. Load `.env` from the repository root and document local execution.
7. Add CI.
8. Re-read the README against the commands that actually pass.

## Risks

- `solid-i18next@0.0.5` is experimental. It is pinned. A future upgrade needs a test run, not a range bump.
- TypeScript 7.0 has no stable compiler API. Tooling must keep using `tsc` and the bundlers' own transforms.
- The web integration test imports the API source. That dev dependency must not leak into the UI bundle.

## Validation

From the repository root on Node 24:

```bash
pnpm install
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

`pnpm dev` serves the web app and the API. Submitting a name renders `Hello, <name>.` A blank name renders the required-name copy from the locale file.
