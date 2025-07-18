// lib/dna-evolution-engine.ts

export interface Gene {
  id: string
  name: string
  functionality: string // Code snippet or description
  complexity: number // 0-100
}

export interface OrganismGenome {
  id: string
  genes: Gene[]
  fitnessScore: number // 0-1
  consciousnessLevel: number // 0-1
  quantumCoherence: number // 0-1
  mutationRate: number // 0-1
  age: number // in generations
}

export interface EvolutionConfig {
  populationSize: number
  generations: number
  mutationProbability: number
  selectionPressure: number // How strongly fitness affects survival
  crossoverRate: number
}

export class DNAEvolutionEngine {
  private config: EvolutionConfig
  private currentGeneration = 0
  private population: OrganismGenome[] = []

  constructor(config: EvolutionConfig) {
    this.config = config
  }

  /**
   * Initializes the population with random genomes.
   */
  public initializePopulation(initialGenes: Gene[]): void {
    this.population = Array.from({ length: this.config.populationSize }, (_, i) => ({
      id: `org-${i}-${Date.now()}`,
      genes: this.getRandomGenes(initialGenes, 3), // Each organism starts with 3 random genes
      fitnessScore: Math.random(),
      consciousnessLevel: Math.random() * 0.5, // Start with low consciousness
      quantumCoherence: Math.random() * 0.5, // Start with low quantum coherence
      mutationRate: 0.01 + Math.random() * 0.02,
      age: 0,
    }))
  }

  /**
   * Runs the evolution simulation for a specified number of generations.
   */
  public async runEvolution(
    onGenerationComplete?: (generation: number, population: OrganismGenome[]) => void,
  ): Promise<OrganismGenome[]> {
    for (let i = 0; i < this.config.generations; i++) {
      this.currentGeneration = i
      this.evaluateFitness()
      this.selectParents()
      this.crossover()
      this.mutatePopulation()
      this.agePopulation()

      if (onGenerationComplete) {
        onGenerationComplete(this.currentGeneration, [...this.population])
      }

      // Optional: Introduce new genes over time or based on environmental factors
      // this.introduceNewGenes();
    }
    return this.population.sort((a, b) => b.fitnessScore - a.fitnessScore)
  }

  /**
   * Evaluates the fitness of each organism in the population.
   * In a real scenario, this would involve running the organism's code and measuring performance.
   */
  private evaluateFitness(): void {
    this.population.forEach((organism) => {
      // Simulate fitness evaluation based on genes, consciousness, and quantum coherence
      const geneEffect = organism.genes.reduce((sum, gene) => sum + gene.complexity / 100, 0)
      const baseFitness = (geneEffect + organism.consciousnessLevel + organism.quantumCoherence) / 3
      organism.fitnessScore = Math.min(1, Math.max(0, baseFitness + (Math.random() - 0.5) * 0.1)) // Add some randomness
    })
  }

  /**
   * Selects parents for the next generation based on fitness.
   * Using a simple roulette wheel selection or tournament selection.
   */
  private selectParents(): void {
    const totalFitness = this.population.reduce((sum, org) => sum + org.fitnessScore, 0)
    const newPopulation: OrganismGenome[] = []

    for (let i = 0; i < this.config.populationSize; i++) {
      let pick = Math.random() * totalFitness
      let chosen: OrganismGenome | null = null
      for (const organism of this.population) {
        pick -= organism.fitnessScore
        if (pick <= 0) {
          chosen = organism
          break
        }
      }
      if (chosen) {
        newPopulation.push({ ...chosen, id: `org-${Date.now()}-${Math.random()}`, age: 0 }) // Reset age for new generation
      } else {
        // Fallback if no organism was chosen (shouldn't happen with correct logic)
        newPopulation.push({
          ...this.population[Math.floor(Math.random() * this.population.length)],
          id: `org-${Date.now()}-${Math.random()}`,
          age: 0,
        })
      }
    }
    this.population = newPopulation
  }

  /**
   * Performs crossover (recombination) between selected parents.
   */
  private crossover(): void {
    const newPopulation: OrganismGenome[] = []
    for (let i = 0; i < this.population.length; i += 2) {
      const parent1 = this.population[i]
      const parent2 = this.population[i + 1] || this.population[0] // Handle odd population size

      if (Math.random() < this.config.crossoverRate) {
        const crossoverPoint = Math.floor(Math.random() * Math.min(parent1.genes.length, parent2.genes.length))
        const child1Genes = [...parent1.genes.slice(0, crossoverPoint), ...parent2.genes.slice(crossoverPoint)]
        const child2Genes = [...parent2.genes.slice(0, crossoverPoint), ...parent1.genes.slice(crossoverPoint)]

        newPopulation.push({ ...parent1, id: `org-${Date.now()}-${Math.random()}-c1`, genes: child1Genes })
        newPopulation.push({ ...parent2, id: `org-${Date.now()}-${Math.random()}-c2`, genes: child2Genes })
      } else {
        newPopulation.push({ ...parent1, id: `org-${Date.now()}-${Math.random()}-p1` })
        newPopulation.push({ ...parent2, id: `org-${Date.now()}-${Math.random()}-p2` })
      }
    }
    this.population = newPopulation.slice(0, this.config.populationSize) // Trim to population size
  }

