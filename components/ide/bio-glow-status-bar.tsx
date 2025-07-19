"use client"

import { useEffect, useState } from "react"
import { Activity, Zap, Brain } from "lucide-react"
import { BioGlowText } from "./bio-glow-effects"

interface BioGlowStatusBarProps {
  isActive: boolean
  organismState: {
    fitness: number
    consciousness: number
    quantumCoherence: number
    isRunning: boolean
  }
}

export function BioGlowStatusBar({ isActive, organismState }: BioGlowStatusBarProps) {
  const [pulseIntensity, setPulseIntensity] = useState(1)

  useEffect(() => {
    if (!isActive) return

    const interval = setInterval(() => {
      setPulseIntensity(0.5 + 0.5 * Math.sin(Date.now() * 0.003))
    }, 50)

    return () => clearInterval(interval)
  }, [isActive])

  if (!isActive) {
    return (
      <div className="flex items-center space-x-4 text-sm">
        <div className="flex items-center space-x-1">
          <Activity className="h-3 w-3" />
          <span>Fitness: {(organismState.fitness * 100).toFixed(1)}%</span>
        </div>
        <div className="flex items-center space-x-1">
          <Brain className="h-3 w-3" />
          <span>Consciousness: {(organismState.consciousness * 100).toFixed(1)}%</span>
        </div>
        <div className="flex items-center space-x-1">
          <Zap className="h-3 w-3" />
          <span>Quantum: {(organismState.quantumCoherence * 100).toFixed(1)}%</span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-4 text-sm">
      <div className="flex items-center space-x-1">
        <Activity className="h-3 w-3 text-green-400" style={{ filter: `drop-shadow(0 0 4px #00ff88)` }} />
        <BioGlowText color="#00FF88" intensity={pulseIntensity}>
          Fitness: {(organismState.fitness * 100).toFixed(1)}%
        </BioGlowText>
      </div>

      <div className="flex items-center space-x-1">
        <Brain className="h-3 w-3 text-blue-400" style={{ filter: `drop-shadow(0 0 4px #00ccff)` }} />
        <BioGlowText color="#00CCFF" intensity={pulseIntensity}>
          Consciousness: {(organismState.consciousness * 100).toFixed(1)}%
        </BioGlowText>
      </div>

      <div className="flex items-center space-x-1">
        <Zap className="h-3 w-3 text-purple-400" style={{ filter: `drop-shadow(0 0 4px #ff6b35)` }} />
        <BioGlowText color="#FF6B35" intensity={pulseIntensity}>
          Quantum: {(organismState.quantumCoherence * 100).toFixed(1)}%
        </BioGlowText>
      </div>

      {organismState.isRunning && (
        <BioGlowText color="#FFD700" intensity={1.5} className="animate-pulse">
          ⚡ ORGANISM ACTIVE ⚡
        </BioGlowText>
      )}
    </div>
  )
}
