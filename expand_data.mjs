// 题库 & 试卷扩充数据（真题风格仿真，非官方泄露原题）
// 说明：基于 2024/2025 江苏省中职职教高考英语真实大纲结构原创命制。
// 题型结构：单项选择 / 完形填空 / 补全对话 / 阅读理解 / 句子翻译(英译汉) / 书面表达
// 规则：7 套模拟卷之间题目内容互不重复（语篇、题干各自独立）。
import { randomUUID } from 'node:crypto';

const uid = () => randomUUID();

// ---- 辅助构造函数（对齐 seed.js 的 qs 字段） ----
const base = (o) => ({
  id: uid(),
  src: 'jszz-expand-v1',
  questionType: o.qt,
  stem: o.s,
  options: o.o || null,
  answer: o.a,
  analysis: o.an || '',
  knowledge: o.k || '',
  knowledgePoint: o.kp || '',
  topic: o.t || '',
  skill: o.sk || '语法运用',
  difficulty: o.d || '中',
  passageBody: o.pb || '',
});
const mcq = (o) => base({ ...o, qt: '单项选择' });
const cloze = (o) => base({ ...o, qt: '完形填空', sk: '语篇理解' });
const dialog = (o) => base({ ...o, qt: '补全对话', sk: '交际运用', d: o.d || '易' });
const read = (o) => base({ ...o, qt: '阅读理解', sk: o.sk || '信息获取' });
const trans = (o) => base({ ...o, qt: '句子翻译', o: null, sk: '书面表达' });
const writing = (o) => base({ ...o, qt: '书面表达', o: null, k: '应用文写作', sk: '书面表达' });

// =================== 一、题库新增（真题风格专项题，扁平结构，供专项训练） ===================
export const extraQuestions = [
  mcq({ s: 'The train ______ when we got to the station yesterday.', o: ['left', 'has left', 'had left', 'leaves'], a: 'had left', k: '时态语态', kp: '过去完成时', t: '社会生活', an: 'got 是过去时，离开发生在到达之前，用过去完成时 had left。' }),
  mcq({ s: 'It was not until midnight ______ he finished his homework.', o: ['when', 'that', 'which', 'until'], a: 'that', k: '强调句型', kp: 'It was ... that', t: '校园生活', an: '强调句 It was ... that ...，被强调部分是 not until midnight。' }),
  mcq({ s: '______ from the hill, the town looks more beautiful.', o: ['See', 'Seeing', 'Seen', 'To see'], a: 'Seen', k: '非谓语动词', kp: '过去分词作状语', t: '环境保护', an: 'town 与 see 是被动关系，用过去分词 Seen。' }),
  mcq({ s: 'He made ______ mistakes in the exam because he was too careless.', o: ['a few', 'few', 'little', 'a little'], a: 'a few', k: '代词辨析', kp: 'a few/few', t: '校园生活', an: 'mistakes 可数复数，a few 表“一些”（含贬义语境也可），few 表“几乎没有”；此处指犯了一些错误，用 a few。' }),
  mcq({ s: '— Would you mind my opening the window? — ______.', o: ['Yes, please.', 'No, go ahead.', 'You are welcome.', 'That’s right.'], a: 'No, go ahead.', k: '交际用语', kp: '请求许可', t: '人际交往', an: 'Would you mind...? 否定回答表示不介意，No, go ahead. 意为“不介意，请便”。' }),
  mcq({ s: 'This is the most interesting book ______ I have ever read.', o: ['which', 'who', 'that', 'what'], a: 'that', k: '定语从句', kp: '关系代词 that', t: '阅读习惯', an: '先行词被最高级修饰时，定语从句关系代词用 that。' }),
  mcq({ s: 'If it ______ tomorrow, we will stay at home.', o: ['rains', 'will rain', 'rained', 'is raining'], a: 'rains', k: '状语从句', kp: '主将从现', t: '社会生活', an: 'if 条件句表将来，主句用一般将来时，从句用一般现在时 rains。' }),
  mcq({ s: 'The scientist ______ the experiment for three years.', o: ['has done', 'did', 'has been doing', 'does'], a: 'has been doing', k: '时态语态', kp: '现在完成进行时', t: '职业规划', an: 'for three years 强调动作持续至今且仍在进行，用现在完成进行时。' }),
  cloze({ pb: 'Many students want to improve their English. They __1__ words every day, but they forget them quickly. A good way is to __2__ English stories. When you read, you should __3__ the meaning from the context. __4__ you meet a new word, don’t look it up at once. Try to __5__ first. After reading, write down the new words and __6__ them often. In this way, your vocabulary will __7__ fast. Also, don’t be __8__ to speak English with others. Making __9__ is normal. The more you practice, the __10__ you will be.',
    s: '1. They ______ words every day.', o: ['forget', 'learn', 'teach', 'borrow'], a: 'learn', an: '后文说但很快忘记，说明每天在“学”单词。' }),
  cloze({ pb: 'Many students want to improve their English. They __1__ words every day, but they forget them quickly. A good way is to __2__ English stories. When you read, you should __3__ the meaning from the context. __4__ you meet a new word, don’t look it up at once. Try to __5__ first. After reading, write down the new words and __6__ them often. In this way, your vocabulary will __7__ fast. Also, don’t be __8__ to speak English with others. Making __9__ is normal. The more you practice, the __10__ you will be.',
    s: '2. A good way is to ______ English stories.', o: ['read', 'write', 'sell', 'draw'], a: 'read', an: '提高英语的好方法是“读”英语故事。' }),
  cloze({ pb: 'Many students want to improve their English. They __1__ words every day, but they forget them quickly. A good way is to __2__ English stories. When you read, you should __3__ the meaning from the context. __4__ you meet a new word, don’t look it up at once. Try to __5__ first. After reading, write down the new words and __6__ them often. In this way, your vocabulary will __7__ fast. Also, don’t be __8__ to speak English with others. Making __9__ is normal. The more you practice, the __10__ you will be.',
    s: '3. you should ______ the meaning from the context.', o: ['guess', 'change', 'copy', 'hide'], a: 'guess', an: '从上下文“猜”词义是阅读技巧。' }),
  cloze({ pb: 'Many students want to improve their English. They __1__ words every day, but they forget them quickly. A good way is to __2__ English stories. When you read, you should __3__ the meaning from the context. __4__ you meet a new word, don’t look it up at once. Try to __5__ first. After reading, write down the new words and __6__ them often. In this way, your vocabulary will __7__ fast. Also, don’t be __8__ to speak English with others. Making __9__ is normal. The more you practice, the __10__ you will be.',
    s: '4. ______ you meet a new word, don’t look it up at once.', o: ['Although', 'When', 'Because', 'Unless'], a: 'When', an: '“当”遇到生词时，不要立刻查。' }),
  cloze({ pb: 'Many students want to improve their English. They __1__ words every day, but they forget them quickly. A good way is to __2__ English stories. When you read, you should __3__ the meaning from the context. __4__ you meet a new word, don’t look it up at once. Try to __5__ first. After reading, write down the new words and __6__ them often. In this way, your vocabulary will __7__ fast. Also, don’t be __8__ to speak English with others. Making __9__ is normal. The more you practice, the __10__ you will be.',
    s: '5. Try to ______ first.', o: ['guess', 'write', 'sleep', 'eat'], a: 'guess', an: '遇到生词先“猜”意思。' }),
  cloze({ pb: 'Many students want to improve their English. They __1__ words every day, but they forget them quickly. A good way is to __2__ English stories. When you read, you should __3__ the meaning from the context. __4__ you meet a new word, don’t look it up at once. Try to __5__ first. After reading, write down the new words and __6__ them often. In this way, your vocabulary will __7__ fast. Also, don’t be __8__ to speak English with others. Making __9__ is normal. The more you practice, the __10__ you will be.',
    s: '6. write down the new words and ______ them often.', o: ['review', 'forget', 'lose', 'break'], a: 'review', an: '记下新词并经常“复习”。' }),
  cloze({ pb: 'Many students want to improve their English. They __1__ words every day, but they forget them quickly. A good way is to __2__ English stories. When you read, you should __3__ the meaning from the context. __4__ you meet a new word, don’t look it up at once. Try to __5__ first. After reading, write down the new words and __6__ them often. In this way, your vocabulary will __7__ fast. Also, don’t be __8__ to speak English with others. Making __9__ is normal. The more you practice, the __10__ you will be.',
    s: '7. your vocabulary will ______ fast.', o: ['grow', 'fall', 'disappear', 'stop'], a: 'grow', an: '词汇量会快速“增长”。' }),
  cloze({ pb: 'Many students want to improve their English. They __1__ words every day, but they forget them quickly. A good way is to __2__ English stories. When you read, you should __3__ the meaning from the context. __4__ you meet a new word, don’t look it up at once. Try to __5__ first. After reading, write down the new words and __6__ them often. In this way, your vocabulary will __7__ fast. Also, don’t be __8__ to speak English with others. Making __9__ is normal. The more you practice, the __10__ you will be.',
    s: '8. don’t be ______ to speak English with others.', o: ['afraid', 'happy', 'glad', 'sure'], a: 'afraid', an: '不要“害怕”和别人说英语。' }),
  cloze({ pb: 'Many students want to improve their English. They __1__ words every day, but they forget them quickly. A good way is to __2__ English stories. When you read, you should __3__ the meaning from the context. __4__ you meet a new word, don’t look it up at once. Try to __5__ first. After reading, write down the new words and __6__ them often. In this way, your vocabulary will __7__ fast. Also, don’t be __8__ to speak English with others. Making __9__ is normal. The more you practice, the __10__ you will be.',
    s: '9. Making ______ is normal.', o: ['mistakes', 'friends', 'money', 'faces'], a: 'mistakes', an: '犯错是正常的（make mistakes）。' }),
  cloze({ pb: 'Many students want to improve their English. They __1__ words every day, but they forget them quickly. A good way is to __2__ English stories. When you read, you should __3__ the meaning from the context. __4__ you meet a new word, don’t look it up at once. Try to __5__ first. After reading, write down the new words and __6__ them often. In this way, your vocabulary will __7__ fast. Also, don’t be __8__ to speak English with others. Making __9__ is normal. The more you practice, the __10__ you will be.',
    s: '10. The more you practice, the ______ you will be.', o: ['better', 'worse', 'busier', 'taller'], a: 'better', an: '“the + 比较级 …, the + 比较级 …”结构，练习越多越好。' }),
  read({ pb: 'Mobile phones are useful tools. We can call friends, study online and pay for things. But using them too much is bad for our eyes and study. A report says students who use phones over three hours a day get lower grades. Parents and teachers ask students to make a plan and put phones away while studying. Some schools have special boxes for students to keep phones during class.',
    s: '1. What does the report say about heavy phone users?', o: ['They get higher grades.', 'They get lower grades.', 'They sleep better.', 'They exercise more.'], a: 'They get lower grades.', k: '细节理解', kp: '信息获取', t: '科技发展', an: '报告说每天用手机超3小时的学生成绩更低。' }),
  read({ pb: 'Mobile phones are useful tools. We can call friends, study online and pay for things. But using them too much is bad for our eyes and study. A report says students who use phones over three hours a day get lower grades. Parents and teachers ask students to make a plan and put phones away while studying. Some schools have special boxes for students to keep phones during class.',
    s: '2. What do schools do during class?', o: ['Give students phones.', 'Keep phones in boxes.', 'Throw phones away.', 'Sell phones.'], a: 'Keep phones in boxes.', k: '细节理解', kp: '信息获取', t: '科技发展', an: '一些学校上课时把手机放在专用盒里。' }),
  read({ pb: 'Mobile phones are useful tools. We can call friends, study online and pay for things. But using them too much is bad for our eyes and study. A report says students who use phones over three hours a day get lower grades. Parents and teachers ask students to make plans and put phones away while studying. Some schools have special boxes for students to keep phones during class.',
    s: '3. What is the best title for the passage?', o: ['How to Buy a Phone', 'Phones and Students', 'Online Shopping', 'Computer Games'], a: 'Phones and Students', k: '主旨大意', kp: '中心思想', t: '科技发展', an: '全文围绕手机对学生的影响。' }),
  dialog({ s: 'A: Excuse me, how can I get to the railway station?  B: ______', o: ['It’s a book.', 'Go along this road and turn left.', 'I am a student.', 'Thank you.'], a: 'Go along this road and turn left.', k: '日常交际', kp: '问路', t: '社会生活', an: '问路应给出路线指引。' }),
  dialog({ s: 'A: What can I do for you?  B: ______  A: Here you are.', o: ['I want a pair of shoes.', 'I am fine.', 'It’s sunny.', 'No, thanks.'], a: 'I want a pair of shoes.', k: '日常交际', kp: '购物', t: '社会生活', an: '店员问需求，顾客表达购买意图。' }),
  dialog({ s: 'A: I got the first prize in the competition!  B: ______', o: ['That’s too bad.', 'Congratulations!', 'I don’t care.', 'Be careful.'], a: 'Congratulations!', k: '日常交际', kp: '祝贺', t: '校园生活', an: '听到好消息应表示祝贺。' }),
  trans({ s: 'It is important for us to protect the environment.', a: '对我们来说，保护环境很重要。', k: '中译英句型', kp: 'It is + adj. + for sb. + to do', t: '环境保护', an: '句型 It is + adj. + for sb. + to do sth.。' }),
  trans({ s: 'The more you read, the more knowledge you will get.', a: '你读得越多，获得的知识就越多。', k: '中译英句型', kp: 'the more ... the more', t: '阅读习惯', an: '“the + 比较级 …, the + 比较级 …”结构。' }),
  trans({ s: 'He is not only a good teacher but also a good friend.', a: '他不仅是一位好老师，也是一位好朋友。', k: '中译英句型', kp: 'not only ... but also', t: '人际交往', an: 'not only ... but also ... 连接并列成分。' }),
  trans({ s: 'With the help of the Internet, we can learn anytime and anywhere.', a: '借助互联网，我们可以随时随地学习。', k: '中译英句型', kp: 'with the help of', t: '科技发展', an: 'with the help of 意为“在……帮助下”。' }),
  writing({ s: '请以“My Hobby”为题写一篇 80 词左右的英文短文，说明你的爱好是什么、为什么喜欢以及它带给你的收获。', a: 'My Hobby\nMy hobby is reading. I like reading because it opens a door to the world. Through books, I learn about different cultures and histories. Reading also helps me relax after a busy day. It improves my writing and thinking. I think a good book is like a good friend. I will keep this hobby all my life.', kp: '话题作文', t: '阅读习惯', an: '要点：爱好名称、原因、收获；用简单句，注意时态一致。' }),
];

