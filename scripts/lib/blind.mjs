// Blind solvers: strategies that answer without using the stimulus.
// If one of them beats chance clearly, the bank teaches a shortcut that will not work in the real test.
// Used by scripts/validate-questions.mjs (limits) and scripts/generators/abstract.mjs (distractor choice).

const en = (v) => (v && typeof v === "object" && !Array.isArray(v) ? v.en : v);

// Share of the solver's pick that lands on the key: 1 for a unique hit, 1/k when the key ties with k options.
export function share(scores, answer, mode) {
  const best = mode === "min" ? Math.min(...scores) : Math.max(...scores);
  const winners = scores.map((s, i) => (Math.abs(s - best) < 1e-9 ? i : -1)).filter((i) => i >= 0);
  return winners.includes(answer) ? 1 / winners.length : 0;
}

/* ---------- abstract ---------- */

const canon = (sh) => JSON.stringify(Object.keys(sh).sort().map((k) => [k, typeof sh[k] === "number" ? Math.round(sh[k] * 10) / 10 : sh[k]]));
export const elements = (fig) => {
  const m = new Map();
  (fig || []).forEach((s) => { const c = canon(s); m.set(c, (m.get(c) || 0) + 1); });
  return m;
};
export const figDistance = (a, b) => {
  let d = 0;
  for (const k of new Set([...a.keys(), ...b.keys()])) d += Math.abs((a.get(k) || 0) - (b.get(k) || 0));
  return d;
};

// medoid: the option closest to all others ("the consensus option").
// outlier: the option farthest from all others ("the odd one out").
// majority: per element, keep what most options show; pick the option closest to that consensus figure.
export function abstractBlind(options, answer) {
  const E = options.map(elements);
  const sums = E.map((a, i) => E.reduce((t, b, j) => t + (i === j ? 0 : figDistance(a, b)), 0));
  const votes = new Map();
  E.forEach((m) => m.forEach((_, k) => votes.set(k, (votes.get(k) || 0) + 1)));
  const consensus = new Map([...votes].filter(([, v]) => v >= Math.ceil(options.length / 2)).map(([k]) => [k, 1]));
  const toConsensus = E.map((m) => figDistance(new Map([...m].map(([k]) => [k, 1])), consensus));
  return { medoid: share(sums, answer, "min"), outlier: share(sums, answer, "max"), majority: share(toConsensus, answer, "min"), sums };
}

/* ---------- verbal ---------- */

export const HEDGE = /\b(may|might|can|could|likely|unlikely|probably|possibly|perhaps|generally|usually|typically|often|tends?|mainly|largely|partly|partially|some|in principle|not necessarily|appears?|seems?)\b/i;
export const ABSOLUTE = /\b(only|all|always|never|every|entirely|solely|exclusively|completely|wholly|none|invariably)\b/i;
const STOP = new Set("the a an of and or to in on for by with is are was were be been it its this that these those as at from which who whom than then their there not no but can may must has have had also into such more most less only all any some each other per they them would should will".split(" "));
const words = (t) => String(t).toLowerCase().replace(/[^a-z0-9%€]+/g, " ").trim().split(" ").filter((w) => w.length > 3 && !STOP.has(w));
const stem = (w) => w.replace(/(ing|ed|es|s|ly)$/, "");

export function verbalCues(q) {
  const opts = q.options.map((o) => String(en(o)));
  const passageWords = new Set(words(en(q.passage)).map(stem));
  const overlap = opts.map((o) => { const w = words(o).map(stem); return w.length ? w.filter((x) => passageWords.has(x)).length / w.length : 0; });
  const hedged = opts.map((o) => HEDGE.test(o));
  const absolute = opts.map((o) => ABSOLUTE.test(o));
  const lens = opts.map((o) => o.length);
  // Auditor's heuristic: prefer hedged, avoid absolute, break ties by the lowest overlap with the passage.
  const score = opts.map((_, i) => (hedged[i] ? 1 : 0) - (absolute[i] ? 1 : 0) - overlap[i] / 10);
  return {
    hedged, absolute,
    heuristic: share(score, q.answer, "max"),
    lowOverlap: share(overlap, q.answer, "min"),
    highOverlap: share(overlap, q.answer, "max"),
    shortest: share(lens, q.answer, "min"),
    longest: share(lens, q.answer, "max")
  };
}

// Per-set summary. Limits are enforced by the validator.
export const VERBAL_LIMITS = { heuristic: 0.35, lowOverlap: 0.4, highOverlap: 0.4, shortest: 0.35, hedgeGap: 0.1, absoluteGap: 0.1, pattern: 0.5 };
export function verbalSetStats(questions) {
  const n = questions.length;
  const s = { n, heuristic: 0, lowOverlap: 0, highOverlap: 0, shortest: 0, keyHedge: 0, disHedge: 0, keyAbs: 0, disAbs: 0, patterns: {} };
  questions.forEach((q) => {
    const c = verbalCues(q);
    s.heuristic += c.heuristic; s.lowOverlap += c.lowOverlap; s.highOverlap += c.highOverlap; s.shortest += c.shortest;
    c.hedged.forEach((h, i) => { if (i === q.answer) s.keyHedge += h; else s.disHedge += h; });
    c.absolute.forEach((h, i) => { if (i === q.answer) s.keyAbs += h; else s.disAbs += h; });
    const types = q.optionNotes.map((t, i) => (i === q.answer ? null : String(en(t)).split(".")[0])).filter(Boolean).sort().join("+");
    s.patterns[types] = (s.patterns[types] || 0) + 1;
  });
  const d = 3 * n;
  return {
    n,
    heuristic: s.heuristic / n, lowOverlap: s.lowOverlap / n, highOverlap: s.highOverlap / n, shortest: s.shortest / n,
    keyHedge: s.keyHedge / n, disHedge: s.disHedge / d, keyAbs: s.keyAbs / n, disAbs: s.disAbs / d,
    topPattern: Object.entries(s.patterns).sort((a, b) => b[1] - a[1])[0],
    patternShare: Math.max(...Object.values(s.patterns)) / n
  };
}
