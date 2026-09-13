import { randomUUID } from 'node:crypto';

// 江苏省职教高考（对口单招）英语 · 专项训练种子数据
// 题型：单项选择 / 完形填空 / 阅读理解 / 补全对话 / 句子翻译 / 书面表达
// 五维标签：questionType 题型 / knowledge 知识点 / topic 语篇话题 / skill 能力技能 / difficulty 难度

const uid = () => randomUUID();

function q(o) {
  return {
    id: uid(),
    questionType: o.questionType,
    stem: o.stem,
    options: o.options || null,
    answer: o.answer,
    analysis: o.analysis || '',
    knowledgePoint: o.knowledgePoint || '',
    knowledge: o.knowledge || '',
    topic: o.topic || '',
    skill: o.skill || '',
    difficulty: o.difficulty || '中',
    passageBody: o.passageBody || '',
  };
}

// ---------------- 题库（专项训练用，扁平结构） ----------------
const questions = [
  // 单项选择
  q({ questionType: '单项选择', knowledge: '时态语态', knowledgePoint: '现在完成时', topic: '校园生活', skill: '语法运用', difficulty: '易',
    stem: 'He ______ in this school since 2020.', options: ['studied', 'has studied', 'studies', 'was studying'], answer: 'has studied',
    analysis: 'since 2020 表示动作从过去持续到现在，用现在完成时 has studied。' }),
  q({ questionType: '单项选择', knowledge: '定语从句', knowledgePoint: '关系代词 that/which', topic: '人际交往', skill: '语法运用', difficulty: '中',
    stem: 'The book ______ you lent me is very interesting.', options: ['who', 'whom', 'which', 'what'], answer: 'which',
    analysis: '先行词 book 指物，在定语从句中作 lent 的宾语，用 which 或 that。' }),
  q({ questionType: '单项选择', knowledge: '非谓语动词', knowledgePoint: '动名词作主语', topic: '职业规划', skill: '语法运用', difficulty: '中',
    stem: '______ English well is important for your future job.', options: ['Learn', 'Learning', 'Learned', 'To learning'], answer: 'Learning',
    analysis: '动名词 Learning 作主语，表示一般性的动作。' }),
  q({ questionType: '单项选择', knowledge: '词义辨析', knowledgePoint: 'affect / effect', topic: '环境保护', skill: '词汇运用', difficulty: '中',
    stem: 'Smoking can ______ your health seriously.', options: ['affect', 'effect', 'effort', 'offer'], answer: 'affect',
    analysis: 'affect 是动词“影响”；effect 多作名词“效果”。' }),
  q({ questionType: '单项选择', knowledge: '固定搭配', knowledgePoint: 'be fond of', topic: '人际交往', skill: '词汇运用', difficulty: '易',
    stem: 'My little sister is fond ______ drawing pictures.', options: ['at', 'of', 'in', 'on'], answer: 'of',
    analysis: 'be fond of 是固定搭配，意为“喜欢”。' }),
  q({ questionType: '单项选择', knowledge: '交际用语', knowledgePoint: '请求与应答', topic: '校园生活', skill: '交际运用', difficulty: '易',
    stem: '— Could you help me carry the box? — ______', options: ['Never mind.', 'With pleasure.', 'You are welcome.', 'That’s right.'], answer: 'With pleasure.',
    analysis: '请求帮助，回答 With pleasure. 表示乐意效劳。' }),
  q({ questionType: '单项选择', knowledge: '虚拟语气', knowledgePoint: 'if 条件句', topic: '职业规划', skill: '语法运用', difficulty: '难',
    stem: 'If I ______ you, I would take the job in the city.', options: ['am', 'was', 'were', 'be'], answer: 'were',
    analysis: '与现在事实相反的虚拟语气，be 动词一律用 were。' }),
  q({ questionType: '单项选择', knowledge: '词义辨析', knowledgePoint: 'raise / rise', topic: '社会生活', skill: '词汇运用', difficulty: '中',
    stem: 'The sun ______ in the east and sets in the west.', options: ['raises', 'rises', 'lifts', 'arises'], answer: 'rises',
    analysis: 'rise 是不及物动词“升起”；raise 是及物动词“举起/饲养”。' }),

  // 完形填空（共享语篇）
  ...(() => {
    const pb = 'Once upon a time, a young man wanted to learn a skill. He went to a teacher and said, "I want to be the best worker." The teacher smiled and gave him a small task every day. At first the task was __1__, but later it became harder. The young man never __2__. After one year, he became excellent.';
    return [
      q({ questionType: '完形填空', knowledge: '词汇辨析', knowledgePoint: '形容词辨析', topic: '职业发展', skill: '语篇理解', difficulty: '中', passageBody: pb,
        stem: '1. At first the task was ______.', options: ['easy', 'easier', 'hard', 'hardest'], answer: 'easy', analysis: '由 but later harder 可知起初是容易的。' }),
      q({ questionType: '完形填空', knowledge: '动词辨析', knowledgePoint: 'gave up / gave in', topic: '职业发展', skill: '语篇理解', difficulty: '中', passageBody: pb,
        stem: '2. The young man never ______.', options: ['gave up', 'gave in', 'gave out', 'gave away'], answer: 'gave up', analysis: 'never gave up 意为“从不放弃”，符合语境。' }),
    ];
  })(),

  // 阅读理解（共享语篇）
  ...(() => {
    const pb = 'Smartphones have changed our lives. We can study online, shop, and talk with friends far away. But many students spend too much time on games. A survey shows that students who use phones for over 3 hours a day get lower grades. Experts suggest making a daily plan and turning off phones while studying.';
    return [
      q({ questionType: '阅读理解', knowledge: '细节理解', knowledgePoint: '信息获取', topic: '科技发展', skill: '信息获取', difficulty: '易', passageBody: pb,
        stem: '1. What has changed our lives according to the passage?', options: ['Cars', 'Smartphones', 'Books', 'TVs'], answer: 'Smartphones', analysis: '首句点明 Smartphones have changed our lives。' }),
      q({ questionType: '阅读理解', knowledge: '推理判断', knowledgePoint: '推断题', topic: '科技发展', skill: '推理判断', difficulty: '中', passageBody: pb,
        stem: '2. What do experts suggest?', options: ['Use phones all day', 'Make a daily plan', 'Play more games', 'Stop studying'], answer: 'Make a daily plan', analysis: '末句建议制定每日计划并在学习时关机。' }),
      q({ questionType: '阅读理解', knowledge: '主旨大意', knowledgePoint: '中心思想', topic: '科技发展', skill: '推理判断', difficulty: '中', passageBody: pb,
        stem: '3. What is the best title?', options: ['How to Buy a Phone', 'Phones and Students', 'Online Shopping', 'TV Programs'], answer: 'Phones and Students', analysis: '全文围绕手机对学生的影响展开。' }),
    ];
  })(),

  // 补全对话
  q({ questionType: '补全对话', knowledge: '日常交际', knowledgePoint: '购物场景', topic: '社会生活', skill: '交际运用', difficulty: '易',
    stem: 'A: Can I help you?  B: ______  A: What color do you like?', options: ['Yes, I’d like a T-shirt.', 'No, I can’t.', 'I am fine.', 'How much is it?'], answer: 'Yes, I’d like a T-shirt.',
    analysis: '购物场景，店员询问 Can I help you? 顾客应表达购买意图。' }),
  q({ questionType: '补全对话', knowledge: '日常交际', knowledgePoint: '就医场景', topic: '校园生活', skill: '交际运用', difficulty: '中',
    stem: 'A: What’s the matter?  B: ______  A: You should see a doctor.', options: ['I have a headache.', 'I am a student.', 'It’s sunny.', 'I like apples.'], answer: 'I have a headache.',
    analysis: '询问病情，回答应是身体不适症状。' }),
  q({ questionType: '补全对话', knowledge: '日常交际', knowledgePoint: '问路场景', topic: '社会生活', skill: '交际运用', difficulty: '易',
    stem: 'A: Excuse me, where is the library?  B: ______', options: ['It’s next to the hospital.', 'I am busy.', 'Thank you.', 'See you.'], answer: 'It’s next to the hospital.',
    analysis: '问路应给出方位信息。' }),

  // 句子翻译（开放作答，answer 为参考答案）
  q({ questionType: '句子翻译', knowledge: '中译英句型', knowledgePoint: 'It is + adj. + to do', topic: '校园生活', skill: '书面表达', difficulty: '中',
    stem: '学好英语对我们很重要。', options: null, answer: 'It is important for us to learn English well.',
    analysis: '句型 It is + adj. + for sb. + to do sth.；important 重要的。' }),
  q({ questionType: '句子翻译', knowledge: '中译英句型', knowledgePoint: 'not only...but also', topic: '环境保护', skill: '书面表达', difficulty: '难',
    stem: '我们不仅要保护环境，还要节约能源。', options: null,
    answer: 'We should not only protect the environment, but also save energy.',
    analysis: 'not only...but also... 连接并列成分；save energy 节约能源。' }),
  q({ questionType: '句子翻译', knowledge: '中译英句型', knowledgePoint: 'there be 句型', topic: '职业规划', skill: '书面表达', difficulty: '中',
    stem: '我们学校有很多职业学校。', options: null, answer: 'There are many vocational schools in our city.',
    analysis: 'there be 表示“存在有”；vocational schools 职业学校。' }),

  // 书面表达（开放作答，analysis 为范文要点）
  q({ questionType: '书面表达', knowledge: '应用文写作', knowledgePoint: '自我介绍', topic: '人际交往', skill: '书面表达', difficulty: '中',
    stem: '假如你是李华，写一篇 60 词左右的英文自我介绍，包含姓名、年龄、爱好与未来职业理想。', options: null,
    answer: 'My name is Li Hua. I am 17 years old. I like reading and playing basketball. I study at a vocational school. My dream is to be a skilled worker. I will work hard to make my dream come true.',
    analysis: '要点：姓名年龄、爱好、学校、职业理想；用简单句，注意时态一致。' }),
  q({ questionType: '书面表达', knowledge: '应用文写作', knowledgePoint: '邀请信', topic: '校园生活', skill: '书面表达', difficulty: '难',
    stem: '你们班将举办英语晚会，写一封英文邀请信给你的外教 Mr. Smith，邀请他参加。60 词左右。', options: null,
    answer: 'Dear Mr. Smith, I am writing to invite you to our English Evening. It will be held in the school hall at 7:00 p.m. next Friday. There will be songs, games and short plays. We would be happy if you can join us. Looking forward to your reply.',
    analysis: '要点：邀请目的、时间地点、活动内容、期待回复；注意书信格式。' }),
];

