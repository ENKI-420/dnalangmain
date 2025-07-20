"use client"

import { useState, useEffect } from "react"
import { RefreshCw, TrendingUp, Target, Zap, Brain } from "lucide-react" // Import Brain icon
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

interface EvolutionMonitorProps {
  organismState: OrganismState
  isRunning: boolean // Added isRunning prop
}

interface EvolutionData {
  generation: number
  fitness: number
  consciousness: number
  quantumCoherence: number
  mutations: number // Keep mutations for historical context
}

export function EvolutionMonitor({ organismState, isRunning }: EvolutionMonitorProps) {
  const [evolutionHistory, setEvolutionHistory] = useState<EvolutionData[]>([
    // Initial sample data, will be updated by useEffect
    { generation: 10, fitness: 0.65, consciousness: 0.32, quantumCoherence: 0.58, mutations: 2 },
    { generation: 11, fitness: 0.68, consciousness: 0.35, quantumCoherence: 0.61, mutations: 1 },
    { generation: 12, fitness: 0.71, consciousness: 0.38, quantumCoherence: 0.63, mutations: 3 },
    { generation: 13, fitness: 0.73, consciousness: 0.4, quantumCoherence: 0.65, mutations: 0 },
    { generation: 14, fitness: 0.74, consciousness: 0.41, quantumCoherence: 0.67, mutations: 2 },
    { generation: 15, fitness: 0.75, consciousness: 0.42, quantumCoherence: 0.68, mutations: 1 },
  ])

  // Update evolution history based on organismState changes
  useEffect(() => {
    // Only add to history if the generation has actually changed and organism is running
    if (isRunning && organismState.generation > evolutionHistory[evolutionHistory.length - 1]?.generation) {
      const newEntry: EvolutionData = {
        generation: organismState.generation,
        fitness: organismState.fitness,
        consciousness: organismState.consciousness,
        quantumCoherence: organismState.quantumCoherence,
        mutations: Math.floor(Math.random() * 4), // Simulate new mutations per generation
      }
      setEvolutionHistory((prev) => [...prev.slice(-9), newEntry]) // Keep last 10 entries
    }
  }, [
    organismState.generation,
    organismState.fitness,
    organismState.consciousness,
    organismState.quantumCoherence,
    isRunning,
  ])

  const calculateTrend = (data: EvolutionData[], key: keyof EvolutionData) => {
    if (data.length < 2) return 0
    // Use the last two relevant data points for a more immediate trend
    const latest = data[data.length - 1][key] as number
    const previous = data[data.length - 2][key] as number

    if (previous === 0) return 0 // Avoid division by zero

    return ((latest - previous) / previous) * 100
  }

  const getTrendColor = (trend: number) => {
    if (trend > 0.1) return "text-green-500" // Small positive change is good
    if (trend < -0.1) return "text-red-500" // Small negative change is bad
    return "text-yellow-500"
  }

  const getTrendIcon = (trend: number) => {
    if (trend > 0.1) return <TrendingUp className={`h-3 w-3 text-green-500`} />
    if (trend < -0.1) return <TrendingUp className={`h-3 w-3 text-red-500 rotate-180`} />
    return null // Stable
  }

  const fitnessGoals = [
    { name: "Consciousness Enhancement", target: 0.8, current: organismState.consciousness, priority: "high" },
    { name: "Quantum Optimization", target: 0.9, current: organismState.quantumCoherence, priority: "medium" },
    { name: "Overall Fitness", target: 0.95, current: organismState.fitness, priority: "high" },
    { name: "Energy Efficiency", target: 0.85, current: 0.72, priority: "low" }, // Placeholder, could be derived
  ]

  const mutationStrategies = [
    { name: "Adaptive Rate Control", status: "active", effectiveness: 0.87 },
    { name: "Consciousness Preservation", status: "active", effectiveness: 0.92 },
    { name: "Quantum Coherence Boost", status: "inactive", effectiveness: 0.76 },
    { name: "Gene Diversity Maintenance", status: "active", effectiveness: 0.83 },
  ]

  return (
    <div className="h-full overflow-auto p-4 space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm flex items-center space-x-2">
              <RefreshCw className="h-4 w-4" />
              <span>Evolution Control</span>
            </CardTitle>
            {/* Button state now controlled by parent's isRunning prop */}
            <Button size="sm" disabled={isRunning} className="h-6">
              {isRunning ? (
                <>
                  <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                  Evolving...
                </>
              ) : (
                <>
                  <Zap className="h-3 w-3 mr-1" />
                  Evolve (from IDE)
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <div className="text-muted-foreground">Current Generation</div>
              <div className="font-bold text-lg">{organismState.generation}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Total Mutations</div>
              <div className="font-bold text-lg">{evolutionHistory.reduce((sum, gen) => sum + gen.mutations, 0)}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Evolution Trends</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { key: "fitness" as const, label: "Fitness", icon: Target },
            { key: "consciousness" as const, label: "Consciousness", icon: Brain }, // Changed icon to Brain for consistency
            { key: "quantumCoherence" as const, label: "Quantum Coherence", icon: Zap },
          ].map(({ key, label, icon: Icon }) => {
            const trend = calculateTrend(evolutionHistory, key)
            return (
              <div key={key} className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="flex items-center space-x-1">
                    <Icon className="h-3 w-3" />
                    <span>{label}</span>
                    {getTrendIcon(trend)}
                  </span>
                  <span className={`font-medium ${getTrendColor(trend)}`}>
                    {trend > 0 ? "+" : ""}
                    {trend.toFixed(1)}%
                  </span>
                </div>
                <Progress value={organismState[key] * 100} className="h-1.5" />
              </div>
            )
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Fitness Goals</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {fitnessGoals.map((goal, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="flex items-center space-x-1">
                  <span>{goal.name}</span>
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      goal.priority === "high"
                        ? "border-red-300 text-red-700"
                        : goal.priority === "medium"
                          ? "border-yellow-300 text-yellow-700"
                          : "border-gray-300 text-gray-700"
                    }`}
                  >
                    {goal.priority}
                  </Badge>
                </span>
                <span className="font-medium">
                  {(goal.current * 100).toFixed(0)}% / {(goal.target * 100).toFixed(0)}%
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Progress value={(goal.current / goal.target) * 100} className="h-1.5 flex-1" />
                <span className="text-xs text-muted-foreground w-8">
                  {((goal.current / goal.target) * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Mutation Strategies</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {mutationStrategies.map((strategy, index) => (
            <div key={index} className="flex justify-between items-center text-xs">
              <div className="flex items-center space-x-2">
                <div
                  className={`w-2 h-2 rounded-full ${strategy.status === "active" ? "bg-green-500" : "bg-gray-400"}`}
                />
                <span>{strategy.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-muted-foreground">{(strategy.effectiveness * 100).toFixed(0)}%</span>
                <Badge variant={strategy.status === "active" ? "default" : "outline"} className="text-xs">
                  {strategy.status}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
