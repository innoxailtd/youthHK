import type { Metadata } from "next";
import Image from "next/image";
import { MailIcon, MapPinIcon, PhoneIcon, PrinterIcon } from "lucide-react";

import { PageHero } from "@/components/layout/page-hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "聯絡我們",
};

const contacts = [
  {
    title: "會址",
    value: site.address,
    href: `https://maps.google.com/?q=${encodeURIComponent(site.address)}`,
    icon: MapPinIcon,
  },
  {
    title: "電話",
    value: site.phones.map((phone) => `(852) ${phone}`).join(" / "),
    href: `tel:${site.phones[0]}`,
    icon: PhoneIcon,
  },
  {
    title: "傳真",
    value: `(852) ${site.fax}`,
    href: `tel:${site.fax}`,
    icon: PrinterIcon,
  },
  {
    title: "電郵",
    value: site.emails.join(" / "),
    href: `mailto:${site.emails[0]}`,
    icon: MailIcon,
  },
];

const photos = [
  { src: "/images/contact/office.jpg", alt: "香港青年會會址" },
  { src: "/images/contact/social-1.webp", alt: "香港青年會社交平台" },
  { src: "/images/contact/social-2.webp", alt: "香港青年會聯絡二維碼" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="聯絡我們"
        description="歡迎就入會、合作或活動查詢與本會聯絡。"
        crumbs={[
          { href: "/", label: "首頁" },
          { label: "聯絡我們" },
        ]}
      />
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-14 md:px-6">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {contacts.map((item) => (
            <Card
              key={item.title}
              className="transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-lg hover:shadow-foreground/8"
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                    <item.icon className="size-4.5" />
                  </span>
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href={item.href}
                  className="text-sm leading-7 text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.value}
                </a>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          {photos.map((photo) => (
            <div
              key={photo.src}
              className="overflow-hidden rounded-2xl ring-1 ring-foreground/10"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={480}
                height={420}
                className="h-auto w-full object-cover"
              />
            </div>
          ))}
        </div>

        <div className="overflow-hidden rounded-2xl shadow-lg shadow-foreground/8 ring-1 ring-foreground/10">
          <iframe
            title="香港青年會會址"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(site.address)}&output=embed`}
            className="h-80 w-full border-0"
            loading="lazy"
          />
        </div>
      </div>
    </>
  );
}
