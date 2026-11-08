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
const historical = JSON.parse(fs.readFileSync(path.join(root, 'scripts/generators/numerical-review-revisions.json'))).baseline;
const items = sets.flatMap(s => s.questions.map(q => ({
  id: q.id, set: s.id, level: levels[numericalDifficulty(q)], challenge: !!q.challenge, topic: q.topic,
  reasoningStages: numericalRubric(q).stages, rationale: numericalRubric(q).reason,
  workloadScore: numericalScore(q), euFormat: /-eu$/.test(q.id), replaces: /-eu$/.test(q.id) ? q.supersedes : '', oldMechanicalLevel: q.challenge || /^n1[2-6]-/.test(q.id) || /-eu$/.test(q.id) ? null : (historical[q.supersedes] || historical[q.id]).oldMechanicalLevel,
  fillerDistractors: q.optionNotes.filter(n => /not derived from a typical mistake/i.test(n)).length,
  chart: q.exhibits.some(e => e.type !== 'table'), physics: /speed|finish|catching/i.test(q.topic)
})));
const counts = qs => [1, 2, 3].map(d => qs.filter(q => q.difficulty === d).length);
const old = items.filter(q => !q.challenge && !q.euFormat && !/^n1[2-6]-/.test(q.id)), med12 = items.filter(q => /^n1[2-6]-/.test(q.id)), eu = items.filter(q => q.euFormat), groups = {};
items.forEach(q => { (groups[q.topic] ||= []).push(q); });
const inventory = { scope: 'Numerical only', method: 'Editorial structure audit; not calibrated from learner accuracy.', totals: Object.fromEntries(levels.slice(1).map(l => [l.toLowerCase(), items.filter(q => q.level === l).length])), byDifficulty: Object.fromEntries(levels.slice(1).map(l => [l.toLowerCase(), items.filter(q => q.level === l).map(q => q.id)])), items };
fs.writeFileSync(path.join(root, 'docs/research/numerical/inventory.json'), JSON.stringify(inventory, null, 2) + '\n');
const columns = Object.keys(items[0]), csv = v => '"' + String(v ?? '').replace(/"/g, '""') + '"';
fs.writeFileSync(path.join(root, 'docs/research/numerical/inventory.csv'), [columns.map(csv).join(','), ...items.slice().sort((a, b) => levels.indexOf(a.level) - levels.indexOf(b.level) || a.id.localeCompare(b.id)).map(q => columns.map(c => csv(q[c])).join(','))].join('\n') + '\n');
const lines = [
  '# Numerical question-bank audit', '',
  `Scope: numerical only. All ${items.length} items are inventoried and independently recalculated by tests/numerical-oracle.test.mjs.`, '',
  '## Finding and repair', '',
  'The former rubric counted written calculation lines, operation symbols, large exhibits and second exhibits. This rewarded long explanations and repeated sums. A large table with one direct percentage calculation could therefore receive a harder label than its reasoning justified. User feedback is qualitative; there are no collected first-attempt response data in this repository.', '',
  'The replacement rubric in `scripts/lib/difficulty.mjs` reviews each numerical topic by its shortest reasonable reasoning path. Easy items use one familiar calculation model; medium items combine a familiar model with weighting, conversion or successive adjustments; hard items reconstruct changing bases or solve linked reverse/constraint problems. Counting printed steps or irrelevant cells cannot promote an item. Unknown topics require a rubric entry. These are editorial bands, not psychometric estimates.', '',
  '| Bank | Easy | Medium | Hard | Total |', '|---|---:|---:|---:|---:|',
  `| Kept items of Sets 01–04, former mechanical labels | ${levels.slice(1).map(l => old.filter(q => q.oldMechanicalLevel === l).length).join(' | ')} | ${old.length} |`,
  `| Kept items of Sets 01–04, after review | ${levels.slice(1).map(l => old.filter(q => q.level === l).length).join(' | ')} | ${old.length} |`,
  `| Medium Sets 12–16 | 0 | ${med12.length} | 0 | ${med12.length} |`,
  `| EU Training-format replacements (November 2026) | 0 | ${eu.filter(q => q.level === 'Medium').length} | ${eu.filter(q => q.level === 'Hard').length} | ${eu.length} |`,
  `| Current bank | ${Object.values(inventory.totals).join(' | ')} | ${items.length} |`, '',
  `${old.filter(q => q.level !== q.oldMechanicalLevel).length} existing items changed difficulty. The later project repair regenerated all 150 foundation items with genuine mistake models under new revision IDs. \`scripts/generators/numerical-revisions.json\` records superseded IDs and immutable content hashes. Sets 09–11 add thirty items across ten further models. The later book-informed numerical review revises teaching and wording under fresh IDs; see docs/NUMERICAL_BOOK_REVIEW.md and scripts/generators/numerical-review-revisions.json.`, '',
  '## EU Training format (November 2026)', '',
  `Every Easy and Hard item in Sets 01–11 was replaced by an EU Training-format item with a new id ending \`-eu\` (generator: \`scripts/generators/numerical-eu.mjs\`). The ${eu.filter(q => q.level === 'Medium').length} Easy items became Medium two-step questions, and the ${eu.filter(q => q.level === 'Hard').length} Hard and very hard items became four-stage questions whose conditions sit in a note under the exhibit. The bank therefore has no Easy numerical items. Stems are at most 45 words; options are named mistakes at least 3% of the key apart, so no rounding instruction is needed; ${eu.filter(q => q.chart).length} of the new items use a chart (bars with a turnout line on a second scale, horizontal bars, stacked bars, pies and long line series), and ${eu.filter(q => q.physics).length} are physics questions on race times (speed, acceleration and catching up). Medium Sets 12–16 and the Medium items of Sets 01–04 are unchanged. Fingerprints: \`scripts/generators/numerical-eu-fingerprints.json\`.`, '',
  '## Sets', '', '| Set | Easy | Medium | Hard | Purpose |', '|---|---:|---:|---:|---|',
  ...sets.map(s => `| ${s.id} | ${counts(s.questions).join(' | ')} | ${s.challenge ? 'Very hard; 10 questions / 20-minute timed practice' : 'Mixed foundation and exam practice'} |`), '',
  'Choose Numerical difficulty in Coach or Practice. Select Set 5–11, 10 questions and timed practice for a complete challenge round. The selector applies only to numerical training; random simulations keep the unseen-first difficulty mix. The fixed full-test library assigns non-overlapping questions, with the new challenge content in tests 13–15.', '',
  '## Topic review', '', '| Topic | Items | Band | Reasoning rationale |', '|---|---:|---|---|',
  ...Object.entries(groups).sort((a, b) => levels.indexOf(a[1][0].level) - levels.indexOf(b[1][0].level) || a[0].localeCompare(b[0])).map(([topic, qs]) => `| ${topic} | ${qs.length} | ${qs[0].level}${qs[0].challenge ? ' (very hard challenge)' : ''} | ${qs[0].rationale} |`), '',
  '## Quality and remaining limits', '',
  '- Each challenge set has 10 different models, 2 keys in each answer position, 5 sorted numeric options and a mistake explanation for every distractor. Every challenge item supplies at least twelve data values in one or two exhibits and at least four dependent transformations. No generic filler distractors are allowed anywhere in the numerical bank.',
  `- ${old.filter(q => q.fillerDistractors).length} original items retain at least one generic filler distractor (${old.reduce((n, q) => n + q.fillerDistractors, 0)} fillers in all). The generator now rejects layouts without four usable, named mistakes and regenerates data instead of inventing filler values.`,
  '- The fourteen hard EU-format models have five or six variants each, spread so that no very hard set repeats a model. These items are not 82 unrelated reasoning structures. Previously practising a model can improve later-set performance.',
  '- The current validator checks schemas, exhibit uniqueness, options and numerical rubric consistency. Independent solvers check the displayed data and final rounding. Additional checks cover binding caps, feasible substitution, rate bounds and the whole-batch profit inequality.',
  '- The EU-format items were checked against twenty EU Training numerical samples supplied by the owner (question length, exhibit types, notes, physics); no sample question or data set was copied. No claim is made that these items reproduce official EPSO difficulty; the official sample website could not be inspected in this environment.', '',
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
