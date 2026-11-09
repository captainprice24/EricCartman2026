// Independent from the generator: read displayed shapes, fit a bounded rule grammar, predict next state.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import test from 'node:test';
import {inferTransfer,readTransfer} from './abstract-transfer-solver.mjs';
import {abstractPath} from '../scripts/lib/abstract-path.mjs';
import {foundationFeatures,inferFoundation} from './abstract-foundation-solver.mjs';
import {patternFeatures,inferPattern} from './abstract-pattern-solver.mjs';
import crypto from 'node:crypto';
import {abstractContentHash} from '../scripts/generators/abstract-review-revision.mjs';
import { fileURLToPath } from 'node:url';
import { abstractBlind } from '../scripts/lib/blind.mjs';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const bank = [];
const context = vm.createContext({ EPSO_BANK: { registerSet: s => bank.push(s) } });
for (const file of fs.readdirSync(path.join(root, 'questions/abstract'))) vm.runInContext(fs.readFileSync(path.join(root, 'questions/abstract', file), 'utf8'), context);
const sets = bank.filter(s => s.challenge);
const retiredBaseline=JSON.parse(fs.readFileSync(path.join(root,'scripts/generators/abstract-no-easy-baseline.json'))).items;
import {decode,predictions,linear,alternating,accelerating,interleaved} from './abstract-challenge-solver.mjs';
const same = (a,b)=>JSON.stringify(a)===JSON.stringify(b);
test('every challenge answer follows independently inferred rules from the displayed figures', () => {
  assert.equal(sets.length, 7);
  for (const set of sets) for (const q of set.questions) {
    const expected = predictions(q.sequence.map(decode));
    assert.equal(expected.length, 1, q.id + ' has a single continuation in the bounded rule grammar: ' + JSON.stringify(expected));
    const matches = Array.from(q.options, (f, i) => same(decode(f), expected[0]) ? i : -1).filter(i => i >= 0);
    assert.deepEqual(matches, [q.answer], q.id + ' key');
  }
});
test('seven abstract rounds have balanced keys, different models and no single-feature answer shortcut', () => {
  const signatures = new Set();
  for (const set of sets) {
    assert.equal(set.questions.length, 10);
    assert.equal(new Set(set.questions.map(q => q.reasoning.model)).size, 10);
    for (let key = 0; key < 5; key++) assert.equal(set.questions.filter(q => q.answer === key).length, 2);
    for (const strategy of ['medoid', 'outlier', 'majority']) assert.ok(set.questions.reduce((sum, q) => sum + abstractBlind(q.options, q.answer)[strategy], 0) / 10 <= .3, set.id + ' ' + strategy);
    for (const q of set.questions) {
      assert.ok([2,3].includes(q.difficulty)); assert.equal(q.rules, 4); assert.equal(q.sequence.length, 6);
      const sig = JSON.stringify(q.sequence); assert.ok(!signatures.has(sig)); signatures.add(sig);
      const options = q.options.map(decode), key = options[q.answer];
      const support = 'p' in key ? ['f', 'c'] : ['l', 'r', 'k'];
      assert.ok(options.filter(s => support.every(k => s[k] === key[k])).length >= 2, q.id + ': easy supporting tracks cannot select the key');
      assert.ok(q.sequence.every(fig => !same(decode(fig), key)), q.id + ': key does not repeat a complete displayed frame');
      for (const track of Object.keys(key)) {
        assert.ok(options.filter(s => s[track] === key[track]).length >= 2, q.id + ': ' + track + ' cannot alone identify the key');
        assert.ok(options.some(s => s[track] !== key[track]), q.id + ': ' + track + ' tested');
      }
      for (const f of [...q.sequence, ...q.options]) for (const s of f) {
        if (s.t === 'circle') assert.ok(s.x - s.r >= 0 && s.x + s.r <= 100 && s.y - s.r >= 0 && s.y + s.r <= 100, q.id + ' circle bounds');
        if (s.t === 'rect') assert.ok(s.x >= 0 && s.x + s.w <= 100 && s.y >= 0 && s.y + s.h <= 100, q.id + ' cell bounds');
      }
    }
  }
});

