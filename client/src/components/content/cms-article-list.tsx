"use client";

import { ArticleList } from "@/components/content/article-list";
import { useCmsContent } from "@/lib/cms/use-cms-content";
import {
  contentItemsToArticles,
  type ArticleView,
  type ContentType,
} from "@/lib/cms/types";

export function CmsArticleList({
  type,
  items,
  basePath,
}: {
  type: Extract<ContentType, "update" | "newsletter">;
  items: ArticleView[];
  basePath: "/updates" | "/newsletters";
}) {
  const articles = useCmsContent(type, items, contentItemsToArticles);
  return <ArticleList items={articles} basePath={basePath} />;
}
