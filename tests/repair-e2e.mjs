// Regressions for the project audit, exercised against the actual deployment artifact.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import http from 'node:http';
import assert from 'node:assert/strict';
import {chromium, webkit, firefox} from 'playwright';
import {prepareSite} from '../scripts/prepare-site.mjs';
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'ad5-release-test-'));
prepareSite(dir);
const server=http.createServer((req,res)=>{
  const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  const file=path.resolve(dir,'.'+(pathname==='/'?'/index.html':pathname));
  if(!file.startsWith(dir+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404);res.end();return;}
  res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':'text/html');res.end(fs.readFileSync(file));
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const base='http://127.0.0.1:'+server.address().port;
let failures=0,passed=0;
try{
for(const name of (process.env.BROWSERS||'chromium').split(',')){
 const browser=await ({chromium,webkit,firefox}[name]).launch(name==='chromium'&&process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{});
 async function check(label,fn){try{await fn();passed++;console.log('  ✓ '+name+': '+label);}catch(e){if(process.env.GITHUB_ACTIONS){const escape=v=>String(v).replace(/%/g,'%25').replace(/\r/g,'%0D').replace(/\n/g,'%0A');console.error('::error title='+escape(name+': '+label).replace(/,/g,'%2C')+'::'+escape(e.stack||e));}failures++;console.error('  ✗ '+name+': '+label+'\n'+e.stack);}}
 async function page({seed={},blocked=false,viewport={width:1366,height:860},source=false}={}){
  const ctx=await browser.newContext({viewport});ctx.setDefaultTimeout(7000);const p=await ctx.newPage();p.errors=[];
  p.on('pageerror',e=>p.errors.push(e.message));p.on('response',r=>{if(r.status()>=400)p.errors.push('HTTP '+r.status()+': '+r.url())});
  await p.addInitScript(({seed,blocked})=>{for(const [k,v]of Object.entries(seed))localStorage.setItem(k,v);if(blocked)Storage.prototype.setItem=function(){throw new DOMException('Quota exceeded','QuotaExceededError')};},{seed,blocked});
  await p.goto(base+(source?'/index.html':'/dist/ad5-reasoning-trainer.html'));await p.waitForSelector('.home');return p;
 }
 try{
 await check('prepared source and standalone load all 620 questions without missing files',async()=>{
  assert.ok(fs.existsSync(path.join(dir,'version.js')));
  for(const source of [true,false]){const p=await page({source});assert.equal(await p.evaluate(()=>window.EPSO_APP.bank.all.length),620);if(source)assert.match(await p.evaluate(()=>window.EPSO_VERSION),/^[a-f0-9]{12}$/);else assert.equal(await p.evaluate(()=>window.EPSO_BUNDLED),true);assert.deepEqual(p.errors,[]);await p.context().close();}
 });
 await check('corrupt saved containers recover without losing unrelated history',async()=>{
  const hist=[{at:100,mode:'practice',sections:[{key:'verbal',correct:3,total:5,hints:0,usedSec:10,limitSec:null,repeats:0}],pass:null}];
  for(const bad of [ {'ad5trainer.prefs.v1':'{'}, {'ad5trainer.prefs.v1':'null'}, {'ad5trainer.qstats.v1':'null'}, {'ad5trainer.qstats.v1':'[]'}, {'ad5trainer.session.v1':JSON.stringify({v:1,sections:[{}]})}, {'ad5trainer.session.v1':'[]'} ]){
   const p=await page({seed:{'ad5trainer.history.v1':JSON.stringify(hist),...bad}});assert.match(await p.locator('#view-content').innerText(),/could not be restored/);assert.deepEqual(await p.evaluate(()=>JSON.parse(localStorage.getItem('ad5trainer.history.v1'))),hist);assert.deepEqual(p.errors,[]);await p.context().close();
  }
  const p=await page({seed:{'ad5trainer.history.v1':'null'}});assert.deepEqual(p.errors,[]);assert.equal(await p.locator('.home').count(),1);await p.context().close();
 });
 await check('failed writes show a persistent warning and keep current-tab progress',async()=>{
  const p=await page({blocked:true});await p.selectOption('#opt-count','5');await p.locator('[data-act="practice"][data-k="verbal"]').click();await p.locator('[data-act="choose"]').first().click();await p.locator('[data-act="check"]').click();
  await p.locator('.exam-bar [data-act="end"]').click();await p.locator('#cf-yes').click();assert.match(await p.locator('#storage-warning').innerText(),/lost when you reload/);
  await p.locator('[data-act="home"]').click();assert.equal(await p.evaluate(()=>window.EPSO_APP.state.view),'home');assert.match(await p.locator('.home').innerText(),/checked \(5 in round\)/);assert.equal(await p.locator('#storage-warning').count(),1);assert.deepEqual(p.errors,[]);await p.context().close();
 });
 await check('confirmation traps both Tab directions, blocks background actions and restores focus',async()=>{
  const p=await page();await p.selectOption('#opt-count','5');await p.locator('[data-act="practice"][data-k="verbal"]').click();await p.locator('.exam-bar [data-act="end"]').click();
  for(const key of ['Tab','Tab','Shift+Tab','Shift+Tab']){await p.keyboard.press(key);assert.equal(await p.evaluate(()=>!!document.activeElement.closest('.dialog')),true);}
  await p.evaluate(()=>document.querySelector('[data-act="next"]').click());assert.equal(await p.evaluate(()=>window.EPSO_APP.state.session.qi),0);
  await p.keyboard.press('Escape');assert.equal(await p.locator('.dialog').count(),0);assert.equal(await p.evaluate(()=>document.activeElement.getAttribute('data-act')),'end');assert.equal(await p.locator('[inert]').count(),0);await p.context().close();
 });
 await check('Escape dismisses focused, hovered and clicked tooltips until re-entry',async()=>{
  const p=await page();const btn=p.locator('[data-act="tip"][data-k="scope"]'),tip=p.locator('#tip-scope');
  await btn.focus();assert.equal(await tip.isVisible(),true);await p.keyboard.press('Escape');assert.equal(await tip.isVisible(),false);assert.equal(await btn.getAttribute('aria-expanded'),'false');assert.equal(await btn.evaluate(el=>el===document.activeElement),true);
  await p.locator('#opt-count').focus();await p.mouse.move(1,1);await btn.hover();assert.equal(await tip.isVisible(),true);await p.keyboard.press('Escape');assert.equal(await tip.isVisible(),false);
  await p.mouse.move(1,1);await btn.hover();assert.equal(await tip.isVisible(),true);await btn.click();await p.keyboard.press('Escape');assert.equal(await tip.isVisible(),false);await p.context().close();
 });
 await check('unchecked answers remain neutral in score, history, topics, retry and review',async()=>{
  const p=await page({viewport:{width:320,height:700}});await p.selectOption('#opt-count','5');await p.locator('[data-act="practice"][data-k="verbal"]').click();
  const pos=await p.evaluate(()=>{const it=window.EPSO_APP.state.session.sections[0].items[0];return it.order.indexOf(it.q.answer)});await p.locator('[data-act="choose"]').nth(pos).click();await p.locator('.exam-bar [data-act="end"]').click();await p.locator('#cf-yes').click();
  assert.equal((await p.locator('.score-big').innerText()).replace(/\s/g,''),'0/0');assert.equal(await p.locator('.review-list li.unchecked').count(),5);assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);assert.equal(await p.locator('[data-act="retry-coach"]').count(),0);assert.equal(await p.locator('.weak').count(),0);
  await p.locator('[data-act="review"]').first().click();assert.match(await p.locator('#feedback').innerText(),/^Not checked\./);assert.equal(await p.locator('.qdot.ok,.qdot.bad').count(),0);
  await p.locator('[data-act="results"]').click();await p.locator('[data-act="home"]').click();assert.match(await p.locator('.home').innerText(),/0\/0 checked \(5 in round\)/);assert.deepEqual(p.errors,[]);await p.context().close();
 });
 await check('calculator chains a tiny scientific result',async()=>{
  const p=await page();await p.locator('[data-act="practice"][data-k="numerical"]').click();await p.locator('[data-act="tool-calc"]').click();await p.locator('.calc-keys [data-k="1"]').click();await p.keyboard.type('/10000000');await p.keyboard.press('Enter');assert.equal(await p.locator('#calc-out').innerText(),'= 1e-7');await p.keyboard.type('*2');await p.keyboard.press('Enter');assert.equal(await p.locator('#calc-out').innerText(),'= 2e-7');await p.context().close();
 });
 await check('phone table ArrowRight scrolls without changing the question',async()=>{
  const p=await page({viewport:{width:390,height:844}});await p.selectOption('#opt-set','numerical-05');await p.selectOption('#opt-count','all');await p.locator('[data-act="practice"][data-k="numerical"]').click();
  let target;
  for(let i=0;i<10;i++){
   await p.locator('.qdot').nth(i).click();const tables=p.locator('.table-wrap');
   for(let j=0;j<await tables.count();j++){if(await tables.nth(j).evaluate(el=>el.scrollWidth>el.clientWidth+10)){target=tables.nth(j);break;}}
   if(target)break;
  }
  assert.ok(target,'a wide table exists');const qi=await p.evaluate(()=>window.EPSO_APP.state.session.qi);await target.focus();await p.keyboard.press('ArrowRight');await p.waitForFunction(()=>document.activeElement.scrollLeft>0);assert.equal(await p.evaluate(()=>window.EPSO_APP.state.session.qi),qi);await p.context().close();
 });
 await check('abstract coaching describes the next frame without assuming a series length',async()=>{
  const p=await page();await p.selectOption('#opt-set','abstract-05');await p.locator('[data-act="coach"][data-k="abstract"]').click();const text=await p.locator('.lesson').innerText();assert.match(text,/Predict the next frame/);assert.doesNotMatch(text,/frame 6|Five figures|Most series combine two rules/);await p.context().close();
 });
 }finally{await browser.close();}
}
}finally{await new Promise(resolve=>server.close(resolve));fs.rmSync(dir,{recursive:true,force:true});}
console.log(`Audit regressions: ${passed} passed, ${failures} failed.`);if(failures)process.exitCode=1;
