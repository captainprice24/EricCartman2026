// Independent visible-geometry reader. No generator, author state, keys or model tags.
import assert from 'node:assert/strict';
const mod=(x,n)=>(x%n+n)%n;
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const close=(a,b)=>Math.abs(a-b)<.001;
const pointsKey=ps=>ps.map(p=>p.map(x=>Math.round(x*1000)/1000).join(',')).sort().join(';');
const prototypes=[
 [[-1,-1],[-.35,-1],[-.35,.1],[1,.1],[1,1],[-1,1]],
 [[-1,-1],[1,-1],[.45,-.25],[1,.35],[-.3,.35],[-.3,1],[-1,1]],
 [[-1,-1],[.3,-1],[.3,-.35],[1,-.35],[1,1],[-.3,1],[-.3,.3],[-1,.3]]
];
function transformed(ps,turns,mirror=false){return ps.map(([x,y])=>{if(mirror)x=-x;for(let j=0;j<turns;j++)[x,y]=[-y,x];return [x,y];});}
const corner=(x,y)=>x<50?(y<50?0:3):(y<50?1:2);
export function readTransfer(fig){
 const polygons=fig.filter(s=>s.t==='polygon');
 if(polygons.length){
  const objects=polygons.map(s=>{
   const xs=s.points.map(p=>p[0]),ys=s.points.map(p=>p[1]);
   const cx=(Math.min(...xs)+Math.max(...xs))/2,cy=(Math.min(...ys)+Math.max(...ys))/2;
   const scaled=s.points.map(([x,y])=>[(x-cx)/10,(y-cy)/10]),id=s.points.length-6;
   assert.ok(id>=0&&id<3,'recognisable irregular silhouette');
   const fits=[];for(let r=0;r<4;r++)for(const m of [false,true])if(pointsKey(transformed(prototypes[id],r,m))===pointsKey(scaled))fits.push({r,m});
   assert.equal(fits.length,1,'orientation/reflection uniquely visible');
   return {id,place:corner(cx,cy),...fits[0]};
  }).sort((a,b)=>a.id-b.id);
  return {layout:'objects',place:objects[0].place,a:objects[0].r,b:+objects[1].m,c:objects[2].r,objects};
 }
 const boxes=fig.filter(s=>s.t==='rect'&&s.w===26&&s.h===32);
 if(boxes.length===3){
  boxes.sort((a,b)=>a.y-b.y||a.x-b.x);
  const counts=boxes.map(b=>fig.filter(s=>s.t==='circle'&&s.x>b.x&&s.x<b.x+b.w&&s.y>b.y&&s.y<b.y+b.h).length);
  const arrow=fig.find(s=>s.t==='line'&&s.arrowEnd);
  const nearest=(x,y)=>boxes.map((b,i)=>({i,d:Math.hypot(x-b.x-b.w/2,y-b.y-b.h/2)})).sort((a,b)=>a.d-b.d)[0].i;
  return {layout:'containers',counts,edge:nearest(arrow.x1,arrow.y1),destination:nearest(arrow.x2,arrow.y2),amount:fig.filter(s=>s.t==='poly'&&s.n===4&&s.y===8).length};
 }
 const region=fig.find(s=>s.t==='circle'&&s.r===28);
 if(region){
  const dots=fig.filter(s=>s.t==='circle'&&s.r<4);
  const within=s=>Math.hypot(s.x-region.x,s.y-region.y)<region.r;
  const black=dots.filter(s=>s.fill==='black'),grey=dots.filter(s=>s.fill==='grey');
  assert.ok(black.length&&grey.length);
  assert.ok(black.every(s=>within(s)===within(black[0]))&&grey.every(s=>within(s)===within(grey[0])),'each colour in one region');
  assert.notEqual(within(black[0]),within(grey[0]));
  return {layout:'regions',inside:within(grey[0])?1:0,relation:Math.sign(grey.length-black.length)};
 }
 const heads=fig.filter(s=>s.t==='line'&&s.arrowEnd);
 if(heads.length){
  const frame=fig.find(s=>s.t==='rect');
  const tails=fig.filter(s=>s.t==='line'&&!s.arrowEnd),h=heads[0];
  const angle=Math.atan2(h.y2-h.y1,h.x2-h.x1);
  const direction=mod(Math.floor((angle+Math.PI/2)/(Math.PI/2)),4);
  const vector=s=>[s.x2-s.x1,s.y2-s.y1];
  const matched=heads.every(head=>tails.some(tail=>{
   const dx=head.x1-tail.x2,dy=head.y1-tail.y2;
   const opposite=(close(Math.abs(dx),frame.w)&&close(dy,0))||(close(Math.abs(dy),frame.h)&&close(dx,0));
   const a=vector(head),b=vector(tail);
   return opposite&&close(a[0]*b[1]-a[1]*b[0],0)&&a[0]*b[0]+a[1]*b[1]>0;
  }));
  assert.ok(heads.every(s=>same(vector(s),vector(h))),'common direction');
  return {layout:'boundary',direction,matched};
 }
 const wedges=fig.filter(s=>s.t==='wedge');
 if(wedges.length===4){
  const filled=wedges.filter(s=>s.fill==='hatch'),disc=filled.length;
  const indices=filled.map(s=>s.a0/90);
  const start=disc===0||disc===4?null:indices.find(j=>!indices.includes(mod(j-1,4)));
  assert.ok(start!==undefined,'contiguous coverage');
  return {layout:'coverage',area:fig.filter(s=>s.t==='rect'&&s.fill==='hlines').reduce((n,s)=>n+s.h/24,0),disc,start};
 }
 const big=fig.find(s=>s.r===25),small=fig.find(s=>s.r===7);
 assert.ok(big&&small,'large output and small input');
 const identity=s=>s.t==='star'?'star':'polygon-'+s.n;
 return {layout:'handoff',kind:identity(big),shade:big.fill,small:identity(small),smallShade:small.fill};
}
function step(values,n){
 const d=mod(values[1]-values[0],n);
 assert.ok(values.every((v,i)=>i===0||mod(v-values[i-1],n)===d),'consistent visible step');
 return mod(values.at(-1)+d,n);
}
function bouncing(values){
 const fits=[];for(let phase=0;phase<8;phase++){
  const value=i=>{const t=mod(phase+i,8);return t<=4?t:8-t;};
  if(values.every((v,i)=>v===value(i)))fits.push(value(values.length));
 }
 const unique=[...new Set(fits)];assert.equal(unique.length,1,'unique bounded area continuation');return unique[0];
}
export function inferTransfer(sequence){
 const rows=sequence.map(readTransfer),last=rows.at(-1),n=rows.length;
 assert.ok(rows.every(r=>r.layout===last.layout));
 let next;
 if(last.layout==='handoff'){
  assert.ok(rows.slice(1).every((r,i)=>r.kind===rows[i].small&&r.shade===rows[i].smallShade),'prior input copied in each transition');
  next={kind:last.small,shade:last.smallShade};
 }else if(last.layout==='regions'){
  assert.ok(rows.every(r=>r.relation===last.relation&&r.relation!==0),'strict invariant inequality');
  next={inside:step(rows.map(r=>r.inside),2),relation:last.relation};
 }else if(last.layout==='boundary'){
  assert.ok(rows.every(r=>r.matched),'every displayed fragment reconnects');
  next={direction:step(rows.map(r=>r.direction),4),matched:true};
 }else if(last.layout==='objects'){
  assert.ok(rows.every(r=>r.objects.every((o,i)=>o.place===mod(r.place+i,4)&& (i===1?o.r===0:!o.m))),'persistent object identities');
  next=Object.fromEntries(['place','a','b','c'].map(k=>[k,step(rows.map(r=>r[k]),k==='b'?2:4)]));
 }else if(last.layout==='coverage'){
  next={area:bouncing(rows.map(r=>r.area)),disc:bouncing(rows.map(r=>r.disc))};
  const orientations=[];for(let phase=0;phase<4;phase++)for(const delta of [1,3])if(rows.every((r,i)=>r.start===null||r.start===mod(phase+delta*i,4)))orientations.push(mod(phase+delta*n,4));
  if(next.disc>0&&next.disc<4){const values=[...new Set(orientations)];assert.equal(values.length,1,'visible sector phase');next.start=values[0];}
 }else{
  assert.ok(rows.every(r=>r.destination===mod(r.edge+1,3)));
  for(let i=1;i<n;i++){
   const prior=rows[i-1],expected=prior.counts.slice();expected[prior.edge]-=prior.amount;expected[prior.destination]+=prior.amount;
   assert.ok(same(rows[i].counts,expected),'transfer follows previous visible instruction');
  }
  const counts=last.counts.slice();counts[last.edge]-=last.amount;counts[last.destination]+=last.amount;
  const edge=step(rows.map(r=>r.edge),3);
  next={counts,edge,destination:mod(edge+1,3),amount:1+step(rows.map(r=>r.amount-1),3)};
 }
 return {next,matches:fig=>{const r=readTransfer(fig);return r.layout===last.layout&&Object.entries(next).every(([k,v])=>same(r[k],v));}};
}
