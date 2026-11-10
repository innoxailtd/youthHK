# 香港青年會官网（前端）

以 Next.js App Router 与 shadcn/ui 重建的香港青年會静态官网。页面内容存放于本地数据文件；线上入会申请通过 Cloudflare Pages Function 调用 Resend 发送电邮。

## 开发

```bash
cp .env.example .env.local
npm install
npm run dev
```

在 `.dev.vars` 填入 `RESEND_API_KEY`、`JOIN_FROM_EMAIL`、`JOIN_TO_EMAIL`、`ADMIN_PASSWORD` 与 `ADMIN_SESSION_SECRET`。`/admin` 用来管理首页 Banner、最新动态、最新会讯和相片集。

## 主要页面

- `/` 首页：Banner、本会动态、简介、相片集
- `/about` 简介及宗旨
- `/about/organization` 组织架构
- `/about/partners` 合作团体
- `/newsletters` 最新会讯
- `/updates` 最新动态
- `/join` 线上入会
- `/forms/membership-application.pdf` 会员／义工申请表
- `/contact` 联络我们
- `/admin` 内容后台
