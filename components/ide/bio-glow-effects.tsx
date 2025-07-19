"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface BioGlowEffectsProps {
  isActive: boolean
  intensity?: number
  children: React.ReactNode
  className?: string
}

export function BioGlowEffects({ isActive, intensity = 1, children, className }: BioGlowEffectsProps) {
  const [pulsePhase, setPulsePhase] = useState(0)
  const [glowIntensity, setGlowIntensity] = useState(intensity)

  useEffect(() => {
    if (!isActive) return

    const interval = setInterval(() => {
      setPulsePhase((prev) => (prev + 0.1) % (Math.PI * 2))
      setGlowIntensity(intensity * (0.8 + 0.2 * Math.sin(pulsePhase)))
    }, 50)

    return () => clearInterval(interval)
  }, [isActive, intensity, pulsePhase])

  if (!isActive) {
    return <div className={className}>{children}</div>
  }

  return (
    <div
      className={cn("bio-glow-container", className)}
      style={
        {
          "--glow-intensity": glowIntensity,
          "--pulse-phase": pulsePhase,
        } as React.CSSProperties
      }
    >
      {children}
      <style jsx>{`
        .bio-glow-container {
          position: relative;
          transition: all 0.3s ease-in-out;
        }

        .bio-glow-container::before {
          content: "";
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(
            45deg,
            rgba(0, 255, 136, var(--glow-intensity, 0.3)),
            rgba(0, 204, 255, var(--glow-intensity, 0.2)),
            rgba(255, 107, 53, var(--glow-intensity, 0.2)),
            rgba(0, 255, 136, var(--glow-intensity, 0.3))
          );
          border-radius: 8px;
          filter: blur(4px);
          opacity: var(--glow-intensity, 0.3);
          z-index: -1;
          animation: bio-pulse 2s ease-in-out infinite;
        }

        @keyframes bio-pulse {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.02);
          }
        }

        .bio-glow-container:hover::before {
          opacity: calc(var(--glow-intensity, 0.3) * 1.5);
          filter: blur(6px);
        }
      `}</style>
    </div>
  )
}

interface BioGlowTextProps {
  children: React.ReactNode
  color?: string
  glowColor?: string
  intensity?: number
  className?: string
}

export function BioGlowText({ children, color = "#00FF88", glowColor, intensity = 1, className }: BioGlowTextProps) {
  const [animationPhase, setAnimationPhase] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase((prev) => (prev + 0.05) % (Math.PI * 2))
    }, 50)

    return () => clearInterval(interval)
  }, [])

  const finalGlowColor = glowColor || color
  const glowOpacity = 0.3 + 0.2 * Math.sin(animationPhase) * intensity

  return (
    <span
      className={cn("bio-glow-text", className)}
      style={{
        color,
        textShadow: `
          0 0 5px ${finalGlowColor}${Math.floor(glowOpacity * 255)
            .toString(16)
            .padStart(2, "0")},
          0 0 10px ${finalGlowColor}${Math.floor(glowOpacity * 128)
            .toString(16)
            .padStart(2, "0")},
          0 0 15px ${finalGlowColor}${Math.floor(glowOpacity * 64)
            .toString(16)
            .padStart(2, "0")}
        `,
        transition: "all 0.3s ease-in-out",
      }}
    >
      {children}
      <style jsx>{`
        .bio-glow-text {
          animation: bio-text-glow 3s ease-in-out infinite;
        }

        @keyframes bio-text-glow {
          0%,
          100% {
            filter: brightness(1);
          }
          50% {
            filter: brightness(1.2);
          }
        }

        .bio-glow-text:hover {
          filter: brightness(1.3) !important;
          transform: scale(1.02);
        }
      `}</style>
    </span>
  )
}

interface BioParticleEffectProps {
  isActive: boolean
  particleCount?: number
  className?: string
}

export function BioParticleEffect({ isActive, particleCount = 20, className }: BioParticleEffectProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])

  useEffect(() => {
    if (!isActive) {
      setParticles([])
      return
    }

    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
    }))

    setParticles(newParticles)
  }, [isActive, particleCount])

  if (!isActive || particles.length === 0) {
    return null
  }

  return (
    <div className={cn("bio-particle-container", className)}>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="bio-particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
      <style jsx>{`
        .bio-particle-container {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 1;
        }

        .bio-particle {
          position: absolute;
          width: 2px;
          height: 2px;
          background: radial-gradient(circle, #00ff88 0%, transparent 70%);
          border-radius: 50%;
          animation: bio-particle-float 4s ease-in-out infinite;
        }

        @keyframes bio-particle-float {
          0%,
          100% {
            transform: translateY(0px) scale(0.5);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          50% {
            transform: translateY(-20px) scale(1);
            opacity: 0.8;
          }
          90% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}
