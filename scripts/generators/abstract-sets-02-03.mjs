// Generates questions/abstract/abstract-set-02.js and abstract-set-03.js (25 questions each).
// Each item is built from explicit rules; every distractor breaks exactly one rule.
// Usage: node scripts/generators/abstract-sets-02-03.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const r1 = (v) => Math.round(v * 10) / 10;
const norm = (a) => ((a % 360) + 360) % 360;

/* ---------- shape helpers (100 × 100 canvas) ---------- */
const arrow = (rot, x = 50, y = 50, r = 32, fill = "black") => ({ t: "arrow", x, y, r, rot: norm(rot), fill });
const poly = (n, fill = "none", rot = 0, x = 50, y = 52, r = 34) => ({ t: "poly", x, y, r, n, rot: norm(rot), fill });
const circle = (x, y, r, fill = "none") => ({ t: "circle", x, y, r, fill });
const rect = (x, y, w, h, fill = "none") => ({ t: "rect", x, y, w, h, fill });
const star = (x, y, r, fill = "black") => ({ t: "star", x, y, r, rot: 0, fill });
const line = (x1, y1, x2, y2) => ({ t: "line", x1: r1(x1), y1: r1(y1), x2: r1(x2), y2: r1(y2) });
const box = () => rect(12, 12, 76, 76, "none");
const CORNER = { TL: [28, 28], TR: [72, 28], BR: [72, 72], BL: [28, 72] };
const CW = ["TL", "TR", "BR", "BL"];
const grid9 = (i) => [22 + (i % 3) * 28, 22 + Math.floor(i / 3) * 28];
const unit = (kind, x, y, s = 9, fill = "black") =>
  kind === "circle" ? circle(x, y, s, fill)
    : kind === "square" ? rect(x - s, y - s, 2 * s, 2 * s, fill)
      : kind === "triangle" ? poly(3, fill, 0, x, y + 1, s + 3)
        : star(x, y, s + 2, fill);
const many = (k, kind, fill = "black") => Array.from({ length: k }, (_, i) => unit(kind, ...grid9(i), 9, fill));
const outline = (kind) =>
  kind === "square" ? rect(16, 16, 68, 68, "none")
    : kind === "circle" ? circle(50, 50, 37, "none")
      : kind === "triangle" ? poly(3, "none", 0, 50, 56, 42)
        : kind === "hexagon" ? poly(6, "none", 0, 50, 50, 38)
          : poly(5, "none", 0, 50, 52, 38);
const spokes = (angles) => [circle(50, 50, 38, "none"), ...angles.map((a) => line(50, 50, 50 + 34 * Math.sin((a * Math.PI) / 180), 50 - 34 * Math.cos((a * Math.PI) / 180)))];
const hand = (a, outer = true) => {
  const x = 50 + 30 * Math.sin((a * Math.PI) / 180), y = 50 - 30 * Math.cos((a * Math.PI) / 180);
  return [...(outer ? [circle(50, 50, 40, "none")] : []), line(50, 50, x, y), circle(r1(x), r1(y), 6, "black"), circle(50, 50, 3, "black")];
};
const QUAD = { TL: [15, 15], TR: [50, 15], BR: [50, 50], BL: [15, 50] };
const quads = (shaded, dot) => [...CW.map((q) => rect(QUAD[q][0], QUAD[q][1], 35, 35, shaded.includes(q) ? "black" : "none")), ...(dot ? [circle(50, 50, 6, dot)] : [])];
const row = (marks, n = 5) => Array.from({ length: n }, (_, i) => circle(14 + i * 18, 50, 7, marks[i] || "none"));
const cell = (cells) => Array.from({ length: 9 }, (_, k) => { const [x, y] = grid9(k); return rect(x - 14, y - 14, 28, 28, cells[k] || "none"); });

const items = [];
const add = (q) => items.push(q);

/* ---------- A. rotation ---------- */
const rotItem = (topic, start, step, dirWord, extra = {}) => {
  const seq = [0, 1, 2, 3, 4].map((i) => [arrow(start + step * i)]);
  const next = start + step * 5;
  add({
    topic, difficulty: Math.abs(step) === 90 ? 1 : 2,
    sequence: seq,
    options: [
      [[arrow(next)], `Correct: the arrow keeps turning ${Math.abs(step)}° ${dirWord}.`],
      [[arrow(next - step * 2)], "This turns the opposite way."],
      [[arrow(start + step * 4)], "No change from the last frame."],
      [[arrow(next + step)], "Two steps instead of one."],
      [[arrow(next, 50, 50, 32, "white")], "Right direction, but the arrow is always black."]
    ],
    hints: ["Only one element changes. Measure the angle between consecutive arrows.", `Each step turns the arrow ${Math.abs(step)}°. Which direction?`],
    explanation: `The arrow rotates ${Math.abs(step)}° ${dirWord} at each step, so frame 6 continues the turn once more.`,
    ...extra
  });
};
rotItem("Rotation", 0, -90, "anticlockwise");
rotItem("Rotation", 90, -45, "anticlockwise");
rotItem("Rotation", 0, 135, "clockwise");
rotItem("Rotation", 45, 90, "clockwise");
{
  const seq = [0, 1, 2, 3, 4].map((i) => [poly(3, "black", 90 * i)]);
  add({
    topic: "Rotation", difficulty: 2, sequence: seq,
    options: [
      [[poly(3, "black", 450)], "Correct: 90° clockwise again (pointing right)."],
      [[poly(3, "black", 270)], "Pointing left: this turns anticlockwise."],
      [[poly(3, "black", 360)], "No change from the last frame."],
      [[poly(3, "black", 180)], "Two steps instead of one."],
      [[poly(3, "white", 450)], "Right orientation, but the fill never changes."]
    ],
    hints: ["Follow the tip of the triangle.", "The tip moves a quarter turn each step."],
    explanation: "The triangle turns 90° clockwise each step: up, right, down, left, up, so next it points right."
  });
}

