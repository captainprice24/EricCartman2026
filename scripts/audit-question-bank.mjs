// Whole-bank structural inventory plus exact raster comparisons using the actual SVG renderer.
// This is not a substitute for a human semantic/difficulty review.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { verbalSetStats, abstractBlind } from './lib/blind.mjs';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const box = { window: {} }; vm.createContext(box);
for (const name of ['registry.js', 'manifest.js']) vm.runInContext(fs.readFileSync(path.join(root, 'questions', name), 'utf8'), box);
box.EPSO_BANK = box.window.EPSO_BANK;
for (const name of box.window.EPSO_SET_FILES) vm.runInContext(fs.readFileSync(path.join(root, 'questions', name), 'utf8'), box);
const sets = Array.from(box.EPSO_BANK.sets), questions = sets.flatMap(s => Array.from(s.questions, q => ({ ...q, section: s.section, set: s.id })));
const sections = Object.fromEntries(['verbal', 'numerical', 'abstract'].map(section => {
 const items = questions.filter(q => q.section === section);
 return [section, { sets: sets.filter(s => s.section === section).length, items: items.length,
  difficulty: Object.fromEntries([1, 2, 3].map(d => [d, items.filter(q => q.difficulty === d).length])),
  challengeItems: items.filter(q => q.challenge).length }];
}));
const numerical = questions.filter(q => q.section === 'numerical');
const fillers = numerical.map(q => ({ id: q.id, fillers: q.optionNotes.filter(n => /not derived from a typical mistake/i.test(n)).length })).filter(q => q.fillers);
const displayRounding = [], allExhibits = numerical.flatMap(q => Array.from(q.exhibits || (q.exhibit ? [q.exhibit] : []), ex => ({ id: q.id, ex })));
for (const { id, ex } of allExhibits) {
 const values = ex.type === 'table' ? [] : ex.type === 'pie' ? ex.slices.map(s => s.value) : ex.series.flatMap(s => Array.from(s.values));
 for (const value of values) if (Math.abs(value - Number(value.toFixed(2))) > 1e-9) displayRounding.push({ id, type: ex.type, value });
}
const verbalSample = [...new Set(sets.filter(s => s.section === 'verbal').flatMap(s => s.challenge ? [s.questions[0].id] : [s.questions[0].id, (s.questions.find(q => q.difficulty === 3) || s.questions.at(-1)).id]))];
const evidence = {
 auditedCommit: execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim(),
 sections, total: questions.length, numericalDisplayPrecision: { exhibits: allExhibits.length, valuesLosingMoreThanTwoDecimals: displayRounding },
 numericalGenericDistractors: { items: fillers.length, distractors: fillers.reduce((sum, q) => sum + q.fillers, 0), inventory: fillers },
 verbalSetCues: sets.filter(s => s.section === 'verbal').map(s => ({ set: s.id, ...verbalSetStats(s.questions) })),
 abstractSetCues: sets.filter(s => s.section === 'abstract').map(s => ({ set: s.id, ...Object.fromEntries(['medoid', 'outlier', 'majority'].map(k => [k, s.questions.reduce((sum, q) => sum + abstractBlind(q.options, q.answer)[k], 0) / s.questions.length])) })),
 verbalSemanticSample: { ids: verbalSample, method: 'Author review sample of passages, options and notes; not an independent blind review of the complete verbal bank.' },
 verificationCoverage: { numericalIndependentKeys: 190, abstractIndependentChallengeKeys: 40, verbalArchivedBlindKeys: 40, verbalArchivedBlindLabels: 120,
  legacyAbstractSemanticKeysNotNewlyResolved: 150, legacyVerbalItemsWithoutNewCompleteBlindReview: 200 }
};
const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
try {
 const p = await browser.newPage(); await p.goto((process.env.E2E_BASE_URL || 'http://127.0.0.1:8000') + '/dist/ad5-reasoning-trainer.html');
 evidence.abstractRaster = await p.evaluate(async () => {
  const qs = window.EPSO_APP.bank.bySection.abstract, canvas = document.createElement('canvas'); canvas.width = 100; canvas.height = 100;
  const context = canvas.getContext('2d'), duplicateOptions = [], keyRepeatsStimulus = [];
  async function raster(fig) {
   const svg = window.EPSO_RENDER.figureSVG(fig, 'audit').replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" ')
    .replace('><', '><style>.fig *{stroke:#15203b;stroke-width:2.2;stroke-linejoin:round}.f-black{fill:#15203b}.f-grey{fill:#9aa3b6}.f-white{fill:#fff}.f-none{fill:none}.f-line{fill:none;stroke-width:3}</style><');
   const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
   try {
    const image = new Image(); await new Promise((resolve, reject) => { image.onload = resolve; image.onerror = reject; image.src = url; });
    context.fillStyle = '#fff'; context.fillRect(0, 0, 100, 100); context.drawImage(image, 0, 0, 100, 100);
    return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', context.getImageData(0, 0, 100, 100).data))).map(v => v.toString(16).padStart(2, '0')).join('');
   } finally { URL.revokeObjectURL(url); }
  }
  let figures = 0;
  for (const q of qs) {
   const seq = [], opts = [];
   for (const fig of q.sequence) { seq.push(await raster(fig)); figures++; }
   for (const fig of q.options) { opts.push(await raster(fig)); figures++; }
   if (new Set(opts).size !== opts.length) duplicateOptions.push({ id: q.id, hashes: opts });
   if (seq.includes(opts[q.answer])) keyRepeatsStimulus.push({ id: q.id, challenge: !!q.challenge });
  }
  return { questions: qs.length, figures, size: '100x100 light theme, actual SVG renderer', duplicateOptions, keyRepeatsStimulus,
   limits: 'Exact pixel equality at one resolution/theme; not perceptual similarity or proof of a unique human-interpretable rule.' };
 });
} finally { await browser.close(); }
fs.writeFileSync(path.join(root, 'docs/audit/question-bank-evidence.json'), JSON.stringify(evidence, null, 2) + '\n');
console.log(JSON.stringify({ sections, total: questions.length, numericalFillerItems: fillers.length, numericalFillers: evidence.numericalGenericDistractors.distractors,
 verbalSemanticSample: verbalSample, abstractRaster: evidence.abstractRaster }, null, 2));
