// Independent answer check for the numerical bank (audit finding N13).
// Each item is re-solved from what the candidate sees: the exhibit text and the stem. The code shares
// nothing with scripts/generators/numerical.mjs, so a generator bug cannot confirm its own answer.
// Run: node --test tests/
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import crypto from "node:crypto";
import path from "node:path";
import vm from "node:vm";
import { numericalDifficulty, numericalRubric } from "../scripts/lib/difficulty.mjs";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ctx = { window: {} };
ctx.window.window = ctx.window;
vm.createContext(ctx);
const run = (f) => vm.runInContext(`(function(window){var EPSO_BANK=window.EPSO_BANK;${fs.readFileSync(f, "utf8")}\n})(window);`, ctx);
run(path.join(root, "questions/registry.js"));
run(path.join(root, "questions/manifest.js"));
ctx.window.EPSO_SET_FILES.filter((f) => f.startsWith("numerical/")).forEach((f) => run(path.join(root, "questions", f)));
const items = ctx.window.EPSO_BANK.sets.flatMap((s) => s.questions);

/* ---------- reading what is on screen ---------- */
const num = (s) => {
  if (typeof s === "number") return s;
  const m = String(s).replace(/[−–]/g, "-").replace(/,/g, "").match(/-?\d+(\.\d+)?/);
  return m ? parseFloat(m[0]) : NaN;
};
const lc = (s) => String(s).toLowerCase();
const sumOf = (a) => a.reduce((t, x) => t + x, 0);
const table = (q, k = 0) => q.exhibits.filter((e) => e.type === "table")[k];
const chart = (q) => q.exhibits.find((e) => e.type !== "table");
const colIdx = (ex, test) => ex.columns.findIndex((c) => (typeof test === "string" ? c.includes(test) : test.test(c)));
const col = (ex, test) => { const j = colIdx(ex, test); assert.ok(j > 0, "column " + test); return ex.rows.map((r) => num(r[j])); };
// Row labels mentioned in the stem, in the order they appear (longest label first wins at a position).
const named = (stem, labels) => labels.map((l, i) => ({ i, at: lc(stem).indexOf(lc(l)), len: l.length }))
  .filter((x) => x.at > -1 && !labels.some((o) => o !== labels[x.i] && o.length > x.len && lc(o).includes(lc(labels[x.i])) && lc(stem).includes(lc(o))))
  .sort((a, b) => a.at - b.at).map((x) => x.i);
