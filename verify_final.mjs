// 线上最终复核：试卷命名、题量、跨卷重复、卷与题库重复、答案合法性
const BASE = process.argv[2] || 'https://jszz-english-trainer.onrender.com';
async function api(path, tries = 8) {
  for (let i = 0; i < tries; i++) {
    try { const r = await fetch(`${BASE}${path}`); if (!r.ok) throw new Error('HTTP ' + r.status); return (await r.json()).data; }
    catch (e) { if (i === tries - 1) throw e; await new Promise((r) => setTimeout(r, 8000)); }
  }
}
const norm = (s) => String(s || '').replace(/\s+/g, ' ').trim().toLowerCase();
const allQs = (p) => (p.sections || []).flatMap((s) => s.qs || []);

const papers = await api('/api/papers');
const bank = await api('/api/questions');

console.log(`试卷 ${papers.length} 套 / 题库 ${bank.length} 题\n`);
papers.forEach((p) => {
  const d = p.sections.map((s) => `${s.type}${s.qs.length}`).join(' ');
  console.log(`  ${p.title}  (${p.year} · ${p.kind} · ${p.duration}分钟)  ${allQs(p).length}题  [${d}]`);
});

let dupPaper = 0, dupBank = 0, badAns = 0;
const seen = new Map();
for (const p of papers) for (const q of allQs(p)) {
  const k = norm(q.stem);
  if (seen.has(k)) { dupPaper++; console.log(`   ✗ 跨卷重复：${seen.get(k)} ↔ ${p.title} | ${q.stem}`); }
  else seen.set(k, p.title);
  if (q.options && Array.isArray(q.options) && !q.options.includes(q.answer)) { badAns++; console.log(`   ✗ 答案非法：${p.title} | ${q.stem}`); }
}
const bankKeys = new Set(bank.map((q) => norm(q.stem)));
for (const [k, t] of seen) if (bankKeys.has(k)) { dupBank++; console.log(`   ✗ 卷↔题库重复：${t}`); }

const qTotal = papers.reduce((n, p) => n + allQs(p).length, 0);
console.log(`\n试卷题目总数：${qTotal}`);
console.log(`跨卷重复：${dupPaper} | 卷↔题库重复：${dupBank} | 答案非法：${badAns}`);
console.log(dupPaper === 0 && dupBank === 0 && badAns === 0 && papers.length === 10 ? '\n✅ 线上复核全部通过' : '\n❌ 存在问题');
