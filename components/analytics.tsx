"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"
import { TrendingUp, Eye, Clock as Click, Share2 } from "lucide-react"
import { Card } from "@/components/ui/card"

export function Analytics() {
  const data = [
    { month: "Jan", views: 4000, clicks: 2400, shares: 2400 },
    { month: "Feb", views: 3000, clicks: 1398, shares: 2210 },
    { month: "Mar", views: 2000, clicks: 9800, shares: 2290 },
    { month: "Apr", views: 2780, clicks: 3908, shares: 2000 },
    { month: "May", views: 1890, clicks: 4800, shares: 2181 },
    { month: "Jun", views: 2390, clicks: 3800, shares: 2500 },
  ]

  const stats = [
    { label: "Total Views", value: "18,640", icon: Eye, color: "bg-blue-100 text-blue-600" },
    { label: "Total Clicks", value: "23,108", icon: Click, color: "bg-green-100 text-green-600" },
    { label: "Total Shares", value: "12,481", icon: Share2, color: "bg-purple-100 text-purple-600" },
    { label: "Avg Engagement", value: "68%", icon: TrendingUp, color: "bg-orange-100 text-orange-600" },
  ]

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground mt-2">Track your trend performance and engagement metrics</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Views & Clicks Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="views" stroke="#3b82f6" />
              <Line type="monotone" dataKey="clicks" stroke="#10b981" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Engagement Metrics</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="views" fill="#3b82f6" />
              <Bar dataKey="clicks" fill="#10b981" />
              <Bar dataKey="shares" fill="#a855f7" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  )
}
