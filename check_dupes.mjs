// 本地校验脚本：不连服务器、不含任何凭据。
// 检查 7 套模拟卷（newPapers）之间：
//   1) 客观题 answer 必须落在 options 内
//   2) 卷内 stem 不重复
//   3) 跨卷 stem 不重复（题目文本不得重复）
// 同时打印所有冲突，便于精准修复。
import { extraQuestions, newPapers } from './expand_data.mjs';

const OBJ = new Set(['mcq', 'cloze', 'dialog', 'read']);
const allQs = (p) => p.sections.flatMap(s => s.qs);

let problems = 0;

// 1) answer-in-options
for (const p of newPapers) {
  for (const q of allQs(p)) {
    if (OBJ.has(q.questionType)) {
      if (!Array.isArray(q.options) || !q.options.includes(q.answer)) {
        console.log(`[答案非法] ${p.title} | ${q.questionType} | stem="${q.stem}"`);
        problems++;
      }
    }
  }
}

// 2) 卷内 stem 不重复
for (const p of newPapers) {
  const seen = new Set();
  for (const q of allQs(p)) {
    if (seen.has(q.stem)) {
      console.log(`[卷内重复] ${p.title} | stem="${q.stem}"`);
      problems++;
    }
    seen.add(q.stem);
  }
}

// 3) 跨卷 stem 不重复（逐套比较）
const seen = new Map(); // stem -> 首次出现卷名
for (const p of newPapers) {
  for (const q of allQs(p)) {
    if (seen.has(q.stem)) {
      const first = seen.get(q.stem);
      if (first !== p.title) {
        console.log(`[跨卷重复] "${q.stem}"  -> 同时出现在《${first}》与《${p.title}》`);
        problems++;
      }
    } else {
      seen.set(q.stem, p.title);
    }
  }
}

// 题库 extraQuestions 内重复
{
  const s = new Set();
  for (const q of extraQuestions) {
    if (OBJ.has(q.questionType)) {
      if (!Array.isArray(q.options) || !q.options.includes(q.answer)) {
        console.log(`[题库答案非法] ${q.questionType} | stem="${q.stem}"`);
        problems++;
      }
    }
    if (s.has(q.stem)) { console.log(`[题库重复] stem="${q.stem}"`); problems++; }
    s.add(q.stem);
  }
}

console.log(`\n=== 校验完成：共发现 ${problems} 处问题 ===`);
process.exit(problems > 0 ? 1 : 0);
