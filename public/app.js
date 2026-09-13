/* ============ 江苏省职教高考英语科目专项 · 前端 ============ */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const CLIENT_ID = Math.random().toString(36).slice(2);
const LS = { token: 'jszz_token', user: 'jszz_user', role: 'jszz_role' };

const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const uid = () => 'c' + Math.random().toString(36).slice(2, 10);
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove('show'), 1800); }

/* ---------- 网络层 ---------- */
async function api(method, path, body) {
  const headers = {};
  const tk = localStorage.getItem(LS.token);
  if (tk) headers['Authorization'] = 'Bearer ' + tk;
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  const r = await fetch(path, { method, headers, body: body !== undefined ? JSON.stringify(body) : undefined });
  if (r.status === 204) return null;
  let data = null; try { data = await r.json(); } catch (e) {}
  if (!r.ok) throw new Error((data && data.error && data.error.message) || ('请求失败(' + r.status + ')'));
  return data;
}
async function getE(e) { const r = await api('GET', '/api/' + e); return Array.isArray(r.data) ? r.data : []; }
async function putE(e, data) { return api('PUT', '/api/' + e, { clientId: CLIENT_ID, data }); }

/* ---------- 状态 ---------- */
const state = {
  user: null, role: null, tab: 'home',
  cache: { papers: [], questions: [], vocab: [], students: [], scores: [], users: [] },
  me: {}, // 个人实体名集合
  filters: { questionType: [], knowledge: [], topic: [], skill: [], difficulty: [] },
  session: null,
  adminEntity: 'papers',
};
const ENTITIES = ['papers', 'questions', 'vocab', 'students', 'scores', 'users'];

/* ---------- 鉴权 ---------- */
function loadAuth() {
  state.user = localStorage.getItem(LS.user);
  state.role = localStorage.getItem(LS.role);
  if (state.user) state.me = {
    wrong: 'wrong_' + state.user, history: 'history_' + state.user, prog: 'vocab_prog_' + state.user,
  };
  updateAuthUI();
}
function saveAuth(token, user) {
  localStorage.setItem(LS.token, token); localStorage.setItem(LS.user, user.username); localStorage.setItem(LS.role, user.role);
  state.user = user.username; state.role = user.role;
  state.me = { wrong: 'wrong_' + user.username, history: 'history_' + user.username, prog: 'vocab_prog_' + user.username };
  updateAuthUI();
}
function clearAuth() { ['token', 'user', 'role'].forEach(k => localStorage.removeItem(LS[k])); state.user = state.role = null; state.me = {}; updateAuthUI(); }

function updateAuthUI() {
  const a = $('#authArea');
  if (state.user) {
    a.innerHTML = `<span class="btn ghost" style="background:rgba(255,255,255,.2);color:#fff;border:none">👤 ${esc(state.user)}</span>
      <button class="btn" id="logoutBtn">退出</button>`;
    $('#logoutBtn').onclick = logout;
  } else {
    a.innerHTML = `<button class="btn" id="loginBtn">登录 / 注册</button>`;
    $('#loginBtn').onclick = () => openAuth('login');
  }
}
function openAuth(mode) {
  $('#authModal').style.display = 'grid';
  setAuthMode(mode || 'login');
  $('#authUser').value = ''; $('#authPw').value = '';
}
function setAuthMode(mode) {
  $$('#authModal .seg-btn').forEach(b => b.classList.toggle('active', b.dataset.auth === mode));
  $('#authTitle').textContent = mode === 'reg' ? '注册账号' : '登录账号';
  $('#authSubmit').textContent = mode === 'reg' ? '注册并登录' : '登录';
  $('#authSubmit').onclick = () => submitAuth(mode);
}
async function submitAuth(mode) {
  const username = $('#authUser').value.trim(); const password = $('#authPw').value;
  if (username.length < 2 || password.length < 3) return toast('用户名至少2位、密码至少3位');
  try {
    const res = mode === 'reg'
      ? await api('POST', '/api/auth/register', { username, password, role: 'student' })
      : await api('POST', '/api/auth/login', { username, password });
    saveAuth(res.token, res.user);
    $('#authModal').style.display = 'none';
    toast('登录成功');
    await afterLogin();
  } catch (e) { toast(e.message); }
}
async function logout() { try { await api('POST', '/api/auth/logout'); } catch (e) {} clearAuth(); resetPersonal(); render(); }
function resetPersonal() { state.cache.wrong = []; state.cache.history = []; state.cache.prog = []; }

/* ---------- 登录后加载个人数据 ---------- */
async function afterLogin() {
  await Promise.all([
    getE(state.me.wrong).then(d => state.cache.wrong = d),
    getE(state.me.history).then(d => state.cache.history = d),
    getE(state.me.prog).then(d => state.cache.prog = d),
  ]);
  refreshWrongBadge();
}
async function refreshWrongBadge() {
  const n = (state.cache.wrong || []).length;
  const el = $('#wrongCount'); if (!el) return;
  el.textContent = n; el.style.display = n ? 'inline-block' : 'none';
}

