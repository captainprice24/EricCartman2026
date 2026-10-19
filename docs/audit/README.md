# Project audit evidence

The [full report](../PROJECT_AUDIT.md) audits application commit `ef17a7f3e96da78a40817dfc17ecc7b6dd4a962c`. Findings are open. Audit scripts collect observations, including expected defective behaviour; successful execution is not a claim that the product passed those probes.

Files:

- `project-probes.json`: isolated browser contexts for modal focus, tooltip dismissal, practice feedback, calculator chaining, invalid storage, failed writes, wide-table keyboard behaviour, lesson/frame consistency, 320px layout, direct disk access and an exact reproduction of the workflow's site file list.
- `question-bank-evidence.json`: full inventory, numerical fillers, verbal/abstract heuristic measurements, semantic sample IDs, coverage limits and raster comparison of every abstract question's stimuli and choices.
- `dependency-audit.json`: `npm audit --json` advisory snapshot. All package counts are development tooling; the app has no runtime package dependencies.

Run from the repository root with the development dependencies installed:

```bash
npm run lint
npm test
npm run validate
npm run build
git diff --exit-code -- dist/ad5-reasoning-trainer.html version.js
python -m http.server 8000 --bind 127.0.0.1
```

In another terminal:

```bash
E2E_BASE_URL=http://127.0.0.1:8000 CHROMIUM_PATH=/usr/bin/chromium npm run test:e2e
CHROMIUM_PATH=/usr/bin/chromium node scripts/audit-project.mjs
CHROMIUM_PATH=/usr/bin/chromium node scripts/audit-question-bank.mjs
npm audit --json > docs/audit/dependency-audit.json
git ls-remote --symref origin HEAD
```

Omit `CHROMIUM_PATH` when Playwright's Chromium is installed, or point it to your system browser. The audit scripts accept `E2E_BASE_URL` and default to localhost port 8000. Browser contexts are temporary and separate from user browser profiles; packaging files are staged in a fresh temporary directory and removed afterwards. Evidence regenerates at the current checkout and records its commit.

The additional probes cover known cases, not every possible failure. Raster checks use actual rendered light-theme SVGs at 100×100 pixels; exact matching does not establish semantic validity or equal perceived difficulty. A fresh full human blind review of legacy questions is outside the completed coverage, as stated in the report.
