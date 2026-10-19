# Numerical question-bank audit

Scope: numerical only. All 190 items are inventoried; all 190 answers are independently recalculated by `tests/numerical-oracle.test.mjs`. Verbal and abstract content and difficulty are unchanged.

## Finding and repair

The former rubric counted written calculation lines, operation symbols, large exhibits and second exhibits. This rewarded long explanations and repeated sums. A large table with one direct percentage calculation could therefore receive a harder label than its reasoning justified. User feedback is qualitative; there are no collected first-attempt response data in this repository.

The replacement rubric in `scripts/lib/difficulty.mjs` reviews each numerical topic by its shortest reasonable reasoning path. Easy items use one familiar calculation model; medium items combine a familiar model with weighting, conversion or successive adjustments; hard items reconstruct changing bases or solve linked reverse/constraint problems. Counting printed steps or irrelevant cells cannot promote an item. Unknown topics require a rubric entry. These are editorial bands, not psychometric estimates.

| Bank | Easy | Medium | Hard | Total |
|---|---:|---:|---:|---:|
| Original bank under former labels | 41 | 85 | 24 | 150 |
| Original bank after review | 56 | 82 | 12 | 150 |
| New challenge sets | 0 | 0 | 40 | 40 |
| Current bank | 56 | 82 | 52 | 190 |

69 existing items changed difficulty. The later project repair regenerated all 150 foundation items with genuine mistake models under new revision IDs. `scripts/generators/numerical-revisions.json` records superseded IDs and immutable content hashes. The forty challenge items are unchanged.

## Sets

| Set | Easy | Medium | Hard | Purpose |
|---|---:|---:|---:|---|
| numerical-01 | 5 | 4 | 1 | Mixed foundation and exam practice |
| numerical-02 | 16 | 30 | 4 | Mixed foundation and exam practice |
| numerical-03 | 19 | 27 | 4 | Mixed foundation and exam practice |
| numerical-04 | 16 | 21 | 3 | Mixed foundation and exam practice |
| numerical-05 | 0 | 0 | 10 | Very hard; 10 questions / 20-minute timed practice |
| numerical-06 | 0 | 0 | 10 | Very hard; 10 questions / 20-minute timed practice |
| numerical-07 | 0 | 0 | 10 | Very hard; 10 questions / 20-minute timed practice |
| numerical-08 | 0 | 0 | 10 | Very hard; 10 questions / 20-minute timed practice |

Choose Numerical difficulty in Coach or Practice. Select Set 5, 6, 7 or 8, 10 questions and timed practice for a complete challenge round. The selector applies only to numerical training; exam simulations keep the existing unseen-first difficulty mix.

## Topic review

