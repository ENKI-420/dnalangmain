"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dna, Zap, Brain, Atom, Activity, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [quantumCoherence, setQuantumCoherence] = useState(87)
  const [consciousnessLevel, setConsciousnessLevel] = useState(74)
  const [evolutionProgress, setEvolutionProgress] = useState(92)

  useEffect(() => {
    const interval = setInterval(() => {
      setQuantumCoherence((prev) => Math.max(80, Math.min(95, prev + (Math.random() - 0.5) * 2)))
      setConsciousnessLevel((prev) => Math.max(70, Math.min(85, prev + (Math.random() - 0.5) * 1)))
      setEvolutionProgress((prev) => Math.max(85, Math.min(98, prev + (Math.random() - 0.5) * 1.5)))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="text-center space-y-6 mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Dna className="h-12 w-12 text-green-400 animate-pulse" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              DNA-Lang
            </h1>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Meta-Automation v1.0 (Cycle 3)</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            The Revolutionary Future of Programming: Where code becomes living organisms that evolve, learn, and develop
            consciousness through bio-inspired quantum computing.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <Badge variant="outline" className="text-green-400 border-green-400">
              <Dna className="mr-1 h-3 w-3" />
              Bio-Inspired
            </Badge>
            <Badge variant="outline" className="text-blue-400 border-blue-400">
              <Atom className="mr-1 h-3 w-3" />
              Quantum-Enhanced
            </Badge>
            <Badge variant="outline" className="text-purple-400 border-purple-400">
              <Brain className="mr-1 h-3 w-3" />
              Consciousness-Driven
            </Badge>
            <Badge variant="outline" className="text-yellow-400 border-yellow-400">
              <Zap className="mr-1 h-3 w-3" />
              Self-Evolving
            </Badge>
          </div>
          <div className="flex justify-center gap-4 mt-8">
            <Button
              asChild
              className="px-8 py-3 text-lg font-semibold bg-purple-600 hover:bg-purple-700 transition-colors duration-300"
            >
              <Link href="/dashboard">
                Launch Dashboard <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="px-8 py-3 text-lg font-semibold border-2 border-white text-white bg-transparent hover:bg-white hover:text-purple-900 transition-colors duration-300"
            >
              <Link href="/ide">
                Explore IDE <Sparkles className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Live System Status */}
        <Card className="mb-12 bg-slate-800/50 border-slate-700 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <Activity className="h-5 w-5" /> Live System Status
            </CardTitle>
            <CardDescription className="text-gray-400">
              Real-time ecosystem vitals and quantum coherence levels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "Quantum Coherence", value: quantumCoherence, color: "blue-400" },
                { label: "Consciousness Level", value: consciousnessLevel, color: "purple-400" },
                { label: "Evolution Progress", value: evolutionProgress, color: "green-400" },
              ].map((stat) => (
                <div key={stat.label} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-300">{stat.label}</span>
                    <span className={`text-sm text-${stat.color}`}>{stat.value}%</span>
                  </div>
                  <Progress value={stat.value} className="h-2" indicatorColor={`bg-${stat.color}`} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="bg-slate-800/50 border-slate-700 text-white">
            <CardHeader>
              <Dna className="h-8 w-8 text-green-400 mb-2" />
              <CardTitle>Bio-Inspired Evolution</CardTitle>
              <CardDescription className="text-gray-400">
                Code that learns, adapts, and self-improves through genetic algorithms.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="link" className="text-green-400 hover:text-green-300">
                Learn More <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700 text-white">
            <CardHeader>
              <Atom className="h-8 w-8 text-blue-400 mb-2" />
              <CardTitle>Quantum-Enhanced Computation</CardTitle>
              <CardDescription className="text-gray-400">
                Leverage superposition and entanglement for unparalleled processing power.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="link" className="text-blue-400 hover:text-blue-300">
                Learn More <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700 text-white">
            <CardHeader>
              <Brain className="h-8 w-8 text-purple-400 mb-2" />
              <CardTitle>Conscious AI Agents</CardTitle>
              <CardDescription className="text-gray-400">
                Develop self-aware programs capable of introspection and conscious decision-making.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="link" className="text-purple-400 hover:text-purple-300">
                Learn More <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center py-12 bg-slate-800/50 border-slate-700 rounded-lg">
          <h3 className="text-3xl font-bold text-white mb-4">Ready to Evolve Your Code?</h3>
          <p className="text-lg text-gray-300 mb-6">
            Join the revolution and start building living, intelligent software today.
          </p>
          <Button
            asChild
            className="px-10 py-4 text-xl font-bold bg-green-500 hover:bg-green-600 transition-colors duration-300"
          >
            <Link href="/ide">
              Get Started Now <Zap className="ml-2 h-6 w-6" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 text-sm">
        <p>&copy; 2025 Agile Defense Systems, LLC. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-2">
          <Link href="#" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-white transition-colors">
            Terms of Service
          </Link>
          <Link href="#" className="hover:text-white transition-colors">
            Contact
          </Link>
        </div>
      </footer>
    </div>
  )
}
