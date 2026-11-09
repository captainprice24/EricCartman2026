// Medium abstract sets 12–16 (November 2026): patterned figures with interacting, EU-exam-style rules.
//
// Calibrated against a commercial practice sample the owner supplied (methods only; no figure or rule set
// copied). Three original families, each built from independent tracks that the rubric places at Medium:
//   grid-shift          3 × 3 patterned grid: a row shifts on odd steps and a column on even steps (wrapping),
//                       a corner marker walks round the frame, the background alternates (and, in four-rule
//                       items, the marker colour alternates).
//   quadrant-rotation   four patterned quadrants turn one way while the inner divided circle turns the other way,
//                       except a black segment that stays where it is; the centre square alternates.
//   opposed-conveyor    two rows of patterned tiles slide in opposite directions with wrap-around, a pointer
//                       turns by quarter turns (and, in four-rule items, the background alternates).
// The key's similarity rank among the options is balanced across ranks 1–5 within every five items, as in the
// foundation generator, so option-only strategies stay near chance. Answers are checked independently from the
// drawn figures by tests/abstract-pattern-solver.mjs.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { abstractRubric } from "../lib/abstract-difficulty.mjs";
import { abstractBlind } from "../lib/blind.mjs";

const NAME = { hatch: "rising diagonal hatching", rhatch: "falling diagonal hatching", hlines: "horizontal stripes", vlines: "vertical stripes",
  dots: "dots", check: "chequers", black: "black", grey: "grey", white: "white" };
const PAT = ["hatch", "rhatch", "hlines", "vlines", "dots", "check", "grey", "white"];
const ALL9 = ["hatch", "rhatch", "hlines", "vlines", "dots", "check", "black", "grey", "white"];
const mod = (v, n) => ((v % n) + n) % n;
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const CORNER = ["top-left", "top-right", "bottom-right", "bottom-left"];
const ROWS = ["top", "middle", "bottom"], COLS = ["left", "middle", "right"];
const QUAD = ["top-left", "top-right", "bottom-right", "bottom-left"];
const SEG = ["upper-right", "lower-right", "lower-left", "upper-left"];
const DIR8 = ["up", "up-right", "right", "down-right", "down", "down-left", "left", "up-left"];

let seed = 1;
const rnd = () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
const ri = (n) => Math.floor(rnd() * n);
const pick = (a) => a[ri(a.length)];
const shuffle = (a) => { const r = a.slice(); for (let i = r.length - 1; i > 0; i--) { const j = ri(i + 1); [r[i], r[j]] = [r[j], r[i]]; } return r; };

