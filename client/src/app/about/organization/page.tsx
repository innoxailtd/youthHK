import type { Metadata } from "next";

import { PageHero } from "@/components/layout/page-hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  organizationGroups,
  organizationTitle,
  pastChairs,
} from "@/lib/data/organization";

export const metadata: Metadata = {
  title: "組織架構",
};

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
      <div className="mx-auto max-w-6xl space-y-10 px-4 py-14 md:px-6">
        <div className="grid gap-5 md:grid-cols-2">
          {organizationGroups.map((group) => (
            <Card key={group.title}>
              <CardHeader>
                <CardTitle>{group.title}</CardTitle>
                {group.note ? (
                  <p className="text-xs text-muted-foreground">{group.note}</p>
                ) : null}
              </CardHeader>
              <CardContent>
                <ul className="grid gap-2 text-sm leading-6 sm:grid-cols-2">
                  {group.members.map((member) => (
                    <li key={member}>{member}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <section>
          <h2 className="mb-4 text-2xl font-semibold tracking-tight">歷屆主席</h2>
          <div className="overflow-x-auto ring-1 ring-foreground/10">
            <table className="w-full min-w-xl text-left text-sm">
              <thead className="bg-primary text-primary-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">屆別</th>
                  <th className="px-4 py-3 font-medium">年份</th>
                  <th className="px-4 py-3 font-medium">主席</th>
                </tr>
              </thead>
              <tbody>
                {pastChairs.map((row) => (
                  <tr key={row.term} className="odd:bg-card even:bg-muted/60">
                    <td className="px-4 py-2.5">{row.term}</td>
                    <td className="px-4 py-2.5">{row.years}</td>
                    <td className="px-4 py-2.5">{row.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
}
