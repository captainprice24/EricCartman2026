// Original series with coupled rules. No external task content or runtime dependencies.
import fs from 'node:fs';
import path from 'node:path';
import { abstractBlind } from '../lib/blind.mjs';

const mod = (x, n = 8) => ((x % n) + n) % n;
const range = n => Array.from({ length: n }, (_, i) => i);
const FILLS = ['white', 'grey', 'black'];
const PLACES = ['top', 'upper-right', 'right', 'lower-right', 'bottom', 'lower-left', 'left', 'upper-left'];
const MODELS = ['alternating-orbit', 'accelerating-orbit', 'interleaved-orbits', 'colour-gated-orbit',
  'two-stage-gate', 'alternating-reflection', 'delayed-handoff', 'accelerating-relative-angle',
  'rotating-xor', 'rotated-union'];
const NEW_MODELS = ['two-frame-alternating', 'two-frame-accelerating', 'two-frame-interleaved', 'two-frame-colour-gate', 'dot-gated-handoff', 'two-frame-reflection', 'two-frame-arrow-handoff', 'interleaved-relative-angle', 'arrow-gated-xor', 'arrow-gated-union'];
const pos = i => [+(50 + 33 * Math.sin(i * Math.PI / 4)).toFixed(2), +(43 - 33 * Math.cos(i * Math.PI / 4)).toFixed(2)];
function orbit(s) {
  const out = range(8).map(i => { const [x, y] = pos(i); return { t: 'circle', x, y, r: 1.5, fill: 'white' }; });
  const [x, y] = pos(s.p);
  out.push({ t: 'circle', x, y, r: 6, fill: FILLS[s.f] }, { t: 'arrow', x: 50, y: 43, r: 15, rot: s.a * 45, fill: 'black' });
  for (let i = 0; i <= s.c; i++) out.push({ t: 'circle', x: 50 - s.c * 5 + i * 10, y: 94, r: 2.3, fill: 'black' });
  return out;
}
const rotMask = (mask, turns) => {
  for (let turn = 0; turn < mod(turns, 4); turn++) mask = ((mask & 1) << 1) | ((mask & 2) << 2) | ((mask & 8) >> 1) | ((mask & 4) >> 2);
  return mask;
};
function panels(s) {
  const out = [];
  [s.l, s.r, s.o].forEach((mask, panel) => {
    range(4).forEach(cell => out.push({ t: 'rect', x: 2 + panel * 33 + (cell % 2) * 15, y: 30 + Math.floor(cell / 2) * 15,
      w: 15, h: 15, fill: mask & (1 << cell) ? 'black' : 'white' }));
  });
  out.push({ t: 'arrow', x: 50, y: 82, r: 10, rot: s.k * 90, fill: 'black' });
  return out;
}

