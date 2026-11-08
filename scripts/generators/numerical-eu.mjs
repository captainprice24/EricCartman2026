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
// '=' when the shown value is exact, '≈' when it is rounded.
const ap = (x, d) => (Math.abs(x - Number(x.toFixed(d))) < 1e-9 ? '= ' : '≈ ') + g(x, d);
const wasteOf = (name) => name.toLowerCase().replace(/ waste$/, '') + ' waste';
const an = (w) => (/^[aeiou]/i.test(w) ? 'an ' : 'a ') + w;
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
  const k = v % 4, share = no[k] / (yes[k] + no[k]), land = R.pick(NAMES), year = R.i(2016, 2024);
  const key = t[k] * share;
  const others = ds.map((_, i) => i).filter((i) => i !== k);
  return {
    exhibits: [{ type: 'combo', title: `${land}: referendum votes and turnout by district (fictional data)`, unit: 'votes', categories: ds,
      series: [{ name: 'Voted YES', values: yes }, { name: 'Voted NO', values: no }, { name: 'Turnout (%)', values: t, line: true }],
      note: 'Turnout = percentage of eligible voters who voted (YES or NO).' }],
    stem: `In ${land}'s ${year} referendum, what percentage of the eligible voters of ${ds[k]} voted NO?`,
    key, fmt: (x) => g(x, 1) + '%',
    mistakes: [
      M(100 * share, 'Gives NO as a share of the votes cast, ignoring that only the turnout share of eligible voters voted.'),
      M(t[k] * yes[k] / (yes[k] + no[k]), 'Uses the YES votes instead of the NO votes.'),
      ...others.map((i) => M(t[i] * share, `Applies the turnout of ${ds[i]} instead of ${ds[k]}.`)),
      M(100 * share - (100 - t[k]), 'Subtracts the non-voters\' percentage points from the NO share of votes cast.'),
    ],
    hints: ['Turnout tells you what share of eligible voters voted at all.', 'NO voters as a share of eligible voters = NO share of votes cast × turnout.'],
    solution: [
      `${ds[k]}: YES ${g(yes[k])}, NO ${g(no[k])}, turnout ${g(t[k], 2)}%.`,
      `NO share of votes cast = ${g(no[k])} ÷ (${g(yes[k])} + ${g(no[k])}) = ${g(no[k])} ÷ ${g(yes[k] + no[k])} ${ap(100 * share, 3)}%.`,
      `Only ${g(t[k], 2)}% of eligible voters voted, so NO share of eligible voters = ${g(100 * share, 3)}% × ${g(t[k], 2)}% ${ap(key, 2)}%.`],
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
    solution: [
      `${orgs[k]}: spending Y1 EUR ${x.e} thousand, efficiency Y2 ${g(x.eff, 2)}, fundraisers Y2 ${x.f2}.`,
      `Spending Y2 = ${x.e} × ${g(1 + p / 100, 2)} ${ap(x.e * (1 + p / 100), 2)} thousand EUR.`,
      `Funds raised Y2 = ${g(x.e * (1 + p / 100), 2)} × ${g(x.eff, 2)} ${ap(x.e * (1 + p / 100) * x.eff, 3)} thousand EUR = EUR ${g(raised(x.e * (1 + p / 100)), 0)}.`,
      `Per fundraiser = ${g(raised(x.e * (1 + p / 100)), 0)} ÷ ${x.f2} ${ap(key, 1).replace(/[\d,.]+$/, (m) => 'EUR ' + m)}.`],
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
    solution: [
      `${cs[k]}: population ${g(P)} thousand and sales ${g(S1)} thousand in ${yrs[0]}; sales ${g(S3)} thousand in ${yrs[2]}.`,
      `Sales per inhabitant ${yrs[0]} = ${g(S1)} ÷ ${g(P)} ${ap(pc, 4)}.`,
      `Sales per inhabitant ${yrs[2]} = ${g(pc, 4)} × ${g(1 + p / 100, 2)} ${ap(pc * (1 + p / 100), 4)}.`,
      `Population ${yrs[2]} = sales ÷ sales per inhabitant = ${g(S3)} ÷ ${g(pc * (1 + p / 100), 4)} ${ap(key, 1)} thousand.`],
    explanation: 'Population follows from dividing the later sales by the later sales per inhabitant.',
  };
};

