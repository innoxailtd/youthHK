"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  educationLevels,
  genders,
  joinSchema,
  membershipTypes,
  type JoinFormValues,
} from "@/lib/validations/join";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs text-destructive">{message}</p>;
}

export function MembershipForm() {
  const [submitting, setSubmitting] = useState(false);
  const form = useForm<JoinFormValues>({
    resolver: zodResolver(joinSchema),
    defaultValues: {
      chineseName: "",
      englishName: "",
      gender: undefined,
      birthDate: "",
      phone: "",
      email: "",
      address: "",
      occupation: "",
      education: undefined,
      membershipType: undefined,
      introduction: "",
    },
  });

  async function onSubmit(values: JoinFormValues) {
    setSubmitting(true);
    try {
      const response = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message ?? "提交失敗，請稍後再試。");
      }

      toast.success(data.message ?? "申請已送出，我們將盡快與您聯絡。");
      form.reset();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "提交失敗，請稍後再試。");
    } finally {
      setSubmitting(false);
    }
  }

  const errors = form.formState.errors;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="chineseName">中文姓名</Label>
          <Input id="chineseName" {...form.register("chineseName")} />
          <FieldError message={errors.chineseName?.message} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="englishName">英文姓名</Label>
          <Input id="englishName" {...form.register("englishName")} />
          <FieldError message={errors.englishName?.message} />
        </div>
        <div className="grid gap-2">
          <Label>性別</Label>
          <Controller
            control={form.control}
            name="gender"
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="請選擇性別" />
                </SelectTrigger>
                <SelectContent>
                  {genders.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <FieldError message={errors.gender?.message} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="birthDate">出生日期</Label>
          <Input id="birthDate" type="date" {...form.register("birthDate")} />
          <FieldError message={errors.birthDate?.message} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">聯絡電話</Label>
          <Input id="phone" inputMode="tel" {...form.register("phone")} />
          <FieldError message={errors.phone?.message} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">電郵地址</Label>
          <Input id="email" type="email" {...form.register("email")} />
          <FieldError message={errors.email?.message} />
        </div>
        <div className="grid gap-2 md:col-span-2">
          <Label htmlFor="address">住址</Label>
          <Input id="address" {...form.register("address")} />
          <FieldError message={errors.address?.message} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="occupation">職業</Label>
          <Input id="occupation" {...form.register("occupation")} />
          <FieldError message={errors.occupation?.message} />
        </div>
        <div className="grid gap-2">
          <Label>學歷</Label>
          <Controller
            control={form.control}
            name="education"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="請選擇學歷" />
                </SelectTrigger>
                <SelectContent>
                  {educationLevels.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <FieldError message={errors.education?.message} />
        </div>
        <div className="grid gap-2 md:col-span-2">
          <Label>申請類別</Label>
          <Controller
            control={form.control}
            name="membershipType"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="請選擇申請類別" />
                </SelectTrigger>
                <SelectContent>
                  {membershipTypes.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <FieldError message={errors.membershipType?.message} />
        </div>
        <div className="grid gap-2 md:col-span-2">
          <Label htmlFor="introduction">自我介紹</Label>
          <Textarea
            id="introduction"
            rows={5}
            placeholder="請簡述加入本會的原因及可參與的會務。"
            {...form.register("introduction")}
          />
          <FieldError message={errors.introduction?.message} />
        </div>
      </div>

      <p className="text-xs leading-6 text-muted-foreground">
        本會有權拒絕任何申請，無需向申請者給予任何解釋。提交即表示你同意本會以電郵聯絡跟進入會事宜。
      </p>

      <Button type="submit" disabled={submitting} className="w-fit">
        {submitting ? "提交中…" : "提交申請"}
      </Button>
    </form>
  );
}
