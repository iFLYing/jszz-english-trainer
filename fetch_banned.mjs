// 拉取线上已有全部题干（questions + 保留试卷），输出为禁用词表 JSON，供新卷命制时避重
import fs from 'node:fs';

const BASE = process.argv[2] || 'https://jszz-english-trainer.onrender.com';

async function get(entity, tries = 8) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(`${BASE}/api/${entity}`);
      if (!r.ok) throw new Error('HTTP ' + r.status);
      const j = await r.json();
      return j.data || j;
    } catch (e) {
      if (i === tries - 1) throw e;
      await new Promise((r) => setTimeout(r, 8000));
    }
  }
}

const norm = (s) => String(s || '').replace(/\s+/g, ' ').trim().toLowerCase();

const questions = await get('questions');
const papers = await get('papers');

const DROP = new Set(['91192f25-0e77-4098-ac8c-44abfc6753ff', 'a4baf234-f0f9-45d9-9ab2-11d293c8a9cf']);
const kept = papers.filter((p) => !DROP.has(p.id));

const allQs = (p) => (p.sections || []).flatMap((s) => s.qs || []);

const bank = questions.map((q) => ({ stem: q.stem, from: '题库:' + (q.knowledgePoint || q.questionType) }));
const paperQs = kept.flatMap((p) => allQs(p).map((q) => ({ stem: q.stem, from: p.title + '|' + q.questionType })));

const map = new Map();
for (const it of [...bank, ...paperQs]) {
  const k = norm(it.stem);
  if (!map.has(k)) map.set(k, { stem: it.stem, count: 0, from: [] });
  const e = map.get(k);
  e.count++;
  e.from.push(it.from);
}

const out = [...map.values()].sort((a, b) => a.stem.localeCompare(b.stem));
fs.writeFileSync('banned_stems.json', JSON.stringify(out, null, 1), 'utf8');

console.log('题库题数:', questions.length);
console.log('保留试卷:', kept.length, '套，共', paperQs.length, '题（其中删除', papers.length - kept.length, '套）');
console.log('唯一题干数:', out.length);
console.log('（已写入 banned_stems.json）');
