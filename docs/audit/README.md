# Project audit evidence

The [repair report](../PROJECT_AUDIT.md) records the repairs and verification of all twelve findings. The [original report](../PROJECT_AUDIT_INITIAL.md) and `*-before-repair.json` snapshots preserve the defects observed at application commit `ef17a7f3e96da78a40817dfc17ecc7b6dd4a962c`. Audit scripts collect observations; assertions for the repaired cases now run in the standard browser regression suite.

Files:

- `project-probes.json`: isolated browser contexts for modal focus, tooltip dismissal, practice feedback, calculator chaining, invalid storage, failed writes, wide-table keyboard behaviour, lesson/frame consistency, 320px layout, direct disk access and the shared production artifact staging function.
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

Omit `CHROMIUM_PATH` when Playwright's Chromium is installed, or point it to your system browser. The audit scripts accept `E2E_BASE_URL` and default to localhost port 8000. Browser contexts are temporary and separate from user browser profiles; packaging files are staged in a fresh temporary directory and removed afterwards. Evidence regenerates from the current checkout and records its base commit, working-tree status and application version.

The additional probes cover known cases, not every possible failure. Raster checks use actual rendered light-theme SVGs at 100×100 pixels; exact matching does not establish semantic validity or equal perceived difficulty. All 200 foundation verbal items now have archived independent AI blind review; fresh human trials and complete independent re-solving of the 150 foundation abstract keys remain outside coverage, as stated in the report.