/* ---------- 数据加载 + SSE ---------- */
async function loadAll() {
  const got = await Promise.all(ENTITIES.map(e => getE(e)));
  ENTITIES.forEach((e, i) => state.cache[e] = got[i]);
  if (state.user) await afterLogin();
}
function connectSSE() {
  const es = new EventSource('/api/events');
  es.onmessage = async ev => {
    let m; try { m = JSON.parse(ev.data); } catch { return; }
    if (m.type !== 'entity-changed' || m.clientId === CLIENT_ID) return;
    const ent = m.entity;
    if (ENTITIES.includes(ent)) { state.cache[ent] = await getE(ent); }
    else if (state.me.wrong === ent) { state.cache.wrong = await getE(ent); refreshWrongBadge(); }
    else if (state.me.history === ent) { state.cache.history = await getE(ent); }
    else if (state.me.prog === ent) { state.cache.prog = await getE(ent); }
    if (!state.session) render(); // 训练中不打断
  };
  es.onerror = () => {};
}

/* ---------- 路由 ---------- */
function switchMode(mode) {
  state.tab = mode;
  $$('#tabs .tab').forEach(b => b.classList.toggle('active', b.dataset.mode === mode));
  render();
}
function render() {
  const app = $('#app');
  const map = { home: renderHome, mock: renderMock, practice: renderPractice, vocab: renderVocab, wrong: renderWrong, scores: renderScores, profile: renderProfile };
  (map[state.tab] || renderHome)(app);
}

/* ---------- 首页 ---------- */
function renderHome(app) {
  const c = state.cache;
  app.innerHTML = `
  <div class="hero">
    <h2>江苏省职教高考 · 英语科目专项</h2>
    <p>面向对口单招英语的真题模拟、专项突破与词汇积累，数据与成绩云端实时同步。</p>
    <div class="stats">
      <div class="stat"><b>${c.papers.length}</b><span>真题/模拟卷</span></div>
      <div class="stat"><b>${c.questions.length}</b><span>专项题库</span></div>
      <div class="stat"><b>${c.vocab.length}</b><span>词汇语法</span></div>
      <div class="stat"><b>${c.students.length}</b><span>在册学生</span></div>
    </div>
    <div class="tiles">
      <div class="tile" data-go="mock"><b>整卷模考</b><span>全真试卷计时训练</span></div>
      <div class="tile" data-go="practice"><b>专项训练</b><span>按题型/知识点筛选</span></div>
      <div class="tile" data-go="vocab"><b>词汇语法</b><span>高频词与语法点</span></div>
      <div class="tile" data-go="wrong"><b>错题本</b><span>自动归集薄弱点</span></div>
      <div class="tile" data-go="scores"><b>成绩跟踪</b><span>历次模考趋势</span></div>
      <div class="tile" data-go="profile"><b>我的画像</b><span>目标与薄弱点</span></div>
    </div>
    <p class="muted" style="margin-top:12px">${state.user ? '已登录：' + esc(state.user) + '（数据已同步云端）' : '游客模式：可练习，登录后错题与成绩自动云端保存。'}</p>
  </div>`;
  app.querySelectorAll('.tile').forEach(t => t.onclick = () => switchMode(t.dataset.go));
}

/* ---------- 整卷模考 ---------- */
function renderMock(app) {
  const papers = state.user ? state.cache.papers : state.cache.papers.slice(0, 1);
  if (!state.user && state.cache.papers.length > 1) {
    app.innerHTML = `<div class="warn">游客模式仅开放第 1 套试卷，登录后可解锁全部 ${state.cache.papers.length} 套真题与模拟卷。</div>` + paperList(papers, true);
  } else {
    app.innerHTML = paperList(papers, false);
  }
  app.querySelectorAll('.start-paper').forEach(b => b.onclick = () => {
    const p = state.cache.papers.find(x => x.id === b.dataset.id);
    startMock(p);
  });
}
function paperList(papers, locked) {
  const cards = papers.map(p => {
    const total = p.sections.reduce((s, sec) => s + sec.qs.length, 0);
    return `<div class="card">
      <h3>${esc(p.title)}</h3>
      <div class="row"><span class="pill">${esc(p.kind)}</span><span class="muted">${esc(p.year)} · 题量 ${total} · ${p.duration}分钟</span></div>
      <div class="row" style="margin-top:8px"><button class="btn sm start-paper" data-id="${p.id}">开始模考</button></div>
    </div>`;
  }).join('') || `<p class="muted">暂无试卷，请到管理后台添加。</p>`;
  return `<h2 style="margin:6px 0 4px">整卷模考</h2>` + cards;
}
function startMock(paper) {
  const qs = [];
  paper.sections.forEach(sec => sec.qs.forEach((q, i) => qs.push(Object.assign({}, q, { _sec: sec.type, _no: i + 1 }))));
  state.session = { title: paper.title, questions: qs, mode: 'mock', back: 'mock', cur: 0, answers: {}, reviewed: false, paper: paper.id };
  renderSession();
}

