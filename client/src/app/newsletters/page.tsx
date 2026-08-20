import type { Metadata } from "next";

import { ArticleList } from "@/components/content/article-list";
import { PageHero } from "@/components/layout/page-hero";
import { newsletters } from "@/lib/data/newsletters";

export const metadata: Metadata = {
  title: "最新會訊",
};

export default function NewslettersPage() {
  return (
    <>
      <PageHero
        title="最新會訊"
        crumbs={[
          { href: "/", label: "首頁" },
          { label: "最新會訊" },
        ]}
      />
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <ArticleList items={newsletters} basePath="/newsletters" />
      </div>
    </>
  );
}