/* ---------- family 1: alternating row / column shifts in a 3 × 3 grid ---------- */
const shiftRow = (g, r, d) => { const out = g.slice(); for (let c = 0; c < 3; c++) out[r * 3 + mod(c + d, 3)] = g[r * 3 + c]; return out; };
const shiftCol = (g, c, d) => { const out = g.slice(); for (let r = 0; r < 3; r++) out[mod(r + d, 3) * 3 + c] = g[r * 3 + c]; return out; };
const applyOp = (g, op) => (op.kind === "row" ? shiftRow(g, op.i, op.d) : shiftCol(g, op.i, op.d));
const opText = (op) => op.kind === "row" ? `the ${ROWS[op.i]} row moves one cell to the ${op.d > 0 ? "right" : "left"}` : `the ${COLS[op.i]} column moves one cell ${op.d > 0 ? "down" : "up"}`;
const gridFamily = {
  model: "grid-shift", topic: "Shifting grid",
  setup(nRules) {
    const opA = { kind: "row", i: ri(3), d: pick([1, -1]) }, opB = { kind: "col", i: ri(3), d: pick([1, -1]) };
    return { nRules, opA, opB, cells: shuffle(ALL9), bg0: ri(2), m0: ri(4), ms: pick([1, -1]), mf0: ri(2) };
  },
  states(ctx, n) {
    const out = []; let g = ctx.cells;
    for (let i = 0; i < n; i++) {
      out.push({ grid: g, bg: ["white", "grey"][mod(ctx.bg0 + i, 2)], marker: mod(ctx.m0 + ctx.ms * i, 4), mfill: ctx.nRules === 4 ? ["black", "white"][mod(ctx.mf0 + i, 2)] : "black" });
      g = applyOp(g, i % 2 === 0 ? ctx.opA : ctx.opB);
    }
    return out;
  },
  draw(s) {
    const pos = [[8, 8], [92, 8], [92, 92], [8, 92]][s.marker];
    return [{ t: "rect", x: 2, y: 2, w: 96, h: 96, fill: s.bg }, ...s.grid.map((f, k) => ({ t: "rect", x: 14 + 24 * (k % 3), y: 14 + 24 * Math.floor(k / 3), w: 24, h: 24, fill: f })),
      { t: "circle", x: pos[0], y: pos[1], r: 4.5, fill: s.mfill }];
  },
  errors(ctx, last, key) {
    const prevOp = ctx.opB, op = ctx.opA, out = [];
    out.push({ over: { grid: applyOp(last.grid, prevOp) }, note: "the grid repeats the last shift (" + opText(prevOp) + ") instead of alternating back" });
    out.push({ over: { grid: applyOp(last.grid, { ...op, d: -op.d }) }, note: `the ${ROWS[op.i]} row moves the wrong way` });
    out.push({ over: { grid: applyOp(last.grid, { ...op, i: mod(op.i + 1, 3) }) }, note: `the wrong row moves: the ${ROWS[mod(op.i + 1, 3)]} row instead of the ${ROWS[op.i]} row` });
    out.push({ over: { grid: last.grid }, note: "the grid does not change, although every step moves a row or a column" });
    out.push({ over: { bg: last.bg }, note: "the background keeps the previous shade instead of alternating" });
    out.push({ over: { marker: last.marker }, note: "the corner marker does not move" });
    out.push({ over: { marker: mod(key.marker + ctx.ms, 4) }, note: "the corner marker moves two corners instead of one" });
    out.push({ over: { marker: mod(last.marker - ctx.ms, 4) }, note: "the corner marker moves back the wrong way" });
    if (ctx.nRules === 4) out.push({ over: { mfill: last.mfill }, note: "the marker keeps its previous colour instead of alternating" });
    else out.push({ over: { mfill: "white" }, note: "the marker turns white, although it is black in every frame" });
    return out;
  },
  describe(ctx, states, key) {
    const n = states.length, nextOp = (n - 1) % 2 === 0 ? ctx.opA : ctx.opB;
    const lines = [
      `Grid: the moves alternate. From frame 1 to 2 ${opText(ctx.opA)}; from frame 2 to 3 ${opText(ctx.opB)}; the pattern repeats, wrapping round. Next (frame ${n} to ${n + 1}): ${opText(nextOp)}.`,
      `Background: ${states.map((s) => s.bg).join(" → ")}. It alternates, so next: ${key.bg}.`,
      `Corner marker: ${states.map((s) => CORNER[s.marker]).join(" → ")}, one corner ${ctx.ms > 0 ? "clockwise" : "anticlockwise"} each step. Next: ${CORNER[key.marker]}.`
    ];
    if (ctx.nRules === 4) lines.push(`Marker colour: ${states.map((s) => s.mfill).join(" → ")}. Next: ${key.mfill}.`);
    else lines.push("The marker stays black in every frame.");
    return {
      rulesText: [`the grid alternates between two shifts (${opText(ctx.opA)}, then ${opText(ctx.opB)})`, "the background alternates", `the corner marker moves one corner ${ctx.ms > 0 ? "clockwise" : "anticlockwise"}`].concat(ctx.nRules === 4 ? ["the marker colour alternates"] : []),
      solution: lines,
      hints: ["Compare each frame with the one before it: which single row or column of the grid has moved?", "Do the moves alternate between a row and a column? Then check the background and the corner marker separately.", "Predict the grid, background and marker before looking at the options."],
      correct: `Correct: ${opText(nextOp)}; background ${key.bg}; marker ${CORNER[key.marker]}${ctx.nRules === 4 ? ", " + key.mfill : ""}.`
    };
  }
};