/* ---------- 专项训练 ---------- */
const DIMS = [
  { key: 'questionType', label: '题型' }, { key: 'knowledge', label: '知识点' },
  { key: 'topic', label: '话题' }, { key: 'skill', label: '技能' }, { key: 'difficulty', label: '难度' },
];
function renderPractice(app) {
  const q = state.cache.questions;
  const all = q.length;
  if (!state.user && all > 0) {
    app.innerHTML = `<div class="warn">游客模式：专项训练仅开放「单项选择」题型。登录后解锁全部题型筛选。</div>` + practiceSetup(q.filter(x => x.questionType === '单项选择'));
    return;
  }
  app.innerHTML = practiceSetup(q);
  wirePractice(app);
}
function practiceSetup(q) {
  const groups = DIMS.map(d => {
    const vals = [...new Set(q.map(x => x[d.key]).filter(Boolean))];
    const chips = vals.map(v => `<span class="chip ${state.filters[d.key].includes(v) ? 'on' : ''}" data-dim="${d.key}" data-val="${esc(v)}">${esc(v)}</span>`).join('');
    return `<div class="filter-group"><h4>${d.label}</h4><div class="chips">${chips}</div></div>`;
  }).join('');
  return `<h2 style="margin:6px 0 4px">专项训练</h2>
    <div class="card">${groups}
      <div class="row" style="margin-top:10px">
        <button class="btn sm" id="startP">开始练习</button>
        <button class="btn ghost sm" id="resetF">重置筛选</button>
        <button class="btn ghost sm" id="randP">🎲 随机 15 题</button>
        <span class="muted" id="pcount"></span>
      </div>
    </div>
    <div id="practiceResult"></div>`;
}
function wirePractice(app) {
  app.querySelectorAll('.chip').forEach(c => c.onclick = () => {
    const dim = c.dataset.dim, v = c.dataset.val;
    const arr = state.filters[dim];
    const i = arr.indexOf(v);
    if (i >= 0) arr.splice(i, 1); else arr.push(v);
    c.classList.toggle('on');
    updatePcount();
  });
  $('#resetF').onclick = () => { state.filters = { questionType: [], knowledge: [], topic: [], skill: [], difficulty: [] }; renderPractice($('#app')); };
  $('#startP').onclick = () => startPractice(false);
  $('#randP').onclick = () => startPractice(true);
  updatePcount();
}
function updatePcount() {
  const el = $('#pcount'); if (!el) return;
  el.textContent = '符合条件：' + filteredQs().length + ' 题';
}
function filteredQs() {
  const f = state.filters;
  return state.cache.questions.filter(q => DIMS.every(d => !f[d.key].length || f[d.key].includes(q[d.key])));
}
function startPractice(random) {
  let qs = filteredQs();
  if (!qs.length) return toast('没有符合条件的题目，请调整筛选');
  if (random) qs = shuffle(qs).slice(0, Math.min(15, qs.length));
  state.session = { title: '专项训练（' + qs.length + '题）', questions: qs.map(x => Object.assign({}, x)), mode: 'practice', back: 'practice', cur: 0, answers: {}, reviewed: false };
  renderSession();
}