MED['Constant annual increase'] = (R, v) => {
  const cs = R.pickN(NAMES, 5), yrs = [2017, 2019, 2022];
  const rows = cs.map(() => { const a = R.i(6000, 70000); const b = Math.round(a * R.f(1.04, 1.12, 3)); return [a, b, Math.round(b * R.f(1.24, 1.42, 3))]; });
  const k = v % 5, [S1, S2, S4] = rows[k], D = S4 - S2, step = D / 3;
  const key = S4 + 2 * step;
  return {
    exhibits: [{ type: 'bar', title: 'Cinema admissions (thousand; fictional data)', unit: 'thousand', categories: cs, series: yrs.map((y, j) => ({ name: String(y), values: rows.map((r) => r[j]) })) }],
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
    solution: [
      `${cs[k]}: ${g(S2)} thousand in ${yrs[1]} and ${g(S4)} thousand in ${yrs[2]}, which are ${yrs[2] - yrs[1]} years apart.`,
      `Annual increase = (${g(S4)} − ${g(S2)}) ÷ 3 = ${g(D)} ÷ 3 ${ap(step, 1)} thousand.`,
      `${yrs[2] + 2} is two years after ${yrs[2]}: ${g(S4)} + 2 × ${g(step, 1)} ${ap(key, 1)} thousand.`],
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
    solution: [
      `Grand pianos in the other four countries: ${rows.map((r, i) => i).filter((i) => i !== k).map((i) => g(rows[i][2])).join(' + ')} = ${g(O)}.`,
      `These are the other ${100 - p}%, so ${cs[k]}'s ${p}% = ${g(O)} × ${p} ÷ ${100 - p} ${ap(G, 1)}.`,
      `All types in ${cs[k]} = ${g(U)} upright + ${g(G, 1)} grand + ${g(E)} electric ${ap(key, 1)}.`],
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
    solution: [
      `${cs[k]}: urban time ${x.U} minutes (unchanged); new rural time ${r} minutes.`,
      `${x.n} urban calls for every rural call means weights ${x.n} : 1, ${x.n + 1} calls in all.`,
      `New overall = (${x.n} × ${x.U} + ${r}) ÷ ${x.n + 1} = ${x.n * x.U + r} ÷ ${x.n + 1} ${ap(key, 2)} minutes.`],
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
      solution: [`With an unchanged total, each share moves in proportion to generation, so percentage increase = (${yrs[3]} share − ${yrs[2]} share) ÷ ${yrs[2]} share.`,
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
    exhibits: [{ type: 'bar', title: 'Freight carried (thousand tonnes; fictional data)', unit: 'thousand tonnes', categories: cs, series: yrs.map((y, j) => ({ name: String(y), values: rows.map((r) => r[j]) })) }],
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
    solution: [
      `${yrs[y]} freight of the other four countries: ${rows.map((r, i) => i).filter((i) => i !== k).map((i) => g(rows[i][y])).join(' + ')} = ${g(O)}.`,
      `${frac[0].toUpperCase() + frac.slice(1)} of the total means ${cs[k]} has ${s[0]} part and the others ${s[1] - s[0]} parts.`,
      `${cs[k]} = ${g(O)} × ${s[0]} ÷ ${s[1] - s[0]} ${ap(key, 1)} thousand tonnes.`],
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
    solution: [
      `Agree somewhat: ${A[1]}% (18–34), ${B[1]}% (35–59), ${C[1]}% (60 and over); group sizes ${q[0]}%, ${q[1]}% and 100 − ${q[0]} − ${q[1]} = ${q[2]}% of ${g(P, 1)} million.`,
      `18–34: ${g(P, 1)} × ${q[0]}% × ${A[1]}% ${ap(P * q[0] * A[1] / 10000, 4)} million.`,
      `35–59: ${g(P, 1)} × ${q[1]}% × ${B[1]}% ${ap(P * q[1] * B[1] / 10000, 4)} million; 60 and over: ${g(P, 1)} × ${q[2]}% × ${C[1]}% ${ap(P * q[2] * C[1] / 10000, 4)} million.`,
      `Total ${ap(key, 3)} million.`],
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
    solution: [
      `${cs[k]}: population ${g(P, 1)} million, pensioners ${g(sh, 1)}%, average monthly pension EUR ${g(pen)}.`,
      `Pensioners = ${g(P, 1)} million × ${g(sh, 1)}% ${ap(P * sh / 100, 4)} million.`,
      `Monthly spending = ${g(P * sh / 100, 4)} million × EUR ${g(pen)} ${ap(key, 2).replace(/[\d,.]+$/, (m) => 'EUR ' + m)} million.`],
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
    stem: `Total waste in ${yr} was ${g(d, 1)} million tonnes more than in ${yr - 1}. With the same distribution, how much ${wasteOf(name)} was there in ${yr - 1} (million tonnes)?`,
    key, fmt: (x) => g(x, 2),
    mistakes: [
      M(T * sh[i] / 100 - d, `Subtracts the whole ${g(d, 1)} million tonnes from the ${name.toLowerCase()} amount.`),
      M((T + d) * sh[i] / 100, `Adds the ${g(d, 1)} million tonnes instead of subtracting them.`),
      M(T * sh[i] / 100, `Gives the ${yr} amount.`),
      ...near.map((j) => M((T - d) * sh[j] / 100, `Reads the ${PIE_ITEMS[j]} slice.`)),
    ],
    hints: [`Find the ${yr - 1} total first.`, 'The same distribution means the same percentage applies.'],
    solution: [
      `${yr} total ${g(T, 2)} million tonnes (chart title); ${name} ${g(sh[i], 1)}%.`,
      `${yr - 1} total = ${g(T, 2)} − ${g(d, 1)} ${ap(T - d, 2)} million tonnes.`,
      `Same distribution, so ${name} in ${yr - 1} = ${g(T - d, 2)} × ${g(sh[i], 1)}% ${ap(key, 3)} million tonnes.`],
    explanation: 'The distribution is unchanged, so the same share applies to the smaller earlier total.',
  };
};

const STROKES = ['Freestyle', 'Backstroke', 'Breaststroke', 'Butterfly'];
MED['Distance gap at the finish'] = (R, v) => {
  const cs = R.pickN(NAMES, 5), base = [105, 116, 131, 114].map((b) => b + R.f(-1, 1, 2));
  const times = cs.map(() => base.map((b) => Math.round((b + R.f(0, 6.5, 2)) * 100) / 100));
  const sIdx = v % 4, col = times.map((r) => r[sIdx]), meet = R.pick(['Northern', 'Coastal', 'Alpine', 'Island', 'Lakeland', 'Capital', 'Valley', 'Border']);
  if (new Set(col).size < 5) return null;
  const order = col.map((t, i) => i).sort((a, b) => col[a] - col[b]);
  const gap = (a, b, c = col) => 200 * (1 - c[order[a]] / c[order[b]]);
  const key = gap(0, 4);
  const other = (sIdx + 1) % 4, col2 = times.map((r) => r[other]), o2 = col2.slice().sort((a, b) => a - b);
  return {
    exhibits: [table('200 m swimming finals: times (m:ss.ss)', ['Country', ...STROKES], times.map((r, i) => [cs[i], ...r.map(mmss)]), 'Assume each swimmer keeps a constant speed throughout the race.')],
    stem: `At the ${R.i(2015, 2024)} ${meet} championships, in the ${STROKES[sIdx].toLowerCase()} final, how far behind the winner (metres) was the last-placed swimmer when the winner finished?`,
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
    solution: [
      `Winner (fastest time) ${cs[order[0]]} ${mmss(col[order[0]])} = ${g(col[order[0]], 2)} s; last (slowest) ${cs[order[4]]} ${mmss(col[order[4]])} = ${g(col[order[4]], 2)} s.`,
      `Last-placed speed = 200 ÷ ${g(col[order[4]], 2)} ${ap(200 / col[order[4]], 4)} m/s.`,
      `When the winner finishes after ${g(col[order[0]], 2)} s, the last swimmer has covered ${g(200 / col[order[4]], 4)} × ${g(col[order[0]], 2)} ${ap(200 - key, 2)} m.`,
      `Gap = 200 − ${g(200 - key, 2)} ${ap(key, 2)} m (exact values kept until the end).`],
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
    solution: [
      `The 100 m winner has the lowest 100 m time: ${cs[order[0]]}, ${g(Tw, 2)} s.`,
      `After the first ${d} m the winner ran the remaining ${100 - d} m at ${g(vmax, 2)} m/s: ${100 - d} ÷ ${g(vmax, 2)} ${ap(run, 3)} s.`,
      `Time to reach top speed = ${g(Tw, 2)} − ${g(run, 3)} ${ap(key, 3)} s.`],
    explanation: 'Subtract the time spent at top speed over the rest of the race from the winner\'s total time.',
  };
};

/* ---------- hard models (four dependent stages, conditions in notes) ---------- */
HARD['NO share of all eligible voters'] = (R) => {
  const ds = ['District 1', 'District 2', 'District 3', 'District 4'];
  const yes = ds.map(() => R.i(2200, 4600)), no = ds.map(() => R.i(2200, 4600)), t = ds.map(() => R.f(62, 88, 2));
  const elig = ds.map((_, i) => (yes[i] + no[i]) * 100 / t[i]), E = sum(elig), votes = sum(yes) + sum(no), land = R.pick(NAMES);
  const key = 100 * sum(no) / E, avgT = sum(t) / 4;
  return {
    exhibits: [{ type: 'combo', title: `${land}: referendum votes and turnout by district (fictional data)`, unit: 'votes', categories: ds,
      series: [{ name: 'Voted YES', values: yes }, { name: 'Voted NO', values: no }, { name: 'Turnout (%)', values: t, line: true }],
      note: 'Turnout = percentage of eligible voters who voted (YES or NO).' }],
    stem: `In ${land}'s referendum, what percentage of all eligible voters in the four districts voted NO?`,
    key, fmt: (x) => g(x, 1) + '%',
    mistakes: [
      M(100 * sum(no) / votes, 'Gives NO as a share of votes cast, ignoring turnout.'),
      M(sum(no) / votes * avgT, 'Scales the NO share of votes by the simple average turnout.'),
      M(sum(ds.map((_, i) => no[i] * t[i] / (yes[i] + no[i]))) / 4, 'Averages the four district percentages without weighting.'),
      ...ds.map((d, i) => M(100 * sum(no) / (votes * 100 / t[i]), `Uses the turnout of ${d} for all four districts.`)),
      M(100 * sum(yes) / E, 'Uses the YES votes.'),
    ],
    hints: ['Rebuild each district\'s eligible voters from its own turnout.', 'Divide all NO votes by all eligible voters.'],
    solution: [
      'Eligible voters = votes cast ÷ turnout, district by district.',
      ...ds.map((d, i) => `${d}: (${g(yes[i])} + ${g(no[i])}) ÷ ${g(t[i], 2)}% ${ap(elig[i], 1)}.`),
      `All eligible voters ${ap(E, 1)}; all NO votes = ${no.map((x) => g(x)).join(' + ')} = ${g(sum(no))}.`,
      `NO share = ${g(sum(no))} ÷ ${g(E, 1)} × 100 ${ap(key, 2)}%.`],
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
    solution: [
      `${y[1]} populations (thousand): ${cs[x]} ${g(rows[x][0])} × ${g(1 + rows[x][1] / 100, 3)} ${ap(rows[x][0] * (1 + rows[x][1] / 100), 1)}; ${cs[z]} ${g(rows[z][0])} × ${g(1 + rows[z][1] / 100, 3)} ${ap(rows[z][0] * (1 + rows[z][1] / 100), 1)}.`,
      `Tickets per inhabitant in ${y[1]}: ${cs[x]} ${g(rows[x][3])} ÷ ${g(rows[x][0] * (1 + rows[x][1] / 100), 1)} ${ap(pc(x), 4)}; ${cs[z]} ${g(rows[z][3])} ÷ ${g(rows[z][0] * (1 + rows[z][1] / 100), 1)} ${ap(pc(z), 4)}.`,
      `${cs[z]} follows "than", so it is the base.`,
      `Difference = (${g(pc(x), 4)} ÷ ${g(pc(z), 4)} − 1) × 100 ${ap(key, 2)}%.`],
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
    solution: [
      `${cs[k]}: urban ${x.U}, rural ${x.Rr}, overall ${x.A} minutes.`,
      `Urban calls per rural call = (${x.Rr} − ${x.A}) ÷ (${x.A} − ${x.U}) = ${x.Rr - x.A} ÷ ${x.A - x.U} = ${x.n}.`,
      `New times: urban ${x.U} + ${up} = ${x.U + up}; rural ${r}.`,
      `New overall = (${x.n} × ${x.U + up} + ${r}) ÷ ${x.n + 1} = ${x.n * (x.U + up) + r} ÷ ${x.n + 1} ${ap(key, 2)} minutes.`],
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
  const key = (100 + d) / T, word = ['winning', 'second', 'third', 'fourth'][place], meet = R.pick(['Northern', 'Coastal', 'Alpine', 'Island', 'Lakeland', 'Capital', 'Valley', 'Border']);
  return {
    exhibits: [{ type: 'hbar', title: 'Athletics finals: times by country (fictional data)', unit: 'seconds', categories: cs,
      series: evs.slice(0, 3).map((e, j) => ({ name: e, values: rows.map((r) => r[j]) })),
      note: `Assume each sprinter accelerates uniformly from rest over the first ${d} m of the 100 m, then runs at a constant top speed.` }],
    stem: `At the ${meet} championships, what was the top speed (m/s) of the ${word}-placed athlete in the 100 m?`,
    key, fmt: (x) => g(x, 2) + ' m/s',
    mistakes: [
      M(100 / T, 'Gives the average speed over the whole race.'),
      M((100 + d / 2) / T, 'Takes the average speed while accelerating as two thirds of top speed.'),
      M((100 + 2 * d) / T, 'Doubles the acceleration distance.'),
      M((100 + d) / col[order[0]], 'Uses the winner\'s time.'),
      M((100 + d) / col[order[place + 1]], 'Uses the next athlete\'s time.'),
      M((100 + d) / col[order[place - 1]], 'Uses the previous athlete\'s time.'),
      M((100 + d) / rows[order[place]][1] * 2, 'Uses the 200 m time.'),
      M((100 + d) / rows[order[place]][2] * 4, 'Uses a quarter of the 400 m time.'),
    ].filter((m) => m.v <= 13.5),
    hints: ['During uniform acceleration from rest, the average speed is half the top speed.', 'Write the race time as acceleration time + constant-speed time and solve for top speed.'],
    solution: [
      `The ${word}-fastest 100 m time is ${cs[order[place]]}'s ${g(T, 2)} s.`,
      `Accelerating uniformly from rest, the average speed over the first ${d} m is v ÷ 2, so that stretch takes ${d} ÷ (v ÷ 2) = ${2 * d} ÷ v.`,
      `The remaining ${100 - d} m at top speed take ${100 - d} ÷ v.`,
      `${g(T, 2)} = (${2 * d} + ${100 - d}) ÷ v = ${100 + d} ÷ v, so v = ${100 + d} ÷ ${g(T, 2)} ${ap(key, 3)} m/s.`],
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
    solution: [
      `Shown values are rounded; keep exact values until the end. ${evs[e]} times in seconds: ${cs[fast]} ${mmss(tf)} = ${g(tf, 2)} s; ${cs[slow]} ${mmss(ts)} = ${g(ts, 2)} s.`,
      `Speeds: ${g(dist[e])} ÷ ${g(tf, 2)} ${ap(dist[e] / tf, 4)} m/s and ${g(dist[e])} ÷ ${g(ts, 2)} ${ap(dist[e] / ts, 4)} m/s; the gap closes at ${ap(dist[e] / tf - dist[e] / ts, 4)} m/s.`,
      `Time to draw level = ${L} ÷ ${g(dist[e] / tf - dist[e] / ts, 4)} ${ap(L / (dist[e] / tf - dist[e] / ts), 1)} s.`,
      `Distance = ${g(dist[e] / tf, 4)} × ${g(L / (dist[e] / tf - dist[e] / ts), 1)} ${ap(key, 1)} m.`],
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
    solution: [
      `Other four countries, all types: ${rows.map((r, i) => i).filter((i) => i !== k).map((i) => g(sum(rows[i]))).join(' + ')} = ${g(othersAll)}.`,
      `They hold ${100 - p}% of all pianos, so ${cs[k]}'s total = ${g(othersAll)} × ${p} ÷ ${100 - p} ${ap(total, 1)}.`,
      `Known types in ${cs[k]}: ${g(U)} upright + ${g(E)} digital = ${g(U + E)}.`,
      `Grand pianos = ${g(total, 1)} − ${g(U + E)} ${ap(key, 1)}, about ${g(key)}.`],
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
    solution: [
      `No opinion = 100% − in favour − against: ${years[i1]} 100 − ${s[i1]} − ${o[i1]} = ${n1}%; ${years[i2]} 100 − ${s[i2]} − ${o[i2]} = ${n2}%.`,
      `People with no opinion: ${years[i1]} ${n1}% × ${g(P1, 2)} ${ap(n1 * P1 / 100, 4)} million; ${years[i2]} ${n2}% × ${g(P2, 2)} ${ap(n2 * P2 / 100, 4)} million.`,
      `Change = (${g(n2 * P2 / 100, 4)} ÷ ${g(n1 * P1 / 100, 4)} − 1) × 100 ${ap(key, 2)}%.`],
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
    solution: [
      `In favour ${years[i1]} = ${s[i1]}% × ${g(P1, 2)} ${ap(P1 * s[i1] / 100, 4)} million; this number is unchanged in ${years[i2]}.`,
      `It is ${s[i2]}% of the ${years[i2]} population, so population = ${g(P1 * s[i1] / 100, 4)} ÷ ${s[i2]}% ${ap(P2, 4)} million.`,
      `Against in ${years[i2]} = ${g(P2, 4)} × ${o[i2]}% ${ap(key, 3)} million.`],
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
    stem: `In ${yr + 1}, total waste grows by ${q}% and the ${name.toLowerCase()} share rises by ${g(r, 1)} percentage points. By what percentage would ${wasteOf(name)} then exceed its ${yr - 2} level?`,
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
    solution: [
      `${yr + 1} total = ${g(T, 2)} × ${g(1 + q / 100, 2)} ${ap(T * (1 + q / 100), 2)} million tonnes.`,
      `${yr + 1} ${name.toLowerCase()} share = ${g(sh[i], 1)}% + ${g(r, 1)} points = ${g(sh[i] + r, 1)}%.`,
      `${yr + 1} ${name.toLowerCase()} = ${g(T * (1 + q / 100), 2)} × ${g(sh[i] + r, 1)}% ${ap(proj, 3)} million tonnes; ${yr - 2} (table) = ${g(past, 1)}.`,
      `Change = (${g(proj, 3)} ÷ ${g(past, 1)} − 1) × 100 ${ap(key, 2)}%.`],
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
    exhibits: [{ type: 'bar', title: 'Rail freight (thousand tonnes; fictional data)', unit: 'thousand tonnes', categories: cs,
      series: yrs.map((y, j) => ({ name: String(y), values: rows.map((r) => r[j]) })), note: `From ${yrs[2]} to 2025, every other country's freight grows by ${q}%.` }],
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
    solution: [
      `${yrs[2]}: ${cs[k]} ${g(X)}; the other four ${g(O)}.`,
      `Others in 2025 = ${g(O)} × ${g(1 + q / 100, 2)} ${ap(O * (1 + q / 100), 1)}.`,
      `${frac[0].toUpperCase() + frac.slice(1)} of the total means ${s[0]} part for ${cs[k]} to ${s[1] - s[0]} parts for the others: target = ${g(O * (1 + q / 100), 1)} ÷ ${s[1] - s[0]} ${ap(target, 1)}.`,
      `Required growth = (${g(target, 1)} ÷ ${g(X)} − 1) × 100 ${ap(key, 2)}%.`],
    explanation: 'The target share is set against the others\' grown freight, so their growth enters before the required growth is found.',
  };
};

HARD['Turnout needed to change the result'] = (R, v) => {
  const ds = ['District 1', 'District 2', 'District 3', 'District 4'];
  const yes = ds.map(() => R.i(2200, 4300)), no = ds.map(() => R.i(2400, 4600)), t = ds.map(() => R.f(58, 74, 2));
  const k = v % 4, deficit = sum(no) - sum(yes);
  const votes = sum(yes) + sum(no), elig = (yes[k] + no[k]) * 100 / t[k], key = t[k] + 100 * deficit / elig, land = R.pick(NAMES);
  if (deficit < 300 || key > 96) return null;
  return {
    exhibits: [{ type: 'combo', title: `${land}: referendum votes and turnout by district (fictional data)`, unit: 'votes', categories: ds,
      series: [{ name: 'Voted YES', values: yes }, { name: 'Voted NO', values: no }, { name: 'Turnout (%)', values: t, line: true }],
      note: 'Turnout = percentage of eligible voters who voted (YES or NO). The side with more votes in all four districts combined wins.' }],
    stem: `In ${land}'s referendum, if every additional voter in ${ds[k]} had voted YES, what turnout (%) in ${ds[k]} would have produced a tie overall?`,
    key, fmt: (x) => g(x, 1) + '%',
    mistakes: [
      M(t[k] + 100 * deficit / (yes[k] + no[k]), 'Measures the extra votes against the votes cast instead of the eligible voters.'),
      M(t[k] + 50 * deficit / elig, 'Halves the NO lead, as if each extra vote also removed a NO vote.'),
      M(t[k] + 100 * (no[k] - yes[k]) / elig, `Uses only ${ds[k]}'s NO lead.`),
      M(t[k] + 100 * deficit / (votes * 100 / t[k]), `Spreads the NO lead over all four districts' eligible voters.`),
      M(t[k] * (1 + deficit / (yes[k] + no[k])), 'Raises the turnout in proportion to the votes needed.'),
      M(t[k] + 200 * deficit / elig, 'Doubles the NO lead.'),
    ].filter((m) => m.v < 100),
    hints: ['YES needs as many extra votes as the overall NO lead.', `Turn those votes into percentage points of ${ds[k]}'s eligible voters.`],
    solution: [
      `Overall NO lead = (${no.map((x) => g(x)).join(' + ')}) − (${yes.map((x) => g(x)).join(' + ')}) = ${g(sum(no))} − ${g(sum(yes))} = ${g(deficit)}.`,
      `${ds[k]} eligible voters = (${g(yes[k])} + ${g(no[k])}) ÷ ${g(t[k], 2)}% ${ap(elig, 1)}.`,
      `${g(deficit)} extra YES votes = ${g(deficit)} ÷ ${g(elig, 1)} × 100 ${ap(100 * deficit / elig, 2)} points of turnout.`,
      `Required turnout = ${g(t[k], 2)} + ${g(100 * deficit / elig, 2)} ${ap(key, 2)}%.`],
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
    solution: [
      `${orgs[k]} now: ${n} fundraisers, spending EUR ${g(E)} thousand, funds raised EUR ${g(F)} thousand.`,
      `To keep funds per fundraiser unchanged with ${a}% more fundraisers, funds raised must also rise by ${a}%: ${g(F)} × ${g(1 + a / 100, 2)} ${ap(F * (1 + a / 100), 2)} thousand.`,
      `Spending next year = ${g(E)} × ${g(1 + b / 100, 2)} ${ap(E * (1 + b / 100), 2)} thousand.`,
      `Efficiency = ${g(F * (1 + a / 100), 2)} ÷ ${g(E * (1 + b / 100), 2)} ${ap(key, 3)}.`],
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
    solution: [
      `Saturday groups: ${cnt.map((n, i) => `${n} of ${sizes[i]}`).join(', ')}.`,
      `Groups = ${cnt.join(' + ')} = ${groups}; players = ${cnt.map((n, i) => `${n} × ${sizes[i]}`).join(' + ')} = ${people}.`,
      `Billiards income = ${groups} × ${g(h, 1)} h × EUR ${g(c, 2)} + ${people} × EUR ${g(fee, 2)} = EUR ${g(income, 2)}.`,
      `Ticket price = (${g(income, 2)} + ${K}) ÷ ${N} ${ap(key, 2).replace(/[\d,.]+$/, (m) => 'EUR ' + m)}.`],
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
    solution: [
      ...[a, b].map((i) => `${cs[i]}: pensioners = ${g(rows[i][0], 1)} million × ${g(rows[i][1], 1)}% ${ap(rows[i][0] * rows[i][1] / 100, 4)} million.`),
      ...[a, b].map((i) => `${cs[i]}: ${g(rows[i][0] * rows[i][1] / 100, 4)} × ${g(rows[i][2])} × ${pay[i]} payments ÷ ${g(rate[i], 2)} per EUR ${ap(spend(i), 2).replace(/[\d,.]+$/, (m) => 'EUR ' + m)} million.`),
      `Total = EUR ${g(spend(a), 2)} million + EUR ${g(spend(b), 2)} million ${ap(key, 2).replace(/[\d,.]+$/, (m) => 'EUR ' + m)} million.`],
    explanation: 'Each country needs its own pensioner count, number of payments and exchange rate before the totals are added.',
  };
};

/* ---------- further Medium chart models (November 2026): the range of EU Training chart types ---------- */
MED['Largest gap on an unlabelled chart'] = (R, v) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], pair = [['Cocoa', 'Coffee'], ['Copper', 'Nickel'], ['Wheat', 'Maize'], ['Sugar', 'Rice']][v % 4], market = R.pick(NAMES);
  for (let t = 0; t < 80; t++) {
    const walk = (x) => months.map(() => { const y = x; x = Math.max(1000, Math.min(5500, x + R.i(-2, 2) * 250)); return y; });
    const a = walk(R.i(8, 14) * 250), b = walk(R.i(8, 14) * 250), gap = months.map((_, i) => Math.abs(a[i] - b[i]));
    const ord = gap.map((x, i) => i).sort((x, y) => gap[y] - gap[x]), key = ord[0];
    if (gap[ord[0]] - gap[ord[1]] < 250) continue;
    const hi = a.indexOf(Math.max(...a)), pick = [key, ...ord.slice(1, 3), hi, ...ord.slice(3)].filter((x, i, arr) => arr.indexOf(x) === i).slice(0, 5);
    if (pick.length < 5) continue;
    const names = pick.map((i) => months[i]);
    const notes = pick.map((i) => (i === hi && i !== key ? `${months[i]} has the highest ${pair[0].toLowerCase()} price, but the gap is only EUR ${g(gap[i])}.` : `${months[i]}: gap EUR ${g(gap[i])}.`));
    return {
      category: { names, key: 0, notes, keyNote: `Correct. In ${months[key]} the two prices are EUR ${g(gap[key])} apart, the largest gap.` },
      exhibits: [{ type: 'line', title: `${market} exchange: ${pair[0].toLowerCase()} and ${pair[1].toLowerCase()} prices, 2023 (EUR per tonne; fictional data)`, unit: 'EUR per tonne', categories: months, labels: false, step: 500, series: [{ name: pair[0], values: a }, { name: pair[1], values: b }],
        note: 'Values are not labelled: read them from the gridlines (every EUR 500; points lie on or halfway between gridlines).' }],
      stem: `On the ${market} exchange, in which month of 2023 was the difference between the ${pair[0].toLowerCase()} and ${pair[1].toLowerCase()} prices largest?`,
      hints: ['Read both lines for each month and compare the vertical distance between them.', 'The month with the highest price is not necessarily the month with the largest gap.'],
      solution: ['Read both prices from the gridlines for the candidate months and subtract.',
        ...pick.map((i) => `${months[i]}: ${g(a[i])} − ${g(b[i])} → gap EUR ${g(gap[i])}.`),
        `The largest gap is in ${months[key]}.`],
      explanation: 'Compare the distance between the lines month by month; the peak of one line is a distraction.',
    };
  }
  return null;
};

