// Editorial reasoning rubric, independent of shape count or explanation length.
const FOUNDATION_TOPICS = new Set(['Single figure', 'Grid movement', 'Overlapping shapes', 'Divided circle', 'Rotating hands']);
export const ABSTRACT_CHALLENGE_MODELS = new Set(['alternating-orbit', 'accelerating-orbit', 'interleaved-orbits', 'colour-gated-orbit',
  'two-stage-gate', 'alternating-reflection', 'delayed-handoff', 'accelerating-relative-angle', 'rotating-xor', 'rotated-union']);
export function abstractRubric(q) {
  if (q.challenge) {
    if (!ABSTRACT_CHALLENGE_MODELS.has(q.reasoning?.model)) throw Error('Abstract model needs editorial review: ' + q.reasoning?.model);
    return { level: 3, reason: 'Four relationships, including cross-element, delayed, conditional or composed transformations; model: ' + q.reasoning.model + '. Learner calibration pending.' };
  }
  if (!FOUNDATION_TOPICS.has(q.topic) || ![2, 3, 4].includes(q.rules)) throw Error('Unreviewed abstract item: ' + q.topic);
  const phase = /up two, down one|down two, up one|appears twice|every two frames|every third frame|bounces|back and forth/.test(q.explanation);
  if (q.rules === 2 && !phase) return { level: 1, reason: 'Two independent familiar cycles or fixed-step transformations.' };
  return { level: 2, reason: phase ? 'Independent tracks include a nonuniform count, repeated phase or boundary reversal; predict each separately.' : 'Three or four independent familiar transformations; additional tracks increase tracking demand without cross-element dependencies.' };
}