/* ---------- B. sides + fill ---------- */
{
  const fills = ["grey", "white"];
  const seq = [8, 7, 6, 5, 4].map((n, i) => [poly(n, fills[i % 2])]);
  add({
    topic: "Counting sides + alternation", difficulty: 2, sequence: seq,
    options: [
      [[poly(3, "white")], "Correct: 3 sides, white."],
      [[poly(3, "grey")], "Right shape, but the fill alternates."],
      [[poly(5, "white")], "Sides go back up instead of down."],
      [[poly(4, "white")], "Sides must keep decreasing."],
      [[circle(50, 50, 34, "white")], "A circle has no sides to count."]
    ],
    hints: ["Count the sides: 8, 7, 6…", "The fill alternates grey and white."],
    explanation: "One side is removed each step (8 → 4, next 3) and the fill alternates grey/white (next white)."
  });
}
{
  const cyc = ["black", "grey", "white"];
  const seq = [3, 4, 5, 6, 7].map((n, i) => [poly(n, cyc[i % 3])]);
  add({
    topic: "Counting sides + colour cycle", difficulty: 3, sequence: seq,
    options: [
      [[poly(8, "white")], "Correct: 8 sides; the colour cycle is black, grey, white."],
      [[poly(8, "black")], "Black would restart the cycle too early."],
      [[poly(8, "grey")], "Grey repeats the previous colour."],
      [[poly(7, "white")], "The side count must rise to 8."],
      [[poly(9, "white")], "One side too many."]
    ],
    hints: ["Sides: 3, 4, 5, 6, 7…", "Colours repeat every three frames."],
    explanation: "Sides increase by one (next 8). The fill cycles black → grey → white, so frame 6 is white."
  });
}
{
  const seq = [4, 5, 6, 7, 8].map((n, i) => [poly(n, "none", 0, 50, 52, 20 + i * 4)]);
  add({
    topic: "Counting sides + size", difficulty: 2, sequence: seq,
    options: [
      [[poly(9, "none", 0, 50, 52, 40)], "Correct: 9 sides and larger again."],
      [[poly(9, "none", 0, 50, 52, 36)], "Right sides, but the size did not grow."],
      [[poly(8, "none", 0, 50, 52, 40)], "Size grew, but the sides must rise to 9."],
      [[poly(9, "none", 0, 50, 52, 20)], "The shape should keep growing."],
      [[poly(10, "none", 0, 50, 52, 40)], "One side too many."]
    ],
    hints: ["Two things change: number of sides and size.", "Both increase steadily."],
    explanation: "Each step adds a side and enlarges the shape, so the next figure is a larger 9-sided shape."
  });
}

/* ---------- C. corners ---------- */
{
  const fills = ["grey", "black"];
  const ACW = ["TR", "TL", "BL", "BR"];
  const seq = [0, 1, 2, 3, 4].map((i) => [box(), circle(...CORNER[ACW[i % 4]], 11, fills[i % 2])]);
  add({
    topic: "Movement + alternation", difficulty: 2, sequence: seq,
    options: [
      [[box(), circle(...CORNER.TL, 11, "black")], "Correct: top-left, black."],
      [[box(), circle(...CORNER.TL, 11, "grey")], "Right corner, wrong colour."],
      [[box(), circle(...CORNER.BR, 11, "black")], "This moves clockwise."],
      [[box(), circle(...CORNER.TR, 11, "black")], "No movement."],
      [[box(), circle(...CORNER.BL, 11, "black")], "Moved two corners."]
    ],
    hints: ["Follow the circle around the corners: which direction?", "Its colour alternates grey and black."],
    explanation: "The circle moves one corner anticlockwise each step and alternates grey/black: next is top-left, black."
  });
}
{
  const sizes = [8, 14];
  const pos = ["TL", "TR", "BR", "BL", "TL"];
  const seq2 = pos.map((p, i) => [box(), circle(...CORNER[p], sizes[i % 2], "black")]);
  add({
    topic: "Movement + size", difficulty: 2, sequence: seq2,
    options: [
      [[box(), circle(...CORNER.TR, 14, "black")], "Correct: top-right, large."],
      [[box(), circle(...CORNER.TR, 8, "black")], "Right corner, but the size alternates."],
      [[box(), circle(...CORNER.BL, 14, "black")], "This moves anticlockwise."],
      [[box(), circle(...CORNER.TL, 14, "black")], "No movement."],
      [[box(), circle(...CORNER.BR, 14, "black")], "Moved two corners."]
    ],
    hints: ["Track the corner the dot is in.", "Track its size separately: small, large, small…"],
    explanation: "The dot moves one corner clockwise each step and alternates small/large. Next: top-right, large."
  });
}
{
  const posA = ["TL", "TR", "BR", "BL", "TL"], posB = ["BL", "BR", "TR", "TL", "BL"];
  const fig = (a, b) => [box(), circle(...CORNER[a], 10, "black"), circle(...CORNER[b], 10, "white")];
  add({
    topic: "Two moving elements", difficulty: 3, sequence: posA.map((a, i) => fig(a, posB[i])),
    options: [
      [fig("TR", "BR"), "Correct: black top-right, white bottom-right."],
      [fig("TR", "TL"), "The white circle moves anticlockwise, not clockwise."],
      [fig("BL", "BR"), "The black circle moves clockwise, not anticlockwise."],
      [fig("TR", "BL"), "The white circle did not move."],
      [fig("BR", "TR"), "Both moved two corners."]
    ],
    hints: ["Follow the black circle and the white circle separately.", "They move in opposite directions around the square."],
    explanation: "Black moves one corner clockwise and white one corner anticlockwise each step. Next: black top-right, white bottom-right."
  });
}

