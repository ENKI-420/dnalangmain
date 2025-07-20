import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.SUPABASE_SUPABASE_URL!
const supabaseAnonKey = process.env.SUPABASE_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SUPABASE_SERVICE_ROLE_KEY!

// Client for browser/client-side operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Client for server-side operations with elevated privileges
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

// Database schema initialization
export async function initializeVectorSchema() {
  const { error } = await supabaseAdmin.rpc("create_vector_tables")
  if (error) {
    console.error("Error creating vector tables:", error)
    throw error
  }
}

// Vector memory operations
export interface VectorMemoryEntry {
  id: string
  content: string
  embedding: number[]
  metadata: {
    type: "code" | "mutation" | "conversation" | "insight"
    timestamp: string
    tags: string[]
    confidence: number
    source: string
  }
}

export async function storeVectorMemory(entry: Omit<VectorMemoryEntry, "id">) {
  const { data, error } = await supabaseAdmin
    .from("vector_memories")
    .insert({
      content: entry.content,
      embedding: entry.embedding,
      metadata: entry.metadata,
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function searchVectorMemories(queryEmbedding: number[], limit = 10, threshold = 0.7) {
  const { data, error } = await supabaseAdmin.rpc("match_vector_memories", {
    query_embedding: queryEmbedding,
    match_threshold: threshold,
    match_count: limit,
  })

  if (error) throw error
  return data
}
