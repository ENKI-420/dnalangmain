"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"

interface DeviceInfo {
  isMobile: boolean
  isLowPerformance: boolean
  devicePixelRatio: number
  cores: number
}

interface Particle {
  x: number
  y: number
  speed: number
  term: string
  opacity: number
  active: boolean
}

export default function HeroAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const threeCanvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const particlesRef = useRef<Particle[]>([])
  const sceneRef = useRef<THREE.Scene>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const helixRef = useRef<THREE.Group>()
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isLowPerformance: false,
    devicePixelRatio: 1,
    cores: 4,
  })

  // Detect device capabilities
  useEffect(() => {
    const detectDevice = () => {
      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        window.innerWidth < 768
      const cores = navigator.hardwareConcurrency || 4
      const devicePixelRatio = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2)
      const isLowPerformance = isMobile && (cores < 4 || window.innerWidth < 480)

      setDeviceInfo({
        isMobile,
        isLowPerformance,
        devicePixelRatio,
        cores,
      })
    }

    detectDevice()
    window.addEventListener("resize", detectDevice)
    return () => window.removeEventListener("resize", detectDevice)
  }, [])

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Adaptive settings based on device
    const settings = {
      particleCount: deviceInfo.isLowPerformance ? 20 : deviceInfo.isMobile ? 40 : 80,
      targetFPS: deviceInfo.isMobile ? 30 : 60,
      frameSkip: deviceInfo.isLowPerformance ? 3 : deviceInfo.isMobile ? 2 : 1,
      trailOpacity: deviceInfo.isMobile ? 0.2 : 0.05,
      fontSize: deviceInfo.isMobile ? 12 : 14,
    }

    // DNA/Defense terms - reduced for low performance
    const terms = deviceInfo.isLowPerformance
      ? ["DNA", "CRISPR", "QUANTUM", "SPECTRA", "DEFENSE"]
      : [
          "ATCG",
          "CRISPR",
          "DNA-LANG",
          "QUANTUM",
          "HELIX",
          "GENE",
          "MUTATION",
          "SPECTRA",
          "DEFENSE",
          "TACTICAL",
          "PLASMA",
          "NEURAL",
          "ORGANISM",
          "EVOLUTION",
          "CONSCIOUSNESS",
          "TETRAHEDRAL",
          "SCALAR",
          "PROPULSION",
        ]

    let frameCount = 0
    let lastTime = 0
    const frameInterval = 1000 / settings.targetFPS

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * deviceInfo.devicePixelRatio
      canvas.height = rect.height * deviceInfo.devicePixelRatio
      ctx.scale(deviceInfo.devicePixelRatio, deviceInfo.devicePixelRatio)
      canvas.style.width = rect.width + "px"
      canvas.style.height = rect.height + "px"
    }

    // Debounced resize
    let resizeTimeout: NodeJS.Timeout
    const debouncedResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(resizeCanvas, 100)
    }

    resizeCanvas()
    window.addEventListener("resize", debouncedResize)

    // Initialize particles with object pooling
    const initializeParticles = () => {
      particlesRef.current = []
      for (let i = 0; i < settings.particleCount; i++) {
        particlesRef.current.push({
          x: (Math.random() * canvas.width) / deviceInfo.devicePixelRatio,
          y: Math.random() * -500,
          speed: deviceInfo.isMobile ? 1 + Math.random() * 2 : 2 + Math.random() * 3,
          term: terms[Math.floor(Math.random() * terms.length)],
          opacity: 0.3 + Math.random() * 0.7,
          active: true,
        })
      }
    }

    initializeParticles()

    const animate = (currentTime: number) => {
      if (currentTime - lastTime < frameInterval) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      frameCount++
      if (frameCount % settings.frameSkip !== 0) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      lastTime = currentTime

      // Check if tab is visible (battery optimization)
      if (document.hidden) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      const rect = canvas.getBoundingClientRect()

      // Trail effect with adaptive opacity
      ctx.fillStyle = `rgba(0, 0, 0, ${settings.trailOpacity})`
      ctx.fillRect(0, 0, rect.width, rect.height)

      // Update and render particles
      ctx.font = `${settings.fontSize}px 'Courier New', monospace`

      particlesRef.current.forEach((particle) => {
        if (!particle.active) return

        // Update position
        particle.y += particle.speed

        // Reset particle when it goes off screen (object reuse)
        if (particle.y > rect.height + 50) {
          particle.y = -50
          particle.x = Math.random() * rect.width
          particle.term = terms[Math.floor(Math.random() * terms.length)]
          particle.opacity = 0.3 + Math.random() * 0.7
        }

        // Render particle
        ctx.fillStyle = deviceInfo.isMobile
          ? `rgba(0, 255, 136, ${particle.opacity})` // Solid color for mobile
          : `rgba(0, 255, 136, ${particle.opacity})`
        ctx.fillText(particle.term, particle.x, particle.y)
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener("resize", debouncedResize)
      clearTimeout(resizeTimeout)
    }
  }, [deviceInfo])

  // 3D DNA Helix with adaptive complexity
  useEffect(() => {
    if (!threeCanvasRef.current || deviceInfo.isLowPerformance) return

    const canvas = threeCanvasRef.current
    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

    // Use low-power GPU preference on mobile
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: !deviceInfo.isMobile,
      powerPreference: deviceInfo.isMobile ? "low-power" : "high-performance",
    })
    rendererRef.current = renderer

    const resizeRenderer = () => {
      const rect = canvas.getBoundingClientRect()
      camera.aspect = rect.width / rect.height
      camera.updateProjectionMatrix()
      renderer.setSize(rect.width, rect.height, false)
      renderer.setPixelRatio(deviceInfo.devicePixelRatio)
    }

    resizeRenderer()

    // Create DNA helix with adaptive detail
    const helixGroup = new THREE.Group()
    helixRef.current = helixGroup
    scene.add(helixGroup)

    const helixPoints = deviceInfo.isMobile ? 20 : 40
    const radius = 2
    const height = 8

    // Create helix strands with reduced geometry on mobile
    const strandGeometry = new THREE.BufferGeometry()
    const positions = []
    const colors = []

    for (let i = 0; i < helixPoints; i++) {
      const t = (i / helixPoints) * Math.PI * 4
      const y = (i / helixPoints) * height - height / 2

      // Strand 1
      positions.push(Math.cos(t) * radius, y, Math.sin(t) * radius)
      colors.push(0, 1, 0.5) // Cyan

      // Strand 2
      positions.push(Math.cos(t + Math.PI) * radius, y, Math.sin(t + Math.PI) * radius)
      colors.push(1, 0.4, 0) // Orange
    }

    strandGeometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3))
    strandGeometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3))

    const strandMaterial = new THREE.PointsMaterial({
      size: deviceInfo.isMobile ? 0.1 : 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    })
    const strands = new THREE.Points(strandGeometry, strandMaterial)
    helixGroup.add(strands)

    // Add connecting base pairs (reduced on mobile)
    const connectionInterval = deviceInfo.isMobile ? 10 : 5
    for (let i = 0; i < helixPoints; i += connectionInterval) {
      const t = (i / helixPoints) * Math.PI * 4
      const y = (i / helixPoints) * height - height / 2

      const connectionGeometry = new THREE.BufferGeometry()
      const connectionPositions = [
        Math.cos(t) * radius,
        y,
        Math.sin(t) * radius,
        Math.cos(t + Math.PI) * radius,
        y,
        Math.sin(t + Math.PI) * radius,
      ]
      connectionGeometry.setAttribute("position", new THREE.Float32BufferAttribute(connectionPositions, 3))

      const connectionMaterial = new THREE.LineBasicMaterial({
        color: 0x00ff88,
        transparent: true,
        opacity: 0.3,
      })
      const connection = new THREE.Line(connectionGeometry, connectionMaterial)
      helixGroup.add(connection)
    }

    camera.position.z = 8
    camera.position.y = 2

    const rotationSpeed = deviceInfo.isMobile ? 0.005 : 0.01
    let frameCount = 0
    const targetFPS = deviceInfo.isMobile ? 30 : 60
    const frameSkip = deviceInfo.isMobile ? 2 : 1

    const animate3D = () => {
      frameCount++
      if (frameCount % frameSkip !== 0) {
        animationRef.current = requestAnimationFrame(animate3D)
        return
      }

      // Pause animation when tab is hidden
      if (document.hidden) {
        animationRef.current = requestAnimationFrame(animate3D)
        return
      }

      if (helixRef.current) {
        helixRef.current.rotation.y += rotationSpeed
        helixRef.current.rotation.x = Math.sin(Date.now() * 0.001) * 0.1
      }

      renderer.render(scene, camera)
      animationRef.current = requestAnimationFrame(animate3D)
    }

    animate3D()

    // Debounced resize for 3D
    let resizeTimeout: NodeJS.Timeout
    const debouncedResize3D = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(resizeRenderer, 100)
    }

    window.addEventListener("resize", debouncedResize3D)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener("resize", debouncedResize3D)
      clearTimeout(resizeTimeout)

      // Proper Three.js cleanup
      scene.clear()
      renderer.dispose()
      strandGeometry.dispose()
      strandMaterial.dispose()
    }
  }, [deviceInfo])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* ASCII Rain Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{
          mixBlendMode: deviceInfo.isLowPerformance ? "normal" : "screen",
          opacity: deviceInfo.isMobile ? 0.6 : 0.8,
        }}
      />

      {/* 3D DNA Helix Layer - only on capable devices */}
      {!deviceInfo.isLowPerformance && (
        <canvas
          ref={threeCanvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            mixBlendMode: "screen",
            opacity: deviceInfo.isMobile ? 0.4 : 0.6,
          }}
        />
      )}

      {/* Performance indicator (development only) */}
      {process.env.NODE_ENV === "development" && (
        <div className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded text-xs">
          <div>Device: {deviceInfo.isMobile ? "Mobile" : "Desktop"}</div>
          <div>Performance: {deviceInfo.isLowPerformance ? "Low" : "Normal"}</div>
          <div>Cores: {deviceInfo.cores}</div>
          <div>DPR: {deviceInfo.devicePixelRatio}</div>
        </div>
      )}
    </div>
  )
}
