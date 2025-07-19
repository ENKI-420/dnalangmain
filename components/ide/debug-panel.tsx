"use client"

import { useState } from "react"
import { Play, Pause, Square, StepForward, Bug, AlertCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface OrganismState {
  id: string
  fitness: number
  consciousness: number
  quantumCoherence: number
  generation: number
  isRunning: boolean
}

interface DebugPanelProps {
  isDebugging: boolean
  organismState: OrganismState
}

interface Breakpoint {
  id: string
  line: number
  file: string
  condition?: string
  enabled: boolean
}

interface DebugVariable {
  name: string
  value: any
  type: string
  scope: "local" | "global" | "organism"
}

export function DebugPanel({ isDebugging, organismState }: DebugPanelProps) {
  const [breakpoints, setBreakpoints] = useState<Breakpoint[]>([
    { id: "1", line: 15, file: "sample_organism.dna", enabled: true },
    { id: "2", line: 28, file: "sample_organism.dna", enabled: false },
    { id: "3", line: 42, file: "sample_organism.dna", enabled: true },
  ])

  const [variables, setVariables] = useState<DebugVariable[]>([
    { name: "consciousness", value: organismState.consciousness, type: "float", scope: "organism" },
    { name: "quantum_coherence", value: organismState.quantumCoherence, type: "float", scope: "organism" },
    { name: "fitness", value: organismState.fitness, type: "float", scope: "organism" },
    { name: "energy", value: 85, type: "int", scope: "local" },
    { name: "thought_patterns", value: { complexity: 0.7, depth: 0.5 }, type: "object", scope: "local" },
    { name: "quantum_state", value: "superposition", type: "string", scope: "global" },
  ])

  const [callStack, setCallStack] = useState([
    { function: "neural_processor.process_thoughts", line: 15, file: "sample_organism.dna" },
    { function: "analyze_patterns", line: 8, file: "neural_processor.gene" },
    { function: "quantum_entangle", line: 23, file: "quantum_entangler.gene" },
  ])

  const toggleBreakpoint = (id: string) => {
    setBreakpoints((prev) => prev.map((bp) => (bp.id === id ? { ...bp, enabled: !bp.enabled } : bp)))
  }

  const formatValue = (value: any, type: string) => {
    if (type === "object") {
      return JSON.stringify(value, null, 2)
    }
    if (type === "float") {
      return typeof value === "number" ? value.toFixed(3) : value
    }
    return String(value)
  }

  if (!isDebugging) {
    return (
      <div className="h-full p-4 flex items-center justify-center text-muted-foreground">
        <div className="text-center">
          <Bug className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">Start debugging to inspect organism state</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-2 border-b">
        <div className="flex items-center space-x-2 mb-2">
          <Bug className="h-4 w-4" />
          <span className="font-semibold text-sm">Debug Console</span>
        </div>

        <div className="flex items-center space-x-1">
          <Button size="sm" variant="ghost" className="h-6 px-2">
            <Play className="h-3 w-3" />
          </Button>
          <Button size="sm" variant="ghost" className="h-6 px-2">
            <Pause className="h-3 w-3" />
          </Button>
          <Button size="sm" variant="ghost" className="h-6 px-2">
            <Square className="h-3 w-3" />
          </Button>
          <Button size="sm" variant="ghost" className="h-6 px-2">
            <StepForward className="h-3 w-3" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <Tabs defaultValue="variables" className="h-full">
          <TabsList className="grid w-full grid-cols-3 text-xs">
            <TabsTrigger value="variables">Variables</TabsTrigger>
            <TabsTrigger value="breakpoints">Breakpoints</TabsTrigger>
            <TabsTrigger value="callstack">Call Stack</TabsTrigger>
          </TabsList>

          <TabsContent value="variables" className="h-full mt-0 overflow-auto">
            <div className="p-2 space-y-2">
              {variables.map((variable, index) => (
                <div key={index} className="border rounded p-2 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{variable.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {variable.scope}
                    </Badge>
                  </div>
                  <div className="text-muted-foreground mb-1">{variable.type}</div>
                  <div className="font-mono text-xs bg-muted p-1 rounded">
                    {formatValue(variable.value, variable.type)}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="breakpoints" className="h-full mt-0 overflow-auto">
            <div className="p-2 space-y-2">
              {breakpoints.map((breakpoint) => (
                <div key={breakpoint.id} className="flex items-center space-x-2 p-2 border rounded text-xs">
                  <button
                    onClick={() => toggleBreakpoint(breakpoint.id)}
                    className={`w-3 h-3 rounded-full border-2 ${
                      breakpoint.enabled ? "bg-red-500 border-red-500" : "border-gray-400"
                    }`}
                  />
                  <div className="flex-1">
                    <div className="font-medium">{breakpoint.file}</div>
                    <div className="text-muted-foreground">Line {breakpoint.line}</div>
                  </div>
                  {breakpoint.enabled ? (
                    <CheckCircle className="h-3 w-3 text-green-500" />
                  ) : (
                    <AlertCircle className="h-3 w-3 text-gray-400" />
                  )}
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="callstack" className="h-full mt-0 overflow-auto">
            <div className="p-2 space-y-2">
              {callStack.map((frame, index) => (
                <div key={index} className="p-2 border rounded text-xs">
                  <div className="font-medium">{frame.function}</div>
                  <div className="text-muted-foreground">
                    {frame.file}:{frame.line}
                  </div>
                  {index === 0 && (
                    <Badge variant="outline" className="text-xs mt-1">
                      Current
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="p-2 border-t">
        <div className="space-y-2">
          <div className="text-xs font-medium">Organism Status</div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Consciousness</span>
              <span>{(organismState.consciousness * 100).toFixed(1)}%</span>
            </div>
            <Progress value={organismState.consciousness * 100} className="h-1" />

            <div className="flex justify-between text-xs">
              <span>Quantum Coherence</span>
              <span>{(organismState.quantumCoherence * 100).toFixed(1)}%</span>
            </div>
            <Progress value={organismState.quantumCoherence * 100} className="h-1" />

            <div className="flex justify-between text-xs">
              <span>Fitness</span>
              <span>{(organismState.fitness * 100).toFixed(1)}%</span>
            </div>
            <Progress value={organismState.fitness * 100} className="h-1" />
          </div>
        </div>
      </div>
    </div>
  )
}