function simpleNext(values) {
  const out=[linear(values),alternating(values),accelerating(values),interleaved(values)];
  for(let period=1;period<=4;period++)if(values.every((v,i)=>i<period||v===values[i-period]))out.push(values[values.length%period]);
  return [...new Set(out.filter(v=>v!==null))];
}
const isMedium=q=>/^a1[2-6]-/.test(q.id);
test('fifty patterned medium series: unique visible continuation, Medium band, balanced keys, unique series and blind strategies within limits',()=>{
  const medium=bank.filter(s=>/^abstract-1[2-6]$/.test(s.id));assert.equal(medium.length,5);const all=new Set(bank.flatMap(s=>Array.from(s.questions)).map(q=>JSON.stringify(q.sequence)));
  assert.equal(all.size,bank.reduce((n,s)=>n+s.questions.length,0),'no repeated figure series in the bank');
  for(const set of medium){assert.equal(set.questions.length,10);for(let key=0;key<5;key++)assert.equal(set.questions.filter(q=>q.answer===key).length,2,set.id);
    for(const strategy of ['medoid','outlier','majority'])assert.ok(set.questions.reduce((n,q)=>n+abstractBlind(q.options,q.answer)[strategy],0)/10<=.3,set.id+' '+strategy);
    for(const q of set.questions){assert.equal(q.difficulty,2,q.id);assert.ok([3,4].includes(q.rules),q.id);assert.equal(q.sequence.length,5,q.id);
      assert.ok(q.sequence.every(f=>!same(f,q.options[q.answer])),q.id+': key does not repeat a displayed frame');
      const prediction=inferPattern(q.sequence);assert.ok(prediction.next,q.id+' unique continuation '+JSON.stringify(prediction.fits));
      const matches=Array.from(q.options,(f,i)=>same({layout:prediction.layout,...Object.fromEntries(Object.keys(prediction.next).filter(k=>k!=='layout').map(k=>[k,patternFeatures(f)[k]]))},prediction.next)?i:-1).filter(i=>i>=0);
      assert.deepEqual(matches,[q.answer],q.id);assert.ok(q.solution.length>=q.rules,q.id);}
    assert.equal(new Set(set.questions.map(q=>q.reasoning.model)).size,3,set.id+' uses all three patterned families');
    assert.ok(set.questions.some(q=>q.sequence.flat().some(sh=>['hatch','rhatch','hlines','vlines','dots','check'].includes(sh.fill))),set.id+' uses patterned fills');}
});
test('the nine retained Medium foundation keys follow uniquely inferred visible tracks',()=>{
  const qs=bank.filter(s=>!s.challenge).flatMap(s=>Array.from(s.questions)).filter(q=>q.reasoning?.model==='reviewed-foundation');assert.equal(qs.length,9);
  for(const q of qs){const prediction=inferFoundation(q.sequence);assert.ok(prediction.next,q.id+' unique continuation '+JSON.stringify(prediction.fits));
    const matches=Array.from(q.options,(f,i)=>same(foundationFeatures(f).features,prediction.next)?i:-1).filter(i=>i>=0);
    assert.deepEqual(matches,[q.answer],q.id);assert.ok(q.solution.length>=q.rules);
  }
});
test('challenge keys exclude conflicting simple patterns and bands reflect simpler paths',()=>{
  for(const set of sets)for(const q of set.questions){const rows=q.sequence.map(decode),key=decode(q.options[q.answer]);if(!('p' in key))continue;
    const p=simpleNext(rows.map(r=>r.p)),a=simpleNext(rows.map(r=>r.a));
    assert.ok(p.every(v=>v===key.p)&&a.every(v=>v===key.a),q.id+' conflicting simple continuation');
    assert.equal(q.difficulty,p.length&&a.length?2:3,q.id+' difficulty');
  }
});
test('reviewed IDs and content are immutable and prior ambiguities are regression fixtures',()=>{
  const registry=JSON.parse(fs.readFileSync(path.join(root,'scripts/generators/abstract-review-revisions.json')));
  const medium=JSON.parse(fs.readFileSync(path.join(root,'scripts/generators/abstract-medium-fingerprints.json')));
  const published=JSON.parse(fs.readFileSync(path.join(root,'scripts/generators/abstract-transfer-baseline.json'))).items;
  for(const q of published.filter(isMedium)){const {id,...content}=q;assert.equal(crypto.createHash('sha256').update(JSON.stringify(content)).digest('hex'),medium[id],id);}
  for(const q of published.filter(q=>!isMedium(q))){const r=registry.revisions[q.supersedes];assert.ok(r,q.id);assert.equal(q.id,r.id);assert.equal(abstractContentHash(q),r.sha256);}
  const before=JSON.parse(fs.readFileSync(path.join(root,'tests/fixtures/abstract-ambiguities.json')));
  for(const q of before.foundation)assert.equal(inferFoundation(q.sequence).next,null,q.id);
  for(const q of before.challenge){const a=simpleNext(q.sequence.map(decode).map(r=>r.a));assert.ok(a.some(v=>v!==decode(q.options[q.answer]).a),q.id);}
});