/* ---------- 训练/模考 答题引擎 ---------- */
function renderSession() {
  const s = state.session; const app = $('#app');
  if (s.reviewed) { renderReview(app); return; }
  const q = s.questions[s.cur];
  const total = s.questions.length;
  app.innerHTML = `
    <div class="row" style="justify-content:space-between">
      <button class="btn ghost sm" id="backBtn">← 返回</button>
      <span class="muted">${esc(s.title)}　第 ${s.cur + 1}/${total} 题</span>
    </div>
    <div class="progress"><i style="width:${((s.cur) / total) * 100}%"></i></div>
    ${renderQuestion(q, s.cur)}
    <div class="row" style="justify-content:space-between;margin-top:10px">
      <button class="btn ghost sm" id="prevQ" ${s.cur === 0 ? 'disabled' : ''}>上一题</button>
      <button class="btn sm" id="nextQ">${s.cur === total - 1 ? '完成 / 交卷' : '下一题'}</button>
    </div>`;
  $('#backBtn').onclick = () => { state.session = null; render(); };
  $('#prevQ').onclick = () => { if (s.cur > 0) { s.cur--; renderSession(); } };
  $('#nextQ').onclick = () => {
    if (s.cur === total - 1) { finishSession(); }
    else { s.cur++; renderSession(); }
  };
  wireQuestion(app, q, s.cur);
}
function renderQuestion(q, idx) {
  const a = state.session.answers[idx];
  const passage = q.passageBody ? `<div class="passage">${esc(q.passageBody)}</div>` : '';
  const tags = `${q.questionType ? `<span class="tag">${esc(q.questionType)}</span>` : ''}
    ${q.knowledge ? `<span class="tag k">${esc(q.knowledge)}</span>` : ''}
    ${q.topic ? `<span class="tag t">${esc(q.topic)}</span>` : ''}
    ${q.skill ? `<span class="tag s">${esc(q.skill)}</span>` : ''}
    ${q.difficulty ? `<span class="tag d">${esc(q.difficulty)}</span>` : ''}`;
  let body;
  if (q.options && q.options.length) {
    body = `<div class="options">` + q.options.map(o =>
      `<div class="opt ${a && a.sel === o ? 'sel' : ''}" data-opt="${esc(o)}">${esc(o)}</div>`).join('') + `</div>`;
  } else {
    body = `<textarea class="fill-input" id="fill${idx}" rows="3" placeholder="在此作答…">${a ? esc(a.text || '') : ''}</textarea>`;
  }
  return `<div class="question">
    ${tags}
    <div class="stem">${idx + 1}. ${esc(q.stem)}</div>
    ${passage}${body}
  </div>`;
}
function wireQuestion(app, q, idx) {
  const s = state.session;
  if (q.options && q.options.length) {
    app.querySelectorAll('.opt').forEach(o => o.onclick = () => {
      s.answers[idx] = { sel: o.dataset.opt };
      app.querySelectorAll('.opt').forEach(x => x.classList.remove('sel'));
      o.classList.add('sel');
    });
  } else {
    const ta = $('#fill' + idx); if (ta) ta.oninput = () => s.answers[idx] = { text: ta.value };
  }
}
function finishSession() {
  state.session.reviewed = true;
  renderSession();
}
function renderReview(app) {
  const s = state.session;
  let correct = 0, choiceTotal = 0, wrongList = [];
  s.questions.forEach((q, i) => {
    const a = s.answers[i];
    if (q.options && q.options.length) {
      choiceTotal++;
      if (a && a.sel === q.answer) correct++;
      else wrongList.push({ q, ua: a ? a.sel : '(未作答)' });
    } else if (a && a.text && a.text.trim()) {
      // 开放题：记录作答，但不自动判分
      wrongList.push({ q, ua: a.text });
    }
  });
  const scoreLine = choiceTotal ? `<div class="stat"><b>${correct}/${choiceTotal}</b><span>选择题正确</span></div>` : '';
  app.innerHTML = `
    <div class="card">
      <h3>练习完成 · ${esc(s.title)}</h3>
      <div class="stats">${scoreLine}<div class="stat"><b>${s.questions.length}</b><span>总题量</span></div><div class="stat"><b>${wrongList.length}</b><span>待巩固</span></div></div>
      <div class="row">
        <button class="btn sm" id="saveWrong">${state.user ? '保存错题到云端' : '游客：登录后保存'}</button>
        <button class="btn ghost sm" id="reDo">再做一次</button>
        <button class="btn ghost sm" id="backHome">返回</button>
      </div>
    </div>
    <div id="reviewList"></div>`;
  const list = $('#reviewList');
  list.innerHTML = s.questions.map((q, i) => {
    const a = s.answers[i];
    const isChoice = q.options && q.options.length;
    const userAns = a ? (isChoice ? a.sel : a.text) : '(未作答)';
    const ok = isChoice && a && a.sel === q.answer;
    const ansColor = isChoice ? (ok ? 'color:var(--green)' : 'color:var(--red)') : '';
    const passage = q.passageBody ? `<div class="passage">${esc(q.passageBody)}</div>` : '';
    let optHtml = '';
    if (isChoice) {
      optHtml = `<div class="options">` + q.options.map(o => {
        let cls = 'opt';
        if (o === q.answer) cls += ' correct';
        else if (a && a.sel === o && o !== q.answer) cls += ' wrong';
        return `<div class="${cls}">${esc(o)}</div>`;
      }).join('') + `</div>`;
    }
    return `<div class="question">
      <div class="stem">${i + 1}. ${esc(q.stem)}</div>${passage}${optHtml}
      <div class="answer-line">你的答案：<b style="${ansColor}">${esc(userAns)}</b>${isChoice ? `　正确答案：<b>${esc(q.answer)}</b>` : ''}</div>
      ${q.analysis ? `<div class="analysis"><b>解析：</b>${esc(q.analysis)}</div>` : ''}
    </div>`;
  }).join('');
  $('#saveWrong').onclick = () => saveWrong(wrongList);
  $('#reDo').onclick = () => { state.session.answers = {}; state.session.cur = 0; state.session.reviewed = false; renderSession(); };
  $('#backHome').onclick = () => { state.session = null; render(); };
}
async function saveWrong(list) {
  if (!state.user) return toast('请先登录后再保存错题');
  const items = list.map(x => ({ id: uid(), user: state.user, q: x.q, ua: x.ua, ts: Date.now() }));
  const merged = (state.cache.wrong || []).concat(items);
  state.cache.wrong = merged;
  await putE(state.me.wrong, merged);
  // 写入练习历史
  const hist = (state.cache.history || []).concat([{ id: uid(), user: state.user, mode: state.session.mode, title: state.session.title, ts: Date.now() }]);
  state.cache.history = hist;
  await putE(state.me.history, hist);
  refreshWrongBadge();
  toast('已保存 ' + items.length + ' 道错题到云端');
}

