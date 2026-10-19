import fs from 'node:fs';import vm from 'node:vm';import test from 'node:test';import assert from 'node:assert/strict';
const box={window:{}};vm.createContext(box);const run=f=>vm.runInContext(fs.readFileSync(f,'utf8'),box);run('questions/registry.js');run('questions/manifest.js');box.EPSO_BANK=box.window.EPSO_BANK;for(const f of box.window.EPSO_SET_FILES)run('questions/'+f);run('questions/exams.js');run('assets/core.js');
const forms=box.window.EPSO_EXAMS,sets=box.EPSO_BANK.sets,byId=Object.fromEntries(sets.flatMap(s=>s.questions.map(q=>[q.id,{...q,section:s.section}])));
test('fifteen full fixed tests contain 600 distinct existing questions in the correct sections',()=>{
 assert.equal(forms.length,15);const seen=new Set();
 for(let i=0;i<15;i++){const form=forms[i];assert.equal(form.id,'mock-'+String(i+1).padStart(2,'0'));for(const [key,count]of [['verbal',20],['numerical',10],['abstract',10]]){assert.equal(form.sections[key].length,count);for(const id of form.sections[key]){assert.equal(byId[id]?.section,key,id);assert.equal(seen.has(id),false,id+' repeated across fixed tests');seen.add(id);}}}assert.equal(seen.size,600);
});
test('the three new forms contain exactly120 new challenge questions and no old question variants',()=>{
 const ids=forms.slice(12).flatMap(f=>Object.values(f.sections).flat());assert.equal(ids.length,120);
 for(const id of ids){const q=byId[id];assert.equal(q.challenge,true,id);assert.equal(q.difficulty,3,id);assert.match(id,/^(v1[4-9]|[na](09|10|11))-/);}
 assert.equal(sets.filter(s=>s.section==='verbal').reduce((n,s)=>n+s.questions.length,0),300);
 for(const key of ['numerical','abstract'])assert.equal(sets.filter(s=>s.section===key).reduce((n,s)=>n+s.questions.length,0),220);
});
test('the random bank also supports fifteen full unseen draws without recycling any question',()=>{
 const C=box.EPSO_CORE,stats={},seen=new Set();
 for(let i=0;i<15;i++)for(const [key,count]of [['verbal',20],['numerical',10],['abstract',10]]){
  const draw=C.drawExam(Object.values(byId).filter(q=>q.section===key),count,stats);assert.equal(draw.items.length,count);assert.equal(draw.repeats,0);
  for(const q of draw.items){assert.equal(seen.has(q.id),false);seen.add(q.id);stats[q.id]={seen:1,correct:0,shown:1};}
 }
 assert.equal(C.freshSimulationsLeft(Object.fromEntries(['verbal','numerical','abstract'].map(k=>[k,Object.values(byId).filter(q=>q.section===k)])),stats),0);
});
