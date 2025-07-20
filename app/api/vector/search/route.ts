import { type NextRequest, NextResponse } from "next/server"
import { generateEmbedding } from "@/lib/embeddings"
import { queryVectorMemories } from "@/lib/pinecone"
import { searchVectorMemories } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const { query, limit = 10, threshold = 0.7, useSupabase = false } = await request.json()

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 })
    }

    // Generate embedding for the query
    const queryEmbedding = await generateEmbedding(query)

    let results

    if (useSupabase) {
      // Use Supabase for vector search
      results = await searchVectorMemories(queryEmbedding, limit, threshold)
    } else {
      // Use Pinecone for vector search
      const pineconeResults = await queryVectorMemories(queryEmbedding, limit)
      results = pineconeResults.map((match) => ({
        id: match.id,
        content: match.metadata?.content || "",
        similarity: match.score || 0,
        metadata: match.metadata,
      }))
    }

    return NextResponse.json({ results })
  } catch (error) {
    console.error("Vector search error:", error)
    return NextResponse.json({ error: "Failed to perform vector search" }, { status: 500 })
  }
}
