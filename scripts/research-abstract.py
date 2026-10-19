"""Bounded, reproducible abstract-reasoning research. References are separate from app data."""
import datetime, hashlib, json, re, urllib.request
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
OUT = Path(__file__).resolve().parents[1] / 'docs/research/abstract'
OUT.mkdir(parents=True, exist_ok=True)
CHECKED = datetime.datetime.now(datetime.timezone.utc).date().isoformat()
REPOS = [
 ('RAVEN', 'WellyZhang/RAVEN', 'Structured visual grammars and multiple attributes'),
 ('PGM', 'google-deepmind/abstract-reasoning-matrices', 'Progression, XOR/OR/AND, systematic generalisation; explicitly non-commercial data'),
 ('Bongard-LOGO', 'NVlabs/Bongard-LOGO', 'Concept learning and nuisance variation; not a series test'),
 ('ARC-AGI-1', 'fchollet/ARC-AGI', 'Compositional grid transformations and exact output checking'),
 ('ARC-AGI-2', 'arcprize/ARC-AGI-2', 'Harder compositional transformations; different task format'),
 ('ALANS', 'WellyZhang/ALANS', 'Algebraic representations and systematic generalisation'),
 ('PrAE', 'WellyZhang/PrAE', 'Separate perception, rule inference and execution'),
 ('CoPINet', 'WellyZhang/CoPINet', 'Contrastive reasoning and option comparison'),
 ('WReN', 'Fen9/WReN', 'Relational reasoning over matrix panels'),
 ('Distracting feature', 'zkcys001/distracting_feature', 'Inspect attribute distractions and shortcut risk'),
 ('MXGNet', 'thematrixduo/MXGNet', 'Multiplex relationships among visual components'),
 ('SRAN', 'husheng12345/SRAN', 'Located I-RAVEN improved answer-set generation and rule-aware representations'),
 ('SCL', 'dhh1995/SCL', 'Object/attribute/relation decomposition and answer shortcuts'),
 ('I-RAVEN candidate', 'Spratley/iraven', 'Candidate path for balanced alternatives; verify before citing'),
 ('I-RAVEN candidate 2', 'hahmyung/iraven', 'Candidate path; unresolved is not reviewed'),
 ('Bongard-HOI', 'NVlabs/Bongard-HOI', 'Concept induction; photographic interaction task, low direct relevance'),
 ('CLEVR', 'facebookresearch/clevr-dataset-gen', 'Scene generation, relational programs and controlled visual confounds'),
 ('CLEVRER', 'chuangg/CLEVRER', 'Temporal and counterfactual visual relationships'),
 ('Sort-of-CLEVR', 'kimhc6028/relational-networks', 'Relational versus non-relational controls'),
 ('ARC DSL', 'michaelhodel/arc-dsl', 'Interpretable transformations; solution code is not licensed EPSO content'),
 ('ARC synthetic tasks', 'michaelhodel/re-arc', 'Programmatic variation and avoiding memorised pixel arrangements'),
 ('Abstraction and reasoning', 'lab42/arc', 'Candidate tooling; verify availability and terms')
]
def fetch(url, limit=1200000):
 try:
  with urllib.request.urlopen(url, timeout=10) as response:
   data = response.read(limit)
   return {'url': url, 'status': response.status, 'text': data.decode('utf-8', 'replace')}
 except Exception as error:
  return {'url': url, 'status': str(error)}
def inspect(entry):
 name, repo, use = entry
 doc = None
 for branch in ['main', 'master']:
  doc = fetch(f'https://raw.githubusercontent.com/{repo}/{branch}/README.md')
  if doc['status'] == 200: break
 licence = None
 if doc['status'] == 200:
  for filename in ['LICENSE', 'LICENSE.md', 'LICENSE.txt']:
   candidate = fetch(f'https://raw.githubusercontent.com/{repo}/{branch}/{filename}')
   if candidate['status'] == 200:
    licence = candidate; break
 text = doc.get('text', '')
 return {'name': name, 'url': 'https://github.com/' + repo, 'kind': 'repository / dataset',
  'checked': CHECKED, 'access': doc['status'], 'readme_url': doc['url'],
  'readme_sha256': hashlib.sha256(text.encode()).hexdigest() if text else None,
  'use': use, 'evidence': [line[:900] for line in text.splitlines()
    if re.search(r'licen[sc]|reason|dataset|distract|generali|shortcut|bias|non-commercial|XOR', line, re.I)][:12],
  'license_url': licence['url'] if licence else None,
  'license_excerpt': licence['text'][:2200] if licence else None,
  'reuse_decision': 'Methods reference only; code licensing does not establish dataset rights. No source questions registered in the app.'}
