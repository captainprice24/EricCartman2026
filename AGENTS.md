# Instructions for agents working on this repository

This repository is a dependency-free static web app for practising the EPSO AD5 reasoning tests.

## Adding mock question sets (the most common task)

1. Read `docs/QUESTION_FORMAT.md` in full. It defines the schema and the authoring rules.
2. Create a new file such as `questions/verbal/verbal-set-02.js` (or `numerical/…`, `abstract/…`).
   Never edit existing question ids. Each new question needs a globally unique id.
3. Add the path to `questions/manifest.js`.
4. Run `node scripts/validate-questions.mjs`. It must print ✓.
5. Run `node scripts/build.mjs` and commit the regenerated `dist/` files with your set.

Quality bar for every question:

- Exactly one correct option. Check numerical answers with real calculations, for example in a quick script.
- `hints` (progressive), `optionNotes` (one per option, saying why it is right or wrong) and an
  `explanation` (the general lesson) are required. Coach mode depends on them.
- Original content only. Never copy questions from EPSO, EU Training, EPSOready or other providers.
- Spread correct answers across the letters A–E.

## Changing the app

- Logic: `assets/app.js`. Drawing: `assets/render.js`. Lessons: `assets/lessons.js`. Styles: `assets/styles.css`.
- Keep the app working when `index.html` is opened from disk: no `fetch`, no ES modules, no build step for development.
- Colours are CSS custom properties with light and dark values. Keep both themes working.
