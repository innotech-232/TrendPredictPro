"use client"

import type React from "react"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { TrendingUp, CheckCircle, Zap, Calendar } from "lucide-react"
import Link from "next/link"

export function Dashboard() {
  const [moreMetrics] = useState({
    totalPredictions: 156,
    successRate: "87%",
    avgROI: "2.4x",
  })

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-start gap-4 animate-fade-in">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-2 text-sm md:text-base">
            Welcome back! Here's your performance overview.
          </p>
        </div>
        <Link
          href="/pricing"
          className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-lg font-semibold hover:shadow-lg transition-smooth text-sm md:text-base whitespace-nowrap"
        >
          Buy Credits
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <StatCard icon={TrendingUp} label="Active Trends" value="24" color="from-primary to-secondary" delay={0} />
        <StatCard
          icon={CheckCircle}
          label="Accuracy Score"
          value="92%"
          color="from-green-400 to-emerald-500"
          delay={75}
        />
        <StatCard
          icon={Zap}
          label="Earnings This Month"
          value="₹45K"
          color="from-yellow-400 to-orange-500"
          delay={150}
        />
        <StatCard
          icon={Calendar}
          label="Prediction Streak"
          value="15 Days"
          color="from-blue-400 to-cyan-500"
          delay={225}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <Card className="p-4 md:p-6 animate-fade-in" style={{ animationDelay: "300ms" }}>
          <h2 className="text-lg md:text-xl font-semibold mb-4">Trend Categories</h2>
          <div className="space-y-3">
            {["Fashion", "Tech", "Finance", "Health", "Education"].map((cat) => (
              <div
                key={cat}
                className="flex justify-between items-center p-3 bg-muted rounded-lg hover:bg-muted/80 transition-smooth"
              >
                <span className="font-medium text-sm md:text-base">{cat}</span>
                <span className="text-primary font-bold">{Math.floor(Math.random() * 40) + 10}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4 md:p-6 animate-fade-in" style={{ animationDelay: "375ms" }}>
          <h2 className="text-lg md:text-xl font-semibold mb-6">Platform Distribution</h2>
          <div className="space-y-4">
            {[
              { platform: "YouTube", count: 189, color: "from-red-500 to-red-600" },
              { platform: "TikTok", count: 156, color: "from-black to-gray-800" },
              { platform: "Instagram", count: 142, color: "from-pink-500 to-purple-600" },
            ].map((p) => (
              <div key={p.platform} className="flex justify-between items-center">
                <span className="text-sm font-medium">{p.platform}</span>
                <div className="w-24 md:w-32 bg-muted rounded-full h-2">
                  <div
                    className={`bg-gradient-to-r ${p.color} h-full rounded-full transition-smooth`}
                    style={{ width: `${(p.count / 189) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Coming Soon</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-3 rounded-xl border border-blue-200 dark:border-blue-800">
                <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">LinkedIn</p>
                <p className="text-xs text-blue-600 dark:text-blue-300 mt-1">Q1 2025</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 p-3 rounded-xl border border-purple-200 dark:border-purple-800">
                <p className="text-sm font-semibold text-purple-900 dark:text-purple-100">X (Twitter)</p>
                <p className="text-xs text-purple-600 dark:text-purple-300 mt-1">Q1 2025</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  color: string
  delay: number
}

function StatCard({ icon: Icon, label, value, color, delay }: StatCardProps) {
  return (
    <Card
      className="p-4 md:p-6 border border-border hover:shadow-lg transition-smooth animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs md:text-sm text-muted-foreground font-medium">{label}</p>
          <p className="text-2xl md:text-3xl font-bold text-foreground mt-2">{value}</p>
        </div>
        <div className={`bg-gradient-to-br ${color} p-3 rounded-lg`}>
          <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </div>
      </div>
    </Card>
  )
}