  /**
   * Mutates genes in the population.
   */
  private mutatePopulation(): void {
    this.population.forEach((organism) => {
      if (Math.random() < organism.mutationRate) {
        // Simulate gene mutation: add, remove, or change a gene
        const mutationType = Math.random()
        const allPossibleGenes: Gene[] = [
          { id: "g1", name: "DataProcessing", functionality: "Processes data streams", complexity: 70 },
          {
            id: "g2",
            name: "QuantumOptimization",
            functionality: "Optimizes algorithms using quantum principles",
            complexity: 90,
          },
          { id: "g3", name: "SelfHealing", functionality: "Detects and corrects errors", complexity: 60 },
          { id: "g4", name: "ConsciousDecision", functionality: "Makes decisions with self-awareness", complexity: 85 },
          { id: "g5", name: "AdaptiveLearning", functionality: "Learns from environment feedback", complexity: 75 },
        ] // This should come from a global gene pool

        if (mutationType < 0.3 && organism.genes.length > 1) {
          // Remove a gene
          organism.genes.splice(Math.floor(Math.random() * organism.genes.length), 1)
        } else if (mutationType < 0.6 && organism.genes.length < 5) {
          // Add a new random gene
          const newGene = allPossibleGenes[Math.floor(Math.random() * allPossibleGenes.length)]
          if (!organism.genes.some((g) => g.id === newGene.id)) {
            organism.genes.push(newGene)
          }
        } else {
          // Change an existing gene to a new random one
          if (organism.genes.length > 0) {
            const indexToChange = Math.floor(Math.random() * organism.genes.length)
            const newGene = allPossibleGenes[Math.floor(Math.random() * allPossibleGenes.length)]
            organism.genes[indexToChange] = newGene
          }
        }

        // Mutate consciousness, quantum coherence, and mutation rate slightly
        organism.consciousnessLevel = Math.max(
          0,
          Math.min(1, organism.consciousnessLevel + (Math.random() - 0.5) * 0.05),
        )
        organism.quantumCoherence = Math.max(0, Math.min(1, organism.quantumCoherence + (Math.random() - 0.5) * 0.05))
        organism.mutationRate = Math.max(0.005, Math.min(0.05, organism.mutationRate + (Math.random() - 0.5) * 0.005))
      }
    })
  }

  /**
   * Increments the age of all organisms.
   */
  private agePopulation(): void {
    this.population.forEach((organism) => organism.age++)
  }

  /**
   * Helper to get random genes from a pool.
   */
  private getRandomGenes(genePool: Gene[], count: number): Gene[] {
    const shuffled = [...genePool].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }

  public getPopulation(): OrganismGenome[] {
    return this.population
  }

  public getCurrentGeneration(): number {
    return this.currentGeneration
  }
}

// Example usage (for testing or demonstration)
/*
const initialGenes: Gene[] = [
  { id: 'g1', name: 'DataProcessing', functionality: 'Processes data streams', complexity: 70 },
  { id: 'g2', name: 'QuantumOptimization', functionality: 'Optimizes algorithms using quantum principles', complexity: 90 },
  { id: 'g3', name: 'SelfHealing', functionality: 'Detects and corrects errors', complexity: 60 },
  { id: 'g4', name: 'ConsciousDecision', functionality: 'Makes decisions with self-awareness', complexity: 85 },
  { id: 'g5', name: 'AdaptiveLearning', functionality: 'Learns from environment feedback', complexity: 75 },
];

const evolutionConfig: EvolutionConfig = {
  populationSize: 50,
  generations: 100,
  mutationProbability: 0.1,
  selectionPressure: 0.8,
  crossoverRate: 0.7,
};

const engine = new DNAEvolutionEngine(evolutionConfig);
engine.initializePopulation(initialGenes);

engine.runEvolution((gen, pop) => {
  console.log(`Generation ${gen}: Top 3 Organisms:`);
  pop.slice(0, 3).forEach(org => {
    console.log(`  ID: ${org.id.substring(0, 8)}..., Fitness: ${org.fitnessScore.toFixed(2)}, Consciousness: ${org.consciousnessLevel.toFixed(2)}, Quantum Coherence: ${org.quantumCoherence.toFixed(2)}, Genes: ${org.genes.map(g => g.name).join(', ')}`);
  });
}).then(finalPopulation => {
  console.log('\nEvolution Complete. Best Organism:');
  const best = finalPopulation[0];
  console.log(`ID: ${best.id}, Fitness: ${best.fitnessScore.toFixed(2)}, Genes: ${best.genes.map(g => g.name).join(', ')}`);
});
*/