test('figure changes stay confined to the eleven repaired stimuli',()=>{
 const registry=JSON.parse(fs.readFileSync(path.join(root,'scripts/generators/abstract-review-revisions.json')));
 const expected=['a01-03','a02-18','a02-48','a03-23','a03-43','a03-48','a04-08','a04-23','a07-04','a08-05','a11-04'];
 const hash=value=>crypto.createHash('sha256').update(JSON.stringify(value)).digest('hex');
 const published=JSON.parse(fs.readFileSync(path.join(root,'scripts/generators/abstract-transfer-baseline.json'))).items;
 const changed=[];for(const q of published.filter(q=>!isMedium(q))){const b=registry.baseline[q.supersedes];if(hash(q.sequence)!==b.sequenceSha256||hash(q.options)!==b.optionsSha256)changed.push(q.supersedes);}
 assert.deepEqual(changed,expected);
});

const digest=v=>crypto.createHash('sha256').update(JSON.stringify(v)).digest('hex');
test('transfer review preserves 270 stimuli, revises 200 IDs and closes patterned supporting-cue shortcuts',()=>{
 const before=JSON.parse(fs.readFileSync(path.join(root,'scripts/generators/abstract-transfer-baseline.json'))).items;
 const registry=JSON.parse(fs.readFileSync(path.join(root,'scripts/generators/abstract-transfer-revisions.json'))).revisions;
 const all=retiredBaseline;
 assert.equal(Object.keys(registry).length,200);
 for(const old of before){const revision=registry[old.id],q=all.find(q=>q.id===(revision?.id||old.id));assert.ok(q,old.id);
  assert.equal(digest(q.sequence),digest(old.sequence),old.id+' published stimulus preserved');
  if(revision){assert.equal(q.supersedes,old.id);assert.equal(digest(old),revision.beforeSha256);assert.equal(digest(q),revision.sha256);}
  else assert.equal(digest(q),digest(old));
  if(isMedium(q)){const p=abstractPath(q);assert.deepEqual(p.unique,[],q.id+' single-feature shortcut');assert.ok(p.supportCandidates>=2,q.id+' supporting cues');}
  else if(!q.challenge)assert.equal(q.difficulty,abstractPath(q).cost<=2?1:2,q.id+' simplest sufficient route');
 }
});
test('30 original transfer items have one visible semantic answer and no single-feature key',()=>{
 const qs=bank.flatMap(s=>Array.from(s.questions)).filter(q=>q.reasoning?.transfer);
 const fingerprints=JSON.parse(fs.readFileSync(path.join(root,'scripts/generators/abstract-transfer-fingerprints.json')));
 assert.equal(qs.length,30);assert.equal(new Set(qs.map(q=>q.reasoning.model)).size,6);
 for(const q of qs){const predicted=inferTransfer(q.sequence),rows=q.options.map(readTransfer),key=rows[q.answer];
  assert.deepEqual(Array.from(q.options,(f,i)=>predicted.matches(f)?i:-1).filter(i=>i>=0),[q.answer],q.id+' semantic answer');
  for(const k of Object.keys(predicted.next)){assert.ok(rows.filter(r=>same(r[k],key[k])).length>=2,q.id+' single visible feature '+k);}
  if(key.layout==='containers'){assert.ok(rows.filter(r=>r.edge===key.edge&&r.amount===key.amount).length>=2,q.id+' count transfer required');assert.equal(new Set(rows.map(r=>r.counts.reduce((a,b)=>a+b,0))).size,1);}
  assert.equal(digest(q),fingerprints[q.id]);
 }
});
test('visible transfer inference rejects damaged relations and ignores drawing order',()=>{
 const qs=bank.flatMap(s=>Array.from(s.questions)).filter(q=>q.reasoning?.transfer);
 for(const q of qs){const scrambled=q.sequence.map(f=>Array.from(f).reverse().map(s=>s.t==='polygon'?{...s,points:Array.from(s.points).reverse()}:s));const p=inferTransfer(scrambled);assert.ok(p.matches(q.options[q.answer]),q.id);}
 const pick=model=>JSON.parse(JSON.stringify(qs.find(q=>q.reasoning.model===model).sequence));
 const handoff=pick('identity-handoff');handoff[2].find(s=>s.r===25).fill='black';assert.throws(()=>inferTransfer(handoff));
 const boundary=pick('boundary-continuation');boundary[2].find(s=>s.t==='line'&&!s.arrowEnd).x2+=3;assert.throws(()=>inferTransfer(boundary));
 const transfer=pick('conserved-transfer');transfer[2].splice(transfer[2].findIndex(s=>s.t==='circle'),1);assert.throws(()=>inferTransfer(transfer));
});

