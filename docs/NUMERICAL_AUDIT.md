# Numerical question-bank audit

Scope: numerical only. All 270 items are inventoried and independently recalculated by tests/numerical-oracle.test.mjs.

## Finding and repair

The former rubric counted written calculation lines, operation symbols, large exhibits and second exhibits. This rewarded long explanations and repeated sums. A large table with one direct percentage calculation could therefore receive a harder label than its reasoning justified. User feedback is qualitative; there are no collected first-attempt response data in this repository.

The replacement rubric in `scripts/lib/difficulty.mjs` reviews each numerical topic by its shortest reasonable reasoning path. Easy items use one familiar calculation model; medium items combine a familiar model with weighting, conversion or successive adjustments; hard items reconstruct changing bases or solve linked reverse/constraint problems. Counting printed steps or irrelevant cells cannot promote an item. Unknown topics require a rubric entry. These are editorial bands, not psychometric estimates.

| Bank | Easy | Medium | Hard | Total |
|---|---:|---:|---:|---:|
| Kept items of Sets 01–04, former mechanical labels | 19 | 51 | 12 | 82 |
| Kept items of Sets 01–04, after review | 0 | 82 | 0 | 82 |
| Medium Sets 12–16 | 0 | 50 | 0 | 50 |
| EU Training-format replacements (November 2026) | 0 | 56 | 82 | 138 |
| Current bank | 0 | 188 | 82 | 270 |

31 existing items changed difficulty. The later project repair regenerated all 150 foundation items with genuine mistake models under new revision IDs. `scripts/generators/numerical-revisions.json` records superseded IDs and immutable content hashes. Sets 09–11 add thirty items across ten further models. The later book-informed numerical review revises teaching and wording under fresh IDs; see docs/NUMERICAL_BOOK_REVIEW.md and scripts/generators/numerical-review-revisions.json.

## EU Training format (November 2026)

Every Easy and Hard item in Sets 01–11 was replaced by an EU Training-format item with a new id ending `-eu` (generator: `scripts/generators/numerical-eu.mjs`). The 56 Easy items became Medium two-step questions, and the 82 Hard and very hard items became four-stage questions whose conditions sit in a note under the exhibit. The bank therefore has no Easy numerical items. Stems are at most 45 words; options are named mistakes at least 3% of the key apart, so no rounding instruction is needed; 58 of the new items use a chart (bars with a turnout line on a second scale, horizontal bars, stacked bars, pies and long line series), and 20 are physics questions on race times (speed, acceleration and catching up). Medium Sets 12–16 and the Medium items of Sets 01–04 are unchanged. Fingerprints: `scripts/generators/numerical-eu-fingerprints.json`.

## Sets

| Set | Easy | Medium | Hard | Purpose |
|---|---:|---:|---:|---|
| numerical-01 | 0 | 9 | 1 | Mixed foundation and exam practice |
| numerical-02 | 0 | 46 | 4 | Mixed foundation and exam practice |
| numerical-03 | 0 | 46 | 4 | Mixed foundation and exam practice |
| numerical-04 | 0 | 37 | 3 | Mixed foundation and exam practice |
| numerical-05 | 0 | 0 | 10 | Very hard; 10 questions / 20-minute timed practice |
| numerical-06 | 0 | 0 | 10 | Very hard; 10 questions / 20-minute timed practice |
| numerical-07 | 0 | 0 | 10 | Very hard; 10 questions / 20-minute timed practice |
| numerical-08 | 0 | 0 | 10 | Very hard; 10 questions / 20-minute timed practice |
| numerical-09 | 0 | 0 | 10 | Very hard; 10 questions / 20-minute timed practice |
| numerical-10 | 0 | 0 | 10 | Very hard; 10 questions / 20-minute timed practice |
| numerical-11 | 0 | 0 | 10 | Very hard; 10 questions / 20-minute timed practice |
| numerical-12 | 0 | 10 | 0 | Mixed foundation and exam practice |
| numerical-13 | 0 | 10 | 0 | Mixed foundation and exam practice |
| numerical-14 | 0 | 10 | 0 | Mixed foundation and exam practice |
| numerical-15 | 0 | 10 | 0 | Mixed foundation and exam practice |
| numerical-16 | 0 | 10 | 0 | Mixed foundation and exam practice |

Choose Numerical difficulty in Coach or Practice. Select Set 5–11, 10 questions and timed practice for a complete challenge round. The selector applies only to numerical training; random simulations keep the unseen-first difficulty mix. The fixed full-test library assigns non-overlapping questions, with the new challenge content in tests 13–15.

