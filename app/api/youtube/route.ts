import { NextResponse } from "next/server"

interface YouTubeVideo {
  videoId: string
  title: string
  viewCount: number
  likeCount: number
  commentCount: number
  publishedAt: string
  channelTitle: string
  description: string
}

// Fetch trending videos from YouTube Data API
async function fetchTrendingVideos(region = "IN", maxResults = 50): Promise<YouTubeVideo[]> {
  const apiKey = process.env.YOUTUBE_API_KEY

  if (!apiKey) {
    throw new Error("YOUTUBE_API_KEY not configured")
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&chart=trending&regionCode=${region}&maxResults=${maxResults}&key=${apiKey}`,
    )

    if (!response.ok) {
      console.error("[v0] YouTube API error:", response.statusText)
      throw new Error("YouTube API request failed")
    }

    const data = await response.json()

    return data.items.map((item: any) => ({
      videoId: item.id,
      title: item.snippet.title,
      viewCount: Number.parseInt(item.statistics.viewCount || "0"),
      likeCount: Number.parseInt(item.statistics.likeCount || "0"),
      commentCount: Number.parseInt(item.statistics.commentCount || "0"),
      publishedAt: item.snippet.publishedAt,
      channelTitle: item.snippet.channelTitle,
      description: item.snippet.description,
    }))
  } catch (error) {
    console.error("[v0] Error fetching YouTube videos:", error)
    throw error
  }
}

export async function GET() {
  try {
    const videos = await fetchTrendingVideos()

    return NextResponse.json({
      success: true,
      videos,
      count: videos.length,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[v0] YouTube fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch YouTube trends", details: String(error) }, { status: 500 })
  }
}