| Topic | Items | Band | Reasoning rationale |
|---|---:|---|---|
| Averages over part of a period | 4 | Easy | One direct difference, ratio, sum or mean; extra rows do not add conceptual demand. |
| Highest share in a stacked chart | 4 | Easy | One direct difference, ratio, sum or mean; extra rows do not add conceptual demand. |
| Index numbers: percentage change | 4 | Easy | One direct difference, ratio, sum or mean; extra rows do not add conceptual demand. |
| Index numbers: values | 4 | Easy | One direct difference, ratio, sum or mean; extra rows do not add conceptual demand. |
| Largest gap on a line chart | 2 | Easy | One direct difference, ratio, sum or mean; extra rows do not add conceptual demand. |
| Largest relative gap on a line chart | 2 | Easy | One direct difference, ratio, sum or mean; extra rows do not add conceptual demand. |
| Percentage change of a total | 4 | Easy | One direct difference, ratio, sum or mean; extra rows do not add conceptual demand. |
| Percentage points | 2 | Easy | One direct difference, ratio, sum or mean; extra rows do not add conceptual demand. |
| Proportional allocation | 4 | Easy | One direct difference, ratio, sum or mean; extra rows do not add conceptual demand. |
| Ratios from a chart | 4 | Easy | One direct difference, ratio, sum or mean; extra rows do not add conceptual demand. |
| Relative change | 2 | Easy | One direct difference, ratio, sum or mean; extra rows do not add conceptual demand. |
| Share of a total | 4 | Easy | One direct difference, ratio, sum or mean; extra rows do not add conceptual demand. |
| Shares in a stacked chart | 4 | Easy | One direct difference, ratio, sum or mean; extra rows do not add conceptual demand. |
| Shares to amounts | 4 | Easy | One direct difference, ratio, sum or mean; extra rows do not add conceptual demand. |
| Undoing a percentage change | 4 | Easy | One direct difference, ratio, sum or mean; extra rows do not add conceptual demand. |
| Unit price comparison | 4 | Easy | One direct difference, ratio, sum or mean; extra rows do not add conceptual demand. |
| Average speed | 4 | Medium | A familiar model with weighting, unit conversion, reverse percentage, or successive adjustments. |
| Averaging rates | 4 | Medium | A familiar model with weighting, unit conversion, reverse percentage, or successive adjustments. |
| Break-even point | 4 | Medium | A familiar model with weighting, unit conversion, reverse percentage, or successive adjustments. |
| Budget reallocation | 4 | Medium | A familiar model with weighting, unit conversion, reverse percentage, or successive adjustments. |
| Combined work rates | 4 | Medium | A familiar model with weighting, unit conversion, reverse percentage, or successive adjustments. |
| Combining two exhibits | 4 | Medium | A familiar model with weighting, unit conversion, reverse percentage, or successive adjustments. |
| Compound growth | 4 | Medium | A familiar model with weighting, unit conversion, reverse percentage, or successive adjustments. |
| Currency conversion | 3 | Medium | A familiar model with weighting, unit conversion, reverse percentage, or successive adjustments. |
| Discounts and VAT | 4 | Medium | A familiar model with weighting, unit conversion, reverse percentage, or successive adjustments. |
| Fixed and variable costs | 4 | Medium | A familiar model with weighting, unit conversion, reverse percentage, or successive adjustments. |
| Growth projection | 4 | Medium | A familiar model with weighting, unit conversion, reverse percentage, or successive adjustments. |
| Multi-step: unit cost | 4 | Medium | A familiar model with weighting, unit conversion, reverse percentage, or successive adjustments. |
| Per-capita comparison | 4 | Medium | A familiar model with weighting, unit conversion, reverse percentage, or successive adjustments. |
| Percentage difference between two items | 4 | Medium | A familiar model with weighting, unit conversion, reverse percentage, or successive adjustments. |
| Percentages of percentages | 4 | Medium | A familiar model with weighting, unit conversion, reverse percentage, or successive adjustments. |
| Rates of work | 3 | Medium | A familiar model with weighting, unit conversion, reverse percentage, or successive adjustments. |
| Removing VAT | 4 | Medium | A familiar model with weighting, unit conversion, reverse percentage, or successive adjustments. |
| Required growth rate | 4 | Medium | A familiar model with weighting, unit conversion, reverse percentage, or successive adjustments. |
| Successive percentage changes | 4 | Medium | A familiar model with weighting, unit conversion, reverse percentage, or successive adjustments. |
| Units and per-capita values | 4 | Medium | A familiar model with weighting, unit conversion, reverse percentage, or successive adjustments. |
| Weighted average | 4 | Medium | A familiar model with weighting, unit conversion, reverse percentage, or successive adjustments. |
| Capped weighted redistribution | 4 | Hard (very hard challenge) | Apply sequential deductions, build weights, detect a binding cap and redistribute on a new base. |
| Cross-currency landed cost | 4 | Hard (very hard challenge) | Separate goods and freight, apply different discounts, convert invoices, apply fees and pool. |
| Hedged exchange-rate threshold | 4 | Hard (very hard challenge) | Reverse a fee, separate fixed hedged proceeds, solve the unknown rate on the unhedged balance. |
| Linked-index real per-capita change | 4 | Hard (very hard challenge) | Bridge rebased indices, compound price factors, deflate spending and compare changing population bases. |
| Loss-adjusted emissions substitution | 4 | Hard (very hard challenge) | Build the system target, compare delivered-energy intensities, solve substitution and invert delivery loss. |
| Market share in percentage points | 4 | Hard | Construct and compare ratios with changing bases; the denominator must be rebuilt. |
| Per-capita change | 4 | Hard | Construct and compare ratios with changing bases; the denominator must be rebuilt. |
| Rates with changing base | 4 | Hard | Construct and compare ratios with changing bases; the denominator must be rebuilt. |
| Real pooled productivity | 4 | Hard (very hard challenge) | Pool two offices, deflate revenue, rebuild both FTE bases, then compare real ratios. |
| Recovered-output capacity | 4 | Hard (very hard challenge) | Compose rejection and recovery rates, reconstruct past output, solve remaining line time. |
| Reverse pooled success rate | 4 | Hard (very hard challenge) | Rebuild assessed populations, derive target passes, subtract known passes, solve the missing rate. |
| Reverse stock flow with returns | 4 | Hard (very hard challenge) | Compose reusable-return shares, solve the stock equation, then reverse incoming losses. |
| Yield-adjusted profit threshold | 4 | Hard (very hard challenge) | Remove VAT, invert yields, build mixed-batch contribution, solve and round a profit inequality. |

## Quality and remaining limits

- Each challenge set has 10 different models, 2 keys in each answer position, 5 sorted numeric options and a mistake explanation for every distractor. Every challenge item uses two exhibits and at least four dependent transformations. No generic filler distractors are allowed anywhere in the numerical bank.
- 0 original items retain at least one generic filler distractor (0 fillers in all). The generator now rejects layouts without four usable, named mistakes and regenerates data instead of inventing filler values.
- Four parameter variants per challenge model create transfer practice but are not 40 unrelated reasoning structures. Previously practising a model can improve later-set performance.
- The current validator checks schemas, exhibit uniqueness, options and numerical rubric consistency. Independent solvers check the displayed data and final rounding. Additional checks cover binding caps, feasible substitution, rate bounds and the whole-batch profit inequality.
- Complexity is intentionally above the original numerical bank. No claim is made that these items reproduce official EPSO difficulty; the official sample website could not be inspected in this environment.

## Calibration after release

Pilot at exam pace (120 seconds per item) on first exposures. Record item ID, correctness, elapsed time, omission and prior exposure to the same model. Review ambiguity when strong candidates disagree; review easy-labelled items with unexpectedly low accuracy. Compare first-attempt accuracy and median correct-response time across bands before changing thresholds. Do not treat repeats or hinted Coach answers as difficulty evidence. Keep item IDs stable when changing a label; create a new ID for substantive question revisions.

## Reusable files

- `docs/research/numerical/inventory.csv`: item-level inventory sorted Easy → Medium → Hard, including old label, rationale and filler counts.
- `docs/research/numerical/inventory.json`: machine-readable inventory and ID lists grouped by band.
- `docs/research/numerical/README.md`: source assessments, rights decisions, reference examples and authoring checklist.
- Refresh this audit with `npm run audit:numerical` after generation or rubric changes.
