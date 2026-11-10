import type { Metadata } from "next";

import { AdminDashboard } from "@/components/admin/admin-dashboard";

export const metadata: Metadata = {
  title: "後台管理",
};

export default function AdminPage() {
  return <AdminDashboard />;
}
