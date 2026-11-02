// Rendered-option and palette checks with the application renderer and computed CSS.
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {chromium} from 'playwright';
const browser=await chromium.launch(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{});
try {
 const page=await browser.newPage();await page.goto((process.env.E2E_BASE_URL||'http://127.0.0.1:8000')+'/dist/ad5-reasoning-trainer.html');
 const evidence=await page.evaluate(async()=>{
  const host=document.createElement('div');document.body.append(host);
  const canvas=document.createElement('canvas');canvas.width=100;canvas.height=100;const context=canvas.getContext('2d');
  async function raster(fig){
   host.innerHTML=window.EPSO_RENDER.figureSVG(fig,'audit');const svg=host.querySelector('svg');svg.setAttribute('xmlns','http://www.w3.org/2000/svg');svg.setAttribute('width','100');svg.setAttribute('height','100');
   for(const el of svg.querySelectorAll('*')){const css=getComputedStyle(el);el.setAttribute('style',`fill:${css.fill};stroke:${css.stroke};stroke-width:${css.strokeWidth};stroke-linejoin:${css.strokeLinejoin}`);}
   const url=URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(svg)],{type:'image/svg+xml'}));
   try{const img=new Image();await new Promise((resolve,reject)=>{img.onload=resolve;img.onerror=reject;img.src=url;});context.fillStyle='#fff';context.fillRect(0,0,100,100);context.drawImage(img,0,0,100,100);
    return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',context.getImageData(0,0,100,100).data))).map(v=>v.toString(16).padStart(2,'0')).join('');
   }finally{URL.revokeObjectURL(url);}
  }
  const result={items:220,size:'100x100',themes:{},paletteMismatches:[]};const light=new Map();
  for(const theme of ['light','dark']){
   document.documentElement.setAttribute('data-theme',theme);const duplicates=[],repeatedKeys=[];let figures=0;
   for(const q of window.EPSO_APP.bank.bySection.abstract){const hashes=[];for(const f of [...q.sequence,...q.options])hashes.push(await raster(f));figures+=hashes.length;
    const opts=hashes.slice(q.sequence.length);if(new Set(opts).size!==5)duplicates.push(q.id);
    if(hashes.slice(0,q.sequence.length).includes(opts[q.answer]))repeatedKeys.push(q.id);
    if(theme==='light')light.set(q.id,hashes);else if(JSON.stringify(light.get(q.id))!==JSON.stringify(hashes))result.paletteMismatches.push(q.id);
   }
   result.themes[theme]={figures,duplicateOptions:duplicates,validCyclicKeyRepeats:repeatedKeys};
  }
  host.remove();return result;
 });
 assert.equal(evidence.paletteMismatches.length,0);for(const theme of Object.values(evidence.themes))assert.equal(theme.duplicateOptions.length,0);
 evidence.limits='Exact equality at one resolution, not perceptual equivalence or universal rule uniqueness.';
 fs.writeFileSync('docs/audit/abstract-rendering.json',JSON.stringify(evidence,null,2)+'\n');console.log(JSON.stringify(evidence,null,2));
}finally{await browser.close();}
