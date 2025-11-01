# Code Standards

This document codifies the minimum expectations for changes to the Watt Media Astro site. Keep it lightweight, but treat these guidelines as blocking requirements for pull requests.

## General Practices
- Prefer small, scope-limited commits with clear Conventional Commit messages (`feat:`, `fix:`, etc.).
- Update documentation (`README.md`, `AGENTS.md`, `STANDARDS.md`) when behaviour, workflows, or tooling change.
- Run the full local check suite before opening a PR: `npm run lint`, `npm run typecheck`, `npm run test -- run src/test/utils/offerMath.test.ts src/test/utils/offerCodes.test.ts`, `npm run build`.
- Never commit broken `npm run build` output; CI/CD assumes production builds remain green.

## Styling & Formatting
- Use Prettier defaults (2-space indent, single quotes in TypeScript/JavaScript, double quotes in Astro templates).
- Keep Astro components clean: prefer importing data/config directly instead of literal duplication.
- Escape arrow characters (`->`) as `-&gt;` in Astro markup to avoid lint errors.
- For client scripts that must run inline, add `is:inline` to avoid Astro warnings.

## Testing Expectations
- Every new calculation or parsing path needs a focused unit test. Extend `src/test/utils/offerMath.test.ts` or similar utilities rather than mixing logic into UI tests.
- Use Vitest’s targeted runs (`npm run test -- run path/to/file.test.ts`) locally to keep feedback fast.
- For UI-only tweaks, add smoke tests only when behaviour is non-trivial (e.g., interactive flows, form validation). Pure style updates can lean on lint + build.

## Seasonal Offer Flow
- Seasonal discount rules live in `src/data/offers.ts`. Always update the config and associated tests when changing prefix, ranges, or messaging.
- The offer page and calculator must remain guarded: no pricing shows until a valid code is applied; query-string codes must auto-unlock the calculator.
- Keep any “example code” text in sync with config values to avoid confusing clients.

## Accessibility & Content
- Maintain high-contrast text when adding panels or gradients; verify with a quick Lighthouse or DevTools contrast check for new sections.
- When introducing promo messaging, avoid hard-coded amounts—drive text from config or plain language (“seasonal savings”) so future changes are low-effort.
