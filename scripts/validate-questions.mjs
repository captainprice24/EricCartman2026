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
  set.questions.forEach((q, qi) => {
    const where = `${w} › ${q && q.id ? q.id : "#" + qi}`;
    if (!q || !isStr(q.id)) return err(where, "id is required");
    if (qIds.has(q.id)) err(where, "duplicate question id (ids must be unique across all sets)");
    qIds.add(q.id);
    if (!Array.isArray(q.options)) return err(where, "options must be an array");
    const n = q.options.length;
    const want = set.section === "verbal" ? [4, 4] : [4, 5];
    if (n < want[0] || n > want[1]) err(where, `expected ${want[0] === want[1] ? want[0] : want.join("–")} options, found ${n}`);
    if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= n) err(where, "answer must be the 0-based index of the correct option");
    if (!isStr(q.explanation)) err(where, "explanation is required (shown after answering)");
    if (!Array.isArray(q.hints) || q.hints.length < 1 || !q.hints.every(isStr)) err(where, "hints must be an array of 1+ strings (used by Coach mode)");
    if (q.optionNotes !== undefined && (!Array.isArray(q.optionNotes) || q.optionNotes.length !== n || !q.optionNotes.every(isStr))) err(where, "optionNotes must have one non-empty string per option");
    if (q.optionNotes === undefined) err(where, "optionNotes are required: explain why each option is right or wrong");
    if (q.difficulty !== undefined && ![1, 2, 3].includes(q.difficulty)) err(where, "difficulty must be 1, 2 or 3");
    if (set.section !== "abstract") {
      if (!q.options.every(isStr)) err(where, "options must be non-empty strings");
      const uniq = new Set(q.options.map((o) => String(o).trim().toLowerCase()));
      if (uniq.size !== n) err(where, "options contain duplicates");
    }
    if (set.section === "verbal" && !isStr(q.passage)) err(where, "verbal questions need a passage");
    if (set.section === "numerical") {
      const ex = q.exhibit;
      if (!ex || !["table", "bar"].includes(ex.type)) err(where, "numerical questions need exhibit.type 'table' or 'bar'");
      else if (ex.type === "table") {
        if (!Array.isArray(ex.columns) || !Array.isArray(ex.rows) || !ex.rows.length) err(where, "table exhibit needs columns and rows");
        else ex.rows.forEach((r, ri) => { if (!Array.isArray(r) || r.length !== ex.columns.length) err(where, `table row ${ri} must have ${ex.columns.length} cells`); });
      } else {
        if (!Array.isArray(ex.categories) || !Array.isArray(ex.series) || !ex.series.length) err(where, "bar exhibit needs categories and series");
        else ex.series.forEach((s, si) => {
          if (!Array.isArray(s.values) || s.values.length !== ex.categories.length || !s.values.every((v) => typeof v === "number")) err(where, `series ${si} needs one number per category`);
        });
      }
      if (q.solution !== undefined && (!Array.isArray(q.solution) || !q.solution.every(isStr))) err(where, "solution must be an array of strings");
    }
    if (set.section === "abstract") {
      if (!Array.isArray(q.sequence) || q.sequence.length < 3 || q.sequence.length > 6) err(where, "sequence must contain 3–6 figures");
      else q.sequence.forEach((f, fi) => checkFigure(`${where} › sequence[${fi}]`, f));
      q.options.forEach((f, oi) => checkFigure(`${where} › options[${oi}]`, f));
      const sigs = new Set(q.options.map((f) => JSON.stringify(f)));
      if (sigs.size !== n) err(where, "two options are identical figures");
    }
    total++;
    counts[set.section]++;
    all.push({ where, section: set.section, q });
  });
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
  if (it.section === "verbal") once("pass:" + norm(q.passage), it, "identical passage");
  if (it.section === "numerical") {
    once("ex:" + JSON.stringify(q.exhibit && (q.exhibit.rows || q.exhibit.series)), it, "identical exhibit data");
  }
  if (it.section === "abstract") once("seq:" + JSON.stringify(q.sequence), it, "identical figure series");
}
const verbal = all.filter((it) => it.section === "verbal").map((it) => ({ ...it, sh: shingles(it.q.passage), kw: keywords(it.q.passage) }));
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
