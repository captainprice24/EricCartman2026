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
