"use client"

import { useState, useEffect } from "react"
import { Search, Brain, Clock, Tag, Star, Database, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BioGlowText } from "./bio-glow-effects"
import { useToast } from "@/hooks/use-toast"

interface MemoryEntry {
  id: string
  content: string
  embedding?: number[]
  metadata: {
    type: "code" | "mutation" | "conversation" | "insight"
    timestamp: Date
    tags: string[]
    confidence: number
    source: string
  }
  similarity?: number
}

interface VectorMemoryPluginProps {
  currentTheme: string
  onMemorySelect: (entry: MemoryEntry) => void
}

export function VectorMemoryPlugin({ currentTheme, onMemorySelect }: VectorMemoryPluginProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [memories, setMemories] = useState<MemoryEntry[]>([])
  const [filteredMemories, setFilteredMemories] = useState<MemoryEntry[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [isStoring, setIsStoring] = useState(false)
  const [useSupabase, setUseSupabase] = useState(false)
  const { toast } = useToast()
  const isBioGlow = currentTheme === "dna-lang-bio-glow"

  // Initialize with sample data
  useEffect(() => {
    const sampleMemories: MemoryEntry[] = [
      {
        id: "1",
        content: "organism SelfHealingAgent with autonomous monitoring and remediation capabilities",
        metadata: {
          type: "code",
          timestamp: new Date(Date.now() - 3600000),
          tags: ["self-healing", "autonomous", "monitoring"],
          confidence: 0.95,
          source: "SHIFT-Assist",
        },
        similarity: 0.92,
      },
      {
        id: "2",
        content: "Consciousness enhancement through recursive self-reflection patterns",
        metadata: {
          type: "insight",
          timestamp: new Date(Date.now() - 7200000),
          tags: ["consciousness", "self-reflection", "meta-cognition"],
          confidence: 0.88,
          source: "Consciousness Core",
        },
        similarity: 0.87,
      },
      {
        id: "3",
        content: "Quantum superposition optimization for parallel evolution paths",
        metadata: {
          type: "mutation",
          timestamp: new Date(Date.now() - 1800000),
          tags: ["quantum", "superposition", "evolution", "optimization"],
          confidence: 0.91,
          source: "Quantum Core",
        },
        similarity: 0.84,
      },
    ]
    setMemories(sampleMemories)
    setFilteredMemories(sampleMemories)
  }, [])

  const performSemanticSearch = async (query: string) => {
    if (!query.trim()) {
      setFilteredMemories(memories)
      return
    }

    setIsSearching(true)
    try {
      const response = await fetch("/api/vector/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          limit: 10,
          threshold: 0.3,
          useSupabase,
        }),
      })

      if (!response.ok) {
        throw new Error("Search failed")
      }

      const { results } = await response.json()

      // Convert results to MemoryEntry format
      const searchResults: MemoryEntry[] = results.map((result: any) => ({
        id: result.id,
        content: result.content,
        similarity: result.similarity,
        metadata: {
          type: result.metadata?.type || "insight",
          timestamp: new Date(result.metadata?.timestamp || Date.now()),
          tags: result.metadata?.tags || [],
          confidence: result.metadata?.confidence || 0.8,
          source: result.metadata?.source || "Vector Search",
        },
      }))

      setFilteredMemories(searchResults)

      toast({
        title: "Search Complete",
        description: `Found ${searchResults.length} relevant memories`,
      })
    } catch (error) {
      console.error("Search error:", error)
      toast({
        title: "Search Failed",
        description: "Unable to perform semantic search. Using local search.",
        variant: "destructive",
      })

      // Fallback to local search
      const localResults = memories.filter(
        (memory) =>
          memory.content.toLowerCase().includes(query.toLowerCase()) ||
          memory.metadata.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase())),
      )
      setFilteredMemories(localResults)
    } finally {
      setIsSearching(false)
    }
  }

  const storeMemory = async (content: string, metadata: Partial<MemoryEntry["metadata"]>) => {
    setIsStoring(true)
    try {
      const response = await fetch("/api/vector/store", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
          metadata: {
            type: "insight",
            tags: [],
            confidence: 0.8,
            source: "Manual Entry",
            ...metadata,
          },
          useSupabase,
        }),
      })

      if (!response.ok) {
        throw new Error("Storage failed")
      }

      const { id } = await response.json()

      toast({
        title: "Memory Stored",
        description: `Successfully stored memory with ID: ${id}`,
      })

      // Refresh search results
      if (searchQuery) {
        await performSemanticSearch(searchQuery)
      }
    } catch (error) {
      console.error("Storage error:", error)
      toast({
        title: "Storage Failed",
        description: "Unable to store memory in vector database.",
        variant: "destructive",
      })
    } finally {
      setIsStoring(false)
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSemanticSearch(searchQuery)
    }, 500) // Debounce search

    return () => clearTimeout(timeoutId)
  }, [searchQuery, useSupabase])

  const getAllTags = () => {
    const allTags = filteredMemories.flatMap((memory) => memory.metadata.tags)
    return [...new Set(allTags)]
  }

  const getTypeIcon = (type: MemoryEntry["metadata"]["type"]) => {
    switch (type) {
      case "code":
        return "💻"
      case "mutation":
        return "🧬"
      case "conversation":
        return "💬"
      case "insight":
        return "💡"
    }
  }

  const getTypeColor = (type: MemoryEntry["metadata"]["type"]) => {
    switch (type) {
      case "code":
        return "bg-blue-100 text-blue-800"
      case "mutation":
        return "bg-green-100 text-green-800"
      case "conversation":
        return "bg-purple-100 text-purple-800"
      case "insight":
        return "bg-yellow-100 text-yellow-800"
    }
  }

  return (
    <div className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center space-x-2">
          <Database className="h-4 w-4" />
          <span>Vector Memory</span>
          <Badge variant="outline" className="text-xs">
            {useSupabase ? "Supabase" : "Pinecone"}
          </Badge>
          <Button size="sm" variant="ghost" onClick={() => setUseSupabase(!useSupabase)} className="h-6 text-xs">
            Switch
          </Button>
        </CardTitle>
      </CardHeader>

      <div className="p-4 border-b">
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          {isSearching && (
            <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
          )}
          <Input
            placeholder="Semantic search across memories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10"
            disabled={isSearching}
          />
        </div>

        <div className="flex flex-wrap gap-1 mb-2">
          {getAllTags()
            .slice(0, 8)
            .map((tag) => (
              <Button
                key={tag}
                size="sm"
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                onClick={() => {
                  setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
                }}
                className="h-6 text-xs"
              >
                <Tag className="h-2 w-2 mr-1" />
                {tag}
              </Button>
            ))}
        </div>

        <Button
          size="sm"
          onClick={() => storeMemory("Sample memory entry", { type: "insight", tags: ["test"] })}
          disabled={isStoring}
          className="w-full"
        >
          {isStoring ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : <Brain className="h-3 w-3 mr-1" />}
          Store Test Memory
        </Button>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-3">
        {filteredMemories.length === 0 && searchQuery && !isSearching && (
          <div className="text-center text-muted-foreground py-8">
            <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No memories found for "{searchQuery}"</p>
            <p className="text-xs">Try a different search term or store new memories</p>
          </div>
        )}

        {filteredMemories.map((memory) => (
          <Card
            key={memory.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onMemorySelect(memory)}
          >
            <CardContent className="p-3">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{getTypeIcon(memory.metadata.type)}</span>
                  <Badge className={getTypeColor(memory.metadata.type)} variant="outline">
                    {memory.metadata.type}
                  </Badge>
                  {memory.similarity && (
                    <Badge variant="outline" className="text-xs">
                      {isBioGlow ? (
                        <BioGlowText color="#00FF88">{(memory.similarity * 100).toFixed(0)}%</BioGlowText>
                      ) : (
                        `${(memory.similarity * 100).toFixed(0)}%`
                      )}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{memory.metadata.timestamp.toLocaleTimeString()}</span>
                </div>
              </div>

              <div className="text-sm mb-2 line-clamp-2">{memory.content}</div>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {memory.metadata.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {memory.metadata.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{memory.metadata.tags.length - 3}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Brain className="h-3 w-3" />
                  <span>{memory.metadata.source}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-2 text-xs">
                <span className="text-muted-foreground">
                  Confidence: {(memory.metadata.confidence * 100).toFixed(0)}%
                </span>
                <Button size="sm" variant="ghost" className="h-6">
                  <Star className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