/* ---------- D. counts ---------- */
{
  const kinds = ["circle", "square", "triangle"];
  const counts = [9, 8, 7, 6, 5];
  add({
    topic: "Counting + shape cycle", difficulty: 2, sequence: counts.map((k, i) => many(k, kinds[i % 3])),
    options: [
      [many(4, "triangle"), "Correct: four triangles."],
      [many(4, "circle"), "Right count, but the shape cycle gives triangles."],
      [many(4, "square"), "Squares would repeat the previous shape."],
      [many(5, "triangle"), "The count must fall to 4."],
      [many(3, "triangle"), "One too few."]
    ],
    hints: ["Count the shapes: 9, 8, 7…", "The shape cycles circle → square → triangle."],
    explanation: "The count decreases by one (next 4) and the shape cycles with period 3 (circle, square, triangle, circle, square → triangle)."
  });
}
{
  const fills = ["black", "white"];
  add({
    topic: "Counting + alternation", difficulty: 1, sequence: [2, 3, 4, 5, 6].map((k, i) => many(k, "square", fills[i % 2])),
    options: [
      [many(7, "square", "white"), "Correct: seven white squares."],
      [many(7, "square", "black"), "Right count, wrong colour."],
      [many(6, "square", "white"), "The count must rise to 7."],
      [many(8, "square", "white"), "One too many."],
      [many(7, "circle", "white"), "The shape never changes."]
    ],
    hints: ["Count the squares.", "Colours alternate black and white."],
    explanation: "One square is added each step (next 7) and the colour alternates (next white)."
  });
}
{
  add({
    topic: "Number series", difficulty: 3, sequence: [1, 3, 2, 4, 3].map((k) => many(k, "circle")),
    options: [
      [many(5, "circle"), "Correct: +2, −1, +2, −1, +2 → 5."],
      [many(4, "circle"), "Adds only 1."],
      [many(2, "circle"), "Applies −1 again instead of +2."],
      [many(6, "circle"), "Adds 3."],
      [many(3, "circle"), "No change."]
    ],
    hints: ["Write the counts as numbers: 1, 3, 2, 4, 3.", "Look at the differences between consecutive terms."],
    explanation: "The differences alternate +2 and −1. After −1 comes +2, so 3 + 2 = 5."
  });
}

/* ---------- E. grid movement ---------- */
const gridItem = (start, step, topic, extraNote) => {
  const pos = [0, 1, 2, 3, 4].map((i) => (start + step * i) % 9);
  const next = (start + step * 5) % 9;
  const others = [0, 1, 2, 3, 4, 5, 6, 7, 8].filter((c) => c !== next);
  const prev = pos[4];
  const one = (prev + 1) % 9, back = (prev - step + 9) % 9;
  const picks = [prev, one, back].filter((c, i, a) => c !== next && a.indexOf(c) === i);
  for (const c of others) if (picks.length < 4 && !picks.includes(c)) picks.push(c);
  const names = { [prev]: "No movement.", [one]: "This moves only one cell.", [back]: "This moves backwards." };
  add({
    topic, difficulty: 3, sequence: pos.map((c) => cell({ [c]: "black" })),
    options: [[cell({ [next]: "black" }), pos[4] + step >= 9 ? `Correct: ${pos[4]} + ${step} = ${pos[4] + step}, which wraps to cell ${next}.` : `Correct: ${pos[4]} + ${step} = cell ${next}.`]].concat(picks.slice(0, 4).map((c) => [cell({ [c]: "black" }), names[c] || "Does not follow the step size."])),
    hints: ["Number the cells 0–8 in reading order.", `How many cells does the black square advance each time? ${extraNote}`],
    explanation: `The black cell advances ${step} places in reading order, wrapping from the last cell back to the first. Next is cell ${next}.`
  });
};
gridItem(0, 4, "Movement in a grid", "Count past the end of the grid and wrap around.");
gridItem(1, 2, "Movement in a grid", "After cell 8 it continues from cell 0.");
gridItem(0, 5, "Movement in a grid", "Steps larger than a row wrap around quickly.");
{
  const a = [0, 1, 2, 3, 4], b = [8, 6, 4, 2, 0];
  const fig = (x, y) => cell({ [x]: "black", [y]: "grey" });
  add({
    topic: "Two moving cells", difficulty: 3, sequence: a.map((x, i) => fig(x, b[i])),
    options: [
      [fig(5, 7), "Correct: black → cell 5, grey → cell 7."],
      [fig(5, 1), "Grey moved forward instead of backward."],
      [fig(4, 7), "Black did not move."],
      [fig(6, 7), "Black moved two cells."],
      [fig(5, 8), "Grey moved only one cell back."]
    ],
    hints: ["Track the black and grey cells separately.", "Black moves +1, grey moves −2 (wrapping)."],
    explanation: "Black advances one cell each step (next 5). Grey moves back two cells and wraps: 0 − 2 → cell 7."
  });
}

