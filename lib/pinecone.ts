import { Pinecone } from "@pinecone-database/pinecone"

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
})

const indexName = "dna-lang-memories"

export async function initializePineconeIndex() {
  try {
    const indexList = await pinecone.listIndexes()
    const indexExists = indexList.indexes?.some((index) => index.name === indexName)

    if (!indexExists) {
      await pinecone.createIndex({
        name: indexName,
        dimension: 1536, // OpenAI embedding dimension
        metric: "cosine",
        spec: {
          serverless: {
            cloud: "aws",
            region: "us-east-1",
          },
        },
      })
    }

    return pinecone.index(indexName)
  } catch (error) {
    console.error("Error initializing Pinecone index:", error)
    throw error
  }
}

export async function upsertVectorMemory(id: string, embedding: number[], metadata: Record<string, any>) {
  const index = await initializePineconeIndex()

  await index.upsert([
    {
      id,
      values: embedding,
      metadata,
    },
  ])
}

export async function queryVectorMemories(queryEmbedding: number[], topK = 10, filter?: Record<string, any>) {
  const index = await initializePineconeIndex()

  const queryResponse = await index.query({
    vector: queryEmbedding,
    topK,
    includeMetadata: true,
    filter,
  })

  return queryResponse.matches || []
}
