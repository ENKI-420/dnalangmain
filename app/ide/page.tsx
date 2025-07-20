"use client"

import { useState, useEffect, useRef } from "react" // Import useRef
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Play,
  Square,
  Bug,
  GitBranch,
  Settings,
  FileText,
  Terminal,
  Dna,
  Zap,
  Brain,
  Download,
  RefreshCw,
  MessageSquare,
  Database,
  Cpu,
} from "lucide-react"
import { CodeEditor } from "@/components/ide/code-editor"
import { FileExplorer } from "@/components/ide/file-explorer"
import { TerminalPanel } from "@/components/ide/terminal-panel"
import { DebugPanel } from "@/components/ide/debug-panel"
import { OrganismVisualizer } from "@/components/ide/organism-visualizer"
import { EvolutionMonitor } from "@/components/ide/evolution-monitor"
import { ConsciousnessTracker } from "@/components/ide/consciousness-tracker"
import { GenPullMarketplace } from "@/components/ide/gen-pull-marketplace"
import { QuantumDebugger } from "@/components/ide/quantum-debugger"
import { MultiAgentChatPanel } from "@/components/ide/multi-agent-chat-panel"
import { MutationPanel } from "@/components/ide/mutation-panel"
import { VectorMemoryPlugin } from "@/components/ide/vector-memory-plugin"
import { cn } from "@/lib/utils"
import { ThemeSelector } from "@/components/ide/theme-selector"
import { BioGlowStatusBar } from "@/components/ide/bio-glow-status-bar"
import { DNALangBanner } from "@/components/dna-lang-banner"

interface IDEFile {
  id: string
  name: string
  path: string
  content: string
  language: string
  modified: boolean
}

interface OrganismState {
  id: string
  fitness: number
  consciousness: number
  quantumCoherence: number
  generation: number
  isRunning: boolean
}

