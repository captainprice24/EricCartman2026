#!/usr/bin/env python3
"""Refresh a small MIT-licensed HANS reference sample; never imports app questions."""
import csv,datetime,hashlib,json
from pathlib import Path
from urllib.request import urlopen
out=Path(__file__).resolve().parents[1]/'docs/research/verbal/reference-data'
out.mkdir(parents=True,exist_ok=True)
url='https://raw.githubusercontent.com/tommccoy1/hans/master/heuristics_evaluation_set.txt'
with urlopen(url,timeout=30) as response: raw=response.read(32*1024*1024)
records=list(csv.DictReader(raw.decode().splitlines(),delimiter='\t'));chosen=[];seen=set()
for r in records:
 key=(r['gold_label'],r['heuristic'],r['subcase'])
 if key in seen:continue
 seen.add(key);chosen.append({k:r[k] for k in ['gold_label','sentence1','sentence2','pairID','heuristic','subcase','template']})
 if len(chosen)==12:break
sample={'source':url,'retrieved':datetime.datetime.now(datetime.timezone.utc).date().isoformat(),'attribution':'R. Thomas McCoy, Ellie Pavlick and Tal Linzen (2019), HANS, Right for the Wrong Reasons: Diagnosing Syntactic Heuristics in Natural Language Inference.','license':'MIT','source_sha256':hashlib.sha256(raw).hexdigest(),'records_inspected':len(records),'selection':'First record per distinct label/heuristic/subcase, up to 12; selected fields, text unchanged.','purpose':'Author-study only; not app questions or model training.','examples':chosen}
(out/'hans-reference-sample.json').write_text(json.dumps(sample,indent=2)+'\n')
with urlopen('https://raw.githubusercontent.com/tommccoy1/hans/master/LICENSE.md',timeout=20) as response:(out/'HANS-LICENSE.md').write_bytes(response.read())
print('HANS records inspected:',len(records),'examples saved:',len(chosen))
