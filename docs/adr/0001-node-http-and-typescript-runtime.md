# Node HTTP and the TypeScript runtime

## Status

Accepted

## Context

The backend needs one HTTP entry, a use case, and a domain rule. A framework would decide routing, errors, and structure before the template has a second route.

TypeScript 7 is a native compiler. Version 7.0 typechecks and emits through the `tsc` CLI and does not ship a stable programmatic API. Node 24 runs TypeScript directly by stripping types. Stripping does not rewrite import paths, so a relative import must point at a real file.

## Decision

Handle HTTP with `node:http`. Keep the server in `apps/api/src/http`. Do not add Express, Fastify, Hono, or a router package.

Write relative imports with a `.ts` extension. Enable `rewriteRelativeImportExtensions` so `tsc` emits `.js` imports for `node dist/main.js`. In development, run `node --watch src/main.ts`.

Use TypeScript 7 only as a CLI (`tsc`). Do not add a tool that imports the TypeScript package API until a later release publishes a stable one.

## Consequences

- The request path is visible in one file.
- Production start requires a build. Development does not.
- Libraries that need the compiler API, including typed lint rules based on `typescript-eslint`, stay out.
- A framework can still be introduced later, behind an ADR, when routing itself becomes the problem.
