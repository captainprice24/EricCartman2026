// Generates questions/abstract/abstract-set-01.js. Usage: node scripts/generators/abstract-set-01.mjs questions/abstract/abstract-set-01.js
import fs from "node:fs";
const out = process.argv[2];
const corner = { TL: [28, 28], TR: [72, 28], BR: [72, 72], BL: [28, 72] };
const grid9 = (i) => [22 + (i % 3) * 28, 22 + Math.floor(i / 3) * 28];

const arrow = (rot) => [{ t: "arrow", x: 50, y: 50, r: 32, rot, fill: "black" }];
const poly = (n, fill) => [{ t: "poly", x: 50, y: 52, r: 34, n, rot: 0, fill }];
const dot = (pos, fill) => [{ t: "rect", x: 12, y: 12, w: 76, h: 76, fill: "none" }, { t: "circle", x: corner[pos][0], y: corner[pos][1], r: 11, fill }];
const many = (k, kind) => {
  const items = [];
  for (let i = 0; i < k; i++) {
    const [x, y] = grid9(i);
    items.push(kind === "c" ? { t: "circle", x, y, r: 9, fill: "black" } : { t: "rect", x: x - 9, y: y - 9, w: 18, h: 18, fill: "black" });
  }
  return items;
};
const cell = (i) => {
  const items = [];
  for (let k = 0; k < 9; k++) {
    const [x, y] = grid9(k);
    items.push({ t: "rect", x: x - 14, y: y - 14, w: 28, h: 28, fill: k === i ? "black" : "none" });
  }
  return items;
};
const row = (p) => {
  if (p === null) return [0, 1, 2, 3, 4].map((i) => ({ t: "circle", x: 14 + i * 18, y: 50, r: 7, fill: "none" }));
  return [0, 1, 2, 3, 4].map((i) => ({ t: "circle", x: 14 + i * 18, y: 50, r: 7, fill: i === p ? "black" : "none" }));
};
const framed = (outer, rot) => [
  outer === "sq" ? { t: "rect", x: 14, y: 14, w: 72, h: 72, fill: "none" } : { t: "circle", x: 50, y: 50, r: 37, fill: "none" },
  { t: "arrow", x: 50, y: 50, r: 22, rot, fill: "black" }
];
const tri = (fill, rot) => [{ t: "poly", x: 50, y: 54, r: 34, n: 3, rot, fill }];
const stars = (k) => {
  const items = [];
  for (let i = 0; i < k; i++) {
    const [x, y] = grid9(i);
    items.push({ t: "star", x, y, r: 11, rot: 0, fill: "black" });
  }
  return items;
};
const shapeDot = (shape, pos) => {
  const base =
    shape === "circle" ? { t: "circle", x: 50, y: 50, r: 36, fill: "none" } :
    shape === "triangle" ? { t: "poly", x: 50, y: 56, r: 40, n: 3, rot: 0, fill: "none" } :
    { t: "rect", x: 16, y: 16, w: 68, h: 68, fill: "none" };
  const y = pos === "top" ? 36 : pos === "bottom" ? 66 : 52;
  return [base, { t: "circle", x: 50, y, r: 6, fill: "black" }];
};

