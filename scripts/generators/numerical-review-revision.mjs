// Explicit, immutable teaching revisions. Registration is an authoring action, not a normal build.
import fs from 'node:fs';
import crypto from 'node:crypto';
const file = new URL('./numerical-review-revisions.json', import.meta.url);
const registry = JSON.parse(fs.readFileSync(file));
export const contentHash = q => { const content = {...q}; delete content.id; delete content.supersedes; return crypto.createHash('sha256').update(JSON.stringify(content)).digest('hex'); };
export function reviewedRevision(q) {
  const before = registry.baseline[q.id];
  if (!before) throw Error('Missing numerical review baseline: ' + q.id);
  const hash = contentHash(q);
  if (hash === before.sha256) return q;
  let entry = registry.revisions[q.id];
  if (!entry && process.argv.includes('--register-review')) {
    const match = q.id.match(/^(.*?)(?:-r(\d+))?$/);
    entry = {id: match[1] + '-r' + (Number(match[2] || 1) + 1), beforeSha256: before.sha256, sha256: hash};
    registry.revisions[q.id] = entry;
    fs.writeFileSync(file, JSON.stringify(registry, null, 2) + '\n');
  }
  if (!entry || entry.sha256 !== hash) throw Error('Register a fresh numerical review revision for ' + q.id);
  return {...q, id: entry.id, supersedes: q.id};
}
