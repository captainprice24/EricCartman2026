# AD5 Reasoning Trainer

A practice app for the EPSO AD5 **verbal, numerical and abstract reasoning** tests:
learn the method, drill with instant feedback, and sit timed simulations in the exam format.

## Open it

| Option | How |
|---|---|
| **Single file (easiest)** | Download [`dist/ad5-reasoning-trainer.html`](dist/ad5-reasoning-trainer.html) and double-click it. It works fully offline and makes no third-party requests. |
| From the repository | Clone the repo and open `index.html` in a browser. |
| GitHub Pages | Enable *Settings → Pages → Source: GitHub Actions*. Every push to `main` is then checked and published. |

Progress (history, accuracy, mistakes and an unfinished exam) is saved in your browser's local storage.
If the page is closed during a simulation, reopen it and choose **Resume**. The timer keeps running,
as in the real exam.

## Modes

- **Coach (training rounds).** A short lesson on the method for the test type, then
  questions with a method checklist, progressive hints, an explanation of why
  every option is right or wrong, a worked solution for numerical items, and a key takeaway.
- **Practice.** Answer, then check straight away. Only checked answers count towards the score.
  Options: timing at exam pace, choice of question set, a filter for previous mistakes, and topic labels on or off.
- **Exam simulation.** The three tests back to back (20 questions in 35 min, 10 in 20 min, 10 in 10 min), or a single
  test, in the TAO format: navigation circles, flags, strike-out, highlighter, scratchpad and calculator.
  No hints or topic labels. Questions you have not seen come first, in a 25/50/25 mix of difficulty. Results show the
  pass-mark gates separately from your verbal score, which EPSO uses for ranking (40% of the
  preliminary and 35% of the final score), followed by a full review and a "Coach me on my mistakes" round.

Keyboard: `A`–`E` or `1`–`5` to answer; in the option list, arrow keys move between options and `X`
strikes one out; elsewhere `←` `→` change question; `F` flags (exam); `Enter` checks (practice and coach).
While the calculator is open, the keyboard types into the calculator. The calculator copies the basic
TAO calculator (parentheses, power, square root, no % key).

Topic labels are off by default (they can hint at the answer); turn them on under the training options.

## Question bank

620 original questions: verbal 240, numerical 190, abstract 190.

- **Verbal (13 sets):** 200 existing items plus **four challenge sets of 10** (Sets 10–13).
  Choose **Verbal difficulty: Easy / Medium / Hard** in Coach or Practice; a timed ten-question
  round takes 17 min 30 sec. The bank contains 38 easy, 105 medium and 97 hard items.
  All 40 new keys and 120 distractor labels were reconciled with an independent blind reviewer.
  Difficulty remains editorial; the reviewer found variable reasoning burden across the challenge
  collection. The [verbal audit](docs/VERBAL_AUDIT.md) distinguishes structural screening of the
  existing bank from the new blind review. The [research library](docs/research/verbal/README.md)
  preserves sources, rights decisions, licensed reference samples and review records.
- **Numerical (8 sets):** 150 foundation/exam-practice items plus **four very hard sets of 10**
  (Sets 5–8). Challenge items combine changing bases, reverse calculations and constraints, with two
  exhibits and mistake-based distractors. Choose **Numerical difficulty: Easy / Medium / Hard** in
  Coach or Practice. For a full challenge round, select Set 5–8, 10 questions and timed practice
  (20 minutes). The bank contains 56 easy, 82 medium and 52 hard items, including 40 very hard items.
  Levels follow a reviewed reasoning rubric and await learner calibration. Every key is independently
  re-solved by `tests/numerical-oracle.test.mjs`. The [numerical audit](docs/NUMERICAL_AUDIT.md) records
  every item; the [research library](docs/research/numerical/README.md) saves sources, rights evidence,
  licensed examples and an authoring checklist for future work.
- **Abstract (8 sets):** 150 foundation items plus **four challenge sets of 10** (Sets 5–8).
  The new series combine alternating, accelerating, conditional, delayed and compositional rules.
  Choose **Abstract difficulty: Easy / Medium / Hard** in Coach or Practice; a timed round takes
  ten minutes. The revised bank has 29 easy, 121 medium and 40 hard items. Forty-six existing
  difficulty labels changed; the original figures and answers are preserved. All forty new keys
  are independently inferred from visible shapes. Difficulty remains editorial pending learner
  testing. See the [abstract audit](docs/ABSTRACT_AUDIT.md) and
  [saved research library](docs/research/abstract/README.md).

The [full project audit](docs/PROJECT_AUDIT.md) records release, reliability, accessibility and
question-quality repairs, with reproducible evidence and a successful GitHub CI/deployment run.

## Development

```bash
npm ci                    # dev tools only: ESLint, Playwright, axe-core
npm run audit:abstract    # rebuild abstract inventory and difficulty audit
npm run audit:reasoning   # rebuild verbal item inventory and audit
npm run audit:numerical   # rebuild numerical item inventory and difficulty audit
npm run validate          # schema, difficulty, answer-cue and duplicate checks across the bank
npm test                  # core, independent numerical/abstract answers and verbal review trace
npm run build             # dist/ad5-reasoning-trainer.html (commit it; CI checks it is fresh)
npm run test:e2e          # Playwright regression and axe tests (BROWSERS=chromium,webkit)
npm run lint
```

Project layout:

```
index.html                 app entry (loads the files below; no build step needed)
assets/core.js             pure logic (scoring, timer, draw, calculator, highlighter) – unit-tested
assets/app.js              state, rendering, events
assets/render.js           figures, tables and charts
assets/lessons.js          coach lessons
questions/manifest.js      list of question set files
questions/<section>/*.js   question sets (plain data)
scripts/generators/        numerical.mjs, abstract.mjs (generate those sections)
scripts/lib/               blind solvers / answer-cue checks, numerical difficulty rubric
scripts/validate-questions.mjs, scripts/format-set.mjs, scripts/blind-review.mjs, scripts/build.mjs
docs/QUESTION_FORMAT.md    schema, authoring rules, difficulty rubric
docs/VERBAL_AUTHORING_BRIEF.md  how to write verbal items without answer cues
docs/research.md           exam format (official EPSO sources), platform research, REA analysis
```

## Disclaimer

This is an unofficial training tool, not affiliated with EPSO or the EU institutions.
All questions are original practice material. Always check the format in your Notice of Competition.

If a managed browser blocks `file://`, serve the repository locally and run the same browser checks
over HTTP (this verifies browser behaviour, not direct file-URL access):

```bash
python -m http.server 8000 --bind 127.0.0.1
# In another terminal:
E2E_BASE_URL=http://127.0.0.1:8000 CHROMIUM_PATH=/usr/bin/chromium npm run test:e2e
```
