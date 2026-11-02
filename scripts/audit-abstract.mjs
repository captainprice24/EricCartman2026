// Complete structural inventory and reviewed editorial bands; no empirical difficulty claim.
import fs from 'node:fs';
import crypto from 'node:crypto';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { abstractBlind } from './lib/blind.mjs';
import { abstractRubric } from './lib/abstract-difficulty.mjs';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const bank = [], box = vm.createContext({ EPSO_BANK: { registerSet: s => bank.push(s) } });
for (const file of fs.readdirSync(path.join(root, 'questions/abstract')).sort()) vm.runInContext(fs.readFileSync(path.join(root, 'questions/abstract', file), 'utf8'), box);
const registry=JSON.parse(fs.readFileSync(path.join(root,'scripts/generators/abstract-review-revisions.json')));
const bands = ['', 'Easy', 'Medium', 'Hard'];
const items = bank.flatMap(set => Array.from(set.questions, q => ({
  id: q.id, set: set.id, band: bands[q.difficulty], previousBand: bands[registry.baseline[q.supersedes].difficulty],
  challenge: !!q.challenge, topic: q.topic, relationships: q.rules, frames: q.sequence.length,
  model: q.reasoning?.model || 'independent-foundation', rationale: abstractRubric(q).reason,
  verification: 'Independent visible-figure bounded-grammar solver; full light/dark contact sheets.'
})));
const totals = Object.fromEntries(bands.slice(1).map(b => [b.toLowerCase(), items.filter(q => q.band === b).length]));
const dir = path.join(root, 'docs/research/abstract'); fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, 'inventory.json'), JSON.stringify({ method: 'Reviewed reasoning rubric; editorial pending learner calibration.', totals,
  byDifficulty: Object.fromEntries(bands.slice(1).map(b => [b.toLowerCase(), items.filter(q => q.band === b).map(q => q.id)])), items }, null, 2) + '\n');
