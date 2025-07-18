"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Dna, Zap, Brain, Atom, Activity, Code, LayoutDashboard, TrendingUp, Globe } from "lucide-react"
import OrganismEvolutionVisualizer from "@/components/organism-evolution-visualizer"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  // Mock data for dashboard metrics
  const metrics = {
    totalOrganisms: 1250,
    activeEvolutions: 87,
    quantumOperations: "2.3M",
    consciousAgents: 150,
    avgFitness: 0.85,
    avgCoherence: 0.78,
    avgConsciousness: 0.65,
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-slate-800/70 border-slate-700 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Total Organisms</CardTitle>
            <Dna className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{metrics.totalOrganisms}</div>
            <p className="text-xs text-gray-400">+20% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/70 border-slate-700 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Active Evolutions</CardTitle>
            <Zap className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{metrics.activeEvolutions}</div>
            <p className="text-xs text-gray-400">+5 active now</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/70 border-slate-700 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Quantum Operations</CardTitle>
            <Atom className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{metrics.quantumOperations}</div>
            <p className="text-xs text-gray-400">per second</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/70 border-slate-700 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Conscious Agents</CardTitle>
            <Brain className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{metrics.consciousAgents}</div>
            <p className="text-xs text-gray-400">currently active</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-slate-800/70 border-slate-700 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <Activity className="h-5 w-5" /> Ecosystem Health Overview
            </CardTitle>
            <CardDescription className="text-gray-400">
              Key performance indicators of your DNA-Lang ecosystem.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-300">Average Organism Fitness</span>
                <span className="text-green-400">{(metrics.avgFitness * 100).toFixed(1)}%</span>
              </div>
              <Progress value={metrics.avgFitness * 100} className="h-2" indicatorColor="bg-green-500" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-300">Average Quantum Coherence</span>
                <span className="text-blue-400">{(metrics.avgCoherence * 100).toFixed(1)}%</span>
              </div>
              <Progress value={metrics.avgCoherence * 100} className="h-2" indicatorColor="bg-blue-500" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-300">Average Consciousness Level</span>
                <span className="text-purple-400">{(metrics.avgConsciousness * 100).toFixed(1)}%</span>
              </div>
              <Progress value={metrics.avgConsciousness * 100} className="h-2" indicatorColor="bg-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/70 border-slate-700 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-400">
              <LayoutDashboard className="h-5 w-5" /> Quick Actions
            </CardTitle>
            <CardDescription className="text-gray-400">Jump into key DNA-Lang features.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild className="w-full bg-purple-600 hover:bg-purple-700 text-white">
              <Link href="/ide">
                <Code className="mr-2 h-4 w-4" /> Open DNA-Lang IDE
              </Link>
            </Button>
            <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              <Link href="/dashboard/quantum">
                <Atom className="mr-2 h-4 w-4" /> Generate Quantum Organism
              </Link>
            </Button>
            <Button asChild className="w-full bg-yellow-600 hover:bg-yellow-700 text-white">
              <Link href="/dashboard/marketplace">
                <Globe className="mr-2 h-4 w-4" /> Explore Marketplace
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full border-green-500 text-green-300 hover:bg-green-900 hover:text-white bg-transparent"
            >
              <Link href="#">
                <TrendingUp className="mr-2 h-4 w-4" /> Monitor Evolutions
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <OrganismEvolutionVisualizer />
    </div>
  )
}
