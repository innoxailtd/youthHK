import { SectionHeading } from "@/components/layout/section-heading";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type Crumb = {
  href?: string;
  label: string;
};

export function PageHero({
  title,
  description,
  crumbs,
}: {
  title: string;
  description?: string;
  crumbs: Crumb[];
}) {
  return (
    <section className="relative overflow-hidden border-b bg-muted/50">
      <div
        className="absolute inset-0 bg-linear-to-br from-primary/6 via-transparent to-transparent"
        aria-hidden
      />
      <div
        className="absolute top-0 right-0 hidden h-full w-1/3 md:block"
        aria-hidden
      >
        <div className="absolute -top-16 -right-16 size-64 rounded-full border-[20px] border-primary/5" />
        <div className="absolute top-24 right-24 size-32 rounded-full border-[12px] border-primary/4" />
      </div>
      <div className="relative mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
        <Breadcrumb>
          <BreadcrumbList>
            {crumbs.map((crumb, index) => (
              <span key={`${crumb.label}-${index}`} className="contents">
                {index > 0 ? <BreadcrumbSeparator /> : null}
                <BreadcrumbItem>
                  {crumb.href ? (
                    <BreadcrumbLink href={crumb.href}>
                      {crumb.label}
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              </span>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
        <SectionHeading title={title} className="mt-4 mb-0" />
        {description ? (
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
}
