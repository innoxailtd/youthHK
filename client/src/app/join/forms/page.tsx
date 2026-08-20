import type { Metadata } from "next";

import { PageHero } from "@/components/layout/page-hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const forms = [
  {
    title: "會員入會申請表",
    description: "個人會員申請用。可先下載列印，填妥後交回本會秘書處。",
    href: "/forms/membership-application.pdf",
  },
  {
    title: "機構會員申請表",
    description: "友好團體或機構申請合作／機構會員時使用。",
    href: "/forms/organization-application.pdf",
  },
];

export const metadata: Metadata = {
  title: "下載表格",
};

export default function JoinFormsPage() {
  return (
    <>
      <PageHero
        title="下載表格"
        description="如未能使用線上入會，可下載表格填寫後電郵或親身交回本會。"
        crumbs={[
          { href: "/", label: "首頁" },
          { href: "/join", label: "加入本會" },
          { label: "下載表格" },
        ]}
      />
      <div className="mx-auto grid max-w-6xl gap-5 px-4 py-14 md:grid-cols-2 md:px-6">
        {forms.map((form) => (
          <Card key={form.title}>
            <CardHeader>
              <CardTitle>{form.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-7 text-muted-foreground">
                {form.description}
              </p>
              <Button nativeButton={false} render={<a href={form.href} download />}>
                下載 PDF
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
