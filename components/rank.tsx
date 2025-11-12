"use client"

import { Medal, Crown } from "lucide-react"
import { Card } from "@/components/ui/card"

export function Rank() {
  const rankings = [
    { rank: 1, name: "Alex Trader", score: 2850, badge: "🏆", roi: "285%" },
    { rank: 2, name: "Sarah Prophet", score: 2620, badge: "🥈", roi: "268%" },
    { rank: 3, name: "Mike Analyst", score: 2480, badge: "🥉", roi: "242%" },
    { rank: 4, name: "You", score: 2145, badge: "⭐", roi: "180%" },
    { rank: 5, name: "Emma Trend", score: 1980, badge: "📈", roi: "165%" },
  ]

  const tiers = [
    { level: "Beginner", min: 0, max: 500, color: "bg-gray-100 text-gray-700" },
    { level: "Intermediate", min: 500, max: 1500, color: "bg-blue-100 text-blue-700" },
    { level: "Advanced", min: 1500, max: 2500, color: "bg-purple-100 text-purple-700" },
    { level: "Expert", min: 2500, max: 5000, color: "bg-yellow-100 text-yellow-700" },
    { level: "Legend", min: 5000, max: 10000, color: "bg-red-100 text-red-700" },
  ]

  const userRank = 4
  const userScore = 2145

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Global Rankings</h1>
        <p className="text-muted-foreground mt-2">Compete with other predictors and climb the leaderboard</p>
      </div>

      <Card className="p-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Your Current Rank</p>
            <p className="text-4xl font-bold mt-2"># {userRank}</p>
            <p className="text-lg text-primary font-semibold mt-1">{userScore} Points</p>
          </div>
          <div className="text-6xl">⭐</div>
        </div>
        <div className="mt-4 pt-4 border-t">
          <p className="text-sm font-medium mb-2">Rank Progression</p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-primary h-2 rounded-full" style={{ width: "43%" }} />
          </div>
          <p className="text-xs text-muted-foreground mt-1">1,355 points to Expert tier</p>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Medal className="w-5 h-5" />
            Rank Tiers
          </h2>
          <div className="space-y-2">
            {tiers.map((tier) => (
              <div key={tier.level} className={`p-3 rounded-lg ${tier.color}`}>
                <div className="flex items-center justify-between">
                  <p className="font-medium">{tier.level}</p>
                  <p className="text-xs">
                    {tier.min.toLocaleString()} - {tier.max.toLocaleString()} pts
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Crown className="w-5 h-5" />
            Leaderboard
          </h2>
          <div className="space-y-2">
            {rankings.map((entry) => (
              <div
                key={entry.rank}
                className={`p-3 rounded-lg ${entry.rank === userRank ? "bg-primary/10 border border-primary" : "bg-muted"}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold w-6">{entry.badge}</span>
                    <div>
                      <p className="font-medium">{entry.name}</p>
                      <p className="text-xs text-muted-foreground">{entry.score} points</p>
                    </div>
                  </div>
                  <p className="text-green-600 font-semibold">{entry.roi}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
