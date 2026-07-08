# playwright-ts-practice

Hands-on Playwright + TypeScript practice suite. ~94 tests across 45 spec files exploring locators, frames, dialogs, uploads, tables, keyboard/mouse actions, and OpenCart auth flows against public demo sites.

## Stack

- [Playwright Test](https://playwright.dev/) `1.59.1`
- TypeScript
- Node.js (see `@types/node` in [package.json](package.json))

## Prerequisites

- Node.js 18+
- Git

## Setup

```bash
npm install
npx playwright install
```

`npx playwright install` downloads the browser binaries (Chromium is required; the config only runs Chromium by default).

## Running tests

| Command | What it does |
|---|---|
| `npm test` | Headless run of the full suite (default, pipeline-safe) |
| `npm run test:headed` | Same, but with a visible browser — useful for local debugging |
| `npm run test:ui` | Playwright UI mode with time-travel debugger |
| `npm run report` | Open the last HTML report |
| `npm run codegen` | Launch Playwright codegen against the OpenCart register page |

Run a single spec:

```bash
npx playwright test tests/webtablepagination.spec.ts
```

Run one test by title:

```bash
npx playwright test -g "single file upload test"
```

## Project layout

```
.
├── playwright.config.ts     # Test config (headless, retries, workers, globalSetup)
├── src/
│   └── globallogin.ts       # globalSetup — logs in and writes storageState.json
├── tests/
│   ├── *.spec.ts            # 45 spec files
│   └── fixtures/            # Assets used by fileupload.spec.ts
├── storageState.json        # Regenerated on every run by globalSetup
└── playwright-report/       # HTML report output (git-ignored)
```

## Authenticated tests & storageState

[opencart.spec.ts](tests/opencart.spec.ts) uses `test.use({ storageState: 'storageState.json' })` for pre-authenticated sessions.

`storageState.json` is refreshed automatically before every run by the `globalSetup` hook in [src/globallogin.ts](src/globallogin.ts). No manual login step needed.

Credentials for the public demo site (`naveenautomationlabs.com`) are hardcoded in `globallogin.ts`. For real projects, move them to env vars.

## File-upload fixtures

Upload tests in [tests/fileupload.spec.ts](tests/fileupload.spec.ts) read from [tests/fixtures/](tests/fixtures/) via `path.join(__dirname, 'fixtures', ...)`, so they run on any OS (Windows, Linux CI, macOS) without path edits.

## CI / pipeline notes

- `headless: true` by default — no display required.
- Retries and workers auto-scale based on `process.env.CI` (see [playwright.config.ts](playwright.config.ts)).
- Every spec hits public demo sites over the internet. Flakiness is expected when third-party services are slow or down.

## External sites exercised

`naveenautomationlabs.com/opencart`, `spicejet.com`, `bigbasket.com`, `jqueryui.com`, `google.com`, `amazon`, `rediff.com`, `practice.expandtesting.com`, `jsonplaceholder.typicode.com`, and others.
