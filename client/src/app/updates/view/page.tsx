import type { Metadata } from "next";
import { Suspense } from "react";

import { CmsArticleView } from "@/components/content/cms-article-view";
import { updates } from "@/lib/data/updates";

export const metadata: Metadata = {
  title: "最新動態",
};

export default function UpdateViewPage() {
  return (
    <Suspense
      fallback={
        <p className="px-4 py-14 text-muted-foreground">正在載入內容…</p>
      }
    >
      <CmsArticleView
        type="update"
        items={updates}
        sectionLabel="最新動態"
        sectionHref="/updates"
      />
    </Suspense>
  );
}