## Topic review

| Topic | Items | Band | Reasoning rationale |
|---|---:|---|---|
| Amount needed for a target share | 4 | Medium | Two linked steps on one exhibit: a rate or share applied to the right base, a reverse percentage, a weighted mean or a speed–time relation. |
| Average speed | 6 | Medium | A familiar model with weighting, unit conversion, reverse percentage, or successive adjustments. |
| Averaging rates | 6 | Medium | A familiar model with weighting, unit conversion, reverse percentage, or successive adjustments. |
| Break-even point | 6 | Medium | A familiar model with weighting, unit conversion, reverse percentage, or successive adjustments. |
| Budget reallocation | 6 | Medium | A familiar model with weighting, unit conversion, reverse percentage, or successive adjustments. |
| Combined work rates | 7 | Medium | A familiar model with weighting, unit conversion, reverse percentage, or successive adjustments. |
| Combining two exhibits | 6 | Medium | A familiar model with weighting, unit conversion, reverse percentage, or successive adjustments. |
| Compound growth | 7 | Medium | A familiar model with weighting, unit conversion, reverse percentage, or successive adjustments. |
| Constant annual increase | 5 | Medium | Two linked steps on one exhibit: a rate or share applied to the right base, a reverse percentage, a weighted mean or a speed–time relation. |
| Currency conversion | 5 | Medium | A familiar model with weighting, unit conversion, reverse percentage, or successive adjustments. |
| Discounts and VAT | 7 | Medium | A familiar model with weighting, unit conversion, reverse percentage, or successive adjustments. |
| Distance gap at the finish | 4 | Medium | Two linked steps on one exhibit: a rate or share applied to the right base, a reverse percentage, a weighted mean or a speed–time relation. |
| Earlier amount from a pie chart | 4 | Medium | Two linked steps on one exhibit: a rate or share applied to the right base, a reverse percentage, a weighted mean or a speed–time relation. |
| Fixed and variable costs | 7 | Medium | A familiar model with weighting, unit conversion, reverse percentage, or successive adjustments. |
| Funds raised per fundraiser | 5 | Medium | Two linked steps on one exhibit: a rate or share applied to the right base, a reverse percentage, a weighted mean or a speed–time relation. |
| Growth projection | 6 | Medium | A familiar model with weighting, unit conversion, reverse percentage, or successive adjustments. |
| Missing value from a known share | 4 | Medium | Two linked steps on one exhibit: a rate or share applied to the right base, a reverse percentage, a weighted mean or a speed–time relation. |
| Monthly pension payments | 4 | Medium | Two linked steps on one exhibit: a rate or share applied to the right base, a reverse percentage, a weighted mean or a speed–time relation. |
| Multi-step: unit cost | 6 | Medium | A familiar model with weighting, unit conversion, reverse percentage, or successive adjustments. |
| Per-capita comparison | 6 | Medium | A familiar model with weighting, unit conversion, reverse percentage, or successive adjustments. |
| Percentage difference between two items | 7 | Medium | A familiar model with weighting, unit conversion, reverse percentage, or successive adjustments. |
| Percentages of percentages | 7 | Medium | A familiar model with weighting, unit conversion, reverse percentage, or successive adjustments. |
| Population from per-capita change | 5 | Medium | Two linked steps on one exhibit: a rate or share applied to the right base, a reverse percentage, a weighted mean or a speed–time relation. |
| Rank of percentage increases | 4 | Medium | Two linked steps on one exhibit: a rate or share applied to the right base, a reverse percentage, a weighted mean or a speed–time relation. |
| Rates of work | 5 | Medium | A familiar model with weighting, unit conversion, reverse percentage, or successive adjustments. |
| Removing VAT | 6 | Medium | A familiar model with weighting, unit conversion, reverse percentage, or successive adjustments. |
| Required growth rate | 6 | Medium | A familiar model with weighting, unit conversion, reverse percentage, or successive adjustments. |
| Successive percentage changes | 7 | Medium | A familiar model with weighting, unit conversion, reverse percentage, or successive adjustments. |
| Time to reach top speed | 4 | Medium | Two linked steps on one exhibit: a rate or share applied to the right base, a reverse percentage, a weighted mean or a speed–time relation. |
| Total from shares in a stacked chart | 4 | Medium | Two linked steps on one exhibit: a rate or share applied to the right base, a reverse percentage, a weighted mean or a speed–time relation. |
| Turnout and votes | 5 | Medium | Two linked steps on one exhibit: a rate or share applied to the right base, a reverse percentage, a weighted mean or a speed–time relation. |
| Units and per-capita values | 6 | Medium | A familiar model with weighting, unit conversion, reverse percentage, or successive adjustments. |
| Weighted average | 7 | Medium | A familiar model with weighting, unit conversion, reverse percentage, or successive adjustments. |
| Weighted average with a ratio | 4 | Medium | Two linked steps on one exhibit: a rate or share applied to the right base, a reverse percentage, a weighted mean or a speed–time relation. |
| Average after two changes | 6 | Hard | Recover the call mix from three averages, apply both changes and weight them by the mix. |
| Catching up at constant speeds | 6 | Hard | Convert two race times into speeds, form the closing speed, solve the catch-up time and the distance. |
| Change in a remainder group | 6 | Hard | Derive the remainder share in two years, convert both into people with changing populations and compare. |
| Efficiency needed to keep a ratio | 6 | Hard | Hold funds per fundraiser, grow fundraisers and spending separately and solve the efficiency. |
| Equivalent ticket price | 5 | Hard (very hard challenge) | Count groups and players, build table and entry income, add concert costs and divide by guests. |
| Growth needed to hold a share | 6 | Hard | Grow the other countries, convert the share into a target and solve the required growth. |
| Missing value from a share of all types | 6 | Hard | Total the other countries, convert the share into a country total and remove the known types. |
| NO share of all eligible voters | 6 | Hard | Rebuild each district's eligible voters from its own turnout, add them and compare all NO votes with the total. |
| Pension spending in euros | 5 | Hard (very hard challenge) | Count pensioners, apply each country's pension and payments, convert each currency and add. |
| Per-capita gap after population change | 6 | Hard | Update two populations, form both per-capita values and compare them on the correct base. |
| Population from an unchanged group | 6 | Hard | Fix the unchanged group, solve the new population from its share and apply another share. |
| Projected share against a past amount | 6 | Hard | Grow the total, add percentage points to the share, combine them and compare with a past amount. |
| Top speed from a race time | 6 | Hard | Identify the athlete, model uniform acceleration as half top speed, split the time and solve for speed. |
| Turnout needed to change the result | 6 | Hard | Compute the overall lead, rebuild eligible voters from turnout, convert the lead into turnout points and add. |

