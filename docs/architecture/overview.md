# Architecture

This template shows one request crossing a small stack. The example domain is a greeting: a person submits a name, the API normalizes it, and the page renders a translated sentence.

## Request path

```text
Browser
  → SolidJS greeting feature
  → POST /api/greetings
  → node:http
  → greet use case
  → Name value object
  → { "name": "Ada" }
  → t("result", { name })
```

In development, Vite proxies `/api` and `/health` to the API on port 3001. The browser stays on the Vite origin. There is no CORS library.

## Backend

```text
apps/api/src/
  main.ts            process entry
  config.ts          PORT and optional .env
  domain/name.ts     Name rule
  application/greet.ts
  http/server.ts     routes and status codes
```

`domain` imports nothing from `application` or `http`. The use case is the only caller of the domain rule from the outside. The HTTP layer is the only place that knows status codes.

Success body: `{ "name": "Ada" }`.

Failure body: `{ "code": "GREETING_NAME_REQUIRED" }`. Codes used by the tracer:

| Code | When | Status |
| --- | --- | --- |
| `GREETING_NAME_REQUIRED` | Missing or blank name | 400 |
| `GREETING_NAME_TOO_LONG` | More than 40 characters after trim | 400 |
| `INVALID_JSON` | Body is not a JSON object with a string `name` | 400 |
| `PAYLOAD_TOO_LARGE` | Body is over 4 KiB | 413 |
| `NOT_FOUND` | Unknown path | 404 |
| `METHOD_NOT_ALLOWED` | Wrong method on a known path | 405 |
| `UNEXPECTED` | Anything else | 500 |

`GET /health` returns `{ "status": "ok" }`.

## Frontend

```text
apps/web/src/
  app/                  bootstrap, provider, stylesheet
  pages/home/           composes the feature
  features/greeting/    form, messages, HTTP client
  shared/lib/i18n/      i18next init
  shared/locales/en/    common.json, greeting.json
```

A slice imports another slice through `index.ts`. Strings rendered to a person come from the locale files.

## What is intentionally absent

No database, ORM, auth, queues, cache, Docker, deploy target, shared runtime package, design system, Kobalte, or UnoCSS. See `docs/adr` for the decisions behind that list.
