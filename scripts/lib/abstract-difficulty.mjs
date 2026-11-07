// Editorial reasoning rubric, independent of shape count or explanation length.
const FOUNDATION_TOPICS = new Set(['Single figure', 'Grid movement', 'Overlapping shapes', 'Divided circle', 'Rotating hands']);
export const ABSTRACT_CHALLENGE_MODELS = new Set(['alternating-orbit', 'accelerating-orbit', 'interleaved-orbits', 'colour-gated-orbit',
  'two-stage-gate', 'alternating-reflection', 'delayed-handoff', 'accelerating-relative-angle', 'rotating-xor', 'rotated-union', 'two-frame-alternating', 'two-frame-accelerating', 'two-frame-interleaved', 'two-frame-colour-gate', 'dot-gated-handoff', 'two-frame-reflection', 'two-frame-arrow-handoff', 'interleaved-relative-angle', 'arrow-gated-xor', 'arrow-gated-union']);
const wrap = v => ((v % 8) + 8) % 8;
// Simpler visible alternatives must be considered before crediting a dependency as necessary.
export function simpleCircularFits(values) {
  const fits = [], add = (model,next) => fits.push({model,next:wrap(next)});
  for (let period=1;period<=4;period++) if(values.every((v,i)=>i<period||v===values[i-period])) add('a '+period+'-frame cycle',values[values.length%period]);
  const delta=values.slice(1).map((v,i)=>wrap(v-values[i]));
  if(delta.every(v=>v===delta[0]))add('a fixed signed step',values.at(-1)+delta[0]);
  if(delta.every((v,i)=>v===delta[i%2]))add('alternating signed steps',values.at(-1)+delta[delta.length%2]);
  const acceleration=delta.slice(1).map((v,i)=>wrap(v-delta[i]));
  if(acceleration.every(v=>v===acceleration[0]))add('a steadily changing signed step',values.at(-1)+delta.at(-1)+acceleration[0]);
  const streams=[0,1].map(parity=>values.filter((_,i)=>i%2===parity));
  const steps=streams.map(v=>wrap(v[1]-v[0]));
  if(streams.every((v,j)=>v.every((x,i)=>i===0||wrap(x-v[i-1])===steps[j]))) {
    const nextStream=values.length%2;add('separate odd/even fixed steps',streams[nextStream].at(-1)+steps[nextStream]);
  }
  return fits;
}
export function simpleOrbitFits(sequence) {
  const rows=sequence.map(fig=>{const marker=fig.find(s=>s.t==='circle'&&s.r===6),arrow=fig.find(s=>s.t==='arrow');
    return marker&&arrow?{p:wrap(Math.round(Math.atan2(marker.x-50,43-marker.y)*4/Math.PI)),a:wrap(arrow.rot/45)}:null;});
  return rows.every(Boolean)?{p:simpleCircularFits(rows.map(r=>r.p)),a:simpleCircularFits(rows.map(r=>r.a))}:null;
}
// Patterned medium families (sets 12–16): independent tracks with an alternating phase or one fixed element.
export const ABSTRACT_PATTERN_MODELS = {
  'grid-shift': 'Independent tracks: two grid shifts that alternate by step (a repeated phase), an alternating background and a stepping corner marker.',
  'quadrant-rotation': 'Independent tracks: outer and inner rings turn in opposite directions, one inner segment stays fixed, and the centre alternates.',
  'opposed-conveyor': 'Independent tracks: two rows slide in opposite directions with wrap-around, a pointer turns, and the background may alternate.'
};
export function abstractRubric(q) {
  if (!q.challenge && q.reasoning && ABSTRACT_PATTERN_MODELS[q.reasoning.model]) {
    if (![3, 4].includes(q.rules)) throw Error('Pattern model needs three or four tracks: ' + q.reasoning.model);
    return { level: 2, reason: ABSTRACT_PATTERN_MODELS[q.reasoning.model] };
  }
  if (q.challenge) {
    if (!ABSTRACT_CHALLENGE_MODELS.has(q.reasoning?.model)) throw Error('Abstract model needs editorial review: ' + q.reasoning?.model);
    const simpler=simpleOrbitFits(q.sequence);
    if(simpler&&simpler.p.length&&simpler.a.length) return {level:2,reason:'Both position and arrow admit independent short-cycle, fixed, alternating, accelerating or interleaved continuations; the advertised dependency is unnecessary for this visible series. Supporting colour/count tracks add tracking demand.'};
    return { level: 3, reason: 'Four relationships, including cross-element, delayed, conditional or composed transformations; model: ' + q.reasoning.model + '. Learner calibration pending.' };
  }
  if (!FOUNDATION_TOPICS.has(q.topic) || ![2, 3, 4].includes(q.rules)) throw Error('Unreviewed abstract item: ' + q.topic);
  const phase = /up two, down one|down two, up one|appears twice|every two frames|every third frame|bounces|back and forth/.test(q.explanation);
  if (q.rules === 2 && !phase) return { level: 1, reason: 'Two independent familiar cycles or fixed-step transformations.' };
  return { level: 2, reason: phase ? 'Independent tracks include a nonuniform count, repeated phase or boundary reversal; predict each separately.' : 'Three or four independent familiar transformations; additional tracks increase tracking demand without cross-element dependencies.' };
}
