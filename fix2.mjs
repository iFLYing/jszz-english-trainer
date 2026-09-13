// 原子修复：消除新增数据与种子数据的 2 处跨实体重复题干。
import { readFileSync, writeFileSync } from 'node:fs';
const f = 'expand_data.mjs';
let s = readFileSync(f, 'utf8');
const reps = [
  // 新卷（二）单项选择：与种子卷题干重复 -> 改 movie 为 film
  [
    `s: 'This is the ______ movie I have ever seen.', o: ['good', 'better', 'best', 'well'], a: 'best', k: '形容词比较等级', kp: '最高级', t: '科技发展', an: 'ever 提示用最高级 best。' }`,
    `s: 'This is the ______ film I have ever seen.', o: ['good', 'better', 'best', 'well'], a: 'best', k: '形容词比较等级', kp: '最高级', t: '科技发展', an: 'ever 提示用最高级 best。' }`
  ],
  // 题库新增阅读：与种子题库题干重复 -> 加 for the passage
  [
    `s: '3. What is the best title?', o: ['How to Buy a Phone', 'Phones and Students', 'Online Shopping', 'Computer Games'], a: 'Phones and Students', k: '主旨大意', kp: '中心思想', t: '科技发展', an: '全文围绕手机对学生的影响。' }`,
    `s: '3. What is the best title for the passage?', o: ['How to Buy a Phone', 'Phones and Students', 'Online Shopping', 'Computer Games'], a: 'Phones and Students', k: '主旨大意', kp: '中心思想', t: '科技发展', an: '全文围绕手机对学生的影响。' }`
  ],
];
let n = 0;
for (const [oldS, newS] of reps) {
  const c = s.split(oldS).length - 1;
  if (c !== 1) { console.error(`✗ 期望1次，实际 ${c} 次: ${oldS.slice(0, 40)}`); process.exit(1); }
  s = s.replace(oldS, newS); n++;
}
writeFileSync(f, s);
console.log(`✓ 修复 ${n} 处。`);
