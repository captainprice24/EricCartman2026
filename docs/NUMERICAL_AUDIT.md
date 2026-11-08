# Numerical question-bank audit

Scope: numerical only. All 270 items are inventoried and independently recalculated by tests/numerical-oracle.test.mjs.

## Finding and repair

The former rubric counted written calculation lines, operation symbols, large exhibits and second exhibits. This rewarded long explanations and repeated sums. A large table with one direct percentage calculation could therefore receive a harder label than its reasoning justified. User feedback is qualitative; there are no collected first-attempt response data in this repository.

The replacement rubric in `scripts/lib/difficulty.mjs` reviews each numerical topic by its shortest reasonable reasoning path. Easy items use one familiar calculation model; medium items combine a familiar model with weighting, conversion or successive adjustments; hard items reconstruct changing bases or solve linked reverse/constraint problems. Counting printed steps or irrelevant cells cannot promote an item. Unknown topics require a rubric entry. These are editorial bands, not psychometric estimates.

| Bank | Easy | Medium | Hard | Total |
|---|---:|---:|---:|---:|
| Kept items of Sets 01–04, former mechanical labels | 8 | 24 | 16 | 48 |
| Kept items of Sets 01–04, after review | 0 | 36 | 12 | 48 |
| Medium Sets 12–16 | 0 | 50 | 0 | 50 |
| EU Training-format replacements (November 2026) | 0 | 91 | 94 | 185 |
| Current bank | 0 | 148 | 122 | 270 |

20 existing items changed difficulty. The later project repair regenerated all 150 foundation items with genuine mistake models under new revision IDs. `scripts/generators/numerical-revisions.json` records superseded IDs and immutable content hashes. Sets 09–11 add thirty items across ten further models. The later book-informed numerical review revises teaching and wording under fresh IDs; see docs/NUMERICAL_BOOK_REVIEW.md and scripts/generators/numerical-review-revisions.json.

## EU Training format (November 2026)

Every Easy and Hard item in Sets 01–11 was replaced by an EU Training-format item with a new id ending `-eu` (generator: `scripts/generators/numerical-eu.mjs`). The 91 Easy items became Medium two-step questions, and the 94 Hard and very hard items became four-stage questions whose conditions sit in a note under the exhibit. The bank therefore has no Easy numerical items. Stems are at most 45 words; options are named mistakes at least 3% of the key apart, so no rounding instruction is needed; 158 of the new items use a chart (bars with a turnout line on a second scale, horizontal bars, stacked bars, pies and long line series), and 27 are physics questions on race times (speed, acceleration and catching up). Medium Sets 12–16 and the Medium items of Sets 01–04 are unchanged. Fingerprints: `scripts/generators/numerical-eu-fingerprints.json`. After review, six Hard models that needed little insight became Medium, eight insight-based Hard models were added, and 28 retired Hard items of borderline length (Per-capita change, Rates with changing base, Market share in percentage points, Cross-currency landed cost, Real pooled productivity, Linked-index real per-capita change, Reverse pooled success rate) were restored in their original slots, so the bank has 27 Hard models. Later, 75 older Medium arithmetic drills were replaced by chart-based Medium items, and more Hard models were drawn as charts: 96 of 148 Medium and 80 of 122 Hard items now use a chart. The worked solutions of all 185 EU-format items were later rewritten so that every step shows where its numbers come from (unit conversions shown, no fractional counts of people, exact values marked with = and rounded ones with ≈); they carry ids ending `-eu2` recorded in `scripts/generators/numerical-eu-revisions.json`.

## Sets