/* ---------- F. row movement ---------- */
{
  const p = [1, 2, 3, 4, 3];
  add({
    topic: "Oscillation", difficulty: 2, sequence: p.map((i) => row({ [i]: "black" })),
    options: [
      [row({ 2: "black" }), "Correct: it keeps moving left after bouncing."],
      [row({ 4: "black" }), "Turns again too early."],
      [row({ 0: "black" }), "This restarts from the left end."],
      [row({ 3: "black" }), "No movement."],
      [row({ 1: "black" }), "Moves two places."]
    ],
    hints: ["Follow the black circle.", "It reached the right end and turned back."],
    explanation: "The black circle moves one place at a time and bounces off the end: 2nd, 3rd, 4th, 5th, 4th, then 3rd."
  });
}
{
  const p = [0, 2, 4, 2, 0];
  add({
    topic: "Oscillation", difficulty: 2, sequence: p.map((i) => row({ [i]: "black" })),
    options: [
      [row({ 2: "black" }), "Correct: bounces off the left end and moves two places right."],
      [row({ 4: "black" }), "Jumps four places."],
      [row({ 1: "black" }), "Moves one place, but the step is two."],
      [row({ 0: "black" }), "No movement."],
      [row({ 3: "black" }), "Not consistent with a step of two."]
    ],
    hints: ["How far does the circle move each time?", "What happens at the ends of the row?"],
    explanation: "The circle moves two places per step and bounces at both ends: 1st, 3rd, 5th, 3rd, 1st → 3rd."
  });
}
{
  const trail = (head, gaps = []) => Array.from({ length: 6 }, (_, i) => circle(10 + i * 16, 50, 6, i === head ? "black" : i < head && !gaps.includes(i) ? "grey" : "none"));
  add({
    topic: "Movement with a trail", difficulty: 2, sequence: [0, 1, 2, 3, 4].map((h) => trail(h)),
    options: [
      [trail(5), "Correct: the black circle moves on and leaves a grey trail behind it."],
      [Array.from({ length: 6 }, (_, i) => circle(10 + i * 16, 50, 6, i === 5 ? "black" : "none")), "The grey trail has disappeared."],
      [trail(4), "No movement."],
      [trail(5, [2]), "One trail circle is missing."],
      [Array.from({ length: 6 }, (_, i) => circle(10 + i * 16, 50, 6, "grey")), "The black leading circle is missing."]
    ],
    hints: ["Follow the black circle.", "What happens to the places it has already visited?"],
    explanation: "The black circle advances one place each step and every place it leaves turns grey. In frame 6 it reaches the last place, with five grey circles behind it."
  });
}

/* ---------- G. frame alternation + arrow rotation ---------- */
const frameArrow = (frames, step, topic) => {
  const seq = [0, 1, 2, 3, 4].map((i) => [outline(frames[i % frames.length]), arrow(step * i, 50, 52, 20)]);
  const nf = frames[5 % frames.length];
  const wf = frames[4 % frames.length];
  add({
    topic, difficulty: 2, sequence: seq,
    options: [
      [[outline(nf), arrow(step * 5, 50, 52, 20)], "Correct: next frame shape and the arrow turned once more."],
      [[outline(wf === nf ? frames[(5 + 1) % frames.length] : wf), arrow(step * 5, 50, 52, 20)], "Right arrow, wrong frame."],
      [[outline(nf), arrow(step * 4, 50, 52, 20)], "The arrow did not turn."],
      [[outline(nf), arrow(step * 6, 50, 52, 20)], "The arrow turned twice."],
      [[outline(nf), arrow(step * 3, 50, 52, 20)], "The arrow turned the wrong way."]
    ],
    hints: ["Separate the frame from the arrow.", "The frames follow a fixed cycle; the arrow turns by a fixed angle."],
    explanation: `The frame cycles ${frames.join(" → ")} and the arrow turns ${Math.abs(step)}° ${step > 0 ? "clockwise" : "anticlockwise"} each step.`
  });
};
frameArrow(["triangle", "circle"], 90, "Two independent rules");
frameArrow(["hexagon", "square"], -45, "Two independent rules");
frameArrow(["circle", "square", "triangle"], 90, "Two cycles of different length");

/* ---------- H. colour cycle + orientation ---------- */
{
  const cyc = ["white", "grey", "black"];
  const seq = [0, 1, 2, 3, 4].map((i) => [poly(4, cyc[i % 3], i % 2 ? 45 : 0)]);
  add({
    topic: "Colour cycle + orientation", difficulty: 3, sequence: seq,
    options: [
      [[poly(4, "black", 45)], "Correct: black, sitting flat on an edge."],
      [[poly(4, "black", 0)], "Right colour, but the orientation alternates."],
      [[poly(4, "white", 45)], "White would restart the cycle too early."],
      [[poly(4, "grey", 45)], "Grey repeats the previous colour."],
      [[poly(4, "grey", 0)], "Identical to the last frame."]
    ],
    hints: ["Does the square sit on a corner or on an edge? It alternates.", "The fill cycles through three colours."],
    explanation: "The square alternates between standing on a corner and sitting flat, and its fill cycles white → grey → black. Frame 6: black, sitting flat."
  });
}
{
  const cyc = ["black", "white", "grey"];
  const seq = [1, 2, 3, 4, 5].map((k, i) => many(k, "star", cyc[i % 3]));
  add({
    topic: "Counting + colour cycle", difficulty: 2, sequence: seq,
    options: [
      [many(6, "star", "grey"), "Correct: six grey stars."],
      [many(6, "star", "black"), "Black restarts the cycle too early."],
      [many(6, "star", "white"), "White repeats the previous colour."],
      [many(5, "star", "grey"), "The count must rise to 6."],
      [many(7, "star", "grey"), "One too many."]
    ],
    hints: ["Count the stars.", "The colour repeats every three frames."],
    explanation: "One star is added each step (next 6) and the colour cycles black → white → grey (next grey)."
  });
}

