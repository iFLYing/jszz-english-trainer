import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { randomUUID } from 'node:crypto';
import { seedIfEmpty } from './seed.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;
const PUBLIC = path.join(__dirname, 'public');

// 清洗连接串：剥离 ?sslmode=&channel_binding= 等查询参数，SSL 统一交由 pool 配置
function cleanDbUrl(u) {
  try { const x = new URL(u); x.search = ''; return x.href; } catch { return u; }
}

let store = null;

async function initStore() {
  if (process.env.DATABASE_URL) {
    const { Pool } = await import('pg');
    const pool = new Pool({
      connectionString: cleanDbUrl(process.env.DATABASE_URL),
      ssl: { rejectUnauthorized: false },
      connectionTimeoutMillis: 15000,
    });
    try { await pool.query('SELECT 1'); }
    catch (e) { console.error('[存储] 无法连接 DATABASE_URL:', e.message); process.exit(1); }
    await pool.query(`CREATE TABLE IF NOT EXISTS entities(name TEXT PRIMARY KEY, data TEXT NOT NULL, rev INTEGER NOT NULL DEFAULT 0)`);
    store = {
      async get(n) {
        const { rows } = await pool.query('SELECT data,rev FROM entities WHERE name=$1', [n]);
        return rows[0] ? { data: JSON.parse(rows[0].data), rev: rows[0].rev } : { data: [], rev: 0 };
      },
      async set(n, data) {
        await pool.query(
          `INSERT INTO entities(name,data,rev) VALUES($1,$2,1)
           ON CONFLICT(name) DO UPDATE SET data=EXCLUDED.data, rev=entities.rev+1`,
          [n, JSON.stringify(data)]
        );
        const { rows } = await pool.query('SELECT rev FROM entities WHERE name=$1', [n]);
        return rows[0].rev;
      },
    };
    console.log('[存储] 使用 PostgreSQL（Neon）');
  } else {
    const fs = await import('node:fs');
    fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true });
    const db = new DatabaseSync(path.join(__dirname, 'data', 'store.db'));
    db.exec(`CREATE TABLE IF NOT EXISTS entities(name TEXT PRIMARY KEY, data TEXT NOT NULL, rev INTEGER NOT NULL DEFAULT 0)`);
    store = {
      get(n) {
        const r = db.prepare('SELECT data,rev FROM entities WHERE name=?').get(n);
        return r ? { data: JSON.parse(r.data), rev: r.rev } : { data: [], rev: 0 };
      },
      set(n, data) {
        db.prepare(`INSERT INTO entities(name,data,rev) VALUES(?,?,1)
          ON CONFLICT(name) DO UPDATE SET data=excluded.data, rev=entities.rev+1`).run(n, JSON.stringify(data));
        return db.prepare('SELECT rev FROM entities WHERE name=?').get(n).rev;
      },
    };
    console.log('[存储] 使用本地 SQLite（开发模式）');
  }
}

const clients = new Set();
async function broadcast(entity, clientId, rev) {
  const msg = `data: ${JSON.stringify({ type: 'entity-changed', entity, clientId, rev })}\n\n`;
  for (const res of clients) res.write(msg);
}

// ---------- 鉴权（账号存于 users 实体，会话存于 sessions 实体） ----------
function hashPw(pw) { let h = 0; for (let i = 0; i < (pw || '').length; i++) h = (h * 31 + pw.charCodeAt(i)) >>> 0; return 'h' + h; }

async function getUsers() { return (await store.get('users')).data; }
async function saveUsers(u) { await store.set('users', u); }
async function getSessions() { return (await store.get('sessions')).data; }
async function saveSessions(s) { await store.set('sessions', s); }

async function authUser(token) {
  if (!token) return null;
  const t = token.replace(/^Bearer\s+/i, '');
  const s = (await getSessions()).find(x => x.token === t);
  if (!s) return null;
  const u = (await getUsers()).find(x => x.username === s.user);
  return u ? { username: u.username, role: u.role, profile: u.profile || {} } : null;
}

