// EU Training-style numerical items (November 2026). Original models; no provider question is copied.
// Replaces every Easy and Hard item in Sets 01–11 with a short question on a table or chart:
// Easy items become Medium (two linked steps), Hard items become four-stage problems whose conditions sit in
// a note under the exhibit instead of a long question. Physics items (speed, time, distance) are included.
// Options are named mistakes spaced at least 3% apart, so no rounding instruction is needed.
// Called at the end of scripts/generators/numerical.mjs; never hand-edit the set files.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import crypto from 'node:crypto';
import { numericalDifficulty } from '../lib/difficulty.mjs';

/* ---------- helpers ---------- */
const mkRng = (s) => { let x = s >>> 0; return () => { x = (x + 0x6d2b79f5) | 0; let t = Math.imul(x ^ (x >>> 15), 1 | x); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };
const strSeed = (s) => [...s].reduce((h, c) => Math.imul(h ^ c.charCodeAt(0), 16777619) >>> 0, 2166136261);
const g = (n, d = 0) => { const [i, f] = Math.abs(n).toFixed(d).split('.'); return (n < 0 ? '−' : '') + i.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (f ? '.' + f : ''); };
const sum = (a) => a.reduce((s, x) => s + x, 0);
const mmss = (t) => `${Math.floor(t / 60)}:${(t % 60).toFixed(2).padStart(5, '0')}`;
const NAMES = ['Aldoria', 'Brevania', 'Calmora', 'Dunmark', 'Estoria', 'Fernland', 'Galvia', 'Hollen', 'Istrada', 'Jorvik', 'Kestrel', 'Lunaria', 'Marrow', 'Norvale', 'Ostland', 'Pellam', 'Quarta', 'Rosmark', 'Sundra', 'Tavel'];
const mk = (rnd) => {
  const R = {
    i: (a, b) => a + Math.floor(rnd() * (b - a + 1)),
    f: (a, b, d = 1) => Math.round((a + rnd() * (b - a)) * 10 ** d) / 10 ** d,
    pick: (arr) => arr[Math.floor(rnd() * arr.length)],
    pickN: (arr, n) => { const a = arr.slice(), out = []; while (out.length < n) out.push(a.splice(Math.floor(rnd() * a.length), 1)[0]); return out; },
  };
  return R;
};
const table = (title, columns, rows, note) => ({ type: 'table', title: title + ' (fictional data)', columns, rows, ...(note ? { note } : {}) });
const M = (v, note) => ({ v, note });

/* ---------- medium models (two linked steps) ---------- */
const MED = {};
const HARD = {};

MED['Turnout and votes'] = (R, v) => {
  const ds = ['District 1', 'District 2', 'District 3', 'District 4'];
  const yes = ds.map(() => R.i(22, 46) * 100 + R.i(0, 99)), no = ds.map(() => R.i(22, 46) * 100 + R.i(0, 99));
  const t = ds.map(() => R.f(68, 86, 2));
  const k = v % 4, share = no[k] / (yes[k] + no[k]);
  const key = t[k] * share;
  const others = ds.map((_, i) => i).filter((i) => i !== k);
  return {
    exhibits: [{ type: 'combo', title: 'Referendum results: votes and turnout by district (fictional data)', unit: 'votes', categories: ds,
      series: [{ name: 'Voted YES', values: yes }, { name: 'Voted NO', values: no }, { name: 'Turnout (%)', values: t, line: true }],
      note: 'Turnout = percentage of eligible voters who voted (YES or NO).' }],
    stem: `What percentage of the eligible voters of ${ds[k]} voted NO in the referendum?`,
    key, fmt: (x) => g(x, 1) + '%',
    mistakes: [
      M(100 * share, 'Gives NO as a share of the votes cast, ignoring that only the turnout share of eligible voters voted.'),
      M(t[k] * yes[k] / (yes[k] + no[k]), 'Uses the YES votes instead of the NO votes.'),
      ...others.map((i) => M(t[i] * share, `Applies the turnout of ${ds[i]} instead of ${ds[k]}.`)),
      M(100 * share - (100 - t[k]), 'Subtracts the non-voters\' percentage points from the NO share of votes cast.'),
    ],
    hints: ['Turnout tells you what share of eligible voters voted at all.', 'NO voters as a share of eligible voters = NO share of votes cast × turnout.'],
    solution: [`Data needed: ${ds[k]} — YES ${g(yes[k])}, NO ${g(no[k])}, turnout ${g(t[k], 2)}%.`,
      `NO share of votes cast = ${g(no[k])} ÷ (${g(yes[k])} + ${g(no[k])}) = ${g(100 * share, 3)}%.`,
      `Share of eligible voters = ${g(100 * share, 3)}% × ${g(t[k], 2)}% ≈ ${g(key, 2)}%.`],
    explanation: 'Only the turnout share of eligible voters took part, so the NO share of votes cast is scaled by turnout.',
  };
};

MED['Funds raised per fundraiser'] = (R, v) => {
  const orgs = R.pickN(['Helping Hands', 'Open Doors', 'Bridge Builders', 'Clean Rivers', 'Next Step', 'Green Roots', 'Safe Harbour', 'Bright Start'], 4);
  const rows = orgs.map(() => { const f1 = R.i(18, 48), f2 = f1 + R.i(2, 12), e = R.i(18, 70), eff = R.f(3.2, 7.6, 2); return { f1, f2, e, r: Math.round(e * R.f(3, 7, 2)), eff }; });
  const k = v % 4, x = rows[k], p = R.pick([8, 10, 12, 15, 18, 20]);
  const raised = (e) => e * x.eff * 1000;
  const key = raised(x.e * (1 + p / 100)) / x.f2;
  return {
    exhibits: [table('Fundraising by NGO', ['NGO', 'Fundraisers Y1', 'Fundraisers Y2', 'Fundraising spending Y1 (EUR thousand)', 'Funds raised Y1 (EUR thousand)', 'Efficiency Y2 (EUR raised per EUR spent)'],
      rows.map((r, i) => [orgs[i], String(r.f1), String(r.f2), String(r.e), String(r.r), g(r.eff, 2)]))],
    stem: `If fundraising spending at ${orgs[k]} rose by ${p}% from Y1 to Y2, how much was raised per fundraiser at ${orgs[k]} in Y2 (EUR)?`,
    key, fmt: (y) => 'EUR ' + g(y),
    mistakes: [
      M(raised(x.e * (1 + p / 100)) / x.f1, 'Divides by the Y1 number of fundraisers.'),
      M(raised(x.e) / x.f2, `Leaves out the ${p}% rise in spending.`),
      M(raised(x.e * (1 - p / 100)) / x.f2, `Applies the ${p}% change as a fall.`),
      M(x.r * 1000 * (1 + p / 100) / x.f2, 'Grows the Y1 funds raised instead of using the Y2 efficiency.'),
      M(x.r * 1000 / x.f2, 'Uses the Y1 funds raised with the Y2 fundraisers.'),
    ],
    hints: ['First find Y2 spending, then what each euro spent raised in Y2.', 'Divide by the Y2 number of fundraisers.'],
    solution: [`Data needed: ${orgs[k]} — spending Y1 EUR ${x.e} thousand, efficiency Y2 ${g(x.eff, 2)}, fundraisers Y2 ${x.f2}.`,
      `Spending Y2 = ${x.e} × ${g(1 + p / 100, 2)} = EUR ${g(x.e * (1 + p / 100), 2)} thousand.`,
      `Funds raised Y2 = ${g(x.e * (1 + p / 100), 2)} × ${g(x.eff, 2)} = EUR ${g(x.e * (1 + p / 100) * x.eff, 3)} thousand.`,
      `Per fundraiser = ${g(raised(x.e * (1 + p / 100)), 1)} ÷ ${x.f2} ≈ EUR ${g(key, 1)}.`],
    explanation: 'Grow the spending, convert it into funds raised with the Y2 efficiency, then share it among the Y2 fundraisers.',
  };
};

MED['Population from per-capita change'] = (R, v) => {
  const cs = R.pickN(NAMES, 5), yrs = [2016, 2017, 2019];
  const rows = cs.map(() => { const p = R.i(3000, 22000), s1 = Math.round(p * R.f(1.6, 6.5, 3)); return [p, s1, Math.round(s1 * R.f(1.01, 1.06, 3)), Math.round(s1 * R.f(1.04, 1.12, 3))]; });
  const k = v % 5, [P, S1, S2, S3] = rows[k], p = R.pick([4, 5, 6, 7, 8, 9]);
  const pc = S1 / P, key = S3 / (pc * (1 + p / 100));
  return {
    exhibits: [table('E-book sales and population', ['Country', `Population ${yrs[0]} (thousand)`, `Sales ${yrs[0]} (thousand)`, `Sales ${yrs[1]} (thousand)`, `Sales ${yrs[2]} (thousand)`], rows.map((r, i) => [cs[i], ...r.map((x) => g(x))]))],
    stem: `Assuming e-book sales per inhabitant in ${cs[k]} rose by ${p}% from ${yrs[0]} to ${yrs[2]}, what was its population in ${yrs[2]} (thousand)?`,
    key, fmt: (x) => g(x),
    mistakes: [
      M(S3 / pc, `Leaves out the ${p}% rise in sales per inhabitant.`),
      M(S3 / (pc * (1 - p / 100)), `Applies the ${p}% change as a fall.`),
      M(S2 / (pc * (1 + p / 100)), `Uses the ${yrs[1]} sales instead of ${yrs[2]}.`),
      M(P * (1 + p / 100), `Grows the population by ${p}% instead of the sales per inhabitant.`),
      M(S2 / pc, `Uses the ${yrs[1]} sales and leaves out the ${p}% rise.`),
      M(P / (1 + p / 100), `Divides the ${yrs[0]} population by the ${p}% rise.`),
      M(S2 / (pc * (1 - p / 100)), `Uses the ${yrs[1]} sales and applies the change as a fall.`),
      M(S3 / (pc * (1 + 2 * p / 100)), `Applies the ${p}% rise twice.`),
    ],
    hints: [`Find sales per inhabitant in ${yrs[0]} first.`, 'Population = sales ÷ sales per inhabitant.'],
    solution: [`Data needed: ${cs[k]} — population ${g(P)} thousand and sales ${g(S1)} thousand in ${yrs[0]}; sales ${g(S3)} thousand in ${yrs[2]}.`,
      `Sales per inhabitant ${yrs[0]} = ${g(S1)} ÷ ${g(P)} = ${g(pc, 4)}.`,
      `Sales per inhabitant ${yrs[2]} = ${g(pc, 4)} × ${g(1 + p / 100, 2)} = ${g(pc * (1 + p / 100), 4)}.`,
      `Population ${yrs[2]} = ${g(S3)} ÷ ${g(pc * (1 + p / 100), 4)} ≈ ${g(key, 1)} thousand.`],
    explanation: 'Population follows from dividing the later sales by the later sales per inhabitant.',
  };
};

MED['Constant annual increase'] = (R, v) => {
  const cs = R.pickN(NAMES, 5), yrs = [2017, 2019, 2022];
  const rows = cs.map(() => { const a = R.i(6000, 70000); const b = Math.round(a * R.f(1.04, 1.12, 3)); return [a, b, Math.round(b * R.f(1.24, 1.42, 3))]; });
  const k = v % 5, [S1, S2, S4] = rows[k], D = S4 - S2, step = D / 3;
  const key = S4 + 2 * step;
  return {
    exhibits: [table('Cinema admissions', ['Country', `${yrs[0]} (thousand)`, `${yrs[1]} (thousand)`, `${yrs[2]} (thousand)`], rows.map((r, i) => [cs[i], ...r.map((x) => g(x))]))],
    stem: `Admissions in ${cs[k]} grew by the same number each year between ${yrs[1]} and ${yrs[2]}. If that continued, what would they be in ${yrs[2] + 2} (thousand)?`,
    key, fmt: (x) => g(x),
    mistakes: [
      M(S4 + step, `Projects only one year ahead, to ${yrs[2] + 1}.`),
      M(S4 + D, `Divides the ${yrs[1]}–${yrs[2]} increase by 2 instead of 3 years.`),
      M(S4 + D / 2, `Counts four years between ${yrs[1]} and ${yrs[2]}.`),
      M(S4 + 2 * (S4 - S1) / 5, `Uses the ${yrs[0]}–${yrs[2]} increase instead of ${yrs[1]}–${yrs[2]}.`),
      M(S4 + (S2 - S1), `Uses the ${yrs[0]}–${yrs[1]} annual increase.`),
      M(S2 + 2 * step, `Adds two years' increase to the ${yrs[1]} figure instead of the ${yrs[2]} figure.`),
      M(S4 + 4 * step, `Projects four years ahead, to ${yrs[2] + 4}.`),
    ],
    hints: [`Count the years between ${yrs[1]} and ${yrs[2]}.`, 'Add the annual increase once for every year after the last figure.'],
    solution: [`Data needed: ${cs[k]} — ${g(S2)} thousand in ${yrs[1]} and ${g(S4)} thousand in ${yrs[2]}.`,
      `Annual increase = (${g(S4)} − ${g(S2)}) ÷ 3 = ${g(step, 3)} thousand.`,
      `${yrs[2] + 2}: ${g(S4)} + 2 × ${g(step, 3)} ≈ ${g(key, 1)} thousand.`],
    explanation: 'A constant number per year means a straight-line increase: divide the change by the number of years, then extend it.',
  };
};

MED['Missing value from a known share'] = (R, v) => {
  const cs = R.pickN(NAMES, 5), k = v % 5, p = R.pick([20, 25, 30, 35, 40]);
  const rows = cs.map(() => [R.i(3000, 12000), R.i(2500, 7000), R.i(1500, 4500), R.i(1000, 3000)]);
  const oth = (j) => sum(rows.filter((_, i) => i !== k).map((r) => r[j]));
  const O = oth(2), G = O * p / (100 - p);
  const [, U, , E] = rows[k];
  const key = U + G + E;
  return {
    exhibits: [table('Pianos owned', ['Country', 'Population (thousand)', 'Upright', 'Grand', 'Electric'], rows.map((r, i) => [cs[i], g(r[0]), g(r[1]), i === k ? '—' : g(r[2]), g(r[3])]))],
    stem: `Exactly ${p}% of all grand pianos in the five countries were in ${cs[k]}. How many pianos of all types were there in ${cs[k]}?`,
    key, fmt: (x) => g(x),
    mistakes: [
      M(U + E + O * p / 100, `Takes ${p}% of the other four countries' grand pianos.`),
      M(U + E + O * p / (100 + p), `Divides by ${100 + p}% instead of ${100 - p}%.`),
      M(U + E + oth(1) * p / (100 - p), 'Applies the share to the upright column.'),
      M(U + E + oth(3) * p / (100 - p), 'Applies the share to the electric column.'),
      M(G + E, 'Leaves out the upright pianos.'),
      M(U + G, 'Leaves out the electric pianos.'),
      M(U + E + O / 4, 'Uses the average of the other countries\' grand pianos.'),
    ],
    hints: [`The other four countries hold the remaining ${100 - p}% of grand pianos.`, `Find the missing grand-piano figure, then add the other types for ${cs[k]}.`],
    solution: [`Data needed: grand pianos in the other four countries = ${g(O)}; ${cs[k]}'s upright ${g(U)} and electric ${g(E)}.`,
      `${100 - p}% = ${g(O)}, so ${p}% = ${g(O)} × ${p} ÷ ${100 - p} = ${g(G, 2)}.`,
      `All types = ${g(U)} + ${g(G, 2)} + ${g(E)} ≈ ${g(key, 1)}.`],
    explanation: `The other countries hold ${100 - p}% of grand pianos, which gives the missing figure.`,
  };
};

MED['Weighted average with a ratio'] = (R, v) => {
  const cs = R.pickN(NAMES, 4), k = v % 4;
  const data = cs.map(() => { const n = R.i(3, 8), U = R.i(12, 26), A = U + R.i(3, 9); return { n, U, A, Rr: A * (n + 1) - n * U }; });
  const x = data[k];
  const r = x.Rr - R.i(6, 14);
  const key = (x.n * x.U + r) / (x.n + 1);
  return {
    exhibits: [{ type: 'hbar', title: 'Average ambulance response times (fictional data)', unit: 'minutes', categories: ['Urban', 'Rural', 'Overall'],
      series: data.map((d, i) => ({ name: cs[i], values: [d.U, d.Rr, d.A] }))}],
    stem: `${cs[k]} had ${x.n} times as many urban as rural calls. If its average rural response time fell to ${r} minutes, what would its overall average be (minutes)?`,
    key, fmt: (y) => g(y, 2),
    mistakes: [
      M((x.U + r) / 2, 'Takes a simple average of urban and rural times.'),
      M((x.U + x.n * r) / (x.n + 1), 'Puts the larger weight on the rural calls.'),
      M(x.A - (x.Rr - r) / x.n, `Divides the rural reduction by ${x.n} instead of ${x.n + 1}.`),
      M(x.A * r / x.Rr, 'Scales the overall average by the same proportion as the rural time.'),
      M((x.n * x.U + r) / x.n, `Divides by ${x.n} calls instead of ${x.n + 1}.`),
    ],
    hints: [`For every rural call there are ${x.n} urban calls.`, `Overall average = (${x.n} × urban + rural) ÷ ${x.n + 1}.`],
    solution: [`Data needed: ${cs[k]} urban time ${x.U} minutes; new rural time ${r} minutes; weights ${x.n} : 1.`,
      `New overall = (${x.n} × ${x.U} + ${r}) ÷ ${x.n + 1} = ${x.n * x.U + r} ÷ ${x.n + 1} ≈ ${g(key, 3)} minutes.`],
    explanation: 'Each type of call counts in proportion to how many there are, so the urban time carries the larger weight.',
  };
};

MED['Rank of percentage increases'] = (R, v) => {
  const src = ['Fossil fuel', 'Wind', 'Solar', 'Hydro', 'Nuclear', 'Biomass', 'Other'];
  const yrs = [2006, 2011, 2016, 2021];
  for (;;) {
    const names = R.pickN(src.slice(1), 5), land = R.pick(NAMES);
    const a = names.map(() => R.f(2, 14, 1)), b = a.map((x) => Math.round(x * R.f(1.04, 1.7, 3) * 10) / 10);
    const rel = a.map((x, i) => b[i] / x - 1), pp = a.map((x, i) => b[i] - x);
    const order = rel.map((x, i) => i).sort((i, j) => rel[j] - rel[i]);
    const gaps = order.slice(1).map((i, n) => rel[order[n]] - rel[i]);
    if (gaps.some((d) => d < 0.03)) continue;
    const rank = v % 2 ? 2 : 1; // second- or third-largest (0-based index)
    const keyI = order[rank], ppOrder = pp.map((x, i) => i).sort((i, j) => pp[j] - pp[i]);
    if (ppOrder[rank] === keyI) continue;
    const fossil = [R.f(70, 85, 1)];
    fossil.push(Math.round((fossil[0] - R.f(3, 6)) * 10) / 10, Math.round((fossil[0] - R.f(7, 11)) * 10) / 10, Math.round((fossil[0] - R.f(12, 18)) * 10) / 10);
    const rowsAll = [['Fossil fuel', ...fossil.map((x) => g(x, 1))], ...names.map((nm, i) => [nm, g(Math.max(0.5, a[i] - R.f(1, 2)), 1), g(Math.max(0.6, a[i] - R.f(0.1, 0.9)), 1), g(a[i], 1), g(b[i], 1)])];
    const word = rank === 1 ? 'second' : 'third';
    const notes = names.map((nm, i) => i === keyI ? 'Correct.' : `${nm} ranks ${['first', 'second', 'third', 'fourth', 'fifth'][order.indexOf(i)]} by percentage increase (${g(100 * rel[i], 1)}%)` + (ppOrder[rank] === i ? `; it is ${word} only in percentage points.` : '.'));
    return {
      category: { names, key: keyI, notes },
      exhibits: [table(`${land}: share of total power generated (%)`, ['Source', ...yrs.map(String)], rowsAll, 'Assume total power generated did not change over the period.')],
      stem: `In ${land}, which source showed the ${word}-largest percentage increase in generation between ${yrs[2]} and ${yrs[3]}?`,
      hints: ['Compare each change with its own starting value, not in percentage points.', 'Rank the sources by (new − old) ÷ old.'],
      solution: [`Data needed: the ${yrs[2]} and ${yrs[3]} shares; with an unchanged total, shares move in proportion to generation.`,
        ...order.map((i) => `${names[i]}: (${g(b[i], 1)} − ${g(a[i], 1)}) ÷ ${g(a[i], 1)} = ${g(100 * rel[i], 1)}%.`),
        `The ${word}-largest increase is ${names[keyI]}.`],
      explanation: `Percentage increase compares each source with its own ${yrs[2]} level; the largest change in points is not necessarily the largest in per cent.`,
    };
  }
};

MED['Amount needed for a target share'] = (R, v) => {
  const cs = R.pickN(NAMES, 5), yrs = [2008, 2012, 2016, 2020];
  const rows = cs.map(() => { const base = R.i(4000, 65000); return yrs.map(() => Math.round(base * R.f(0.9, 1.12, 3))); });
  const k = v % 5, y = R.i(1, 2), s = v % 2 ? [1, 4] : [1, 3], frac = s[1] === 3 ? 'one third' : 'one quarter';
  const colS = (j) => sum(rows.map((r) => r[j])) - rows[k][j];
  const X = rows[k][y], O = colS(y), T = O + X, f = s[0] / (s[1] - s[0]);
  const key = O * f;
  return {
    exhibits: [table('Freight carried (thousand tonnes)', ['Country', ...yrs.map(String)], rows.map((r, i) => [cs[i], ...r.map((x) => g(x))]))],
    stem: `How much freight (thousand tonnes) would ${cs[k]} have needed to carry in ${yrs[y]} to account for exactly ${frac} of the five countries' total?`,
    key, fmt: (x) => g(x),
    mistakes: [
      M(T * s[0] / s[1], `Takes ${frac} of the actual total, forgetting that ${cs[k]}'s extra freight also raises the total.`),
      M(O * s[0] / s[1], `Takes ${frac} of the other four countries' freight.`),
      M(T * f, `Applies the ratio to the total including ${cs[k]}.`),
      M(colS(y - 1) * f, `Reads the ${yrs[y - 1]} column.`),
      M(colS(y + 1) * f, `Reads the ${yrs[y + 1]} column.`),
      M(O * f - X, `Gives the extra freight needed rather than the total amount.`),
    ],
    hints: [`If ${cs[k]} has ${frac} of the total, the other four have the rest.`, `${cs[k]}'s amount = others × ${s[0]} ÷ ${s[1] - s[0]}.`],
    solution: [`Data needed: ${yrs[y]} column without ${cs[k]}: others = ${g(O)}.`,
      `The others would hold ${s[1] - s[0]} parts out of ${s[1]}, ${cs[k]} ${s[0]} part.`,
      `${cs[k]} = ${g(O)} × ${s[0]} ÷ ${s[1] - s[0]} ≈ ${g(key, 1)} thousand tonnes.`],
    explanation: 'A larger amount for one country also raises the total, so the target is set against the other countries\' freight.',
  };
};

MED['Total from shares in a stacked chart'] = (R, v) => {
  const cats = ['Agree very much', 'Agree somewhat', 'Disagree somewhat', 'Disagree very much'];
  const split = (lo, hi) => { const a = R.i(12, 26), b = R.i(lo, hi), c = R.i(12, 24); return [a, b, c, 100 - a - b - c]; };
  let A, B, C; do { A = split(16, 26); B = split(30, 38); C = split(40, 50); } while ([A, B, C].some((x) => x[3] < 5));
  const topics = ['a four-day working week', 'a city congestion charge', 'compulsory civic service', 'a ban on short-haul flights'];
  const P = R.f(8, 48, 1), q = [R.i(22, 30), R.i(32, 40)], grp = ['18–34', '35–59', '60 and over'];
  q.push(100 - q[0] - q[1]);
  const w = (a, b, c, qq = q) => P * (qq[0] * a + qq[1] * b + qq[2] * c) / 10000;
  const key = w(A[1], B[1], C[1]);
  return {
    exhibits: [{ type: 'stacked', title: `Opinion on ${topics[v % 4]} by age group (fictional data)`, unit: '% of respondents', categories: grp, series: cats.map((c, i) => ({ name: c, values: [A[i], B[i], C[i]] })) }],
    stem: `The adult population was ${g(P, 1)} million: ${q[0]}% aged 18–34, ${q[1]}% aged 35–59 and the rest 60 and over. How many adults agreed somewhat (million)?`,
    key, fmt: (x) => g(x, 2),
    mistakes: [
      M(P * (A[1] + B[1] + C[1]) / 300, 'Takes a simple average of the three age groups\' shares.'),
      M(w(A[1], B[1], C[1], [q[2], q[1], q[0]]), 'Swaps the sizes of the youngest and oldest groups.'),
      M(P * C[1] / 100, 'Applies the share of the oldest group to everyone.'),
      M(P * A[1] / 100, 'Applies the share of the youngest group to everyone.'),
      M(w(A[0], B[0], C[0]), 'Reads the agree-very-much segments.'),
      M(w(A[2], B[2], C[2]), 'Reads the disagree-somewhat segments.'),
      M(P * (q[0] * A[1] + q[1] * B[1]) / 10000 + P * (100 - q[0] - q[1]) * B[1] / 10000, 'Uses the middle group\'s share for those aged 60 and over.'),
    ],
    hints: ['Each percentage applies to its own age group.', 'Find the size of the oldest group first.'],
    solution: [`Data needed: agree somewhat — ${A[1]}%, ${B[1]}% and ${C[1]}%; population ${g(P, 1)} million; group sizes ${q[0]}%, ${q[1]}% and ${q[2]}%.`,
      `18–34: ${g(P, 1)} × ${q[0]}% × ${A[1]}% = ${g(P * q[0] * A[1] / 10000, 4)} million.`,
      `35–59: ${g(P, 1)} × ${q[1]}% × ${B[1]}% = ${g(P * q[1] * B[1] / 10000, 4)} million; 60 and over: ${g(P, 1)} × ${q[2]}% × ${C[1]}% = ${g(P * q[2] * C[1] / 10000, 4)} million.`,
      `Total ≈ ${g(key, 3)} million.`],
    explanation: 'Each group\'s share applies to that group\'s own size, so the result is a weighted, not simple, average.',
  };
};

MED['Monthly pension payments'] = (R, v) => {
  const cs = R.pickN(NAMES, 5);
  const rows = cs.map(() => [R.f(2.5, 19, 1), R.f(15, 25, 1), R.i(640, 1350), R.f(16, 22, 1)]);
  const k = v % 5, [P, sh, pen] = rows[k], key = P * sh / 100 * pen;
  const o = [0, 1, 2, 3, 4].filter((i) => i !== k);
  return {
    exhibits: [table('Pensions', ['Country', 'Population (million)', 'Pensioners (% of population)', 'Average monthly pension (EUR)', 'Life expectancy at 65 (years)'], rows.map((r, i) => [cs[i], g(r[0], 1), g(r[1], 1), g(r[2]), g(r[3], 1)]))],
    stem: `How much did ${cs[k]} pay its pensioners in one month (EUR million)?`,
    key, fmt: (x) => 'EUR ' + g(x, 1) + ' million',
    mistakes: [
      ...o.map((i) => M(P * rows[i][1] / 100 * pen, `Uses ${cs[i]}'s pensioner share.`)),
      ...o.map((i) => M(P * sh / 100 * rows[i][2], `Uses ${cs[i]}'s average pension.`)),
    ],
    hints: ['Pensioners = population × pensioner share.', 'Monthly spending = pensioners × average monthly pension.'],
    solution: [`Data needed: ${cs[k]} — population ${g(P, 1)} million, pensioners ${g(sh, 1)}%, pension EUR ${g(pen)}.`,
      `Pensioners = ${g(P, 1)} × ${g(sh, 1)}% = ${g(P * sh / 100, 4)} million.`,
      `Spending = ${g(P * sh / 100, 4)} × ${g(pen)} ≈ EUR ${g(key, 2)} million.`],
    explanation: 'Only pensioners receive a pension, so the population is first reduced to the pensioner share.',
  };
};

const PIE_ITEMS = ['Paper and card', 'Food', 'Garden waste', 'Plastics', 'Metals', 'Wood', 'Textiles', 'Glass', 'Rubber and leather', 'Electronics', 'Hazardous', 'Other'];
const pieData = (R) => {
  for (;;) {
    const raw = PIE_ITEMS.map((_, i) => (i < 4 ? R.f(10, 24, 1) : R.f(1.2, 7, 1)));
    const tot = sum(raw.slice(0, -1));
    const last = Math.round((100 - tot) * 10) / 10;
    if (last < 1.2 || last > 7) continue;
    raw[raw.length - 1] = last;
    if (new Set(raw).size !== raw.length) continue;
    return raw;
  }
};
MED['Earlier amount from a pie chart'] = (R, v) => {
  const sh = pieData(R), T = R.f(180, 320, 2), yr = 2020 + (v % 4), d = R.f(3, 15, 1);
  const i = [0, 2, 1, 3][v % 4], name = PIE_ITEMS[i];
  const key = (T - d) * sh[i] / 100;
  const near = sh.map((x, j) => j).filter((j) => j !== i && sh[j] > 8);
  return {
    exhibits: [{ type: 'pie', title: `Municipal waste by material, ${yr} (total ${g(T, 2)} million tonnes; fictional data)`, unit: '%', slices: PIE_ITEMS.map((l, j) => ({ label: l, value: sh[j] })) }],
    stem: `Total waste in ${yr} was ${g(d, 1)} million tonnes more than in ${yr - 1}. With the same distribution, how much ${name.toLowerCase()} waste was there in ${yr - 1} (million tonnes)?`,
    key, fmt: (x) => g(x, 2),
    mistakes: [
      M(T * sh[i] / 100 - d, `Subtracts the whole ${g(d, 1)} million tonnes from the ${name.toLowerCase()} amount.`),
      M((T + d) * sh[i] / 100, `Adds the ${g(d, 1)} million tonnes instead of subtracting them.`),
      M(T * sh[i] / 100, `Gives the ${yr} amount.`),
      ...near.map((j) => M((T - d) * sh[j] / 100, `Reads the ${PIE_ITEMS[j]} slice.`)),
    ],
    hints: [`Find the ${yr - 1} total first.`, 'The same distribution means the same percentage applies.'],
    solution: [`Data needed: total ${g(T, 2)}; ${name} ${g(sh[i], 1)}%.`, `${yr - 1} total = ${g(T, 2)} − ${g(d, 1)} = ${g(T - d, 2)} million tonnes.`, `${name}: ${g(T - d, 2)} × ${g(sh[i], 1)}% ≈ ${g(key, 3)} million tonnes.`],
    explanation: 'The distribution is unchanged, so the same share applies to the smaller earlier total.',
  };
};

const STROKES = ['Freestyle', 'Backstroke', 'Breaststroke', 'Butterfly'];
MED['Distance gap at the finish'] = (R, v) => {
  const cs = R.pickN(NAMES, 5), base = [105, 116, 131, 114].map((b) => b + R.f(-1, 1, 2));
  const times = cs.map(() => base.map((b) => Math.round((b + R.f(0, 6.5, 2)) * 100) / 100));
  const sIdx = v % 4, col = times.map((r) => r[sIdx]);
  if (new Set(col).size < 5) return null;
  const order = col.map((t, i) => i).sort((a, b) => col[a] - col[b]);
  const gap = (a, b, c = col) => 200 * (1 - c[order[a]] / c[order[b]]);
  const key = gap(0, 4);
  const other = (sIdx + 1) % 4, col2 = times.map((r) => r[other]), o2 = col2.slice().sort((a, b) => a - b);
  return {
    exhibits: [table('200 m swimming finals: times (m:ss.ss)', ['Country', ...STROKES], times.map((r, i) => [cs[i], ...r.map(mmss)]), 'Assume each swimmer keeps a constant speed throughout the race.')],
    stem: `In the ${STROKES[sIdx].toLowerCase()} final, how far behind the winner (metres) was the last-placed swimmer when the winner finished?`,
    key, fmt: (x) => g(x, 2) + ' m',
    mistakes: [
      M(gap(0, 3), 'Uses the fourth-placed swimmer.'),
      M(gap(0, 2), 'Uses the third-placed swimmer.'),
      M(gap(1, 4), 'Measures from the second-placed swimmer.'),
      M(gap(2, 4), 'Measures from the third-placed swimmer.'),
      ...[2, 3].map((o) => { const c = times.map((r) => r[(sIdx + o) % 4]).sort((a, b) => a - b); return M(200 * (1 - c[0] / c[4]), `Reads the ${STROKES[(sIdx + o) % 4].toLowerCase()} column.`); }),
      M(200 * (1 - o2[0] / o2[4]), `Reads the ${STROKES[other].toLowerCase()} column.`),
      M(200 * (col[order[4]] - col[order[0]]) / col[order[0]], 'Uses the winner\'s speed instead of the last-placed swimmer\'s.'),
      M(200 * (1 - col[0] / col[4]), 'Takes the first and last rows of the table instead of the fastest and slowest times.'),
    ],
    hints: ['Find the fastest and slowest times in the column.', 'Distance covered by the slower swimmer = speed × winner\'s time.'],
    solution: [`Data needed: winner ${cs[order[0]]} ${mmss(col[order[0]])}; last ${cs[order[4]]} ${mmss(col[order[4]])}.`,
      `Last-placed speed = 200 ÷ ${g(col[order[4]], 2)} = ${g(200 / col[order[4]], 5)} m/s.`,
      `Distance after ${g(col[order[0]], 2)} s = ${g(200 / col[order[4]], 5)} × ${g(col[order[0]], 2)} = ${g(200 - key, 3)} m.`,
      `Gap = 200 − ${g(200 - key, 3)} ≈ ${g(key, 3)} m.`],
    explanation: 'When the winner finishes, the slower swimmer has covered their own speed multiplied by the winner\'s time.',
  };
};

MED['Time to reach top speed'] = (R) => {
  const cs = R.pickN(NAMES, 5), evs = ['100 m', '200 m', '400 m', '800 m'];
  const t100 = [10.02, 10.15, 10.29, 10.42, 10.58].map((x) => Math.round((x + R.f(-0.05, 0.05, 2)) * 100) / 100);
  const sh = R.pickN([0, 1, 2, 3, 4], 5);
  const rows = cs.map((c, i) => [t100[sh[i]], R.f(20.1, 21, 2), R.f(44.8, 47.5, 2), R.f(103.5, 108, 1)]);
  const d = R.pick([20, 25, 30, 35]), vmax = R.f(11.6, 12.6, 2);
  const col = rows.map((r) => r[0]), order = col.map((t, i) => i).sort((a, b) => col[a] - col[b]);
  const Tw = col[order[0]], run = (100 - d) / vmax;
  const key = Tw - run;
  return {
    exhibits: [table('Athletics finals: winning times by country (seconds)', ['Country', ...evs], rows.map((r, i) => [cs[i], ...r.map((x, j) => g(x, j === 3 ? 1 : 2))]))],
    stem: `The 100 m winner accelerated to top speed over the first ${d} m, then held it, crossing the line at ${g(vmax, 2)} m/s. How long (seconds) did the winner take to reach top speed?`,
    key, fmt: (x) => g(x, 2) + ' s',
    mistakes: [
      M(2 * d / vmax, 'Assumes uniform acceleration from rest instead of using the race time.'),
      ...order.slice(1).map((i) => M(col[i] - run, `Uses ${cs[i]}'s time, which did not win the 100 m.`)),
    ],
    hints: ['The winner has the lowest 100 m time.', `The last ${100 - d} m were run at top speed.`],
    solution: [`Data needed: 100 m winner ${cs[order[0]]}, ${g(Tw, 2)} s.`,
      `Time at top speed = ${100 - d} ÷ ${g(vmax, 2)} = ${g(run, 4)} s.`,
      `Time to reach top speed = ${g(Tw, 2)} − ${g(run, 4)} ≈ ${g(key, 3)} s.`],
    explanation: 'Subtract the time spent at top speed over the rest of the race from the winner\'s total time.',
  };
};

/* ---------- hard models (four dependent stages, conditions in notes) ---------- */
HARD['NO share of all eligible voters'] = (R) => {
  const ds = ['District 1', 'District 2', 'District 3', 'District 4'];
  const yes = ds.map(() => R.i(2200, 4600)), no = ds.map(() => R.i(2200, 4600)), t = ds.map(() => R.f(62, 88, 2));
  const elig = ds.map((_, i) => (yes[i] + no[i]) * 100 / t[i]), E = sum(elig), votes = sum(yes) + sum(no);
  const key = 100 * sum(no) / E, avgT = sum(t) / 4;
  return {
    exhibits: [{ type: 'combo', title: 'Referendum results: votes and turnout by district (fictional data)', unit: 'votes', categories: ds,
      series: [{ name: 'Voted YES', values: yes }, { name: 'Voted NO', values: no }, { name: 'Turnout (%)', values: t, line: true }],
      note: 'Turnout = percentage of eligible voters who voted (YES or NO).' }],
    stem: 'What percentage of all eligible voters in the four districts voted NO?',
    key, fmt: (x) => g(x, 1) + '%',
    mistakes: [
      M(100 * sum(no) / votes, 'Gives NO as a share of votes cast, ignoring turnout.'),
      M(sum(no) / votes * avgT, 'Scales the NO share of votes by the simple average turnout.'),
      M(sum(ds.map((_, i) => no[i] * t[i] / (yes[i] + no[i]))) / 4, 'Averages the four district percentages without weighting.'),
      ...ds.map((d, i) => M(100 * sum(no) / (votes * 100 / t[i]), `Uses the turnout of ${d} for all four districts.`)),
      M(100 * sum(yes) / E, 'Uses the YES votes.'),
    ],
    hints: ['Rebuild each district\'s eligible voters from its own turnout.', 'Divide all NO votes by all eligible voters.'],
    solution: ['Data needed: YES, NO and turnout for each district.',
      ...ds.map((d, i) => `${d}: eligible = (${g(yes[i])} + ${g(no[i])}) ÷ ${g(t[i], 2)}% = ${g(elig[i], 2)}.`),
      `All eligible = ${g(E, 2)}; all NO = ${g(sum(no))}.`,
      `Share = ${g(sum(no))} ÷ ${g(E, 2)} × 100 ≈ ${g(key, 2)}%.`],
    explanation: 'Each district has its own turnout, so eligible voters must be rebuilt district by district before the NO votes are compared with them.',
  };
};

HARD['Per-capita gap after population change'] = (R) => {
  const cs = R.pickN(NAMES, 5), y = [2015, 2020];
  const rows = cs.map(() => { const p = R.i(2500, 24000), s = Math.round(p * R.f(1.5, 6, 3)); return [p, R.f(-6, 9, 1), s, Math.round(s * R.f(0.95, 1.35, 3))]; });
  const [a, b] = R.pickN([0, 1, 2, 3, 4], 2);
  const pc = (i, late = true) => late ? rows[i][3] / (rows[i][0] * (1 + rows[i][1] / 100)) : rows[i][3] / rows[i][0];
  let [x, z] = pc(a) > pc(b) ? [a, b] : [b, a];
  const key = (pc(x) / pc(z) - 1) * 100;
  if (key < 8) return null;
  return {
    exhibits: [table('Theatre tickets and population', ['Country', `Population ${y[0]} (thousand)`, `Population change ${y[0]}–${y[1]} (%)`, `Tickets ${y[0]} (thousand)`, `Tickets ${y[1]} (thousand)`], rows.map((r, i) => [cs[i], g(r[0]), (r[1] > 0 ? '+' : '') + g(r[1], 1), g(r[2]), g(r[3])]))],
    stem: `By what percentage were tickets per inhabitant in ${cs[x]} higher than in ${cs[z]} in ${y[1]}?`,
    key, fmt: (q) => g(q, 1) + '%',
    mistakes: [
      M((pc(x, false) / pc(z, false) - 1) * 100, `Uses the ${y[0]} populations without the change.`),
      M((1 - pc(z) / pc(x)) * 100, `Divides the difference by ${cs[x]}'s value instead of ${cs[z]}'s.`),
      M((rows[x][3] / rows[z][3] - 1) * 100, 'Compares total tickets, not tickets per inhabitant.'),
      M((pc(x) / pc(z, false) - 1) * 100, `Updates only ${cs[x]}'s population.`),
      M((pc(x, false) / pc(z) - 1) * 100, `Updates only ${cs[z]}'s population.`),
      M(((rows[x][2] / rows[x][0]) / (rows[z][2] / rows[z][0]) - 1) * 100, `Uses ${y[0]} tickets.`),
    ],
    hints: [`Update both populations to ${y[1]} first.`, `${cs[z]} is the base of the comparison.`],
    solution: [`Data needed: ${y[1]} tickets, ${y[0]} populations and the population changes for ${cs[x]} and ${cs[z]}.`,
      `${cs[x]}: ${g(rows[x][3])} ÷ (${g(rows[x][0])} × ${g(1 + rows[x][1] / 100, 3)}) = ${g(pc(x), 5)}.`,
      `${cs[z]}: ${g(rows[z][3])} ÷ (${g(rows[z][0])} × ${g(1 + rows[z][1] / 100, 3)}) = ${g(pc(z), 5)}.`,
      `Difference = (${g(pc(x), 5)} ÷ ${g(pc(z), 5)} − 1) × 100 ≈ ${g(key, 2)}%.`],
    explanation: 'Both per-capita values need the later populations; the country after "than" is the base.',
  };
};

HARD['Average after two changes'] = (R, v) => {
  const cs = R.pickN(NAMES, 4), k = v % 4;
  const data = cs.map(() => { const n = R.i(3, 7), U = R.i(12, 22), A = U + R.i(4, 9); return { n, U, A, Rr: A * (n + 1) - n * U }; });
  const x = data[k], up = R.i(2, 5), r = x.Rr - R.i(8, 16);
  const key = (x.n * (x.U + up) + r) / (x.n + 1);
  return {
    exhibits: [{ type: 'hbar', title: 'Average response times of emergency services (fictional data)', unit: 'minutes', categories: ['Urban', 'Rural', 'Overall'],
      series: data.map((d, i) => ({ name: cs[i], values: [d.U, d.Rr, d.A] })), note: 'Overall = average over all calls (urban and rural). Call numbers do not change.' }],
    stem: `If ${cs[k]}'s urban times rose by ${up} minutes and its rural average fell to ${r} minutes, what would its overall average be (minutes)?`,
    key, fmt: (y) => g(y, 2),
    mistakes: [
      M((x.U + up + r) / 2, 'Assumes equal numbers of urban and rural calls.'),
      M((x.U + up + x.n * r) / (x.n + 1), 'Puts the larger weight on the rural calls.'),
      M((x.n * x.U + r) / (x.n + 1), 'Leaves out the rise in urban times.'),
      M((x.n * (x.U + up) + x.Rr) / (x.n + 1), 'Leaves out the fall in rural times.'),
      M(x.A + up - (x.Rr - r), 'Adds and subtracts the changes in full.'),
    ],
    hints: ['Work out how many urban calls there are per rural call from the three averages.', 'Apply both changes, then weight them by the call mix.'],
    solution: [`Data needed: ${cs[k]} urban ${x.U}, rural ${x.Rr}, overall ${x.A} minutes.`,
      `Urban calls per rural call = (${x.Rr} − ${x.A}) ÷ (${x.A} − ${x.U}) = ${x.n}.`,
      `New times: urban ${x.U + up}, rural ${r}.`,
      `Overall = (${x.n} × ${x.U + up} + ${r}) ÷ ${x.n + 1} ≈ ${g(key, 3)} minutes.`],
    explanation: 'The three averages reveal the mix of calls, which then weights the two new times.',
  };
};

HARD['Top speed from a race time'] = (R, v) => {
  const cs = R.pickN(NAMES, 5), evs = ['100 m', '200 m', '400 m', '800 m'];
  const t100 = [10.02, 10.38, 10.75, 11.13, 11.52].map((x) => Math.round((x + R.f(-0.04, 0.04, 2)) * 100) / 100);
  const sh = R.pickN([0, 1, 2, 3, 4], 5);
  const rows = cs.map((c, i) => [t100[sh[i]], R.f(20.1, 21, 2), R.f(44.8, 47.5, 2), R.f(103.5, 108, 1)]);
  const d = R.pick([24, 28, 30, 32, 36]), place = 1 + (v % 3);
  const col = rows.map((r) => r[0]), order = col.map((t, i) => i).sort((a, b) => col[a] - col[b]), T = col[order[place]];
  const key = (100 + d) / T, word = ['winning', 'second', 'third', 'fourth'][place];
  return {
    exhibits: [table('Athletics finals: times by country (seconds)', ['Country', ...evs], rows.map((r, i) => [cs[i], ...r.map((x, j) => g(x, j === 3 ? 1 : 2))]),
      `Assume each sprinter accelerates uniformly from rest over the first ${d} m of the 100 m, then runs at a constant top speed.`)],
    stem: `What was the top speed (m/s) of the ${word}-placed athlete in the 100 m?`,
    key, fmt: (x) => g(x, 2) + ' m/s',
    mistakes: [
      M(100 / T, 'Gives the average speed over the whole race.'),
      M((100 + d / 2) / T, 'Takes the average speed while accelerating as two thirds of top speed.'),
      M((100 + 2 * d) / T, 'Doubles the acceleration distance.'),
      M((100 + d) / col[order[0]], 'Uses the winner\'s time.'),
      M((100 + d) / col[order[place + 1]], 'Uses the next athlete\'s time.'),
      M((100 + d) / col[order[place - 1]], 'Uses the previous athlete\'s time.'),
      M((100 + d) / rows[order[place]][1] * 2, 'Uses the 200 m time.'),
    ],
    hints: ['During uniform acceleration from rest, the average speed is half the top speed.', 'Write the race time as acceleration time + constant-speed time and solve for top speed.'],
    solution: [`Data needed: ${word}-placed ${cs[order[place]]}, ${g(T, 2)} s.`,
      `Acceleration time = ${d} ÷ (v ÷ 2) = ${2 * d} ÷ v.`,
      `Constant-speed time = ${100 - d} ÷ v.`,
      `${g(T, 2)} = (${2 * d} + ${100 - d}) ÷ v, so v = ${100 + d} ÷ ${g(T, 2)} ≈ ${g(key, 3)} m/s.`],
    explanation: 'Uniform acceleration from rest covers the first stretch at half the top speed, which adds the acceleration distance once more to the numerator.',
  };
};

HARD['Catching up at constant speeds'] = (R, v) => {
  const cs = R.pickN(NAMES, 5), evs = ['400 m', '800 m', '1,500 m'], dist = [400, 800, 1500];
  const rows = cs.map(() => [R.f(222, 238, 2), R.f(462, 490, 2), R.f(880, 930, 2)]);
  const e = v % 3, col = rows.map((r) => r[e]);
  const order = col.map((t, i) => i).sort((a, b) => col[a] - col[b]);
  const fast = order[0], slow = order[3];
  const L = R.pick([20, 25, 30, 40, 50]);
  const tf = col[fast], ts = col[slow], dl = (a, b) => L * col[b] / (col[b] - col[a]);
  const key = dl(fast, slow);
  if (key > dist[e] * 2.5 || key < 150) return null;
  return {
    exhibits: [table('Swimming freestyle finals: times (m:ss.ss)', ['Country', ...evs], rows.map((r, i) => [cs[i], ...r.map(mmss)]),
      'In training, swimmers swim at their average race speed for the stated event.')],
    stem: `In training, ${cs[slow]}'s swimmer starts ${L} m ahead of ${cs[fast]}'s, both at their ${evs[e]} race speeds. How far (metres) does ${cs[fast]}'s swimmer swim before drawing level?`,
    key, fmt: (x) => g(x, 1) + ' m',
    mistakes: [
      M(key - L, `Gives the distance swum by ${cs[slow]}'s swimmer.`),
      M(key + L, 'Adds the head start to the distance swum.'),
      M(dl(fast, order[4]), 'Uses the slowest swimmer\'s time.'),
      M(dl(fast, order[2]), 'Uses the third-fastest swimmer\'s time.'),
      M(dl(order[1], slow), 'Uses the second-fastest swimmer\'s time.'),
      M(L * dist[e] / (ts - tf), 'Divides the race distance by the time gap and multiplies by the head start.'),
    ],
    hints: ['The gap closes at the difference between the two speeds.', 'Time to draw level = head start ÷ speed difference; distance = faster speed × that time.'],
    solution: [`Data needed: ${evs[e]} times — ${cs[fast]} ${mmss(tf)}, ${cs[slow]} ${mmss(ts)}.`,
      `Speeds: ${dist[e]} ÷ ${g(tf, 2)} = ${g(dist[e] / tf, 5)} m/s and ${dist[e]} ÷ ${g(ts, 2)} = ${g(dist[e] / ts, 5)} m/s.`,
      `Time to draw level = ${L} ÷ ${g(dist[e] / tf - dist[e] / ts, 6)} = ${g(L / (dist[e] / tf - dist[e] / ts), 3)} s.`,
      `Distance = ${g(dist[e] / tf, 5)} × ${g(L / (dist[e] / tf - dist[e] / ts), 3)} ≈ ${g(key, 2)} m.`],
    explanation: 'The faster swimmer gains the speed difference every second; the head start sets how long that takes.',
  };
};

HARD['Missing value from a share of all types'] = (R, v) => {
  const cs = R.pickN(NAMES, 5), k = v % 5, p = R.pick([16, 18, 20, 22, 24, 25]);
  const rows = cs.map(() => [R.i(800, 2600), R.i(3000, 7000), R.i(1000, 3000)]);
  const othersAll = rows.filter((_, i) => i !== k).reduce((s, r) => s + sum(r), 0);
  const oth = (j) => sum(rows.filter((_, i) => i !== k).map((r) => r[j]));
  const total = othersAll * p / (100 - p), [U, , E] = rows[k], key = total - U - E;
  if (key < 1500) return null;
  return {
    exhibits: [table('Instruments sold', ['Country', 'Upright pianos', 'Grand pianos', 'Digital pianos'], rows.map((r, i) => [cs[i], g(r[0]), i === k ? '—' : g(r[1]), g(r[2])]),
      `${cs[k]} accounted for exactly ${p}% of all pianos of all types sold in the five countries.`)],
    stem: `How many grand pianos were sold in ${cs[k]}?`,
    key, fmt: (x) => g(x),
    mistakes: [
      M(othersAll * p / 100 - U - E, `Takes ${p}% of the other countries' sales instead of the five-country total.`),
      M(oth(1) * p / (100 - p), 'Applies the share to grand pianos only.'),
      M(total - U, 'Forgets to subtract the digital pianos.'),
      M(total - E, 'Forgets to subtract the upright pianos.'),
      M((othersAll + U + E) * p / 100 - U - E, `Takes ${p}% of a total that leaves out the missing value.`),
      M(othersAll * p / (100 + p) - U - E, `Divides by ${100 + p}% instead of ${100 - p}%.`),
    ],
    hints: [`The other four countries account for ${100 - p}% of all pianos.`, `Find ${cs[k]}'s total first, then remove the types you know.`],
    solution: [`Data needed: all pianos in the other four countries = ${g(othersAll)}; ${cs[k]} upright ${g(U)}, digital ${g(E)}.`,
      `${100 - p}% = ${g(othersAll)}, so ${cs[k]}'s total = ${g(othersAll)} × ${p} ÷ ${100 - p} = ${g(total, 2)}.`,
      `Known types in ${cs[k]} = ${g(U)} + ${g(E)} = ${g(U + E)}.`,
      `Grand pianos = ${g(total, 2)} − ${g(U + E)} ≈ ${g(key, 1)}.`],
    explanation: 'The share is of all piano types, so rebuild the country total before isolating the missing type.',
  };
};

const SURVEY = ['a four-day working week', 'lowering the voting age to 16', 'a national rail pass', 'daylight saving time'];
const surveyLine = (R) => {
  const years = [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021];
  let a = R.i(30, 44), b = R.i(40, 52);
  const s = [], o = [];
  years.forEach(() => { s.push(a); o.push(b); a = Math.min(64, a + R.i(-1, 4)); b = Math.max(24, b - R.i(-1, 4)); if (a + b > 94) b = 94 - a; });
  return { years, s, o };
};
HARD['Change in a remainder group'] = (R, v) => {
  const years = [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021];
  const n = [], s = [], o = [];
  let nn = R.i(7, 11), ss = R.i(32, 42);
  years.forEach(() => { n.push(nn); s.push(ss); o.push(100 - nn - ss); nn = Math.min(22, nn + R.i(0, 2)); ss = Math.min(56, ss + R.i(-1, 3)); });
  const i1 = R.i(0, 2), i2 = R.i(5, 7), P1 = R.f(28, 90, 2), P2 = Math.round(P1 * R.f(1.05, 1.14, 3) * 100) / 100;
  const n1 = n[i1], n2 = n[i2], key = (n2 * P2 / (n1 * P1) - 1) * 100;
  if (key < 15) return null;
  return {
    exhibits: [{ type: 'line', title: `Survey: should the country introduce ${SURVEY[v % 4]}? (fictional data)`, unit: '% of adults', categories: years.map(String),
      series: [{ name: 'In favour', values: s }, { name: 'Against', values: o }], note: 'Adults who are neither in favour nor against have no opinion.' }],
    stem: `The adult population was ${g(P1, 2)} million in ${years[i1]} and ${g(P2, 2)} million in ${years[i2]}. By what percentage did the number with no opinion change?`,
    key, fmt: (x) => g(x, 1) + '%',
    mistakes: [
      M((n2 / n1 - 1) * 100, 'Ignores the change in population.'),
      M((1 - n1 * P1 / (n2 * P2)) * 100, `Divides the change by the ${years[i2]} number.`),
      M((n2 - n1) / n1 * 100 + (P2 / P1 - 1) * 100, 'Adds the two percentage changes instead of multiplying the factors.'),
      M((n[i2 - 1] * P2 / (n1 * P1) - 1) * 100, `Reads the ${years[i2 - 1]} values.`),
      M((n2 * P2 / (n[i1 + 1] * P1) - 1) * 100, `Reads the ${years[i1 + 1]} values.`),
      M(((n2 - n1) * P2 / (n1 * P1)) * 100, 'Applies the later population to the change only.'),
      ...(i2 + 1 < years.length ? [M((n[i2 + 1] * P2 / (n1 * P1) - 1) * 100, `Reads the ${years[i2 + 1]} values.`)] : []),
      ...(i1 > 0 ? [M((n2 * P2 / (n[i1 - 1] * P1) - 1) * 100, `Reads the ${years[i1 - 1]} values.`)] : []),
      M((n2 / n1 * (P2 / P1) ** 2 - 1) * 100, 'Applies the population growth twice.'),
    ],
    hints: ['No opinion = 100% − in favour − against.', 'Turn both shares into numbers of people before comparing.'],
    solution: [`Data needed: ${years[i1]} — ${s[i1]}% and ${o[i1]}%; ${years[i2]} — ${s[i2]}% and ${o[i2]}%.`,
      `No opinion: ${n1}% and ${n2}%.`,
      `People: ${n1}% × ${g(P1, 2)} = ${g(n1 * P1 / 100, 4)} million; ${n2}% × ${g(P2, 2)} = ${g(n2 * P2 / 100, 4)} million.`,
      `Change = (${g(n2 * P2 / 100, 4)} ÷ ${g(n1 * P1 / 100, 4)} − 1) × 100 ≈ ${g(key, 2)}%.`],
    explanation: 'The remainder share must be turned into people with each year\'s population before the change is measured.',
  };
};

HARD['Population from an unchanged group'] = (R, v) => {
  const { years, s, o } = surveyLine(R);
  const i1 = R.i(1, 5), i2 = i1 + 1;
  if (s[i1] === s[i2]) return null;
  const P1 = R.f(30, 95, 2), P2 = P1 * s[i1] / s[i2], key = P2 * o[i2] / 100;
  return {
    exhibits: [{ type: 'line', title: `Survey: should the country introduce ${SURVEY[(v + 2) % 4]}? (fictional data)`, unit: '% of adults', categories: years.map(String),
      series: [{ name: 'In favour', values: s }, { name: 'Against', values: o }] }],
    stem: `There were ${g(P1, 2)} million adults in ${years[i1]}. If the number in favour did not change from ${years[i1]} to ${years[i2]}, how many adults were against in ${years[i2]} (million)?`,
    key, fmt: (x) => g(x, 2),
    mistakes: [
      M(P1 * o[i2] / 100, `Uses the ${years[i1]} population.`),
      M(P1 * s[i2] / s[i1] * o[i2] / 100, 'Inverts the ratio of the two shares.'),
      M(P2 * o[i1] / 100, `Uses the ${years[i1]} share against.`),
      M(P1 * o[i1] / 100, 'Keeps the number against unchanged instead of the number in favour.'),
      M(P2 * (100 - s[i2]) / 100, 'Counts everyone not in favour as against.'),
      ...(i2 + 1 < years.length ? [M(P2 * o[i2 + 1] / 100, `Reads the ${years[i2 + 1]} share against.`)] : []),
      M(P1 * s[i1] / s[i2 - 1 >= 0 ? i2 - 1 : i2] * o[i2] / 100 * (i2 - 1 === i1 ? 0 : 1) || 0, `Reads the ${years[i1]} share in favour twice.`),
    ].filter((m) => m.v > 0),
    hints: ['If the number in favour is fixed, the population changes in inverse proportion to the share in favour.', `Find the ${years[i2]} population first.`],
    solution: [`Data needed: in favour ${s[i1]}% (${years[i1]}) and ${s[i2]}% (${years[i2]}); against ${o[i2]}% (${years[i2]}).`,
      `In favour = ${s[i1]}% × ${g(P1, 2)} = ${g(P1 * s[i1] / 100, 4)} million.`,
      `${years[i2]} population = ${g(P1 * s[i1] / 100, 4)} ÷ ${s[i2]}% = ${g(P2, 4)} million.`,
      `Against = ${g(P2, 4)} × ${o[i2]}% ≈ ${g(key, 3)} million.`],
    explanation: 'A fixed number with a changing share reveals the new population, which then gives the number against.',
  };
};

HARD['Projected share against a past amount'] = (R, v) => {
  const sh = pieData(R), T = R.f(180, 320, 2), yr = 2021 + (v % 3);
  const i = [3, 0, 1, 2, 4][v % 5], name = PIE_ITEMS[i], q = R.pick([2, 3, 4, 5, 6]), r = R.f(0.5, 2.5, 1);
  const past = Math.round(T * sh[i] / 100 * R.f(0.86, 0.95, 3) * 10) / 10;
  const proj = T * (1 + q / 100) * (sh[i] + r) / 100, key = (proj / past - 1) * 100;
  const pastAll = [0, 1, 2, 3, 4].map((j) => (j === i ? past : Math.round(T * sh[j] / 100 * R.f(0.82, 0.97, 3) * 10) / 10));
  const tab = table(`Waste in ${yr - 2} (million tonnes)`, ['Material', `${yr - 2}`], [0, 1, 2, 3, 4].map((j) => [PIE_ITEMS[j], g(pastAll[j], 1)]));
  return {
    exhibits: [{ type: 'pie', title: `Municipal waste by material, ${yr} (total ${g(T, 2)} million tonnes; fictional data)`, unit: '%', slices: PIE_ITEMS.map((l, j) => ({ label: l, value: sh[j] })) }, tab],
    stem: `In ${yr + 1}, total waste grows by ${q}% and the ${name.toLowerCase()} share rises by ${g(r, 1)} percentage points. By what percentage would ${name.toLowerCase()} waste then exceed its ${yr - 2} level?`,
    key, fmt: (x) => g(x, 1) + '%',
    mistakes: [
      M((T * (1 + q / 100) * sh[i] / 100 / past - 1) * 100, 'Leaves out the rise in share.'),
      M((T * (1 + q / 100) * sh[i] * (1 + r / 100) / 100 / past - 1) * 100, 'Treats the rise in share as a percentage, not percentage points.'),
      M((T * (sh[i] + r) / 100 / past - 1) * 100, 'Leaves out the growth in total waste.'),
      M((T * sh[i] / 100 / past - 1) * 100 + q + r, 'Adds the percentages instead of combining the factors.'),
      M((1 - past / proj) * 100, `Divides by the ${yr + 1} amount instead of the ${yr - 2} amount.`),
      ...[i - 1, i + 1].filter((j) => j >= 0 && j < 5).map((j) => M((proj / pastAll[j] - 1) * 100, `Reads the ${yr - 2} figure for ${PIE_ITEMS[j]}.`)),
      M((T * (1 + q / 100) ** 2 * (sh[i] + r) / 100 / past - 1) * 100, 'Applies the growth in total waste twice.'),
    ],
    hints: [`Build the ${yr + 1} total and the ${yr + 1} share separately.`, `Compare with the ${yr - 2} figure from the table.`],
    solution: [`Data needed: total ${g(T, 2)} million tonnes; ${name} ${g(sh[i], 1)}%; ${yr - 2} amount ${g(past, 1)} million tonnes.`,
      `${yr + 1} total = ${g(T, 2)} × ${g(1 + q / 100, 2)} = ${g(T * (1 + q / 100), 4)}.`,
      `${yr + 1} share = ${g(sh[i], 1)} + ${g(r, 1)} = ${g(sh[i] + r, 1)}%, so ${name} = ${g(proj, 4)} million tonnes.`,
      `Change = (${g(proj, 4)} ÷ ${g(past, 1)} − 1) × 100 ≈ ${g(key, 2)}%.`],
    explanation: 'A percentage-point change in share and a percentage growth in the total must be applied as separate factors.',
  };
};

HARD['Growth needed to hold a share'] = (R, v) => {
  const cs = R.pickN(NAMES, 5), yrs = [2010, 2015, 2020];
  const rows = cs.map(() => { const base = R.i(3000, 60000); return yrs.map(() => Math.round(base * R.f(0.93, 1.08, 3))); });
  const k = v % 5, s = v % 2 ? [1, 4] : [1, 3], frac = s[1] === 3 ? 'one third' : 'one quarter';
  const col = rows.map((r) => r[2]), X = col[k], O = sum(col) - X, q = R.pick([6, 8, 10, 12, 15]);
  const target = O * (1 + q / 100) * s[0] / (s[1] - s[0]), key = (target / X - 1) * 100;
  if (key < 8 || key > 90) return null;
  return {
    exhibits: [table('Rail freight (thousand tonnes)', ['Country', ...yrs.map(String)], rows.map((r, i) => [cs[i], ...r.map((x) => g(x))]),
      `From ${yrs[2]} to 2025, every other country's freight grows by ${q}%.`)],
    stem: `By what percentage would ${cs[k]}'s freight have to grow from ${yrs[2]} to 2025 for it to carry exactly ${frac} of the five countries' total in 2025?`,
    key, fmt: (x) => g(x, 1) + '%',
    mistakes: [
      M((O * s[0] / (s[1] - s[0]) / X - 1) * 100, `Leaves out the ${q}% growth of the other countries.`),
      M(((O + X) * (1 + q / 100) * s[0] / s[1] / X - 1) * 100, `Takes ${frac} of the grown total, as if ${cs[k]} also grew by ${q}%.`),
      M((O * s[0] / (s[1] - s[0]) / X - 1) * 100 + q, 'Adds the others\' growth to the required growth.'),
      M((O * (1 + q / 100) * s[0] / s[1] / X - 1) * 100, `Takes ${frac} of the other countries' grown freight.`),
      M((1 - X / target) * 100, 'Divides the increase by the 2025 target instead of the current value.'),
      M((target / rows[k][1] - 1) * 100, `Compares the target with ${cs[k]}'s ${yrs[1]} figure.`),
      M(((sum(rows.map((r) => r[1])) - rows[k][1]) * (1 + q / 100) * s[0] / (s[1] - s[0]) / X - 1) * 100, `Reads the other countries' ${yrs[1]} figures.`),
      M((O * (1 + q / 100) ** 2 * s[0] / (s[1] - s[0]) / X - 1) * 100, `Applies the ${q}% growth twice.`),
    ],
    hints: [`If ${cs[k]} carries ${frac}, the others carry the rest.`, 'Grow the others first, then find the target and compare it with today\'s figure.'],
    solution: [`Data needed: ${yrs[2]} column — ${cs[k]} ${g(X)}, others ${g(O)}.`,
      `Others in 2025 = ${g(O)} × ${g(1 + q / 100, 2)} = ${g(O * (1 + q / 100), 2)}.`,
      `${cs[k]}'s target = ${g(O * (1 + q / 100), 2)} × ${s[0]} ÷ ${s[1] - s[0]} = ${g(target, 2)}.`,
      `Required growth = (${g(target, 2)} ÷ ${g(X)} − 1) × 100 ≈ ${g(key, 2)}%.`],
    explanation: 'The target share is set against the others\' grown freight, so their growth enters before the required growth is found.',
  };
};

HARD['Turnout needed to change the result'] = (R, v) => {
  const ds = ['District 1', 'District 2', 'District 3', 'District 4'];
  const yes = ds.map(() => R.i(2200, 4300)), no = ds.map(() => R.i(2400, 4600)), t = ds.map(() => R.f(58, 74, 2));
  const k = v % 4, deficit = sum(no) - sum(yes);
  const votes = sum(yes) + sum(no), elig = (yes[k] + no[k]) * 100 / t[k], key = t[k] + 100 * deficit / elig;
  if (deficit < 300 || key > 96) return null;
  return {
    exhibits: [{ type: 'combo', title: 'Referendum results: votes and turnout by district (fictional data)', unit: 'votes', categories: ds,
      series: [{ name: 'Voted YES', values: yes }, { name: 'Voted NO', values: no }, { name: 'Turnout (%)', values: t, line: true }],
      note: 'Turnout = percentage of eligible voters who voted (YES or NO). The side with more votes in all four districts combined wins.' }],
    stem: `If every additional voter in ${ds[k]} had voted YES, what turnout (%) in ${ds[k]} would have produced a tie overall?`,
    key, fmt: (x) => g(x, 1) + '%',
    mistakes: [
      M(t[k] + 100 * deficit / (yes[k] + no[k]), 'Measures the extra votes against the votes cast instead of the eligible voters.'),
      M(t[k] + 50 * deficit / elig, 'Halves the NO lead, as if each extra vote also removed a NO vote.'),
      M(t[k] + 100 * (no[k] - yes[k]) / elig, `Uses only ${ds[k]}'s NO lead.`),
      M(t[k] + 100 * deficit / (votes * 100 / t[k]), `Spreads the NO lead over all four districts' eligible voters.`),
      M(t[k] * (1 + deficit / (yes[k] + no[k])), 'Raises the turnout in proportion to the votes needed.'),
      M(t[k] + 200 * deficit / elig, 'Doubles the NO lead.'),
    ],
    hints: ['YES needs as many extra votes as the overall NO lead.', `Turn those votes into percentage points of ${ds[k]}'s eligible voters.`],
    solution: [`Data needed: all YES and NO votes; ${ds[k]} turnout ${g(t[k], 2)}%.`,
      `Overall NO lead = ${g(sum(no))} − ${g(sum(yes))} = ${g(deficit)}.`,
      `${ds[k]} eligible = ${g(yes[k] + no[k])} ÷ ${g(t[k], 2)}% = ${g(elig, 2)}.`,
      `Required turnout = ${g(t[k], 2)} + ${g(deficit)} ÷ ${g(elig, 2)} × 100 ≈ ${g(key, 2)}%.`],
    explanation: 'The extra YES votes must cover the overall NO lead, and each percentage point of turnout is one hundredth of the district\'s eligible voters.',
  };
};

HARD['Efficiency needed to keep a ratio'] = (R, v) => {
  const orgs = R.pickN(['Helping Hands', 'Open Doors', 'Bridge Builders', 'Clean Rivers', 'Next Step', 'Green Roots', 'Safe Harbour', 'Bright Start'], 4);
  const rows = orgs.map(() => { const n = R.i(18, 60), e = R.i(20, 90); return [n, e, Math.round(e * R.f(3, 7.5, 2))]; });
  const k = v % 4, [n, E, F] = rows[k], a = R.pick([10, 15, 20, 25]), b = R.pick([5, 8, 12, 30]);
  if (a === b) return null;
  const key = F * (1 + a / 100) / (E * (1 + b / 100));
  return {
    exhibits: [table('Fundraising this year', ['NGO', 'Fundraisers', 'Fundraising spending (EUR thousand)', 'Funds raised (EUR thousand)'], rows.map((r, i) => [orgs[i], ...r.map((x) => g(x))]),
      `Next year, ${orgs[k]} will have ${a}% more fundraisers and spend ${b}% more on fundraising.`)],
    stem: `What funding efficiency (EUR raised per EUR spent) would ${orgs[k]} need next year to keep funds raised per fundraiser at this year's level?`,
    key, fmt: (x) => g(x, 2),
    mistakes: [
      M(F / E, 'Gives this year\'s efficiency.'),
      M(F * (1 + b / 100) / (E * (1 + a / 100)), 'Swaps the growth of fundraisers and spending.'),
      M(F * (1 + a / 100) / E, 'Leaves out the rise in spending.'),
      M(F / (E * (1 + b / 100)), 'Leaves out the rise in fundraisers.'),
      M(F / E * (1 + (a - b) / 100), 'Adjusts by the difference of the two percentages.'),
    ],
    hints: ['Funds raised = efficiency × spending.', 'Keeping funds per fundraiser fixed means funds raised must grow with the number of fundraisers.'],
    solution: [`Data needed: ${orgs[k]} — ${n} fundraisers, spending EUR ${g(E)} thousand, funds raised EUR ${g(F)} thousand.`,
      `Funds per fundraiser now = ${g(F)} ÷ ${n} = ${g(F / n, 4)}.`,
      `Next year funds needed = ${g(F / n, 4)} × ${g(n * (1 + a / 100), 2)} = ${g(F * (1 + a / 100), 2)}; spending = ${g(E * (1 + b / 100), 2)}.`,
      `Efficiency = ${g(F * (1 + a / 100), 2)} ÷ ${g(E * (1 + b / 100), 2)} ≈ ${g(key, 3)}.`],
    explanation: 'Funds raised must grow with the fundraisers while spending grows by its own rate; efficiency is their ratio.',
  };
};

HARD['Equivalent ticket price'] = (R) => {
  const sizes = [2, 3, 4, 5], cnt = sizes.map(() => R.i(3, 14));
  const h = R.pick([2, 2.5, 3, 3.5]), c = R.pick([6, 7.5, 8, 9, 10]), fee = R.pick([1, 1.5, 2, 2.5]), N = R.pick([60, 75, 80, 90, 120]), K = R.pick([120, 150, 180, 200, 250]);
  const prev = cnt.map((x) => Math.max(1, x + R.i(-3, 3))), sun = cnt.map((x) => Math.max(1, x + R.i(-4, 2)));
  const sg = sum(sun), sp = sum(sun.map((n, i) => n * sizes[i]));
  const groups = sum(cnt), people = sum(cnt.map((n, i) => n * sizes[i]));
  const pg = sum(prev), pp = sum(prev.map((n, i) => n * sizes[i]));
  const income = groups * h * c + people * fee, key = (income + K) / N;
  return {
    exhibits: [{ type: 'bar', title: 'Billiard hall: groups by day (fictional data)', unit: 'groups', categories: sizes.map((s) => `Groups of ${s}`),
      series: [{ name: 'Friday', values: prev }, { name: 'Saturday', values: cnt }, { name: 'Sunday', values: sun }],
      note: `Each group rents one table at EUR ${g(c, 2)} per hour for an average of ${g(h, 1)} hours. Every player also pays an entry fee of EUR ${g(fee, 2)}.` }],
    stem: `The hall could instead host a concert on Saturday for ${N} paying guests, with costs of EUR ${K}. What ticket price would give the same net income as the billiards?`,
    key, fmt: (x) => 'EUR ' + g(x, 2),
    mistakes: [
      M((groups * h * c + K) / N, 'Leaves out the players\' entry fees.'),
      M(income / N, 'Leaves out the concert costs.'),
      M((people * h * c + people * fee + K) / N, 'Charges a table per player instead of per group.'),
      M((groups * h * c + groups * fee + K) / N, 'Charges the entry fee per group instead of per player.'),
      M((income - K) / N, 'Subtracts the concert costs instead of adding them.'),
      M((pg * h * c + pp * fee + K) / N, 'Reads the Friday bars.'),
      M((sg * h * c + sp * fee + K) / N, 'Reads the Sunday bars.'),
      M((groups * c + people * fee + K) / N, 'Leaves out the hours played.'),
      M((groups * h * c + people * fee + 2 * K) / N, 'Counts the concert costs twice.'),
    ].filter((m) => m.v > 0),
    hints: ['Count groups for table income and players for entry fees.', 'Ticket income minus costs must equal the billiards income.'],
    solution: [`Data needed: Saturday groups ${cnt.join(', ')} (sizes ${sizes.join(', ')}).`,
      `Groups = ${groups}; players = ${people}.`,
      `Billiards income = ${groups} × ${g(h, 1)} × ${g(c, 2)} + ${people} × ${g(fee, 2)} = EUR ${g(income, 2)}.`,
      `Ticket price = (${g(income, 2)} + ${K}) ÷ ${N} ≈ EUR ${g(key, 3)}.`],
    explanation: 'Table income depends on groups, entry fees on players; the concert must cover its costs on top.',
  };
};

HARD['Pension spending in euros'] = (R) => {
  const cs = R.pickN(NAMES, 4), cur = ['ALD', 'BRV', 'CLM', 'DNK', 'EST', 'FRN'];
  const rows = cs.map(() => [R.f(2.5, 19, 1), R.f(14, 24, 1), R.i(600, 9000)]);
  const rate = cs.map(() => R.f(1.8, 40, 2)), pay = cs.map(() => R.pick([12, 13, 14]));
  const [a, b] = R.pickN([0, 1, 2, 3], 2);
  if (pay[a] === pay[b] && rate[a] / rate[b] > 0.8 && rate[a] / rate[b] < 1.25) return null;
  const spend = (i, n = pay[i], rr = rate[i]) => rows[i][0] * rows[i][1] / 100 * rows[i][2] * n / rr;
  const key = spend(a) + spend(b);
  const curs = R.pickN(cur, 4);
  return {
    exhibits: [table('Pensions', ['Country', 'Population (million)', 'Pensioners (% of population)', 'Average pension per payment (national currency)', 'Payments per year'], rows.map((r, i) => [cs[i], g(r[0], 1), g(r[1], 1), g(r[2]) + ' ' + curs[i], String(pay[i])])),
      table('Exchange rates', ['Currency', 'Units per EUR'], curs.map((c, i) => [c, g(rate[i], 2)]))],
    stem: `What was the combined annual pension spending of ${cs[a]} and ${cs[b]} (EUR million)?`,
    key, fmt: (x) => 'EUR ' + g(x, 1) + ' million',
    mistakes: [
      M(spend(a, 12) + spend(b, 12), 'Assumes twelve payments a year in both countries.'),
      M(spend(a, pay[a], rate[b]) + spend(b, pay[b], rate[a]), 'Swaps the two exchange rates.'),
      M(spend(a, pay[b]) + spend(b, pay[a]), 'Swaps the numbers of payments.'),
      M(spend(a, 14) + spend(b, 14), 'Assumes fourteen payments a year in both countries.'),
      M(spend(a) + spend(b) * rows[a][1] / rows[b][1], `Applies ${cs[a]}'s pensioner share to both countries.`),
    ],
    hints: ['Pensioners = population × share; spending = pensioners × pension × payments.', 'Divide by units per euro to convert.'],
    solution: [`Data needed: both countries' population, pensioner share, pension, payments and exchange rate.`,
      `${cs[a]}: ${g(rows[a][0], 1)} × ${g(rows[a][1], 1)}% × ${g(rows[a][2])} × ${pay[a]} ÷ ${g(rate[a], 2)} = EUR ${g(spend(a), 3)} million.`,
      `${cs[b]}: ${g(rows[b][0], 1)} × ${g(rows[b][1], 1)}% × ${g(rows[b][2])} × ${pay[b]} ÷ ${g(rate[b], 2)} = EUR ${g(spend(b), 3)} million.`,
      `Total ≈ EUR ${g(key, 2)} million.`],
    explanation: 'Each country needs its own pensioner count, number of payments and exchange rate before the totals are added.',
  };
};

/* ---------- option assembly ---------- */
const parseNum = (s) => parseFloat(String(s).replace(/[−–]/g, '-').replace(/,/g, '').match(/-?\d+(\.\d+)?/)[0]);
function shown(exhibits) {
  const out = new Set();
  exhibits.forEach((ex) => {
    if (ex.type === 'table') ex.rows.forEach((r) => r.slice(1).forEach((c) => { const m = String(c).replace(/,/g, '').match(/-?\d+(\.\d+)?/); if (m) out.add(parseFloat(m[0])); }));
    else if (ex.type === 'pie') ex.slices.forEach((s) => out.add(s.value));
    else ex.series.forEach((s) => s.values.forEach((x) => out.add(x)));
  });
  return out;
}
// Returns the feasible key positions and a function building the options for a chosen position.
function layout(t) {
  if (t.category) {
    const { names, key, notes } = t.category;
    return { ks: [0, 1, 2, 3, 4], build: (k) => { const others = names.map((_, i) => i).filter((i) => i !== key); const ord = others.slice(0, k).concat([key], others.slice(k)); return { options: ord.map((i) => names[i]), answer: k, optionNotes: ord.map((i) => (i === key ? `Correct. ${names[key]} has the required rank by percentage increase.` : notes[i])) }; } };
  }
  const { key, fmt } = t, ks = fmt(key), sh = shown(t.exhibits);
  if (!(key > 0) || fmt(key * (1 + 1e-7)) !== fmt(key * (1 - 1e-7))) return null;
  const pool = [];
  for (const m of t.mistakes) {
    if (!isFinite(m.v) || m.v <= 0) continue;
    const s = fmt(m.v), pv = parseNum(s);
    if (s === ks || sh.has(pv) || pv / parseNum(ks) < 0.7 || pv / parseNum(ks) > 1.4) continue;
    if (Math.abs(m.v - key) / key < 0.03 || pool.some((p) => Math.abs(p.v - m.v) / key < 0.03)) continue;
    pool.push({ ...m, s });
  }
  const below = pool.filter((p) => p.v < key).sort((a, b) => b.v - a.v), above = pool.filter((p) => p.v > key).sort((a, b) => a.v - b.v);
  const res = [];
  for (let k = 0; k <= 4; k++) if (below.length >= k && above.length >= 4 - k) res.push(k);
  return { ks: res, build: (k) => {
    const chosen = below.slice(0, k).reverse().concat([{ v: key, s: ks, key: true }], above.slice(0, 4 - k));
    return { options: chosen.map((c) => c.s), answer: k, optionNotes: chosen.map((c) => (c.key ? `Correct. ${t.explanation}` : c.note)) };
  } };
}

/* ---------- placement ---------- */
const MED_NAMES = Object.keys(MED), HARD_NAMES = Object.keys(HARD);
const loadSet = (file) => { const sets = []; vm.runInNewContext(fs.readFileSync(file, 'utf8'), { EPSO_BANK: { registerSet: (s) => sets.push(s) } }); return sets[0]; };
const contentHash = (q) => { const c = { ...q }; delete c.id; return crypto.createHash('sha256').update(JSON.stringify(c)).digest('hex'); };

function makeItem(name, level, variant, attempt, mustK = null) {
  const fn = (level === 2 ? MED : HARD)[name];
  for (let a = attempt; a < attempt + 1500; a++) {
    const R = mk(mkRng(strSeed(`${name}|${variant}|${a}`)));
    const t = fn(R, variant);
    if (!t) continue;
    const lay = layout(t);
    if (lay && lay.ks.length && (mustK === null || lay.ks.includes(mustK))) return { t, lay, attempt: a };
  }
  if (mustK !== null) return null;
  throw Error('no usable data for ' + name + ' variant ' + variant);
}

// Choose key letters: each item needs one of its feasible positions; targets give the wanted count per letter.
function assign(items, targets) {
  const order = items.map((_, i) => i).sort((a, b) => items[a].lay.ks.length - items[b].lay.ks.length), pick = [];
  const left = targets.slice();
  const go = (n) => {
    if (n === order.length) return true;
    const i = order[n];
    for (const k of items[i].lay.ks.slice().sort((a, b) => left[b] - left[a])) {
      if (left[k] <= 0) continue;
      left[k]--; pick[i] = k;
      if (go(n + 1)) return true;
      left[k]++;
    }
    return false;
  };
  return go(0) ? pick : null;
}

export function applyEuFormat(root) {
  const dir = path.join(root, 'questions/numerical');
  const files = Array.from({ length: 11 }, (_, i) => path.join(dir, `numerical-set-${String(i + 1).padStart(2, '0')}.js`));
  const sets = files.map(loadSet);
  const used = {};
  const slots = [];
  // Challenge sets first: set s uses ten consecutive hard models (mod 14), so no model repeats inside a set.
  sets.forEach((set, si) => set.questions.forEach((q, qi) => {
    if (q.difficulty === 2) return;
    slots.push({ si, qi, level: q.difficulty === 1 ? 2 : 3, challenge: !!set.challenge });
  }));
  const chall = slots.filter((s) => s.challenge), hard0 = slots.filter((s) => !s.challenge && s.level === 3), med = slots.filter((s) => s.level === 2);
  const bySet = {};
  chall.forEach((s) => { (bySet[s.si] = bySet[s.si] || []).push(s); });
  Object.values(bySet).forEach((list, n) => list.forEach((s, j) => { s.name = HARD_NAMES[(n * 10 + j) % HARD_NAMES.length]; }));
  hard0.forEach((s, j) => { s.name = HARD_NAMES[j % HARD_NAMES.length]; });
  med.forEach((s, j) => { s.name = MED_NAMES[j % MED_NAMES.length]; });
  for (const s of [...chall, ...hard0, ...med]) { s.variant = used[s.name] = (used[s.name] ?? -1) + 1; s.attempt = 0; }
  // Build and place per set with balanced key letters.
  sets.forEach((set, si) => {
    const mine = slots.filter((s) => s.si === si);
    if (!mine.length) return;
    let targets;
    if (set.challenge) targets = [2, 2, 2, 2, 2];
    else {
      const counts = [0, 0, 0, 0, 0];
      set.questions.forEach((q, qi) => { if (!mine.some((s) => s.qi === qi)) counts[q.answer]++; });
      const total = set.questions.length, want = Math.ceil(total / 5) + 3;
      targets = counts.map((c) => Math.max(0, want - c));
      while (sum(targets) < mine.length) targets[targets.indexOf(Math.min(...targets))]++;
    }
    for (let round = 0; round < 200; round++) {
      mine.forEach((s) => { if (!s.built || s.rebuild) { s.built = makeItem(s.name, s.level, s.variant, s.attempt); s.attempt = s.built.attempt; s.rebuild = false; } });
      const pick = assign(mine.map((s) => s.built), targets);
      if (pick) { mine.forEach((s, i) => { s.k = pick[i]; }); break; }
      // Find the letter with the least support and rebuild one item so that it can take that letter.
      const support = targets.map((n, k) => mine.filter((x) => x.built.lay.ks.includes(k)).length - n);
      const need = support.indexOf(Math.min(...support));
      const cands = mine.filter((x) => !x.built.lay.ks.includes(need)).sort((a, b) => a.built.lay.ks.length - b.built.lay.ks.length);
      const order = cands.length ? cands : mine;
      let done = false;
      for (let c = 0; c < order.length && !done; c++) {
        const x = order[(c + round) % order.length], alt = makeItem(x.name, x.level, x.variant, x.built.attempt + 1, need);
        if (alt) { x.built = alt; x.attempt = alt.attempt; done = true; }
      }
      if (!done) { const x = mine[round % mine.length]; x.attempt = x.built.attempt + 1; x.rebuild = true; }
      if (round === 199) throw Error('cannot balance key letters in ' + set.id);
    }
    mine.forEach((s) => {
      const old = set.questions[s.qi], { t, lay } = s.built, built = lay.build(s.k);
      const base = old.id.replace(/-r\d+$/, '');
      const q = { id: base + '-eu', supersedes: old.id, topic: s.name, difficulty: s.level };
      if (s.challenge) q.challenge = true;
      if (t.category) q.answerType = 'category';
      Object.assign(q, { exhibits: t.exhibits, stem: t.stem, options: built.options, answer: built.answer, hints: t.hints,
        solution: [...t.solution, `Answer: ${built.options[built.answer]}.`], optionNotes: built.optionNotes, explanation: t.explanation });
      if (numericalDifficulty(q) !== s.level) throw Error('rubric level mismatch for ' + s.name);
      set.questions[s.qi] = q;
    });
    if (set.challenge) set.description = 'Ten hard data-interpretation questions in the EU Training style: short questions on tables and charts, with conditions in notes and physics included.';
    fs.writeFileSync(files[si], '/* Generated by scripts/generators/numerical.mjs (EU-format pass in numerical-eu.mjs). Edit the generators, not this file. */\nEPSO_BANK.registerSet(' + JSON.stringify(set, null, 2) + ');\n');
  });
  // Fingerprints: new ids are immutable once recorded.
  const printFile = path.join(root, 'scripts/generators/numerical-eu-fingerprints.json');
  const prints = fs.existsSync(printFile) ? JSON.parse(fs.readFileSync(printFile)) : null, fresh = {};
  sets.forEach((set) => set.questions.forEach((q) => { if (/-eu$/.test(q.id)) fresh[q.id] = contentHash(q); }));
  if (prints) Object.entries(fresh).forEach(([id, h]) => { if (prints[id] !== h) throw Error(`EU-format item ${id} changed: give revised content a new id`); });
  else fs.writeFileSync(printFile, JSON.stringify(fresh, null, 2) + '\n');
  console.log('numerical EU format:', Object.keys(fresh).length, 'items (', med.length, 'medium,', chall.length + hard0.length, 'hard )');
}

// Diagnostic for authors: feasible key positions per model over the first variants.
export function diagnoseEu(variants = 8) {
  const out = {};
  for (const set of [MED, HARD]) for (const name of Object.keys(set)) {
    out[name] = [];
    for (let v = 0; v < variants; v++) {
      let ok = 0, ks = new Set(), err = null;
      for (let a = 0; a < 60; a++) {
        try { const t = set[name](mk(mkRng(strSeed(`${name}|${v}|${a}`))), v); if (!t) continue; const l = layout(t); if (l && l.ks.length) { ok++; l.ks.forEach((k) => ks.add(k)); } } catch (e) { err = e.message; }
      }
      out[name].push(`${ok}/60 [${[...ks].sort().join('')}]${err ? ' ERR ' + err : ''}`);
    }
  }
  return out;
}
export function sampleEu(name, v = 0, a = 0) {
  const fn = MED[name] || HARD[name], t = fn(mk(mkRng(strSeed(`${name}|${v}|${a}`))), v);
  if (!t) return 'null';
  if (t.category) return 'category';
  return [`key ${t.fmt(t.key)}`, ...t.mistakes.map((m) => `${(m.v / t.key).toFixed(3)} ${t.fmt(m.v)} ${m.note.slice(0, 50)}`)].join('\n');
}