// =================== 二、7 套模拟试卷（互不重复） ===================

// ---- 第 1 套 ----
const p1 = {
  id: uid(), title: '真题仿真模拟卷（一）', year: '2025', kind: '模拟', duration: 120,
  sections: [
    { type: '单项选择', prompt: '从 A、B、C、D 四个选项中选出最佳答案。', qs: [
      mcq({ s: 'We ______ a school trip next week.', o: ['have', 'had', 'will have', 'has'], a: 'will have', k: '时态语态', kp: '一般将来时', t: '校园生活', an: 'next week 用一般将来时 will have。' }),
      mcq({ s: 'The man ______ is standing there is our new teacher.', o: ['which', 'who', 'what', 'where'], a: 'who', k: '定语从句', kp: '关系代词 who', t: '人际交往', an: '先行词 man 指人，在从句作主语，用 who。' }),
      mcq({ s: 'She is fond ______ playing the piano.', o: ['at', 'of', 'in', 'on'], a: 'of', k: '固定搭配', kp: 'be fond of', t: '校园生活', an: 'be fond of 是固定搭配，意为“喜欢”。' }),
      mcq({ s: '______ hard you work, ______ progress you will make.', o: ['The harder; the more', 'The hard; the more', 'Harder; more', 'The hardest; the most'], a: 'The harder; the more', k: '比较等级', kp: 'the more ... the more', t: '学习态度', an: '“the + 比较级 …, the + 比较级 …”越努力进步越多。' }),
      mcq({ s: 'I was ______ tired ______ I fell asleep at once.', o: ['too; to', 'so; that', 'such; that', 'as; as'], a: 'so; that', k: '状语从句', kp: 'so ... that', t: '校园生活', an: 'so ... that ... 如此……以至于……。' }),
      mcq({ s: '— Must I finish the work today? — No, you ______.', o: ['mustn’t', 'needn’t', 'can’t', 'shouldn’t'], a: 'needn’t', k: '情态动词', kp: 'must 否定回答', t: '校园生活', an: 'Must I ...? 否定回答用 needn’t（不必）。' }),
      mcq({ s: 'The book ______ by Lu Xun is very famous.', o: ['wrote', 'written', 'writing', 'writes'], a: 'written', k: '非谓语动词', kp: '过去分词作定语', t: '阅读习惯', an: 'book 与 write 被动，用过去分词 written 作后置定语。' }),
      mcq({ s: 'He ______ to Beijing three times.', o: ['has been', 'has gone', 'goes', 'went'], a: 'has been', k: '时态语态', kp: 'has been to', t: '社会生活', an: 'has been to 表示“去过（已回）”，three times 提示经历。' }),
      mcq({ s: '______ careful you are, ______ mistakes you will make.', o: ['The more; the fewer', 'The more; the more', 'More; fewer', 'The most; the fewest'], a: 'The more; the fewer', k: '比较等级', kp: 'the more ... the fewer', t: '学习态度', an: '越仔细犯错越少，mistakes 可数用 fewer。' }),
      mcq({ s: 'It’s very nice ______ you to help me with my English.', o: ['for', 'of', 'to', 'with'], a: 'of', k: '固定搭配', kp: 'It is + of + sb.', t: '人际交往', an: '形容词 nice 描述人的品质，用 of。' }),
      mcq({ s: 'Neither he nor I ______ good at drawing.', o: ['am', 'is', 'are', 'be'], a: 'am', k: '主谓一致', kp: 'neither ... nor 就近原则', t: '校园生活', an: 'neither ... nor 遵循就近原则，靠近 I 用 am。' }),
      mcq({ s: 'Could you tell me ______ the nearest hospital is?', o: ['what', 'where', 'which', 'that'], a: 'where', k: '名词性从句', kp: '宾语从句', t: '社会生活', an: '询问地点用 where 引导宾语从句。' }),
    ]},
    { type: '完形填空', prompt: '阅读下面短文，掌握大意，从每题所给 A、B、C、D 四个选项中选最佳答案。', qs: (() => {
      const pb = 'Li Hua is a student in a vocational school. He wanted to learn computer skills, __1__ he studied very hard. Every morning he __2__ up early and practiced coding. At first, it was __3__ for him because he had no basic knowledge. But he never __4__. His teacher often __5__ him, “Practice makes perfect.” After two years, he __6__ a prize in a city competition. His parents were very __7__ of him. Now he plans to __8__ a software engineer in the future. He believes that __9__ can change a person’s life. He often says to his classmates, “Never __10__ your dream.”';
      return [
        cloze({ pb, s: '1. He wanted to learn computer skills, ______ he studied very hard.', o: ['but', 'so', 'or', 'because'], a: 'so', an: '想学电脑技能，所以努力学习，表因果。' }),
        cloze({ pb, s: '2. Every morning he ______ up early.', o: ['gets', 'got', 'getting', 'get'], a: 'got', an: '全文过去时，用 got。' }),
        cloze({ pb, s: '3. At first, it was ______ for him.', o: ['easy', 'difficult', 'fun', 'happy'], a: 'difficult', an: '没有基础，起初很“困难”。' }),
        cloze({ pb, s: '4. But he never ______.', o: ['gave up', 'gave in', 'gave out', 'gave away'], a: 'gave up', an: '从不“放弃”。' }),
        cloze({ pb, s: '5. His teacher often ______ him.', o: ['told', 'said', 'asked', 'answered'], a: 'told', an: 'tell sb. sth. 告诉某人某事。' }),
        cloze({ pb, s: '6. he ______ a prize in a city competition.', o: ['won', 'lost', 'missed', 'failed'], a: 'won', an: '“赢得”奖项用 win。' }),
        cloze({ pb, s: '7. His parents were very ______ of him.', o: ['proud', 'tired', 'afraid', 'sure'], a: 'proud', an: 'be proud of 为……骄傲。' }),
        cloze({ pb, s: '8. he plans to ______ a software engineer.', o: ['become', 'became', 'becoming', 'becomes'], a: 'become', an: 'plan to do，不定式用动词原形。' }),
        cloze({ pb, s: '9. ______ can change a person’s life.', o: ['Skills', 'Books', 'Money', 'Time'], a: 'Skills', an: '呼应主题：技能改变人生。' }),
        cloze({ pb, s: '10. Never ______ your dream.', o: ['give up', 'give in', 'give out', 'give away'], a: 'give up', an: '不要“放弃”梦想。' }),
      ];
    })()},
    { type: '补全对话', prompt: '从选项中选出合适的句子补全对话。', qs: [
      dialog({ s: 'A: Hello, may I speak to Mr. Li?  B: ______', o: ['I am Mr. Li.', 'Speaking.', 'I am busy.', 'No, you can’t.'], a: 'Speaking.', k: '日常交际', kp: '电话用语', t: '校园生活', an: '电话中“我就是”用 Speaking.。' }),
      dialog({ s: 'A: I’m sorry I’m late.  B: ______', o: ['That’s all right.', 'You are wrong.', 'Don’t come.', 'Go away.'], a: 'That’s all right.', k: '日常交际', kp: '道歉应答', t: '校园生活', an: '对道歉的应答用 That’s all right.。' }),
      dialog({ s: 'A: What’s the weather like today?  B: ______', o: ['It’s Monday.', 'It’s sunny.', 'I like it.', 'It’s a book.'], a: 'It’s sunny.', k: '日常交际', kp: '谈论天气', t: '社会生活', an: '问天气应回答天气状况。' }),
      dialog({ s: 'A: Thank you for your help.  B: ______', o: ['You are welcome.', 'No, thanks.', 'I’m sorry.', 'That’s wrong.'], a: 'You are welcome.', k: '日常交际', kp: '致谢应答', t: '人际交往', an: '对感谢的应答用 You are welcome.。' }),
    ]},
    { type: '阅读理解', prompt: '阅读下列短文，从每题所给 A、B、C、D 四个选项中选出最佳答案。', qs: (() => {
      const a = 'Volunteering is becoming popular among students. Last weekend, thirty students from a vocational school went to a nursing home. They cleaned rooms, told stories and sang songs for the old people. The old people smiled happily. One student said, “Helping others makes me happy.” The school plans to organize such activities every month.';
      const b = 'With the development of technology, online learning is changing education. Students can watch videos, do exercises and ask teachers questions on the Internet. It is convenient for those who live far from school. However, sitting too long in front of the screen is bad for the eyes. Experts suggest taking a break every 40 minutes.';
      const c = 'A small town in the south started a “shared bike” program. People can ride the bikes to work or to the park. It reduces traffic and protects the environment. At first, some bikes were broken or lost. Later, the town added GPS and taught people to use them correctly. Now more and more people choose shared bikes.';
      return [
        read({ pb: a, s: '1. Where did the students go last weekend?', o: ['A hospital', 'A nursing home', 'A school', 'A park'], a: 'A nursing home', k: '细节理解', kp: '信息获取', t: '志愿服务', an: '学生们去了养老院。' }),
        read({ pb: a, s: '2. How did the old people feel?', o: ['Sad', 'Angry', 'Happy', 'Sleepy'], a: 'Happy', k: '细节理解', kp: '信息获取', t: '志愿服务', an: '老人们开心地笑了。' }),
        read({ pb: a, s: '3. What does the school plan to do?', o: ['Stop activities', 'Organize monthly', 'Go abroad', 'Build a home'], a: 'Organize monthly', k: '细节理解', kp: '信息获取', t: '志愿服务', an: '学校计划每月组织一次。' }),
        read({ pb: b, s: '4. What is the advantage of online learning?', o: ['It is cheap', 'It is convenient', 'It is difficult', 'It is slow'], a: 'It is convenient', k: '细节理解', kp: '信息获取', t: '科技发展', an: '在线学习对偏远学生方便。' }),
        read({ pb: b, s: '5. What do experts suggest?', o: ['Study all day', 'Take a break every 40 min', 'Buy new screens', 'Stop learning'], a: 'Take a break every 40 min', k: '细节理解', kp: '信息获取', t: '科技发展', an: '专家建议每40分钟休息。' }),
        read({ pb: c, s: '6. What is the “shared bike” program?', o: ['A new car', 'Bikes to share', 'A bus line', 'A train'], a: 'Bikes to share', k: '细节理解', kp: '信息获取', t: '环境保护', an: '共享单车项目。' }),
        read({ pb: c, s: '7. What problem happened at first?', o: ['Bikes broken or lost', 'Too few users', 'Bad weather', 'No roads'], a: 'Bikes broken or lost', k: '细节理解', kp: '信息获取', t: '环境保护', an: '起初有车被损坏或丢失。' }),
        read({ pb: c, s: '8. Why did the town add GPS?', o: ['To find lost bikes', 'To play music', 'To sell bikes', 'To teach English'], a: 'To find lost bikes', k: '推理判断', kp: '推断题', t: '环境保护', an: '加 GPS 便于找回丢失的车。' }),
        read({ pb: a + ' ' + b, s: '9. What do the two passages have in common?', o: ['They are about sports', 'They show positive social changes', 'They are about food', 'They are stories'], a: 'They show positive social changes', k: '主旨大意', kp: '中心思想', t: '社会发展', an: '两篇都展示了积极的社会变化。' }),
        read({ pb: c, s: '10. What is the best title?', o: ['Cars in Town', 'Shared Bikes Help the Town', 'How to Ride', 'A New Park'], a: 'Shared Bikes Help the Town', k: '主旨大意', kp: '中心思想', t: '环境保护', an: '全文围绕共享单车给小镇带来的好处。' }),
      ];
    })()},
    { type: '句子翻译', prompt: '将下列句子译成汉语。', qs: [
      trans({ s: 'Practice makes perfect.', a: '熟能生巧。', k: '中译英句型', kp: '谚语', t: '社会生活', an: '英语谚语。' }),
      trans({ s: 'Where there is a will, there is a way.', a: '有志者事竟成。', k: '中译英句型', kp: '谚语', t: '学习态度', an: '英语谚语。' }),
      trans({ s: 'He devotes himself to helping the poor.', a: '他致力于帮助穷人。', k: '中译英句型', kp: 'devote oneself to', t: '志愿服务', an: 'devote oneself to 致力于。' }),
      trans({ s: 'The Internet makes our life more convenient.', a: '互联网使我们的生活更便利。', k: '中译英句型', kp: 'make + 宾语 + 宾补', t: '科技发展', an: 'make + 宾语 + 形容词作宾补。' }),
    ]},
    { type: '书面表达', prompt: '根据提示写一篇短文。', qs: [
      writing({ s: '现在很多年轻人喜欢在网上购买二手物品。请以“My Views on Buying and Selling Second-hand Items Online”为题写一篇 80 词左右的短文，谈谈你了解的现象、你或他人的经历，以及你的看法。（参考：省钱、环保、便捷；注意防骗）', kp: '现象看法类', t: '社会生活', a: 'My Views on Buying and Selling Second-hand Items Online\nMany young people buy and sell used things online. On special websites, they trade books, clothes and electronics. My classmate once sold his old bike online and got some pocket money. It saves money and is good for the environment. However, we must be careful not to be cheated. In my opinion, it is a good way to live a green life if we stay safe.', an: '要点：现象、经历、看法；注意紧扣主题、词数达标。' }),
    ]},
  ],
};

