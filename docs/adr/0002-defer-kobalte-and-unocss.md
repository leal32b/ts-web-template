# Defer Kobalte and UnoCSS

## Status

Accepted

## Context

The template lists Kobalte and UnoCSS as the UI tools to reach for when a screen needs them. The first screen is a form with a label, a text field, a button, and a message. The platform already provides those controls, and a short stylesheet can set font, spacing, and focus.

Adding either library now would put a design system, or the start of one, under a single example.

## Decision

Ship the tracer bullet with semantic HTML and `apps/web/src/app/app.css`.

Add Kobalte only when a behavior needs a composed widget that native elements do not cover well, such as a dialog or a combobox. Add UnoCSS only when utility classes remove more CSS than they introduce. Each addition needs a reason in the README.

## Consequences

- The first screen has no UI runtime beyond SolidJS.
- Accessible behavior comes from the elements themselves: label, submit button, alert, status.
- A later project can adopt either library without unwinding an unused setup.
