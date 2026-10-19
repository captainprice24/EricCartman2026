#!/usr/bin/env python3
"""Refresh small licensed author-study samples and dataset inspection facts.
No third-party examples are added to the application bank. Standard library only.
"""
import datetime
import hashlib
import json
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from urllib.request import urlopen

OUT = Path(__file__).resolve().parents[1] / 'docs/research/numerical/reference-data'
CHECKED = datetime.datetime.now(datetime.timezone.utc).date().isoformat()
SOURCES = [
    ('finqa', 'https://raw.githubusercontent.com/czyssrs/FinQA/main/dataset/test.json'),
    ('tatqa', 'https://raw.githubusercontent.com/NExTplusplus/TAT-QA/master/dataset_raw/tatqa_dataset_dev.json'),
    ('gsm8k', 'https://raw.githubusercontent.com/openai/grade-school-math/master/grade_school_math/data/test.jsonl'),
    ('aqua', 'https://raw.githubusercontent.com/google-deepmind/AQuA/master/test.json'),
    ('tabmwp', 'https://raw.githubusercontent.com/lupantech/PromptPG/main/data/tabmwp/problems_test.json'),
    ('svamp', 'https://raw.githubusercontent.com/arkilpatel/SVAMP/main/SVAMP.json'),
]

def inspect(source):
    name, url = source
    with urlopen(url, timeout=30) as response:
        raw = response.read(32 * 1024 * 1024 + 1)
    if len(raw) > 32 * 1024 * 1024:
        raise ValueError('Source exceeds the reference-inspection size limit: ' + name)
    text = raw.decode('utf-8')
    data = [json.loads(line) for line in text.splitlines() if line.strip()] if name in ('gsm8k', 'aqua') else json.loads(text)
    records = list(data.values()) if isinstance(data, dict) else data
    digest = hashlib.sha256(raw).hexdigest()
    if name in ('gsm8k', 'tatqa'):
        result = {
            'source': url, 'retrieved': CHECKED,
            'purpose': 'Author study only. Not registered in the app. No fine-tuning performed.',
            'selection': 'First 8 records, unmodified; wrapper added.',
            'license': 'MIT' if name == 'gsm8k' else 'CC BY 4.0',
            'attribution': 'OpenAI, GSM8K (Cobbe et al., 2021)' if name == 'gsm8k' else 'Fengbin Zhu et al., TAT-QA (ACL 2021), https://github.com/NExTplusplus/TAT-QA',
            'source_sha256': digest, 'records': records[:8],
        }
        filename = name + '-reference-sample.json'
    else:
        result = {
            'url': url, 'retrieved': CHECKED, 'source_sha256': digest,
            'records': len(records), 'fields': list(records[0]),
            'sample_numeric_programs': [r['qa']['program'] for r in records[:12] if r.get('qa', {}).get('program')],
            'copied_question_text': False,
        }
        filename = name + '-inspection.json'
    (OUT / filename).write_text(json.dumps(result, indent=2) + '\n', encoding='utf-8')
    print(name, len(records), 'records inspected; saved', filename)

if __name__ == '__main__':
    OUT.mkdir(parents=True, exist_ok=True)
    # Retain the complete MIT notice alongside the copied GSM8K examples.
    with urlopen('https://raw.githubusercontent.com/openai/grade-school-math/master/LICENSE', timeout=30) as response:
        (OUT / 'GSM8K-LICENSE.txt').write_bytes(response.read())
    with ThreadPoolExecutor(max_workers=6) as pool:
        list(pool.map(inspect, SOURCES))
