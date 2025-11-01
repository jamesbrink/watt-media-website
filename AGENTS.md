# Repository Guidelines

This guide outlines how to work effectively on the Astro-based wattmedia.au site. Follow the practices below to keep contributions consistent and maintainable.

## Project Structure & Module Organization
- `src/pages/` defines public routes; use nested folders when grouping related content.
- `src/components/` and `src/layouts/` hold reusable Astro building blocks; prefer `PascalCase` filenames.
- `src/test/` contains Vitest suites (`*.test.js|ts`) and helpers (`setup.js`); mirror the source structure under `components/` or `utils/`.
- `public/` serves static assets directly; place optimized images under `public/images/` to keep import paths simple.
- `e2e/` stores Playwright specs; update `playwright.config.ts` when adding new test suites.
- Top-level config (Astro, Tailwind, Vitest, Playwright) lives beside `package.json`—touch only when adjusting shared tooling.

## Build, Test, and Development Commands
- `npm run dev` — start the Astro dev server on port 4321 with hot reload.
- `npm run build` — produce the static bundle in `dist/`; run before shipping changes.
- `npm run preview` — serve the build output for acceptance checks.
- `npm run test` / `npm run test:coverage` — execute Vitest suites; the latter reports V8 coverage.
- `npm run test:e2e` — run Playwright specs (call `npm run test:e2e:install` once per machine).
- `npm run lint`, `npm run lint:fix`, and `npm run typecheck` — validate code style and TypeScript types.
- Docker: `docker compose up` mirrors `npm run dev`; `nix develop` + `dev` give a reproducible shell.

## Coding Style & Naming Conventions
- Follow Prettier defaults (2-space indentation, 100-char lines); run `npx prettier .` if formatting drifts.
- Use ESLint for `.js/.ts/.astro` files and keep Tailwind utilities ordered; avoid inline styles unless necessary.
- Name components and layouts in `PascalCase`, helper modules in `camelCase`, and tests as `<feature>.test.ts`.

## Testing Guidelines
- Co-locate unit tests under `src/test/` mirroring feature folders; reuse `src/test/setup.js` for shared fixtures.
- Add coverage-relevant assertions for new routes or components and ensure `npm run test:coverage` stays green locally.
- Keep Playwright specs idempotent; use descriptive `test.describe` blocks and capture UI screenshots when behavior changes.

## Commit & Pull Request Guidelines
- Follow Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`) as shown in recent history (e.g., `fix: Change yellow price text to dark gray for better readability`).
- Each PR should describe the problem, solution, and testing performed; link issues and attach relevant screenshots for UI updates.
- Ensure CI passes (`lint`, `typecheck`, unit, and e2e tests) before requesting review; mention any intentionally skipped checks in the PR body.

For additional expectations, review `STANDARDS.md`.
