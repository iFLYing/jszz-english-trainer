# 江苏省职教高考英语科目专项（云端版）

基于 [cloud-data-app-deploy](../../.workbuddy/skills/cloud-data-app-deploy) 架构复刻「南通中考英语专项」，
面向**江苏省对口单招（职教高考）英语**的专项训练系统：真题/模拟卷、专项题库、词汇语法、成绩跟踪，
数据全部上云（Neon Postgres），多端通过 SSE 实时同步。

## 功能模块
- **整卷模考**：历年真题 / 模拟卷全真计时训练，自动判分、错题归集。
- **专项训练**：按「题型 / 知识点 / 话题 / 技能 / 难度」五维标签筛选，可随机组卷。
- **词汇语法**：高频词汇 + 语法点积累，支持掌握进度标记。
- **错题本**：模考与训练的错题自动云端保存，按用户隔离。
- **成绩跟踪**：历次模考成绩趋势与各题型平均得分。
- **我的画像 / 管理后台**：教师可管理试卷、题库、词汇、学生与成绩。

## 技术架构
- 前端：原生 HTML/CSS/JS（零框架，适配手机/微信）
- 后端：`server.mjs`（Node 内置 `node:sqlite` 开发 / `pg`+PostgreSQL 生产，零其他依赖）
- 实时同步：SSE（`/api/events`）广播 `entity-changed`
- 部署：GitHub 推送 + Render 免费 Web Service + Neon 免费 Postgres

## 本地运行（开发模式，使用本地 SQLite）
```bash
node server.mjs          # 默认 http://localhost:3000
# 或指定端口
PORT=3100 node server.mjs
```
默认教师账号：用户名 `teacher` / 密码 `123456`（角色 admin，可进管理后台）。

## 部署到云端（生产，使用 Neon + Render）
1. **GitHub**：新建仓库 `jszz-english-trainer`，将本目录推送至 `main` 分支。
2. **Neon**：neon.tech 新建 Project → 复制 **Direct connection** URI。
3. **Render**：New Web Service → 连 GitHub 仓库 → Branch `main` → 环境变量
   `DATABASE_URL` = 上面的 Neon URI → Create。约 1~2 分钟得到 `https://<名>.onrender.com`。
   （`render.yaml` 已配置好 build/start/healthCheck，可直接 Import。）
4. 首次启动会自动写入种子数据（试卷/题库/词汇/学生/成绩）。

> Render 免费版 15 分钟无访问会休眠，上课/使用前先点开一次即可唤醒。

## 数据格式约定
- 实体 REST：`GET /api/:entity` 读取数组；`PUT /api/:entity` 写入，body 必须为
  `{ "clientId": "...", "data": [...] }`（`data` 是数组，切勿传裸数组以免清空实体）。
- 个人数据按用户分实体：`wrong_<用户名>` / `history_<用户名>` / `vocab_prog_<用户名>`。
- 鉴权：`POST /api/auth/register|login` 返回 token；`GET /api/auth/me`（带 `Authorization: Bearer`）。
