import Image from "next/image";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Article } from "@/lib/data/updates";
import { formatDate } from "@/lib/utils";

export function ArticleList({
  items,
  basePath,
}: {
  items: Article[];
  basePath: "/updates" | "/newsletters";
}) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <Link key={item.slug} href={`${basePath}/${item.slug}`} className="group">
          <Card className="h-full gap-4 overflow-hidden py-0 shadow-none transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-primary/25 group-hover:shadow-xl group-hover:shadow-foreground/8">
            <div className="relative aspect-16/10 overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              />
              <span className="absolute top-3 left-3 rounded-md bg-black/55 px-2.5 py-1 text-xs font-medium tracking-wide text-white backdrop-blur-sm">
                {formatDate(item.date)}
              </span>
            </div>
            <CardHeader>
              <CardTitle className="line-clamp-2 text-base leading-7 transition-colors group-hover:text-primary">
                {item.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-5">
              <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
                {item.excerpt}
              </p>
              <p className="mt-3 flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                閱讀更多
                <span aria-hidden>→</span>
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
