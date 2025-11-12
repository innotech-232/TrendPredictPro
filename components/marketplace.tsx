"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Clock, Zap, RefreshCw } from "lucide-react"
import { useState, useEffect } from "react"

interface Prediction {
  id: number
  videoId: string
  title: string
  category: string
  brands: string[]
  confidence: number
  rating: number
  reviews: number
  peakIn: number
  price: number
  trend: number[]
  generatedAt: string
  views: number
  engagement: number
  momentum: string
}

export function Marketplace() {
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [purchasedIds, setPurchasedIds] = useState<number[]>([])
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [nextRefresh, setNextRefresh] = useState<string>("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<"confidence" | "rating" | "peak">("confidence")

  useEffect(() => {
    fetchPredictions()

    const interval = setInterval(fetchPredictions, 60000)
    return () => clearInterval(interval)
  }, [])

  const fetchPredictions = async () => {
    try {
      setIsLoading(true)
      const res = await fetch("/api/predictions")

      if (!res.ok) {
        console.error("[v0] API error:", res.status, res.statusText)
        throw new Error(`API error: ${res.status}`)
      }

      const data = await res.json()

      if (data.success && data.predictions) {
        setPredictions(data.predictions)
        if (data.nextRefresh) {
          setNextRefresh(new Date(data.nextRefresh).toLocaleString())
        }
      } else if (!data.success) {
        console.error("[v0] API returned error:", data.error)
      }
    } catch (error) {
      console.error("[v0] Failed to fetch predictions:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleManualRefresh = async () => {
    setIsRefreshing(true)
    try {
      const res = await fetch("/api/predictions", { method: "POST" })
      const data = await res.json()

      if (data.success && data.predictions) {
        setPredictions(data.predictions)
      }
    } catch (error) {
      console.error("[v0] Refresh failed:", error)
    } finally {
      setIsRefreshing(false)
    }
  }

  const handlePurchase = (id: number) => {
    setPurchasedIds([...purchasedIds, id])
    setTimeout(() => {
      setPurchasedIds((prev) => prev.filter((p) => p !== id))
    }, 2000)
  }

  const filteredPredictions = predictions
    .filter((p) => categoryFilter === "all" || p.category === categoryFilter)
    .sort((a, b) => {
      if (sortBy === "confidence") return b.confidence - a.confidence
      if (sortBy === "rating") return b.rating - a.rating
      return a.peakIn - b.peakIn
    })

  const categories = Array.from(new Set(predictions.map((p) => p.category)))

  return (
    <div className="p-4 md:p-8 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="mb-8 animate-slide-up">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground to-secondary bg-clip-text text-transparent">
              Marketplace
            </h1>
            {nextRefresh && <p className="text-xs text-muted-foreground mt-2">Next refresh: {nextRefresh}</p>}
          </div>
          <Button
            onClick={handleManualRefresh}
            disabled={isRefreshing}
            className="bg-gradient-to-r from-primary to-secondary text-primary-foreground flex items-center gap-2 whitespace-nowrap hover:shadow-lg hover:scale-105 transition-all"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? "Updating..." : "Refresh Now"}
          </Button>
        </div>
      </div>

      {!isLoading && predictions.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-3 animate-slide-up" style={{ animationDelay: "100ms" }}>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={categoryFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setCategoryFilter("all")}
              className="text-xs hover:scale-105 transition-all"
            >
              All Categories
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={categoryFilter === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setCategoryFilter(cat)}
                className="text-xs hover:scale-105 transition-all"
              >
                {cat}
              </Button>
            ))}
          </div>
          <div className="flex gap-2 ml-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1 border border-border rounded-lg text-xs bg-background hover:border-primary transition-colors"
            >
              <option value="confidence">Sort: Confidence</option>
              <option value="rating">Sort: Rating</option>
              <option value="peak">Sort: Peak Time</option>
            </select>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="flex flex-col justify-center items-center h-64 gap-4">
          <div className="relative w-12 h-12">
            <RefreshCw className="w-12 h-12 text-primary animate-spin" />
            <div className="absolute inset-0 animate-pulse-glow rounded-full" />
          </div>
          <p className="text-muted-foreground">Generating AI predictions...</p>
        </div>
      ) : filteredPredictions.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">No predictions available. Try refreshing or check back later.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredPredictions.map((prediction, index) => (
            <div key={prediction.id} style={{ animationDelay: `${index * 75}ms` }} className="animate-slide-up">
              <PredictionCard
                prediction={prediction}
                isPurchased={purchasedIds.includes(prediction.id)}
                onPurchase={() => handlePurchase(prediction.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

interface PredictionCardProps {
  prediction: Prediction
  isPurchased: boolean
  onPurchase: () => void
}

function PredictionCard({ prediction, isPurchased, onPurchase }: PredictionCardProps) {
  return (
    <Card className="overflow-hidden border border-border hover:border-primary hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 group">
      <div className="relative">
        <div className="absolute top-3 right-3 bg-secondary/20 text-secondary text-xs font-bold px-2 py-1 rounded-full animate-pulse">
          {prediction.momentum}
        </div>
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 h-24 flex items-end gap-1 justify-center">
          {prediction.trend.map((value, i) => (
            <div
              key={i}
              className="flex-1 bg-gradient-to-t from-primary to-secondary rounded-t opacity-70 hover:opacity-100 transition-all"
              style={{
                height: `${(value / 100) * 100}%`,
                animation: `slideInRight ${0.3 + i * 0.05}s ease-out`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="p-4 md:p-6">
        <div className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-3 group-hover:bg-primary/20 transition-colors">
          {prediction.category}
        </div>

        <h3 className="text-base md:text-lg font-bold text-foreground mb-2 line-clamp-2">{prediction.title}</h3>

        <div className="flex flex-wrap gap-2 mb-4">
          {prediction.brands.slice(0, 3).map((brand) => (
            <span
              key={brand}
              className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded hover:bg-primary/20 transition-colors"
            >
              {brand}
            </span>
          ))}
        </div>

        <div className="mb-4 space-y-3">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-semibold text-foreground">Confidence</span>
              <span className="text-sm font-bold text-primary">{prediction.confidence}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-gradient-to-r from-primary to-secondary h-full rounded-full transition-all"
                style={{ width: `${prediction.confidence}%` }}
              />
            </div>
          </div>
          <div className="text-xs text-muted-foreground flex justify-between">
            <span>{prediction.views.toLocaleString()} views</span>
            <span>{prediction.engagement}% engagement</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-primary text-primary" />
            <span className="font-semibold">{prediction.rating.toFixed(1)}</span>
            <span className="text-muted-foreground text-xs">({prediction.reviews})</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-secondary" />
            <span className="font-semibold text-xs">Peak {prediction.peakIn}h</span>
          </div>
        </div>

        <div className="border-t border-border my-4" />

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary animate-float" />
            <span className="font-bold text-foreground text-sm md:text-base">{prediction.price}</span>
          </div>
          <Button
            onClick={onPurchase}
            className={`px-3 md:px-4 py-2 rounded-lg font-semibold transition-all text-xs md:text-sm ${
              isPurchased
                ? "bg-green-500 text-white"
                : "bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:shadow-lg hover:scale-105"
            }`}
          >
            {isPurchased ? "✓ Purchased" : "Buy Now"}
          </Button>
        </div>
      </div>
    </Card>
  )
}
