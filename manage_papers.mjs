// 试卷管理：① 删除指定 2 套旧卷 ② 重命名（去掉“2023-2025”）③ 新增 3 套（幂等）
import { randomUUID } from 'node:crypto';
import { newPapers3 } from './papers_8_10.mjs';

const BASE = process.argv[2] || 'https://jszz-english-trainer.onrender.com';
const SRC = 'jszz-expand-v2';

const DROP_TITLES = ['2024年江苏省对口单招英语模拟卷（一）', '2023年江苏省对口单招英语真题（节选）'];

async function api(path, opts = {}, tries = 8) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(`${BASE}${path}`, opts);
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return await r.json();
    } catch (e) {
      if (i === tries - 1) throw e;
      await new Promise((r) => setTimeout(r, 8000));
    }
  }
}

const norm = (s) => String(s || '').replace(/\s+/g, ' ').trim().toLowerCase();
const allQs = (p) => (p.sections || []).flatMap((s) => s.qs || []);

const before = (await api('/api/papers')).data;
const bank = (await api('/api/questions')).data;
console.log(`① 现状：试卷 ${before.length} 套，题库 ${bank.length} 题`);

// ② 删除指定 2 套
const kept = before.filter((p) => !DROP_TITLES.includes(p.title));
console.log(`② 删除 ${before.length - kept.length} 套（${DROP_TITLES.join('、')}）`);

// ③ 重命名：去掉“2023-2025”
let renamed = 0;
for (const p of kept) {
  if (p.title.includes('2023-2025')) { p.title = p.title.replace('2023-2025', '').replace(/\s{2,}/g, ' ').trim(); renamed++; }
}
console.log(`③ 重命名 ${renamed} 套（去掉“2023-2025”）`);

// ③b 热修补历史遗留的“卷 ↔ 题库”重题（仅改试卷，题库保留原题）
const PATCH = [
  {
    from: 'A: Excuse me, where is the library?  B: ______',
    set: {
      stem: 'A: Excuse me, is there a bank near here?  B: ______',
      options: ['Yes, it is just behind the school.', 'Yes, I am.', 'No, thanks.', 'You are welcome.'],
      answer: 'Yes, it is just behind the school.',
      analysis: '询问附近是否有银行，应答给出方位。',
    },
  },
  {
    from: 'If it ______ tomorrow, we will stay at home.',
    set: {
      stem: 'Tom is ______ of the two boys.',
      options: ['taller', 'the taller', 'tallest', 'the tallest'],
      answer: 'the taller',
      analysis: '表示“两者中较……的一个”，比较级前加 the。',
      knowledge: '比较等级',
      knowledgePoint: '两者中较……的一个',
    },
  },
];
let patched = 0;
for (const p of kept) {
  for (const q of allQs(p)) {
    const hit = PATCH.find((x) => norm(x.from) === norm(q.stem));
    if (hit) { Object.assign(q, hit.set); patched++; }
  }
}
console.log(`③b 修补试卷与题库重题 ${patched} 处`);

// ④ 幂等：先移除上一批 v2 卷，再追加
const withoutV2 = kept.filter((p) => !allQs(p).some((q) => q.src === SRC));
const final = [...withoutV2, ...newPapers3];
console.log(`④ 新增 ${newPapers3.length} 套（已有 v2 旧批次已移除 ${kept.length - withoutV2.length} 套）`);

// ⑤ 校验：新 3 套 vs 其它保留卷 vs 题库
const errs = [];
const seen = new Map();
for (const p of final) {
  const local = new Set();
  for (const q of allQs(p)) {
    const k = norm(q.stem);
    if (local.has(k)) errs.push(`[卷内重复] ${p.title}：${q.stem}`);
    local.add(k);
    if (seen.has(k) && seen.get(k) !== p.title) errs.push(`[跨卷重复] ${seen.get(k)} ↔ ${p.title}：${q.stem}`);
    else seen.set(k, p.title);
    if (q.options && Array.isArray(q.options) && !q.options.includes(q.answer)) errs.push(`[答案非法] ${p.title}：${q.stem}`);
  }
}
for (const q of bank) {
  const k = norm(q.stem);
  if (seen.has(k)) errs.push(`[与题库重复] ${seen.get(k)} ↔ 题库：${q.stem}`);
}
console.log(`⑤ 校验：${errs.length === 0 ? '通过（0 冲突）' : errs.length + ' 处问题'}`);
errs.slice(0, 30).forEach((e) => console.log('   ✗ ' + e));
if (errs.length) { console.log('已中止，未写入。'); process.exit(1); }

// ⑥ 写入
await api('/api/papers', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ clientId: randomUUID(), data: final }),
});
console.log('⑥ 已写入');

// ⑦ 回读验证
const after = (await api('/api/papers')).data;
console.log('\n===== 线上回读 =====');
console.log('试卷总数：', before.length, '→', after.length);
after.forEach((p) => {
  console.log(`   ${p.title}  (${allQs(p).length} 题)`);
});
const totalQ = after.reduce((n, p) => n + allQs(p).length, 0);
const k2 = new Map(); let dup = 0;
for (const p of after) for (const q of allQs(p)) { const k = norm(q.stem); if (k2.has(k)) dup++; else k2.set(k, p.title); }
console.log(`\n跨卷重复复核：${dup}`);
console.log(dup === 0 && after.length === 10 ? '✅ 上线成功' : '❌ 存在问题');
