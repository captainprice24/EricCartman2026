import urllib.request,urllib.parse,json,re,hashlib,datetime
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
out=Path(__file__).resolve().parents[1]/'docs/research/numerical'
out.mkdir(parents=True,exist_ok=True)
CHECKED=datetime.datetime.now(datetime.timezone.utc).date().isoformat()
repos=[('FinQA','czyssrs/FinQA','financial tables; explicit arithmetic programs'),('TAT-QA','NExTplusplus/TAT-QA','table/text joins; scale selection; multi-step arithmetic'),('ConvFinQA','czyssrs/ConvFinQA','dependent calculations and follow-up questions'),('TabFact','wenhuchen/Table-Fact-Checking','filtering, aggregation and comparisons'),('NumGLUE','allenai/numglue','numerical inference and task diversity'),('DROP','allenai/allennlp-reading-comprehension','discrete operations over paragraphs'),('GSM8K','openai/grade-school-math','multi-step word-problem structures; mostly below target'),('SVAMP','arkilpatel/SVAMP','changes in wording and arithmetic robustness'),('ASDiv','chaochun/nlu-asdiv-dataset','diverse arithmetic word problems'),('MathQA','math-qa/math-QA','operation programs and multiple-choice distractors'),('AQuA-RAT','google-deepmind/AQuA','quantitative multiple-choice rationales'),('DeepMind Mathematics','google-deepmind/mathematics_dataset','compositional generation and difficulty extrapolation'),('MAWPS','sroy9/mawps','duplicate control and arithmetic templates'),('TabMWP','lupantech/PromptPG','tabular mathematical word problems'),('MultiHiertt','psunlpgroup/MultiHiertt','joining multiple tables with hierarchical headers'),('TAT-DQA','NExTplusplus/TAT-DQA','document layouts and unit interpretation'),('HiTab','microsoft/HiTab','hierarchical table aggregation'),('WikiTableQuestions','ppasupat/WikiTableQuestions','row selection and multi-operation questions'),('MathDial','eth-nlped/mathdial','step-by-step tutoring; reasoning scaffolds'),('Eurostat tools','eurostat/pyrostat','official data access patterns'),('World Bank tools','tgherzog/wbgapi','economic indicator data access; data rights separate'),('Our World in Data grapher','owid/owid-grapher','chart and data provenance; mixed source rights'),('Datasets GDP','datasets/gdp','small GDP CSV; source and attribution inspection'),('Plotly datasets / Gapminder mirror','plotly/datasets','per-capita and weighted comparisons; check original data rights')]
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
web=[('EPSO sample tests','https://eu-careers.europa.eu/en/sample-tests','Official format and expected reasoning style'),('SHL practice','https://www.shl.com/shldirect/en/practice-tests/','Interactive numerical data interpretation; reference only'),('AssessmentDay','https://www.assessmentday.co.uk/numerical-reasoning.htm','Timed numerical practice; reference only'),('Practice Aptitude Tests','https://www.practiceaptitudetests.com/numerical-reasoning-tests/','Data interpretation examples; reference only'),('EU Training','https://eutraining.eu/','EPSO-specific commercial reference; no copying'),('Eurostat database','https://ec.europa.eu/eurostat/web/main/data/database','EU policy data for future original exhibits'),('Eurostat reuse','https://ec.europa.eu/eurostat/about-us/policies/copyright','Terms must be checked per data source'),('World Bank open data','https://data.worldbank.org/','Development indicators; terms vary by source'),('OECD data','https://data-explorer.oecd.org/','Economic indicators; terms must be checked'),('ONS','https://www.ons.gov.uk/','Statistical tables; verify OGL and exclusions'),('UNdata','https://data.un.org/','Multisource official tables; no blanket reuse permission')]
for name,url,use in web:
 d=fetch(url);results.append({'id':re.sub('[^a-z0-9]+','-',name.lower()).strip('-'),'name':name,'url':url,'kind':'website','use':use,'checked':CHECKED,'access':d['status'],'reuse_decision':'Not imported. Check source-specific content and terms before reuse.'})
searches=[]
for query in ['numerical reasoning','EPSO numerical','financial numerical reasoning dataset','table mathematical word problems']:
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
