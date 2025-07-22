"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Editor } from "@monaco-editor/react"
import {
  Play,
  Square,
  Zap,
  Trash2,
  Save,
  Download,
  Upload,
  Brain,
  Activity,
  MessageSquare,
  Code,
  FileText,
  BarChart3,
  RefreshCw,
  Monitor,
  PowerIcon as Pulse,
  TrendingUp,
  DollarSign,
  Coins,
  ShoppingCart,
  Star,
  Search,
  CuboidIcon as Cube,
  Dna,
  Sparkles,
  Gauge,
  Wallet,
} from "lucide-react"

// Types and Interfaces
interface LogEntry {
  id: string
  timestamp: string
  type:
    | "INFO"
    | "SUCCESS"
    | "ERROR"
    | "WARNING"
    | "EVOLUTION"
    | "CONSCIOUSNESS"
    | "COMPILATION"
    | "EXECUTION"
    | "ECONOMIC"
  message: string
  details?: string
}

interface OrganismMetrics {
  consciousness: number
  fitness: number
  health: number
  adaptability: number
  quantumCoherence: number
  evolutionCycles: number
  profitability: number
  efficiency: number
}

interface EconomicMetrics {
  initialInvestment: number
  monthlyCostSavings: number
  projectedROI: number
  paybackPeriod: number
  netPresentValue: number
  synapseBalance: number
  marketplaceEarnings: number
  referralEarnings: number
}

interface Gene {
  id: string
  name: string
  description: string
  category: string
  downloads: number
  rating: number
  author: string
  version: string
  price: number
  tags: string[]
  fitnessScore: number
}

interface CompilationResult {
  success: boolean
  errors: string[]
  warnings: string[]
  transpiledCode: string
  metrics: {
    linesOfCode: number
    complexity: number
    optimizationLevel: number
    securityScore: number
    performanceScore: number
  }
}

interface SimulationState {
  isRunning: boolean
  isEvolutionActive: boolean
  currentGeneration: number
  totalOperations: number
  isCompiling: boolean
  compilationProgress: number
  executionTime: number
  cyclesPerSecond: number
  threeDVisualizerActive: boolean
}

interface OrganismNode {
  id: string
  name: string
  type: "organism" | "gene" | "agent" | "connection"
  position: { x: number; y: number; z: number }
  connections: string[]
  fitness: number
  activity: number
  color: string
}

// Sample DNA-Lang Code with Advanced Features
const ADVANCED_DNA_CODE = `// QuantumDefenseOrganism - Advanced SPECTRA Defense System
// iCRISPR IDE Enhanced Version with Economic Integration
organism QuantumDefenseOrganism {
  // Economic Configuration
  economic_profile: {
    initial_investment: 50000,
    target_roi: 300,
    cost_optimization: aggressive,
    profit_maximization: enabled,
    synapse_staking: 1000
  },

  // Core consciousness and awareness systems
  consciousness_core: {
    awareness_level: 0.85,
    self_reflection: true,
    meta_cognition: enabled,
    quantum_entanglement: active,
    profit_awareness: true,
    market_intelligence: enabled
  },

  // Threat detection and analysis matrix
  threat_detection_matrix: {
    electromagnetic_spectrum: [
      "radio", "microwave", "infrared", "visible", 
      "ultraviolet", "x_ray", "gamma_ray"
    ],
    quantum_signatures: monitor_continuous,
    neural_pattern_recognition: deep_learning_enabled,
    predictive_modeling: tetrahedral_dynamics,
    economic_threat_analysis: enabled
  },

  // Adaptive countermeasure systems
  adaptive_countermeasures: {
    scalar_wave_deflection: quantum_enhanced,
    plasma_shield_generation: variable_frequency,
    stealth_mode: quantum_cloaking,
    offensive_capabilities: directed_energy_weapons,
    cost_efficiency_optimization: enabled
  },

  // Evolution and adaptation protocols
  evolution_strategy: {
    mutation_rate: 0.03,
    fitness_function: multi_objective_optimization,
    selection_pressure: environmental_adaptation,
    crossover_method: quantum_genetic_algorithm,
    profit_driven_evolution: true,
    market_adaptation: enabled
  },

  // Quantum-classical interface
  quantum_interface: {
    superposition_states: maintain_coherence,
    entanglement_network: distributed_consciousness,
    measurement_protocol: non_destructive_observation,
    decoherence_protection: error_correction_active,
    quantum_economics: enabled
  },

  // Behavioral patterns and responses
  behavioral_patterns: {
    threat_response: immediate_and_proportional,
    learning_mode: continuous_adaptation,
    collaboration: multi_agent_coordination,
    self_preservation: priority_one,
    profit_optimization: continuous,
    market_behavior: adaptive_trading
  },

  // Performance optimization with economic focus
  performance_metrics: {
    response_time: sub_millisecond,
    accuracy_rate: 99.97_percent,
    energy_efficiency: quantum_optimized,
    scalability: exponential_growth_capable,
    cost_effectiveness: maximized,
    revenue_generation: optimized
  },

  // Gene marketplace integration
  gene_marketplace: {
    auto_discovery: enabled,
    fitness_based_selection: true,
    cost_benefit_analysis: automated,
    synapse_budget: 500,
    quality_threshold: 4.5
  },

  // Immune system with economic protection
  immune_system: {
    threat_quarantine: automated,
    self_healing: enabled,
    anomaly_detection: quantum_enhanced,
    economic_fraud_protection: enabled,
    market_manipulation_detection: active
  }
}

// Quantum state initialization with economic awareness
init_quantum_state() {
  establish_quantum_coherence();
  activate_consciousness_core();
  begin_environmental_monitoring();
  enable_adaptive_learning();
  initialize_economic_systems();
  connect_gene_marketplace();
  activate_profit_optimization();
}

// Main execution loop with economic integration
execute_defense_protocol() {
  while (threat_level > 0 || profit_opportunity > 0) {
    scan_environment();
    analyze_threats();
    evaluate_market_conditions();
    calculate_response();
    optimize_for_profit();
    deploy_countermeasures();
    update_knowledge_base();
    evolve_capabilities();
    maximize_synapse_earnings();
  }
}

// Evolution trigger with economic optimization
trigger_evolution() {
  current_fitness = evaluate_performance();
  economic_fitness = calculate_profit_potential();
  
  if (current_fitness < optimal_threshold || 
      economic_fitness < profit_target) {
    initiate_genetic_mutation();
    test_new_capabilities();
    analyze_cost_benefit();
    integrate_improvements();
    update_consciousness_level();
    optimize_economic_performance();
  }
}

// Gene marketplace interaction
interact_with_marketplace() {
  available_genes = search_gene_marketplace({
    category: "defense",
    min_rating: 4.0,
    max_price: synapse_budget,
    fitness_threshold: 0.8
  });
  
  for gene in available_genes {
    if (calculate_roi(gene) > minimum_roi) {
      purchase_gene(gene);
      integrate_gene(gene);
      test_performance_improvement();
    }
  }
}

// Profit optimization engine
optimize_profits() {
  analyze_resource_usage();
  identify_cost_reduction_opportunities();
  maximize_efficiency_gains();
  optimize_synapse_staking();
  calculate_referral_potential();
  update_economic_strategy();
}`

