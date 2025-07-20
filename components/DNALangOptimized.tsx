"use client"

import React, { useState, useEffect, useRef, useMemo, useCallback, lazy, Suspense } from "react"

// ==================== PRODUCTION OPTIMIZATIONS ====================

// Lazy load heavy components for code splitting
const ThreeJSScene = lazy(() => import("./ThreeJSScene"))
const iCRISPREditor = lazy(() => import("./iCRISPREditor"))
const AdvancedDashboard = lazy(() => import("./AdvancedDashboard"))

// Memoized loading component
const LoadingSpinner = React.memo(() => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full"></div>
  </div>
))

// ==================== OPTIMIZED CORE CLASSES ====================

class OptimizedOrganicRefactor {
  private static conversionCache = new Map<string, string>()

  static analyzeAndConvert(source: string, target: "DNA_LangGenesis" | "DNA_Langv2.QUANTUMsynth"): string {
    const cacheKey = `${source.slice(0, 50)}_${target}`

    if (this.conversionCache.has(cacheKey)) {
      return this.conversionCache.get(cacheKey)!
    }

    // Optimized conversion with minimal regex operations
    const conversions = [
      [/import .+ from .+;/g, ""],
      [/function /g, "gene "],
      [/class /g, "organism "],
      [/\/\/.*|\/\*[\s\S]*?\*\//g, ""],
    ]

    let code = source
    conversions.forEach(([pattern, replacement]) => {
      code = code.replace(pattern as RegExp, replacement as string)
    })

    const header =
      target === "DNA_Langv2.QUANTUMsynth" ? "quantum organism ConvertedApp {\n" : "organism ConvertedApp {\n"

    const result = `${header}${code}\n}`
    this.conversionCache.set(cacheKey, result)

    return result
  }

  static clearCache(): void {
    this.conversionCache.clear()
  }
}

class OptimizedGenePull {
  private static genes = new Map([
    [
      "HardwareAuthFactor",
      {
        name: "HardwareAuthFactor",
        version: "1.2.0",
        category: "security",
        code: 'dnagene HardwareAuthFactorGene {\n  purpose: "Hardware FIDO2 auth"\n  fitness: 0.98\n}',
        dependencies: [],
        fitness: 0.98,
      },
    ],
    [
      "LoadBalancer",
      {
        name: "LoadBalancer",
        version: "1.1.0",
        category: "performance",
        code: 'dnagene LoadBalancerGene {\n  purpose: "Intelligent load distribution"\n  fitness: 0.92\n}',
        dependencies: [],
        fitness: 0.92,
      },
    ],
    [
      "DataValidator",
      {
        name: "DataValidator",
        version: "1.0.5",
        category: "data",
        code: 'dnagene DataValidatorGene {\n  purpose: "Schema validation"\n  fitness: 0.95\n}',
        dependencies: [],
        fitness: 0.95,
      },
    ],
  ])

  static pull(geneName: string) {
    return this.genes.get(geneName) || null
  }

  static list() {
    return Array.from(this.genes.values())
  }
}

// ==================== OPTIMIZED ASCII RAIN ====================

const OptimizedASCIIRain = React.memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: false })
    if (!ctx) return

    // Optimized canvas setup
    const dpr = Math.min(window.devicePixelRatio, 2) // Limit DPR for performance
    const rect = canvas.getBoundingClientRect()

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    canvas.style.width = rect.width + "px"
    canvas.style.height = rect.height + "px"

    ctx.scale(dpr, dpr)

    // Reduced character set for performance
    const chars = ["D", "N", "A", "_", "l", "a", "n", "g", "0", "1"]
    const fontSize = 12
    const columns = Math.floor(rect.width / fontSize)
    const drops = new Int16Array(columns).fill(1)

    let frameCount = 0

    const draw = () => {
      frameCount++

      // Reduce frame rate on mobile for performance
      if (window.innerWidth < 768 && frameCount % 2 !== 0) {
        animationFrameRef.current = requestAnimationFrame(draw)
        return
      }

      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, rect.width, rect.height)

      ctx.fillStyle = "#00ff88"
      ctx.font = `${fontSize}px monospace`

      // Optimized loop with reduced calculations
      for (let i = 0; i < drops.length; i += 2) {
        // Skip every other column on mobile
        const char = chars[(frameCount + i) % chars.length]
        ctx.fillText(char, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > rect.height && Math.random() > 0.99) {
          drops[i] = 0
        }
        drops[i]++
      }

      animationFrameRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
      style={{ zIndex: 1 }}
    />
  )
})

