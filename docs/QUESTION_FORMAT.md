# Question set format and authoring rules

Every question set is one JavaScript file in `questions/<section>/` that calls
`EPSO_BANK.registerSet({...})` once. Sets are plain data: no functions, no imports.
They are `.js` rather than `.json` so the app still works when `index.html` is opened
straight from disk, because browsers block `fetch` of local files.

`node scripts/validate-questions.mjs` enforces everything marked **(enforced)** below.
The rules exist because practice items easier than the real test give false confidence.
They come from the two audits in October 2026. Round 2 added checks against answer cues: a
candidate must not be able to find the key by form alone (see `scripts/lib/blind.mjs`).

## Workflow

1. **Verbal:** write the set by hand (see below).
   **Numerical and abstract:** extend the generators, `scripts/generators/numerical.mjs` and
   `scripts/generators/abstract.mjs`, by adding templates or plan entries. Never hand-edit
   generated files.
2. List any new file in `questions/manifest.js`.
3. Run `node scripts/format-set.mjs <file> --letters ABCD…` to balance the answer letters of a
   hand-written set. Options and their notes move together.
4. Run `npm run validate` and fix every problem. Run `npm run validate -- --verbose` to see verbal
   passages whose subjects overlap with existing ones.
5. Run `npm run build` and commit the set, the manifest and `dist/ad5-reasoning-trainer.html`.
   CI fails if the bundle is stale.

## Fields common to every question

| Field | Notes |
|---|---|
| `id` | Globally unique, never reused: `v04-01`, `n05-01`, `a05-01` **(enforced)** |
| `difficulty` | 1 easier, 2 medium, 3 harder, following the rubric below **(enforced)** |
| `stem` | The question line |
| `options` | Verbal: exactly 4 strings. Numerical: exactly 5. Abstract: exactly 5 figures **(enforced)** |
| `answer` | 0-based index of the correct option |
| `hints` | 1–3 progressive hints for Coach mode **(enforced)** |
| `optionNotes` | One note per option explaining why it is right or wrong **(enforced)** |
| `explanation` | The general lesson, shown after answering **(enforced)** |
| `topic` | Short label. Shown in practice and review only, never in the exam |

Explanations and hints must never refer to options by letter ("D is wrong because…"), since option
order can change. Describe the option instead ("the 'always' option…") **(enforced)**.

### Difficulty rubric

| Level | Verbal | Numerical | Abstract |
|---|---|---|---|
| 1 easy | Key paraphrases one sentence; traps are visible on a careful read | One direct arithmetic model; see numerical rubric | Two familiar independent transformations |
| 2 medium | Key needs a one-step inference or a careful paraphrase; at least one subtle distractor | Familiar model plus weighting, conversion or successive adjustments | Three/four independent tracks, or a nonuniform count/boundary phase |
| 3 hard | Key combines two sentences or applies a rule to a new case; distractors include an outside-knowledge trap or a fine over-reach | Changing bases, linked reverse calculations or constraints | Coupled, conditional, interleaved, delayed or composed transformations |

**Numerical difficulty follows the reviewed reasoning model (enforced).**
`scripts/lib/difficulty.mjs` maps every numerical topic to an editorial level and rationale.
Counting calculation lines, operation symbols or irrelevant exhibit values does not establish
conceptual difficulty. The old `numericalScore` remains a workload diagnostic only. Add a reviewed
rubric entry for every new topic; unreviewed topics fail validation.

Very hard challenge sets remain in level 3 (Hard), with `challenge: true` on both set and questions.
Each numerical challenge set contains 10 different reasoning models, at least four dependent transformations per item,
exactly two keys in each of the five answer positions, and no generic filler distractors. Use
genuine calculation mistakes; round only at the specified final precision. Verify minimum-feasible
integer thresholds, rate bounds and binding constraints independently.

See `docs/NUMERICAL_AUDIT.md` and `docs/research/numerical/README.md` for the audit, source library,
rights decisions and reusable authoring checklist. Recalibrate from first-attempt accuracy and
correct-response time when learner data are available; the current labels are editorial.

Verbal challenge Sets 10–13 contain ten items each, with two or three keys per answer position.
The independent blind review covers keys and distractor labels; unchanged source-batch items are
mapped to final IDs with hashes in `docs/research/verbal/blind-review/review-mapping.json`.
See `docs/VERBAL_AUDIT.md` and the verbal research library before adding further sets.

## Verbal reasoning (hand-written)

```js
{
  id: "v04-01",
  topic: "EU institutions",
  difficulty: 2,
  keyType: "inference",               // paraphrase | combination | inference
  passage: "Paragraph one…\n\nParagraph two…",
  stem: "Which of the following statements is correct?",
  options: ["…", "…", "…", "…"],
  answer: 1,
  hints: ["…", "…"],
  optionNotes: ["False. …", "Correct. …", "Not supported. …", "Overstated. …"],
  explanation: "…"
}
```

- **Passage:** 170–260 words **(enforced)**, dense, with qualifiers ("mainly", "in principle"),
  exceptions ("unless", "however"), two related figures, a contrast or a disagreement. Write
  it yourself, keep facts accurate, and choose a subject not already in the bank.
- **Key:** never copy 7 or more consecutive words from the passage **(enforced)**. At least 40%
  of keys in a set must be `combination` or `inference` **(enforced)**.
- **Distractors:** each note starts with its type **(enforced)**, with 0–2 of each type per item:
  - `False.` contradicts the text. A sweeping claim that the text directly contradicts is False.
  - `Not supported.` is something the text never says: an outside fact, an invented detail, an unstated
    cause. A close paraphrase of the passage that adds one unstated detail is a good version.
  - `Overstated.` is partly right but stronger than the text ("often" becomes "always", "advises"
    becomes "decides").
