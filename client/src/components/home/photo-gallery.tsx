"use client";

import { useState } from "react";
import Image from "next/image";

import { ZoomInIcon } from "lucide-react";

import { SectionHeading } from "@/components/layout/section-heading";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { gallery } from "@/lib/data/gallery";

export function PhotoGallery() {
  const [active, setActive] = useState<(typeof gallery)[number] | null>(null);

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading eyebrow="GALLERY" title="相片集" />
        <Carousel opts={{ align: "start", loop: true }}>
          <CarouselContent>
            {gallery.map((item) => (
              <CarouselItem
                key={item.src}
                className="basis-1/2 sm:basis-1/3 md:basis-1/4"
              >
                <button
                  type="button"
                  onClick={() => setActive(item)}
                  className="group w-full text-left"
                >
                  <Card className="overflow-hidden py-0 shadow-none transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-foreground/10">
                    <div className="relative aspect-4/3">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-108"
                        sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                      />
                      <div className="absolute inset-0 flex items-end bg-linear-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <p className="line-clamp-2 p-3 text-xs leading-5 text-white">
                          {item.caption}
                        </p>
                      </div>
                      <span className="absolute top-3 right-3 grid size-8 place-items-center rounded-full bg-white/20 text-white opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100">
                        <ZoomInIcon className="size-4" />
                      </span>
                    </div>
                  </Card>
                  <p className="mt-2.5 line-clamp-1 text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                    {item.caption}
                  </p>
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-6 flex justify-center gap-2">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </Carousel>
      </div>

      <Dialog
        open={Boolean(active)}
        onOpenChange={(open) => {
          if (!open) setActive(null);
        }}
      >
        <DialogContent className="max-w-3xl overflow-hidden p-0 sm:max-w-3xl">
          {active ? (
            <>
              <div className="relative aspect-16/10 w-full">
                <Image
                  src={active.src}
                  alt={active.alt}
                  fill
                  className="object-cover"
                  sizes="768px"
                />
              </div>
              <DialogHeader className="px-5 pb-5">
                <DialogTitle>{active.caption}</DialogTitle>
                <DialogDescription>香港青年會活動相片</DialogDescription>
              </DialogHeader>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
}
