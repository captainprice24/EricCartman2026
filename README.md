# AD5 Reasoning Trainer

A practice app for the EPSO AD5 **verbal, numerical and abstract reasoning** tests:
learn the method, drill with instant feedback, and sit timed simulations in the exam format.

## Open it

| Option | How |
|---|---|
| **Single file (easiest)** | Download [`dist/ad5-reasoning-trainer.html`](dist/ad5-reasoning-trainer.html) and double-click it. It works fully offline and makes no third-party requests. |
| From the repository | Clone the repo and open `index.html` in a browser. |
| GitHub Pages | Enable *Settings → Pages → Source: GitHub Actions*. Every push is checked; the repository’s default branch is published. |

Progress (history, accuracy, mistakes and an unfinished exam) is saved in your browser's local storage.
If the page is closed during a simulation, reopen it and choose **Resume**. The timer keeps running,
as in the real exam.

## Modes

- **Coach (training rounds).** A short lesson on the method for the test type, then
  questions with a method checklist, progressive hints, an explanation of why
  every option is right or wrong, a worked solution for numerical and abstract items, and a key takeaway.
- **Practice.** Answer, then check straight away. Only checked answers count towards the score.
  Options: timing at exam pace, choice of question set, a filter for previous mistakes, and topic labels on or off.
- **Coach and Practice clocks.** Next to the round clock, a second clock (marked **Q**) shows the time spent on the
  question on screen. It restarts from zero on every question and stops when the answer is checked.
- **Exit.** Every round and simulation has an **Exit** button that leaves straight away after a confirmation. Nothing
  is scored and nothing is added to the history; in Coach and Practice, answers already checked stay in your statistics.
- **Exam simulation.** The three tests back to back (20 questions in 35 min, 10 in 20 min, 10 in 10 min), or a single
  test, in the layout of EPSO's TAO platform: each part opens on an instruction page with a countdown and starts by
  itself; a navigation bar with numbered circles, bookmarks and Overview; the clock as minutes and seconds left;
  highlighter (three colours and an eraser), line reader, a scratchpad window with text and drawing tools, a
  calculator window (both dragged by their header and resizable), answer elimination and masking switched on in
  Settings, accessibility tools (contrast themes, text size and spacing) and zoom. The simulation is mouse-driven,
  as TAO is; trainer keyboard shortcuts can be switched on from the start page.
  No hints or topic labels. Choose one of **15 fixed full tests** (no repeated questions between them), or a fresh random simulation with unseen-first questions and a 25/50/25 difficulty mix. Tests **13–15 contain 120 new challenge questions**. Results show the
  pass-mark gates separately from your verbal score, which EPSO uses for ranking (40% of the
  preliminary and 35% of the final score), followed by a full review and a "Coach me on my mistakes" round.

Keyboard (Coach and Practice, and in the simulation only when "Trainer keyboard shortcuts" is on): `A`–`E` or `1`–`5`
to answer; in the option list, arrow keys move between options and `X` strikes one out; elsewhere `←` `→` change
question; `F` bookmarks (exam); `Enter` checks (practice and coach). While the calculator is open, the keyboard types
into the calculator: digits, operators, Enter for =, Backspace, Delete for AC, and ↑ ↓ to review previous operations.
Use a dot for decimals; parentheses, power and square root are optional extras that are not confirmed on TAO.

What the simulation does **not** reproduce: proctoring, identity and room checks, full-screen enforcement, and the
exact look of a live TAO item. [docs/ENVIRONMENT_AUDIT.md](docs/ENVIRONMENT_AUDIT.md) compares the trainer with the
official TAO instructions point by point. The mandatory prerequisite check on TAO remains the only authoritative
rehearsal of the real tools.

Topic labels are off by default (they can hint at the answer); turn them on under the training options.

## Question bank

The November 2026 medium sets are documented in [docs/research/medium-2026-11](docs/research/medium-2026-11/README.md).

