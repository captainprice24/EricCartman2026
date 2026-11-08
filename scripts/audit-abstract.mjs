// Current inventory and review evidence. Editorial difficulty awaits first-exposure trials.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
import {abstractBlind} from './lib/blind.mjs';
import {abstractRubric} from './lib/abstract-difficulty.mjs';
import {abstractPath} from './lib/abstract-path.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const bank=[],box=vm.createContext({EPSO_BANK:{registerSet:s=>bank.push(s)}});
for(const file of fs.readdirSync(path.join(root,'questions/abstract')).sort())vm.runInContext(fs.readFileSync(path.join(root,'questions/abstract',file),'utf8'),box);
const baseline=JSON.parse(fs.readFileSync(path.join(root,'scripts/generators/abstract-transfer-baseline.json'))).items;
const before=new Map(baseline.map(q=>[q.id,q]));
const registry=JSON.parse(fs.readFileSync(path.join(root,'scripts/generators/abstract-transfer-revisions.json'))).revisions;
const bands=['','Easy','Medium','Hard'];
const items=bank.flatMap(set=>Array.from(set.questions,q=>({id:q.id,set:set.id,band:bands[q.difficulty],
 previousBand:before.has(q.supersedes)?bands[before.get(q.supersedes).difficulty]:before.has(q.id)?bands[q.difficulty]:'New pilot',
 challenge:!!q.challenge,topic:q.topic,relationships:q.rules,frames:q.sequence.length,model:q.reasoning.model,
 rationale:abstractRubric(q).reason,verification:q.reasoning.transfer?'Independent transfer geometry solver; rendered light/dark review.':'Independent foundation, patterned or challenge visible-geometry solver; rendered light/dark review.'})));
const totals=Object.fromEntries(bands.slice(1).map(b=>[b.toLowerCase(),items.filter(q=>q.band===b).length]));
const dir=path.join(root,'docs/research/abstract');
fs.writeFileSync(path.join(dir,'inventory.json'),JSON.stringify({method:'Shortest sufficient reasoning path and visible relationships; editorial, pending first-exposure learner calibration.',totals,byDifficulty:Object.fromEntries(bands.slice(1).map(b=>[b.toLowerCase(),items.filter(q=>q.band===b).map(q=>q.id)])),items},null,2)+'\n');
const cols=Object.keys(items[0]),csv=v=>'"'+String(v).replace(/"/g,'""')+'"';
fs.writeFileSync(path.join(dir,'inventory.csv'),[cols.map(csv).join(','),...items.map(q=>cols.map(c=>csv(q[c])).join(','))].join('\n')+'\n');
const paths=bank.flatMap(s=>Array.from(s.questions)).filter(q=>!q.challenge&&!q.reasoning.transfer).map(q=>({id:q.id,...abstractPath(q)}));
const evidence={reference:'Owner-supplied EU Training screenshot PDF, 8 November 2026; 15 pages visually compared, incomplete explanations explicitly distinguished from observations. Original content only.',baseCommit:'ccc0072',reviewed:300,totals,
 preservedStimuli:270,revisions:Object.values(registry).length,optionsRepaired:Object.values(registry).filter(r=>r.optionsChanged).length,
 difficultyChanges:Object.entries(registry).filter(([,r])=>r.beforeDifficulty!==r.difficulty).map(([before,r])=>({before,...r})),
 newFamilies:Object.fromEntries([...new Set(items.filter(q=>q.previousBand==='New pilot').map(q=>q.model))].map(model=>[model,items.filter(q=>q.model===model).length])),
 featurePaths:paths,verification:{independentFoundation:150,independentPatterned:50,independentChallenge:70,independentTransfer:30,themes:['light','dark'],limitations:'Bounded rule grammars, not universal uniqueness. Difficulty is editorial. No human first-exposure calibration or official equivalence claimed.'}};
fs.writeFileSync(path.join(root,'docs/audit/abstract-transfer-review.json'),JSON.stringify(evidence,null,2)+'\n');
const lines=['# Abstract bank audit','',`**${items.length} questions: ${totals.easy} Easy, ${totals.medium} Medium, ${totals.hard} Hard.** Editorial bands; first-exposure learner calibration pending.`,'',
 'The November commercial-sample follow-up preserves all 270 existing stimuli, gives 200 substantive revisions fresh IDs, strengthens all 50 patterned answer sets, and adds 30 original items across six families. See [ABSTRACT_TRANSFER_REVIEW.md](ABSTRACT_TRANSFER_REVIEW.md). The earlier [book review](ABSTRACT_BOOK_REVIEW.md) and its evidence remain historical records.','',
 'Foundation bands now follow the shortest sufficient feature subset, rather than all rules mentioned in the explanation. Familiar one/two-track elimination is Easy; a necessary nonuniform count phase remains Medium. Patterned grid/ring/row transformations are spatially composite tracks; each now requires multiple features, and the supporting cues alone leave at least two options. New identity and container tasks require previous-frame relationships; other pilot families are Medium.','',
 '| Set | Easy | Medium | Hard | Most central | Outlier | Element majority |','|---|---:|---:|---:|---:|---:|---:|'];
for(const set of bank){const counts=[1,2,3].map(d=>set.questions.filter(q=>q.difficulty===d).length),rates=['medoid','outlier','majority'].map(k=>(100*set.questions.reduce((n,q)=>n+abstractBlind(q.options,q.answer)[k],0)/set.questions.length).toFixed(1)+'%');lines.push(`| ${set.id} | ${counts.join(' | ')} | ${rates.join(' | ')} |`);}
lines.push('','## Coverage and verification','',
 '- Foundation: 150 visible-geometry predictions. Patterned: 50 independent grid/ring/conveyor predictions plus feature-subset checks. Challenge: 70 coupled/panel predictions plus checks against simpler independent rules. Transfer: 30 independent geometry predictions, semantic distractor checks and damaged-relation regressions.',
 '- New families: identity handoff, inside/outside inequalities, boundary continuation with irrelevant count, persistent irregular objects, reversible coverage, and conserved container transfers. Five original variants per family, interleaved in sets 17–19. These sets supplement practice; the fifteen fixed exam forms retain their prior membership through revision lineage.',
 '- All 300 items appear in reproducible contact sheets in light and dark themes. The irregular polygons distinguish reflection from rotation; boundary fragments reconnect at opposite edges; coverage reaches visible bounds. No commercial figures are registered.',
 '- All named option-only strategies stay at or below 30% per set. Geometry and feature checks do not prove resistance to every human shortcut or every invented finite-series rule.',
 '- Revision hashes preserve published content and original stimuli; rerunning the generator must reproduce current fingerprints. Historical book-review fixtures remain tested separately.',
 '', '## Refresh and learner calibration','',
 'Run `node scripts/generators/abstract.mjs`, `npm run audit:abstract`, the independent tests, and `node scripts/render-abstract-contact-sheets.mjs`. The complete audit includes per-item shortest-path diagnostics. Follow the first-exposure protocol in the transfer review before claiming measured AD-equivalent difficulty.');
fs.writeFileSync(path.join(root,'docs/ABSTRACT_AUDIT.md'),lines.join('\n')+'\n');
console.log('abstract',items.length,totals,'revised',evidence.revisions,'answer sets repaired',evidence.optionsRepaired,'difficulty corrections',evidence.difficultyChanges.length);
