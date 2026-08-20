import type { Metadata } from "next";

import { PageHero } from "@/components/layout/page-hero";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "隱私聲明",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        title="隱私聲明"
        crumbs={[
          { href: "/", label: "首頁" },
          { label: "隱私聲明" },
        ]}
      />
      <article className="mx-auto max-w-3xl space-y-5 px-4 py-14 text-sm leading-7 text-muted-foreground md:px-6 md:text-base">
        <p>
          {site.name}重視個人資料私隱。經本網站「線上入會」或其他表格提交的姓名、電話、電郵及地址等資料，僅用於處理入會申請、活動通知及會務聯絡。
        </p>
        <p>
          除法律要求或經你同意外，本會不會向無關第三方出售或提供你的個人資料。資料會按需要保留，並採取合理措施防止未獲授權的查閱。
        </p>
        <p>
          如需查詢或更正個人資料，請電郵 {site.email} 或致電 {site.phones.join(" / ")}。
        </p>
      </article>
    </>
  );
}
