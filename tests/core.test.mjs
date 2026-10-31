// Unit tests for assets/core.js. Run: node --test tests/
import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const C = require("../assets/core.js");

test("calcEval: precedence, parentheses and unary minus", () => {
  assert.equal(C.calcEval("2+3×4"), 14);
  assert.equal(C.calcEval("(2+3)×4"), 20);
  assert.equal(C.calcEval("−5+2"), -3);
  assert.equal(C.calcEval("10÷4"), 2.5);
  assert.equal(C.calcEval("3×−2"), -6);
  assert.equal(C.calcEval("500÷0.85×0.96"), 564.705882353);
});

test("calcEval: TAO basic keys — power and square root, no percent key", () => {
  assert.equal(C.calcEval("2^10"), 1024);
  assert.equal(C.calcEval("2^3^2"), 512, "power is right-associative");
  assert.equal(C.calcEval("−2^2"), -4);
  assert.equal(C.calcEval("1.05^3"), 1.157625);
  assert.equal(C.calcEval("√16+2"), 6);
  assert.equal(C.calcEval("√(9×4)"), 6);
  assert.equal(C.calcEval("200×15÷100"), 30);
  assert.throws(() => C.calcEval("200×15%"));
  assert.throws(() => C.calcEval("√−4"));
});

test("calcEval: accepts a trailing decimal point and a leading one", () => {
  assert.equal(C.calcEval("5.+1"), 6);
  assert.equal(C.calcEval(".5×4"), 2);
});

test("calcEval: rejects malformed input", () => {
  for (const bad of ["", "2+", "(2+3", "2+3)", "abc", "4÷0"]) assert.throws(() => C.calcEval(bad), bad);
});

const sec = (answers, checked, keys) => ({
  items: keys.map((a, i) => ({ q: { id: "q" + i, answer: a } })),
  answers, checked
});

test("sectionScore: exam counts every answer", () => {
  const s = sec({ q0: 1, q1: 0, q2: 2 }, {}, [1, 1, 2]);
  assert.deepEqual(C.sectionScore(s, "exam"), { correct: 2, total: 3, answered: 3, counted: 3 });
});

test("sectionScore: practice ignores answers that were never checked (W5)", () => {
  const s = sec({ q0: 1, q1: 1 }, { q1: true }, [1, 1, 1]);
  const r = C.sectionScore(s, "practice");
  assert.equal(r.correct, 1);
  assert.equal(r.counted, 1);
});

test("examVerdict: verbal gate and combined numerical + abstract gate", () => {
  const v = C.examVerdict({ verbal: { correct: 10, total: 20 }, numerical: { correct: 3, total: 10 }, abstract: { correct: 6, total: 10 } });
  assert.equal(v.length, 2);
  assert.equal(v[0].pass, true);
  assert.equal(v[1].correct, 9);
  assert.equal(v[1].pass, false);
});

test("examVerdict: partial scopes scale the pass mark", () => {
  const v = C.examVerdict({ abstract: { correct: 5, total: 10 } });
  assert.equal(v.length, 1);
  assert.equal(v[0].label, "Abstract reasoning");
  assert.equal(v[0].need, 5);
  assert.equal(v[0].pass, true);
  assert.equal(C.examVerdict({ verbal: { correct: 9, total: 20 } })[0].pass, false);
});

const pool = (n) => Array.from({ length: n }, (_, i) => ({ id: "p" + i, difficulty: (i % 4) === 0 ? 1 : (i % 4) === 3 ? 3 : 2 }));
const rng = (() => { let s = 42; return () => ((s = (s * 16807) % 2147483647) / 2147483647); });

test("drawExam: draws unseen questions first and reports repeats (E7)", () => {
  const p = pool(30);
  const stats = {};
  p.slice(0, 15).forEach((q) => (stats[q.id] = { seen: 1, at: 1 }));
  const r = C.drawExam(p, 10, stats, rng());
  assert.equal(r.items.length, 10);
  assert.equal(r.repeats, 0);
  assert.ok(r.items.every((q) => !stats[q.id]));
});

test("drawExam: falls back to least recently seen when unseen run out", () => {
  const p = pool(12);
  const stats = {};
  p.slice(0, 8).forEach((q, i) => (stats[q.id] = { seen: 1, at: 100 + i }));
  const r = C.drawExam(p, 10, stats, rng());
  assert.equal(r.items.length, 10);
  assert.equal(r.repeats, 6);
  const ids = r.items.map((q) => q.id);
  assert.ok(ids.includes("p0") && ids.includes("p1"), "oldest seen items are reused first");
});