const SURVEY2 = ['a four-day working week', 'free public transport', 'a sugar tax', 'longer school days'];
MED['People from the gap between two lines'] = (R, v) => {
  const years = ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'];
  let a = R.i(34, 46), b = R.i(30, 42); const fav = [], ag = [];
  years.forEach(() => { fav.push(a); ag.push(b); a = Math.min(68, a + R.i(-1, 3)); b = Math.max(18, b + R.i(-3, 1)); if (a + b > 95) b = 95 - a; });
  const i2 = R.i(4, 7), i1 = R.i(0, 2), P1 = R.f(20, 80, 1), gr = R.pick([2, 3, 4, 5, 6, 8]);
  const P2 = P1 * (1 + gr / 100), key = P2 * (fav[i2] - ag[i2]) / 100;
  if (fav[i2] - ag[i2] < 6) return null;
  return {
    exhibits: [{ type: 'line', title: `Survey: should the country introduce ${SURVEY2[v % 4]}? (% of adults; fictional data)`, unit: '% of adults', categories: years, series: [{ name: 'In favour', values: fav }, { name: 'Against', values: ag }] }],
    stem: `There were ${g(P1, 1)} million adults in ${years[i1]}, and their number grew by ${gr}% by ${years[i2]}. How many more adults were in favour than against in ${years[i2]} (million)?`,
    key, fmt: (x) => g(x, 2),
    mistakes: [
      M(P1 * (fav[i2] - ag[i2]) / 100, `Uses the ${years[i1]} population.`),
      M(P2 * (fav[i1] - ag[i1]) / 100, `Uses the ${years[i1]} shares.`),
      ...[i2 - 1, i2 + 1].filter((i) => i < years.length).map((i) => M(P2 * (fav[i] - ag[i]) / 100, `Reads the ${years[i]} values.`)),
      M(P1 * (fav[i2] - ag[i2] + gr) / 100, `Adds the ${gr}% growth to the gap in percentage points.`),
    ],
    hints: [`Find the ${years[i2]} population first.`, 'The gap between the lines is in percentage points of all adults.'],
    solution: [`${years[i2]} adults = ${g(P1, 1)} × ${g(1 + gr / 100, 2)} ${ap(P2, 3)} million.`,
      `${years[i2]} gap = ${fav[i2]}% − ${ag[i2]}% = ${fav[i2] - ag[i2]} percentage points.`,
      `More in favour = ${g(P2, 3)} × ${fav[i2] - ag[i2]}% ${ap(key, 3)} million.`],
    explanation: 'Turn the gap in percentage points into people with the population of the same year.',
  };
};

MED['Change in a 100% stacked chart'] = (R, v) => {
  const modes = ['Car', 'Bus', 'Rail', 'Bicycle'], city = R.pick(NAMES);
  const split = () => { const r = R.i(10, 24), bb = R.i(10, 20), c = R.i(6, 16); return [100 - r - bb - c, bb, r, c]; };
  const s0 = split(), s1 = split(), s2 = split(), T1 = R.f(180, 420, 1), T2 = Math.round(T1 * R.f(1.04, 1.2, 3) * 10) / 10;
  const k = [2, 3, 1][v % 3], key = T2 * s2[k] / 100 - T1 * s1[k] / 100;
  if (key <= 0 || (s2[k] - s1[k]) <= 0) return null;
  return {
    exhibits: [{ type: 'stacked', title: `${city}: trips by mode of transport (% of all trips; fictional data)`, unit: '% of trips', categories: ['2013', '2018', '2023'], series: modes.map((m, i) => ({ name: m, values: [s0[i], s1[i], s2[i]] })),
      note: `Total trips: ${g(T1, 1)} million in 2018 and ${g(T2, 1)} million in 2023.` }],
    stem: `By how many million did ${modes[k].toLowerCase()} trips in ${city} increase from 2018 to 2023?`,
    key, fmt: (x) => g(x, 2),
    mistakes: [
      M(T2 * (s2[k] - s1[k]) / 100, 'Applies the change in percentage points to the 2023 total.'),
      M(T1 * (s2[k] - s1[k]) / 100, 'Applies the change in percentage points to the 2018 total.'),
      M((T2 - T1) * s2[k] / 100, 'Applies the 2023 share to the growth in total trips only.'),
      M(T2 * s2[k] / 100 - T1 * s2[k] / 100, 'Uses the 2023 share for both years.'),
      ...[0, 1, 2, 3].filter((i) => i !== k && i !== 0).map((i) => M(T2 * s2[i] / 100 - T1 * s1[i] / 100, `Reads the ${modes[i].toLowerCase()} segments.`)),
      M(T2 * (s2[k] - s1[k]) / 100 + (T2 - T1) * s1[k] / 200, 'Splits the growth in total trips half-and-half between the two years.'),
    ].filter((m) => m.v > 0),
    hints: ['Each percentage applies to its own year\'s total.', 'Work out the trips in each year, then subtract.'],
    solution: [`2018: ${g(T1, 1)} × ${s1[k]}% ${ap(T1 * s1[k] / 100, 3)} million ${modes[k].toLowerCase()} trips.`,
      `2023: ${g(T2, 1)} × ${s2[k]}% ${ap(T2 * s2[k] / 100, 3)} million.`,
      `Increase = ${g(T2 * s2[k] / 100, 3)} − ${g(T1 * s1[k] / 100, 3)} ${ap(key, 3)} million.`],
    explanation: 'A 100% stacked chart shows shares; turn each into trips with its own year\'s total before comparing.',
  };
};

