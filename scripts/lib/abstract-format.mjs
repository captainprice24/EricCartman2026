// Keep each figure on one line so generated revisions remain reviewable.
export function abstractSetSource(set,comment){
 const body=JSON.stringify({...set,questions:[]},null,2).replace('"questions": []','"questions": [\n'+
  set.questions.map(q=>'    {\n'+Object.entries(q).map(([k,v])=>
   k==='sequence'||k==='options'?`      "${k}": [\n`+v.map(f=>'        '+JSON.stringify(f)).join(',\n')+'\n      ]':`      "${k}": ${JSON.stringify(v)}`
  ).join(',\n')+'\n    }').join(',\n')+'\n  ]');
 return '/* '+comment+' */\nEPSO_BANK.registerSet('+body+');\n';
}
