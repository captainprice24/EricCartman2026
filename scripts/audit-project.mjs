// Audit probes, intentionally separate from passing regression tests. Does not change app behaviour.
// Run after npm run build: CHROMIUM_PATH=/usr/bin/chromium node scripts/audit-project.mjs
import fs from 'node:fs';
import {prepareSite} from './prepare-site.mjs';
import os from 'node:os';
import path from 'node:path';
import http from 'node:http';
import { execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const base = (process.env.E2E_BASE_URL || 'http://127.0.0.1:8000').replace(/\/$/, '');
const url = base + '/dist/ad5-reasoning-trainer.html';
const observations = [];
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
async function probe(name, run) {
 try { observations.push({ name, result: await run() }); }
 catch (error) { observations.push({ name, probeError: String(error.stack || error) }); }
 console.log(name, JSON.stringify(observations.at(-1)));
}
async function page(seed, blockStorage = false, viewport = { width: 1366, height: 860 }) {
 const ctx = await browser.newContext({ viewport }); ctx.setDefaultTimeout(5000); const p = await ctx.newPage(); p.errors = [];
 p.on('pageerror', error => p.errors.push(error.message));
 if (seed || blockStorage) await p.addInitScript(({ seed, blockStorage }) => {
  for (const [key, value] of Object.entries(seed || {})) localStorage.setItem(key, value);
  if (blockStorage) Storage.prototype.setItem = function () { throw new DOMException('Audit: storage quota exceeded', 'QuotaExceededError'); };
 }, { seed, blockStorage });
 await p.goto(url); return p;
}
try {
 await probe('confirmation-dialog-keyboard-isolation', async () => {
  const p = await page(); await p.selectOption('#opt-count', '5');
  await p.locator('[data-act="practice"][data-k="verbal"]').click();
  await p.locator('.exam-bar [data-act="end"]').click();
  await p.keyboard.press('Shift+Tab'); await p.keyboard.press('Shift+Tab');
  const focus = await p.evaluate(() => ({ insideDialog: !!document.activeElement.closest('.dialog'), action: document.activeElement.getAttribute('data-act'), qi: window.EPSO_APP.state.session.qi }));
  await p.keyboard.press('Enter');
  const after = await p.evaluate(() => ({ qi: window.EPSO_APP.state.session.qi, modal: !!document.querySelector('.dialog') }));
  await p.context().close(); return { focus, after };
 });
 await probe('tooltip-escape-dismissal', async () => {
  const p = await page(); const button = p.locator('[data-act="tip"][data-k="scope"]');
  await button.focus(); await p.keyboard.press('Tab'); await p.keyboard.press('Shift+Tab');
  const before = await p.locator('#tip-scope').isVisible(); await p.keyboard.press('Escape');
  const after = await p.locator('#tip-scope').isVisible();
  await p.context().close(); return { visibleBeforeEscape: before, visibleAfterEscape: after };
 });
 await probe('unchecked-practice-result-consistency', async () => {
  const p = await page(); await p.selectOption('#opt-count', '5');
  await p.locator('[data-act="practice"][data-k="verbal"]').click();
  const key = await p.evaluate(() => { const s = window.EPSO_APP.state.session, it = s.sections[0].items[0]; return it.order.indexOf(it.q.answer); });
  await p.locator('[data-act="choose"]').nth(key).click();
  await p.locator('.exam-bar [data-act="end"]').click(); await p.locator('#cf-yes').click();
  const result = { score: await p.locator('.score-big').innerText(), firstReview: await p.locator('.review-list li').first().innerText(), retry: await p.locator('[data-act="retry-coach"]').count() ? await p.locator('[data-act="retry-coach"]').innerText() : null, errors: p.errors };
  await p.context().close(); return result;
 });
 await probe('calculator-scientific-result-chaining', async () => {
  const p = await page(); await p.locator('[data-act="practice"][data-k="numerical"]').click(); await p.locator('[data-act="tool-calc"]').click();
  await p.locator('.calc-keys [data-k="1"]').click(); await p.keyboard.type('/10000000'); await p.keyboard.press('Enter');
  const first = await p.locator('#calc-out').innerText();
  await p.keyboard.type('*2'); await p.keyboard.press('Enter');
  const second = await p.locator('#calc-out').innerText();
  await p.context().close(); return { first, second, expectedSecond: '= 2e-7' };
 });
 for (const [name, seed] of [
  ['malformed-json', { 'ad5trainer.prefs.v1': '{' }],
  ['null-preferences', { 'ad5trainer.prefs.v1': 'null' }],
  ['null-question-stats', { 'ad5trainer.qstats.v1': 'null' }],
  ['invalid-saved-session-shape', { 'ad5trainer.session.v1': JSON.stringify({ v: 1, sections: [{}] }) }]
 ]) await probe('saved-state-' + name, async () => { const p = await page(seed); const result = { homeLoaded: await p.locator('.home').count() === 1, errors: p.errors }; await p.context().close(); return result; });
 await probe('storage-write-failure-warning', async () => {
  const p = await page(null, true); await p.locator('[data-act="practice"][data-k="verbal"]').click();
  await p.locator('[data-act="choose"]').first().click(); await p.locator('[data-act="check"]').click();
  const before = { sessionSaved: await p.evaluate(() => !!localStorage.getItem('ad5trainer.session.v1')), warning: await p.locator('.alert, #toast').allTextContents(), errors: p.errors };
  await p.reload(); const resumeAfterReload = await p.locator('[data-act="resume"]').count();
  await p.context().close(); return { before, resumeAfterReload };
 });
 await probe('wide-table-keyboard-scroll', async () => {
  const p = await page(null, false, { width: 390, height: 844 });
  await p.selectOption('#opt-set', 'numerical-05'); await p.selectOption('#opt-count', '10');
  await p.locator('[data-act="practice"][data-k="numerical"]').click();
  const table = p.locator('.table-wrap[tabindex="0"]').first(); await table.focus();
  const before = await table.evaluate(el => ({ scrollLeft: el.scrollLeft, scrollWidth: el.scrollWidth, clientWidth: el.clientWidth, qi: window.EPSO_APP.state.session.qi }));
  await p.keyboard.press('ArrowRight');
  await p.waitForFunction(() => document.activeElement.scrollLeft > 0);
  const after = await p.locator('.table-wrap[tabindex="0"]').first().evaluate(el => ({ scrollLeft: el.scrollLeft, qi: window.EPSO_APP.state.session.qi }));
  await p.context().close(); return { before, after };
 });
 await probe('abstract-coach-frame-number', async () => {
  const p = await page(); await p.selectOption('#opt-set', 'abstract-05');
  await p.locator('[data-act="coach"][data-k="abstract"]').click();
  const lessonStep = (await p.locator('.steps li').allTextContents()).find(text => text.includes('next frame'));
  await p.locator('[data-act="begin-coach"]').click();
  const displayedFrames = await p.locator('.series .fig').count();
  await p.context().close(); return { lessonStep, displayedFrames, nextFrame: displayedFrames + 1 };
 });
 await probe('phone-320px-layout', async () => {
  const p = await page(null, false, { width: 320, height: 700 });
  const result = {};
  for (const section of ['verbal', 'numerical', 'abstract']) {
   await p.locator('[data-act="practice"][data-k="' + section + '"]').click();
   result[section] = await p.evaluate(() => ({ viewport: innerWidth, pageWidth: document.documentElement.scrollWidth }));
   await p.goto(url);
  }
  await p.context().close(); return result;
 });
 await probe('direct-file-access', async () => {
  const ctx = await browser.newContext(); const p = await ctx.newPage(); p.setDefaultNavigationTimeout(5000);
  try {
   await p.goto(pathToFileURL(path.join(root, 'dist/ad5-reasoning-trainer.html')).href);
   return { homeLoaded: await p.locator('.home').count() === 1, environmentBlocked: false };
  } catch (error) {
   return { homeLoaded: false, environmentBlocked: /BLOCKED_BY_ADMINISTRATOR/.test(String(error)), error: String(error.message).split('\n')[0] };
  } finally { await ctx.close(); }
 });
 await probe('published-site-packaging', async () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'ad5-pages-audit-'));
  let server;
  try {
   // Exercise the same staging function as the deployment workflow.
   prepareSite(tmp);
   server = http.createServer((request, response) => {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const file = path.resolve(tmp, '.' + (pathname === '/' ? '/index.html' : pathname));
    if (!file.startsWith(tmp + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) { response.writeHead(404); response.end('Not found'); return; }
    response.setHeader('Content-Type', file.endsWith('.js') ? 'text/javascript' : file.endsWith('.css') ? 'text/css' : 'text/html');
    response.end(fs.readFileSync(file));
   });
   await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
   const local = 'http://127.0.0.1:' + server.address().port;
   const p = await browser.newPage(); const failed = [];
   p.on('response', response => { if (response.status() >= 400) failed.push({ url: new URL(response.url()).pathname, status: response.status() }); });
   await p.goto(local); await p.waitForSelector('.home');
   const result = await p.evaluate(() => ({ homeLoaded: !!document.querySelector('.home'), version: window.EPSO_VERSION || null, questions: window.EPSO_APP.bank.all.length, versionedScripts: [...document.scripts].filter(s => /\?v=/.test(s.src)).length }));
   await p.close(); return { versionFileIncluded: fs.existsSync(path.join(tmp, 'version.js')), failed, ...result };
  } finally { if (server) await new Promise(resolve => server.close(resolve)); fs.rmSync(tmp, { recursive: true, force: true }); }
 });
} finally {
 await browser.close();
 const output = path.join(root, 'docs/audit/project-probes.json');
 fs.writeFileSync(output, JSON.stringify({ baseCommit: execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim(), verifiedWorkingTree: true, applicationVersion: fs.readFileSync(path.join(root, 'version.js'), 'utf8').match(/[a-f0-9]{12}/)[0], browser: 'Chromium', base, observations }, null, 2) + '\n');
}

if (observations.some(o => o.probeError)) process.exitCode = 1;
