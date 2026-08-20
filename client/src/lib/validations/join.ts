import { z } from "zod";

export const membershipTypes = ["普通會員", "學生會員", "機構會員"] as const;
export const genders = ["男", "女"] as const;
export const educationLevels = [
  "中學",
  "大專／副學士",
  "學士",
  "碩士或以上",
  "其他",
] as const;

export const joinSchema = z.object({
  chineseName: z.string().trim().min(1, "請填寫中文姓名"),
  englishName: z.string().trim().min(1, "請填寫英文姓名"),
  gender: z.enum(genders, { error: "請選擇性別" }),
  birthDate: z.string().min(1, "請選擇出生日期"),
  phone: z
    .string()
    .trim()
    .min(8, "請填寫有效聯絡電話")
    .regex(/^[0-9+\-\s]{8,20}$/, "請填寫有效聯絡電話"),
  email: z.email("請填寫有效電郵地址"),
  address: z.string().trim().min(1, "請填寫住址"),
  occupation: z.string().trim().min(1, "請填寫職業"),
  education: z.enum(educationLevels, { error: "請選擇學歷" }),
  membershipType: z.enum(membershipTypes, { error: "請選擇申請類別" }),
  introduction: z.string().trim().min(10, "請以至少10字介紹自己"),
});

export type JoinFormValues = z.infer<typeof joinSchema>;
