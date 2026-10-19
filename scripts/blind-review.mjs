#!/usr/bin/env node
// Blind review of verbal items (N12). A second reviewer answers each item without seeing the key or notes.
//   node scripts/blind-review.mjs export questions/verbal/verbal-set-04.js > review.md
//       Prints passages and options only. Give this file, and nothing else, to the reviewer.
//   node scripts/blind-review.mjs compare questions/verbal/verbal-set-04.js answers.json
//       answers.json: { "v04-01": { "answer": "C", "labels": { "A": "False", "B": "Overstated", "D": "Not supported" } }, … }
//       Lists every item where the reviewer's answer or a distractor label differs from the author's.
import fs from "node:fs";
import vm from "node:vm";

const [mode, file, answersFile] = process.argv.slice(2);
if (!["export", "compare"].includes(mode) || !file) {
  console.error("usage: blind-review.mjs export <set.js> | compare <set.js> <answers.json>");
  process.exit(2);
}
const ctx = { window: { EPSO_BANK: { sets: [], registerSet(s) { this.sets.push(s); } } } };
vm.createContext(ctx);
vm.runInContext(`var EPSO_BANK=window.EPSO_BANK;${fs.readFileSync(file, "utf8")}`, ctx);
const set = ctx.window.EPSO_BANK.sets[0];
const en = (v) => (v && typeof v === "object" ? v.en : v);
const L = "ABCDE";

if (mode === "export") {
  console.log(`# Blind review: ${set.id}\n\nFor each item, choose the one statement the text supports. Label every other option False (the text contradicts it), Not supported (the text does not say it) or Overstated (stronger than the text). Use only the text.\n`);
  set.questions.forEach((q) => {
    console.log(`## ${q.id}\n\n${en(q.passage)}\n\n${en(q.stem)}\n`);
    q.options.forEach((o, i) => console.log(`${L[i]}. ${en(o)}`));
    console.log("");
  });
} else {
  const answers = JSON.parse(fs.readFileSync(answersFile, "utf8"));
  let keyAgree = 0, labelAgree = 0, labels = 0;
  const issues = [];
  set.questions.forEach((q) => {
    const a = answers[q.id];
    if (!a) return issues.push(`${q.id}: no reviewer answer`);
    if (a.answer === L[q.answer]) keyAgree++;
    else issues.push(`${q.id}: reviewer chose ${a.answer}, key is ${L[q.answer]}`);
    q.optionNotes.forEach((t, i) => {
      if (i === q.answer) return;
      const mine = String(en(t)).split(".")[0], theirs = (a.labels || {})[L[i]];
      labels++;
      if (theirs && theirs.toLowerCase() === mine.toLowerCase()) labelAgree++;
      else issues.push(`${q.id} ${L[i]}: reviewer label '${theirs || "none"}', author label '${mine}'`);
    });
  });
  console.log(`${set.id}: key agreement ${keyAgree}/${set.questions.length}, distractor label agreement ${labelAgree}/${labels}`);
  issues.forEach((x) => console.log("  - " + x));
  process.exit(keyAgree === set.questions.length && labelAgree === labels ? 0 : 1);
}
