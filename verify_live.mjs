// 线上最终校验：确认 7 套新卷之间题目互不重复，且与种子卷也不重复。
const BASE = process.argv[2] || 'https://jszz-english-trainer.onrender.com';
const r = await fetch(BASE + '/api/papers').then((x) => x.json());
const papers = Array.isArray(r.data) ? r.data : [];
const flat = (p) => (p.sections || []).flatMap((s) => s.qs || []);
const isNew = (p) => (p.title || '').includes('真题仿真模拟卷');
const newP = papers.filter(isNew);
const seedP = papers.filter((p) => !isNew(p));
console.log(`线上共 ${papers.length} 套卷：新卷 ${newP.length} 套，种子卷 ${seedP.length} 套`);

// 1) 7 套新卷之间题目互不重复
const seen = new Map();
let cross = 0;
for (const p of newP)
  for (const q of flat(p)) {
    if (seen.has(q.stem) && seen.get(q.stem) !== p.title) {
      console.log(`  ✗ 新卷间重复: "${q.stem}" (${seen.get(q.stem)} & ${p.title})`);
      cross++;
    } else seen.set(q.stem, p.title);
  }
console.log(`  · 新卷间重复：${cross} 处`);

// 2) 新卷与题干与种子卷不重复
const seedStems = new Set(seedP.flatMap(flat).map((q) => q.stem));
let vsSeed = 0;
for (const p of newP)
  for (const q of flat(p))
    if (seedStems.has(q.stem)) { console.log(`  ✗ 与种子卷重复: ${p.title} :: ${q.stem}`); vsSeed++; }
console.log(`  · 新卷 vs 种子卷重复：${vsSeed} 处`);

// 3) 每套新卷题量
for (const p of newP) console.log(`  · ${p.title}: ${flat(p).length} 题`);

const ok = cross === 0 && vsSeed === 0;
console.log(ok ? '\n✅ 满足"试卷题目不得重复"（新卷间 & 新卷vs种子卷均为 0）' : '\n❌ 仍存在重复');
process.exit(ok ? 0 : 1);
