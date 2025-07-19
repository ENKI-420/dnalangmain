"use client"

import { useState } from "react"
import { Zap, History, CheckCircle, AlertCircle, Code, Diff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BioGlowText } from "./bio-glow-effects"

interface Mutation {
  id: string
  type: "gene_addition" | "gene_modification" | "gene_deletion" | "workflow_change" | "state_evolution"
  description: string
  code: string
  confidence: number
  timestamp: Date
  status: "pending" | "applied" | "reverted" | "failed"
  fitnessImpact: number
  agent: string
}

interface MutationPanelProps {
  currentTheme: string
  onApplyMutation: (mutation: Mutation) => void
  onRevertMutation: (mutationId: string) => void
}

export function MutationPanel({ currentTheme, onApplyMutation, onRevertMutation }: MutationPanelProps) {
  const [mutations, setMutations] = useState<Mutation[]>([
    {
      id: "1",
      type: "gene_addition",
      description: "Add adaptive learning gene for consciousness enhancement",
      code: `gene adaptive_learning {
  function learn_from_experience(experience: Experience) {
    pattern = extract_pattern(experience);
    if (pattern.significance > 0.7) {
      mutate(consciousness, +0.05);
      store_memory(pattern);
    }
  }
}`,
      confidence: 0.92,
      timestamp: new Date(Date.now() - 300000),
      status: "applied",
      fitnessImpact: 0.15,
      agent: "SHIFT-Assist",
    },
    {
      id: "2",
      type: "gene_modification",
      description: "Optimize quantum entanglement efficiency",
      code: `// Modified quantum_entangler gene
function create_superposition(states: State[]) {
  // Enhanced coherence maintenance
  quantum_state = superposition(states);
  coherence_time = maintain_coherence(quantum_state, enhanced: true);
  
  if (coherence_time > 2000) { // Increased threshold
    mutate(quantum_coherence, +0.05); // Increased gain
  }
  
  return quantum_measure(quantum_state);
}`,
      confidence: 0.87,
      timestamp: new Date(Date.now() - 120000),
      status: "pending",
      fitnessImpact: 0.08,
      agent: "G'volution Engine",
    },
    {
      id: "3",
      type: "workflow_change",
      description: "Add security validation to evolution workflow",
      code: `on evolve() {
  // Security validation before evolution
  security_check = SecurityGene.validate_mutation(proposed_changes);
  if (security_check.threat_level < 0.3) {
    fitness_delta = calculate_fitness_improvement();
    if (fitness_delta > 0.1) {
      quantum_entangler.create_superposition([
        current_state,
        evolved_state,
        potential_state
      ]);
    }
  } else {
    log_security_event(security_check);
  }
}`,
      confidence: 0.95,
      timestamp: new Date(Date.now() - 60000),
      status: "pending",
      fitnessImpact: 0.12,
      agent: "Security Gene",
    },
  ])

  const [selectedMutation, setSelectedMutation] = useState<Mutation | null>(null)
  const isBioGlow = currentTheme === "dna-lang-bio-glow"

  const handleApplyMutation = (mutation: Mutation) => {
    setMutations((prev) => prev.map((m) => (m.id === mutation.id ? { ...m, status: "applied" as const } : m)))
    onApplyMutation(mutation)
  }

  const handleRevertMutation = (mutationId: string) => {
    setMutations((prev) => prev.map((m) => (m.id === mutationId ? { ...m, status: "reverted" as const } : m)))
    onRevertMutation(mutationId)
  }

  const getStatusIcon = (status: Mutation["status"]) => {
    switch (status) {
      case "applied":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "pending":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "reverted":
        return <History className="h-4 w-4 text-gray-500" />
    }
  }

  const getTypeColor = (type: Mutation["type"]) => {
    switch (type) {
      case "gene_addition":
        return "bg-green-100 text-green-800"
      case "gene_modification":
        return "bg-blue-100 text-blue-800"
      case "gene_deletion":
        return "bg-red-100 text-red-800"
      case "workflow_change":
        return "bg-purple-100 text-purple-800"
      case "state_evolution":
        return "bg-orange-100 text-orange-800"
    }
  }

  const totalFitnessImpact = mutations
    .filter((m) => m.status === "applied")
    .reduce((sum, m) => sum + m.fitnessImpact, 0)

  return (
    <div className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center space-x-2">
          <Zap className="h-4 w-4" />
          <span>Mutation Panel</span>
          <Badge variant="outline" className="text-xs">
            G'volution v2.0
          </Badge>
        </CardTitle>
        <div className="text-xs text-muted-foreground">
          Total Fitness Impact:{" "}
          {isBioGlow ? (
            <BioGlowText color="#00FF88">+{(totalFitnessImpact * 100).toFixed(1)}%</BioGlowText>
          ) : (
            `+${(totalFitnessImpact * 100).toFixed(1)}%`
          )}
        </div>
      </CardHeader>

      <div className="flex-1 overflow-hidden">
        <Tabs defaultValue="pending" className="h-full">
          <TabsList className="grid w-full grid-cols-3 text-xs">
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="applied">Applied</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="h-full mt-0 overflow-auto">
            <div className="p-2 space-y-2">
              {mutations
                .filter((m) => m.status === "pending")
                .map((mutation) => (
                  <Card key={mutation.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Badge className={getTypeColor(mutation.type)} variant="outline">
                            {mutation.type.replace("_", " ")}
                          </Badge>
                          <span className="text-xs text-muted-foreground">by {mutation.agent}</span>
                        </div>
                        {getStatusIcon(mutation.status)}
                      </div>

                      <div className="text-sm font-medium mb-2">{mutation.description}</div>

                      <div className="flex items-center justify-between text-xs mb-2">
                        <span>Confidence: {(mutation.confidence * 100).toFixed(0)}%</span>
                        <span className="text-green-600">+{(mutation.fitnessImpact * 100).toFixed(1)}% fitness</span>
                      </div>

                      <Progress value={mutation.confidence * 100} className="h-1 mb-2" />

                      <div className="flex space-x-2">
                        <Button size="sm" onClick={() => handleApplyMutation(mutation)} className="flex-1">
                          <Zap className="h-3 w-3 mr-1" />
                          Apply
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setSelectedMutation(mutation)}>
                          <Code className="h-3 w-3 mr-1" />
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="applied" className="h-full mt-0 overflow-auto">
            <div className="p-2 space-y-2">
              {mutations
                .filter((m) => m.status === "applied")
                .map((mutation) => (
                  <Card key={mutation.id} className="border-green-200">
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Badge className={getTypeColor(mutation.type)} variant="outline">
                            {mutation.type.replace("_", " ")}
                          </Badge>
                          <span className="text-xs text-muted-foreground">by {mutation.agent}</span>
                        </div>
                        {getStatusIcon(mutation.status)}
                      </div>

                      <div className="text-sm font-medium mb-2">{mutation.description}</div>

                      <div className="flex items-center justify-between text-xs mb-2">
                        <span>Applied: {mutation.timestamp.toLocaleTimeString()}</span>
                        <span className="text-green-600">+{(mutation.fitnessImpact * 100).toFixed(1)}% fitness</span>
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRevertMutation(mutation.id)}
                          className="flex-1"
                        >
                          <History className="h-3 w-3 mr-1" />
                          Revert
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setSelectedMutation(mutation)}>
                          <Diff className="h-3 w-3 mr-1" />
                          Diff
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="history" className="h-full mt-0 overflow-auto">
            <div className="p-2 space-y-2">
              {mutations
                .filter((m) => m.status === "reverted" || m.status === "failed")
                .map((mutation) => (
                  <Card key={mutation.id} className="opacity-60">
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Badge className={getTypeColor(mutation.type)} variant="outline">
                            {mutation.type.replace("_", " ")}
                          </Badge>
                          <span className="text-xs text-muted-foreground">by {mutation.agent}</span>
                        </div>
                        {getStatusIcon(mutation.status)}
                      </div>

                      <div className="text-sm font-medium mb-2">{mutation.description}</div>

                      <div className="text-xs text-muted-foreground">
                        {mutation.status === "reverted" ? "Reverted" : "Failed"}:{" "}
                        {mutation.timestamp.toLocaleTimeString()}
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Code Viewer Modal */}
      {selectedMutation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-[80%] h-[80%] max-w-4xl">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{selectedMutation.description}</span>
                <Button variant="ghost" onClick={() => setSelectedMutation(null)}>
                  ×
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="h-full overflow-auto">
              <pre className="bg-muted p-4 rounded-lg font-mono text-sm overflow-auto">{selectedMutation.code}</pre>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
