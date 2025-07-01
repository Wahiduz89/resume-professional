// app/(dashboard)/layout.tsx
import { DashboardHeader } from '@/components/layout/dashboard-header'
import { MobileNav } from '@/components/layout/mobile-nav'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <main className="flex-1">
        {children}
      </main>
      <MobileNav />
    </div>
  )
}