// ---------- 主服务 ----------
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const send = (code, obj, ct = 'application/json') => { res.writeHead(code, { 'Content-Type': ct }); res.end(typeof obj === 'string' ? obj : JSON.stringify(obj)); };
  const readBody = () => new Promise(r => { let b = ''; req.on('data', c => b += c); req.on('end', () => { try { r(JSON.parse(b || '{}')); } catch { r({}); } }); });

  if (url.pathname === '/health') return send(200, { ok: true, ts: Date.now(), store: process.env.DATABASE_URL ? 'pg' : 'sqlite' });

  // SSE
  if (url.pathname === '/api/events') {
    res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' });
    res.write(`data: ${JSON.stringify({ type: 'connected' })}\n\n`);
    clients.add(res);
    req.on('close', () => clients.delete(res));
    return;
  }

  // 鉴权端点
  if (url.pathname.startsWith('/api/auth')) {
    const body = (req.method === 'POST') ? await readBody() : {};
    if (url.pathname === '/api/auth/register' && req.method === 'POST') {
      const username = (body.username || '').trim();
      const password = body.password || '';
      if (username.length < 2 || password.length < 3) return send(400, { error: { message: '用户名至少2位、密码至少3位' } });
      const users = await getUsers();
      if (users.find(u => u.username === username)) return send(409, { error: { message: '用户名已存在' } });
      const role = body.role === 'admin' ? 'admin' : 'student';
      const nu = { id: randomUUID(), username, passwordHash: hashPw(password), role, profile: body.profile || {} };
      users.push(nu); await saveUsers(users);
      const token = randomUUID();
      const sessions = await getSessions(); sessions.push({ token, user: username, ts: Date.now() }); await saveSessions(sessions);
      return send(200, { token, user: { username, role, profile: nu.profile } });
    }
    if (url.pathname === '/api/auth/login' && req.method === 'POST') {
      const username = (body.username || '').trim();
      const password = body.password || '';
      const u = (await getUsers()).find(x => x.username === username);
      if (!u || u.passwordHash !== hashPw(password)) return send(401, { error: { message: '用户名或密码错误' } });
      const token = randomUUID();
      const sessions = await getSessions(); sessions.push({ token, user: username, ts: Date.now() }); await saveSessions(sessions);
      return send(200, { token, user: { username: u.username, role: u.role, profile: u.profile || {} } });
    }
    if (url.pathname === '/api/auth/me' && req.method === 'GET') {
      const u = await authUser(req.headers['authorization'] || '');
      if (!u) return send(401, { error: { message: '未登录' } });
      return send(200, { user: u });
    }
    if (url.pathname === '/api/auth/logout' && req.method === 'POST') {
      const token = (req.headers['authorization'] || '').replace(/^Bearer\s+/i, '');
      const sessions = (await getSessions()).filter(s => s.token !== token);
      await saveSessions(sessions);
      return send(200, { ok: true });
    }
    if (url.pathname === '/api/auth/profile' && req.method === 'PUT') {
      const u = await authUser(req.headers['authorization'] || '');
      if (!u) return send(401, { error: { message: '未登录' } });
      const users = await getUsers(); const i = users.findIndex(x => x.username === u.username);
      users[i].profile = Object.assign(users[i].profile || {}, body.profile || {});
      await saveUsers(users); await broadcast('users', 'server', await store.get('users').then(r => r.rev));
      return send(200, { ok: true, profile: users[i].profile });
    }
    return send(404, { error: { message: '未知鉴权路径' } });
  }

  // 通用实体 REST（data 必须为数组，body={clientId,data}）
  const m = url.pathname.match(/^\/api\/([\w-]+)$/);
  if (m) {
    const entity = m[1];
    if (req.method === 'GET') {
      const { data } = await store.get(entity);
      return send(200, { data: Array.isArray(data) ? data : [] });
    }
    if (req.method === 'PUT') {
      const body = await readBody();
      const clientId = body.clientId || '';
      const data = Array.isArray(body.data) ? body.data : [];
      const rev = await store.set(entity, data);
      await broadcast(entity, clientId, rev);
      return send(200, { ok: true, rev });
    }
  }

  // 静态文件
  let p = url.pathname === '/' ? '/index.html' : url.pathname;
  try {
    const buf = await readFile(path.join(PUBLIC, p));
    const ext = path.extname(p);
    const ct = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml', '.json': 'application/json' }[ext] || 'text/plain';
    res.writeHead(200, { 'Content-Type': ct });
    res.end(buf);
  } catch { res.writeHead(404); res.end('Not found'); }
});

await initStore();
await seedIfEmpty(store);
server.listen(PORT, () => console.log(`[职教高考英语专项后端] 已启动: http://localhost:${PORT}`));
