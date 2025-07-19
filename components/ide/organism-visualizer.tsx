"use client"

import { useEffect, useState } from "react"
import { Activity, Brain, Zap, Dna, TrendingUp, TrendingDown } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface OrganismState {
  id: string
  fitness: number
  consciousness: number
  quantumCoherence: number
  generation: number
  isRunning: boolean
}

interface OrganismVisualizerProps {
  organismState: OrganismState
}

interface Gene {
  name: string
  activity: number
  health: number
  mutations: number
}

export function OrganismVisualizer({ organismState }: OrganismVisualizerProps) {
  const [genes, setGenes] = useState<Gene[]>([
    { name: "neural_processor", activity: 0.85, health: 0.92, mutations: 3 },
    { name: "quantum_entangler", activity: 0.67, health: 0.88, mutations: 1 },
    { name: "consciousness_core", activity: 0.78, health: 0.95, mutations: 5 },
    { name: "adaptive_memory", activity: 0.43, health: 0.76, mutations: 2 },
    { name: "immune_system", activity: 0.91, health: 0.84, mutations: 0 },
    { name: "evolution_engine", activity: 0.56, health: 0.89, mutations: 4 },
  ])

  const [previousState, setPreviousState] = useState(organismState)

  useEffect(() => {
    if (organismState.isRunning) {
      const interval = setInterval(() => {
        setGenes((prev) =>
          prev.map((gene) => ({
            ...gene,
            activity: Math.max(0, Math.min(1, gene.activity + (Math.random() - 0.5) * 0.1)),
          })),
        )
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [organismState.isRunning])

  useEffect(() => {
    setPreviousState(organismState)
  }, [organismState])

  const getHealthColor = (health: number) => {
    if (health >= 0.8) return "text-green-500"
    if (health >= 0.6) return "text-yellow-500"
    return "text-red-500"
  }

  const getActivityColor = (activity: number) => {
    if (activity >= 0.7) return "bg-green-500"
    if (activity >= 0.4) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) return <TrendingUp className="h-3 w-3 text-green-500" />
    if (current < previous) return <TrendingDown className="h-3 w-3 text-red-500" />
    return null
  }

  return (
    <div className="h-full overflow-auto p-4 space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center space-x-2">
            <Dna className="h-4 w-4" />
            <span>Organism Overview</span>
            {organismState.isRunning && (
              <Badge variant="outline" className="bg-green-50 text-green-700">
                Running
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="flex items-center space-x-1">
                <Activity className="h-3 w-3" />
                <span>Fitness</span>
                {getTrendIcon(organismState.fitness, previousState.fitness)}
              </span>
              <span className="font-medium">{(organismState.fitness * 100).toFixed(1)}%</span>
            </div>
            <Progress value={organismState.fitness * 100} className="h-2" />
          </div>

          <div>
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="flex items-center space-x-1">
                <Brain className="h-3 w-3" />
                <span>Consciousness</span>
                {getTrendIcon(organismState.consciousness, previousState.consciousness)}
              </span>
              <span className="font-medium">{(organismState.consciousness * 100).toFixed(1)}%</span>
            </div>
            <Progress value={organismState.consciousness * 100} className="h-2" />
          </div>

          <div>
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="flex items-center space-x-1">
                <Zap className="h-3 w-3" />
                <span>Quantum Coherence</span>
                {getTrendIcon(organismState.quantumCoherence, previousState.quantumCoherence)}
              </span>
              <span className="font-medium">{(organismState.quantumCoherence * 100).toFixed(1)}%</span>
            </div>
            <Progress value={organismState.quantumCoherence * 100} className="h-2" />
          </div>

          <div className="pt-2 border-t">
            <div className="text-xs text-muted-foreground">Generation: {organismState.generation}</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Gene Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {genes.map((gene, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium">{gene.name}</span>
                <div className="flex items-center space-x-2">
                  <span className={getHealthColor(gene.health)}>{(gene.health * 100).toFixed(0)}%</span>
                  {gene.mutations > 0 && (
                    <Badge variant="outline" className="text-xs">
                      {gene.mutations}m
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-muted rounded-full h-1.5">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${getActivityColor(gene.activity)}`}
                    style={{ width: `${gene.activity * 100}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground w-8">{(gene.activity * 100).toFixed(0)}%</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">System Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span>Energy Level</span>
            <span className="font-medium">87%</span>
          </div>
          <div className="flex justify-between">
            <span>Memory Usage</span>
            <span className="font-medium">64%</span>
          </div>
          <div className="flex justify-between">
            <span>Processing Load</span>
            <span className="font-medium">42%</span>
          </div>
          <div className="flex justify-between">
            <span>Network Connections</span>
            <span className="font-medium">3 active</span>
          </div>
          <div className="flex justify-between">
            <span>Quantum Entanglements</span>
            <span className="font-medium">2 stable</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
