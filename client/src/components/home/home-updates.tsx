"use client";

import Image from "next/image";
import Link from "next/link";

import { SectionHeading } from "@/components/layout/section-heading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { newsletters } from "@/lib/data/newsletters";
import { updates } from "@/lib/data/updates";
import { formatDate } from "@/lib/utils";

const latest = [
  ...updates.map((item) => ({ ...item, href: `/updates/${item.slug}` })),
  ...newsletters.map((item) => ({
    ...item,
    href: `/newsletters/${item.slug}`,
  })),
]
  .sort((a, b) => b.date.localeCompare(a.date))
  .slice(0, 8);

export function HomeUpdates() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow="LATEST"
          title="本會動態"
          action={
            <Button
              variant="outline"
              nativeButton={false}
              render={<Link href="/updates" />}
            >
              最新動態
            </Button>
          }
        />

        <Carousel opts={{ align: "start", loop: true }}>
          <CarouselContent>
            {latest.map((item) => (
              <CarouselItem
                key={item.href}
                className="basis-[80%] sm:basis-1/2 lg:basis-1/3"
              >
                <Link href={item.href} className="group block h-full">
                  <Card className="h-full gap-4 overflow-hidden py-0 shadow-none transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/25 hover:shadow-xl hover:shadow-foreground/8">
                    <div className="relative aspect-16/10 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 80vw"
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
                      <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">
                        {item.excerpt}
                      </p>
                      <p className="mt-3 flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        閱讀更多
                        <span aria-hidden>→</span>
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-6 flex justify-center gap-2">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
