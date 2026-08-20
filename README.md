# 香港青年會官网

前端位于 [`client`](./client)，使用 Next.js App Router 与 shadcn/ui。站点以静态导出部署到 **Cloudflare Pages**；入会表单通过 Pages Function 调用 Resend 发信。

## 开发

```bash
cd client
cp .env.example .env.local
npm install
npm run dev
```

本地预览完整入会发信（含 Pages Function）：

```bash
cd client
npm run pages:dev
```

在 `client/.env.local` 或 Cloudflare Pages 环境变量里填入 `RESEND_API_KEY`、`JOIN_FROM_EMAIL` 与 `JOIN_TO_EMAIL` 后，线上入会表单才会真正发信。

## 部署到 Cloudflare Pages

1. 打开 [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → 连接 GitHub 仓库 `youthHK`
2. 构建设置：
   - **Framework preset**：`Next.js (Static HTML Export)`
   - **Root directory**：`client`
   - **Build command**：`npx next build`
   - **Build output directory**：`out`
3. **Settings → Environment variables** 添加：
   - `RESEND_API_KEY`
   - `JOIN_FROM_EMAIL`
   - `JOIN_TO_EMAIL`
4. **Settings → Functions** 兼容性标志加上 `nodejs_compat`（`wrangler.jsonc` 里已写好，Git 构建一般会自动带上）

部署成功后会得到 `*.pages.dev` 地址，再在 Pages 项目里绑定自定义域名即可。