// ==================== OPTIMIZED 3D COMPONENTS ====================

const OptimizedThreeJSScene = React.memo(() => {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    // Lazy load Three.js only when needed
    import("three").then(
      ({ Scene, PerspectiveCamera, WebGLRenderer, TetrahedronGeometry, MeshBasicMaterial, Mesh, Color }) => {
        const scene = new Scene()
        const camera = new PerspectiveCamera(75, 1, 0.1, 1000)

        const renderer = new WebGLRenderer({
          alpha: true,
          antialias: window.innerWidth > 768, // Disable antialias on mobile
          powerPreference: "high-performance",
        })

        renderer.setSize(300, 300)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        const geometry = new TetrahedronGeometry(1.5, 0)
        const material = new MeshBasicMaterial({
          color: new Color("#00ff88"),
          transparent: true,
          opacity: 0.7,
          wireframe: true, // Wireframe for better performance
        })

        const tetrahedron = new Mesh(geometry, material)
        scene.add(tetrahedron)
        camera.position.z = 5

        mountRef.current?.appendChild(renderer.domElement)

        let frameCount = 0
        const animate = () => {
          frameCount++

          // Reduce frame rate for performance
          if (frameCount % 2 === 0) {
            tetrahedron.rotation.x += 0.01
            tetrahedron.rotation.y += 0.015
            renderer.render(scene, camera)
          }

          requestAnimationFrame(animate)
        }

        animate()

        return () => {
          renderer.dispose()
          geometry.dispose()
          material.dispose()
        }
      },
    )
  }, [])

  return <div ref={mountRef} className="w-full h-full flex items-center justify-center" />
})

// ==================== MAIN OPTIMIZED COMPONENT ====================

