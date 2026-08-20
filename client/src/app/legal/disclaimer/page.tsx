import type { Metadata } from "next";

import { PageHero } from "@/components/layout/page-hero";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "免責聲明",
};

export default function DisclaimerPage() {
  return (
    <>
      <PageHero
        title="免責聲明"
        crumbs={[
          { href: "/", label: "首頁" },
          { label: "免責聲明" },
        ]}
      />
      <article className="mx-auto max-w-3xl space-y-5 px-4 py-14 text-sm leading-7 text-muted-foreground md:px-6 md:text-base">
        <p>
          本網站由{site.name}提供，內容僅供參考。我們會盡力確保資料準確，惟不保證所有資訊完整、適時或適用於特定用途。
        </p>
        <p>
          因使用本網站資料、下載檔案或無法瀏覽頁面而引致的任何損失，本會概不負責。外部連結僅為方便查閱，不代表本會認可其內容。
        </p>
        <p>
          本會保留隨時更新網站內容及本聲明的權利，而不作另行通知。
        </p>
      </article>
    </>
  );
}
