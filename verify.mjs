const BASE = process.argv[2] || 'http://localhost:3100';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const j = async (m, p, b) => { const r = await fetch(BASE + p, { method: m, headers: b ? { 'Content-Type': 'application/json' } : {}, body: b ? JSON.stringify(b) : undefined }); const t = await r.text(); try { return { ok: r.ok, status: r.status, data: JSON.parse(t) }; } catch { return { ok: r.ok, status: r.status, data: t }; } };

// SSE 监听
const evs = [];
const ctrl = new AbortController();
(async () => {
  const r = await fetch(BASE + '/api/events', { signal: ctrl.signal });
  const reader = r.body.getReader(); const dec = new TextDecoder(); let buf = '';
  while (true) { const { done, value } = await reader.read(); if (done) break; buf += dec.decode(value);
    const lines = buf.split('\n'); buf = lines.pop();
    for (const l of lines) { if (l.startsWith('data: ')) { try { evs.push(JSON.parse(l.slice(6))); } catch {} } }
  }
})().catch(() => {});

await sleep(800);
console.log('1) 注册 test01/abc123:', JSON.stringify((await j('POST', '/api/auth/register', { username: 'test01', password: 'abc123' })).data));
const login = await j('POST', '/api/auth/login', { username: 'test01', password: 'abc123' });
const token = login.data.token;
console.log('2) 登录获得 token:', token ? 'OK' : 'FAIL');

// 个人错题写入（per-user 实体）
const wrongEntity = 'wrong_test01';
const sample = [{ id: 'x1', user: 'test01', q: { stem: '测试题', options: ['a', 'b'], answer: 'a', questionType: '单项选择' }, ua: 'b', ts: Date.now() }];
await j('PUT', '/api/' + wrongEntity, { clientId: 'v', data: sample });
const gotWrong = await j('GET', '/api/' + wrongEntity);
console.log('3) 错题写入并读回:', gotWrong.data.data.length === 1 ? 'OK (1条)' : 'FAIL ' + gotWrong.data.data.length);

// 题库变更 + SSE 广播
const before = (await j('GET', '/api/questions')).data.data;
const changed = before.slice(); changed[0] = Object.assign({}, changed[0], { stem: changed[0].stem + '【已改】' });
await j('PUT', '/api/questions', { clientId: 'v', data: changed });
const after = (await j('GET', '/api/questions')).data.data;
console.log('4) 题库 PUT 持久化:', after[0].stem.includes('【已改】') ? 'OK' : 'FAIL');

await sleep(1000);
const pushed = evs.filter(e => e.type === 'entity-changed');
console.log('5) SSE 收到推送条数:', pushed.length, pushed.length ? 'OK' : 'FAIL');
console.log('   最近推送实体:', pushed.slice(-3).map(e => e.entity).join(', '));

// 还原题库
await j('PUT', '/api/questions', { clientId: 'v', data: before });
await j('PUT', '/api/' + wrongEntity, { clientId: 'v', data: [] });
ctrl.abort();
console.log('6) 已还原测试数据');
