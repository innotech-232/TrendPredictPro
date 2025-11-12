"use client"

import { Trophy, Star, TrendingUp, Target } from "lucide-react"
import { Card } from "@/components/ui/card"

export function Success() {
  const achievements = [
    { icon: Trophy, label: "Predictions Made", value: "128", color: "bg-yellow-100 text-yellow-600" },
    { icon: Star, label: "Success Rate", value: "87%", color: "bg-blue-100 text-blue-600" },
    { icon: TrendingUp, label: "Avg ROI", value: "245%", color: "bg-green-100 text-green-600" },
    { icon: Target, label: "Trends Mastered", value: "34", color: "bg-purple-100 text-purple-600" },
  ]

  const milestones = [
    { title: "First Prediction", date: "Jan 15, 2025", completed: true },
    { title: "100 Credits Earned", date: "Feb 8, 2025", completed: true },
    { title: "50 Successful Predictions", date: "Mar 20, 2025", completed: true },
    { title: "Top Predictor Rank", date: "In Progress", completed: false },
  ]

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Success Metrics</h1>
        <p className="text-muted-foreground mt-2">Your achievements and milestones</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {achievements.map((achievement) => (
          <Card key={achievement.label} className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className={`p-3 rounded-lg mb-3 ${achievement.color}`}>
                <achievement.icon className="w-6 h-6" />
              </div>
              <p className="text-2xl font-bold">{achievement.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{achievement.label}</p>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Milestones</h2>
        <div className="space-y-4">
          {milestones.map((milestone, index) => (
            <div key={milestone.title} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-4 h-4 rounded-full ${milestone.completed ? "bg-green-500" : "bg-gray-300"}`} />
                {index !== milestones.length - 1 && <div className="w-0.5 h-12 bg-gray-200 mt-1" />}
              </div>
              <div className="flex-1 pt-0.5">
                <p className="font-medium">{milestone.title}</p>
                <p className="text-sm text-muted-foreground">{milestone.date}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
