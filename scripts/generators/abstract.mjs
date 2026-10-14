// Generates every abstract reasoning set (questions/abstract/abstract-set-01…04.js, 150 items).
// Each frame holds several elements; 2–4 independent rules run in parallel (difficulty = rules − 1).
// Every wrong option breaks exactly one rule; no option differs from the key by size alone.
// Usage: node scripts/generators/abstract.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

let seed = 90210;
const rnd = () => {
  seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const ri = (a, b) => a + Math.floor(rnd() * (b - a + 1));
const pick = (a) => a[Math.floor(rnd() * a.length)];
const shuffle = (a) => { const r = a.slice(); for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; };
const norm = (a) => ((a % 360) + 360) % 360;

/* ---------- element drawing ---------- */
const SHAPES = ["circle", "square", "triangle", "pentagon", "hexagon", "diamond"];
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
const arrowEl = (rot, kind) => ({ t: "arrow", x: 50, y: kind === "triangle" ? 55 : 48, r: kind === "triangle" ? 10 : 13, rot: norm(rot), fill: "white" });
const CORNERS = [[13, 13], [87, 13], [87, 75], [13, 75]]; // TL, TR, BR, BL (clockwise)
const CORNER_NAMES = ["top-left", "top-right", "bottom-right", "bottom-left"];
const cornerEl = (i) => ({ t: "circle", x: CORNERS[i][0], y: CORNERS[i][1], r: 6, fill: "black" });
const dotsEl = (n) => Array.from({ length: n }, (_, i) => ({ t: "circle", x: 50 - (n - 1) * 5 + i * 10, y: 91, r: 3.5, fill: "black" }));
const SLOTS = [30, 50, 70];
const SLOT_NAMES = ["left", "middle", "right"];
const slotEl = (i) => ({ t: "rect", x: SLOTS[i] - 5, y: 2, w: 10, h: 6, fill: "black" });

function frame(st) {
  const items = [outerShape(st.shape, st.fill)];
  if (st.arrow !== null) items.push(arrowEl(st.arrow, st.shape));
  items.push(cornerEl(st.corner));
  items.push(...dotsEl(st.dots));
  if (st.slot !== null) items.push(slotEl(st.slot));
  return items;
}

/* ---------- rule tracks: value(i) for frames 0–5 plus wrong values for frame 6 ---------- */
const TRACKS = {
  shape() {
    const p = pick([2, 3, 3, 4]);
    const cyc = shuffle(SHAPES).slice(0, p);
    const val = (i) => cyc[i % p];
    const wrong = [val(4), val(6), SHAPES.find((s) => !cyc.includes(s))].filter((w) => w !== val(5));
    return { key: "shape", name: "outer shape", val, wrong: [...new Set(wrong)], describe: `the outer shape repeats in a cycle of ${p}: ${cyc.join(" → ")}`, noteWrong: (w) => (w === val(4) ? "the outer shape repeats the previous frame" : !cyc.includes(w) ? "the outer shape is not part of the cycle" : "the outer shape skips a step in its cycle") };
  },
  fill() {
    const p = pick([2, 3]);
    const cyc = p === 2 ? shuffle(["white", "grey", "black"]).slice(0, 2) : shuffle(["white", "grey", "black"]);
    const val = (i) => cyc[i % p];
    const wrong = [val(4), ...["white", "grey", "black"].filter((f) => f !== val(5) && f !== val(4))];
    return { key: "fill", name: "fill colour", val, wrong: [...new Set(wrong)].filter((w) => w !== val(5)), describe: `the fill colour repeats in a cycle of ${p}: ${cyc.join(" → ")}`, noteWrong: (w) => (w === val(4) ? "the fill colour repeats the previous frame" : "the fill colour breaks its cycle") };
  },
  arrow() {
    const step = pick([45, 90, 135]) * pick([1, -1]);
    const start = pick([0, 45, 90, 180, 270]);
    const val = (i) => norm(start + step * i);
    const wrong = [val(4), norm(val(4) - step), norm(val(5) + step), norm(val(5) + 180)].filter((w) => w !== val(5));
    const dir = step > 0 ? "clockwise" : "anticlockwise";
    return { key: "arrow", name: "arrow", val, wrong: [...new Set(wrong)], describe: `the arrow turns ${Math.abs(step)}° ${dir} each step`, noteWrong: (w) => (w === val(4) ? "the arrow has not turned" : w === norm(val(4) - step) ? "the arrow turns the wrong way" : w === norm(val(5) + step) ? "the arrow turns two steps at once" : "the arrow points the opposite way") };
  },
  corner() {
    const step = pick([1, -1, 2]);
    const start = ri(0, 3);
    const val = (i) => (((start + step * i) % 4) + 4) % 4;
    const wrong = [val(4), (((val(4) - step) % 4) + 4) % 4, (((val(5) + 1) % 4) + 4) % 4, (((val(5) + 2) % 4) + 4) % 4].filter((w) => w !== val(5));
    const how = step === 2 ? "jumps to the opposite corner" : `moves one corner ${step > 0 ? "clockwise" : "anticlockwise"}`;
    return { key: "corner", name: "corner dot", val, wrong: [...new Set(wrong)], describe: `the corner dot ${how} each step`, noteWrong: (w) => (w === val(4) ? "the corner dot has not moved" : `the corner dot is in the wrong corner (${CORNER_NAMES[w]})`) };
  },
  dots() {
    const kind = pick(["up", "down", "zigzag", "twice", "up2"]);
    const seqs = { up: [1, 2, 3, 4, 5, 6], down: [6, 5, 4, 3, 2, 1], zigzag: [1, 3, 2, 4, 3, 5], twice: [1, 1, 2, 2, 3, 3], up2: [1, 1, 2, 3, 5, 8] };
    let seq = seqs[kind];
    if (kind === "up2") seq = [2, 3, 4, 5, 6, 7];
    const val = (i) => seq[i];
    const wrong = [seq[5] + 1, seq[5] - 1, seq[4]].filter((w) => w >= 1 && w <= 8 && w !== seq[5]);
    const describe = { up: "one dot is added each step", down: "one dot is removed each step", zigzag: "the number of dots goes +2, −1, +2, −1…", twice: "each number of dots appears twice before increasing", up2: "one dot is added each step" }[kind];
    return { key: "dots", name: "number of dots", val, wrong: [...new Set(wrong)], describe, noteWrong: (w) => (w === seq[4] ? "the number of dots has not changed" : `the number of dots is ${w}, not ${seq[5]}`) };
  },
  slot() {
    const kind = pick(["bounce", "cycle", "back"]);
    const seq = { bounce: [0, 1, 2, 1, 0, 1], cycle: [0, 1, 2, 0, 1, 2], back: [2, 1, 0, 2, 1, 0] }[kind];
    const off = ri(0, 2);
    const val = (i) => (kind === "bounce" ? [off === 0 ? 0 : 2, 1, off === 0 ? 2 : 0, 1, off === 0 ? 0 : 2, 1][i] : seq[i]);
    const wrong = [0, 1, 2].filter((w) => w !== val(5));
    const describe = kind === "bounce" ? "the top bar moves one place at a time and bounces back at each end" : kind === "cycle" ? "the top bar moves one place to the right and wraps around" : "the top bar moves one place to the left and wraps around";
    return { key: "slot", name: "top bar", val, wrong, describe, noteWrong: (w) => (w === val(4) ? "the top bar has not moved" : `the top bar is in the wrong position (${SLOT_NAMES[w]})`) };
  }
};

/* ---------- item builder ---------- */
function buildItem(nRules) {
  const keys = shuffle(Object.keys(TRACKS)).slice(0, nRules);
  const tracks = keys.map((k) => TRACKS[k]());
  const tk = Object.fromEntries(tracks.map((t) => [t.key, t]));
  // Constant values for elements without a rule (they are present but never change).
  const constShape = pick(SHAPES), constFill = pick(["white", "grey"]), constCorner = ri(0, 3), constDots = ri(1, 3);
  const showArrow = !!tk.arrow || rnd() < 0.4, constArrow = pick([0, 90, 180, 270]);
  const showSlot = !!tk.slot || rnd() < 0.3, constSlot = ri(0, 2);
  const state = (i, over = {}) => ({
    shape: "shape" in over ? over.shape : tk.shape ? tk.shape.val(i) : constShape,
    fill: "fill" in over ? over.fill : tk.fill ? tk.fill.val(i) : constFill,
    arrow: !showArrow ? null : "arrow" in over ? over.arrow : tk.arrow ? tk.arrow.val(i) : constArrow,
    corner: "corner" in over ? over.corner : tk.corner ? tk.corner.val(i) : constCorner,
    dots: "dots" in over ? over.dots : tk.dots ? tk.dots.val(i) : constDots,
    slot: !showSlot ? null : "slot" in over ? over.slot : tk.slot ? tk.slot.val(i) : constSlot
  });
  const sequence = [0, 1, 2, 3, 4].map((i) => frame(state(i)));
  const key = frame(state(5));
  // Four distractors, each breaking exactly one rule; spread across the rules.
  const wrongs = [];
  const perTrack = tracks.map((t) => shuffle(t.wrong).map((w) => ({ t, w })));
  let round = 0;
  while (wrongs.length < 4 && round < 6) {
    perTrack.forEach((list) => { if (wrongs.length < 4 && list[round]) wrongs.push(list[round]); });
    round++;
  }
  if (wrongs.length < 4) return null;
  const options = [{ fig: key, note: "Correct: it follows every rule." }].concat(wrongs.map(({ t, w }) => ({ fig: frame(state(5, { [t.key]: w })), note: `Breaks one rule: ${t.noteWrong(w)}.` })));
  const sigs = new Set(options.map((o) => JSON.stringify(o.fig)));
  if (sigs.size !== 5) return null;
  const ruleList = tracks.map((t) => t.describe);
  const elements = ["outer shape", "fill colour", showArrow ? "arrow" : null, "corner dot", "number of dots", showSlot ? "top bar" : null].filter(Boolean);
  return {
    topic: tracks.map((t) => t.name[0].toUpperCase() + t.name.slice(1)).join(" + "),
    difficulty: nRules - 1, rules: nRules,
    stem: "Which figure comes next in the series?",
    sequence, options,
    hints: [
      `Check each element separately: ${elements.join(", ")}. Some change, some never do.`,
      `${nRules} elements follow a rule: ${tracks.map((t) => t.name).join(", ")}. Work out each rule, then predict frame 6 before looking at the options.`
    ],
    explanation: `${nRules} independent rules apply: ${ruleList.join("; ")}. Elements without a rule stay the same. Each wrong option breaks exactly one rule.`
  };
}

/* ---------- build 150 items with unique series ---------- */
const plan = [];
for (let i = 0; i < 150; i++) plan.push(i % 4 === 0 ? 2 : i % 4 === 3 ? 4 : 3); // 25% two rules, 50% three, 25% four
const seen = new Set();
const items = plan.map((n, i) => {
  for (let attempt = 0; attempt < 200; attempt++) {
    const it = buildItem(n);
    if (!it) continue;
    const sig = JSON.stringify(it.sequence);
    if (seen.has(sig)) continue;
    seen.add(sig);
    // Rotate options so the key lands on a balanced letter.
    const pos = (i * 2 + Math.floor(i / 5)) % 5;
    const opts = it.options.slice(1);
    opts.splice(pos, 0, it.options[0]);
    return { ...it, options: opts.map((o) => o.fig), answer: pos, optionNotes: opts.map((o) => o.note) };
  }
  throw new Error("could not build a unique item " + i);
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
  const set = { id: "abstract-" + id, section: "abstract", title: `Abstract Reasoning · Set ${n}`, description: `${size} figure series combining 2–4 rules (generated).`, version: 2 };
  const body = JSON.stringify({ ...set, questions: [] }, null, 2).replace('"questions": []', '"questions": [\n' +
    qs.map((q) => "    {\n" + Object.entries(q).map(([k, v]) =>
      k === "sequence" || k === "options"
        ? `      "${k}": [\n` + v.map((f) => "        " + JSON.stringify(f)).join(",\n") + "\n      ]"
        : `      "${k}": ${JSON.stringify(v)}`).join(",\n") + "\n    }").join(",\n") + "\n  ]");
  fs.writeFileSync(path.join(root, `questions/abstract/abstract-set-${id}.js`), "/* Generated by scripts/generators/abstract.mjs. Edit the generator, not this file. */\nEPSO_BANK.registerSet(" + body + ");\n");
});
const dist = [0, 0, 0, 0, 0], rules = { 2: 0, 3: 0, 4: 0 };
items.forEach((q) => { dist[q.answer]++; rules[q.rules]++; });
console.log("abstract: 150 items; answer letters A–E", dist.join("/"), "; rules per item", JSON.stringify(rules));
