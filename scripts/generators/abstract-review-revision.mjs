import fs from 'node:fs';
import crypto from 'node:crypto';
const file=new URL('./abstract-review-revisions.json',import.meta.url);
const record=JSON.parse(fs.readFileSync(file));
export function abstractContentHash(q) {
  const content={...q};delete content.id;delete content.supersedes;
  return crypto.createHash('sha256').update(JSON.stringify(content)).digest('hex');
}
export function reviewedAbstract(q) {
  const before=record.baseline[q.id];if(!before)throw Error('Missing abstract baseline: '+q.id);
  const hash=abstractContentHash(q);if(hash===before.sha256)return q;
  let revision=record.revisions[q.id];
  if(!revision&&process.argv.includes('--register-review')) {
    revision={id:q.id+'-r2',beforeSha256:before.sha256,sha256:hash};record.revisions[q.id]=revision;
    fs.writeFileSync(file,JSON.stringify(record,null,2)+'\n');
  }
  if(!revision||revision.sha256!==hash)throw Error('Register a fresh reviewed abstract revision: '+q.id);
  return {...q,id:revision.id,supersedes:q.id};
}
