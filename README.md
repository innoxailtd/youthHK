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
