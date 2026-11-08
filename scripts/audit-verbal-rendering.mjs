import fs from 'node:fs';import assert from 'node:assert/strict';import crypto from 'node:crypto';import {chromium} from 'playwright';
const dir='docs/research/verbal/blind-review/book-2026-11';const revised=new Set(JSON.parse(fs.readFileSync(dir+'/review-mapping.json')).items.filter(r=>r.changedFields.some(k=>['passage','options'].includes(k))).map(r=>r.id));
// The fourteen book-review text revisions, in their condensed November 2026 form (compact-2026-11/final.json).
const cases=JSON.parse(fs.readFileSync('docs/research/verbal/blind-review/compact-2026-11/final.json')).items.filter(r=>revised.has(r.replaces)).map(r=>({...r,previousId:r.supersedes}));
const base=(process.env.E2E_BASE_URL||'http://127.0.0.1:8000').replace(/\/$/,'');
const browser=await chromium.launch(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{});const results=[];
try{for(const width of [1366,390]){
 const context=await browser.newContext({viewport:{width,height:844},colorScheme:width===390?'dark':'light'});const p=await context.newPage();await p.goto(base+'/dist/ad5-reasoning-trainer.html');await p.waitForSelector('.home');await p.selectOption('#opt-count','all');await p.locator('[data-act="practice"][data-k="verbal"]').click();
 for(const r of cases){
  const item=await p.evaluate(id=>{const s=window.EPSO_APP.state.session;const i=s.sections[0].items.findIndex(it=>it.q.id===id);return {i,q:s.sections[0].items[i]?.q};},r.id);assert.ok(item.i>=0,r.id);
  assert.equal(crypto.createHash('sha256').update(item.q.passage).digest('hex'),r.passageSha256,r.id+' bundled passage');
  await p.locator(`.qdot[data-i="${item.i}"]`).click();assert.equal(await p.locator('.feedback').count(),0);assert.equal(await p.locator('#verbal-evidence-rule').isVisible(),true);
  const text=await p.locator('#passage').innerText();assert.equal(text.replace(/\s+/g,' ').trim(),item.q.passage.replace(/\s+/g,' ').trim());
  await p.locator(`[data-act="choose"][data-opt="${item.q.answer}"]`).click();await p.locator('[data-act="check"]').click();assert.match(await p.locator('.verdict').innerText(),/Correct/);assert.equal(await p.locator('.opt-note').count(),4);
  if(r.previousId==='v12-10'){assert.match(text,/outside the pending-release group had passed quality release/);assert.match(await p.locator('.solution').innerText(),/150.*400/s);}
  results.push({id:r.id,width,passageHashMatches:true,correctFeedback:true,allOptionExplanations:true});
 }
 await context.close();
}}finally{await browser.close();}
fs.writeFileSync('docs/audit/verbal-rendering.json',JSON.stringify({date:'2026-11-02',scope:'All fourteen book-review passage/option revisions, in their condensed form, in final local artifact, desktop light and phone dark, Practice answer feedback; Coach lifecycle separately covered by full suite.',results},null,2)+'\n');console.log(results.length+' revised-text rendering checks passed.');
