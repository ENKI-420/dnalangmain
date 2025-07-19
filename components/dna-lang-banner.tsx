"use client"

import { useState, useEffect } from "react"
import { Dna, Zap, Brain, Shield, Globe, Cpu } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { BioGlowText, BioGlowEffects } from "./ide/bio-glow-effects"

export function DNALangBanner() {
  const [animationPhase, setAnimationPhase] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase((prev) => (prev + 0.02) % (Math.PI * 2))
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-black to-green-900 text-white">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-green-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-cyan-500 rounded-full blur-2xl animate-pulse delay-500" />
      </div>

      <div className="relative z-10 p-8">
        <div className="text-center mb-8">
          <div className="font-mono text-4xl font-bold mb-4 tracking-wider">
            <BioGlowText color="#00FF88" intensity={1.5}>
              DNA-LANG
            </BioGlowText>
          </div>
          <div className="text-xl text-cyan-300 mb-2">Living Software Evolution</div>
          <div className="text-lg text-purple-300">The Engine for the Next Epoch</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <BioGlowEffects isActive={true} intensity={0.6}>
            <Card className="bg-black/50 border-green-500/30">
              <CardContent className="p-4 text-center">
                <Dna className="h-8 w-8 mx-auto mb-2 text-green-400" />
                <h3 className="font-semibold text-green-300">Self-Healing Organisms</h3>
                <p className="text-sm text-gray-300">Software that evolves, adapts, and heals itself autonomously</p>
              </CardContent>
            </Card>
          </BioGlowEffects>

          <BioGlowEffects isActive={true} intensity={0.6}>
            <Card className="bg-black/50 border-purple-500/30">
              <CardContent className="p-4 text-center">
                <Brain className="h-8 w-8 mx-auto mb-2 text-purple-400" />
                <h3 className="font-semibold text-purple-300">Conscious Computing</h3>
                <p className="text-sm text-gray-300">AI systems with meta-cognition and self-awareness</p>
              </CardContent>
            </Card>
          </BioGlowEffects>

          <BioGlowEffects isActive={true} intensity={0.6}>
            <Card className="bg-black/50 border-cyan-500/30">
              <CardContent className="p-4 text-center">
                <Zap className="h-8 w-8 mx-auto mb-2 text-cyan-400" />
                <h3 className="font-semibold text-cyan-300">Quantum Evolution</h3>
                <p className="text-sm text-gray-300">Quantum-native algorithms for exponential optimization</p>
              </CardContent>
            </Card>
          </BioGlowEffects>
        </div>

        <div className="text-center">
          <div className="text-sm text-gray-400 mb-4">Strategic Brief: Transformative World-Scale Services</div>
          <div className="flex justify-center space-x-8 text-xs">
            <div className="flex items-center space-x-1">
              <Shield className="h-3 w-3 text-red-400" />
              <span>Zero-Trust Security</span>
            </div>
            <div className="flex items-center space-x-1">
              <Globe className="h-3 w-3 text-blue-400" />
              <span>Planetary-Scale Systems</span>
            </div>
            <div className="flex items-center space-x-1">
              <Cpu className="h-3 w-3 text-yellow-400" />
              <span>Hyperautomation</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
