// 第八～十套模拟卷（真题风格仿真，原创命制，非官方泄露原题）
// 规则：与线上已有题库（questions）及保留试卷的全部题干互不重复。
import { randomUUID } from 'node:crypto';

const uid = () => randomUUID();
const SRC = 'jszz-expand-v2';

const base = (o) => ({
  id: uid(),
  src: SRC,
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

// ============================ 第八套 ============================
const pa = {
  id: uid(), title: '真题仿真模拟卷（八）', year: '2025', kind: '模拟', duration: 120,
  sections: [
    { type: '单项选择', prompt: '从 A、B、C、D 四个选项中选出最佳答案。', qs: [
      mcq({ s: 'Not only Tom but also his friends ______ fond of pop music.', o: ['is', 'are', 'was', 'be'], a: 'are', k: '主谓一致', kp: 'not only ... but also 就近原则', t: '校园生活', an: '就近原则，靠近谓语的是 friends（复数），用 are。' }),
      mcq({ s: 'The number of the students in our school ______ over 3,000.', o: ['are', 'is', 'have', 'has'], a: 'is', k: '主谓一致', kp: 'the number of', t: '校园生活', an: 'the number of 作主语，谓语用单数 is。' }),
      mcq({ s: 'I am looking forward to ______ from you soon.', o: ['hear', 'heard', 'hearing', 'hears'], a: 'hearing', k: '非谓语动词', kp: 'look forward to doing', t: '人际交往', an: 'look forward to 中 to 是介词，后接动名词 hearing。' }),
      mcq({ s: 'It ______ me two hours to finish the report yesterday.', o: ['takes', 'took', 'has taken', 'will take'], a: 'took', k: '时态语态', kp: '一般过去时', t: '校园生活', an: 'yesterday 用一般过去时 took。' }),
      mcq({ s: 'The reason ______ he was absent yesterday was that he was ill.', o: ['which', 'why', 'when', 'what'], a: 'why', k: '定语从句', kp: '关系副词 why', t: '校园生活', an: '先行词为 reason，从句缺原因状语，用 why。' }),
      mcq({ s: 'I will give the message to him as soon as he ______ back.', o: ['come', 'came', 'comes', 'will come'], a: 'comes', k: '状语从句', kp: '主将从现', t: '人际交往', an: 'as soon as 引导时间状语从句，主句将来时则从句用一般现在时。' }),
      mcq({ s: 'She used to ______ up late, but now she is used to ______ up early.', o: ['get; get', 'getting; getting', 'get; getting', 'getting; get'], a: 'get; getting', k: '固定搭配', kp: 'used to do / be used to doing', t: '生活习惯', an: 'used to do 过去常常；be used to doing 习惯于。' }),
      mcq({ s: 'Great changes ______ place in my hometown since 2015.', o: ['take', 'took', 'have taken', 'will take'], a: 'have taken', k: '时态语态', kp: '现在完成时', t: '社会发展', an: 'since 2015 用现在完成时，take place 无被动。' }),
      mcq({ s: 'You had better ______ your hands before each meal.', o: ['wash', 'to wash', 'washing', 'washed'], a: 'wash', k: '情态动词', kp: 'had better do', t: '健康生活', an: 'had better 后接动词原形 wash。' }),
      mcq({ s: 'The classroom ______ by the students on duty every afternoon.', o: ['cleans', 'cleaned', 'is cleaned', 'has cleaned'], a: 'is cleaned', k: '时态语态', kp: '一般现在时被动', t: '校园生活', an: '教室被打扫，every afternoon 用一般现在时被动。' }),
      mcq({ s: '______ interesting the science museum is!', o: ['What', 'What an', 'How', 'How an'], a: 'How', k: '特殊句式', kp: '感叹句 How + 形容词', t: '科技发展', an: 'How 修饰形容词 interesting。' }),
      mcq({ s: 'My bike is broken. It needs ______.', o: ['repair', 'to repair', 'repairing', 'repaired'], a: 'repairing', k: '非谓语动词', kp: 'need doing', t: '校园生活', an: 'need doing 含被动意义，相当于 need to be repaired。' }),
    ]},
    { type: '完形填空', prompt: '阅读下面短文，掌握大意，从每题所给 A、B、C、D 四个选项中选最佳答案。', qs: (() => {
      const pb = 'Wang Fang is a student at a vocational school. Last month she took part in a school skill __1__. She chose cooking because she __2__ making food for others. At first she was so __3__ that her hands shook. Her teacher told her, “Take it __4__ and trust your hands.” She practised two hours every day after __5__. Sometimes she __6__ and wanted to give up, but her classmates __7__ her. On the day of the contest she cooked a dish of __8__ eggs with tomatoes. The judges said it looked __9__ and tasted wonderful. She won the second prize. From this experience she learned that hard work always __10__.';
      return [
        cloze({ pb, s: '1. Last month she took part in a school skill ______.', o: ['meeting', 'contest', 'party', 'club'], a: 'contest', an: '参加学校技能大赛，用 contest。' }),
        cloze({ pb, s: '2. She chose cooking because she ______ making food for others.', o: ['minds', 'enjoys', 'forgets', 'avoids'], a: 'enjoys', an: '喜欢为别人做饭，用 enjoys。' }),
        cloze({ pb, s: '3. At first she was so ______ that her hands shook.', o: ['nervous', 'happy', 'angry', 'tired'], a: 'nervous', an: '手发抖说明紧张，用 nervous。' }),
        cloze({ pb, s: '4. Her teacher told her, “Take it ______ and trust your hands.”', o: ['easy', 'hard', 'slowly', 'quickly'], a: 'easy', an: 'take it easy 意为“别紧张”。' }),
        cloze({ pb, s: '5. She practised two hours every day after ______.', o: ['school', 'breakfast', 'home', 'bed'], a: 'school', an: '放学后练习，after school。' }),
        cloze({ pb, s: '6. Sometimes she ______ and wanted to give up.', o: ['won', 'failed', 'slept', 'laughed'], a: 'failed', an: '想放弃说明失败过，用 failed。' }),
        cloze({ pb, s: '7. Her classmates ______ her.', o: ['laughed at', 'cheered up', 'looked for', 'waited for'], a: 'cheered up', an: '同学使她振作，cheer up。' }),
        cloze({ pb, s: '8. She cooked a dish of ______ eggs with tomatoes.', o: ['boiled', 'fried', 'salted', 'dried'], a: 'fried', an: '西红柿炒鸡蛋用 fried。' }),
        cloze({ pb, s: '9. The judges said it looked ______ and tasted wonderful.', o: ['nice', 'bad', 'cold', 'empty'], a: 'nice', an: '色香味俱全，用 nice。' }),
        cloze({ pb, s: '10. From this experience she learned that hard work always ______.', o: ['pays off', 'puts off', 'takes off', 'gives off'], a: 'pays off', an: 'pay off 有回报，努力终有回报。' }),
      ];
    })()},
    { type: '补全对话', prompt: '根据对话内容，从所给选项中选出能填入空白处的最佳答案。', qs: [
      dialog({ s: 'A: Do you have any plans for the summer holiday?  B: ______', o: ['Yes, I plan to visit Beijing.', 'No, I don’t.', 'It is Monday.', 'I was busy.'], a: 'Yes, I plan to visit Beijing.', k: '情景交际', kp: '计划与安排', t: '假期生活', an: '询问假期计划，回答具体安排。' }),
      dialog({ s: 'A: I’d like to book a table for two this evening.  B: ______', o: ['Certainly. What time, please?', 'Here is the menu.', 'You are welcome.', 'Never mind.'], a: 'Certainly. What time, please?', k: '情景交际', kp: '预订与应答', t: '社会生活', an: '顾客订座，服务员应答应询问时间。' }),
      dialog({ s: 'A: You look worried. What’s up?  B: ______', o: ['I lost my phone this morning.', 'I like apples.', 'It is fine today.', 'See you later.'], a: 'I lost my phone this morning.', k: '情景交际', kp: '关心与回应', t: '校园生活', an: '对方表示担忧，应说明原因。' }),
      dialog({ s: 'A: How often do you practise spoken English?  B: ______', o: ['Every morning.', 'Two kilometers.', 'In the library.', 'With my brother.'], a: 'Every morning.', k: '情景交际', kp: '频率应答', t: '学习态度', an: 'how often 问频率，回答应为频度。' }),
    ]},
    { type: '阅读理解', prompt: '阅读下列短文，从每题所给 A、B、C、D 四个选项中选最佳答案。', qs: (() => {
      const a = 'Our school will hold the fifth Skill Contest on 15 May. Students from six departments can take part in it. The events include cooking, hairdressing, welding, computer repair and cake making. Each student may choose only one event. The judges are teachers and workers from local companies. Winners will represent our school in the city competition next month. Students who want to join should sign up before 1 May.';
      const b = 'In some mountain towns, drones are used to deliver medicine and small packages. A drone can fly over rivers and hills, so it reaches villages much faster than a car. One trip usually takes about fifteen minutes. Workers say each drone can finish around forty trips a day. However, drones cannot fly in heavy rain or strong wind, because it is not safe. Still, many people think this new way of sending things saves a lot of time.';
      return [
        read({ pb: a, s: '1. When will the school Skill Contest be held?', o: ['On 1 May', 'On 15 May', 'Next month', 'Next week'], a: 'On 15 May', k: '细节理解', kp: '信息获取', t: '校园生活', an: '通知写明 5 月 15 日举行。' }),
        read({ pb: a, s: '2. How many departments can take part in the contest?', o: ['Four', 'Five', 'Six', 'Seven'], a: 'Six', k: '细节理解', kp: '信息获取', t: '校园生活', an: '短文提到 six departments。' }),
        read({ pb: a, s: '3. Which of the following is NOT mentioned as an event?', o: ['Welding', 'Cake making', 'Car driving', 'Computer repair'], a: 'Car driving', k: '细节理解', kp: '信息排除', t: '校园生活', an: '四个项目中未提到赛车驾驶。' }),
        read({ pb: a, s: '4. What should a student do before 1 May to join?', o: ['Pay the fee', 'Sign up', 'Buy tools', 'Find a judge'], a: 'Sign up', k: '细节理解', kp: '信息获取', t: '校园生活', an: '应在 5 月 1 日前报名。' }),
        read({ pb: b, s: '5. What do drones deliver in the mountain towns?', o: ['Medicine and small packages', 'Cars and buses', 'Books and newspapers', 'Rice and fruit'], a: 'Medicine and small packages', k: '细节理解', kp: '信息获取', t: '科技发展', an: '短文首句说明运送药品与小包裹。' }),
        read({ pb: b, s: '6. How long does one drone trip usually take?', o: ['About 5 minutes', 'About 15 minutes', 'About 40 minutes', 'About 2 hours'], a: 'About 15 minutes', k: '细节理解', kp: '信息获取', t: '科技发展', an: '一次飞行约 15 分钟。' }),
        read({ pb: b, s: '7. Why can drones not fly in heavy rain?', o: ['It is not safe.', 'It is too cheap.', 'It is too noisy.', 'It is too cold.'], a: 'It is not safe.', k: '细节理解', kp: '因果判断', t: '科技发展', an: '大雨中飞行不安全。' }),
        read({ pb: b, s: '8. What is the best title for the drone-delivery passage?', o: ['Drones Send Things Fast', 'How to Make a Plane', 'Life in Big Cities', 'Rain and Wind'], a: 'Drones Send Things Fast', k: '主旨大意', kp: '中心思想', t: '科技发展', an: '全文讲无人机快速送货。' }),
        read({ pb: a + ' ' + b, s: '9. What do the skill contest and the drone service both bring?', o: ['More chances and better service', 'Higher prices', 'Longer holidays', 'Bigger schools'], a: 'More chances and better service', k: '推理判断', kp: '比较归纳', t: '社会发展', an: '技能赛提供机会，无人机提供便利服务。' }),
        read({ pb: a + ' ' + b, s: '10. What can we learn from the two passages?', o: ['New skills and new tools improve life', 'Machines will replace all workers', 'Contests are not useful', 'Mountains are dangerous'], a: 'New skills and new tools improve life', k: '推理判断', kp: '主旨归纳', t: '社会发展', an: '新技能与新工具共同改善生活。' }),
      ];
    })()},
    { type: '句子翻译', prompt: '把下列句子译成中文或英文。', qs: [
      trans({ s: 'All roads lead to Rome.', a: '条条大路通罗马。', k: '英译汉', kp: '谚语', t: '学习态度', an: '常见英语谚语。' }),
      trans({ s: 'Failure is the mother of success.', a: '失败是成功之母。', k: '英译汉', kp: '谚语', t: '学习态度', an: '常见英语谚语。' }),
      trans({ s: '我们应该积极参加社会实践活动。', a: 'We should take an active part in social practice activities.', k: '汉译英', kp: 'take an active part in', t: '校园生活', an: '积极参加用 take an active part in。' }),
      trans({ s: '掌握一门技能对找工作很有帮助。', a: 'Mastering a skill is very helpful in finding a job.', k: '汉译英', kp: '动名词作主语', t: '职业规划', an: '动名词短语作主语，谓语用单数。' }),
    ]},
    { type: '书面表达', prompt: '根据提示完成短文写作。', qs: [
      writing({ s: '现在很多人喜欢观看短视频。请以“My Views on Short Videos”为题写一篇 80 词左右的短文，谈谈短视频流行的现象、你的使用经历，以及你的看法。（提示：获取知识、浪费时间、合理安排时间）', a: '范文要点：① 现象：short videos are popular among young people；② 经历：I once learned to cook from a short video；③ 看法：they help us learn, but we should manage our time well.', kp: '现象看法类', t: '网络生活', an: '三段式：现象—经历—看法，注意 80 词左右与要点齐全。', d: '难' }),
    ]},
  ],
};

// ============================ 第九套 ============================
const pb9 = 'Zhang Ming is a second-year student at a vocational school. Last term he did his internship in a car __1__. On the first morning he was so excited that he __2__ the bus stop. An old worker, Mr. Chen, showed him around and __3__ the tools to him. “Safety always comes __4__,” Mr. Chen said. Zhang Ming wrote every step down in a small __5__. When he made a __6__, he asked for help at once instead of hiding it. After three months he was able to __7__ a car by himself. The manager said he was a quick __8__. Zhang Ming thinks the internship __9__ him a real taste of work. He now knows that good skills grow out of hard work and honest __10__.';

const p9 = {
  id: uid(), title: '真题仿真模拟卷（九）', year: '2024', kind: '模拟', duration: 120,
  sections: [
    { type: '单项选择', prompt: '从 A、B、C、D 四个选项中选出最佳答案。', qs: [
      mcq({ s: 'A number of students ______ playing basketball on the playground now.', o: ['is', 'are', 'was', 'be'], a: 'are', k: '主谓一致', kp: 'a number of', t: '校园生活', an: 'a number of + 复数名词作主语，谓语用复数。' }),
      mcq({ s: 'By the end of last month we ______ 800 English words.', o: ['learn', 'learned', 'had learned', 'will learn'], a: 'had learned', k: '时态语态', kp: '过去完成时', t: '学习态度', an: 'by the end of last month 表“过去的过去”。' }),
      mcq({ s: 'It is no use ______ about the mistakes you have made.', o: ['worry', 'to worry', 'worrying', 'worried'], a: 'worrying', k: '非谓语动词', kp: 'It is no use doing', t: '学习态度', an: 'It is no use 后接动名词。' }),
      mcq({ s: 'Would you please ______ the door? It is noisy outside.', o: ['close', 'to close', 'closing', 'closed'], a: 'close', k: '情态动词', kp: 'Would you please do', t: '校园生活', an: 'Would you please 后接动词原形。' }),
      mcq({ s: 'He could not help ______ when he heard the funny story.', o: ['laugh', 'to laugh', 'laughing', 'laughed'], a: 'laughing', k: '非谓语动词', kp: 'can’t help doing', t: '校园生活', an: 'can’t help doing 忍不住做某事。' }),
      mcq({ s: 'Do you know when the sports meeting ______?', o: ['holds', 'will be held', 'will hold', 'is holding'], a: 'will be held', k: '时态语态', kp: '一般将来时被动', t: '校园生活', an: '运动会是被举行，用被动。' }),
      mcq({ s: 'The machine does not work. It requires ______ at once.', o: ['repair', 'to repair', 'repairing', 'repairs'], a: 'repairing', k: '非谓语动词', kp: 'require doing', t: '职业技能', an: 'require doing 含被动意义。' }),
      mcq({ s: 'We will not start the meeting ______ everyone arrives.', o: ['if', 'because', 'until', 'since'], a: 'until', k: '状语从句', kp: 'not ... until', t: '校园生活', an: 'not ... until 直到……才……。' }),
      mcq({ s: 'Tom, together with his parents, ______ going to visit the museum.', o: ['am', 'is', 'are', 'be'], a: 'is', k: '主谓一致', kp: '就远原则', t: '家庭生活', an: 'together with 连接的成分不影响谓语，与 Tom 一致。' }),
      mcq({ s: 'She is the most careful girl ______ I have ever met.', o: ['which', 'who', 'that', 'whose'], a: 'that', k: '定语从句', kp: '只用 that 的情况', t: '人际交往', an: '先行词被最高级修饰，关系代词用 that。' }),
      mcq({ s: '______ useful advice our teacher gave us!', o: ['What', 'What a', 'How', 'How a'], a: 'What', k: '特殊句式', kp: '感叹句 What + 不可数名词', t: '校园生活', an: 'advice 不可数，用 What。' }),
      mcq({ s: 'He was made ______ the classroom again after school.', o: ['clean', 'to clean', 'cleaning', 'cleaned'], a: 'to clean', k: '非谓语动词', kp: '使役动词被动还原 to', t: '校园生活', an: 'make 变被动后，宾补前要还原 to。' }),
    ]},
    { type: '完形填空', prompt: '阅读下面短文，掌握大意，从每题所给 A、B、C、D 四个选项中选最佳答案。', qs: [
      cloze({ pb: pb9, s: '1. Last term he did his internship in a car ______.', o: ['shop', 'factory', 'station', 'market'], a: 'factory', an: '在汽车厂实习，用 factory。' }),
      cloze({ pb: pb9, s: '2. He was so excited that he ______ the bus stop.', o: ['found', 'missed', 'built', 'cleaned'], a: 'missed', an: '太兴奋以致错过了车站。' }),
      cloze({ pb: pb9, s: '3. Mr. Chen showed him around and ______ the tools to him.', o: ['sold', 'introduced', 'returned', 'borrowed'], a: 'introduced', an: '老工人向他介绍工具。' }),
      cloze({ pb: pb9, s: '4. “Safety always comes ______,” Mr. Chen said.', o: ['first', 'last', 'late', 'again'], a: 'first', an: '安全第一，come first 排第一。' }),
      cloze({ pb: pb9, s: '5. Zhang Ming wrote every step down in a small ______.', o: ['notebook', 'box', 'bag', 'cup'], a: 'notebook', an: '把步骤记在笔记本上。' }),
      cloze({ pb: pb9, s: '6. When he made a ______, he asked for help at once.', o: ['plan', 'mistake', 'wish', 'call'], a: 'mistake', an: '犯错误用 make a mistake。' }),
      cloze({ pb: pb9, s: '7. After three months he was able to ______ a car by himself.', o: ['sell', 'design', 'check', 'wash'], a: 'check', an: '能独立检测汽车。' }),
      cloze({ pb: pb9, s: '8. The manager said he was a quick ______.', o: ['driver', 'learner', 'teacher', 'speaker'], a: 'learner', an: '学得快，a quick learner。' }),
      cloze({ pb: pb9, s: '9. The internship ______ him a real taste of work.', o: ['gave', 'paid', 'cost', 'took'], a: 'gave', an: 'give sb. a taste of 让某人体验。' }),
      cloze({ pb: pb9, s: '10. Good skills grow out of hard work and honest ______.', o: ['questions', 'prices', 'roads', 'games'], a: 'questions', an: '勤学加上诚实提问才能长技能。' }),
    ]},
    { type: '补全对话', prompt: '根据对话内容，从所给选项中选出能填入空白处的最佳答案。', qs: [
      dialog({ s: 'A: What is your plan after graduation?  B: ______', o: ['I want to work in a hotel.', 'It is sunny.', 'I was ten.', 'No, thanks.'], a: 'I want to work in a hotel.', k: '情景交际', kp: '职业规划应答', t: '职业规划', an: '询问毕业打算，回答职业方向。' }),
      dialog({ s: 'A: How much is the ticket to the science museum?  B: ______', o: ['It is twenty yuan.', 'It is far.', 'It is open.', 'It is new.'], a: 'It is twenty yuan.', k: '情景交际', kp: '价格询问', t: '社会生活', an: 'how much 问价格，回答金额。' }),
      dialog({ s: 'A: I can’t find my student card anywhere.  B: ______', o: ['Don’t worry. Let’s look for it together.', 'Yes, please.', 'It is mine.', 'See you.'], a: 'Don’t worry. Let’s look for it together.', k: '情景交际', kp: '安慰与帮助', t: '校园生活', an: '对方焦急，应安慰并帮忙。' }),
      dialog({ s: 'A: Would you like to join our basketball team?  B: ______', o: ['I’d love to. When do you train?', 'You are welcome.', 'It is over there.', 'Never mind.'], a: 'I’d love to. When do you train?', k: '情景交际', kp: '邀请与应答', t: '校园生活', an: '接受邀请并追问细节。' }),
    ]},
    { type: '阅读理解', prompt: '阅读下列短文，从每题所给 A、B、C、D 四个选项中选最佳答案。', qs: (() => {
      const a = 'Last Saturday our community held a flea market in the small square. More than fifty families put their old books, toys and clothes on the tables. Nothing was sold for more than twenty yuan. A twelve-year-old girl sold her picture books and made thirty yuan. She said she would use the money to buy a gift for her grandmother. The workers of the community said the market would be held twice a year. They hope it can help neighbours know each other better and make less waste.';
      const b = 'More and more students go online to study and relax, but some of them forget to protect their personal information. Experts advise students not to put their home address, school name or phone number on public pages. They also suggest using different passwords for different apps. If someone you do not know asks for money online, the safest answer is to tell a parent or a teacher at once. A little care can keep you away from a lot of trouble.';
      return [
        read({ pb: a, s: '1. Where was the flea market held?', o: ['In a school hall', 'In the small square', 'In a supermarket', 'In a factory'], a: 'In the small square', k: '细节理解', kp: '信息获取', t: '社会生活', an: '短文首句点明在小广场。' }),
        read({ pb: a, s: '2. How many families took part in the market?', o: ['About 15', 'About 30', 'More than 50', 'More than 100'], a: 'More than 50', k: '细节理解', kp: '信息获取', t: '社会生活', an: 'more than fifty families。' }),
        read({ pb: a, s: '3. What did the twelve-year-old girl plan to do with her money?', o: ['Buy a gift for her grandmother', 'Buy new toys', 'Give it to the community', 'Save it for school'], a: 'Buy a gift for her grandmother', k: '细节理解', kp: '信息获取', t: '家庭生活', an: '她要给奶奶买礼物。' }),
        read({ pb: a, s: '4. How often will the market be held?', o: ['Once a week', 'Twice a month', 'Twice a year', 'Once a year'], a: 'Twice a year', k: '细节理解', kp: '信息获取', t: '社会生活', an: 'twice a year 一年两次。' }),
        read({ pb: b, s: '5. What do experts advise students not to put online?', o: ['Their hobbies', 'Their home address', 'Their favorite songs', 'Their dreams'], a: 'Their home address', k: '细节理解', kp: '信息获取', t: '网络生活', an: '不要把家庭地址放上网。' }),
        read({ pb: b, s: '6. What do experts suggest about passwords?', o: ['Use the same one everywhere', 'Use different ones for different apps', 'Write them on the desk', 'Never change them'], a: 'Use different ones for different apps', k: '细节理解', kp: '信息获取', t: '网络生活', an: '不同应用使用不同密码。' }),
        read({ pb: b, s: '7. What should you do if a stranger asks you for money online?', o: ['Send the money at once', 'Tell a parent or a teacher', 'Meet him alone', 'Give him your password'], a: 'Tell a parent or a teacher', k: '细节理解', kp: '信息获取', t: '网络生活', an: '最安全的做法是告诉家长或老师。' }),
        read({ pb: b, s: '8. What is the best title for the online-safety passage?', o: ['Protect Your Personal Information', 'How to Make Friends Online', 'The Best Games for Students', 'How to Buy Cheap Things'], a: 'Protect Your Personal Information', k: '主旨大意', kp: '中心思想', t: '网络生活', an: '全文讲保护个人信息。' }),
        read({ pb: a + ' ' + b, s: '9. What do the flea market and the online tips have in common?', o: ['Both teach people to care for others and themselves', 'Both are about making money', 'Both are held in schools', 'Both need the Internet'], a: 'Both teach people to care for others and themselves', k: '推理判断', kp: '比较归纳', t: '社会发展', an: '一个关心他人，一个保护自己。' }),
        read({ pb: a + ' ' + b, s: '10. What does the writer want to tell us?', o: ['Small actions can make life safer and warmer', 'The Internet is never useful', 'Markets are always crowded', 'Money is the most important'], a: 'Small actions can make life safer and warmer', k: '推理判断', kp: '主旨归纳', t: '社会发展', an: '小小的举动让生活更安全温暖。' }),
      ];
    })()},
    { type: '句子翻译', prompt: '把下列句子译成中文或英文。', qs: [
      trans({ s: 'Every coin has two sides.', a: '凡事都有两面。', k: '英译汉', kp: '谚语', t: '生活哲理', an: '常见英语谚语。' }),
      trans({ s: 'Unity is strength.', a: '团结就是力量。', k: '英译汉', kp: '谚语', t: '生活哲理', an: '常见英语谚语。' }),
      trans({ s: '我的家乡近几年发生了巨大变化。', a: 'Great changes have taken place in my hometown in recent years.', k: '汉译英', kp: 'take place', t: '社会发展', an: 'take place 无被动，用现在完成时。' }),
      trans({ s: '老师鼓励我们多读英文报纸。', a: 'The teacher encourages us to read more English newspapers.', k: '汉译英', kp: 'encourage sb. to do', t: '校园生活', an: 'encourage sb. to do sth. 鼓励某人做某事。' }),
    ]},
    { type: '书面表达', prompt: '根据提示完成短文写作。', qs: [
      writing({ s: '如今“光盘行动”受到广泛提倡。请以“My Views on Saving Food”为题写一篇 80 词左右的短文，谈谈你看到的餐饮浪费现象、你的做法，以及你的看法。（提示：按需点餐、打包带走、节约光荣）', a: '范文要点：① 现象：some students throw away half of their food；② 做法：I only take what I can finish and take the rest home；③ 看法：saving food is a good habit and everyone should do it.', kp: '现象看法类', t: '健康生活', an: '三段式：现象—做法—看法，注意要点齐全与 80 词左右。', d: '难' }),
    ]},
  ],
};

// ============================ 第十套 ============================
const pb10 = 'Liu Ying comes from a small mountain village. After she finished vocational school, she __1__ to her hometown to help farmers sell fruit. At first few villagers __2__ her, because they thought selling online was __3__ and unsafe. She learned how to take photos and __4__ short videos by herself. In her first live show only about twenty people __5__. She did not lose heart. She showed the viewers how the apples were __6__ from the trees one by one. Slowly more people began to __7__ her products and left good words. Last year she helped the village sell over fifty tons of apples. Now several young people have __8__ her team. Liu Ying says the __9__ gave her a chance to use what she learned at school. She believes knowledge and hard work can __10__ a whole village.';

const p10 = {
  id: uid(), title: '真题仿真模拟卷（十）', year: '2023', kind: '模拟', duration: 120,
  sections: [
    { type: '单项选择', prompt: '从 A、B、C、D 四个选项中选出最佳答案。', qs: [
      mcq({ s: 'It is the third time that she ______ late for class this week.', o: ['is', 'was', 'has been', 'will be'], a: 'has been', k: '时态语态', kp: '现在完成时', t: '校园生活', an: 'It is the ... time that 从句用现在完成时。' }),
      mcq({ s: 'The teacher, as well as his students, ______ invited to the party.', o: ['was', 'were', 'are', 'have been'], a: 'was', k: '主谓一致', kp: 'as well as 就远原则', t: '校园生活', an: '谓语与 The teacher 一致，用 was。' }),
      mcq({ s: 'Let us ______ a short break, shall we?', o: ['take', 'taking', 'to take', 'took'], a: 'take', k: '特殊句式', kp: '祈使句', t: '校园生活', an: 'let sb. do 后接动词原形。' }),
      mcq({ s: 'I don’t think he will agree with us, ______?', o: ['do I', 'won’t he', 'will he', 'don’t I'], a: 'will he', k: '特殊句式', kp: '反义疑问句', t: '人际交往', an: 'I don’t think 引导时反义疑问句与从句一致。' }),
      mcq({ s: 'Hard work leads ______ success.', o: ['for', 'to', 'with', 'at'], a: 'to', k: '固定搭配', kp: 'lead to', t: '学习态度', an: 'lead to 通向、带来。' }),
      mcq({ s: 'The film had been on ______ ten minutes when we arrived.', o: ['since', 'for', 'in', 'at'], a: 'for', k: '时态语态', kp: 'for + 时间段', t: '社会生活', an: 'for ten minutes 表示持续一段时间。' }),
      mcq({ s: 'The harder you practise, ______ you will speak.', o: ['the better', 'the well', 'better', 'best'], a: 'the better', k: '比较等级', kp: 'the more ... the more', t: '学习态度', an: 'the + 比较级…, the + 比较级…。' }),
      mcq({ s: 'This is the workshop ______ my uncle has worked for ten years.', o: ['which', 'where', 'that', 'when'], a: 'where', k: '定语从句', kp: '关系副词 where', t: '职业技能', an: '从句缺地点状语，用 where。' }),
      mcq({ s: 'She asked me if I ______ free the next day.', o: ['am', 'was', 'will be', 'would be'], a: 'would be', k: '名词性从句', kp: '宾语从句时态一致', t: '人际交往', an: '主句过去时，从句用过去将来时。' }),
      mcq({ s: 'You should pay attention to ______ your pronunciation.', o: ['improve', 'improving', 'improved', 'improves'], a: 'improving', k: '非谓语动词', kp: 'pay attention to doing', t: '学习态度', an: 'pay attention to 中 to 是介词。' }),
      mcq({ s: '______ beautiful handwriting the girl has!', o: ['What', 'What a', 'How', 'How a'], a: 'What', k: '特殊句式', kp: '感叹句 What + 名词', t: '校园生活', an: 'handwriting 不可数名词，用 What。' }),
      mcq({ s: 'The window is dirty. It ______ cleaned for weeks.', o: ['wasn’t', 'hasn’t been', 'isn’t', 'won’t be'], a: 'hasn’t been', k: '时态语态', kp: '现在完成时被动', t: '校园生活', an: 'for weeks 用现在完成时，窗户是被擦。' }),
    ]},
    { type: '完形填空', prompt: '阅读下面短文，掌握大意，从每题所给 A、B、C、D 四个选项中选最佳答案。', qs: [
      cloze({ pb: pb10, s: '1. She ______ to her hometown to help farmers sell fruit.', o: ['returned', 'moved away', 'travelled', 'drove'], a: 'returned', an: '毕业后回到家乡。' }),
      cloze({ pb: pb10, s: '2. At first few villagers ______ her.', o: ['believed', 'called', 'visited', 'thanked'], a: 'believed', an: '起初没人相信她。' }),
      cloze({ pb: pb10, s: '3. They thought selling online was ______ and unsafe.', o: ['easy', 'strange', 'cheap', 'quiet'], a: 'strange', an: '觉得网上卖东西陌生且不保险。' }),
      cloze({ pb: pb10, s: '4. She learned how to take photos and ______ short videos.', o: ['watch', 'make', 'copy', 'sell'], a: 'make', an: '制作短视频用 make。' }),
      cloze({ pb: pb10, s: '5. In her first live show only about twenty people ______.', o: ['watched', 'left', 'paid', 'shouted'], a: 'watched', an: '首场直播只有约二十人观看。' }),
      cloze({ pb: pb10, s: '6. She showed how the apples were ______ from the trees.', o: ['picked', 'planted', 'washed', 'cooked'], a: 'picked', an: '苹果被从树上摘下，用 picked。' }),
      cloze({ pb: pb10, s: '7. More people began to ______ her products and left good words.', o: ['buy', 'throw', 'borrow', 'hide'], a: 'buy', an: '越来越多人购买并留下好评。' }),
      cloze({ pb: pb10, s: '8. Several young people have ______ her team.', o: ['left', 'joined', 'refused', 'changed'], a: 'joined', an: '几个年轻人加入了她的团队。' }),
      cloze({ pb: pb10, s: '9. The ______ gave her a chance to use what she learned at school.', o: ['Internet', 'radio', 'library', 'factory'], a: 'Internet', an: '互联网让她学以致用。' }),
      cloze({ pb: pb10, s: '10. Knowledge and hard work can ______ a whole village.', o: ['change', 'visit', 'forget', 'build'], a: 'change', an: '知识与勤劳能改变整个村庄。' }),
    ]},
    { type: '补全对话', prompt: '根据对话内容，从所给选项中选出能填入空白处的最佳答案。', qs: [
      dialog({ s: 'A: Excuse me, could you tell me the way to the post office?  B: ______', o: ['Sure. Go straight and turn left.', 'It is very big.', 'I am fine.', 'That is all right.'], a: 'Sure. Go straight and turn left.', k: '情景交际', kp: '问路指路', t: '社会生活', an: '问路应答给出路线。' }),
      dialog({ s: 'A: What do you think of the new school library?  B: ______', o: ['It is bright and quiet.', 'It is ten yuan.', 'I go there by bus.', 'Yes, I do.'], a: 'It is bright and quiet.', k: '情景交际', kp: '观点表达', t: '校园生活', an: '询问看法，回答形容词评价。' }),
      dialog({ s: 'A: I’m going to take part in the speech contest next week.  B: ______', o: ['Good luck! I believe you can do it.', 'Never mind.', 'It doesn’t matter.', 'You are right.'], a: 'Good luck! I believe you can do it.', k: '情景交际', kp: '祝愿与鼓励', t: '校园生活', an: '对方参赛应表达祝愿。' }),
      dialog({ s: 'A: How do you usually go back home on weekends?  B: ______', o: ['By school bus.', 'At seven.', 'With my sister.', 'Two hours.'], a: 'By school bus.', k: '情景交际', kp: '交通方式', t: '校园生活', an: 'how 问出行方式，回答交通工具。' }),
    ]},
    { type: '阅读理解', prompt: '阅读下列短文，从每题所给 A、B、C、D 四个选项中选最佳答案。', qs: (() => {
      const a = 'Our school dining hall started a Clean Your Plate activity this term. Students are asked to take only as much food as they can finish. Small plates are provided, and students can add more if they are still hungry. A board at the gate shows how much food was saved each day. Last month the dining hall saved about 200 kilograms of food. Many students say they now think twice before they order. The cook says the activity also helps them plan meals better.';
      const b = 'Many museums in China now put their collections online. Visitors can see clear pictures of old paintings and even turn the objects around on the screen. Some museums also work with vocational schools. Students majoring in design help make short videos about the objects. A teacher says this lets young people meet history in a way they enjoy. Last year the online trips to one museum reached more than ten million visits.';
      return [
        read({ pb: a, s: '1. What does the Clean Your Plate activity ask students to do?', o: ['Take only the food they can finish', 'Eat in the classroom', 'Bring their own bowls', 'Pay more for food'], a: 'Take only the food they can finish', k: '细节理解', kp: '信息获取', t: '健康生活', an: '活动要求按食量取餐。' }),
        read({ pb: a, s: '2. What is provided in the dining hall?', o: ['Small plates', 'New tables', 'Free drinks', 'Paper bags'], a: 'Small plates', k: '细节理解', kp: '信息获取', t: '健康生活', an: '食堂提供小份餐盘。' }),
        read({ pb: a, s: '3. How much food was saved last month?', o: ['About 20 kg', 'About 200 kg', 'About 2 tons', 'About 20 tons'], a: 'About 200 kg', k: '细节理解', kp: '信息获取', t: '健康生活', an: '上月节约约 200 公斤。' }),
        read({ pb: a, s: '4. What does the cook think of the activity?', o: ['It helps them plan meals better', 'It makes food expensive', 'It brings more waste', 'It takes too much time'], a: 'It helps them plan meals better', k: '细节理解', kp: '信息获取', t: '健康生活', an: '厨师认为有助于更好地备餐。' }),
        read({ pb: b, s: '5. What can visitors do with the online collections?', o: ['Turn the objects around on the screen', 'Take the objects home', 'Buy the old paintings', 'Repair the objects'], a: 'Turn the objects around on the screen', k: '细节理解', kp: '信息获取', t: '传统文化', an: '可在屏幕上翻转查看文物。' }),
        read({ pb: b, s: '6. Whom do some museums work with?', o: ['Vocational schools', 'Hospitals', 'Farms', 'Banks'], a: 'Vocational schools', k: '细节理解', kp: '信息获取', t: '传统文化', an: '博物馆与职业院校合作。' }),
        read({ pb: b, s: '7. What do design students help make?', o: ['Short videos about the objects', 'New museum buildings', 'Old paintings', 'Travel plans'], a: 'Short videos about the objects', k: '细节理解', kp: '信息获取', t: '传统文化', an: '设计专业学生制作文物短视频。' }),
        read({ pb: b, s: '8. What is the best title for the museum passage?', o: ['Meeting History Online', 'How to Draw a Painting', 'A Visit to a Farm', 'The Longest River'], a: 'Meeting History Online', k: '主旨大意', kp: '中心思想', t: '传统文化', an: '全文讲在线走近历史。' }),
        read({ pb: a + ' ' + b, s: '9. What do the dining hall activity and the museum programme both show?', o: ['Small changes bring a better life', 'Old things are useless', 'Students dislike history', 'Food is expensive'], a: 'Small changes bring a better life', k: '推理判断', kp: '比较归纳', t: '社会发展', an: '小改变带来更好的生活。' }),
        read({ pb: a + ' ' + b, s: '10. What idea do the two passages share?', o: ['New ideas can solve old problems', 'Museums are closed', 'Students should cook', 'The Internet is dangerous'], a: 'New ideas can solve old problems', k: '推理判断', kp: '主旨归纳', t: '社会发展', an: '两篇共同体现新思路化解老问题。' }),
      ];
    })()},
    { type: '句子翻译', prompt: '把下列句子译成中文或英文。', qs: [
      trans({ s: 'A journey of a thousand miles begins with a single step.', a: '千里之行，始于足下。', k: '英译汉', kp: '谚语', t: '学习态度', an: '常见英语谚语。' }),
      trans({ s: 'Many hands make light work.', a: '众人拾柴火焰高。', k: '英译汉', kp: '谚语', t: '生活哲理', an: '常见英语谚语。' }),
      trans({ s: '他和同学们相处得很融洽。', a: 'He gets along well with his classmates.', k: '汉译英', kp: 'get along with', t: '人际交往', an: 'get along well with 与……相处融洽。' }),
      trans({ s: '只有不断练习，我们才能提高技能。', a: 'Only by keeping practising can we improve our skills.', k: '汉译英', kp: '部分倒装', t: '学习态度', an: 'Only + 状语置于句首，主句部分倒装。' }),
    ]},
    { type: '书面表达', prompt: '根据提示完成短文写作。', qs: [
      writing({ s: '现在不少同学在校使用手机。请以“My Views on Using Mobile Phones at School”为题写一篇 80 词左右的短文，谈谈现象、利与弊，以及你的看法。（提示：查阅资料、联系家长、影响学习、遵守校规）', a: '范文要点：① 现象：many students bring phones to school；② 利弊：useful for looking up information and calling parents, but harmful if we play games in class；③ 看法：follow school rules and use phones wisely.', kp: '现象看法类', t: '校园生活', an: '三段式：现象—利弊—看法，注意观点明确与 80 词左右。', d: '难' }),
    ]},
  ],
};

export const newPapers3 = [pa, p9, p10];
