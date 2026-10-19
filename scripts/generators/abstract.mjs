// Generates every abstract reasoning set (questions/abstract/abstract-set-01…04.js, 150 foundation items plus 40 challenge items).
//
// Five layouts, 30 items each: single figure, grid movement, overlapping shapes, divided circle and
// rotating hands. Foundation items run 2–4 independent rules; difficulty follows abstract-difficulty.mjs. Other elements
// stay constant.
//
// Distractors mix one-rule and two-rule breaks, plausible wrong readings of the series (no step,
// a double step, the wrong direction, a value outside the cycle) and changes to elements that should
// stay constant. They are chosen so that blind strategies (scripts/lib/blind.mjs: the most central
// option, the odd one out, the per-element majority) do no better than chance: the key's rank by
// similarity to the other options is balanced across ranks 1–5 within every five items.
//
// Usage: node scripts/generators/abstract.mjs
import { generateHardAbstract } from "./abstract-hard.mjs";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { abstractRubric } from "../lib/abstract-difficulty.mjs";
import { abstractBlind } from "../lib/blind.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

let seed = 20261014;
const rnd = () => {
  seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const ri = (a, b) => a + Math.floor(rnd() * (b - a + 1));
const pick = (a) => a[Math.floor(rnd() * a.length)];
const shuffle = (a) => { const r = a.slice(); for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; };
const mod = (a, n) => ((a % n) + n) % n;
const norm = (a) => mod(a, 360);
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const range = (n) => Array.from({ length: n }, (_, i) => i);
const r2 = (v) => Math.round(v * 100) / 100;
const WORD = ["no", "one", "two", "three", "four", "five"];
const FILLS3 = ["white", "grey", "black"];
const ANG8 = range(8).map((i) => i * 45);

/* ---------- rule factories: (ctx) => { val(i), wrong: [{ v, note }], describe } ---------- */

function keepWrong(list, right) {
  const out = [];
  for (const w of list) if (w.v !== null && w.v !== undefined && !same(w.v, right) && !out.some((o) => same(o.v, w.v))) out.push(w);
  return out;
}

// A value that repeats in a cycle (fill colours, shapes).
const cycle = (what, values, periods = [2, 3], label = (v) => v) => () => {
  const p = pick(periods.filter((x) => x <= values.length));
  const cyc = shuffle(values).slice(0, p);
  const val = (i) => cyc[i % p];
  return {
    val,
    wrong: keepWrong([
      { v: val(4), note: `${what} repeats the previous frame` },
      { v: val(6), note: `${what} skips a step in its cycle` },
      ...values.filter((v) => !cyc.includes(v)).map((v) => ({ v, note: `${what} is ${label(v)}, which never appears in the series` }))
    ], val(5)),
    describe: `${what} follows a cycle of ${p}: ${cyc.join(" → ")}`
  };
};

// A position on a ring of n places (corners, sides, cells around the grid edge, segments).
const ring = (what, n, steps, stepText) => () => {
  const step = pick(steps), start = ri(0, n - 1);
  const val = (i) => mod(start + step * i, n);
  return {
    val,
    wrong: keepWrong([
      { v: val(4), note: `${what} has not moved` },
      { v: val(6), note: `${what} moves two steps at once` },
      { v: mod(val(4) - step, n), note: `${what} moves the wrong way` },
      { v: mod(val(5) - Math.sign(step), n), note: `${what} stops one place short` },
      { v: mod(val(5) + Math.sign(step), n), note: `${what} goes one place too far` }
    ], val(5)),
    describe: `${what} moves ${stepText(step)} each step`
  };
};
const dirWord = (s) => (s > 0 ? "clockwise" : "anticlockwise");
const placeSteps = (unit, opposite) => (s) => (opposite && Math.abs(s) === 2 ? `to the opposite ${unit}` : `${WORD[Math.abs(s)]} ${unit}${Math.abs(s) > 1 ? "s" : ""} ${dirWord(s)}`);

// An orientation that turns by a fixed angle.
const rotation = (what, steps, starts) => () => {
  const step = pick(steps) * pick([1, -1]), start = pick(starts);
  const val = (i) => norm(start + step * i);
  return {
    val,
    wrong: keepWrong([
      { v: val(4), note: `${what} has not turned` },
      { v: val(6), note: `${what} has turned two steps at once` },
      { v: val(3), note: `${what} has turned the wrong way` },
      { v: norm(val(5) + 180), note: `${what} points the opposite way` }
    ], val(5)),
    describe: `${what} turns ${Math.abs(step)}° ${dirWord(step)} each step`
  };
};

// An explicit sequence of six values (frames 1–5 and the answer).
const sequence = (what, patterns, domain, label = (v) => String(v)) => () => {
  const p = pick(patterns);
  const val = (i) => p.seq[i];
  return {
    val,
    wrong: keepWrong([
      { v: p.seq[4], note: `${what} has not changed` },
      ...domain.map((v) => ({ v, note: `${what} is ${label(v)} instead of ${label(p.seq[5])}` }))
    ], p.seq[5]),
    describe: p.describe
  };
};

/* ---------- layout 1: single figure ---------- */
const SHAPES6 = ["circle", "square", "triangle", "pentagon", "hexagon", "diamond"];
const outerShape = (kind, fill) => {
  switch (kind) {
    case "circle": return { t: "circle", x: 50, y: 48, r: 24, fill };
    case "square": return { t: "rect", x: 28, y: 26, w: 44, h: 44, fill };
    case "triangle": return { t: "poly", x: 50, y: 52, r: 29, n: 3, rot: 0, fill };
    case "pentagon": return { t: "poly", x: 50, y: 49, r: 26, n: 5, rot: 0, fill };
    case "hexagon": return { t: "poly", x: 50, y: 48, r: 26, n: 6, rot: 0, fill };
    default: return { t: "poly", x: 50, y: 48, r: 27, n: 4, rot: 0, fill };
  }
};
const CORNERS = [[13, 13], [87, 13], [87, 75], [13, 75]];
const dotsPatterns = [
  { seq: [1, 2, 3, 4, 5, 6], describe: "the number of dots rises by one each step" },
  { seq: [6, 5, 4, 3, 2, 1], describe: "the number of dots falls by one each step" },
  { seq: [1, 3, 2, 4, 3, 5], describe: "the number of dots goes up two, down one, up two, down one…" },
  { seq: [1, 1, 2, 2, 3, 3], describe: "each number of dots appears twice before rising by one" },
  { seq: [2, 3, 4, 5, 6, 7], describe: "the number of dots rises by one each step" },
  { seq: [7, 5, 6, 4, 5, 3], describe: "the number of dots goes down two, up one, down two, up one…" }
];
const slotPatterns = [
  { seq: [0, 1, 2, 1, 0, 1], describe: "the top bar moves one place at a time and bounces back at each end" },
  { seq: [2, 1, 0, 1, 2, 1], describe: "the top bar moves one place at a time and bounces back at each end" },
  { seq: [0, 1, 2, 0, 1, 2], describe: "the top bar moves one place to the right and wraps around to the left" },
  { seq: [2, 1, 0, 2, 1, 0], describe: "the top bar moves one place to the left and wraps around to the right" }
];
const single = {
  topic: "Single figure",
  elements: "the outer shape, its fill, the arrow (if there is one), the corner dot, the number of dots and the top bar (if there is one)",
  tracks: {
    shape: { name: "the outer shape", domain: () => SHAPES6, rule: cycle("the outer shape", SHAPES6, [2, 3, 3, 4], (v) => "a " + v) },
    fill: { name: "the fill colour", domain: () => FILLS3, rule: cycle("the fill colour", FILLS3) },
    arrow: { name: "the arrow", domain: () => ANG8, rule: rotation("the arrow", [45, 90, 135], [0, 45, 90, 180, 270]) },
    corner: { name: "the corner dot", domain: () => range(4), rule: ring("the corner dot", 4, [1, -1, 2], placeSteps("corner", true)) },
    dots: { name: "the number of dots", domain: () => range(7).map((i) => i + 1), rule: sequence("the number of dots", dotsPatterns, range(7).map((i) => i + 1)) },
    slot: { name: "the top bar", domain: () => range(3), rule: sequence("the top bar", slotPatterns, range(3), (v) => ["on the left", "in the middle", "on the right"][v]) }
  },
  constants: () => ({ shape: pick(SHAPES6), fill: pick(["white", "grey"]), arrow: rnd() < 0.4 ? pick([0, 90, 180, 270]) : null, corner: ri(0, 3), dots: ri(1, 3), slot: rnd() < 0.3 ? ri(0, 2) : null }),
  draw: (st) => {
    const out = [outerShape(st.shape, st.fill)];
    if (st.arrow !== null) out.push({ t: "arrow", x: 50, y: st.shape === "triangle" ? 55 : 48, r: st.shape === "triangle" ? 10 : 13, rot: st.arrow, fill: "white" });
    out.push({ t: "circle", x: CORNERS[st.corner][0], y: CORNERS[st.corner][1], r: 6, fill: "black" });
    for (let i = 0; i < st.dots; i++) out.push({ t: "circle", x: 50 - (st.dots - 1) * 5 + i * 10, y: 91, r: 3.5, fill: "black" });
    if (st.slot !== null) out.push({ t: "rect", x: [30, 50, 70][st.slot] - 5, y: 2, w: 10, h: 6, fill: "black" });
    return out;
  }
};

/* ---------- layout 2: grid movement ---------- */
const PERIM = [0, 1, 2, 5, 8, 7, 6, 3]; // cells of a 3 × 3 grid, clockwise around the edge from top left
const CELL_NAMES = ["top-left", "top-middle", "top-right", "middle-left", "centre", "middle-right", "bottom-left", "bottom-middle", "bottom-right"];
const cellCentre = (c) => [20 + 30 * (c % 3), 20 + 30 * Math.floor(c / 3)];
const LINES3 = [
  { cells: [0, 1, 2], name: "top row", fwd: "to the right", back: "to the left" },
  { cells: [3, 4, 5], name: "middle row", fwd: "to the right", back: "to the left" },
  { cells: [6, 7, 8], name: "bottom row", fwd: "to the right", back: "to the left" },
  { cells: [0, 3, 6], name: "left column", fwd: "down", back: "up" },
  { cells: [1, 4, 7], name: "middle column", fwd: "down", back: "up" },
  { cells: [2, 5, 8], name: "right column", fwd: "down", back: "up" },
  { cells: [0, 4, 8], name: "diagonal", fwd: "down the diagonal", back: "up the diagonal" }
];
const shadeRule = () => {
  const line = pick(LINES3), rev = rnd() < 0.5, bounce = rnd() < 0.4;
  const order = rev ? line.cells.slice().reverse() : line.cells;
  const seq = (bounce ? [0, 1, 2, 1, 0, 1] : [0, 1, 2, 0, 1, 2]).map((k) => order[k]);
  const val = (i) => seq[i];
  return {
    val,
    wrong: keepWrong([{ v: seq[4], note: "the shaded cell has not moved" }, ...line.cells.map((c) => ({ v: c, note: `the shaded cell is in the ${CELL_NAMES[c]} cell instead of the ${CELL_NAMES[seq[5]]} cell` })), { v: mod(seq[5] + 3, 9), note: "the shaded cell has left its path" }], seq[5]),
    describe: bounce
      ? `the shaded cell moves back and forth along the ${line.name}, one cell at a time`
      : `the shaded cell moves one cell ${rev ? line.back : line.fwd} along the ${line.name} and starts again at the other end`
  };
};
const grid = {
  topic: "Grid movement",
  elements: "the circle, its colour, the star, the arrow and the shaded cell",
  setup: () => ({ arrowCell: ri(0, 8) }),
  tracks: {
    circle: { name: "the circle", domain: () => range(8), rule: ring("the circle", 8, [1, -1, 2, -2, 3], (s) => `${placeSteps("cell", false)(s)} around the edge of the grid`) },
    star: { name: "the star", domain: () => range(9), rule: ring("the star", 9, [1, 2], (s) => `${WORD[s]} cell${s > 1 ? "s" : ""} forward in reading order (left to right, then down a row; after the last cell it starts again at the top left)`) },
    arrow: { name: "the arrow", domain: () => ANG8, rule: rotation("the arrow", [45, 90, 135], [0, 90, 180, 270]) },
    shade: { name: "the shaded cell", domain: () => range(9), rule: shadeRule },
    circleFill: { name: "the circle's colour", domain: () => FILLS3, rule: cycle("the circle's colour", FILLS3) }
  },
  constants: () => ({ circle: ri(0, 7), star: ri(0, 8), arrow: pick([0, 90, 180, 270]), shade: ri(0, 8), circleFill: "black" }),
  draw: (st, ctx) => {
    const sc = st.shade;
    const [cx, cy] = cellCentre(PERIM[st.circle]), [sx, sy] = cellCentre(st.star), [ax, ay] = cellCentre(ctx.arrowCell);
    return [
      { t: "rect", x: 5 + 30 * (sc % 3), y: 5 + 30 * Math.floor(sc / 3), w: 30, h: 30, fill: "grey" },
      { t: "rect", x: 5, y: 5, w: 90, h: 90, fill: "none" },
      { t: "line", x1: 35, y1: 5, x2: 35, y2: 95 }, { t: "line", x1: 65, y1: 5, x2: 65, y2: 95 },
      { t: "line", x1: 5, y1: 35, x2: 95, y2: 35 }, { t: "line", x1: 5, y1: 65, x2: 95, y2: 65 },
      { t: "circle", x: cx - 7, y: cy - 7, r: 6, fill: st.circleFill },
      { t: "star", x: sx + 7, y: sy + 7, r: 7, rot: 0, fill: "black" },
      { t: "arrow", x: ax + 7, y: ay - 7, r: 6, rot: st.arrow, fill: "black" }
    ];
  }
};

/* ---------- layout 3: overlapping shapes ---------- */
const BIG = ["circle", "square", "triangle", "hexagon", "diamond", "pentagon"];
const bigShape = (kind, x, fill) => {
  switch (kind) {
    case "circle": return { t: "circle", x, y: 50, r: 22, fill };
    case "square": return { t: "rect", x: x - 20, y: 30, w: 40, h: 40, fill };
    case "triangle": return { t: "poly", x, y: 54, r: 27, n: 3, rot: 0, fill };
    case "hexagon": return { t: "poly", x, y: 50, r: 24, n: 6, rot: 0, fill };
    case "pentagon": return { t: "poly", x, y: 51, r: 24, n: 5, rot: 0, fill };
    default: return { t: "poly", x, y: 50, r: 26, n: 4, rot: 0, fill };
  }
};
const SIDES = [[50, 10], [93, 50], [50, 90], [7, 50]]; // top, right, bottom, left (clockwise)
const frontRule = () => {
  const s = pick(["left", "right"]), o = s === "left" ? "right" : "left";
  const p = pick([
    { seq: [s, o, s, o, s, o], describe: "the two shapes take turns to be in front" },
    { seq: [s, s, o, o, s, s], describe: "the shape in front changes every two frames" },
    { seq: [s, s, o, s, s, o], describe: `the ${o} shape comes to the front in every third frame` }
  ]);
  return { val: (i) => p.seq[i], wrong: [{ v: p.seq[5] === "left" ? "right" : "left", note: "the wrong shape is in front" }], describe: p.describe };
};
const overlap = {
  topic: "Overlapping shapes",
  elements: "the left shape, the right shape, their fills, which shape is in front, and the small dot",
  tracks: {
    front: { name: "the shape in front", domain: () => ["left", "right"], rule: frontRule },
    left: { name: "the left shape", domain: () => BIG, rule: cycle("the left shape", BIG, [2, 3], (v) => "a " + v) },
    right: { name: "the right shape", domain: () => BIG, rule: cycle("the right shape", BIG, [2, 3], (v) => "a " + v) },
    leftFill: { name: "the left shape's fill", domain: () => FILLS3, rule: cycle("the left shape's fill", FILLS3) },
    rightFill: { name: "the right shape's fill", domain: () => FILLS3, rule: cycle("the right shape's fill", FILLS3) },
    marker: { name: "the small dot", domain: () => range(4), rule: ring("the small dot", 4, [1, -1, 2], placeSteps("side", true)) }
  },
  constants: () => {
    const [a, b] = shuffle(BIG), [f, g] = shuffle(FILLS3);
    return { front: pick(["left", "right"]), left: a, right: b, leftFill: f, rightFill: g, marker: ri(0, 3) };
  },
  // Two black shapes would merge into one silhouette and hide which one is in front.
  valid: (st) => !(st.leftFill === "black" && st.rightFill === "black"),
  draw: (st) => {
    const L = bigShape(st.left, 38, st.leftFill), R = bigShape(st.right, 62, st.rightFill);
    const M = { t: "circle", x: SIDES[st.marker][0], y: SIDES[st.marker][1], r: 4, fill: "black" };
    return st.front === "left" ? [R, L, M] : [L, R, M];
  }
};

/* ---------- layout 4: divided circle ---------- */
const segments = {
  topic: "Divided circle",
  elements: "the black segment, the grey segment, the colour of the centre circle and the small triangle outside",
  setup: () => ({ n: pick([6, 8]) }),
  tracks: {
    black: { name: "the black segment", domain: (ctx) => range(ctx.n), rule: (ctx) => ring("the black segment", ctx.n, [1, -1, 2, -2, 3], placeSteps("segment", false))() },
    grey: { name: "the grey segment", domain: (ctx) => range(ctx.n), rule: (ctx) => ring("the grey segment", ctx.n, [1, -1, 2, -2, 3], placeSteps("segment", false))() },
    centre: { name: "the centre circle", domain: () => FILLS3, rule: cycle("the centre circle", FILLS3) },
    marker: { name: "the small triangle", domain: () => range(4), rule: ring("the small triangle", 4, [1, -1, 2], placeSteps("side", true)) }
  },
  constants: (ctx) => {
    const [b, g] = shuffle(range(ctx.n));
    return { black: b, grey: g, centre: pick(FILLS3), marker: ri(0, 3) };
  },
  valid: (st) => st.black !== st.grey,
  draw: (st, ctx) => {
    const out = range(ctx.n).map((i) => ({ t: "wedge", x: 50, y: 50, r: 36, a0: (i * 360) / ctx.n, a1: ((i + 1) * 360) / ctx.n, fill: i === st.black ? "black" : i === st.grey ? "grey" : "white" }));
    out.push({ t: "circle", x: 50, y: 50, r: 9, fill: st.centre });
    out.push({ t: "poly", x: SIDES[st.marker][0], y: [7, 50, 93, 50][st.marker], r: 5, n: 3, rot: [180, 270, 0, 90][st.marker], fill: "black" });
    return out;
  }
};

/* ---------- layout 5: rotating hands (composite figures) ---------- */
const HUBS = ["circle", "square", "hexagon", "triangle", "diamond"];
const hubShape = (kind, fill) => {
  switch (kind) {
    case "circle": return { t: "circle", x: 50, y: 50, r: 9, fill };
    case "square": return { t: "rect", x: 42, y: 42, w: 16, h: 16, fill };
    case "hexagon": return { t: "poly", x: 50, y: 50, r: 10, n: 6, rot: 0, fill };
    case "triangle": return { t: "poly", x: 50, y: 51, r: 11, n: 3, rot: 0, fill };
    default: return { t: "poly", x: 50, y: 50, r: 11, n: 4, rot: 0, fill };
  }
};
const polar = (a, d) => [r2(50 + d * Math.sin((a * Math.PI) / 180)), r2(50 - d * Math.cos((a * Math.PI) / 180))];
const hands = {
  topic: "Rotating hands",
  elements: "the long hand with its round tip, the colour of that tip, the short hand with its triangular tip, and the centre shape and its fill",
  tracks: {
    long: { name: "the long hand", domain: () => ANG8, rule: rotation("the long hand", [45, 90, 135], ANG8) },
    short: { name: "the short hand", domain: () => ANG8, rule: rotation("the short hand", [45, 90, 135], ANG8) },
    tip: { name: "the colour of the round tip", domain: () => FILLS3, rule: cycle("the round tip", FILLS3) },
    hub: { name: "the centre shape", domain: () => HUBS, rule: cycle("the centre shape", HUBS, [2, 3], (v) => "a " + v) },
    hubFill: { name: "the centre shape's fill", domain: () => FILLS3, rule: cycle("the centre shape's fill", FILLS3) }
  },
  constants: () => ({ long: pick(ANG8), short: pick(ANG8), tip: "black", hub: pick(HUBS), hubFill: "white" }),
  draw: (st) => {
    const [lx, ly] = polar(st.long, 32), [tx, ty] = polar(st.long, 38), [sx, sy] = polar(st.short, 22), [qx, qy] = polar(st.short, 27);
    return [
      { t: "line", x1: 50, y1: 50, x2: lx, y2: ly },
      { t: "line", x1: 50, y1: 50, x2: sx, y2: sy },
      { t: "circle", x: tx, y: ty, r: 6, fill: st.tip },
      { t: "poly", x: qx, y: qy, r: 6, n: 3, rot: st.short, fill: "black" },
      hubShape(st.hub, st.hubFill)
    ];
  }
};

const LAYOUTS = { single, grid, overlap, segments, hands };

/* ---------- item builder ---------- */
const NUMCAP = ["", "One", "Two", "Three", "Four"];
const sample = (arr, k) => shuffle(arr).slice(0, k);

function buildItem(layoutKey, nRules, target) {
  const L = LAYOUTS[layoutKey];
  const ctx = L.setup ? L.setup() : {};
  const trackKeys = Object.keys(L.tracks);
  const keys = shuffle(trackKeys).slice(0, nRules);
  const rules = Object.fromEntries(keys.map((k) => [k, L.tracks[k].rule(ctx)]));
  const base = L.constants(ctx);
  const state = (i, over = {}) => {
    const s = { ...base };
    keys.forEach((k) => { s[k] = rules[k].val(i); });
    return { ...s, ...over };
  };
  for (let i = 0; i <= 5; i++) if (L.valid && !L.valid(state(i), ctx)) return null;
  const draw = (st) => L.draw(st, ctx);
  const keyState = state(5), keyFig = draw(keyState), keySig = JSON.stringify(keyFig);

  // Candidate distractors: single breaks (rule or constant element) and pairs of breaks.
  const singles = [];
  keys.forEach((k) => rules[k].wrong.forEach((w) => singles.push({ over: { [k]: w.v }, notes: [w.note], rule: true })));
  trackKeys.filter((k) => !keys.includes(k) && base[k] !== null).forEach((k) => {
    L.tracks[k].domain(ctx).filter((v) => !same(v, base[k])).forEach((v) =>
      singles.push({ over: { [k]: v }, notes: [`${L.tracks[k].name} changes, although it is the same in every frame`], rule: false }));
  });
  const doubles = [];
  for (let a = 0; a < singles.length; a++) {
    for (let b = a + 1; b < singles.length; b++) {
      const ka = Object.keys(singles[a].over)[0], kb = Object.keys(singles[b].over)[0];
      if (ka === kb || (!singles[a].rule && !singles[b].rule)) continue;
      doubles.push({ over: { ...singles[a].over, ...singles[b].over }, notes: [...singles[a].notes, ...singles[b].notes], rule: true, double: true });
    }
  }
  const seenSig = new Set([keySig]);
  const pool = [];
  for (const c of [...singles, ...doubles]) {
    const st = state(5, c.over);
    if (L.valid && !L.valid(st, ctx)) continue;
    const fig = draw(st), sig = JSON.stringify(fig);
    if (seenSig.has(sig)) continue;
    seenSig.add(sig);
    pool.push({ ...c, st, fig });
  }
  if (pool.length < 6) return null;

  const attrDist = (a, b) => trackKeys.filter((k) => !same(a[k], b[k])).length;
  for (let tries = 0; tries < 6000; tries++) {
    const ds = sample(pool, 4);
    const nDouble = ds.filter((c) => c.double).length;
    if (nDouble < 1 || nDouble > 3) continue;
    if (ds.filter((c) => !c.rule).length > 1) continue;
    if (!ds.some((c) => !c.double && c.rule)) continue;
    // Every wrong option needs its own explanation.
    if (new Set(ds.map((c) => c.notes.join("|"))).size < 4) continue;
    // At least two distractors share the same wrong value.
    const shared = ds.some((c, i) => ds.some((d, j) => j > i && Object.keys(c.over).some((k) => k in d.over && same(c.over[k], d.over[k]))));
    if (!shared) continue;
    const figs = [keyFig, ...ds.map((c) => c.fig)];
    const b = abstractBlind(figs, 0);
    const rank = 1 + b.sums.filter((s, i) => i > 0 && s < b.sums[0] - 1e-9).length;
    if (rank !== target) continue;
    if (target !== 1 && b.majority > 0) continue;
    if (target !== 5 && b.outlier > 0) continue;
    const states = [keyState, ...ds.map((c) => c.st)];
    const asums = states.map((s, i) => states.reduce((t, s2, j) => t + (i === j ? 0 : attrDist(s, s2)), 0));
    if (target !== 1 && asums[0] === Math.min(...asums)) continue;
    if (target !== 5 && asums[0] === Math.max(...asums)) continue;

    const names = keys.map((k) => L.tracks[k].name);
    return {
      topic: L.topic, rules: nRules,
      stem: "Which figure comes next in the series?",
      sequence: [0, 1, 2, 3, 4].map((i) => draw(state(i))),
      options: [{ fig: keyFig, note: "Correct: it follows every rule, and the elements without a rule are unchanged." }]
        .concat(ds.map((c) => ({ fig: c.fig, note: `Wrong: ${c.notes.length > 1 ? c.notes.join(", and ") : c.notes[0]}.` }))),
      hints: [
        `Look at each element separately: ${L.elements}. Some change from frame to frame; others never change.`,
        `${NUMCAP[nRules]} elements follow a rule: ${names.join(", ")}. Work out each rule and predict the next frame before you look at the options.`,
        "Check every option against every rule, including the elements that never change. A wrong option can break one rule or several."
      ],
      explanation: `${NUMCAP[nRules]} independent rules apply: ${keys.map((k) => rules[k].describe).join("; ")}. Everything else stays the same in every frame. Predict the answer from the series, then eliminate; looking for the option that resembles the others most does not work.`
    };
  }
  return null;
}

/* ---------- build 150 items ---------- */
const LAYOUT_KEYS = Object.keys(LAYOUTS);
const N = 150;
const targets = [];
for (let b = 0; b < N / 5; b++) targets.push(...shuffle([1, 2, 3, 4, 5]));
const seen = new Set();
let retries = 0;
const items = range(N).map((i) => {
  const layout = LAYOUT_KEYS[i % LAYOUT_KEYS.length];
  const n = i % 4 === 0 ? 2 : i % 4 === 3 ? 4 : 3; // 25% two rules, 50% three, 25% four
  for (let attempt = 0; attempt < 400; attempt++) {
    const it = buildItem(layout, n, targets[i]);
    if (!it) { retries++; continue; }
    const sig = JSON.stringify(it.sequence);
    if (seen.has(sig)) continue;
    seen.add(sig);
    const pos = (i * 2 + Math.floor(i / 5)) % 5;
    const opts = it.options.slice(1);
    opts.splice(pos, 0, it.options[0]);
    return { ...it, difficulty: abstractRubric(it).level, layout, options: opts.map((o) => o.fig), answer: pos, optionNotes: opts.map((o) => o.note) };
  }
  throw new Error(`could not build item ${i} (${layout}, ${n} rules, key rank ${targets[i]})`);
});

const sizes = [10, 50, 50, 40];
let start = 0;
sizes.forEach((size, si) => {
  const n = si + 1, id = String(n).padStart(2, "0");
  const qs = items.slice(start, start + size).map((q, k) => ({
    id: `a${id}-${String(k + 1).padStart(2, "0")}`, topic: q.topic, difficulty: q.difficulty, rules: q.rules, stem: q.stem,
    sequence: q.sequence, options: q.options, answer: q.answer, hints: q.hints, optionNotes: q.optionNotes, explanation: q.explanation
  }));
  start += size;
  const set = { id: "abstract-" + id, section: "abstract", title: `Abstract reasoning · Set ${n}`, description: `${size} figure series in five layouts, combining 2–4 rules (generated).`, version: 3 };
  const body = JSON.stringify({ ...set, questions: [] }, null, 2).replace('"questions": []', '"questions": [\n' +
    qs.map((q) => "    {\n" + Object.entries(q).map(([k, v]) =>
      k === "sequence" || k === "options"
        ? `      "${k}": [\n` + v.map((f) => "        " + JSON.stringify(f)).join(",\n") + "\n      ]"
        : `      "${k}": ${JSON.stringify(v)}`).join(",\n") + "\n    }").join(",\n") + "\n  ]");
  fs.writeFileSync(path.join(root, `questions/abstract/abstract-set-${id}.js`), "/* Generated by scripts/generators/abstract.mjs. Edit the generator, not this file. */\nEPSO_BANK.registerSet(" + body + ");\n");
});

const letters = [0, 0, 0, 0, 0], rulesCount = { 2: 0, 3: 0, 4: 0 }, layouts = {};
let medoid = 0, outlier = 0, majority = 0;
items.forEach((q) => {
  letters[q.answer]++; rulesCount[q.rules]++; layouts[q.topic] = (layouts[q.topic] || 0) + 1;
  const b = abstractBlind(q.options, q.answer); medoid += b.medoid; outlier += b.outlier; majority += b.majority;
});
const pc = (x) => Math.round((x / N) * 100) + "%";
console.log(`abstract: ${N} items; letters A–E ${letters.join("/")}; rules ${JSON.stringify(rulesCount)}; layouts ${JSON.stringify(layouts)}`);
console.log(`blind solvers: most central ${pc(medoid)}, odd one out ${pc(outlier)}, majority ${pc(majority)} (chance 20%); rejected drafts ${retries}`);

generateHardAbstract(root);