/* ---------- family 2: counter-rotating quadrants with a fixed black segment ---------- */
const turn = (a, k) => a.map((_, i) => a[mod(i - k, 4)]);
const turnExcept = (a, k, fixed) => {
  const others = [0, 1, 2, 3].filter((i) => i !== fixed), out = a.slice();
  others.forEach((p, j) => { out[others[mod(j + k, 3)]] = a[p]; });
  return out;
};
const quadFamily = {
  model: "quadrant-rotation", topic: "Rotating quadrants",
  setup() {
    const outer = shuffle(PAT).slice(0, 4), fixed = ri(4), inner = shuffle(PAT.filter((f) => f !== "grey")).slice(0, 4);
    inner[fixed] = "black";
    return { nRules: 3, ko: pick([1, -1]), outer, inner, fixed, c0: ri(2) };
  },
  states(ctx, n) {
    const out = []; let o = ctx.outer, inn = ctx.inner;
    for (let i = 0; i < n; i++) { out.push({ outer: o, inner: inn, centre: ["white", "grey"][mod(ctx.c0 + i, 2)] }); o = turn(o, ctx.ko); inn = turnExcept(inn, -ctx.ko, ctx.fixed); }
    return out;
  },
  draw(s) {
    const Q = [[2, 2], [50, 2], [50, 50], [2, 50]];
    return [...s.outer.map((f, i) => ({ t: "rect", x: Q[i][0], y: Q[i][1], w: 48, h: 48, fill: f })),
      ...s.inner.map((f, j) => ({ t: "wedge", x: 50, y: 50, r: 26, a0: 90 * j, a1: 90 * j + 90, fill: f })),
      { t: "rect", x: 44, y: 44, w: 12, h: 12, fill: s.centre }];
  },
  errors(ctx, last) {
    return [
      { over: { outer: turn(last.outer, -ctx.ko) }, note: "the outer quadrants turn the wrong way" },
      { over: { outer: last.outer }, note: "the outer quadrants do not turn" },
      { over: { outer: turn(last.outer, 2 * ctx.ko) }, note: "the outer quadrants turn two steps instead of one" },
      { over: { inner: turn(last.inner, -ctx.ko) }, note: "the black segment turns with the others instead of staying where it is" },
      { over: { inner: turnExcept(last.inner, ctx.ko, ctx.fixed) }, note: "the inner circle turns the same way as the outer quadrants" },
      { over: { inner: last.inner }, note: "the inner circle does not turn" },
      { over: { centre: last.centre }, note: "the centre square keeps the previous shade instead of alternating" }
    ];
  },
  describe(ctx, states, key) {
    const od = ctx.ko > 0 ? "clockwise" : "anticlockwise", id = ctx.ko > 0 ? "anticlockwise" : "clockwise";
    return {
      rulesText: [`the outer quadrants turn one step ${od}`, `the inner segments turn one step ${id}, except the black segment, which stays in the ${SEG[ctx.fixed]} segment`, "the centre square alternates"],
      solution: [
        `Outer quadrants: each pattern moves one quadrant ${od} per step. Next: ${key.outer.map((f, i) => QUAD[i] + " " + NAME[f]).join(", ")}.`,
        `Inner circle: the black segment stays ${SEG[ctx.fixed]}; the other three patterns move one segment ${id} among the remaining segments. Next: ${key.inner.map((f, j) => SEG[j] + " " + NAME[f]).join(", ")}.`,
        `Centre square: ${states.map((s) => s.centre).join(" → ")}. Next: ${key.centre}.`
      ],
      hints: ["Follow one outer pattern from quadrant to quadrant, then one inner pattern from segment to segment.", "Is there an inner segment whose fill never moves? Leave it out and track the other three.", "Predict the outer ring, the inner circle and the centre square before looking at the options."],
      correct: `Correct: outer quadrants one step ${od}; inner circle one step ${id} with black fixed; centre ${key.centre}.`
    };
  }
};