const columns = Object.keys(items[0]), csv = v => '"' + String(v).replace(/"/g, '""') + '"';
fs.writeFileSync(path.join(dir, 'inventory.csv'), [columns.map(csv).join(','), ...items.slice().sort((a, b) => bands.indexOf(a.band) - bands.indexOf(b.band) || a.id.localeCompare(b.id)).map(q => columns.map(c => csv(q[c])).join(','))].join('\n') + '\n');
const hash=value=>crypto.createHash('sha256').update(JSON.stringify(value)).digest('hex');
const changes=bank.flatMap(set=>Array.from(set.questions,q=>{const before=registry.baseline[q.supersedes];return {id:q.id,previousId:q.supersedes,sequenceChanged:hash(q.sequence)!==before.sequenceSha256,optionsChanged:hash(q.options)!==before.optionsSha256,previousDifficulty:before.difficulty,difficulty:q.difficulty};}));
const evidence={reference:'How to succeed in EPSO abstract reasoning tests (Burkett and Franco Reverte, 2021), user-supplied EPUB; methods only, no copied questions or figures.',
 method:'Independently decode visible geometry; enumerate bounded feature cycles/steps and coupled/panel grammar; reject conflicting simple continuations; inspect rendered contact sheets. No learner difficulty calibration.',
 totals,reviewed:items.length,revisedIds:Object.keys(registry.revisions).length,geometryChanges:changes.filter(q=>q.sequenceChanged||q.optionsChanged),difficultyChanges:changes.filter(q=>q.previousDifficulty!==q.difficulty),
 findings:{ambiguousFoundation:['a01-03','a02-18','a03-23','a03-43','a03-48','a04-08','a04-23'],competingChallenge:['a07-04','a08-05','a11-04'],sixthFrameTreatment:'All eight every-third-frame front-layer series now show six observations; seven previously had conflicting short-cycle continuations.',palette:'Figure tiles preserve black/grey/white in both themes; prior dark-mode inversion conflicted with colour names.',teaching:'All 220 have concrete predictions, feature-by-feature worked solutions and reviewed hints. Coach has three original examples, including rendered figures.'},
 verification:{independentFoundation:150,independentChallenge:70,contactSheetItems:220,themes:['light','dark'],limits:'Bounded grammar uniqueness is not universal mathematical uniqueness. Editorial bands await unseen-item learner trials.'}};
fs.writeFileSync(path.join(root,'docs/audit/abstract-book-review.json'),JSON.stringify(evidence,null,2)+'\n');
const lines=['# Abstract bank audit','',`All **${items.length} items** reviewed: **${totals.easy} Easy, ${totals.medium} Medium, ${totals.hard} Hard**.`,'',
 'The November book-informed review supersedes the earlier structural-only foundation screen. All 150 foundation answers and all 70 challenge answers now have independent visible-figure inference coverage. See [ABSTRACT_BOOK_REVIEW.md](ABSTRACT_BOOK_REVIEW.md) for defects, repairs and limits.','',
 'Difficulty follows the simplest supported path: two familiar independent tracks are Easy; additional independent tracks and phase tracking are Medium; necessary coupled, delayed, conditional and compositional transformations are Hard. Ten challenge items admit simpler independent continuations and are now Medium. Four relationships alone do not establish Hard difficulty.','',
 '| Set | Easy | Medium | Hard | Most central | Outlier | Element majority |','|---|---:|---:|---:|---:|---:|---:|'];
for(const set of bank){const counts=[1,2,3].map(d=>set.questions.filter(q=>q.difficulty===d).length);const shortcuts=['medoid','outlier','majority'].map(k=>(100*set.questions.reduce((sum,q)=>sum+abstractBlind(q.options,q.answer)[k],0)/set.questions.length).toFixed(1)+'%');lines.push(`| ${set.id} | ${counts.join(' | ')} | ${shortcuts.join(' | ')} |`);}
lines.push('','## Verification and limits','',
 '- Independent code reads visible shape coordinates, fills, counts and drawing order, not generator states, keys or explanations. Foundation inference enumerates short cycles, modular steps and count alternations. Challenge inference enumerates alternating, accelerating, interleaved, gated, reflected and delayed relationships, panel rotation and Boolean composition. A separate check rejects conflicting simpler position/arrow continuations. Each current item has exactly one matching option within these checked grammars.',
 '- Regression fixtures preserve the seven ambiguous foundation series and three conflicting challenge series. Revised content has fresh IDs and hash-locked mappings. Per-item random streams preserve unrelated figures; fixed full-test membership is maintained through previous IDs.',
 '- All 220 series and choices appear in reproducible contact sheets in both themes. Exact raster equality checks complement visual inspection. These checks do not establish resistance to every possible perceptual shortcut.',
 '- All seven challenge rounds retain two keys per answer position and ten model families. Each feature alone leaves several options, and supporting tracks cannot select the answer alone. Named option-only heuristics remain at or below 30% per set.',
 '- These are editorial bands, not empirical difficulty or score-uplift findings. A finite series can support other invented rules; solver coverage is bounded, not proof of universal uniqueness. Variants create transfer effects.','',
 '## Practice and refresh','',
 'Select All levels, a challenge set, ten questions and timed practice for a complete ten-minute round. Hard filters exclude reviewed Medium items. The fifteen fixed forms retain their original membership, with revised IDs substituted.','',
 'Pilot unseen items at sixty seconds per question; separate first attempts from hints, repeats and exposure to related variants. Refresh with `npm run audit:abstract`; regenerate with `node scripts/generators/abstract.mjs` and review contact sheets. No third-party questions or figures are registered in the app.');
fs.writeFileSync(path.join(root,'docs/ABSTRACT_AUDIT.md'),lines.join('\n')+'\n');
console.log('abstract',items.length,totals,'geometry repairs:',evidence.geometryChanges.length,'difficulty corrections:',evidence.difficultyChanges.length);
