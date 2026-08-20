import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleDetail } from "@/components/content/article-detail";
import { PageHero } from "@/components/layout/page-hero";
import { getNewsletter, newsletters } from "@/lib/data/newsletters";

export function generateStaticParams() {
  return newsletters.map((item) => ({ slug: item.slug }));
}

type PageParams = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsletter(slug);
  return { title: article?.title ?? "會訊" };
}

export default async function NewsletterDetailPage({ params }: PageParams) {
  const { slug } = await params;
  const article = getNewsletter(slug);
  if (!article) notFound();

  return (
    <>
      <PageHero
        title={article.title}
        crumbs={[
          { href: "/", label: "首頁" },
          { href: "/newsletters", label: "最新會訊" },
          { label: article.title },
        ]}
      />
      <ArticleDetail article={article} />
    </>
  );
}
