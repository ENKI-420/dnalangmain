"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dna, Star, Download, Share2, Search, Filter, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Organism {
  id: string
  name: string
  description: string
  author: string
  version: string
  fitnessScore: number
  consciousnessLevel: number
  quantumCoherence: number
  genes: string[]
  downloads: number
  rating: number // 1-5 stars
  lastUpdated: string
}

const mockOrganisms: Organism[] = [
  {
    id: "org-1",
    name: "Quantum Data Optimizer",
    description: "An organism designed for high-throughput data processing with quantum acceleration.",
    author: "QuantumLabs",
    version: "1.2.0",
    fitnessScore: 0.92,
    consciousnessLevel: 0.75,
    quantumCoherence: 0.88,
    genes: ["QuantumCompute", "DataStream", "SelfOptimize"],
    downloads: 1245,
    rating: 4.8,
    lastUpdated: "2025-07-10",
  },
  {
    id: "org-2",
    name: "Adaptive Security Sentinel",
    description: "A self-evolving immune system for digital environments, adapting to new threats.",
    author: "SecureGen",
    version: "0.9.5",
    fitnessScore: 0.85,
    consciousnessLevel: 0.6,
    quantumCoherence: 0.55,
    genes: ["ThreatDetect", "SelfHeal", "AdaptiveLearn"],
    downloads: 890,
    rating: 4.5,
    lastUpdated: "2025-07-05",
  },
  {
    id: "org-3",
    name: "Conscious Decision Engine",
    description: "An organism capable of introspective and self-aware decision-making for complex systems.",
    author: "MindForge",
    version: "1.0.1",
    fitnessScore: 0.78,
    consciousnessLevel: 0.9,
    quantumCoherence: 0.62,
    genes: ["Introspection", "DecisionTree", "SelfAware"],
    downloads: 560,
    rating: 4.7,
    lastUpdated: "2025-07-12",
  },
  {
    id: "org-4",
    name: "Neural Network Evolver",
    description: "Evolves and optimizes neural network architectures for various AI tasks.",
    author: "NeuroGen",
    version: "1.1.0",
    fitnessScore: 0.95,
    consciousnessLevel: 0.7,
    quantumCoherence: 0.7,
    genes: ["NeuralNet", "GeneticAlgo", "HyperOptimize"],
    downloads: 1500,
    rating: 4.9,
    lastUpdated: "2025-07-15",
  },
  {
    id: "org-5",
    name: "Bio-Inspired Resource Manager",
    description: "Manages cloud resources with a bio-inspired approach for efficiency and resilience.",
    author: "EcoCloud",
    version: "0.8.0",
    fitnessScore: 0.8,
    consciousnessLevel: 0.5,
    quantumCoherence: 0.4,
    genes: ["ResourceAlloc", "Resilience", "SelfBalance"],
    downloads: 320,
    rating: 4.2,
    lastUpdated: "2025-06-28",
  },
]

export default function MarketplacePage() {
  const [organisms, setOrganisms] = useState<Organism[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("fitnessScore")

  useEffect(() => {
    // Simulate fetching data
    setLoading(true)
    const timer = setTimeout(() => {
      const filtered = mockOrganisms.filter(
        (org) =>
          org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          org.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          org.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          org.genes.some((gene) => gene.toLowerCase().includes(searchTerm.toLowerCase())),
      )

      filtered.sort((a, b) => {
        if (sortBy === "fitnessScore") return b.fitnessScore - a.fitnessScore
        if (sortBy === "downloads") return b.downloads - a.downloads
        if (sortBy === "rating") return b.rating - a.rating
        if (sortBy === "lastUpdated") return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
        return 0
      })

      setOrganisms(filtered)
      setLoading(false)
    }, 500) // Simulate network delay

    return () => clearTimeout(timer)
  }, [searchTerm, sortBy])

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <Card className="bg-slate-800/70 border-slate-700 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-400">
            <Dna className="h-6 w-6" /> Organism Marketplace
          </CardTitle>
          <CardDescription className="text-gray-400">
            Discover, share, and evolve DNA-Lang organisms created by the community.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search organisms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 bg-slate-900 border-slate-700 text-white placeholder:text-gray-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] bg-slate-900 border-slate-700 text-white">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-white">
                  <SelectItem value="fitnessScore">Fitness Score</SelectItem>
                  <SelectItem value="downloads">Downloads</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="lastUpdated">Last Updated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-10 w-10 animate-spin text-purple-400" />
              <span className="ml-3 text-lg text-gray-300">Loading organisms...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {organisms.map((org) => (
                <Card
                  key={org.id}
                  className="bg-slate-900 border-slate-700 text-white hover:border-purple-500 transition-colors"
                >
                  <CardHeader>
                    <CardTitle className="text-green-400">{org.name}</CardTitle>
                    <CardDescription className="text-gray-400">{org.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm text-gray-300">
                      <span>
                        Author: <span className="font-medium text-purple-300">{org.author}</span>
                      </span>
                      <span>Version: {org.version}</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-300">Fitness Score</span>
                        <span className="text-green-400">{(org.fitnessScore * 100).toFixed(1)}%</span>
                      </div>
                      <Progress value={org.fitnessScore * 100} className="h-2" indicatorColor="bg-green-500" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-300">Consciousness Level</span>
                        <span className="text-purple-400">{(org.consciousnessLevel * 100).toFixed(1)}%</span>
                      </div>
                      <Progress value={org.consciousnessLevel * 100} className="h-2" indicatorColor="bg-purple-500" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-300">Quantum Coherence</span>
                        <span className="text-blue-400">{(org.quantumCoherence * 100).toFixed(1)}%</span>
                      </div>
                      <Progress value={org.quantumCoherence * 100} className="h-2" indicatorColor="bg-blue-500" />
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {org.genes.map((gene) => (
                        <Badge key={gene} variant="secondary" className="bg-slate-700 text-gray-300 border-slate-600">
                          {gene}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-400 mt-3">
                      <div className="flex items-center gap-1">
                        <Download className="h-4 w-4" /> {org.downloads}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" /> {org.rating.toFixed(1)}
                      </div>
                      <span>Updated: {org.lastUpdated}</span>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                        <Download className="mr-2 h-4 w-4" /> Download
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 border-purple-500 text-purple-300 hover:bg-purple-900 hover:text-white bg-transparent"
                      >
                        <Share2 className="mr-2 h-4 w-4" /> Share
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {organisms.length === 0 && !loading && (
                <div className="col-span-full text-center text-gray-400 text-lg">
                  No organisms found matching your criteria.
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
