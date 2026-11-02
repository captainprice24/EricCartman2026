// Independent visible-figure interpretation. No generator, key, rule-name or explanation inputs.
const mod = (v,n) => ((v%n)+n)%n;
const same = (a,b) => JSON.stringify(a) === JSON.stringify(b);
const shapeName = s => s.t === 'circle' ? 'circle' : s.t === 'rect' ? 'square' : ({3:'triangle',4:'diamond',5:'pentagon',6:'hexagon'})[s.n];
const angle = (x,y,cx=50,cy=50) => mod(Math.round(Math.atan2(x-cx,cy-y)*4/Math.PI),8);
const side = s => Math.abs(s.x-50)>Math.abs(s.y-50) ? (s.x>50?1:3) : (s.y>50?2:0);
const gridCell = (x,y) => Math.round((x-20)/30)+3*Math.round((y-20)/30);
const perimeter = [0,1,2,5,8,7,6,3];
export function foundationFeatures(fig) {
  if(fig.some(s=>s.t==='wedge')) {
    const wedges=fig.filter(s=>s.t==='wedge'),centre=fig.find(s=>s.t==='circle'&&s.r===9),marker=fig.find(s=>s.t==='poly');
    return {layout:'segments',moduli:{black:wedges.length,grey:wedges.length,marker:4},features:{black:wedges.findIndex(s=>s.fill==='black'),grey:wedges.findIndex(s=>s.fill==='grey'),centre:centre.fill,marker:side(marker)}};
  }
  if(fig.some(s=>s.t==='rect'&&s.w===90)) {
    const circle=fig.find(s=>s.t==='circle'),star=fig.find(s=>s.t==='star'),arrow=fig.find(s=>s.t==='arrow'),shade=fig.find(s=>s.t==='rect'&&s.w===30);
    return {layout:'grid',moduli:{circle:8,star:9,arrow:8},features:{circle:perimeter.indexOf(gridCell(circle.x+7,circle.y+7)),star:gridCell(star.x-7,star.y-7),arrow:mod(arrow.rot/45,8),shade:Math.round((shade.x-5)/30)+3*Math.round((shade.y-5)/30),circleFill:circle.fill}};
  }
  if(fig.some(s=>s.t==='line'&&s.x1===50&&s.y1===50)) {
    const tip=fig.find(s=>s.t==='circle'&&s.r===6),short=fig.find(s=>s.t==='poly'&&s.r===6),hub=fig.at(-1);
    return {layout:'hands',moduli:{long:8,short:8},features:{long:angle(tip.x,tip.y),short:angle(short.x,short.y),tip:tip.fill,hub:shapeName(hub),hubFill:hub.fill}};
  }
  if(fig.length===3&&fig.some(s=>s.t==='circle'&&s.r===4)) {
    const big=fig.filter(s=>!(s.t==='circle'&&s.r===4));
    const x=s=>s.t==='rect'?s.x+s.w/2:s.x;
    const left=big.find(s=>x(s)<50),right=big.find(s=>x(s)>50),marker=fig.find(s=>s.t==='circle'&&s.r===4);
    return {layout:'overlap',moduli:{marker:4},features:{left:shapeName(left),right:shapeName(right),leftFill:left.fill,rightFill:right.fill,front:x(big.at(-1))<50?'left':'right',marker:side(marker)}};
  }
  const outer=fig[0],arrow=fig.find(s=>s.t==='arrow'),corner=fig.find(s=>s.t==='circle'&&s.r===6),slot=fig.find(s=>s.t==='rect'&&s.h===6);
  return {layout:'single',moduli:{arrow:8,corner:4},features:{shape:shapeName(outer),fill:outer.fill,arrow:arrow?mod(arrow.rot/45,8):null,corner:(corner.y<40?(corner.x<50?0:1):(corner.x<50?3:2)),dots:fig.filter(s=>s.t==='circle'&&s.r===3.5).length,slot:slot?Math.round((slot.x+5-30)/20):null}};
}
export function trackContinuations(values, modulus, count=false) {
  const predictions=[];
  // A short cycle must reproduce the observed frames; different fits may predict the same value.
  for(let period=1;period<=4;period++)if(values.every((v,i)=>i<period||same(v,values[i-period])))predictions.push(values[values.length%period]);
  if(modulus!==undefined&&values.every(Number.isFinite)) {
    const step=mod(values[1]-values[0],modulus);
    if(values.every((v,i)=>i===0||mod(v-values[i-1],modulus)===step))predictions.push(mod(values.at(-1)+step,modulus));
  }
  if(count) {
    const changes=values.slice(1).map((v,i)=>v-values[i]);
    if(changes.every((v,i)=>v===changes[i%2]))predictions.push(values.at(-1)+changes[changes.length%2]);
  }
  return [...new Map(predictions.map(v=>[JSON.stringify(v),v])).values()];
}
export function inferFoundation(sequence) {
  const decoded=sequence.map(foundationFeatures),first=decoded[0];
  if(!decoded.every(r=>r.layout===first.layout))throw Error('Layout changes within series');
  const next={},fits={};
  for(const key of Object.keys(first.features)) {
    const values=decoded.map(r=>r.features[key]);
    fits[key]=trackContinuations(values,first.moduli[key],first.layout==='single'&&key==='dots');
    if(fits[key].length!==1)return {layout:first.layout,next:null,fits};
    next[key]=fits[key][0];
  }
  return {layout:first.layout,next,fits};
}