// ---------------- 真题与模拟卷（整卷模考，自包含） ----------------
const papers = [
  {
    id: uid(), title: '2024年江苏省对口单招英语模拟卷（一）', year: '2024', kind: '模拟', duration: 120,
    sections: [
      { type: '单项选择', prompt: '从 A、B、C、D 四个选项中选出最佳答案。', qs: [
        { id: uid(), questionType: '单项选择', stem: 'We ______ a meeting every Monday morning.', options: ['have', 'has', 'having', 'to have'], answer: 'have', analysis: 'every Monday 用一般现在时，主语 we 用 have。', knowledge: '时态语态', knowledgePoint: '一般现在时', topic: '校园生活', skill: '语法运用', difficulty: '易' },
        { id: uid(), questionType: '单项选择', stem: 'The girl ______ is singing is my classmate.', options: ['which', 'who', 'what', 'where'], answer: 'who', analysis: '先行词 girl 指人，在从句中作主语，用 who。', knowledge: '定语从句', knowledgePoint: '关系代词 who', topic: '人际交往', skill: '语法运用', difficulty: '中' },
        { id: uid(), questionType: '单项选择', stem: 'It’s very kind ______ you to help me.', options: ['for', 'of', 'to', 'with'], answer: 'of', analysis: 'It is + adj. + of sb. + to do，形容词 kind 描述人的品质，用 of。', knowledge: '固定搭配', knowledgePoint: 'It is + of + sb.', topic: '人际交往', skill: '语法运用', difficulty: '中' },
        { id: uid(), questionType: '单项选择', stem: 'Please ______ the lights when you leave the room.', options: ['turn off', 'turn on', 'turn up', 'turn down'], answer: 'turn off', analysis: '离开房间应“关灯”，turn off 关闭。', knowledge: '短语动词', knowledgePoint: 'turn 短语', topic: '校园生活', skill: '词汇运用', difficulty: '易' },
      ]},
      { type: '阅读理解', prompt: '阅读下面短文，回答问题。', qs: (() => {
        const pb = 'Tom is a student from a vocational school. He loves computers and spends his free time learning to code. Last month, he won first prize in a city skills competition. He says, "Skills change my life."';
        return [
          { id: uid(), questionType: '阅读理解', passageBody: pb, stem: '1. What does Tom love?', options: ['Sports', 'Computers', 'Music', 'Cooking'], answer: 'Computers', analysis: '文中 He loves computers。', knowledge: '细节理解', knowledgePoint: '信息获取', topic: '职业发展', skill: '信息获取', difficulty: '易' },
          { id: uid(), questionType: '阅读理解', passageBody: pb, stem: '2. What did Tom win?', options: ['A trip', 'First prize', 'A book', 'A phone'], answer: 'First prize', analysis: 'won first prize in a city skills competition。', knowledge: '细节理解', knowledgePoint: '信息获取', topic: '职业发展', skill: '信息获取', difficulty: '易' },
        ];
      })()},
      { type: '句子翻译', prompt: '将下列句子译成英语。', qs: [
        { id: uid(), questionType: '句子翻译', stem: '熟能生巧。', options: null, answer: 'Practice makes perfect.', analysis: '固定谚语 Practice makes perfect.。', knowledge: '中译英句型', knowledgePoint: '谚语翻译', topic: '社会生活', skill: '书面表达', difficulty: '中' },
      ]},
      { type: '书面表达', prompt: '根据提示写一篇短文。', qs: [
        { id: uid(), questionType: '书面表达', stem: '以“My Favorite Job”为题写一篇 60 词左右的短文，说明你最喜欢的职业及原因。', options: null,
          answer: 'My Favorite Job\nMy favorite job is to be a computer engineer. I like working with computers and solving problems. It is both interesting and useful. In the future, I want to build software that helps people. I will study hard to achieve my goal.',
          analysis: '要点：职业名称、原因、未来打算；注意段落与时态。', knowledge: '应用文写作', knowledgePoint: '话题作文', topic: '职业规划', skill: '书面表达', difficulty: '中' },
      ]},
    ],
  },
  {
    id: uid(), title: '2023年江苏省对口单招英语真题（节选）', year: '2023', kind: '真题', duration: 120,
    sections: [
      { type: '单项选择', prompt: '从 A、B、C、D 四个选项中选出最佳答案。', qs: [
        { id: uid(), questionType: '单项选择', stem: 'By the time we arrived, the train ______.', options: ['left', 'has left', 'had left', 'leaves'], answer: 'had left', analysis: 'by the time + 过去时，主句用过去完成时 had left。', knowledge: '时态语态', knowledgePoint: '过去完成时', topic: '社会生活', skill: '语法运用', difficulty: '难' },
        { id: uid(), questionType: '单项选择', stem: 'She asked me ______ I liked the book.', options: ['that', 'if', 'what', 'which'], answer: 'if', analysis: '间接疑问句用 if/whether 引导。', knowledge: '名词性从句', knowledgePoint: '宾语从句', topic: '校园生活', skill: '语法运用', difficulty: '中' },
        { id: uid(), questionType: '单项选择', stem: 'This is the ______ movie I have ever seen.', options: ['good', 'better', 'best', 'well'], answer: 'best', analysis: 'ever 提示用最高级 best。', knowledge: '形容词比较等级', knowledgePoint: '最高级', topic: '科技发展', skill: '语法运用', difficulty: '易' },
      ]},
      { type: '补全对话', prompt: '从选项中选出合适的句子补全对话。', qs: [
        { id: uid(), questionType: '补全对话', stem: 'A: How was your weekend?  B: ______  A: That sounds great!', options: ['It was wonderful.', 'I am tired.', 'I don’t know.', 'See you.'], answer: 'It was wonderful.', analysis: '问周末过得如何，应回答感受。', knowledge: '日常交际', knowledgePoint: '谈论周末', topic: '校园生活', skill: '交际运用', difficulty: '易' },
      ]},
    ],
  },
];

