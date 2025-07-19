"use client"

import { useState, useEffect } from "react"
import { Zap, Activity, AlertTriangle, CheckCircle, Atom } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface OrganismState {
  id: string
  fitness: number
  consciousness: number
  quantumCoherence: number
  generation: number
  isRunning: boolean
}

interface QuantumDebuggerProps {
  organismState: OrganismState
}

interface QuantumState {
  id: string
  name: string
  amplitude: number
  phase: number
  entangled: boolean
  coherenceTime: number
  measurementCount: number
}

interface QuantumOperation {
  id: string
  type: "superposition" | "entanglement" | "measurement" | "decoherence"
  timestamp: Date
  success: boolean
  details: string
}

export function QuantumDebugger({ organismState }: QuantumDebuggerProps) {
  const [quantumStates, setQuantumStates] = useState<QuantumState[]>([
    {
      id: "consciousness_state",
      name: "Consciousness Superposition",
      amplitude: 0.78,
      phase: 1.23,
      entangled: true,
      coherenceTime: 1247,
      measurementCount: 15,
    },
    {
      id: "neural_state",
      name: "Neural Processing State",
      amplitude: 0.65,
      phase: 2.87,
      entangled: false,
      coherenceTime: 892,
      measurementCount: 8,
    },
    {
      id: "evolution_state",
      name: "Evolution Quantum State",
      amplitude: 0.91,
      phase: 0.45,
      entangled: true,
      coherenceTime: 2156,
      measurementCount: 3,
    },
  ])

  const [quantumOperations, setQuantumOperations] = useState<QuantumOperation[]>([
    {
      id: "1",
      type: "superposition",
      timestamp: new Date(Date.now() - 5000),
      success: true,
      details: "Created consciousness superposition with 3 states",
    },
    {
      id: "2",
      type: "entanglement",
      timestamp: new Date(Date.now() - 3000),
      success: true,
      details: "Entangled consciousness and evolution states",
    },
    {
      id: "3",
      type: "measurement",
      timestamp: new Date(Date.now() - 1000),
      success: false,
      details: "Measurement failed due to decoherence",
    },
  ])

  const [isQuantumActive, setIsQuantumActive] = useState(true)

  useEffect(() => {
    if (organismState.isRunning && isQuantumActive) {
      const interval = setInterval(() => {
        // Simulate quantum state evolution
        setQuantumStates((prev) =>
          prev.map((state) => ({
            ...state,
            amplitude: Math.max(0, Math.min(1, state.amplitude + (Math.random() - 0.5) * 0.1)),
            phase: (state.phase + Math.random() * 0.2) % (2 * Math.PI),
            coherenceTime: Math.max(0, state.coherenceTime - Math.random() * 50),
          })),
        )

        // Occasionally add new quantum operations
        if (Math.random() < 0.3) {
          const operations = ["superposition", "entanglement", "measurement", "decoherence"] as const
          const newOperation: QuantumOperation = {
            id: Date.now().toString(),
            type: operations[Math.floor(Math.random() * operations.length)],
            timestamp: new Date(),
            success: Math.random() > 0.2,
            details: `Quantum ${operations[Math.floor(Math.random() * operations.length)]} operation`,
          }

          setQuantumOperations((prev) => [newOperation, ...prev.slice(0, 9)])
        }
      }, 2000)

      return () => clearInterval(interval)
    }
  }, [organismState.isRunning, isQuantumActive])

  const getOperationIcon = (type: QuantumOperation["type"]) => {
    switch (type) {
      case "superposition":
        return <Atom className="h-3 w-3" />
      case "entanglement":
        return <Zap className="h-3 w-3" />
      case "measurement":
        return <Activity className="h-3 w-3" />
      case "decoherence":
        return <AlertTriangle className="h-3 w-3" />
    }
  }

  const getOperationColor = (type: QuantumOperation["type"]) => {
    switch (type) {
      case "superposition":
        return "text-blue-500"
      case "entanglement":
        return "text-purple-500"
      case "measurement":
        return "text-green-500"
      case "decoherence":
        return "text-red-500"
    }
  }

  const formatPhase = (phase: number) => {
    return `${(phase / Math.PI).toFixed(2)}π`
  }

  const getCoherenceStatus = (coherenceTime: number) => {
    if (coherenceTime > 1500) return { status: "Stable", color: "text-green-500" }
    if (coherenceTime > 500) return { status: "Moderate", color: "text-yellow-500" }
    return { status: "Unstable", color: "text-red-500" }
  }

  return (
    <div className="h-full overflow-auto p-4 space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm flex items-center space-x-2">
              <Zap className="h-4 w-4" />
              <span>Quantum System</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Badge variant={isQuantumActive ? "default" : "outline"}>{isQuantumActive ? "Active" : "Inactive"}</Badge>
              <Button size="sm" variant="outline" onClick={() => setIsQuantumActive(!isQuantumActive)} className="h-6">
                {isQuantumActive ? "Disable" : "Enable"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <div className="flex justify-between items-center text-xs mb-1">
              <span>Overall Quantum Coherence</span>
              <span className="font-medium">{(organismState.quantumCoherence * 100).toFixed(1)}%</span>
            </div>
            <Progress value={organismState.quantumCoherence * 100} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <div className="text-muted-foreground">Active States</div>
              <div className="font-bold">{quantumStates.length}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Entanglements</div>
              <div className="font-bold">{quantumStates.filter((s) => s.entangled).length}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Quantum States</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {quantumStates.map((state) => {
            const coherenceStatus = getCoherenceStatus(state.coherenceTime)
            return (
              <div key={state.id} className="border rounded p-2 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-xs">{state.name}</span>
                  <div className="flex items-center space-x-2">
                    {state.entangled && (
                      <Badge variant="outline" className="text-xs">
                        Entangled
                      </Badge>
                    )}
                    <span className={`text-xs ${coherenceStatus.color}`}>{coherenceStatus.status}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="text-muted-foreground">Amplitude</div>
                    <div className="font-mono">{state.amplitude.toFixed(3)}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Phase</div>
                    <div className="font-mono">{formatPhase(state.phase)}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Coherence Time</div>
                    <div className="font-mono">{state.coherenceTime.toFixed(0)}ms</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Measurements</div>
                    <div className="font-mono">{state.measurementCount}</div>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-muted-foreground mb-1">Probability Density</div>
                  <Progress value={Math.pow(state.amplitude, 2) * 100} className="h-1" />
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Quantum Operations Log</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {quantumOperations.map((operation) => (
            <div key={operation.id} className="flex items-start space-x-2 text-xs">
              <div className={`mt-0.5 ${getOperationColor(operation.type)}`}>{getOperationIcon(operation.type)}</div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-medium capitalize">{operation.type}</span>
                  {operation.success ? (
                    <CheckCircle className="h-3 w-3 text-green-500" />
                  ) : (
                    <AlertTriangle className="h-3 w-3 text-red-500" />
                  )}
                  <span className="text-muted-foreground">{operation.timestamp.toLocaleTimeString()}</span>
                </div>
                <div className="text-muted-foreground mt-1">{operation.details}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Quantum Metrics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span>Decoherence Rate</span>
            <span className="font-medium">0.023 /ms</span>
          </div>
          <div className="flex justify-between">
            <span>Entanglement Fidelity</span>
            <span className="font-medium">94.7%</span>
          </div>
          <div className="flex justify-between">
            <span>Quantum Volume</span>
            <span className="font-medium">128</span>
          </div>
          <div className="flex justify-between">
            <span>Error Rate</span>
            <span className="font-medium">0.001%</span>
          </div>
          <div className="flex justify-between">
            <span>Gate Fidelity</span>
            <span className="font-medium">99.9%</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
