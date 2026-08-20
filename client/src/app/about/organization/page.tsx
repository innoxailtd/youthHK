import type { Metadata } from "next";

import { PageHero } from "@/components/layout/page-hero";
import {
  type OrgMember,
  organizationGroups,
  organizationTitle,
} from "@/lib/data/organization";

export const metadata: Metadata = {
  title: "組織架構",
};

function MemberChip({ member }: { member: OrgMember }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border bg-card py-2 pr-4 pl-3 shadow-xs transition-colors hover:border-primary/30">
      {member.role ? (
        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium whitespace-nowrap text-primary">
          {member.role}
        </span>
      ) : (
        <span className="size-1.5 rounded-full bg-primary/50" aria-hidden />
      )}
      <span className="text-sm font-medium">{member.name}</span>
      {member.honorific ? (
        <span className="text-xs text-muted-foreground">{member.honorific}</span>
      ) : null}
    </span>
  );
}

export default function OrganizationPage() {
  return (
    <>
      <PageHero
        title="組織架構"
        description={organizationTitle}
        crumbs={[
          { href: "/", label: "首頁" },
          { href: "/about", label: "關於本會" },
          { label: "組織架構" },
        ]}
      />
      <div className="mx-auto max-w-6xl space-y-12 px-4 py-14 md:px-6">
        {organizationGroups.map((group) => (
          <section key={group.title}>
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h2 className="flex items-center gap-2.5 font-heading text-xl font-bold tracking-tight">
                <span
                  className="h-5 w-1.5 rounded-full bg-primary"
                  aria-hidden
                />
                {group.title}
              </h2>
              {group.note ? (
                <p className="text-xs text-muted-foreground">（{group.note}）</p>
              ) : null}
            </div>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {group.members.map((member, index) => (
                <MemberChip
                  key={`${member.role ?? ""}${member.name}${index}`}
                  member={member}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