/* ---------- family 3: opposed conveyor rows ---------- */
const slide = (a, k) => a.map((_, i) => a[mod(i - k, 4)]);
const conveyorFamily = {
  model: "opposed-conveyor", topic: "Conveyor rows",
  setup(nRules) {
    const top = shuffle(PAT).slice(0, 4), bottom = shuffle(ALL9.filter((f) => f !== "white")).slice(0, 4);
    return { nRules, kt: pick([1, -1]), top, bottom, a0: ri(8), as: pick([1, -1]), bg0: ri(2) };
  },
  states(ctx, n) {
    const out = []; let t = ctx.top, b = ctx.bottom;
    for (let i = 0; i < n; i++) { out.push({ top: t, bottom: b, arrow: mod(ctx.a0 + ctx.as * i, 8), bg: ctx.nRules === 4 ? ["white", "grey"][mod(ctx.bg0 + i, 2)] : "white" }); t = slide(t, ctx.kt); b = slide(b, -ctx.kt); }
    return out;
  },
  draw(s) {
    return [{ t: "rect", x: 2, y: 2, w: 96, h: 96, fill: s.bg },
      ...s.top.map((f, i) => ({ t: "rect", x: 6 + 22 * i, y: 16, w: 22, h: 22, fill: f })),
      ...s.bottom.map((f, i) => ({ t: "rect", x: 6 + 22 * i, y: 44, w: 22, h: 22, fill: f })),
      { t: "arrow", x: 50, y: 82, r: 11, rot: 45 * s.arrow, fill: "black" }];
  },
  errors(ctx, last, key) {
    const out = [
      { over: { top: slide(last.top, -ctx.kt) }, note: "the top row slides the wrong way" },
      { over: { top: last.top }, note: "the top row does not slide" },
      { over: { bottom: slide(last.bottom, ctx.kt) }, note: "the bottom row slides the same way as the top row" },
      { over: { bottom: last.bottom }, note: "the bottom row does not slide" },
      { over: { arrow: last.arrow }, note: "the pointer does not turn" },
      { over: { arrow: mod(key.arrow + ctx.as, 8) }, note: "the pointer turns 90° instead of 45°" },
      { over: { arrow: mod(last.arrow - ctx.as, 8) }, note: "the pointer turns the wrong way" }
    ];
    if (ctx.nRules === 4) out.push({ over: { bg: last.bg }, note: "the background keeps the previous shade instead of alternating" });
    else out.push({ over: { bg: "grey" }, note: "the background turns grey, although it is white in every frame" });
    return out;
  },
  describe(ctx, states, key) {
    const td = ctx.kt > 0 ? "right" : "left", bd = ctx.kt > 0 ? "left" : "right", ad = ctx.as > 0 ? "clockwise" : "anticlockwise";
    const lines = [
      `Top row: the tiles slide one place to the ${td} each step; the tile that leaves one end re-enters at the other. Next: ${key.top.map((f) => NAME[f]).join(", ")}.`,
      `Bottom row: the tiles slide one place to the ${bd}, wrapping round. Next: ${key.bottom.map((f) => NAME[f]).join(", ")}.`,
      `Pointer: ${states.map((s) => DIR8[s.arrow]).join(" → ")}, turning 45° ${ad} each step. Next: ${DIR8[key.arrow]}.`
    ];
    if (ctx.nRules === 4) lines.push(`Background: ${states.map((s) => s.bg).join(" → ")}. Next: ${key.bg}.`);
    else lines.push("The background stays white in every frame.");
    return {
      rulesText: [`the top row slides one tile to the ${td}`, `the bottom row slides one tile to the ${bd}`, `the pointer turns 45° ${ad}`].concat(ctx.nRules === 4 ? ["the background alternates"] : []),
      solution: lines,
      hints: ["Track one distinctive tile in each row: which way does it move, and where does it re-enter?", "Check that the two rows move in opposite directions, then follow the pointer.", "Predict both rows, the pointer and the background before looking at the options."],
      correct: `Correct: top row ${td}, bottom row ${bd}, pointer ${DIR8[key.arrow]}${ctx.nRules === 4 ? ", background " + key.bg : ""}.`
    };
  }
};