// ---- 第 2 套 ----
const p2 = {
  id: uid(), title: '真题仿真模拟卷（二）', year: '2025', kind: '模拟', duration: 120,
  sections: [
    { type: '单项选择', prompt: '从 A、B、C、D 四个选项中选出最佳答案。', qs: [
      mcq({ s: 'By the time we got there, the bus ______.', o: ['left', 'has left', 'had left', 'leaves'], a: 'had left', k: '时态语态', kp: '过去完成时', t: '社会生活', an: 'got 是过去时，离开在此之前，用过去完成时。' }),
      mcq({ s: 'This is the ______ film I have ever seen.', o: ['good', 'better', 'best', 'well'], a: 'best', k: '形容词比较等级', kp: '最高级', t: '科技发展', an: 'ever 提示用最高级 best。' }),
      mcq({ s: 'She asked me ______ I liked the gift.', o: ['that', 'if', 'what', 'which'], a: 'if', k: '名词性从句', kp: '宾语从句', t: '人际交往', an: '间接疑问句用 if/whether。' }),
      mcq({ s: 'The window is broken. It ______ by the wind last night.', o: ['broke', 'was broken', 'has broken', 'breaks'], a: 'was broken', k: '时态语态', kp: '一般过去时被动', t: '校园生活', an: '窗被风打破，用一般过去时被动。' }),
      mcq({ s: '______ you work harder, you will fail the exam.', o: ['If', 'Unless', 'Because', 'Although'], a: 'Unless', k: '状语从句', kp: 'unless 引导条件', t: '学习态度', an: '除非更努力，否则会不及格；unless = if not。' }),
      mcq({ s: 'He has ______ friends here because he is new.', o: ['few', 'a few', 'little', 'a little'], a: 'few', k: '代词辨析', kp: 'few/little', t: '人际交往', an: 'friends 可数，且表“几乎没有”，用 few。' }),
      mcq({ s: 'The teacher made the students ______ the text aloud.', o: ['read', 'to read', 'reading', 'reads'], a: 'read', k: '非谓语动词', kp: 'make sb. do', t: '校园生活', an: 'make sb. do sth. 用动词原形。' }),
      mcq({ s: '— How long ______ you been a member? — For two years.', o: ['have', 'has', 'did', 'do'], a: 'have', k: '时态语态', kp: '现在完成时', t: '校园生活', an: 'For two years 与现在完成时连用，you 用 have。' }),
      mcq({ s: 'I prefer ______ at home to ______ out.', o: ['stay; go', 'staying; going', 'to stay; to go', 'stayed; went'], a: 'staying; going', k: '非谓语动词', kp: 'prefer doing to doing', t: '校园生活', an: 'prefer doing A to doing B。' }),
      mcq({ s: 'The book ______ cover is red is mine.', o: ['who', 'which', 'whose', 'that'], a: 'whose', k: '定语从句', kp: '关系代词 whose', t: '阅读习惯', an: '先行词 book，cover 与 book 是所属关系，用 whose。' }),
      mcq({ s: 'He was ______ tired ______ he couldn’t walk.', o: ['too; to', 'so; that', 'such; that', 'as; as'], a: 'so; that', k: '状语从句', kp: 'so ... that', t: '校园生活', an: 'so ... that ... 如此……以至于……。' }),
      mcq({ s: 'There ______ a meeting this afternoon.', o: ['is going to have', 'is going to be', 'are going to be', 'will have'], a: 'is going to be', k: 'there be 句型', kp: 'there is going to be', t: '校园生活', an: 'there be 将来时用 there is going to be。' }),
    ]},
    { type: '完形填空', prompt: '阅读下面短文，掌握大意，从每题所给 A、B、C、D 四个选项中选最佳答案。', qs: (() => {
      const pb = 'Wang Lei is a 17-year-old student. He used to spend too much time on his phone. His grades __1__ down. His mother was __2__ and talked with his teacher. The teacher __3__ him to make a daily plan. Wang Lei __4__ to the advice. He began to __5__ his phone away while studying. He also joined the school basketball team. __6__ a few months, his grades improved. He felt __7__ and healthier. Now he says, “__8__ is like a sword; we should use it __9__.” He wants to tell other students that self-control can __10__ your future.';
      return [
        cloze({ pb, s: '1. His grades ______ down.', o: ['went', 'go', 'going', 'goes'], a: 'went', an: '过去时，成绩“下降”用 went down。' }),
        cloze({ pb, s: '2. His mother was ______.', o: ['happy', 'worried', 'excited', 'bored'], a: 'worried', an: '成绩下降妈妈“担心”。' }),
        cloze({ pb, s: '3. The teacher ______ him to make a plan.', o: ['advised', 'made', 'let', 'had'], a: 'advised', an: 'advise sb. to do 建议某人做。' }),
        cloze({ pb, s: '4. Wang Lei ______ to the advice.', o: ['listened', 'heard', 'sound', 'sound'], a: 'listened', an: 'listen to the advice 听从建议。' }),
        cloze({ pb, s: '5. He began to ______ his phone away.', o: ['put', 'take', 'give', 'throw'], a: 'put', an: 'put away 收起来。' }),
        cloze({ pb, s: '6. ______ a few months, his grades improved.', o: ['After', 'Before', 'During', 'Until'], a: 'After', an: '“在……之后”几个月。' }),
        cloze({ pb, s: '7. He felt ______ and healthier.', o: ['happier', 'sadder', 'sleepier', 'angrier'], a: 'happier', an: '成绩好转，感到更开心健康。' }),
        cloze({ pb, s: '8. ______ is like a sword.', o: ['Phone', 'Book', 'Time', 'Money'], a: 'Phone', an: '呼应主题，手机像双刃剑。' }),
        cloze({ pb, s: '9. we should use it ______.', a: 'correctly', o: ['correctly', 'quickly', 'loudly', 'carelessly'], an: '应“正确地”使用。' }),
        cloze({ pb, s: '10. self-control can ______ your future.', a: 'change', o: ['change', 'break', 'lose', 'miss'], an: '自律能“改变”未来。' }),
      ];
    })()},
    { type: '补全对话', prompt: '从选项中选出合适的句子补全对话。', qs: [
      dialog({ s: 'A: Would you like some coffee?  B: ______', o: ['Yes, please.', 'I don’t like.', 'No, I can’t.', 'You are kind.'], a: 'Yes, please.', k: '日常交际', kp: '提供物品应答', t: '社会生活', an: '乐意接受用 Yes, please.。' }),
      dialog({ s: 'A: How was your holiday?  B: ______', o: ['It was wonderful.', 'I am fine.', 'It is a book.', 'See you.'], a: 'It was wonderful.', k: '日常交际', kp: '谈论假期', t: '校园生活', an: '问假期过得如何，回答感受。' }),
      dialog({ s: 'A: Could you pass me the salt?  B: ______', o: ['Here you are.', 'No, it isn’t.', 'I am eating.', 'It’s mine.'], a: 'Here you are.', k: '日常交际', kp: '递物应答', t: '社会生活', an: '递给对方用 Here you are.。' }),
      dialog({ s: 'A: I have a bad cold.  B: ______', o: ['You should see a doctor.', 'That’s funny.', 'I am sorry to hear that.', 'Go to school.'], a: 'I am sorry to hear that.', k: '日常交际', kp: '安慰', t: '校园生活', an: '听到不好消息先表示遗憾。' }),
    ]},
    { type: '阅读理解', prompt: '阅读下列短文，从每题所给 A、B、C、D 四个选项中选出最佳答案。', qs: (() => {
      const a = 'A new rule in a middle school says students must sleep at least 9 hours. The school gives less homework and asks parents to turn off TVs and phones at night. A survey shows students who sleep well get better grades and are happier. Some parents worry about study time, but the school says health comes first.';
      const b = 'Hanfu, the traditional clothing of the Han people, is popular again. Young people wear it in parks, on campuses and at festivals. They say it makes them feel close to Chinese culture. Some designers mix Hanfu with modern style, making it more comfortable and fashionable. More cities hold Hanfu parades.';
      const c = 'A vocational school started a “green class”. Students grow vegetables on the balcony and use the waste to make compost. They sell the vegetables to the school canteen. The money is used for class activities. The students learn that small actions can protect the earth.';
      return [
        read({ pb: a, s: '1. What is the new rule about?', o: ['Homework', 'Sleep', 'Eating', 'Sports'], a: 'Sleep', k: '细节理解', kp: '信息获取', t: '校园生活', an: '新规要求学生至少睡9小时。' }),
        read({ pb: a, s: '2. Why does the school give less homework?', o: ['To save money', 'For better sleep and health', 'To punish students', 'For fun'], a: 'For better sleep and health', k: '推理判断', kp: '推断题', t: '校园生活', an: '减少作业是为了健康。' }),
        read({ pb: b, s: '3. Who likes wearing Hanfu?', o: ['Only old people', 'Young people', 'Foreigners only', 'Teachers only'], a: 'Young people', k: '细节理解', kp: '信息获取', t: '传统文化', an: '年轻人喜欢穿汉服。' }),
        read({ pb: b, s: '4. What do designers do with Hanfu?', o: ['Throw it away', 'Mix with modern style', 'Sell it abroad only', 'Stop making it'], a: 'Mix with modern style', k: '细节理解', kp: '信息获取', t: '传统文化', an: '设计师把汉服与现代风格结合。' }),
        read({ pb: c, s: '5. What do students do in the green class?', o: ['Grow vegetables', 'Play games', 'Watch TV', 'Sleep'], a: 'Grow vegetables', k: '细节理解', kp: '信息获取', t: '环境保护', an: '学生在阳台种菜。' }),
        read({ pb: c, s: '6. Where does the money from vegetables go?', o: ['To teachers', 'To class activities', 'To the bank', 'To parents'], a: 'To class activities', k: '细节理解', kp: '信息获取', t: '环境保护', an: '卖菜钱用于班级活动。' }),
        read({ pb: a + ' ' + b, s: '7. What can we learn from both passages?', o: ['Old things return', 'Health and culture matter', 'Schools are strict', 'Money is everything'], a: 'Health and culture matter', k: '主旨大意', kp: '中心思想', t: '社会发展', an: '两篇分别强调健康与文化的重要性。' }),
        read({ pb: b, s: '8. What is the best title for passage B?', o: ['Modern Fashion', 'The Return of Hanfu', 'How to Design', 'Chinese Festivals'], a: 'The Return of Hanfu', k: '主旨大意', kp: '中心思想', t: '传统文化', an: '全文围绕汉服复兴。' }),
        read({ pb: c, s: '9. What does the green class teach?', o: ['To earn money', 'Small actions protect earth', 'To cook', 'To travel'], a: 'Small actions protect earth', k: '推理判断', kp: '推断题', t: '环境保护', an: '小行动也能保护地球。' }),
        read({ pb: a, s: '10. What do some parents worry about?', o: ['Too much sleep', 'Study time', 'Food', 'Clothes'], a: 'Study time', k: '细节理解', kp: '信息获取', t: '校园生活', an: '家长担心学习时间。' }),
      ];
    })()},
    { type: '句子翻译', prompt: '将下列句子译成汉语。', qs: [
      trans({ s: 'Health is wealth.', a: '健康就是财富。', k: '中译英句型', kp: '谚语', t: '健康生活', an: '英语谚语。' }),
      trans({ s: 'Actions speak louder than words.', a: '行动胜于言辞。', k: '中译英句型', kp: '谚语', t: '学习态度', an: '英语谚语。' }),
      trans({ s: 'We should make good use of our time.', a: '我们应该好好利用时间。', k: '中译英句型', kp: 'make use of', t: '学习态度', an: 'make use of 利用。' }),
      trans({ s: 'A good book is a good friend.', a: '一本好书是一位好朋友。', k: '中译英句型', kp: '比喻句', t: '阅读习惯', an: '比喻句直译。' }),
    ]},
    { type: '书面表达', prompt: '根据提示写一篇短文。', qs: [
      writing({ s: '如今越来越多人喜欢穿汉服。请以“My Views on the Craze for Hanfu”为题写一篇 80 词左右的短文，谈谈你了解的汉服热现象、你是否愿意尝试及原因，以及你对汉服受大众喜爱看法。（提示：传统文化、文化自信、时尚、舒适）', kp: '现象看法类', t: '传统文化', a: 'My Views on the Craze for Hanfu\nNow Hanfu is popular everywhere. Teenagers, students and even elders wear it in parks and at festivals. I would love to try Hanfu because it looks beautiful and comfortable. People love Hanfu for good reasons. It carries our traditional culture and gives us cultural confidence. It is also a new fashion. I hope our fine culture will be known by more people.', an: '要点：现象、个人态度、文化意义；词数达标。' }),
    ]},
  ],
};

