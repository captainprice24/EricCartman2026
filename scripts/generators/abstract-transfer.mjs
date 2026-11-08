// Original transfer practice; commercial examples informed relationships only.
import fs from 'node:fs';
import {abstractSetSource} from '../lib/abstract-format.mjs';
import path from 'node:path';
import crypto from 'node:crypto';
import {abstractBlind} from '../lib/blind.mjs';
const copy=x=>JSON.parse(JSON.stringify(x)),same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const mod=(x,n)=>(x%n+n)%n;
const border=()=>({t:'rect',x:2,y:2,w:96,h:96,fill:'white'});
const shape=(k,x,y,r,fill)=>k===0?{t:'poly',n:3,x,y,r,rot:0,fill}:k===1?{t:'poly',n:4,x,y,r,rot:45,fill}:k===2?{t:'poly',n:5,x,y,r,rot:0,fill}:{t:'star',x,y,r,rot:0,fill};
const type=['triangle','square','pentagon','star'];
const turn=(p,k)=>{let [x,y]=p;for(let i=0;i<mod(k,4);i++)[x,y]=[100-y,x];return [x,y];};
const note=(k,v,text)=>({k,v,text});
const glyphs=[[[ -1,-1],[-.35,-1],[-.35,.1],[1,.1],[1,1],[-1,1]],
 [[-1,-1],[1,-1],[.45,-.25],[1,.35],[-.3,.35],[-.3,1],[-1,1]],
 [[-1,-1],[.3,-1],[.3,-.35],[1,-.35],[1,1],[-.3,1],[-.3,.3],[-1,.3]]];