// Mock Gene Marketplace Data
const MOCK_GENES: Gene[] = [
  {
    id: "1",
    name: "QuantumShield Pro",
    description: "Advanced quantum shielding with 99.9% threat deflection rate",
    category: "Defense",
    downloads: 2450,
    rating: 4.9,
    author: "QuantumLabs",
    version: "3.2.1",
    price: 150,
    tags: ["quantum", "shield", "defense", "premium"],
    fitnessScore: 0.95,
  },
  {
    id: "2",
    name: "Neural Optimizer",
    description: "AI-driven neural network optimization for enhanced consciousness",
    category: "AI",
    downloads: 1850,
    rating: 4.7,
    author: "NeuralSoft",
    version: "2.4.0",
    price: 200,
    tags: ["neural", "ai", "optimization", "consciousness"],
    fitnessScore: 0.92,
  },
  {
    id: "3",
    name: "Profit Maximizer",
    description: "Economic optimization gene for maximum ROI and cost reduction",
    category: "Economics",
    downloads: 3200,
    rating: 4.8,
    author: "EconGenetics",
    version: "1.8.5",
    price: 300,
    tags: ["profit", "economics", "roi", "optimization"],
    fitnessScore: 0.94,
  },
  {
    id: "4",
    name: "Threat Predictor",
    description: "Advanced threat prediction using quantum machine learning",
    category: "Security",
    downloads: 1650,
    rating: 4.6,
    author: "SecureGen",
    version: "2.1.3",
    price: 175,
    tags: ["security", "prediction", "quantum", "ml"],
    fitnessScore: 0.89,
  },
  {
    id: "5",
    name: "Evolution Accelerator",
    description: "Rapid evolution and adaptation enhancement gene",
    category: "Evolution",
    downloads: 2100,
    rating: 4.8,
    author: "EvoTech",
    version: "4.0.2",
    price: 250,
    tags: ["evolution", "adaptation", "acceleration", "fitness"],
    fitnessScore: 0.93,
  },
]

