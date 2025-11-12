"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  ShoppingCart,
  Users,
  TrendingUp,
  Trophy,
  DollarSign,
  Medal,
  Tag,
  Settings,
  User,
} from "lucide-react"

const navItems = [
  { icon: BarChart3, label: "Dashboard", href: "/" },
  { icon: ShoppingCart, label: "Marketplace", href: "/marketplace" },
  { icon: Users, label: "Collaborate", href: "/collaborate" },
  { icon: TrendingUp, label: "Analytics", href: "/analytics" },
  { icon: Trophy, label: "Success", href: "/success" },
  { icon: DollarSign, label: "ROI", href: "/roi" },
  { icon: Medal, label: "Rank", href: "/rank" },
  { icon: Tag, label: "Pricing", href: "/pricing" },
  { icon: Settings, label: "Settings", href: "/settings" },
  { icon: User, label: "Profile", href: "/profile" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white border-r border-border h-screen sticky top-0 overflow-y-auto max-md:hidden lg:block">
      <div className="p-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-slide-up">
          TrendPredict
        </h1>
        <p className="text-xs text-muted-foreground mt-1">Trend Marketplace</p>
      </div>

      <nav className="space-y-1 px-4">
        {navItems.map(({ icon: Icon, label, href }, index) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all hover:scale-105 ${
                isActive
                  ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground font-medium shadow-lg"
                  : "text-foreground hover:bg-primary/10"
              }`}
              style={{
                animation: `fadeIn 0.3s ease-out ${index * 50}ms both`,
              }}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm">{label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
