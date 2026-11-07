import fs from 'node:fs';import path from 'node:path';import vm from 'node:vm';import crypto from 'node:crypto';import {fileURLToPath} from 'node:url';import {test} from 'node:test';import assert from 'node:assert/strict';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');const box={window:{}};vm.createContext(box);const run=f=>vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),box);run('questions/registry.js');run('questions/manifest.js');box.EPSO_BANK=box.window.EPSO_BANK;box.window.EPSO_SET_FILES.filter(f=>f.startsWith('verbal/')).forEach(f=>run('questions/'+f));
const sets=box.EPSO_BANK.sets.filter(s=>s.challenge);const record=JSON.parse(fs.readFileSync(path.join(root,'docs/research/verbal/blind-review/review-mapping.json')));
const bookDir='docs/research/verbal/blind-review/book-2026-11';
const book=JSON.parse(fs.readFileSync(path.join(root,bookDir,'review-mapping.json')));
const bookAnswers=JSON.parse(fs.readFileSync(path.join(root,bookDir,'answers.json')));
const bookRecord=q=>book.items.find(r=>r.id===q.id);
const sourceId=q=>bookRecord(q).previousId;
const hash=s=>crypto.createHash('sha256').update(s).digest('hex');
const isMedium=s=>/^verbal-2[0-4]$/.test(s.id);

test('historical challenge reviews remain traceable for unchanged passages and options',()=>{
 assert.equal(sets.length,10);let total=0;
 for(const set of sets){
  assert.equal(set.questions.length,10);const counts=[0,0,0,0];
  const answers=JSON.parse(fs.readFileSync(path.join(root,`docs/research/verbal/blind-review/set-${set.id.split('-')[1]}-answers.json`)));
  for(const q of set.questions){
   total++;counts[q.answer]++;const source=sourceId(q),r=record.items.find(r=>r.id===source);assert.ok(r,source);
   if(!bookRecord(q).changedFields.some(k=>['passage','options'].includes(k))){
    assert.equal(hash(q.passage),r.passageSha256,q.id);assert.equal(hash(JSON.stringify(q.options)),r.optionsSha256,q.id);
   }
   assert.equal(answers[source].answer,'ABCD'[q.answer]);
   assert.equal(q.difficulty,3);assert.ok(q.reasoning.evidence.length>=3);
  }
  assert.ok(counts.every(n=>n>=2&&n<=3));
 }
 assert.equal(total,100);
});

test('historical foundation reviews remain traceable for unchanged passages and options',()=>{
 const dir=path.join(root,'docs/research/verbal/blind-review/legacy');
 const mapping=JSON.parse(fs.readFileSync(path.join(dir,'review-mapping.json'))).items;
 const answers=JSON.parse(fs.readFileSync(path.join(dir,'answers.json')));
 const qs=box.EPSO_BANK.sets.filter(s=>!s.challenge&&!isMedium(s)).flatMap(s=>s.questions);
 assert.equal(qs.length,200);assert.equal(mapping.length,200);assert.equal(Object.keys(answers).length,200);
 for(const q of qs){
  const source=sourceId(q),m=mapping.find(m=>m.id===source);assert.ok(m,q.id);
  if(!bookRecord(q).changedFields.some(k=>['passage','options'].includes(k))){
   assert.equal(hash(q.passage),m.passageSha256,q.id);assert.equal(hash(JSON.stringify(q.options)),m.optionsSha256,q.id);
  }
  const review=JSON.parse(fs.readFileSync(path.join(dir,m.reviewFile)))[source];
  assert.deepEqual(review,answers[source]);assert.equal(review.issues.length,0,source+' unresolved historical issue');
  assert.equal(review.answer,'ABCD'[q.answer]);
 }
});

test('all 300 earlier verbal texts match independent blind keys and reconciled distractor labels',()=>{
 const qs=box.EPSO_BANK.sets.filter(s=>!isMedium(s)).flatMap(s=>s.questions);
 assert.equal(qs.length,300);assert.equal(book.items.length,300);assert.equal(Object.keys(bookAnswers).length,300);
 let revised=0,freshText=0,labels=0;
 for(const q of qs){
  const r=bookRecord(q);assert.ok(r,q.id);
  assert.equal(hash(q.passage),r.passageSha256);assert.equal(hash(JSON.stringify(q.options)),r.optionsSha256);
  assert.equal(hash(JSON.stringify(q)),r.contentSha256,q.id+' teaching fingerprint changed');
  const blind=JSON.parse(fs.readFileSync(path.join(root,bookDir,r.blindFile))).find(v=>v.id===r.reviewSourceId);
  assert.ok(blind,q.id);assert.equal(hash(blind.passage),r.passageSha256);assert.equal(hash(JSON.stringify(blind.options)),r.optionsSha256);
  const review=JSON.parse(fs.readFileSync(path.join(root,bookDir,r.reviewFile)))[r.reviewSourceId];
  assert.equal(review.answer,'ABCD'[q.answer],q.id);
  const final=bookAnswers[q.id];assert.equal(final.answer,review.answer,q.id);
  const reconciled=r.labelReconciliationFile?JSON.parse(fs.readFileSync(path.join(root,bookDir,r.labelReconciliationFile)))[r.reviewSourceId]||{}:{};
  for(let j=0;j<4;j++)if(j!==q.answer){
   const letter='ABCD'[j],label=reconciled[letter]?.label||review.labels[letter];
   assert.equal(q.optionNotes[j].split('.')[0],label,q.id+' '+letter);assert.equal(final.labels[letter],label);labels++;
  }
  if(q.id!==r.previousId){assert.equal(q.supersedes,r.previousId);assert.notEqual(r.contentSha256,r.beforeContentSha256);revised++;}
  if(r.changedFields.some(k=>['passage','options'].includes(k))){assert.equal(r.labelReconciliationFile,null,q.id+' changed text needs fresh blind review');assert.deepEqual(review.issues,[]);freshText++;}
 }
 assert.equal(labels,900);assert.equal(revised,97);assert.equal(freshText,14);
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
