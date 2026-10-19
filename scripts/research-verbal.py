import urllib.request,urllib.parse,json,re,hashlib,datetime
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
out=Path(__file__).resolve().parents[1]/'docs/research/verbal'
out.mkdir(parents=True,exist_ok=True)
CHECKED=datetime.datetime.now(datetime.timezone.utc).date().isoformat()
repos=[
 ('ReClor','yuweihao/reclor','argument structure, necessary conditions and close logical distractors'),
 ('LogiQA','lgw863/LogiQA-dataset','logical reading comprehension; commercial exam provenance needs review'),
 ('LogiQA 2.0','csitfun/LogiQA2.0','logical reasoning and multi-hop textual inference'),
 ('FOLIO','Yale-LILY/FOLIO','first-order logic, quantifiers, contradiction and unknown'),
 ('ProofWriter','allenai/proofwriter','multi-step proof chains, negation and exceptions'),
 ('RuleTaker','allenai/ruletaker','rule application and depth-controlled entailment'),
 ('CLUTRR','facebookresearch/clutrr','compositional relational reasoning and held-out structures'),
 ('ANLI','facebookresearch/anli','adversarial entailment, contradiction and neutral examples'),
 ('SNLI','stanfordnlp/snli','entailment/neutral/contradiction distinctions'),
 ('MultiNLI','nyu-mll/multiNLI','cross-domain inference and genre variation'),
 ('HANS','tommccoy1/hans','lexical overlap, subsequence and constituent shortcuts'),
 ('ConTRoL','csitfun/ConTRoL','contextual reading over longer passages'),
 ('ContractNLI','stanfordnlp/contract-nli','exceptions, scope and evidence-based contract inference'),
 ('DocNLI','salesforce/DocNLI','document-level inference and evidence dispersion'),
 ('VitaminC','TalSchuster/VitaminC','contrastive claims and minimal factual edits'),
 ('FEVER','sheffieldnlp/fever-baselines','supported/refuted/not-enough-information classification'),
 ('SciFact','allenai/scifact','scientific claims, uncertainty and evidence qualification'),
 ('RACE','qizhex/RACE_AR_baselines','reading comprehension options; exam-content provenance'),
 ('DREAM','nlpdata/dream','dialogue comprehension and inference'),
 ('QuAIL','text-machine-lab/quail','passage-level reasoning and question taxonomy'),
 ('BoolQ','google-research-datasets/boolean-questions','yes/no inference and careful evidence selection'),
 ('StrategyQA','eladsegal/strategyqa','implicit multi-step reasoning; outside knowledge is unsuitable for EPSO keys'),
 ('Abduction and Argument Reasoning','UKPLab/argument-reasoning-comprehension-task','hidden assumptions and competing warrants'),
 ('ART abductive reasoning','allenai/abductive-commonsense-reasoning','plausibility versus entailment; avoid confusing the two'),
 ('TRUE','google-research/true','factual consistency and benchmark reliability')
]
def fetch(u):
 try:
  with urllib.request.urlopen(u,timeout=18) as r: return {'url':u,'status':r.status,'text':r.read(700000).decode('utf-8','replace')}
 except Exception as e:return {'url':u,'status':str(e)}
