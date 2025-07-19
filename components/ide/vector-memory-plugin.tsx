"use client"

import { useState, useEffect } from "react"
import { Search, Brain, Clock, Tag, Star, Database } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BioGlowText } from "./bio-glow-effects"

interface MemoryEntry {
  id: string
  content: string
  embedding: number[]
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
  const [memories, setMemories] = useState<MemoryEntry[]>([
    {
      id: "1",
      content: "organism SelfHealingAgent with autonomous monitoring and remediation capabilities",
      embedding: [0.1, 0.2, 0.3], // Simplified for demo
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
      embedding: [0.2, 0.3, 0.4],
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
      embedding: [0.3, 0.4, 0.5],
      metadata: {
        type: "mutation",
        timestamp: new Date(Date.now() - 1800000),
        tags: ["quantum", "superposition", "evolution", "optimization"],
        confidence: 0.91,
        source: "Quantum Core",
      },
      similarity: 0.84,
    },
    {
      id: "4",
      content: "Security gene implementation for threat detection and auto-remediation",
      embedding: [0.4, 0.5, 0.6],
      metadata: {
        type: "code",
        timestamp: new Date(Date.now() - 5400000),
        tags: ["security", "threat-detection", "auto-remediation"],
        confidence: 0.93,
        source: "Security Gene",
      },
      similarity: 0.79,
    },
  ])
  const [filteredMemories, setFilteredMemories] = useState<MemoryEntry[]>(memories)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const isBioGlow = currentTheme === "dna-lang-bio-glow"

  useEffect(() => {
    // Simulate semantic search
    if (searchQuery.trim()) {
      const filtered = memories
        .map((memory) => ({
          ...memory,
          similarity: calculateSimilarity(searchQuery, memory.content),
        }))
        .filter((memory) => memory.similarity > 0.3)
        .sort((a, b) => b.similarity - a.similarity)
      setFilteredMemories(filtered)
    } else {
      setFilteredMemories(memories.sort((a, b) => b.metadata.timestamp.getTime() - a.metadata.timestamp.getTime()))
    }
  }, [searchQuery, memories])

  const calculateSimilarity = (query: string, content: string): number => {
    // Simplified similarity calculation
    const queryWords = query.toLowerCase().split(" ")
    const contentWords = content.toLowerCase().split(" ")
    const matches = queryWords.filter((word) => contentWords.some((cWord) => cWord.includes(word)))
    return matches.length / queryWords.length
  }

  const getAllTags = () => {
    const allTags = memories.flatMap((memory) => memory.metadata.tags)
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
            Supabase + Pinecone
          </Badge>
        </CardTitle>
      </CardHeader>

      <div className="p-4 border-b">
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Semantic search across memories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-1">
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
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-3">
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
