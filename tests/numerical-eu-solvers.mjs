// Independent solvers for the EU Training-format numerical models (ids ending -eu).
// Each one reads only what the candidate sees — the stem, the exhibits and their notes — and shares no code
// with scripts/generators/numerical-eu.mjs.
const num = (s) => {
  if (typeof s === 'number') return s;
  const m = String(s).replace(/[−–]/g, '-').replace(/,/g, '').match(/-?\d+(\.\d+)?/);
  if (!m) throw Error('no number in ' + s);
  return parseFloat(m[0]);
};
const total = (a) => a.reduce((t, x) => t + x, 0);
const lc = (s) => String(s).toLowerCase();
const secs = (s) => { const [m, x] = String(s).split(':'); return Number(m) * 60 + Number(x); };
const tableOf = (q, k = 0) => q.exhibits.filter((e) => e.type === 'table')[k];
const chartOf = (q, type) => q.exhibits.find((e) => e.type === type);
const notes = (q) => q.exhibits.map((e) => e.note || '').join(' ');
const column = (ex, label) => { const j = ex.columns.findIndex((c) => c.includes(label)); if (j < 1) throw Error('no column ' + label); return j; };
// Rows named in a text, in order of appearance.
const rowsIn = (text, ex) => ex.rows.map((r, i) => ({ i, at: text.indexOf(r[0]) })).filter((x) => x.at >= 0).sort((a, b) => a.at - b.at).map((x) => x.i);
const firstRow = (q, ex, text = q.stem) => { const r = rowsIn(text, ex); if (!r.length) throw Error('no row named'); return ex.rows[r[0]]; };
const m1 = (re, s) => { const m = s.match(re); if (!m) throw Error('pattern ' + re + ' not in: ' + s); return m; };
const shareWord = (s) => (/one third/.test(s) ? 1 / 3 : /one quarter/.test(s) ? 1 / 4 : NaN);
const votes = (q) => {
  const ex = chartOf(q, 'combo');
  const bars = ex.series.filter((s) => !s.line), t = ex.series.find((s) => s.line).values;
  const yes = bars.find((s) => /YES/.test(s.name)).values, no = bars.find((s) => /NO/.test(s.name)).values;
  return { ex, yes, no, t };
};