MED['People employed from a rate line'] = (R, v) => {
  const regs = ['North', 'South', 'East', 'West', 'Centre', 'Coast'];
  const pop = regs.map(() => R.i(900, 1700)), rate = regs.map(() => R.f(58, 79, 1));
  const [x, z] = R.pickN([0, 1, 2, 3, 4, 5], 2), emp = (i) => pop[i] * rate[i] / 100, key = emp(x) - emp(z), land = R.pick(NAMES);
  if (key < 80) return null;
  return {
    exhibits: [{ type: 'combo', title: `${land}: working-age population and employment rate by region (fictional data)`, unit: 'thousand people', categories: regs,
      series: [{ name: 'Working-age population', values: pop }, { name: 'Employment rate (%)', values: rate, line: true }],
      note: 'Employment rate = percentage of the working-age population in work.' }],
    stem: `In ${land}, how many more people of working age were employed in ${regs[x]} than in ${regs[z]} (thousand)?`,
    key, fmt: (y) => g(y, 1),
    mistakes: [
      M((pop[x] - pop[z]) * (rate[x] + rate[z]) / 200, 'Multiplies the population gap by the average of the two rates.'),
      M((pop[x] - pop[z]) * rate[x] / 100, `Applies ${regs[x]}'s rate to the population gap.`),
      M(pop[x] * rate[z] / 100 - pop[z] * rate[x] / 100, 'Swaps the two employment rates.'),
      M((pop[x] - pop[z]) * rate[z] / 100, `Applies ${regs[z]}'s rate to the population gap.`),
      M(pop[x] * (rate[x] - rate[z]) / 100, `Applies the gap in rates to ${regs[x]}'s population only.`),
      M(pop[x] - pop[z], 'Gives the gap in working-age population, ignoring the employment rates.'),
      ...regs.map((_, i) => i).filter((i) => i !== x && i !== z).slice(0, 2).map((i) => M(emp(x) - emp(i), `Compares with ${regs[i]} instead of ${regs[z]}.`)),
    ].filter((m) => m.v > 0),
    hints: ['Employed = working-age population × employment rate, region by region.', 'Subtract only after both numbers are found.'],
    solution: [`${regs[x]}: ${g(pop[x])} × ${g(rate[x], 1)}% ${ap(emp(x), 2)} thousand employed.`,
      `${regs[z]}: ${g(pop[z])} × ${g(rate[z], 1)}% ${ap(emp(z), 2)} thousand employed.`,
      `Difference = ${g(emp(x), 2)} − ${g(emp(z), 2)} ${ap(key, 2)} thousand.`],
    explanation: 'The bars and the line use different scales: combine each region\'s bar with its own rate before comparing regions.',
  };
};

MED['Difference between two pie slices'] = (R, v) => {
  const items = ['Health', 'Education', 'Pensions', 'Defence', 'Transport', 'Housing', 'Culture', 'Environment', 'Justice', 'Research', 'Agriculture', 'Other'];
  for (let t = 0; t < 60; t++) {
    const raw = items.map((_, i) => (i < 3 ? R.f(13, 21, 1) : R.f(2.5, 6.5, 1))), last = Math.round((100 - sum(raw.slice(0, -1))) * 10) / 10;
    if (last < 2.5 || last > 9) continue;
    raw[11] = last;
    if (new Set(raw).size !== raw.length) continue;
    const T = R.f(40, 180, 1), q = R.pick([6, 8, 10, 12]), [a, b] = [[0, 3], [1, 4], [2, 5], [0, 6]][v % 4];
    if (raw[a] - raw[b] < 3) continue;
    const key = T * (1 + q / 100) * (raw[a] - raw[b]) / 100, land = R.pick(NAMES);
    return {
      exhibits: [{ type: 'pie', title: `${land}: public spending by area, 2024 (total EUR ${g(T, 1)} billion; fictional data)`, unit: '%', slices: items.map((l, i) => ({ label: l, value: raw[i] })) }],
      stem: `If total spending rises by ${q}% in 2025 with the same shares, how much more will ${land} spend on ${items[a].toLowerCase()} than on ${items[b].toLowerCase()} (EUR billion)?`,
      key, fmt: (x) => g(x, 2),
      mistakes: [
        M(T * (raw[a] - raw[b]) / 100, `Leaves out the ${q}% rise.`),
        M(T * (raw[a] - raw[b] + q) / 100, `Adds the ${q}% to the gap in percentage points.`),
        M(T * (1 + q / 100) * raw[a] / 100 - T * raw[b] / 100, `Applies the rise to ${items[a].toLowerCase()} only.`),
        ...items.map((_, j) => j).filter((j) => j !== a && j !== b).map((j) => M(T * (1 + q / 100) * (raw[a] - raw[j]) / 100, `Reads the ${items[j].toLowerCase()} slice instead of ${items[b].toLowerCase()}.`)),
        ...items.map((_, j) => j).filter((j) => j !== a && j !== b).map((j) => M(T * (1 + q / 100) * (raw[j] - raw[b]) / 100, `Reads the ${items[j].toLowerCase()} slice instead of ${items[a].toLowerCase()}.`)),
      ].filter((m) => m.v > 0),
      hints: ['With the same shares, both areas grow by the same percentage.', 'Find the 2025 total first, then apply the difference in shares.'],
      solution: [`2025 total = ${g(T, 1)} × ${g(1 + q / 100, 2)} ${ap(T * (1 + q / 100), 3)} EUR billion.`,
        `Difference in shares = ${g(raw[a], 1)}% − ${g(raw[b], 1)}% = ${g(raw[a] - raw[b], 1)} points.`,
        `Difference = ${g(T * (1 + q / 100), 3)} × ${g(raw[a] - raw[b], 1)}% ${ap(key, 3)} EUR billion.`],
      explanation: 'With unchanged shares, the gap between two slices grows with the total.',
    };
  }
  return null;
};

MED['Percentage difference from a bar chart'] = (R, v) => {
  const cs = R.pickN(NAMES, 6), yrs = ['2018', '2023'];
  const vals = cs.map(() => { const a = R.i(300, 900); return [a, Math.round(a * R.f(0.9, 1.15, 3))]; });
  const [x, z] = R.pickN([0, 1, 2, 3, 4, 5], 2);
  if (vals[x][1] < vals[z][1] * 1.15 || vals[x][1] > vals[z][1] * 1.45) return null;
  const key = (vals[x][1] / vals[z][1] - 1) * 100, theme = ['Hospital beds', 'Electric cars registered', 'Libraries', 'Start-ups founded'][v % 4];
  return {
    exhibits: [{ type: 'bar', title: `${theme} (fictional data)`, unit: 'number', categories: cs, series: yrs.map((y, j) => ({ name: y, values: vals.map((r) => r[j]) })) }],
    stem: `In 2023, by what percentage was the number of ${theme.toLowerCase()} in ${cs[x]} higher than in ${cs[z]}?`,
    key, fmt: (y) => g(y, 1) + '%',
    mistakes: [
      M((1 - vals[z][1] / vals[x][1]) * 100, `Divides by ${cs[x]}'s figure instead of ${cs[z]}'s.`),
      M((vals[x][0] / vals[z][0] - 1) * 100, 'Reads the 2018 bars.'),
      M((vals[x][1] - vals[z][1]) / ((vals[x][1] + vals[z][1]) / 2) * 100, 'Divides by the average of the two figures.'),
      M((vals[x][1] / vals[z][0] - 1) * 100, `Uses ${cs[z]}'s 2018 bar.`),
      M((vals[x][0] / vals[z][1] - 1) * 100, `Uses ${cs[x]}'s 2018 bar.`),
    ].filter((m) => m.v > 0),
    hints: ['The country after "than" is the base.', 'Read the 2023 bars only.'],
    solution: [`2023 bars: ${cs[x]} ${g(vals[x][1])}, ${cs[z]} ${g(vals[z][1])}.`,
      `Difference = ${g(vals[x][1])} − ${g(vals[z][1])} = ${g(vals[x][1] - vals[z][1])}.`,
      `Percentage = ${g(vals[x][1] - vals[z][1])} ÷ ${g(vals[z][1])} × 100 ${ap(key, 2)}%.`],
    explanation: 'A percentage difference is measured against the figure after "than".',
  };
};

MED['Index change on a line chart'] = (R, v) => {
  const years = ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'], sect = [['Construction', 'Retail'], ['Tourism', 'Farming'], ['Energy', 'Transport'], ['Housing', 'Health']][v % 4];
  const walk = () => { let x = 100; return years.map(() => { const y = Math.round(x * 10) / 10; x = x * R.f(0.98, 1.09, 3); return y; }); };
  const A = walk(), B = walk(), i1 = R.i(2, 4), i2 = R.i(6, 8), key = (A[i2] / A[i1] - 1) * 100;
  if (key < 8) return null;
  return {
    exhibits: [{ type: 'line', title: 'Output index by sector (2015 = 100; fictional data)', unit: 'index, 2015 = 100', categories: years, series: [{ name: sect[0], values: A }, { name: sect[1], values: B }] }],
    stem: `By what percentage did ${sect[0].toLowerCase()} output rise from ${years[i1]} to ${years[i2]}?`,
    key, fmt: (y) => g(y, 1) + '%',
    mistakes: [
      M(A[i2] - A[i1], 'Gives the rise in index points instead of per cent.'),
      M(A[i2] - 100, 'Measures the rise from the 2015 base instead of the earlier year.'),
      M((A[i2] / A[i1 - 1] - 1) * 100, `Starts from ${years[i1 - 1]}.`),
      M((A[i2 - 1] / A[i1] - 1) * 100, `Ends in ${years[i2 - 1]}.`),
      M((B[i2] / B[i1] - 1) * 100, `Reads the ${sect[1].toLowerCase()} line.`),
    ].filter((m) => m.v > 0),
    hints: ['An index rise in points equals a rise in per cent only when the start is 100.', `Divide the ${years[i2]} value by the ${years[i1]} value.`],
    solution: [`${sect[0]} index: ${years[i1]} ${g(A[i1], 1)}, ${years[i2]} ${g(A[i2], 1)}.`,
      `Rise = (${g(A[i2], 1)} ÷ ${g(A[i1], 1)} − 1) × 100 ${ap(key, 2)}%.`],
    explanation: 'Index points are not per cent unless the starting value is 100; divide by the earlier index value.',
  };
};

MED['Share change in a stacked chart'] = (R, v) => {
  const src = ['Gas', 'Wind', 'Solar', 'Hydro'], years = ['2019', '2020', '2021', '2022', '2023'], land = R.pick(NAMES);
  const data = src.map((_, i) => { let x = i === 0 ? R.i(60, 110) : R.i(10, 45); return years.map(() => { const y = x; x = Math.max(5, Math.round(x * (i === 0 ? R.f(0.88, 1.02, 3) : R.f(1, 1.2, 3)))); return y; }); });
  const tot = years.map((_, j) => sum(data.map((r) => r[j]))), k = 1 + (v % 3), i1 = R.i(0, 1), i2 = R.i(3, 4);
  const sh = (j) => 100 * data[k][j] / tot[j], key = sh(i2) - sh(i1);
  if (key < 2.5) return null;
  return {
    exhibits: [{ type: 'stacked', title: `${land}: electricity generated by source (TWh; fictional data)`, unit: 'TWh', categories: years, series: src.map((n, i) => ({ name: n, values: data[i] })) }],
    stem: `By how many percentage points did ${src[k].toLowerCase()}'s share of ${land}'s electricity rise from ${years[i1]} to ${years[i2]}?`,
    key, fmt: (y) => g(y, 2),
    mistakes: [
      M(100 * (data[k][i2] - data[k][i1]) / tot[i2], `Divides the rise in TWh by the ${years[i2]} total.`),
      M(100 * (data[k][i2] - data[k][i1]) / tot[i1], `Divides the rise in TWh by the ${years[i1]} total.`),
      M(sh(i2) - sh(i1 + 1), `Starts from ${years[i1 + 1]}.`),
      M(sh(i2 - 1) - sh(i1), `Ends in ${years[i2 - 1]}.`),
      M(100 * data[k][i2] / tot[i1] - sh(i1), `Uses the ${years[i1]} total for both years.`),
      ...[1, 2, 3].filter((i) => i !== k).map((i) => M(100 * data[i][i2] / tot[i2] - 100 * data[i][i1] / tot[i1], `Reads the ${src[i].toLowerCase()} segments.`)),
    ].filter((m) => m.v > 0),
    hints: ['A share is the source divided by that year\'s total (the top of the bar).', 'Compute both shares, then subtract.'],
    solution: [`${years[i1]}: ${data[k][i1]} ÷ ${tot[i1]} × 100 ${ap(sh(i1), 3)}%.`,
      `${years[i2]}: ${data[k][i2]} ÷ ${tot[i2]} × 100 ${ap(sh(i2), 3)}%.`,
      `Change = ${g(sh(i2), 3)} − ${g(sh(i1), 3)} ${ap(key, 3)} percentage points.`],
    explanation: 'Shares must be computed with each year\'s own total before the change in percentage points is found.',
  };
};

