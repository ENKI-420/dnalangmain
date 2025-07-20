"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"
import * as THREE from "three"

interface Particle {
  x: number
  y: number
  speed: number
  char: string
  opacity: number
  lastUpdate: number
}

const HeroAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const threeContainerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isLowPerformance, setIsLowPerformance] = useState(false)

  useEffect(() => {
    // Detect mobile and performance capabilities
    const checkDevice = () => {
      const mobile =
        window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      setIsMobile(mobile)

      // Check for low-performance indicators
      const lowPerf = mobile || navigator.hardwareConcurrency <= 2 || window.innerWidth < 480
      setIsLowPerformance(lowPerf)
    }

    checkDevice()
    window.addEventListener("resize", checkDevice)
    return () => window.removeEventListener("resize", checkDevice)
  }, [])

  useEffect(() => {
    if (!canvasRef.current || !threeContainerRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Performance-based settings
    const settings = {
      particleCount: isLowPerformance ? 20 : isMobile ? 40 : 80,
      animationFrameSkip: isLowPerformance ? 3 : isMobile ? 2 : 1,
      helixDetail: isLowPerformance ? 20 : isMobile ? 40 : 80,
      enableThreeJS: !isLowPerformance, // Disable 3D on very low-end devices
      fontSize: isMobile ? 12 : 14,
      trailLength: isLowPerformance ? 0.2 : 0.05,
    }

    // Set canvas size with device pixel ratio consideration
    const resizeCanvas = () => {
      const dpr = isLowPerformance ? 1 : Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()

      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = rect.width + "px"
      canvas.style.height = rect.height + "px"

      ctx.scale(dpr, dpr)
    }
    resizeCanvas()

    // Optimized terms array
    const terms = isLowPerformance
      ? ["DNA", "RNA", "GENE", "CELL", "DEFENSE", "QUANTUM"]
      : [
          "ATCG",
          "CRISPR",
          "DNA",
          "RNA",
          "HELIX",
          "GENE",
          "CELL",
          "AMINO",
          "DEFENSE",
          "QUANTUM",
          "SPECTRA",
          "TACTICAL",
          "PLASMA",
          "NEURAL",
          "BIOTECH",
          "GENOME",
          "PROTEIN",
          "ENZYME",
          "VECTOR",
          "MATRIX",
        ]

    // ASCII Rain particles with object pooling
    const particles: Particle[] = []
    const columns = Math.floor(canvas.width / (isMobile ? 25 : 20))

    // Initialize particles
    for (let i = 0; i < Math.min(columns, settings.particleCount); i++) {
      particles.push({
        x: i * (canvas.width / Math.min(columns, settings.particleCount)),
        y: Math.random() * canvas.height,
        speed: Math.random() * 2 + 0.5,
        char: terms[Math.floor(Math.random() * terms.length)],
        opacity: Math.random() * 0.8 + 0.2,
        lastUpdate: 0,
      })
    }

    // Three.js setup (only if performance allows)
    let scene: THREE.Scene | null = null
    let camera: THREE.PerspectiveCamera | null = null
    let renderer: THREE.WebGLRenderer | null = null
    let helixGroup: THREE.Group | null = null
    let animationId: number

    if (settings.enableThreeJS) {
      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: !isMobile,
        powerPreference: isMobile ? "low-power" : "high-performance",
      })

      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setClearColor(0x000000, 0)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2))
      threeContainerRef.current.appendChild(renderer.domElement)

      // Simplified helix geometry for mobile
      helixGroup = new THREE.Group()
      const radius = isMobile ? 1.5 : 2
      const height = isMobile ? 6 : 10
      const turns = isMobile ? 2 : 4
      const pointsPerTurn = settings.helixDetail / turns

      const strand1Points = []
      const strand2Points = []

      for (let i = 0; i < settings.helixDetail; i++) {
        const t = (i / settings.helixDetail) * turns * Math.PI * 2
        const y = (i / settings.helixDetail) * height - height / 2

        strand1Points.push(new THREE.Vector3(Math.cos(t) * radius, y, Math.sin(t) * radius))
        strand2Points.push(new THREE.Vector3(Math.cos(t + Math.PI) * radius, y, Math.sin(t + Math.PI) * radius))
      }

      // Create simplified strand geometries
      const strand1Geometry = new THREE.BufferGeometry().setFromPoints(strand1Points)
      const strand2Geometry = new THREE.BufferGeometry().setFromPoints(strand2Points)

      const strand1Material = new THREE.LineBasicMaterial({
        color: 0x00ff88,
        transparent: true,
        opacity: isMobile ? 0.6 : 0.8,
      })
      const strand2Material = new THREE.LineBasicMaterial({
        color: 0x0088ff,
        transparent: true,
        opacity: isMobile ? 0.6 : 0.8,
      })

      const strand1 = new THREE.Line(strand1Geometry, strand1Material)
      const strand2 = new THREE.Line(strand2Geometry, strand2Material)

      helixGroup.add(strand1)
      helixGroup.add(strand2)

      // Add fewer connecting base pairs for mobile
      const connectionStep = isMobile ? 10 : 5
      for (let i = 0; i < strand1Points.length; i += connectionStep) {
        const baseGeometry = new THREE.BufferGeometry().setFromPoints([strand1Points[i], strand2Points[i]])
        const baseMaterial = new THREE.LineBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: isMobile ? 0.2 : 0.4,
        })
        const basePair = new THREE.Line(baseGeometry, baseMaterial)
        helixGroup.add(basePair)
      }

      scene.add(helixGroup)
      camera.position.z = isMobile ? 6 : 8
      camera.position.y = isMobile ? 1 : 2
    }

    // Optimized animation loop
    let frameCount = 0
    let lastTime = 0
    const targetFPS = isMobile ? 30 : 60
    const frameInterval = 1000 / targetFPS

    const animate = (currentTime: number) => {
      animationId = requestAnimationFrame(animate)

      // Frame rate limiting
      if (currentTime - lastTime < frameInterval) return
      lastTime = currentTime

      frameCount++

      // Skip frames based on performance settings
      if (frameCount % settings.animationFrameSkip !== 0) return

      // Clear canvas with optimized trail effect
      ctx.fillStyle = `rgba(0, 0, 0, ${settings.trailLength})`
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw ASCII rain with reduced frequency
      ctx.font = `${settings.fontSize}px monospace`
      ctx.textAlign = "center"

      particles.forEach((particle, index) => {
        // Update particle position
        particle.y += particle.speed

        if (particle.y > canvas.height + 20) {
          particle.y = -20
          particle.char = terms[Math.floor(Math.random() * terms.length)]
          particle.opacity = Math.random() * 0.6 + 0.4
        }

        // Simplified gradient for mobile
        if (isMobile) {
          ctx.fillStyle = `rgba(0, 255, 136, ${particle.opacity})`
        } else {
          const gradient = ctx.createLinearGradient(0, particle.y - 50, 0, particle.y + 50)
          gradient.addColorStop(0, `rgba(0, 255, 136, 0)`)
          gradient.addColorStop(0.5, `rgba(0, 255, 136, ${particle.opacity})`)
          gradient.addColorStop(1, `rgba(0, 255, 136, 0)`)
          ctx.fillStyle = gradient
        }

        ctx.fillText(particle.char, particle.x, particle.y)
      })

      // Animate Three.js scene (if enabled)
      if (settings.enableThreeJS && helixGroup && renderer && scene && camera) {
        // Slower rotation for mobile to save battery
        const rotationSpeed = isMobile ? 0.005 : 0.01
        helixGroup.rotation.y += rotationSpeed
        helixGroup.rotation.x = Math.sin(currentTime * 0.0005) * (isMobile ? 0.05 : 0.1)

        renderer.render(scene, camera)
      }
    }

    animate(0)

    // Optimized resize handler with debouncing
    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        if (camera && renderer) {
          camera.aspect = window.innerWidth / window.innerHeight
          camera.updateProjectionMatrix()
          renderer.setSize(window.innerWidth, window.innerHeight)
        }
        resizeCanvas()
      }, 100)
    }
    window.addEventListener("resize", handleResize)

    // Pause animation when tab is not visible (battery optimization)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId)
      } else {
        animate(performance.now())
      }
    }
    document.addEventListener("visibilitychange", handleVisibilityChange)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      clearTimeout(resizeTimeout)
      cancelAnimationFrame(animationId)

      if (threeContainerRef.current && renderer?.domElement) {
        threeContainerRef.current.removeChild(renderer.domElement)
      }

      if (renderer) {
        renderer.dispose()
      }
    }
  }, [isMobile, isLowPerformance])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Three.js DNA Helix - Only render if performance allows */}
      {!isLowPerformance && <div ref={threeContainerRef} className="absolute inset-0" />}

      {/* ASCII Rain Canvas */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 ${isLowPerformance ? "opacity-80" : "opacity-60"}`}
        style={{
          mixBlendMode: isLowPerformance ? "normal" : "screen",
          width: "100%",
          height: "100%",
        }}
      />

      {/* Simplified gradient overlay for mobile */}
      <div
        className={`absolute inset-0 ${
          isMobile
            ? "bg-gradient-to-b from-transparent via-black/10 to-black/40"
            : "bg-gradient-to-b from-transparent via-black/20 to-black/60"
        }`}
      />

      {/* Performance indicator for debugging */}
      {process.env.NODE_ENV === "development" && (
        <div className="absolute top-4 right-4 text-xs text-white/50 bg-black/50 p-2 rounded">
          {isMobile ? "Mobile" : "Desktop"} | {isLowPerformance ? "Low" : "High"} Performance
        </div>
      )}
    </div>
  )
}

export default HeroAnimation