test("drawExam: aims for a 25/50/25 difficulty mix", () => {
  const r = C.drawExam(pool(80), 20, {}, rng());
  const n = (d) => r.items.filter((q) => q.difficulty === d).length;
  assert.deepEqual([n(1), n(2), n(3)], [5, 10, 5]);
});

test("freshSimulationsLeft counts complete unseen draws", () => {
  const by = { verbal: pool(45), numerical: pool(25), abstract: pool(31) };
  assert.equal(C.freshSimulationsLeft(by, {}), 2);
});

test("items only displayed (never answered) count as seen (N6)", () => {
  const p = pool(20);
  const stats = {};
  p.slice(0, 10).forEach((q) => (stats[q.id] = { seen: 0, correct: 0, shown: 5, at: 5 }));
  assert.equal(C.isSeen(stats.p0), true);
  assert.equal(C.isSeen({ seen: 0, correct: 0 }), false);
  const r = C.drawExam(p, 10, stats, rng());
  assert.equal(r.repeats, 0);
  assert.ok(r.items.every((q) => !stats[q.id]), "displayed items are not served as fresh");
  assert.equal(C.freshSimulationsLeft({ verbal: pool(40), numerical: p, abstract: p }, stats), 1);
});

test("timer: remaining time comes from the deadline, not from ticks (W2)", () => {
  const s = { startedAt: 1000, deadline: 1000 + 35 * 60000, limitMs: 35 * 60000, usedMs: null };
  assert.equal(C.remainingMs(s, 1000 + 60000), 34 * 60000);
  // A tab throttled or asleep for 40 minutes still runs out on time.
  assert.equal(C.remainingMs(s, 1000 + 40 * 60000), 0);
  assert.equal(C.elapsedMs(s, 1000 + 40 * 60000), 35 * 60000);
  assert.equal(C.remainingMs({ startedAt: 1, deadline: null }, 5), null);
});

test("highlighter ranges merge and split paragraphs into segments (W6)", () => {
  let r = C.addRange([], 0, 5, 10);
  r = C.addRange(r, 0, 8, 15);
  r = C.addRange(r, 1, 0, 4);
  assert.deepEqual(r, [{ p: 0, s: 5, e: 15 }, { p: 1, s: 0, e: 4 }]);
  const segs = C.segments("Hello brave new world", r, 0);
  assert.deepEqual(segs.map((x) => [x.text, x.mark]), [["Hello", false], [" brave new", true], [" world", false]]);
  assert.deepEqual(C.addRange([], 0, 4, 4), []);
});

test("tr picks the requested language with English fallback (E9)", () => {
  assert.equal(C.tr({ en: "Hello", fr: "Bonjour" }, "fr"), "Bonjour");
  assert.equal(C.tr({ en: "Hello" }, "de"), "Hello");
  assert.equal(C.tr("Plain", "fr"), "Plain");
});

test('calculator chains its own scientific results and rejects malformed or unbounded notation', () => {
  const tiny = C.calcEval('1/10000000');
  assert.equal(C.calcEval(String(tiny) + '*2'), 2e-7);
  assert.equal(C.calcEval(String(C.calcEval('10^22')) + '/2'), 5e21);
  assert.equal(C.calcEval('2e-3^2'), 0.000004);
  for (const input of ['1e', '1e+', '1e--2', '1ee2', '1e309', '1e2.3', '2'.repeat(257)]) assert.throws(() => C.calcEval(input), input);
});

test('saved data recovery keeps valid records and rejects wrong containers', () => {
  const h = { at: 100, mode: 'practice', pass: null, sections: [{key:'verbal',correct:1,total:5,counted:1,hints:0,usedSec:10,limitSec:null,repeats:0}] };
  assert.deepEqual(C.cleanStored('history', [h, null, {sections:[{}]}, {...h,sections:[{...h.sections[0],key:'__proto__'}]}]), {value:[h],changed:true});
  for (const value of [null, [], 42, 'bad']) assert.deepEqual(C.cleanStored('prefs', value), {value:{},changed:true});
  const st = {seen:2,correct:1,last:false,shown:100,at:100};
  assert.deepEqual(C.cleanStored('stats', {good:st,bad:{seen:-1,correct:99}}), {value:{good:st},changed:true});
});

