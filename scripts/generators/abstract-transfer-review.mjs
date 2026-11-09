// Follow-up to the supplied 15-item commercial sample. Published stimuli remain immutable.
import fs from 'node:fs';
import {abstractSetSource} from '../lib/abstract-format.mjs';
import path from 'node:path';
import vm from 'node:vm';
import crypto from 'node:crypto';
import {patternFeatures} from '../lib/abstract-visible.mjs';
import {abstractPath} from '../lib/abstract-path.mjs';
import {abstractBlind} from '../lib/blind.mjs';
const clone=x=>JSON.parse(JSON.stringify(x)),same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const mod=(v,n)=>(v%n+n)%n;
const hash=q=>crypto.createHash('sha256').update(JSON.stringify(q)).digest('hex');
export function alternatives(q,index){
 let seed=31771+index*7919;
 const rnd=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/2**32;};
 const pick=a=>a[Math.floor(rnd()*a.length)];
 const key=q.options[q.answer],state=patternFeatures(key),last=patternFeatures(q.sequence.at(-1)),edits=[];
 const add=(k,v,note)=>{if(!same(state[k],v)&&!edits.some(e=>e.k===k&&same(e.v,v)))edits.push({k,v,note});};
 const rotate=(a,n)=>a.map((_,i)=>a[mod(i-n,a.length)]);
 const main=state.layout==='grid'?['grid']:state.layout==='quadrants'?['outer','inner']:['top','bottom'];
 if(state.layout==='grid'){
  for(const kind of ['row','column'])for(let at=0;at<3;at++)for(const d of [-1,1]){
   const a=last.grid.slice();for(let k=0;k<3;k++)if(kind==='row')a[at*3+mod(k+d,3)]=last.grid[at*3+k];else a[mod(k+d,3)*3+at]=last.grid[k*3+at];
   add('grid',a,`the grid uses a shift of ${kind} ${at+1} ${kind==='row'?(d>0?'right':'left'):(d>0?'down':'up')} instead of the next alternating move`);
  }
  add('grid',last.grid,'the grid repeats the last frame instead of making the next alternating move');
  for(let k=1;k<4;k++)add('corner',mod(state.corner+k,4),'the corner marker is at the wrong corner');
  add('bg',state.bg==='white'?'grey':'white','the background fails to alternate');
  add('dot',state.dot==='black'?'white':'black','the marker has the wrong fill');
 }else if(state.layout==='quadrants'){
  for(const k of [1,2,3]){add('outer',rotate(state.outer,k),'the outer pattern quadrants turn to the wrong positions');add('inner',rotate(state.inner,k),'the inner pattern sequence moves the fixed black segment');}
  const fixed=state.inner.indexOf('black'),moving=[0,1,2,3].filter(k=>k!==fixed);
  for(const k of [1,2]){const a=state.inner.slice();moving.forEach((p,i)=>a[moving[mod(i+k,3)]]=state.inner[p]);add('inner',a,'the non-black inner patterns advance the wrong number of positions');}
  add('centre',state.centre==='white'?'grey':'white','the centre square fails to alternate');
 }else{
  for(const row of ['top','bottom'])for(const k of [0,1,2,3])add(row,rotate(last[row],k),`the ${row} row uses the wrong shift or does not move`);
  for(const k of [1,2,3,4,6,7])add('arrow',mod(state.arrow+k,8),'the pointer turns by the wrong angle or direction');
  add('bg',state.bg==='white'?'grey':'white','the background has the wrong shade');
 }
 function draw(change){
  const out=clone(key);
  for(const e of change){
   if(e.k==='grid')out.filter(s=>s.t==='rect'&&s.w===24).forEach(s=>s.fill=e.v[Math.round((s.y-14)/24)*3+Math.round((s.x-14)/24)]);
   if(e.k==='corner'){const dot=out.find(s=>s.t==='circle');[dot.x,dot.y]=[[8,8],[92,8],[92,92],[8,92]][e.v];}
   if(e.k==='dot')out.find(s=>s.t==='circle').fill=e.v;
   if(e.k==='bg')out.find(s=>s.t==='rect'&&s.w===96).fill=e.v;
   if(e.k==='outer'){const order={'2,2':0,'50,2':1,'50,50':2,'2,50':3};out.filter(s=>s.t==='rect'&&s.w===48).forEach(s=>s.fill=e.v[order[s.x+','+s.y]]);}
   if(e.k==='inner')out.filter(s=>s.t==='wedge').forEach(s=>s.fill=e.v[Math.round(s.a0/90)]);
   if(e.k==='centre')out.find(s=>s.t==='rect'&&s.w===12).fill=e.v;
   if(['top','bottom'].includes(e.k))out.filter(s=>s.t==='rect'&&s.w===22&&s.y===(e.k==='top'?16:44)).forEach(s=>s.fill=e.v[Math.round((s.x-6)/22)]);
   if(e.k==='arrow')out.find(s=>s.t==='arrow').rot=e.v*45;
  }
  return out;
 }
 const singles=edits.map(e=>({changes:[e],fig:draw([e])})),pool=singles.slice();
 for(let i=0;i<edits.length;i++)for(let j=i+1;j<edits.length;j++)if(edits[i].k!==edits[j].k)pool.push({changes:[edits[i],edits[j]],fig:draw([edits[i],edits[j]])});
 const target=1+index%5;
 for(let attempt=0;attempt<150000;attempt++){
  const ds=main.map(k=>pick(singles.filter(e=>e.changes[0].k===k)));
  while(ds.length<4){const e=pick(pool);if(!ds.some(x=>same(x.fig,e.fig)))ds.push(e);}
  const options=ds.map(e=>e.fig);options.splice(q.answer,0,key);
  const check={...q,options},p=abstractPath(check);
  if(p.unique.length||p.supportCandidates<2)continue;
  const b=abstractBlind(options,q.answer),rank=1+b.sums.filter((s,i)=>i!==q.answer&&s<b.sums[q.answer]-1e-9).length;
  if(attempt<12000){if(rank!==target||(target!==1&&b.majority>0)||(target!==5&&b.outlier>0))continue;}
  else if(b.medoid>0||b.outlier>0||b.majority>0)continue;
  const notes=ds.map(e=>'Wrong: '+e.changes.map(x=>x.note).join('; ')+'.');notes.splice(q.answer,0,q.optionNotes[q.answer]);
  return {options,optionNotes:notes};
 }
 throw Error('Could not repair alternatives: '+q.id+' target '+target);
}
export function applyAbstractTransferReview(root){
 const file=path.join(root,'scripts/generators/abstract-transfer-revisions.json');
 const record=fs.existsSync(file)?JSON.parse(fs.readFileSync(file)): {baseCommit:'ccc0072',revisions:{}};
 const baseline=JSON.parse(fs.readFileSync(path.join(root,'scripts/generators/abstract-transfer-baseline.json'))).items;
 const before=new Map(baseline.map(q=>[q.id,q]));let n=0;
 for(let s=1;s<=16;s++){
  const name=path.join(root,`questions/abstract/abstract-set-${String(s).padStart(2,'0')}.js`),sets=[];
  vm.runInNewContext(fs.readFileSync(name,'utf8'),{EPSO_BANK:{registerSet:x=>sets.push(x)}});const set=sets[0];
  if(s>4&&s<12)continue;
  set.questions=set.questions.map(q=>{
   if(!same(q,before.get(q.id)))throw Error('Published input changed before transfer review: '+q.id);
   const old=q;
   if(s<=4){
    const p=abstractPath(q),names={shape:'shape',fill:'fill',arrow:'arrow direction',corner:'corner marker',dots:'dot count',slot:'small bar position',circle:'circle position',star:'star position',shade:'shaded cell',circleFill:'circle fill',left:'left shape',right:'right shape',leftFill:'left fill',rightFill:'right fill',front:'front layer',marker:'edge marker',black:'black segment',grey:'grey segment',centre:'centre fill',long:'long hand',short:'short hand',tip:'tip fill',hub:'hub shape',hubFill:'hub fill'};
    const route=p.routes[0].map(k=>names[k]||k).join(' and ');
    q={...q,difficulty:p.cost<=2?1:2,reasoning:{model:'reviewed-foundation',pathReviewed:true},
     hints:[q.hints[0],`In these choices, infer the ${route} from the series and use it to eliminate. Other tracks can verify the result.`,q.hints[2]],
     explanation:q.explanation+` Shortest sufficient route in these choices: ${route}. The level follows that route, not the number of described tracks.`,
     solution:[...q.solution,`Efficient elimination: the predicted ${route} uniquely identifies the next figure among these choices.`]};
   }else{
    const fixed=alternatives(q,(s-12)*10+Number(q.id.match(/-(\d+)/)[1])-1);
    q={...q,...fixed,reasoning:{...q.reasoning,pathReviewed:true},explanation:q.explanation+' The choices require the main spatial transformation; the supporting colour, marker or pointer cues cannot select the answer alone.'};
   }
   const freshId=old.id.endsWith('-r2')?old.id.replace(/-r2$/,'-r3'):old.id+'-r2';
   q={...q,id:freshId,supersedes:old.id};
   const entry={id:q.id,beforeSha256:hash(old),sha256:hash(q),beforeDifficulty:old.difficulty,difficulty:q.difficulty,sequenceChanged:!same(q.sequence,old.sequence),optionsChanged:!same(q.options,old.options)};
   if(process.argv.includes('--register-transfer'))record.revisions[old.id]=entry;
   else if(!same(record.revisions[old.id],entry))throw Error('Register a fresh transfer revision: '+old.id);
   n++;return q;
  });
  set.version=(set.version||1)+1;
  fs.writeFileSync(name,abstractSetSource(set,'Generated by scripts/generators/abstract.mjs; transfer review preserves published stimuli.'));
 }
 if(process.argv.includes('--register-transfer'))fs.writeFileSync(file,JSON.stringify(record,null,2)+'\n');
 console.log('Abstract transfer review:',n,'fresh revisions; published stimuli retained.');
}
