"use client"

import { useRef, useEffect, useState, useCallback } from "react"

interface Particle {
  x: number
  y: number
  z: number
  speed?: number
  text: string
  color: string
  fontSize?: number
  targetX?: number
  targetY?: number
  targetZ?: number
  vx?: number
  vy?: number
  vz?: number
  isCore?: boolean
}

interface RainParticle {
  x: number
  y: number
  z: number
  speed: number
  text: string
  color: string
  fontSize: number
  targetX: number
  targetY: number
}

interface FabricPoint {
  x: number
  y: number
  ox: number
  oy: number
  vx: number
  vy: number
}

const snippets = [
  "dnaorganism",
  "dnagene",
  "dnaevolution",
  "fitness",
  "immune_response",
  "sense",
  "act",
  "Genesis Engine",
  "iCRISPR",
  "Converter",
  "Gene-Pull",
  "Pods",
  "qauth_signature",
]
const ecosystemColors: { [key: string]: string } = {
  "Genesis Engine": "#DB4437", // Red
  iCRISPR: "#0F9D58", // Green
  Converter: "#F4B400", // Yellow
  "Gene-Pull": "#4285F4", // Blue
  Pods: "#4285F4", // Blue
  default: "#4285F4", // Blue
}

const getEcosystemColor = (text: string) => ecosystemColors[text] || ecosystemColors["default"]