/* ---------- 词汇语法 ---------- */
function renderVocab(app) {
  const v = state.cache.vocab;
  const cats = [...new Set(v.map(x => x.category).filter(Boolean))];
  const prog = new Set((state.cache.prog || []).map(x => x.id));
  app.innerHTML = `
    <h2 style="margin:6px 0 4px">词汇 / 语法积累</h2>
    <div class="card">
      <div class="row">
        <select id="vcCat"><option value="">全部类别</option>${cats.map(c => `<option>${esc(c)}</option>`).join('')}</select>
        <input class="auth-input" id="vcSearch" placeholder="搜索单词/含义" style="max-width:200px" />
        <span class="muted" id="vcCount"></span>
      </div>
      ${state.user ? `<p class="muted">已掌握 <b id="vcMastered">${prog.size}</b> / ${v.length} 个</p>` : `<p class="muted">登录后可标记掌握进度。</p>`}
    </div>
    <div id="vcList"></div>`;
  const draw = () => {
    const cat = $('#vcCat').value, kw = $('#vcSearch').value.trim().toLowerCase();
    const list = v.filter(x => (!cat || x.category === cat) && (!kw || (x.word + ' ' + x.meaning).toLowerCase().includes(kw)));
    $('#vcCount').textContent = '共 ' + list.length + ' 条';
    $('#vcList').innerHTML = list.map(x => {
      const done = prog.has(x.id);
      return `<div class="card">
        <div class="row" style="justify-content:space-between">
          <div><b style="font-size:17px">${esc(x.word)}</b> ${x.phonetic ? `<span class="muted">${esc(x.phonetic)}</span>` : ''} ${x.pos ? `<span class="pill">${esc(x.pos)}</span>` : ''} ${x.category ? `<span class="pill g">${esc(x.category)}</span>` : ''}</div>
          ${state.user ? `<button class="btn sm ${done ? 'ghost' : 'ok'}" data-id="${x.id}">${done ? '已掌握 ✓' : '标记掌握'}</button>` : ''}
        </div>
        <div>${esc(x.meaning)}</div>
        ${x.example ? `<div class="muted">例句：${esc(x.example)}</div>` : ''}
        ${x.note ? `<div class="muted">提示：${esc(x.note)}</div>` : ''}
      </div>`;
    }).join('') || `<p class="muted">无匹配结果。</p>`;
    $('#vcList').querySelectorAll('button[data-id]').forEach(b => b.onclick = () => toggleVocab(b.dataset.id));
  };
  $('#vcCat').onchange = draw; $('#vcSearch').oninput = draw;
  draw();
}
async function toggleVocab(id) {
  const prog = state.cache.prog || [];
  const i = prog.findIndex(x => x.id === id);
  if (i >= 0) prog.splice(i, 1); else prog.push({ id, ts: Date.now() });
  state.cache.prog = prog;
  await putE(state.me.prog, prog);
  const el = $('#vcMastered'); if (el) el.textContent = prog.length;
  renderVocab($('#app'));
}

/* ---------- 错题本 ---------- */
function renderWrong(app) {
  const list = state.cache.wrong || [];
  if (!state.user) { app.innerHTML = `<div class="warn">游客模式不保存错题。登录后模考/训练的错题会自动归集到这里。</div>`; return; }
  if (!list.length) { app.innerHTML = `<h2 style="margin:6px 0 4px">错题本</h2><div class="card"><p class="muted">还没有错题，去做几道模考或专项训练吧！</p></div>`; return; }
  app.innerHTML = `<h2 style="margin:6px 0 4px">错题本 <span class="muted">(${list.length})</span></h2>
    <div class="row" style="margin-bottom:8px"><button class="btn ghost sm" id="clearWrong">清空错题本</button></div>
    <div id="wrongList"></div>`;
  $('#wrongList').innerHTML = list.slice().reverse().map((w, i) => {
    const q = w.q;
    const passage = q.passageBody ? `<div class="passage">${esc(q.passageBody)}</div>` : '';
    let optHtml = '';
    if (q.options && q.options.length) {
      optHtml = `<div class="options">` + q.options.map(o => `<div class="opt ${o === q.answer ? 'correct' : (o === w.ua ? 'wrong' : '')}">${esc(o)}</div>`).join('') + `</div>`;
    }
    return `<div class="question">
      <span class="tag">${esc(q.questionType || '')}</span>${q.knowledge ? `<span class="tag k">${esc(q.knowledge)}</span>` : ''}
      <div class="stem">${esc(q.stem)}</div>${passage}${optHtml}
      <div class="answer-line">你的答案：<b style="color:var(--red)">${esc(w.ua)}</b>${q.answer ? `　正确答案：<b style="color:var(--green)">${esc(q.answer)}</b>` : ''}</div>
      ${q.analysis ? `<div class="analysis"><b>解析：</b>${esc(q.analysis)}</div>` : ''}
      <button class="btn ghost sm" data-del="${w.id}" style="margin-top:6px">删除此题</button>
    </div>`;
  }).join('');
  $('#wrongList').querySelectorAll('button[data-del]').forEach(b => b.onclick = async () => {
    const id = b.dataset.del;
    state.cache.wrong = state.cache.wrong.filter(x => x.id !== id);
    await putE(state.me.wrong, state.cache.wrong); refreshWrongBadge(); renderWrong($('#app'));
  });
  $('#clearWrong').onclick = async () => { state.cache.wrong = []; await putE(state.me.wrong, []); refreshWrongBadge(); renderWrong($('#app')); };
}