with ThreadPoolExecutor(8) as pool:
 sources = list(pool.map(inspect, REPOS))
for source in sources:
 if source['name'].startswith('I-RAVEN candidate'):
  source['resolved_via'] = 'https://github.com/husheng12345/SRAN/tree/master/I-RAVEN'
WEBSITES = [
 ('EPSO sample tests', 'https://eu-careers.europa.eu/en/sample-tests'),
 ('EU Training', 'https://eutraining.eu/'),
 ('SHL practice tests', 'https://www.shl.com/shldirect/en/practice-tests/'),
 ('AssessmentDay abstract', 'https://www.assessmentday.co.uk/abstract-reasoning.htm'),
 ('123test abstract', 'https://www.123test.com/abstract-reasoning-test/'),
 ('Practice Aptitude Tests', 'https://www.practiceaptitudetests.com/abstract-reasoning-tests/'),
 ('RAVEN project', 'https://wellyzhang.github.io/project/raven.html'),
 ('PGM paper', 'https://arxiv.org/abs/1807.04225'),
 ('Impartial RAVEN paper', 'https://arxiv.org/abs/1911.00577'),
 ('ARC Prize', 'https://arcprize.org/')
]
def website(entry):
 name, url = entry; response = fetch(url)
 return {'name': name, 'url': url, 'kind': 'website', 'checked': CHECKED,
  'access': response['status'], 'reuse_decision': 'No content imported. An access failure is not a source review.'}
with ThreadPoolExecutor(8) as pool:
 sources.extend(pool.map(website, WEBSITES))
# Save the search coverage, including unsuccessful extraction, rather than implying exhaustive discovery.
import urllib.parse
QUERIES = ['I-RAVEN', 'abstract reasoning matrices', 'Bongard LOGO', 'raven progressive matrices dataset']
def search(query):
 url = 'https://github.com/search?' + urllib.parse.urlencode({'q': query, 'type': 'repositories'})
 response = fetch(url)
 return {'query': query, 'url': url, 'access': response['status'],
  'note': 'Search HTML only; no repository results extracted. Named references and project links form the catalogue.'}
with ThreadPoolExecutor(4) as pool:
 searches = list(pool.map(search, QUERIES))
(OUT / 'sources.json').write_text(json.dumps({'checked': CHECKED,
 'scope': 'Bounded research, not exhaustive. README access is not dataset inspection or proof of rights. No third-party app questions.',
 'sources': sources, 'searches': searches}, indent=2) + '\n')
for source in sources: print(source['name'], source['access'])
# Small, attributed author-study samples only, under the repository's confirmed Apache licence.
licence = fetch('https://raw.githubusercontent.com/fchollet/ARC-AGI/master/LICENSE')
if licence['status'] == 200 and 'Apache License' in licence['text']:
 directory = OUT / 'reference-data'; directory.mkdir(exist_ok=True)
 (directory / 'ARC-AGI-LICENSE.txt').write_text(licence['text'])
 samples = []
 for task in ['007bbfb7', '00d62c1b', '017c7c7b', '025d127b']:
  response = fetch(f'https://raw.githubusercontent.com/fchollet/ARC-AGI/master/data/training/{task}.json')
  if response['status'] == 200:
   data = json.loads(response['text'])
   samples.append({'task': task, 'source': response['url'], 'sha256': hashlib.sha256(response['text'].encode()).hexdigest(),
    'license': 'Apache-2.0; see ARC-AGI-LICENSE.txt', 'original_unmodified': data})
 (directory / 'arc-training-reference-sample.json').write_text(json.dumps({'purpose': 'Author study only; grid tasks are not EPSO series and are not in the app.', 'samples': samples}, indent=2) + '\n')
 print('Licensed ARC training reference tasks:', len(samples))