// ---- 第 3 套 ----
const p3 = {
  id: uid(), title: '真题仿真模拟卷（三）', year: '2024', kind: '模拟', duration: 120,
  sections: [
    { type: '单项选择', prompt: '从 A、B、C、D 四个选项中选出最佳答案。', qs: [
      mcq({ s: '______ beautiful the sunset is!', o: ['What', 'What a', 'How', 'How a'], a: 'How', k: '感叹句', kp: 'How + adj.', t: '社会生活', an: 'How + 形容词 + 主语 + 谓语！' }),
      mcq({ s: 'He is ______ honest boy that everyone likes him.', o: ['such', 'so', 'such an', 'so an'], a: 'such an', k: '状语从句', kp: 'such ... that', t: '人际交往', an: 'such + a/an + 形容词 + 名词 + that。' }),
      mcq({ s: 'The dictionary ______ me 50 yuan.', o: ['spent', 'paid', 'cost', 'took'], a: 'cost', k: '词义辨析', kp: 'cost/spend/pay/take', t: '校园生活', an: '物作主语用 cost。' }),
      mcq({ s: 'I don’t know ______ to deal with the problem.', o: ['what', 'how', 'which', 'where'], a: 'how', k: '疑问词+不定式', kp: 'how to do', t: '学习态度', an: 'how to deal with 如何处理。' }),
      mcq({ s: 'He ______ in this factory since 2010.', o: ['works', 'worked', 'has worked', 'will work'], a: 'has worked', k: '时态语态', kp: '现在完成时', t: '职业规划', an: 'since 2010 与现在完成时连用。' }),
      mcq({ s: '______ of the students are from the countryside.', o: ['Two third', 'Two thirds', 'Second three', 'Two three'], a: 'Two thirds', k: '数词', kp: '分数表达', t: '校园生活', an: '分数表达：分子基数词，分母序数词，分子>1分母加s。' }),
      mcq({ s: 'The teacher told us ______ in the classroom.', o: ['not run', 'not to run', 'to not run', 'don’t run'], a: 'not to run', k: '非谓语动词', kp: 'tell sb. not to do', t: '校园生活', an: 'tell sb. not to do sth.。' }),
      mcq({ s: 'It’s time ______ class.', o: ['to', 'for', 'of', 'on'], a: 'for', k: '固定搭配', kp: 'It’s time for', t: '校园生活', an: 'It’s time for + 名词。' }),
      mcq({ s: 'She sings ______ than her sister.', o: ['good', 'well', 'better', 'best'], a: 'better', k: '副词比较级', kp: 'well 比较级', t: '校园生活', an: 'than 提示用比较级 better。' }),
      mcq({ s: 'The book is ______ worth reading.', o: ['very', 'quite', 'well', 'really'], a: 'well', k: '副词辨析', kp: 'well worth', t: '阅读习惯', an: 'be well worth doing 很值得做。' }),
      mcq({ s: 'He avoided ______ my question.', o: ['answer', 'answering', 'to answer', 'answered'], a: 'answering', k: '非谓语动词', kp: 'avoid doing', t: '人际交往', an: 'avoid doing sth. 避免做。' }),
      mcq({ s: '______ fine weather it is today!', o: ['What', 'What a', 'How', 'How a'], a: 'What', k: '感叹句', kp: 'What + 名词', t: '社会生活', an: 'weather 不可数，用 What + 形容词 + 不可数名词。' }),
    ]},
    { type: '完形填空', prompt: '阅读下面短文，掌握大意，从每题所给 A、B、C、D 四个选项中选最佳答案。', qs: (() => {
      const pb = 'Chen Jing wants to be a designer. She __1__ drawing since she was a child. At vocational school, she chose the art major. Her teacher said, “__2__ is the best teacher.” So Chen Jing practiced __3__ day. She visited museums to learn from great works. Sometimes she felt __4__ and wanted to stop, but her friend encouraged her. “Keep __5__, and you will succeed,” her friend said. Last term, her design __6__ first prize in a school show. Now she is __7__ about her future. She plans to study __8__ in a college. She believes that __9__ can make dreams come true. Her story tells us: never __10__.';
      return [
        cloze({ pb, s: '1. She ______ drawing since she was a child.', o: ['likes', 'liked', 'has liked', 'liking'], a: 'has liked', an: 'since 从句用现在完成时。' }),
        cloze({ pb, s: '2. ______ is the best teacher.', o: ['Interest', 'Money', 'Time', 'Luck'], a: 'Interest', an: '兴趣是最好的老师。' }),
        cloze({ pb, s: '3. she practiced ______ day.', o: ['every', 'some', 'any', 'no'], a: 'every', an: '每天练习。' }),
        cloze({ pb, s: '4. Sometimes she felt ______ and wanted to stop.', o: ['tired', 'happy', 'excited', 'proud'], a: 'tired', an: '有时感到“累”想放弃。' }),
        cloze({ pb, s: '5. Keep ______, and you will succeed.', o: ['going', 'to go', 'gone', 'go'], a: 'going', an: 'keep doing 继续做。' }),
        cloze({ pb, s: '6. her design ______ first prize.', o: ['wins', 'won', 'winning', 'win'], a: 'won', an: '过去获奖用 won。' }),
        cloze({ pb, s: '7. Now she is ______ about her future.', o: ['worried', 'confident', 'sad', 'angry'], a: 'confident', an: '获奖后对未来“有信心”。' }),
        cloze({ pb, s: '8. She plans to study ______ in a college.', o: ['hard', 'harder', 'hardest', 'hardly'], a: 'harder', an: 'plan to study harder 更努力学。' }),
        cloze({ pb, s: '9. ______ can make dreams come true.', o: ['Effort', 'Money', 'Luck', 'Time'], a: 'Effort', an: '努力能让梦想成真。' }),
        cloze({ pb, s: '10. never ______.', o: ['give up', 'give in', 'give out', 'give away'], a: 'give up', an: '永不放弃。' }),
      ];
    })()},
    { type: '补全对话', prompt: '从选项中选出合适的句子补全对话。', qs: [
      dialog({ s: 'A: Let’s go for a walk.  B: ______', o: ['Good idea!', 'I am a boy.', 'It is rain.', 'No, I can’t.'], a: 'Good idea!', k: '日常交际', kp: '建议应答', t: '校园生活', an: '对建议的肯定应答。' }),
      dialog({ s: 'A: What’s your favorite subject?  B: ______', o: ['I like English.', 'I am 17.', 'It is red.', 'Two books.'], a: 'I like English.', k: '日常交际', kp: '喜好', t: '校园生活', an: '问喜好应回答喜欢什么。' }),
      dialog({ s: 'A: I failed the math exam.  B: ______', o: ['That’s great.', 'Don’t worry, try again.', 'I don’t care.', 'You are wrong.'], a: 'Don’t worry, try again.', k: '日常交际', kp: '鼓励', t: '学习态度', an: '对失败应鼓励。' }),
      dialog({ s: 'A: May I borrow your pen?  B: ______', o: ['Here you are.', 'It is mine.', 'No, you may not.', 'I am busy.'], a: 'Here you are.', k: '日常交际', kp: '借物应答', t: '校园生活', an: '借出用 Here you are.。' }),
    ]},
    { type: '阅读理解', prompt: '阅读下列短文，从每题所给 A、B、C、D 四个选项中选出最佳答案。', qs: (() => {
      const a = 'A city library opened a 24-hour reading room. Many students and night workers go there. The room is quiet and bright. There are free coffee and comfortable chairs. A reader said, “I can read here after work and feel relaxed.” The library hopes more people will fall in love with reading.';
      const b = 'Robots are now working in some restaurants. They welcome guests, deliver dishes and even sing songs. They never get tired. But they cannot cook or talk about feelings. The manager says robots help save labor, but human waiters are still needed for warm service.';
      const c = 'A village used solar power to light its streets. Before, children could not study at night. Now the streets are bright, and a small library uses the power for computers. The village became a model for green energy. Neighboring villages plan to follow.';
      return [
        read({ pb: a, s: '1. What is special about the reading room?', o: ['It is 24-hour', 'It sells books', 'It is small', 'It is noisy'], a: 'It is 24-hour', k: '细节理解', kp: '信息获取', t: '阅读习惯', an: '图书馆开了24小时阅览室。' }),
        read({ pb: a, s: '2. Why do people like the room?', o: ['It is quiet and free coffee', 'It is far', 'It is dark', 'It is expensive'], a: 'It is quiet and free coffee', k: '细节理解', kp: '信息获取', t: '阅读习惯', an: '安静、有免费咖啡、座椅舒适。' }),
        read({ pb: b, s: '3. What can robots do in restaurants?', o: ['Cook food', 'Welcome and deliver', 'Talk feelings', 'Pay bills'], a: 'Welcome and deliver', k: '细节理解', kp: '信息获取', t: '科技发展', an: '机器人迎宾、送餐。' }),
        read({ pb: b, s: '4. Why are human waiters still needed?', o: ['They are cheaper', 'For warm service', 'They can sing', 'They never rest'], a: 'For warm service', k: '推理判断', kp: '推断题', t: '科技发展', an: '人类服务员提供温暖服务。' }),
        read({ pb: c, s: '5. What did the village use solar power for?', o: ['Light streets', 'Cook food', 'Wash clothes', 'Build houses'], a: 'Light streets', k: '细节理解', kp: '信息获取', t: '环境保护', an: '用太阳能照亮街道。' }),
        read({ pb: c, s: '6. What changed for children?', o: ['They can study at night', 'They left village', 'They got new books', 'They stopped school'], a: 'They can study at night', k: '细节理解', kp: '信息获取', t: '环境保护', an: '以前晚上不能学，现在可以。' }),
        read({ pb: a + ' ' + c, s: '7. What do the library and solar-village passages show?', o: ['Cities are busy', 'Communities improve life', 'Books are old', 'Energy is bad'], a: 'Communities improve life', k: '主旨大意', kp: '中心思想', t: '社会发展', an: '两篇都展示社区改善生活。' }),
        read({ pb: b, s: '8. What is the best title for the restaurant-robot passage?', o: ['Robot Cooks', 'Robots in Restaurants', 'How to Sing', 'New Dishes'], a: 'Robots in Restaurants', k: '主旨大意', kp: '中心思想', t: '科技发展', an: '全文围绕餐厅机器人。' }),
        read({ pb: c, s: '9. What will neighboring villages do?', o: ['Move away', 'Follow the model', 'Close libraries', 'Buy robots'], a: 'Follow the model', k: '细节理解', kp: '信息获取', t: '环境保护', an: '邻村计划效仿。' }),
        read({ pb: a, s: '10. What does the library hope?', o: ['To sell coffee', 'More love reading', 'To close', 'To charge money'], a: 'More love reading', k: '细节理解', kp: '信息获取', t: '阅读习惯', an: '希望更多人爱上阅读。' }),
      ];
    })()},
    { type: '句子翻译', prompt: '将下列句子译成汉语。', qs: [
      trans({ s: 'Rome was not built in a day.', a: '罗马不是一天建成的。', k: '中译英句型', kp: '谚语', t: '学习态度', an: '英语谚语。' }),
      trans({ s: 'Reading enriches our minds.', a: '阅读丰富我们的思想。', k: '中译英句型', kp: 'enrich', t: '阅读习惯', an: 'enrich 丰富。' }),
      trans({ s: 'He is proud of his hometown.', a: '他为他的家乡感到骄傲。', k: '中译英句型', kp: 'be proud of', t: '社会生活', an: 'be proud of 为……骄傲。' }),
      trans({ s: 'Little by little, one goes far.', a: '循序渐进，方能致远。', k: '中译英句型', kp: '谚语', t: '学习态度', an: '英语谚语意译。' }),
    ]},
    { type: '书面表达', prompt: '根据提示写一篇短文。', qs: [
      writing({ s: '很多学校重视班级文化建设，有的班级在教室培植绿色植物。请以“My Views on Keeping Plants in the Classroom”为题写一篇 80 词左右的短文，谈谈现象、利与弊，以及你的看法。（提示：绿萝、富贵竹；清新空气、保护视力、令人放松；分散注意力、费时）', kp: '现象看法类', t: '校园生活', a: 'My Views on Keeping Plants in the Classroom\nNow many classes grow green plants such as pothos and lucky bamboo on windowsills and corners. It has both good and bad sides. Plants clean the air, protect our eyes and make us relaxed. However, they may distract some students and cost time to look after. In my opinion, we can keep simple plants. If we manage them well, they will create a nicer place to study.', an: '要点：现象、利弊、看法；词数达标。' }),
    ]},
  ],
};

