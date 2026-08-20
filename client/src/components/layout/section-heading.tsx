import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function SectionHeading({
  title,
  eyebrow,
  action,
  className,
}: {
  title: string;
  eyebrow?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-10", className)}>
      <div className="flex items-end justify-between gap-4">
        <div>
          {eyebrow ? (
            <p className="flex items-center gap-2.5 text-xs font-semibold tracking-[0.28em] text-primary">
              <span className="h-3.5 w-1 rounded-full bg-primary" aria-hidden />
              {eyebrow}
            </p>
          ) : null}
          <h2 className="mt-2.5 font-heading text-2xl font-bold tracking-tight md:text-[2rem]">
            {title}
          </h2>
        </div>
        {action}
      </div>
      <div className="mt-5 h-px bg-border">
        <div className="h-[3px] w-16 -translate-y-px rounded-full bg-linear-to-r from-primary to-primary/40" />
      </div>
    </div>
  );
}