/* ---------- I. number series ---------- */
{
  add({
    topic: "Number series", difficulty: 2, sequence: [8, 7, 6, 5, 4].map((k) => many(k, "triangle")),
    options: [
      [many(3, "triangle"), "Correct: one fewer each step."],
      [many(4, "triangle"), "No change."],
      [many(2, "triangle"), "Two fewer."],
      [many(5, "triangle"), "Goes back up."],
      [many(3, "circle"), "Right count, wrong shape."]
    ],
    hints: ["Count the triangles.", "The count changes by the same amount each time."],
    explanation: "The number of triangles falls by one each step: 8, 7, 6, 5, 4 → 3."
  });
}
{
  add({
    topic: "Number series", difficulty: 2, sequence: [1, 1, 2, 2, 3].map((k) => many(k, "star")),
    options: [
      [many(3, "star"), "Correct: each count appears twice (1, 1, 2, 2, 3, 3)."],
      [many(4, "star"), "This assumes +1 every step."],
      [many(5, "star"), "This treats it as a Fibonacci-type series."],
      [many(2, "star"), "Goes backwards."],
      [many(6, "star"), "Doubles the last count."]
    ],
    hints: ["Write the counts down: 1, 1, 2, 2, 3…", "Is each number repeated?"],
    explanation: "Each count appears twice before increasing: 1, 1, 2, 2, 3, so the next is 3 again."
  });
}
{
  add({
    topic: "Number series", difficulty: 3, sequence: [9, 7, 8, 6, 7].map((k) => many(k, "square")),
    options: [
      [many(5, "square"), "Correct: −2, +1, −2, +1, −2 → 5."],
      [many(8, "square"), "This applies +1 instead of −2."],
      [many(6, "square"), "This applies −1."],
      [many(4, "square"), "Subtracts 3."],
      [many(7, "square"), "No change."]
    ],
    hints: ["Write the counts: 9, 7, 8, 6, 7.", "The differences alternate."],
    explanation: "The differences alternate −2 and +1. After +1 comes −2: 7 − 2 = 5."
  });
}

/* ---------- J. two cycles of different length ---------- */
{
  const shapes = ["square", "circle", "triangle", "hexagon"];
  const dotY = [34, 70];
  const fig = (s, d) => [outline(s), circle(50, d, 6, "black")];
  add({
    topic: "Two cycles of different length", difficulty: 3, sequence: [0, 1, 2, 3, 4].map((i) => fig(shapes[i % 4], dotY[i % 2])),
    options: [
      [fig("circle", 70), "Correct: circle (period 4), dot low (period 2)."],
      [fig("circle", 34), "Right shape, wrong dot position."],
      [fig("triangle", 70), "The shape cycle has four steps."],
      [fig("square", 70), "Square would repeat the previous frame's shape."],
      [fig("hexagon", 70), "Hexagon came at step 4; the cycle moves on."]
    ],
    hints: ["The outline shapes repeat every four frames.", "The dot alternates high/low."],
    explanation: "The outline cycles square → circle → triangle → hexagon (frame 5 is square again, so frame 6 is circle). The dot alternates high/low (next low)."
  });
}
{
  const fills = ["black", "grey", "white"];
  const xs = [30, 70];
  const fig = (f, x) => [outline("square"), circle(x, 50, 13, f)];
  add({
    topic: "Two cycles of different length", difficulty: 3, sequence: [0, 1, 2, 3, 4].map((i) => fig(fills[i % 3], xs[i % 2])),
    options: [
      [fig("white", 70), "Correct: white (period 3), on the right (period 2)."],
      [fig("white", 30), "Right colour, wrong side."],
      [fig("black", 70), "Restarts the colour cycle too early."],
      [fig("grey", 70), "Grey repeats the previous colour."],
      [fig("white", 50), "The circle only ever sits left or right."]
    ],
    hints: ["Colour: black, grey, white, black, grey…", "Position: left, right, left, right, left…"],
    explanation: "The colour cycles every three frames (next white) and the position alternates every two (next right)."
  });
}
{
  const n = [3, 4, 5];
  const fills = ["none", "black"];
  const fig = (k, f) => [poly(k, f)];
  add({
    topic: "Two cycles of different length", difficulty: 2, sequence: [0, 1, 2, 3, 4].map((i) => fig(n[i % 3], fills[i % 2])),
    options: [
      [fig(5, "black"), "Correct: pentagon, filled."],
      [fig(5, "none"), "Right shape, but the fill alternates."],
      [fig(3, "black"), "The shape cycle is triangle → square → pentagon."],
      [fig(6, "black"), "The sides do not keep increasing; they cycle."],
      [fig(4, "black"), "Square repeats the previous shape."]
    ],
    hints: ["Shapes: triangle, square, pentagon, triangle, square…", "Fill: empty, filled, empty, filled, empty…"],
    explanation: "The shape cycles every three frames (next pentagon) and the fill alternates (next filled)."
  });
}

/* ---------- K. size ---------- */
{
  const fills = ["white", "black"];
  const fig = (r, f) => [circle(50, 50, r, f)];
  add({
    topic: "Size + alternation", difficulty: 1, sequence: [10, 15, 20, 25, 30].map((r, i) => fig(r, fills[i % 2])),
    options: [
      [fig(35, "black"), "Correct: larger again and black."],
      [fig(35, "white"), "Right size, wrong colour."],
      [fig(30, "black"), "The circle must keep growing."],
      [fig(25, "black"), "Shrinks instead of growing."],
      [fig(40, "black"), "Grows two steps at once."]
    ],
    hints: ["Compare the circle sizes.", "Colour alternates white/black."],
    explanation: "The circle grows by the same amount each step and alternates white/black, so frame 6 is a larger black circle."
  });
}
{
  const fig = (s, inner) => [circle(50, 50, inner, "grey"), rect(50 - s, 50 - s, 2 * s, 2 * s, "none")];
  add({
    topic: "Size: opposite changes", difficulty: 2, sequence: [[38, 6], [33, 10], [28, 14], [23, 18], [18, 22]].map(([s, c]) => fig(s, c)),
    options: [
      [fig(13, 26), "Correct: the square keeps shrinking and the circle keeps growing (now the circle is bigger)."],
      [fig(13, 22), "The circle stopped growing."],
      [fig(18, 26), "The square stopped shrinking."],
      [fig(23, 26), "The square grew instead of shrinking."],
      [fig(13, 18), "The circle shrank instead of growing."]
    ],
    hints: ["Two elements change size in opposite directions.", "Keep both trends going for one more step."],
    explanation: "The square shrinks and the grey circle grows at a steady rate. In frame 6 the circle is larger than the square."
  });
}