## Quality and remaining limits

- Each challenge set has 10 different models, 2 keys in each answer position, 5 sorted numeric options and a mistake explanation for every distractor. Every challenge item supplies at least twelve data values in one or two exhibits and at least four dependent transformations. No generic filler distractors are allowed anywhere in the numerical bank.
- 0 original items retain at least one generic filler distractor (0 fillers in all). The generator now rejects layouts without four usable, named mistakes and regenerates data instead of inventing filler values.
- The fourteen hard EU-format models have five or six variants each, spread so that no very hard set repeats a model. These items are not 82 unrelated reasoning structures. Previously practising a model can improve later-set performance.
- The current validator checks schemas, exhibit uniqueness, options and numerical rubric consistency. Independent solvers check the displayed data and final rounding. Additional checks cover binding caps, feasible substitution, rate bounds and the whole-batch profit inequality.
- The EU-format items were checked against twenty EU Training numerical samples supplied by the owner (question length, exhibit types, notes, physics); no sample question or data set was copied. No claim is made that these items reproduce official EPSO difficulty; the official sample website could not be inspected in this environment.

## Calibration after release

Pilot at exam pace (120 seconds per item) on first exposures. Record item ID, correctness, elapsed time, omission and prior exposure to the same model. Review ambiguity when strong candidates disagree; review easy-labelled items with unexpectedly low accuracy. Compare first-attempt accuracy and median correct-response time across bands before changing thresholds. Do not treat repeats or hinted Coach answers as difficulty evidence. Keep item IDs stable when changing a label; create a new ID for substantive question revisions.

## Reusable files

- `docs/research/numerical/inventory.csv`: item-level inventory sorted Easy → Medium → Hard, including old label, rationale and filler counts.
- `docs/research/numerical/inventory.json`: machine-readable inventory and ID lists grouped by band.
- `docs/research/numerical/README.md`: source assessments, rights decisions, reference examples and authoring checklist.
- Refresh this audit with `npm run audit:numerical` after generation or rubric changes.
