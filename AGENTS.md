# Instructions for agents working on this repository

This repository is a dependency-free static web app for practising the EPSO AD5 reasoning tests.

## Adding mock question sets (the most common task)

1. Read `docs/QUESTION_FORMAT.md` in full. It defines the schema, the difficulty rubric and the
   enforced quality rules.
2. **Verbal:** write a new file such as `questions/verbal/verbal-set-04.js` by hand.
   **Numerical and abstract:** extend `scripts/generators/numerical.mjs` or `abstract.mjs` with new
   templates or plan entries and rerun them. Never hand-edit generated files.
3. Add any new file to `questions/manifest.js`. Never reuse or edit existing question ids.
4. For hand-written sets, run `node scripts/format-set.mjs <file> --letters …` to balance answer letters.
5. Run `npm run validate`. It must print ✓. Then run `npm run build` and commit the regenerated
   `dist/ad5-reasoning-trainer.html`; CI fails on a stale bundle.

Quality bar (most of it is enforced by the validator):

- Exactly one correct option. Check numerical answers with real calculations (the generators do this).
- Verbal items: passages of 170–260 words, at most one 'False.' distractor, at least one 'Not supported.'
  and one 'Overstated.' distractor, and keys that paraphrase or infer rather than copy.
- Original content only. Never copy questions from EPSO, EU Training, EPSOready or other providers.
- Explanations and hints never cite option letters.

## Changing the app

- Pure logic: `assets/core.js` (add unit tests in `tests/core.test.mjs`). UI: `assets/app.js`.
  Drawing: `assets/render.js`. Lessons: `assets/lessons.js`. Styles: `assets/styles.css`.
- Keep the app working when `index.html` is opened from disk: no `fetch`, no ES modules in the browser
  files, no build step for development. No third-party requests, so no web fonts or CDNs.
- Before pushing, run `npm run lint`, `npm test`, `npm run validate`, `npm run build` and `npm run test:e2e`.
- Colours are CSS custom properties with light and dark values. Keep both themes working.
