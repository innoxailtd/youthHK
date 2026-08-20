import type { Metadata } from "next";
import Image from "next/image";

import { PageHero } from "@/components/layout/page-hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  partnerCategories,
  partners,
  partnersIntro,
} from "@/lib/data/partners";

export const metadata: Metadata = {
  title: "合作團體",
};

export default function PartnersPage() {
  return (
    <>
      <PageHero
        title="合作團體"
        description="本會與各界青年組織、社區團體及友好機構結伴同行。"
        crumbs={[
          { href: "/", label: "首頁" },
          { href: "/about", label: "關於本會" },
          { label: "合作團體" },
        ]}
      />
      <div className="mx-auto max-w-6xl space-y-10 px-4 py-14 md:px-6">
        <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <p className="text-base leading-8 text-muted-foreground">
            {partnersIntro}
          </p>
          <div className="relative aspect-16/10 overflow-hidden rounded-xl">
            <Image
              src="/images/gallery/partners.webp"
              alt="結伴同行"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 40vw, 100vw"
            />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {partnerCategories.map((category) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle>{category}機構</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid gap-2 text-sm leading-7">
                  {partners
                    .filter((partner) => partner.category === category)
                    .map((partner) => (
                      <li key={partner.name}>{partner.name}</li>
                    ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
