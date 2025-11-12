"use client"

import { DollarSign, TrendingUp, Wallet, PieChart } from "lucide-react"
import { Card } from "@/components/ui/card"
import { PieChart as RePieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts"

export function ROI() {
  const roiData = [
    { name: "Profitable Predictions", value: 65, color: "#10b981" },
    { name: "Neutral", value: 20, color: "#f59e0b" },
    { name: "Learning Losses", value: 15, color: "#ef4444" },
  ]

  const topTrends = [
    { trend: "AI Technology", investment: 500, return: 1450, roi: "190%" },
    { trend: "Gaming Metaverse", investment: 300, return: 720, roi: "140%" },
    { trend: "Electric Vehicles", investment: 400, return: 820, roi: "105%" },
    { trend: "Crypto Bull", investment: 200, return: 280, roi: "40%" },
  ]

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">ROI Tracking</h1>
        <p className="text-muted-foreground mt-2">Monitor your investment returns and profitability</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Invested</p>
              <p className="text-3xl font-bold mt-1">₹8,450</p>
            </div>
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
              <Wallet className="w-6 h-6" />
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Returns</p>
              <p className="text-3xl font-bold mt-1">₹14,270</p>
            </div>
            <div className="p-3 bg-green-100 text-green-600 rounded-lg">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Overall ROI</p>
              <p className="text-3xl font-bold mt-1">68%</p>
            </div>
            <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <PieChart className="w-5 h-5" />
            Prediction Outcomes
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <RePieChart>
              <Pie data={roiData} cx="50%" cy="50%" labelLine={false} label>
                {roiData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </RePieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Top Performing Trends</h2>
          <div className="space-y-3">
            {topTrends.map((trend) => (
              <div key={trend.trend} className="p-3 bg-muted rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-sm">{trend.trend}</p>
                  <p className="text-green-600 font-semibold text-sm">{trend.roi}</p>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Invested: ₹{trend.investment}</span>
                  <span>Returns: ₹{trend.return}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
