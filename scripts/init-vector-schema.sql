-- Enable the pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create vector_memories table
CREATE TABLE IF NOT EXISTS vector_memories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL,
  embedding vector(1536), -- OpenAI embedding dimension
  metadata JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for vector similarity search
CREATE INDEX IF NOT EXISTS vector_memories_embedding_idx 
ON vector_memories USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- Create index for metadata queries
CREATE INDEX IF NOT EXISTS vector_memories_metadata_idx 
ON vector_memories USING GIN (metadata);

-- Create function for vector similarity search
CREATE OR REPLACE FUNCTION match_vector_memories(
  query_embedding vector(1536),
  match_threshold float DEFAULT 0.7,
  match_count int DEFAULT 10
)
RETURNS TABLE (
  id UUID,
  content TEXT,
  metadata JSONB,
  similarity float
)
LANGUAGE sql STABLE
AS $$
  SELECT
    vector_memories.id,
    vector_memories.content,
    vector_memories.metadata,
    1 - (vector_memories.embedding <=> query_embedding) AS similarity
  FROM vector_memories
  WHERE 1 - (vector_memories.embedding <=> query_embedding) > match_threshold
  ORDER BY vector_memories.embedding <=> query_embedding
  LIMIT match_count;
$$;

-- Create function to create tables (for RPC call)
CREATE OR REPLACE FUNCTION create_vector_tables()
RETURNS void
LANGUAGE sql
AS $$
  -- This function is called from the application to ensure tables exist
  SELECT 1;
$$;

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_vector_memories_updated_at 
  BEFORE UPDATE ON vector_memories 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();
