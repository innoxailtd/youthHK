import type { Metadata } from "next";

import { MembershipForm } from "@/components/join/membership-form";
import { PageHero } from "@/components/layout/page-hero";
import { Button } from "@/components/ui/button";
import { membershipFormHref } from "@/lib/nav";

export const metadata: Metadata = {
  title: "線上入會",
};

export default function JoinPage() {
  return (
    <>
      <PageHero
        title="線上入會"
        description="歡迎認同本會宗旨的青年朋友申請加入。提交後本會將以電郵跟進。"
        crumbs={[
          { href: "/", label: "首頁" },
          { href: "/join", label: "加入本會" },
          { label: "線上入會" },
        ]}
      />
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            如欲先下載表格，可點擊右側按鈕在瀏覽器開啟並列印填寫。
          </p>
          <Button
            variant="outline"
            nativeButton={false}
            render={
              <a href={membershipFormHref} target="_blank" rel="noreferrer" />
            }
          >
            下載表格
          </Button>
        </div>
        <MembershipForm />
      </div>
    </>
  );
}