const FAMILIES = [gridFamily, quadFamily, conveyorFamily];

function build(family, nRules, target) {
  const ctx = family.setup(nRules), n = 5;
  const all = family.states(ctx, n + 1), shown = all.slice(0, n), key = all[n], last = shown[n - 1];
  const keyFig = family.draw(key), seen = new Set([JSON.stringify(keyFig)]);
  if (shown.some((s) => same(family.draw(s), keyFig))) return null; // the key must not repeat a displayed frame
  const singles = family.errors(ctx, last, key).map((e) => ({ ...e, notes: [e.note] }));
  const doubles = [];
  for (let a = 0; a < singles.length; a++) for (let b = a + 1; b < singles.length; b++) {
    if (Object.keys(singles[a].over).some((k) => k in singles[b].over)) continue;
    doubles.push({ over: { ...singles[a].over, ...singles[b].over }, notes: [singles[a].note, singles[b].note], double: true });
  }
  const pool = [];
  for (const c of [...singles, ...doubles]) {
    const fig = family.draw({ ...key, ...c.over }), sig = JSON.stringify(fig);
    if (seen.has(sig)) continue;
    seen.add(sig); pool.push({ ...c, fig });
  }
  for (let tries = 0; tries < 4000; tries++) {
    const ds = shuffle(pool).slice(0, 4);
    const nd = ds.filter((c) => c.double).length;
    if (nd < 1 || nd > 3) continue;
    const figs = [keyFig, ...ds.map((c) => c.fig)], b = abstractBlind(figs, 0);
    const rank = 1 + b.sums.filter((s, i) => i > 0 && s < b.sums[0] - 1e-9).length;
    if (rank !== target || (target !== 1 && b.majority > 0) || (target !== 5 && b.outlier > 0)) continue;
    const text = family.describe(ctx, shown, key);
    return {
      topic: family.topic, rules: ctx.nRules, reasoning: { model: family.model, layout: family.model },
      stem: "Which figure comes next in the series?",
      sequence: shown.map((s) => family.draw(s)),
      options: [{ fig: keyFig, note: text.correct }, ...ds.map((c) => ({ fig: c.fig, note: "Wrong: " + c.notes.join(", and ") + "." }))],
      hints: text.hints, solution: text.solution,
      explanation: `${ctx.nRules === 4 ? "Four" : "Three"} independent rules apply: ${text.rulesText.join("; ")}. Work out each rule from consecutive frames, predict the next frame, then eliminate. Option similarity alone is not evidence of a rule.`
    };
  }
  return null;
}