// ---------------- 词汇 / 语法积累 ----------------
const vocab = [
  { id: uid(), word: 'achieve', phonetic: '/əˈtʃiːv/', pos: 'v.', meaning: '实现；达到', example: 'He achieved his dream at last.', category: '词汇', note: '常接 goal/dream', tags: ['高频动词'] },
  { id: uid(), word: 'benefit', phonetic: '/ˈbenɪfɪt/', pos: 'n./v.', meaning: '益处；有益于', example: 'Reading benefits us a lot.', category: '词汇', note: 'beneficial 形容词', tags: ['高频名词'] },
  { id: uid(), word: 'environment', phonetic: '/ɪnˈvaɪrənmənt/', pos: 'n.', meaning: '环境', example: 'We must protect the environment.', category: '词汇', note: '', tags: ['环保主题'] },
  { id: uid(), word: 'opportunity', phonetic: '/ˌɒpəˈtjuːnəti/', pos: 'n.', meaning: '机会', example: 'It is a good opportunity to learn.', category: '词汇', note: '同 chance', tags: ['高频名词'] },
  { id: uid(), word: 'responsibility', phonetic: '/rɪˌspɒnsəˈbɪləti/', pos: 'n.', meaning: '责任', example: 'We have a responsibility to study.', category: '词汇', note: 'responsible 形容词', tags: ['品质类'] },
  { id: uid(), word: 'communicate', phonetic: '/kəˈmjuːnɪkeɪt/', pos: 'v.', meaning: '交流；沟通', example: 'We communicate by email.', category: '词汇', note: 'communication 名词', tags: ['交际类'] },
  { id: uid(), word: 'present', phonetic: '/ˈpreznt/', pos: 'adj./n.', meaning: '现在的；礼物', example: 'He gave me a present.', category: '词汇', note: '易混词：parent 父母', tags: ['易混词'] },
  { id: uid(), word: 'affect', phonetic: '/əˈfekt/', pos: 'v.', meaning: '影响', example: 'Weather affects our mood.', category: '词汇', note: '区别 effect（n.效果）', tags: ['易混词'] },
  { id: uid(), word: '定语从句', phonetic: '', pos: '语法', meaning: '修饰名词的从句，由关系代词/副词引导', example: 'The man who helped me is a teacher.', category: '语法', note: 'who/which/that/whom/whose', tags: ['句法'] },
  { id: uid(), word: '现在完成时', phonetic: '', pos: '语法', meaning: 'have/has + 过去分词，强调过去动作对现在的影响', example: 'I have finished my homework.', category: '语法', note: '常与 since/for 连用', tags: ['时态'] },
  { id: uid(), word: '非谓语动词', phonetic: '', pos: '语法', meaning: '不定式/动名词/分词作除谓语外的成分', example: 'To learn is important.', category: '语法', note: '不作谓语', tags: ['句法'] },
  { id: uid(), word: '虚拟语气', phonetic: '', pos: '语法', meaning: '表示假设、愿望等非真实情况', example: 'If I were you, I would go.', category: '语法', note: 'be 动词用 were', tags: ['时态'] },
  { id: uid(), word: 'it is + of/for', phonetic: '', pos: '语法', meaning: 'It is + adj. + of/for sb. + to do 结构', example: 'It is kind of you to help.', category: '语法', note: '描述人品质用 of', tags: ['句型'] },
  { id: uid(), word: 'there be', phonetic: '', pos: '语法', meaning: '表示“某处有某物”', example: 'There is a book on the desk.', category: '语法', note: '就近原则', tags: ['句型'] },
  { id: uid(), word: 'not only...but also', phonetic: '', pos: '语法', meaning: '不但……而且……，连接并列成分', example: 'He can not only sing but also dance.', category: '语法', note: '就近原则', tags: ['句型'] },
  { id: uid(), word: '固定搭配', phonetic: '', pos: '语法', meaning: 'be fond of / be good at / look forward to 等', example: 'I am good at swimming.', category: '语法', note: 'to 为介词时接动名词', tags: ['搭配'] },
];