- **Answer cues (enforced per set):** the limits are listed in `docs/VERBAL_AUTHORING_BRIEF.md`. In short,
  the key must not be identifiable by hedging or absolute words, by length, or by how much passage
  wording it reuses, and no distractor-type pattern may cover more than half the set.
- **Blind review:** before merging, a second reviewer answers the set without the key
  (`scripts/blind-review.mjs`). Keys must match, and label disagreements must be resolved.
- **Option length:** the key may be the longest option in at most 30% of a set's items, and should be
  within ±25% of the mean option length in at least 80% **(enforced)**. Test-wise candidates pick
  the longest option.

## Numerical reasoning (generated)

Generated by `scripts/generators/numerical.mjs`: 150 original items plus 40 challenge items
from `scripts/generators/numerical-hard.mjs` (48 templates, at most 4 items per template).
`tests/numerical-oracle.test.mjs` re-solves every item from the exhibit and stem with separate code,
so add a solver there for every new topic.

- **Exhibits:** `exhibits: [ … ]`, one or two of `table`, `bar` (grouped), `stacked`, `line` or `pie`.
  At least 12 data values in total **(enforced)**. Include rows, columns or years that the
  question does not need.
- **Steps:** medium and harder items need at least 2 solution steps **(enforced)**. Use unit traps
  (thousands vs millions, TWh vs kWh, percentage points vs per cent).
- **Options:** exactly 5, in ascending order, all within 0.7–1.4 × the key, and never repeating a
  value printed in the exhibit **(enforced)**. Distractors should be named mistakes (wrong base,
  wrong row or year, added instead of compounded…). Use generic fillers only when no realistic
  mistake falls within range.
- **Categorical items** (answer is a country or a year) set `answerType: "category"` and still have
  5 options.

Exhibit shapes:

```js
{ type: "table", title, columns: [...], rows: [[...], ...], note? }
{ type: "bar" | "stacked" | "line", title, unit, categories: [...], series: [{ name, values: [...] }] }
{ type: "pie", title, unit: "%", slices: [{ label, value }] }
```

## Abstract reasoning (generated)

Generated by `scripts/generators/abstract.mjs`, with 150 foundation items in five layouts of 30 each: single
figure, grid movement, overlapping shapes, divided circle, and rotating hands (composite figures).
Two to four independent rules run at once in the foundation bank; elements without a rule stay constant.
Forty new challenge items are generated by `scripts/generators/abstract-hard.mjs`: four sets of ten,
with coupled orbit and binary-panel layouts and ten model families per set. Six frames support phase
inference. There are two keys per answer position and four relationships per item; some relationships
depend on another element or the previous frame.

- `rules`: 2–4 relationships. Difficulty must follow `scripts/lib/abstract-difficulty.mjs`
  **(enforced)**. Four independent familiar changes do not automatically imply Hard. The foundation
  phase screen recognises reviewed nonuniform-count, repeated-phase and boundary patterns in the
  generator descriptions; it is not a generic word-count or shape-count score. New models require review.
- Every frame has at least 3 shapes **(enforced)**.
- Wrong options mix one-rule and two-rule breaks, plausible wrong readings (no step, a double step,
  the wrong direction, a value outside the cycle) and changes to constant elements. At least two of them
  share a wrong value.
- **Blind solvers (enforced per set, ≤ 30%; chance is 20%):** picking the option most similar to the
  others, the odd one out, or the per-element majority must not find the key. The generator balances
  the key's similarity rank across all five positions.
- No option may differ from the key only by size **(enforced)**. No two items may share a figure
  series **(enforced)**.
- Challenge items require independent visible-figure inference in `tests/abstract-oracle.test.mjs`.
  The bounded grammar must produce one continuation and exactly one matching option. Tests receive
  no generator parameters or author model labels. Each feature alone must leave multiple options.
  Supporting cycles together must not select the key: orbit colour plus count, or panel inputs plus
  bottom arrow. A challenge key must not repeat a complete displayed frame.
- After generating, run `scripts/render-abstract-contact-sheets.mjs` and review figures by eye in
  both themes. Run `npm run audit:abstract`. Save sources and decisions under `docs/research/abstract`.
  See `docs/ABSTRACT_AUDIT.md` for the distinction between structural checks, visual samples and full
  new-item inference. The current labels await learner calibration.

Figure shapes (100 × 100 canvas; `fill` is `black`, `grey`, `white` or `none`):
`circle {x,y,r}`, `rect {x,y,w,h}`, `poly {x,y,r,n,rot}`, `star {x,y,r,rot}`, `arrow {x,y,r,rot}`
(points up at `rot: 0`, turns clockwise), `line {x1,y1,x2,y2}`, `wedge {x,y,r,a0,a1}` (a sector,
angles clockwise from 12 o'clock).

## Translations

Any text field (`passage`, `stem`, `options[i]`, `hints[i]`, `optionNotes[i]`, `explanation`,
`solution[i]`) may be either a string or an object such as `{ en: "…", fr: "…", de: "…" }`. The app
falls back to English, and the validator checks the English text. EPSO reasoning tests are taken in
the candidate's chosen languages, so French and German versions of the verbal sets are the
most valuable next step.

## Duplicate checks (enforced)

The validator rejects, across the whole bank: reused ids, identical stems and options, identical
or near-identical verbal passages (shared 5-word phrasing), identical numerical exhibit data and
identical abstract figure series.
