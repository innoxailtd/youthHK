"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MailIcon, MenuIcon, PhoneIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { site } from "@/lib/data/site";
import { isFileHref, navigation } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();

  const isActive = (item: (typeof navigation)[number]) =>
    item.href === "/"
      ? pathname === "/"
      : pathname === item.href ||
        pathname.startsWith(`${item.href}/`) ||
        (item.children?.some(
          (child) =>
            pathname === child.href || pathname.startsWith(`${child.href}/`),
        ) ??
          false);

  return (
    <header className="sticky top-0 z-50 shadow-xs">
      <div className="hidden bg-[#171717] text-white/85 sm:block">
        <div className="mx-auto flex h-9 max-w-6xl items-center justify-between gap-4 px-4 text-xs md:px-6">
          <p className="truncate tracking-wide text-white/70">
            凝聚青年力量　貢獻社會　促進香港與內地青少年交流
          </p>
          <div className="flex shrink-0 items-center gap-5">
            <a
              href={`tel:${site.phones[0]}`}
              className="flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <PhoneIcon className="size-3" />
              {site.phones.join(" / ")}
            </a>
            <a
              href={`mailto:${site.emails[0]}`}
              className="flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <MailIcon className="size-3" />
              {site.emails[0]}
            </a>
          </div>
        </div>
      </div>

      <div className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/85">
        <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between gap-4 px-4 md:px-6">
          <Link href="/" className="flex min-w-0 items-center gap-2.5 sm:gap-3">
            <span className="block h-11 w-10 shrink-0 overflow-hidden">
              <Image
                src="/logo.svg"
                alt={site.name}
                width={160}
                height={60}
                className="h-11 w-auto max-w-none"
                priority
              />
            </span>
            <span className="min-w-0">
              <span className="block font-heading text-base font-bold tracking-wide sm:text-lg">
                {site.name}
              </span>
              <span className="block text-[9px] font-medium tracking-[0.06em] text-muted-foreground uppercase sm:text-[10px] sm:tracking-[0.14em]">
                {site.nameEn}
              </span>
            </span>
          </Link>

          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              {navigation.map((item) =>
                item.children ? (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuTrigger
                      className={cn(
                        isActive(item) && "text-primary data-[popup-open]:text-primary",
                      )}
                    >
                      {item.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-48 gap-0.5 p-1">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <NavigationMenuLink
                              render={
                                isFileHref(child.href) ? (
                                  <a
                                    href={child.href}
                                    target="_blank"
                                    rel="noreferrer"
                                  />
                                ) : (
                                  <Link href={child.href} />
                                )
                              }
                            >
                              {child.title}
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuLink
                      render={<Link href={item.href} />}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        isActive(item) && "text-primary",
                      )}
                    >
                      {item.title}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ),
              )}
            </NavigationMenuList>
          </NavigationMenu>

        <div className="flex items-center gap-2">
          <Button
            nativeButton={false}
            render={<Link href="/join" />}
            className="hidden sm:inline-flex"
          >
            加入本會
          </Button>

          <Sheet>
            <SheetTrigger
              render={
                <Button variant="outline" size="icon" className="lg:hidden" />
              }
            >
              <MenuIcon />
              <span className="sr-only">開啟選單</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetTitle className="sr-only">網站選單</SheetTitle>
              <nav className="flex flex-col px-4 pt-12 pb-6">
                {navigation.map((item) =>
                  item.children ? (
                    <Accordion key={item.title}>
                      <AccordionItem value={item.title}>
                        <AccordionTrigger>{item.title}</AccordionTrigger>
                        <AccordionContent>
                          <div className="flex flex-col gap-2 pl-1">
                            {item.children.map((child) => (
                              <SheetClose
                                key={child.href}
                                render={
                                  isFileHref(child.href) ? (
                                    <a
                                      href={child.href}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="text-muted-foreground hover:text-foreground"
                                    />
                                  ) : (
                                    <Link
                                      href={child.href}
                                      className="text-muted-foreground hover:text-foreground"
                                    />
                                  )
                                }
                              >
                                {child.title}
                              </SheetClose>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ) : (
                    <SheetClose
                      key={item.href}
                      render={
                        <Link
                          href={item.href}
                          className="border-b py-2.5 text-sm font-medium"
                        />
                      }
                    >
                      {item.title}
                    </SheetClose>
                  ),
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        </div>
      </div>
    </header>
  );
}
