// Independent from the generator: read displayed shapes, fit a bounded rule grammar, predict next state.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { abstractBlind } from '../scripts/lib/blind.mjs';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const bank = [];
const context = vm.createContext({ EPSO_BANK: { registerSet: s => bank.push(s) } });
for (const file of fs.readdirSync(path.join(root, 'questions/abstract'))) vm.runInContext(fs.readFileSync(path.join(root, 'questions/abstract', file), 'utf8'), context);
const sets = bank.filter(s => s.challenge);
const mod = (v, n = 8) => (v % n + n) % n;
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
export function decode(fig) {
  const arrow = fig.find(s => s.t === 'arrow');
  const cells = fig.filter(s => s.t === 'rect' && s.w === 15 && s.h === 15);
  if (cells.length) {
    const masks = [0, 0, 0];
    for (const cell of cells) {
      const panel = Math.floor((cell.x - 2) / 33);
      const index = Math.round((cell.x - 2 - panel * 33) / 15) + 2 * Math.round((cell.y - 30) / 15);
      if (cell.fill === 'black') masks[panel] += 2 ** index;
    }
    return { l: masks[0], r: masks[1], o: masks[2], k: mod(arrow.rot / 90, 4) };
  }
  const marker = fig.find(s => s.t === 'circle' && s.r === 6);
  assert.ok(marker && arrow, 'recognisable visible marker and arrow');
  const p = mod(Math.round(Math.atan2(marker.x - 50, 43 - marker.y) * 4 / Math.PI));
  return { p, a: mod(arrow.rot / 45), f: ['white', 'grey', 'black'].indexOf(marker.fill), c: fig.filter(s => s.t === 'circle' && s.r === 2.3).length - 1 };
}
function linear(values, n = 8) {
  const delta = mod(values[1] - values[0], n);
  return values.every((v, i) => i === 0 || mod(v - values[i - 1], n) === delta) ? mod(values.at(-1) + delta, n) : null;
}
function alternating(values) {
  const deltas = values.slice(1).map((v, i) => mod(v - values[i]));
  return deltas.every((d, i) => d === deltas[i % 2]) ? mod(values.at(-1) + deltas[deltas.length % 2]) : null;
}
function accelerating(values) {
  const deltas = values.slice(1).map((v, i) => mod(v - values[i]));
  const next = linear(deltas);
  return next === null ? null : mod(values.at(-1) + next);
}
function interleaved(values) {
  const odd = values.filter((_, i) => i % 2 === 0), even = values.filter((_, i) => i % 2 === 1);
  const nextOdd = linear(odd), nextEven = linear(even);
  return nextOdd === null || nextEven === null ? null : values.length % 2 ? nextEven : nextOdd;
}
function reflection(values) {
  const step = mod(values[1] - values[0]), axis = mod(values[1] + values[2]);
  if (!values.slice(1).every((v, i) => v === (i % 2 ? mod(axis - values[i]) : mod(values[i] + step)))) return null;
  return (values.length - 1) % 2 ? mod(axis - values.at(-1)) : mod(values.at(-1) + step);
}
function lag(target, driver) {
  const offset = mod(target[1] - driver[0]);
  return target.slice(1).every((v, i) => mod(v - driver[i]) === offset) ? mod(driver.at(-1) + offset) : null;
}
function gated(values, gates) {
  const mapping = new Map();
  for (let i = 0; i < values.length - 1; i++) {
    const delta = mod(values[i + 1] - values[i]), gate = gates[i];
    if (mapping.has(gate) && mapping.get(gate) !== delta) return null;
    mapping.set(gate, delta);
  }
  return mapping.size === 2 && mapping.has(gates.at(-1)) ? mod(values.at(-1) + mapping.get(gates.at(-1))) : null;
}
// Separate coordinate rotation (no generator bit-shift implementation).
function rotate(mask, turns) {
  const cells = Array.from({ length: 4 }, (_, i) => (mask >> i) & 1);
  let grid = [cells.slice(0, 2), cells.slice(2)];
  for (let i = 0; i < mod(turns, 4); i++) grid = [[grid[1][0], grid[0][0]], [grid[1][1], grid[0][1]]];
  return grid.flat().reduce((total, v, i) => total + v * 2 ** i, 0);
}
export function predictions(rows) {
  const out = [];
  if ('p' in rows[0]) {
    const p = rows.map(s => s.p), a = rows.map(s => s.a), f = rows.map(s => s.f), c = rows.map(s => s.c);
    const nextF = linear(f, 3), nextC = linear(c, 4), nextA = lag(a, p), nextP = lag(p, a);
    if (nextF === null || nextC === null) return [];
    const add = (p, a) => { if (p !== null && a !== null) out.push({ p, a, f: nextF, c: nextC }); };
    [alternating(p), accelerating(p), interleaved(p), gated(p, f.map(v => v === 0 ? 0 : 1)), reflection(p)].forEach(v => add(v, nextA));
    add(nextP, alternating(a));
    add(gated(p, a.map(v => v % 2)), gated(a, f.map(v => v === 0 ? 0 : 1)));
    const linearP = linear(p), relative = accelerating(a.map((v, i) => mod(v - p[i])));
    if (linearP !== null && relative !== null) add(linearP, mod(linearP + relative));
  } else {
    const next = key => {
      const candidates = [];
      for (const step of [1, 3]) for (const acceleration of [false, true]) {
        if (rows.slice(1).every((s, i) => s[key] === rotate(rows[i][key], step * (acceleration ? i + 1 : 1)))) {
          candidates.push(rotate(rows.at(-1)[key], step * (acceleration ? rows.length : 1)));
        }
      }
      return [...new Set(candidates)];
    };
    const marker = linear(rows.map(s => s.k), 4);
    for (const l of next('l')) for (const r of next('r')) {
      for (const turn of [0, 1, 3]) for (const operation of ['xor', 'union', 'intersection']) {
        const combine = (x, y) => operation === 'xor' ? x ^ y : operation === 'union' ? x | y : x & y;
        if (rows.every(s => s.o === combine(rotate(s.l, turn), s.r))) out.push({ l, r, o: combine(rotate(l, turn), r), k: marker });
      }
    }
  }
  return [...new Map(out.map(s => [JSON.stringify(s), s])).values()];
}

test('every challenge answer follows independently inferred rules from the displayed figures', () => {
  assert.equal(sets.length, 4);
  for (const set of sets) for (const q of set.questions) {
    const expected = predictions(q.sequence.map(decode));
    assert.equal(expected.length, 1, q.id + ' has a single continuation in the bounded rule grammar: ' + JSON.stringify(expected));
    const matches = Array.from(q.options, (f, i) => same(decode(f), expected[0]) ? i : -1).filter(i => i >= 0);
    assert.deepEqual(matches, [q.answer], q.id + ' key');
  }
});
test('four abstract rounds have balanced keys, different models and no single-feature answer shortcut', () => {
  const signatures = new Set();
  for (const set of sets) {
    assert.equal(set.questions.length, 10);
    assert.equal(new Set(set.questions.map(q => q.reasoning.model)).size, 10);
    for (let key = 0; key < 5; key++) assert.equal(set.questions.filter(q => q.answer === key).length, 2);
    for (const strategy of ['medoid', 'outlier', 'majority']) assert.ok(set.questions.reduce((sum, q) => sum + abstractBlind(q.options, q.answer)[strategy], 0) / 10 <= .3, set.id + ' ' + strategy);
    for (const q of set.questions) {
      assert.equal(q.difficulty, 3); assert.equal(q.rules, 4); assert.equal(q.sequence.length, 6);
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