const savedRound = () => ({v:1,mode:'practice',si:0,qi:0,started:100,notes:[],view:'session',sections:[{
  key:'verbal',ids:['v-test'],orders:[[1,0,2,3]],answers:{'v-test':1},flags:{},elim:{},hints:{},checked:{},hl:{},warned:{},scratch:'notes',limitMs:1000,startedAt:100,deadline:1100,usedMs:null,done:false,timedOut:false,repeats:0
}]});
const restoreBank = {'v-test':{id:'v-test',section:'verbal',options:['a','b','c','d'],hints:['h']}};
test('saved session accepts a complete round and rejects malformed indices, maps, orders and retired IDs', () => {
  assert.equal(C.validSession(savedRound(), restoreBank), true);
  for (const alter of [d=>d.sections=[{}],d=>d.qi=-1,d=>d.qi=1,d=>d.si=4,d=>d.mode='other',d=>d.sections[0].ids=['retired'],d=>d.sections[0].orders=[[0,0,2,3]],d=>d.sections[0].answers['v-test']=4,d=>d.sections[0].hl={'v-test':[null]},d=>d.sections[0].checked={'v-test':'yes'},d=>d.sections[0].deadline=999,d=>d.sections[0].hints={'v-test':99},d=>d.view='between']) {
    const d=savedRound();alter(d);assert.equal(C.validSession(d,restoreBank),false,JSON.stringify(d));
  }
  assert.equal(C.validSession(null,restoreBank),false);
});

test('practice answer state distinguishes unchecked choices from graded mistakes', () => {
  const it={q:{id:'q',answer:1}}, sec={answers:{q:0},checked:{}};
  assert.equal(C.answerState(sec,it,'practice'),'unchecked');
  assert.equal(C.answerState(sec,it,'exam'),'incorrect');
  sec.checked.q=true;assert.equal(C.answerState(sec,it,'coach'),'incorrect');
  sec.answers.q=1;assert.equal(C.answerState(sec,it,'practice'),'correct');
});

test('fixed-test metadata and visited states restore safely while older saved rounds remain compatible',()=>{
  assert.deepEqual(C.cleanStored('prefs',{examForm:'mock-13'}),{value:{examForm:'mock-13'},changed:false});
  assert.deepEqual(C.cleanStored('prefs',{examForm:{bad:true}}),{value:{},changed:true});
  const d=savedRound();d.formId='mock-13';d.sections[0].visited={'v-test':true};assert.equal(C.validSession(d,restoreBank),true);
  for(const visited of [[],{'retired':true},{'v-test':'yes'}]){d.sections[0].visited=visited;assert.equal(C.validSession(d,restoreBank),false);}
  delete d.sections[0].visited;assert.equal(C.validSession(d,restoreBank),true);d.formId={bad:true};assert.equal(C.validSession(d,restoreBank),false);
  const h={at:100,mode:'exam',formId:'mock-13',pass:false,sections:[{key:'verbal',correct:1,total:20,hints:0,usedSec:10,limitSec:2100,repeats:0}]};
  assert.deepEqual(C.cleanStored('history',[h,{...h,formId:{bad:true}}]),{value:[h],changed:true});
});

test('highlighter colours: same colour merges, a new colour replaces what it covers, the eraser cuts (ENV-10)', () => {
  let r = C.addRange([], 0, 5, 10, 0);
  r = C.addRange(r, 0, 8, 15, 0);
  assert.deepEqual(r, [{ p: 0, s: 5, e: 15, c: 0 }]);
  r = C.addRange(r, 0, 7, 9, 2);
  assert.deepEqual(r, [{ p: 0, s: 5, e: 7, c: 0 }, { p: 0, s: 7, e: 9, c: 2 }, { p: 0, s: 9, e: 15, c: 0 }]);
  assert.deepEqual(C.segments('0123456789abcdefgh', r, 0).map((x) => [x.text, x.mark, x.c]), [['01234', false, undefined], ['56', true, 0], ['78', true, 2], ['9abcde', true, 0], ['fgh', false, undefined]]);
  assert.deepEqual(C.removeRange(r, 0, 6, 12), [{ p: 0, s: 5, e: 6, c: 0 }, { p: 0, s: 12, e: 15, c: 0 }]);
  assert.deepEqual(C.removeRange(r, 1, 0, 99), r, 'other paragraphs untouched');
});

test('clock text follows the TAO format in the exam (ENV-07) and clear-entry edits the current number (ENV-03)', () => {
  assert.equal(C.clockText(34 * 60000 + 42000, 'tao'), '34min 42s');
  assert.equal(C.clockText(5000, 'tao'), '0min 05s');
  assert.equal(C.clockText(0, 'tao'), '0min 00s');
  assert.equal(C.clockText(59500), '1:00');
  assert.equal(C.calcClearEntry('12.5×4'), '12.5×');
  assert.equal(C.calcClearEntry('12.5×'), '12.5');
  assert.equal(C.calcClearEntry('2e-3'), '');
  assert.equal(C.calcClearEntry(''), '');
});

