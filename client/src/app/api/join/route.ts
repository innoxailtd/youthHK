import { NextResponse } from "next/server";
import { Resend } from "resend";

import { joinSchema } from "@/lib/validations/join";

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = joinSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { message: "請檢查表單內容後再提交。" },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.JOIN_FROM_EMAIL;
  const to = process.env.JOIN_TO_EMAIL ?? "info.hkya@gmail.com";

  if (!apiKey || !from) {
    return NextResponse.json(
      { message: "郵件服務尚未設定，請稍後再試或改用電郵聯絡。" },
      { status: 500 },
    );
  }

  const data = parsed.data;
  const resend = new Resend(apiKey);
  const rows = [
    ["中文姓名", data.chineseName],
    ["英文姓名", data.englishName],
    ["性別", data.gender],
    ["出生日期", data.birthDate],
    ["聯絡電話", data.phone],
    ["電郵地址", data.email],
    ["住址", data.address],
    ["職業", data.occupation],
    ["學歷", data.education],
    ["申請類別", data.membershipType],
    ["自我介紹", data.introduction],
  ];

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: data.email,
    subject: `【線上入會】${data.chineseName}（${data.membershipType}）`,
    html: `
      <h2>香港青年會線上入會申請</h2>
      <table cellpadding="8" cellspacing="0" border="1" style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
        ${rows
          .map(
            ([label, value]) =>
              `<tr><th align="left" style="background:#f6f1e7;">${label}</th><td>${escapeHtml(value)}</td></tr>`,
          )
          .join("")}
      </table>
    `,
  });

  if (error) {
    return NextResponse.json(
      { message: "發送申請失敗，請稍後再試。" },
      { status: 502 },
    );
  }

  return NextResponse.json({
    message: "申請已送出，本會將盡快以電郵與您聯絡。",
  });
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
