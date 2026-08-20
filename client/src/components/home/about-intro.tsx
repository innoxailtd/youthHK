import Image from "next/image";
import Link from "next/link";

import { SectionHeading } from "@/components/layout/section-heading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { about } from "@/lib/data/about";
import { site } from "@/lib/data/site";

export function AboutIntro() {
  return (
    <section className="relative overflow-hidden py-20 md:py-24">
      <Image
        src="/images/updates/mountain-run-2025.jpg"
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-black/25" />
      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow="ABOUT"
          title="介紹"
          className="mb-8 [&_h2]:text-white [&>div:last-child]:bg-white/25 [&>div:last-child>div]:bg-white"
        />
        <div className="grid items-center gap-8 md:grid-cols-[1.1fr_0.9fr]">
          <Card className="border-white/20 bg-white/95 shadow-2xl backdrop-blur">
            <CardHeader>
              <CardTitle className="font-heading text-2xl font-bold">
                {site.name}
              </CardTitle>
              <CardDescription className="text-base leading-7">
                {about.lead}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-7 text-muted-foreground">
                {about.mission}
              </p>
              <p className="mt-4 border-l-2 border-primary pl-3 text-sm leading-7 font-medium text-primary">
                {site.slogan}
              </p>
            </CardContent>
            <CardFooter className="flex-wrap gap-2">
              <Button nativeButton={false} render={<Link href="/join" />}>
                加入我們
              </Button>
              <Button
                variant="outline"
                nativeButton={false}
                render={<Link href="/contact" />}
              >
                聯絡我們
              </Button>
            </CardFooter>
          </Card>
          <div className="grid gap-4">
            {about.highlights.map((item) => (
              <Card
                key={item.title}
                className="group border-white/15 bg-white/10 py-4 text-white backdrop-blur transition-colors duration-300 hover:border-white/35 hover:bg-white/15"
              >
                <CardHeader className="px-5">
                  <CardTitle className="flex items-center gap-2.5 text-base">
                    <span
                      className="h-3.5 w-1 shrink-0 rounded-full bg-primary transition-transform duration-300 group-hover:scale-y-125"
                      aria-hidden
                    />
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-6 text-white/80">
                    {item.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
        <p className="mt-5 text-xs text-white/75">
          （本會有權拒絕任何的申請，無需向申請者給予任何的解釋。）
        </p>
      </div>
    </section>
  );
}