/* ---------- hard models added after review: one real insight each, short stem, trap-based distractors ---------- */
const REG5 = ['North', 'South', 'East', 'West', 'Centre', 'Islands'];
HARD['Capped proportional allocation'] = (R, v) => {
  const pop = REG5.map(() => R.i(700, 2200)), bigI = R.i(0, REG5.length - 1);
  pop[bigI] = Math.round(Math.max(...pop) * R.f(1.6, 2.3, 2));
  const big = bigI, P = sum(pop), X = R.i(12, 40) * 10;
  const C = Math.round(X * pop[big] / P * R.f(0.72, 0.9, 2));
  const rest = P - pop[big], share = (i) => (X - C) * pop[i] / rest;
  if (REG5.some((_, i) => i !== big && share(i) >= C)) return null;
  const others = REG5.map((_, i) => i).filter((i) => i !== big), k = others[v % others.length], excess = X * pop[big] / P - C, key = share(k), n = others.length;
  return {
    exhibits: [{ type: 'bar', title: 'Population by region (thousand; fictional data)', unit: 'thousand people', categories: REG5,
      series: [{ name: '2015', values: pop.map((x) => Math.round(x * R.f(0.88, 0.98, 3))) }, { name: '2025', values: pop }],
      note: `A regional fund of EUR ${X} million is shared in proportion to 2025 population, but no region may receive more than EUR ${C} million. Any excess is shared among the other regions in proportion to their 2025 populations.` }],
    stem: `From the regional fund, how much does ${REG5[k]} receive (EUR million)?`,
    key, fmt: (x) => 'EUR ' + g(x, 2) + ' million',
    mistakes: [
      M(X * pop[k] / P, 'Ignores the cap.'),
      M(X * pop[k] / P + excess / n, `Shares the excess equally among the ${n} other regions.`),
      M((X - C) * pop[k] / P, 'Keeps the capped region in the population base when sharing the rest.'),
      M(X * pop[k] / P + excess * pop[k] / P, 'Shares the excess among all regions, including the capped one.'),
      M(X * pop[k] / rest, `Shares the whole budget among the ${n} other regions.`),
      M((X - C) / n, `Splits the remainder equally among the ${n} other regions.`),
      M(C * pop[k] / pop[big], 'Scales the cap by the ratio of the two populations.'),
    ],
    hints: ['Check first which region would exceed the cap.', 'That region gets exactly the cap; the rest of the money is shared among the others.'],
    solution: [`Total 2025 population = ${pop.map((x) => g(x)).join(' + ')} = ${g(P)} thousand.`,
      `${REG5[big]} would get ${X} × ${g(pop[big])} ÷ ${g(P)} ${ap(X * pop[big] / P, 2)}, above the cap, so it receives EUR ${C} million.`,
      `The other regions share ${X} − ${C} = EUR ${X - C} million over ${g(P)} − ${g(pop[big])} = ${g(rest)} thousand people; none of them reaches the cap.`,
      `${REG5[k]} = ${X - C} × ${g(pop[k])} ÷ ${g(rest)} ${ap(key, 2)} EUR million.`],
    explanation: 'A binding cap fixes one region\'s amount; the remainder is then shared on a smaller population base.',
  };
};

HARD['Year one overtakes another'] = (R) => {
  const cs = R.pickN(NAMES, 5);
  const rows = cs.map(() => [R.f(40, 160, 1), R.f(0.5, 6.5, 1)]);
  const [x, z] = R.pickN([0, 1, 2, 3, 4], 2);
  rows[x][0] = Math.round(rows[z][0] * R.f(0.6, 0.85, 2) * 10) / 10; rows[x][1] = Math.round((rows[z][1] + R.f(2, 4.5, 1)) * 10) / 10;
  const val = (i, n) => rows[i][0] * (1 + rows[i][1] / 100) ** n;
  let N = 1; while (val(x, N) <= val(z, N) && N < 60) N++;
  if (N < 4 || N > 16 || val(x, N) / val(z, N) < 1.004 || val(z, N - 1) / val(x, N - 1) < 1.004) return null;
  const lin = (i, n) => rows[i][0] * (1 + n * rows[i][1] / 100);
  let NL = 1; while (lin(x, NL) <= lin(z, NL) && NL < 60) NL++;
  const Y = 2024 + N;
  return {
    category: { build: (k) => {
      const years = [0, 1, 2, 3, 4].map((j) => Y - k + j);
      if (years[0] <= 2024) return null;
      return { options: years.map(String), answer: k, optionNotes: years.map((y) => {
        if (y === Y) return `Correct. ${cs[x]} first exceeds ${cs[z]} in ${Y}: EUR ${g(val(x, N), 1)} billion against EUR ${g(val(z, N), 1)} billion.`;
        const n = y - 2024, extra = y === 2024 + NL ? ' Simple instead of compound growth gives this year.' : '';
        return y < Y ? `In ${y} ${cs[x]} is still behind: EUR ${g(val(x, n), 1)} billion against EUR ${g(val(z, n), 1)} billion.${extra}` : `${cs[x]} has already overtaken ${cs[z]} in ${Y}.${extra}`;
      }) };
    } },
    exhibits: [{ type: 'combo', title: 'Exports and expected annual growth (fictional data)', unit: 'EUR billion', categories: cs,
      series: [{ name: 'Exports 2019', values: rows.map((r, i) => Math.round(r[0] * (0.8 + 0.03 * i) * 10) / 10) }, { name: 'Exports 2024', values: rows.map((r) => r[0]) }, { name: 'Annual growth from 2024 (%)', values: rows.map((r) => r[1]), line: true }],
      note: 'Assume each country keeps growing at its annual rate (compound growth).' }],
    stem: `In which year would ${cs[x]}'s exports first exceed ${cs[z]}'s?`,
    hints: ['Growth compounds: each year multiplies by (1 + rate).', `Compare the ratio of the two values with the ratio of their growth factors, year by year.`],
    solution: [`${cs[x]}: EUR ${g(rows[x][0], 1)} billion growing ${g(rows[x][1], 1)}% a year; ${cs[z]}: EUR ${g(rows[z][0], 1)} billion growing ${g(rows[z][1], 1)}% a year.`,
      `Each year the gap ratio ${cs[z]} ÷ ${cs[x]} shrinks by the factor ${g(1 + rows[z][1] / 100, 3)} ÷ ${g(1 + rows[x][1] / 100, 3)} ${ap((1 + rows[z][1] / 100) / (1 + rows[x][1] / 100), 4)}.`,
      `Start ratio = ${g(rows[z][0], 1)} ÷ ${g(rows[x][0], 1)} ${ap(rows[z][0] / rows[x][0], 4)}; it falls below 1 after ${N} years.`,
      `${2024 + N - 1}: ${g(val(x, N - 1), 1)} against ${g(val(z, N - 1), 1)}; ${Y}: ${g(val(x, N), 1)} against ${g(val(z, N), 1)}, so the answer is ${Y}.`],
    explanation: 'With compound growth the faster-growing country closes the gap by the ratio of the growth factors each year.',
  };
};

HARD['Best overall rate despite the mix'] = (R) => {
  const cs = R.pickN(['Office A', 'Office B', 'Office C', 'Office D', 'Office E'], 5).sort(), agency = R.pick(['tax agency', 'land registry', 'benefits service', 'licensing authority', 'consumer ombudsman', 'customs service']), land = R.pick(NAMES);
  for (let t = 0; t < 40; t++) {
    const rows = cs.map(() => { const n1 = R.i(80, 900), n2 = R.i(80, 900); return [n1, R.f(70, 92, 1), n2, R.f(38, 66, 1)]; });
    const best = R.i(0, 4), mixFav = (best + 1 + R.i(0, 3)) % 5;
    rows[best][1] = Math.max(...rows.map((r) => r[1])) + R.f(0.5, 2, 1); rows[best][3] = Math.max(...rows.map((r) => r[3])) + R.f(0.5, 2, 1);
    rows[best][0] = R.i(80, 160); rows[best][2] = R.i(600, 900); rows[mixFav][0] = R.i(700, 900); rows[mixFav][2] = R.i(60, 140);
    const overall = rows.map((r) => (r[0] * r[1] + r[2] * r[3]) / (r[0] + r[2]));
    const order = overall.map((o, i) => i).sort((a, b) => overall[b] - overall[a]), key = order[0];
    if (key === best || overall[order[0]] - overall[order[1]] < 0.8) continue;
    const notes = cs.map((c, i) => (i === best ? `${c} has the highest rate in both categories, but ${g(100 * rows[i][2] / (rows[i][0] + rows[i][2]), 0)}% of its cases are complex, so its overall rate is only ${g(overall[i], 1)}%.` : `${c}'s overall rate is ${g(overall[i], 1)}%.`));
    return {
      category: { names: cs, key, notes, keyNote: `Correct. ${cs[key]} resolves ${g(overall[key], 1)}% of all its cases, the highest overall rate.` },
      exhibits: [{ type: 'stacked', title: `${agency[0].toUpperCase() + agency.slice(1)}: cases handled by office (fictional data)`, unit: 'cases', categories: cs, series: [{ name: 'Simple cases', values: rows.map((r) => r[0]) }, { name: 'Complex cases', values: rows.map((r) => r[2]) }] },
        { type: 'bar', title: 'Share of cases resolved (%; fictional data)', unit: '%', categories: cs, series: [{ name: 'Simple cases', values: rows.map((r) => r[1]) }, { name: 'Complex cases', values: rows.map((r) => r[3]) }] }],
      stem: `In ${land}'s ${agency}, which office resolved the highest percentage of all its cases?`,
      hints: ['Turn each percentage into a number of resolved cases first.', 'An office can lead in each category and still trail overall if most of its cases are the harder kind.'],
      solution: ['Overall rate = (simple cases × simple rate + complex cases × complex rate) ÷ all cases.',
        ...order.map((i) => `${cs[i]}: (${g(rows[i][0])} × ${g(rows[i][1], 1)}% + ${g(rows[i][2])} × ${g(rows[i][3], 1)}%) ÷ ${g(rows[i][0] + rows[i][2])} ${ap(overall[i], 2)}%.`),
        `${cs[key]} has the highest overall rate; ${cs[best]} leads in both categories but handles mostly complex cases.`],
      explanation: 'An overall rate is weighted by the case mix, so leading in every category does not guarantee leading overall.',
    };
  }
  return null;
};

HARD['True share of positive results'] = (R, v) => {
  const labs = ['Lab 1', 'Lab 2', 'Lab 3', 'Lab 4'];
  const rows = labs.map(() => [R.f(4, 24, 1), R.f(80, 97, 1), R.f(2, 12, 1)]);
  const k = v % 4, [p, sn, f] = rows[k], tp = p * sn, fp = (100 - p) * f, key = 100 * tp / (tp + fp), land = R.pick(NAMES);
  return {
    exhibits: [{ type: 'bar', title: 'Screening test results by laboratory (%; fictional data)', unit: '%', categories: labs,
      series: [{ name: 'People with the condition', values: rows.map((r) => r[0]) }, { name: 'Detected when present', values: rows.map((r) => r[1]) }, { name: 'Positive when absent', values: rows.map((r) => r[2]) }] }],
    stem: `In the ${land} screening programme, what percentage of positive results at ${labs[k]} come from people who have the condition?`,
    key, fmt: (x) => g(x, 1) + '%',
    mistakes: [
      M(100 * tp / (tp + 100 * f), 'Applies the false-positive rate to everyone tested, not only to those without the condition.'),
      M(100 * sn / (sn + f), 'Ignores how common the condition is.'),
      ...labs.map((_, i) => i).filter((i) => i !== k).map((i) => M(100 * rows[i][0] * sn / (rows[i][0] * sn + (100 - rows[i][0]) * f), `Uses the prevalence of ${labs[i]}.`)),
      M(100 * tp / (tp + (100 - p) * (100 - sn)), 'Uses the share missed when present instead of the false-positive rate.'),
    ],
    hints: ['Imagine 10,000 people tested and split them into those with and without the condition.', 'Positives = true positives + false positives.'],
    solution: [`Out of 10,000 tested at ${labs[k]}: ${g(100 * p)} have the condition and ${g(100 * (100 - p))} do not.`,
      `True positives = ${g(100 * p)} × ${g(sn, 1)}% ${ap(tp, 1)}; false positives = ${g(100 * (100 - p))} × ${g(f, 1)}% ${ap(fp, 1)}.`,
      `All positives = ${g(tp, 1)} + ${g(fp, 1)} ${ap(tp + fp, 1)}.`,
      `Share from people with the condition = ${g(tp, 1)} ÷ ${g(tp + fp, 1)} × 100 ${ap(key, 2)}%.`],
    explanation: 'Positive results come from two groups, people with the condition and people without it; the larger the group without it, the more false positives dilute the true ones.',
  };
};

