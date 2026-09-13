# 部署手册 · 江苏省职教高考英语科目专项

本手册面向**非专业运维**的教师用户，按步骤点几下即可上线（全程免费）。
代码已推送到 GitHub：`https://github.com/iFLYing/jszz-english-trainer`

---

## 整体流程（3 步）

| 步骤 | 平台 | 做什么 | 预计耗时 |
|------|------|--------|----------|
| 1 | Neon | 建一个免费 Postgres 数据库，复制连接串 | 3 分钟 |
| 2 | Render | 连 GitHub 仓库一键部署，填入连接串 | 2 分钟 |
| 3 | 验证 | 打开网址确认能访问 | 1 分钟 |

---

## 第 1 步：Neon 建数据库（生产环境真实数据）

1. 打开 https://neon.tech ，点 **Continue with GitHub** 登录。
2. 进入控制台后点 **New Project**。
   - Name 填：`jszz-english-trainer`
   - Region 选 **AWS / Singapore (ap-southeast-1)**（离国内近、延迟低）
   - 点 **Create**
3. 创建后自动进入 Dashboard。在左侧或顶部找到 **Connection Details**（连接详情）。
4. **关键**：把连接方式切换为 **Direct connection**（直连）。
   > ⚠️ 不要选 Pooled connection（连接池）。本项目用 `pg` 直连，pooled 的 URI 带 `pooler` 会导致 serverless 断连报错。
5. 复制那一整行以 `postgresql://` 开头的 URI（里面含用户名、密码、库名，结尾是 `?sslmode=require`）。
   - 示例形态：`postgresql://user:password@ep-xxx.ap-southeast-1.aws.neon.tech/neondb?sslmode=require`
   - 把它存到记事本，第 2 步要用。

---

## 第 2 步：Render 部署（托管网站 + 后端）

1. 打开 https://render.com ，点 **Sign in with GitHub** 登录。
2. 右上角 **New** → **Web Service**。
3. Connect 仓库：找到并选择 `iFLYing/jszz-english-trainer` → 点 **Connect**。
4. 基础设置（仓库里的 `render.yaml` 已自动填好，核对即可）：
   - **Name**：`jszz-english-trainer`
   - **Region**：选 **Singapore**（与 Neon 同区域，快）
   - **Branch**：`main`
   - **Runtime**：Node
   - **Build Command**：`npm install`
   - **Start Command**：`node server.mjs`
   - **Health Check Path**：`/health`
5. 向下滚动到 **Environment Variables**，点 **Add Environment Variable**：
   - **Key**：`DATABASE_URL`
   - **Value**：粘贴第 1 步复制的 Neon **Direct connection** URI
   - 再 Add 一个（保险）：`NODE_VERSION` = `22`
6. 其他保持默认，点 **Create Web Service**。
7. 等待约 1–2 分钟，Deploy 进度条变绿，顶部出现你的域名：
   `https://jszz-english-trainer.onrender.com`

> 首次访问可能较慢（免费版冷启动 30–60 秒），刷新一次即可。

---

## 第 3 步：验证上线

打开你的域名，在末尾加 `/health`，例如：
`https://jszz-english-trainer.onrender.com/health`

- 返回 `{"status":"ok",...}` 或含 `"ok"` 的 JSON → 部署成功 ✅
- 若返回 500 / 报错 → 99% 是 `DATABASE_URL` 没填或填成了 Pooled 连接，回到第 1 步复制 **Direct connection** 重新填。

---

## 默认账号（登录后可用全部功能）

| 角色 | 用户名 | 密码 | 说明 |
|------|--------|------|------|
| 教师（管理员） | `teacher` | `123456` | 可进入【管理后台】增删题库/试卷/词汇/学生 |
| 学生 | 自行注册 | — | 首页点"注册"即可，错题/成绩云端隔离 |

---

## 本地预览（开发用，无需部署）

```bash
cd jszz-english-trainer
node server.mjs          # 默认 3000 端口，已在 3100 端口跑着一版
# 浏览器打开 http://localhost:3000
```
本地用 SQLite（`./data/app.db`）做存储，与生产 Neon 行为一致，方便改完再推。

---

## 常见问题

- **改了代码怎么更新线上？** 在本地 `git add -A && git commit -m "..." && git push`，Render 会自动重新部署（约 1 分钟）。
- **Neon 免费版 30 天无访问会暂停**：重新打开 Render 网址会自动唤醒，首次会慢一点，正常。
- **想换数据库内容（加题/加学生）**：用教师账号登录 → 进入【管理后台】图形化操作，无需改代码。
- **忘记教师密码**：在 Neon 控制台跑 `UPDATE users SET password='123456' WHERE username='teacher';`
