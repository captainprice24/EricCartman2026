import {foundationFeatures,patternFeatures} from './abstract-visible.mjs';
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
export function abstractPath(q) {
 const pattern=q.reasoning&&['grid-shift','quadrant-rotation','opposed-conveyor'].includes(q.reasoning.model);
 const read=f=>pattern?patternFeatures(f):foundationFeatures(f).features;
 const rows=q.sequence.map(read),opts=q.options.map(read),key=opts[q.answer];
 const features=Object.keys(key).filter(k=>k!=='layout');
 const matches=Object.fromEntries(features.map(k=>[k,opts.map(o=>same(o[k],key[k]))]));
 const costs=Object.fromEntries(features.map(k=>{
  const values=rows.map(r=>r[k]);
  const cycle=[1,2,3,4].some(p=>values.every((v,i)=>i<p||same(v,values[i-p])));
  const delta=values.slice(1).map((v,i)=>typeof v==='number'?v-values[i]:null);
  const fixed=delta.every(v=>v===delta[0]);
  return [k,!pattern&&!cycle&&!fixed&&k==='dots'?3:1];
 }));
 let best=Infinity,routes=[];
 for(let mask=1;mask<2**features.length;mask++){
  const ks=features.filter((_,i)=>mask&(1<<i));
  if(opts.filter((_,i)=>ks.every(k=>matches[k][i])).length!==1)continue;
  const cost=ks.reduce((n,k)=>n+costs[k],0);
  if(cost<best){best=cost;routes=[ks];}else if(cost===best)routes.push(ks);
 }
 const supports=pattern?(q.reasoning.model==='grid-shift'?['bg','corner','dot']:q.reasoning.model==='quadrant-rotation'?['centre']:['arrow','bg']):[];
 return {cost:best,routes,unique:features.filter(k=>matches[k].filter(Boolean).length===1),
  supportCandidates:opts.filter((_,i)=>supports.every(k=>matches[k][i])).length,
  counts:Object.fromEntries(features.map(k=>[k,matches[k].filter(Boolean).length]))};
}