/* ---------- L. quadrants ---------- */
{
  const ACW = ["TL", "BL", "BR", "TR"];
  const dots = ["white", null];
  add({
    topic: "Movement + alternation", difficulty: 2, sequence: [0, 1, 2, 3, 4].map((i) => quads([ACW[i % 4]], dots[i % 2])),
    options: [
      [quads(["BL"], null), "Correct: bottom-left, no dot."],
      [quads(["BL"], "white"), "Right quadrant, but the dot alternates."],
      [quads(["TR"], null), "This moves clockwise."],
      [quads(["TL"], null), "No movement."],
      [quads(["BR"], null), "Moved two quadrants."]
    ],
    hints: ["Which way does the shaded quadrant move around the square?", "The centre dot appears every other frame."],
    explanation: "The shaded quadrant moves anticlockwise (TL → BL → BR → TR → TL → BL) and the dot is present in odd frames only."
  });
}
{
  const pairs = [["TL", "BR"], ["TR", "BL"]];
  const fills = ["black", "grey", "white"];
  const fig = (p, f) => quads(p, f);
  add({
    topic: "Alternation + colour cycle", difficulty: 3, sequence: [0, 1, 2, 3, 4].map((i) => fig(pairs[i % 2], fills[i % 3])),
    options: [
      [fig(pairs[1], "white"), "Correct: top-right/bottom-left shaded, white dot."],
      [fig(pairs[0], "white"), "The diagonal alternates each step."],
      [fig(pairs[1], "black"), "Black restarts the colour cycle too early."],
      [fig(pairs[1], "grey"), "Grey repeats the previous colour."],
      [fig(["TL", "TR"], "white"), "Shaded quadrants are always diagonal pairs."]
    ],
    hints: ["The shaded diagonal flips every frame.", "The dot colour cycles black → grey → white."],
    explanation: "The shaded diagonal alternates (next TR/BL) and the dot colour cycles with period 3 (next white)."
  });
}
{
  const seqQ = [["TL"], ["TL", "TR"], ["TL", "TR", "BR"], ["TL", "TR", "BR", "BL"], ["TR", "BR", "BL"]];
  add({
    topic: "Filling and emptying", difficulty: 3, sequence: seqQ.map((q) => quads(q, null)),
    options: [
      [quads(["BR", "BL"], null), "Correct: quadrants empty in the same clockwise order they filled."],
      [quads(["TR", "BR"], null), "This empties the last-filled quadrant first."],
      [quads(["TR", "BR", "BL"], null), "No change."],
      [quads(["TL", "TR", "BR", "BL"], null), "Fills up again too early."],
      [quads(["BL"], null), "Two quadrants emptied at once."]
    ],
    hints: ["Frames 1–4 fill the square one quadrant at a time, clockwise.", "Frame 5 starts emptying. Which quadrant goes first, and which next?"],
    explanation: "Quadrants fill clockwise from top-left, then empty in the same order (TL first, then TR). Frame 6 keeps BR and BL."
  });
}

/* ---------- M. clock hand ---------- */
{
  add({
    topic: "Rotation", difficulty: 2, sequence: [0, 60, 120, 180, 240].map((a) => hand(a)),
    options: [
      [hand(300), "Correct: 60° further clockwise."],
      [hand(180), "This turns back the other way."],
      [hand(240), "No movement."],
      [hand(0), "Turned 120°."],
      [hand(330), "Turned only 90°."]
    ],
    hints: ["The hand moves like a clock.", "Measure the angle between consecutive positions."],
    explanation: "The hand turns 60° clockwise each step: 0°, 60°, 120°, 180°, 240° → 300°."
  });
}
{
  const fig = (a, inner) => [...hand(a, false), rect(16, 16, 68, 68, "none"), ...(inner ? [circle(50, 50, 12, "none")] : [])];
  add({
    topic: "Rotation + alternation", difficulty: 3, sequence: [270, 180, 90, 0, 270].map((a, i) => fig(a, i % 2 === 1)),
    options: [
      [fig(180, true), "Correct: 90° anticlockwise, inner ring present."],
      [fig(180, false), "Right angle, but the ring alternates."],
      [fig(0, true), "Turned clockwise."],
      [fig(270, true), "No movement."],
      [fig(90, true), "Turned 180°."]
    ],
    hints: ["The hand turns a quarter-turn each step. Which way?", "The inner ring appears in every other frame."],
    explanation: "The hand turns 90° anticlockwise each step (next pointing down) and the inner ring appears in even frames (frame 6 has it)."
  });
}

/* ---------- N. position alternation + count ---------- */
{
  const fig = (k, top) => [...many(k, "circle").map((c) => ({ ...c, y: c.y + 6, r: 7 })), rect(top ? 70 : 10, 4, 20, 8, "black")];
  add({
    topic: "Counting + position", difficulty: 2, sequence: [1, 2, 3, 4, 5].map((k, i) => fig(k, i % 2 === 1)),
    options: [
      [fig(6, true), "Correct: six circles, bar on the right."],
      [fig(6, false), "Right count, but the bar alternates sides."],
      [fig(5, true), "The count must rise to 6."],
      [fig(7, true), "One too many."],
      [fig(4, true), "Count goes backwards."]
    ],
    hints: ["Count the circles.", "The small bar alternates left/right."],
    explanation: "One circle is added each step (next 6) and the bar alternates left/right (next right)."
  });
}
{
  const side = [16, 84];
  const fig = (n, s) => [poly(n, "none", 0, 50, 54, 26), circle(side[s], 16, 7, "black")];
  add({
    topic: "Counting sides + position", difficulty: 2, sequence: [3, 4, 5, 6, 7].map((n, i) => fig(n, i % 2)),
    options: [
      [fig(8, 1), "Correct: 8 sides, dot top-right."],
      [fig(8, 0), "Right shape, wrong dot position."],
      [fig(7, 1), "Sides must rise to 8."],
      [fig(9, 1), "One side too many."],
      [fig(6, 1), "Sides go backwards."]
    ],
    hints: ["Count the sides of the central shape.", "The dot alternates corner."],
    explanation: "The polygon gains a side each step (next 8) and the dot alternates left/right (next right)."
  });
}