// ---- 第 4 套 ----
const p4 = {
  id: uid(), title: '真题仿真模拟卷（四）', year: '2024', kind: '模拟', duration: 120,
  sections: [
    { type: '单项选择', prompt: '从 A、B、C、D 四个选项中选出最佳答案。', qs: [
      mcq({ s: 'The teacher ______ the students are talking is very kind.', o: ['who', 'which', 'to whom', 'to who'], a: 'to whom', k: '定语从句', kp: '介词+关系代词', t: '校园生活', an: 'talk to sb.，介词 to 提前，指人用 whom。' }),
      mcq({ s: 'If I ______ you, I would take the job.', o: ['am', 'was', 'were', 'be'], a: 'were', k: '虚拟语气', kp: 'if 与现在相反', t: '职业规划', an: '与现在事实相反，be 用 were。' }),
      mcq({ s: 'He ______ to the party if he is free tomorrow.', o: ['will come', 'comes', 'came', 'has come'], a: 'will come', k: '状语从句', kp: '主将从现', t: '人际交往', an: 'if 表将来，主句用一般将来时。' }),
      mcq({ s: 'The cake ______ by my mother yesterday.', o: ['made', 'was made', 'is made', 'makes'], a: 'was made', k: '时态语态', kp: '一般过去时被动', t: '社会生活', an: '蛋糕被妈妈做，过去被动。' }),
      mcq({ s: '______ is important to learn a foreign language.', o: ['This', 'That', 'It', 'What'], a: 'It', k: '固定句型', kp: 'It is + adj. + to do', t: '学习态度', an: '形式主语 it 指代 to do。' }),
      mcq({ s: 'He runs ______ than any other boy in his class.', o: ['fast', 'faster', 'fastest', 'the faster'], a: 'faster', k: '副词比较级', kp: 'than 比较级', t: '校园生活', an: 'than 提示比较级 faster。' }),
      mcq({ s: 'I have two pens. One is red, ______ is blue.', o: ['other', 'the other', 'others', 'another'], a: 'the other', k: '代词辨析', kp: 'one ... the other', t: '校园生活', an: '两者中一个…另一个用 the other。' }),
      mcq({ s: 'She looks ______ she is tired.', o: ['as if', 'like', 'that', 'what'], a: 'as if', k: '状语从句', kp: 'as if 引导', t: '人际交往', an: 'as if 好像。' }),
      mcq({ s: 'The meeting ______ at 9:00 tomorrow.', o: ['will hold', 'will be held', 'is held', 'holds'], a: 'will be held', k: '时态语态', kp: '一般将来时被动', t: '校园生活', an: '会议被举行，将来被动。' }),
      mcq({ s: 'He is the only one of the students who ______ from Beijing.', o: ['is', 'are', 'was', 'were'], a: 'is', k: '主谓一致', kp: 'the only one of', t: '校园生活', an: 'the only one of ... who 后谓语用单数。' }),
      mcq({ s: 'I would rather ______ at home than go out.', o: ['stay', 'to stay', 'staying', 'stayed'], a: 'stay', k: '非谓语动词', kp: 'would rather do', t: '校园生活', an: 'would rather do than do。' }),
      mcq({ s: '______ from the top of the hill, the city is beautiful.', o: ['Seen', 'Seeing', 'See', 'To see'], a: 'Seen', k: '非谓语动词', kp: '过去分词作状语', t: '社会生活', an: 'city 与 see 被动，用 Seen。' }),
    ]},
    { type: '完形填空', prompt: '阅读下面短文，掌握大意，从每题所给 A、B、C、D 四个选项中选最佳答案。', qs: (() => {
      const pb = 'Liu Yang joined the school volunteer team last year. At first, he was __1__ because he didn’t know what to do. The team leader smiled and said, “Just __2__ your heart.” They went to a clean park, visited sick children and helped the old. Liu Yang found that giving __3__ made him happy. He made many __4__ friends. Now he __5__ every weekend doing volunteer work. His parents are __6__ of him. He says volunteering teaches him to __7__ others. He hopes more students will __8__ the team. “A small act of __9__ can warm someone’s heart,” he often says. He believes the world will be __10__ with love.';
      return [
        cloze({ pb, s: '1. he was ______ because he didn’t know what to do.', o: ['excited', 'nervous', 'happy', 'angry'], a: 'nervous', an: '不知做什么感到“紧张”。' }),
        cloze({ pb, s: '2. Just ______ your heart.', o: ['follow', 'break', 'lose', 'hide'], a: 'follow', an: 'follow your heart 跟随你的心。' }),
        cloze({ pb, s: '3. giving ______ made him happy.', o: ['money', 'help', 'food', 'time'], a: 'help', an: '给予“帮助”让他快乐。' }),
        cloze({ pb, s: '4. He made many ______ friends.', o: ['new', 'old', 'rich', 'poor'], a: 'new', an: '结识许多“新”朋友。' }),
        cloze({ pb, s: '5. Now he ______ every weekend.', o: ['works', 'played', 'sleeps', 'cries'], a: 'works', an: '现在每个周末都做志愿工作。' }),
        cloze({ pb, s: '6. His parents are ______ of him.', o: ['proud', 'tired', 'afraid', 'sure'], a: 'proud', an: 'be proud of 骄傲。' }),
        cloze({ pb, s: '7. teaches him to ______ others.', o: ['hate', 'care about', 'forget', 'ignore'], a: 'care about', an: '学会“关心”他人。' }),
        cloze({ pb, s: '8. more students will ______ the team.', o: ['join', 'leave', 'watch', 'fight'], a: 'join', an: '“加入”团队。' }),
        cloze({ pb, s: '9. A small act of ______ can warm someone’s heart.', o: ['kindness', 'anger', 'pride', 'fear'], a: 'kindness', an: '善举温暖人心。' }),
        cloze({ pb, s: '10. the world will be ______ with love.', o: ['better', 'worse', 'smaller', 'colder'], a: 'better', an: '有爱世界更“美好”。' }),
      ];
    })()},
    { type: '补全对话', prompt: '从选项中选出合适的句子补全对话。', qs: [
      dialog({ s: 'A: What’s wrong with you?  B: ______', o: ['I have a headache.', 'I am fine.', 'It is sunny.', 'I like apples.'], a: 'I have a headache.', k: '日常交际', kp: '就医', t: '校园生活', an: '问病情回答不适。' }),
      dialog({ s: 'A: Excuse me, is there a bank near here?  B: ______', o: ['Yes, it is just behind the school.', 'Yes, I am.', 'No, thanks.', 'You are welcome.'], a: 'Yes, it is just behind the school.', k: '日常交际', kp: '问路', t: '社会生活', an: '询问附近是否有银行，应答给出方位。' }),
      dialog({ s: 'A: Happy birthday!  B: ______', o: ['The same to you.', 'Thank you!', 'I am 18.', 'No, thanks.'], a: 'Thank you!', k: '日常交际', kp: '祝贺应答', t: '人际交往', an: '对生日祝福应答感谢。' }),
      dialog({ s: 'A: Shall we go to the movies?  B: ______', o: ['Yes, I’d love to.', 'I am a student.', 'It is far.', 'No, I can’t sing.'], a: 'Yes, I’d love to.', k: '日常交际', kp: '邀请应答', t: '校园生活', an: '对邀请的肯定应答。' }),
    ]},
    { type: '阅读理解', prompt: '阅读下列短文，从每题所给 A、B、C、D 四个选项中选出最佳答案。', qs: (() => {
      const a = 'A vocational school started a “skill festival”. Students show what they can do: cooking, repairing computers, making clothes and so on. Visitors can try some skills. A student who won a cooking prize said, “Skills give me confidence.” The festival tells students that every job is worthy of respect.';
      const b = 'More people choose to ride bikes to work. It saves money and is good for health and the environment. Cities are building more bike lanes. A survey shows bike riders are happier and fitter. Some companies even give money to workers who ride to work.';
      const c = 'An old man in a small town opened a free book corner. Anyone can take a book and leave one. Children come after school, and old people read newspapers there. The corner becomes a small community center. The man says, “Books bring us together.”';
      return [
        read({ pb: a, s: '1. What can students show at the festival?', o: ['Their skills', 'Their homes', 'Their cars', 'Their pets'], a: 'Their skills', k: '细节理解', kp: '信息获取', t: '职业规划', an: '学生展示技能。' }),
        read({ pb: a, s: '2. What does the festival tell students?', o: ['Only big jobs matter', 'Every job deserves respect', 'Study is useless', 'Money is everything'], a: 'Every job deserves respect', k: '推理判断', kp: '推断题', t: '职业规划', an: '活动传达每行职业都值得尊重。' }),
        read({ pb: b, s: '3. Why do people ride bikes?', o: ['It costs money', 'For health and environment', 'It is slow', 'It is boring'], a: 'For health and environment', k: '细节理解', kp: '信息获取', t: '环境保护', an: '骑行省钱、有益健康和环境。' }),
        read({ pb: b, s: '4. What do some companies do?', o: ['Pay bike riders', 'Ban bikes', 'Sell cars', 'Build parks'], a: 'Pay bike riders', k: '细节理解', kp: '信息获取', t: '环境保护', an: '一些公司给骑行上班者发钱。' }),
        read({ pb: c, s: '5. What is the book corner?', o: ['A shop', 'A free reading place', 'A school', 'A hospital'], a: 'A free reading place', k: '细节理解', kp: '信息获取', t: '阅读习惯', an: '免费读书角落。' }),
        read({ pb: c, s: '6. Who comes to the corner?', o: ['Only adults', 'Children and old people', 'Only workers', 'No one'], a: 'Children and old people', k: '细节理解', kp: '信息获取', t: '阅读习惯', an: '孩子放学后和老人来。' }),
        read({ pb: a + ' ' + c, s: '7. What is the shared message of the two passages?', o: ['School is hard', 'Small things build community', 'Books are expensive', 'Skills are old'], a: 'Small things build community', k: '主旨大意', kp: '中心思想', t: '社会发展', an: '两者都体现小事凝聚社区。' }),
        read({ pb: b, s: '8. What is the best title for the bike-to-work passage?', o: ['Cars in City', 'Riding Bikes to Work', 'How to Build Lanes', 'New Companies'], a: 'Riding Bikes to Work', k: '主旨大意', kp: '中心思想', t: '环境保护', an: '全文关于骑行上班。' }),
        read({ pb: c, s: '9. What does the old man say?', o: ['Books bring us together', 'Books are cheap', 'Reading is hard', 'Town is small'], a: 'Books bring us together', k: '细节理解', kp: '信息获取', t: '阅读习惯', an: '老人说书让我们相聚。' }),
        read({ pb: a, s: '10. What did the cooking prize winner say?', o: ['Skills give me confidence', 'I hate cooking', 'School is boring', 'Money is key'], a: 'Skills give me confidence', k: '细节理解', kp: '信息获取', t: '职业规划', an: '获奖学生说技能给了他自信。' }),
      ];
    })()},
    { type: '句子翻译', prompt: '将下列句子译成汉语。', qs: [
      trans({ s: 'Every job is worthy of respect.', a: '每一份工作都值得尊重。', k: '中译英句型', kp: 'worthy of', t: '职业规划', an: 'be worthy of 值得。' }),
      trans({ s: 'A small act of kindness can warm a heart.', a: '一个小小善举能温暖人心。', k: '中译英句型', kp: 'act of kindness', t: '志愿服务', an: '善举温暖人心。' }),
      trans({ s: 'He is confident in his future.', a: '他对自己的未来充满信心。', k: '中译英句型', kp: 'be confident in', t: '学习态度', an: 'be confident in 对……有信心。' }),
      trans({ s: 'Better late than never.', a: '迟做总比不做好。', k: '中译英句型', kp: '谚语', t: '学习态度', an: '英语谚语。' }),
    ]},
    { type: '书面表达', prompt: '根据提示写一篇短文。', qs: [
      writing({ s: '健康技能对青少年很重要。请以“My Views on Health Skills”为题写一篇 80 词左右的短文，谈谈你了解的健康技能、你打算采用哪些，以及你的看法。（提示：健康饮食、充足睡眠、加强沟通、学会倾听、减轻压力）', kp: '现象看法类', t: '健康生活', a: 'My Views on Health Skills\nHealth skills matter a lot to teenagers. They include healthy eating, good sleep, communication and the ability to get health information. I plan to keep a balanced diet and sleep eight hours a day. I will also talk more with others and learn to listen, so I can reduce stress. In my opinion, health skills are as important as study skills. They help us live a better life.', an: '要点：技能、计划、看法；词数达标。' }),
    ]},
  ],
};