def inspect(entry):
 name,repo,use=entry
 for branch in ['main','master']:
  doc=fetch(f'https://raw.githubusercontent.com/{repo}/{branch}/README.md')
  if doc.get('status')==200:break
 # Some projects use different case.
 if doc.get('status')!=200:
  doc=fetch(f'https://raw.githubusercontent.com/{repo}/master/README')
 lic=None
 if doc.get('status')==200:
  for f in ['LICENSE','LICENSE.md','LICENSE.txt','LICENSE_DATA']:
   v=fetch(f'https://raw.githubusercontent.com/{repo}/{branch}/{f}')
   if v.get('status')==200:lic=v;break
 body=doc.get('text',''); lb=(lic or {}).get('text','')
 evidence=[line[:450] for line in body.splitlines() if re.search(r'licen[sc]|dataset|download|train.json|data/|CC BY|creativecommons',line,re.I)][:14]
 return {'id':re.sub('[^a-z0-9]+','-',name.lower()).strip('-'),'name':name,'url':f'https://github.com/{repo}','kind':'repository / dataset','use':use,'checked':CHECKED,'access':doc['status'],'readme_url':doc['url'],'readme_sha256':hashlib.sha256(body.encode()).hexdigest() if body else None,'evidence':evidence,'license_url':lic['url'] if lic else None,'license_excerpt':lb[:1800] if lb else None,'dataset_terms_evidence':[line[:700] for line in body.splitlines() if re.search(r'dataset.*licen|licen.*dataset|CC BY|creativecommons',line,re.I)],'reuse_decision':'Reference for methods only. Dataset/content rights need separate confirmation before import; no items copied into the app.'}
with ThreadPoolExecutor(8) as pool:
 results=list(pool.map(inspect,repos))
web=[
 ('EPSO sample tests','https://eu-careers.europa.eu/en/sample-tests','Official verbal format; no copying'),
 ('SHL verbal practice','https://www.shl.com/shldirect/en/practice-tests/','Commercial verbal formats; reference only'),
 ('AssessmentDay verbal','https://www.assessmentday.co.uk/verbal-reasoning.htm','Commercial inference examples; reference only'),
 ('EU Training','https://eutraining.eu/','EPSO-specific reference; no copying'),
 ('EU Careers assessment','https://selection.eu-careers.europa.eu/en/ad5-graduates-selection-process-how-you-are-assessed','Official timing and format; needs verification'),
 ('Stanford SNLI','https://nlp.stanford.edu/projects/snli/','Dataset documentation and licence'),
 ('MultiNLI project','https://cims.nyu.edu/~sbowman/multinli/','Multi-genre inference documentation'),
 ('Project Gutenberg','https://www.gutenberg.org/','Candidate public-domain passages; rights vary by territory'),
 ('EUR-Lex','https://eur-lex.europa.eu/','Candidate policy prose; distinguish authoritative facts from fictional exercises'),
 ('CORDIS','https://cordis.europa.eu/','Scientific-policy prose and evidence qualifiers')
]
for name,url,use in web:
 d=fetch(url);results.append({'id':re.sub('[^a-z0-9]+','-',name.lower()).strip('-'),'name':name,'url':url,'kind':'website','use':use,'checked':CHECKED,'access':d['status'],'reuse_decision':'Not imported. Check source-specific content and terms before reuse.'})
searches=[]
for query in ['verbal reasoning dataset','logical reading comprehension','textual entailment exceptions','EPSO verbal reasoning']:
 u='https://github.com/search?'+urllib.parse.urlencode({'q':query,'type':'repositories'})
 d=fetch(u); links=[]
 if d.get('text'):
  for m in re.finditer(r'<script[^>]*data-target="react-app.embeddedData"[^>]*>(.*?)</script>',d['text'],re.S):
   try:
    p=json.loads(m[1]); items=p.get('payload',{}).get('results',[])
    for x in items:
     repo=x.get('repo',{}).get('repository',{});links.append(repo or x.get('hl_name'))
   except Exception:pass
 searches.append({'query':query,'url':u,'status':d['status'],'results':links[:10],'note':'HTML retrieved; results not extractable without a signed-in search session' if not links else 'Repository candidates only'})
(out/'sources.json').write_text(json.dumps({'checked':CHECKED,'scope':'Bounded research pass; not an exhaustive web search. Access failures are not source reviews. No third-party question text registered in the app; attributed author-study samples are stored separately.','sources':results,'searches':searches},indent=2)+'\n')
for x in results: print(x['name'],x['access'],'license:',x.get('license_url'))
print('searches',searches)
