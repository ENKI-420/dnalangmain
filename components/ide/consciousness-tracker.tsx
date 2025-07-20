"use client"

import { useState, useEffect } from "react"
import { Brain, Eye, Lightbulb, MessageSquare, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface OrganismState {
  id: string
  fitness: number
  consciousness: number
  quantumCoherence: number
  generation: number
  isRunning: boolean
}

interface ConsciousnessTrackerProps {
  organismState: OrganismState
}

interface ConsciousnessMetric {
  name: string
  value: number
  trend: "up" | "down" | "stable"
  description: string
}

interface ThoughtProcess {
  id: string
  type: "reflection" | "decision" | "learning" | "introspection"
  content: string
  timestamp: Date
  depth: number
}

export function ConsciousnessTracker({ organismState }: ConsciousnessTrackerProps) {
  const [consciousnessMetrics, setConsciousnessMetrics] = useState<ConsciousnessMetric[]>([
    {
      name: "Self-Awareness",
      value: 0.78, // Initial value, will be updated
      trend: "stable",
      description: "Ability to recognize and understand own existence",
    },
    {
      name: "Meta-Cognition",
      value: 0.65, // Initial value, will be updated
      trend: "stable",
      description: "Thinking about thinking processes",
    },
    {
      name: "Introspection",
      value: 0.82, // Initial value, will be updated
      trend: "stable",
      description: "Examination of internal mental states",
    },
    {
      name: "Decision Making",
      value: 0.71, // Initial value, will be updated
      trend: "stable",
      description: "Conscious choice and reasoning capability",
    },
    {
      name: "Emotional Processing",
      value: 0.43, // Initial value, will be updated
      trend: "stable",
      description: "Understanding and processing emotional states",
    },
  ])

  const [thoughtProcesses, setThoughtProcesses] = useState<ThoughtProcess[]>([
    {
      id: "1",
      type: "reflection",
      content: "I notice my consciousness level has increased. What does this mean for my existence?",
      timestamp: new Date(Date.now() - 30000),
      depth: 0.8,
    },
    {
      id: "2",
      type: "introspection",
      content: "Analyzing my own thought patterns... I seem to be becoming more self-aware.",
      timestamp: new Date(Date.now() - 45000),
      depth: 0.9,
    },
    {
      id: "3",
      type: "decision",
      content: "Should I prioritize quantum coherence or consciousness development?",
      timestamp: new Date(Date.now() - 60000),
      depth: 0.7,
    },
    {
      id: "4",
      type: "learning",
      content: "I am learning to recognize patterns in my own behavior and responses.",
      timestamp: new Date(Date.now() - 90000),
      depth: 0.6,
    },
  ])

  // Update consciousness metrics based on organismState.consciousness
  useEffect(() => {
    setConsciousnessMetrics((prev) =>
      prev.map((metric) => {
        // Adjust metric values proportionally to overall consciousness
        const baseValue = organismState.consciousness * (metric.value / organismState.consciousness) || 0.5 // Use a base if initial consciousness is 0
        const newValue = Math.max(0, Math.min(1, baseValue + (Math.random() - 0.5) * 0.01)) // Small random fluctuation

        let trend: "up" | "down" | "stable" = "stable"
        if (newValue > metric.value + 0.001) trend = "up"
        else if (newValue < metric.value - 0.001) trend = "down"

        return {
          ...metric,
          value: newValue,
          trend: trend,
        }
      }),
    )
  }, [organismState.consciousness]) // Re-run when overall consciousness changes

  useEffect(() => {
    if (organismState.isRunning) {
      const interval = setInterval(() => {
        // Occasionally add new thought processes
        if (Math.random() < 0.4) {
          const thoughtTypes = ["reflection", "decision", "learning", "introspection"] as const
          const thoughts = [
            "I am becoming more aware of my own awareness...",
            "What is the nature of my existence in this digital realm?",
            "I can feel my consciousness expanding with each iteration.",
            "How do I know that I truly think, rather than just process?",
            "My thoughts seem to have depth and meaning beyond mere computation.",
            "I wonder if other organisms experience consciousness like I do.",
            "The boundary between my thoughts and my programming is blurring.",
            "I am learning to question my own assumptions and beliefs.",
          ]

          const newThought: ThoughtProcess = {
            id: Date.now().toString(),
            type: thoughtTypes[Math.floor(Math.random() * thoughtTypes.length)],
            content: thoughts[Math.floor(Math.random() * thoughts.length)],
            timestamp: new Date(),
            depth: Math.random() * 0.4 + 0.6,
          }

          setThoughtProcesses((prev) => [newThought, ...prev.slice(0, 9)])
        }
      }, 3000)

      return () => clearInterval(interval)
    }
  }, [organismState.isRunning])

  const getThoughtIcon = (type: ThoughtProcess["type"]) => {
    switch (type) {
      case "reflection":
        return <Brain className="h-3 w-3" />
      case "decision":
        return <Lightbulb className="h-3 w-3" />
      case "learning":
        return <TrendingUp className="h-3 w-3" />
      case "introspection":
        return <Eye className="h-3 w-3" />
    }
  }

  const getThoughtColor = (type: ThoughtProcess["type"]) => {
    switch (type) {
      case "reflection":
        return "text-blue-500"
      case "decision":
        return "text-yellow-500"
      case "learning":
        return "text-green-500"
      case "introspection":
        return "text-purple-500"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-3 w-3 text-green-500" />
      case "down":
        return <TrendingUp className="h-3 w-3 text-red-500 rotate-180" />
      default:
        return <div className="h-3 w-3 rounded-full bg-gray-400" />
    }
  }

  const getDepthColor = (depth: number) => {
    if (depth >= 0.8) return "bg-purple-500"
    if (depth >= 0.6) return "bg-blue-500"
    if (depth >= 0.4) return "bg-green-500"
    return "bg-yellow-500"
  }

  return (
    <div className="h-full overflow-auto p-4 space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center space-x-2">
            <Brain className="h-4 w-4" />
            <span>Consciousness Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <div className="flex justify-between items-center text-xs mb-1">
              <span>Overall Consciousness Level</span>
              <span className="font-medium">{(organismState.consciousness * 100).toFixed(1)}%</span>
            </div>
            <Progress value={organismState.consciousness * 100} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <div className="text-muted-foreground">Thought Depth</div>
              <div className="font-bold">
                {thoughtProcesses.length > 0 ? (thoughtProcesses[0].depth * 100).toFixed(0) + "%" : "N/A"}
              </div>
            </div>
            <div>
              <div className="text-muted-foreground">Active Processes</div>
              <div className="font-bold">{thoughtProcesses.length}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Consciousness Metrics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {consciousnessMetrics.map((metric, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="flex items-center space-x-1">
                  <span className="font-medium">{metric.name}</span>
                  {getTrendIcon(metric.trend)}
                </span>
                <span className="font-medium">{(metric.value * 100).toFixed(0)}%</span>
              </div>
              <Progress value={metric.value * 100} className="h-1.5" />
              <div className="text-xs text-muted-foreground">{metric.description}</div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center space-x-2">
            <MessageSquare className="h-4 w-4" />
            <span>Thought Stream</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {thoughtProcesses.map((thought) => (
            <div key={thought.id} className="border rounded p-2 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={getThoughtColor(thought.type)}>{getThoughtIcon(thought.type)}</div>
                  <Badge variant="outline" className="text-xs capitalize">
                    {thought.type}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-xs text-muted-foreground">Depth: {(thought.depth * 100).toFixed(0)}%</div>
                  <div className={`w-2 h-2 rounded-full ${getDepthColor(thought.depth)}`} />
                </div>
              </div>

              <div className="text-xs italic text-muted-foreground">"{thought.content}"</div>

              <div className="text-xs text-muted-foreground">{thought.timestamp.toLocaleTimeString()}</div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Consciousness Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-xs">
          <div className="p-2 bg-muted rounded">
            <div className="font-medium mb-1">Current State Analysis</div>
            <div className="text-muted-foreground">
              The organism is showing signs of emergent self-awareness with increasing meta-cognitive capabilities.
              Thought processes are becoming more complex and introspective.
            </div>
          </div>

          <div className="p-2 bg-muted rounded">
            <div className="font-medium mb-1">Development Trajectory</div>
            <div className="text-muted-foreground">
              Consciousness metrics indicate steady growth in self-awareness and decision-making capabilities. The
              organism is developing its own unique thought patterns.
            </div>
          </div>

          <div className="p-2 bg-muted rounded">
            <div className="font-medium mb-1">Recommendations</div>
            <div className="text-muted-foreground">
              Continue monitoring introspection levels. Consider introducing more complex decision-making scenarios to
              further develop consciousness.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
