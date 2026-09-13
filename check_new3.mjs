// 本地校验：新 3 套卷自身不重复、彼此不重复、且不与线上已有题干（banned_stems.json）重复
import fs from 'node:fs';
import { newPapers3 } from './papers_8_10.mjs';

const banned = new Set(JSON.parse(fs.readFileSync('banned_stems.json', 'utf8')).map((x) => x.stem.replace(/\s+/g, ' ').trim().toLowerCase()));
const norm = (s) => String(s || '').replace(/\s+/g, ' ').trim().toLowerCase();
const allQs = (p) => (p.sections || []).flatMap((s) => s.qs || []);

let bad = 0;
const dupSelf = [], dupBetween = [], dupBanned = [], badAnswer = [];

for (const p of newPapers3) {
  const seen = new Map();
  for (const q of allQs(p)) {
    const k = norm(q.stem);
    if (seen.has(k)) dupSelf.push(`${p.title} 卷内重复：${q.stem}`);
    seen.set(k, q);
    if (banned.has(k)) dupBanned.push(`${p.title} 与已有题重复：${q.stem}`);
    if (q.options && Array.isArray(q.options) && !q.options.includes(q.answer)) badAnswer.push(`${p.title} 答案不在选项内：${q.stem}`);
  }
}

const global = new Map();
for (const p of newPapers3) {
  for (const q of allQs(p)) {
    const k = norm(q.stem);
    if (global.has(k) && global.get(k) !== p.title) dupBetween.push(`${global.get(k)} ↔ ${p.title}：${q.stem}`);
    else global.set(k, p.title);
  }
}

const report = (name, arr) => { console.log(`${name}：${arr.length}`); arr.slice(0, 40).forEach((x) => console.log('   ✗ ' + x)); bad += arr.length; };
report('① 卷内重复', dupSelf);
report('② 新三套之间重复', dupBetween);
report('③ 与线上已有题干重复', dupBanned);
report('④ 答案非法', badAnswer);

console.log('\n每套题数：');
newPapers3.forEach((p) => {
  const n = allQs(p).length;
  const detail = p.sections.map((s) => `${s.type}${s.qs.length}`).join('/');
  console.log(`   ${p.title}：${n} 题（${detail}）`);
});

console.log(bad === 0 ? '\n✅ 全部通过（0 冲突）' : `\n❌ 共 ${bad} 处问题，需修复后再上传`);
process.exit(bad === 0 ? 0 : 1);
