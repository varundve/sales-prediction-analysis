import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { SalesDashboard } from "@/components/sales-dashboard"

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")

  if (!token) {
    redirect("/auth/login")
  }

  // Pass empty user object or retrieve from cookie if possible, but SalesDashboard expects specific User type
  // I will update SalesDashboard to accept a simpler user object or none.
  // For now, I'll pass a dummy object or null, and let the client component handle it.
  // Actually, SalesDashboard uses `user` prop for header.

  // Let's assume we can get user info from cookie or just pass undefined and let client fetch if needed.
  // However, `SalesDashboard` is a client component which takes `user` prop.
  // I'll update SalesDashboard to not require `user` prop strictly or use a flexible type.

  return <SalesDashboard />
}