// ---- 第 5 套 ----
const p5 = {
  id: uid(), title: '真题仿真模拟卷（五）', year: '2023', kind: '模拟', duration: 120,
  sections: [
    { type: '单项选择', prompt: '从 A、B、C、D 四个选项中选出最佳答案。', qs: [
      mcq({ s: 'He suggested ______ a meeting to discuss the plan.', o: ['have', 'to have', 'having', 'had'], a: 'having', k: '非谓语动词', kp: 'suggest doing', t: '校园生活', an: 'suggest doing sth. 建议做。' }),
      mcq({ s: 'The harder you study, ______ you will learn.', o: ['much', 'more', 'the more', 'the most'], a: 'the more', k: '比较等级', kp: 'the more ... the more', t: '学习态度', an: '“the + 比较级 …, the + 比较级 …”。' }),
      mcq({ s: 'I ______ books from the library yesterday.', o: ['borrowed', 'lent', 'borrow', 'lend'], a: 'borrowed', k: '词义辨析', kp: 'borrow/lend', t: '阅读习惯', an: '从图书馆“借入”用 borrow。' }),
      mcq({ s: '______ the rain, we stayed at home.', o: ['Because', 'Although', 'Because of', 'Since'], a: 'Because of', k: '状语从句', kp: 'because of + 名词', t: '社会生活', an: 'the rain 是名词，用 Because of。' }),
      mcq({ s: 'There is ______ milk in the fridge. Let’s buy some.', o: ['little', 'a little', 'few', 'a few'], a: 'little', k: '代词辨析', kp: 'little/a little', t: '社会生活', an: 'milk 不可数，且要买说明“几乎没有”，用 little。' }),
      mcq({ s: 'He is ______ a teacher ______ a friend to us.', o: ['either; or', 'neither; nor', 'not only; but also', 'both; and'], a: 'not only; but also', k: '连词', kp: 'not only ... but also', t: '人际交往', an: '不仅……而且……。' }),
      mcq({ s: 'The boy is ______ to carry the box.', o: ['enough strong', 'strong enough', 'too strong', 'so strong'], a: 'strong enough', k: '副词辨析', kp: 'enough 位置', t: '校园生活', an: 'enough 修饰形容词放其后。' }),
      mcq({ s: 'I don’t know ______ he will come.', o: ['that', 'if', 'what', 'which'], a: 'if', k: '名词性从句', kp: '宾语从句', t: '人际交往', an: '是否来用 if 引导。' }),
      mcq({ s: 'He ______ for two hours.', o: ['has slept', 'slept', 'sleeps', 'sleep'], a: 'has slept', k: '时态语态', kp: '现在完成时', t: '校园生活', an: 'for two hours 与现在完成时连用。' }),
      mcq({ s: 'The flowers ______ every day.', o: ['water', 'watered', 'are watered', 'is watered'], a: 'are watered', k: '时态语态', kp: '一般现在时被动', t: '校园生活', an: '花被浇水，复数用 are watered。' }),
      mcq({ s: '______ careful! The bus is coming.', o: ['Be', 'Being', 'To be', 'Been'], a: 'Be', k: '祈使句', kp: 'be 型祈使句', t: '社会生活', an: '祈使句用动词原形 Be。' }),
      mcq({ s: 'He spent two hours ______ his homework.', o: ['do', 'to do', 'doing', 'did'], a: 'doing', k: '非谓语动词', kp: 'spend ... doing', t: '校园生活', an: 'spend time doing sth.。' }),
    ]},
    { type: '完形填空', prompt: '阅读下面短文，掌握大意，从每题所给 A、B、C、D 四个选项中选最佳答案。', qs: (() => {
      const pb = 'Zhao Min loves writing. She __1__ a diary every day. Her Chinese teacher encouraged her to __2__ a story. At first, she had no __3__. Then she watched people in the park and got ideas. She wrote about a small dog __4__ found its way home. Her classmates liked the story. The teacher said, “Your words have __5__.” Zhao Min felt __6__ and wrote more. She __7__ her first short book last month. Now she wants to be a __8__ in the future. She says writing helps her __9__ the world better. “Never stop __10__,” she tells young writers.';
      return [
        cloze({ pb, s: '1. She ______ a diary every day.', o: ['keeps', 'keep', 'keeping', 'kept'], a: 'keeps', an: 'keep a diary 写日记，三单。' }),
        cloze({ pb, s: '2. encouraged her to ______ a story.', o: ['write', 'wrote', 'writing', 'writes'], a: 'write', an: 'encourage sb. to do。' }),
        cloze({ pb, s: '3. she had no ______.', o: ['idea', 'time', 'money', 'book'], a: 'idea', an: '起初没有“灵感/想法”。' }),
        cloze({ pb, s: '4. a small dog ______ found its way home.', o: ['who', 'which', 'what', 'where'], a: 'which', an: '先行词 dog 指物用 which。' }),
        cloze({ pb, s: '5. Your words have ______.', o: ['power', 'color', 'sound', 'smell'], a: 'power', an: '文字有“力量”。' }),
        cloze({ pb, s: '6. Zhao Min felt ______ and wrote more.', o: ['sad', 'encouraged', 'tired', 'angry'], a: 'encouraged', an: '受到鼓励写更多。' }),
        cloze({ pb, s: '7. She ______ her first short book.', o: ['published', 'publish', 'publishing', 'publishes'], a: 'published', an: '过去出版用 published。' }),
        cloze({ pb, s: '8. wants to be a ______.', o: ['writer', 'driver', 'cook', 'singer'], a: 'writer', an: '想成为“作家”。' }),
        cloze({ pb, s: '9. helps her ______ the world better.', o: ['understand', 'forget', 'hate', 'leave'], a: 'understand', an: '更好地理解世界。' }),
        cloze({ pb, s: '10. Never stop ______.', o: ['writing', 'to write', 'write', 'wrote'], a: 'writing', an: 'stop doing 停止做（不再写）。' }),
      ];
    })()},
    { type: '补全对话', prompt: '从选项中选出合适的句子补全对话。', qs: [
      dialog({ s: 'A: What do you usually do on weekends?  B: ______', o: ['I usually read books.', 'I am a boy.', 'It is Sunday.', 'Two days.'], a: 'I usually read books.', k: '日常交际', kp: '日常活动', t: '校园生活', an: '问周末常做应答活动。' }),
      dialog({ s: 'A: I got a high score!  B: ______', o: ['That’s too bad.', 'Well done!', 'I don’t care.', 'Be careful.'], a: 'Well done!', k: '日常交际', kp: '祝贺', t: '学习态度', an: '对好成绩表示赞许。' }),
      dialog({ s: 'A: Would you mind closing the window?  B: ______', o: ['No, go ahead.', 'No, not at all.', 'Yes, I do.', 'I am cold.'], a: 'No, not at all.', k: '日常交际', kp: '请求应答', t: '校园生活', an: '不介意关窗用 No, not at all.。' }),
      dialog({ s: 'A: How do you go to school?  B: ______', o: ['By bike.', 'At 7:00.', 'It is far.', 'I like it.'], a: 'By bike.', k: '日常交际', kp: '交通方式', t: '社会生活', an: '问交通方式应答。' }),
    ]},
    { type: '阅读理解', prompt: '阅读下列短文，从每题所给 A、B、C、D 四个选项中选出最佳答案。', qs: (() => {
      const a = 'A school held a food festival. Students brought dishes from their hometowns. There was dumplings from the north, rice noodles from the south and BBQ from the west. They shared stories behind the food. A student said, “Food connects us.” The festival helped students learn about different cultures in China.';
      const b = 'More students learn coding at vocational schools. They build small apps and games. A girl made an app to help the blind read. Her teacher said practice is key. The school has a lab open after class. Many students say coding makes them creative and confident.';
      const c = 'A town built a community garden. People grow vegetables together and share them. Children learn where food comes from. Old people enjoy the time outdoors. The garden reduces loneliness and brings neighbours closer. The town plans to build two more.';
      return [
        read({ pb: a, s: '1. What did students bring to the festival?', o: ['Books', 'Dishes from hometowns', 'Clothes', 'Pets'], a: 'Dishes from hometowns', k: '细节理解', kp: '信息获取', t: '校园文化', an: '学生带家乡菜。' }),
        read({ pb: a, s: '2. What did the festival help students learn?', o: ['To cook', 'Different cultures', 'To sell food', 'To travel'], a: 'Different cultures', k: '推理判断', kp: '推断题', t: '校园文化', an: '帮助学生了解不同文化。' }),
        read({ pb: b, s: '3. What did the girl make?', o: ['A game', 'An app for the blind', 'A robot', 'A book'], a: 'An app for the blind', k: '细节理解', kp: '信息获取', t: '科技发展', an: '女孩做了帮盲人阅读的应用。' }),
        read({ pb: b, s: '4. What is key according to the teacher?', o: ['Money', 'Practice', 'Luck', 'Age'], a: 'Practice', k: '细节理解', kp: '信息获取', t: '科技发展', an: '老师说练习是关键。' }),
        read({ pb: c, s: '5. What do people do in the garden?', o: ['Grow vegetables', 'Play cards', 'Watch TV', 'Sleep'], a: 'Grow vegetables', k: '细节理解', kp: '信息获取', t: '社会生活', an: '一起种菜分享。' }),
        read({ pb: c, s: '6. What does the garden reduce?', o: ['Hunger', 'Loneliness', 'Noise', 'Cost'], a: 'Loneliness', k: '细节理解', kp: '信息获取', t: '社会生活', an: '减少孤独感。' }),
        read({ pb: a + ' ' + c, s: '7. What do the two readings mainly show?', o: ['Food is cheap', 'Community bonds people', 'Towns are small', 'Schools are far'], a: 'Community bonds people', k: '主旨大意', kp: '中心思想', t: '社会发展', an: '两篇都体现社区凝聚人。' }),
        read({ pb: b, s: '8. What is the best title for the coding passage?', o: ['Girl’s App', 'Coding at Vocational Schools', 'How to Cook', 'New Games'], a: 'Coding at Vocational Schools', k: '主旨大意', kp: '中心思想', t: '科技发展', an: '全文关于职校学编程。' }),
        read({ pb: c, s: '9. What will the town do?', o: ['Close the garden', 'Build two more', 'Sell the land', 'Move away'], a: 'Build two more', k: '细节理解', kp: '信息获取', t: '社会生活', an: '计划再建两个。' }),
        read({ pb: a, s: '10. What did a student say about food?', o: ['Food is cheap', 'Food connects us', 'Food is bad', 'Food is new'], a: 'Food connects us', k: '细节理解', kp: '信息获取', t: '校园文化', an: '学生说食物连接我们。' }),
      ];
    })()},
    { type: '句子翻译', prompt: '将下列句子译成汉语。', qs: [
      trans({ s: 'Food connects us.', a: '食物把我们联系在一起。', k: '中译英句型', kp: 'connect', t: '校园文化', an: 'connect 连接。' }),
      trans({ s: ' Practice is the key to success.', a: '练习是成功的关键。', k: '中译英句型', kp: 'the key to', t: '学习态度', an: 'the key to ……的关键。' }),
      trans({ s: 'Coding makes us creative.', a: '编程让我们富有创造力。', k: '中译英句型', kp: 'make + 宾语 + 宾补', t: '科技发展', an: 'make + 宾语 + 形容词。' }),
      trans({ s: 'Books are the ladder of human progress.', a: '书籍是人类进步的阶梯。', k: '中译英句型', kp: '比喻句', t: '阅读习惯', an: '比喻句直译。' }),
    ]},
    { type: '书面表达', prompt: '根据提示写一篇短文。', qs: [
      writing({ s: '以“Reading is Fun”为题写一篇 80 词左右的短文，谈阅读对你的意义：拓宽视野、获取知识、提高写作、书是良师益友。（参考 2022 真题话题）', kp: '话题作文', t: '阅读习惯', a: 'Reading is Fun\nReading is fun and useful. It opens our eyes to the world’s history and cultures. From books we get knowledge and answers to many questions. Reading also improves our writing, because the more we read, the better we express ourselves. Books are our good teachers and friends. Let’s enjoy reading and grow into better people.', an: '要点：拓宽视野、获取知识、提高写作、良师益友；词数达标。' }),
    ]},
  ],
};