const rowNamed = (q, ex) => { const n = named(q.stem, ex.rows.map((r) => r[0])); assert.ok(n.length >= 1, "row named in stem"); return n[0]; };
const catIdx = (ex, label) => ex.categories.findIndex((c) => c === label);
const yearsIn = (stem) => (stem.match(/\b(19|20)\d\d\b/g) || []);
const pieTotal = (ex) => num(ex.title.replace(/^[^(]*\(/, ""));
const slice = (ex, label) => ex.slices.find((s) => lc(s.label) === lc(label)).value;

/* ---------- solvers by topic ---------- */
const S = {
  "Real pooled productivity": q => {
    const data = table(q), indexes = table(q, 1), selected = named(q.stem, data.rows.map(r => r[0]));
    assert.equal(selected.length, 2);
    const totals = [1, 2, 3, 4].map(c => sumOf(selected.map(i => num(data.rows[i][c]))));
    const price = num(indexes.rows.find(r => r[0] === 'Casework')[2]);
    return (totals[1] * totals[2] * 100 / (price * totals[3] * totals[0]) - 1) * 100;
  },
  "Cross-currency landed cost": q => {
    const orders = table(q), terms = table(q, 1);
    return sumOf(named(q.stem, orders.rows.map(r => r[0])).map(i => {
      const r = orders.rows[i], p = terms.rows.find(s => s[0] === r[0]);
      const invoice = num(r[1]) * num(r[2]) - num(r[1]) * num(r[2]) * num(r[3]) / 100 + num(r[4]);
      const euros = invoice * num(p[1]);
      return euros + euros * num(p[2]) / 100;
    }));
  },
  "Reverse pooled success rate": q => {
    const ex = table(q), [i, j] = named(q.stem, ex.rows.map(r => r[0]));
    const A = ex.rows[i], B = ex.rows[j], target = num(table(q, 1).rows.find(r => r[0] === '2025')[1]) / 100;
    const survivingA = num(A[1]) - num(A[1]) * num(A[2]) / 100;
    const survivingB = num(B[1]) - num(B[1]) * num(B[2]) / 100;
    return 100 * (target + survivingA / survivingB * (target - num(A[3]) / 100));
  },
  "Recovered-output capacity": q => {
    const ex = table(q), [i, j] = named(q.stem, ex.rows.map(r => r[0]));
    const accepted = r => num(r[1]) - num(r[1]) * num(r[2]) / 100 + num(r[1]) * num(r[2]) * num(r[3]) / 10000;
    const A = ex.rows[i], B = ex.rows[j];
    const required = num(table(q, 1).rows.find(r => r[0] === 'Current')[1]);
    return (required - accepted(A) * num(A[4])) / accepted(B) - num(B[4]);
  },
  "Capped weighted redistribution": q => {
    const ex = table(q), target = ex.rows.findIndex(r => r[0] === q.stem.match(/What is (.+?)’s final|What is (.+?)'s final/).slice(1).find(Boolean)), r = table(q, 1).rows.find(r => r[0] === 'Current');
    const net = num(r[1]) * (100 - num(r[2])) * (100 - num(r[3])) / 10000;
    const w = ex.rows.map(r => num(r[1]) * num(r[2])), total = sumOf(w), cap = num(r[4]);
    const initial = net * w[target] / total, excess = Math.max(0, net * w[0] / total - cap);
    assert.ok(excess > 0, 'North cap must bind');
    return initial + excess * w[target] / (total - w[0]);
  },
  "Yield-adjusted profit threshold": q => {
    const ex = table(q), terms = table(q, 1).rows.find(r => r[0] === 'Current');
    const mix = [...q.stem.matchAll(/(\d+) saleable Kit [AB] units/g)].map(m => Number(m[1]));
    assert.equal(mix.length, 2);
    const perBatch = sumOf(mix.map((n, i) => {
      const r = ex.rows[i];
      return n * (100 * num(r[1]) / (100 + num(r[2])) - 100 * num(r[3]) / num(r[4]));
    }));
    const need = num(terms[1]) + num(terms[2]), batches = Math.ceil(need / perBatch);
    assert.ok(batches * perBatch >= need && (batches - 1) * perBatch < need, 'minimum feasible batch');
    return batches;
  },
  "Linked-index real per-capita change": q => {
    const ex = table(q), r = ex.rows[rowNamed(q, ex)], indices = table(q, 1);
    const old = indices.rows.find(r => r[0] === 'Old base'), fresh = indices.rows.find(r => r[0] === 'New base');
    const linked2025 = num(old[2]) * num(fresh[3]) / num(fresh[2]);
    const nominalRatio = num(r[2]) * num(r[3]) / (num(r[1]) * num(r[4]));
    return (nominalRatio * num(old[1]) / linked2025 - 1) * 100;
  },
  "Reverse stock flow with returns": q => {
    const ex = table(q), r = ex.rows[rowNamed(q, ex)], p = table(q, 1).rows.find(s => s[0] === r[0]);
    const shipped = num(r[2]) + num(r[3]), returns = shipped * num(r[4]) * num(p[1]) / 10000;
    return (num(p[3]) - num(r[1]) - returns + shipped) * 100 / (100 - num(p[2]));
  },
  "Hedged exchange-rate threshold": q => {
    const ex = table(q), r = ex.rows[rowNamed(q, ex)], p = table(q, 1).rows.find(s => s[0] === r[0]);
    const usd = num(r[1]) * num(r[2]), fixedEUR = usd * num(r[3]) * num(r[4]) / 100;
    const netRequired = num(p[1]) + num(p[2]);
    return (netRequired * 100 - fixedEUR * (100 - num(p[3]))) / ((usd * (100 - num(r[3])) / 100) * (100 - num(p[3])));
  },
  "Loss-adjusted emissions substitution": q => {
    const ex = table(q), gas = ex.rows.find(r => r[0] === 'Gas'), wind = ex.rows.find(r => r[0] === 'Wind');
    const emissionTotal = sumOf(ex.rows.map(r => num(r[1]) * num(r[3])));
    const target = num(table(q, 1).rows.find(r => r[0] === 'Current')[1]) / 100;
    // For x gross TWh wind, gas gross removed is x * wind delivery fraction / gas delivery fraction.
    const gasRemovedPerWind = (100 - num(wind[2])) / (100 - num(gas[2]));
    const x = emissionTotal * target / (gasRemovedPerWind * num(gas[3]) - num(wind[3]));
    assert.ok(x * gasRemovedPerWind <= num(gas[1]), 'replacement cannot exceed available Gas');
    return x;
  },
  "Percentage change of a total": (q) => { const ex = table(q); const [a, b] = yearsIn(q.stem); const A = sumOf(col(ex, a)), B = sumOf(col(ex, b)); return ((B - A) / A) * 100; },
  "Share of a total": (q) => {
    const ex = table(q), what = q.stem.match(/combined (\w+)/)[1];
    const v = col(ex, { GDP: "GDP", population: "Population", area: "Area" }[what]);
    const [x, y] = named(q.stem, ex.rows.map((r) => r[0]));
    return ((v[x] + v[y]) / sumOf(v)) * 100;
  },
  "Per-capita change": (q) => {
    const ex = table(q), x = rowNamed(q, ex);
    const g0 = col(ex, "GDP 2020")[x], g1 = col(ex, "GDP 2023")[x], p0 = col(ex, "Population 2020")[x], p1 = col(ex, "Population 2023")[x];
    return ((g1 / p1) / (g0 / p0) - 1) * 100;
  },
  "Percentage points": (q) => { const ex = chart(q), s = ex.series.find((x) => q.stem.includes(x.name)).values, [a, b] = yearsIn(q.stem); return s[catIdx(ex, b)] - s[catIdx(ex, a)]; },
  "Relative change": (q) => { const ex = chart(q), s = ex.series.find((x) => q.stem.includes(x.name)).values, [a, b] = yearsIn(q.stem); return (s[catIdx(ex, b)] / s[catIdx(ex, a)] - 1) * 100; },
  "Ratios from a chart": (q) => {
    const ex = chart(q), [A, B] = ex.series.map((s) => s.values), low = /lowest/.test(q.stem);
    const ratio = (lab) => { const i = catIdx(ex, lab); return A[i] / B[i]; };
    return q.options.slice().sort((p, r) => (low ? ratio(p) - ratio(r) : ratio(r) - ratio(p)))[0];
  },
  "Currency conversion": (q) => {
    const ex = table(q), m = q.stem.match(/On (1 \w+), a company converted (\w+) ([\d,]+) into (\w+)/);
    const j = ex.columns.indexOf(m[1]), rate = (code) => num(ex.rows.find((r) => r[0] === code)[j]);
    return (num(m[3]) / rate(m[2])) * rate(m[4]);
  },
  "Weighted average": (q) => {
    const ex = table(q), idx = named(q.stem, ex.rows.map((r) => r[0]));
    const w = ex.rows.map((r) => num(r[1])), v = ex.rows.map((r) => num(r[2]));
    return sumOf(idx.map((i) => w[i] * v[i])) / sumOf(idx.map((i) => w[i]));
  },
  "Removing VAT": (q) => {
    const ex = table(q), country = ex.rows.map((r) => r[1]).find((c) => q.stem.includes(c));
    return sumOf(ex.rows.filter((r) => r[1] === country).map((r) => num(r[2]) / (1 + num(r[3]) / 100)));
  },
  "Budget reallocation": (q) => {
    const pie = chart(q), m = q.stem.match(/If (\d+)% of the (.+?) budget is moved to (.+?), what/);
    return (pieTotal(pie) * (slice(pie, m[3]) + (slice(pie, m[2]) * num(m[1])) / 100)) / 100;
  },
  "Shares in a stacked chart": (q) => {
    const ex = chart(q), y = catIdx(ex, yearsIn(q.stem)[0]), part = ex.series.find((s) => lc(q.stem).includes(lc(s.name)));
    return (part.values[y] / sumOf(ex.series.map((s) => s.values[y]))) * 100;
  },
  "Rates with changing base": (q) => {
    const ex = table(q), x = rowNamed(q, ex), r = ex.rows[x].map(num);
    const n2 = (r[1] * r[2]) / 100 + r[4], b2 = r[1] * (1 + r[3] / 100);
    return (n2 / b2) * 100;
  },
  "Growth projection": (q) => {
    const ex = chart(q), s = ex.series.find((x) => lc(q.stem).includes(lc(x.name))).values;
    const ys = yearsIn(q.stem), last = ex.categories.length - 1, ahead = num(ys[2]) - num(ex.categories[last]);
    return s[last] * (s[last] / s[last - 1]) ** ahead;
  },
  "Units and per-capita values": (q) => {
    const ex = table(q), x = rowNamed(q, ex), total = num(ex.rows[x][1]), pop = num(ex.rows[x][2]) * 1e6;
    const unit = ex.columns[1].match(/\(([^)]+)\)/)[1], out = q.options[0].replace(/^[\d.,\s]+/, "");
    const base = { TWh: 1e9, "million m³": 1e6, "thousand tonnes": 1e6, thousand: 1e3, billion: 1e9 }[unit]; // in kWh, m³, kg, loans, km
    assert.ok(base, "unit " + unit + " → " + out);
    return (total * base) / pop;
  },
  "Rates of work": (q) => {
    const ex = table(q), x = rowNamed(q, ex), add = num(q.stem.match(/given (\d+) extra/)[1]), r = ex.rows[x].map(num);
    return r[3] / ((r[1] + add) * r[2]);
  },
  "Average speed": (q) => { const ex = table(q); return (sumOf(col(ex, "Distance")) / (sumOf(col(ex, "Travel time")) + sumOf(col(ex, "Stop")))) * 60; },
  "Successive percentage changes": (q) => { const ex = table(q), x = rowNamed(q, ex), r = ex.rows[x].map(num); return r[1] * (1 + r[2] / 100) * (1 + r[3] / 100) * (1 + r[4] / 100); },
  "Percentages of percentages": (q) => { const ex = table(q), x = rowNamed(q, ex), r = ex.rows[x].map(num); return (r[1] * r[2] * r[3]) / 10000; },
  "Per-capita comparison": (q) => {
    const ex = table(q), v = (name) => { const r = ex.rows.find((x) => x[0] === name).map(num); return (r[1] - r[2]) / r[3]; };
    return q.options.slice().sort((a, b) => v(b) - v(a))[0];
  },
  "Undoing a percentage change": (q) => { const ex = table(q), x = rowNamed(q, ex), r = ex.rows[x].map(num); return r[1] / (1 + r[2] / 100); },
  "Multi-step: unit cost": (q) => { const ex = table(q), x = rowNamed(q, ex), r = ex.rows[x].map(num); return (r[1] * 1e6 * (1 - r[3] / 100)) / (r[2] * 1e3); },
  "Shares to amounts": (q) => { const pie = chart(q), v = pie.slices.map((s) => s.value).sort((a, b) => b - a); return (pieTotal(pie) * (v[0] - v[1])) / 100; },
  "Averaging rates": (q) => {
    const ex = table(q), idx = named(q.stem, ex.rows.map((r) => r[0])), n = col(ex, "Candidates"), p = col(ex, "Pass rate");
    return (sumOf(idx.map((i) => (n[i] * p[i]) / 100)) / sumOf(idx.map((i) => n[i]))) * 100;
  },
  "Compound growth": (q) => { const ex = table(q), x = rowNamed(q, ex), r = ex.rows[x].map(num); return r[1] * (1 + r[2] / 100) ** r[3]; },
  "Highest share in a stacked chart": (q) => {
    const ex = chart(q), part = ex.series.find((s) => lc(q.stem).includes(lc(s.name)));
    const share = (name) => { const i = catIdx(ex, name); return part.values[i] / sumOf(ex.series.map((s) => s.values[i])); };
    return q.options.slice().sort((a, b) => share(b) - share(a))[0];
  },
  "Combining two exhibits": (q) => {
    const pie = chart(q), ex = table(q), x = rowNamed(q, ex), region = ex.rows[x][0];
    return (pieTotal(pie) * 1e6 * slice(pie, region)) / 100 / (num(ex.rows[x][1]) * 1000);
  },
  "Index numbers: values": (q) => {
    const ex = table(q), x = rowNamed(q, ex), y = yearsIn(q.stem)[0];
    return (num(ex.rows[x][ex.columns.length - 1]) * num(ex.rows[x][ex.columns.indexOf(y)])) / 100;
  },
  "Index numbers: percentage change": (q) => {
    const ex = table(q), x = rowNamed(q, ex), [a, b] = yearsIn(q.stem);
    return (num(ex.rows[x][ex.columns.indexOf(b)]) / num(ex.rows[x][ex.columns.indexOf(a)]) - 1) * 100;
  },
  "Market share in percentage points": (q) => {
    const ex = table(q), x = rowNamed(q, ex), [a, b] = yearsIn(q.stem), A = col(ex, a), B = col(ex, b);
    return (B[x] / sumOf(B) - A[x] / sumOf(A)) * 100;
  },
  "Required growth rate": (q) => { const ex = table(q), x = rowNamed(q, ex), [a, b] = yearsIn(q.stem), r = ex.rows[x].map(num); return ((r[2] / r[1]) ** (1 / (num(b) - num(a))) - 1) * 100; },
  "Fixed and variable costs": (q) => { const ex = table(q), x = rowNamed(q, ex), n = num(q.stem.match(/with (\d+) participants/)[1]), r = ex.rows[x].map(num); return (r[1] + n * (r[2] + r[3])) / n; },
  "Break-even point": (q) => {
    const ex = table(q), [a, b] = named(q.stem, ex.rows.map((r) => r[0])), A = ex.rows[a].map(num), B = ex.rows[b].map(num);
    return (A[1] - B[1]) / (B[2] - A[2]);
  },
  "Proportional allocation": (q) => { const ex = table(q), x = rowNamed(q, ex), amount = num(q.stem.match(/EUR ([\d.,]+) million/)[1]), p = col(ex, "Population"); return (amount * p[x]) / sumOf(p); },
  "Discounts and VAT": (q) => { const ex = table(q), x = rowNamed(q, ex), n = num(q.stem.match(/orders (\d+)/)[1]), r = ex.rows[x].map(num); return n * r[1] * (1 - r[2] / 100) * (1 + r[3] / 100); },
  "Unit price comparison": (q) => {
    const ex = table(q), perKg = (name) => { const r = ex.rows.find((x) => x[0] === name), kg = /kg$/.test(r[1]) ? num(r[1]) : num(r[1]) / 1000; return num(r[2]) / kg; };
    return q.options.slice().sort((a, b) => perKg(a) - perKg(b))[0];
  },
  "Largest gap on a line chart": (q) => { const ex = chart(q), [A, B] = ex.series.map((s) => s.values), g = (y) => A[catIdx(ex, y)] - B[catIdx(ex, y)]; return q.options.slice().sort((a, b) => g(b) - g(a))[0]; },
  "Largest relative gap on a line chart": (q) => { const ex = chart(q), [A, B] = ex.series.map((s) => s.values), g = (y) => A[catIdx(ex, y)] / B[catIdx(ex, y)]; return q.options.slice().sort((a, b) => g(b) - g(a))[0]; },
  "Combined work rates": (q) => {
    const ex = table(q), [a, b] = named(q.stem, ex.rows.map((r) => r[0])), n = num(q.stem.match(/need for ([\d,]+)/)[1]);
    return (n / (num(ex.rows[a][1]) + num(ex.rows[b][1]))) * 60;
  },
  "Percentage difference between two items": (q) => {
    const ex = table(q), [x, y] = named(q.stem, ex.rows.map((r) => r[0])), pc = (i) => num(ex.rows[i][1]) / num(ex.rows[i][2]);
    return (pc(x) / pc(y) - 1) * 100;
  },
  "Averages over part of a period": (q) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const ex = table(q), x = rowNamed(q, ex), m = q.stem.match(/from (\w+) to (\w+) inclusive/), a = months.indexOf(m[1]), b = months.indexOf(m[2]);
    const vals = ex.rows[x].slice(1 + a, 2 + b).map(num);
    return sumOf(vals) / vals.length;
  }
};

// Separate reconstruction from visible tables; no generator imports or stored answers.
const expansionRow=q=>q.exhibits[0].rows.find(r=>r[0]===q.stem.match(/(?:district|Tank|code|Plan|account|office|route|asset|club|line) ([A-D])[, .]/)[1]);
S['Sequential screening posterior']=q=>{const [,p,s,f,t,g]=expansionRow(q);const trueBoth=p*s*t,falseBoth=(100-p)*f*g;return 100*trueBoth/(trueBoth+falseBoth);};
S['Evaporation and replacement mixture']=q=>{const [,v,c,d,e,h]=expansionRow(q),tar=q.exhibits[1].rows[0][1]/100,water=Number(q.stem.match(/and exactly (\d+) litres/)[1]);const mass=v*c/100*(100-d)/100,remaining=v*(100-d)/100*(100-e)/100;return (tar*(remaining+water)-mass)/(h/100-tar);};
S['Inverse capped-contribution taxation']=q=>{const [,allow,band,lo,hi,rate,cap]=expansionRow(q),[,net,credit]=q.exhibits[1].rows[0];const takeHome=g=>{const contribution=Math.min(g*rate/100,cap),taxable=Math.max(0,g-contribution-allow);return g-contribution-Math.min(taxable,band)*lo/100-Math.max(0,taxable-band)*hi/100+credit;};let low=0,high=1000000;for(let i=0;i<70;i++){const mid=(low+high)/2;if(takeHome(mid)<net)low=mid;else high=mid;}assert.ok(high*rate/100>cap);assert.ok(high-cap-allow>band);return high;};
S['Reverse savings with intervening withdrawal']=q=>{const [,a,b,tax,fee,w]=expansionRow(q),target=q.exhibits[1].rows[0][1];const secondStart=target/(1-fee/100)/(1+b/100*(1-tax/100));return (secondStart+w)/(1+a/100*(1-tax/100));};
S['Fee-sensitive portfolio rebalance']=q=>{const [,x,y,rise,fall,fee]=expansionRow(q),t=q.exhibits[1].rows[0][1]/100;const a=x*(100+rise)/100,b=y*(100-fall)/100;let lo=0,hi=b;for(let i=0;i<70;i++){const sale=(lo+hi)/2,finalX=a+sale*(100-fee)/100,finalY=b-sale;if(finalX/(finalX+finalY)<t)lo=sale;else hi=sale;}assert.ok(hi>0&&hi<b);return hi;};
S['Deduplicated workload with conditional rework']=q=>{const [,web,desk,both,w,d]=expansionRow(q),[,capacity,repeat]=q.exhibits[1].rows[0];const counts=[web-both,desk-both,both],rates=[w,d,(w+d)/2];const initial=counts.reduce((a,b)=>a+b,0),extra=counts.reduce((total,n,i)=>total+n*rates[i]/100*repeat/100,0);const days=Math.ceil((initial+extra)/capacity);assert.ok((days-1)*capacity<initial+extra);return days;};
S['Emissions-constrained minimum journey time']=q=>{const [,distance,slow,fast,es,ef]=expansionRow(q),[,budget,stop]=q.exhibits[1].rows[0];const fastKm=(budget-distance*es)/(ef-es);assert.ok(fastKm>0&&fastKm<distance);return (distance-fastKm)/slow*60+fastKm/fast*60+stop;};
S['Replacement finance after taxed disposal']=q=>{const [,original,dep,years,sale,tax,debt]=expansionRow(q),[,price,fee]=q.exhibits[1].rows[0];let book=original;for(let i=0;i<years;i++)book-=book*dep/100;const proceeds=sale-Math.max(0,sale-book)*tax/100-debt;return (price-proceeds)/(1-fee/100);};
S['Reverse entrant composition after cohort attrition']=q=>{const [,opening,p,pr,other,entrants]=expansionRow(q),[,target,er]=q.exhibits[1].rows[0];const retainedP=opening*p/100*pr/100,retainedOther=opening*(1-p/100)*other/100,retainedEntrants=entrants*er/100;const required=(retainedP+retainedOther+retainedEntrants)*target/100;const share=100*(required-retainedP)/retainedEntrants;assert.ok(share>0&&share<100);return share;};
S['Indivisible capacity after serial losses']=q=>{const [,demand,loss,reject,rate,down]=expansionRow(q),[,hours,days,price,setup]=q.exhibits[1].rows[0];const deliveredPerModule=hours*days*(1-down/100)*rate*(1-loss/100)*(1-reject/100);let modules=0;while(modules*deliveredPerModule<demand)modules++;assert.ok((modules-1)*deliveredPerModule<demand);return setup+modules*price;};

test("every numerical topic has an independent solver", () => {
  const missing = [...new Set(items.map((q) => q.topic))].filter((t) => !S[t]);
  assert.deepEqual(missing, []);
});

test("every numerical key matches an independent re-calculation", () => {
  const bad = [];
  for (const q of items) {
    let got;
    try { got = S[q.topic](q); } catch (e) { bad.push(`${q.id} (${q.topic}): solver failed: ${e.message}`); continue; }
    if (q.answerType === "category") {
      if (got !== q.options[q.answer]) bad.push(`${q.id}: solver picks ${got}, key is ${q.options[q.answer]}`);
      continue;
    }
    const vals = q.options.map(num);
    const closest = vals.map((v, i) => [Math.abs(v - got), i]).sort((a, b) => a[0] - b[0])[0][1];
    const decimals = (String(q.options[q.answer]).replace(/,/g, "").match(/\d+\.(\d+)/) || ["", ""])[1].length;
    const tol = 0.5 * 10 ** -decimals + 1e-9 * Math.abs(got);
    if (closest !== q.answer || Math.abs(vals[q.answer] - got) > tol) bad.push(`${q.id} (${q.topic}): re-calculated ${got}, key ${q.options[q.answer]}`);
  }
  assert.deepEqual(bad, []);
});


test("seven challenge sets have ten distinct models, balanced keys and genuine mistake notes", () => {
  const sets = ctx.window.EPSO_BANK.sets.filter(s => s.challenge);
  assert.equal(sets.length, 7);
  for (const set of sets) {
    assert.equal(set.questions.length, 10);
    assert.equal(new Set(set.questions.map(q => q.topic)).size, 10);
    assert.deepEqual([0, 1, 2, 3, 4].map(i => set.questions.filter(q => q.answer === i).length), [2, 2, 2, 2, 2]);
    for (const q of set.questions) {
      assert.equal(q.difficulty, 3);
      assert.ok(numericalRubric(q).stages >= 4);
      assert.ok(q.optionNotes.every(n => !/not derived from|recheck each step/i.test(n)));
      const answer = S[q.topic](q);
      const decimals = (q.options[q.answer].replace(/,/g, '').match(/\d+\.(\d+)/) || ['', ''])[1].length;
      const tolerance = .5 * 10 ** -decimals + 1e-9;
      assert.equal(q.options.filter(o => Math.abs(num(o) - answer) <= tolerance).length, 1, q.id + ' must have exactly one rounded answer');
      if (q.topic === 'Reverse pooled success rate') assert.ok(answer >= 0 && answer <= 100);
    }
  }
});

test("numerical level follows reviewed reasoning, never table size or solution verbosity", () => {
  const easy = items.find(q => q.topic === 'Percentage change of a total');
  assert.equal(numericalDifficulty(easy), 1);
  assert.equal(numericalDifficulty({ ...easy, solution: Array(30).fill('1 + 2 = 3'), exhibits: [...easy.exhibits, ...easy.exhibits] }), 1);
  assert.throws(() => numericalDifficulty({ topic: 'Unreviewed topic' }), /editorial difficulty review/);
});

test('the entire numerical bank uses named mistake distractors', () => {
  for (const q of items) for (let i=0;i<q.options.length;i++) {
    if (i!==q.answer) assert.doesNotMatch(q.optionNotes[i], /not derived from a typical mistake|generic filler/i, q.id);
  }
});


test('foundation revisions keep fresh IDs and immutable reviewed generator fingerprints', () => {
  const revisions=JSON.parse(fs.readFileSync(path.join(root,'scripts/generators/numerical-revisions.json')));
  const revised=items.filter(q=>q.supersedes);
  assert.equal(revised.length,150);
  for(const {id,supersedes,...q} of revised){
    assert.notEqual(id,supersedes);
    assert.equal(revisions[supersedes].id,id);
    assert.equal(crypto.createHash('sha256').update(JSON.stringify(q)).digest('hex'),revisions[supersedes].sha256,id);
  }
});
