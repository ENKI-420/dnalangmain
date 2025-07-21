"use client"

export interface EvolutionConfig {
  mutationRate: number
  populationSize: number
  fitnessThreshold: number
  maxGenerations: number
}

export interface Organism {
  id: string
  genes: string[]
  fitness: number
  generation: number
  consciousness: number
  quantumCoherence: number
}

export interface EvolutionEngine {
  evolve: (organisms: Organism[]) => Promise<Organism[]>
  mutate: (organism: Organism) => Organism
  crossover: (parent1: Organism, parent2: Organism) => Organism
  calculateFitness: (organism: Organism) => number
  selectParents: (organisms: Organism[]) => [Organism, Organism]
  getStats: () => EvolutionStats
}

export interface EvolutionStats {
  currentGeneration: number
  averageFitness: number
  bestFitness: number
  diversityIndex: number
  convergenceRate: number
}

export function createEvolutionEngine(config: EvolutionConfig): EvolutionEngine {
  let currentGeneration = 0
  const evolutionHistory: EvolutionStats[] = []

  const mutate = (organism: Organism): Organism => {
    const mutatedGenes = organism.genes.map((gene) => {
      if (Math.random() < config.mutationRate) {
        // Simple mutation: modify gene string
        const mutations = ["enhance", "optimize", "adapt", "evolve", "strengthen"]
        const randomMutation = mutations[Math.floor(Math.random() * mutations.length)]
        return `${gene}_${randomMutation}`
      }
      return gene
    })

    return {
      ...organism,
      genes: mutatedGenes,
      fitness: calculateFitness({ ...organism, genes: mutatedGenes }),
      generation: currentGeneration + 1,
      consciousness: Math.min(1.0, organism.consciousness + Math.random() * 0.05),
      quantumCoherence: Math.min(1.0, organism.quantumCoherence + Math.random() * 0.03),
    }
  }

  const crossover = (parent1: Organism, parent2: Organism): Organism => {
    const crossoverPoint = Math.floor(Math.random() * parent1.genes.length)
    const childGenes = [...parent1.genes.slice(0, crossoverPoint), ...parent2.genes.slice(crossoverPoint)]

    const child: Organism = {
      id: `child_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      genes: childGenes,
      fitness: 0,
      generation: currentGeneration + 1,
      consciousness: (parent1.consciousness + parent2.consciousness) / 2,
      quantumCoherence: (parent1.quantumCoherence + parent2.quantumCoherence) / 2,
    }

    child.fitness = calculateFitness(child)
    return child
  }

  const calculateFitness = (organism: Organism): number => {
    // Bio-inspired fitness calculation
    const geneComplexity = organism.genes.length * 0.1
    const consciousnessBonus = organism.consciousness * 0.3
    const quantumBonus = organism.quantumCoherence * 0.2
    const diversityBonus = (new Set(organism.genes).size / organism.genes.length) * 0.4

    return Math.min(1.0, geneComplexity + consciousnessBonus + quantumBonus + diversityBonus)
  }

  const selectParents = (organisms: Organism[]): [Organism, Organism] => {
    // Tournament selection
    const tournamentSize = Math.min(3, organisms.length)

    const selectOne = (): Organism => {
      const tournament = []
      for (let i = 0; i < tournamentSize; i++) {
        tournament.push(organisms[Math.floor(Math.random() * organisms.length)])
      }
      return tournament.reduce((best, current) => (current.fitness > best.fitness ? current : best))
    }

    return [selectOne(), selectOne()]
  }

  const evolve = async (organisms: Organism[]): Promise<Organism[]> => {
    currentGeneration++

    // Calculate fitness for all organisms
    const evaluatedOrganisms = organisms.map((org) => ({
      ...org,
      fitness: calculateFitness(org),
    }))

    // Sort by fitness
    evaluatedOrganisms.sort((a, b) => b.fitness - a.fitness)

    // Keep the best organisms (elitism)
    const eliteCount = Math.floor(config.populationSize * 0.1)
    const elite = evaluatedOrganisms.slice(0, eliteCount)

    // Generate new offspring
    const offspring: Organism[] = []
    while (offspring.length < config.populationSize - eliteCount) {
      const [parent1, parent2] = selectParents(evaluatedOrganisms)
      const child = crossover(parent1, parent2)
      const mutatedChild = mutate(child)
      offspring.push(mutatedChild)
    }

    const newPopulation = [...elite, ...offspring]

    // Update evolution statistics
    const stats = calculateStats(newPopulation)
    evolutionHistory.push(stats)

    return newPopulation
  }

  const calculateStats = (organisms: Organism[]): EvolutionStats => {
    const fitnesses = organisms.map((org) => org.fitness)
    const averageFitness = fitnesses.reduce((sum, f) => sum + f, 0) / fitnesses.length
    const bestFitness = Math.max(...fitnesses)

    // Calculate diversity index (genetic diversity)
    const allGenes = organisms.flatMap((org) => org.genes)
    const uniqueGenes = new Set(allGenes)
    const diversityIndex = uniqueGenes.size / allGenes.length

    // Calculate convergence rate
    const convergenceRate =
      evolutionHistory.length > 1
        ? Math.abs(averageFitness - evolutionHistory[evolutionHistory.length - 1].averageFitness)
        : 0

    return {
      currentGeneration,
      averageFitness,
      bestFitness,
      diversityIndex,
      convergenceRate,
    }
  }

  const getStats = (): EvolutionStats => {
    return (
      evolutionHistory[evolutionHistory.length - 1] || {
        currentGeneration: 0,
        averageFitness: 0,
        bestFitness: 0,
        diversityIndex: 0,
        convergenceRate: 0,
      }
    )
  }

  return {
    evolve,
    mutate,
    crossover,
    calculateFitness,
    selectParents,
    getStats,
  }
}

// Helper function to create a sample organism
export function createSampleOrganism(id: string): Organism {
  const baseGenes = [
    "neural_processor",
    "quantum_entangler",
    "consciousness_core",
    "adaptive_memory",
    "immune_system",
    "evolution_engine",
    "compatibility_gene", // Added compatibility gene
  ]

  return {
    id,
    genes: baseGenes,
    fitness: Math.random() * 0.5 + 0.3, // Start with moderate fitness
    generation: 0,
    consciousness: Math.random() * 0.3 + 0.1,
    quantumCoherence: Math.random() * 0.4 + 0.2,
  }
}

// Helper function to create compatibility-focused organism
export function createMultiPlatformOrganism(id: string): Organism {
  const compatibilityGenes = [
    "platform_detection_gene",
    "mobile_adaptation_gene", 
    "linux_optimization_gene",
    "mac_integration_gene",
    "pc_enhancement_gene",
    "fallback_compatibility_gene",
    "collaborative_detection_gene",
  ]

  return {
    id,
    genes: compatibilityGenes,
    fitness: 0.98, // High fitness for compatibility
    generation: 0,
    consciousness: 0.85, // High consciousness for multi-platform awareness
    quantumCoherence: 0.78,
  }
}