890 original questions: **verbal 350, numerical 270, abstract 270**. There are 15 complete fixed tests of 40 questions (20/10/10), plus additional practice material. All section timers retain 35/20/10 minutes.

- **Verbal (24 sets):** 200 foundation items, **ten challenge sets of 10** (Sets 10–19) and **five medium sets of 10**
  (Sets 20–24). Every passage is exam length, 130–170 words with short options, matching the commercial practice
  sample reviewed in November 2026; all 350 keys and labels were blind-reviewed after the change
  ([record](docs/research/verbal/blind-review/compact-2026-11/README.md)).
  Choose **Verbal difficulty: Easy / Medium / Hard** in Coach or Practice; a timed ten-question
  round takes 17 min 30 sec. The bank contains 38 easy, 155 medium and 157 hard items.
  All 100 challenge keys and 300 distractor labels were reconciled with an independent blind reviewer.
  Difficulty remains editorial; the reviewer found variable reasoning burden across the challenge
  collection. The [verbal audit](docs/VERBAL_AUDIT.md) distinguishes structural screening of the
  existing bank from the new blind review. The [research library](docs/research/verbal/README.md)
  preserves sources, rights decisions, licensed reference samples and review records.
- **Numerical (16 sets):** 150 foundation/exam-practice items, **seven very hard sets of 10**
  (Sets 5–11) and **five medium sets of 10** (Sets 12–16). Former Easy items and most Hard items now
  follow the EU Training format: a question of at most 45 words on a table or chart, conditions in a note
  under the exhibit, options spaced so that no rounding instruction is needed, and physics questions on
  race times. Hard items turn on one insight each (a binding cap, compound growth crossing, case mix
  reversing a ranking, base rates, reading an unlabelled chart, tiered prices, a fee charged twice,
  closing speeds); 28 retired hard items of borderline length were restored, giving 27 hard models
  used four or five times each. Charts include bars with a turnout line on a second scale, horizontal bars, stacked bars, pies
  and long line series. Choose **Numerical difficulty: Medium / Hard** in Coach or Practice (there is no
  Easy level). For a full challenge round, select Set 5–11, 10 questions and timed practice (20 minutes).
  The bank contains 148 medium and 122 hard items, including 70 very hard challenge items. Levels follow
  a reviewed reasoning rubric and await learner calibration. Every key is independently re-solved by
  `tests/numerical-oracle.test.mjs`. The [numerical audit](docs/NUMERICAL_AUDIT.md) records every item;
  the [research library](docs/research/numerical/README.md) saves sources, rights evidence, licensed
  examples and an authoring checklist for future work.
- **Abstract (16 sets):** 150 foundation items, **seven challenge sets of 10** (Sets 5–11) and **five medium sets of 10**
  (Sets 12–16: patterned figures with alternating grid shifts, counter-rotating quadrants and conveyor rows).
  The new series combine alternating, accelerating, conditional, delayed and compositional rules.
  Choose **Abstract difficulty: Easy / Medium / Hard** in Coach or Practice; a timed round takes
  ten minutes. Choose All levels for a complete challenge set: these span Medium and Hard.
  The reviewed bank has 29 easy, 181 medium and 60 hard items. All 270 keys are independently
  inferred from visible shapes within documented bounded grammars. Ten ambiguous series were
  repaired, one related series strengthened, and ten challenge difficulty labels corrected.
  Worked solutions, hints and visual Coach examples were reviewed against the supplied book.
  Difficulty remains editorial pending learner testing. See the [abstract audit](docs/ABSTRACT_AUDIT.md) and
  [saved research library](docs/research/abstract/README.md).

The [fifteen-test expansion record](docs/research/full-tests-2026-10/README.md) records the supplied TAO guide, new source checks, content coverage and calibration limits. Difficulty names are editorial; individual verbal items were reviewed as hard rather than uniformly extreme.

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
node scripts/build-exams.mjs # regenerate the stable full-test registry when authoring forms
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
questions/exams.js         fifteen fixed full forms, no cross-form repeated questions
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