HARD['Estimate from an unlabelled chart'] = (R, v) => {
  const qs = ['2021', '2022', '2023'].flatMap((y) => ['Q1', 'Q2', 'Q3', 'Q4'].map((q) => `${q} ${y.slice(2)}`));
  const items = ['copper', 'cocoa', 'coffee', 'aluminium'], market = R.pick(NAMES);
  for (let t = 0; t < 80; t++) {
    const vals = []; let x = R.i(6, 12) * 250;
    qs.forEach(() => { vals.push(x); x = Math.max(1250, Math.min(5500, x + R.i(-3, 4) * 250)); });
    const cand = [4, 5, 6, 7, 8], yoy = cand.map((i) => vals[i] / vals[i - 4] - 1), abs = cand.map((i) => vals[i] - vals[i - 4]);
    const ord = yoy.map((y, i) => i).sort((a, b) => yoy[b] - yoy[a]), key = ord[0], trap = abs.indexOf(Math.max(...abs));
    if (trap === key || yoy[ord[0]] - yoy[ord[1]] < 0.03 || yoy[key] <= 0) continue;
    const names = cand.map((i) => qs[i]);
    const notes = cand.map((i, j) => (j === trap ? `${qs[i]} has the largest rise in euros (EUR ${g(abs[j])}), but only ${g(100 * yoy[j], 1)}% on its higher starting price.` : `${qs[i]}: ${g(vals[i - 4])} → ${g(vals[i])}, ${yoy[j] >= 0 ? '+' : ''}${g(100 * yoy[j], 1)}%.`));
    return {
      category: { names, key, notes, keyNote: `Correct. ${names[key]}: ${g(vals[cand[key] - 4])} → ${g(vals[cand[key]])} EUR per tonne, +${g(100 * yoy[key], 1)}%, the largest year-on-year rise.` },
      exhibits: [{ type: 'line', title: `${market} exchange: price of ${items[v % 4]} (fictional data)`, unit: 'EUR per tonne', categories: qs, labels: false, step: 500, series: [{ name: 'Price', values: vals }],
        note: 'Values are not labelled: read them from the gridlines (every EUR 500; points lie on or halfway between gridlines).' }],
      stem: `On the ${market} exchange, which quarter had the largest percentage rise in the ${items[v % 4]} price compared with the same quarter a year earlier?`,
      hints: ['Compare each quarter with the same quarter one year (four points) earlier.', 'A percentage rise depends on the starting price, not only on the size of the rise.'],
      solution: ['Read each price from the gridlines and compare it with the same quarter a year earlier.',
        ...cand.map((i, j) => `${qs[i]}: (${g(vals[i])} − ${g(vals[i - 4])}) ÷ ${g(vals[i - 4])} ${ap(100 * yoy[j], 1)}%.`),
        `The largest percentage rise is in ${names[key]}.`],
      explanation: 'The biggest rise in euros is not the biggest percentage rise when it starts from a higher price.',
    };
  }
  return null;
};

HARD['Speed needed to win'] = (R, v) => {
  const cs = R.pickN(NAMES, 5);
  const rows = cs.map(() => { const a = R.f(20.8, 24.6, 2); return [a, Math.round((a + R.f(22.4, 28.5, 2)) * 100) / 100]; });
  const order = rows.map((r, i) => i).sort((a, b) => rows[a][1] - rows[b][1]), w = order[0], k = order[2 + (v % 3)];
  const left = rows[w][1] - rows[k][0];
  if (left < 21) return null;
  const key = 200 / left;
  return {
    exhibits: [{ type: 'hbar', title: '400 m final: split and finishing times (fictional data)', unit: 'seconds', categories: cs,
      series: [{ name: 'Time at 100 m', values: rows.map((r) => Math.round((r[0] * 0.5 + 0.3) * 100) / 100) }, { name: 'Time at 200 m', values: rows.map((r) => r[0]) }, { name: 'Finishing time', values: rows.map((r) => r[1]) }] }],
    stem: `Over the second 200 m, what average speed (m/s) would ${cs[k]}'s runner have needed to finish level with the winner?`,
    key, fmt: (x) => g(x, 2) + ' m/s',
    mistakes: [
      M(200 / (rows[k][1] - rows[k][0]), `Gives ${cs[k]}'s actual second-half speed.`),
      M(200 / (rows[w][1] - rows[w][0]), 'Gives the winner\'s second-half speed.'),
      M(400 / rows[w][1], 'Gives the winner\'s average speed over the whole race.'),
      M(200 / (rows[k][1] - rows[w][0]), 'Subtracts the winner\'s split from its own finishing time.'),
      M(200 / (rows[order[1]][1] - rows[k][0]), 'Aims for the second-placed time instead of the winner\'s.'),
      M(400 / (rows[w][1] - rows[k][0]), 'Divides the whole 400 m by the time left.'),
    ].filter((m) => m.v > 0),
    hints: ['The winner has the lowest finishing time.', `${cs[k]}'s runner has the winner's finishing time minus its own 200 m time left for the second half.`],
    solution: [`Winner: ${cs[w]}, ${g(rows[w][1], 2)} s. ${cs[k]} reached 200 m in ${g(rows[k][0], 2)} s.`,
      `Time available for the second 200 m = ${g(rows[w][1], 2)} − ${g(rows[k][0], 2)} = ${g(left, 2)} s.`,
      `Speed needed = 200 ÷ ${g(left, 2)} ${ap(key, 3)} m/s.`],
    explanation: 'The time left is the winner\'s finishing time minus the runner\'s own split, not the winner\'s split.',
  };
};

HARD['Speed for a target average'] = (R, v) => {
  const d = [0, 1, 2, 3, 4].map(() => R.i(12, 60));
  const sp = ['Rider A', 'Rider B'].map(() => d.map(() => R.f(26, 50, 1)));
  const k = v % 2, V = R.pick([38, 39, 40, 41, 42]), land = R.pick(NAMES);
  const D = sum(d), used = sum([0, 1, 2, 3].map((i) => d[i] / sp[k][i])), left = D / V - used;
  if (left <= 0) return null;
  const key = d[4] / left;
  if (key < 30 || key > 56) return null;
  const otherUsed = sum([0, 1, 2, 3].map((i) => d[i] / sp[1 - k][i]));
  return {
    exhibits: [table('Cycling stages: distance and average speed', ['Stage', 'Distance (km)', 'Rider A (km/h)', 'Rider B (km/h)'], d.map((x, i) => [`Stage ${i + 1}`, String(x), i === 4 && k === 0 ? '—' : g(sp[0][i], 1), i === 4 && k === 1 ? '—' : g(sp[1][i], 1)]),
      `${['Rider A', 'Rider B'][k]} wants an average speed of exactly ${V} km/h over all five stages.`)],
    stem: `In the Tour of ${land}, what average speed (km/h) does ${['Rider A', 'Rider B'][k]} need on stage 5?`,
    key, fmt: (x) => g(x, 1) + ' km/h',
    mistakes: [
      M(5 * V - sum(sp[k].slice(0, 4)), 'Averages the five stage speeds instead of using total distance ÷ total time.'),
      M((D * V - sum([0, 1, 2, 3].map((i) => d[i] * sp[k][i]))) / d[4], 'Weights the stage speeds by distance instead of working with time.'),
      M(d[4] / (D / V - otherUsed), `Uses the other rider's stage times.`),
      M(V, 'Assumes stage 5 must simply be ridden at the target average.'),
      M(2 * V - (D - d[4]) / used, 'Makes up the shortfall in speed one-for-one instead of in time.'),
    ].filter((m) => m.v > 0),
    hints: ['Average speed = total distance ÷ total time.', 'Find the total time allowed, subtract the time already used, and divide stage 5 by what is left.'],
    solution: [`Total distance = ${d.join(' + ')} = ${D} km; at ${V} km/h the allowed time is ${D} ÷ ${V} ${ap(D / V, 4)} h.`,
      `Time used on stages 1–4 = ${[0, 1, 2, 3].map((i) => `${d[i]} ÷ ${g(sp[k][i], 1)}`).join(' + ')} ${ap(used, 4)} h.`,
      `Time left for stage 5 = ${g(D / V, 4)} − ${g(used, 4)} ${ap(left, 4)} h.`,
      `Speed needed = ${d[4]} ÷ ${g(left, 4)} ${ap(key, 2)} km/h.`],
    explanation: 'An average speed is total distance over total time; averaging the stage speeds gives the wrong answer.',
  };
};

HARD['Largest change in tonnes from two pie charts'] = (R) => {
  const mats = ['Paper', 'Food', 'Plastics', 'Metals', 'Glass', 'Other'], land = R.pick(NAMES);
  const mk6 = () => { for (;;) { const a = [0, 1, 2, 3, 4].map(() => R.f(8, 26, 1)); const o = Math.round((100 - sum(a)) * 10) / 10; if (o >= 4 && o <= 20) return [...a, o]; } };
  for (let t = 0; t < 60; t++) {
    const s1 = mk6(), s2 = mk6(), T1 = R.f(120, 220, 1), T2 = Math.round(T1 * R.f(1.15, 1.35, 3) * 10) / 10;
    const ton = [0, 1, 2, 3, 4].map((i) => T2 * s2[i] / 100 - T1 * s1[i] / 100), pp = [0, 1, 2, 3, 4].map((i) => s2[i] - s1[i]);
    const ord = ton.map((x, i) => i).sort((a, b) => ton[b] - ton[a]), key = ord[0], trap = pp.indexOf(Math.max(...pp));
    if (trap === key || ton[ord[0]] - ton[ord[1]] < 0.6 || ton[key] <= 0) continue;
    const notes = mats.slice(0, 5).map((m, i) => (i === trap ? `${m} has the largest rise in share (${g(pp[i], 1)} points), but its tonnage changes by only ${g(ton[i], 2)} million tonnes.` : `${m} changes by ${g(ton[i], 2)} million tonnes.`));
    return {
      category: { names: mats.slice(0, 5), key, notes, keyNote: `Correct. ${mats[key]} rises by ${g(ton[key], 2)} million tonnes, the largest increase.` },
      exhibits: [
        { type: 'pie', title: `${land}: waste by material, 2018 (total ${g(T1, 1)} million tonnes; fictional data)`, unit: '%', slices: mats.map((m, i) => ({ label: m, value: s1[i] })) },
        { type: 'pie', title: `${land}: waste by material, 2023 (total ${g(T2, 1)} million tonnes; fictional data)`, unit: '%', slices: mats.map((m, i) => ({ label: m, value: s2[i] })) }],
      stem: `In ${land}, which material increased the most in tonnes from 2018 to 2023?`,
      hints: ['A share applies to its own year\'s total.', 'Convert both years\' shares into tonnes before comparing.'],
      solution: ['Tonnes = total × share, for each year separately.',
        ...ord.map((i) => `${mats[i]}: ${g(T2, 1)} × ${g(s2[i], 1)}% − ${g(T1, 1)} × ${g(s1[i], 1)}% ${ap(ton[i], 2)} million tonnes.`),
        `${mats[key]} has the largest increase in tonnes.`],
      explanation: 'When the total changes, the largest rise in share is not necessarily the largest rise in tonnes.',
    };
  }
  return null;
};