test('scratchpad model: validation, legacy text, hit testing, moving and the next text position (ENV-02)', () => {
  const items = [
    { t: 'path', pts: [[10, 10], [60, 10]] }, { t: 'line', x1: 0, y1: 100, x2: 100, y2: 100 },
    { t: 'rect', x: 200, y: 20, w: 50, h: 30 }, { t: 'ellipse', cx: 300, cy: 300, rx: 20, ry: 10 }, { t: 'text', x: 12, y: 200, text: 'a\nbb' }
  ];
  assert.equal(C.validScratch({ v: 2, items }), true);
  assert.equal(C.validScratch('plain notes'), true, 'older rounds saved plain text');
  for (const bad of [{ v: 1, items }, { v: 2, items: [{ t: 'blob' }] }, { v: 2, items: [{ t: 'rect', x: 1, y: 1, w: -5, h: 1 }] }, { v: 2, items: [{ t: 'path', pts: [[1, 'x']] }] }, { v: 2, items: [{ t: 'text', x: 0, y: 0, text: 5 }] }, null, 42]) {
    assert.equal(C.validScratch(bad), false, JSON.stringify(bad));
  }
  assert.deepEqual(C.scratchNormalise('notes'), { v: 2, items: [{ t: 'text', x: 12, y: 24, text: 'notes' }] });
  assert.deepEqual(C.scratchNormalise(''), { v: 2, items: [] });
  assert.deepEqual(C.scratchNormalise({ v: 2, items: [{ t: 'blob' }] }), { v: 2, items: [] }, 'invalid data is dropped, not restored');
  assert.equal(C.scratchHit(items, 30, 12), 0, 'stroke within tolerance');
  assert.equal(C.scratchHit(items, 30, 30), -1);
  assert.equal(C.scratchHit(items, 50, 103), 1);
  assert.equal(C.scratchHit(items, 225, 35), 2, 'inside a box');
  assert.equal(C.scratchHit(items, 300, 300), 3);
  assert.equal(C.scratchHit(items, 20, 205), 4);
  assert.deepEqual(C.scratchMove(items[2], 5, -5), { t: 'rect', x: 205, y: 15, w: 50, h: 30 });
  assert.deepEqual(C.scratchMove(items[0], 1, 1), { t: 'path', pts: [[11, 11], [61, 11]] });
  assert.deepEqual(C.scratchNextTextPos([]), { x: 12, y: 24 });
  assert.ok(C.scratchNextTextPos(items).y > 300, 'below the lowest item');
});

test('saved sessions accept masks, drawn scratchpads, coloured highlights and an instruction countdown; prefs accept the tool settings', () => {
  const d = savedRound();
  d.instrDeadline = 5000; d.sections[0].mask = { 'v-test': { 2: true } }; d.sections[0].scratch = { v: 2, items: [{ t: 'line', x1: 0, y1: 0, x2: 5, y2: 5 }] }; d.sections[0].hl = { 'v-test': [{ p: 0, s: 1, e: 4, c: 2 }] };
  assert.equal(C.validSession(d, restoreBank), true);
  for (const alter of [x => x.instrDeadline = -1, x => x.sections[0].mask = { 'v-test': { 9: true } }, x => x.sections[0].scratch = { v: 2, items: [{ t: 'no' }] }, x => x.sections[0].hl = { 'v-test': [{ p: 0, s: 1, e: 4, c: 7 }] }]) {
    const e = savedRound(); alter(e); assert.equal(C.validSession(e, restoreBank), false);
  }
  const prefs = { examShortcuts: true, calcExtras: false, elimExam: true, maskExam: false, elimTrain: true, maskTrain: true, theme: 'contrast', zoom: 120, hlColor: 2, a11y: { font: 2, line: 0, word: 1, letter: 0, announce: true }, win: { calc: { x: 10, y: 20, w: 340, h: null }, scratch: { x: 0, y: 0, w: 460, h: 400 } } };
  assert.deepEqual(C.cleanStored('prefs', prefs), { value: prefs, changed: false });
  assert.deepEqual(C.cleanStored('prefs', { zoom: 999, hlColor: 5, a11y: { font: 99 }, win: { calc: { x: 'a' } }, theme: 'neon' }), { value: {}, changed: true });
});
