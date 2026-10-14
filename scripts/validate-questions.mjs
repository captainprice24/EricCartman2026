#!/usr/bin/env node
// Validates every question set listed in questions/manifest.js.
// Usage: node scripts/validate-questions.mjs   (exit code 1 when a problem is found)
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const qdir = path.join(root, "questions");
const ctx = { window: {} };
ctx.window.window = ctx.window;
vm.createContext(ctx);
const run = (file) => vm.runInContext(`(function(window){var EPSO_BANK=window.EPSO_BANK;${fs.readFileSync(file, "utf8")}\n})(window);`, ctx, { filename: file });

run(path.join(qdir, "registry.js"));
run(path.join(qdir, "manifest.js"));
const files = ctx.window.EPSO_SET_FILES || [];
const errors = [];
const err = (where, msg) => errors.push(`${where}: ${msg}`);

const onDisk = [];
for (const sub of ["verbal", "numerical", "abstract"]) {
  const d = path.join(qdir, sub);
  if (fs.existsSync(d)) for (const f of fs.readdirSync(d)) if (f.endsWith(".js")) onDisk.push(`${sub}/${f}`);
}
for (const f of onDisk) if (!files.includes(f)) err(f, "file exists but is not listed in questions/manifest.js");

for (const f of files) {
  const p = path.join(qdir, f);
  if (!fs.existsSync(p)) { err(f, "listed in manifest but file not found"); continue; }
  const before = ctx.window.EPSO_BANK.sets.length;
  try { run(p); } catch (e) { err(f, "JavaScript error: " + e.message); continue; }
  if (ctx.window.EPSO_BANK.sets.length !== before + 1) err(f, "must call EPSO_BANK.registerSet(...) exactly once");
  else ctx.window.EPSO_BANK.sets[before]._file = f;
}

const SHAPES = new Set(["circle", "rect", "poly", "star", "arrow", "line"]);
const FILLS = new Set(["black", "grey", "white", "none", undefined]);
const isStr = (s) => typeof s === "string" && s.trim().length > 0;
// Item text may be a string or { en, fr, … }; checks run on the English text.
const en = (v) => (v && typeof v === "object" && !Array.isArray(v) ? v.en : v);
const EXHIBITS = ["table", "bar", "stacked", "line", "pie"];
const numberOf = (s) => {
  if (typeof s === "number") return s;
  const m = String(s).replace(/[−–]/g, "-").replace(/,/g, "").match(/-?\d+(\.\d+)?/);
  return m ? parseFloat(m[0]) : null;
};
const shingleList = (text, k) => {
  const w = String(text).toLowerCase().replace(/[^a-z0-9%€.]+/g, " ").trim().split(" ");
  const out = [];
  for (let i = 0; i + k <= w.length; i++) out.push(w.slice(i, i + k).join(" "));
  return out;
};
const checkFigure = (where, fig) => {
  if (!Array.isArray(fig) || fig.length === 0) return err(where, "figure must be a non-empty array of shapes");
  fig.forEach((s, i) => {
    if (!s || !SHAPES.has(s.t)) err(where, `shape ${i}: unknown type '${s && s.t}'`);
    else if (!FILLS.has(s.fill)) err(where, `shape ${i}: fill must be black|grey|white|none`);
    for (const k of ["x", "y", "r", "w", "h", "x1", "y1", "x2", "y2"]) {
      if (s && s[k] !== undefined && (typeof s[k] !== "number" || s[k] < -5 || s[k] > 105)) err(where, `shape ${i}: ${k} must be a number within the 0–100 canvas`);
    }
  });
};