const Q = [
  {
    id: "a01-01", topic: "Rotation", difficulty: 1,
    sequence: [0, 45, 90, 135, 180].map(arrow),
    options: [[arrow(225), "Correct: 180° + 45° = 225°."], [arrow(270), "Rotated 90° from the last frame. The step is 45°."], [arrow(180), "No change from the last frame."], [arrow(315), "This would be two steps ahead."], [arrow(45), "Rotated anticlockwise. The sequence turns clockwise."]],
    hints: ["Only one element is present. What changes about it from frame to frame?", "Measure the angle between consecutive arrows."],
    explanation: "The arrow turns 45° clockwise each step: 0°, 45°, 90°, 135°, 180°, so the next is 225° (pointing down-left)."
  },
  {
    id: "a01-02", topic: "Counting sides + alternation", difficulty: 2,
    sequence: [[3, "black"], [4, "white"], [5, "black"], [6, "white"], [7, "black"]].map(([n, f]) => poly(n, f)),
    options: [[poly(8, "white"), "Correct: 8 sides, white."], [poly(8, "black"), "Right number of sides, but the colour should alternate to white."], [poly(7, "white"), "Right colour, but the side count must rise to 8."], [poly(9, "white"), "Skips a step: 9 sides."], [poly(6, "black"), "The side count goes backwards."]],
    hints: ["Two things change: count the sides, and note the fill colour.", "Sides: 3, 4, 5, 6, 7… Colour: black, white, black, white, black…"],
    explanation: "Two independent rules apply. The number of sides increases by one (3 → 7, so next 8), and the fill alternates black/white (next is white)."
  },
  {
    id: "a01-03", topic: "Movement + alternation", difficulty: 2,
    sequence: [["TL", "black"], ["TR", "white"], ["BR", "black"], ["BL", "white"], ["TL", "black"]].map(([p, f]) => dot(p, f)),
    options: [[dot("TR", "white"), "Correct: top-right, white."], [dot("TR", "black"), "Right position, wrong colour: it alternates."], [dot("BR", "white"), "Moved two corners instead of one."], [dot("TL", "white"), "Did not move."], [dot("BL", "black"), "Moved anticlockwise."]],
    hints: ["Track the position of the circle around the four corners.", "Then track its colour separately."],
    explanation: "The circle moves one corner clockwise each step (TL → TR → BR → BL → TL → TR), and its colour alternates black/white. Next: top-right, white."
  },
  {
    id: "a01-04", topic: "Counting + alternating shapes", difficulty: 1,
    sequence: [[1, "c"], [2, "s"], [3, "c"], [4, "s"], [5, "c"]].map(([k, s]) => many(k, s)),
    options: [[many(6, "s"), "Correct: six squares."], [many(6, "c"), "Right count, but the shape should switch to squares."], [many(5, "s"), "The count must increase to 6."], [many(7, "s"), "One too many."], [many(4, "s"), "The count goes backwards."]],
    hints: ["Count the shapes in each frame.", "Which shape type appears in odd frames, and which in even frames?"],
    explanation: "The count increases by one each frame (1 → 5, next 6), and the shape alternates circle/square. Frame 6 is even, so it shows squares: six squares."
  },
  {
    id: "a01-05", topic: "Movement in a grid", difficulty: 3,
    sequence: [0, 2, 4, 6, 8].map(cell),
    options: [[cell(1), "Correct: (8 + 2) wraps around to cell 1 (second cell of the top row)."], [cell(0), "This treats the step as +1 after the last cell."], [cell(3), "Not consistent with a step of 2."], [cell(7), "Moving backwards."], [cell(8), "No movement."]],
    hints: ["Number the cells 0–8 in reading order (left to right, top to bottom).", "The shaded cell advances by a fixed amount. What happens after the last cell?"],
    explanation: "The shaded cell advances two places in reading order: 0, 2, 4, 6, 8. Continuing wraps around the grid: 8 + 2 = 10 → cell 1 (top row, middle)."
  },
  {
    id: "a01-06", topic: "Oscillation", difficulty: 2,
    sequence: [2, 3, 4, 3, 2].map(row),
    options: [[row(1), "Correct: it keeps moving left."], [row(0), "Jumps two places."], [row(3), "Reverses direction again without reaching the end."], [row(2), "No movement."], [row(4), "Jumps to the far right."]],
    hints: ["Follow the black circle along the row.", "It reached the right end and turned back. Which way is it moving now?"],
    explanation: "The black circle moves one place at a time and bounces at the ends: 3rd, 4th, 5th, 4th, 3rd, so the next is the 2nd position."
  },
  {
    id: "a01-07", topic: "Two independent rules", difficulty: 2,
    sequence: [["sq", 0], ["ci", 90], ["sq", 180], ["ci", 270], ["sq", 0]].map(([o, r]) => framed(o, r)),
    options: [[framed("ci", 90), "Correct: circle frame, arrow pointing right."], [framed("sq", 90), "Right arrow, but the frame should switch to a circle."], [framed("ci", 180), "The arrow turned 180° instead of 90°."], [framed("ci", 0), "The arrow did not turn."], [framed("sq", 270), "Both rules are applied backwards."]],
    hints: ["Separate the outer shape from the inner arrow.", "The arrow turns by the same angle each step. The frame alternates."],
    explanation: "The arrow turns 90° clockwise each step (up, right, down, left, up → right). The frame alternates square/circle (next is circle)."
  },
  {
    id: "a01-08", topic: "Colour cycle + flip", difficulty: 3,
    sequence: [["black", 0], ["grey", 180], ["white", 0], ["black", 180], ["grey", 0]].map(([f, r]) => tri(f, r)),
    options: [[tri("white", 180), "Correct: white, pointing down."], [tri("white", 0), "Right colour, but the orientation flips each step."], [tri("black", 180), "The colour cycle has period 3, not 2."], [tri("grey", 180), "Grey would repeat the previous colour."], [tri("grey", 0), "Identical to the last frame."]],
    hints: ["The colour follows a cycle. How long is it?", "The orientation alternates up/down."],
    explanation: "The fill cycles black → grey → white (period 3): B, G, W, B, G → W. The triangle flips 180° each step: up, down, up, down, up → down."
  },
  {
    id: "a01-09", topic: "Number series", difficulty: 3,
    sequence: [1, 1, 2, 3, 5].map(stars),
    options: [[stars(8), "Correct: 3 + 5 = 8."], [stars(6), "Adding one each time does not fit 1, 1, 2."], [stars(7), "Adding two does not fit the series."], [stars(9), "Not consistent with the series."], [stars(5), "No change."]],
    hints: ["Count the stars: 1, 1, 2, 3, 5.", "Each number is related to the two before it."],
    explanation: "The counts form the Fibonacci series: each term is the sum of the previous two (2 + 3 = 5, then 3 + 5 = 8)."
  },
  {
    id: "a01-10", topic: "Two cycles of different length", difficulty: 3,
    sequence: [["circle", "top"], ["triangle", "bottom"], ["square", "top"], ["circle", "bottom"], ["triangle", "top"]].map(([s, p]) => shapeDot(s, p)),
    options: [[shapeDot("square", "bottom"), "Correct: square, dot at the bottom."], [shapeDot("square", "top"), "Right shape, but the dot alternates top/bottom."], [shapeDot("circle", "bottom"), "The shape cycle is circle → triangle → square."], [shapeDot("triangle", "bottom"), "The triangle would repeat."], [shapeDot("square", "middle"), "The dot is only ever at the top or bottom."]],
    hints: ["The outline shape repeats with one period, and the dot with another.", "Shapes: circle, triangle, square, circle, triangle… Dot: top, bottom, top, bottom, top…"],
    explanation: "The outer shape cycles circle → triangle → square (period 3), so the next is a square. The dot alternates top/bottom (period 2), so the next is bottom."
  }
];