/* ---------- 成绩跟踪 ---------- */
function renderScores(app) {
  const students = state.cache.students, scores = state.cache.scores;
  if (!students.length) { app.innerHTML = `<h2 style="margin:6px 0 4px">成绩跟踪</h2><div class="card"><p class="muted">暂无学生，请到管理后台添加。</p></div>`; return; }
  app.innerHTML = `
    <h2 style="margin:6px 0 4px">成绩跟踪</h2>
    <div class="card">
      <div class="row"><span class="muted">选择学生：</span>
        <select id="scStu">${students.map(s => `<option value="${s.id}">${esc(s.name)}（${esc(s.class)}）</option>`).join('')}</select>
      </div>
      <div id="scBody"></div>
    </div>`;
  const draw = () => {
    const sid = $('#scStu').value;
    const recs = scores.filter(x => x.studentId === sid).sort((a, b) => a.date < b.date ? 1 : -1);
    const secs = ['vocabGrammar', 'cloze', 'reading', 'dialogue', 'translate', 'writing'];
    const avg = {}; secs.forEach(k => avg[k] = recs.length ? Math.round(recs.reduce((s, r) => s + (r[k] || 0), 0) / recs.length) : 0);
    const maxTotal = 150;
    const body = recs.length ? `
      <table class="table"><tr><th>考试</th><th>日期</th><th>词汇语法</th><th>完形</th><th>阅读</th><th>对话</th><th>翻译</th><th>写作</th><th>总分</th></tr>
      ${recs.map(r => `<tr><td>${esc(r.exam)}</td><td>${esc(r.date)}</td><td>${r.vocabGrammar}</td><td>${r.cloze}</td><td>${r.reading}</td><td>${r.dialogue}</td><td>${r.translate}</td><td>${r.writing}</td><td><b>${r.total}</b></td></tr>`).join('')}
      <tr style="background:#f1f5f9"><td>平均</td><td>-</td>${secs.map(k => `<td>${avg[k]}</td>`).join('')}<td><b>${recs.length ? Math.round(recs.reduce((s, r) => s + (r.total || 0), 0) / recs.length) : 0}</b></td></tr></table>
      <h4 style="margin:14px 0 6px">各题型平均得分</h4>
      ${secs.map(k => `<div class="row" style="margin:4px 0"><span style="width:90px" class="muted">${secName(k)}</span><div class="bar" style="flex:1"><i style="width:${(avg[k] / 30) * 100}%"></i></div><span class="muted">${avg[k]}</span></div>`).join('')}
    ` : `<p class="muted">该生暂无成绩记录。</p>`;
    $('#scBody').innerHTML = body;
  };
  $('#scStu').onchange = draw; draw();
}
function secName(k) { return ({ vocabGrammar: '词汇语法', cloze: '完形填空', reading: '阅读理解', dialogue: '补全对话', translate: '句子翻译', writing: '书面表达' })[k] || k; }

/* ---------- 我的画像 ---------- */
function renderProfile(app) {
  if (!state.user) { app.innerHTML = `<div class="warn">请先登录查看与完善个人画像。</div>`; return; }
  const p = (state.cache.users.find(u => u.username === state.user) || {}).profile || {};
  const knowledges = [...new Set(state.cache.questions.map(q => q.knowledge).filter(Boolean))];
  const weak = p.weak || [], goals = p.goals || [];
  app.innerHTML = `
    <h2 style="margin:6px 0 4px">我的画像</h2>
    <div class="card">
      <div class="form-row"><label>用户名</label><input class="auth-input" value="${esc(state.user)}" disabled /></div>
      <div class="form-row"><label>学段 / 方向</label><input class="auth-input" id="pfGrade" value="${esc(p.grade || '职教高考')}" /></div>
      <div class="form-row"><label>目标总分</label><input class="auth-input" type="number" id="pfTarget" value="${p.target || 120}" style="max-width:120px" /></div>
      <div class="filter-group"><h4>学习目标（可多选）</h4><div class="chips" id="pfGoals">
        ${['巩固基础', '专项突破', '冲刺高分', '应付考试'].map(g => `<span class="chip ${goals.includes(g) ? 'on' : ''}" data-v="${g}">${g}</span>`).join('')}</div></div>
      <div class="filter-group"><h4>自述薄弱点（可多选）</h4><div class="chips" id="pfWeak">
        ${knowledges.map(k => `<span class="chip ${weak.includes(k) ? 'on' : ''}" data-v="${esc(k)}">${esc(k)}</span>`).join('')}</div></div>
      <button class="btn wide" id="pfSave">保存画像</button>
    </div>`;
  app.querySelectorAll('#pfGoals .chip, #pfWeak .chip').forEach(c => c.onclick = () => c.classList.toggle('on'));
  $('#pfSave').onclick = async () => {
    const profile = {
      grade: $('#pfGrade').value, target: +$('#pfTarget').value || 120,
      goals: $$('#pfGoals .chip.on').map(c => c.dataset.v),
      weak: $$('#pfWeak .chip.on').map(c => c.dataset.v),
    };
    try { await api('PUT', '/api/auth/profile', { profile }); toast('画像已保存'); }
    catch (e) { toast(e.message); }
  };
}