/* ---------- O. inside/outside swap ---------- */
{
  const outer = ["square", "circle", "triangle"];
  const fig = (o, dark) => [{ ...outline(o), fill: dark ? "black" : "none" }, circle(50, o === "triangle" ? 60 : 52, 10, dark ? "white" : "black")];
  add({
    topic: "Colour swap + shape cycle", difficulty: 3, sequence: [0, 1, 2, 3, 4].map((i) => fig(outer[i % 3], i % 2 === 1)),
    options: [
      [fig("triangle", true), "Correct: triangle, dark outside, light centre."],
      [fig("triangle", false), "Right shape, but the colours swap every frame."],
      [fig("square", true), "The outer shape cycles square → circle → triangle."],
      [fig("circle", true), "Circle repeats the previous shape."],
      [[{ ...outline("triangle"), fill: "black" }, circle(50, 60, 10, "black")], "The inner circle is always the opposite colour to the outer shape."]
    ],
    hints: ["Outer shapes: square, circle, triangle, square, circle…", "Inside and outside swap colours every frame."],
    explanation: "The outer shape cycles with period 3 (next triangle) and the colours swap each step (frame 6 is dark outside, light inside)."
  });
}
{
  const fig = (big, dark) => [poly(6, dark ? "grey" : "none", 0, 50, 50, big ? 38 : 22), poly(6, dark ? "none" : "grey", 0, 50, 50, big ? 22 : 12)];
  add({
    topic: "Two alternations", difficulty: 2, sequence: [0, 1, 2, 3, 4].map((i) => fig(i % 2 === 0, Math.floor(i / 2) % 2 === 1)),
    options: [
      [fig(false, false), "Correct: small pair, inner hexagon grey."],
      [fig(true, false), "The size alternates every frame, so frame 6 is small."],
      [fig(false, true), "The shading changes only every two frames; frame 6 keeps frame 5's shading."],
      [fig(true, true), "Both rules are off by one."],
      [[poly(6, "grey", 0, 50, 50, 22), poly(6, "grey", 0, 50, 50, 12)], "Only one hexagon is ever shaded."]
    ],
    hints: ["The size changes every frame.", "The shading pattern changes every two frames."],
    explanation: "Size alternates big/small each frame (frame 6 small). Shading flips every two frames (frames 1–2 inner grey, 3–4 outer grey, 5–6 inner grey)… check: frame 5 is inner grey, so frame 6 is inner grey too."
  });
}

/* ---------- P. spokes ---------- */
{
  const ang = (k) => Array.from({ length: k }, (_, i) => i * 45);
  add({
    topic: "Counting lines", difficulty: 1, sequence: [1, 2, 3, 4, 5].map((k) => spokes(ang(k))),
    options: [
      [spokes(ang(6)), "Correct: six spokes, added clockwise."],
      [spokes(ang(5)), "No change."],
      [spokes(ang(7)), "One spoke too many."],
      [spokes([0, 45, 90, 135, 180, 270]), "Six spokes, but the new one is in the wrong place."],
      [spokes(ang(4)), "Goes backwards."]
    ],
    hints: ["Count the spokes.", "Where is each new spoke added?"],
    explanation: "Each step adds one spoke, 45° clockwise from the last one, so frame 6 has six spokes from 0° to 225°."
  });
}
{
  const ang = (k, off) => Array.from({ length: k }, (_, i) => off + i * 90);
  add({
    topic: "Rotation + counting", difficulty: 3, sequence: [[1, 0], [2, 45], [3, 90], [4, 135], [1, 180]].map(([k, o]) => spokes(ang(k, o))),
    options: [
      [spokes(ang(2, 225)), "Correct: two spokes, rotated a further 45°."],
      [spokes(ang(2, 180)), "Right count, but the set did not rotate."],
      [spokes(ang(5, 225)), "Four is the maximum; the count restarts after it."],
      [spokes(ang(1, 225)), "The count must rise to 2."],
      [spokes(ang(2, 270)), "Rotated 90° instead of 45°."]
    ],
    hints: ["Count the spokes: 1, 2, 3, 4, then back to 1.", "The whole group also rotates 45° clockwise each step."],
    explanation: "The number of spokes cycles 1–4 (frame 6 has 2), and the group rotates 45° clockwise each step (frame 6 starts at 225°)."
  });
}

/* ---------- Q. arrow + dot ---------- */
{
  const fig = (a, c) => [box(), arrow(a, 50, 50, 18), circle(...CORNER[c], 7, "black")];
  const ACW = ["TL", "BL", "BR", "TR"];
  add({
    topic: "Two independent rules", difficulty: 3, sequence: [0, 1, 2, 3, 4].map((i) => fig(90 * i, ACW[i % 4])),
    options: [
      [fig(450, "BL"), "Correct: arrow right, dot bottom-left."],
      [fig(450, "TR"), "Right arrow, but the dot moved clockwise."],
      [fig(270, "BL"), "Right dot, but the arrow turned anticlockwise."],
      [fig(360, "BL"), "The arrow did not turn."],
      [fig(450, "TL"), "The dot did not move."]
    ],
    hints: ["The arrow and the dot follow separate rules.", "One turns clockwise, the other moves anticlockwise."],
    explanation: "The arrow turns 90° clockwise each step (next right) while the dot moves one corner anticlockwise (next bottom-left)."
  });
}
{
  const fig = (a, c) => [box(), arrow(a, 50, 50, 18, "grey"), circle(...CORNER[c], 7, "white")];
  const pos = ["TL", "BR", "TL", "BR", "TL"];
  add({
    topic: "Two independent rules", difficulty: 2, sequence: [0, 1, 2, 3, 4].map((i) => fig(-45 * i, pos[i])),
    options: [
      [fig(-225, "BR"), "Correct: arrow turned 45° anticlockwise again, dot bottom-right."],
      [fig(-225, "TL"), "The dot alternates diagonally."],
      [fig(-135, "BR"), "The arrow turned back."],
      [fig(-180, "BR"), "The arrow did not turn."],
      [fig(-270, "BR"), "Turned 90° instead of 45°."]
    ],
    hints: ["The dot jumps between opposite corners.", "The arrow turns 45° each step. Which way?"],
    explanation: "The dot alternates top-left/bottom-right (next bottom-right); the arrow turns 45° anticlockwise each step."
  });
}

