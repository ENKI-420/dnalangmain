// components/ui/HeroAnimation.tsx
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
    currentMount.appendChild(renderer.domElement)

    // --- Double Helix ---
    const curve = new THREE.CatmullRomCurve3(
      Array.from({ length: 100 }, (_, i) => {
        const angle = i / 10
        return new THREE.Vector3(Math.sin(angle) * 10, i - 50, Math.cos(angle) * 10)
      }),
    )
    const geometry = new THREE.TubeGeometry(curve, 100, 0.4, 8, false)

    const material1 = new THREE.MeshBasicMaterial({ color: 0x4285f4, wireframe: true })
    const helix1 = new THREE.Mesh(geometry, material1)

    scene.add(helix1)

    const material2 = new THREE.MeshBasicMaterial({ color: 0x0f9d58, wireframe: true })
    const helix2 = new THREE.Mesh(geometry, material2)
    helix2.rotation.y = Math.PI // Rotate the second strand
    scene.add(helix2)

    const helixGroup = new THREE.Group()
    helixGroup.add(helix1)
    helixGroup.add(helix2)
    scene.add(helixGroup)

    // --- Raining ASCII ---
    const dnaSyntax = [
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
    ]
    const particlesCount = 1500
    const positions = new Float32Array(particlesCount * 3)
    const particleColors = new Float32Array(particlesCount * 3)
    const particleVelocities = new Float32Array(particlesCount)

    const colorPalette = [
      new THREE.Color(0x4285f4),
      new THREE.Color(0xdb4437),
      new THREE.Color(0xf4b400),
      new THREE.Color(0x0f9d58),
    ]

    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")!
    canvas.width = 64
    canvas.height = 64
    ctx.font = "48px Manrope"
    ctx.fillStyle = "#ffffff"

    const particleTextures = dnaSyntax.map((word) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillText(word.charAt(0), 16, 48) // Using first char for simplicity
      return new THREE.CanvasTexture(canvas)
    })

    const particleMaterials = particleTextures.map(
      (texture) =>
        new THREE.PointsMaterial({
          size: 0.8,
          map: texture,
          blending: THREE.AdditiveBlending,
          depthTest: false,
          transparent: true,
          opacity: 0.7,
        }),
    )

    const particleSystems = particleMaterials.map((material) => {
      const geometry = new THREE.BufferGeometry()
      const vertices: number[] = []
      const velocities: number[] = []

      for (let i = 0; i < particlesCount / particleMaterials.length; i++) {
        vertices.push((Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100)
        velocities.push(0.05 + Math.random() * 0.1)
      }
      geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3))
      ;(geometry as any).velocities = new Float32Array(velocities)

      const points = new THREE.Points(geometry, material)
      scene.add(points)
      return points
    })

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      helixGroup.rotation.y += 0.002
      helixGroup.rotation.x += 0.0005

      particleSystems.forEach((system) => {
        const positions = system.geometry.attributes.position.array as Float32Array
        const velocities = (system.geometry as any).velocities as Float32Array

        for (let i = 0; i < positions.length; i += 3) {
          positions[i + 1] -= velocities[i / 3] // Move down
          if (positions[i + 1] < -50) {
            positions[i + 1] = 50 // Reset to top
          }
        }
        system.geometry.attributes.position.needsUpdate = true
      })

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
      if (currentMount) {
        currentMount.removeChild(renderer.domElement)
      }
      // Dispose of Three.js objects
      geometry.dispose()
      material1.dispose()
      material2.dispose()
      particleSystems.forEach((system) => {
        system.geometry.dispose()
        ;(system.material as THREE.Material).dispose()
      })
      particleTextures.forEach((t) => t.dispose())
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1, background: "#030014" }}
    />
  )
}

export default HeroAnimation