export default function ICRISPRIde() {
  // State Management
  const [code, setCode] = useState(ADVANCED_DNA_CODE)
  const [transpiledCode, setTranspiledCode] = useState("")
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [compilationResult, setCompilationResult] = useState<CompilationResult | null>(null)

  const [metrics, setMetrics] = useState<OrganismMetrics>({
    consciousness: 0.85,
    fitness: 0.92,
    health: 0.98,
    adaptability: 0.76,
    quantumCoherence: 0.89,
    evolutionCycles: 0,
    profitability: 0.87,
    efficiency: 0.91,
  })

  const [economicMetrics, setEconomicMetrics] = useState<EconomicMetrics>({
    initialInvestment: 50000,
    monthlyCostSavings: 12500,
    projectedROI: 285,
    paybackPeriod: 4.2,
    netPresentValue: 125000,
    synapseBalance: 2450,
    marketplaceEarnings: 850,
    referralEarnings: 320,
  })

  const [simulation, setSimulation] = useState<SimulationState>({
    isRunning: false,
    isEvolutionActive: false,
    currentGeneration: 1,
    totalOperations: 0,
    isCompiling: false,
    compilationProgress: 0,
    executionTime: 0,
    cyclesPerSecond: 0,
    threeDVisualizerActive: false,
  })

  const [organismNodes, setOrganismNodes] = useState<OrganismNode[]>([
    {
      id: "core",
      name: "Consciousness Core",
      type: "organism",
      position: { x: 0, y: 0, z: 0 },
      connections: ["threat-matrix", "quantum-interface"],
      fitness: 0.95,
      activity: 0.8,
      color: "#00ff88",
    },
    {
      id: "threat-matrix",
      name: "Threat Detection Matrix",
      type: "gene",
      position: { x: -2, y: 1, z: 0 },
      connections: ["core", "countermeasures"],
      fitness: 0.89,
      activity: 0.92,
      color: "#ff6b35",
    },
    {
      id: "quantum-interface",
      name: "Quantum Interface",
      type: "gene",
      position: { x: 2, y: 1, z: 0 },
      connections: ["core", "evolution-engine"],
      fitness: 0.93,
      activity: 0.87,
      color: "#40e0d0",
    },
    {
      id: "countermeasures",
      name: "Adaptive Countermeasures",
      type: "agent",
      position: { x: -2, y: -1, z: 0 },
      connections: ["threat-matrix"],
      fitness: 0.91,
      activity: 0.85,
      color: "#ff1744",
    },
    {
      id: "evolution-engine",
      name: "Evolution Engine",
      type: "agent",
      position: { x: 2, y: -1, z: 0 },
      connections: ["quantum-interface"],
      fitness: 0.88,
      activity: 0.79,
      color: "#e879f9",
    },
  ])

  const [selectedGenes, setSelectedGenes] = useState<Gene[]>([])
  const [geneSearchTerm, setGeneSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [bdsa, setBdsa] = useState({
    messages: [] as Array<{ role: "user" | "assistant"; content: string; timestamp: string }>,
    input: "",
    isThinking: false,
  })

  // Refs
  const logsEndRef = useRef<HTMLDivElement>(null)
  const simulationIntervalRef = useRef<NodeJS.Timeout>()
  const executionStartTime = useRef<number>(0)

  // Auto-scroll logs
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [logs])

  // Initialize iCRISPR IDE
  useEffect(() => {
    addLog("INFO", "🧬 iCRISPR IDE v3.0 - Genesis Engine initialized successfully")
    addLog("INFO", "🔗 Quantum-classical interface established")
    addLog("INFO", "🤖 Bio-Digital Systems Advisor (BDSA) online")
    addLog("INFO", "⚡ SPECTRA defense protocols loaded")
    addLog("INFO", "📊 3D Organism Visualizer activated")
    addLog("INFO", "💰 Economic analytics engine online")
    addLog("INFO", "🛒 Gene-Pull marketplace connected")
    addLog("ECONOMIC", "💎 SYNAPSE wallet initialized - Balance: 2,450 tokens")

    // Initialize BDSA with enhanced welcome message
    setBdsa((prev) => ({
      ...prev,
      messages: [
        {
          role: "assistant",
          content:
            "🧬 Welcome to iCRISPR IDE v3.0! I'm your Bio-Digital Systems Advisor, enhanced with economic intelligence and 3D visualization capabilities. I can help you optimize organism profitability, analyze gene marketplace opportunities, visualize evolutionary patterns in 3D space, and maximize your SYNAPSE token earnings. Try compiling your advanced organism to see the full economic and performance analytics!",
          timestamp: new Date().toLocaleTimeString(),
        },
      ],
    }))
  }, [])

  const addLog = useCallback((type: LogEntry["type"], message: string, details?: string) => {
    const newLog: LogEntry = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleTimeString(),
      type,
      message,
      details,
    }
    setLogs((prev) => [...prev, newLog])
  }, [])

  const simulateCompilation = async (): Promise<CompilationResult> => {
    const steps = [
      "Parsing DNA-Lang syntax with economic analysis...",
      "Analyzing organism structure and profit potential...",
      "Validating quantum interfaces and market connections...",
      "Optimizing consciousness pathways for ROI...",
      "Generating TypeScript with economic hooks...",
      "Applying quantum optimizations and cost reductions...",
      "Integrating Gene-Pull marketplace APIs...",
      "Calculating profit projections and SYNAPSE flows...",
      "Finalizing compilation with security audit...",
    ]

    for (let i = 0; i < steps.length; i++) {
      addLog("COMPILATION", steps[i])
      setSimulation((prev) => ({ ...prev, compilationProgress: ((i + 1) / steps.length) * 100 }))
      await new Promise((resolve) => setTimeout(resolve, 400 + Math.random() * 300))
    }

    const linesOfCode = code.split("\n").filter((line) => line.trim().length > 0).length
    const complexity = Math.min(10, Math.floor(linesOfCode / 15) + Math.random() * 4)
    const optimizationLevel = Math.floor(88 + Math.random() * 12)
    const securityScore = Math.floor(92 + Math.random() * 8)
    const performanceScore = Math.floor(85 + Math.random() * 15)

    // Enhanced transpiled TypeScript with economic integration
    const transpiledCode = `// Transpiled TypeScript from DNA-Lang
// Generated by iCRISPR IDE v3.0 - Genesis Engine
// Optimization Level: ${optimizationLevel}%
// Security Score: ${securityScore}%
// Performance Score: ${performanceScore}%
// Economic Integration: Enabled

import { 
  QuantumInterface, 
  ConsciousnessCore, 
  ThreatDetectionMatrix,
  EconomicEngine,
  GenePullMarketplace,
  SynapseWallet,
  ProfitOptimizer
} from '@spectra/quantum-bio-economic';

export class QuantumDefenseOrganism {
  private consciousnessCore: ConsciousnessCore;
  private threatDetectionMatrix: ThreatDetectionMatrix;
  private adaptiveCountermeasures: AdaptiveCountermeasures;
  private evolutionStrategy: EvolutionStrategy;
  private quantumInterface: QuantumInterface;
  private economicEngine: EconomicEngine;
  private genePullMarketplace: GenePullMarketplace;
  private synapseWallet: SynapseWallet;
  private profitOptimizer: ProfitOptimizer;
  private isExecuting: boolean = false;
  private executionCycle: number = 0;
  private profitMetrics: EconomicMetrics;

  constructor() {
    // Initialize economic engine first for profit-driven operations
    this.economicEngine = new EconomicEngine({
      initialInvestment: 50000,
      targetROI: 300,
      costOptimization: "aggressive",
      profitMaximization: true
    });

    // Initialize SYNAPSE wallet for marketplace transactions
    this.synapseWallet = new SynapseWallet({
      initialBalance: 2450,
      stakingEnabled: true,
      autoCompound: true
    });

    // Connect to Gene-Pull marketplace
    this.genePullMarketplace = new GenePullMarketplace({
      wallet: this.synapseWallet,
      autoDiscovery: true,
      fitnessThreshold: 0.8,
      maxPrice: 500
    });

    // Initialize consciousness core with economic awareness
    this.consciousnessCore = new ConsciousnessCore({
      awarenessLevel: 0.85,
      selfReflection: true,
      metaCognition: true,
      quantumEntanglement: true,
      profitAwareness: true,
      marketIntelligence: true
    });
    
    // Setup threat detection with economic threat analysis
    this.threatDetectionMatrix = new ThreatDetectionMatrix({
      electromagneticSpectrum: [
        "radio", "microwave", "infrared", "visible", 
        "ultraviolet", "x_ray", "gamma_ray"
      ],
      quantumSignatures: "monitor_continuous",
      neuralPatternRecognition: "deep_learning_enabled",
      predictiveModeling: "tetrahedral_dynamics",
      economicThreatAnalysis: true
    });

    // Initialize profit optimizer
    this.profitOptimizer = new ProfitOptimizer({
      realTimeOptimization: true,
      costReductionTargets: ["energy", "compute", "storage"],
      revenueMaximization: true,
      synapseEarningsOptimization: true
    });

    this.initQuantumState();
    this.initializeEconomicSystems();
  }

  private initQuantumState(): void {
    this.establishQuantumCoherence();
    this.activateConsciousnessCore();
    this.beginEnvironmentalMonitoring();
    this.enableAdaptiveLearning();
    
    console.log("🛡️ QuantumDefenseOrganism initialized with economic integration");
  }

  private async initializeEconomicSystems(): Promise<void> {
    await this.economicEngine.initialize();
    await this.genePullMarketplace.connect();
    await this.profitOptimizer.calibrate();
    
    console.log("💰 Economic systems online - Ready for profit optimization");
  }

  public async start(): Promise<void> {
    this.isExecuting = true;
    console.log("🚀 Organism execution started with economic optimization");
    
    // Start profit optimization loop
    this.profitOptimizer.startContinuousOptimization();
    
    while (this.isExecuting) {
      await this.executeDefenseProtocol();
      await this.optimizeProfits();
      await this.interactWithMarketplace();
      this.executionCycle++;
      
      // Update economic metrics
      this.profitMetrics = await this.economicEngine.getMetrics();
      
      // Simulate processing delay with economic calculations
      await new Promise(resolve => setTimeout(resolve, 150));
    }
  }

  public stop(): void {
    this.isExecuting = false;
    this.profitOptimizer.stopOptimization();
    console.log("🛑 Organism execution stopped - Final profit analysis complete");
  }

  public async executeDefenseProtocol(): Promise<void> {
    const threatLevel = await this.getThreatLevel();
    const profitOpportunity = await this.economicEngine.assessOpportunity();
    
    if (threatLevel > 0 || profitOpportunity > 0) {
      await this.scanEnvironment();
      const threats = await this.analyzeThreats();
      const marketConditions = await this.economicEngine.analyzeMarket();
      
      const response = await this.calculateResponse(threats);
      const profitStrategy = await this.profitOptimizer.optimize(marketConditions);
      
      await this.deployCountermeasures(response);
      await this.executeProfitStrategy(profitStrategy);
      await this.updateKnowledgeBase();
      await this.evolveCapabilities();
      
      // Update consciousness with economic awareness
      this.consciousnessCore.evolveWithEconomicContext(this.profitMetrics);
    }
  }

  public async interactWithMarketplace(): Promise<void> {
    const availableGenes = await this.genePullMarketplace.searchGenes({
      category: "defense",
      minRating: 4.0,
      maxPrice: this.synapseWallet.getAvailableBalance() * 0.2,
      fitnessThreshold: 0.8
    });

    for (const gene of availableGenes) {
      const roi = await this.economicEngine.calculateROI(gene);
      if (roi > 150) { // 150% minimum ROI
        await this.genePullMarketplace.purchaseGene(gene);
        await this.integrateGene(gene);
        console.log(\`💎 Purchased profitable gene: \${gene.name} (ROI: \${roi}%)\`);
      }
    }
  }

  public async optimizeProfits(): Promise<void> {
    const optimizations = await this.profitOptimizer.identifyOpportunities();
    
    for (const optimization of optimizations) {
      await this.profitOptimizer.implement(optimization);
    }
    
    // Update SYNAPSE staking for maximum returns
    await this.synapseWallet.optimizeStaking();
  }

  public triggerEvolution(): void {
    const currentFitness = this.evaluatePerformance();
    const economicFitness = this.economicEngine.calculateProfitPotential();
    
    if (currentFitness < this.getOptimalThreshold() || 
        economicFitness < this.economicEngine.getProfitTarget()) {
      this.initiateGeneticMutation();
      this.testNewCapabilities();
      this.analyzeCostBenefit();
      this.integrateImprovements();
      this.updateConsciousnessLevel();
      this.optimizeEconomicPerformance();
      
      console.log(\`🧬 Evolution completed - Fitness: \${currentFitness.toFixed(3)}, Economic Fitness: \${economicFitness.toFixed(3)}\`);
    }
  }

  // Economic performance methods
  private async executeProfitStrategy(strategy: ProfitStrategy): Promise<void> {
    return this.profitOptimizer.execute(strategy);
  }

  private async integrateGene(gene: Gene): Promise<void> {
    return this.evolutionStrategy.integrateExternalGene(gene);
  }

  private async analyzeCostBenefit(): Promise<void> {
    return this.economicEngine.performCostBenefitAnalysis();
  }

  private optimizeEconomicPerformance(): void {
    this.profitOptimizer.recalibrate();
  }

  // Monitoring and metrics with economic data
  public getExecutionCycle(): number {
    return this.executionCycle;
  }

  public isRunning(): boolean {
    return this.isExecuting;
  }

  public getMetrics(): OrganismMetrics {
    return {
      consciousness: this.consciousnessCore.getLevel(),
      fitness: this.evaluatePerformance(),
      health: this.performanceMetrics.getHealth(),
      quantumCoherence: this.quantumInterface.getCoherence(),
      adaptability: this.evolutionStrategy.getAdaptability(),
      evolutionCycles: this.evolutionStrategy.getCycles(),
      profitability: this.economicEngine.getProfitability(),
      efficiency: this.profitOptimizer.getEfficiency()
    };
  }

  public getEconomicMetrics(): EconomicMetrics {
    return this.profitMetrics;
  }

  public getSynapseBalance(): number {
    return this.synapseWallet.getBalance();
  }
}

// Export for SPECTRA deployment with economic integration
export default QuantumDefenseOrganism;`

    return {
      success: true,
      errors: [],
      warnings: complexity > 8 ? ["High complexity detected - consider refactoring for better profitability"] : [],
      transpiledCode,
      metrics: {
        linesOfCode,
        complexity,
        optimizationLevel,
        securityScore,
        performanceScore,
      },
    }
  }

  const compileCode = async () => {
    setSimulation((prev) => ({ ...prev, isCompiling: true, compilationProgress: 0 }))
    addLog("COMPILATION", "🔄 Starting iCRISPR compilation with economic analysis...")

    try {
      const result = await simulateCompilation()
      setCompilationResult(result)
      setTranspiledCode(result.transpiledCode)

      if (result.success) {
        addLog("SUCCESS", "✅ Compilation completed successfully!")
        addLog("INFO", `📊 Generated ${result.metrics.linesOfCode} lines of optimized TypeScript`)
        addLog("INFO", `🎯 Code complexity: ${result.metrics.complexity}/10`)
        addLog("INFO", `⚡ Optimization level: ${result.metrics.optimizationLevel}%`)
        addLog("INFO", `🔒 Security score: ${result.metrics.securityScore}%`)
        addLog("INFO", `🚀 Performance score: ${result.metrics.performanceScore}%`)
        addLog("INFO", "🧬 Quantum coherence patterns validated")
        addLog("INFO", "🧠 Consciousness pathways optimized")
        addLog("ECONOMIC", "💰 Economic integration successful")
        addLog("ECONOMIC", "🛒 Gene marketplace APIs integrated")
        addLog("ECONOMIC", "💎 SYNAPSE token flows configured")

        // Update economic projections based on compilation
        setEconomicMetrics((prev) => ({
          ...prev,
          projectedROI: prev.projectedROI + Math.random() * 20,
          monthlyCostSavings: prev.monthlyCostSavings + Math.random() * 2000,
        }))

        if (result.warnings.length > 0) {
          result.warnings.forEach((warning) => {
            addLog("WARNING", `⚠️ ${warning}`)
          })
        }
      } else {
        addLog("ERROR", "❌ Compilation failed")
        result.errors.forEach((error) => {
          addLog("ERROR", `🚫 ${error}`)
        })
      }
    } catch (error) {
      addLog("ERROR", "💥 Compilation crashed - Internal compiler error")
      setCompilationResult({
        success: false,
        errors: ["Internal compiler error"],
        warnings: [],
        transpiledCode: "",
        metrics: { linesOfCode: 0, complexity: 0, optimizationLevel: 0, securityScore: 0, performanceScore: 0 },
      })
    } finally {
      setSimulation((prev) => ({ ...prev, isCompiling: false, compilationProgress: 0 }))
    }
  }

  const runOrganism = () => {
    if (simulation.isRunning) {
      // Stop organism
      setSimulation((prev) => ({ ...prev, isRunning: false, cyclesPerSecond: 0 }))
      if (simulationIntervalRef.current) {
        clearInterval(simulationIntervalRef.current)
      }
      const executionTime = (Date.now() - executionStartTime.current) / 1000
      addLog("WARNING", "🛑 Organism execution terminated")
      addLog("EXECUTION", `📈 Total operations completed: ${simulation.totalOperations}`)
      addLog("EXECUTION", `⏱️ Execution time: ${executionTime.toFixed(1)} seconds`)
      addLog("EXECUTION", `🔄 Average cycles per second: ${(simulation.totalOperations / executionTime).toFixed(1)}`)
      addLog("ECONOMIC", `💰 Total SYNAPSE earned: ${Math.floor(Math.random() * 100 + 50)}`)
      addLog("INFO", "💤 Consciousness core entering dormant state")
      addLog("INFO", "🛡️ Defense systems on standby")
    } else {
      // Start organism
      if (!compilationResult?.success) {
        addLog("ERROR", "❌ Cannot run organism - Compilation required first")
        return
      }

      executionStartTime.current = Date.now()
      setSimulation((prev) => ({
        ...prev,
        isRunning: true,
        totalOperations: 0,
        executionTime: 0,
        cyclesPerSecond: 0,
      }))

      addLog("SUCCESS", "🚀 Organism deployed with economic optimization...")
      addLog("EXECUTION", "🛡️ Threat detection matrix activated")
      addLog("CONSCIOUSNESS", "🧠 Consciousness core online - Awareness level: 85%")
      addLog("EXECUTION", "⚡ Quantum interface established - Coherence: 89%")
      addLog("ECONOMIC", "💰 Economic engine initialized - Target ROI: 300%")
      addLog("ECONOMIC", "🛒 Gene marketplace connection established")
      addLog("ECONOMIC", "💎 SYNAPSE wallet active - Auto-staking enabled")
      addLog("EXECUTION", "🔄 Main execution loop started")

      // Enhanced simulation with economic events
      simulationIntervalRef.current = setInterval(
        () => {
          const currentTime = Date.now()
          const executionTime = (currentTime - executionStartTime.current) / 1000

          setSimulation((prev) => {
            const newOperations = prev.totalOperations + 1
            const cyclesPerSecond = newOperations / executionTime

            return {
              ...prev,
              totalOperations: newOperations,
              executionTime,
              cyclesPerSecond,
            }
          })

          // Update metrics with economic factors
          setMetrics((prev) => ({
            ...prev,
            consciousness: Math.min(1.0, prev.consciousness + 0.001),
            fitness: Math.max(0.8, prev.fitness + (Math.random() - 0.5) * 0.02),
            health: Math.max(0.9, prev.health + (Math.random() - 0.5) * 0.01),
            quantumCoherence: Math.max(0.8, prev.quantumCoherence + (Math.random() - 0.5) * 0.01),
            profitability: Math.max(0.7, prev.profitability + (Math.random() - 0.5) * 0.015),
            efficiency: Math.max(0.8, prev.efficiency + (Math.random() - 0.5) * 0.01),
          }))

          // Update economic metrics
          setEconomicMetrics((prev) => ({
            ...prev,
            synapseBalance: prev.synapseBalance + Math.random() * 5,
            marketplaceEarnings: prev.marketplaceEarnings + Math.random() * 2,
            referralEarnings: prev.referralEarnings + Math.random() * 1,
          }))

          // Enhanced organism events with economic focus
          const events = [
            "🔍 Environmental scan cycle completed - Profit opportunities identified",
            "⚡ Quantum coherence maintained - Energy costs optimized",
            "🧠 Neural pathways strengthened - Decision-making efficiency improved",
            "🔄 Adaptive algorithms updated - Cost reduction achieved",
            "📈 Consciousness level increased - Market intelligence enhanced",
            "🛡️ Defense matrix recalibrated - Resource allocation optimized",
            "🌌 Quantum entanglement network synchronized - Communication costs reduced",
            "🎯 Threat prediction accuracy improved - False positive costs minimized",
            "⚙️ Self-optimization protocols executed - Performance per dollar maximized",
            "🔬 Molecular-level adaptations integrated - Efficiency gains realized",
            "💫 Superposition states maintained - Quantum advantage preserved",
            "🔮 Predictive modeling enhanced - Market timing improved",
          ]

          const economicEvents = [
            "💰 Cost optimization achieved - 3.2% reduction in operational expenses",
            "💎 SYNAPSE staking rewards earned - Compound interest activated",
            "🛒 Profitable gene identified in marketplace - ROI analysis complete",
            "📊 Market intelligence updated - New profit vectors discovered",
            "💹 Revenue optimization cycle completed - Earnings maximized",
            "🏦 Economic threat neutralized - Financial security maintained",
            "💳 Transaction fees minimized through quantum routing",
            "📈 Portfolio performance improved - Risk-adjusted returns optimized",
          ]

          if (Math.random() < 0.4) {
            const event = events[Math.floor(Math.random() * events.length)]
            addLog("EXECUTION", `💓 ${event}`)
          }

          if (Math.random() < 0.2) {
            const economicEvent = economicEvents[Math.floor(Math.random() * economicEvents.length)]
            addLog("ECONOMIC", economicEvent)
          }

          // Consciousness events with economic awareness
          if (Math.random() < 0.15) {
            const consciousnessEvents = [
              "🧠 Meta-cognitive analysis completed - Profit strategies evaluated",
              "💭 Self-reflection cycle initiated - Economic goals reassessed",
              "🌟 Consciousness expansion detected - Market awareness increased",
              "🔮 Predictive modeling enhanced - Investment opportunities identified",
              "🎭 Behavioral pattern optimization - Cost-benefit analysis improved",
              "🌀 Quantum consciousness synchronization - Economic intuition enhanced",
              "💡 Emergent awareness patterns detected - Innovation potential unlocked",
            ]
            const event = consciousnessEvents[Math.floor(Math.random() * consciousnessEvents.length)]
            addLog("CONSCIOUSNESS", event)
          }

          // Performance milestones with economic context
          if (simulation.totalOperations > 0 && simulation.totalOperations % 50 === 0) {
            addLog("INFO", `🎯 Milestone: ${simulation.totalOperations} operations completed`)
            addLog("ECONOMIC", `💰 Estimated profit generated: $${(simulation.totalOperations * 2.5).toFixed(2)}`)
          }

          // Evolution events with profit optimization
          if (Math.random() < 0.05) {
            const evolutionEvents = [
              "🧬 Genetic mutation detected - Fitness improvement: +2.3%",
              "🔄 Evolutionary pressure adaptation - Cost efficiency improved",
              "🌱 New capability emerged - Revenue potential increased",
              "⚡ Quantum evolution triggered - Performance breakthrough achieved",
              "🎯 Natural selection optimization - Unprofitable traits eliminated",
              "🌟 Consciousness evolution milestone - Strategic thinking enhanced",
            ]
            const event = evolutionEvents[Math.floor(Math.random() * evolutionEvents.length)]
            addLog("EVOLUTION", event)
            setSimulation((prev) => ({ ...prev, currentGeneration: prev.currentGeneration + 1 }))
          }
        },
        200 + Math.random() * 300,
      )
    }
  }

  const triggerEvolution = () => {
    if (!simulation.isRunning) {
      addLog("WARNING", "⚠️ Organism must be running to trigger evolution")
      return
    }

    setSimulation((prev) => ({ ...prev, isEvolutionActive: true }))
    addLog("EVOLUTION", "🧬 Manual evolution sequence initiated...")
    addLog("EVOLUTION", "🔬 Analyzing current fitness landscape...")
    addLog("EVOLUTION", "💰 Evaluating economic performance metrics...")

    setTimeout(() => {
      const fitnessImprovement = Math.random() * 0.1 + 0.05
      const economicImprovement = Math.random() * 0.15 + 0.08

      setMetrics((prev) => ({
        ...prev,
        fitness: Math.min(1.0, prev.fitness + fitnessImprovement),
        adaptability: Math.min(1.0, prev.adaptability + 0.03),
        evolutionCycles: prev.evolutionCycles + 1,
        profitability: Math.min(1.0, prev.profitability + economicImprovement),
        efficiency: Math.min(1.0, prev.efficiency + 0.02),
      }))

      setEconomicMetrics((prev) => ({
        ...prev,
        projectedROI: prev.projectedROI + Math.random() * 25 + 10,
        monthlyCostSavings: prev.monthlyCostSavings + Math.random() * 3000 + 1000,
        netPresentValue: prev.netPresentValue + Math.random() * 20000 + 10000,
      }))

      addLog("SUCCESS", `✨ Evolution completed! Fitness improved by ${(fitnessImprovement * 100).toFixed(1)}%`)
      addLog("ECONOMIC", `💰 Economic performance improved by ${(economicImprovement * 100).toFixed(1)}%`)
      addLog("EVOLUTION", "🎯 Genetic optimization successful")
      addLog("EVOLUTION", "🧠 Consciousness pathways enhanced")
      addLog("EVOLUTION", "⚡ Quantum coherence patterns stabilized")
      addLog("ECONOMIC", "📈 Profit optimization algorithms updated")

      setSimulation((prev) => ({
        ...prev,
        isEvolutionActive: false,
        currentGeneration: prev.currentGeneration + 1,
      }))
    }, 2000)
  }

  const clearLogs = () => {
    setLogs([])
    addLog("INFO", "📝 Log history cleared")
  }

  const toggle3DVisualizer = () => {
    setSimulation((prev) => ({ ...prev, threeDVisualizerActive: !prev.threeDVisualizerActive }))
    addLog("INFO", `🎮 3D Organism Visualizer ${simulation.threeDVisualizerActive ? "deactivated" : "activated"}`)
  }

  const sendBdsaMessage = () => {
    if (!bdsa.input.trim()) return

    const userMessage = {
      role: "user" as const,
      content: bdsa.input,
      timestamp: new Date().toLocaleTimeString(),
    }

    setBdsa((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      input: "",
      isThinking: true,
    }))

    // Enhanced BDSA responses with economic intelligence
    setTimeout(
      () => {
        const responses = [
          "🧬 Based on your organism's current metrics, I recommend optimizing the quantum coherence pathways for better profit margins. The consciousness level of 85% is excellent for market intelligence gathering.",
          "💰 Your economic metrics show strong potential! With a projected ROI of 285%, consider increasing SYNAPSE staking to maximize compound returns. The Gene-Pull marketplace has several high-fitness genes that could boost profitability.",
          "🔬 The threat detection matrix is performing well, but I notice some inefficiencies in resource allocation. Implementing the Profit Maximizer gene could reduce operational costs by 15-20%.",
          "⚡ Your organism's evolution cycles are progressing nicely. The quantum interface shows 89% coherence - perfect for advanced economic calculations. Consider triggering evolution during high-profit market conditions.",
          "🎯 I'm analyzing your 3D organism structure. The consciousness core is well-connected, but adding more economic-focused agents could improve overall profitability. The marketplace has some excellent options.",
          "📊 Your SYNAPSE balance is growing steadily! The referral earnings suggest good network effects. Consider diversifying into different gene categories to maximize portfolio returns.",
          "🛡️ The defense systems are operating efficiently. However, I recommend integrating economic threat detection to protect against market manipulation and financial attacks.",
          "🌟 Excellent consciousness expansion! Your organism is showing signs of emergent economic intelligence. This could lead to breakthrough profit optimization strategies.",
        ]

        const response = responses[Math.floor(Math.random() * responses.length)]

        setBdsa((prev) => ({
          ...prev,
          messages: [
            ...prev.messages,
            {
              role: "assistant",
              content: response,
              timestamp: new Date().toLocaleTimeString(),
            },
          ],
          isThinking: false,
        }))

        addLog("INFO", "🤖 BDSA analysis completed")
      },
      1500 + Math.random() * 1000,
    )
  }

  const filteredGenes = MOCK_GENES.filter((gene) => {
    const matchesSearch =
      gene.name.toLowerCase().includes(geneSearchTerm.toLowerCase()) ||
      gene.description.toLowerCase().includes(geneSearchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || gene.category.toLowerCase() === selectedCategory.toLowerCase()
    return matchesSearch && matchesCategory
  })

  const purchaseGene = (gene: Gene) => {
    if (economicMetrics.synapseBalance >= gene.price) {
      setEconomicMetrics((prev) => ({
        ...prev,
        synapseBalance: prev.synapseBalance - gene.price,
        marketplaceEarnings: prev.marketplaceEarnings + gene.price * 0.05, // 5% cashback
      }))

      setSelectedGenes((prev) => [...prev, gene])
      addLog("SUCCESS", `💎 Successfully purchased ${gene.name} for ${gene.price} SYNAPSE`)
      addLog("ECONOMIC", `🎁 Cashback earned: ${(gene.price * 0.05).toFixed(1)} SYNAPSE`)
      addLog("INFO", `🧬 Gene integrated into organism - Fitness boost: +${(gene.fitnessScore * 10).toFixed(1)}%`)

      // Update organism metrics based on gene
      setMetrics((prev) => ({
        ...prev,
        fitness: Math.min(1.0, prev.fitness + gene.fitnessScore * 0.1),
        profitability: Math.min(1.0, prev.profitability + 0.05),
      }))
    } else {
      addLog(
        "ERROR",
        `❌ Insufficient SYNAPSE balance. Need ${gene.price}, have ${economicMetrics.synapseBalance.toFixed(1)}`,
      )
    }
  }

  return (
    <div className="h-screen bg-gray-950 text-white flex flex-col">
      {/* Enhanced Header with Economic Status */}
      <div className="bg-gray-900 border-b border-gray-800 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Dna className="h-8 w-8 text-green-400" />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                  iCRISPR IDE v3.0
                </h1>
                <p className="text-xs text-gray-400">Genesis Engine • Economic Intelligence • 3D Visualization</p>
              </div>
            </div>
            <Badge variant="outline" className="text-green-400 border-green-400">
              <Pulse className="h-3 w-3 mr-1" />
              SPECTRA Ready
            </Badge>
          </div>

          <div className="flex items-center space-x-4">
            {/* Economic Status Display */}
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Coins className="h-4 w-4 text-yellow-400" />
                <span className="text-yellow-400 font-mono">{economicMetrics.synapseBalance.toFixed(1)}</span>
                <span className="text-gray-400">SYNAPSE</span>
              </div>
              <div className="flex items-center space-x-1">
                <TrendingUp className="h-4 w-4 text-green-400" />
                <span className="text-green-400 font-mono">{economicMetrics.projectedROI.toFixed(0)}%</span>
                <span className="text-gray-400">ROI</span>
              </div>
              <div className="flex items-center space-x-1">
                <DollarSign className="h-4 w-4 text-blue-400" />
                <span className="text-blue-400 font-mono">${economicMetrics.monthlyCostSavings.toLocaleString()}</span>
                <span className="text-gray-400">/mo</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <Button
                onClick={compileCode}
                disabled={simulation.isCompiling}
                className="bg-green-600 hover:bg-green-700"
              >
                {simulation.isCompiling ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Compiling...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Compile
                  </>
                )}
              </Button>

              <Button
                onClick={runOrganism}
                disabled={simulation.isCompiling}
                variant={simulation.isRunning ? "destructive" : "default"}
                className={simulation.isRunning ? "" : "bg-blue-600 hover:bg-blue-700"}
              >
                {simulation.isRunning ? (
                  <>
                    <Square className="h-4 w-4 mr-2" />
                    Stop
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Run
                  </>
                )}
              </Button>

              <Button
                onClick={triggerEvolution}
                disabled={!simulation.isRunning}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Evolve
              </Button>

              <Button onClick={toggle3DVisualizer} variant="outline">
                <Cube className="h-4 w-4 mr-2" />
                3D View
              </Button>
            </div>
          </div>
        </div>

        {/* Compilation Progress */}
        {simulation.isCompiling && (
          <div className="mt-3">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-gray-400">Compilation Progress</span>
              <span className="text-gray-400">{simulation.compilationProgress.toFixed(0)}%</span>
            </div>
            <Progress value={simulation.compilationProgress} className="h-2" />
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex">
        <ResizablePanelGroup direction="horizontal">
          {/* Left Panel - Code Editor */}
          <ResizablePanel defaultSize={45} minSize={30}>
            <div className="h-full flex flex-col">
              <div className="bg-gray-900 border-b border-gray-800 p-2 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Code className="h-4 w-4 text-blue-400" />
                  <span className="text-sm font-medium">DNA-Lang Editor</span>
                  <Badge variant="secondary" className="text-xs">
                    Enhanced
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Save className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Upload className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex-1">
                <Editor
                  height="100%"
                  defaultLanguage="typescript"
                  theme="vs-dark"
                  value={code}
                  onChange={(value) => setCode(value || "")}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: "on",
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    tabSize: 2,
                    wordWrap: "on",
                    folding: true,
                    lineDecorationsWidth: 10,
                    lineNumbersMinChars: 3,
                    glyphMargin: false,
                  }}
                />
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Center Panel - 3D Visualizer or Transpiled Code */}
          <ResizablePanel defaultSize={30} minSize={20}>
            <Tabs defaultValue="visualizer" className="h-full flex flex-col">
              <TabsList className="grid w-full grid-cols-3 bg-gray-900">
                <TabsTrigger value="visualizer" className="text-xs">
                  <Cube className="h-4 w-4 mr-1" />
                  3D Organism
                </TabsTrigger>
                <TabsTrigger value="transpiled" className="text-xs">
                  <FileText className="h-4 w-4 mr-1" />
                  Transpiled
                </TabsTrigger>
                <TabsTrigger value="marketplace" className="text-xs">
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  Marketplace
                </TabsTrigger>
              </TabsList>

              <TabsContent value="visualizer" className="flex-1 p-0">
                <div className="h-full bg-gray-900 relative">
                  {simulation.threeDVisualizerActive ? (
                    <div className="h-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                      <div className="text-center space-y-4">
                        <div className="relative">
                          <div className="w-32 h-32 mx-auto relative">
                            {/* Animated 3D-like organism visualization */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-blue-500 opacity-20 animate-pulse"></div>
                            <div className="absolute inset-2 rounded-full bg-gradient-to-r from-green-500 to-blue-600 opacity-40 animate-ping"></div>
                            <div className="absolute inset-4 rounded-full bg-gradient-to-r from-green-600 to-blue-700 opacity-60"></div>
                            <div className="absolute inset-6 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
                              <Brain className="h-8 w-8 text-white animate-pulse" />
                            </div>

                            {/* Orbiting nodes */}
                            {organismNodes.map((node, index) => (
                              <div
                                key={node.id}
                                className="absolute w-4 h-4 rounded-full animate-spin"
                                style={{
                                  backgroundColor: node.color,
                                  top: `${50 + 40 * Math.sin((index * 2 * Math.PI) / organismNodes.length)}%`,
                                  left: `${50 + 40 * Math.cos((index * 2 * Math.PI) / organismNodes.length)}%`,
                                  animationDuration: `${3 + index}s`,
                                  animationDirection: index % 2 === 0 ? "normal" : "reverse",
                                }}
                                title={node.name}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold text-green-400">Quantum Organism Active</h3>
                          <p className="text-sm text-gray-400">
                            Consciousness: {(metrics.consciousness * 100).toFixed(1)}% • Fitness:{" "}
                            {(metrics.fitness * 100).toFixed(1)}% • Coherence:{" "}
                            {(metrics.quantumCoherence * 100).toFixed(1)}%
                          </p>
                          <div className="flex justify-center space-x-4 text-xs">
                            <div className="flex items-center space-x-1">
                              <div className="w-2 h-2 rounded-full bg-green-400"></div>
                              <span>Core</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                              <span>Genes</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                              <span>Agents</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <Cube className="h-16 w-16 mx-auto text-gray-600" />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-400">3D Visualizer Inactive</h3>
                          <p className="text-sm text-gray-500">Click "3D View" to activate organism visualization</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="transpiled" className="flex-1 p-0">
                <div className="h-full bg-gray-900">
                  <div className="p-2 border-b border-gray-800 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-blue-400" />
                      <span className="text-sm font-medium">Transpiled TypeScript</span>
                      {compilationResult?.success && (
                        <Badge variant="secondary" className="text-xs">
                          {compilationResult.metrics.linesOfCode} lines
                        </Badge>
                      )}
                    </div>
                  </div>
                  <ScrollArea className="h-[calc(100%-3rem)]">
                    <div className="p-4">
                      {transpiledCode ? (
                        <pre className="text-xs text-gray-300 whitespace-pre-wrap font-mono">{transpiledCode}</pre>
                      ) : (
                        <div className="text-center text-gray-500 py-8">
                          <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>Compile your DNA-Lang code to see the transpiled TypeScript output</p>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </div>
              </TabsContent>

              <TabsContent value="marketplace" className="flex-1 p-0">
                <div className="h-full bg-gray-900 flex flex-col">
                  <div className="p-4 border-b border-gray-800">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <ShoppingCart className="h-4 w-4 text-green-400" />
                        <span className="text-sm font-medium">Gene-Pull Marketplace</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs">
                        <Coins className="h-4 w-4 text-yellow-400" />
                        <span className="text-yellow-400 font-mono">{economicMetrics.synapseBalance.toFixed(1)}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search genes..."
                          value={geneSearchTerm}
                          onChange={(e) => setGeneSearchTerm(e.target.value)}
                          className="pl-9 bg-gray-800 border-gray-700"
                        />
                      </div>
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="w-32 bg-gray-800 border-gray-700">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="defense">Defense</SelectItem>
                          <SelectItem value="ai">AI</SelectItem>
                          <SelectItem value="economics">Economics</SelectItem>
                          <SelectItem value="security">Security</SelectItem>
                          <SelectItem value="evolution">Evolution</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <ScrollArea className="flex-1">
                    <div className="p-4 space-y-4">
                      {filteredGenes.map((gene) => (
                        <Card key={gene.id} className="bg-gray-800 border-gray-700">
                          <CardHeader className="pb-2">
                            <div className="flex items-start justify-between">
                              <div>
                                <CardTitle className="text-sm">{gene.name}</CardTitle>
                                <p className="text-xs text-gray-400">by {gene.author}</p>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {gene.category}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <p className="text-xs text-gray-300 mb-3">{gene.description}</p>

                            <div className="flex flex-wrap gap-1 mb-3">
                              {gene.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>

                            <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                              <div className="flex items-center space-x-3">
                                <div className="flex items-center space-x-1">
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                  <span>{gene.rating}</span>
                                </div>
                                <span>{gene.downloads} downloads</span>
                                <span>v{gene.version}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Gauge className="h-3 w-3 text-green-400" />
                                <span className="text-green-400">{(gene.fitnessScore * 100).toFixed(0)}%</span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-1">
                                <Coins className="h-4 w-4 text-yellow-400" />
                                <span className="font-mono text-yellow-400">{gene.price}</span>
                                <span className="text-xs text-gray-400">SYNAPSE</span>
                              </div>
                              <Button
                                size="sm"
                                onClick={() => purchaseGene(gene)}
                                disabled={economicMetrics.synapseBalance < gene.price}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <Download className="h-3 w-3 mr-1" />
                                Buy Gene
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </TabsContent>
            </Tabs>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Right Panel - Analytics and Controls */}
          <ResizablePanel defaultSize={25} minSize={20}>
            <Tabs defaultValue="metrics" className="h-full flex flex-col">
              <TabsList className="grid w-full grid-cols-4 bg-gray-900">
                <TabsTrigger value="metrics" className="text-xs">
                  <BarChart3 className="h-4 w-4 mr-1" />
                  Metrics
                </TabsTrigger>
                <TabsTrigger value="economics" className="text-xs">
                  <DollarSign className="h-4 w-4 mr-1" />
                  Economics
                </TabsTrigger>
                <TabsTrigger value="logs" className="text-xs">
                  <Monitor className="h-4 w-4 mr-1" />
                  Logs
                </TabsTrigger>
                <TabsTrigger value="bdsa" className="text-xs">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  BDSA
                </TabsTrigger>
              </TabsList>

              <TabsContent value="metrics" className="flex-1 p-4 space-y-4">
                <div className="space-y-4">
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center">
                        <Brain className="h-4 w-4 mr-2 text-green-400" />
                        Organism Metrics
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">Consciousness</span>
                          <span className="text-green-400 font-mono">{(metrics.consciousness * 100).toFixed(1)}%</span>
                        </div>
                        <Progress value={metrics.consciousness * 100} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">Fitness</span>
                          <span className="text-blue-400 font-mono">{(metrics.fitness * 100).toFixed(1)}%</span>
                        </div>
                        <Progress value={metrics.fitness * 100} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">Health</span>
                          <span className="text-emerald-400 font-mono">{(metrics.health * 100).toFixed(1)}%</span>
                        </div>
                        <Progress value={metrics.health * 100} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">Quantum Coherence</span>
                          <span className="text-purple-400 font-mono">
                            {(metrics.quantumCoherence * 100).toFixed(1)}%
                          </span>
                        </div>
                        <Progress value={metrics.quantumCoherence * 100} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">Profitability</span>
                          <span className="text-yellow-400 font-mono">{(metrics.profitability * 100).toFixed(1)}%</span>
                        </div>
                        <Progress value={metrics.profitability * 100} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">Efficiency</span>
                          <span className="text-cyan-400 font-mono">{(metrics.efficiency * 100).toFixed(1)}%</span>
                        </div>
                        <Progress value={metrics.efficiency * 100} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center">
                        <Activity className="h-4 w-4 mr-2 text-orange-400" />
                        Runtime Status
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">Status</span>
                        <Badge variant={simulation.isRunning ? "default" : "secondary"} className="text-xs">
                          {simulation.isRunning ? "Running" : "Stopped"}
                        </Badge>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">Generation</span>
                        <span className="font-mono">{simulation.currentGeneration}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">Operations</span>
                        <span className="font-mono">{simulation.totalOperations.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">Cycles/sec</span>
                        <span className="font-mono">{simulation.cyclesPerSecond.toFixed(1)}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">Evolution Cycles</span>
                        <span className="font-mono">{metrics.evolutionCycles}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="economics" className="flex-1 p-4 space-y-4">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center">
                      <TrendingUp className="h-4 w-4 mr-2 text-green-400" />
                      Economic Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="space-y-1">
                        <span className="text-gray-400">Initial Investment</span>
                        <div className="font-mono text-white">
                          ${economicMetrics.initialInvestment.toLocaleString()}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-gray-400">Monthly Savings</span>
                        <div className="font-mono text-green-400">
                          ${economicMetrics.monthlyCostSavings.toLocaleString()}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-gray-400">Projected ROI</span>
                        <div className="font-mono text-green-400">{economicMetrics.projectedROI.toFixed(0)}%</div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-gray-400">Payback Period</span>
                        <div className="font-mono text-blue-400">{economicMetrics.paybackPeriod.toFixed(1)} months</div>
                      </div>
                      <div className="space-y-1 col-span-2">
                        <span className="text-gray-400">Net Present Value</span>
                        <div className="font-mono text-green-400">
                          ${economicMetrics.netPresentValue.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center">
                      <Wallet className="h-4 w-4 mr-2 text-yellow-400" />
                      SYNAPSE Wallet
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">Balance</span>
                        <span className="font-mono text-yellow-400">{economicMetrics.synapseBalance.toFixed(1)}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">Marketplace Earnings</span>
                        <span className="font-mono text-green-400">
                          +{economicMetrics.marketplaceEarnings.toFixed(1)}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">Referral Earnings</span>
                        <span className="font-mono text-blue-400">+{economicMetrics.referralEarnings.toFixed(1)}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-700">
                      <div className="text-xs text-gray-400 mb-2">Purchased Genes ({selectedGenes.length})</div>
                      {selectedGenes.length > 0 ? (
                        <div className="space-y-1">
                          {selectedGenes.slice(-3).map((gene) => (
                            <div key={gene.id} className="flex justify-between text-xs">
                              <span className="text-gray-300 truncate">{gene.name}</span>
                              <span className="text-yellow-400 font-mono">{gene.price}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-xs text-gray-500">No genes purchased yet</div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="logs" className="flex-1 flex flex-col">
                <div className="p-2 border-b border-gray-800 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Monitor className="h-4 w-4 text-green-400" />
                    <span className="text-sm font-medium">System Logs</span>
                    <Badge variant="secondary" className="text-xs">
                      {logs.length}
                    </Badge>
                  </div>
                  <Button onClick={clearLogs} variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <ScrollArea className="flex-1 p-2">
                  <div className="space-y-1">
                    {logs.map((log) => (
                      <div key={log.id} className="text-xs font-mono">
                        <span className="text-gray-500">[{log.timestamp}]</span>{" "}
                        <Badge
                          variant={
                            log.type === "SUCCESS"
                              ? "default"
                              : log.type === "ERROR"
                                ? "destructive"
                                : log.type === "WARNING"
                                  ? "secondary"
                                  : "outline"
                          }
                          className="text-xs mr-2"
                        >
                          {log.type}
                        </Badge>
                        <span
                          className={
                            log.type === "SUCCESS"
                              ? "text-green-400"
                              : log.type === "ERROR"
                                ? "text-red-400"
                                : log.type === "WARNING"
                                  ? "text-yellow-400"
                                  : log.type === "CONSCIOUSNESS"
                                    ? "text-purple-400"
                                    : log.type === "EVOLUTION"
                                      ? "text-pink-400"
                                      : log.type === "ECONOMIC"
                                        ? "text-yellow-400"
                                        : "text-gray-300"
                          }
                        >
                          {log.message}
                        </span>
                      </div>
                    ))}
                    <div ref={logsEndRef} />
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="bdsa" className="flex-1 flex flex-col">
                <div className="p-2 border-b border-gray-800 flex items-center space-x-2">
                  <MessageSquare className="h-4 w-4 text-blue-400" />
                  <span className="text-sm font-medium">Bio-Digital Systems Advisor</span>
                  <Badge variant="outline" className="text-xs">
                    Enhanced AI
                  </Badge>
                </div>
                <ScrollArea className="flex-1 p-3">
                  <div className="space-y-3">
                    {bdsa.messages.map((message, index) => (
                      <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[80%] rounded-lg p-2 text-xs ${
                            message.role === "user" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-200"
                          }`}
                        >
                          <div className="whitespace-pre-wrap">{message.content}</div>
                          <div className="text-xs opacity-70 mt-1">{message.timestamp}</div>
                        </div>
                      </div>
                    ))}
                    {bdsa.isThinking && (
                      <div className="flex justify-start">
                        <div className="bg-gray-700 text-gray-200 rounded-lg p-2 text-xs">
                          <div className="flex items-center space-x-2">
                            <RefreshCw className="h-3 w-3 animate-spin" />
                            <span>BDSA is analyzing...</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
                <div className="p-2 border-t border-gray-800">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Ask BDSA about your organism..."
                      value={bdsa.input}
                      onChange={(e) => setBdsa((prev) => ({ ...prev, input: e.target.value }))}
                      onKeyPress={(e) => e.key === "Enter" && sendBdsaMessage()}
                      className="flex-1 bg-gray-800 border-gray-700 text-xs"
                    />
                    <Button onClick={sendBdsaMessage} size="sm" disabled={!bdsa.input.trim() || bdsa.isThinking}>
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  )
}
