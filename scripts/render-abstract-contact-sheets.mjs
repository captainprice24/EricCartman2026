// Reproducible visual review using the actual application SVG renderer, with no network requests.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sets = [], context = vm.createContext({ EPSO_BANK: { registerSet: s => sets.push(s) } });
for (const file of fs.readdirSync(path.join(root, 'questions/abstract')).sort()) vm.runInContext(fs.readFileSync(path.join(root, 'questions/abstract', file), 'utf8'), context);
const groups = sets.filter(s => s.challenge).map(s => ({ id: s.id, questions: s.questions }));
const old = sets.filter(s => !s.challenge).flatMap(s => Array.from(s.questions));
const topics = [...new Set(old.map(q => q.topic))];
groups.push({ id: 'foundation-sample', questions: topics.flatMap(t => old.filter(q => q.topic === t).slice(0, 2)) });
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
try {
 const page = await browser.newPage({ viewport: { width: 1450, height: 1600 } });
 await page.setContent('<!doctype html><html lang="en"><head><title>Abstract visual review</title></head><body></body></html>');
 await page.addStyleTag({ content: fs.readFileSync(path.join(root, 'assets/styles.css'), 'utf8') + `
 body { max-width: none; padding: 12px; } .contact { width: 100%; border-collapse: collapse; margin: 20px 0; }
 .contact td { border-bottom: 1px solid var(--line); padding: 5px; width: 8%; vertical-align: middle; }
 .contact td:first-child { width: 12%; font-size: 11px; overflow-wrap: anywhere; }
 .contact .fig { width: 100px; max-width: 100%; } .contact .key { outline: 2px solid var(--accent); }
 .contact caption { text-align: left; font-size: 18px; padding: 8px; font-weight: bold; }
 .contact .separator { border-left: 3px solid var(--ink); } .sheet { break-after: page; }
 ` });
 await page.addScriptTag({ path: path.join(root, 'assets/render.js') });
 await page.evaluate(groups => {
  const R = window.EPSO_RENDER;
  document.body.innerHTML = '<h1>Abstract visual review</h1><p>Six stimulus frames (five in the foundation sample), followed by five options. The keyed option is outlined for review only. These sheets are separate from the app.</p>' + groups.map(group => '<section class="sheet" id="' + group.id + '"><table class="contact"><caption>' + group.id + '</caption><tbody>' + group.questions.map(q => '<tr><td>' + q.id + '<br>' + R.esc(q.reasoning?.model || q.topic) + '<br>Key: ' + 'ABCDE'[q.answer] + '</td>' + [...q.sequence, ...q.options].map((f, i) => '<td class="' + (i === q.sequence.length ? 'separator ' : '') + (i === q.sequence.length + q.answer ? 'key' : '') + '">' + R.figureSVG(f, q.id + ' ' + (i < q.sequence.length ? 'frame ' + (i + 1) : 'option ' + 'ABCDE'[i - q.sequence.length])) + '</td>').join('') + '</tr>').join('') + '</tbody></table></section>').join('');
 }, groups);
 const out = path.join(root, 'test-results/abstract-contact-sheets'); fs.mkdirSync(out, { recursive: true });
 const durable = path.join(root, 'docs/research/abstract/contact-sheets.html'); fs.writeFileSync(durable, await page.content());
 for (const theme of ['light', 'dark']) {
  await page.evaluate(theme => document.documentElement.setAttribute('data-theme', theme), theme);
  for (const group of groups) await page.locator('#' + group.id).screenshot({ path: path.join(out, group.id + '-' + theme + '.png') });
 }
 console.log('Contact sheets:', durable, '; ' + groups.length * 2 + ' PNGs in', out);
} finally { await browser.close(); }