test('delayed transfer items reject competing short cycles and independent count progressions',()=>{
 const qs=bank.flatMap(s=>Array.from(s.questions)).filter(q=>q.reasoning?.transfer);
 for(const q of qs){const rows=q.sequence.map(readTransfer),key=readTransfer(q.options[q.answer]);
  if(key.layout==='handoff')for(const k of ['kind','shade'])for(let period=1;period<=4;period++){
   if(rows.every((r,i)=>i<period||r[k]===rows[i-period][k]))assert.equal(rows[rows.length%period][k],key[k],q.id+' competing '+k+' cycle');
  }
  if(key.layout==='containers')for(let c=0;c<3;c++){
   const vs=rows.map(r=>r.counts[c]),d=vs.slice(1).map((v,i)=>v-vs[i]);
   const fits=[];
   if(d.every(x=>x===d[0]))fits.push(vs.at(-1)+d[0]);
   if(d.every((x,i)=>x===d[i%2]))fits.push(vs.at(-1)+d[d.length%2]);
   const streams=[0,1].map(p=>vs.filter((_,i)=>i%2===p));
   if(streams.every(a=>a.slice(1).every((v,i)=>v-a[i]===a[1]-a[0]))){const a=streams[vs.length%2];fits.push(a.at(-1)+a[1]-a[0]);}
   for(const fit of fits)assert.equal(fit,key.counts[c],q.id+' competing independent container progression');
  }
 }
});

test('all 141 Easy abstract slots are substantively upgraded: 71 Medium and 70 Hard, with immutable fresh IDs',()=>{
 const all=bank.flatMap(s=>Array.from(s.questions));
 const registry=JSON.parse(fs.readFileSync(path.join(root,'scripts/generators/abstract-no-easy-revisions.json'))).revisions;
 assert.equal(all.length,300);assert.ok(all.every(q=>[2,3].includes(q.difficulty)));
 assert.equal(all.filter(q=>q.difficulty===2).length,160);assert.equal(all.filter(q=>q.difficulty===3).length,140);
 assert.equal(Object.keys(registry).length,141);
 const upgrades=[];
 for(const old of retiredBaseline){
  const r=registry[old.id],q=all.find(q=>q.id===(r?.id||old.id));assert.ok(q,old.id);
  if(old.difficulty!==1){assert.equal(digest(q),digest(old),old.id+' existing Medium/Hard unchanged');continue;}
  assert.ok(r,old.id+' every Easy slot replaced');assert.equal(q.supersedes,old.id);
  assert.equal(r.beforeSha256,digest(old));assert.equal(r.sha256,digest(q));
  assert.notEqual(digest(q.sequence),digest(old.sequence),q.id+' substantive new series');
  assert.notEqual(digest(q.options),digest(old.options),q.id+' substantive new alternatives');
  assert.equal(q.answer,old.answer,q.id+' answer-position balance retained');
  upgrades.push(q);
  if(q.difficulty===2){
   const prediction=inferPattern(q.sequence);assert.ok(prediction.next,q.id);
   const matches=Array.from(q.options,(f,i)=>same({layout:prediction.layout,...Object.fromEntries(Object.keys(prediction.next).filter(k=>k!=='layout').map(k=>[k,patternFeatures(f)[k]]))},prediction.next)?i:-1).filter(i=>i>=0);
   assert.deepEqual(matches,[q.answer],q.id+' independent visible pattern answer');
   const route=abstractPath(q);assert.deepEqual(route.unique,[],q.id+' no single-feature key');assert.ok(route.supportCandidates>=2,q.id+' spatial transformation required');
  }else{
   const predicted=predictions(q.sequence.map(decode));assert.equal(predicted.length,1,q.id+' unique independent continuation');
   assert.deepEqual(Array.from(q.options,(f,i)=>same(decode(f),predicted[0])?i:-1).filter(i=>i>=0),[q.answer],q.id);
   const rows=q.options.map(decode),key=rows[q.answer],support='p' in key?['f','c']:['l','r','k'];
   assert.ok(rows.filter(r=>support.every(k=>r[k]===key[k])).length>=2,q.id+' dependency required');
   for(const k of Object.keys(key))assert.ok(rows.filter(r=>r[k]===key[k]).length>=2,q.id+' no single-feature key');
   if('p' in key){const shown=q.sequence.map(decode),p=simpleNext(shown.map(r=>r.p)),a=simpleNext(shown.map(r=>r.a));assert.ok(!(p.length&&a.length),q.id+' independent paths cannot replace the dependency');}
  }
 }
 assert.equal(upgrades.filter(q=>q.difficulty===2).length,71);assert.equal(upgrades.filter(q=>q.difficulty===3).length,70);
});
