# Question set format

Every question set is one JavaScript file in `questions/<section>/` that calls
`EPSO_BANK.registerSet({...})` once. Sets are plain data: no functions and no imports.
They are plain `.js` rather than `.json` so the app still works when `index.html` is
opened straight from disk (browsers block `fetch` of local JSON files).

## Adding a set (checklist)

1. Copy an existing set in the same section as your starting point, e.g.
   `questions/verbal/verbal-set-01.js` → `questions/verbal/verbal-set-02.js`.
2. Give the set a new `id` (`verbal-02`) and every question a globally unique `id`
   (`v02-01`, `v02-02`, …). Use `n02-…` for numerical and `a02-…` for abstract.
3. Add the file path to `questions/manifest.js`.
4. Run `node scripts/validate-questions.mjs` and fix every reported problem.
5. Run `node scripts/build.mjs` to refresh the single-file builds in `dist/`.
6. Commit the set file, the manifest change and `dist/`.

## Set object

| Field | Required | Notes |
|---|---|---|
| `id` | yes | Unique across all sets, e.g. `numerical-02` |
| `section` | yes | `verbal`, `numerical` or `abstract` (must match the folder) |
| `title` | yes | Shown in the set picker, e.g. `Numerical Reasoning · Set 2` |
| `description` | no | One line |
| `version` | no | Integer; bump when you edit questions |
| `questions` | yes | Non-empty array |

## Fields common to every question

| Field | Required | Notes |
|---|---|---|
| `id` | yes | Globally unique |
| `stem` | recommended | The question line. Verbal default: "Which of the following statements is correct?" |
| `options` | yes | Verbal: exactly 4 strings. Numerical: 4–5 strings. Abstract: 4–5 figures |
| `answer` | yes | **0-based** index of the correct option (0 = A) |
| `hints` | yes | 1–3 progressive hints for Coach mode. Hint 1 points to the method; the last hint nearly gives it away, without stating the answer |
| `optionNotes` | yes | One string per option explaining why it is right or wrong. Start with "Correct." / "False." / "Not supported." for verbal items |
| `explanation` | yes | The key takeaway shown after answering: the general lesson, not just the answer |
| `topic` | recommended | Short label used in the results breakdown, e.g. "Percentage change" |
| `difficulty` | recommended | 1 (easier), 2 (medium) or 3 (harder) |
| `shuffle` | no | `true` to shuffle option order per attempt. Default is the authored order, so explanations may refer to letters (A–E) |

Spread correct answers across letters within a set. Avoid always using C.

## Verbal reasoning

```js
{
  id: "v02-01",
  topic: "EU institutions",
  difficulty: 2,
  passage: "First paragraph…\n\nSecond paragraph…",   // blank line separates paragraphs
  stem: "Which of the following statements is correct?",
  options: ["…", "…", "…", "…"],
  answer: 2,
  hints: ["…", "…"],
  optionNotes: ["False. …", "Not supported. …", "Correct. …", "False. …"],
  explanation: "…"
}
```

Writing rules (EPSO style):

- 150–250 word passage on EU affairs, policy, science, economics or history. Write it
  yourself; never copy EPSO or commercial material.
- Exactly **one** statement must follow from the text. The other three must be false
  according to the text or unsupported by it. Judge only against the passage, not outside knowledge.
- Build the distractors from common traps: absolute words (only, always, never),
  swapped numbers or dates, reversed cause and effect, scope changes (some → all), and
  plausible facts that the text never states.
- Facts in the passage should be accurate. Phrase anything uncertain as "around" or leave it out.

## Numerical reasoning

```js
{
  id: "n02-01",
  topic: "Percentage change",
  difficulty: 2,
  exhibit: {
    type: "table",                       // or "bar"
    title: "…",
    columns: ["Country", "2022", "2023"],
    rows: [["A", "120", "138"], ["B", "80", "86"]],   // every row has columns.length cells (strings)
    note: "Optional footnote"
  },
  stem: "…?",
  options: ["8%", "9%", "10%", "11%", "12.5%"],
  answer: 2,
  hints: ["…", "…"],
  solution: ["Step 1 …", "Step 2 …", "Result …"],   // worked solution, shown after answering
  optionNotes: ["…", "…", "Correct.", "…", "…"],
  explanation: "…"
}
```

Bar chart exhibit:

```js
exhibit: {
  type: "bar",
  title: "Exports by quarter (EUR billion)",
  unit: "EUR bn",
  categories: ["Q1", "Q2", "Q3", "Q4"],
  series: [ { name: "Machinery", values: [42, 45, 39, 48] },   // up to 3 series
            { name: "Chemicals", values: [30, 36, 26, 40] } ]
}
```

Rules: verify every number with a calculation before committing. Make the distractors
the results of typical mistakes (wrong base, dividing by the new value, stopping one step
early, averaging rates), and say so in `optionNotes`. Keep options in ascending order
where they are numeric.

## Abstract reasoning

Figures are drawn on a 100 × 100 canvas. A figure is an array of shapes:

| Shape | Fields |
|---|---|
| `{ t: "circle", x, y, r, fill }` | centre and radius |
| `{ t: "rect", x, y, w, h, fill, rot? }` | top-left corner, size |
| `{ t: "poly", x, y, r, n, rot, fill }` | regular polygon with `n` sides; `rot` in degrees, first vertex at top |
| `{ t: "star", x, y, r, rot, fill }` | five-pointed star |
| `{ t: "arrow", x, y, r, rot, fill }` | arrow pointing up at `rot: 0`, clockwise rotation |
| `{ t: "line", x1, y1, x2, y2 }` | straight line |

`fill` is `black`, `grey`, `white` or `none` (outline only). Coordinates stay within 0–100.

```js
{
  id: "a02-01",
  topic: "Rotation",
  difficulty: 1,
  stem: "Which figure comes next in the series?",
  sequence: [ [shape…], [shape…], [shape…], [shape…], [shape…] ],   // 5 figures (3–6 allowed)
  options:  [ [shape…], [shape…], [shape…], [shape…], [shape…] ],   // 5 candidate figures
  answer: 0,
  hints: ["…", "…"],
  optionNotes: ["Correct: …", "Right shape, wrong rotation.", …],
  explanation: "…"
}
```

Rules: the rule set must lead to exactly one option. Make each distractor break exactly one rule
so `optionNotes` can name it. For large sets, generate the figures with a script, as
`questions/abstract/abstract-set-01.js` was, and commit only the generated data.