export const EU_SOLVERS = {
  'Turnout and votes': (q) => {
    const { ex, yes, no, t } = votes(q), i = ex.categories.indexOf(m1(/of (District \d)/, q.stem)[1]);
    return t[i] * no[i] / (yes[i] + no[i]);
  },
  'Funds raised per fundraiser': (q) => {
    const ex = tableOf(q), r = firstRow(q, ex), p = num(m1(/rose by (\d+)%/, q.stem)[1]);
    return r[column(ex, 'spending Y1')] * (1 + p / 100) * num(r[column(ex, 'Efficiency Y2')]) * 1000 / num(r[column(ex, 'Fundraisers Y2')]);
  },
  'Population from per-capita change': (q) => {
    const ex = tableOf(q), r = firstRow(q, ex), p = num(m1(/rose by (\d+)%/, q.stem)[1]);
    const [, a, b] = m1(/from (\d{4}) to (\d{4})/, q.stem);
    const perHead = num(r[column(ex, 'Sales ' + a)]) / num(r[column(ex, 'Population ' + a)]);
    return num(r[column(ex, 'Sales ' + b)]) / (perHead * (1 + p / 100));
  },
  'Constant annual increase': (q) => {
    const ex = tableOf(q), r = firstRow(q, ex);
    const [, a, b] = m1(/between (\d{4}) and (\d{4})/, q.stem), target = num(m1(/be in (\d{4})/, q.stem)[1]);
    const va = num(r[column(ex, a)]), vb = num(r[column(ex, b)]);
    return vb + (vb - va) / (b - a) * (target - b);
  },
  'Missing value from a known share': (q) => {
    const ex = tableOf(q), p = num(m1(/Exactly (\d+)%/, q.stem)[1]), j = column(ex, 'Grand');
    const row = ex.rows.find((r) => r[j] === '—');
    const others = total(ex.rows.filter((r) => r !== row).map((r) => num(r[j])));
    return others * p / (100 - p) + num(row[column(ex, 'Upright')]) + num(row[column(ex, 'Electric')]);
  },
  'Weighted average with a ratio': (q) => {
    const ex = chartOf(q, 'hbar'), s = ex.series.find((x) => q.stem.startsWith(x.name));
    const n = num(m1(/had (\d+) times/, q.stem)[1]), r = num(m1(/fell to (\d+) minutes/, q.stem)[1]);
    return (n * s.values[ex.categories.indexOf('Urban')] + r) / (n + 1);
  },
  'Rank of percentage increases': (q) => {
    const ex = tableOf(q), [, a, b] = m1(/between (\d{4}) and (\d{4})/, q.stem);
    const rank = { second: 1, third: 2 }[m1(/the (second|third)-largest/, q.stem)[1]];
    const ja = column(ex, a), jb = column(ex, b);
    const ranked = ex.rows.map((r) => ({ n: r[0], c: num(r[jb]) / num(r[ja]) - 1 })).sort((x, y) => y.c - x.c);
    return ranked[rank].n;
  },
  'Amount needed for a target share': (q) => {
    const ex = tableOf(q), y = m1(/carry in (\d{4})/, q.stem)[1], j = column(ex, y), r = firstRow(q, ex), s = shareWord(q.stem);
    const others = total(ex.rows.filter((x) => x !== r).map((x) => num(x[j])));
    return others * s / (1 - s);
  },
  'Total from shares in a stacked chart': (q) => {
    const ex = chartOf(q, 'stacked'), P = num(m1(/was ([\d.]+) million/, q.stem)[1]);
    const [, a, b] = m1(/: (\d+)% aged 18–34, (\d+)% aged 35–59/, q.stem), w = [num(a), num(b)];
    w.push(100 - w[0] - w[1]);
    const v = ex.series.find((s) => s.name === 'Agree somewhat').values;
    return P * total(v.map((x, i) => x * w[i])) / 10000;
  },
  'Monthly pension payments': (q) => {
    const ex = tableOf(q), r = firstRow(q, ex);
    return num(r[column(ex, 'Population')]) * num(r[column(ex, 'Pensioners')]) / 100 * num(r[column(ex, 'monthly pension')]);
  },
  'Earlier amount from a pie chart': (q) => {
    const pie = chartOf(q, 'pie'), T = num(m1(/total ([\d.,]+) million/, pie.title)[1]), d = num(m1(/was ([\d.]+) million tonnes more/, q.stem)[1]);
    const sl = pie.slices.find((s) => lc(q.stem).includes('much ' + lc(s.label) + ' waste'));
    return (T - d) * sl.value / 100;
  },
  'Distance gap at the finish': (q) => {
    const ex = tableOf(q), stroke = m1(/In the (\w+) final/, q.stem)[1];
    const j = ex.columns.findIndex((c) => lc(c) === stroke), t = ex.rows.map((r) => secs(r[j]));
    return 200 * (1 - Math.min(...t) / Math.max(...t));
  },
  'Time to reach top speed': (q) => {
    const ex = tableOf(q), j = column(ex, '100 m'), d = num(m1(/first (\d+) m/, q.stem)[1]), v = num(m1(/at ([\d.]+) m\/s/, q.stem)[1]);
    return Math.min(...ex.rows.map((r) => num(r[j]))) - (100 - d) / v;
  },
  'NO share of all eligible voters': (q) => {
    const { yes, no, t } = votes(q);
    return 100 * total(no) / total(yes.map((y, i) => (y + no[i]) * 100 / t[i]));
  },
  'Per-capita gap after population change': (q) => {
    const ex = tableOf(q), [x, z] = rowsIn(q.stem, ex).map((i) => ex.rows[i]), y = m1(/in (\d{4})\?/, q.stem)[1];
    const pc = (r) => num(r[column(ex, 'Tickets ' + y)]) / (num(r[column(ex, 'Population 2')]) * (1 + num(r[column(ex, 'change')]) / 100));
    return (pc(x) / pc(z) - 1) * 100;
  },
  'Average after two changes': (q) => {
    const ex = chartOf(q, 'hbar'), s = ex.series.find((x) => q.stem.startsWith('If ' + x.name));
    const [U, Rr, A] = ['Urban', 'Rural', 'Overall'].map((c) => s.values[ex.categories.indexOf(c)]);
    const up = num(m1(/rose by (\d+) minutes/, q.stem)[1]), r = num(m1(/fell to (\d+) minutes/, q.stem)[1]);
    const n = (Rr - A) / (A - U);
    return (n * (U + up) + r) / (n + 1);
  },
  'Top speed from a race time': (q) => {
    const ex = tableOf(q), d = num(m1(/first (\d+) m/, notes(q))[1]);
    const place = { winning: 0, second: 1, third: 2, fourth: 3 }[m1(/the (\w+)-placed/, q.stem)[1]];
    const t = ex.rows.map((r) => num(r[column(ex, '100 m')])).sort((a, b) => a - b);
    return (100 + d) / t[place];
  },
  'Catching up at constant speeds': (q) => {
    const ex = tableOf(q), L = num(m1(/starts (\d+) m ahead/, q.stem)[1]), ev = m1(/their ([\d,]+ m) race speeds/, q.stem)[1];
    const j = ex.columns.indexOf(ev), d = num(ev), [slow, fast] = rowsIn(q.stem, ex).map((i) => ex.rows[i]);
    const vf = d / secs(fast[j]), vs = d / secs(slow[j]);
    return vf * L / (vf - vs);
  },
  'Missing value from a share of all types': (q) => {
    const ex = tableOf(q), p = num(m1(/exactly (\d+)%/, notes(q))[1]), row = firstRow(q, ex);
    const others = total(ex.rows.filter((r) => r !== row).flatMap((r) => r.slice(1).map(num)));
    return others * p / (100 - p) - total(row.slice(1).filter((c) => c !== '—').map(num));
  },
  'Change in a remainder group': (q) => {
    const ex = chartOf(q, 'line'), [, p1, y1, p2, y2] = m1(/was ([\d.]+) million in (\d{4}) and ([\d.]+) million in (\d{4})/, q.stem);
    const rest = (y) => { const i = ex.categories.indexOf(y); return 100 - total(ex.series.map((s) => s.values[i])); };
    return (rest(y2) * num(p2) / (rest(y1) * num(p1)) - 1) * 100;
  },
  'Population from an unchanged group': (q) => {
    const ex = chartOf(q, 'line'), [, p1, y1] = m1(/There were ([\d.]+) million adults in (\d{4})/, q.stem), y2 = m1(/from \d{4} to (\d{4})/, q.stem)[1];
    const fav = ex.series.find((s) => s.name === 'In favour').values, ag = ex.series.find((s) => s.name === 'Against').values;
    const i1 = ex.categories.indexOf(y1), i2 = ex.categories.indexOf(y2);
    return num(p1) * fav[i1] / fav[i2] * ag[i2] / 100;
  },
  'Projected share against a past amount': (q) => {
    const pie = chartOf(q, 'pie'), tab = tableOf(q), T = num(m1(/total ([\d.,]+) million/, pie.title)[1]);
    const [, qg, name, r, past] = m1(/grows by (\d+)% and the (.+?) share rises by ([\d.]+) percentage points.*exceed its (\d{4}) level/, q.stem);
    const sl = pie.slices.find((s) => lc(s.label) === name), row = tab.rows.find((x) => lc(x[0]) === name);
    const proj = T * (1 + num(qg) / 100) * (sl.value + num(r)) / 100;
    return (proj / num(row[column(tab, past)]) - 1) * 100;
  },
  'Growth needed to hold a share': (q) => {
    const ex = tableOf(q), g = num(m1(/grows by (\d+)%/, notes(q))[1]), y = m1(/from (\d{4}) to 2025/, q.stem)[1], j = column(ex, y);
    const row = firstRow(q, ex), s = shareWord(q.stem), others = total(ex.rows.filter((r) => r !== row).map((r) => num(r[j])));
    return (others * (1 + g / 100) * s / (1 - s) / num(row[j]) - 1) * 100;
  },
  'Turnout needed to change the result': (q) => {
    const { ex, yes, no, t } = votes(q), i = ex.categories.indexOf(m1(/in (District \d) had voted/, q.stem)[1]);
    const lead = total(no) - total(yes), eligible = (yes[i] + no[i]) * 100 / t[i];
    return t[i] + 100 * lead / eligible;
  },
  'Efficiency needed to keep a ratio': (q) => {
    const ex = tableOf(q), n = notes(q), row = firstRow(q, ex, n);
    const a = num(m1(/(\d+)% more fundraisers/, n)[1]), b = num(m1(/spend (\d+)% more/, n)[1]);
    return num(row[column(ex, 'Funds raised')]) * (1 + a / 100) / (num(row[column(ex, 'spending')]) * (1 + b / 100));
  },
  'Equivalent ticket price': (q) => {
    const ex = chartOf(q, 'bar'), n = notes(q), day = m1(/concert on (\w+)/, q.stem)[1];
    const rate = num(m1(/EUR ([\d.]+) per hour/, n)[1]), hours = num(m1(/average of ([\d.]+) hours/, n)[1]), fee = num(m1(/entry fee of EUR ([\d.]+)/, n)[1]);
    const guests = num(m1(/for (\d+) paying guests/, q.stem)[1]), costs = num(m1(/costs of EUR (\d+)/, q.stem)[1]);
    const v = ex.series.find((s) => s.name === day).values, size = ex.categories.map(num);
    return (total(v) * hours * rate + total(v.map((x, i) => x * size[i])) * fee + costs) / guests;
  },
  'Pension spending in euros': (q) => {
    const ex = tableOf(q), fx = tableOf(q, 1);
    return total(rowsIn(q.stem, ex).map((i) => {
      const r = ex.rows[i], cur = r[column(ex, 'Average pension')].split(' ').pop();
      const rate = num(fx.rows.find((x) => x[0] === cur)[1]);
      return num(r[column(ex, 'Population')]) * num(r[column(ex, 'Pensioners')]) / 100 * num(r[column(ex, 'Average pension')]) * num(r[column(ex, 'Payments')]) / rate;
    }));
  },
  'Capped proportional allocation': (q) => {
    const ex = tableOf(q), n = notes(q), X = num(m1(/EUR (\d+) million is shared/, n)[1]), C = num(m1(/more than EUR (\d+) million/, n)[1]);
    const pop = Object.fromEntries(ex.rows.map((r) => [r[0], num(r[1])])), capped = new Set();
    for (;;) {
      const free = Object.keys(pop).filter((r) => !capped.has(r)), budget = X - C * capped.size, base = total(free.map((r) => pop[r]));
      const over = free.filter((r) => budget * pop[r] / base > C);
      if (!over.length) { const r = m1(/does (\w+) receive/, q.stem)[1]; return capped.has(r) ? C : budget * pop[r] / base; }
      over.forEach((r) => capped.add(r));
    }
  },
  'Year one overtakes another': (q) => {
    const ex = tableOf(q), [, a, b] = m1(/would (.+?)'s exports first exceed (.+?)'s\?/, q.stem);
    const get = (name) => { const r = ex.rows.find((x) => x[0] === name); return [num(r[column(ex, 'Exports 2024')]), num(r[column(ex, 'growth')])]; };
    const [va, ga] = get(a), [vb, gb] = get(b);
    let n = 1; while (va * (1 + ga / 100) ** n <= vb * (1 + gb / 100) ** n) n++;
    return String(2024 + n);
  },
  'Best overall rate despite the mix': (q) => {
    const ex = tableOf(q), rate = (r) => (num(r[1]) * num(r[2]) + num(r[3]) * num(r[4])) / (num(r[1]) + num(r[3]));
    return ex.rows.slice().sort((x, y) => rate(y) - rate(x))[0][0];
  },
  'True share of positive results': (q) => {
    const ex = tableOf(q), r = ex.rows.find((x) => q.stem.includes(x[0] + ',')), [p, sn, f] = r.slice(1).map(num);
    return 100 * p * sn / (p * sn + (100 - p) * f);
  },
  'Estimate from an unlabelled chart': (q) => {
    const ex = chartOf(q, 'line'), v = ex.series[0].values, change = (o) => { const i = ex.categories.indexOf(o); return v[i] / v[i - 4] - 1; };
    return q.options.slice().sort((a, b) => change(b) - change(a))[0];
  },
  'Speed needed to win': (q) => {
    const ex = tableOf(q), fin = column(ex, 'Finishing'), half = column(ex, 'Time at 200 m');
    const winner = Math.min(...ex.rows.map((r) => num(r[fin]))), r = firstRow(q, ex);
    return 200 / (winner - num(r[half]));
  },
  'Speed for a target average': (q) => {
    const ex = tableOf(q), [, rider, V] = m1(/(Rider [AB]) wants an average speed of exactly (\d+) km\/h/, notes(q));
    const j = column(ex, rider), d = ex.rows.map((r) => num(r[1])), last = ex.rows.findIndex((r) => r[j] === '—');
    const used = total(ex.rows.map((r, i) => (i === last ? 0 : d[i] / num(r[j]))));
    return d[last] / (total(d) / num(V) - used);
  },
  'Largest change in tonnes from two pie charts': (q) => {
    const [p1, p2] = q.exhibits.filter((e) => e.type === 'pie'), t = (p) => num(m1(/total ([\d.,]+) million/, p.title)[1]);
    const change = (m) => t(p2) * p2.slices.find((s) => s.label === m).value / 100 - t(p1) * p1.slices.find((s) => s.label === m).value / 100;
    return q.options.slice().sort((a, b) => change(b) - change(a))[0];
  },
  'Average price under tiered rates': (q) => {
    const ex = tableOf(q), r = firstRow(q, ex), N = num(m1(/uses ([\d,]+) kWh/, q.stem)[1]);
    const [F, a, b, c] = r.slice(1).map(num);
    return (F + Math.min(N, 200) * a + Math.max(0, Math.min(N, 500) - 200) * b + Math.max(0, N - 500) * c) / N;
  },
  'Currency round trip with fees': (q) => {
    const ex = chartOf(q, 'line'), A = num(m1(/converted EUR ([\d,]+) into/, q.stem)[1]), cur = m1(/ into (\w+) on 1 March/, q.stem)[1];
    const f = num(m1(/fee of ([\d.]+)%/, notes(q))[1]) / 100, v = ex.series.find((x) => x.name === cur).values;
    return A * (1 - f) * v[ex.categories.indexOf('1 Mar')] * (1 - f) / v[ex.categories.indexOf('1 Sep')];
  },
  'Price change needed for a target inflation': (q) => {
    const ex = tableOf(q), T = num(m1(/inflation exactly ([\d.]+)%/, q.stem)[1]);
    const missing = ex.rows.find((r) => r[2] === '—'), known = total(ex.rows.filter((r) => r !== missing).map((r) => num(r[1]) * num(r[2]) / 100));
    return (T - known) / (num(missing[1]) / 100);
  },
  'Meeting point of two travellers': (q) => {
    const ex = chartOf(q, 'hbar'), L = num(m1(/ends of a (\d+) km rural road/, q.stem)[1]), j = ex.categories.indexOf('Rural');
    const [, a, b] = m1(/^A (.+?) and a (.+?) set off/, q.stem), sp = (n) => ex.series.find((x) => lc(x.name) === n).values[j];
    return L * sp(a) / (sp(a) + sp(b));
  },
};
