"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Loader2, Zap, Brain, Atom, Code, Lightbulb, Gauge, Sparkles } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface QuantumAgentResponse {
  dnaCode: string
  explanation: string
  quantumMetrics: {
    superpositionProbability: number
    entanglementStrength: number
    coherenceTime: number
  }
  consciousnessInsights: string
}

export default function QuantumAgentPage() {
  const [prompt, setPrompt] = useState("")
  const [response, setResponse] = useState<QuantumAgentResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter a prompt to generate DNA-Lang code.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    setResponse(null)
    try {
      const res = await fetch("/api/quantum-agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.details || "Failed to fetch response from quantum agent.")
      }

      const data: QuantumAgentResponse = await res.json()
      setResponse(data)
      toast({
        title: "Success!",
        description: "DNA-Lang organism generated successfully.",
        variant: "default",
      })
    } catch (error) {
      console.error("Error generating organism:", error)
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <Card className="bg-slate-800/70 border-slate-700 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Atom className="h-6 w-6" /> Quantum DNA Agent
          </CardTitle>
          <CardDescription className="text-gray-400">
            Generate bio-inspired DNA-Lang code using natural language prompts, powered by quantum AI.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="prompt" className="text-gray-300">
              Enter your organism's desired functionality:
            </Label>
            <Textarea
              id="prompt"
              placeholder="e.g., 'Create an organism that optimizes data processing using quantum superposition and learns from its environment.'"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={5}
              className="mt-2 bg-slate-900 border-slate-700 text-white placeholder:text-gray-500"
              disabled={isLoading}
            />
          </div>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
              </>
            ) : (
              <>
                <Zap className="mr-2 h-4 w-4" /> Generate Organism
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {response && (
        <Card className="bg-slate-800/70 border-slate-700 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <Sparkles className="h-6 w-6" /> Generated Organism
            </CardTitle>
            <CardDescription className="text-gray-400">
              Here's the DNA-Lang code and insights from the Quantum Agent.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-300 mb-2">
                <Code className="h-5 w-5 text-purple-400" /> DNA-Lang Code
              </h3>
              <pre className="bg-slate-900 p-4 rounded-md text-sm overflow-auto border border-slate-700">
                <code>{response.dnaCode}</code>
              </pre>
            </div>
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-300 mb-2">
                <Lightbulb className="h-5 w-5 text-yellow-400" /> Explanation
              </h3>
              <p className="text-gray-300">{response.explanation}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-300 mb-2">
                  <Gauge className="h-5 w-5 text-blue-400" /> Quantum Metrics
                </h3>
                <ul className="list-disc list-inside text-gray-300">
                  <li>
                    Superposition Probability: {(response.quantumMetrics.superpositionProbability * 100).toFixed(2)}%
                  </li>
                  <li>Entanglement Strength: {(response.quantumMetrics.entanglementStrength * 100).toFixed(2)}%</li>
                  <li>Coherence Time: {response.quantumMetrics.coherenceTime.toFixed(2)} ns</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-300 mb-2">
                  <Brain className="h-5 w-5 text-purple-400" /> Consciousness Insights
                </h3>
                <p className="text-gray-300">{response.consciousnessInsights}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
