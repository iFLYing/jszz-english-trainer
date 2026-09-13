// 上传脚本：将 expand_data.mjs 中的 extraQuestions + newPapers 推送到线上。
// 特点：
//  1) 先 GET 现有 questions/papers，再 concat，绝不覆盖种子数据；
//  2) 按 src 标签做幂等：重复运行时先剔除旧批次再追加，不产生重复；
//  3) 上线前做校验（答案合法性、与种子数据的跨实体重复预警）；
//  4) 针对 Render 免费版冷启动做 8 次重试。
import { extraQuestions, newPapers } from './expand_data.mjs';

const BASE = process.argv[2] || 'https://jszz-english-trainer.onrender.com';
const SRC = 'jszz-expand-v1';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function get(path) {
  let lastErr;
  for (let i = 0; i < 8; i++) {
    try {
      const r = await fetch(BASE + path);
      if (!r.ok) throw new Error('HTTP ' + r.status);
      const j = await r.json();
      return Array.isArray(j.data) ? j.data : [];
    } catch (e) {
      lastErr = e;
      if (i === 7) throw e;
      console.log(`  ↻ 重试 GET ${path} (${i + 1}/8): ${e.message}`);
      await sleep(2000);
    }
  }
}
async function put(entity, data) {
  let lastErr;
  for (let i = 0; i < 8; i++) {
    try {
      const r = await fetch(BASE + '/api/' + entity, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId: 'upload_expand', data }),
      });
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return await r.json();
    } catch (e) {
      lastErr = e;
      if (i === 7) throw e;
      console.log(`  ↻ 重试 PUT ${entity} (${i + 1}/8): ${e.message}`);
      await sleep(2000);
    }
  }
}

const OBJ = new Set(['单项选择', '完形填空', '补全对话', '阅读理解']);
const allPaperQs = (p) => p.sections.flatMap((s) => s.qs);

console.log('① 拉取线上现有数据 …');
const exQ = await get('/api/questions');
const exP = await get('/api/papers');
console.log(`   现有 questions=${exQ.length}, papers=${exP.length}`);

console.log('② 校验：答案必须落在选项内 …');
let hardErr = 0;
const checkAnswers = (arr, where) => {
  for (const q of arr) {
    if (OBJ.has(q.questionType)) {
      if (!Array.isArray(q.options) || q.options.length === 0 || !q.options.includes(q.answer)) {
        console.log(`   ✗ [答案非法] ${where}: ${q.stem}`);
        hardErr++;
      }
    }
  }
};
checkAnswers(extraQuestions, '题库新增');
for (const p of newPapers) checkAnswers(allPaperQs(p), p.title);
if (hardErr > 0) { console.error(`校验失败：${hardErr} 处答案非法，已终止写入。`); process.exit(1); }

console.log('③ 跨实体重复预警（新卷/新题 vs 仅种子数据，排除上批次自身）…');
const seedP = exP.filter((p) => p.src !== SRC);
const seedQ = exQ.filter((q) => q.src !== SRC);
const exPaperStems = new Set(seedP.flatMap(allPaperQs).map((q) => q.stem));
const exQuestStems = new Set(seedQ.map((q) => q.stem));
let warn = 0;
for (const p of newPapers)
  for (const q of allPaperQs(p))
    if (exPaperStems.has(q.stem)) { console.log(`   ⚠ 新卷与种子卷题干重复: ${q.stem}`); warn++; }
for (const q of extraQuestions)
  if (exQuestStems.has(q.stem)) { console.log(`   ⚠ 新题与种子题库题干重复: ${q.stem}`); warn++; }
console.log(`   预警 ${warn} 处（不影响写入；如为空则种子无重复）。`);

console.log('④ 组装幂等数据（剔除旧批次 src=' + SRC + '）…');
const finalQ = [...exQ.filter((q) => q.src !== SRC), ...extraQuestions];
const finalP = [...exP.filter((p) => p.src !== SRC), ...newPapers.map((p) => ({ ...p, src: SRC }))];
console.log(`   将写入 questions=${finalQ.length} (原有 ${exQ.length} + 新增 ${extraQuestions.length})`);
console.log(`   将写入 papers=${finalP.length} (原有 ${exP.length} + 新增 ${newPapers.length})`);
console.log(`   新增试卷：${newPapers.map((p) => p.title).join(' / ')}`);

console.log('⑤ 写入线上 …');
await put('questions', finalQ);
await put('papers', finalP);

console.log('⑥ 回读验证 …');
const vQ = await get('/api/questions');
const vP = await get('/api/papers');
console.log(`   验证 questions=${vQ.length} (期望 ${finalQ.length})`);
console.log(`   验证 papers=${vP.length} (期望 ${finalP.length})`);
const ok = vQ.length === finalQ.length && vP.length === finalP.length;
console.log(ok ? '\n✅ 上传并验证成功！' : '\n❌ 验证不一致，请检查。');
process.exit(ok ? 0 : 1);
