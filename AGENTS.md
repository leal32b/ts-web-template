# Agents

This repository is a small full-stack template. Prefer clarity over machinery.

## Map

| Question | Where |
| --- | --- |
| Frontend | `apps/web` |
| Backend | `apps/api` |
| Domain | `apps/api/src/domain` |
| Use cases | `apps/api/src/application` |
| HTTP adapter | `apps/api/src/http` |
| Tests | Next to the code they describe (`*.test.ts`, `*.test.tsx`) |
| UI strings | `apps/web/src/shared/locales/en` |
| i18n setup | `apps/web/src/shared/lib/i18n` |
| Architecture | `docs/architecture/overview.md` and `docs/adr` |
| Plans | `docs/plans` |
| Cursor rules | `.cursor/rules` |
| Specialists | `.cursor/agents` |

## Commands

Run these from the repository root, on Node 24:

```bash
pnpm install
pnpm dev
pnpm test
pnpm typecheck
pnpm lint
pnpm format
pnpm build
```

## How to work

1. Understand the problem and write the acceptance criteria.
2. Touch only the architecture the change needs. Update an ADR when the decision is not obvious.
3. Write the smallest failing test.
4. Make it pass with the smallest change.
5. Refactor with the tests green.
6. Run lint, typecheck, and tests.
7. Update the docs that a newcomer would rely on.

Do not implement a feature in one pass. Do not add a dependency, a package, or a layer "for later".

## Specialists

Use one specialist, not the whole roster, unless the task truly crosses roles.

- `tech-lead` — architecture, TDD, boundaries, ADRs, plans, review.
- `product-manager` — scope, acceptance, non-goals. Read-only.
- `designer` — UX, accessibility, visual hierarchy. Read-only.
- `backend-engineer` — domain, use cases, HTTP, backend tests.
- `frontend-engineer` — SolidJS, Feature-Sliced slices, i18n, frontend tests.

## Rules that always hold

- Repository text is English. Chat with the user can be another language.
- Test-driven development is the default. Skip it only when the user explicitly says so for that task.
- Backend responses carry data and stable error codes, never translated UI copy.
- User-visible frontend strings live in locale JSON. That includes accessible names, placeholders, titles, and alerts.
- `http` depends on `application`. `application` depends on `domain`. `domain` depends on nothing inside the app.
- Frontend slices import each other through `index.ts`.
- TypeScript 7 is used through `tsc` only. Do not import the compiler API.
- Kobalte and UnoCSS stay out until a concrete UI need cannot be met with HTML and the existing stylesheet.
