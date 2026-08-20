import Image from "next/image";

import { formatDate } from "@/lib/utils";
import type { Article } from "@/lib/data/updates";

export function ArticleDetail({ article }: { article: Article }) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-14 md:px-6">
      <p className="flex items-center gap-2.5 text-sm tracking-widest text-primary">
        <span className="h-3.5 w-1 rounded-full bg-primary" aria-hidden />
        {formatDate(article.date)}
      </p>
      <h2 className="mt-4 text-balance font-heading text-3xl font-bold leading-snug md:text-4xl">
        {article.title}
      </h2>
      <div className="relative mt-8 aspect-16/9 overflow-hidden rounded-2xl shadow-lg shadow-foreground/8">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover"
          sizes="768px"
          priority
        />
      </div>
      <div className="mt-8 space-y-5 text-base leading-8 text-foreground/90">
        {article.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
