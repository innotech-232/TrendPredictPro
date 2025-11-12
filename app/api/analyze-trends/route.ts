import { generateText } from "ai"
import { NextResponse } from "next/server"

interface YouTubeVideo {
  videoId: string
  title: string
  viewCount: number
  likeCount: number
  commentCount: number
  publishedAt: string
}

// Simulated YouTube API call (in production, use youtube.googleapis.com/youtube/v3)
async function fetchTrendingVideos(): Promise<YouTubeVideo[]> {
  return [
    {
      videoId: "dQw4w9WgXcQ",
      title: "Desi Street Food Revival - New Recipes",
      viewCount: 2500000,
      likeCount: 185000,
      commentCount: 42000,
      publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      videoId: "jNQXAC9IVRw",
      title: "AI Fitness Tracking Revolution",
      viewCount: 1800000,
      likeCount: 125000,
      commentCount: 35000,
      publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ]
}

async function analyzeWithGemini(videos: YouTubeVideo[]) {
  const videosSummary = videos
    .map(
      (v) =>
        `Video: "${v.title}", Views: ${v.viewCount}, Likes: ${v.likeCount}, Comments: ${v.commentCount}, Published: ${v.publishedAt}`,
    )
    .join("\n")

  const { text } = await generateText({
    model: "openai/gpt-4-mini",
    prompt: `Analyze these YouTube trending videos using 26 factors: growth velocity, engagement rate, content quality, historical performance, seasonality, competitor analysis, demographic appeal, platform potential, sentiment analysis, viral coefficient, audience retention, content maturity, format popularity, niche saturation, influencer potential, commercial viability, geo-targeting, time sensitivity, hashtag potential, collaboration opportunities, audience loyalty, conversion potential, brand safety, content authenticity, social amplification, and market timing.

Videos to analyze:
${videosSummary}

For each video, provide a JSON response with: title, confidence (0-100), peakIn (hours), rating (1-5), category, brands, and trend prediction score (0-100).

Return as JSON array.`,
  })

  return JSON.parse(text)
}

export async function POST(request: Request) {
  try {
    const videos = await fetchTrendingVideos()
    const predictions = await analyzeWithGemini(videos)

    return NextResponse.json({
      success: true,
      predictions,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Trend analysis error:", error)
    return NextResponse.json({ error: "Failed to analyze trends" }, { status: 500 })
  }
}
