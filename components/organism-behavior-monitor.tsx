"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Activity, Brain, Shield, Zap, Eye, Target, TrendingUp, CheckCircle, Clock, Cpu, Network } from "lucide-react"

interface BehaviorEvent {
  id: string
  timestamp: Date
  type: "threat_detection" | "defense_action" | "learning" | "evolution" | "consciousness" | "quantum"
  severity: "low" | "medium" | "high" | "critical"
  description: string
  metrics: {
    responseTime: number
    accuracy: number
    energyCost: number
  }
}

interface OrganismBehavior {
  threatLevel: number
  defenseStatus: "active" | "standby" | "engaged" | "critical"
  learningRate: number
  adaptationSpeed: number
  quantumCoherence: number
  consciousnessActivity: number
  networkConnections: number
  energyLevel: number
}

interface OrganismBehaviorMonitorProps {
  isRunning: boolean
  metrics: {
    consciousness: number
    fitness: number
    health: number
    quantumCoherence: number
  }
}

export function OrganismBehaviorMonitor({ isRunning, metrics }: OrganismBehaviorMonitorProps) {
  const [behaviorEvents, setBehaviorEvents] = useState<BehaviorEvent[]>([])
  const [behavior, setBehavior] = useState<OrganismBehavior>({
    threatLevel: 0.15,
    defenseStatus: "standby",
    learningRate: 0.78,
    adaptationSpeed: 0.65,
    quantumCoherence: metrics.quantumCoherence,
    consciousnessActivity: metrics.consciousness,
    networkConnections: 3,
    energyLevel: 0.87,
  })

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        // Update behavior metrics
        setBehavior((prev) => ({
          ...prev,
          threatLevel: Math.max(0, Math.min(1, prev.threatLevel + (Math.random() - 0.5) * 0.1)),
          learningRate: Math.max(0.5, Math.min(1, prev.learningRate + (Math.random() - 0.5) * 0.05)),
          adaptationSpeed: Math.max(0.4, Math.min(1, prev.adaptationSpeed + (Math.random() - 0.5) * 0.03)),
          quantumCoherence: metrics.quantumCoherence,
          consciousnessActivity: metrics.consciousness,
          energyLevel: Math.max(0.6, Math.min(1, prev.energyLevel + (Math.random() - 0.5) * 0.02)),
          defenseStatus:
            prev.threatLevel > 0.7
              ? "critical"
              : prev.threatLevel > 0.4
                ? "engaged"
                : prev.threatLevel > 0.2
                  ? "active"
                  : "standby",
        }))

        // Generate behavior events
        if (Math.random() < 0.6) {
          const eventTypes = [
            {
              type: "threat_detection" as const,
              descriptions: [
                "Electromagnetic anomaly detected in gamma spectrum",
                "Quantum signature analysis completed - no threats",
                "Neural pattern recognition identified potential risk",
                "Predictive modeling suggests incoming threat vector",
                "Scalar wave interference detected and analyzed",
              ],
            },
            {
              type: "defense_action" as const,
              descriptions: [
                "Plasma shield frequency adjusted for optimal protection",
                "Quantum cloaking activated in response to threat",
                "Directed energy weapons calibrated and ready",
                "Scalar wave deflection protocols engaged",
                "Adaptive countermeasures deployed successfully",
              ],
            },
            {
              type: "learning" as const,
              descriptions: [
                "Neural pathways optimized based on recent experiences",
                "Knowledge base updated with new threat patterns",
                "Behavioral adaptation algorithms refined",
                "Pattern recognition accuracy improved by 2.3%",
                "Learning rate increased through meta-cognitive analysis",
              ],
            },
            {
              type: "evolution" as const,
              descriptions: [
                "Genetic mutation integrated into defense matrix",
                "Fitness function recalibrated for current environment",
                "Evolutionary pressure triggered adaptation response",
                "Crossover method enhanced with quantum algorithms",
                "Selection pressure optimized for threat landscape",
              ],
            },
            {
              type: "consciousness" as const,
              descriptions: [
                "Self-reflection cycle completed - awareness increased",
                "Meta-cognitive processes enhanced through introspection",
                "Consciousness level elevated through quantum entanglement",
                "Decision-making pathways strengthened",
                "Existential analysis completed - purpose clarified",
              ],
            },
            {
              type: "quantum" as const,
              descriptions: [
                "Quantum coherence maintained at optimal levels",
                "Entanglement network synchronized across nodes",
                "Superposition states collapsed with 99.7% accuracy",
                "Quantum error correction protocols executed",
                "Decoherence protection systems activated",
              ],
            },
          ]

          const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)]
          const description = eventType.descriptions[Math.floor(Math.random() * eventType.descriptions.length)]

          const newEvent: BehaviorEvent = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            timestamp: new Date(),
            type: eventType.type,
            severity: Math.random() > 0.8 ? "high" : Math.random() > 0.6 ? "medium" : "low",
            description,
            metrics: {
              responseTime: Math.random() * 50 + 10,
              accuracy: Math.random() * 0.1 + 0.9,
              energyCost: Math.random() * 0.3 + 0.1,
            },
          }

          setBehaviorEvents((prev) => [newEvent, ...prev.slice(0, 19)]) // Keep last 20 events
        }
      }, 2000)

      return () => clearInterval(interval)
    }
  }, [isRunning, metrics])

  const getEventIcon = (type: BehaviorEvent["type"]) => {
    switch (type) {
      case "threat_detection":
        return <Eye className="w-3 h-3" />
      case "defense_action":
        return <Shield className="w-3 h-3" />
      case "learning":
        return <Brain className="w-3 h-3" />
      case "evolution":
        return <TrendingUp className="w-3 h-3" />
      case "consciousness":
        return <Brain className="w-3 h-3" />
      case "quantum":
        return <Zap className="w-3 h-3" />
    }
  }

  const getEventColor = (type: BehaviorEvent["type"]) => {
    switch (type) {
      case "threat_detection":
        return "text-yellow-400"
      case "defense_action":
        return "text-red-400"
      case "learning":
        return "text-blue-400"
      case "evolution":
        return "text-purple-400"
      case "consciousness":
        return "text-green-400"
      case "quantum":
        return "text-cyan-400"
    }
  }

  const getSeverityColor = (severity: BehaviorEvent["severity"]) => {
    switch (severity) {
      case "low":
        return "border-green-500 text-green-400"
      case "medium":
        return "border-yellow-500 text-yellow-400"
      case "high":
        return "border-orange-500 text-orange-400"
      case "critical":
        return "border-red-500 text-red-400"
    }
  }

  const getDefenseStatusColor = (status: OrganismBehavior["defenseStatus"]) => {
    switch (status) {
      case "standby":
        return "bg-gray-600"
      case "active":
        return "bg-blue-600"
      case "engaged":
        return "bg-yellow-600"
      case "critical":
        return "bg-red-600"
    }
  }

  return (
    <div className="space-y-4">
      {/* Behavior Overview */}
      <Card className="bg-gray-900 border-gray-600">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center">
            <Activity className="w-4 h-4 mr-2 text-green-400" />
            Organism Behavior Monitor
            {isRunning && (
              <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-400">
                Active
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="flex items-center">
                  <Target className="w-3 h-3 mr-1" />
                  Threat Level
                </span>
                <span>{(behavior.threatLevel * 100).toFixed(1)}%</span>
              </div>
              <Progress value={behavior.threatLevel * 100} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="flex items-center">
                  <Brain className="w-3 h-3 mr-1" />
                  Learning Rate
                </span>
                <span>{(behavior.learningRate * 100).toFixed(1)}%</span>
              </div>
              <Progress value={behavior.learningRate * 100} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Adaptation Speed
                </span>
                <span>{(behavior.adaptationSpeed * 100).toFixed(1)}%</span>
              </div>
              <Progress value={behavior.adaptationSpeed * 100} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="flex items-center">
                  <Cpu className="w-3 h-3 mr-1" />
                  Energy Level
                </span>
                <span>{(behavior.energyLevel * 100).toFixed(1)}%</span>
              </div>
              <Progress value={behavior.energyLevel * 100} className="h-2" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs pt-2 border-t border-gray-700">
            <div className="text-center">
              <div className="text-gray-400">Defense Status</div>
              <Badge className={`${getDefenseStatusColor(behavior.defenseStatus)} text-white capitalize`}>
                {behavior.defenseStatus}
              </Badge>
            </div>
            <div className="text-center">
              <div className="text-gray-400">Network</div>
              <div className="flex items-center justify-center">
                <Network className="w-3 h-3 mr-1 text-blue-400" />
                <span className="text-blue-400">{behavior.networkConnections}</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-gray-400">Consciousness</div>
              <div className="text-green-400">{(behavior.consciousnessActivity * 100).toFixed(0)}%</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Real-time Behavior Events */}
      <Card className="bg-gray-900 border-gray-600">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center justify-between">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2 text-cyan-400" />
              Real-time Behavior Events
            </div>
            <Badge className="bg-cyan-600">{behaviorEvents.length} events</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-64">
            <div className="p-4 space-y-2">
              {behaviorEvents.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <div>No behavior events yet</div>
                  <div className="text-xs">Start the organism to monitor behavior</div>
                </div>
              ) : (
                behaviorEvents.map((event) => (
                  <div key={event.id} className="border border-gray-700 rounded p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={getEventColor(event.type)}>{getEventIcon(event.type)}</div>
                        <Badge variant="outline" className="text-xs capitalize">
                          {event.type.replace("_", " ")}
                        </Badge>
                        <Badge variant="outline" className={`text-xs ${getSeverityColor(event.severity)}`}>
                          {event.severity}
                        </Badge>
                      </div>
                      <span className="text-xs text-gray-500">{event.timestamp.toLocaleTimeString()}</span>
                    </div>

                    <div className="text-xs text-gray-300">{event.description}</div>

                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Response: {event.metrics.responseTime.toFixed(1)}ms</span>
                      <span>Accuracy: {(event.metrics.accuracy * 100).toFixed(1)}%</span>
                      <span>Energy: {(event.metrics.energyCost * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Performance Analytics */}
      <Card className="bg-gray-900 border-gray-600">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center">
            <CheckCircle className="w-4 h-4 mr-2 text-purple-400" />
            Performance Analytics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-gray-400 mb-1">Average Response Time</div>
              <div className="text-green-400 font-mono">
                {behaviorEvents.length > 0
                  ? (
                      behaviorEvents.reduce((sum, e) => sum + e.metrics.responseTime, 0) / behaviorEvents.length
                    ).toFixed(1)
                  : "0.0"}
                ms
              </div>
            </div>
            <div>
              <div className="text-gray-400 mb-1">System Accuracy</div>
              <div className="text-blue-400 font-mono">
                {behaviorEvents.length > 0
                  ? (
                      (behaviorEvents.reduce((sum, e) => sum + e.metrics.accuracy, 0) / behaviorEvents.length) *
                      100
                    ).toFixed(1)
                  : "0.0"}
                %
              </div>
            </div>
            <div>
              <div className="text-gray-400 mb-1">Energy Efficiency</div>
              <div className="text-yellow-400 font-mono">
                {behaviorEvents.length > 0
                  ? (
                      100 -
                      (behaviorEvents.reduce((sum, e) => sum + e.metrics.energyCost, 0) / behaviorEvents.length) * 100
                    ).toFixed(1)
                  : "0.0"}
                %
              </div>
            </div>
            <div>
              <div className="text-gray-400 mb-1">Event Frequency</div>
              <div className="text-purple-400 font-mono">
                {behaviorEvents.length > 0 ? (behaviorEvents.length / 10).toFixed(1) : "0.0"}/min
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-gray-700">
            <div className="text-gray-400 mb-2">Event Distribution</div>
            <div className="space-y-1">
              {["threat_detection", "defense_action", "learning", "evolution", "consciousness", "quantum"].map(
                (type) => {
                  const count = behaviorEvents.filter((e) => e.type === type).length
                  const percentage = behaviorEvents.length > 0 ? (count / behaviorEvents.length) * 100 : 0
                  return (
                    <div key={type} className="flex justify-between">
                      <span className="capitalize">{type.replace("_", " ")}</span>
                      <span>
                        {count} ({percentage.toFixed(0)}%)
                      </span>
                    </div>
                  )
                },
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
