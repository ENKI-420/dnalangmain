"use client"

import type React from "react"
import { useRef, useEffect } from "react"
import * as THREE from "three"

const HeroAnimation: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    const currentMount = mountRef.current

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 30

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x030014, 1)
    currentMount.appendChild(renderer.domElement)

    // --- Double Helix with Enhanced Geometry ---
    const helixPoints = []
    const helixPoints2 = []

    for (let i = 0; i < 200; i++) {
      const angle = i / 15
      const y = i - 100
      const radius = 8

      // First helix strand
      helixPoints.push(new THREE.Vector3(Math.sin(angle) * radius, y * 0.3, Math.cos(angle) * radius))

      // Second helix strand (offset)
      helixPoints2.push(
        new THREE.Vector3(Math.sin(angle + Math.PI) * radius, y * 0.3, Math.cos(angle + Math.PI) * radius),
      )
    }

    const curve1 = new THREE.CatmullRomCurve3(helixPoints)
    const curve2 = new THREE.CatmullRomCurve3(helixPoints2)

    const geometry1 = new THREE.TubeGeometry(curve1, 200, 0.3, 8, false)
    const geometry2 = new THREE.TubeGeometry(curve2, 200, 0.3, 8, false)

    // Enhanced materials with glow effect
    const material1 = new THREE.MeshBasicMaterial({
      color: 0x4285f4,
      transparent: true,
      opacity: 0.8,
    })
    const material2 = new THREE.MeshBasicMaterial({
      color: 0x0f9d58,
      transparent: true,
      opacity: 0.8,
    })

    const helix1 = new THREE.Mesh(geometry1, material1)
    const helix2 = new THREE.Mesh(geometry2, material2)

    const helixGroup = new THREE.Group()
    helixGroup.add(helix1)
    helixGroup.add(helix2)
    scene.add(helixGroup)

    // --- Blended ASCII Rain with DNA/Defense Terms ---
    const asciiTerms = [
      // DNA-Lang terms
      "organism",
      "gene",
      "mutate",
      "evolve",
      "fitness",
      "sense",
      "act",
      "q_superposition",
      "neural_net",
      "state",
      "DNA",
      "CRISPR",
      "genome",
      // Defense/Medical terms
      "SPECTRA",
      "quantum",
      "defense",
      "medical",
      "tactical",
      "biotech",
      "warfare",
      "healing",
      "precision",
      "targeting",
      "immunity",
      "shield",
    ]

    const particlesCount = window.innerWidth < 768 ? 800 : 1500 // Mobile optimization
    const particleSystems: THREE.Points[] = []

    // Create canvas for text textures
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")!
    canvas.width = 128
    canvas.height = 128

    // Create particle systems for each term
    asciiTerms.forEach((term, termIndex) => {
      // Create texture for this term
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.font = "bold 24px 'Courier New', monospace"
      ctx.fillStyle = `hsl(${(termIndex * 30) % 360}, 70%, 60%)`
      ctx.textAlign = "center"
      ctx.fillText(term.substring(0, 8), canvas.width / 2, canvas.height / 2)

      const texture = new THREE.CanvasTexture(canvas)

      const particleGeometry = new THREE.BufferGeometry()
      const positions = new Float32Array((particlesCount * 3) / asciiTerms.length)
      const velocities = new Float32Array(particlesCount / asciiTerms.length)

      for (let i = 0; i < positions.length; i += 3) {
        positions[i] = (Math.random() - 0.5) * 120 // x
        positions[i + 1] = Math.random() * 100 + 50 // y (start above screen)
        positions[i + 2] = (Math.random() - 0.5) * 60 // z
        velocities[i / 3] = 0.1 + Math.random() * 0.3 // fall speed
      }

      particleGeometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3))
      ;(particleGeometry as any).velocities = velocities

      const particleMaterial = new THREE.PointsMaterial({
        size: window.innerWidth < 768 ? 1.5 : 2.5, // Mobile optimization
        map: texture,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        transparent: true,
        opacity: 0.7,
      })

      const points = new THREE.Points(particleGeometry, particleMaterial)
      scene.add(points)
      particleSystems.push(points)
    })

    // --- Connecting Lines Between Helix Strands ---
    const connectionGeometry = new THREE.BufferGeometry()
    const connectionPositions = []

    for (let i = 0; i < helixPoints.length; i += 10) {
      connectionPositions.push(
        helixPoints[i].x,
        helixPoints[i].y,
        helixPoints[i].z,
        helixPoints2[i].x,
        helixPoints2[i].y,
        helixPoints2[i].z,
      )
    }

    connectionGeometry.setAttribute("position", new THREE.Float32BufferAttribute(connectionPositions, 3))
    const connectionMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.3,
    })
    const connections = new THREE.LineSegments(connectionGeometry, connectionMaterial)
    helixGroup.add(connections)

    // Animation loop with mobile optimization
    let frameCount = 0
    const animate = () => {
      requestAnimationFrame(animate)
      frameCount++

      // Reduce animation frequency on mobile
      const skipFrames = window.innerWidth < 768 ? 2 : 1
      if (frameCount % skipFrames !== 0) return

      // Rotate helix
      helixGroup.rotation.y += 0.003
      helixGroup.rotation.x += 0.001

      // Animate ASCII rain
      particleSystems.forEach((system) => {
        const positions = system.geometry.attributes.position.array as Float32Array
        const velocities = (system.geometry as any).velocities as Float32Array

        for (let i = 0; i < positions.length; i += 3) {
          positions[i + 1] -= velocities[i / 3] // Move down

          // Reset particles that fall below screen
          if (positions[i + 1] < -60) {
            positions[i + 1] = 60 + Math.random() * 20
            positions[i] = (Math.random() - 0.5) * 120
            positions[i + 2] = (Math.random() - 0.5) * 60
          }
        }
        system.geometry.attributes.position.needsUpdate = true
      })

      // Pulse effect for connections
      connections.material.opacity = 0.2 + Math.sin(frameCount * 0.02) * 0.1

      renderer.render(scene, camera)
    }
    animate()

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      if (currentMount && currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement)
      }

      // Dispose of Three.js objects
      geometry1.dispose()
      geometry2.dispose()
      material1.dispose()
      material2.dispose()
      connectionGeometry.dispose()
      connectionMaterial.dispose()

      particleSystems.forEach((system) => {
        system.geometry.dispose()
        ;(system.material as THREE.Material).dispose()
      })
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        background: "linear-gradient(135deg, #030014 0%, #0a0a2e 50%, #16213e 100%)",
      }}
    />
  )
}

export default HeroAnimation
