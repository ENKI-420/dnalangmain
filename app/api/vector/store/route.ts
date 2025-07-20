import { type NextRequest, NextResponse } from "next/server"
import { generateEmbedding } from "@/lib/embeddings"
import { upsertVectorMemory } from "@/lib/pinecone"
import { storeVectorMemory } from "@/lib/supabase"
import { v4 as uuidv4 } from "uuid"

export async function POST(request: NextRequest) {
  try {
    const { content, metadata, useSupabase = false } = await request.json()

    if (!content) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 })
    }

    // Generate embedding for the content
    const embedding = await generateEmbedding(content)
    const id = uuidv4()

    if (useSupabase) {
      // Store in Supabase
      const result = await storeVectorMemory({
        content,
        embedding,
        metadata: {
          ...metadata,
          timestamp: new Date().toISOString(),
        },
      })
      return NextResponse.json({ id: result.id, success: true })
    } else {
      // Store in Pinecone
      await upsertVectorMemory(id, embedding, {
        content,
        ...metadata,
        timestamp: new Date().toISOString(),
      })
      return NextResponse.json({ id, success: true })
    }
  } catch (error) {
    console.error("Vector storage error:", error)
    return NextResponse.json({ error: "Failed to store vector memory" }, { status: 500 })
  }
}
