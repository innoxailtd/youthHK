import type { Metadata } from "next";

import { PageHero } from "@/components/layout/page-hero";
import {
  type OrgGroup,
  type OrgMember,
  organizationCommittees,
  organizationGroups,
  organizationTerm,
  organizationTitle,
} from "@/lib/data/organization";

export const metadata: Metadata = {
  title: "組織架構",
};

function roleRows(members: OrgMember[]) {
  const rows: { role?: string; members: OrgMember[] }[] = [];

  for (const member of members) {
    const last = rows.at(-1);
    if (last && last.role === member.role) {
      last.members.push(member);
    } else {
      rows.push({ role: member.role, members: [member] });
    }
  }

  return rows;
}

function NameList({
  members,
  className = "",
}: {
  members: OrgMember[];
  className?: string;
}) {
  return (
    <p className={`text-sm font-medium leading-8 ${className}`}>
      {members.map((member) => member.name).join("、")}
    </p>
  );
}

function GroupCard({ group }: { group: OrgGroup }) {
  const rows = roleRows(group.members);
  const hasRoles = rows.some((row) => row.role);

  return (
    <section className="flex flex-col overflow-hidden rounded-2xl border bg-card shadow-xs">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b bg-muted/40 px-5 py-3.5 md:px-6">
        <h2 className="flex items-center gap-2.5 font-heading text-base font-bold md:text-lg">
          <span className="h-4 w-1 rounded-full bg-primary" aria-hidden />
          {group.title}
        </h2>
        {group.note ? (
          <p className="text-xs text-muted-foreground">（{group.note}）</p>
        ) : null}
      </div>
      <div className="flex-1 px-5 py-5 md:px-6">
        {hasRoles ? (
          <dl className="space-y-3.5">
            {rows.map((row) => (
              <div
                key={row.role ?? "members"}
                className="flex flex-col gap-1.5 sm:flex-row sm:gap-4"
              >
                <dt className="w-28 shrink-0 pt-1 text-sm font-medium text-primary">
                  {row.role}
                </dt>
                <dd className="min-w-0 flex-1">
                  <NameList members={row.members} />
                </dd>
              </div>
            ))}
          </dl>
        ) : (
          <NameList members={group.members} />
        )}
      </div>
    </section>
  );
}

function groupRows(groups: OrgGroup[]) {
  // Wide groups take a full row; consecutive compact groups share one row.
  const rows: OrgGroup[][] = [];

  for (const group of groups) {
    const last = rows.at(-1);
    if (
      group.members.length <= 4 &&
      last &&
      last.every((item) => item.members.length <= 4) &&
      last.length < 3
    ) {
      last.push(group);
    } else {
      rows.push([group]);
    }
  }

  return rows;
}

const gridCols = {
  1: "",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
} as const;

export default function OrganizationPage() {
  return (
    <>
      <PageHero
        title="組織架構"
        description={`${organizationTitle}（${organizationTerm}）`}
        crumbs={[
          { href: "/", label: "首頁" },
          { href: "/about", label: "關於本會" },
          { label: "組織架構" },
        ]}
      />
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-14 md:px-6">
        {groupRows(organizationGroups).map((row) => (
          <div
            key={row[0].title}
            className={`grid gap-6 ${gridCols[row.length as 1 | 2 | 3]}`}
          >
            {row.map((group) => (
              <GroupCard key={group.title} group={group} />
            ))}
          </div>
        ))}

        <section className="pt-8">
          <div className="flex items-center gap-2.5">
            <span className="h-5 w-1.5 rounded-full bg-primary" aria-hidden />
            <h2 className="font-heading text-xl font-bold tracking-tight">
              八個專責委員會
            </h2>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {organizationCommittees.map((committee) => (
              <div
                key={committee.title}
                className="flex flex-col overflow-hidden rounded-2xl border bg-card shadow-xs"
              >
                <h3 className="border-b bg-muted/40 px-5 py-3.5 font-heading text-base font-bold md:px-6">
                  {committee.title}
                </h3>
                <dl className="flex-1 space-y-3.5 px-5 py-5 md:px-6">
                  <div className="flex flex-col gap-1.5 sm:flex-row sm:gap-4">
                    <dt className="w-28 shrink-0 pt-1 text-sm font-medium text-primary">
                      召集人
                    </dt>
                    <dd className="min-w-0 flex-1">
                      <NameList members={[committee.convener]} />
                    </dd>
                  </div>
                  <div className="flex flex-col gap-1.5 sm:flex-row sm:gap-4">
                    <dt className="w-28 shrink-0 pt-1 text-sm font-medium text-primary">
                      副召集人
                    </dt>
                    <dd className="min-w-0 flex-1">
                      <NameList members={committee.deputyConveners} />
                    </dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
