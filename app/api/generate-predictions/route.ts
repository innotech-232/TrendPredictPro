import { generateText } from "ai"
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

interface Prediction {
  videoId: string
  title: string
  confidence: number
  peakIn: number
  rating: number
  category: string
  brands: string[]
  trendScore: number
  generatedAt: string
}

// Analyze videos with Gemini using 26-factor framework
async function analyzeWithGemini(videos: YouTubeVideo[]): Promise<Prediction[]> {
  const videosSummary = videos
    .map(
      (v, idx) =>
        `Video ${idx + 1}: "${v.title}" | Views: ${v.viewCount.toLocaleString()} | Likes: ${v.likeCount.toLocaleString()} | Comments: ${v.commentCount.toLocaleString()} | Channel: ${v.channelTitle} | Published: ${v.publishedAt}`,
    )
    .join("\n")

  const prompt = `You are a trend analyst. Analyze these YouTube trending videos using 26 factors:

26-Factor Analysis Framework:
1. Growth Velocity - How fast the content is growing
2. Engagement Rate - Likes/views ratio
3. Content Quality - Production and relevance
4. Historical Performance - Channel's track record
5. Seasonality - Timing appropriateness
6. Competitor Analysis - Market saturation
7. Demographic Appeal - Age/gender/region reach
8. Platform Potential - Cross-platform viability
9. Sentiment Analysis - Positive reception
10. Viral Coefficient - Shareability factor
11. Audience Retention - Watch time percentage
12. Content Maturity - Longevity potential
13. Format Popularity - Video type demand
14. Niche Saturation - Market oversaturation
15. Influencer Potential - Celebrity/brand appeal
16. Commercial Viability - Monetization potential
17. Geo-Targeting - Regional strength (focus on India)
18. Time Sensitivity - Trend urgency
19. Hashtag Potential - Social searchability
20. Collaboration Opportunities - Partnership potential
21. Audience Loyalty - Repeat viewer percentage
22. Conversion Potential - CTR likelihood
23. Brand Safety - Advertiser-friendly rating
24. Content Authenticity - Genuine trend vs hype
25. Social Amplification - Retweet/share likelihood
26. Market Timing - Peak time prediction

Videos to analyze:
${videosSummary}

For each video, provide a JSON array response with objects containing:
- videoId: original video ID
- title: video title
- confidence: 0-100 confidence score
- peakIn: hours until peak (12-48)
- rating: 1-5 quality rating
- category: category name
- brands: array of related brands
- trendScore: 0-100 score

Return ONLY valid JSON array, no other text.`

  try {
    const { text } = await generateText({
      model: "google/gemini-1.5-mini",
      prompt,
      temperature: 0.7,
    })

    console.log("[v0] Gemini response:", text)

    // Parse the response
    const predictions = JSON.parse(text)

    // Add generation timestamp and ensure proper structure
    return predictions.map((p: any) => ({
      videoId: p.videoId || "",
      title: p.title || "Unknown Trend",
      confidence: Math.min(100, Math.max(0, p.confidence || 85)),
      peakIn: Math.max(12, Math.min(48, p.peakIn || 24)),
      rating: Math.min(5, Math.max(1, p.rating || 4)),
      category: p.category || "Entertainment",
      brands: Array.isArray(p.brands) ? p.brands : [],
      trendScore: Math.min(100, Math.max(0, p.trendScore || 80)),
      generatedAt: new Date().toISOString(),
    }))
  } catch (error) {
    console.error("[v0] Gemini analysis error:", error)
    throw error
  }
}

export async function POST(request: Request) {
  try {
    const { videos } = await request.json()

    if (!videos || !Array.isArray(videos) || videos.length === 0) {
      return NextResponse.json({ error: "No videos provided" }, { status: 400 })
    }

    console.log("[v0] Analyzing", videos.length, "videos with Gemini...")
    const predictions = await analyzeWithGemini(videos)

    console.log("[v0] Generated", predictions.length, "predictions")

    return NextResponse.json({
      success: true,
      predictions,
      count: predictions.length,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[v0] Prediction generation error:", error)
    return NextResponse.json({ error: "Failed to generate predictions", details: String(error) }, { status: 500 })
  }
}