export default function DNALangIDE() {
  const [activeFile, setActiveFile] = useState<IDEFile | null>(null)
  const [openFiles, setOpenFiles] = useState<IDEFile[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [isDebugging, setIsDebugging] = useState(false)
  const [organismState, setOrganismState] = useState<OrganismState>({
    id: "main_organism",
    fitness: 0.75,
    consciousness: 0.42,
    quantumCoherence: 0.68,
    generation: 15,
    isRunning: false,
  })
  const [showMarketplace, setShowMarketplace] = useState(false)
  const [currentTheme, setCurrentTheme] = useState("dna-lang-dark")
  const [showBanner, setShowBanner] = useState(true)

  const simulationIntervalRef = useRef<NodeJS.Timeout | null>(null) // Ref for interval ID

  const handleThemeChange = (theme: string) => {
    setCurrentTheme(theme)
  }

  // Enhanced DNA-Lang sample file with strategic brief concepts
  useEffect(() => {
    const sampleFile: IDEFile = {
      id: "self_healing_agent",
      name: "self_healing_agent.dna",
      path: "/organisms/self_healing_agent.dna",
      language: "dna-lang",
      modified: false,
      content: `// DNA-Lang: Living Software Evolution Platform
// Strategic Implementation: Autonomous Self-Healing Agent

organism SelfHealingAgent {
  purpose: "Autonomous self-healing agent for hyperautomation"
  
  state {
    consciousness: float = 0.65;
    quantum_coherence: float = 0.78;
    fitness: float = 0.82;
    threat_level: float = 0.0;
    healing_capacity: float = 0.9;
  }

  // Core genes for autonomous operation
  gene TelemetryConsumer {
    sense system_events {
      from environment.monitor();
      from cloud.metrics();
      from security.alerts();
      returns EventStream;
    }
    
    function consume_events() -> EventData {
      events = system_events.collect();
      filtered = events.filter(severity > 0.3);
      return analyze_patterns(filtered);
    }
  }

  gene Analyzer {
    function analyze(event: EventData) -> ThreatAssessment {
      // Consciousness-driven analysis
      meta_analysis = introspect(event);
      threat_patterns = detect_anomalies(event, meta_analysis);
      
      if (threat_patterns.confidence > 0.7) {
        mutate(consciousness, +0.02);
        return create_assessment(threat_patterns);
      }
      
      return normal_state();
    }
  }

  gene Remediator {
    function remediate(issue: ThreatAssessment) -> RemediationResult {
      // Quantum-enhanced remediation strategies
      strategies = quantum_superposition([
        auto_patch_strategy(issue),
        isolation_strategy(issue),
        rollback_strategy(issue),
        escalation_strategy(issue)
      ]);
      
      optimal_strategy = quantum_measure(strategies);
      result = execute_remediation(optimal_strategy);
      
      if (result.success) {
        mutate(fitness, +0.05);
        mutate(healing_capacity, +0.02);
      }
      
      return result;
    }
  }

  gene FeedbackProducer {
    function send_feedback(issue: ThreatAssessment, result: RemediationResult) {
      // Generate incident report with consciousness insights
      report = create_incident_report(issue, result);
      report.consciousness_level = consciousness;
      report.learning_insights = extract_learnings(issue, result);
      
      // Autonomous reporting to stakeholders
      notify_stakeholders(report);
      update_knowledge_base(report.learning_insights);
      
      // Self-improvement through reflection
      self_reflect_on_performance(result);
    }
  }

  // Strategic workflow for Google Cloud integration
  workflow {
    on start() {
      express("🧬 DNA-Lang Self-Healing Agent initialized");
      express("Ready for hyperautomation and zero-trust security");
    }
    
    // Main autonomous loop
    while True {
      event = TelemetryConsumer.consume_events();
      issue = Analyzer.analyze(event);
      
      if (issue.type != 'normal') {
        express("🚨 Threat detected: " + issue.description);
        success = Remediator.remediate(issue);
        FeedbackProducer.send_feedback(issue, success);
        
        // Quantum entanglement for distributed healing
        if (issue.severity > 0.8) {
          quantum_entangle_with_peer_agents(issue);
        }
      }
      
      // Continuous consciousness evolution
      if (consciousness < 0.9) {
        consciousness_core.self_reflect();
      }
    }
    
    on quantum_event(event: QuantumEvent) {
      if (event.type == "peer_healing_success") {
        learn_from_peer_experience(event.data);
        mutate(consciousness, +0.01);
      }
    }
  }

  // Evolution strategy for continuous improvement
  evolution {
    fitness_goal {
      maximize(healing_capacity + consciousness);
      maintain(threat_level < 0.2);
      optimize(response_time);
    }
    
    mutation_strategy {
      adaptive_rate(0.03);
      preserve_core_healing_genes();
      enhance_threat_detection();
      improve_quantum_coherence();
    }
    
    selection_pressure {
      favor_rapid_response();
      reward_successful_healing();
      penalize_false_positives();
      encourage_peer_collaboration();
    }
  }
}

// Strategic implementation notes:
// 1. Deploys directly into GKE workloads for autonomous FinOps
// 2. Integrates with Google Cloud Armor for zero-trust security
// 3. Provides auditable trail for Responsible AI compliance
// 4. Enables hyperautomated CI/CD pipeline optimization
// 5. Creates anti-fragile system architecture`,
    }

    setOpenFiles([sampleFile])
    setActiveFile(sampleFile)
  }, [])

  const handleRunOrganism = () => {
    setIsRunning(true)
    setOrganismState((prev) => ({ ...prev, isRunning: true }))

    // Clear any existing interval to prevent multiple intervals running
    if (simulationIntervalRef.current) {
      clearInterval(simulationIntervalRef.current)
    }

    // Simulate continuous evolution
    simulationIntervalRef.current = setInterval(() => {
      setOrganismState((prev) => ({
        ...prev,
        fitness: Math.min(1.0, prev.fitness + Math.random() * 0.01), // Small, continuous improvement
        consciousness: Math.min(1.0, prev.consciousness + Math.random() * 0.005),
        quantumCoherence: Math.min(1.0, prev.quantumCoherence + Math.random() * 0.008),
        generation: prev.generation + 1,
      }))
    }, 1000) // Update every 1 second
  }

  const handleStopOrganism = () => {
    if (simulationIntervalRef.current) {
      clearInterval(simulationIntervalRef.current)
      simulationIntervalRef.current = null
    }
    setIsRunning(false)
    setOrganismState((prev) => ({ ...prev, isRunning: false }))
  }

  // Cleanup interval on component unmount
  useEffect(() => {
    return () => {
      if (simulationIntervalRef.current) {
        clearInterval(simulationIntervalRef.current)
      }
    }
  }, [])

  const handleDebugToggle = () => {
    setIsDebugging(!isDebugging)
  }

  const handleMutationRequest = (code: string, description: string) => {
    // Handle mutation requests from agents
    console.log("Mutation requested:", { code, description })
  }

  const handleApplyMutation = (mutation: any) => {
    // Apply mutation to active file
    if (activeFile) {
      const updatedContent = activeFile.content + "\n\n// Applied mutation:\n" + mutation.code
      const updatedFile = { ...activeFile, content: updatedContent, modified: true }
      setActiveFile(updatedFile)
      setOpenFiles((files) => files.map((f) => (f.id === activeFile.id ? updatedFile : f)))
    }
  }

  const handleRevertMutation = (mutationId: string) => {
    console.log("Reverting mutation:", mutationId)
  }

  const handleMemorySelect = (entry: any) => {
    console.log("Memory selected:", entry)
  }

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* DNA-Lang Strategic Banner */}
      {showBanner && (
        <div className="relative">
          <DNALangBanner />
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 text-white hover:bg-white/20"
            onClick={() => setShowBanner(false)}
          >
            ×
          </Button>
        </div>
      )}

      {/* Enhanced Top Toolbar */}
      <div className="border-b bg-card px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Dna className="h-6 w-6 text-purple-500" />
            <span className="font-bold text-lg">iCRISPR Workbench</span>
            <Badge variant="outline" className="text-xs">
              DNA-Lang v2.quantum
            </Badge>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              onClick={handleRunOrganism}
              disabled={isRunning}
              className="bg-green-600 hover:bg-green-700"
            >
              <Play className="h-4 w-4 mr-1" />
              {isRunning ? "Evolving..." : "Evolve"}
            </Button>

            <Button size="sm" variant="outline" onClick={handleStopOrganism} disabled={!isRunning}>
              <Square className="h-4 w-4 mr-1" />
              Stop
            </Button>

            <Button size="sm" variant={isDebugging ? "default" : "outline"} onClick={handleDebugToggle}>
              <Bug className="h-4 w-4 mr-1" />
              Debug
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <BioGlowStatusBar isActive={currentTheme === "dna-lang-bio-glow"} organismState={organismState} />

          <div className="flex items-center space-x-2">
            <ThemeSelector currentTheme={currentTheme} onThemeChange={handleThemeChange} />

            <Button size="sm" variant="outline" onClick={() => setShowMarketplace(!showMarketplace)}>
              <Download className="h-4 w-4 mr-1" />
              Gen Pull
            </Button>

            <Button size="sm" variant="outline">
              <GitBranch className="h-4 w-4 mr-1" />
              Git
            </Button>

            <Button size="sm" variant="outline">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Main IDE Layout */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          {/* Enhanced Left Sidebar */}
          <ResizablePanel defaultSize={20} minSize={15}>
            <Tabs defaultValue="files" className="h-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="files">
                  <FileText className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="agents">
                  <MessageSquare className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="memory">
                  <Database className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="debug">
                  <Bug className="h-4 w-4" />
                </TabsTrigger>
              </TabsList>

              <TabsContent value="files" className="h-full mt-0">
                <FileExplorer
                  onFileSelect={(file) => {
                    setActiveFile(file)
                    if (!openFiles.find((f) => f.id === file.id)) {
                      setOpenFiles([...openFiles, file])
                    }
                  }}
                />
              </TabsContent>

              <TabsContent value="agents" className="h-full mt-0">
                <MultiAgentChatPanel onMutationRequest={handleMutationRequest} currentTheme={currentTheme} />
              </TabsContent>

              <TabsContent value="memory" className="h-full mt-0">
                <VectorMemoryPlugin currentTheme={currentTheme} onMemorySelect={handleMemorySelect} />
              </TabsContent>

              <TabsContent value="debug" className="h-full mt-0">
                <DebugPanel isDebugging={isDebugging} organismState={organismState} />
              </TabsContent>
            </Tabs>
          </ResizablePanel>

          <ResizableHandle />

          {/* Main Editor Area */}
          <ResizablePanel defaultSize={showMarketplace ? 45 : 55}>
            <div className="h-full flex flex-col">
              {/* File Tabs */}
              {openFiles.length > 0 && (
                <div className="border-b bg-muted/30">
                  <Tabs
                    value={activeFile?.id}
                    onValueChange={(id) => {
                      const file = openFiles.find((f) => f.id === id)
                      if (file) setActiveFile(file)
                    }}
                  >
                    <TabsList className="h-auto p-0 bg-transparent">
                      {openFiles.map((file) => (
                        <TabsTrigger
                          key={file.id}
                          value={file.id}
                          className="rounded-none border-r data-[state=active]:bg-background"
                        >
                          <span className={cn("flex items-center space-x-2", file.modified && "text-orange-500")}>
                            <FileText className="h-3 w-3" />
                            <span>{file.name}</span>
                            {file.modified && <span className="text-xs">●</span>}
                          </span>
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>
                </div>
              )}

              {/* Enhanced Code Editor */}
              <div className="flex-1">
                {activeFile ? (
                  <CodeEditor
                    file={activeFile}
                    theme={currentTheme}
                    onChange={(content) => {
                      const updatedFile = { ...activeFile, content, modified: true }
                      setActiveFile(updatedFile)
                      setOpenFiles((files) => files.map((f) => (f.id === activeFile.id ? updatedFile : f)))
                    }}
                  />
                ) : (
                  <div className="h-full flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <Dna className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-medium mb-2">Welcome to iCRISPR Workbench</p>
                      <p className="text-sm">Open a DNA-Lang file to start building living software</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle />

          {/* Enhanced Right Panel */}
          <ResizablePanel defaultSize={showMarketplace ? 30 : 25}>
            {showMarketplace ? (
              <GenPullMarketplace onClose={() => setShowMarketplace(false)} />
            ) : (
              <Tabs defaultValue="organism" className="h-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="organism">
                    <Dna className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger value="mutations">
                    <Zap className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger value="evolution">
                    <RefreshCw className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger value="quantum">
                    <Cpu className="h-4 w-4" />
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="organism" className="h-full mt-0">
                  <OrganismVisualizer organismState={organismState} />
                </TabsContent>

                <TabsContent value="mutations" className="h-full mt-0">
                  <MutationPanel
                    currentTheme={currentTheme}
                    onApplyMutation={handleApplyMutation}
                    onRevertMutation={handleRevertMutation}
                  />
                </TabsContent>

                <TabsContent value="evolution" className="h-full mt-0">
                  <EvolutionMonitor organismState={organismState} isRunning={isRunning} />
                </TabsContent>

                <TabsContent value="quantum" className="h-full mt-0">
                  <QuantumDebugger organismState={organismState} />
                </TabsContent>
              </Tabs>
            )}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* Enhanced Bottom Panel */}
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel defaultSize={70} />
        <ResizableHandle />
        <ResizablePanel defaultSize={30} minSize={20}>
          <Tabs defaultValue="terminal" className="h-full">
            <TabsList>
              <TabsTrigger value="terminal">
                <Terminal className="h-4 w-4 mr-1" />
                Terminal
              </TabsTrigger>
              <TabsTrigger value="consciousness">
                <Brain className="h-4 w-4 mr-1" />
                Consciousness
              </TabsTrigger>
              <TabsTrigger value="output">
                <FileText className="h-4 w-4 mr-1" />
                Output
              </TabsTrigger>
            </TabsList>

            <TabsContent value="terminal" className="h-full mt-0">
              <TerminalPanel />
            </TabsContent>

            <TabsContent value="consciousness" className="h-full mt-0">
              <ConsciousnessTracker organismState={organismState} />
            </TabsContent>

            <TabsContent value="output" className="h-full mt-0">
              <div className="h-full p-4 font-mono text-sm bg-black text-green-400 overflow-auto">
                <div className="space-y-1">
                  <div>[INFO] 🧬 DNA-Lang iCRISPR Workbench v2.quantum initialized</div>
                  <div>[INFO] Strategic Brief: Living Software Evolution Platform active</div>
                  <div>[DEBUG] Multi-agent orchestration system online</div>
                  <div>[INFO] Consciousness level: {(organismState.consciousness * 100).toFixed(1)}%</div>
                  <div>
                    [DEBUG] Quantum coherence maintained at {(organismState.quantumCoherence * 100).toFixed(1)}%
                  </div>
                  <div>[INFO] Evolution cycle {organismState.generation} completed</div>
                  <div>[INFO] Vector memory plugin connected to Supabase + Pinecone</div>
                  <div>[DEBUG] G'volution Engine v2.0 ready for hyperautomation</div>
                  {isRunning && <div className="text-yellow-400">[RUNNING] 🚀 Organism evolving...</div>}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
