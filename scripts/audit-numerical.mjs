// Rebuild the numerical inventory and editorial audit; does not alter question data.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { numericalDifficulty, numericalRubric, numericalScore } from './lib/difficulty.mjs';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const box = { window: {} }; vm.createContext(box);
const run = file => vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), box);
run('questions/registry.js'); run('questions/manifest.js'); box.EPSO_BANK = box.window.EPSO_BANK;
box.window.EPSO_SET_FILES.filter(f => f.startsWith('numerical/')).forEach(f => run('questions/' + f));
const sets = box.EPSO_BANK.sets, levels = ['', 'Easy', 'Medium', 'Hard'];
const items = sets.flatMap(s => s.questions.map(q => ({
  id: q.id, set: s.id, level: levels[numericalDifficulty(q)], challenge: !!q.challenge, topic: q.topic,
  reasoningStages: numericalRubric(q).stages, rationale: numericalRubric(q).reason,
  workloadScore: numericalScore(q), oldMechanicalLevel: q.challenge ? null : levels[numericalScore(q) <= 2 ? 1 : numericalScore(q) <= 4 ? 2 : 3],
  fillerDistractors: q.optionNotes.filter(n => /not derived from a typical mistake/i.test(n)).length
})));
const counts = qs => [1, 2, 3].map(d => qs.filter(q => q.difficulty === d).length);
const old = items.filter(q => !q.challenge), groups = {};
items.forEach(q => { (groups[q.topic] ||= []).push(q); });
const inventory = { scope: 'Numerical only', method: 'Editorial structure audit; not calibrated from learner accuracy.', totals: Object.fromEntries(levels.slice(1).map(l => [l.toLowerCase(), items.filter(q => q.level === l).length])), byDifficulty: Object.fromEntries(levels.slice(1).map(l => [l.toLowerCase(), items.filter(q => q.level === l).map(q => q.id)])), items };
fs.writeFileSync(path.join(root, 'docs/research/numerical/inventory.json'), JSON.stringify(inventory, null, 2) + '\n');
const columns = Object.keys(items[0]), csv = v => '"' + String(v ?? '').replace(/"/g, '""') + '"';
fs.writeFileSync(path.join(root, 'docs/research/numerical/inventory.csv'), [columns.map(csv).join(','), ...items.slice().sort((a, b) => levels.indexOf(a.level) - levels.indexOf(b.level) || a.id.localeCompare(b.id)).map(q => columns.map(c => csv(q[c])).join(','))].join('\n') + '\n');
const lines = [
  '# Numerical question-bank audit', '',
  'Scope: numerical only. All 190 items are inventoried; all 190 answers are independently recalculated by `tests/numerical-oracle.test.mjs`. Verbal and abstract content and difficulty are unchanged.', '',
  '## Finding and repair', '',
  'The former rubric counted written calculation lines, operation symbols, large exhibits and second exhibits. This rewarded long explanations and repeated sums. A large table with one direct percentage calculation could therefore receive a harder label than its reasoning justified. User feedback is qualitative; there are no collected first-attempt response data in this repository.', '',
  'The replacement rubric in `scripts/lib/difficulty.mjs` reviews each numerical topic by its shortest reasonable reasoning path. Easy items use one familiar calculation model; medium items combine a familiar model with weighting, conversion or successive adjustments; hard items reconstruct changing bases or solve linked reverse/constraint problems. Counting printed steps or irrelevant cells cannot promote an item. Unknown topics require a rubric entry. These are editorial bands, not psychometric estimates.', '',
  '| Bank | Easy | Medium | Hard | Total |', '|---|---:|---:|---:|---:|',
  `| Original bank under former labels | ${levels.slice(1).map(l => old.filter(q => q.oldMechanicalLevel === l).length).join(' | ')} | ${old.length} |`,
  `| Original bank after review | ${levels.slice(1).map(l => old.filter(q => q.level === l).length).join(' | ')} | ${old.length} |`,
  `| New challenge sets | 0 | 0 | 40 | 40 |`,
  `| Current bank | ${Object.values(inventory.totals).join(' | ')} | ${items.length} |`, '',
  `${old.filter(q => q.level !== q.oldMechanicalLevel).length} existing items changed difficulty. The later project repair regenerated all 150 foundation items with genuine mistake models under new revision IDs. \`scripts/generators/numerical-revisions.json\` records superseded IDs and immutable content hashes. The forty challenge items are unchanged.`, '',
  '## Sets', '', '| Set | Easy | Medium | Hard | Purpose |', '|---|---:|---:|---:|---|',
  ...sets.map(s => `| ${s.id} | ${counts(s.questions).join(' | ')} | ${s.challenge ? 'Very hard; 10 questions / 20-minute timed practice' : 'Mixed foundation and exam practice'} |`), '',
  'Choose Numerical difficulty in Coach or Practice. Select Set 5, 6, 7 or 8, 10 questions and timed practice for a complete challenge round. The selector applies only to numerical training; exam simulations keep the existing unseen-first difficulty mix.', '',
  '## Topic review', '', '| Topic | Items | Band | Reasoning rationale |', '|---|---:|---|---|',
  ...Object.entries(groups).sort((a, b) => levels.indexOf(a[1][0].level) - levels.indexOf(b[1][0].level) || a[0].localeCompare(b[0])).map(([topic, qs]) => `| ${topic} | ${qs.length} | ${qs[0].level}${qs[0].challenge ? ' (very hard challenge)' : ''} | ${qs[0].rationale} |`), '',
  '## Quality and remaining limits', '',
  '- Each challenge set has 10 different models, 2 keys in each answer position, 5 sorted numeric options and a mistake explanation for every distractor. Every challenge item uses two exhibits and at least four dependent transformations. No generic filler distractors are allowed anywhere in the numerical bank.',
  `- ${old.filter(q => q.fillerDistractors).length} original items retain at least one generic filler distractor (${old.reduce((n, q) => n + q.fillerDistractors, 0)} fillers in all). The generator now rejects layouts without four usable, named mistakes and regenerates data instead of inventing filler values.`,
  '- Four parameter variants per challenge model create transfer practice but are not 40 unrelated reasoning structures. Previously practising a model can improve later-set performance.',
  '- The current validator checks schemas, exhibit uniqueness, options and numerical rubric consistency. Independent solvers check the displayed data and final rounding. Additional checks cover binding caps, feasible substitution, rate bounds and the whole-batch profit inequality.',
  '- Complexity is intentionally above the original numerical bank. No claim is made that these items reproduce official EPSO difficulty; the official sample website could not be inspected in this environment.', '',
  '## Calibration after release', '',
  'Pilot at exam pace (120 seconds per item) on first exposures. Record item ID, correctness, elapsed time, omission and prior exposure to the same model. Review ambiguity when strong candidates disagree; review easy-labelled items with unexpectedly low accuracy. Compare first-attempt accuracy and median correct-response time across bands before changing thresholds. Do not treat repeats or hinted Coach answers as difficulty evidence. Keep item IDs stable when changing a label; create a new ID for substantive question revisions.', '',
  '## Reusable files', '',
  '- `docs/research/numerical/inventory.csv`: item-level inventory sorted Easy → Medium → Hard, including old label, rationale and filler counts.',
  '- `docs/research/numerical/inventory.json`: machine-readable inventory and ID lists grouped by band.',
  '- `docs/research/numerical/README.md`: source assessments, rights decisions, reference examples and authoring checklist.',
  '- Refresh this audit with `npm run audit:numerical` after generation or rubric changes.', ''
];
fs.writeFileSync(path.join(root, 'docs/NUMERICAL_AUDIT.md'), lines.join('\n'));
console.log('Audited numerical items:', items.length, inventory.totals);
