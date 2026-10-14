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

500 original questions: verbal 200, numerical 150, abstract 150.

- **Verbal (9 sets):** hand-written passages of about 200 words on EU institutions, law, policy,
  economics, science and history. Every key was confirmed by a blind second reviewer, and the
  validator checks each set for answer cues: hedged or absolute wording, length, and wording reused
  from the passage.
- **Numerical:** generated from 38 templates (at most 4 items each), with large exhibits, multi-step
  calculations and mistake-based distractors. Difficulty follows from the worked solution. Every key is
  re-solved independently by `tests/numerical-oracle.test.mjs`.
- **Abstract:** generated series in five layouts (single figure, grid movement, overlapping shapes,
  divided circle, rotating hands) that combine 2–4 rules. Blind strategies such as "pick the option
  most like the others" score at chance level.

## Development

```bash
npm ci                    # dev tools only: ESLint, Playwright, axe-core
npm run validate          # schema, difficulty, answer-cue and duplicate checks across the bank
npm test                  # unit tests for assets/core.js and the independent numerical answer check
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
