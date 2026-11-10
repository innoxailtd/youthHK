"use client";

import { useSearchParams } from "next/navigation";

import { ArticleDetail } from "@/components/content/article-detail";
import { PageHero } from "@/components/layout/page-hero";
import { useCmsContent } from "@/lib/cms/use-cms-content";
import {
  contentItemsToArticles,
  type ArticleView,
  type ContentType,
} from "@/lib/cms/types";

export function CmsArticleView({
  type,
  items,
  sectionLabel,
  sectionHref,
}: {
  type: Extract<ContentType, "update" | "newsletter">;
  items: ArticleView[];
  sectionLabel: string;
  sectionHref: "/updates" | "/newsletters";
}) {
  const slug = useSearchParams().get("slug") ?? "";
  const articles = useCmsContent(type, items, contentItemsToArticles);
  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-muted-foreground md:px-6">
        找不到這篇內容。
      </div>
    );
  }

  return (
    <>
      <PageHero
        title={article.title}
        crumbs={[
          { href: "/", label: "首頁" },
          { href: sectionHref, label: sectionLabel },
          { label: article.title },
        ]}
      />
      <ArticleDetail article={article} />
    </>
  );
}
