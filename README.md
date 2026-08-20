# 香港青年會官网

前端位于 [`client`](./client)，使用 Next.js App Router 与 shadcn/ui。

## 开发

```bash
cd client
cp .env.example .env.local
npm install
npm run dev
```

在 `client/.env.local` 填入 `RESEND_API_KEY`、`JOIN_FROM_EMAIL` 与 `JOIN_TO_EMAIL` 后，线上入会表单才会真正发信。

## 部署到 Cloudflare

这个站点有 `/api/join` 服务端接口，不能用纯静态 Pages。请在 Cloudflare 控制台的 **Workers & Pages** 里新建 **Worker**，用 OpenNext 部署（和 innox.ai 那种纯静态 Pages 不是同一种产品，但自定义域名、CDN 用法一样）。

### 用 Git 连接（推荐）

1. [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → 连接 GitHub 仓库 `youthHK`
2. 设置：
   - Root directory：`client`
   - Build command：`npx opennextjs-cloudflare build`
   - Deploy command：`npx wrangler deploy`
3. 在 Worker 的 **Settings → Variables** 里添加：
   - `RESEND_API_KEY`
   - `JOIN_FROM_EMAIL`
   - `JOIN_TO_EMAIL`

### 用命令行

```bash
cd client
npx wrangler login
npm run deploy
```

部署后再到 Cloudflare 控制台给 Worker 绑自定义域名。
