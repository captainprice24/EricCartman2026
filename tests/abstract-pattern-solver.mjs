// Independent reader for the patterned medium series (sets 12–16). It sees only the drawn shapes: no generator
// state, key, rule names or explanations. It fits a small grammar per visible track and predicts the next frame.
const mod = (v, n) => ((v % n) + n) % n;
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

export function patternFeatures(fig) {
  const cells = fig.filter((s) => s.t === 'rect' && s.w === 24 && s.h === 24);
  if (cells.length === 9) {
    const grid = Array(9);
    cells.forEach((c) => { grid[Math.round((c.x - 14) / 24) + 3 * Math.round((c.y - 14) / 24)] = c.fill; });
    const dot = fig.find((s) => s.t === 'circle');
    const corner = dot.y < 50 ? (dot.x < 50 ? 0 : 1) : (dot.x < 50 ? 3 : 2);
    return { layout: 'grid', grid, bg: fig.find((s) => s.t === 'rect' && s.w === 96).fill, corner, dot: dot.fill };
  }
  const quads = fig.filter((s) => s.t === 'rect' && s.w === 48);
  if (quads.length === 4) {
    const outer = Array(4), inner = Array(4), order = { '2,2': 0, '50,2': 1, '50,50': 2, '2,50': 3 };
    quads.forEach((q) => { outer[order[q.x + ',' + q.y]] = q.fill; });
    fig.filter((s) => s.t === 'wedge').forEach((w) => { inner[Math.round(w.a0 / 90)] = w.fill; });
    return { layout: 'quadrants', outer, inner, centre: fig.find((s) => s.t === 'rect' && s.w === 12).fill };
  }
  const tiles = fig.filter((s) => s.t === 'rect' && s.w === 22);
  if (tiles.length === 8) {
    const row = (y) => tiles.filter((t) => t.y === y).sort((a, b) => a.x - b.x).map((t) => t.fill);
    return { layout: 'conveyor', top: row(16), bottom: row(44), arrow: mod(Math.round(fig.find((s) => s.t === 'arrow').rot / 45), 8), bg: fig.find((s) => s.t === 'rect' && s.w === 96).fill };
  }
  throw Error('unrecognised patterned figure');
}

// A value track: a repeating cycle of period 1–4, or a fixed modular step.
function scalar(values, modulus) {
  const out = [];
  for (let p = 1; p <= 4; p++) if (values.every((v, i) => i < p || same(v, values[i - p]))) out.push(values[values.length % p]);
  if (modulus) {
    const step = mod(values[1] - values[0], modulus);
    if (values.every((v, i) => i === 0 || mod(v - values[i - 1], modulus) === step)) out.push(mod(values.at(-1) + step, modulus));
  }
  return [...new Map(out.map((v) => [JSON.stringify(v), v])).values()];
}

// Grid moves: every transition must be exactly one row or column shift; the sequence of moves must repeat with period 1 or 2.
const OPS = [];
for (const kind of ['row', 'col']) for (let i = 0; i < 3; i++) for (const d of [1, -1]) OPS.push({ kind, i, d });
const applyOp = (g, op) => {
  const out = g.slice();
  for (let k = 0; k < 3; k++) {
    if (op.kind === 'row') out[op.i * 3 + mod(k + op.d, 3)] = g[op.i * 3 + k];
    else out[mod(k + op.d, 3) * 3 + op.i] = g[k * 3 + op.i];
  }
  return out;
};
function gridTrack(grids) {
  const moves = [];
  for (let i = 1; i < grids.length; i++) {
    const fits = OPS.filter((op) => same(applyOp(grids[i - 1], op), grids[i]));
    if (fits.length !== 1) return [];
    moves.push(fits[0]);
  }
  const out = [];
  for (const p of [1, 2]) if (moves.every((m, i) => i < p || same(m, moves[i - p]))) out.push(applyOp(grids.at(-1), moves[moves.length % p]));
  return [...new Map(out.map((v) => [JSON.stringify(v), v])).values()];
}

// Ring and row moves: a constant rotation, or (for the inner circle) a rotation of the other cells around one fixed cell.
const rotate = (a, k) => a.map((_, i) => a[mod(i - k, a.length)]);
const rotateExcept = (a, k, fixed) => { const o = a.map((_, i) => i).filter((i) => i !== fixed), out = a.slice(); o.forEach((p, j) => { out[o[mod(j + k, o.length)]] = a[p]; }); return out; };
function ringTrack(lists, allowFixed) {
  const hyps = [];
  for (let k = 1; k < lists[0].length; k++) hyps.push((a) => rotate(a, k));
  if (allowFixed) for (let f = 0; f < lists[0].length; f++) for (const k of [1, 2]) hyps.push((a) => rotateExcept(a, k, f));
  const out = [];
  for (const h of hyps) if (lists.every((l, i) => i === 0 || same(h(lists[i - 1]), l))) out.push(h(lists.at(-1)));
  return [...new Map(out.map((v) => [JSON.stringify(v), v])).values()];
}

export function inferPattern(sequence) {
  const rows = sequence.map(patternFeatures), layout = rows[0].layout;
  if (!rows.every((r) => r.layout === layout)) throw Error('layout changes within series');
  const col = (k) => rows.map((r) => r[k]);
  const fits = layout === 'grid' ? { grid: gridTrack(col('grid')), bg: scalar(col('bg')), corner: scalar(col('corner'), 4), dot: scalar(col('dot')) }
    : layout === 'quadrants' ? { outer: ringTrack(col('outer'), false), inner: ringTrack(col('inner'), true), centre: scalar(col('centre')) }
      : { top: ringTrack(col('top'), false), bottom: ringTrack(col('bottom'), false), arrow: scalar(col('arrow'), 8), bg: scalar(col('bg')) };
  const next = { layout };
  for (const [k, v] of Object.entries(fits)) { if (v.length !== 1) return { layout, next: null, fits }; next[k] = v[0]; }
  return { layout, next, fits };
}