const DNALangOptimized: React.FC = () => {
  const [currentSection, setCurrentSection] = useState("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showAIModal, setShowAIModal] = useState(false)
  const [showConverter, setShowConverter] = useState(false)
  const [showEditor, setShowEditor] = useState(false)

  // Memoized navigation handler
  const handleNavigation = useCallback((section: string) => {
    setCurrentSection(section)
    setMobileMenuOpen(false)

    if (section !== "home") {
      const element = document.getElementById(section)
      element?.scrollIntoView({ behavior: "smooth", block: "start" })
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [])

  // Memoized section data to prevent re-renders
  const sectionData = useMemo(
    () => ({
      features: [
        { icon: "☁️", title: "Google Cloud Native", desc: "GKE, Pub/Sub, Firestore integration" },
        { icon: "🧬", title: "Living Software", desc: "Self-evolving organisms" },
        { icon: "🛡️", title: "Quantum Security", desc: "Built-in immune systems" },
        { icon: "⚡", title: "High Performance", desc: "71% faster execution" },
      ],
      metrics: [
        { value: "99.9%", label: "Uptime" },
        { value: "71%", label: "Performance Gain" },
        { value: "47", label: "Patents" },
        { value: "15-20%", label: "Cost Reduction" },
      ],
    }),
    [],
  )

  // Optimized component structure with minimal re-renders
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Optimized Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold text-emerald-400 flex items-center">
              <span className="text-2xl mr-2">🧬</span>DNA-Lang
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex space-x-6">
              {["home", "philosophy", "developers", "partners", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => handleNavigation(section)}
                  className="hover:text-emerald-400 transition-colors capitalize"
                >
                  {section}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4">
              {["home", "philosophy", "developers", "partners", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => handleNavigation(section)}
                  className="block w-full text-left py-2 hover:text-emerald-400 capitalize"
                >
                  {section}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Optimized Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3Cpattern id="pyramid" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse"%3E%3Cpolygon points="50,10 90,90 10,90" fill="%23001122" opacity="0.3"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width="100" height="100" fill="%23000000"/%3E%3Crect width="100" height="100" fill="url(%23pyramid)"/%3E%3C/svg%3E")',
            filter: "brightness(0.3)",
          }}
        />

        {/* Optimized ASCII Rain */}
        <OptimizedASCIIRain />

        {/* 3D Scene - Lazy loaded */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 2 }}>
          <Suspense fallback={<LoadingSpinner />}>
            <OptimizedThreeJSScene />
          </Suspense>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              DNA-Lang: Living Software
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            71% faster, quantum-enhanced programming.
            <span className="block text-emerald-400 font-semibold mt-2">
              Agile Defense Systems • Google Cloud Platform
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => handleNavigation("developers")}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-bold transition-all"
            >
              🚀 Start Building
            </button>
            <button
              onClick={() => setShowConverter(true)}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg font-bold transition-all"
            >
              🔄 Try Converter
            </button>
          </div>

          {/* Performance Metrics */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {sectionData.metrics.map((metric, index) => (
              <div key={index} className="bg-black/30 rounded-lg p-3 border border-emerald-500/20">
                <div className="text-xl font-bold text-emerald-400">{metric.value}</div>
                <div className="text-xs text-gray-400">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="py-16 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-emerald-400">💡 Revolutionary Computing</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
            <span className="text-emerald-400 font-semibold">Agile Defense Systems, LLC</span> pioneered DNA-Lang to
            transform software from static code into living, evolving organisms. This quantum-enhanced platform delivers
            71% performance improvements through biological programming.
          </p>
          <div className="bg-gray-800/50 rounded-lg p-6 max-w-2xl mx-auto">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>🧬 Genetic Programming</div>
              <div>⚡ Quantum Enhancement</div>
              <div>🛡️ Immune Systems</div>
              <div>☁️ Cloud Native</div>
            </div>
          </div>
        </div>
      </section>

      {/* Developers Section */}
      <section id="developers" className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-400">🚀 For Developers</h2>
            <p className="text-lg text-emerald-400">71% Faster Development • Google Cloud Integration</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sectionData.features.map((feature, index) => (
              <div key={index} className="bg-gray-800/50 p-6 rounded-lg border border-emerald-500/20">
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-bold text-emerald-400 mb-2">{feature.title}</h3>
                <p className="text-gray-300 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => setShowEditor(true)}
              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-bold transition-all"
            >
              🛠️ Launch iCRISPR Editor
            </button>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section id="partners" className="py-16 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-purple-400">🤝 Strategic Partners</h2>
          <div className="max-w-4xl mx-auto bg-gray-800/50 rounded-lg p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-xl font-bold text-emerald-400 mb-4">Google Cloud Partnership</h3>
                <p className="text-gray-300 mb-4">
                  <span className="text-emerald-400 font-semibold">Agile Defense Systems, LLC</span> seeks strategic
                  collaboration through Google Cloud Partner Advantage. Join the 71% performance revolution in
                  autonomous software.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => handleNavigation("contact")}
                    className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 rounded transition-all"
                  >
                    Partner With Us
                  </button>
                  <button
                    onClick={() => window.open("https://cloud.google.com/partners", "_blank")}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded transition-all"
                  >
                    Google Cloud
                  </button>
                </div>
              </div>
              <div className="bg-white rounded-lg p-6">
                <div className="text-blue-600 font-bold text-lg">Google Cloud</div>
                <div className="text-gray-600">Partner Advantage</div>
                <div className="text-sm text-gray-500 mt-2">Strategic Technology Partner</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-emerald-400">🚀 Begin Evolution</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Ready for 71% performance gains? Contact{" "}
            <span className="text-emerald-400 font-semibold">Agile Defense Systems, LLC</span> to deploy living software
            on Google Cloud.
          </p>

          <div className="bg-gray-800/50 rounded-lg p-6 max-w-lg mx-auto mb-8">
            <div className="space-y-2 text-sm">
              <div>📧 devin.davis@dnalang.io</div>
              <div>🌐 https://dnalang.io</div>
              <div>🏢 Agile Defense Systems, LLC</div>
              <div>📍 Jeffersonville, Indiana, USA</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:devin.davis@dnalang.io"
              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-bold transition-all"
            >
              📧 Contact Us
            </a>
            <button
              onClick={() => setShowAIModal(true)}
              className="px-8 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg font-bold transition-all"
            >
              🤖 AI Assistant
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-6">
        <div className="container mx-auto px-4 text-center">
          <div className="text-emerald-400 font-bold mb-2">
            <span className="text-2xl">🧬</span> DNA-Lang
          </div>
          <p className="text-gray-400 text-sm">
            © 2025 Agile Defense Systems, LLC • 71% Performance Revolution • Google Cloud Platform
          </p>
        </div>
      </footer>

      {/* Modals */}
      {showConverter && (
        <Suspense fallback={<LoadingSpinner />}>
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full">
              <h3 className="text-xl font-bold text-emerald-400 mb-4">🔄 Code Converter</h3>
              <p className="text-gray-300 mb-4">Convert legacy code to DNA-Lang organisms (71% faster execution)</p>
              <div className="bg-black rounded p-4 font-mono text-sm mb-4">
                <div className="text-emerald-400">// Input: Traditional code</div>
                <div className="text-gray-300">function authenticate(user) &#123;</div>
                <div className="text-gray-300"> return user.isValid();</div>
                <div className="text-gray-300">&#125;</div>
                <div className="text-purple-400 mt-2">// Output: DNA-Lang organism</div>
                <div className="text-emerald-400">organism AuthService &#123;</div>
                <div className="text-cyan-400"> gene authenticate &#123;</div>
                <div className="text-gray-300"> // 71% optimized execution</div>
                <div className="text-cyan-400"> &#125;</div>
                <div className="text-emerald-400">&#125;</div>
              </div>
              <button
                onClick={() => setShowConverter(false)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </Suspense>
      )}

      {showEditor && (
        <Suspense fallback={<LoadingSpinner />}>
          <div className="fixed inset-0 bg-black/90 z-50">
            <div className="h-full flex flex-col">
              <div className="bg-gray-800 p-4 flex justify-between items-center">
                <h3 className="text-lg font-bold text-emerald-400">✂️ iCRISPR Editor (Production Optimized)</h3>
                <button onClick={() => setShowEditor(false)} className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded">
                  Close
                </button>
              </div>
              <div className="flex-1 bg-gray-900 p-4">
                <textarea
                  className="w-full h-full bg-black text-emerald-400 p-4 font-mono text-sm rounded"
                  placeholder="// 71% optimized DNA-Lang development environment
organism OptimizedService {
  purpose: '71% faster execution'
  
  gene QuantumProcessor {
    implementation {
      function process() {
        // Quantum-enhanced processing
        return optimize_quantum();
      }
    }
  }
  
  workflow {
    on Request {
      act QuantumProcessor.process()
    }
  }
}"
                />
              </div>
            </div>
          </div>
        </Suspense>
      )}

      {showAIModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-6 max-w-lg w-full">
            <h3 className="text-lg font-bold text-emerald-400 mb-4">🤖 DNA-Lang AI (71% Smarter)</h3>
            <p className="text-gray-300 mb-4">Quantum-enhanced AI assistant for living software development</p>
            <div className="bg-black/50 rounded p-3 mb-4 text-sm">
              <strong className="text-emerald-400">AI:</strong> DNA-Lang achieves 71% performance improvements through
              quantum-enhanced genetic algorithms, biological programming paradigms, and Google Cloud optimization.
              Organisms evolve automatically for maximum efficiency.
            </div>
            <button
              onClick={() => setShowAIModal(false)}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setShowAIModal(true)}
        className="fixed bottom-6 right-6 bg-emerald-600 hover:bg-emerald-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all z-40"
      >
        <span className="text-xl">✨</span>
      </button>
    </div>
  )
}

export default DNALangOptimized
