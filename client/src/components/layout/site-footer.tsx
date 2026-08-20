import Image from "next/image";
import Link from "next/link";
import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";

import { site } from "@/lib/data/site";
import { navigation } from "@/lib/nav";

function WeChatIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M8.7 4.2c-4.2 0-7.6 2.9-7.6 6.5 0 2.1 1.2 4 3.1 5.3l-.8 2.4 2.8-1.4c.8.2 1.6.4 2.5.4.3 0 .5 0 .8 0-.2-.6-.3-1.2-.3-1.8 0-3.5 3.3-6.4 7.4-6.4.3 0 .6 0 .9.1C16.7 6.4 13 4.2 8.7 4.2Zm-1.9 3.3a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm4.7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" />
      <path d="M20.6 12.4c0-2.9-2.9-5.3-6.4-5.3s-6.4 2.4-6.4 5.3 2.9 5.3 6.4 5.3c.7 0 1.3-.1 2-.3l2.3 1.2-.6-2c1.6-1.1 2.7-2.6 2.7-4.2Zm-8.3.8a.85.85 0 1 1 0-1.7.85.85 0 0 1 0 1.7Zm3.9 0a.85.85 0 1 1 0-1.7.85.85 0 0 1 0 1.7Z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M14.5 8.5V6.8c0-.7.5-1 1-1h1.7V3h-2.6C11.8 3 11 5 11 6.6v1.9H9v2.7h2V21h3.5v-9.8h2.4l.3-2.7h-2.7Z" />
    </svg>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-[#141414] text-white">
      <div className="h-1 bg-linear-to-r from-primary via-primary/70 to-primary/30" />
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="block h-10 w-9 shrink-0 overflow-hidden">
                <Image
                  src="/logo.svg"
                  alt={site.name}
                  width={160}
                  height={60}
                  className="h-10 w-auto max-w-none"
                />
              </span>
              <div>
                <p className="font-heading text-lg font-bold tracking-wide">
                  {site.name}
                </p>
                <p className="text-[10px] tracking-[0.14em] text-white/50 uppercase">
                  {site.nameEn}
                </p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-7 text-white/65">
              {site.description}
            </p>
            <div className="mt-5 flex items-center gap-3">
              <Link
                href={site.social.wechat}
                aria-label="微信"
                className="grid size-9 place-items-center rounded-full bg-white/10 text-white/85 transition-colors hover:bg-primary hover:text-white"
              >
                <WeChatIcon className="size-4.5" />
              </Link>
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="grid size-9 place-items-center rounded-full bg-white/10 text-white/85 transition-colors hover:bg-primary hover:text-white"
              >
                <FacebookIcon className="size-4.5" />
              </a>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold tracking-widest text-white/90">
              網站導覽
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 md:grid-cols-1">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/65 transition-colors hover:text-white"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold tracking-widest text-white/90">
              聯絡我們
            </p>
            <ul className="mt-4 space-y-3 text-sm text-white/65">
              <li className="flex items-start gap-2.5">
                <MapPinIcon className="mt-1 size-4 shrink-0 text-primary" />
                <span className="leading-6">{site.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <PhoneIcon className="size-4 shrink-0 text-primary" />
                <a
                  href={`tel:${site.phones[0]}`}
                  className="transition-colors hover:text-white"
                >
                  {site.phones.join(" / ")}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MailIcon className="size-4 shrink-0 text-primary" />
                <a
                  href={`mailto:${site.email}`}
                  className="transition-colors hover:text-white"
                >
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row">
          <p>
            © {year} {site.copyright} All Rights Reserved
          </p>
          <p>
            <Link
              href="/legal/disclaimer"
              className="transition-colors hover:text-white"
            >
              免責聲明
            </Link>
            <span className="px-2.5 text-white/25">|</span>
            <Link
              href="/legal/privacy"
              className="transition-colors hover:text-white"
            >
              隱私聲明
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