// ---------------- 学生与成绩 ----------------
const students = [
  { id: uid(), name: '王磊', class: '23机电1班', sid: '20230101', note: '' },
  { id: uid(), name: '陈静', class: '23电商1班', sid: '20230102', note: '' },
  { id: uid(), name: '刘洋', class: '23计算机2班', sid: '20230103', note: '' },
  { id: uid(), name: '赵敏', class: '23护理1班', sid: '20230104', note: '' },
];

const scores = [
  { id: uid(), studentId: students[0].id, studentName: '王磊', exam: '第一次月考', date: '2026-03-10', vocabGrammar: 22, cloze: 18, reading: 26, dialogue: 10, translate: 12, writing: 14, total: 102 },
  { id: uid(), studentId: students[0].id, studentName: '王磊', exam: '期中考试', date: '2026-05-12', vocabGrammar: 25, cloze: 20, reading: 28, dialogue: 9, translate: 13, writing: 15, total: 110 },
  { id: uid(), studentId: students[1].id, studentName: '陈静', exam: '第一次月考', date: '2026-03-10', vocabGrammar: 20, cloze: 15, reading: 24, dialogue: 8, translate: 10, writing: 12, total: 89 },
  { id: uid(), studentId: students[1].id, studentName: '陈静', exam: '期中考试', date: '2026-05-12', vocabGrammar: 24, cloze: 19, reading: 27, dialogue: 10, translate: 13, writing: 14, total: 107 },
  { id: uid(), studentId: students[2].id, studentName: '刘洋', exam: '第一次月考', date: '2026-03-10', vocabGrammar: 18, cloze: 14, reading: 22, dialogue: 7, translate: 9, writing: 11, total: 81 },
  { id: uid(), studentId: students[2].id, studentName: '刘洋', exam: '期中考试', date: '2026-05-12', vocabGrammar: 23, cloze: 18, reading: 26, dialogue: 9, translate: 12, writing: 13, total: 101 },
  { id: uid(), studentId: students[3].id, studentName: '赵敏', exam: '第一次月考', date: '2026-03-10', vocabGrammar: 21, cloze: 17, reading: 25, dialogue: 9, translate: 11, writing: 13, total: 96 },
  { id: uid(), studentId: students[3].id, studentName: '赵敏', exam: '期中考试', date: '2026-05-12', vocabGrammar: 26, cloze: 20, reading: 29, dialogue: 10, translate: 14, writing: 16, total: 115 },
];

// ---------------- 账号（默认教师/管理员） ----------------
const users = [
  { id: uid(), username: 'teacher', passwordHash: (() => { let h = 0; const pw = '123456'; for (let i = 0; i < pw.length; i++) h = (h * 31 + pw.charCodeAt(i)) >>> 0; return 'h' + h; })(), role: 'admin', profile: { grade: '职教高考', target: 120, weak: [], goals: ['专项突破'] } },
];

export async function seedIfEmpty(store) {
  const { data: existing } = await store.get('users');
  if (Array.isArray(existing) && existing.length > 0) {
    console.log('[种子] 已存在数据，跳过初始化');
    return;
  }
  await store.set('users', users);
  await store.set('papers', papers);
  await store.set('questions', questions);
  await store.set('vocab', vocab);
  await store.set('students', students);
  await store.set('scores', scores);
  await store.set('sessions', []);
  console.log('[种子] 已写入初始数据：', {
    users: users.length, papers: papers.length, questions: questions.length,
    vocab: vocab.length, students: students.length, scores: scores.length,
  });
}