/* ---------- R. two arrows ---------- */
{
  const fig = (a, b) => [arrow(a, 30, 50, 18), arrow(b, 70, 50, 18, "white")];
  add({
    topic: "Two rotating elements", difficulty: 3, sequence: [0, 1, 2, 3, 4].map((i) => fig(90 * i, -90 * i)),
    options: [
      [fig(450, -450), "Correct: black points right, white points left."],
      [fig(450, 450), "The white arrow turns anticlockwise."],
      [fig(-450, -450), "The black arrow turns clockwise."],
      [fig(360, -360), "Neither arrow turned."],
      [fig(540, -540), "Both turned twice."]
    ],
    hints: ["Treat the two arrows separately.", "They turn the same amount in opposite directions."],
    explanation: "The black arrow turns 90° clockwise and the white one 90° anticlockwise each step: next black right, white left."
  });
}
{
  const fig = (a, b) => [arrow(a, 50, 30, 15), arrow(b, 50, 70, 15, "grey")];
  add({
    topic: "Two rotating elements", difficulty: 3, sequence: [0, 1, 2, 3, 4].map((i) => fig(45 * i, 90 * i)),
    options: [
      [fig(225, 450), "Correct: top arrow +45°, bottom arrow +90°."],
      [fig(270, 450), "The top arrow turned 90°."],
      [fig(225, 405), "The bottom arrow turned 45°."],
      [fig(180, 360), "Neither arrow turned."],
      [fig(135, 270), "Both turned backwards."]
    ],
    hints: ["The two arrows turn at different speeds.", "Measure each arrow's step angle separately."],
    explanation: "Both arrows turn clockwise: the top one 45° per step, the bottom one 90° per step."
  });
}

/* ---------- S. accumulating grid ---------- */
{
  const fill = (cells) => cell(Object.fromEntries(cells.map((c) => [c, "black"])));
  const upto = (k) => Array.from({ length: k }, (_, i) => i);
  add({
    topic: "Accumulation", difficulty: 1, sequence: [1, 2, 3, 4, 5].map((k) => fill(upto(k))),
    options: [
      [fill(upto(6)), "Correct: one more cell, in reading order."],
      [fill([0, 1, 2, 3, 4, 6]), "Six cells, but the new one skips a place."],
      [fill(upto(5)), "No new cell."],
      [fill(upto(7)), "Two new cells."],
      [fill([1, 2, 3, 4, 5]), "A cell was removed from the start."]
    ],
    hints: ["Cells are only ever added, never removed.", "They fill in reading order: left to right, top to bottom."],
    explanation: "One cell is shaded per step in reading order, so frame 6 has the first six cells shaded."
  });
}

const two = items.find((q) => q.topic === "Two alternations");
two.explanation = "Two rules apply. The size alternates big/small every frame, so frame 6 is small. The shading changes every two frames: frames 1–2 have the inner hexagon grey, frames 3–4 the outer one, frames 5–6 the inner one again.";

/* ---------- output ---------- */
if (items.length !== 50) throw new Error("expected 50 items, got " + items.length);
const questions = items.map((q, i) => {
  const k = (i * 3) % 5;
  const opts = q.options.map((o, idx) => ({ o, idx }));
  const rotated = opts.slice(5 - k).concat(opts.slice(0, 5 - k));
  return {
    topic: q.topic, difficulty: q.difficulty,
    stem: "Which figure comes next in the series?",
    sequence: q.sequence,
    options: rotated.map((x) => x.o[0]),
    answer: rotated.findIndex((x) => x.idx === 0),
    hints: q.hints,
    optionNotes: rotated.map((x) => x.o[1]),
    explanation: q.explanation
  };
});
const fmtSet = (n, list) => {
  const id = String(n).padStart(2, "0");
  const set = { id: "abstract-" + id, section: "abstract", title: `Abstract Reasoning · Set ${n}`, description: "25 generated figure-series items; each wrong option breaks exactly one rule.", version: 1 };
  const qs = list.map((q, k) => ({ id: `a${id}-${String(k + 1).padStart(2, "0")}`, ...q }));
  const body = JSON.stringify({ ...set, questions: [] }, null, 2).replace('"questions": []', '"questions": [\n' +
    qs.map((q) => "    {\n" + Object.entries(q).map(([key, v]) =>
      key === "sequence" || key === "options"
        ? `      "${key}": [\n` + v.map((f) => "        " + JSON.stringify(f)).join(",\n") + "\n      ]"
        : `      "${key}": ${JSON.stringify(v)}`).join(",\n") + "\n    }").join(",\n") + "\n  ]");
  fs.writeFileSync(path.join(root, `questions/abstract/abstract-set-${id}.js`), "/* Generated by scripts/generators/abstract-sets-02-03.mjs. Edit the generator, not this file. */\nEPSO_BANK.registerSet(" + body + ");\n");
};
fmtSet(2, questions.slice(0, 25));
fmtSet(3, questions.slice(25));
const dist = [0, 0, 0, 0, 0];
questions.forEach((q) => dist[q.answer]++);
console.log("abstract: 50 questions, answer letters A–E:", dist.join("/"));
