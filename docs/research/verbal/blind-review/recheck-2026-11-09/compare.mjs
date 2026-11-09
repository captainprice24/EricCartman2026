/* global URL, console */
// Compare the 2026-11-09 blind re-check with the live bank: keys and distractor labels.
// usage: node docs/research/verbal/blind-review/recheck-2026-11-09/compare.mjs
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
const here = path.dirname(new URL(import.meta.url).pathname), dir = path.resolve(here, '../../../../../questions/verbal');
const sets = [];
for (const f of fs.readdirSync(dir).sort()) vm.runInNewContext(fs.readFileSync(path.join(dir, f), 'utf8'), { EPSO_BANK: { registerSet: (x) => sets.push(x) } });
const by = Object.fromEntries(sets.flatMap((s) => s.questions).map((q) => [q.id, q]));
const alias = { 'v03-06-c': 'v03-06-r2-c' }; // the batch-2 reviewer shortened this heading
let n = 0, keyOk = 0, labTot = 0, labOk = 0; const out = [];
for (let b = 1; b <= 7; b++) {
  const ans = JSON.parse(fs.readFileSync(path.join(here, `batch-${b}-answers.json`), 'utf8'));
  for (const [rawId, a] of Object.entries(ans)) {
    const id = alias[rawId] || rawId, q = by[id]; if (!q) { out.push(`${rawId}: unknown id`); continue; }
    n++; if (a.answer === 'ABCD'[q.answer]) keyOk++; else out.push(`${id}: key ${'ABCD'[q.answer]}, reviewer ${a.answer}`);
    q.optionNotes.forEach((note, i) => {
      if (i === q.answer) return; const L = 'ABCD'[i], mine = note.split('.')[0]; labTot++;
      if (a.labels?.[L] === mine) labOk++; else out.push(`${id} ${L}: bank ${mine}, reviewer ${a.labels?.[L]}`);
    });
  }
}
console.log(`${n} items: keys agree ${keyOk}/${n}; labels agree ${labOk}/${labTot}`);
out.forEach((x) => console.log(' ' + x));