export function generatePatternSets(root) {
  const items = [], targets = [];
  seed = 20261108;
  for (let b = 0; b < 10; b++) targets.push(...shuffle([1, 2, 3, 4, 5]));
  // Per set of ten: four grid items, three quadrant items and three conveyor items, interleaved; families rotate across sets.
  const plan = [];
  for (let s = 0; s < 5; s++) {
    const order = [0, 1, 2, 0, 1, 2, 0, 1, 2, 0].map((f) => FAMILIES[(f + s) % 3]);
    order.forEach((family, k) => plan.push({ family, nRules: family === quadFamily ? 3 : (k + s) % 2 ? 4 : 3 }));
  }
  const seen = new Set();
  plan.forEach(({ family, nRules }, i) => {
    let item = null;
    for (let attempt = 0; attempt < 500 && !item; attempt++) {
      const it = build(family, nRules, targets[i]);
      if (!it || seen.has(JSON.stringify(it.sequence))) continue;
      item = it;
    }
    if (!item) throw new Error(`could not build pattern item ${i} (${family.model})`);
    seen.add(JSON.stringify(item.sequence));
    const pos = (i * 2 + Math.floor(i / 5) + Math.floor(i / 10)) % 5;
    const opts = item.options.slice(1); opts.splice(pos, 0, item.options[0]);
    items.push({ ...item, options: opts.map((o) => o.fig), optionNotes: opts.map((o) => o.note), answer: pos });
  });
  const printFile = path.join(root, "scripts/generators/abstract-medium-fingerprints.json");
  const prints = fs.existsSync(printFile) ? JSON.parse(fs.readFileSync(printFile)) : null, fresh = {};
  for (let si = 0; si < 5; si++) {
    const n = 12 + si;
    const qs = items.slice(si * 10, si * 10 + 10).map((q, k) => {
      const out = { id: `a${n}-${String(k + 1).padStart(2, "0")}`, topic: q.topic, difficulty: 0, rules: q.rules, reasoning: q.reasoning, stem: q.stem,
        sequence: q.sequence, options: q.options, answer: q.answer, hints: q.hints, optionNotes: q.optionNotes, explanation: q.explanation, solution: q.solution };
      out.difficulty = abstractRubric(out).level;
      if (out.difficulty !== 2) throw new Error(out.id + " is not Medium");
      return out;
    });
    const letters = [0, 1, 2, 3, 4].map((k) => qs.filter((q) => q.answer === k).length);
    if (letters.some((c) => c !== 2)) throw new Error(`abstract-${n} letters ${letters.join("/")}`);
    qs.forEach((q) => { const { id, ...content } = q; fresh[id] = crypto.createHash("sha256").update(JSON.stringify(content)).digest("hex"); });
    const set = { id: "abstract-" + n, section: "abstract", title: `Abstract reasoning · Set ${n} (medium)`, description: "10 medium series with patterned figures: alternating grid shifts, counter-rotating quadrants and conveyor rows (generated, November 2026).", version: 2 };
    const body = JSON.stringify({ ...set, questions: [] }, null, 2).replace('"questions": []', '"questions": [\n' +
      qs.map((q) => "    {\n" + Object.entries(q).map(([k, v]) =>
        k === "sequence" || k === "options" ? `      "${k}": [\n` + v.map((f) => "        " + JSON.stringify(f)).join(",\n") + "\n      ]" : `      "${k}": ${JSON.stringify(v)}`).join(",\n") + "\n    }").join(",\n") + "\n  ]");
    fs.writeFileSync(path.join(root, `questions/abstract/abstract-set-${n}.js`), "/* Generated by scripts/generators/abstract-patterns.mjs. Edit the generator, not this file. */\nEPSO_BANK.registerSet(" + body + ");\n");
  }
  if (prints) Object.entries(fresh).forEach(([id, h]) => { if (prints[id] !== h) throw new Error(`Medium abstract item ${id} changed: give revised content a new id.`); });
  else fs.writeFileSync(printFile, JSON.stringify(fresh, null, 2) + "\n");
  let mo = 0, ou = 0, ma = 0;
  items.forEach((q) => { const b = abstractBlind(q.options, q.answer); mo += b.medoid; ou += b.outlier; ma += b.majority; });
  const pc = (x) => Math.round((x / items.length) * 100) + "%";
  console.log(`abstract medium sets 12–16: ${items.length} patterned items; blind solvers: most central ${pc(mo)}, odd one out ${pc(ou)}, majority ${pc(ma)}`);
}

// Separate deterministic stream: published Sets 12–16 remain byte-for-byte reproducible.
export function generateUpgradePatterns(count) {
  seed = 202611091;
  const items = [], seen = new Set();
  for (let i = 0; i < count; i++) {
    const family = FAMILIES[i % 3]; let item;
    for (let attempt = 0; attempt < 1000 && !item; attempt++) {
      const candidate = build(family, family === quadFamily ? 3 : 4, 1 + i % 5);
      if (candidate && !seen.has(JSON.stringify(candidate.sequence))) item = candidate;
    }
    if (!item) throw Error('Cannot build upgraded Medium ' + i);
    seen.add(JSON.stringify(item.sequence));
    items.push({...item, difficulty: 2, options: item.options.map(o=>o.fig), optionNotes: item.options.map(o=>o.note), answer: 0});
  }
  return items;
}
