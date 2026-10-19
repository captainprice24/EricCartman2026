import fs from 'node:fs';
import assert from 'node:assert/strict';
import {test} from 'node:test';

test('publication checks pushes and gates staging, upload and deployment on the exact default branch',()=>{
  const workflow=fs.readFileSync(new URL('../.github/workflows/pages.yml',import.meta.url),'utf8');
  assert.ok(workflow.includes('on:\n  push:\n  pull_request:\n  workflow_dispatch:'));
  const gates=workflow.split('\n').filter(line=>line.trim().startsWith('if:'));
  assert.equal(gates.length,3);
  for(const gate of gates){
    assert.match(gate,/github\.ref == format\('refs\/heads\/\{0\}', github\.event\.repository\.default_branch\)/);
    assert.match(gate,/github\.event_name != 'pull_request'/);
  }
  assert.match(workflow,/run: node scripts\/prepare-site\.mjs/);
});
