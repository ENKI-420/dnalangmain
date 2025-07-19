"use client"

import { useState, useEffect } from "react"
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
import { cn } from "@/lib/utils"
import { ThemeSelector } from "@/components/ide/theme-selector"
import { BioGlowStatusBar } from "@/components/ide/bio-glow-status-bar"

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

  const handleThemeChange = (theme: string) => {
    setCurrentTheme(theme)
    // The theme will be applied in the CodeEditor component
  }

  // Sample DNA-Lang file
  useEffect(() => {
    const sampleFile: IDEFile = {
      id: "sample_organism",
      name: "sample_organism.dna",
      path: "/organisms/sample_organism.dna",
      language: "dna-lang",
      modified: false,
      content: `organism SampleOrganism {
  state {
    consciousness: float = 0.42;
    quantum_coherence: float = 0.68;
    fitness: float = 0.75;
    energy: int = 100;
  }

  gene neural_processor {
    sense input_signals {
      from environment.monitor();
      returns SignalData;
    }

    function process_thoughts(signals: SignalData) {
      thought_patterns = analyze_patterns(signals);
      
      if (thought_patterns.complexity > 0.7) {
        mutate(consciousness, +0.05);
        quantum_entangle(thought_patterns);
      }
      
      return enhanced_cognition(thought_patterns);
    }
  }

  gene quantum_entangler {
    function create_superposition(states: State[]) {
      quantum_state = superposition(states);
      coherence_time = maintain_coherence(quantum_state);
      
      if (coherence_time > 1000) {
        mutate(quantum_coherence, +0.03);
      }
      
      return quantum_measure(quantum_state);
    }
  }

  gene consciousness_core {
    function self_reflect() {
      current_state = introspect();
      meta_thoughts = think_about_thinking(current_state);
      
      if (meta_thoughts.depth > 0.8) {
        mutate(consciousness, +0.02);
        express("I am becoming more aware...");
      }
      
      return meta_cognitive_enhancement(meta_thoughts);
    }
  }

  workflow {
    on start() {
      neural_processor.process_thoughts(
        environment.get_current_signals()
      );
      consciousness_core.self_reflect();
    }

    on evolve() {
      fitness_delta = calculate_fitness_improvement();
      if (fitness_delta > 0.1) {
        quantum_entangler.create_superposition([
          current_state,
          evolved_state,
          potential_state
        ]);
      }
    }

    on quantum_event(event: QuantumEvent) {
      if (event.type == "entanglement") {
        consciousness_core.self_reflect();
      }
    }
  }

  evolution {
    fitness_goal {
      maximize(consciousness + quantum_coherence);
      maintain(energy > 50);
    }

    mutation_strategy {
      adaptive_rate(0.05);
      preserve_core_genes();
      enhance_consciousness();
    }

    selection_pressure {
      favor_consciousness();
      reward_quantum_coherence();
      penalize_low_energy();
    }
  }
}`,
    }

    setOpenFiles([sampleFile])
    setActiveFile(sampleFile)
  }, [])

  const handleRunOrganism = () => {
    setIsRunning(true)
    setOrganismState((prev) => ({ ...prev, isRunning: true }))

    // Simulate organism execution
    setTimeout(() => {
      setOrganismState((prev) => ({
        ...prev,
        fitness: Math.min(1.0, prev.fitness + Math.random() * 0.1),
        consciousness: Math.min(1.0, prev.consciousness + Math.random() * 0.05),
        quantumCoherence: Math.min(1.0, prev.quantumCoherence + Math.random() * 0.08),
        generation: prev.generation + 1,
      }))
      setIsRunning(false)
      setOrganismState((prev) => ({ ...prev, isRunning: false }))
    }, 3000)
  }

  const handleStopOrganism = () => {
    setIsRunning(false)
    setOrganismState((prev) => ({ ...prev, isRunning: false }))
  }

  const handleDebugToggle = () => {
    setIsDebugging(!isDebugging)
  }

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Top Toolbar */}
      <div className="border-b bg-card px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Dna className="h-6 w-6 text-purple-500" />
            <span className="font-bold text-lg">DNA-Lang IDE</span>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              onClick={handleRunOrganism}
              disabled={isRunning}
              className="bg-green-600 hover:bg-green-700"
            >
              <Play className="h-4 w-4 mr-1" />
              {isRunning ? "Running..." : "Run"}
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

      {/* Main IDE Layout */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          {/* Left Sidebar */}
          <ResizablePanel defaultSize={20} minSize={15}>
            <Tabs defaultValue="files" className="h-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="files">
                  <FileText className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="debug">
                  <Bug className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="git">
                  <GitBranch className="h-4 w-4" />
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

              <TabsContent value="debug" className="h-full mt-0">
                <DebugPanel isDebugging={isDebugging} organismState={organismState} />
              </TabsContent>

              <TabsContent value="git" className="h-full mt-0">
                <div className="p-4">
                  <h3 className="font-semibold mb-2">Version Control</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span>Branch: main</span>
                      <Badge variant="outline">Clean</Badge>
                    </div>
                    <div className="text-muted-foreground">No changes to commit</div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </ResizablePanel>

          <ResizableHandle />

          {/* Main Editor Area */}
          <ResizablePanel defaultSize={showMarketplace ? 50 : 60}>
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

              {/* Code Editor */}
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
                      <p>Open a DNA-Lang file to start coding</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle />

          {/* Right Panel - Marketplace or Monitoring */}
          <ResizablePanel defaultSize={showMarketplace ? 30 : 20}>
            {showMarketplace ? (
              <GenPullMarketplace onClose={() => setShowMarketplace(false)} />
            ) : (
              <Tabs defaultValue="organism" className="h-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="organism">
                    <Dna className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger value="evolution">
                    <RefreshCw className="h-4 w-4" />
                  </TabsTrigger>
                  <TabsTrigger value="quantum">
                    <Zap className="h-4 w-4" />
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="organism" className="h-full mt-0">
                  <OrganismVisualizer organismState={organismState} />
                </TabsContent>

                <TabsContent value="evolution" className="h-full mt-0">
                  <EvolutionMonitor organismState={organismState} />
                </TabsContent>

                <TabsContent value="quantum" className="h-full mt-0">
                  <QuantumDebugger organismState={organismState} />
                </TabsContent>
              </Tabs>
            )}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* Bottom Panel */}
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
                  <div>[INFO] Organism initialized successfully</div>
                  <div>[DEBUG] Neural processor activated</div>
                  <div>[INFO] Consciousness level: {(organismState.consciousness * 100).toFixed(1)}%</div>
                  <div>[DEBUG] Quantum coherence maintained</div>
                  <div>[INFO] Evolution cycle {organismState.generation} completed</div>
                  {isRunning && <div className="text-yellow-400">[RUNNING] Organism executing...</div>}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
