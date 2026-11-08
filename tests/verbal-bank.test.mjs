import fs from 'node:fs';import path from 'node:path';import vm from 'node:vm';import crypto from 'node:crypto';import {fileURLToPath} from 'node:url';import {test} from 'node:test';import assert from 'node:assert/strict';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');const box={window:{}};vm.createContext(box);const run=f=>vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),box);run('questions/registry.js');run('questions/manifest.js');box.EPSO_BANK=box.window.EPSO_BANK;box.window.EPSO_SET_FILES.filter(f=>f.startsWith('verbal/')).forEach(f=>run('questions/'+f));
const record=JSON.parse(fs.readFileSync(path.join(root,'docs/research/verbal/blind-review/review-mapping.json')));
const bookDir='docs/research/verbal/blind-review/book-2026-11';
const book=JSON.parse(fs.readFileSync(path.join(root,bookDir,'review-mapping.json')));
const bookAnswers=JSON.parse(fs.readFileSync(path.join(root,bookDir,'answers.json')));
const hash=s=>crypto.createHash('sha256').update(s).digest('hex');
const isMedium=s=>/^verbal-2[0-4]$/.test(s.id);

// Sets 01–19 were condensed to exam length in November 2026 (ids ending -c). Each condensed item must replace exactly
// one earlier, independently reviewed version (identified by its content hash in the book-review mapping), and must
// itself match a fresh blind review of the condensed text.
const compactDir='docs/research/verbal/blind-review/compact-2026-11';
const compact=JSON.parse(fs.readFileSync(path.join(root,compactDir,'final.json')));
const earlier=box.EPSO_BANK.sets.filter(s=>!isMedium(s));

test('historical review archives are intact: 100 challenge, 200 foundation and 300 book-review records',()=>{
 assert.equal(record.items.length,100);
 const legacy=JSON.parse(fs.readFileSync(path.join(root,'docs/research/verbal/blind-review/legacy/review-mapping.json'))).items;
 assert.equal(legacy.length,200);assert.equal(book.items.length,300);assert.equal(Object.keys(bookAnswers).length,300);
 for(const r of book.items){assert.ok(bookAnswers[r.id],r.id);assert.ok(fs.existsSync(path.join(root,bookDir,r.reviewFile)),r.reviewFile);}
});

test('every condensed item replaces one reviewed earlier version and keeps its original slot',()=>{
 const qs=earlier.flatMap(s=>s.questions);assert.equal(qs.length,300);assert.equal(compact.items.length,300);
 const replaced=new Set();
 for(const q of qs){
  assert.match(q.id,/-c$/,q.id);const r=compact.items.find(x=>x.id===q.id);assert.ok(r,q.id);
  const before=book.items.find(b=>b.id===r.replaces);assert.ok(before,q.id+' replaces '+r.replaces);
  assert.equal(r.replacesContentSha256,before.contentSha256,q.id+' replaced content is the reviewed version');
  assert.equal(q.supersedes,r.supersedes,q.id);assert.equal(q.id,q.supersedes+'-c',q.id+' id is its root plus -c');const base=x=>x.replace(/-r\d+$/,'');assert.equal(base(q.supersedes),base(r.replaces),q.id+' keeps the original id as its root');assert.equal(bookAnswers[r.replaces].answer,'ABCD'[q.answer],q.id+' same key as the reviewed version');
  assert.ok(!replaced.has(r.replaces));replaced.add(r.replaces);
 }
 assert.equal(earlier.filter(s=>s.challenge).length,10);
 for(const set of earlier.filter(s=>s.challenge)){const counts=[0,0,0,0];for(const q of set.questions){counts[q.answer]++;assert.equal(q.difficulty,3);assert.ok(q.reasoning.evidence.length>=3);}assert.ok(counts.every(n=>n>=2&&n<=3),set.id);}
});

test('all 300 condensed verbal texts match independent blind keys and reconciled labels at exam length',()=>{
 let labels=0;
 for(const q of earlier.flatMap(s=>s.questions)){
  const r=compact.items.find(x=>x.id===q.id);
  assert.equal(hash(q.passage),r.passageSha256,q.id+' passage changed after review');assert.equal(hash(JSON.stringify(q.options)),r.optionsSha256,q.id+' options changed after review');
  const review=JSON.parse(fs.readFileSync(path.join(root,compactDir,r.reviewFile)))[r.reviewSourceId||q.id];assert.ok(review,q.id);
  assert.equal(review.answer,'ABCD'[q.answer],q.id+' blind key');
  for(let j=0;j<4;j++)if(j!==q.answer){const L='ABCD'[j],label=q.optionNotes[j].split('.')[0];
   assert.equal(label,r.labels[L],q.id+' '+L);labels++;
   if(review.labels[L]!==label)assert.ok(r.reconciliation&&r.reconciliation[L],q.id+' '+L+' label disagreement must be reconciled');}
  const words=q.passage.split(/\s+/).length;assert.ok(words>=130&&words<=170,q.id+' exam-length passage ('+words+' words)');
  assert.ok(q.passage.split('\n\n').length<=2,q.id+' one or two paragraphs');assert.ok(q.options.every(o=>o.length<=100),q.id+' short options');
 }
 assert.equal(labels,900);
});

test('verbal coaching uses case-specific guidance and respects one-way implications',()=>{
 const qs=box.EPSO_BANK.sets.flatMap(s=>s.questions),allHints=qs.flatMap(q=>q.hints);
 assert.ok(allHints.every(h=>!h.includes('Trace the conditions in both directions')));
 assert.ok(allHints.every(h=>!h.includes('Identify the exact groups, conditions and dates in the passage.')));
 assert.equal(qs.filter(q=>q.solution?.length>=3).length,19);
 const meal=qs.find(q=>q.supersedes==='v18-08');assert.match(meal.passage,/both its ingredient source and lot changed/);
 assert.match(meal.explanation,/changed ingredient source/);
 const stock=qs.find(q=>q.supersedes==='v12-10');assert.match(stock.passage,/outside the pending-release group had passed quality release/);
});

test('the 50 medium verbal items match independent blind keys and reconciled labels',()=>{
 const dir=path.join(root,'docs/research/verbal/blind-review/medium-2026-11'),final=JSON.parse(fs.readFileSync(path.join(dir,'final.json')));
 const qs=box.EPSO_BANK.sets.filter(isMedium).flatMap(s=>s.questions);
 assert.equal(qs.length,50);assert.equal(final.items.length,50);
 for(const q of qs){
  const r=final.items.find(x=>x.id===q.id);assert.ok(r,q.id);
  assert.equal(hash(q.passage),r.passageSha256,q.id+' passage changed after review');assert.equal(hash(JSON.stringify(q.options)),r.optionsSha256,q.id+' options changed after review');
  const review=JSON.parse(fs.readFileSync(path.join(dir,r.reviewFile)))[q.id];
  assert.equal(review.answer,'ABCD'[q.answer],q.id+' blind key');assert.equal(r.answer,review.answer);
  for(let j=0;j<4;j++)if(j!==q.answer){const L='ABCD'[j],label=q.optionNotes[j].split('.')[0];
   assert.equal(label,r.labels[L],q.id+' '+L);
   if(review.labels[L]!==label)assert.ok(r.reconciliation&&r.reconciliation[L],q.id+' '+L+' disagreement must be reconciled');}
  assert.equal(q.difficulty,2);const words=q.passage.split(/\s+/).length;assert.ok(words>=130&&words<=170,q.id+' exam-length passage');
 }
});
