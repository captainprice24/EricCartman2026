// Generates questions/numerical/numerical-set-02.js and numerical-set-03.js (25 questions each).
// Every answer and distractor is computed here, so the data is arithmetically consistent.
// Usage: node scripts/generators/numerical-sets-02-03.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

/* ---------- deterministic randomness ---------- */
let seed = 20261014;
const rnd = () => {
  seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const ri = (a, b) => a + Math.floor(rnd() * (b - a + 1));
const pick = (arr) => arr[Math.floor(rnd() * arr.length)];
const round = (v, d = 0) => Math.round(v * 10 ** d) / 10 ** d;

/* ---------- formatting ---------- */
const group = (n, d = 0) => {
  const [i, f] = Math.abs(n).toFixed(d).split(".");
  return (n < 0 ? "−" : "") + i.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (f ? "." + f : "");
};
const pct = (d = 1) => (v) => group(v, d) + "%";
const eur = (d = 0) => (v) => "EUR " + group(v, d);
const eurM = (d = 1) => (v) => "EUR " + group(v, d) + " million";
const unit = (u, d = 0) => (v) => group(v, d) + " " + u;
const cur = (code, d = 2) => (v) => code + " " + group(v, d);

/* ---------- option assembly: numeric options sorted ascending, correct answer at a target position ---------- */
const FILL_NOTE = "Not derived from the data. Recheck each step of the calculation.";
function assembleNumeric(t, targetPos) {
  const f = t.fmt;
  const cs = f(t.correct);
  if (f(t.correct * (1 + 1e-9)) !== f(t.correct * (1 - 1e-9))) throw new Error("Correct answer sits on a rounding boundary: " + t.stem);
  const used = new Set([cs]);
  const minGap = Math.abs(t.correct) * 0.012;
  const pool = [];
  const add = (v, note, prio) => {
    if (!isFinite(v) || v <= 0) return;
    const s = f(v);
    if (used.has(s) || Math.abs(v - t.correct) < minGap) return;
    if (pool.some((p) => Math.abs(p.v - v) < minGap)) return;
    used.add(s);
    pool.push({ v, s, note, prio });
  };
  t.distractors.forEach((d) => add(d.v, d.note, 0));
  const step = t.fillStep || 0.06;
  for (let i = 1; i <= 8; i++) {
    add(t.correct * (1 + step * i), FILL_NOTE, i);
    add(t.correct * (1 - step * i), FILL_NOTE, i);
  }
  const below = pool.filter((p) => p.v < t.correct).sort((a, b) => a.prio - b.prio || b.v - a.v);
  const above = pool.filter((p) => p.v > t.correct).sort((a, b) => a.prio - b.prio || a.v - b.v);
  let k = Math.max(0, Math.min(4, targetPos));
  while (k > below.length) k--;
  while (4 - k > above.length) k++;
  const chosen = below.slice(0, k).concat(above.slice(0, 4 - k), [{ v: t.correct, s: cs, note: "Correct.", correct: true }]);
  chosen.sort((a, b) => a.v - b.v);
  return {
    options: chosen.map((c) => c.s),
    answer: chosen.findIndex((c) => c.correct),
    optionNotes: chosen.map((c) => c.note)
  };
}

/* ---------- templates ---------- */
const T = {};

// 1. Percentage change of a total across years
T.pctChangeTotal = (ctx) => {
  const rows = ctx.rows.map((name) => {
    const a = ri(ctx.min, ctx.max);
    const b = round(a * (1 + (ri(-4, 12) / 100)));
    const c = round(b * (1 + (ri(-3, 14) / 100)));
    return [name, a, b, c];
  });
  const t1 = rows.reduce((s, r) => s + r[1], 0), t2 = rows.reduce((s, r) => s + r[2], 0), t3 = rows.reduce((s, r) => s + r[3], 0);
  const correct = ((t3 - t1) / t1) * 100;
  const firstRow = ((rows[0][3] - rows[0][1]) / rows[0][1]) * 100;
  const avgRows = rows.reduce((s, r) => s + ((r[3] - r[1]) / r[1]) * 100, 0) / rows.length;
  return {
    topic: "Percentage change", difficulty: 1,
    exhibit: { type: "table", title: ctx.title, columns: [ctx.first, ...ctx.years], rows: rows.map((r) => [r[0], group(r[1]), group(r[2]), group(r[3])]) },
    stem: `By what percentage did the total ${ctx.what} change between ${ctx.years[0]} and ${ctx.years[2]}?`,
    correct, fmt: pct(1),
    distractors: [
      { v: ((t3 - t1) / t3) * 100, note: `This divides the change by the ${ctx.years[2]} total. Divide by the starting value instead.` },
      { v: ((t2 - t1) / t1) * 100, note: `This is the change from ${ctx.years[0]} to ${ctx.years[1]}, the wrong pair of years.` },
      { v: firstRow, note: `This is the change for ${rows[0][0]} alone, not for the total.` },
      { v: avgRows, note: "This averages the row percentages. Rows of different sizes must be added up first." }
    ],
    hints: [`Add up each column: you need the ${ctx.years[0]} and ${ctx.years[2]} totals only.`, "Percentage change = (new − old) ÷ old × 100."],
    solution: [
      `Total ${ctx.years[0]} = ${rows.map((r) => group(r[1])).join(" + ")} = ${group(t1)}`,
      `Total ${ctx.years[2]} = ${rows.map((r) => group(r[3])).join(" + ")} = ${group(t3)}`,
      `Change = (${group(t3)} − ${group(t1)}) ÷ ${group(t1)} × 100 = ${group(correct, 1)}%`
    ],
    explanation: "Total first, then the percentage. Averaging row percentages or dividing by the new value are the two classic errors."
  };
};

// 2. Share of a subgroup (correct base)
T.share = (ctx) => {
  const g = ctx.groups.map(() => [ri(ctx.min, ctx.max), ri(ctx.min, ctx.max)]);
  const [a, b] = g[ctx.ask];
  const correct = (a / (a + b)) * 100;
  const totA = g.reduce((s, r) => s + r[0], 0), tot = g.reduce((s, r) => s + r[0] + r[1], 0);
  const other = g[1 - ctx.ask];
  return {
    topic: "Share of a subgroup", difficulty: 1,
    exhibit: { type: "table", title: ctx.title, columns: [ctx.first, ...ctx.cats], rows: g.map((r, i) => [ctx.groups[i], group(r[0]), group(r[1])]) },
    stem: `What percentage of ${ctx.groupLabel[ctx.ask]} are ${ctx.catLabel}?`,
    correct, fmt: pct(1),
    distractors: [
      { v: (totA / tot) * 100, note: `This is the share of ${ctx.catLabel} across all groups. The base should be ${ctx.groupLabel[ctx.ask]} only.` },
      { v: (b / (a + b)) * 100, note: `This is the share of the other category within ${ctx.groupLabel[ctx.ask]}.` },
      { v: (a / totA) * 100, note: `This is the share of all ${ctx.catLabel} who belong to this group. The base is reversed.` },
      { v: (other[0] / (other[0] + other[1])) * 100, note: "This is the same share for the other group." }
    ],
    hints: [`The base (denominator) is ${ctx.groupLabel[ctx.ask]} only.`, `Add both columns for that row to get the base, then divide the ${ctx.cats[0]} figure by it.`],
    solution: [`Base = ${group(a)} + ${group(b)} = ${group(a + b)}`, `Share = ${group(a)} ÷ ${group(a + b)} × 100 = ${group(correct, 1)}%`],
    explanation: "Name the base before you divide. Wrong-base answers are always among the options."
  };
};

// 3. Highest or lowest ratio between two series (bar chart, categorical answer)
T.ratio = (ctx, targetPos) => {
  for (let attempt = 0; attempt < 500; attempt++) {
    const B = ctx.periods.map(() => ri(ctx.min, ctx.max));
    const ratios = ctx.periods.map(() => 1 + ri(5, 60) / 100);
    const A = B.map((b, i) => Math.round(b * ratios[i]));
    const r = A.map((a, i) => a / B[i]);
    const sorted = [...r].sort((x, y) => (ctx.lowest ? x - y : y - x));
    const best = r.indexOf(sorted[0]);
    if (best !== targetPos || Math.abs(sorted[0] - sorted[1]) < 0.04) continue;
    const bigA = A.indexOf(Math.max(...A));
    if (bigA === best) continue;
    return {
      topic: "Ratios from a chart", difficulty: 2,
      exhibit: { type: "bar", title: ctx.title, unit: ctx.unit, categories: ctx.periods, series: [{ name: ctx.a, values: A }, { name: ctx.b, values: B }] },
      stem: `In which ${ctx.periodWord} was the ratio of ${ctx.a.toLowerCase()} to ${ctx.b.toLowerCase()} ${ctx.lowest ? "lowest" : "highest"}?`,
      options: ctx.periods, answer: best,
      optionNotes: ctx.periods.map((p, i) => (i === best ? `Correct: ${A[i]} ÷ ${B[i]} ≈ ${r[i].toFixed(2)}.` : `${A[i]} ÷ ${B[i]} ≈ ${r[i].toFixed(2)}.` + (i === bigA ? ` The tallest ${ctx.a.toLowerCase()} bar does not mean the ${ctx.lowest ? "lowest" : "highest"} ratio.` : ""))),
      hints: [`Divide ${ctx.a.toLowerCase()} by ${ctx.b.toLowerCase()} for every ${ctx.periodWord}.`, "Compare the ratios, not the bar heights."],
      solution: ctx.periods.map((p, i) => `${p}: ${A[i]} ÷ ${B[i]} = ${r[i].toFixed(3)}`).concat([`${ctx.lowest ? "Lowest" : "Highest"}: ${ctx.periods[best]}`]),
      explanation: "For ratio questions, compute every candidate. The visually dominant bar is usually a distractor."
    };
  }
  throw new Error("ratio: no data");
};

// 4. Currency conversion via the euro
T.currency = (ctx) => {
  const rates = ctx.rates;
  const [from, to] = ctx.pair;
  const amt = ctx.amount;
  const eurAmt = amt / rates[from];
  const correct = eurAmt * rates[to];
  return {
    topic: "Currency conversion", difficulty: 2,
    exhibit: { type: "table", title: "Exchange rates: units of currency per 1 EUR", columns: ["Currency", "Rate per EUR"], rows: Object.keys(rates).map((c) => [ctx.names[c] + " (" + c + ")", rates[c].toFixed(c === "JPY" || c === "HUF" ? 1 : 3)]), note: "Assume no fees or commissions." },
    stem: `What is ${from} ${group(amt)} worth in ${to} at these rates (converting via the euro)?`,
    correct, fmt: cur(to, 2), fillStep: 0.07,
    distractors: [
      { v: (amt * rates[from]) / rates[to], note: "The rates are applied the wrong way round." },
      { v: amt * rates[from] * rates[to], note: `Multiplying by both rates is wrong. Divide by the ${from} rate to get euros first.` },
      { v: amt * rates[to], note: `This treats the ${from} amount as if it were euros.` }
    ],
    hints: [`Rates are quoted per euro, so divide the ${from} amount by the ${from} rate to get euros.`, `Then multiply the euro amount by the ${to} rate.`],
    solution: [`${from} ${group(amt)} ÷ ${rates[from]} = EUR ${group(eurAmt, 2)}`, `EUR ${group(eurAmt, 2)} × ${rates[to]} = ${to} ${group(correct, 2)}`],
    explanation: "With rates per EUR: divide to get into euros, multiply to get out of euros."
  };
};

// 5. Weighted average (speed or unit price)
T.weighted = (ctx) => {
  const legs = ctx.legs;
  const totA = legs.reduce((s, l) => s + l[0], 0), totB = legs.reduce((s, l) => s + l[1], 0);
  const correct = (totA / totB) * ctx.scale;
  const simple = legs.reduce((s, l) => s + (l[0] / l[1]) * ctx.scale, 0) / legs.length;
  const maxLeg = Math.max(...legs.map((l) => (l[0] / l[1]) * ctx.scale));
  return {
    topic: ctx.topic, difficulty: 2,
    exhibit: { type: "table", title: ctx.title, columns: ctx.columns, rows: legs.map((l, i) => [ctx.rowName(i), ctx.fa(l[0]), ctx.fb(l[1])]), note: ctx.note },
    stem: ctx.stem,
    correct, fmt: ctx.fmt, fillStep: 0.05,
    distractors: [
      { v: simple, note: "This is the simple average of the individual rates. It ignores how much each row contributes." },
      { v: maxLeg, note: "This is the rate for one row only." }
    ],
    hints: [`Use totals: total ${ctx.aName} ÷ total ${ctx.bName}.`, "Do not average the individual rates unless every row has the same weight."],
    solution: [`Total ${ctx.aName} = ${legs.map((l) => ctx.fa(l[0])).join(" + ")} = ${ctx.fa(totA)}`, `Total ${ctx.bName} = ${legs.map((l) => ctx.fb(l[1])).join(" + ")} = ${ctx.fb(totB)}`, `Average = ${ctx.fa(totA)} ÷ ${ctx.fb(totB)}${ctx.scale !== 1 ? " × " + ctx.scale : ""} = ${ctx.fmt(correct)}`],
    explanation: "An overall rate is total over total. Averaging the rates gives each row equal weight, which is almost always wrong."
  };
};

// 6. Relative change vs percentage-point change (bar chart, categorical answer)
T.relative = (ctx, targetPos) => {
  const names = ["Country A", "Country B", "Country C", "Country D", "Country E"];
  for (let attempt = 0; attempt < 2000; attempt++) {
    const s = names.map(() => ri(8, 45));
    const e = s.map((v) => v + ri(2, 14));
    const rel = s.map((v, i) => (e[i] - v) / v);
    const pp = s.map((v, i) => e[i] - v);
    const metric = ctx.askPP ? pp : rel;
    const trap = ctx.askPP ? rel : pp;
    const best = metric.indexOf(Math.max(...metric));
    if (best !== targetPos) continue;
    if (metric.filter((m) => m === metric[best]).length > 1) continue;
    const second = [...metric].sort((a, b) => b - a)[1];
    if (ctx.askPP ? metric[best] - second < 1 : metric[best] - second < 0.04) continue;
    const trapBest = trap.indexOf(Math.max(...trap));
    if (trapBest === best) continue;
    return {
      topic: "Relative vs absolute change", difficulty: 3,
      exhibit: { type: "bar", title: ctx.title, unit: "%", categories: names, series: [{ name: ctx.y1, values: s }, { name: ctx.y2, values: e }] },
      stem: ctx.askPP
        ? `Which country recorded the largest increase in percentage points between ${ctx.y1} and ${ctx.y2}?`
        : `Which country recorded the largest relative (percentage) increase between ${ctx.y1} and ${ctx.y2}?`,
      options: names, answer: best,
      optionNotes: names.map((n, i) => {
        const base = `${s[i]} → ${e[i]}: +${pp[i]} points, +${(rel[i] * 100).toFixed(1)}%.`;
        if (i === best) return "Correct. " + base;
        if (i === trapBest) return base + ` It leads on ${ctx.askPP ? "relative change" : "percentage points"}, which is not what the question asks.`;
        return base;
      }),
      hints: [ctx.askPP ? "Percentage points = later value − earlier value." : "Relative increase = (later − earlier) ÷ earlier.", ctx.askPP ? "Do not divide by the starting value here." : "A small starting value can give a large relative increase."],
      solution: names.map((n, i) => `${n}: ${ctx.askPP ? `${e[i]} − ${s[i]} = ${pp[i]} points` : `(${e[i]} − ${s[i]}) ÷ ${s[i]} = ${(rel[i] * 100).toFixed(1)}%`}`).concat([`Largest: ${names[best]}`]),
      explanation: "Percentage points measure the gap between two percentages. A percentage change measures that gap relative to the start. Read which one the question asks for."
    };
  }
  throw new Error("relative: no data");
};

// 7. Highest rate, then total value
T.rateTotal = (ctx, targetPos) => {
  for (let attempt = 0; attempt < 1000; attempt++) {
    const rows = ctx.rows.map(() => {
      const rec = ri(ctx.recMin, ctx.recMax);
      const appr = Math.round(rec * (ri(15, 40) / 100));
      const avg = ri(ctx.avgMin, ctx.avgMax) * ctx.avgStep;
      return { rec, appr, avg };
    });
    const rate = rows.map((r) => r.appr / r.rec);
    const best = rate.indexOf(Math.max(...rate));
    const sr = [...rate].sort((a, b) => b - a);
    if (sr[0] - sr[1] < 0.015) continue;
    const totals = rows.map((r) => (r.appr * r.avg) / 1000);
    const mostAppr = rows.map((r) => r.appr).indexOf(Math.max(...rows.map((r) => r.appr)));
    if (mostAppr === best) continue;
    const t = {
      topic: "Multi-step: rate then total", difficulty: 3,
      exhibit: { type: "table", title: ctx.title, columns: [ctx.first, "Applications received", "Applications approved", ctx.avgLabel], rows: rows.map((r, i) => [ctx.rows[i], group(r.rec), group(r.appr), group(r.avg)]) },
      stem: `What was the total funding awarded under the ${ctx.unitWord} with the highest approval rate?`,
      correct: totals[best], fmt: eurM(2), fillStep: 0.08,
      distractors: totals.map((v, i) => ({ v, note: i === mostAppr ? `This is ${ctx.rows[i]}'s total. It has the most approvals but not the highest rate.` : `This is ${ctx.rows[i]}'s total, which is not the highest approval rate.` })).filter((d, i) => i !== best),
      hints: ["Step 1: approval rate = approved ÷ received, for every row.", `Step 2: approved × average grant for that row only. The grants are in EUR thousand.`],
      solution: rows.map((r, i) => `${ctx.rows[i]}: ${r.appr} ÷ ${r.rec} = ${(rate[i] * 100).toFixed(1)}%`).concat([`${ctx.rows[best]} total = ${rows[best].appr} × EUR ${group(rows[best].avg)} thousand = EUR ${group(totals[best], 2)} million`]),
      explanation: "Finish step 1 completely before step 2. The other rows' totals are the distractors."
    };
    return t;
  }
  throw new Error("rateTotal");
};

// 8. Budget reallocation
T.realloc = (ctx) => {
  const total = ctx.total;
  const shares = ctx.shares;
  const x = (shares[ctx.inc] / 100) * total, y = (shares[ctx.from] / 100) * total;
  const extra = x * (ctx.p / 100);
  const correct = y - extra;
  return {
    topic: "Budget reallocation", difficulty: 2,
    exhibit: { type: "table", title: `${ctx.title} (total EUR ${group(total)})`, columns: ["Cost category", "Share of budget"], rows: Object.keys(shares).map((k) => [k, shares[k] + "%"]) },
    stem: `The ${ctx.inc.toLowerCase()} budget is increased by ${ctx.p}%, with the extra money taken entirely from ${ctx.from.toLowerCase()}. What is the new ${ctx.from.toLowerCase()} budget?`,
    correct, fmt: eur(0), fillStep: 0.05,
    distractors: [
      { v: y * (1 - ctx.p / 100), note: `This cuts ${ctx.from.toLowerCase()} by ${ctx.p}%. The ${ctx.p}% applies to ${ctx.inc.toLowerCase()}.` },
      { v: y - x, note: `This removes the whole ${ctx.inc.toLowerCase()} budget from ${ctx.from.toLowerCase()}.` },
      { v: y, note: "This is the original amount, unchanged." },
      { v: y - total * (ctx.p / 100), note: `This takes ${ctx.p}% of the whole budget.` }
    ],
    hints: ["Convert the two relevant shares into euros first.", `The increase is ${ctx.p}% of the ${ctx.inc.toLowerCase()} budget.`],
    solution: [`${ctx.inc} = ${shares[ctx.inc]}% × ${group(total)} = EUR ${group(x)}`, `Increase = ${ctx.p}% × ${group(x)} = EUR ${group(extra)}`, `${ctx.from} = ${shares[ctx.from]}% × ${group(total)} = EUR ${group(y)}`, `New ${ctx.from.toLowerCase()} = ${group(y)} − ${group(extra)} = EUR ${group(correct)}`],
    explanation: "Turn the percentages into amounts, then apply the change to the right category."
  };
};

// 9. Rate with a changing base
T.changingBase = (ctx) => {
  const base = ctx.base, r = ctx.rate, g = ctx.growth, d = ctx.delta;
  const count1 = base * r / 100;
  const count2 = count1 + d;
  const base2 = base * (1 + g / 100);
  const correct = (count2 / base2) * 100;
  return {
    topic: "Rates with changing base", difficulty: 3,
    exhibit: { type: "table", title: ctx.title, columns: ["Indicator", ctx.y1], rows: [[ctx.baseLabel, group(base)], [ctx.rateLabel, r + "%"]], note: `In ${ctx.y2}, the ${ctx.baseLabel.toLowerCase()} ${g >= 0 ? "grew" : "fell"} by ${Math.abs(g)}% and the number of ${ctx.countLabel} ${d >= 0 ? "rose" : "fell"} by ${group(Math.abs(d))}.` },
    stem: `What was the ${ctx.rateLabel.toLowerCase()} in ${ctx.y2} (to two decimal places)?`,
    correct, fmt: pct(2), fillStep: 0.03,
    distractors: [
      { v: (count2 / base) * 100, note: `This keeps the ${ctx.y1} ${ctx.baseLabel.toLowerCase()}. The base changed too.` },
      { v: (count1 / base2) * 100, note: `This applies the base change but not the change in ${ctx.countLabel}.` },
      { v: r, note: `This is the ${ctx.y1} rate, unchanged.` }
    ],
    hints: ["Convert the rate into a number of people first.", "Both the numerator and the denominator change."],
    solution: [`${ctx.y1}: ${r}% × ${group(base)} = ${group(count1)} ${ctx.countLabel}`, `${ctx.y2} ${ctx.countLabel} = ${group(count1)} ${d >= 0 ? "+" : "−"} ${group(Math.abs(d))} = ${group(count2)}`, `${ctx.y2} ${ctx.baseLabel.toLowerCase()} = ${group(base)} × ${(1 + g / 100).toFixed(3)} = ${group(base2)}`, `Rate = ${group(count2)} ÷ ${group(base2)} × 100 = ${group(correct, 2)}%`],
    explanation: "When a rate's base moves, recompute both parts of the fraction."
  };
};

// 10. Per-capita ranking (categorical answer)
T.perCapita = (ctx, targetPos) => {
  const names = ctx.names;
  for (let attempt = 0; attempt < 3000; attempt++) {
    const pop = names.map(() => ri(ctx.popMin, ctx.popMax) / 10);
    const pc = names.map(() => ri(ctx.pcMin, ctx.pcMax));
    const tot = pop.map((p, i) => round((p * pc[i]) / ctx.div, 2));
    const real = tot.map((t, i) => (t * ctx.div) / pop[i]);
    const order = real.map((v, i) => i).sort((a, b) => real[b] - real[a]);
    const rank = ctx.rank === "lowest" ? order.length - 1 : ctx.rank === "second" ? 1 : 0;
    const ans = order[rank];
    if (ans !== targetPos) continue;
    const sortedVals = order.map((i) => real[i]);
    let ok = true;
    for (let i = 0; i + 1 < sortedVals.length; i++) if ((sortedVals[i] - sortedVals[i + 1]) / sortedVals[i] < 0.02) ok = false;
    const bigTot = tot.indexOf(Math.max(...tot));
    if (!ok || bigTot === ans) continue;
    return {
      topic: "Per-capita comparison", difficulty: 2,
      exhibit: { type: "table", title: ctx.title, columns: ["Country", ctx.totLabel, "Population (millions)"], rows: names.map((n, i) => [n, tot[i].toFixed(2), pop[i].toFixed(1)]) },
      stem: `Which country has the ${ctx.rank === "second" ? "second-highest" : ctx.rank} ${ctx.what} per inhabitant?`,
      options: names, answer: ans,
      optionNotes: names.map((n, i) => `${i === ans ? "Correct. " : ""}${tot[i].toFixed(2)} ÷ ${pop[i].toFixed(1)} ≈ ${group(real[i], 0)} ${ctx.showUnit} per person.` + (i === bigTot && i !== ans ? " Largest total, but totals do not show per-person values." : "")),
      hints: ["Divide the total by the population for every country.", ctx.rank === "second" ? "Rank all five; the highest is not the answer." : "Compare the per-person values, not the totals."],
      solution: names.map((n, i) => `${n}: ${tot[i].toFixed(2)} ÷ ${pop[i].toFixed(1)} → about ${group(real[i], 0)} ${ctx.showUnit} per person`).concat([`Answer: ${names[ans]}`]),
      explanation: "Per-capita questions need a division for every row. Ranking by the totals column is the standard trap."
    };
  }
  throw new Error("perCapita");
};

// 11. Successive percentage changes
T.successive = (ctx) => {
  const v = ctx.value, a = ctx.a, b = ctx.b;
  const correct = v * (1 + a / 100) * (1 + b / 100);
  return {
    topic: "Successive percentage changes", difficulty: 2,
    exhibit: { type: "table", title: ctx.title, columns: ["Item", "Value"], rows: [[ctx.startLabel, ctx.fmt(v)], [`Change in ${ctx.y1}`, (a > 0 ? "+" : "") + a + "%"], [`Change in ${ctx.y2}`, (b > 0 ? "+" : "") + b + "%"]] },
    stem: `What was the ${ctx.endLabel} at the end of ${ctx.y2}?`,
    correct, fmt: ctx.fmt, fillStep: 0.025,
    distractors: [
      { v: v * (1 + (a + b) / 100), note: `This adds the two percentages (${a > 0 ? "+" : ""}${a + b}%). Percentage changes compound; they do not add.` },
      { v: v * (1 + a / 100), note: `This stops after ${ctx.y1}.` },
      { v: v * (1 + b / 100), note: `This applies only the ${ctx.y2} change.` }
    ],
    hints: [`Apply the ${ctx.y1} change first, then apply the ${ctx.y2} change to the new value.`, `Multiply by (1 ${a >= 0 ? "+" : "−"} ${Math.abs(a) / 100}) and then by (1 ${b >= 0 ? "+" : "−"} ${Math.abs(b) / 100}).`],
    solution: [`After ${ctx.y1}: ${ctx.fmt(v)} × ${(1 + a / 100).toFixed(2)} = ${ctx.fmt(v * (1 + a / 100))}`, `After ${ctx.y2}: × ${(1 + b / 100).toFixed(2)} = ${ctx.fmt(correct)}`],
    explanation: "Successive percentage changes multiply. A rise of x% followed by a fall of x% leaves you below the start."
  };
};

// 12. Reverse percentage
T.reverse = (ctx) => {
  const finalV = ctx.final, p = ctx.p;
  const correct = finalV / (1 + (ctx.sign * p) / 100);
  return {
    topic: "Reverse percentages", difficulty: 2,
    exhibit: { type: "table", title: ctx.title, columns: ctx.columns, rows: ctx.rows },
    stem: ctx.stem,
    correct, fmt: eur(2), fillStep: 0.03,
    distractors: [
      { v: finalV * (1 - (ctx.sign * p) / 100), note: `This takes ${p}% of the final amount. The percentage was applied to the original amount, so divide instead.` },
      { v: finalV, note: "This is the final amount itself." },
      { v: finalV * (1 + (ctx.sign * p) / 100), note: "This applies the change a second time." }
    ],
    hints: ["The percentage was applied to the unknown original value.", `Final = original × ${(1 + (ctx.sign * p) / 100).toFixed(2)}, so original = final ÷ ${(1 + (ctx.sign * p) / 100).toFixed(2)}.`],
    solution: [`Original = ${group(finalV, 2)} ÷ ${(1 + (ctx.sign * p) / 100).toFixed(2)} = EUR ${group(correct, 2)}`],
    explanation: "To undo a percentage change, divide by the multiplier. Subtracting the same percentage from the final value gives the wrong answer."
  };
};

// 13. Weighted average of scores
T.weightedScore = (ctx) => {
  const parts = ctx.parts;
  const correct = parts.reduce((s, p) => s + p[1] * p[2], 0) / 100;
  const simple = parts.reduce((s, p) => s + p[1], 0) / parts.length;
  return {
    topic: "Weighted average", difficulty: 2,
    exhibit: { type: "table", title: ctx.title, columns: ["Component", "Score (out of 100)", "Weight"], rows: parts.map((p) => [p[0], String(p[1]), p[2] + "%"]) },
    stem: `What is ${ctx.who}'s overall weighted score (to one decimal place)?`,
    correct, fmt: (v) => group(v, 1), fillStep: 0.03,
    distractors: [
      { v: simple, note: "This is the simple average, which ignores the weights." },
      { v: Math.max(...parts.map((p) => p[1])) * 0.9, note: FILL_NOTE }
    ],
    hints: ["Multiply each score by its weight.", "Add the weighted scores; the weights already sum to 100%."],
    solution: parts.map((p) => `${p[0]}: ${p[1]} × ${p[2]}% = ${group((p[1] * p[2]) / 100, 2)}`).concat([`Total = ${group(correct, 2)} → ${group(correct, 1)}`]),
    explanation: "Weighted average = Σ(score × weight). A simple mean only works when all weights are equal."
  };
};

// 14. Linear trend projection
T.trend = (ctx) => {
  const start = ctx.start, step = ctx.step;
  const years = ctx.years;
  const vals = years.map((y, i) => start + step * i);
  const k = ctx.ahead;
  const correct = vals[vals.length - 1] + step * k;
  const growthPct = (vals[vals.length - 1] - vals[vals.length - 2]) / vals[vals.length - 2];
  return {
    topic: "Trend projection", difficulty: 1,
    exhibit: { type: "bar", title: ctx.title, unit: ctx.unit, categories: years.map(String), series: [{ name: ctx.series, values: vals }] },
    stem: `If the annual increase seen in the chart continues unchanged, what will the value be in ${years[years.length - 1] + k}?`,
    correct, fmt: (v) => group(v, 0) + (ctx.suffix || ""), fillStep: 0.04,
    distractors: [
      { v: vals[vals.length - 1] + step * (k - 1), note: "One year short: count the years carefully." },
      { v: vals[vals.length - 1] + step * (k + 1), note: "One year too many." },
      { v: vals[vals.length - 1] * Math.pow(1 + growthPct, k), note: "This compounds the latest percentage growth. The chart shows a constant absolute increase." }
    ],
    hints: ["Find the constant amount added each year.", `Count the years from ${years[years.length - 1]} to ${years[years.length - 1] + k}.`],
    solution: [`Increase per year = ${vals[1]} − ${vals[0]} = ${step}`, `${years[years.length - 1] + k} = ${vals[vals.length - 1]} + ${k} × ${step} = ${group(correct)}`],
    explanation: "A constant absolute increase is linear; do not convert it into a percentage growth rate."
  };
};

// 15. Difference between two shares of a population
T.popShares = (ctx) => {
  const pop = ctx.pop;
  const shares = ctx.shares;
  const [x, y] = ctx.compare;
  const correct = (pop * (shares[x] - shares[y])) / 100;
  return {
    topic: "Shares to absolute numbers", difficulty: 2,
    exhibit: { type: "table", title: `${ctx.title} (total: ${group(pop)})`, columns: ["Group", "Share"], rows: Object.keys(shares).map((k) => [k, shares[k] + "%"]) },
    stem: `How many more people are in the "${x}" group than in the "${y}" group?`,
    correct, fmt: (v) => group(v, 0), fillStep: 0.08,
    distractors: [
      { v: (pop * shares[x]) / 100, note: `This is the size of the "${x}" group, not the difference.` },
      { v: (pop * (shares[x] - shares[y])) / 1000, note: "Out by a factor of 10: check the place value." },
      { v: (pop * (shares[x] + shares[y])) / 100, note: "This adds the two groups instead of subtracting." }
    ],
    hints: ["Subtract the two percentages first.", `Then apply the difference to the total of ${group(pop)}.`],
    solution: [`Difference = ${shares[x]}% − ${shares[y]}% = ${round(shares[x] - shares[y], 1)}%`, `${round(shares[x] - shares[y], 1)}% × ${group(pop)} = ${group(correct)}`],
    explanation: "Percentages of the same total can be subtracted directly before converting into numbers."
  };
};

/* ---------- instance plan ---------- */
const plan = [
  ["pctChangeTotal", { title: "Visitors to EU information centres by region (thousands)", first: "Region", years: ["2022", "2023", "2024"], rows: ["North", "South", "East", "West"], min: 40, max: 160, what: "number of visitors" }],
  ["share", { title: "Trainees by contract type and nationality", first: "Contract", cats: ["Nationals", "Non-nationals"], groups: ["Paid traineeship", "Study visit"], groupLabel: ["paid trainees", "study visitors"], catLabel: "nationals", ask: 0, min: 60, max: 240 }],
  ["ratio", { title: "Online vs postal applications by quarter (thousands)", unit: "thousand", periods: ["Q1", "Q2", "Q3", "Q4"], periodWord: "quarter", a: "Online", b: "Postal", min: 18, max: 48 }],
  ["currency", { rates: { USD: 1.085, GBP: 0.842, SEK: 11.35, PLN: 4.32 }, names: { USD: "US dollar", GBP: "Pound sterling", SEK: "Swedish krona", PLN: "Polish zloty" }, pair: ["PLN", "SEK"], amount: 2500 }],
  ["weighted", { topic: "Average speed", title: "Delivery van route", columns: ["Stage", "Distance (km)", "Driving time (min)"], legs: [[45, 40], [96, 72], [30, 30]], rowName: (i) => "Stage " + (i + 1), fa: (v) => group(v), fb: (v) => group(v), aName: "distance", bName: "time", scale: 60, fmt: unit("km/h", 1), stem: "What is the van's average speed over the whole route (km/h, to one decimal place)?", note: "Ignore stops between stages." }],
  ["relative", { title: "Share of households with fibre broadband (%)", y1: "2020", y2: "2024", askPP: false }],
  ["rateTotal", { title: "Calls for proposals, 2025", first: "Call", rows: ["Call 1", "Call 2", "Call 3", "Call 4"], recMin: 150, recMax: 420, avgMin: 6, avgMax: 30, avgStep: 10, avgLabel: "Average grant (EUR thousand)", unitWord: "call" }],
  ["realloc", { title: "Conference budget", total: 360000, shares: { Venue: 35, Catering: 25, Interpretation: 20, Travel: 12, Communication: 8 }, inc: "Communication", from: "Catering", p: 40 }],
  ["changingBase", { title: "Vocational school, Region Y", y1: "2023", y2: "2024", base: 48000, baseLabel: "Number of enrolled students", rate: 8.5, rateLabel: "Dropout rate", countLabel: "dropouts", growth: 4, delta: -300 }],
  ["perCapita", { title: "Research spending by country (fictional countries)", names: ["Aldoria", "Brevania", "Calmora", "Dunmark", "Estoria"], totLabel: "Research spending (EUR billion)", popMin: 12, popMax: 60, pcMin: 300, pcMax: 1500, div: 1000, what: "research spending", rank: "highest", show: 1000, showUnit: "EUR" }],
  ["successive", { title: "Annual budget of a regional programme", startLabel: "Budget at start of 2023", endLabel: "budget", y1: "2023", y2: "2024", value: 2400000, a: 15, b: -12, fmt: eur(0) }],
  ["reverse", { title: "Invoice for a translation contract", columns: ["Item", "Amount"], rows: [["Total invoiced, including 21% VAT", "EUR 9,438.00"]], final: 9438, p: 21, sign: 1, stem: "What was the invoice amount before VAT?" }],
  ["weightedScore", { title: "Selection board scoring grid", who: "the candidate", parts: [["Written test", 72, 40], ["Interview", 85, 35], ["Case study", 65, 25]] }],
  ["trend", { title: "Electric charging points in City Z", unit: "points", series: "Charging points", years: [2020, 2021, 2022, 2023, 2024], start: 180, step: 65, ahead: 3 }],
  ["popShares", { title: "Population of Region Q by age group", pop: 3640000, shares: { "Under 15": 14.5, "15–24": 10.5, "25–64": 52.0, "65 and over": 23.0 }, compare: ["65 and over", "Under 15"] }],
  ["pctChangeTotal", { title: "Tonnes of waste recycled by municipality", first: "Municipality", years: ["2021", "2022", "2023"], rows: ["Avenford", "Brightwell", "Corrin"], min: 1200, max: 4800, what: "tonnage recycled" }],
  ["share", { title: "Officials taking part in language training", first: "Function group", cats: ["Women", "Men"], groups: ["AD", "AST"], groupLabel: ["AD participants", "AST participants"], catLabel: "women", ask: 1, min: 50, max: 220 }],
  ["ratio", { title: "Rail vs road freight on a corridor (million tonnes)", unit: "million t", periods: ["2021", "2022", "2023", "2024"], periodWord: "year", a: "Rail", b: "Road", min: 20, max: 60, lowest: true }],
  ["currency", { rates: { USD: 1.092, CHF: 0.948, CZK: 25.20, DKK: 7.46 }, names: { USD: "US dollar", CHF: "Swiss franc", CZK: "Czech koruna", DKK: "Danish krone" }, pair: ["USD", "CZK"], amount: 1800 }],
  ["weighted", { topic: "Weighted unit price", title: "Office paper purchases in 2024", columns: ["Order", "Cost (EUR)", "Reams bought"], legs: [[1140, 300], [1925, 550], [690, 300]], rowName: (i) => "Order " + (i + 1), fa: (v) => group(v), fb: (v) => group(v), aName: "cost", bName: "reams", scale: 1, fmt: eur(2), stem: "What was the average price paid per ream across all three orders?" }],
  ["relative", { title: "Adults with basic digital skills (%)", y1: "2019", y2: "2023", askPP: true }],
  ["rateTotal", { title: "Mobility grant rounds", first: "Round", rows: ["Spring", "Summer", "Autumn", "Winter"], recMin: 200, recMax: 520, avgMin: 2, avgMax: 9, avgStep: 1, avgLabel: "Average grant (EUR thousand)", unitWord: "round" }],
  ["realloc", { title: "Research project budget", total: 1850000, shares: { Staff: 52, Equipment: 18, Consumables: 14, Dissemination: 6, Overheads: 10 }, inc: "Dissemination", from: "Equipment", p: 50 }],
  ["changingBase", { title: "Labour market, Country V", y1: "2023", y2: "2024", base: 6200000, baseLabel: "Labour force", rate: 7.2, rateLabel: "Unemployment rate", countLabel: "unemployed people", growth: 1.5, delta: -24000 }],
  ["perCapita", { title: "Household waste generated (fictional countries)", names: ["Fernland", "Galvia", "Hollen", "Istria Nova", "Jorvik"], totLabel: "Waste (million tonnes)", popMin: 35, popMax: 115, pcMin: 380, pcMax: 820, div: 1000, what: "household waste", rank: "second", show: 1000, showUnit: "kg" }],
  ["successive", { title: "Price of an annual software licence", startLabel: "Price in 2023", endLabel: "licence price", y1: "2024", y2: "2025", value: 4800, a: -20, b: 25, fmt: eur(0) }],
  ["reverse", { title: "Laptop purchase", columns: ["Item", "Amount"], rows: [["Price paid after a 15% discount", "EUR 1,190.00"]], final: 1190, p: 15, sign: -1, stem: "What was the price before the discount?" }],
  ["weightedScore", { title: "Supplier evaluation grid", who: "Supplier K", parts: [["Price", 58, 50], ["Quality", 91, 30], ["Delivery time", 77, 20]] }],
  ["trend", { title: "Applications to a traineeship scheme", unit: "applications", series: "Applications", years: [2019, 2020, 2021, 2022, 2023], start: 2350, step: 420, ahead: 4 }],
  ["popShares", { title: "Workforce of Agency R by length of service", pop: 2900, shares: { "Under 2 years": 18, "2–5 years": 27, "6–10 years": 31, "Over 10 years": 24 }, compare: ["6–10 years", "Under 2 years"] }],
  ["pctChangeTotal", { title: "Passengers at regional airports (thousands)", first: "Airport", years: ["2022", "2023", "2024"], rows: ["Airport 1", "Airport 2", "Airport 3", "Airport 4"], min: 300, max: 1400, what: "number of passengers" }],
  ["share", { title: "Erasmus+ participants from two universities", first: "University", cats: ["Outgoing", "Incoming"], groups: ["University P", "University S"], groupLabel: ["University P's participants", "University S's participants"], catLabel: "outgoing", ask: 0, min: 80, max: 300 }],
  ["ratio", { title: "Solar vs wind electricity generation (TWh)", unit: "TWh", periods: ["2021", "2022", "2023", "2024"], periodWord: "year", a: "Solar", b: "Wind", min: 15, max: 40 }],
  ["currency", { rates: { USD: 1.078, JPY: 162.4, HUF: 392.5, RON: 4.97 }, names: { USD: "US dollar", JPY: "Japanese yen", HUF: "Hungarian forint", RON: "Romanian leu" }, pair: ["RON", "HUF"], amount: 640 }],
  ["weighted", { topic: "Average speed", title: "Cycling commute in three sections", columns: ["Section", "Distance (km)", "Time (min)"], legs: [[6, 15], [12, 45], [3, 10]], rowName: (i) => "Section " + (i + 1), fa: (v) => group(v), fb: (v) => group(v), aName: "distance", bName: "time", scale: 60, fmt: unit("km/h", 1), stem: "What is the average speed over the whole commute (km/h, to one decimal place)?" }],
  ["relative", { title: "Share of renewables in heating (%)", y1: "2018", y2: "2023", askPP: false }],
  ["rateTotal", { title: "Start-up support programme", first: "Strand", rows: ["Green", "Digital", "Health", "Social"], recMin: 120, recMax: 380, avgMin: 4, avgMax: 25, avgStep: 10, avgLabel: "Average award (EUR thousand)", unitWord: "strand" }],
  ["realloc", { title: "Communication campaign budget", total: 640000, shares: { Media: 40, Production: 22, Events: 18, Research: 12, Evaluation: 8 }, inc: "Evaluation", from: "Media", p: 25 }],
  ["changingBase", { title: "Public library network", y1: "2023", y2: "2024", base: 125000, baseLabel: "Registered members", rate: 34, rateLabel: "Share of members who borrowed e-books", countLabel: "e-book borrowers", growth: -4, delta: 2600 }],
  ["perCapita", { title: "Tourism revenue (fictional countries)", names: ["Kestrel Isles", "Lunaria", "Marrow", "Norvale", "Ostland"], totLabel: "Revenue (EUR billion)", popMin: 5, popMax: 60, pcMin: 400, pcMax: 2400, div: 1000, what: "tourism revenue", rank: "lowest", show: 1000, showUnit: "EUR" }],
  ["successive", { title: "Visitors to a museum", startLabel: "Visitors in 2022", endLabel: "number of visitors", y1: "2023", y2: "2024", value: 185000, a: 30, b: -10, fmt: (v) => group(v, 0) }],
  ["reverse", { title: "Service charge", columns: ["Item", "Amount"], rows: [["Fee after an 8% indexation increase", "EUR 2,754.00"]], final: 2754, p: 8, sign: 1, stem: "What was the fee before indexation?" }],
  ["weightedScore", { title: "Course assessment", who: "the student", parts: [["Assignments", 81, 30], ["Mid-term exam", 66, 30], ["Final exam", 74, 40]] }],
  ["trend", { title: "Members of a professional network", unit: "members", series: "Members", years: [2020, 2021, 2022, 2023, 2024], start: 12400, step: 1850, ahead: 2 }],
  ["popShares", { title: "Survey respondents by attitude to remote work", pop: 4200, shares: { "Strongly favour": 34.5, "Favour": 28.0, "Neutral": 21.5, "Oppose": 16.0 }, compare: ["Strongly favour", "Oppose"] }],
  ["pctChangeTotal", { title: "Patent applications by sector", first: "Sector", years: ["2021", "2022", "2023"], rows: ["Energy", "Health", "Transport"], min: 900, max: 3600, what: "number of patent applications" }],
  ["share", { title: "Respondents to a public consultation", first: "Respondent type", cats: ["In favour", "Against"], groups: ["Citizens", "Organisations"], groupLabel: ["citizens", "organisations"], catLabel: "in favour", ask: 1, min: 120, max: 900 }],
  ["relative", { title: "Share of organic farmland (%)", y1: "2017", y2: "2022", askPP: true }],
  ["perCapita", { title: "Public transport journeys (fictional countries)", names: ["Pellam", "Quarta", "Rosmark", "Sundra", "Tavel"], totLabel: "Journeys (billion)", popMin: 50, popMax: 200, pcMin: 80, pcMax: 320, div: 1000, what: "number of public transport journeys", rank: "highest", show: 1000, showUnit: "journeys" }],
  ["weighted", { topic: "Weighted unit price", title: "Electricity bought by an agency", columns: ["Contract", "Cost (EUR)", "Energy (MWh)"], legs: [[18900, 210], [31200, 400], [7800, 120]], rowName: (i) => "Contract " + (i + 1), fa: (v) => group(v), fb: (v) => group(v), aName: "cost", bName: "energy", scale: 1, fmt: eur(2), stem: "What was the average price per MWh across all contracts?" }]
];

/* ---------- build ---------- */
const out = plan.map(([name, ctx], i) => {
  const targetPos = i % 5;
  const t = T[name](ctx, name === "relative" ? targetPos : name === "ratio" ? targetPos % 4 : name === "perCapita" ? targetPos : targetPos);
  let options, answer, optionNotes;
  if (t.options) ({ options, answer, optionNotes } = t);
  else ({ options, answer, optionNotes } = assembleNumeric(t, targetPos));
  return { topic: t.topic, difficulty: t.difficulty, exhibit: t.exhibit, stem: t.stem, options, answer, hints: t.hints, solution: t.solution, optionNotes, explanation: t.explanation };
});
if (out.length !== 50) throw new Error("expected 50 questions, got " + out.length);

function writeSet(n, items) {
  const id = String(n).padStart(2, "0");
  const set = {
    id: "numerical-" + id, section: "numerical", title: `Numerical Reasoning · Set ${n}`,
    description: "25 generated data-interpretation items with worked solutions.", version: 1,
    questions: items.map((q, k) => ({ id: `n${id}-${String(k + 1).padStart(2, "0")}`, ...q }))
  };
  const body = "/* Generated by scripts/generators/numerical-sets-02-03.mjs. Edit the generator, not this file. */\nEPSO_BANK.registerSet(" + JSON.stringify(set, null, 2) + ");\n";
  fs.writeFileSync(path.join(root, `questions/numerical/numerical-set-${id}.js`), body);
}
writeSet(2, out.slice(0, 25));
writeSet(3, out.slice(25));
const dist = [0, 0, 0, 0, 0];
out.forEach((q) => dist[q.answer]++);
console.log("numerical: 50 questions, answer letters A–E:", dist.join("/"));