const questions = Q.map((q, i) => {
  // Rotate options so the correct answer sits at a different letter in each item.
  const k = (i * 2) % 5;
  const opts = q.options.map((o, idx) => ({ o, idx }));
  const rotated = opts.slice(5 - k).concat(opts.slice(0, 5 - k));
  return {
    id: q.id, topic: q.topic, difficulty: q.difficulty,
    stem: "Which figure comes next in the series?",
    sequence: q.sequence,
    options: rotated.map((x) => x.o[0]),
    answer: rotated.findIndex((x) => x.idx === 0),
    hints: q.hints,
    optionNotes: rotated.map((x) => x.o[1]),
    explanation: q.explanation
  };
});

const set = {
  id: "abstract-01", section: "abstract", title: "Abstract Reasoning · Set 1",
  description: "10 figure-series items: rotation, alternation, movement, counting and combined rules.",
  version: 1, questions
};
const fmt = (v) => JSON.stringify(v);
let body = "EPSO_BANK.registerSet(" + JSON.stringify({ ...set, questions: [] }, null, 2).replace('"questions": []', '"questions": [\n' +
  questions.map((q) => "    {\n" + Object.entries(q).map(([k, v]) => {
    if (k === "sequence" || k === "options") return `      "${k}": [\n` + v.map((f) => "        " + fmt(f)).join(",\n") + "\n      ]";
    return `      "${k}": ${JSON.stringify(v)}`;
  }).join(",\n") + "\n    }").join(",\n") + "\n  ]") + ");\n";
body = "/* Figures use the shape format in docs/QUESTION_FORMAT.md (100×100 canvas). */\n" + body;
fs.writeFileSync(out, body);
console.log("wrote", questions.length, questions.map((q) => q.answer).join(","));
