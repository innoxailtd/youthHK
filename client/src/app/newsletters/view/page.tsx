import type { Metadata } from "next";
import { Suspense } from "react";

import { CmsArticleView } from "@/components/content/cms-article-view";
import { newsletters } from "@/lib/data/newsletters";

export const metadata: Metadata = {
  title: "最新會訊",
};

export default function NewsletterViewPage() {
  return (
    <Suspense
      fallback={
        <p className="px-4 py-14 text-muted-foreground">正在載入內容…</p>
      }
    >
      <CmsArticleView
        type="newsletter"
        items={newsletters}
        sectionLabel="最新會訊"
        sectionHref="/newsletters"
      />
    </Suspense>
  );
}
