// Generates every numerical reasoning set (questions/numerical/numerical-set-01…04.js, 150 items).
// Each item is computed here: answer, mistake-based distractors and worked solution come from the same numbers.
// Usage: node scripts/generators/numerical.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

/* ---------- deterministic randomness ---------- */
let seed = 4207;
const rnd = () => {
  seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const ri = (a, b) => a + Math.floor(rnd() * (b - a + 1));
const rf = (a, b, d = 1) => round(a + rnd() * (b - a), d);
const round = (v, d = 0) => Math.round(v * 10 ** d) / 10 ** d;
const pickN = (arr, n) => { const a = arr.slice(); const out = []; while (out.length < n && a.length) out.push(a.splice(Math.floor(rnd() * a.length), 1)[0]); return out; };
const sum = (a) => a.reduce((s, x) => s + x, 0);

/* ---------- formatting ---------- */
const group = (n, d = 0) => {
  const [i, f] = Math.abs(n).toFixed(d).split(".");
  return (n < 0 ? "−" : "") + i.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (f ? "." + f : "");
};
const pct = (d = 1) => (v) => group(v, d) + "%";
const eur = (d = 0) => (v) => "EUR " + group(v, d);
const eurM = (d = 1) => (v) => "EUR " + group(v, d) + " million";
const unitF = (u, d = 1) => (v) => group(v, d) + " " + u;

const COUNTRIES = ["Aldoria", "Brevania", "Calmora", "Dunmark", "Estoria", "Fernland", "Galvia", "Hollen", "Istrada", "Jorvik", "Kestrel", "Lunaria", "Marrow", "Norvale", "Ostland", "Pellam", "Quarta", "Rosmark", "Sundra", "Tavel"];
const REGIONS = ["North", "South", "East", "West", "Centre", "Coast", "Islands", "Uplands"];
const FILL = "Not derived from a typical mistake. If you got this, recheck each step of your calculation.";

/* ---------- option assembly ---------- */
function shownValues(exhibits) {
  const out = new Set();
  const num = (s) => { const m = String(s).replace(/,/g, "").match(/-?\d+(\.\d+)?/); return m ? parseFloat(m[0]) : null; };
  exhibits.forEach((ex) => {
    if (ex.type === "table") ex.rows.forEach((r) => r.slice(1).forEach((c) => { const v = num(c); if (v !== null) out.add(v); }));
    else if (ex.type === "pie") ex.slices.forEach((s) => out.add(s.value));
    else ex.series.forEach((s) => s.values.forEach((v) => out.add(v)));
  });
  return out;
}

function assembleNumeric(t, targetPos) {
  const f = t.fmt;
  const key = t.correct;
  if (!(key > 0)) throw new Error("non-positive key: " + t.stem);
  if (f(key * (1 + 1e-9)) !== f(key * (1 - 1e-9))) throw new Error("rounding boundary: " + t.stem);
  const shown = shownValues(t.exhibits);
  const parse = (s) => parseFloat(String(s).replace(/,/g, "").match(/-?\d+(\.\d+)?/)[0]);
  const keyStr = f(key);
  const used = new Set([keyStr]);
  const minGap = key * 0.015;
  const pool = [];
  const add = (v, note, prio) => {
    if (!isFinite(v) || v <= 0) return;
    const ratio = v / key;
    if (ratio < (prio ? 0.82 : 0.72) || ratio > (prio ? 1.22 : 1.38)) return;
    const s = f(v);
    if (used.has(s) || shown.has(parse(s)) || Math.abs(v - key) < minGap || pool.some((p) => Math.abs(p.v - v) < minGap)) return;
    used.add(s);
    pool.push({ v, s, note, prio });
  };
  t.distractors.forEach((d) => add(d.v, d.note, 0));
  // Fillers are spaced irregularly so their pattern does not reveal the key.
  const step = t.fillStep || 0.045;
  for (let i = 1; i <= 8; i++) {
    add(key * (1 + step * (i * 0.8 + rnd() * 0.9)), FILL, i);
    add(key * (1 - step * (i * 0.8 + rnd() * 0.9)), FILL, i);
  }
  const below = pool.filter((p) => p.v < key).sort((a, b) => a.prio - b.prio || b.v - a.v);
  const above = pool.filter((p) => p.v > key).sort((a, b) => a.prio - b.prio || a.v - b.v);
  // Each feasible key position k (k options below the key) is scored by how many real mistakes it keeps;
  // the bank-wide assignment pass below picks positions so that answer letters stay balanced.
  const realBelow = below.filter((p) => p.note !== FILL).length, realAbove = above.filter((p) => p.note !== FILL).length;
  const cands = [];
  for (let cand = 0; cand <= 4; cand++) {
    if (cand > below.length || 4 - cand > above.length) continue;
    cands.push({ k: cand, real: Math.min(cand, realBelow) + Math.min(4 - cand, realAbove) });
  }
  if (!cands.length) throw new Error("no feasible option layout: " + t.stem);
  return { below, above, key, keyStr, cands };
}

function finalize(pool, k) {
  const chosen = pool.below.slice(0, k).concat(pool.above.slice(0, 4 - k), [{ v: pool.key, s: pool.keyStr, note: "Correct.", correct: true }]).sort((a, b) => a.v - b.v);
  if (chosen.length !== 5) throw new Error("layout error");
  return { options: chosen.map((c) => c.s), answer: chosen.findIndex((c) => c.correct), optionNotes: chosen.map((c) => c.note) };
}

/* ---------- templates ---------- */
const T = {};

// 1. Percentage change of a total across non-adjacent years (6 rows × 4 years)
T.growthTotal = (c) => {
  const years = c.years, names = pickN(c.names, 6);
  const rows = names.map(() => { let v = ri(c.min, c.max); const out = [v]; for (let i = 1; i < 4; i++) { v = round(v * (1 + ri(-4, 9) / 100)); out.push(v); } return out; });
  const [a, b] = c.pair;
  const ta = sum(rows.map((r) => r[a])), tb = sum(rows.map((r) => r[b]));
  const correct = ((tb - ta) / ta) * 100;
  const big = rows.reduce((m, r, i) => (r[a] > rows[m][a] ? i : m), 0);
  return {
    topic: "Percentage change of a total", difficulty: 2,
    exhibits: [{ type: "table", title: c.title, columns: [c.first, ...years], rows: rows.map((r, i) => [names[i], ...r.map((v) => group(v))]) }],
    stem: `By what percentage did the combined ${c.what} of the six ${c.unitWord} change between ${years[a]} and ${years[b]}?`,
    correct, fmt: pct(1),
    distractors: [
      { v: ((tb - ta) / tb) * 100, note: `This divides the change by the ${years[b]} total. Always divide by the starting value.` },
      { v: (sum(rows.map((r) => r[b])) - sum(rows.map((r) => r[b - 1]))) / sum(rows.map((r) => r[b - 1])) * 100 * (b - a), note: "This multiplies a one-year change by the number of years instead of comparing the two years directly." },
      { v: sum(rows.map((r) => ((r[b] - r[a]) / r[a]) * 100)) / rows.length, note: "This averages the six individual percentage changes; rows of different sizes must be added up first." },
      { v: ((rows[big][b] - rows[big][a]) / rows[big][a]) * 100, note: `This is the change for ${names[big]} alone, not for the total.` },
      ...rows.map((r, i) => ({ v: ((r[b] - r[a]) / r[a]) * 100, note: `This is the change for ${names[i]} alone, not for the total.` })),
      ...[[a + 1, b], [a, b - 1], [Math.max(0, a - 1), b]].filter(([p, q]) => p < q && !(p === a && q === b)).map(([p, q]) => ({ v: ((sum(rows.map((r) => r[q])) - sum(rows.map((r) => r[p]))) / sum(rows.map((r) => r[p]))) * 100, note: `This compares ${years[p]} with ${years[q]}: check the years in the question.` }))
    ],
    hints: [`Add up the ${years[a]} column and the ${years[b]} column; ignore the other years.`, "Percentage change = (new total − old total) ÷ old total × 100."],
    solution: [`Total ${years[a]} = ${group(ta)}`, `Total ${years[b]} = ${group(tb)}`, `Change = (${group(tb)} − ${group(ta)}) ÷ ${group(ta)} × 100 = ${group(correct, 2)}%`],
    explanation: "Total first, then the percentage. Averaging row percentages and dividing by the later value are the two classic errors; extra years in the table are there to distract."
  };
};

// 2. Share of a combined total for two rows (6 rows × 3 columns)
T.shareCombined = (c) => {
  const names = pickN(COUNTRIES, 6);
  const rows = names.map(() => [rf(1.5, 18, 1), ri(20, 480), ri(15, 160)]);
  const [x, y] = [0, 3];
  const tot = sum(rows.map((r) => r[c.col]));
  const correct = ((rows[x][c.col] + rows[y][c.col]) / tot) * 100;
  const other = c.col === 1 ? 0 : 1;
  return {
    topic: "Share of a total", difficulty: 1,
    exhibits: [{ type: "table", title: c.title, columns: ["Country", "Population (million)", "GDP (EUR billion)", "Area (thousand km²)"], rows: rows.map((r, i) => [names[i], r[0].toFixed(1), group(r[1]), group(r[2])]) }],
    stem: `What share of the combined ${c.what} of the six countries do ${names[x]} and ${names[y]} account for together?`,
    correct, fmt: pct(1),
    distractors: [
      { v: ((rows[x][other] + rows[y][other]) / sum(rows.map((r) => r[other]))) * 100, note: `This uses the ${other === 0 ? "population" : "GDP"} column instead of ${c.what}.` },
      { v: ((rows[x][c.col] + rows[y][c.col]) / (tot - rows[x][c.col] - rows[y][c.col])) * 100, note: "This compares the two countries with the other four, not with the total." },
      { v: ((rows[x][c.col] + rows[y + 1][c.col]) / tot) * 100, note: `This adds the wrong country: check that you are using ${names[x]} and ${names[y]}.` },
      { v: ((rows[x + 1][c.col] + rows[y][c.col]) / tot) * 100, note: `This adds the wrong country: check that you are using ${names[x]} and ${names[y]}.` },
      { v: ((rows[x + 2][c.col] + rows[y][c.col]) / tot) * 100, note: `This adds the wrong country: check that you are using ${names[x]} and ${names[y]}.` },
      { v: ((rows[x][c.col] + rows[y + 2][c.col]) / tot) * 100, note: `This adds the wrong country: check that you are using ${names[x]} and ${names[y]}.` }
    ],
    hints: ["Use only the column the question asks about.", "Add the two countries, then divide by the total of all six."],
    solution: [`${names[x]} + ${names[y]} = ${group(rows[x][c.col] + rows[y][c.col], 1)}`, `Total of six = ${group(tot, 1)}`, `Share = ${group(correct, 2)}%`],
    explanation: "Locate the right column and the right base. Distractors use the neighbouring column or the wrong denominator."
  };
};

// 3. Change in GDP per capita (5 rows × 4 columns)
T.perCapitaChange = (c) => {
  const names = pickN(COUNTRIES, 5);
  const rows = names.map(() => { const g0 = ri(40, 600), p0 = rf(2, 40, 1); return [g0, round(g0 * (1 + ri(4, 22) / 100)), p0, round(p0 * (1 + ri(-3, 6) / 100), 1)]; });
  const x = c.row;
  const [g0, g1, p0, p1] = rows[x];
  const correct = ((g1 / p1) / (g0 / p0) - 1) * 100;
  return {
    topic: "Per-capita change", difficulty: 3,
    exhibits: [{ type: "table", title: c.title, columns: ["Country", "GDP 2020 (EUR billion)", "GDP 2023 (EUR billion)", "Population 2020 (million)", "Population 2023 (million)"], rows: rows.map((r, i) => [names[i], group(r[0]), group(r[1]), r[2].toFixed(1), r[3].toFixed(1)]) }],
    stem: `By what percentage did GDP per inhabitant in ${names[x]} change between 2020 and 2023?`,
    correct, fmt: pct(1), fillStep: 0.06,
    distractors: [
      { v: ((g1 - g0) / g0) * 100, note: "This is the change in total GDP; it ignores the change in population." },
      { v: ((g1 - g0) / g0 - (p1 - p0) / p0) * 100, note: "Subtracting the population change from the GDP change is only an approximation; divide per-capita values instead." },
      { v: (1 - (g0 / p0) / (g1 / p1)) * 100, note: "This divides the change by the 2023 value instead of the 2020 value." },
      ...rows.map((r, i) => ({ v: ((r[1] / r[3]) / (r[0] / r[2]) - 1) * 100, note: `This is the change for ${names[i]}.` })).filter((d, i) => i !== x)
    ],
    hints: ["Compute GDP per inhabitant for both years first.", "Then calculate the percentage change between the two per-capita values."],
    solution: [`2020: ${g0} ÷ ${p0} = ${group(g0 / p0, 3)} (EUR thousand per person)`, `2023: ${g1} ÷ ${p1} = ${group(g1 / p1, 3)}`, `Change = ${group(g1 / p1, 3)} ÷ ${group(g0 / p0, 3)} − 1 = ${group(correct, 2)}%`],
    explanation: "Per-capita questions need both columns for both years. Using GDP alone ignores population growth."
  };
};

// 4. Percentage points vs relative change on a line chart (3 series × 6 years)
T.ppOrRelative = (c) => {
  const years = ["2018", "2019", "2020", "2021", "2022", "2023"];
  const series = c.series.map(() => { let v = rf(8, 30, 1); return years.map(() => { const out = v; v = round(v + rf(0.4, 3.2, 1), 1); return out; }); });
  const s = c.s, a = c.a, b = 5;
  const va = series[s][a], vb = series[s][b];
  const correct = c.askPP ? vb - va : ((vb - va) / va) * 100;
  return {
    topic: c.askPP ? "Percentage points" : "Relative change", difficulty: 3,
    exhibits: [{ type: "line", title: c.title, unit: "%", categories: years, series: c.series.map((n, i) => ({ name: n, values: series[i] })) }],
    stem: c.askPP
      ? `By how many percentage points did the share for ${c.series[s]} increase between ${years[a]} and ${years[b]}?`
      : `By what percentage did the share for ${c.series[s]} increase between ${years[a]} and ${years[b]}?`,
    correct, fmt: c.askPP ? unitF("percentage points", 1) : pct(1), fillStep: 0.06,
    distractors: c.askPP ? [
      { v: vb - series[s][a + 1], note: `This starts from ${years[a + 1]} instead of ${years[a]}.` },
      { v: series[(s + 1) % 3][b] - series[(s + 1) % 3][a], note: `This is the change for ${c.series[(s + 1) % 3]}.` },
      { v: series[(s + 2) % 3][b] - series[(s + 2) % 3][a], note: `This is the change for ${c.series[(s + 2) % 3]}.` },
      { v: series[s][b - 1] - va, note: `This stops at ${years[b - 1]}.` },
      { v: a > 0 ? vb - series[s][a - 1] : 0, note: `This starts from ${years[Math.max(0, a - 1)]}.` }
    ] : [
      { v: ((vb - series[s][a + 1]) / series[s][a + 1]) * 100, note: `This starts from ${years[a + 1]}.` },
      { v: ((vb - va) / vb) * 100, note: "This divides by the later value." },
      { v: ((series[(s + 1) % 3][b] - series[(s + 1) % 3][a]) / series[(s + 1) % 3][a]) * 100, note: `This is the change for ${c.series[(s + 1) % 3]}.` },
      { v: ((series[(s + 2) % 3][b] - series[(s + 2) % 3][a]) / series[(s + 2) % 3][a]) * 100, note: `This is the change for ${c.series[(s + 2) % 3]}.` },
      { v: ((series[s][b - 1] - va) / va) * 100, note: `This stops at ${years[b - 1]}.` }
    ],
    hints: [c.askPP ? "Percentage points = later share − earlier share. Do not divide." : "A percentage change is relative: (later − earlier) ÷ earlier.", "Read the exact values from the table under the chart."],
    solution: c.askPP ? [`${years[b]}: ${vb}%; ${years[a]}: ${va}%`, `Difference = ${group(correct, 1)} percentage points`] : [`${years[a]}: ${va}%; ${years[b]}: ${vb}% (difference ${group(vb - va, 1)} points)`, `(${vb} − ${va}) ÷ ${va} × 100 = ${group(correct, 2)}%`],
    explanation: "Percentage points measure the gap between two percentages; a percentage change measures that gap relative to the start. Check which the question asks for."
  };
};

// 5. Highest/lowest ratio (category answer; 2 series × 6 periods)
T.ratioCategory = (c, pos) => {
  const cats = c.periods;
  for (let attempt = 0; attempt < 3000; attempt++) {
    const B = cats.map(() => ri(c.min, c.max));
    const A = B.map((b) => Math.round(b * (1 + ri(4, 70) / 100)));
    const r = A.map((a, i) => a / B[i]);
    const order = r.map((v, i) => i).sort((i, j) => (c.lowest ? r[i] - r[j] : r[j] - r[i]));
    const best = order[0];
    if (Math.abs(r[order[0]] - r[order[1]]) < 0.03) continue;
    const bigA = A.indexOf(Math.max(...A));
    if (bigA === best) continue;
    const drop = order.filter((i) => i !== best && i !== bigA)[ri(0, 3)];
    const optsIdx = cats.map((x, i) => i).filter((i) => i !== drop);
    if (optsIdx.indexOf(best) !== pos) continue;
    return {
      answerType: "category", topic: "Ratios from a chart", difficulty: 2,
      exhibits: [{ type: "bar", title: c.title, unit: c.unit, categories: cats, series: [{ name: c.a, values: A }, { name: c.b, values: B }] }],
      stem: `In which ${c.word} was the ratio of ${c.a.toLowerCase()} to ${c.b.toLowerCase()} ${c.lowest ? "lowest" : "highest"}?`,
      options: optsIdx.map((i) => cats[i]), answer: pos,
      optionNotes: optsIdx.map((i) => (i === best ? `Correct: ${A[i]} ÷ ${B[i]} ≈ ${r[i].toFixed(3)}.` : `${A[i]} ÷ ${B[i]} ≈ ${r[i].toFixed(3)}.` + (i === bigA ? ` The tallest ${c.a.toLowerCase()} bar is not the ${c.lowest ? "lowest" : "highest"} ratio.` : ""))),
      hints: [`Divide ${c.a.toLowerCase()} by ${c.b.toLowerCase()} for each ${c.word} offered.`, "Compare ratios, not bar heights."],
      solution: optsIdx.map((i) => `${cats[i]}: ${A[i]} ÷ ${B[i]} = ${r[i].toFixed(3)}`).concat([`${c.lowest ? "Lowest" : "Highest"}: ${cats[best]}`]),
      explanation: "Compute every candidate ratio. The visually dominant bar is usually a distractor."
    };
  }
  throw new Error("ratioCategory");
};

// 6. Currency conversion via the euro on one of two dates (6 currencies × 2 dates)
T.currency = (c) => {
  const cur = c.currencies;
  const rates = cur.map(([, base]) => { const r0 = round(base * rf(0.97, 1.03, 3), base > 50 ? 1 : 4); const sgn = rnd() < 0.5 ? -1 : 1; return [r0, round(r0 * (1 + sgn * rf(0.04, 0.09, 3)), base > 50 ? 1 : 4)]; });
  const [ai, bi] = c.pair, d = c.date;
  const amt = c.amount;
  const correct = (amt / rates[ai][d]) * rates[bi][d];
  const o = 1 - d;
  return {
    topic: "Currency conversion", difficulty: 1,
    exhibits: [{ type: "table", title: "Exchange rates: units of currency per 1 EUR", columns: ["Currency", "1 January", "1 July"], rows: cur.map(([code], i) => [code, String(rates[i][0]), String(rates[i][1])]), note: "Assume conversions go through the euro, with no fees." }],
    stem: `On ${d ? "1 July" : "1 January"}, a company converted ${cur[ai][0]} ${group(amt)} into ${cur[bi][0]}. How much did it receive?`,
    correct, fmt: (v) => cur[bi][0] + " " + group(v, 2), fillStep: 0.035,
    distractors: [
      { v: (amt / rates[ai][o]) * rates[bi][o], note: `This uses the ${o ? "1 July" : "1 January"} rates.` },
      { v: (amt / rates[ai][d]) * rates[bi][o], note: "This mixes the two dates." },
      { v: (amt / rates[ai][o]) * rates[bi][d], note: "This mixes the two dates." }
    ],
    hints: ["Use only the column for the date in the question.", `Divide by the ${cur[ai][0]} rate to get euros, then multiply by the ${cur[bi][0]} rate.`],
    solution: [`${group(amt)} ÷ ${rates[ai][d]} = EUR ${group(amt / rates[ai][d], 2)}`, `× ${rates[bi][d]} = ${cur[bi][0]} ${group(correct, 2)}`],
    explanation: "With rates quoted per euro, divide to get into euros and multiply to get out. Check the date column: the other date is a ready-made distractor."
  };
};

// 7. Weighted average across a subset (5 rows × 3 columns)
T.weightedSubset = (c) => {
  const names = c.rows;
  const rows = names.map(() => [ri(c.nMin, c.nMax), ri(c.vMin, c.vMax) * c.vStep, ri(28, 55)]);
  const sub = [0, 2, 3];
  const n = sum(sub.map((i) => rows[i][0])), w = sum(sub.map((i) => rows[i][0] * rows[i][1]));
  const correct = w / n;
  return {
    topic: "Weighted average", difficulty: 2,
    exhibits: [{ type: "table", title: c.title, columns: [c.first, c.nLabel, c.vLabel, "Average age"], rows: rows.map((r, i) => [names[i], group(r[0]), group(r[1]), String(r[2])]) }],
    stem: `What is the average ${c.what} across all ${c.people} in ${sub.map((i) => names[i]).join(", ").replace(/, ([^,]*)$/, " and $1")} combined?`,
    correct, fmt: c.fmt, fillStep: 0.03,
    distractors: [
      { v: sum(sub.map((i) => rows[i][1])) / sub.length, note: "This is the simple average of the three values; larger groups must weigh more." },
      { v: sum(rows.map((r) => r[0] * r[1])) / sum(rows.map((r) => r[0])), note: "This includes all five rows, not just the three named." },
      ...[[0, 2], [0, 3], [2, 3], [0, 1, 2, 3], [0, 2, 3, 4]].map((sb) => ({ v: sum(sb.map((i) => rows[i][0] * rows[i][1])) / sum(sb.map((i) => rows[i][0])), note: `This uses ${sb.map((i) => names[i]).join(", ")}: check which groups the question names.` }))
    ],
    hints: ["Multiply each group's average by its size.", "Divide the sum by the total number of people in the three groups."],
    solution: sub.map((i) => `${names[i]}: ${group(rows[i][0])} × ${group(rows[i][1])} = ${group(rows[i][0] * rows[i][1])}`).concat([`Total ÷ ${group(n)} = ${c.fmt(correct)}`]),
    explanation: "An average over several groups must be weighted by group size. The simple mean of the averages is the standard trap."
  };
};

// 8. Net amount from VAT-inclusive invoices (6 rows × 3 columns)
T.netInvoices = (c) => {
  const vat = { Aldoria: 21, Brevania: 19, Calmora: 23, Dunmark: 25 };
  const ctry = Object.keys(vat);
  const t0 = c.country;
  const rows = [t0, (t0 + 1) % 4, (t0 + 2) % 4, t0, (t0 + 3) % 4, (t0 + 1) % 4].map((ci) => [ctry[ci], ri(800, 9800), vat[ctry[ci]]]);
  const target = ctry[t0];
  const sel = rows.filter((r) => r[0] === target);
  const correct = sum(sel.map((r) => r[1] / (1 + r[2] / 100)));
  return {
    topic: "Reverse percentages", difficulty: 2,
    exhibits: [{ type: "table", title: c.title, columns: ["Invoice", "Supplier country", "Amount including VAT (EUR)", "VAT rate (%)"], rows: rows.map((r, i) => ["No. " + (101 + i), r[0], group(r[1]), String(r[2])]) }],
    stem: `What is the total amount excluding VAT of the invoices from suppliers in ${target}?`,
    correct, fmt: eur(2), fillStep: 0.03,
    distractors: [
      { v: sum(sel.map((r) => r[1] * (1 - r[2] / 100))), note: "This subtracts the VAT rate from the gross amount; VAT was added to the net amount, so divide instead." },
      { v: sum(sel.map((r) => r[1] / 1.2)), note: "This applies a flat 20% instead of the rate shown for each invoice." },
      { v: sel[0][1] / (1 + sel[0][2] / 100) + rows[1][1] / (1 + rows[1][2] / 100), note: "This includes an invoice from another country." },
      { v: sel[0][1] / (1 + sel[0][2] / 100) + rows[2][1] / (1 + rows[2][2] / 100), note: "This includes an invoice from another country." },
      { v: sum(sel.map((r) => r[1] / (1 + rows[1][2] / 100))), note: "This applies another country's VAT rate." },
      { v: sum(sel.map((r) => r[1] / (1 + rows[2][2] / 100))), note: "This applies another country's VAT rate." }
    ],
    hints: ["Select the invoices from that country only.", "Net = gross ÷ (1 + VAT rate). Do not subtract the rate from the gross amount."],
    solution: sel.map((r) => `${group(r[1])} ÷ ${(1 + r[2] / 100).toFixed(2)} = ${group(r[1] / (1 + r[2] / 100), 2)}`).concat([`Total = EUR ${group(correct, 2)}`]),
    explanation: "To remove VAT, divide by (1 + rate). Subtracting the rate from the gross figure understates the net amount."
  };
};

// 9. Reallocation in a pie (6 slices + total)
T.pieRealloc = (c) => {
  const raw = c.labels.map(() => ri(6, 30));
  const tot = sum(raw);
  const sh = raw.map((v) => round((v / tot) * 100));
  sh[0] += 100 - sum(sh);
  const total = c.total;
  const [a, b] = [1, 4];
  const p = c.p;
  const correct = (total * (sh[b] + (sh[a] * p) / 100)) / 100;
  const prev = sh.map((v, i) => Math.max(2, v + [2, -3, 1, 3, -2, -1][i]));
  const prevTotal = round(total * rf(0.85, 0.95, 2), 1);
  return {
    topic: "Budget reallocation", difficulty: 2,
    exhibits: [
      { type: "pie", title: `${c.title}, this year (total EUR ${total} million)`, unit: "%", slices: c.labels.map((l, i) => ({ label: l, value: sh[i] })) },
      { type: "table", title: `Last year (total EUR ${prevTotal} million)`, columns: ["Heading", "Share (%)", "Change in share (points)"], rows: c.labels.map((l, i) => [l, String(prev[i]), (sh[i] - prev[i] > 0 ? "+" : "") + (sh[i] - prev[i])]) }
    ],
    stem: `If ${p}% of the ${c.labels[a].toLowerCase()} budget is moved to ${c.labels[b].toLowerCase()}, what will the ${c.labels[b].toLowerCase()} budget be?`,
    correct, fmt: eurM(2), fillStep: 0.05,
    distractors: [
      { v: (total * sh[b]) / 100 * (1 + p / 100), note: `This increases ${c.labels[b].toLowerCase()} by ${p}% of its own budget.` },
      { v: (prevTotal * (prev[b] + (prev[a] * p) / 100)) / 100, note: "This uses last year's figures instead of this year's." },
      { v: (total * (prev[b] + (prev[a] * p) / 100)) / 100, note: "This uses last year's shares with this year's total." },
      { v: (total * (sh[b] + p / 10)) / 100, note: FILL },
      { v: (total * (sh[b] + (sh[a] * p) / 100)) / 100 * 0.9, note: FILL }
    ],
    hints: ["Use this year's pie only; last year's table is not needed.", `The amount moved is ${p}% of the ${c.labels[a].toLowerCase()} budget, not of the total.`],
    solution: [`${c.labels[a]}: ${sh[a]}% × ${total} = EUR ${group((total * sh[a]) / 100, 2)} million`, `Moved: ${p}% × that = EUR ${group((total * sh[a] * p) / 10000, 2)} million`, `${c.labels[b]}: ${sh[b]}% × ${total} + moved = EUR ${group(correct, 2)} million`],
    explanation: "Apply the percentage to the right base: the budget being cut, not the one being increased."
  };
};

// 10. Share of a component in a stacked bar (3 components × 5 years)
T.stackedShare = (c) => {
  const years = ["2019", "2020", "2021", "2022", "2023"];
  const series = c.parts.map(() => years.map(() => ri(c.min, c.max)));
  const y = c.year, s = c.part;
  const tot = sum(series.map((v) => v[y]));
  const correct = (series[s][y] / tot) * 100;
  return {
    topic: "Shares in a stacked chart", difficulty: 1,
    exhibits: [{ type: "stacked", title: c.title, unit: c.unit, categories: years, series: c.parts.map((n, i) => ({ name: n, values: series[i] })) }],
    stem: `In ${years[y]}, what percentage of the total did ${c.parts[s].toLowerCase()} account for?`,
    correct, fmt: pct(1), fillStep: 0.05,
    distractors: [
      { v: (series[s][y] / (tot - series[s][y])) * 100, note: "This divides by the other components only, not by the total." },
      { v: (series[s][y - 1] / sum(series.map((v) => v[y - 1]))) * 100, note: `This is the share in ${years[y - 1]}.` },
      ...years.map((yy, j) => ({ v: (series[s][j] / sum(series.map((v) => v[j]))) * 100, note: j === y ? FILL : `This is the share in ${yy}.` })).filter((d, j) => j !== y),
      { v: ((series[s][y] + series[(s + 1) % 3][y]) / tot) * 100 * 0.5 + (series[s][y] / tot) * 50, note: FILL }
    ],
    hints: [`Add the three segments for ${years[y]} (or read the total above the bar).`, "Divide the component by that total."],
    solution: [`Total ${years[y]} = ${series.map((v) => v[y]).join(" + ")} = ${tot}`, `${series[s][y]} ÷ ${tot} × 100 = ${group(correct, 2)}%`],
    explanation: "In stacked charts, the base is the whole bar. Dividing by the other segments overstates the share."
  };
};

// 11. Rate with changing numerator and denominator (4 regions × 4 columns)
T.changingBase = (c) => {
  const names = pickN(REGIONS, 4);
  const rows = names.map(() => [ri(c.bMin, c.bMax) * 10, rf(c.rMin, c.rMax, 1), rf(-3, 4, 1), ri(-c.d, c.d)]);
  const x = c.row;
  const [base, rate, g, d] = rows[x];
  const n1 = (base * rate) / 100, n2 = n1 + d, b2 = base * (1 + g / 100);
  const correct = (n2 / b2) * 100;
  return {
    topic: "Rates with changing base", difficulty: 3,
    exhibits: [{ type: "table", title: c.title, columns: ["Region", `${c.baseLabel} ${c.y1} (thousand)`, `${c.rateLabel} ${c.y1} (%)`, `Change in ${c.baseLabel.toLowerCase()} ${c.y2} (%)`, `Change in ${c.countLabel} ${c.y2} (thousand)`], rows: rows.map((r, i) => [names[i], group(r[0]), r[1].toFixed(1), (r[2] > 0 ? "+" : "") + r[2].toFixed(1), (r[3] > 0 ? "+" : "") + group(r[3])]) }],
    stem: `What was the ${c.rateLabel.toLowerCase()} in ${names[x]} in ${c.y2}?`,
    correct, fmt: pct(2), fillStep: 0.025,
    distractors: [
      { v: (n2 / base) * 100, note: `This keeps the ${c.y1} ${c.baseLabel.toLowerCase()}; the base changed too.` },
      { v: (n1 / b2) * 100, note: `This changes the base but not the number of ${c.countLabel}.` },
      { v: rate + g, note: "Adding the two percentages has no meaning here." },
      ...rows.map((r, i) => ({ v: ((n1 + r[3]) / (base * (1 + r[2] / 100))) * 100, note: `This applies the changes for ${names[i]} instead.` })).filter((d, i) => i !== x),
      { v: ((n1 - d) / b2) * 100, note: `This applies the change in ${c.countLabel} in the wrong direction.` }
    ],
    hints: [`Turn the ${c.y1} rate into a number of ${c.countLabel} first.`, "Then update both that number and the base before dividing."],
    solution: [`${c.y1}: ${rate}% × ${group(base)} = ${group(n1, 1)} thousand`, `${c.y2} ${c.countLabel}: ${group(n1, 1)} ${d >= 0 ? "+" : "−"} ${Math.abs(d)} = ${group(n2, 1)}`, `${c.y2} base: ${group(base)} × ${(1 + g / 100).toFixed(3)} = ${group(b2, 1)}`, `Rate = ${group(correct, 3)}%`],
    explanation: "When a rate's base moves, recompute both parts of the fraction."
  };
};

// 12. Projection at a constant growth rate (line, 2 series × 6 years)
T.projection = (c) => {
  const years = c.years;
  const g = c.g / 100;
  const a = [c.start]; for (let i = 1; i < 6; i++) a.push(round(a[i - 1] * (1 + g), 1));
  const b = [round(c.start * rf(0.6, 0.9, 2), 1)]; for (let i = 1; i < 6; i++) b.push(round(b[i - 1] + rf(1, 6, 1), 1));
  const rate = a[5] / a[4] - 1;
  const correct = a[5] * (1 + rate) ** c.ahead;
  const inc = a[5] - a[4];
  return {
    topic: "Growth projection", difficulty: 2,
    exhibits: [{ type: "line", title: c.title, unit: c.unit, categories: years, series: [{ name: c.a, values: a }, { name: c.b, values: b }] }],
    stem: `If ${c.a.toLowerCase()} keeps growing at the same annual percentage rate as between ${years[4]} and ${years[5]}, what will it be in ${+years[5] + c.ahead}?`,
    correct, fmt: (v) => group(v, 1) + " " + c.unit, fillStep: 0.03,
    distractors: [
      { v: a[5] + inc * c.ahead, note: "This adds the same absolute increase each year; the question asks for a constant percentage rate." },
      { v: a[5] * (1 + rate) ** (c.ahead - 1), note: "One year short." },
      { v: a[5] * (1 + rate) ** (c.ahead + 1), note: "One year too many." },
      { v: a[5] * (1 + rate * c.ahead), note: "This applies the rate without compounding." }
    ],
    hints: [`Growth rate = ${years[5]} value ÷ ${years[4]} value − 1.`, `Apply it ${c.ahead} times (compounding).`],
    solution: [`Rate = ${a[5]} ÷ ${a[4]} − 1 = ${group(rate * 100, 3)}%`, `${a[5]} × (1 + ${rate.toFixed(5)})^${c.ahead} = ${group(correct, 2)}`],
    explanation: "A constant percentage rate compounds. Linear and non-compounded projections are the usual distractors."
  };
};

// 13. Per-capita consumption with unit conversion (5 rows × 3 columns)
T.unitPerCapita = (c) => {
  const names = pickN(COUNTRIES, 5);
  const pcBase = ((c.tMin + c.tMax) / 2) * c.factor / 12;
  const rows = names.map(() => { const pop = rf(1.2, 30, 1); return [Math.max(1, Math.round((pcBase * rf(0.75, 1.3, 2) * pop) / c.factor)), pop, ri(20, 300)]; });
  const x = c.row;
  const correct = (rows[x][0] * c.factor) / rows[x][1];
  return {
    topic: "Units and per-capita values", difficulty: 2,
    exhibits: [{ type: "table", title: c.title, columns: ["Country", c.tLabel, "Population (million)", "Area (thousand km²)"], rows: rows.map((r, i) => [names[i], group(r[0]), r[1].toFixed(1), group(r[2])]) }],
    stem: `What was ${c.what} per inhabitant in ${names[x]}, in ${c.outUnit}?`,
    correct, fmt: unitF(c.outUnit, c.d || 0), fillStep: 0.06,
    distractors: [
      ...rows.map((r, i) => ({ v: (r[0] * c.factor) / r[1], note: `This uses the figures for ${names[i]}.` })).filter((d, i) => i !== x),
      ...rows.map((r, i) => ({ v: (rows[x][0] * c.factor) / r[1], note: `This divides by the population of ${names[i]}.` })).filter((d, i) => i !== x),
      { v: (rows[x][0] * c.factor) / Math.round(rows[x][1]), note: "This rounds the population to a whole number of millions first, which loses precision." },
      { v: (rows[x][0] * c.factor) / (rows[x][1] + 1), note: FILL }
    ],
    hints: [`Convert the units first: ${c.conv}.`, "Then divide by the population (in persons, not millions)."],
    solution: [`Units: ${c.conv}.`, `${group(rows[x][0])} ${c.tShort} ÷ ${rows[x][1]} million people${c.factor !== 1 ? " × " + group(c.factor, c.factor < 1 ? 3 : 0) : ""} = ${group(correct, 2)} ${c.outUnit} per person`],
    explanation: `Unit traps are common: ${c.conv}. If your answer is 1,000 times too large or small, recheck the conversion before choosing.`
  };
};

// 14. Workload with extra staff (4 rows × 3 columns)
T.workload = (c) => {
  const rows = c.teams.map(() => [ri(4, 14), ri(5, 9), ri(900, 4200)]);
  const x = c.row, add = c.add;
  const [t, r, back] = rows[x];
  const correct = back / ((t + add) * r);
  return {
    topic: "Rates of work", difficulty: 1,
    exhibits: [{ type: "table", title: c.title, columns: ["Team", "Staff", `${c.unit} per person per day`, `${c.unit} in backlog`], rows: rows.map((rr, i) => [c.teams[i], String(rr[0]), String(rr[1]), group(rr[2])]) }],
    stem: `If ${c.teams[x]} is given ${add} extra staff working at the same rate, how many working days will it need to clear its backlog?`,
    correct, fmt: unitF("days", 1), fillStep: 0.06,
    distractors: [
      { v: back / (t * r), note: "This ignores the extra staff." },
      { v: back / (t * (r + add)), note: "This adds the extra staff to the daily rate instead of to the headcount." },
      { v: back / ((t + add - 1) * r), note: "One person short: check the new headcount." },
      { v: back / ((t + add + 1) * r), note: "One person too many: check the new headcount." },
      { v: back / ((t + add) * rows[(x + 1) % 4][1]), note: "This uses another team's output per person." }
    ],
    hints: ["Daily output = staff × output per person per day.", "Days = backlog ÷ daily output with the new headcount."],
    solution: [`New staff = ${t} + ${add} = ${t + add}`, `Daily output = ${t + add} × ${r} = ${(t + add) * r}`, `${group(back)} ÷ ${(t + add) * r} = ${group(correct, 2)} days`],
    explanation: "Add staff to the headcount, then multiply by the individual rate."
  };
};

// 15. Average speed including stops (4 legs × 3 columns)
T.speedStops = (c) => {
  const legs = Array.from({ length: 4 }, () => [ri(c.dMin, c.dMax), ri(c.tMin, c.tMax), ri(5, 25)]);
  const D = sum(legs.map((l) => l[0])), Tm = sum(legs.map((l) => l[1])), S = sum(legs.map((l) => l[2]));
  const correct = (D / (Tm + S)) * 60;
  return {
    topic: "Average speed", difficulty: 3,
    exhibits: [{ type: "table", title: c.title, columns: ["Leg", "Distance (km)", "Travel time (min)", "Stop after leg (min)"], rows: legs.map((l, i) => ["Leg " + (i + 1), String(l[0]), String(l[1]), String(l[2])]) }],
    stem: "What was the average speed over the whole journey, including all the stops listed?",
    correct, fmt: unitF("km/h", 1), fillStep: 0.04,
    distractors: [
      { v: (D / Tm) * 60, note: "This excludes the stops." },
      { v: sum(legs.map((l) => (l[0] / l[1]) * 60)) / 4, note: "This averages the four leg speeds, which ignores how long each leg takes and leaves out the stops." },
      { v: (D / (Tm + S - legs[3][2])) * 60, note: "This leaves out the last stop." }
    ],
    hints: ["Average speed = total distance ÷ total time.", "Total time includes travel time and every stop."],
    solution: [`Distance = ${D} km`, `Time = ${Tm} + ${S} = ${Tm + S} min`, `${D} ÷ ${Tm + S} × 60 = ${group(correct, 2)} km/h`],
    explanation: "Read the question for what counts as time. Including or excluding stops changes the answer; averaging speeds is always wrong for unequal legs."
  };
};

// 16. Successive percentage changes (5 rows × 4 columns)
T.successive = (c) => {
  const rows = c.items.map(() => [ri(c.pMin, c.pMax), rf(-8, 14, 1), rf(-8, 14, 1), rf(-8, 14, 1)]);
  const x = c.row;
  const [p, a, b, d] = rows[x];
  const correct = p * (1 + a / 100) * (1 + b / 100) * (1 + d / 100);
  return {
    topic: "Successive percentage changes", difficulty: 2,
    exhibits: [{ type: "table", title: c.title, columns: [c.first, "Price start of 2022 (EUR)", "Change 2022 (%)", "Change 2023 (%)", "Change 2024 (%)"], rows: rows.map((r, i) => [c.items[i], group(r[0]), r[1].toFixed(1), r[2].toFixed(1), r[3].toFixed(1)]) }],
    stem: `What was the price of ${c.items[x].toLowerCase()} at the end of 2024?`,
    correct, fmt: eur(2), fillStep: 0.02,
    distractors: [
      { v: p * (1 + (a + b + d) / 100), note: "This adds the three percentages; changes compound, so multiply instead." },
      { v: p * (1 + a / 100) * (1 + b / 100), note: "This stops at the end of 2023." },
      { v: p * (1 + b / 100) * (1 + d / 100), note: "This leaves out the 2022 change." }
    ],
    hints: ["Apply each year's change to the price at the end of the previous year.", "Multiply by (1 + change) three times."],
    solution: [`End of 2022: ${group(p)} × ${(1 + a / 100).toFixed(3)} = EUR ${group(p * (1 + a / 100), 2)}`, `End of 2023: × ${(1 + b / 100).toFixed(3)} = EUR ${group(p * (1 + a / 100) * (1 + b / 100), 2)}`, `End of 2024: × ${(1 + d / 100).toFixed(3)} = EUR ${group(correct, 2)}`],
    explanation: "Successive percentage changes multiply. Adding them is only an approximation, and the error grows with the size of the changes."
  };
};

// 17. Chained percentages in a survey (5 rows × 3 columns)
T.surveyChain = (c) => {
  const rows = c.groups.map(() => [ri(300, 2400), ri(45, 88), ri(30, 80)]);
  const x = c.row;
  const [n, s, r] = rows[x];
  const correct = (n * s * r) / 10000;
  return {
    topic: "Percentages of percentages", difficulty: 3,
    exhibits: [{ type: "table", title: c.title, columns: [c.first, "Respondents", c.sLabel + " (%)", `Of those, ${c.rLabel} (%)`], rows: rows.map((rr, i) => [c.groups[i], group(rr[0]), String(rr[1]), String(rr[2])]) }],
    stem: `How many respondents in the ${c.groups[x]} group ${c.both}?`,
    correct, fmt: (v) => group(v, 0), fillStep: 0.07,
    distractors: [
      { v: (n * rows[(x + 1) % 5][1] * r) / 10000, note: "This takes the first percentage from another group." },
      { v: (n * s * rows[(x + 1) % 5][2]) / 10000, note: "This takes the second percentage from another group." },
      { v: (n * s * r) / 10000 + (n * (100 - s) * r) / 10000 * 0.2, note: FILL },
      ...rows.map((r, i) => ({ v: (n * r[1] * r[2]) / 10000, note: `This applies the percentages of the ${c.groups[i]} group.` })).filter((d, i) => i !== x)
    ],
    hints: [`First find how many ${c.sLabel.toLowerCase()}.`, `The second percentage applies only to those people, not to all respondents.`],
    solution: [`${group(n)} × ${s}% = ${group((n * s) / 100, 1)}`, `× ${r}% = ${group(correct, 1)}`],
    explanation: "When a percentage is 'of those', apply it to the subgroup. Applying it to everyone is the standard trap."
  };
};

// 18. Largest surplus per inhabitant (category answer; 6 rows × 3 columns)
T.surplusCategory = (c, pos) => {
  const names = pickN(COUNTRIES, 6);
  for (let attempt = 0; attempt < 5000; attempt++) {
    const rows = names.map(() => { const imp = ri(20, 260); return [imp + ri(-30, 60), imp, rf(1.5, 40, 1)]; });
    const pc = rows.map((r) => (r[0] - r[1]) / r[2]);
    const abs = rows.map((r) => r[0] - r[1]);
    const order = pc.map((v, i) => i).sort((i, j) => pc[j] - pc[i]);
    const best = order[0];
    if (pc[best] <= 0 || pc[order[0]] - pc[order[1]] < 0.15) continue;
    const bigAbs = abs.indexOf(Math.max(...abs));
    if (bigAbs === best) continue;
    const drop = order.filter((i) => i !== best && i !== bigAbs)[ri(0, 3)];
    const idx = names.map((n, i) => i).filter((i) => i !== drop);
    if (idx.indexOf(best) !== pos) continue;
    return {
      answerType: "category", topic: "Per-capita comparison", difficulty: 3,
      exhibits: [{ type: "table", title: c.title, columns: ["Country", "Exports (EUR billion)", "Imports (EUR billion)", "Population (million)"], rows: rows.map((r, i) => [names[i], group(r[0]), group(r[1]), r[2].toFixed(1)]) }],
      stem: "Which of the following countries had the largest trade surplus per inhabitant?",
      options: idx.map((i) => names[i]), answer: pos,
      optionNotes: idx.map((i) => `${i === best ? "Correct. " : ""}(${rows[i][0]} − ${rows[i][1]}) ÷ ${rows[i][2]} = ${pc[i].toFixed(2)} (EUR thousand per person).` + (i === bigAbs && i !== best ? " Largest surplus in total, but not per person." : "")),
      hints: ["Surplus = exports − imports.", "Divide each surplus by the population."],
      solution: idx.map((i) => `${names[i]}: ${(rows[i][0] - rows[i][1])} ÷ ${rows[i][2]} = ${pc[i].toFixed(3)}`).concat([`Largest: ${names[best]}`]),
      explanation: "Two steps for every row: a difference, then a division. The largest absolute surplus is the planted trap."
    };
  }
  throw new Error("surplusCategory");
};

// 19. Reverse a growth rate (5 rows × 3 columns)
T.reverseGrowth = (c) => {
  const names = pickN(REGIONS, 5);
  const rows = names.map(() => [ri(c.vMin, c.vMax), rf(-6, 15, 1), ri(30, 400)]);
  const x = c.row;
  const [v, g] = rows[x];
  const correct = v / (1 + g / 100);
  return {
    topic: "Reverse percentages", difficulty: 1,
    exhibits: [{ type: "table", title: c.title, columns: ["Region", `${c.what} 2024`, "Change on 2023 (%)", "Area (km²)"], rows: rows.map((r, i) => [names[i], group(r[0]), (r[1] > 0 ? "+" : "") + r[1].toFixed(1), group(r[2])]) }],
    stem: c.ask.replace("{r}", names[x]),
    correct, fmt: (val) => group(val, 0), fillStep: 0.035,
    distractors: [
      { v: v * (1 - g / 100), note: "This applies the change in reverse to the 2024 value; divide by (1 + change) instead." },
      { v: v / (1 + rows[(x + 1) % 5][1] / 100), note: "This uses another region's rate." },
      { v: v / (1 + rows[(x + 4) % 5][1] / 100), note: "This uses another region's rate." },
      { v: v / (1 + rows[(x + 2) % 5][1] / 100), note: "This uses another region's rate." },
      { v: v / (1 + rows[(x + 3) % 5][1] / 100), note: "This uses another region's rate." },
      { v: v * (1 + g / 100), note: "This applies the change again instead of undoing it: that would be a 2025 estimate." }
    ],
    hints: ["The 2024 value = 2023 value × (1 + change).", "So the 2023 value = 2024 value ÷ (1 + change)."],
    solution: [`Multiplier from 2023 to 2024 = 1 ${g >= 0 ? "+" : "−"} ${Math.abs(g)}% = ${(1 + g / 100).toFixed(3)}`, `2023 value = ${group(v)} ÷ ${(1 + g / 100).toFixed(3)} = ${group(correct, 1)}`],
    explanation: "Undo a percentage change by dividing by the multiplier, not by subtracting the percentage from the later value."
  };
};

// 20. Cost per beneficiary excluding overheads (4 rows × 3 columns)
T.costPerBeneficiary = (c) => {
  const rows = c.progs.map(() => [ri(12, 180), ri(4, 90), ri(4, 15)]);
  const x = c.row;
  const [b, n, a] = rows[x];
  const correct = (b * 1e6 * (1 - a / 100)) / (n * 1e3);
  return {
    topic: "Multi-step: unit cost", difficulty: 2,
    exhibits: [{ type: "table", title: c.title, columns: ["Programme", "Budget (EUR million)", "Beneficiaries (thousand)", "Administrative costs (% of budget)"], rows: rows.map((r, i) => [c.progs[i], group(r[0]), group(r[1]), String(r[2])]) }],
    stem: `Excluding administrative costs, how much was spent per beneficiary under ${c.progs[x]}?`,
    correct, fmt: eur(0), fillStep: 0.04,
    distractors: [
      { v: (b * 1e6) / (n * 1e3), note: "This includes the administrative costs." },
      { v: (b * 1e6 * (1 - rows[(x + 1) % 4][2] / 100)) / (n * 1e3), note: "This uses another programme's administrative share." },
      { v: (b * 1e6 * (1 - (2 * a) / 100)) / (n * 1e3), note: "This removes the administrative share twice." },
      { v: (b * 1e6 - a * 1e6) / (n * 1e3), note: "This subtracts the percentage as if it were millions of euros." }
    ],
    hints: ["Remove the administrative share from the budget first.", "Watch the units: budget in millions, beneficiaries in thousands."],
    solution: [`Programme spending = ${b} × (1 − ${a}%) = EUR ${group(b * (1 - a / 100), 2)} million`, `÷ ${n} thousand = EUR ${group(correct, 1)}`],
    explanation: "Check what is excluded and convert millions and thousands carefully before dividing."
  };
};

// 21. Difference between two slices of a pie (6 slices + total)
T.pieDifference = (c) => {
  const raw = c.labels.map(() => ri(5, 32));
  const tot = sum(raw);
  const sh = raw.map((v) => round((v / tot) * 100, 1));
  sh[0] = round(sh[0] + 100 - sum(sh), 1);
  const order = sh.map((v, i) => i).sort((i, j) => sh[j] - sh[i]);
  const [p, q] = [order[0], order[1]];
  if (sh[p] - sh[q] < 2) return T.pieDifference(c);
  const correct = (c.total * (sh[p] - sh[q])) / 100;
  const prevTot = Math.round(c.total * rf(0.8, 0.95, 2));
  const prev = sh.map((v) => round(Math.max(1, v + rf(-2.5, 2.5, 1)), 1));
  return {
    topic: "Shares to amounts", difficulty: 1,
    exhibits: [
      { type: "pie", title: `${c.title}, 2024 (total: ${group(c.total)} ${c.unitWord})`, unit: "%", slices: c.labels.map((l, i) => ({ label: l, value: sh[i] })) },
      { type: "table", title: `2023 (total: ${group(prevTot)} ${c.unitWord})`, columns: ["Category", "Share 2023 (%)", "Share 2024 (%)"], rows: c.labels.map((l, i) => [l, prev[i].toFixed(1), sh[i].toFixed(1)]) }
    ],
    stem: `In 2024, how many more ${c.unitWord} went to the largest category than to the second-largest?`,
    correct, fmt: (v) => group(v, 0) + " " + c.unitWord, fillStep: 0.06,
    distractors: [
      { v: (c.total * (sh[p] - sh[order[2]])) / 100, note: "This compares the largest with the third-largest category." },
      { v: (prevTot * (sh[p] - sh[q])) / 100, note: "This applies the 2024 shares to the 2023 total." },
      { v: (c.total * (prev[p] - prev[q])) / 100, note: "This uses the 2023 shares." },
      { v: (c.total * Math.abs(sh[q] - sh[order[2]])) / 100, note: "This compares the second- and third-largest categories." },
      { v: (c.total * (sh[p] - sh[order[3]])) / 100, note: "This compares the largest with the fourth-largest category." },
      { v: (c.total * (sh[p] - sh[q])) / 100 * 1.1, note: FILL }
    ],
    hints: ["Find the two largest slices.", "Subtract their shares, then apply the difference to the total."],
    solution: [`${c.labels[p]} ${sh[p]}% − ${c.labels[q]} ${sh[q]}% = ${round(sh[p] - sh[q], 1)}%`, `× ${group(c.total)} = ${group(correct, 1)}`],
    explanation: "Shares of the same total can be subtracted before converting into amounts."
  };
};

// 22. Overall rate across a subset (5 rows × 3 columns)
T.overallRate = (c) => {
  const rows = c.centres.map(() => [ri(80, 900), ri(28, 74), ri(48, 79)]);
  const sub = [1, 2, 4];
  const n = sum(sub.map((i) => rows[i][0])), p = sum(sub.map((i) => (rows[i][0] * rows[i][1]) / 100));
  const correct = (p / n) * 100;
  return {
    topic: "Averaging rates", difficulty: 2,
    exhibits: [{ type: "table", title: c.title, columns: ["Centre", "Candidates", "Pass rate (%)", "Average score"], rows: rows.map((r, i) => [c.centres[i], group(r[0]), String(r[1]), String(r[2])]) }],
    stem: `What was the overall pass rate across ${sub.map((i) => c.centres[i]).join(", ").replace(/, ([^,]*)$/, " and $1")} together?`,
    correct, fmt: pct(1), fillStep: 0.045,
    distractors: [
      { v: sum(sub.map((i) => rows[i][1])) / 3, note: "This is the simple average of the three rates; centres with more candidates must count more." },
      { v: (sum(rows.map((r) => (r[0] * r[1]) / 100)) / sum(rows.map((r) => r[0]))) * 100, note: "This includes all five centres." },
      ...[[1, 2], [1, 4], [2, 4], [0, 1, 2, 4], [1, 2, 3, 4]].map((sb) => ({ v: (sum(sb.map((i) => (rows[i][0] * rows[i][1]) / 100)) / sum(sb.map((i) => rows[i][0]))) * 100, note: `This uses ${sb.map((i) => c.centres[i]).join(", ")}: check which centres are named.` }))
    ],
    hints: ["Convert each pass rate into a number of passes.", "Total passes ÷ total candidates for the three centres."],
    solution: sub.map((i) => `${c.centres[i]}: ${rows[i][0]} × ${rows[i][1]}% = ${group((rows[i][0] * rows[i][1]) / 100, 1)}`).concat([`${group(p, 1)} ÷ ${n} = ${group(correct, 2)}%`]),
    explanation: "Rates from groups of different sizes must be weighted. The average score column is irrelevant."
  };
};

// 23. Compound interest (4 offers × 3 columns)
T.compound = (c) => {
  const rows = c.offers.map(() => [ri(8, 60) * 1000, rf(1.5, 6.5, 1), ri(3, 8)]);
  const x = c.row;
  const [A, r, n] = rows[x];
  const correct = A * (1 + r / 100) ** n;
  return {
    topic: "Compound growth", difficulty: 2,
    exhibits: [{ type: "table", title: c.title, columns: ["Offer", "Amount (EUR)", "Annual interest (%)", "Term (years)"], rows: rows.map((rr, i) => [c.offers[i], group(rr[0]), rr[1].toFixed(1), String(rr[2])]) }],
    stem: `With interest compounded annually and everything repaid at the end of the term, how much is repayable under ${c.offers[x]}?`,
    correct, fmt: eur(2), fillStep: 0.02,
    distractors: [
      { v: A * (1 + (r / 100) * n), note: "This uses simple interest; with compounding, interest is also charged on earlier interest." },
      { v: A * (1 + r / 100) ** (n - 1), note: "One year short." },
      { v: A * (1 + r / 100) ** (n + 1), note: "One year too many." }
    ],
    hints: ["Each year, multiply the outstanding amount by (1 + rate).", `Do this ${n} times.`],
    solution: [`Growth factor = ${(1 + r / 100).toFixed(3)}^${n} = ${((1 + r / 100) ** n).toFixed(5)}`, `${group(A)} × ${((1 + r / 100) ** n).toFixed(5)} = EUR ${group(correct, 2)}`],
    explanation: "Compound growth multiplies; simple interest adds. Over several years the difference becomes large."
  };
};

// 24. Highest share in a stacked chart (category answer; 3 components × 6 countries)
T.shareCategory = (c, pos) => {
  const names = pickN(COUNTRIES, 6);
  for (let attempt = 0; attempt < 5000; attempt++) {
    const series = c.parts.map(() => names.map(() => ri(4, 60)));
    const tot = names.map((n, i) => sum(series.map((s) => s[i])));
    const sh = names.map((n, i) => series[c.part][i] / tot[i]);
    const order = sh.map((v, i) => i).sort((i, j) => sh[j] - sh[i]);
    const best = order[0];
    if (sh[order[0]] - sh[order[1]] < 0.03) continue;
    const bigAbs = series[c.part].indexOf(Math.max(...series[c.part]));
    if (bigAbs === best) continue;
    const drop = order.filter((i) => i !== best && i !== bigAbs)[ri(0, 3)];
    const idx = names.map((n, i) => i).filter((i) => i !== drop);
    if (idx.indexOf(best) !== pos) continue;
    return {
      answerType: "category", topic: "Shares in a stacked chart", difficulty: 3,
      exhibits: [{ type: "stacked", title: c.title, unit: c.unit, categories: names, series: c.parts.map((p, i) => ({ name: p, values: series[i] })) }],
      stem: `Which of the following countries had the highest share of ${c.parts[c.part].toLowerCase()} in its total?`,
      options: idx.map((i) => names[i]), answer: pos,
      optionNotes: idx.map((i) => `${i === best ? "Correct. " : ""}${series[c.part][i]} ÷ ${tot[i]} = ${(sh[i] * 100).toFixed(1)}%.` + (i === bigAbs && i !== best ? " Largest amount, but not the largest share." : "")),
      hints: ["Read each country's total above its bar.", "Divide the segment by the total for every option."],
      solution: idx.map((i) => `${names[i]}: ${series[c.part][i]} ÷ ${tot[i]} = ${(sh[i] * 100).toFixed(1)}%`).concat([`Highest: ${names[best]}`]),
      explanation: "The tallest segment is not necessarily the largest share; the bar total matters."
    };
  }
  throw new Error("shareCategory");
};

// 25. Two exhibits: pie of budget shares + population table → spending per inhabitant
T.twoExhibits = (c) => {
  const names = pickN(REGIONS, 5);
  const raw = names.map(() => ri(8, 30));
  const tot = sum(raw);
  const sh = raw.map((v) => round((v / tot) * 100));
  sh[0] += 100 - sum(sh);
  const pop = names.map(() => ri(300, 4200));
  const area = names.map(() => ri(2, 40) * 1000);
  const x = c.row;
  const correct = (c.total * 1e6 * sh[x]) / 100 / (pop[x] * 1000);
  const y = (x + 1) % 5;
  return {
    topic: "Combining two exhibits", difficulty: 3,
    exhibits: [
      { type: "pie", title: `${c.title} (total EUR ${c.total} million)`, unit: "%", slices: names.map((n, i) => ({ label: n, value: sh[i] })) },
      { type: "table", title: "Population and area by region", columns: ["Region", "Population (thousand)", "Area (km²)"], rows: names.map((n, i) => [n, group(pop[i]), group(area[i])]) }
    ],
    stem: `How much of this budget was spent per inhabitant in the ${names[x]} region?`,
    correct, fmt: eur(2), fillStep: 0.045,
    distractors: [
      { v: (c.total * 1e6 * sh[x]) / 100 / (pop[y] * 1000), note: "This divides by another region's population." },
      { v: (c.total * 1e6 * sh[y]) / 100 / (pop[x] * 1000), note: "This uses another region's share of the budget." },
      { v: (c.total * 1e6) / (sum(pop) * 1000) * 1.0, note: "This is the average for all regions." },
      ...names.map((n, i) => ({ v: (c.total * 1e6 * sh[i]) / 100 / (pop[x] * 1000), note: `This uses the budget share of ${n}.` })).filter((d, i) => i !== x && i !== y),
      ...names.map((n, i) => ({ v: (c.total * 1e6 * sh[x]) / 100 / (pop[i] * 1000), note: `This divides by the population of ${n}.` })).filter((d, i) => i !== x && i !== y)
    ],
    hints: ["Use the pie for the region's budget and the table for its population.", "Budget (in euros) ÷ population (in persons)."],
    solution: [`Budget = ${sh[x]}% × ${c.total} million = EUR ${group((c.total * sh[x]) / 100, 2)} million`, `Population = ${group(pop[x])} thousand`, `Per inhabitant = EUR ${group(correct, 2)}`],
    explanation: "Combine the exhibits row by row and keep the units consistent. The area column is irrelevant."
  };
};

/* ---------- plan: 150 items, 6 per template ---------- */
const plan = [];
const rep = (name, ctxs) => ctxs.forEach((c) => plan.push([name, c]));
rep("growthTotal", [
  { title: "Visitors to EU information centres (thousand)", first: "Region", names: REGIONS, years: ["2021", "2022", "2023", "2024"], pair: [0, 3], min: 120, max: 900, what: "number of visitors", unitWord: "regions" },
  { title: "Tonnes of waste recycled by city", first: "City", names: ["Avenford", "Brightwell", "Corrin", "Dunmore", "Elsby", "Fairhaven", "Glenrow", "Harwick"], years: ["2020", "2021", "2022", "2023"], pair: [1, 3], min: 1200, max: 9800, what: "tonnage recycled", unitWord: "cities" },
  { title: "Passengers at regional airports (thousand)", first: "Airport", names: ["Airport A", "Airport B", "Airport C", "Airport D", "Airport E", "Airport F", "Airport G"], years: ["2021", "2022", "2023", "2024"], pair: [0, 2], min: 300, max: 2400, what: "number of passengers", unitWord: "airports" },
  { title: "Patent applications by sector", first: "Sector", names: ["Energy", "Health", "Transport", "Materials", "Digital", "Food", "Chemicals"], years: ["2020", "2021", "2022", "2023"], pair: [0, 3], min: 600, max: 4200, what: "number of applications", unitWord: "sectors" },
  { title: "Trainees hosted by EU agencies", first: "Agency", names: ["Agency 1", "Agency 2", "Agency 3", "Agency 4", "Agency 5", "Agency 6", "Agency 7"], years: ["2021", "2022", "2023", "2024"], pair: [1, 3], min: 40, max: 260, what: "number of trainees", unitWord: "agencies" },
  { title: "Electric vehicles registered (thousand)", first: "Country", names: COUNTRIES, years: ["2020", "2021", "2022", "2023"], pair: [0, 2], min: 30, max: 480, what: "registrations", unitWord: "countries" }
]);
rep("shareCombined", [
  { title: "Key figures, selected countries (fictional)", col: 1, what: "GDP" },
  { title: "Key figures, partner countries (fictional)", col: 0, what: "population" },
  { title: "Basic statistics (fictional countries)", col: 2, what: "area" },
  { title: "Selected economies (fictional)", col: 1, what: "GDP" },
  { title: "Candidate regions overview (fictional)", col: 0, what: "population" },
  { title: "Neighbourhood countries (fictional)", col: 2, what: "area" }
]);
rep("perCapitaChange", [0, 1, 2, 3, 4, 2].map((row, i) => ({ title: ["GDP and population (fictional countries)", "Economic indicators, 2020 and 2023 (fictional)", "Output and population (fictional)", "National accounts summary (fictional)", "Growth indicators (fictional)", "Selected economies, 2020–2023 (fictional)"][i], row })));
rep("ppOrRelative", [
  { title: "Share of households with fibre broadband (%)", series: ["Urban", "Suburban", "Rural"], s: 2, a: 0, askPP: true },
  { title: "Share of renewables in final energy use (%)", series: ["Country X", "Country Y", "Country Z"], s: 0, a: 1, askPP: false },
  { title: "Adults with advanced digital skills (%)", series: ["Women", "Men", "All adults"], s: 0, a: 0, askPP: false },
  { title: "Share of organic farmland (%)", series: ["Region North", "Region South", "Region East"], s: 1, a: 1, askPP: true },
  { title: "Employment rate of over-55s (%)", series: ["Country P", "Country Q", "Country R"], s: 2, a: 0, askPP: true },
  { title: "Share of electric cars in new sales (%)", series: ["Market A", "Market B", "Market C"], s: 1, a: 2, askPP: false }
]);
rep("ratioCategory", [
  { title: "Online vs paper applications (thousand)", unit: "thousand", periods: ["2018", "2019", "2020", "2021", "2022", "2023"], word: "year", a: "Online", b: "Paper", min: 18, max: 60 },
  { title: "Rail vs road freight (million tonnes)", unit: "million t", periods: ["Q1 22", "Q2 22", "Q3 22", "Q4 22", "Q1 23", "Q2 23"], word: "quarter", a: "Road", b: "Rail", min: 20, max: 70, lowest: true },
  { title: "Solar vs wind generation (TWh)", unit: "TWh", periods: ["2019", "2020", "2021", "2022", "2023", "2024"], word: "year", a: "Wind", b: "Solar", min: 14, max: 45 },
  { title: "Exports vs imports of machinery (EUR billion)", unit: "EUR bn", periods: ["2019", "2020", "2021", "2022", "2023", "2024"], word: "year", a: "Exports", b: "Imports", min: 30, max: 80, lowest: true },
  { title: "Applications received vs approved", unit: "applications", periods: ["Call 1", "Call 2", "Call 3", "Call 4", "Call 5", "Call 6"], word: "call", a: "Received", b: "Approved", min: 40, max: 120 },
  { title: "Visitors vs staff hours at museums (thousand)", unit: "thousand", periods: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"], word: "month", a: "Visitors", b: "Staff hours", min: 25, max: 70 }
]);
rep("currency", [
  { currencies: [["USD", 1.08], ["GBP", 0.85], ["CHF", 0.95], ["SEK", 11.4], ["PLN", 4.32], ["JPY", 162]], pair: [4, 3], date: 1, amount: 25000 },
  { currencies: [["USD", 1.09], ["GBP", 0.86], ["DKK", 7.46], ["CZK", 25.2], ["HUF", 392], ["NOK", 11.6]], pair: [0, 3], date: 0, amount: 18000 },
  { currencies: [["USD", 1.07], ["CHF", 0.96], ["SEK", 11.3], ["RON", 4.97], ["JPY", 160], ["CAD", 1.47]], pair: [3, 1], date: 1, amount: 64000 },
  { currencies: [["GBP", 0.85], ["USD", 1.08], ["NOK", 11.7], ["PLN", 4.3], ["CZK", 25.0], ["AUD", 1.65]], pair: [0, 5], date: 0, amount: 12500 },
  { currencies: [["USD", 1.1], ["CHF", 0.94], ["HUF", 395], ["DKK", 7.46], ["SEK", 11.5], ["GBP", 0.84]], pair: [4, 0], date: 1, amount: 300000 },
  { currencies: [["CAD", 1.48], ["USD", 1.09], ["RON", 4.98], ["JPY", 163], ["PLN", 4.31], ["CHF", 0.95]], pair: [1, 4], date: 0, amount: 7400 }
]);
rep("weightedSubset", [
  { title: "Staff and salaries by directorate", first: "Directorate", rows: ["Dir. A", "Dir. B", "Dir. C", "Dir. D", "Dir. E"], nLabel: "Staff", vLabel: "Average monthly salary (EUR)", nMin: 40, nMax: 320, vMin: 42, vMax: 96, vStep: 100, what: "monthly salary", people: "staff", fmt: eur(0) },
  { title: "Training hours by unit", first: "Unit", rows: ["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5"], nLabel: "Staff", vLabel: "Training hours per person", nMin: 12, nMax: 140, vMin: 8, vMax: 46, vStep: 1, what: "number of training hours", people: "staff", fmt: unitF("hours", 2) },
  { title: "Delegates and travel costs by delegation", first: "Delegation", rows: ["Delegation V", "Delegation W", "Delegation X", "Delegation Y", "Delegation Z"], nLabel: "Delegates", vLabel: "Average travel cost (EUR)", nMin: 6, nMax: 48, vMin: 18, vMax: 96, vStep: 10, what: "travel cost", people: "delegates", fmt: eur(2) },
  { title: "Students and scores by school", first: "School", rows: ["School 1", "School 2", "School 3", "School 4", "School 5"], nLabel: "Students", vLabel: "Average score", nMin: 60, nMax: 480, vMin: 48, vMax: 88, vStep: 1, what: "score", people: "students", fmt: (v) => group(v, 2) },
  { title: "Inspectors and inspections by region", first: "Region", rows: REGIONS.slice(0, 5), nLabel: "Inspectors", vLabel: "Inspections per inspector", nMin: 8, nMax: 70, vMin: 30, vMax: 140, vStep: 1, what: "number of inspections", people: "inspectors", fmt: unitF("inspections", 2) },
  { title: "Interpreters and working days by language booth", first: "Booth", rows: ["Booth 1", "Booth 2", "Booth 3", "Booth 4", "Booth 5"], nLabel: "Interpreters", vLabel: "Working days per interpreter", nMin: 5, nMax: 40, vMin: 80, vMax: 190, vStep: 1, what: "number of working days", people: "interpreters", fmt: unitF("days", 2) }
]);
rep("netInvoices", [0, 1, 2, 3, 0, 2].map((country, i) => ({ country, title: ["Supplier invoices, March", "Supplier invoices, Q2", "Translation invoices", "Catering invoices", "IT services invoices", "Event services invoices"][i] })));
rep("pieRealloc", [
  { title: "Programme budget by heading", labels: ["Staff", "Travel", "Equipment", "Studies", "Communication", "Other"], total: 48, p: 25 },
  { title: "Research grant budget", labels: ["Personnel", "Consumables", "Equipment", "Travel", "Dissemination", "Overheads"], total: 12, p: 40 },
  { title: "Conference budget", labels: ["Venue", "Catering", "Interpretation", "Travel", "Publicity", "Security"], total: 3.6, p: 20 },
  { title: "Agency operating budget", labels: ["Salaries", "Buildings", "IT", "Missions", "Training", "Studies"], total: 86, p: 15 },
  { title: "Campaign budget", labels: ["Media", "Production", "Events", "Research", "Evaluation", "Contingency"], total: 9.5, p: 30 },
  { title: "Regional fund allocation", labels: ["Transport", "Energy", "Innovation", "Skills", "Health", "Admin"], total: 240, p: 10 }
]);
rep("stackedShare", [
  { title: "Electricity generation by source (TWh)", unit: "TWh", parts: ["Renewables", "Nuclear", "Fossil"], min: 20, max: 90, year: 3, part: 0 },
  { title: "Waste treatment by method (thousand tonnes)", unit: "thousand t", parts: ["Recycling", "Incineration", "Landfill"], min: 40, max: 210, year: 2, part: 1 },
  { title: "Staff by contract type", unit: "staff", parts: ["Officials", "Temporary agents", "Contract agents"], min: 60, max: 380, year: 4, part: 2 },
  { title: "Freight by mode (million tonne-km)", unit: "million tkm", parts: ["Road", "Rail", "Waterways"], min: 30, max: 160, year: 1, part: 1 },
  { title: "Applications by channel", unit: "applications", parts: ["Online", "Post", "In person"], min: 50, max: 420, year: 3, part: 2 },
  { title: "Spending by category (EUR million)", unit: "EUR m", parts: ["Grants", "Procurement", "Administration"], min: 15, max: 95, year: 2, part: 0 }
]);
rep("changingBase", [
  { title: "Labour market by region", y1: "2023", y2: "2024", baseLabel: "Labour force", rateLabel: "Unemployment rate", countLabel: "unemployed", bMin: 40, bMax: 420, rMin: 3.5, rMax: 12, d: 6, row: 0 },
  { title: "Students by region", y1: "2023", y2: "2024", baseLabel: "Enrolled students", rateLabel: "Dropout rate", countLabel: "dropouts", bMin: 12, bMax: 90, rMin: 4, rMax: 14, d: 2, row: 1 },
  { title: "Library members by region", y1: "2022", y2: "2023", baseLabel: "Members", rateLabel: "Share borrowing e-books", countLabel: "e-book borrowers", bMin: 8, bMax: 60, rMin: 18, rMax: 42, d: 2, row: 2 },
  { title: "Firms by region", y1: "2023", y2: "2024", baseLabel: "Registered firms", rateLabel: "Share exporting", countLabel: "exporting firms", bMin: 6, bMax: 50, rMin: 9, rMax: 28, d: 1, row: 3 },
  { title: "Households by region", y1: "2023", y2: "2024", baseLabel: "Households", rateLabel: "Share with heat pumps", countLabel: "households with heat pumps", bMin: 30, bMax: 300, rMin: 3, rMax: 15, d: 3, row: 0 },
  { title: "Workforce by region", y1: "2022", y2: "2023", baseLabel: "Workers", rateLabel: "Share working remotely", countLabel: "remote workers", bMin: 50, bMax: 380, rMin: 12, rMax: 35, d: 5, row: 2 }
]);
rep("projection", [
  { title: "Data traffic (petabytes)", unit: "PB", years: ["2019", "2020", "2021", "2022", "2023", "2024"], a: "Mobile data", b: "Fixed data", start: 42, g: 12, ahead: 2 },
  { title: "Solar capacity (GW)", unit: "GW", years: ["2018", "2019", "2020", "2021", "2022", "2023"], a: "Solar capacity", b: "Wind capacity", start: 18, g: 15, ahead: 3 },
  { title: "Online sales (EUR billion)", unit: "EUR bn", years: ["2019", "2020", "2021", "2022", "2023", "2024"], a: "Online sales", b: "Catalogue sales", start: 64, g: 8, ahead: 2 },
  { title: "Charging points (thousand)", unit: "thousand", years: ["2019", "2020", "2021", "2022", "2023", "2024"], a: "Public charging points", b: "Fuel stations", start: 21, g: 18, ahead: 2 },
  { title: "Members of a network (thousand)", unit: "thousand", years: ["2018", "2019", "2020", "2021", "2022", "2023"], a: "Members", b: "Partner organisations", start: 36, g: 6, ahead: 3 },
  { title: "Research spending (EUR billion)", unit: "EUR bn", years: ["2019", "2020", "2021", "2022", "2023", "2024"], a: "Business research", b: "Public research", start: 52, g: 5, ahead: 2 }
]);
rep("unitPerCapita", [
  { title: "Electricity consumption (fictional countries)", tLabel: "Electricity consumption (TWh)", tShort: "TWh", tMin: 18, tMax: 420, what: "electricity consumption", outUnit: "kWh", factor: 1e9 / 1e6, conv: "1 TWh = 1,000,000,000 kWh", row: 0 },
  { title: "Water use (fictional countries)", tLabel: "Water use (million m³)", tShort: "million m³", tMin: 300, tMax: 9000, what: "water use", outUnit: "m³", factor: 1, conv: "million m³ ÷ million people = m³ per person", row: 1 },
  { title: "Household waste (fictional countries)", tLabel: "Household waste (thousand tonnes)", tShort: "thousand t", tMin: 600, tMax: 14000, what: "household waste", outUnit: "kg", factor: 1, conv: "thousand tonnes ÷ million people = kg per person", row: 2 },
  { title: "Gas consumption (fictional countries)", tLabel: "Gas consumption (TWh)", tShort: "TWh", tMin: 20, tMax: 380, what: "gas consumption", outUnit: "kWh", factor: 1000, conv: "1 TWh = 1,000,000,000 kWh", row: 3 },
  { title: "Public library loans (fictional countries)", tLabel: "Loans (thousand)", tShort: "thousand loans", tMin: 2000, tMax: 60000, what: "the number of library loans", outUnit: "loans", factor: 0.001, d: 2, conv: "thousand loans ÷ million people = loans per person × 1/1,000", row: 4 },
  { title: "Rail passengers (fictional countries)", tLabel: "Passenger-km (billion)", tShort: "billion pkm", tMin: 4, tMax: 110, what: "rail travel", outUnit: "km", factor: 1000, conv: "1 billion km ÷ 1 million people = 1,000 km per person", row: 1 }
]);
rep("workload", [
  { title: "Translation teams", teams: ["Team DE", "Team FR", "Team IT", "Team PL"], unit: "Pages", row: 0, add: 3 },
  { title: "Grant evaluation panels", teams: ["Panel 1", "Panel 2", "Panel 3", "Panel 4"], unit: "Proposals", row: 2, add: 2 },
  { title: "Customs inspection units", teams: ["Port", "Airport", "Rail", "Road"], unit: "Inspections", row: 1, add: 4 },
  { title: "Help-desk teams", teams: ["Tier 1", "Tier 2", "Web", "Phone"], unit: "Tickets", row: 3, add: 2 },
  { title: "Audit teams", teams: ["Team A", "Team B", "Team C", "Team D"], unit: "Files", row: 0, add: 5 },
  { title: "Legal review teams", teams: ["Unit 1", "Unit 2", "Unit 3", "Unit 4"], unit: "Documents", row: 2, add: 3 }
]);
rep("speedStops", [
  { title: "Delivery route", dMin: 18, dMax: 95, tMin: 18, tMax: 80 },
  { title: "Inspection tour by car", dMin: 25, dMax: 120, tMin: 20, tMax: 95 },
  { title: "Regional bus route", dMin: 8, dMax: 40, tMin: 12, tMax: 45 },
  { title: "Cycling tour", dMin: 10, dMax: 32, tMin: 30, tMax: 100 },
  { title: "Coastal ferry route", dMin: 12, dMax: 60, tMin: 35, tMax: 120 },
  { title: "Mission travel by train", dMin: 60, dMax: 240, tMin: 35, tMax: 140 }
]);
rep("successive", [
  { title: "Prices of office supplies", first: "Item", items: ["Printer paper", "Toner", "Desk chair", "Monitor", "Headset"], pMin: 20, pMax: 640, row: 1 },
  { title: "Prices of laboratory items", first: "Item", items: ["Microscope", "Centrifuge", "Pipette set", "Freezer", "Scale"], pMin: 180, pMax: 9800, row: 3 },
  { title: "Software licence prices", first: "Licence", items: ["Editor", "Database", "Design suite", "Statistics", "Security"], pMin: 90, pMax: 2400, row: 2 },
  { title: "Prices of building services", first: "Service", items: ["Cleaning", "Security", "Maintenance", "Catering", "Gardening"], pMin: 1200, pMax: 24000, row: 0 },
  { title: "Prices of vehicles", first: "Vehicle", items: ["Small car", "Van", "Bus", "E-bike", "Truck"], pMin: 1800, pMax: 95000, row: 4 },
  { title: "Prices of training courses", first: "Course", items: ["Languages", "Management", "IT", "Finance", "Law"], pMin: 300, pMax: 3200, row: 1 }
]);
rep("surveyChain", [
  { title: "Survey on public services", first: "Age group", groups: ["18–24", "25–39", "40–54", "55–64", "65+"], sLabel: "Satisfied", rLabel: "would recommend the service", both: "were satisfied and would recommend the service", row: 1 },
  { title: "Survey on remote work", first: "Sector", groups: ["Public", "Finance", "Industry", "Retail", "Health"], sLabel: "Working remotely", rLabel: "want to continue", both: "work remotely and want to continue", row: 2 },
  { title: "Survey on cycling", first: "City size", groups: ["Village", "Town", "Small city", "Large city", "Capital"], sLabel: "Own a bicycle", rLabel: "cycle weekly", both: "own a bicycle and cycle weekly", row: 3 },
  { title: "Survey on language learning", first: "Age group", groups: ["15–19", "20–29", "30–44", "45–59", "60+"], sLabel: "Studying a language", rLabel: "studying online", both: "are studying a language online", row: 0 },
  { title: "Survey on news habits", first: "Region", groups: ["North", "South", "East", "West", "Centre"], sLabel: "Read news daily", rLabel: "pay for a subscription", both: "read news daily and pay for a subscription", row: 4 },
  { title: "Survey on volunteering", first: "Age group", groups: ["16–24", "25–34", "35–49", "50–64", "65+"], sLabel: "Volunteered last year", rLabel: "volunteered monthly", both: "volunteered last year and did so monthly", row: 2 }
]);
rep("surplusCategory", ["Trade, selected partners (fictional)", "External trade, 2023 (fictional)", "Goods trade (fictional)", "Trade balance data (fictional)", "Trade and population (fictional)", "Partner economies (fictional)"].map((title) => ({ title })));
rep("reverseGrowth", [
  { title: "Tourist arrivals by region", what: "Arrivals", ask: "How many tourist arrivals did the {r} region record in 2023?", vMin: 20000, vMax: 480000, row: 0 },
  { title: "New businesses by region", what: "New businesses", ask: "How many new businesses were registered in the {r} region in 2023?", vMin: 800, vMax: 12000, row: 2 },
  { title: "Hospital admissions by region", what: "Admissions", ask: "How many hospital admissions were there in the {r} region in 2023?", vMin: 6000, vMax: 90000, row: 4 },
  { title: "Housing completions by region", what: "Completions", ask: "How many homes were completed in the {r} region in 2023?", vMin: 1200, vMax: 26000, row: 1 },
  { title: "Air passengers by region", what: "Passengers", ask: "How many air passengers did the {r} region handle in 2023?", vMin: 90000, vMax: 2400000, row: 3 },
  { title: "Graduates by region", what: "Graduates", ask: "How many students graduated in the {r} region in 2023?", vMin: 2000, vMax: 38000, row: 2 }
]);
rep("costPerBeneficiary", [
  { title: "Support programmes, 2024", progs: ["Programme A", "Programme B", "Programme C", "Programme D"], row: 0 },
  { title: "Mobility schemes", progs: ["Scheme 1", "Scheme 2", "Scheme 3", "Scheme 4"], row: 2 },
  { title: "Training initiatives", progs: ["Skills+", "Digital Start", "Green Jobs", "Reboot"], row: 1 },
  { title: "Health programmes", progs: ["Prevention", "Screening", "Care", "Rehab"], row: 3 },
  { title: "Youth initiatives", progs: ["Youth A", "Youth B", "Youth C", "Youth D"], row: 2 },
  { title: "Rural schemes", progs: ["Farm Aid", "Village", "Broadband", "Water"], row: 0 }
]);
rep("pieDifference", [
  { title: "Grants awarded by field", labels: ["Health", "Climate", "Digital", "Culture", "Food", "Mobility"], total: 2400, unitWord: "grants" },
  { title: "Complaints received by topic", labels: ["Access", "Delays", "Fees", "Privacy", "Quality", "Other"], total: 18600, unitWord: "complaints" },
  { title: "Visitors by country of origin", labels: ["Country A", "Country B", "Country C", "Country D", "Country E", "Others"], total: 486000, unitWord: "visitors" },
  { title: "Staff by function", labels: ["Policy", "Legal", "Finance", "IT", "HR", "Support"], total: 3200, unitWord: "staff" },
  { title: "Projects funded by region", labels: ["North", "South", "East", "West", "Centre", "Islands"], total: 1450, unitWord: "projects" },
  { title: "Applications by profile", labels: ["Law", "Economics", "Audit", "IT", "Science", "Languages"], total: 52800, unitWord: "applications" }
]);
rep("overallRate", [
  { title: "Results by test centre", centres: ["Centre 1", "Centre 2", "Centre 3", "Centre 4", "Centre 5"] },
  { title: "Driving test results by centre", centres: ["Riverside", "Hilltop", "Lakeside", "Parkview", "Harbour"] },
  { title: "Language exam results by school", centres: ["School A", "School B", "School C", "School D", "School E"] },
  { title: "Certification results by provider", centres: ["Provider V", "Provider W", "Provider X", "Provider Y", "Provider Z"] },
  { title: "Apprenticeship exams by college", centres: ["College 1", "College 2", "College 3", "College 4", "College 5"] },
  { title: "Selection test results by session", centres: ["Session 1", "Session 2", "Session 3", "Session 4", "Session 5"] }
]);
rep("compound", [
  { title: "Loan offers", offers: ["Offer A", "Offer B", "Offer C", "Offer D"], row: 0 },
  { title: "Savings products", offers: ["Plan 1", "Plan 2", "Plan 3", "Plan 4"], row: 2 },
  { title: "Bond options", offers: ["Bond W", "Bond X", "Bond Y", "Bond Z"], row: 1 },
  { title: "Deposit accounts", offers: ["Account 1", "Account 2", "Account 3", "Account 4"], row: 3 },
  { title: "Investment funds", offers: ["Fund A", "Fund B", "Fund C", "Fund D"], row: 2 },
  { title: "Credit lines", offers: ["Line 1", "Line 2", "Line 3", "Line 4"], row: 1 }
]);
rep("shareCategory", [
  { title: "Electricity generation by source (TWh, fictional countries)", unit: "TWh", parts: ["Renewables", "Nuclear", "Fossil"], part: 0 },
  { title: "Waste treatment (thousand tonnes, fictional countries)", unit: "thousand t", parts: ["Recycling", "Incineration", "Landfill"], part: 0 },
  { title: "Freight transport (billion tkm, fictional countries)", unit: "billion tkm", parts: ["Road", "Rail", "Inland waterways"], part: 1 },
  { title: "Public spending (EUR billion, fictional countries)", unit: "EUR bn", parts: ["Health", "Education", "Other"], part: 1 },
  { title: "Tourist nights (million, fictional countries)", unit: "million", parts: ["Domestic", "EU visitors", "Non-EU visitors"], part: 2 },
  { title: "Research staff (thousand, fictional countries)", unit: "thousand", parts: ["Business", "Government", "Universities"], part: 2 }
]);
rep("twoExhibits", [
  { title: "Cultural budget by region", total: 120, row: 0 },
  { title: "Road maintenance budget", total: 340, row: 2 },
  { title: "Health promotion budget", total: 56, row: 1 },
  { title: "Broadband investment", total: 210, row: 3 },
  { title: "Sports facilities budget", total: 75, row: 4 },
  { title: "Flood protection budget", total: 180, row: 2 }
]);
if (plan.length !== 150) throw new Error("plan has " + plan.length);

/* ---------- build: interleave templates so each set mixes them ---------- */
const byTemplate = {};
plan.forEach(([name, c]) => (byTemplate[name] = byTemplate[name] || []).push(c));
const names = Object.keys(byTemplate);
const ordered = [];
for (let round_ = 0; round_ < 6; round_++) names.forEach((n) => ordered.push([n, byTemplate[n][round_]]));

const items = ordered.map(([name, c], i) => {
  const target = (i * 2 + Math.floor(i / 5)) % 5;
  let t, pool = null, lastErr;
  // Regenerate the data if an item is unusable (rounding tie, too few plausible distractors).
  for (let attempt = 0; attempt < 50; attempt++) {
    try {
      t = name === "ratioCategory" || name === "surplusCategory" || name === "shareCategory" ? T[name](c, target) : T[name](c);
      pool = t.options ? null : assembleNumeric(t, target);
      lastErr = null;
      break;
    } catch (e) { lastErr = e; }
  }
  if (lastErr) throw lastErr;
  return { t, pool };
});

// Assign key positions: categorical items are fixed; numeric items get the best position whose letter is not yet full.
const quota = Math.ceil(items.length / 5) + 3;
const used = [0, 0, 0, 0, 0];
items.forEach((it) => { if (!it.pool) used[it.t.answer]++; });
const order = items.map((it, i) => i).filter((i) => items[i].pool)
  .sort((i, j) => { const g = (it) => { const r = it.pool.cands.map((c) => c.real).sort((a, b) => b - a); return r[0] - (r[1] ?? -9); }; return g(items[j]) - g(items[i]); });
order.forEach((i) => {
  const it = items[i];
  const ranked = it.pool.cands.slice().sort((a, b) => b.real - a.real || used[a.k] - used[b.k]);
  const pick = ranked.find((c) => used[c.k] < quota) || ranked[0];
  used[pick.k]++;
  it.k = pick.k;
});
const built = items.map(({ t, pool, k }) => {
  const { options, answer, optionNotes } = pool ? finalize(pool, k) : t;
  const q = { topic: t.topic, difficulty: t.difficulty };
  if (t.answerType) q.answerType = t.answerType;
  q.exhibits = t.exhibits;
  Object.assign(q, { stem: t.stem, options, answer, hints: t.hints, solution: t.solution, optionNotes, explanation: t.explanation });
  return q;
});

const sizes = [10, 50, 50, 40];
let start = 0;
sizes.forEach((size, si) => {
  const n = si + 1, id = String(n).padStart(2, "0");
  const qs = built.slice(start, start + size).map((q, k) => ({ id: `n${id}-${String(k + 1).padStart(2, "0")}`, ...q }));
  start += size;
  const set = { id: "numerical-" + id, section: "numerical", title: `Numerical Reasoning · Set ${n}`, description: `${size} data-interpretation items with worked solutions (generated).`, version: 2, questions: qs };
  fs.writeFileSync(path.join(root, `questions/numerical/numerical-set-${id}.js`), "/* Generated by scripts/generators/numerical.mjs. Edit the generator, not this file. */\nEPSO_BANK.registerSet(" + JSON.stringify(set, null, 2) + ");\n");
});
const dist = [0, 0, 0, 0, 0], diff = { 1: 0, 2: 0, 3: 0 };
built.forEach((q) => { dist[q.answer]++; diff[q.difficulty]++; });
console.log("numerical: 150 items; answer letters A–E", dist.join("/"), "; difficulty", JSON.stringify(diff));
