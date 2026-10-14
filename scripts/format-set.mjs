#!/usr/bin/env node
// Rewrites a question set file in the canonical layout, optionally moving correct answers to target letters.
// Usage: node scripts/format-set.mjs questions/verbal/verbal-set-02.js [--letters ABCDABCD...]
// With --letters, question i's correct option is moved to that letter (options and optionNotes swap together).
import fs from "node:fs";
import vm from "node:vm";

const [file, flag, letters] = process.argv.slice(2);
const ctx = { window: {}, EPSO_BANK: { sets: [], registerSet(s) { this.sets.push(s); } } };
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(file, "utf8"), ctx);
const set = ctx.EPSO_BANK.sets[0];
const header = (fs.readFileSync(file, "utf8").match(/^(\/\*[\s\S]*?\*\/\n)/) || ["", ""])[1];

if (flag === "--letters") {
  set.questions.forEach((q, i) => {
    const want = "ABCDE".indexOf(letters[i % letters.length]);
    if (want < 0 || want >= q.options.length || want === q.answer) return;
    for (const key of ["options", "optionNotes"]) {
      const a = q[key];
      [a[want], a[q.answer]] = [a[q.answer], a[want]];
    }
    q.answer = want;
  });
}

const ident = (k) => (/^[A-Za-z_$][\w$]*$/.test(k) ? k : JSON.stringify(k));
function lit(v, ind) {
  const pad = "  ".repeat(ind), pad1 = "  ".repeat(ind + 1);
  if (Array.isArray(v)) {
    if (!v.length) return "[]";
    if (v.every((x) => typeof x !== "object" || x === null)) return "[\n" + v.map((x) => pad1 + JSON.stringify(x)).join(",\n") + "\n" + pad + "]";
    return "[\n" + v.map((x) => pad1 + (Array.isArray(x) || (x && typeof x === "object" && "t" in x) ? JSON.stringify(x) : lit(x, ind + 1))).join(",\n") + "\n" + pad + "]";
  }
  if (v && typeof v === "object") {
    return "{\n" + Object.entries(v).map(([k, x]) => {
      if (k === "passage" && typeof x === "string") return pad1 + "passage:\n" + pad1 + "  " + JSON.stringify(x);
      return pad1 + ident(k) + ": " + lit(x, ind + 1);
    }).join(",\n") + "\n" + pad + "}";
  }
  return JSON.stringify(v);
}
fs.writeFileSync(file, header + "EPSO_BANK.registerSet(" + lit(set, 0) + ");\n");
const dist = {};
set.questions.forEach((q) => { const l = "ABCDE"[q.answer]; dist[l] = (dist[l] || 0) + 1; });
console.log(file, "answer letters:", JSON.stringify(dist));
