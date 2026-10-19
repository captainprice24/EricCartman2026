// Complete structural inventory and reviewed editorial bands; no empirical difficulty claim.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { abstractBlind } from './lib/blind.mjs';
import { abstractRubric } from './lib/abstract-difficulty.mjs';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const bank = [], box = vm.createContext({ EPSO_BANK: { registerSet: s => bank.push(s) } });
for (const file of fs.readdirSync(path.join(root, 'questions/abstract')).sort()) vm.runInContext(fs.readFileSync(path.join(root, 'questions/abstract', file), 'utf8'), box);
const bands = ['', 'Easy', 'Medium', 'Hard'];
const items = bank.flatMap(set => Array.from(set.questions, q => ({
  id: q.id, set: set.id, band: bands[q.difficulty], previousBand: q.challenge ? '' : bands[q.rules - 1],
  challenge: !!q.challenge, topic: q.topic, relationships: q.rules, frames: q.sequence.length,
  model: q.reasoning?.model || 'independent-foundation', rationale: abstractRubric(q).reason,
  verification: q.challenge ? 'Independent visible-figure bounded-grammar solver; visual contact-sheet review.' : 'Structural audit and sample visual review; no new full semantic re-solve.'
})));
const totals = Object.fromEntries(bands.slice(1).map(b => [b.toLowerCase(), items.filter(q => q.band === b).length]));
const changed = items.filter(q => q.previousBand && q.previousBand !== q.band);
const dir = path.join(root, 'docs/research/abstract'); fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, 'inventory.json'), JSON.stringify({ method: 'Reviewed reasoning rubric; editorial pending learner calibration.', totals,
  byDifficulty: Object.fromEntries(bands.slice(1).map(b => [b.toLowerCase(), items.filter(q => q.band === b).map(q => q.id)])), items }, null, 2) + '\n');
const columns = Object.keys(items[0]), csv = v => '"' + String(v).replace(/"/g, '""') + '"';
fs.writeFileSync(path.join(dir, 'inventory.csv'), [columns.map(csv).join(','), ...items.slice().sort((a, b) => bands.indexOf(a.band) - bands.indexOf(b.band) || a.id.localeCompare(b.id)).map(q => columns.map(c => csv(q[c])).join(','))].join('\n') + '\n');
const lines = ['# Abstract bank audit', '', `All **${items.length} items** inventoried: **${totals.easy} Easy, ${totals.medium} Medium, ${totals.hard} Hard**.`, '',
 '## Reasoning review', '',
 'The old labels were mechanically rules minus one: 38 Easy, 75 Medium and 37 Hard. Counting four independent rotations/cycles does not demonstrate difficult inference. The reviewed rubric uses Easy for two familiar independent tracks; Medium for three/four independent tracks or a nonuniform count/boundary phase; Hard for the new coupled, conditional, interleaved or compositional collection. The legacy phase screen uses reviewed generator wording, not general-purpose text scoring. New topics/models require editorial review.', '',
 `${changed.length} foundation difficulty labels changed; all 150 existing IDs, stimuli, options, keys, hints and explanations are preserved. The forty new questions are four ten-question rounds (Sets 5–8), each with the same ten model families but different states. This is forty variants across ten families, not forty unrelated reasoning designs.`, '',
 'These are editorial bands. No human difficulty study or score uplift has been measured. The new collection combines two substantial relational rules with two supporting cycles, or rotating panels with a composition rule. Familiarity with a family will make its later variants easier.', '',
 '| Set | Easy | Medium | Hard | Most central | Outlier | Element majority |', '|---|---:|---:|---:|---:|---:|---:|'];
for (const set of bank) {
 const counts = [1, 2, 3].map(d => set.questions.filter(q => q.difficulty === d).length);
 const shortcuts = ['medoid', 'outlier', 'majority'].map(k => (100 * set.questions.reduce((sum, q) => sum + abstractBlind(q.options, q.answer)[k], 0) / set.questions.length).toFixed(1) + '%');
 lines.push(`| ${set.id} | ${counts.join(' | ')} | ${shortcuts.join(' | ')} |`);
}
lines.push('', '## Verification and limits', '',
 '- All 190 items pass schema, distinct options, series uniqueness and the existing size-only distractor check. Every set stays below the 30% ceilings for three option-only strategies; chance is 20%. These checks cover named heuristics, not every possible shortcut.',
 '- All forty new keys are inferred from visible circle/arrow/cell coordinates and fills by separate code in `tests/abstract-oracle.test.mjs`. It receives no generator parameters or author model labels. The solver fits alternating, accelerating, interleaved, gated, reflected and delayed rules or grid rotations/Boolean combinations. Each six-frame stimulus has one continuation in that bounded grammar and exactly one matching option. This is stronger than checking stored states but is not proof against every conceivable alternative rule.',
 '- Each challenge set has two keys per answer position, ten model families, no repeated stimulus, and single-/double-feature distractor errors. Every feature agrees with the key in at least one distractor, so no single feature alone identifies the key. All four features are tested in the choices. Colour plus dot count cannot select an orbit key; both input grids plus the bottom arrow cannot select a panel key. A harder relation is needed. No challenge key simply repeats a complete displayed frame.',
 '- All forty new series and options are included in reproducible light/dark contact sheets; sample legacy figures cover all five old layouts. Rendering and answer feedback are tested on desktop and phone widths. See `VISUAL_REVIEW.md` for observations.',
 '- The existing 150 questions received structural inventory, heuristic screening and sample visual review, not a fresh item-by-item human semantic review. Their original generators still use fixed steps, cycles and occasional count/boundary phases.', '',
 '## Organisation and reuse', '',
 'Use Abstract difficulty: Easy / Medium / Hard in Coach and Practice. For a complete challenge round select Set 5–8, ten questions and timed practice (ten minutes). Exam simulations retain their existing unseen-first mixed-difficulty policy. CSV and JSON inventories list every item, its band and the reason.', '',
 'The research library separates method references, unresolved paths, blocked websites and licensed author-study examples. No third-party figures or questions are registered in the app.', '',
 '## Calibration', '',
 'Pilot unseen items at sixty seconds per question. Record first-attempt correctness, time and omissions separately from hints, repeated items and exposure to another variant of the same model. Investigate competing explanations before changing bands. Prefer novel relationships and plausible errors over extra clutter.', '',
 'Refresh with `npm run audit:abstract`; regenerate through `node scripts/generators/abstract.mjs`.');
fs.writeFileSync(path.join(root, 'docs/ABSTRACT_AUDIT.md'), lines.join('\n') + '\n');
console.log('abstract', items.length, totals, 'changed foundation labels:', changed.length);