const centres=[[24,24],[76,24],[76,76],[24,76]];
const line=(a,b,arrowEnd=false)=>({t:'line',x1:a[0],y1:a[1],x2:b[0],y2:b[1],...(arrowEnd?{arrowEnd:true}:{})});
const addDots=(out,n,cx,cy,fill,r=3)=>{for(let j=0;j<n;j++)out.push({t:'circle',x:cx+(j%3)*9,y:cy+Math.floor(j/3)*9,r,fill});};
function makeFamily(f,v,attempt){
 const z=v+attempt*11;
 if(f===0){
  // Small inputs deliberately have no repeating independent cycle; outputs copy the previous input.
  const inputs=(v===4?[2,0,1,3,0,2,1,0]:[0,1,3,1,2,0,3,2]).map(k=>mod(k+z,4));
  const fills=[0,1,1,0,1,0,0,1].map(k=>mod(k+z,2));
  const states=Array.from({length:7},(_,i)=>({kind:inputs[i],shade:fills[i],small:inputs[i+1],smallShade:fills[i+1]}));
  const draw=s=>[border(),shape(s.kind,50,43,25,s.shade?'grey':'white'),{t:'rect',x:7,y:70,w:34,h:23,fill:'white'},shape(s.small,24,82,7,s.smallShade?'grey':'white')];
  return {model:'identity-handoff',topic:'Identity handoff',level:3,rules:2,states,draw,core:['kind','shade'],main:['kind','shade'],
   errors:s=>[...Array.from({length:4},(_,k)=>note('kind',k,'the large shape does not copy the previous input symbol')),note('shade',1-s.shade,'the large shape does not copy the previous input fill')],
   hints:['Identify the large object and the small input symbol separately.','Compare the large object with the small symbol in the preceding frame, including its fill.','Use the last small symbol to predict the large output. The new small input is not needed to choose the answer.'],
   solution:[`Large identities: ${states.slice(0,-1).map(s=>type[s.kind]).join(' → ')}. Each is the previous frame’s input symbol.`,
    `Large fills: ${states.slice(0,-1).map(s=>s.shade?'grey':'white').join(' → ')}. Each copies the previous input’s fill as well.`,
    `Next large output: ${type[states.at(-1).kind]}, ${states.at(-1).shade?'grey':'white'}. The future input in the small box does not determine this output.`],
   lesson:'A delayed identity relationship can be easier to discover by following an object’s role rather than looking for a repeating shape cycle. Copy both the previous input shape and its fill.'};
 }
 if(f===1){
  const inside0=z%2,relation=z%2?1:-1; // Some variants require grey fewer; others grey more.
  const counts=[3,4,3,5,4,5].map((n,i)=>({black:n+v%3,grey:n+v%3+relation*(1+i%2)}));
  const states=counts.map((c,i)=>({...c,inside:mod(inside0+i,2),relation}));
  const draw=s=>{const out=[border(),{t:'circle',x:50,y:46,r:28,fill:'white'}];
   for(const [color,n]of [['black',s.black],['grey',s.grey]]){const within=(color==='black'?0:1)===s.inside;addDots(out,n,within?40:8,within?35:74,color,2.7);}return out;};
  return {model:'region-inequality',topic:'Inside/outside count relationships',level:2,rules:2,states,draw,core:['inside','relation'],main:['inside','relation'],
   errors:s=>[note('inside',1-s.inside,'the black and grey groups fail to swap inside/outside'),note('relation',-s.relation,'the grey/black count comparison is reversed'),note('relation',0,'the two colour counts are equal, breaking the strict comparison')],
   decorate:(s)=>({...s,grey:s.black+s.relation*(1+z%2)}),
   hints:['Compare counts between the two colours; an exact number sequence may not be needed.','Track which colour is inside the circle. Does that role alternate?','The count comparison must stay true, while the inside/outside colours swap.'],
   solution:[`Inside colour: ${states.slice(0,5).map(s=>s.inside?'grey':'black').join(' → ')}. The colours swap regions each frame.`,
    `Grey is always ${relation>0?'more numerous':'less numerous'} than black. The individual counts vary, so do not invent an exact count progression.`,
    `Next: ${states[5].inside?'grey':'black'} inside; grey must remain ${relation>0?'more numerous':'less numerous'} than black.`],
   lesson:'A relationship such as fewer than or more than can be the invariant. Separate that comparison from the alternating inside/outside placement.'};
 }
 if(f===2){
  const states=Array.from({length:6},(_,i)=>({direction:mod(z+i,4),matched:true,count:[2,4,3,2,3,4][(i+v)%6]}));
  const draw=s=>{const out=[border()];for(let i=0;i<s.count;i++){
   const cross=30+i*13,dy=16,dx=9;
   const tailA=[98-dx,cross+dy],tailB=[98,cross+(s.matched?0:8)],headA=[2,cross],headB=[2+dx,cross-dy];
   out.push(line(turn(tailA,s.direction),turn(tailB,s.direction)),line(turn(headA,s.direction),turn(headB,s.direction),true));
  }return out;};
  return {model:'boundary-continuation',topic:'Boundary continuation and irrelevant detail',level:2,rules:2,states,draw,core:['direction','matched'],main:['direction','matched'],
   errors:()=>[...Array.from({length:4},(_,k)=>note('direction',k,'the common arrow direction takes the wrong quarter-turn')),note('matched',false,'opposite-edge fragments do not meet at the same boundary coordinate and angle')],
   hints:['Follow an arrow to an edge, then look at the opposite edge for its continuation.','Check the boundary coordinate and slope. Track the common arrow direction separately.','The number of arrows has no regular progression and is irrelevant. Match the fragments and continue the quarter-turn.'],
   solution:[`Common directions: ${states.slice(0,5).map(s=>['up-right','down-right','down-left','up-left'][s.direction]).join(' → ')}. Each advances one clockwise quarter-turn.`,
    'Every tail reaching one edge continues from the opposite edge at the same boundary coordinate and with the same slope.',
    `Next direction: ${['up-right','down-right','down-left','up-left'][states[5].direction]}. Arrow count varies and does not choose the answer.`],
   lesson:'The frame wraps at its boundary. Reconstruct complete arrows from fragments, and ignore a varying count when the series supports a different invariant.'};
 }
 if(f===3){
  const states=Array.from({length:6},(_,i)=>({place:mod(z+i,4),a:mod(z+i,4),b:mod(z+i,2),c:mod(z-i,4)}));
  const draw=s=>[border(),...glyphs.map((pts,k)=>{const [cx,cy]=centres[mod(s.place+k,4)],rot=k===0?s.a:k===2?s.c:0,mirror=k===1&&s.b;
   return {t:'polygon',points:pts.map(([xx,yy])=>{let x=xx*(mirror?-1:1),y=yy;for(let j=0;j<rot;j++)[x,y]=[-y,x];return [+(cx+x*10).toFixed(3),+(cy+y*10).toFixed(3)];}),fill:k===0?['hatch','rhatch','hlines','vlines','check'][v] : k===1?'grey':'white'};})];
  return {model:'persistent-glyphs',topic:'Object tracking, rotation and reflection',level:2,rules:4,states,draw,core:['place','a','b','c'],main:['place','a'],
   errors:s=>[...['place','a','c'].flatMap(k=>[1,2,3].map(d=>note(k,mod(s[k]+d,4),k==='place'?'the objects occupy the wrong next corners':`the ${k==='a'?'hatched':'white'} object has the wrong local turn`))),note('b',1-s.b,'the grey object is not reflected as required')],
   hints:['Give each irregular object an identity. Follow that object between corners.','Separate its movement around the frame from its own local rotation or reflection.','The hatched and white objects turn in opposite directions; the grey object mirrors. A mirror is not a quarter-turn.'],
   solution:[`Object positions advance clockwise around the four corners. Next first-object corner: ${['top-left','top-right','bottom-right','bottom-left'][states[5].place]}.`,
    'The patterned object turns 90° clockwise each step. The white object turns 90° anticlockwise. These are turns around each object’s own centre.',
    'The grey object alternates its left/right mirror image while keeping its top/bottom orientation. Its unequal shape distinguishes reflection from rotation.',
    'Combine the predicted corner with each object’s own orientation; do not rotate the whole scene as one rigid picture.'],
   lesson:'Object identity persists through movement. Global position, local rotation and reflection are separate properties. Use the minimum sufficient route, then verify the other objects.'};
 }
 if(f===4){
  const bounce=t=>{const n=mod(t,8);return n<=4?n:8-n;};
  const states=Array.from({length:6},(_,i)=>({area:bounce(z+i),disc:bounce(z+3+i),start:mod(z+i,4)}));
  const draw=s=>[border(),...Array.from({length:s.area},(_,j)=>({t:'rect',x:2,y:2+24*j,w:96,h:24,fill:'hlines'})),
   {t:'circle',x:50,y:50,r:25,fill:'grey'},...Array.from({length:4},(_,j)=>({t:'wedge',x:50,y:50,r:25,a0:j*90,a1:j*90+90,fill:mod(j-s.start,4)<s.disc?'hatch':'grey'}))];
  return {model:'reversible-coverage',topic:'Growing and reversing area coverage',level:2,rules:3,states,draw,core:['area','disc','start'],main:['area','disc'],
   errors:()=>[...['area','disc'].flatMap(k=>Array.from({length:5},(_,v)=>note(k,v,`the ${k==='area'?'background coverage':'hatched circle area'} has the wrong quarter count or reverses at the wrong limit`))),...Array.from({length:4},(_,v)=>note('start',v,'the circle sector boundaries have the wrong next orientation'))],
   hints:['Measure how much is covered, independently of where a sector starts.','Does coverage grow or shrink by one quarter? Check what happens at empty and full.','Track the background, the number of hatched circle quarters and their orientation separately.'],
   solution:[`Background coverage in quarters: ${states.slice(0,5).map(s=>s.area).join(' → ')}. It changes by one quarter, reversing at zero and four. Next: ${states[5].area}/4.`,
    `Hatched circle coverage: ${states.slice(0,5).map(s=>s.disc).join(' → ')}. Apply the same endpoint reversal on its own phase. Next: ${states[5].disc}/4.`,
    'The sector starting direction turns clockwise by one quadrant per step. At empty/full coverage the boundary is invisible; infer its phase from the partially covered frames.'],
   lesson:'Area and orientation are different tracks. Reaching empty or full can reverse a progression without rotating the entire picture.'};
 }
 const boxes=[[6,8],[68,8],[37,62]];
 let counts=[6+z%2,6,6],edge=mod(z,3);const states=[];
 for(let i=0;i<7;i++){
  const amount=1+mod(z+i,3);states.push({counts:counts.slice(),edge,amount});
  const next=mod(edge+1,3);counts=counts.slice();counts[edge]-=amount;counts[next]+=amount;edge=next;
 }
 const draw=s=>{const out=[border()];boxes.forEach(([x,y],k)=>{out.push({t:'rect',x,y,w:26,h:32,fill:'white'});for(let j=0;j<s.counts[k];j++)out.push({t:'circle',x:x+5+j%3*7,y:y+5+Math.floor(j/3)*7,r:2,fill:'black'});});
  const ps=[[32,24],[68,24],[50,62]],dest=mod(s.edge+1,3);out.push(line(ps[s.edge],ps[dest],true));
  for(let k=0;k<s.amount;k++)out.push({t:'poly',n:4,x:40+k*9,y:8,r:2.5,rot:45,fill:'black'});return out;};
 const errors=s=>{const out=[];for(let a=0;a<3;a++)for(let b=0;b<3;b++)if(a!==b&&s.counts[a]>0){const n=s.counts.slice();n[a]--;n[b]++;out.push(note('counts',n,'one token is assigned to the wrong container, although the total is preserved'));}
  for(let d=1;d<3;d++)out.push(note('edge',mod(s.edge+d,3),'the next transfer arrow takes the wrong step'));
  for(let a=1;a<=3;a++)out.push(note('amount',a,'the transfer quantity breaks the one/two/three cycle'));return out;};
 return {model:'conserved-transfer',topic:'Conserved transfers between containers',level:3,rules:3,states,draw,core:['counts','edge','amount'],main:['counts'],
  errors,hints:['Count the tokens in each container. Does their combined total remain fixed?','The arrow tells you which container loses tokens and which gains them. The small squares give the quantity for that transfer.','Use the LAST frame’s arrow and squares to update counts. Then continue the arrow’s movement and the quantity cycle.'],
  solution:[`Container counts (top-left, top-right, bottom): ${states.slice(0,6).map(s=>s.counts.join('/')).join(' → ')}. Total stays ${states[0].counts.reduce((a,b)=>a+b,0)}.`,
   'Between frames, subtract the small-square count from the arrow’s source container and add exactly that count to its destination. Tokens are transferred, not created.',
   'Arrow source advances around the three containers; quantity cycles one/two/three. Use the prior frame’s transfer before updating these indicators.',
   `Next counts: ${states[6].counts.join(', ')}. Next source: container ${states[6].edge+1}; next transfer amount: ${states[6].amount}.`],
  lesson:'The next counts depend on the preceding transfer instruction. Conservation is a check, but every choice preserves the total, so the actual transfer must be reconstructed.'};
}
function build(f,v,index){
 let seed=99001+index*3019;const rnd=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/2**32;};const pick=a=>a[Math.floor(rnd()*a.length)];
 const target=1+index%5;
 for(let restart=0;restart<30;restart++){
  const family=makeFamily(f,v,restart),key=family.states.at(-1),draw=s=>family.draw(family.decorate?family.decorate(copy(s)):s);
  const mutations=family.errors(key).filter(e=>!same(key[e.k],e.v));
  const edits=mutations.map(e=>({changes:[e],state:{...key,[e.k]:e.v}}));
  for(let i=0;i<mutations.length;i++)for(let j=i+1;j<mutations.length;j++)if(mutations[i].k!==mutations[j].k)edits.push({changes:[mutations[i],mutations[j]],state:{...key,[mutations[i].k]:mutations[i].v,[mutations[j].k]:mutations[j].v}});
  const pos=(index*2+Math.floor(index/5))%5;
  for(let tries=0;tries<18000;tries++){
   const ds=family.main.map(k=>pick(edits.filter(e=>e.changes.length===1&&e.changes[0].k===k)));
   while(ds.length<4){const d=pick(edits);if(!ds.some(x=>same(x.state,d.state)))ds.push(d);}
   const states=ds.map(d=>d.state);states.splice(pos,0,key);
   const match=k=>states.filter(s=>same(s[k],key[k])).length;
   if(family.core.some(k=>match(k)<2))continue;
   if(f===5&&states.filter(s=>s.edge===key.edge&&s.amount===key.amount).length<2)continue;
   const options=states.map(draw);if(new Set(options.map(JSON.stringify)).size!==5)continue;
   const b=abstractBlind(options,pos),rank=1+b.sums.filter((s,i)=>i!==pos&&s<b.sums[pos]-1e-9).length;
   if(!['medoid','outlier','majority'].every(k=>b[k]<=.3)){
    if(tries<8000){if(rank!==target||(target!==1&&b.majority>0)||(target!==5&&b.outlier>0))continue;}
    else if(b.medoid>0||b.outlier>0||b.majority>0)continue;
   }
   const notes=ds.map(d=>'Wrong: '+d.changes.map(e=>e.text).join('; ')+'.');notes.splice(pos,0,'Correct. '+family.lesson);
   return {id:`a${17+Math.floor(index/10)}-${String(index%10+1).padStart(2,'0')}`,topic:family.topic,difficulty:family.level,rules:family.rules,
    reasoning:{model:family.model,transfer:true},stem:'Which figure comes next in the series?',sequence:family.states.slice(0,-1).map(draw),options,answer:pos,
    hints:family.hints,optionNotes:notes,explanation:family.lesson,solution:family.solution};
  }
 }
 throw Error('Could not build transfer item '+f+'/'+v);
}
export function generateTransferSets(root){
 // Five variants of each family, interleaved across three ten-question sets.
 const plan=Array.from({length:30},(_,i)=>({f:i%6,v:Math.floor(i/6)})),all=plan.map(({f,v},i)=>build(f,v,i));
 const fingerprints=path.join(root,'scripts/generators/abstract-transfer-fingerprints.json'),prints={};
 for(let s=0;s<3;s++){
  const questions=all.slice(s*10,s*10+10),id='abstract-'+(17+s);
  for(const q of questions)prints[q.id]=crypto.createHash('sha256').update(JSON.stringify(q)).digest('hex');
  for(const method of ['medoid','outlier','majority']){const value=questions.reduce((n,q)=>n+abstractBlind(q.options,q.answer)[method],0)/10;if(value>.3)throw Error(id+' '+method+' '+value);}
  const set={id,section:'abstract',title:`Abstract reasoning · Set ${17+s} — Transfer practice`,description:'10 original mixed Medium/Hard series: identities, regions, edge continuation, irregular objects, coverage and token transfers. Timed practice: 10 minutes.',version:1,questions};
  fs.writeFileSync(path.join(root,`questions/abstract/abstract-set-${17+s}.js`),abstractSetSource(set,'Generated by scripts/generators/abstract-transfer.mjs. Edit the generator, not this file.'));
 }
 if(fs.existsSync(fingerprints)){if(!same(JSON.parse(fs.readFileSync(fingerprints)),prints))throw Error('Published transfer questions changed; use fresh IDs.');}
 else fs.writeFileSync(fingerprints,JSON.stringify(prints,null,2)+'\n');
 console.log('Abstract transfer practice:',all.length,'items across six families.');
}
