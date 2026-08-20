import type { Metadata } from "next";

import { ArticleList } from "@/components/content/article-list";
import { PageHero } from "@/components/layout/page-hero";
import { updates } from "@/lib/data/updates";

export const metadata: Metadata = {
  title: "最新動態",
};

export default function UpdatesPage() {
  return (
    <>
      <PageHero
        title="最新動態"
        description="掌握本會活動、交流及社區服務的最新消息。"
        crumbs={[
          { href: "/", label: "首頁" },
          { label: "最新動態" },
        ]}
      />
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <ArticleList items={updates} basePath="/updates" />
      </div>
    </>
  );
}
