"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { banners } from "@/lib/data/gallery";
import { site } from "@/lib/data/site";
import { cn } from "@/lib/utils";

export function HeroBanner() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const autoplay = useRef(
    Autoplay({ delay: 6000, stopOnInteraction: false, stopOnMouseEnter: true }),
  );

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <section className="relative">
      <Carousel
        opts={{ loop: true }}
        plugins={[autoplay.current]}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent className="-ml-0">
          {banners.map((banner) => (
            <CarouselItem key={banner.title} className="pl-0">
              <div className="relative h-[460px] w-full sm:h-[540px] md:h-[620px]">
                <Image
                  src={banner.src}
                  alt={banner.title}
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/45 to-black/10" />
                <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-black/60 to-transparent" />
                <div className="absolute inset-0 mx-auto flex max-w-6xl items-end px-4 pb-20 md:px-6 md:pb-24">
                  <div className="max-w-2xl">
                    <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.3em] text-white/85">
                      <span className="h-px w-10 bg-primary" aria-hidden />
                      {site.name}
                    </p>
                    <h1 className="mt-4 text-balance font-heading text-4xl font-bold leading-tight text-white drop-shadow-sm md:text-6xl">
                      {banner.title}
                    </h1>
                    <p className="mt-5 max-w-xl text-sm leading-7 text-white/85 md:text-base md:leading-8">
                      {banner.description}
                    </p>
                    <div className="mt-8 flex flex-wrap items-center gap-3">
                      <Button
                        size="lg"
                        nativeButton={false}
                        render={<Link href={banner.href} />}
                        className="px-5 shadow-lg shadow-primary/25"
                      >
                        查看更多
                        <ArrowRightIcon
                          data-icon="inline-end"
                          className="transition-transform group-hover/button:translate-x-0.5"
                        />
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        nativeButton={false}
                        render={<Link href="/join" />}
                        className="border-white/40 bg-white/10 px-5 text-white backdrop-blur hover:bg-white hover:text-foreground"
                      >
                        加入本會
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 hidden border-white/40 bg-white/15 text-white backdrop-blur hover:bg-white hover:text-foreground md:flex" />
        <CarouselNext className="right-4 hidden border-white/40 bg-white/15 text-white backdrop-blur hover:bg-white hover:text-foreground md:flex" />

        <div className="absolute inset-x-0 bottom-7 flex justify-center gap-2">
          {banners.map((banner, index) => (
            <button
              key={banner.title}
              type="button"
              aria-label={`前往第 ${index + 1} 張：${banner.title}`}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                index === current
                  ? "w-8 bg-white"
                  : "w-3 bg-white/40 hover:bg-white/70",
              )}
            />
          ))}
        </div>
      </Carousel>
    </section>
  );
}