// ---- 第 6 套 ----
const p6 = {
  id: uid(), title: '真题仿真模拟卷（六）', year: '2023', kind: '模拟', duration: 120,
  sections: [
    { type: '单项选择', prompt: '从 A、B、C、D 四个选项中选出最佳答案。', qs: [
      mcq({ s: '______ you told him the truth, he would be angry.', o: ['If', 'Unless', 'Because', 'Although'], a: 'If', k: '状语从句', kp: 'if 条件句', t: '人际交往', an: '如果告诉他真相，他会生气。' }),
      mcq({ s: 'The children were ______ excited ______ they jumped.', o: ['too; to', 'so; that', 'such; that', 'as; as'], a: 'so; that', k: '状语从句', kp: 'so ... that', t: '校园生活', an: 'so ... that ... 如此……以至于……。' }),
      mcq({ s: 'He has lived here ______ 2018.', o: ['for', 'since', 'in', 'on'], a: 'since', k: '介词', kp: 'since + 时间点', t: '社会生活', an: '2018 是时间点，用 since。' }),
      mcq({ s: 'The ______ you eat, the healthier you are.', o: ['more', 'less', 'fewer', 'much'], a: 'less', k: '比较等级', kp: 'the less ... the healthier', t: '健康生活', an: '吃得越少越健康（少 junk food 之意）。' }),
      mcq({ s: 'She is good ______ playing the violin.', o: ['at', 'in', 'on', 'for'], a: 'at', k: '固定搭配', kp: 'be good at', t: '校园生活', an: 'be good at 擅长。' }),
      mcq({ s: 'I think ______ necessary to exercise every day.', o: ['it', 'that', 'this', 'what'], a: 'it', k: '固定句型', kp: 'think it + adj. + to do', t: '健康生活', an: 'it 作形式宾语。' }),
      mcq({ s: 'The movie was ______ interesting ______ I saw it twice.', o: ['too; to', 'so; that', 'such; that', 'as; as'], a: 'so; that', k: '状语从句', kp: 'so ... that', t: '校园生活', an: '如此有趣以至于看了两遍。' }),
      mcq({ s: 'He ______ his keys. He can’t open the door.', o: ['loses', 'lost', 'has lost', 'lose'], a: 'has lost', k: '时态语态', kp: '现在完成时', t: '社会生活', an: '丢钥匙对现在的影响是打不开门，用现在完成时。' }),
      mcq({ s: '______ of the two books is interesting.', o: ['All', 'Both', 'Neither', 'None'], a: 'Neither', k: '代词辨析', kp: 'neither of', t: '阅读习惯', an: '两者都不用 neither。' }),
      mcq({ s: 'The nurse told the patient ______ in bed.', o: ['stay', 'to stay', 'staying', 'stayed'], a: 'to stay', k: '非谓语动词', kp: 'tell sb. to do', t: '校园生活', an: 'tell sb. to do sth.。' }),
      mcq({ s: 'He is ______ than his brother.', o: ['outgoing', 'more outgoing', 'most outgoing', 'outgoinger'], a: 'more outgoing', k: '形容词比较级', kp: '多音节比较级', t: '人际交往', an: '多音节用 more outgoing。' }),
      mcq({ s: 'It’s very kind ______ you to help the old.', o: ['for', 'of', 'to', 'with'], a: 'of', k: '固定搭配', kp: 'It is + of + sb.', t: '志愿服务', an: 'kind 描述人品质用 of。' }),
    ]},
    { type: '完形填空', prompt: '阅读下面短文，掌握大意，从每题所给 A、B、C、D 四个选项中选最佳答案。', qs: (() => {
      const pb = 'A small restaurant in the city offers free meals to the poor every Monday. The owner, Mr. Zhang, said he __1__ hard when he was young and knew hunger. Now he wants to __2__ others. Volunteers help __3__ and clean. A homeless man said, “This meal warms my __4__.” The restaurant also teaches cooking to young people who want a __5__. Many neighbors donate food. Mr. Zhang says, “Kindness is a __6__ that grows when shared.” The story is __7__ on the Internet and touches many hearts. He hopes more shops will __8__ him. “We can all do a __9__,” he smiles. Love makes the city a __10__ place.';
      return [
        cloze({ pb, s: '1. he ______ hard when he was young.', o: ['works', 'worked', 'working', 'work'], a: 'worked', an: '过去时 worked。' }),
        cloze({ pb, s: '2. wants to ______ others.', o: ['help', 'hate', 'forget', 'leave'], a: 'help', an: '想“帮助”他人。' }),
        cloze({ pb, s: '3. Volunteers help ______ and clean.', o: ['cook', 'sleep', 'study', 'sing'], a: 'cook', an: '志愿者帮“做饭”和打扫。' }),
        cloze({ pb, s: '4. warms my ______.', o: ['heart', 'hand', 'head', 'foot'], a: 'heart', an: '温暖我的“心”。' }),
        cloze({ pb, s: '5. young people who want a ______.', o: ['job', 'book', 'car', 'dog'], a: 'job', an: '想找“工作”的年轻人。' }),
        cloze({ pb, s: '6. Kindness is a ______ that grows.', o: ['seed', 'stone', 'cloud', 'wall'], a: 'seed', an: '善意是“种子”，分享时生长。' }),
        cloze({ pb, s: '7. The story is ______ on the Internet.', o: ['shared', 'sold', 'hidden', 'lost'], a: 'shared', an: '故事在网上被“分享”。' }),
        cloze({ pb, s: '8. more shops will ______ him.', o: ['follow', 'leave', 'beat', 'ignore'], a: 'follow', an: '更多店“效仿”他。' }),
        cloze({ pb, s: '9. We can all do a ______.', o: ['little', 'lot', 'few', 'bit'], a: 'little', an: 'do a little 做一点（小事）。' }),
        cloze({ pb, s: '10. a ______ place.', o: ['warmer', 'colder', 'smaller', 'darker'], a: 'warmer', an: '让城市成为更“温暖”的地方。' }),
      ];
    })()},
    { type: '补全对话', prompt: '从选项中选出合适的句子补全对话。', qs: [
      dialog({ s: 'A: I’m sorry to keep you waiting.  B: ______', o: ['That’s all right.', 'You are late.', 'Go away.', 'I am busy.'], a: 'That’s all right.', k: '日常交际', kp: '道歉应答', t: '人际交往', an: '对道歉谅解用 That’s all right.。' }),
      dialog({ s: 'A: What would you like to drink?  B: ______', o: ['A cup of tea.', 'I am thirsty.', 'It is hot.', 'No, I can’t.'], a: 'A cup of tea.', k: '日常交际', kp: '点餐', t: '社会生活', an: '问想喝什么应答饮品。' }),
      dialog({ s: 'A: Merry Christmas!  B: ______', o: ['The same to you.', 'I am happy.', 'It is cold.', 'No, thanks.'], a: 'The same to you.', k: '日常交际', kp: '节日应答', t: '社会生活', an: '节日祝福回祝用 The same to you.。' }),
      dialog({ s: 'A: Can I help you?  B: ______', o: ['I’d like a ticket.', 'I am fine.', 'It is big.', 'See you.'], a: 'I’d like a ticket.', k: '日常交际', kp: '服务场景', t: '社会生活', an: '服务场景表达需求。' }),
    ]},
    { type: '阅读理解', prompt: '阅读下列短文，从每题所给 A、B、C、D 四个选项中选出最佳答案。', qs: (() => {
      const a = 'A city started a “reading for all” plan. It puts small book boxes in streets, parks and buses. People can take a book and leave one. A survey shows reading time in the city rose by 20%. A worker said, “I read on the bus now instead of playing with my phone.” The plan builds a city of readers.';
      const b = 'Families in a town started “no-screen dinners”. They put phones away and talk at dinner. Children say they learn more about parents. Parents say the home is happier. A study finds such families have better communication and less stress.';
      const c = 'A vocational school built a “maker space”. Students use 3D printers and tools to create things. A boy made a special cup for his grandmother. The space teaches problem-solving and teamwork. The school says making things with hands builds confidence.';
      return [
        read({ pb: a, s: '1. What does the “reading for all” plan do?', o: ['Builds libraries', 'Puts book boxes everywhere', 'Sells books', 'Closes parks'], a: 'Puts book boxes everywhere', k: '细节理解', kp: '信息获取', t: '阅读习惯', an: '在街道公园公交放书箱。' }),
        read({ pb: a, s: '2. What changed for the worker?', o: ['He plays phone', 'He reads on bus', 'He sleeps', 'He watches TV'], a: 'He reads on bus', k: '细节理解', kp: '信息获取', t: '阅读习惯', an: '现在在公交上读书而非玩手机。' }),
        read({ pb: b, s: '3. What do families do at “no-screen dinners”?', o: ['Watch TV', 'Talk and put phones away', 'Play games', 'Read books'], a: 'Talk and put phones away', k: '细节理解', kp: '信息获取', t: '家庭生活', an: '放下手机聊天。' }),
        read({ pb: b, s: '4. What does the study find?', o: ['More stress', 'Better communication', 'Less talk', 'Worse grades'], a: 'Better communication', k: '细节理解', kp: '信息获取', t: '家庭生活', an: '家庭沟通更好、压力更小。' }),
        read({ pb: c, s: '5. What is in the “maker space”?', o: ['3D printers', 'Cars', 'Pools', 'Farms'], a: '3D printers', k: '细节理解', kp: '信息获取', t: '科技发展', an: '有3D打印机和工具。' }),
        read({ pb: c, s: '6. What does making things build?', o: ['Confidence', 'Anger', 'Fear', 'Loneliness'], a: 'Confidence', k: '细节理解', kp: '信息获取', t: '科技发展', an: '动手做培养自信。' }),
        read({ pb: a + ' ' + b, s: '7. What do the good-habit passages show?', o: ['Phones are bad', 'Good habits improve life', 'Cities are noisy', 'Books are new'], a: 'Good habits improve life', k: '主旨大意', kp: '中心思想', t: '社会发展', an: '两篇都体现好习惯改善生活。' }),
        read({ pb: c, s: '8. What is the best title for C?', o: ['Grandmother’s Cup', 'The Maker Space', 'How to Print', 'New Tools'], a: 'The Maker Space', k: '主旨大意', kp: '中心思想', t: '科技发展', an: '全文关于创客空间。' }),
        read({ pb: b, s: '9. How do children feel about no-screen dinners?', o: ['Sad', 'They learn about parents', 'Angry', 'Bored'], a: 'They learn about parents', k: '细节理解', kp: '信息获取', t: '家庭生活', an: '孩子更了解父母。' }),
        read({ pb: a, s: '10. What does the plan build?', o: ['A city of readers', 'A city of phones', 'A big library', 'A school'], a: 'A city of readers', k: '细节理解', kp: '信息获取', t: '阅读习惯', an: '建设读者之城。' }),
      ];
    })()},
    { type: '句子翻译', prompt: '将下列句子译成汉语。', qs: [
      trans({ s: 'Kindness is a seed that grows when shared.', a: '善意是一颗在分享时生长的种子。', k: '中译英句型', kp: '定语从句', t: '志愿服务', an: '含定语从句。' }),
      trans({ s: 'Good habits improve our life.', a: '好习惯改善我们的生活。', k: '中译英句型', kp: 'improve', t: '健康生活', an: 'improve 改善。' }),
      trans({ s: 'He is always ready to help others.', a: '他总是乐于助人。', k: '中译英句型', kp: 'be ready to', t: '志愿服务', an: 'be ready to 乐于。' }),
      trans({ s: 'A small act can make a big difference.', a: '一个小小举动能带来很大不同。', k: '中译英句型', kp: 'make a difference', t: '志愿服务', an: 'make a difference 有影响。' }),
    ]},
    { type: '书面表达', prompt: '根据提示写一篇短文。', qs: [
      writing({ s: '请以“My Dream Job”为题写一篇 80 词左右的短文，说明你理想的职业、为什么选择它，以及你打算如何实现。（可结合职教/技能方向）', kp: '话题作文', t: '职业规划', a: 'My Dream Job\nMy dream job is to be a skilled technician. I study at a vocational school and enjoy working with machines. I choose it because skills can change a person’s life and our country needs good workers. To achieve my goal, I will study hard, practice more in the workshop and take part in skill competitions. I believe my dream will come true.', an: '要点：职业、原因、实现途径；词数达标。' }),
    ]},
  ],
};

