// Legacy numerical workload diagnostic (retained for before/after auditing, not difficulty labels).
// Each solution line is one step; a line weighs 1 or 2 depending on how many kinds of operation it needs.
// Reading two exhibits adds one, and so does a large exhibit (24+ values) in which the right figures must be found. Categorical items (pick a country or a year) repeat the same calculation
// for every option, so they count one option's calculation plus one for the comparison.
const en = (v) => (v && typeof v === "object" && !Array.isArray(v) ? v.en : v);

export function lineWeight(line) {
  const s = String(en(line));
  if (!s.includes("=")) return 0;
  // Ignore minus signs that belong to a number (−3.5, (−2)) or a range.
  const ops = new Set((s.replace(/(^|[\s(=:])[−-](?=\d)/g, "$1").match(/[+−×÷^]|\s-\s/g) || []).map((o) => o.trim()));
  return Math.min(2, ops.size);
}

export function numericalSteps(q) {
  const lines = q.solution || [];
  if (q.answerType === "category") {
    const per = Math.max(0, ...lines.map(lineWeight));
    return per + 1;
  }
  return lines.reduce((t, l) => t + lineWeight(l), 0);
}

export function dataValues(exhibits) {
  return exhibits.reduce((t, ex) => t + (ex.type === "table" ? ex.rows.length * (ex.columns.length - 1) : ex.type === "pie" ? ex.slices.length : ex.categories.length * ex.series.length), 0);
}

export function numericalScore(q) {
  const exhibits = q.exhibits || (q.exhibit ? [q.exhibit] : []);
  return numericalSteps(q) + (exhibits.length > 1 ? 1 : 0) + (dataValues(exhibits) >= 24 ? 1 : 0);
}

// Editorial reasoning rubric. Repeated additions, table size and verbose solutions do not
// raise the level. Workload above remains available as a diagnostic, not a difficulty label.
// stages = dependent transformations on the shortest reasonable solution path, not written lines.
export const NUMERICAL_RUBRIC = {};
function topics(level, stages, reason, names) {
  names.forEach(topic => { NUMERICAL_RUBRIC[topic] = { level, stages, reason }; });
}
topics(1, 1, "One direct difference, ratio, sum or mean; extra rows do not add conceptual demand.", [
  "Percentage change of a total", "Share of a total", "Percentage points", "Ratios from a chart",
  "Shares in a stacked chart", "Shares to amounts", "Undoing a percentage change", "Index numbers: values",
  "Index numbers: percentage change", "Proportional allocation", "Unit price comparison",
  "Largest gap on a line chart", "Largest relative gap on a line chart", "Averages over part of a period",
  "Relative change", "Highest share in a stacked chart"
]);
topics(2, 2, "A familiar model with weighting, unit conversion, reverse percentage, or successive adjustments.", [
  "Currency conversion", "Weighted average", "Removing VAT", "Budget reallocation", "Growth projection",
  "Units and per-capita values", "Rates of work", "Average speed", "Successive percentage changes",
  "Percentages of percentages", "Per-capita comparison", "Multi-step: unit cost", "Averaging rates",
  "Compound growth", "Combining two exhibits", "Required growth rate", "Fixed and variable costs",
  "Break-even point", "Discounts and VAT", "Combined work rates", "Percentage difference between two items"
]);
topics(3, 3, "Construct and compare ratios with changing bases; the denominator must be rebuilt.", [
  "Per-capita change", "Rates with changing base", "Market share in percentage points"
]);
const challenges = [
  ["Real pooled productivity", 4, "Pool two offices, deflate revenue, rebuild both FTE bases, then compare real ratios."],
  ["Cross-currency landed cost", 4, "Separate goods and freight, apply different discounts, convert invoices, apply fees and pool."],
  ["Reverse pooled success rate", 4, "Rebuild assessed populations, derive target passes, subtract known passes, solve the missing rate."],
  ["Recovered-output capacity", 4, "Compose rejection and recovery rates, reconstruct past output, solve remaining line time."],
  ["Capped weighted redistribution", 5, "Apply sequential deductions, build weights, detect a binding cap and redistribute on a new base."],
  ["Yield-adjusted profit threshold", 5, "Remove VAT, invert yields, build mixed-batch contribution, solve and round a profit inequality."],
  ["Linked-index real per-capita change", 5, "Bridge rebased indices, compound price factors, deflate spending and compare changing population bases."],
  ["Reverse stock flow with returns", 4, "Compose reusable-return shares, solve the stock equation, then reverse incoming losses."],
  ["Hedged exchange-rate threshold", 4, "Reverse a fee, separate fixed hedged proceeds, solve the unknown rate on the unhedged balance."],
  ["Loss-adjusted emissions substitution", 5, "Build the system target, compare delivered-energy intensities, solve substitution and invert delivery loss."]
];
challenges.forEach(([topic, stages, reason]) => { NUMERICAL_RUBRIC[topic] = { level: 3, stages, reason, challenge: true }; });

export function numericalRubric(q) {
  const rubric = NUMERICAL_RUBRIC[en(q.topic)];
  if (!rubric) throw new Error("Numerical topic needs an editorial difficulty review: " + en(q.topic));
  return rubric;
}
export function numericalDifficulty(q) { return numericalRubric(q).level; }

// Additional full-test models reviewed for dependent reasoning, not expression count.
topics(3, 4, "Build disjoint condition populations, pass each through two conditional screens and reconstruct the posterior denominator.", ["Sequential screening posterior"]);
topics(3, 4, "Drain solute, evaporate water, rebuild volume after fixed dilution and solve a concentrate equation with a moving denominator.", ["Evaporation and replacement mixture"]);
topics(3, 4, "Choose contribution cap and marginal tax regime, invert net receipts and verify both binding inequalities.", ["Inverse capped-contribution taxation"]);
topics(3, 4, "Reverse the final whole-balance fee, reverse taxed second-period interest, restore withdrawal and reverse first-period growth.", ["Reverse savings with intervening withdrawal"]);
topics(3, 4, "Apply asymmetric price changes, track sale fees in both numerator and denominator, and solve the post-fee allocation.", ["Fee-sensitive portfolio rebalance"]);
topics(3, 4, "Deduplicate registrations, build three disjoint rework populations, apply conditional repeat fraction and solve a whole-day threshold.", ["Deduplicated workload with conditional rework"]);
topics(3, 4, "Build baseline emissions, solve the binding fast-distance constraint, pool separate travel times and add the stop.", ["Emissions-constrained minimum journey time"]);
topics(3, 4, "Compound depreciation, tax only positive disposal gain, repay old debt and reverse the fee on the replacement funding gap.", ["Replacement finance after taxed disposal"]);
topics(3, 4, "Split opening cohorts, apply unequal attrition, rebuild final denominator and solve surviving entrant composition.", ["Reverse entrant composition after cohort attrition"]);
topics(3, 4, "Invert serial yield, reconstruct productive module-hours, solve an integer capacity bound and add one shared setup.", ["Indivisible capacity after serial losses"]);

// EU Training-format models (November 2026). Medium: two linked steps on one exhibit.
topics(2, 2, "Two linked steps on one exhibit: a rate or share applied to the right base, a reverse percentage, a weighted mean or a speed–time relation.", [
  "Turnout and votes", "Funds raised per fundraiser", "Population from per-capita change", "Constant annual increase",
  "Missing value from a known share", "Weighted average with a ratio", "Rank of percentage increases", "Amount needed for a target share",
  "Total from shares in a stacked chart", "Monthly pension payments",
  "Earlier amount from a pie chart", "Distance gap at the finish", "Time to reach top speed"
]);
// Hard: four dependent stages, with the conditions in a note under the exhibit rather than in a long question.
[
  ["Per-capita gap after population change", "Update two populations, form both per-capita values and compare them on the correct base."],
  ["Average after two changes", "Recover the call mix from three averages, apply both changes and weight them by the mix."],
  ["Top speed from a race time", "Identify the athlete, model uniform acceleration as half top speed, split the time and solve for speed."],
  ["Catching up at constant speeds", "Convert two race times into speeds, form the closing speed, solve the catch-up time and the distance."],
  ["Change in a remainder group", "Derive the remainder share in two years, convert both into people with changing populations and compare."],
  ["Projected share against a past amount", "Grow the total, add percentage points to the share, combine them and compare with a past amount."],
  ["Growth needed to hold a share", "Grow the other countries, convert the share into a target and solve the required growth."],
  ["Turnout needed to change the result", "Compute the overall lead, rebuild eligible voters from turnout, convert the lead into turnout points and add."],
].forEach(([topic, reason]) => { NUMERICAL_RUBRIC[topic] = { level: 3, stages: 4, reason }; });

// Reviewed after the EU-format rebuild: six models needing little insight are Medium; eight new Hard models each turn on one insight.
topics(2, 2, "A short chain of familiar steps applied to the right rows; workload rather than insight.", [
  "NO share of all eligible voters", "Missing value from a share of all types", "Population from an unchanged group",
  "Efficiency needed to keep a ratio", "Equivalent ticket price", "Pension spending in euros"
]);
[
  ["Capped proportional allocation", "Detect the binding cap, fix that amount, rebuild the population base without it and share the remainder."],
  ["Year one overtakes another", "Compare compound growth factors, track the shrinking ratio year by year and identify the first crossing."],
  ["Best overall rate despite the mix", "Turn category rates into resolved cases, pool them per office and see that case mix can reverse the ranking."],
  ["True share of positive results", "Split the tested population by prevalence, apply detection and false-positive rates separately and form the posterior share."],
  ["Estimate from an unlabelled chart", "Read the right extremes from gridlines, locate them in the right years and compare against the starting value."],
  ["Speed needed to win", "Identify the winner, compute the time left from the runner's own split and convert it into a required speed."],
  ["Speed for a target average", "Convert the target into a total time, subtract the time already used and solve the last stage's speed."],
  ["Largest change in tonnes from two pie charts", "Convert both years' shares into tonnes with their own totals and compare the changes, not the shares."],
].forEach(([topic, reason]) => { NUMERICAL_RUBRIC[topic] = { level: 3, stages: 4, reason }; });

// Four further insight-based Hard models for the 40 former Medium slots made Hard.
[
  ["Average price under tiered rates", "Split consumption into bands, price each band separately, add the standing charge and spread it over all units."],
  ["Currency round trip with fees", "Apply the fee twice, multiply by units per euro going in, divide coming back and compare the two rates."],
  ["Price change needed for a target inflation", "Form the weighted contributions of known categories, find the shortfall and divide by the missing weight."],
  ["Meeting point of two travellers", "Choose the right speeds, add them as a closing speed, solve the meeting time and convert it into a distance."],
].forEach(([topic, reason]) => { NUMERICAL_RUBRIC[topic] = { level: 3, stages: 4, reason }; });

// Medium chart models covering the EU Training chart types (November 2026).
topics(2, 2, "Two linked steps read from a chart: compare two lines or segments, convert shares into amounts with the right total, or measure a change against the right base.", [
  "Largest gap on an unlabelled chart", "People from the gap between two lines", "Change in a 100% stacked chart", "People employed from a rate line",
  "Difference between two pie slices", "Percentage difference from a bar chart", "Index change on a line chart", "Share change in a stacked chart"
]);
