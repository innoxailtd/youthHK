import type { Metadata } from "next";
import Image from "next/image";

import { PageHero } from "@/components/layout/page-hero";
import { about } from "@/lib/data/about";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "簡介及宗旨",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="簡介及宗旨"
        description={`本會成立於${site.founded}，是本港一間非牟利青年團體。`}
        crumbs={[
          { href: "/", label: "首頁" },
          { href: "/about", label: "關於本會" },
          { label: "簡介及宗旨" },
        ]}
      />
      <article className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <div className="mb-10 overflow-hidden rounded-2xl shadow-lg shadow-foreground/8">
          <Image
            src="/images/about/hero.jpg"
            alt="關於香港青年會"
            width={1600}
            height={900}
            className="h-auto w-full"
            priority
          />
        </div>
        <p className="text-lg leading-8">{about.lead}</p>
        <p className="mt-4 text-base leading-8 text-muted-foreground">
          {about.mission}
        </p>
        <div className="mt-8 space-y-5 text-base leading-8 text-foreground/90">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <blockquote className="mt-10 rounded-r-2xl border-l-4 border-primary bg-primary/5 px-6 py-5 font-heading text-lg leading-8 font-semibold text-foreground/90">
          {site.slogan}
        </blockquote>
      </article>
    </>
  );
}