/* ---------- 管理后台 ---------- */
const ADMIN = {
  papers: { label: '真题与模拟卷', cols: ['title', 'year', 'kind'], fields: [
    { k: 'title', label: '标题', type: 'text' }, { k: 'year', label: '年份', type: 'text' },
    { k: 'kind', label: '类型', type: 'select', opts: ['真题', '模拟'] }, { k: 'duration', label: '时长(分)', type: 'number' },
    { k: 'sections', label: '章节(JSON)', type: 'json' },
  ]},
  questions: { label: '专项题库', cols: ['questionType', 'stem'], fields: [
    { k: 'questionType', label: '题型', type: 'select', opts: ['单项选择', '完形填空', '阅读理解', '补全对话', '句子翻译', '书面表达'] },
    { k: 'stem', label: '题干', type: 'text' }, { k: 'options', label: '选项(JSON数组,开放题留空[])', type: 'json' },
    { k: 'answer', label: '答案', type: 'text' }, { k: 'analysis', label: '解析', type: 'text' },
    { k: 'knowledge', label: '知识点', type: 'text' }, { k: 'knowledgePoint', label: '考点', type: 'text' },
    { k: 'topic', label: '话题', type: 'text' }, { k: 'skill', label: '技能', type: 'text' },
    { k: 'difficulty', label: '难度', type: 'select', opts: ['易', '中', '难'] }, { k: 'passageBody', label: '语篇(JSON字符串)', type: 'text' },
  ]},
  vocab: { label: '词汇/语法', cols: ['word', 'category'], fields: [
    { k: 'word', label: '单词/语法点', type: 'text' }, { k: 'phonetic', label: '音标', type: 'text' },
    { k: 'pos', label: '词性', type: 'text' }, { k: 'meaning', label: '释义', type: 'text' },
    { k: 'example', label: '例句', type: 'text' }, { k: 'category', label: '类别', type: 'select', opts: ['词汇', '语法'] },
    { k: 'note', label: '提示', type: 'text' }, { k: 'tags', label: '标签(JSON数组)', type: 'json' },
  ]},
  students: { label: '学生', cols: ['name', 'class'], fields: [
    { k: 'name', label: '姓名', type: 'text' }, { k: 'class', label: '班级', type: 'text' },
    { k: 'sid', label: '学号', type: 'text' }, { k: 'note', label: '备注', type: 'text' },
  ]},
  scores: { label: '成绩', cols: ['studentName', 'exam'], fields: [
    { k: 'studentId', label: '学生(选姓名自动填)', type: 'student' }, { k: 'studentName', label: '学生姓名', type: 'text' },
    { k: 'exam', label: '考试名', type: 'text' }, { k: 'date', label: '日期', type: 'text' },
    { k: 'vocabGrammar', label: '词汇语法', type: 'number' }, { k: 'cloze', label: '完形', type: 'number' },
    { k: 'reading', label: '阅读', type: 'number' }, { k: 'dialogue', label: '对话', type: 'number' },
    { k: 'translate', label: '翻译', type: 'number' }, { k: 'writing', label: '写作', type: 'number' },
    { k: 'total', label: '总分(留空自动算)', type: 'number' },
  ]},
  users: { label: '账号', cols: ['username', 'role'], fields: [
    { k: 'username', label: '用户名', type: 'text' }, { k: 'role', label: '角色', type: 'select', opts: ['student', 'admin'] },
  ]},
};
function openAdmin() {
  if (state.role !== 'admin') return toast('仅教师/管理员账号可进入后台');
  $('#adminOverlay').style.display = 'grid';
  renderAdmin();
}
function renderAdmin() {
  const e = state.adminEntity; const meta = ADMIN[e]; const data = state.cache[e] || [];
  const nav = Object.keys(ADMIN).map(k => `<div class="aitem ${k === e ? 'active' : ''}" data-e="${k}">${ADMIN[k].label}</div>`).join('');
  const rows = data.map((r, i) => `<tr><td>${meta.cols.map(c => `<span>${esc(r[c])}</span>`).join(' / ')}</td><td><button class="btn sm" data-edit="${i}">编辑</button> <button class="btn sm danger" data-del="${i}">删</button></td></tr>`).join('')
    || `<tr><td class="muted">暂无数据</td><td></td></tr>`;
  $('#adminPanel').innerHTML = `
    <span class="close-x" id="adminClose">×</span>
    <h2>管理后台</h2>
    <div class="admin-grid">
      <div class="admin-nav">${nav}</div>
      <div class="admin-body">
        <div class="row" style="justify-content:space-between"><h3 style="margin:0">${meta.label}</h3><button class="btn sm" id="addBtn">+ 新增</button></div>
        <table class="table" style="margin-top:10px"><tr><th>概要</th><th>操作</th></tr>${rows}</table>
        <div id="adminForm"></div>
      </div>
    </div>`;
  $('#adminClose').onclick = () => $('#adminOverlay').style.display = 'none';
  $('#adminPanel').querySelectorAll('.aitem').forEach(n => n.onclick = () => { state.adminEntity = n.dataset.e; renderAdmin(); });
  $('#addBtn').onclick = () => showAdminForm(-1);
  $('#adminPanel').querySelectorAll('[data-edit]').forEach(b => b.onclick = () => showAdminForm(+b.dataset.edit));
  $('#adminPanel').querySelectorAll('[data-del]').forEach(b => b.onclick = async () => {
    const i = +b.dataset.del; const arr = state.cache[e].slice(); arr.splice(i, 1);
    state.cache[e] = arr; await putE(e, arr); renderAdmin(); toast('已删除');
  });
}
function showAdminForm(idx) {
  const e = state.adminEntity; const meta = ADMIN[e];
  const rec = idx >= 0 ? Object.assign({}, state.cache[e][idx]) : {};
  const fields = meta.fields.map(f => {
    let ctrl;
    const val = rec[f.k];
    if (f.type === 'select') ctrl = `<select id="f_${f.k}">${(f.opts || []).map(o => `<option ${val === o ? 'selected' : ''}>${esc(o)}</option>`).join('')}</select>`;
    else if (f.type === 'student') {
      const opts = state.cache.students.map(s => `<option value="${s.id}" ${val === s.id ? 'selected' : ''}>${esc(s.name)}</option>`).join('');
      ctrl = `<select id="f_${f.k}">${opts}</select>`;
    } else if (f.type === 'json') ctrl = `<textarea id="f_${f.k}" rows="3">${esc(val ? JSON.stringify(val) : '')}</textarea>`;
    else if (f.type === 'number') ctrl = `<input id="f_${f.k}" type="number" value="${val || 0}" />`;
    else ctrl = `<input id="f_${f.k}" value="${esc(val || '')}" />`;
    return `<div class="form-row"><label>${f.label}</label>${ctrl}</div>`;
  }).join('');
  $('#adminForm').innerHTML = `<div class="card" style="margin-top:12px"><h4>${idx >= 0 ? '编辑' : '新增'} ${meta.label}</h4>${fields}
    <div class="row"><button class="btn sm" id="saveForm">保存</button><button class="btn ghost sm" id="cancelForm">取消</button></div></div>`;
  if (e === 'scores') {
    $('#f_studentId').onchange = () => { const s = state.cache.students.find(x => x.id === $('#f_studentId').value); if (s) $('#f_studentName').value = s.name; };
  }
  $('#cancelForm').onclick = () => $('#adminForm').innerHTML = '';
  $('#saveForm').onclick = async () => {
    const obj = idx >= 0 ? Object.assign({}, state.cache[e][idx]) : { id: uid() };
    for (const f of meta.fields) {
      let v = $('#f_' + f.k).value;
      if (f.type === 'number') v = +v || 0;
      else if (f.type === 'json') { try { v = v.trim() ? JSON.parse(v) : []; } catch { return toast('JSON 格式错误：' + f.label); } }
      obj[f.k] = v;
    }
    if (e === 'scores') { const secs = ['vocabGrammar', 'cloze', 'reading', 'dialogue', 'translate', 'writing']; obj.total = secs.reduce((s, k) => s + (obj[k] || 0), 0); }
    const arr = state.cache[e].slice();
    if (idx >= 0) arr[idx] = obj; else arr.push(obj);
    state.cache[e] = arr; await putE(e, arr); renderAdmin(); toast('已保存');
  };
}

/* ---------- 启动 ---------- */
function init() {
  if (/micromessenger/i.test(navigator.userAgent)) $('#wechatTip').style.display = 'block';
  $('#tabs').querySelectorAll('.tab').forEach(b => b.onclick = () => switchMode(b.dataset.mode));
  $('#loginBtn') && ($('#loginBtn').onclick = () => openAuth('login'));
  $('#authCancel').onclick = () => $('#authModal').style.display = 'none';
  $('#authModal').addEventListener('click', e => { if (e.target.id === 'authModal') $('#authModal').style.display = 'none'; });
  $('#adminEntry').onclick = openAdmin;
  $('#adminOverlay').addEventListener('click', e => { if (e.target.id === 'adminOverlay') $('#adminOverlay').style.display = 'none'; });
  loadAuth();
  loadAll().then(() => { connectSSE(); render(); })
    .catch(e => { console.error(e); $('#app').innerHTML = `<div class="warn">数据加载失败：${esc(e.message)}</div>`; });
}
init();
