import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleDetail } from "@/components/content/article-detail";
import { PageHero } from "@/components/layout/page-hero";
import { getUpdate, updates } from "@/lib/data/updates";

export function generateStaticParams() {
  return updates.map((item) => ({ slug: item.slug }));
}

type PageParams = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const article = getUpdate(slug);
  return { title: article?.title ?? "動態" };
}

export default async function UpdateDetailPage({ params }: PageParams) {
  const { slug } = await params;
  const article = getUpdate(slug);
  if (!article) notFound();

  return (
    <>
      <PageHero
        title={article.title}
        crumbs={[
          { href: "/", label: "首頁" },
          { href: "/updates", label: "最新動態" },
          { label: article.title },
        ]}
      />
      <ArticleDetail article={article} />
    </>
  );
}