HARD['Average price under tiered rates'] = (R, v) => {
  const sup = R.pickN(['Aurora Energy', 'Bluefield Power', 'Cedar Utilities', 'Delta Grid', 'Evergreen Supply', 'Fjord Electric'], 4);
  const rows = sup.map(() => { const a = R.f(0.18, 0.26, 3); const b = Math.round((a + R.f(0.04, 0.09, 3)) * 1000) / 1000; const c = Math.round((b + R.f(0.05, 0.12, 3)) * 1000) / 1000; return [R.f(6, 18, 2), a, b, c]; });
  const k = v % 4, [F, a, b, c] = rows[k], N = R.pick([650, 700, 780, 850, 920, 1000, 1150]);
  const cost = F + 200 * a + 300 * b + (N - 500) * c, key = cost / N;
  const o = [0, 1, 2, 3].filter((i) => i !== k);
  return {
    exhibits: [{ type: 'bar', title: 'Electricity prices per kWh by consumption band (EUR; fictional data)', unit: 'EUR per kWh', categories: sup,
      series: [{ name: 'First 200 kWh', values: rows.map((r) => r[1]) }, { name: 'Next 300 kWh', values: rows.map((r) => r[2]) }, { name: 'Above 500 kWh', values: rows.map((r) => r[3]) }],
      note: 'Each band price applies only to the kilowatt-hours inside that band.' },
      table('Standing charges', ['Supplier', 'Standing charge (EUR per month)'], rows.map((r, i) => [sup[i], g(r[0], 2)]))],
    stem: `A household uses ${g(N)} kWh in a month with ${sup[k]}. What is its average cost per kWh, including the standing charge (EUR)?`,
    key, fmt: (x) => 'EUR ' + g(x, 3),
    mistakes: [
      M((F + N * c) / N, 'Charges every kWh at the top band price.'),
      M((200 * a + 300 * b + (N - 500) * c) / N, 'Leaves out the standing charge.'),
      M((F + 200 * a + 100 * b + (N - 300) * c) / N, 'Treats the second band as ending at 300 kWh.'),
      M(F / N + (a + b + c) / 3, 'Averages the three band prices instead of weighting them by the kWh in each band.'),
      ...o.map((i) => M((rows[i][0] + 200 * rows[i][1] + 300 * rows[i][2] + (N - 500) * rows[i][3]) / N, `Uses ${sup[i]}'s tariff.`)),
    ],
    hints: ['Split the consumption into the three bands first.', 'Only the kWh above 500 are charged at the top price.'],
    solution: [`${g(N)} kWh = 200 (first band) + 300 (second band) + ${g(N - 500)} (above 500 kWh).`,
      `Energy cost = 200 × ${g(a, 3)} + 300 × ${g(b, 3)} + ${g(N - 500)} × ${g(c, 3)} = ${g(200 * a, 2)} + ${g(300 * b, 2)} + ${g((N - 500) * c, 2)} ${ap(cost - F, 2).replace(/[\d,.]+$/, (m) => 'EUR ' + m)}.`,
      `Total with the standing charge = ${g(cost - F, 2)} + ${g(F, 2)} ${ap(cost, 2).replace(/[\d,.]+$/, (m) => 'EUR ' + m)}.`,
      `Average = ${g(cost, 2)} ÷ ${g(N)} ${ap(key, 4).replace(/[\d,.]+$/, (m) => 'EUR ' + m)} per kWh.`],
    explanation: 'Band prices apply only within each band, as with income-tax bands; the standing charge is then spread over all kilowatt-hours.',
  };
};

HARD['Currency round trip with fees'] = (R, v) => {
  const cur = R.pickN(['ALD', 'BRV', 'CLM', 'DNK', 'EST', 'FRN', 'GLV', 'HLN'], 3), months = ['1 Mar', '1 Apr', '1 May', '1 Jun', '1 Jul', '1 Aug', '1 Sep'];
  const series = cur.map(() => { let x = R.f(4, 16, 2); return months.map(() => { const y = x; x = Math.round(x * R.f(0.95, 1.05, 3) * 100) / 100; return y; }); });
  const rows = series.map((sr) => [sr[0], sr[6]]);
  const k = v % 3, [r1, r2] = rows[k], f = R.pick([0.5, 0.8, 1, 1.2, 1.5, 2]), A = R.pick([5000, 8000, 10000, 12000, 20000]);
  if (Math.abs(r1 / r2 - 1) < 0.04) return null;
  const key = A * (1 - f / 100) ** 2 * r1 / r2;
  const o = [0, 1, 2].filter((i) => i !== k);
  return {
    exhibits: [{ type: 'line', title: 'Exchange rates on the first day of each month (fictional data)', unit: 'units of currency per EUR', categories: months,
      series: cur.map((c, i) => ({ name: c, values: series[i] })), note: `Each conversion costs a fee of ${g(f, 1)}% of the amount converted.` }],
    stem: `An investor converted EUR ${g(A)} into ${cur[k]} on 1 March and converted all of it back into euros on 1 September. How many euros did the investor end with?`,
    key, fmt: (x) => 'EUR ' + g(x, 2),
    mistakes: [
      M(A * r1 / r2, 'Leaves out both conversion fees.'),
      M(A * (1 - f / 100) * r1 / r2, 'Charges the fee on only one of the two conversions.'),
      M(A * (1 - f / 100) ** 2 * r2 / r1, 'Inverts the exchange-rate ratio (units per EUR must be divided on the way back).'),
      M(A * (1 - f / 100) ** 2 * r1 / series[k][5], 'Converts back at the 1 August rate.'),
      M(A * (1 - f / 100) ** 2 * series[k][1] / r2, 'Converts in at the 1 April rate.'),
      ...o.map((i) => M(A * (1 - f / 100) ** 2 * rows[i][0] / rows[i][1], `Uses the ${cur[i]} rates.`)),
    ],
    hints: ['Rates are units of currency per euro: multiply going in, divide coming back.', 'The fee is charged on each of the two conversions.'],
    solution: [`1 March: ${g(A)} × (1 − ${g(f, 1)}%) = EUR ${g(A * (1 - f / 100), 2)} is converted at ${g(r1, 2)}: ${g(A * (1 - f / 100) * r1, 2)} ${cur[k]}.`,
      `1 September: the fee leaves ${g(A * (1 - f / 100) * r1, 2)} × (1 − ${g(f, 1)}%) ${ap(A * (1 - f / 100) ** 2 * r1, 2)} ${cur[k]} to convert.`,
      `Back into euros: ${g(A * (1 - f / 100) ** 2 * r1, 2)} ÷ ${g(r2, 2)} ${ap(key, 2).replace(/[\d,.]+$/, (m) => 'EUR ' + m)}.`],
    explanation: 'With rates quoted per euro, the euro result depends on the ratio of the two rates, and the fee bites twice.',
  };
};

HARD['Price change needed for a target inflation'] = (R, v) => {
  const cats = ['Food', 'Housing', 'Transport', 'Energy', 'Health', 'Leisure'];
  for (let t = 0; t < 40; t++) {
    const w = cats.map(() => R.i(8, 30)), tot = sum(w);
    const wp = w.map((x) => Math.round(x / tot * 1000) / 10); wp[5] = Math.round((100 - sum(wp.slice(0, 5))) * 10) / 10;
    const ch = cats.map(() => R.f(0.3, 7.5, 1)), prev = cats.map(() => R.f(0.5, 6, 1)), k = v % 6, T = R.pick([2.5, 3, 3.5, 4, 4.5]);
    const known = sum(cats.map((_, i) => (i === k ? 0 : wp[i] * ch[i] / 100)));
    const key = (T - known) / (wp[k] / 100);
    const o = cats.map((_, i) => i).filter((i) => i !== k);
    if (key < 2 || key > 14 || wp[k] < 10) continue;
    return {
      exhibits: [{ type: 'pie', title: 'Weights in the consumer price index (%; fictional data)', unit: '%', slices: cats.map((c, i) => ({ label: c, value: wp[i] })) },
        { type: 'bar', title: `Price changes by category (%; ${cats[k].toLowerCase()} not yet published; fictional data)`, unit: '%', categories: o.map((i) => cats[i]),
          series: [{ name: 'Last year', values: o.map((i) => prev[i]) }, { name: 'This year', values: o.map((i) => ch[i]) }],
          note: 'Overall inflation this year is the weighted average of the category price changes.' }],
      stem: `What price change (%) for ${cats[k].toLowerCase()} would make overall inflation exactly ${g(T, 1)}%?`,
      key, fmt: (x) => g(x, 1) + '%',
      mistakes: [
        M(6 * T - sum(o.map((i) => ch[i])), 'Treats overall inflation as a simple average of the six categories.'),
        M((T - sum(o.map((i) => wp[i] * prev[i] / 100))) / (wp[k] / 100), 'Uses last year\'s price changes.'),
        M(T, 'Assumes the missing category must simply change by the target rate.'),
        ...o.map((i) => M((T - known) / (wp[i] / 100), `Divides by the weight of ${cats[i].toLowerCase()}.`)),
      ],
      hints: ['Work out how much the five known categories already contribute to inflation.', `The rest must come from ${cats[k].toLowerCase()}, in proportion to its weight.`],
      solution: [`Contribution of a category = weight × price change.`,
        `Known contributions: ${o.map((i) => `${g(wp[i], 1)}% × ${g(ch[i], 1)}%`).join(' + ')} ${ap(known, 3)} points.`,
        `${cats[k]} must add ${g(T, 1)} − ${g(known, 3)} ${ap(T - known, 3)} points.`,
        `Price change = ${g(T - known, 3)} ÷ ${g(wp[k], 1)}% ${ap(key, 2)}%.`],
      explanation: 'Each category contributes its weight times its price change, so the missing change is the remaining contribution divided by its weight.',
    };
  }
  return null;
};

HARD['Meeting point of two travellers'] = (R, v) => {
  const kinds = ['Delivery van', 'Bus', 'Cyclist', 'E-scooter', 'Lorry'];
  const rows = kinds.map((n) => (n === 'Cyclist' ? [R.f(14, 19, 1), R.f(18, 24, 1), R.f(20, 26, 1)] : n === 'E-scooter' ? [R.f(12, 17, 1), R.f(17, 22, 1), R.f(19, 24, 1)] : [R.f(24, 34, 1), R.f(38, 54, 1), R.f(70, 92, 1)]));
  const fastI = [0, 1, 4][v % 3], slowI = [2, 3][v % 2], col = 1, L = R.pick([18, 24, 27, 30, 36, 42]);
  const vf = rows[fastI][col], vs = rows[slowI][col], key = L * vf / (vf + vs);
  return {
    exhibits: [{ type: 'hbar', title: 'Average speeds by road type (fictional data)', unit: 'km/h', categories: ['Urban', 'Rural', 'Motorway or main road'],
      series: kinds.map((n, i) => ({ name: n, values: rows[i] })), note: 'Both travellers keep their average speed for the road type throughout.' }],
    stem: `${an(kinds[fastI].toLowerCase()).replace(/^a/, 'A')} and ${an(kinds[slowI].toLowerCase())} set off at the same time towards each other from the two ends of a ${L} km rural road. How far from the ${kinds[fastI].toLowerCase()}'s start do they meet (km)?`,
    key, fmt: (x) => g(x, 2) + ' km',
    mistakes: [
      M(L / 2, 'Assumes they meet halfway.'),
      M(L * vs / (vf + vs), `Gives the distance from the ${kinds[slowI].toLowerCase()}'s start.`),
      M(L * rows[fastI][0] / (rows[fastI][0] + rows[slowI][0]), 'Uses the urban speeds.'),
      M(L * rows[fastI][2] / (rows[fastI][2] + rows[slowI][2]), 'Uses the motorway or main-road speeds.'),
      M(L * vf / (vf + rows[[2, 3].find((i) => i !== slowI)][col]), `Uses the speed of the ${kinds[[2, 3].find((i) => i !== slowI)].toLowerCase()}.`),
      ...[0, 1, 4].filter((i) => i !== fastI).map((i) => M(L * rows[i][col] / (rows[i][col] + vs), `Uses the speed of the ${kinds[i].toLowerCase()}.`)),
    ],
    hints: ['Moving towards each other, the gap closes at the sum of the two speeds.', 'Each covers a share of the road in proportion to its speed.'],
    solution: [`Rural speeds: ${kinds[fastI].toLowerCase()} ${g(vf, 1)} km/h, ${kinds[slowI].toLowerCase()} ${g(vs, 1)} km/h.`,
      `They close the gap at ${g(vf, 1)} + ${g(vs, 1)} = ${g(vf + vs, 1)} km/h, so they meet after ${L} ÷ ${g(vf + vs, 1)} ${ap(L / (vf + vs), 4)} h.`,
      `Distance from the ${kinds[fastI].toLowerCase()}'s start = ${g(vf, 1)} × ${g(L / (vf + vs), 4)} = ${L} × ${g(vf, 1)} ÷ ${g(vf + vs, 1)} ${ap(key, 2)} km.`],
    explanation: 'Travelling towards each other, the closing speed is the sum of the speeds, and each covers a distance in proportion to its own speed.',
  };
};

