"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Zap, RefreshCw } from "lucide-react"

interface GeneratedTrend {
  title: string
  confidence: number
  peakIn: number
  rating: number
  category: string
  brands: string[]
  trendScore: number
}

export function TrendGenerator() {
  const [isLoading, setIsLoading] = useState(false)
  const [trends, setTrends] = useState<GeneratedTrend[]>([])

  const generateTrends = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/analyze-trends", {
        method: "POST",
      })
      const data = await response.json()
      setTrends(data.predictions || [])
    } catch (error) {
      console.error("Error generating trends:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg border border-border">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold">Generate New Trends</h3>
          <p className="text-sm text-muted-foreground">Analyze YouTube trending with Gemini AI</p>
        </div>
        <Button
          onClick={generateTrends}
          disabled={isLoading}
          className="bg-gradient-to-r from-primary to-secondary text-primary-foreground"
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Zap className="w-4 h-4 mr-2" />
              Generate
            </>
          )}
        </Button>
      </div>

      {trends.length > 0 && (
        <div className="space-y-3 mt-4">
          <p className="text-sm font-semibold text-muted-foreground">Generated {trends.length} predictions</p>
          {trends.map((trend, i) => (
            <div key={i} className="p-3 bg-white rounded border border-border text-sm">
              <p className="font-semibold text-foreground">{trend.title}</p>
              <p className="text-muted-foreground text-xs">
                Confidence: {trend.confidence}% | Peak in: {trend.peakIn}h
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
