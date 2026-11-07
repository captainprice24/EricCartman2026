# Medium question sets, November 2026

150 new Medium items: **verbal Sets 20–24, numerical Sets 12–16 and abstract Sets 12–16**, ten items per set. All
content is original. Existing question ids and content are unchanged; new ids are hash-locked.

## Research and calibration

- **Repository research.** The earlier libraries in `docs/research/verbal`, `numerical` and `abstract` (source
  inventories, rights decisions, authoring rules) and the audits in `docs/*_AUDIT.md` were reread first.
- **Public guidance (web search, 7 November 2026).** Consistent with the saved research. Verbal items ask which
  statement the passage logically supports, and an unstated case is undetermined, not false. Numerical items are
  table and chart interpretation with percentages, ratios, averages and currency conversion. Abstract items are
  ten series in ten minutes, built from rules such as rotation, counting, alternation and colour. Sources:
  [EU Training, reasoning tests](https://eutraining.eu/content/what-are-epso-reasoning-tests-verbal-numerical-and-abstract-reasoning),
  [EU Training, numerical guide](https://www.eutraining.eu/content/numerical-reasoning-tests-complete-epso-guide-2026),
  [EU Training, abstract guide](https://eutraining.eu/content/epso-abstract-reasoning-guide-practice-tips),
  [Irish Department of Foreign Affairs, reasoning tips (PDF)](https://dfa.ie/media/dfa/alldfawebsitemedia/ourrolesandpolicies/irelandintheeu/eujobs/Preparing-for-EU-Concours---Tips-Verb-Num-Reasoning-test.pdf),
  [EPSO sample quizzes](https://eu-careers.europa.eu/epso-quizzes).
- **Commercial practice sample.** The owner supplied screenshots of a 15-item EU Training practice session (5 verbal,
  5 numerical, 5 abstract). It was used for calibration only: no passage, figure, data or rule set was copied, and
  the screenshots are not stored in the repository. Findings:
  - Verbal passages are a single paragraph of about 110–150 words (the first measured 147), with short options. The
    earlier bank averaged about 212 words in three paragraphs. New sets therefore use **130–170 words in one or two
    paragraphs** with options of about 50–90 characters, and the validator minimum was lowered from 170 to 130
    words. Existing passages are unchanged.
  - Numerical items combine a table or chart with one or two familiar steps (shares of totals, per-item values,
    weighted returns, reverse percentages). This matches the bank's reviewed Medium models.
  - Abstract items use dense patterned figures (hatching, chequers, dots) and rules such as alternating row and
    column shifts, patterns copied between frames and counter-rotation with a fixed exception. The first Medium
    abstract draft used plain black, grey and white foundation layouts; it was replaced (see below).

## What was built

**Verbal (hand-written).** Fifty passages on subjects not already in the bank: EU policy (seasonal clock changes,
milk quotas, the Solidarity Fund, Eurobarometer, Interreg, bathing water, critical raw materials) plus science,
economics, history and culture. Each key needs a one-step inference, a combination of two facts or a careful
paraphrase, with 0–2 distractors of each type. Every set passes the unchanged cue limits (hedged/absolute wording,
length, passage overlap, pattern diversity). Facts were limited to well-established ones and hedged where sources
differ.

**Numerical (generated, `scripts/generators/numerical.mjs`).** Fifty items from the 21 models that
`scripts/lib/difficulty.mjs` reviews as Medium, with new contexts and data: ten different models per set and two keys
in each answer position. Every distractor is a named calculation mistake. Implausible results (for example
percentage gaps above 150%) are regenerated. `tests/numerical-oracle.test.mjs` re-solves every key from the exhibit
and stem, and `numerical-medium-fingerprints.json` locks the content.

**Abstract (generated, `scripts/generators/abstract-patterns.mjs`).** Fifty patterned series in three original
families:
- *Shifting grid*: a 3 × 3 grid of patterned cells where a row shifts on odd steps and a column on even steps,
  wrapping round; a corner marker steps round the frame; the background alternates; in four-rule items the marker
  colour also alternates.
- *Rotating quadrants*: four patterned quadrants turn one way while the inner divided circle turns the other way,
  except a black segment that stays fixed; the centre square alternates.
- *Conveyor rows*: two rows of patterned tiles slide in opposite directions with wrap-around; a pointer turns 45°;
  in four-rule items the background alternates.

The renderer (`assets/render.js`) gained six pattern fills drawn in the figure's own ink and surface colours, so
figures look identical in both themes. The rubric (`scripts/lib/abstract-difficulty.mjs`) places the three families
at Medium: independent tracks with an alternating phase or one fixed element. Each set has two keys per position,
mixes all three families and keeps option-only strategies at or below 30%. `tests/abstract-pattern-solver.mjs` reads
only the drawn shapes and finds exactly one continuation and one matching option for every item. Light and dark
contact sheets are in `docs/research/abstract/contact-sheets.html`.

## Verification

- `npm run validate`, `npm test`, `npm run audit:numerical`, `npm run audit:abstract`, `npm run audit:reasoning`,
  the build and the browser tests.
- Independent blind review of all 50 verbal items: a separate reviewer for each set received only passages and
  options (`scripts/blind-review.mjs export`). Their answers, labels, difficulty ratings and comments are in
  `docs/research/verbal/blind-review/medium-2026-11/`, and `tests/verbal-bank.test.mjs` checks every key and label
  against them.

## Limits

Difficulty labels are editorial until first-attempt learner data exist. The commercial sample is a single practice
session and is not an official EPSO calibration. A bounded solver proves uniqueness only within its grammar.

The [independent follow-up review](../verbal/blind-review/medium-2026-11/follow-up-2026-11-07/README.md) checked this committed batch instead of adding a duplicate concurrent draft. It preserves the fifty numerical and fifty abstract additions, confirms the verbal length comparison, and improves eleven verbal items under fresh IDs with another blind review.