| Set | Easy | Medium | Hard | Purpose |
|---|---:|---:|---:|---|
| numerical-01 | 0 | 4 | 6 | Mixed foundation and exam practice |
| numerical-02 | 0 | 36 | 14 | Mixed foundation and exam practice |
| numerical-03 | 0 | 31 | 19 | Mixed foundation and exam practice |
| numerical-04 | 0 | 27 | 13 | Mixed foundation and exam practice |
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
| Budget reallocation | 6 | Medium | A familiar model with weighting, unit conversion, reverse percentage, or successive adjustments. |
| Change in a 100% stacked chart | 5 | Medium | Two linked steps read from a chart: compare two lines or segments, convert shares into amounts with the right total, or measure a change against the right base. |
| Combining two exhibits | 6 | Medium | A familiar model with weighting, unit conversion, reverse percentage, or successive adjustments. |
| Constant annual increase | 5 | Medium | Two linked steps on one exhibit: a rate or share applied to the right base, a reverse percentage, a weighted mean or a speed–time relation. |
| Difference between two pie slices | 4 | Medium | Two linked steps read from a chart: compare two lines or segments, convert shares into amounts with the right total, or measure a change against the right base. |
| Discounts and VAT | 7 | Medium | A familiar model with weighting, unit conversion, reverse percentage, or successive adjustments. |
| Distance gap at the finish | 5 | Medium | Two linked steps on one exhibit: a rate or share applied to the right base, a reverse percentage, a weighted mean or a speed–time relation. |
| Earlier amount from a pie chart | 5 | Medium | Two linked steps on one exhibit: a rate or share applied to the right base, a reverse percentage, a weighted mean or a speed–time relation. |
| Equivalent ticket price | 4 | Medium | A short chain of familiar steps applied to the right rows; workload rather than insight. |
| Growth projection | 6 | Medium | A familiar model with weighting, unit conversion, reverse percentage, or successive adjustments. |
| Index change on a line chart | 5 | Medium | Two linked steps read from a chart: compare two lines or segments, convert shares into amounts with the right total, or measure a change against the right base. |
| Largest gap on an unlabelled chart | 5 | Medium | Two linked steps read from a chart: compare two lines or segments, convert shares into amounts with the right total, or measure a change against the right base. |
| NO share of all eligible voters | 4 | Medium | A short chain of familiar steps applied to the right rows; workload rather than insight. |
| People employed from a rate line | 5 | Medium | Two linked steps read from a chart: compare two lines or segments, convert shares into amounts with the right total, or measure a change against the right base. |
| People from the gap between two lines | 5 | Medium | Two linked steps read from a chart: compare two lines or segments, convert shares into amounts with the right total, or measure a change against the right base. |
| Per-capita comparison | 6 | Medium | A familiar model with weighting, unit conversion, reverse percentage, or successive adjustments. |
| Percentage difference between two items | 7 | Medium | A familiar model with weighting, unit conversion, reverse percentage, or successive adjustments. |
| Percentage difference from a bar chart | 4 | Medium | Two linked steps read from a chart: compare two lines or segments, convert shares into amounts with the right total, or measure a change against the right base. |
| Population from an unchanged group | 4 | Medium | A short chain of familiar steps applied to the right rows; workload rather than insight. |
| Rank of percentage increases | 4 | Medium | Two linked steps on one exhibit: a rate or share applied to the right base, a reverse percentage, a weighted mean or a speed–time relation. |
| Share change in a stacked chart | 4 | Medium | Two linked steps read from a chart: compare two lines or segments, convert shares into amounts with the right total, or measure a change against the right base. |
| Time to reach top speed | 4 | Medium | Two linked steps on one exhibit: a rate or share applied to the right base, a reverse percentage, a weighted mean or a speed–time relation. |
| Total from shares in a stacked chart | 5 | Medium | Two linked steps on one exhibit: a rate or share applied to the right base, a reverse percentage, a weighted mean or a speed–time relation. |
| Turnout and votes | 5 | Medium | Two linked steps on one exhibit: a rate or share applied to the right base, a reverse percentage, a weighted mean or a speed–time relation. |
| Units and per-capita values | 6 | Medium | A familiar model with weighting, unit conversion, reverse percentage, or successive adjustments. |
| Weighted average | 7 | Medium | A familiar model with weighting, unit conversion, reverse percentage, or successive adjustments. |
| Weighted average with a ratio | 5 | Medium | Two linked steps on one exhibit: a rate or share applied to the right base, a reverse percentage, a weighted mean or a speed–time relation. |
| Average after two changes | 5 | Hard | Recover the call mix from three averages, apply both changes and weight them by the mix. |
| Average price under tiered rates | 4 | Hard | Split consumption into bands, price each band separately, add the standing charge and spread it over all units. |
| Best overall rate despite the mix | 5 | Hard | Turn category rates into resolved cases, pool them per office and see that case mix can reverse the ranking. |
| Capped proportional allocation | 5 | Hard | Detect the binding cap, fix that amount, rebuild the population base without it and share the remainder. |
| Catching up at constant speeds | 5 | Hard | Convert two race times into speeds, form the closing speed, solve the catch-up time and the distance. |
| Change in a remainder group | 5 | Hard | Derive the remainder share in two years, convert both into people with changing populations and compare. |
| Cross-currency landed cost | 4 | Hard (very hard challenge) | Separate goods and freight, apply different discounts, convert invoices, apply fees and pool. |
| Currency round trip with fees | 4 | Hard | Apply the fee twice, multiply by units per euro going in, divide coming back and compare the two rates. |
| Estimate from an unlabelled chart | 5 | Hard | Read the right extremes from gridlines, locate them in the right years and compare against the starting value. |
| Growth needed to hold a share | 5 | Hard | Grow the other countries, convert the share into a target and solve the required growth. |
| Largest change in tonnes from two pie charts | 5 | Hard | Convert both years' shares into tonnes with their own totals and compare the changes, not the shares. |
| Linked-index real per-capita change | 4 | Hard (very hard challenge) | Bridge rebased indices, compound price factors, deflate spending and compare changing population bases. |
| Market share in percentage points | 4 | Hard | Construct and compare ratios with changing bases; the denominator must be rebuilt. |
| Meeting point of two travellers | 4 | Hard | Choose the right speeds, add them as a closing speed, solve the meeting time and convert it into a distance. |
| Per-capita change | 4 | Hard | Construct and compare ratios with changing bases; the denominator must be rebuilt. |
| Per-capita gap after population change | 5 | Hard | Update two populations, form both per-capita values and compare them on the correct base. |
| Price change needed for a target inflation | 4 | Hard | Form the weighted contributions of known categories, find the shortfall and divide by the missing weight. |
| Projected share against a past amount | 5 | Hard | Grow the total, add percentage points to the share, combine them and compare with a past amount. |
| Rates with changing base | 4 | Hard | Construct and compare ratios with changing bases; the denominator must be rebuilt. |
| Real pooled productivity | 4 | Hard (very hard challenge) | Pool two offices, deflate revenue, rebuild both FTE bases, then compare real ratios. |
| Reverse pooled success rate | 4 | Hard (very hard challenge) | Rebuild assessed populations, derive target passes, subtract known passes, solve the missing rate. |
| Speed for a target average | 4 | Hard | Convert the target into a total time, subtract the time already used and solve the last stage's speed. |
| Speed needed to win | 4 | Hard | Identify the winner, compute the time left from the runner's own split and convert it into a required speed. |
| Top speed from a race time | 5 | Hard | Identify the athlete, model uniform acceleration as half top speed, split the time and solve for speed. |
| True share of positive results | 5 | Hard | Split the tested population by prevalence, apply detection and false-positive rates separately and form the posterior share. |
| Turnout needed to change the result | 5 | Hard | Compute the overall lead, rebuild eligible voters from turnout, convert the lead into turnout points and add. |
| Year one overtakes another | 5 | Hard | Compare compound growth factors, track the shrinking ratio year by year and identify the first crossing. |

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
