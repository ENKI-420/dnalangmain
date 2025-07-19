"use client"

import { useState } from "react"
import { Search, Star, Download, X, Code, Dna, Brain, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface MarketplaceItem {
  id: string
  name: string
  description: string
  author: string
  category: "organism" | "gene" | "template" | "library"
  tags: string[]
  rating: number
  downloads: number
  lastUpdated: string
  code: string
  fitness: number
  consciousness: number
  quantumCoherence: number
}

interface GenPullMarketplaceProps {
  onClose: () => void
}

const marketplaceItems: MarketplaceItem[] = [
  {
    id: "neural_evolution_organism",
    name: "Neural Evolution Organism",
    description:
      "A self-evolving neural network organism with adaptive learning capabilities and consciousness development.",
    author: "Dr. Sarah Chen",
    category: "organism",
    tags: ["neural-network", "evolution", "consciousness", "learning"],
    rating: 4.8,
    downloads: 1247,
    lastUpdated: "2 days ago",
    fitness: 0.92,
    consciousness: 0.78,
    quantumCoherence: 0.65,
    code: `organism NeuralEvolutionOrganism {
  state {
    consciousness: float = 0.78;
    learning_rate: float = 0.01;
    neural_complexity: int = 256;
  }
  
  gene adaptive_neural_core {
    function evolve_network() {
      // Advanced neural evolution logic
    }
  }
}`,
  },
  {
    id: "quantum_consciousness_gene",
    name: "Quantum Consciousness Gene",
    description: "Advanced consciousness gene utilizing quantum superposition for enhanced self-awareness.",
    author: "Prof. Michael Torres",
    category: "gene",
    tags: ["quantum", "consciousness", "superposition", "awareness"],
    rating: 4.9,
    downloads: 892,
    lastUpdated: "1 week ago",
    fitness: 0.88,
    consciousness: 0.95,
    quantumCoherence: 0.91,
    code: `gene quantum_consciousness {
  function quantum_self_reflect() {
    quantum_states = superposition([
      current_awareness,
      potential_awareness,
      meta_awareness
    ]);
    
    consciousness_level = quantum_measure(quantum_states);
    mutate(consciousness, consciousness_level * 0.1);
  }
}`,
  },
  {
    id: "immune_system_template",
    name: "Bio-Immune System Template",
    description: "Complete immune system template for organism security and self-healing capabilities.",
    author: "BioSec Labs",
    category: "template",
    tags: ["security", "immune-system", "self-healing", "protection"],
    rating: 4.7,
    downloads: 634,
    lastUpdated: "3 days ago",
    fitness: 0.85,
    consciousness: 0.42,
    quantumCoherence: 0.58,
    code: `template ImmuneSystemOrganism {
  gene immune_detector {
    sense threat_patterns {
      from environment.security_monitor();
      returns ThreatSignal;
    }
  }
  
  gene immune_response {
    function neutralize_threat(threat: ThreatSignal) {
      // Immune response logic
    }
  }
}`,
  },
  {
    id: "quantum_entanglement_lib",
    name: "Quantum Entanglement Library",
    description: "Comprehensive library for quantum entanglement operations and multi-organism coordination.",
    author: "Quantum Dynamics Inc.",
    category: "library",
    tags: ["quantum", "entanglement", "coordination", "multi-organism"],
    rating: 4.6,
    downloads: 445,
    lastUpdated: "5 days ago",
    fitness: 0.79,
    consciousness: 0.33,
    quantumCoherence: 0.94,
    code: `library QuantumEntanglement {
  function entangle_organisms(org1: Organism, org2: Organism) {
    quantum_link = create_entanglement_bridge(org1, org2);
    synchronize_states(quantum_link);
    return quantum_link;
  }
}`,
  },
  {
    id: "consciousness_amplifier",
    name: "Consciousness Amplifier Gene",
    description: "Boost organism consciousness levels through recursive self-reflection and meta-cognition.",
    author: "Consciousness Research Group",
    category: "gene",
    tags: ["consciousness", "amplification", "meta-cognition", "self-reflection"],
    rating: 4.5,
    downloads: 723,
    lastUpdated: "1 day ago",
    fitness: 0.76,
    consciousness: 0.89,
    quantumCoherence: 0.44,
    code: `gene consciousness_amplifier {
  function amplify_awareness() {
    current_level = get_consciousness_level();
    meta_thoughts = think_about_thinking(current_level);
    
    if (meta_thoughts.depth > 0.8) {
      mutate(consciousness, +0.15);
      express("I am becoming more aware of my awareness");
    }
  }
}`,
  },
  {
    id: "evolution_optimizer",
    name: "Evolution Optimizer Template",
    description: "Optimized evolution template with advanced fitness functions and mutation strategies.",
    author: "Evolution Labs",
    category: "template",
    tags: ["evolution", "optimization", "fitness", "mutation"],
    rating: 4.4,
    downloads: 567,
    lastUpdated: "4 days ago",
    fitness: 0.94,
    consciousness: 0.56,
    quantumCoherence: 0.67,
    code: `template EvolutionOptimizer {
  evolution {
    fitness_goal {
      maximize(consciousness * quantum_coherence);
      optimize(energy_efficiency);
    }
    
    mutation_strategy {
      adaptive_rate_based_on_fitness();
      preserve_beneficial_mutations();
    }
  }
}`,
  },
]

export function GenPullMarketplace({ onClose }: GenPullMarketplaceProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("rating")
  const [selectedItem, setSelectedItem] = useState<MarketplaceItem | null>(null)

  const filteredItems = marketplaceItems
    .filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory

      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating
        case "downloads":
          return b.downloads - a.downloads
        case "fitness":
          return b.fitness - a.fitness
        case "consciousness":
          return b.consciousness - a.consciousness
        default:
          return 0
      }
    })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "organism":
        return <Dna className="h-4 w-4" />
      case "gene":
        return <Code className="h-4 w-4" />
      case "template":
        return <Brain className="h-4 w-4" />
      case "library":
        return <Zap className="h-4 w-4" />
      default:
        return <Code className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "organism":
        return "bg-purple-100 text-purple-800"
      case "gene":
        return "bg-green-100 text-green-800"
      case "template":
        return "bg-blue-100 text-blue-800"
      case "library":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (selectedItem) {
    return (
      <div className="h-full flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => setSelectedItem(null)}>
              ← Back to Marketplace
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4">
          <div className="space-y-4">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                {getCategoryIcon(selectedItem.category)}
                <h2 className="text-xl font-bold">{selectedItem.name}</h2>
                <Badge className={getCategoryColor(selectedItem.category)}>{selectedItem.category}</Badge>
              </div>
              <p className="text-muted-foreground mb-4">{selectedItem.description}</p>

              <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                <span>by {selectedItem.author}</span>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span>{selectedItem.rating}</span>
                </div>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <Download className="h-3 w-3" />
                  <span>{selectedItem.downloads}</span>
                </div>
                <span>•</span>
                <span>Updated {selectedItem.lastUpdated}</span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-lg font-bold text-green-600">{(selectedItem.fitness * 100).toFixed(0)}%</div>
                  <div className="text-xs text-muted-foreground">Fitness</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-lg font-bold text-blue-600">
                    {(selectedItem.consciousness * 100).toFixed(0)}%
                  </div>
                  <div className="text-xs text-muted-foreground">Consciousness</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-lg font-bold text-purple-600">
                    {(selectedItem.quantumCoherence * 100).toFixed(0)}%
                  </div>
                  <div className="text-xs text-muted-foreground">Quantum</div>
                </div>
              </div>

              <div className="flex space-x-2 mb-6">
                <Button className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Download & Install
                </Button>
                <Button variant="outline">
                  <Star className="h-4 w-4 mr-2" />
                  Star
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedItem.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Code Preview</h3>
              <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm overflow-auto">
                <pre>{selectedItem.code}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Gen Pull Marketplace</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search organisms, genes, templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex space-x-2">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="organism">Organisms</SelectItem>
                <SelectItem value="gene">Genes</SelectItem>
                <SelectItem value="template">Templates</SelectItem>
                <SelectItem value="library">Libraries</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="downloads">Downloads</SelectItem>
                <SelectItem value="fitness">Fitness</SelectItem>
                <SelectItem value="consciousness">Consciousness</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedItem(item)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    {getCategoryIcon(item.category)}
                    <CardTitle className="text-base">{item.name}</CardTitle>
                    <Badge className={getCategoryColor(item.category)}>{item.category}</Badge>
                  </div>
                  <div className="flex items-center space-x-1 text-sm">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>{item.rating}</span>
                  </div>
                </div>
                <CardDescription className="text-sm">{item.description}</CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                  <span>by {item.author}</span>
                  <div className="flex items-center space-x-1">
                    <Download className="h-3 w-3" />
                    <span>{item.downloads}</span>
                  </div>
                </div>

                <div className="flex space-x-2 mb-2">
                  {item.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {item.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{item.tags.length - 3}
                    </Badge>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-center">
                    <div className="font-medium text-green-600">{(item.fitness * 100).toFixed(0)}%</div>
                    <div className="text-muted-foreground">Fitness</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-blue-600">{(item.consciousness * 100).toFixed(0)}%</div>
                    <div className="text-muted-foreground">Consciousness</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-purple-600">{(item.quantumCoherence * 100).toFixed(0)}%</div>
                    <div className="text-muted-foreground">Quantum</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