export function generateHardAbstract(root) {
  let seed = 20261019;
  const random = () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const pick = a => a[Math.floor(random() * a.length)];
  const integer = n => Math.floor(random() * n);
  const shuffle = a => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = integer(i + 1); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  const used = new Set();
  function source(model) {
    const fresh = NEW_MODELS.includes(model), original = model;
    if(fresh) model = ['alternating-orbit','accelerating-orbit','interleaved-orbits','colour-gated-orbit','two-stage-gate','alternating-reflection','delayed-handoff','accelerating-relative-angle','rotating-xor','rotated-union'][NEW_MODELS.indexOf(model)];
    const f0 = integer(3), fs = pick([1, -1]), c0 = integer(4), cs = pick([1, -1]);
    const p0 = integer(8), a0 = integer(8), offset = integer(8), first = pick([1, 2, 3, -1, -2, -3]);
    const second = pick([1, 2, 3, -1, -2, -3].filter(v => v !== first));
    const acceleration = pick([1, -1]), mirror = integer(8);
    const p = [p0], a = [a0];
    let description;
    if (model === 'rotating-xor' || model === 'rotated-union') {
      const left = 1 << integer(4), right = pick([3, 5, 10, 12]), ls = pick([1, -1]), rs = -ls, turn = pick([1, -1]), ks = pick([1, -1]);
      const rows = range(7).map(i => {
        const l = rotMask(left, ls * i * (i + 1) / 2), r = rotMask(right, rs * i);
        return { l, r, o: fresh ? (model === 'rotating-xor' ? rotMask(l, mod(a0 + ks * i, 4)) ^ r : rotMask(l, mod(a0 + ks * i, 4)) | r) : model === 'rotating-xor' ? l ^ r : rotMask(l, turn) | r, k: mod(a0 + ks * i, 4) };
      });
      const dir = v => v > 0 ? 'clockwise' : 'anticlockwise';
      description = [`The left mini-grid turns ${dir(ls)} by 90°, then 180°, then 270°, then 360° (a full turn), then 90° again; the turn increases by 90° each time modulo a full turn`, `the middle mini-grid turns 90° ${dir(rs)} each frame`,
        fresh ? `rotate the left grid by the bottom arrow's angle in THAT frame, then ${model === 'rotating-xor' ? 'exclusive-or' : 'union'} it with the middle grid to obtain the right grid` : model === 'rotating-xor' ? 'in each frame the right mini-grid is black exactly where one, but not both, of the first two grids is black (exclusive-or)' : `in each frame first turn the left grid 90° ${dir(turn)}, then combine its black cells with those of the middle grid: a cell in the right grid is black if either input is black`,
        `the bottom arrow turns 90° ${dir(ks)} each frame`];
      return { rows, draw: panels, tracks: ['l', 'r', 'o', 'k'], domains: [range(16), range(16), range(16), range(4)], description,
        names: { l: 'left mini-grid', r: 'middle mini-grid', o: 'right mini-grid', k: 'bottom arrow' }, layout: 'binary-panels' };
    }
    for (let i = 0; i < 6; i++) {
      const colour = mod(f0 + fs * i, 3);
      switch (model) {
        case 'alternating-orbit': p.push(mod(p[i] + (i % 2 ? second : first))); a.push(mod(p[i] + offset)); break;
        case 'accelerating-orbit': p.push(mod(p[i] + first + acceleration * i)); a.push(mod(p[i] + offset)); break;
        case 'interleaved-orbits': p.push(i === 0 ? mod(p0 + second) : mod(p[i - 1] + (i % 2 ? first : second))); a.push(mod(p[i] + offset)); break;
        case 'colour-gated-orbit': p.push(mod(p[i] + (colour === 0 ? first : second))); a.push(mod(p[i] + offset)); break;
        case 'two-stage-gate': a.push(mod(a[i] + (colour === 0 ? first : second))); p.push(mod(p[i] + (a[i] % 2 === 0 ? first : second))); break;
        case 'alternating-reflection': p.push(i % 2 ? mod(mirror - p[i]) : mod(p[i] + first)); a.push(mod(p[i] + offset)); break;
        case 'delayed-handoff': a.push(mod(a[i] + (i % 2 ? second : first))); p.push(mod(a[i] + offset)); break;
        case 'accelerating-relative-angle': p.push(mod(p[i] + first)); a.push(mod(p[i + 1] + a0 - p0 + second * (i + 1) + acceleration * (i + 1) * i / 2)); break;
        default: throw Error(model);
      }
    }
    if (fresh) {
      if(original === 'interleaved-relative-angle'){
        for(let j=1;j<7;j++) p[j]=mod(p[j-1]+first+acceleration*(j-1));
        const rel=[mod(a0-p0),mod(a0-p0+offset)];
        for(let j=2;j<7;j++) rel[j]=mod(rel[j-2]+(j%2 ? second : first));
        for(let j=0;j<7;j++) a[j]=mod(p[j]+rel[j]);
      } else if(original === 'dot-gated-handoff'){
        for(let j=0;j<6;j++){ a[j+1]=mod(a[j]+(mod(c0+cs*j,4)%2 ? first : second)); p[j+1]=mod(p[j]+(a[j]%2 ? first : second)); }
      } else if(original === 'two-frame-arrow-handoff') {
        p[1]=mod(p0+second); for(let j=2;j<7;j++) p[j]=mod(a[j-2]+offset);
      } else { a[1]=mod(a0+second); for(let j=2;j<7;j++) a[j]=mod(p[j-2]+offset); }
    }
    if (new Set(p.slice(0, 6)).size < 4 || new Set(a.slice(0, 6)).size < 3) return null;
    const stride = v => `${Math.abs(v)} place${Math.abs(v) === 1 ? '' : 's'} ${v > 0 ? 'clockwise' : 'anticlockwise'}`;
    const lag = `from frame 2 onward the arrow points ${offset === 0 ? 'towards the previous marker position' : `${offset * 45}° clockwise from the previous marker position`}`;
    const rules = {
      'alternating-orbit': [`the marker alternates moves of ${stride(first)} and ${stride(second)}, beginning with the first move between frames 1 and 2`, lag],
      'accelerating-orbit': [`the marker's signed clockwise moves are ${range(6).map(i => first + acceleration * i).join(', ')} places; add ${acceleration} to the signed move each time (negative means anticlockwise)`, lag],
      'interleaved-orbits': [`read odd and even frames separately: the marker moves ${stride(first)} between consecutive odd frames and ${stride(second)} between consecutive even frames`, lag],
      'colour-gated-orbit': [`use the marker's colour BEFORE a move: white means ${stride(first)}; grey or black means ${stride(second)}`, lag],
      'two-stage-gate': [`use the marker's colour BEFORE a move: white turns the arrow ${stride(first)} (45° per place); grey or black turns it ${stride(second)}`, `use the arrow BEFORE that move: if it points along a cardinal direction the marker moves ${stride(first)}; if diagonal the marker moves ${stride(second)}`],
      'alternating-reflection': [`marker moves alternate: ${stride(first)}, then reflect position p to (${mirror} − p) modulo 8; number the ring clockwise from 0 at the top`, lag],
      'delayed-handoff': [`the arrow alternates turns of ${first * 45}° and ${second * 45}° clockwise (negative means anticlockwise)`, `from frame 2 onward the marker is ${offset * 45}° clockwise from the PREVIOUS arrow direction`],
      'accelerating-relative-angle': [`the marker moves ${stride(first)} each frame`, `measure the arrow clockwise relative to the marker: its signed changes are ${range(6).map(i => (second + acceleration * i) * 45).join(', ')} degrees; the increment changes by ${acceleration * 45}° each time`]
    };
    if(fresh){
      if(original === 'interleaved-relative-angle') rules[model]=[`marker signed moves start at ${first} and increase by ${acceleration} each frame, modulo eight places`, `measure arrow angle relative to marker: odd-frame offsets move ${first*45}° and even-frame offsets move ${second*45}°, with the two subsequences read separately`];
      else if(original === 'dot-gated-handoff') rules[model]=[`before each move an even bottom-dot count turns the arrow ${first*45}°, while an odd count turns it ${second*45}°`, `before each move a diagonal arrow moves the marker ${stride(first)}; a cardinal arrow moves it ${stride(second)}`];
      else rules[model][1]=original === 'two-frame-arrow-handoff' ? `from frame 3 the marker is ${offset*45}° clockwise from the arrow TWO frames earlier` : `from frame 3 the arrow points ${offset*45}° clockwise from the marker TWO frames earlier`;
    }
    description = [...rules[model], `the marker colour cycles ${range(3).map(i => FILLS[mod(f0 + fs * i, 3)]).join(' → ')} and repeats`,
      `the bottom dots cycle ${range(4).map(i => mod(c0 + cs * i, 4) + 1).join(' → ')} and repeat`];
    return { rows: range(7).map(i => ({ p: p[i], a: a[i], f: mod(f0 + fs * i, 3), c: mod(c0 + cs * i, 4) })), draw: orbit,
      tracks: ['p', 'a', 'f', 'c'], domains: [range(8), range(8), range(3), range(4)], description,
      names: { p: 'marker position', a: 'arrow direction', f: 'marker colour', c: 'number of bottom dots' }, layout: 'coupled-orbit' };
  }
  function build(model, target) {
    const spec = source(model); if (!spec) return null;
    const { rows, draw, tracks, domains, names } = spec, key = rows[6];
    const signature = JSON.stringify(rows.slice(0, 6).map(draw));
    if (used.has(signature)) return null;
    const atom = [];
    tracks.forEach((track, ti) => domains[ti].filter(v => v !== key[track]).forEach(v => atom.push({ [track]: v })));
    const pool = atom.slice();
    for (const x of atom) for (const y of atom) if (tracks.indexOf(Object.keys(x)[0]) < tracks.indexOf(Object.keys(y)[0])) pool.push({ ...x, ...y });
    const keyFig = draw(key);
    for (let attempt = 0; attempt < 2500; attempt++) {
      const changes = shuffle(pool).slice(0, 4), states = changes.map(c => ({ ...key, ...c }));
      if (new Set(states.map(s => JSON.stringify(s))).size !== 4) continue;
      const doubles = changes.filter(c => Object.keys(c).length === 2).length;
      if (doubles < 1 || doubles > 3) continue;
      // Every track has both a wrong reading and a distractor agreeing with the key.
      if (tracks.some(k => !changes.some(c => k in c) || !changes.some(c => !(k in c)))) continue;
      if (!changes.some((c, i) => changes.some((d, j) => j > i && Object.keys(c).some(k => k in d && c[k] === d[k])))) continue;
      // Easy supporting cycles cannot identify the key without a substantive relationship.
      const support = spec.layout === 'binary-panels' ? ['l', 'r', 'k'] : ['f', 'c'];
      if (!states.some(s => support.every(k => s[k] === key[k]))) continue;
      const figures = [keyFig, ...states.map(draw)], b = abstractBlind(figures, 0);
      const rank = 1 + b.sums.slice(1).filter(s => s < b.sums[0] - 1e-9).length;
      if (rank !== target || (target !== 1 && (b.medoid > 0 || b.majority > 0)) || (target !== 5 && b.outlier > 0)) continue;
      const value = (k, v) => spec.layout === 'binary-panels' ? k === 'k' ? `${v * 90}° clockwise from up` : `[${range(4).map(i => v & (1 << i) ? 'black' : 'white').join(', ')}] in reading order` : k === 'p' ? PLACES[v] : k === 'a' ? `${v * 45}° clockwise from up` : k === 'f' ? FILLS[v] : String(v + 1);
      used.add(signature);
      return {
        topic: spec.layout === 'coupled-orbit' ? 'Coupled orbit and conditional transformations' : 'Rotating binary panels and composition',
        difficulty: 3, rules: 4, challenge: true, reasoning: { model, layout: spec.layout, dependency: spec.description.slice(0, 2).join('; ') },
        stem: 'Which figure comes next in the series?', sequence: rows.slice(0, 6).map(draw),
        options: figures, answer: 0,
        hints: [spec.layout === 'coupled-orbit' ? 'Separate position, direction, colour and dot count. Check whether a move depends on a different element or the previous frame.' : 'Track each mini-grid separately. Then compare corresponding cells across the three grids within a frame; also follow the bottom arrow.',
          spec.description[0] + '. ' + spec.description[1] + '.', 'Predict all four features before choosing. Matching only one feature leaves several options.'],
        optionNotes: ['Correct: all four relationships continue, including the dependency between elements.', ...changes.map(c => 'Wrong: ' + Object.keys(c).map(k => `${names[k]} is ${value(k, c[k])}; it should be ${value(k, key[k])}`).join('; ') + '.')],
        explanation: 'Four relationships apply: ' + spec.description.join('; ') + '. Infer from every displayed frame; do not choose from option similarity alone.'
      };
    }
    return null;
  }
  for (let set = 5; set <= 11; set++) {
    const id = String(set).padStart(2, '0'), targets = [...shuffle([1, 2, 3, 4, 1, 2, 3, 4]), 2, 2];
    const questions = (set < 9 ? MODELS : NEW_MODELS).map((model, i) => {
      let item;
      for (let attempt = 0; attempt < 400 && !item; attempt++) item = build(model, targets[i]);
      if (!item) throw Error(`Unable to generate ${model} at rank ${targets[i]}`);
      const answer = (i * 2 + set) % 5, opts = item.options.slice(1), notes = item.optionNotes.slice(1);
      opts.splice(answer, 0, item.options[0]); notes.splice(answer, 0, item.optionNotes[0]);
      return { id: `a${id}-${String(i + 1).padStart(2, '0')}`, ...item, options: opts, optionNotes: notes, answer };
    });
    const data = { id: 'abstract-' + id, section: 'abstract', title: `Abstract reasoning · Very hard ${set - 4}`, description: '10 original series: conditional, alternating, delayed and compositional relationships. Editorial Hard; learner calibration pending.', version: 1, challenge: true, questions };
    fs.writeFileSync(path.join(root, `questions/abstract/abstract-set-${id}.js`), '/* Generated by scripts/generators/abstract-hard.mjs; edit the generator. */\nEPSO_BANK.registerSet(' + JSON.stringify(data, null, 2) + ');\n');
    console.log(data.id, '10 challenge items', Object.fromEntries(['medoid', 'outlier', 'majority'].map(k => [k, questions.reduce((sum, q) => sum + abstractBlind(q.options, q.answer)[k], 0) / 10])));
  }
}
