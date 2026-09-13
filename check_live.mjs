// 线上核查：列出含特定题干的试卷/题库位置，确认警告来源。
const BASE = process.argv[2] || 'https://jszz-english-trainer.onrender.com';
const need = ['movie I have ever seen', 'best title?'];
const r = await fetch(BASE + '/api/papers').then(x => x.json());
const q = await fetch(BASE + '/api/questions').then(x => x.json());
const papers = Array.isArray(r.data) ? r.data : [];
const questions = Array.isArray(q.data) ? q.data : [];
const flat = (p) => (p.sections || []).flatMap(s => s.qs || []);
for (const p of papers) {
  for (const it of flat(p)) {
    for (const n of need) if ((it.stem || '').includes(n)) console.log(`[PAPER] ${p.title} :: ${it.stem}`);
  }
}
for (const it of questions) {
  for (const n of need) if ((it.stem || '').includes(n)) console.log(`[BANK]  src=${it.src || '-'} :: ${it.stem}`);
}
console.log(`\n共 ${papers.length} 套卷, ${questions.length} 题。`);