// ---- 第 7 套 ----
const p7 = {
  id: uid(), title: '真题仿真模拟卷（七）', year: '2024', kind: '模拟', duration: 120,
  sections: [
    { type: '单项选择', prompt: '从 A、B、C、D 四个选项中选出最佳答案。', qs: [
      mcq({ s: 'The teacher asked us ______ noise in the library.', o: ['not make', 'not to make', 'to not make', 'don’t make'], a: 'not to make', k: '非谓语动词', kp: 'ask sb. not to do', t: '校园生活', an: 'ask sb. not to do sth.。' }),
      mcq({ s: '______ he is young, he knows a lot.', o: ['Although', 'Because', 'If', 'Unless'], a: 'Although', k: '状语从句', kp: 'although 让步', t: '学习态度', an: '尽管年轻，懂得多，让步。' }),
      mcq({ s: 'This is the village ______ I was born.', o: ['which', 'that', 'where', 'what'], a: 'where', k: '定语从句', kp: '关系副词 where', t: '社会生活', an: '先行词 village 表地点，用 where。' }),
      mcq({ s: 'Tom is ______ of the two boys.', o: ['taller', 'the taller', 'tallest', 'the tallest'], a: 'the taller', k: '比较等级', kp: '两者中较……的一个', t: '校园生活', an: '表示“两者中较……的一个”，比较级前加 the。' }),
      mcq({ s: 'The dictionary ______ on the desk is mine.', o: ['laying', 'lying', 'laid', 'lain'], a: 'lying', k: '非谓语动词', kp: '现在分词作定语', t: '阅读习惯', an: 'dictionary 与 lie（平放）主动，用现在分词 lying。' }),
      mcq({ s: 'He runs ______ than any other student in his class.', o: ['fast', 'faster', 'fastest', 'the faster'], a: 'faster', k: '副词比较级', kp: 'than 比较级', t: '校园生活', an: 'than 提示比较级 faster。' }),
      mcq({ s: 'There is ______ water in the glass. Please give me some.', o: ['little', 'a little', 'few', 'a few'], a: 'little', k: '代词辨析', kp: 'little/a little', t: '社会生活', an: 'water 不可数，且要一些说明“几乎没有”，用 little。' }),
      mcq({ s: 'The window was broken. It ______ by the wind last night.', o: ['broke', 'was broken', 'has broken', 'breaks'], a: 'was broken', k: '时态语态', kp: '一般过去时被动', t: '校园生活', an: '窗被风打破，过去被动（was broken）。' }),
      mcq({ s: 'He was ______ excited ______ he jumped with joy.', o: ['too; to', 'so; that', 'such; that', 'as; as'], a: 'so; that', k: '状语从句', kp: 'so ... that', t: '校园生活', an: 'so ... that ... 如此……以至于……。' }),
      mcq({ s: 'There ______ a basketball match next Monday.', o: ['is going to have', 'is going to be', 'are going to be', 'will have'], a: 'is going to be', k: 'there be 句型', kp: 'there is going to be', t: '校园生活', an: 'there be 将来时用 there is going to be。' }),
      mcq({ s: 'The ______ you read, ______ you understand.', o: ['much; more', 'more; much', 'more; the more', 'the more; the better'], a: 'the more; the better', k: '比较等级', kp: 'the more ... the more', t: '学习态度', an: '“the + 比较级 …, the + 比较级 …”。' }),
      mcq({ s: 'He is ______ clever boy that everyone likes him.', o: ['such', 'so', 'such a', 'so a'], a: 'such a', k: '状语从句', kp: 'such ... that', t: '人际交往', an: 'such + a/an + 形容词 + 名词 + that。' }),
    ]},
    { type: '完形填空', prompt: '阅读下面短文，掌握大意，从每题所给 A、B、C、D 四个选项中选最佳答案。', qs: (() => {
      const pb = 'A group of students started a “clean river” project. They __1__ gloves and bags and went to the river near school. At first, the river was __2__ with plastic. They picked up bottles and __3__. A teacher joined them and said, “Small hands can do __4__ things.” After three weekends, the river looked __5__. Fish came back. The students made a short video to tell others to __6__ the environment. The video got many likes. Now more students __7__ the project. They believe young people can __8__ a difference. “Don’t wait for __9__ to act,” they say. “The earth is __10__ only home.”';
      return [
        cloze({ pb, s: '1. They ______ gloves and bags.', o: ['put on', 'took off', 'threw away', 'broke'], a: 'put on', an: '“戴上”手套拿起袋子。' }),
        cloze({ pb, s: '2. the river was ______ with plastic.', o: ['full', 'empty', 'clean', 'clear'], a: 'full', an: 'full of 充满（塑料）。' }),
        cloze({ pb, s: '3. picked up bottles and ______.', o: ['bags', 'fish', 'books', 'flowers'], a: 'bags', an: '捡瓶子和“袋子”。' }),
        cloze({ pb, s: '4. Small hands can do ______ things.', o: ['big', 'small', 'bad', 'old'], a: 'big', an: '小手能做“大”事。' }),
        cloze({ pb, s: '5. the river looked ______.', o: ['dirty', 'clean', 'sad', 'cold'], a: 'clean', an: '三周后河变“干净”。' }),
        cloze({ pb, s: '6. tell others to ______ the environment.', o: ['protect', 'hurt', 'forget', 'leave'], a: 'protect', an: '保护“环境”。' }),
        cloze({ pb, s: '7. more students ______ the project.', o: ['join', 'leave', 'watch', 'stop'], a: 'join', an: '更多学生“加入”项目。' }),
        cloze({ pb, s: '8. can ______ a difference.', o: ['make', 'take', 'do', 'get'], a: 'make', an: 'make a difference 产生影响。' }),
        cloze({ pb, s: '9. Don’t wait for ______ to act.', o: ['others', 'yourself', 'teachers', 'parents'], a: 'others', an: '别等“别人”行动。' }),
        cloze({ pb, s: '10. The earth is ______ only home.', o: ['our', 'their', 'his', 'her'], a: 'our', an: '地球是“我们的”唯一家园。' }),
      ];
    })()},
    { type: '补全对话', prompt: '从选项中选出合适的句子补全对话。', qs: [
      dialog({ s: 'A: May I take your order?  B: ______', o: ['I want a hamburger.', 'I am hungry.', 'It is nice.', 'No, I can’t.'], a: 'I want a hamburger.', k: '日常交际', kp: '点餐', t: '社会生活', an: '餐厅点餐表达需求。' }),
      dialog({ s: 'A: How do you like this movie?  B: ______', o: ['It is great.', 'I am fine.', 'It is a book.', 'Two hours.'], a: 'It is great.', k: '日常交际', kp: '评价', t: '校园生活', an: '问看法应答评价。' }),
      dialog({ s: 'A: I’m afraid I can’t come.  B: ______', o: ['What a pity!', 'That’s great.', 'You are wrong.', 'Go ahead.'], a: 'What a pity!', k: '日常交际', kp: '遗憾', t: '人际交往', an: '对不能来表遗憾。' }),
      dialog({ s: 'A: Could you do me a favor?  B: ______', o: ['Sure, what is it?', 'I am busy.', 'No, I can’t.', 'It is mine.'], a: 'Sure, what is it?', k: '日常交际', kp: '请求应答', t: '人际交往', an: '乐意帮忙反问何事。' }),
    ]},
    { type: '阅读理解', prompt: '阅读下列短文，从每题所给 A、B、C、D 四个选项中选出最佳答案。', qs: (() => {
      const a = 'A school started “no homework weekends” once a month. Students do sports, read or help at home. A survey shows they return to school happier and more focused. Some parents worry about grades, but teachers say rest improves learning. The school says balance is the key to growth.';
      const b = 'Young people in a city learn traditional crafts: paper cutting, weaving and pottery. They sell works online and at markets. An 18-year-old said, “Craft connects me to our culture.” The city opens free classes. More youth find pride in making things by hand.';
      const c = 'A bus company in a town uses electric buses. They are quiet and clean. Air becomes better. Old people like them because they are easy to get on. The town plans to change all buses to electric in three years.';
      return [
        read({ pb: a, s: '1. What does the school do once a month?', o: ['No homework weekends', 'Extra classes', 'Exams', 'Sports day'], a: 'No homework weekends', k: '细节理解', kp: '信息获取', t: '校园生活', an: '每月一次无作业周末。' }),
        read({ pb: a, s: '2. What do teachers say about rest?', o: ['It is useless', 'It improves learning', 'It is bad', 'It wastes time'], a: 'It improves learning', k: '细节理解', kp: '信息获取', t: '校园生活', an: '老师说休息促进学习。' }),
        read({ pb: b, s: '3. What crafts do young people learn?', o: ['Paper cutting', 'Driving', 'Coding', 'Cooking'], a: 'Paper cutting', k: '细节理解', kp: '信息获取', t: '传统文化', an: '学剪纸、编织、陶艺。' }),
        read({ pb: b, s: '4. Why do youth feel pride?', o: ['They earn money', 'Making things by hand', 'They travel', 'They watch TV'], a: 'Making things by hand', k: '推理判断', kp: '推断题', t: '传统文化', an: '亲手制作带来自豪。' }),
        read({ pb: c, s: '5. What kind of buses does the town use?', o: ['Electric', 'Old', 'Small', 'Red'], a: 'Electric', k: '细节理解', kp: '信息获取', t: '环境保护', an: '使用电动公交。' }),
        read({ pb: c, s: '6. Why do old people like them?', o: ['They are cheap', 'Easy to get on', 'They are fast', 'They are new'], a: 'Easy to get on', k: '细节理解', kp: '信息获取', t: '环境保护', an: '老人觉得好上车。' }),
        read({ pb: a + ' ' + b, s: '7. What do the no-homework and traditional-craft passages show?', o: ['School is hard', 'Balance and tradition matter', 'Money is key', 'Cities are noisy'], a: 'Balance and tradition matter', k: '主旨大意', kp: '中心思想', t: '社会发展', an: '两篇强调平衡与传统价值。' }),
        read({ pb: b, s: '8. What is the best title for the traditional-craft passage?', o: ['City Bus', 'Youth and Traditional Crafts', 'How to Sell', 'New Markets'], a: 'Youth and Traditional Crafts', k: '主旨大意', kp: '中心思想', t: '传统文化', an: '全文关于青年学传统手工艺。' }),
        read({ pb: c, s: '9. What will the town do in three years?', o: ['Close buses', 'All buses electric', 'Buy cars', 'Stop service'], a: 'All buses electric', k: '细节理解', kp: '信息获取', t: '环境保护', an: '三年内设全部电动公交。' }),
        read({ pb: a, s: '10. What is the key to growth according to the school?', o: ['Balance', 'Homework', 'Exams', 'Money'], a: 'Balance', k: '细节理解', kp: '信息获取', t: '校园生活', an: '学校说平衡是成长关键。' }),
      ];
    })()},
    { type: '句子翻译', prompt: '将下列句子译成汉语。', qs: [
      trans({ s: 'Small hands can do big things.', a: '小手能做大事。', k: '中译英句型', kp: '对比句', t: '志愿服务', an: '对比句直译。' }),
      trans({ s: 'Balance is the key to growth.', a: '平衡是成长的关键。', k: '中译英句型', kp: 'the key to', t: '校园生活', an: 'the key to ……的关键。' }),
      trans({ s: 'Craft connects me to our culture.', a: '手工艺把我与我们的文化联系在一起。', k: '中译英句型', kp: 'connect to', t: '传统文化', an: 'connect to 与……联系。' }),
      trans({ s: 'The earth is our only home.', a: '地球是我们唯一的家园。', k: '中译英句型', kp: 'only home', t: '环境保护', an: '唯一家园。' }),
    ]},
    { type: '书面表达', prompt: '根据提示写一篇短文。', qs: [
      writing({ s: '请以“My School Life”为题写一篇 80 词左右的短文，描述你在职业学校的学习生活、喜欢的课程或活动，以及你的收获与展望。', kp: '话题作文', t: '校园生活', a: 'My School Life\nI study at a vocational school. My school life is busy but happy. I like the workshop classes best because I can learn real skills. After class, I join the reading club and the basketball team. These activities make me confident and healthy. I have made many good friends. I believe the skills I learn will help me find a good job. I will keep working hard for a better future.', an: '要点：学习生活、课程/活动、收获展望；词数达标。' }),
    ]},
  ],
};

export const newPapers = [p1, p2, p3, p4, p5, p6, p7];
