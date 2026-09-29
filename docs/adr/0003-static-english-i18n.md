# Static English i18n

## Status

Accepted

## Context

User-visible copy must not live in components. The template needs interpolation and a place for later locales, without a language switcher, a CDN, or a key codegen step.

`solid-i18next` on npm (the `lkwr` package) is the adapter that matches Solid 1.9 and i18next 26. Its `useTranslation` hook returns a tuple. The package is still at `0.0.x` and marks itself experimental. The archived `@mbarzda/solid-i18next` package is not the one named for this template.

## Decision

Initialize one i18next instance in `apps/web/src/shared/lib/i18n` and pass it through `I18nextProvider`.

- Default and fallback locale: `en`.
- Load locale JSON from the bundle. Do not add `i18next-http-backend` or a language detector.
- Namespaces: `common` and one file per feature (`greeting`).
- Keys are identifiers (`result`, `errors.nameRequired`).
- Components call `const [t] = useTranslation("greeting")`. Version 0.0.5 loads that namespace but does not bind it onto `t`, so each call also passes `{ ns: "greeting" }`.
- Pin `solid-i18next` to `0.0.5`.
- The API returns data and stable error codes. The feature maps a code to a key.

Set `interpolation.escapeValue` to `false` and render translations as Solid text, which escapes HTML.

## Consequences

- Adding a locale is a new folder under `shared/locales` plus a resource entry. The layout does not have to change.
- There is no in-app language switcher in this version.
- A breaking change inside `solid-i18next` is a conscious upgrade, not a floating range.
- Translated sentences are not a shared package with the API.
