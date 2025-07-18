"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw, FastForward, Dna, Brain, Atom } from "lucide-react"

interface OrganismNode {
  id: string
  x: number
  y: number
  size: number
  color: string
  genes: string[]
  fitness: number
  consciousness: number
  quantumCoherence: number
}

interface EvolutionData {
  generation: number
  organisms: OrganismNode[]
}

const initialEvolutionData: EvolutionData = {
  generation: 0,
  organisms: Array.from({ length: 20 }, (_, i) => ({
    id: `org-${i}`,
    x: Math.random() * 800,
    y: Math.random() * 600,
    size: 10 + Math.random() * 10,
    color: `hsl(${Math.random() * 360}, 70%, 50%)`,
    genes: [`gene-${Math.floor(Math.random() * 5)}`, `gene-${Math.floor(Math.random() * 5)}`],
    fitness: Math.random(),
    consciousness: Math.random(),
    quantumCoherence: Math.random(),
  })),
}

export default function OrganismEvolutionVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [evolutionData, setEvolutionData] = useState<EvolutionData>(initialEvolutionData)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1) // 1x, 2x, 4x
  const animationFrameRef = useRef<number | null>(null)
  const lastUpdateTimeRef = useRef<number>(0)

  const updateEvolution = useCallback(() => {
    setEvolutionData((prevData) => {
      const newOrganisms = prevData.organisms.map((org) => {
        // Simulate movement
        const newX = org.x + (Math.random() - 0.5) * 5 * speed
        const newY = org.y + (Math.random() - 0.5) * 5 * speed

        // Simulate evolution: fitness, consciousness, quantum coherence change
        const newFitness = Math.max(0.1, Math.min(0.9, org.fitness + (Math.random() - 0.5) * 0.02 * speed))
        const newConsciousness = Math.max(0.1, Math.min(0.9, org.consciousness + (Math.random() - 0.5) * 0.01 * speed))
        const newQuantumCoherence = Math.max(
          0.1,
          Math.min(0.9, org.quantumCoherence + (Math.random() - 0.5) * 0.015 * speed),
        )

        // Simulate mutation (e.g., change color slightly based on fitness)
        const hue = Number.parseFloat(org.color.match(/hsl\((\d+),/)![1])
        const newHue = (hue + (newFitness > 0.7 ? 5 : -5)) % 360
        const newColor = `hsl(${newHue}, 70%, 50%)`

        // Simulate selection (less fit organisms might shrink or disappear, new ones appear)
        const newSize = org.size * (1 + (newFitness - 0.5) * 0.05) // Grow if fit, shrink if not

        return {
          ...org,
          x: Math.max(0, Math.min(800, newX)),
          y: Math.max(0, Math.min(600, newY)),
          size: Math.max(5, Math.min(30, newSize)),
          color: newColor,
          fitness: newFitness,
          consciousness: newConsciousness,
          quantumCoherence: newQuantumCoherence,
        }
      })

      // Add/remove organisms to simulate birth/death
      const livingOrganisms = newOrganisms.filter((org) => org.fitness > 0.2)
      while (livingOrganisms.length < 20) {
        livingOrganisms.push({
          id: `org-${Date.now()}-${Math.random()}`,
          x: Math.random() * 800,
          y: Math.random() * 600,
          size: 10 + Math.random() * 10,
          color: `hsl(${Math.random() * 360}, 70%, 50%)`,
          genes: [`gene-${Math.floor(Math.random() * 5)}`, `gene-${Math.floor(Math.random() * 5)}`],
          fitness: Math.random(),
          consciousness: Math.random(),
          quantumCoherence: Math.random(),
        })
      }

      return {
        generation: prevData.generation + 1,
        organisms: livingOrganisms,
      }
    })
  }, [speed])

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)" // Faint trail effect
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    evolutionData.organisms.forEach((org) => {
      ctx.beginPath()
      ctx.arc(org.x, org.y, org.size, 0, Math.PI * 2)
      ctx.fillStyle = org.color
      ctx.shadowColor = org.color
      ctx.shadowBlur = org.size / 2
      ctx.fill()
      ctx.closePath()

      // Draw gene indicators
      org.genes.forEach((gene, index) => {
        ctx.fillStyle = "white"
        ctx.font = `${org.size / 2}px Arial`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(gene.charAt(0).toUpperCase(), org.x + (index * org.size) / 2 - org.size / 4, org.y + org.size + 5)
      })

      // Draw fitness/consciousness/quantum coherence as rings or inner circles
      ctx.strokeStyle = `rgba(255, 255, 255, ${org.fitness})`
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(org.x, org.y, org.size * org.fitness, 0, Math.PI * 2)
      ctx.stroke()

      ctx.strokeStyle = `rgba(150, 200, 255, ${org.quantumCoherence})`
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.arc(org.x, org.y, org.size * org.quantumCoherence * 0.8, 0, Math.PI * 2)
      ctx.stroke()

      ctx.strokeStyle = `rgba(255, 150, 255, ${org.consciousness})`
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.arc(org.x, org.y, org.size * org.consciousness * 0.6, 0, Math.PI * 2)
      ctx.stroke()
    })
  }, [evolutionData])

  useEffect(() => {
    const animate = (currentTime: DOMHighResTimeStamp) => {
      const deltaTime = currentTime - lastUpdateTimeRef.current
      if (isPlaying && deltaTime > 1000 / (30 * speed)) {
        // Update 30 times per second, adjusted by speed
        updateEvolution()
        lastUpdateTimeRef.current = currentTime
      }
      draw()
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    if (isPlaying) {
      lastUpdateTimeRef.current = performance.now()
      animationFrameRef.current = requestAnimationFrame(animate)
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isPlaying, updateEvolution, draw, speed])

  const handleReset = () => {
    setEvolutionData(initialEvolutionData)
    setIsPlaying(false)
    setSpeed(1)
  }

  return (
    <Card className="w-full max-w-4xl mx-auto bg-slate-800/70 border-slate-700 text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-400">
          <Dna className="h-6 w-6" /> Organism Evolution Visualizer
        </CardTitle>
        <CardDescription className="text-gray-400">
          Observe the real-time evolution of DNA-Lang organisms.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative bg-slate-900 border border-slate-700 rounded-lg overflow-hidden">
          <canvas ref={canvasRef} width={800} height={600} className="w-full h-auto"></canvas>
          <div className="absolute top-2 left-2 text-sm text-gray-300 bg-slate-900/70 px-2 py-1 rounded">
            Generation: {evolutionData.generation}
          </div>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex gap-2">
            <Button
              onClick={() => setIsPlaying(!isPlaying)}
              variant="secondary"
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
            <Button onClick={handleReset} variant="secondary" className="bg-slate-700 hover:bg-slate-600 text-white">
              <RotateCcw className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex items-center gap-2 w-full max-w-xs">
            <FastForward className="h-5 w-5 text-gray-400" />
            <Slider
              min={1}
              max={4}
              step={1}
              value={[speed]}
              onValueChange={(val) => setSpeed(val[0])}
              className="w-full"
            />
            <span className="text-sm text-gray-300">{speed}x</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300">
          <div className="flex items-center gap-2">
            <Dna className="h-4 w-4 text-green-400" /> Bio-Inspired Evolution
          </div>
          <div className="flex items-center gap-2">
            <Atom className="h-4 w-4 text-blue-400" /> Quantum Coherence
          </div>
          <div className="flex items-center gap-2">
            <Brain className="h-4 w-4 text-purple-400" /> Consciousness Level
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
