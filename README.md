# AD5 Reasoning Trainer

A practice app for the EPSO AD5 **verbal, numerical and abstract reasoning** tests:
learn the method, drill with instant feedback, and sit timed simulations in the exam format.

## Open it

| Option | How |
|---|---|
| **Single file (easiest)** | Download [`dist/ad5-reasoning-trainer.html`](dist/ad5-reasoning-trainer.html) and double-click it. No installation and no internet needed (fonts fall back to system fonts offline). |
| From the repository | Clone the repo and open `index.html` in a browser. |
| GitHub Pages | Enable *Settings → Pages → Source: GitHub Actions*. Every push to `main` then publishes the app automatically. |

Your progress (history, accuracy and mistakes to revisit) is saved in your browser's local storage.

## Modes

- **Coach (training rounds).** A short lesson on the method for the test type, then
  questions with a method checklist, progressive hints, an explanation of why
  every option is right or wrong, a worked solution for numerical items, and a key takeaway.
- **Practice.** Answer, then check straight away. Optional timing at exam pace, a choice of
  question set, and a filter for questions you previously got wrong.
- **Exam simulation.** The three tests back to back (20 questions in 35 min, 10 in 20 min, 10 in 10 min) or a single
  test. It follows the TAO format: navigation circles, flags, strike-out, highlighter, scratchpad
  and calculator. Each test is submitted automatically when its time runs out. Results check the pass marks
  (verbal 10/20; numerical and abstract 10/20 combined), followed by a full review and
  a **"Coach me on my mistakes"** round.

Keyboard: `A`–`E` or `1`–`5` to answer, `←` `→` to move, `F` to flag (exam), `Enter` to check (practice and coach).

## Project layout

```
index.html                 app entry (loads the files below)
assets/                    app.js (logic), render.js (figures, tables, charts), lessons.js (coach lessons), styles.css
questions/manifest.js      list of question set files ← add new sets here
questions/<section>/*.js   question sets (plain data)
scripts/validate-questions.mjs   checks every set (run before committing)
scripts/build.mjs          builds dist/ad5-reasoning-trainer.html (single file) and dist/artifact.html
docs/QUESTION_FORMAT.md    question schema and authoring rules
docs/research.md           exam format, platform research, REA analysis
```

## Question bank

190 original questions: verbal 70 (sets 1–3), numerical 60 (sets 1–3), abstract 60 (sets 1–3).
An exam simulation draws a fresh random selection of 20 / 10 / 10 from the bank each time.

## Adding question sets

See [`docs/QUESTION_FORMAT.md`](docs/QUESTION_FORMAT.md). In short: add a file under
`questions/<section>/`, list it in `questions/manifest.js`, then run:

```bash
node scripts/validate-questions.mjs   # schema + duplicate checks across the whole bank
node scripts/build.mjs
```

Requires Node.js 18 or later for the scripts only. The app itself has no dependencies.

## Disclaimer

This is an unofficial training tool, not affiliated with EPSO or the EU institutions.
All questions are original practice material. Always check the format in your Notice of Competition.
