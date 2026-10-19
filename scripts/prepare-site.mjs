// Shared by deployment and artifact regression checks.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export function prepareSite(destination = path.join(root, '_site')) {
  fs.mkdirSync(destination, { recursive: true });
  for (const name of ['index.html', 'version.js', 'assets', 'questions', 'dist']) {
    fs.cpSync(path.join(root, name), path.join(destination, name), { recursive: true });
  }
  return destination;
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  console.log('Prepared', prepareSite());
}
