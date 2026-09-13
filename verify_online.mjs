// 线上部署验证脚本：针对 Render 部署的实例跑端到端检查（只读，仅登录默认教师账号）
const BASE = process.argv[2] || 'https://jszz-english-trainer.onrender.com';

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function fetchRetry(url, opts = {}, tries = 8) {
  let lastErr;
  for (let i = 0; i < tries; i++) {
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 25000);
      const r = await fetch(url, { ...opts, signal: ctrl.signal });
      clearTimeout(t);
      return r;
    } catch (e) {
      lastErr = e;
      const tag = e.name === 'AbortError' ? '超时(冷启动中)' : e.message;
      console.log(`    ↻ 重试 ${i + 1}/${tries} [${tag}]`);
      await sleep(9000);
    }
  }
  throw lastErr;
}

const results = [];
function check(name, cond, extra = '') {
  results.push({ name, ok: !!cond, extra });
  console.log(`${cond ? '✅' : '❌'} ${name}${extra ? ' — ' + extra : ''}`);
}

console.log(`\n=== 线上验证：${BASE} ===\n`);

// 1. 健康检查（含冷启动重试）
try {
  const r = await fetchRetry(`${BASE}/health`);
  const j = await r.json().catch(() => ({}));
  check('健康检查 /health', r.ok && j.ok, `store=${j.store}`);
} catch (e) {
  check('健康检查 /health', false, '无法连接: ' + e.message);
}

// 2. 数据就绪（应来自已 seed 的 Neon 库）
const counts = {};
for (const ent of ['questions', 'vocab', 'papers', 'students', 'scores']) {
  try {
    const r = await fetchRetry(`${BASE}/api/${ent}`);
    const j = await r.json().catch(() => ({ data: [] }));
    counts[ent] = Array.isArray(j.data) ? j.data.length : 0;
  } catch { counts[ent] = -1; }
}
check('题库已就绪 /api/questions', counts.questions === 21, `题目数=${counts.questions}`);
check('词汇已就绪 /api/vocab', counts.vocab === 16, `词汇数=${counts.vocab}`);
check('试卷已就绪 /api/papers', counts.papers === 2, `试卷数=${counts.papers}`);
check('学生/成绩已就绪', counts.students === 4 && counts.scores === 8, `学生=${counts.students} 成绩=${counts.scores}`);

// 3. 登录默认教师账号（验证 pg 库中账号可用）
let token = null;
try {
  const r = await fetchRetry(`${BASE}/api/auth/login`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'teacher', password: '123456' }),
  });
  const j = await r.json().catch(() => ({}));
  token = j.token || null;
  check('教师登录 /api/auth/login', r.ok && !!token, `role=${j?.user?.role}`);
} catch (e) {
  check('教师登录 /api/auth/login', false, e.message);
}

// 4. 鉴权 /me
if (token) {
  try {
    const r = await fetch(`${BASE}/api/auth/me`, { headers: { Authorization: 'Bearer ' + token } });
    const j = await r.json().catch(() => ({}));
    check('身份校验 /api/auth/me', r.ok && j?.user?.username === 'teacher', `user=${j?.user?.username}`);
  } catch (e) {
    check('身份校验 /api/auth/me', false, e.message);
  }
} else {
  check('身份校验 /api/auth/me', false, '无 token 跳过');
}

// 5. 静态首页
try {
  const r = await fetch(`${BASE}/`);
  const txt = await r.text().catch(() => '');
  check('前端首页可访问 /', r.ok && txt.includes('<!DOCTYPE') || txt.includes('<html'), `HTTP ${r.status}`);
} catch (e) {
  check('前端首页可访问 /', false, e.message);
}

const passed = results.filter(r => r.ok).length;
console.log(`\n=== 结果：${passed}/${results.length} 通过 ===`);
process.exit(passed === results.length ? 0 : 1);
