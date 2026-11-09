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
const baseline=JSON.parse(fs.readFileSync(path.join(root,'scripts/generators/abstract-no-easy-baseline.json'))).items;
const before=new Map(baseline.map(q=>[q.id,q]));
const registry=JSON.parse(fs.readFileSync(path.join(root,'scripts/generators/abstract-no-easy-revisions.json'))).revisions;
const bands=['','Easy','Medium','Hard'];
const items=bank.flatMap(set=>Array.from(set.questions,q=>({id:q.id,set:set.id,band:bands[q.difficulty],
 previousBand:bands[(before.get(q.supersedes)||before.get(q.id)).difficulty],
 challenge:!!q.challenge,topic:q.topic,relationships:q.rules,frames:q.sequence.length,model:q.reasoning.model,
 rationale:abstractRubric(q).reason,verification:q.reasoning.transfer?'Independent transfer geometry solver; rendered light/dark review.':'Independent foundation, patterned or challenge visible-geometry solver; rendered light/dark review.'})));
const totals=Object.fromEntries(bands.slice(1).map(b=>[b.toLowerCase(),items.filter(q=>q.band===b).length]));
const dir=path.join(root,'docs/research/abstract');
fs.writeFileSync(path.join(dir,'inventory.json'),JSON.stringify({method:'Shortest sufficient reasoning path and visible relationships; editorial, pending first-exposure learner calibration.',totals,byDifficulty:Object.fromEntries(bands.slice(1).map(b=>[b.toLowerCase(),items.filter(q=>q.band===b).map(q=>q.id)])),items},null,2)+'\n');
const cols=Object.keys(items[0]),csv=v=>'"'+String(v).replace(/"/g,'""')+'"';
fs.writeFileSync(path.join(dir,'inventory.csv'),[cols.map(csv).join(','),...items.map(q=>cols.map(c=>csv(q[c])).join(','))].join('\n')+'\n');
const all=bank.flatMap(s=>Array.from(s.questions));
const paths=all.filter(q=>!q.challenge&&!q.reasoning.transfer).map(q=>({id:q.id,...abstractPath(q)}));
const evidence={reference:'Original content using the previously reviewed abstract rule families; no commercial questions copied.',baseCommit:'6e38ebf',reviewed:300,totals,
 preservedQuestions:159,revisions:Object.values(registry).length,
 conversions:Object.entries(registry).map(([before,r])=>({before,...r})),
 models:Object.fromEntries([...new Set(items.map(q=>q.model))].map(model=>[model,items.filter(q=>q.model===model).length])),
 featurePaths:paths,verification:{independentFoundation:9,independentPatterned:121,independentChallenge:140,independentTransfer:30,themes:['light','dark'],limitations:'Bounded rule grammars, not universal uniqueness. Difficulty is editorial; no learner calibration or official equivalence claimed.'}};
fs.writeFileSync(path.join(root,'docs/audit/abstract-no-easy-review.json'),JSON.stringify(evidence,null,2)+'\n');
const lines=['# Abstract bank audit','',`**${items.length} questions: ${totals.easy} Easy, ${totals.medium} Medium, ${totals.hard} Hard.** Editorial bands; first-exposure learner calibration pending.`,'',
 'At the owner’s request, all 141 Easy abstract items were replaced under fresh IDs: 71 Medium and 70 Hard. The other 159 questions are unchanged. Verbal and numerical content is unchanged by this revision. See [ABSTRACT_NO_EASY_REVIEW.md](ABSTRACT_NO_EASY_REVIEW.md).','',
 'Medium replacements use alternating grid shifts, opposed conveyors and counter-rotating patterned regions. Their options require the main spatial transformation; no single visible feature selects the key. Hard replacements use necessary delayed, conditional or composed transformations. Simple independent orbit continuations are excluded, and supporting cycles cannot select the key.','',
 '| Set | Easy | Medium | Hard | Most central | Outlier | Element majority |','|---|---:|---:|---:|---:|---:|---:|'];
for(const set of bank){const counts=[1,2,3].map(d=>set.questions.filter(q=>q.difficulty===d).length),rates=['medoid','outlier','majority'].map(k=>(100*set.questions.reduce((n,q)=>n+abstractBlind(q.options,q.answer)[k],0)/set.questions.length).toFixed(1)+'%');lines.push(`| ${set.id} | ${counts.join(' | ')} | ${rates.join(' | ')} |`);}
lines.push('','## Coverage and verification','',
 '- Current solver coverage: 9 retained foundation items, 121 patterned items, 140 orbit/panel items and 30 transfer items. Each is solved from visible geometry without author labels or parameters. The historical 270-item transfer-review baseline remains tested separately.',
 '- All 141 replacements have different stimuli and alternatives from their retired Easy versions. Their new IDs preserve the fifteen fixed forms through revision lineage. Current fingerprints reject silent edits on regeneration.',
 '- All 300 items appear in reproducible light/dark contact sheets. Browser checks traverse all 150 items in Sets 01–04 at desktop and phone widths, including feedback and overflow, alongside existing challenge and transfer checks.',
 '- Medoid, outlier and element-majority guessing rates must stay at or below 30% per set. Single-feature and supporting-cue checks cover each replacement. These bounded checks do not prove resistance to every possible human shortcut.',
 '- The earlier [commercial-sample follow-up](ABSTRACT_TRANSFER_REVIEW.md) and [book review](ABSTRACT_BOOK_REVIEW.md) are historical records; their then-current difficulty totals are superseded here.',
 '', '## Refresh and calibration','',
 'Run `node scripts/generators/abstract.mjs`, `npm run audit:abstract`, the independent tests and `node scripts/render-abstract-contact-sheets.mjs`. Pilot first attempts at 60 seconds per question and record accuracy, time, confidence and the actual solving route. Keep repeat exposure separate before adjusting editorial levels.');
fs.writeFileSync(path.join(root,'docs/ABSTRACT_AUDIT.md'),lines.join('\n')+'\n');
console.log('abstract',items.length,totals,'upgraded',evidence.revisions);
