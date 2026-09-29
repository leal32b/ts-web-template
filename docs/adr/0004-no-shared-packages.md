# No shared packages yet

## Status

Accepted

## Context

A pnpm workspace can hold shared packages. The first version has two apps and one HTTP contract: a JSON object with `name` on success, and `code` on failure. Duplicating that tiny contract is cheaper than a package both sides must version.

## Decision

Do not create `packages/`. `@app/web` may depend on `@app/api` in development so a test can boot the real server. Production UI code imports the HTTP client in the web app, not the server source.

Create a shared package only when a second runtime caller needs the same module.

## Consequences

- The workspace file lists `apps/*` only.
- Error-code strings are written in both apps. The integration test keeps them honest.
- Extracting a package later is a move, not a rewrite of the dependency direction.
