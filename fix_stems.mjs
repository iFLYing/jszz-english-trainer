// 一次性原子修复：读取 expand_data.mjs，替换剩余 7 处跨卷重复题干，写回。
// p4 阅读8（骑行上班）已由并行编辑先行修复，此处跳过。
import { readFileSync, writeFileSync } from 'node:fs';

const f = 'expand_data.mjs';
let s = readFileSync(f, 'utf8');

const reps = [
  // p3 阅读7（图书馆 + 村庄太阳能）
  [
    `s: '7. What do the two passages show?', o: ['Cities are busy', 'Communities improve life', 'Books are old', 'Energy is bad']`,
    `s: '7. What do the library and solar-village passages show?', o: ['Cities are busy', 'Communities improve life', 'Books are old', 'Energy is bad']`
  ],
  // p3 阅读8（机器人餐厅）
  [
    `s: '8. What is the best title for B?', o: ['Robot Cooks', 'Robots in Restaurants', 'How to Sing', 'New Dishes'], a: 'Robots in Restaurants'`,
    `s: '8. What is the best title for the restaurant-robot passage?', o: ['Robot Cooks', 'Robots in Restaurants', 'How to Sing', 'New Dishes'], a: 'Robots in Restaurants'`
  ],
  // p4 阅读7（小事凝聚社区）
  [
    `s: '7. What do both passages show?', o: ['School is hard', 'Small things build community', 'Books are expensive', 'Skills are old']`,
    `s: '7. What is the shared message of the two passages?', o: ['School is hard', 'Small things build community', 'Books are expensive', 'Skills are old']`
  ],
  // p5 阅读7（社区凝聚人）
  [
    `s: '7. What do both passages show?', o: ['Food is cheap', 'Community bonds people', 'Towns are small', 'Schools are far']`,
    `s: '7. What do the two readings mainly show?', o: ['Food is cheap', 'Community bonds people', 'Towns are small', 'Schools are far']`
  ],
  // p5 阅读8（职校编程）
  [
    `s: '8. What is the best title for B?', o: ['Girl’s App', 'Coding at Vocational Schools', 'How to Cook', 'New Games'], a: 'Coding at Vocational Schools'`,
    `s: '8. What is the best title for the coding passage?', o: ['Girl’s App', 'Coding at Vocational Schools', 'How to Cook', 'New Games'], a: 'Coding at Vocational Schools'`
  ],
  // p6 阅读7（好习惯改善生活）
  [
    `s: '7. What do the two passages show?', o: ['Phones are bad', 'Good habits improve life', 'Cities are noisy', 'Books are new']`,
    `s: '7. What do the good-habit passages show?', o: ['Phones are bad', 'Good habits improve life', 'Cities are noisy', 'Books are new']`
  ],
  // p7 阅读8（青年传统手工艺）
  [
    `s: '8. What is the best title for B?', o: ['City Bus', 'Youth and Traditional Crafts', 'How to Sell', 'New Markets'], a: 'Youth and Traditional Crafts'`,
    `s: '8. What is the best title for the traditional-craft passage?', o: ['City Bus', 'Youth and Traditional Crafts', 'How to Sell', 'New Markets'], a: 'Youth and Traditional Crafts'`
  ],
];

let changed = 0;
for (const [oldS, newS] of reps) {
  const n = s.split(oldS).length - 1;
  if (n !== 1) { console.error(`✗ 期望出现1次，实际 ${n} 次: ${oldS.slice(0, 40)}...`); process.exit(1); }
  s = s.replace(oldS, newS);
  changed++;
}
writeFileSync(f, s);
console.log(`✓ 成功替换 ${changed} 处题干。`);