// Reviewed November 2026: these six models need little insight, so they serve as Medium questions.
for (const name of ['Efficiency needed to keep a ratio', 'Population from an unchanged group', 'Missing value from a share of all types', 'Pension spending in euros', 'NO share of all eligible voters', 'Equivalent ticket price']) { MED[name] = HARD[name]; delete HARD[name]; }
// Retired challenge and Hard models of borderline length are kept in their original slots instead of being replaced.
const RESTORED = new Set(['Rates with changing base', 'Per-capita change', 'Market share in percentage points', 'Linked-index real per-capita change', 'Real pooled productivity', 'Reverse pooled success rate', 'Cross-currency landed cost']);

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
  if (t.category && t.category.build) {
    const ks = [0, 1, 2, 3, 4].filter((k) => t.category.build(k));
    return { ks, build: t.category.build };
  }
  if (t.category) {
    const { names, key, notes } = t.category, keyNote = t.category.keyNote || `Correct. ${names[key]} has the required rank by percentage increase.`;
    return { ks: [0, 1, 2, 3, 4], build: (k) => { const others = names.map((_, i) => i).filter((i) => i !== key); const ord = others.slice(0, k).concat([key], others.slice(k)); return { options: ord.map((i) => names[i]), answer: k, optionNotes: ord.map((i) => (i === key ? keyNote : notes[i])) }; } };
  }
  const gap = t.minGap || 0.03;
  const { key, fmt } = t, ks = fmt(key), sh = shown(t.exhibits);
  if (!(key > 0) || fmt(key * (1 + 1e-7)) !== fmt(key * (1 - 1e-7))) return null;
  const pool = [];
  for (const m of t.mistakes) {
    if (!isFinite(m.v) || m.v <= 0) continue;
    const s = fmt(m.v), pv = parseNum(s);
    if (s === ks || sh.has(pv) || pv / parseNum(ks) < 0.7 || pv / parseNum(ks) > 1.4) continue;
    // Spacing is checked on the displayed values, which are what candidates compare.
    const kv = parseNum(ks);
    if (Math.abs(pv - kv) / kv < gap || pool.some((p) => Math.abs(p.pv - pv) / kv < gap)) continue;
    pool.push({ ...m, s, pv });
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
const MED_NAMES = Object.keys(MED);
// Medium models in use: mostly charts of the kinds EU Training uses, plus race-time tables and one ranking table.
const MED_ACTIVE = ['Turnout and votes', 'Largest gap on an unlabelled chart', 'Weighted average with a ratio', 'People from the gap between two lines', 'Change in a 100% stacked chart',
  'Earlier amount from a pie chart', 'Constant annual increase', 'People employed from a rate line', 'Index change on a line chart', 'Distance gap at the finish',
  'Total from shares in a stacked chart', 'Difference between two pie slices', 'Amount needed for a target share', 'Percentage difference from a bar chart', 'NO share of all eligible voters',
  'Share change in a stacked chart', 'Population from an unchanged group', 'Rank of percentage increases', 'Equivalent ticket price', 'Time to reach top speed'];
// Older Medium topics that are arithmetic drills rather than data interpretation are replaced by chart-based items.
const REPLACE_MEDIUM = new Set(['Removing VAT', 'Break-even point', 'Fixed and variable costs', 'Combined work rates', 'Rates of work', 'Currency conversion', 'Multi-step: unit cost', 'Compound growth', 'Successive percentage changes', 'Percentages of percentages', 'Required growth rate', 'Averaging rates']);
// Category-answer models can take any key letter; spread them through the rotation so every set can balance its keys.
const FLEX = ['Best overall rate despite the mix', 'Year one overtakes another', 'Estimate from an unlabelled chart', 'Largest change in tonnes from two pie charts'];
const HARD_NAMES = (() => { const rest = Object.keys(HARD).filter((n) => !FLEX.includes(n)), out = []; rest.forEach((n, i) => { if (i % 3 === 0 && FLEX[i / 3]) out.push(FLEX[i / 3]); out.push(n); }); FLEX.forEach((n) => { if (!out.includes(n)) out.push(n); }); return out; })();
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
  const files = Array.from({ length: 16 }, (_, i) => path.join(dir, `numerical-set-${String(i + 1).padStart(2, '0')}.js`));
  const sets = files.map(loadSet);
  const used = {};
  const slots = [];
  // Challenge sets first: set s uses ten consecutive hard models (mod 14), so no model repeats inside a set.
  sets.forEach((set, si) => set.questions.forEach((q, qi) => {
    if (q.difficulty === 2 && REPLACE_MEDIUM.has(q.topic)) return slots.push({ si, qi, level: 2, challenge: false, fromEasy: false });
    if (q.difficulty === 2 || RESTORED.has(q.topic)) return;
    slots.push({ si, qi, level: q.difficulty === 1 ? 2 : 3, challenge: !!set.challenge, fromEasy: q.difficulty === 1 });
  }));
  // November 2026: 40 of the 56 former Easy slots become Hard (five in every seven, spread through Sets 01–04).
  slots.filter((s) => s.fromEasy).forEach((s, j) => { if (j % 7 < 5) s.level = 3; });
  const chall = slots.filter((s) => s.challenge), hard0 = slots.filter((s) => !s.challenge && s.level === 3), med = slots.filter((s) => s.level === 2);
  const bySet = {};
  chall.forEach((s) => { (bySet[s.si] = bySet[s.si] || []).push(s); });
  let offset = 0;
  Object.values(bySet).forEach((list) => { list.forEach((s, j) => { s.name = HARD_NAMES[(offset + j) % HARD_NAMES.length]; }); offset += list.length; });
  hard0.forEach((s, j) => { s.name = HARD_NAMES[(offset + j) % HARD_NAMES.length]; });
  med.forEach((s, j) => { s.name = MED_ACTIVE[j % MED_ACTIVE.length]; });
  for (const s of [...chall, ...hard0, ...med]) { s.variant = used[s.name] = (used[s.name] ?? -1) + 1; s.attempt = 0; }
  // Build and place per set with balanced key letters.
  sets.forEach((set, si) => {
    const mine = slots.filter((s) => s.si === si);
    if (!mine.length) return;
    let targets;
    const counts = [0, 0, 0, 0, 0];
    set.questions.forEach((q, qi) => { if (!mine.some((s) => s.qi === qi)) counts[q.answer]++; });
    if (set.challenge) targets = counts.map((c) => 2 - c);
    else {
      const total = set.questions.length, want = Math.ceil(total / 5) + (total <= 10 ? 0 : 2);
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
      // Last resort for a hard set: swap the most constrained model for a flexible one not yet in the set.
      if (round % 50 === 49) {
        const x = mine.slice().sort((a, b) => a.built.lay.ks.length - b.built.lay.ks.length)[0];
        const pool = (x.level === 3 ? HARD_NAMES : MED_ACTIVE).filter((n) => !mine.some((y) => y.name === n)).sort((a, b) => (used[a] ?? -1) - (used[b] ?? -1));
        for (const name of pool) {
          const alt = makeItem(name, x.level, (used[name] ?? -1) + 1, 0, need);
          if (alt) { x.name = name; x.variant = used[name] = (used[name] ?? -1) + 1; x.built = alt; x.attempt = alt.attempt; break; }
        }
      }
      if (round === 199) throw Error('cannot balance key letters in ' + set.id + ' targets ' + targets + ' ' + mine.map((x) => x.name + ':' + x.built.lay.ks.join('')).join(' / '));
    }
    mine.forEach((s) => {
      const old = set.questions[s.qi], { t, lay } = s.built, built = lay.build(s.k);
      const base = old.id.replace(/-r\d+$/, '');
      const q = { id: base + '-eu', supersedes: old.id, topic: s.name, difficulty: s.level };
      if (s.challenge) q.challenge = true;
      if (t.category) q.answerType = 'category';
      if (!built) throw Error('no layout for ' + s.name);
      Object.assign(q, { exhibits: t.exhibits, stem: t.stem, options: built.options, answer: built.answer, hints: t.hints,
        solution: [...t.solution, `Answer: ${built.options[built.answer]}.`], optionNotes: built.optionNotes, explanation: t.explanation });
      if (numericalDifficulty(q) !== s.level) throw Error('rubric level mismatch for ' + s.name);
      set.questions[s.qi] = q;
    });
    if (set.challenge) set.description = 'Ten hard data-interpretation questions in the EU Training style: short questions on tables and charts, with conditions in notes and physics included.';
    fs.writeFileSync(files[si], '/* Generated by scripts/generators/numerical.mjs (EU-format pass in numerical-eu.mjs). Edit the generators, not this file. */\nEPSO_BANK.registerSet(' + JSON.stringify(set, null, 2) + ');\n');
  });
  // Fingerprints: ids are immutable once recorded. Revised content (for example reworded worked solutions) is
  // registered once with REGISTER_EU_REVISIONS=1 and then appears under a new id (<root>-eu2) that supersedes the old one.
  const printFile = path.join(root, 'scripts/generators/numerical-eu-fingerprints.json');
  const revFile = path.join(root, 'scripts/generators/numerical-eu-revisions.json');
  const prints = fs.existsSync(printFile) ? JSON.parse(fs.readFileSync(printFile)) : null, fresh = {};
  const revs = fs.existsSync(revFile) ? JSON.parse(fs.readFileSync(revFile)) : { revisions: {} };
  let registered = 0, newPrints = 0;
  sets.forEach((set, si) => {
    let changed = false;
    set.questions = set.questions.map((q) => {
      if (!/-eu$/.test(q.id)) return q;
      const h = contentHash(q);
      if (!prints) { fresh[q.id] = h; return q; }
      if (prints[q.id] === h) return q;
      if (!(q.id in prints)) {
        if (!process.env.REGISTER_EU_REVISIONS) throw Error(`new EU-format item ${q.id}: register it with REGISTER_EU_REVISIONS=1`);
        prints[q.id] = h; newPrints++; return q;
      }
      // Follow the chain of registered revisions (-eu → -eu2 → -eu3 …); published versions are never edited.
      const { id: firstId, supersedes: original, ...rest } = q;
      let prevId = firstId, prevSha = prints[firstId], revised = null;
      for (;;) {
        const entry = revs.revisions[prevId];
        const nextId = firstId + String((Number((prevId.match(/-eu(\d*)$/) || [])[1]) || 1) + 1);
        const candidate = { id: nextId, supersedes: prevId, ...rest };
        if (!entry) {
          if (!process.env.REGISTER_EU_REVISIONS) throw Error(`EU-format item ${prevId} changed: register the revision with REGISTER_EU_REVISIONS=1`);
          revs.revisions[prevId] = { id: nextId, replaces: original, beforeSha256: prevSha, sha256: contentHash(candidate) };
          registered++; revised = candidate; break;
        }
        if (entry.id !== nextId) throw Error(`EU-format revision chain broken at ${prevId}`);
        if (entry.sha256 === contentHash(candidate)) { revised = candidate; break; }
        prevId = entry.id; prevSha = entry.sha256;
      }
      changed = true;
      return revised;
    });
    if (changed) fs.writeFileSync(files[si], '/* Generated by scripts/generators/numerical.mjs (EU-format pass in numerical-eu.mjs). Edit the generators, not this file. */\nEPSO_BANK.registerSet(' + JSON.stringify(set, null, 2) + ');\n');
  });
  // Restored retired items take back the slot that a published -eu item had held.
  revs.restored = revs.restored || {};
  sets.forEach((set) => set.questions.forEach((q) => {
    if (q.difficulty !== 3 || !RESTORED.has(q.topic)) return;
    const euId = q.id.replace(/-r\d+$/, '') + '-eu';
    if (!prints || !prints[euId]) return;
    if (revs.restored[euId] === q.id) return;
    if (!process.env.REGISTER_EU_REVISIONS) throw Error(`restoring ${q.id} over ${euId}: register with REGISTER_EU_REVISIONS=1`);
    revs.restored[euId] = q.id; registered++;
  }));
  if (!prints) fs.writeFileSync(printFile, JSON.stringify(fresh, null, 2) + '\n');
  else if (newPrints) fs.writeFileSync(printFile, JSON.stringify(prints, null, 2) + '\n');
  if (registered) fs.writeFileSync(revFile, JSON.stringify(revs, null, 2) + '\n');
  console.log('numerical EU format:', med.length + chall.length + hard0.length, 'items (', med.length, 'medium,', chall.length + hard0.length, 'hard );', Object.keys(revs.revisions).length, 'revised');
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
