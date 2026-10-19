# Instructions for agents working on this repository

This repository is a dependency-free static web app for practising the EPSO AD5 reasoning tests.

## Adding mock question sets (the most common task)

1. Read `docs/QUESTION_FORMAT.md` in full. It defines the schema, the difficulty rubric and the
   enforced quality rules.
   For numerical work, also read `docs/research/numerical/README.md` and `docs/NUMERICAL_AUDIT.md`.
   They preserve source/rights decisions and the reasoning-based difficulty rubric. Reference examples
   are for author study and are not registered in the app. Numerical difficulty must not be raised by
   adding explanation lines or irrelevant exhibit values. Run `npm run audit:numerical` after changes.
   For verbal work, also read `docs/research/verbal/README.md` and `docs/VERBAL_AUDIT.md`.
   Preserve blind-review traceability and run `npm run audit:reasoning` after changes.
2. **Verbal:** write a new file such as `questions/verbal/verbal-set-04.js` by hand.
   **Numerical and abstract:** extend `scripts/generators/numerical.mjs` or `abstract.mjs` with new
   templates or plan entries and rerun them. Never hand-edit generated files.
3. Add any new file to `questions/manifest.js`. Never reuse or edit existing question ids.
4. For hand-written sets, run `node scripts/format-set.mjs <file> --letters …` to balance answer letters.
5. Run `npm run validate`. It must print ✓. Then run `npm run build` and commit the regenerated
   `dist/ad5-reasoning-trainer.html` and `version.js`; CI fails if either is stale. `version.js` makes
   every visitor's browser load the new files straight away instead of a cached copy.

Quality bar (most of it is enforced by the validator):

- Exactly one correct option. Numerical answers are re-solved independently by
  `tests/numerical-oracle.test.mjs` (`npm test`); add a solver there for every new numerical topic.
- Verbal items follow `docs/VERBAL_AUTHORING_BRIEF.md`: passages of 170–260 words, 0–2 distractors of
  each type (False / Not supported / Overstated), and no answer cues. The validator rejects a set whose
  key can be found by form (hedged or absolute wording, length, overlap with the passage) or whose
  distractor structure repeats.
- **Blind review before merge (verbal).** A second reviewer who has not seen the key answers every new
  item: `node scripts/blind-review.mjs export <set>` gives them passages and options only; save their
  answers as JSON and run `node scripts/blind-review.mjs compare <set> <answers.json>`. Every key must
  match. Settle every distractor-label disagreement by relabelling or rewording before merging.
- Abstract items come only from the generator. Blind strategies (most central option, odd one out,
  per-element majority) must stay at or below 30% per set.
- Original content only. Never copy questions from EPSO, EU Training, EPSOready or other providers.
- Explanations and hints never cite option letters.

## Changing the app

- Pure logic: `assets/core.js` (add unit tests in `tests/core.test.mjs`). UI: `assets/app.js`.
  Drawing: `assets/render.js`. Lessons: `assets/lessons.js`. Styles: `assets/styles.css`.
- Keep the app working when `index.html` is opened from disk: no `fetch`, no ES modules in the browser
  files, no build step for development. No third-party requests, so no web fonts or CDNs.
- Before pushing, run `npm run lint`, `npm test`, `npm run validate`, `npm run build` and `npm run test:e2e`.
- Colours are CSS custom properties with light and dark values. Keep both themes working.
