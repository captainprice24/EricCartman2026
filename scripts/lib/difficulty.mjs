// Numerical difficulty is derived from the worked solution, not declared per template (audit finding N11).
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

// Score → difficulty: 1–2 easier, 3–4 medium, 5+ harder.
export function numericalDifficulty(q) {
  const s = numericalScore(q);
  return s <= 2 ? 1 : s <= 4 ? 2 : 3;
}