export default function Background() {
  const splashCanvasRef = useRef<HTMLCanvasElement>(null)
  const remanantCanvasRef = useRef<HTMLCanvasElement>(null)
  const [screenWidth, setScreenWidth] = useState(0)
  const [screenHeight, setScreenHeight] = useState(0)
  const [animationState, setAnimationState] = useState<"raining" | "gathering" | "morphing" | "helix">("raining")
  const frameRef = useRef(0)
  const mouseRef = useRef({ x: 0, y: 0, radius: 150 })

  const rainParticlesRef = useRef<RainParticle[]>([])
  const helixParticlesRef = useRef<Particle[]>([])
  const fabricPointsRef = useRef<FabricPoint[]>([])

  const fabricCols = 35
  const fabricRows = 25

  const initFabric = useCallback(() => {
    fabricPointsRef.current = []
    const colSize = screenWidth / fabricCols
    const rowSize = screenHeight / fabricRows
    for (let y = 0; y <= fabricRows; y++) {
      for (let x = 0; x <= fabricCols; x++) {
        fabricPointsRef.current.push({
          x: x * colSize,
          y: y * rowSize,
          ox: x * colSize,
          oy: y * rowSize,
          vx: 0,
          vy: 0,
        })
      }
    }
  }, [screenWidth, screenHeight])

  const drawFabric = useCallback(
    (ctx: CanvasRenderingContext2D, baseAlpha: number) => {
      ctx.strokeStyle = `rgba(66, 133, 244, ${baseAlpha})`
      ctx.lineWidth = 1
      ctx.beginPath()
      fabricPointsRef.current.forEach((p) => {
        const dx = p.x - mouseRef.current.x
        const dy = p.y - mouseRef.current.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < mouseRef.current.radius) {
          const force = (mouseRef.current.radius - dist) / mouseRef.current.radius
          p.vx += (dx / dist) * force * 2
          p.vy += (dy / dist) * force * 2
        }
        p.vx *= 0.95
        p.vy *= 0.95
        p.x += p.vx
        p.y += p.vy
        p.x += (p.ox - p.x) * 0.05
        p.y += (p.oy - p.y) * 0.05

        const col = (p.x / screenWidth) * fabricCols
        const row = (p.y / screenHeight) * fabricRows

        // Draw connections
        if (col > 0) {
          const prevColPoint = fabricPointsRef.current.find(
            (fp) => Math.abs(fp.ox - (p.ox - screenWidth / fabricCols)) < 1 && Math.abs(fp.oy - p.oy) < 1,
          )
          if (prevColPoint) {
            ctx.moveTo(prevColPoint.x, prevColPoint.y)
            ctx.lineTo(p.x, p.y)
          }
        }
        if (row > 0) {
          const prevRowPoint = fabricPointsRef.current.find(
            (fp) => Math.abs(fp.ox - p.ox) < 1 && Math.abs(fp.oy - (p.oy - screenHeight / fabricRows)) < 1,
          )
          if (prevRowPoint) {
            ctx.moveTo(prevRowPoint.x, prevRowPoint.y)
            ctx.lineTo(p.x, p.y)
          }
        }
      })
      ctx.stroke()
    },
    [screenWidth, screenHeight],
  )

  const initRainingParticles = useCallback(() => {
    rainParticlesRef.current = []
    for (let i = 0; i < 70; i++) {
      rainParticlesRef.current.push({
        x: Math.random() * screenWidth,
        y: Math.random() * -screenHeight,
        z: 0,
        speed: 4 + Math.random() * 5,
        text: snippets[Math.floor(Math.random() * snippets.length)],
        color: getEcosystemColor(snippets[Math.floor(Math.random() * snippets.length)]),
        fontSize: 12 + Math.random() * 4,
        targetX: screenWidth / 2,
        targetY: screenHeight / 2,
      })
    }
  }, [screenWidth, screenHeight])

  const initHelixParticles = useCallback(() => {
    helixParticlesRef.current = []
    const numHelixParticles = 200
    const radius = Math.min(screenWidth, screenHeight) * 0.18
    const turns = 4
    for (let i = 0; i < numHelixParticles; i++) {
      const angle = (i / numHelixParticles) * Math.PI * 2 * turns
      const y = (i / numHelixParticles) * screenHeight * 1.2 - screenHeight * 0.6
      const x1 = Math.cos(angle) * radius
      const z1 = Math.sin(angle) * radius
      const text = snippets[i % snippets.length]
      helixParticlesRef.current.push({
        x: 0,
        y: 0,
        z: 0,
        targetX: x1,
        targetY: y,
        targetZ: z1,
        vx: 0,
        vy: 0,
        vz: 0,
        text: text,
        color: getEcosystemColor(text),
        isCore: !!ecosystemColors[text] && ecosystemColors[text] !== ecosystemColors["default"],
        fontSize: !!ecosystemColors[text] && ecosystemColors[text] !== ecosystemColors["default"] ? 16 : 12,
      })
    }
  }, [screenWidth, screenHeight])

  const animateSplash = useCallback(() => {
    const canvas = splashCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, screenWidth, screenHeight)
    frameRef.current++
    drawFabric(ctx, 0.2)

    if (animationState === "raining" || animationState === "gathering") {
      rainParticlesRef.current.forEach((p) => {
        if (animationState === "raining") {
          p.y += p.speed
          if (p.y > screenHeight) {
            p.y = -20
            p.x = Math.random() * screenWidth
          }
        } else {
          // gathering
          p.x += (p.targetX - p.x) * 0.03
          p.y += (p.targetY - p.y) * 0.03
          p.z += (0 - p.z) * 0.03
        }
        ctx.shadowColor = p.color
        ctx.shadowBlur = 8
        ctx.fillStyle = p.color
        ctx.font = `bold ${p.fontSize}px Manrope`
        ctx.fillText(p.text, p.x, p.y)
        ctx.shadowBlur = 0
      })
    } else if (animationState === "morphing" || animationState === "helix") {
      const rotation = frameRef.current * 0.003
      helixParticlesRef.current.forEach((p) => {
        if (animationState === "morphing") {
          p.x += (p.targetX - p.x) * 0.05
          p.y += (p.targetY - p.y) * 0.05
          p.z += (p.targetZ - p.z) * 0.05
        } else {
          // helix
          const dx = p.x - (mouseRef.current.x - screenWidth / 2)
          const dy = p.y - (mouseRef.current.y - screenHeight / 2)
          const dz = p.z
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
          if (dist < mouseRef.current.radius) {
            const force = (mouseRef.current.radius - dist) / mouseRef.current.radius
            p.vx += (dx / dist) * force * 0.5
            p.vy += (dy / dist) * force * 0.5
            p.vz += (dz / dist) * force * 0.5
          }
          p.vx *= 0.95
          p.vy *= 0.95
          p.vz *= 0.95
          p.x += p.vx
          p.y += p.vy
          p.z += p.vz
          p.x += (p.targetX - p.x) * 0.02
          p.y += (p.targetY - p.y) * 0.02
          p.z += (p.targetZ - p.z) * 0.02
        }

        const perspective = screenWidth * 0.8
        const r_x = p.x * Math.cos(rotation) - p.z * Math.sin(rotation)
        const r_z = p.x * Math.sin(rotation) + p.z * Math.cos(rotation) + 350
        const scale = perspective / r_z
        const finalX = r_x * scale + screenWidth / 2
        const finalY = p.y * scale + screenHeight / 2
        const finalAlpha = Math.max(0, Math.min(1, scale * 1.2))
        const finalFontSize = Math.max(1, p.fontSize * scale)

        if (finalX < 0 || finalX > screenWidth || finalY < 0 || finalY > screenHeight) return

        ctx.shadowColor = p.color
        ctx.shadowBlur = p.isCore ? 15 : 8
        const hexToRgb = (hex: string) => {
          const r = Number.parseInt(hex.slice(1, 3), 16)
          const g = Number.parseInt(hex.slice(3, 5), 16)
          const b = Number.parseInt(hex.slice(5, 7), 16)
          return `${r}, ${g}, ${b}`
        }
        ctx.fillStyle = `rgba(${hexToRgb(p.color)}, ${finalAlpha})`
        ctx.font = `bold ${finalFontSize}px Manrope`
        ctx.fillText(p.text, finalX, finalY)
        ctx.shadowBlur = 0

        const fabricX = Math.round((finalX / screenWidth) * fabricCols)
        const fabricY = Math.round((finalY / screenHeight) * fabricRows)
        const fabricIndex = fabricX + fabricY * (fabricCols + 1)
        const point = fabricPointsRef.current[fabricIndex]
        if (point && r_z < 350) {
          const force = (350 - r_z) / 350
          point.vy += force * 0.5
        }
      })
    }

    if (canvas.style.opacity !== "0") {
      requestAnimationFrame(animateSplash)
    }
  }, [screenWidth, screenHeight, animationState, drawFabric])

  const animateRemanant = useCallback(() => {
    const canvas = remanantCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, screenWidth, screenHeight)
    const time = Date.now() * 0.0001
    fabricPointsRef.current.forEach((p) => {
      p.oy = p.oy + Math.sin(p.ox * 0.01 + time) * 0.5
    })
    drawFabric(ctx, 1.0)
    requestAnimationFrame(animateRemanant)
  }, [screenWidth, screenHeight, drawFabric])

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      setScreenWidth(width)
      setScreenHeight(height)
      if (splashCanvasRef.current) {
        splashCanvasRef.current.width = width
        splashCanvasRef.current.height = height
      }
      if (remanantCanvasRef.current) {
        remanantCanvasRef.current.width = width
        remanantCanvasRef.current.height = height
      }
      initFabric()
      initRainingParticles()
      initHelixParticles()
      mouseRef.current = { x: width / 2, y: height / 2, radius: 150 }
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }

    handleResize() // Initial setup
    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)

    animateSplash()

    const splashScreenElement = document.getElementById("splash-screen")
    const mainContentElement = document.getElementById("main-content")

    const timeouts = [
      setTimeout(() => setAnimationState("gathering"), 2000),
      setTimeout(() => {
        rainParticlesRef.current = []
        initHelixParticles()
        setAnimationState("morphing")
      }, 3000),
      setTimeout(() => setAnimationState("helix"), 4500),
      setTimeout(() => {
        if (splashScreenElement) splashScreenElement.style.opacity = "0"
        if (mainContentElement) mainContentElement.style.opacity = "1"
        animateRemanant()
        setTimeout(() => {
          if (splashScreenElement) splashScreenElement.style.display = "none"
        }, 1500)
      }, 6500),
    ]

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      timeouts.forEach(clearTimeout)
    }
  }, [animateSplash, animateRemanant, initFabric, initRainingParticles, initHelixParticles])

  return (
    <>
      <div
        id="splash-screen"
        className="fixed top-0 left-0 w-full h-full bg-dna-bg z-50 transition-opacity duration-1500 ease-out cursor-none"
      >
        <canvas id="splash-canvas" ref={splashCanvasRef} className="block w-full h-full"></canvas>
      </div>
      <canvas
        id="remanant-canvas"
        ref={remanantCanvasRef}
        className="fixed top-0 left-0 w-full h-full z-[-1] opacity-7"
      ></canvas>
    </>
  )
}
