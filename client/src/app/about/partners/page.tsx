import type { Metadata } from "next";
import Image from "next/image";

import { PageHero } from "@/components/layout/page-hero";

export const metadata: Metadata = {
  title: "結伴同行",
};

const images = [
  {
    src: "/images/partners/collage-1.webp",
    alt: "結伴同行合作機構",
  },
  {
    src: "/images/partners/collage-2.webp",
    alt: "結伴同行友好團體",
  },
];

export default function PartnersPage() {
  return (
    <>
      <PageHero
        title="結伴同行"
        description="本會與各界青年組織、社區團體及友好機構結伴同行。"
        crumbs={[
          { href: "/", label: "首頁" },
          { href: "/about", label: "關於本會" },
          { label: "結伴同行" },
        ]}
      />
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-14 md:px-6">
        {images.map((image) => (
          <div
            key={image.src}
            className="overflow-hidden rounded-2xl ring-1 ring-foreground/10"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={1400}
              height={900}
              className="h-auto w-full"
            />
          </div>
        ))}
      </div>
    </>
  );
}