const setIds = new Set(), qIds = new Set();
let total = 0;
const all = [];
const counts = { verbal: 0, numerical: 0, abstract: 0 };
for (const set of ctx.window.EPSO_BANK.sets) {
  const w = set._file || set.id;
  if (!isStr(set.id)) err(w, "set.id is required");
  if (setIds.has(set.id)) err(w, `duplicate set id '${set.id}'`);
  setIds.add(set.id);
  if (!["verbal", "numerical", "abstract"].includes(set.section)) { err(w, "set.section must be verbal|numerical|abstract"); continue; }
  if (set._file && !set._file.startsWith(set.section + "/")) err(w, `file should live in questions/${set.section}/`);
  if (!isStr(set.title)) err(w, "set.title is required");
  if (!Array.isArray(set.questions) || !set.questions.length) { err(w, "set.questions must be a non-empty array"); continue; }
  const setStats = { longest: 0, nearMean: 0, deepKeys: 0, n: 0 };
  set.questions.forEach((q, qi) => {
    const where = `${w} › ${q && q.id ? q.id : "#" + qi}`;
    if (!q || !isStr(q.id)) return err(where, "id is required");
    if (qIds.has(q.id)) err(where, "duplicate question id (ids must be unique across all sets)");
    qIds.add(q.id);
    if (!Array.isArray(q.options)) return err(where, "options must be an array");
    const n = q.options.length;
    const want = set.section === "verbal" ? 4 : 5;
    if (n !== want) err(where, `expected exactly ${want} options, found ${n}`);
    if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= n) err(where, "answer must be the 0-based index of the correct option");
    if (!isStr(en(q.explanation))) err(where, "explanation is required (shown after answering)");
    // Option order can change (formatter, shuffle), so explanations and hints must not cite option letters.
    [en(q.explanation), ...(q.hints || []).map(en)].forEach((t) => {
      if (isStr(t) && /(?:\boptions? [A-E]\b|(?:^|[\s(“"'])[B-E](?=[\s,.;:)])|(?:^|[\s(“"'])A (?:is|and|or|uses|turns|swaps|applies|takes|drops|stretches|treats|keeps|confuses|invents|starts|asserts|combines|ignores|reverses|contradicts|requires)\b)/.test(t)) err(where, `explanations and hints must not refer to options by letter: "${t.slice(0, 60)}…"`);
    });
    if (!Array.isArray(q.hints) || q.hints.length < 1 || !q.hints.map(en).every(isStr)) err(where, "hints must be an array of 1+ strings (used by Coach mode)");
    if (!Array.isArray(q.optionNotes) || q.optionNotes.length !== n || !q.optionNotes.map(en).every(isStr)) err(where, "optionNotes must have one non-empty string per option");
    if (![1, 2, 3].includes(q.difficulty)) err(where, "difficulty is required: 1, 2 or 3 (see docs/QUESTION_FORMAT.md, difficulty rubric)");
    if (set.section !== "abstract") {
      if (!q.options.map(en).every(isStr)) err(where, "options must be non-empty strings");
      const uniq = new Set(q.options.map((o) => String(en(o)).trim().toLowerCase()));
      if (uniq.size !== n) err(where, "options contain duplicates");
    }

    /* ---- verbal (E1, E2) ---- */
    if (set.section === "verbal") {
      const passage = en(q.passage);
      if (!isStr(passage)) err(where, "verbal questions need a passage");
      else {
        const words = passage.split(/\s+/).filter(Boolean).length;
        if (words < 170 || words > 260) err(where, `passage has ${words} words; it must have 170–260`);
      }
      const notes = (q.optionNotes || []).map(en);
      const kinds = notes.map((t, i) => (i === q.answer ? "key" : /^False\./.test(t) ? "false" : /^Not supported\./.test(t) ? "unsupported" : /^Overstated\./.test(t) ? "overstated" : "other"));
      if (notes[q.answer] && !/^Correct\./.test(notes[q.answer])) err(where, "the keyed option's note must start with 'Correct.'");
      kinds.forEach((k, i) => { if (k === "other") err(where, `distractor ${"ABCD"[i]} note must start with 'False.', 'Not supported.' or 'Overstated.'`); });
      if (kinds.filter((k) => k === "false").length > 1) err(where, "at most one distractor may be a flat contradiction ('False.')");
      if (!kinds.includes("unsupported")) err(where, "at least one distractor must be 'Not supported.' by the text");
      if (!kinds.includes("overstated")) err(where, "at least one distractor must be 'Overstated.' (partly true, over-generalised or over-reaching)");
      if (!["paraphrase", "combination", "inference"].includes(q.keyType)) err(where, "keyType is required: paraphrase | combination | inference");
      if (["combination", "inference"].includes(q.keyType)) setStats.deepKeys++;
      if (isStr(passage) && isStr(en(q.options[q.answer]))) {
        const pw = new Set(shingleList(passage, 7));
        if (shingleList(en(q.options[q.answer]), 7).some((x) => pw.has(x))) err(where, "the keyed option copies 7+ consecutive words from the passage; paraphrase it");
      }
      const lens = q.options.map((o) => String(en(o)).length);
      const max = Math.max(...lens), mean = lens.reduce((a, b) => a + b, 0) / lens.length;
      if (lens[q.answer] === max && lens.filter((l) => l === max).length === 1) setStats.longest++;
      if (Math.abs(lens[q.answer] - mean) <= 0.25 * mean) setStats.nearMean++;
      setStats.n++;
    }

    /* ---- numerical (E5) ---- */
    if (set.section === "numerical") {
      const exhibits = q.exhibits || (q.exhibit ? [q.exhibit] : []);
      if (!exhibits.length) err(where, "numerical questions need an exhibit (or exhibits)");
      let cells = 0;
      const shown = new Set();
      exhibits.forEach((ex, ei) => {
        const tag = exhibits.length > 1 ? ` (exhibit ${ei + 1})` : "";
        if (!ex || !EXHIBITS.includes(ex.type)) return err(where, `exhibit.type must be one of ${EXHIBITS.join(", ")}${tag}`);
        if (ex.type === "table") {
          if (!Array.isArray(ex.columns) || !Array.isArray(ex.rows) || !ex.rows.length) return err(where, "table exhibit needs columns and rows" + tag);
          ex.rows.forEach((r, ri) => {
            if (!Array.isArray(r) || r.length !== ex.columns.length) err(where, `table row ${ri} must have ${ex.columns.length} cells${tag}`);
            else r.slice(1).forEach((c) => shown.add(numberOf(c)));
          });
          cells += ex.rows.length * (ex.columns.length - 1);
        } else if (ex.type === "pie") {
          if (!Array.isArray(ex.slices) || ex.slices.length < 3 || !ex.slices.every((sl) => isStr(sl.label) && typeof sl.value === "number")) err(where, "pie exhibit needs 3+ slices { label, value }" + tag);
          else { cells += ex.slices.length; ex.slices.forEach((sl) => shown.add(sl.value)); }
        } else {
          if (!Array.isArray(ex.categories) || !Array.isArray(ex.series) || !ex.series.length) return err(where, `${ex.type} exhibit needs categories and series${tag}`);
          ex.series.forEach((sr, si) => {
            if (!Array.isArray(sr.values) || sr.values.length !== ex.categories.length || !sr.values.every((v) => typeof v === "number")) err(where, `series ${si} needs one number per category${tag}`);
            else sr.values.forEach((v) => shown.add(v));
          });
          cells += ex.categories.length * ex.series.length;
        }
      });
      if (cells < 12) err(where, `exhibits contain ${cells} data values; at least 12 are required`);
      if (!Array.isArray(q.solution) || !q.solution.map(en).every(isStr)) err(where, "solution (worked steps) is required");
      else if (q.difficulty >= 2 && q.solution.length < 2) err(where, "medium and harder items need at least 2 solution steps");
      const key = numberOf(en(q.options[q.answer]));
      if (key !== null) {
        q.options.forEach((o, i) => {
          if (i === q.answer) return;
          const v = numberOf(en(o));
          if (v === null) return err(where, `option ${"ABCDE"[i]} is not numeric while the key is`);
          const ratio = v / key;
          if (!(ratio >= 0.7 && ratio <= 1.4)) err(where, `option ${"ABCDE"[i]} (${en(o)}) is implausible: it must lie within 0.7–1.4 × the key`);
          if (shown.has(v)) err(where, `option ${"ABCDE"[i]} (${en(o)}) repeats a value shown in the exhibit`);
        });
        const nums = q.options.map((o) => numberOf(en(o)));
        if (nums.some((x, i) => i && x < nums[i - 1])) err(where, "numeric options must be in ascending order");
      }
    }

    /* ---- abstract (E6) ---- */
    if (set.section === "abstract") {
      if (!Array.isArray(q.sequence) || q.sequence.length < 3 || q.sequence.length > 6) err(where, "sequence must contain 3–6 figures");
      else {
        q.sequence.forEach((f, fi) => checkFigure(`${where} › sequence[${fi}]`, f));
        if (q.sequence.some((f) => Array.isArray(f) && f.length < 3)) err(where, "every frame needs at least 3 shapes");
      }
      q.options.forEach((f, oi) => checkFigure(`${where} › options[${oi}]`, f));
      const sigs = new Set(q.options.map((f) => JSON.stringify(f)));
      if (sigs.size !== n) err(where, "two options are identical figures");
      if (![2, 3, 4].includes(q.rules)) err(where, "rules (number of rules combined: 2–4) is required");
      else if (q.difficulty && q.difficulty !== q.rules - 1) err(where, `difficulty must be rules − 1 (${q.rules - 1}) for abstract items`);
      const shapeKey = (f) => JSON.stringify((f || []).map((sh) => { const c = { ...sh }; delete c.r; delete c.w; delete c.h; return c; }));
      q.options.forEach((f, oi) => {
        if (oi !== q.answer && shapeKey(f) === shapeKey(q.options[q.answer])) err(where, `option ${"ABCDE"[oi]} differs from the key only by size; use a rule-based difference`);
      });
    }
    total++;
    counts[set.section]++;
    all.push({ where, section: set.section, q });
  });
  if (set.section === "verbal" && setStats.n) {
    if (setStats.longest / setStats.n > 0.3) err(w, `the keyed option is the longest in ${setStats.longest}/${setStats.n} items; at most 30% allowed (E2)`);
    if (setStats.nearMean / setStats.n < 0.8) err(w, `the keyed option is within ±25% of the mean option length in only ${setStats.nearMean}/${setStats.n} items; at least 80% required`);
    if (setStats.deepKeys / setStats.n < 0.4) err(w, `only ${setStats.deepKeys}/${setStats.n} keys need combination or inference; at least 40% required`);
  }
}

// ---- duplicate detection across the whole bank ----
const warnings = [];
const norm = (s) => String(s).toLowerCase().replace(/[^a-z0-9%€.]+/g, " ").trim();
const STOP = new Set("the a an of and or to in on for by with is are was were be been it its this that these those as at from which who whom than then their there not no but can may must has have had also into such more most less only all any some each other per".split(" "));
const shingles = (text, k = 5) => {
  const w = norm(text).split(" ");
  const out = new Set();
  for (let i = 0; i + k <= w.length; i++) out.add(w.slice(i, i + k).join(" "));
  return out;
};
const keywords = (text) => new Set(norm(text).split(" ").filter((t) => t.length > 3 && !STOP.has(t) && !/^\d/.test(t)));
const jaccard = (a, b) => {
  if (!a.size || !b.size) return 0;
  let inter = 0;
  for (const x of a) if (b.has(x)) inter++;
  return inter / (a.size + b.size - inter);
};
const seen = new Map();
const once = (key, item, msg) => {
  if (seen.has(key)) err(item.where, `${msg} (duplicates ${seen.get(key)})`);
  else seen.set(key, item.q.id);
};
for (const it of all) {
  const q = it.q;
  once("opts:" + norm(q.stem || "") + JSON.stringify(q.options), it, "identical stem and options");
  if (it.section === "verbal") once("pass:" + norm(en(q.passage)), it, "identical passage");
  if (it.section === "numerical") {
    once("ex:" + JSON.stringify((q.exhibits || [q.exhibit]).map((ex) => ex && (ex.rows || ex.series || ex.slices))), it, "identical exhibit data");
  }
  if (it.section === "abstract") once("seq:" + JSON.stringify(q.sequence), it, "identical figure series");
}
const verbal = all.filter((it) => it.section === "verbal").map((it) => ({ ...it, sh: shingles(en(it.q.passage)), kw: keywords(en(it.q.passage)) }));
for (let i = 0; i < verbal.length; i++) {
  for (let j = i + 1; j < verbal.length; j++) {
    const textSim = jaccard(verbal[i].sh, verbal[j].sh);
    if (textSim >= 0.15) err(verbal[j].where, `passage is a near-duplicate of ${verbal[i].q.id} (${Math.round(textSim * 100)}% shared phrasing)`);
    const topicSim = jaccard(verbal[i].kw, verbal[j].kw);
    if (topicSim >= 0.3) warnings.push(`${verbal[j].q.id} covers a very similar subject to ${verbal[i].q.id} (${Math.round(topicSim * 100)}% shared keywords)`);
  }
}

if (warnings.length && process.argv.includes("--verbose")) console.warn("Similar subjects (review manually):\n" + warnings.map((w) => "  - " + w).join("\n"));
if (errors.length) {
  console.error(`✗ ${errors.length} problem(s) found:\n` + errors.map((e) => "  - " + e).join("\n"));
  process.exit(1);
}
console.log(`✓ ${ctx.window.EPSO_BANK.sets.length} sets, ${total} questions valid (verbal ${counts.verbal}, numerical ${counts.numerical}, abstract ${counts.abstract}).`);
