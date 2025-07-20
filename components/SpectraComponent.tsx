"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, ChevronUp, Phone, Mail, Menu, X } from "lucide-react"

interface ApplicationCard {
  id: string
  icon: string
  title: string
  description: string
  details: string
  color: string
}

export default function SpectraComponent() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("introduction")
  const plotRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  const applications: ApplicationCard[] = [
    {
      id: "materials",
      icon: "🛡️",
      title: "Next-Gen Materials",
      description: "Quantum-coated ceramics resistant to extreme heat and radiation, and metamaterial energy shields.",
      details:
        "Advanced metamaterials engineered at the quantum level provide unprecedented protection against electromagnetic threats, kinetic impacts, and radiation exposure. These materials utilize scalar wave deflection and quantum field manipulation to create adaptive defense systems that respond to threat characteristics in real-time.",
      color: "blue",
    },
    {
      id: "propulsion",
      icon: "🚀",
      title: "Quantum Gravity Propulsion",
      description: "Harnessing space-time distortions to create thrust without propellant for interstellar travel.",
      details:
        "Revolutionary propulsion technology that manipulates the fabric of space-time itself, eliminating the need for traditional propellant. By creating controlled gravitational anomalies and metric distortions, vehicles can achieve faster-than-light travel while maintaining structural integrity through quantum field stabilization.",
      color: "green",
    },
    {
      id: "weapons",
      icon: "💥",
      title: "Directed Energy Weapons",
      description:
        "Quantum-locked resonances and scalar impulse waves for precision energy transfer over vast distances.",
      details:
        "Next-generation directed energy systems utilizing quantum entanglement for instantaneous target acquisition and energy delivery. These weapons can penetrate conventional defenses through dimensional phase shifting and deliver precise energy bursts with surgical accuracy across interplanetary distances.",
      color: "red",
    },
    {
      id: "energy",
      icon: "⚡",
      title: "Tactical Energy Resilience",
      description: "Mobile microgrids and modular plasma-waste reactors for self-sustaining battlefield power.",
      details:
        "Autonomous energy systems that convert battlefield waste and environmental matter into usable power through tetrahedral plasma dynamics. These systems provide unlimited operational endurance and can power entire military installations while remaining completely self-sufficient and environmentally neutral.",
      color: "yellow",
    },
    {
      id: "ai",
      icon: "🤖",
      title: "AI-Driven Reconnaissance",
      description: "Autonomous drone swarms with quantum target locking and neural network control systems.",
      details:
        "Swarm intelligence systems powered by quantum neural networks enable unprecedented reconnaissance capabilities. These autonomous units can phase-shift through solid matter, maintain quantum-encrypted communications, and process battlefield intelligence at superhuman speeds while remaining undetectable to conventional sensors.",
      color: "indigo",
    },
    {
      id: "temporal",
      icon: "🌌",
      title: "Temporal Manipulation",
      description: "Metric engineering for time manipulation, connecting to wormhole and warp drive concepts.",
      details:
        "Experimental temporal manipulation technology based on controlled space-time metric engineering. Early applications include localized time dilation fields for tactical advantage, while advanced development aims toward stable wormhole generation and causality-protected time travel for strategic intelligence gathering.",
      color: "purple",
    },
  ]

  // Mobile-optimized plotting functions
  useEffect(() => {
    const isMobile = window.innerWidth < 768

    // Simplified plotting for mobile devices
    const createMobileFriendlyPlot = (elementId: string, data: any, layout: any) => {
      const element = plotRefs.current[elementId]
      if (!element || !window.Plotly) return

      const mobileLayout = {
        ...layout,
        autosize: true,
        margin: { l: 20, r: 20, b: 30, t: 40 },
        font: { size: isMobile ? 10 : 12 },
        showlegend: !isMobile,
        height: isMobile ? 300 : 400,
      }

      window.Plotly.newPlot(elementId, data, mobileLayout, {
        responsive: true,
        displayModeBar: !isMobile,
      })
    }

    // Load Plotly and create plots
    const loadPlotly = async () => {
      if (!window.Plotly) {
        const script = document.createElement("script")
        script.src = "https://cdn.plot.ly/plotly-2.32.0.min.js"
        script.onload = () => createPlots()
        document.head.appendChild(script)
      } else {
        createPlots()
      }
    }

    const createPlots = () => {
      // Tetrahedral Lattice (simplified for mobile)
      const latticePoints = isMobile ? 30 : 50
      const points = []
      for (let i = 0; i < latticePoints; i++) {
        const u = Math.random()
        const v = Math.random()
        const theta = 2 * Math.PI * u
        const phi = Math.acos(2 * v - 1)
        const r = Math.cbrt(Math.random()) * 10
        points.push({
          x: r * Math.sin(phi) * Math.cos(theta),
          y: r * Math.sin(phi) * Math.sin(theta),
          z: r * Math.cos(phi),
        })
      }

      const latticeTrace = {
        x: points.map((p) => p.x),
        y: points.map((p) => p.y),
        z: points.map((p) => p.z),
        mode: "markers",
        marker: { size: isMobile ? 3 : 4, color: "#3b82f6", opacity: 0.7 },
        type: "scatter3d",
      }

      createMobileFriendlyPlot("tetrahedral-lattice", [latticeTrace], {
        title: "Tetrahedral Space-Time Lattice",
        scene: {
          xaxis: { title: "X (Energy)" },
          yaxis: { title: "Y (Time)" },
          zaxis: { title: "Z (Quantum)" },
        },
      })

      // Propulsion Field (simplified surface for mobile)
      const fieldSize = isMobile ? 25 : 50
      const fieldData = Array.from({ length: fieldSize }, () =>
        Array.from(
          { length: fieldSize },
          () => (Math.sin(Math.random() * 5) + Math.cos(Math.random() * 3)) * Math.random() * 5,
        ),
      )

      const propulsionTrace = {
        z: fieldData,
        type: "surface",
        colorscale: "Blues",
        reversescale: true,
        showscale: !isMobile,
      }

      createMobileFriendlyPlot("propulsion-field", [propulsionTrace], {
        title: "Quantum Propulsion Field",
        scene: {
          xaxis: { title: "X Dimension" },
          yaxis: { title: "Y Dimension" },
          zaxis: { title: "Thrust Potential" },
        },
      })
    }

    loadPlotly()

    // Efficiency Chart with Chart.js
    const createEfficiencyChart = () => {
      const canvas = document.getElementById("efficiency-chart") as HTMLCanvasElement
      if (!canvas || !window.Chart) return

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      new window.Chart(ctx, {
        type: "bar",
        data: {
          labels: isMobile
            ? ["Coal", "CSP", "Waste", "CO2"]
            : ["Coal Combustion", "CSP + Electrolysis", "Waste Reprocessing", "CO2 Recycling"],
          datasets: [
            {
              label: "Standard",
              data: [38, 45, 55, 30],
              backgroundColor: "#94a3b8",
            },
            {
              label: "Tetrahedral",
              data: [52, 65, 78, 55],
              backgroundColor: "#3b82f6",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: isMobile ? "bottom" : "top" },
            title: { display: true, text: "Efficiency Gains" },
          },
          scales: {
            y: {
              beginAtZero: true,
              title: { display: !isMobile, text: "Efficiency (%)" },
            },
          },
        },
      })
    }

    // Load Chart.js
    if (!window.Chart) {
      const script = document.createElement("script")
      script.src = "https://cdn.jsdelivr.net/npm/chart.js"
      script.onload = createEfficiencyChart
      document.head.appendChild(script)
    } else {
      createEfficiencyChart()
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    setMobileMenuOpen(false)
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-50 shadow-sm">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="font-bold text-lg text-slate-900">SPECTRA Initiative</div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-600">
            <button onClick={() => scrollToSection("introduction")} className="hover:text-blue-500 transition">
              Introduction
            </button>
            <button onClick={() => scrollToSection("dynamics")} className="hover:text-blue-500 transition">
              Dynamics
            </button>
            <button onClick={() => scrollToSection("simulations")} className="hover:text-blue-500 transition">
              Simulations
            </button>
            <button onClick={() => scrollToSection("applications")} className="hover:text-blue-500 transition">
              Applications
            </button>
            <button onClick={() => scrollToSection("roadmap")} className="hover:text-blue-500 transition">
              Roadmap
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
            >
              Contact
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pb-4 space-y-2 bg-white border-t">
            {["introduction", "dynamics", "simulations", "applications", "roadmap", "contact"].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="block w-full text-left py-2 px-4 hover:bg-slate-100 rounded capitalize"
              >
                {section}
              </button>
            ))}
          </div>
        )}
      </header>

      <main>
        {/* Introduction */}
        <section id="introduction" className="py-12 md:py-20 text-center bg-white">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-6xl font-extrabold tracking-tighter text-slate-900 mb-4">
              Waste Conversion Alchemy for Defense
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-8">
              An interactive exploration of the SPECTRA project, integrating tetrahedral dynamics and advanced aerospace
              technologies to revolutionize energy, waste management, and strategic defense.
            </p>
            <Button onClick={() => scrollToSection("dynamics")} className="bg-slate-900 hover:bg-slate-700">
              Explore the Physics
            </Button>
          </div>
        </section>

        {/* Dynamics */}
        <section id="dynamics" className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
                The Core Principle: Tetrahedral Dynamics
              </h2>
              <p className="text-lg text-slate-600 max-w-4xl mx-auto">
                This research proposes a new foundational framework where fundamental universal constants are
                interrelated through a specific geometric structure—the tetrahedron.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-900">The Tetrahedral Determinant</h3>
                <p className="text-slate-600">
                  The project's theoretical core is the refinement of the tetrahedral determinant equation, which
                  suggests a deep, geometric connection between quantum mechanics, relativity, gravity, and
                  thermodynamics.
                </p>

                <div className="p-4 bg-slate-100 rounded-lg">
                  <div className="font-mono text-center text-slate-800">
                    <div className="text-lg">det</div>
                    <div className="border border-slate-400 inline-block p-2 mt-2">
                      <div className="grid grid-cols-4 gap-2 text-sm">
                        <span>1</span>
                        <span>h</span>
                        <span>G</span>
                        <span>c</span>
                        <span>h</span>
                        <span>1</span>
                        <span>k_B</span>
                        <span>G</span>
                        <span>G</span>
                        <span>k_B</span>
                        <span>1</span>
                        <span>c</span>
                        <span>c</span>
                        <span>G</span>
                        <span>c</span>
                        <span>1</span>
                      </div>
                    </div>
                    <div className="mt-2">= 0</div>
                  </div>
                  <p className="text-xs text-slate-500 mt-2 text-center">
                    Conceptual representation of the proposed relationship
                  </p>
                </div>
              </div>

              <div className="h-96">
                <div
                  ref={(el) => (plotRefs.current["tetrahedral-lattice"] = el)}
                  id="tetrahedral-lattice"
                  className="w-full h-full"
                ></div>
              </div>
            </div>
          </div>
        </section>

        {/* Simulations */}
        <section id="simulations" className="py-12 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Modeling the Quantum Realm</h2>
              <p className="text-lg text-slate-600 max-w-4xl mx-auto">
                Computational simulations validate theoretical ideas using Loop Quantum Gravity principles to model
                waste and energy interactions on a tetrahedral lattice.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="h-96">
                <canvas id="efficiency-chart" className="w-full h-full"></canvas>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-900">From Theory to Prediction</h3>
                <p className="text-slate-600">
                  Using Monte Carlo and quantum heat transfer simulations on a tetrahedral lattice, we can model complex
                  industrial processes at a fundamental level.
                </p>

                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded border-l-4 border-blue-500">
                    <h4 className="font-semibold text-slate-700">Fluidized Coal Combustion</h4>
                    <p className="text-sm text-slate-600">Higher energy yield with lower emissions</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded border-l-4 border-green-500">
                    <h4 className="font-semibold text-slate-700">Concentrated Solar Power</h4>
                    <p className="text-sm text-slate-600">Enhanced heat transfer for seawater electrolysis</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded border-l-4 border-purple-500">
                    <h4 className="font-semibold text-slate-700">Carbon Capture & Storage</h4>
                    <p className="text-sm text-slate-600">Optimized CO₂ recycling into synthetic fuels</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Applications */}
        <section id="applications" className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
                Revolutionizing Aerospace & Defense
              </h2>
              <p className="text-lg text-slate-600 max-w-4xl mx-auto">
                By manipulating energy and matter at the quantum-geometric level, we unlock paradigm-shifting
                technologies for defense and aerospace applications.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {applications.map((app) => (
                <Card key={app.id} className="hover:shadow-xl transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4">{app.icon}</div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{app.title}</h3>
                    <p className="text-slate-600 text-sm mb-4">{app.description}</p>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setExpandedCard(expandedCard === app.id ? null : app.id)}
                      className="w-full"
                    >
                      {expandedCard === app.id ? (
                        <>
                          Less Details <ChevronUp className="ml-2 h-4 w-4" />
                        </>
                      ) : (
                        <>
                          More Details <ChevronDown className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>

                    {expandedCard === app.id && (
                      <div className="mt-4 p-4 bg-slate-50 rounded border-l-4 border-blue-500">
                        <p className="text-sm text-slate-700">{app.details}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Propulsion Visualization */}
            <div className="text-center">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Visualizing Quantum Propulsion</h3>
              <p className="text-slate-600 mb-8 max-w-3xl mx-auto">
                The simulation below models how tetrahedral quantum field dynamics could generate fuel-less propulsion.
                Bright regions indicate high-efficiency thrust generation.
              </p>
              <div className="h-96">
                <div
                  ref={(el) => (plotRefs.current["propulsion-field"] = el)}
                  id="propulsion-field"
                  className="w-full h-full"
                ></div>
              </div>
            </div>
          </div>
        </section>

        {/* Roadmap */}
        <section id="roadmap" className="py-12 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Roadmap to Implementation</h2>
              <p className="text-lg text-slate-600 max-w-4xl mx-auto">
                A structured, phased approach to bringing revolutionary concepts from theory to reality.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {[
                  {
                    phase: "Phase 1",
                    title: "Validate Tetrahedral Determinant",
                    description:
                      "Develop computational models to confirm theoretical links between universal constants and energy efficiency.",
                  },
                  {
                    phase: "Phase 2",
                    title: "Simulate Quantum Interactions",
                    description:
                      "Run large-scale quantum lattice simulations for waste recovery and Carbon Capture systems.",
                  },
                  {
                    phase: "Phase 3",
                    title: "Deploy Quantum-Enhanced Systems",
                    description:
                      "Develop and field-test prototypes of Directed Energy Weapons and autonomous VTOL drones.",
                  },
                  {
                    phase: "Phase 4",
                    title: "Test Aerospace Applications",
                    description:
                      "Begin experimental testing of quantum gravity propulsion systems for interstellar transport.",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold text-slate-900 mb-2">
                        {item.phase}: {item.title}
                      </h3>
                      <p className="text-slate-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contact" className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Initiate a Collaboration</h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            This research represents the frontier of physics and engineering. We are actively seeking partners to
            accelerate the journey from theory to reality.
          </p>

          <div className="mb-8">
            <p className="font-semibold text-lg">Devin Phillip Davis, MBA, PE</p>
            <p className="text-slate-400">Agile Defense Systems, LLC</p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-4">
              <a href="tel:859-888-9819" className="flex items-center text-green-400 hover:text-green-300 transition">
                <Phone className="h-4 w-4 mr-2" />
                (859) 888-9819
              </a>
              <a
                href="mailto:devin@agiledefensesystems.com"
                className="flex items-center text-blue-400 hover:text-blue-300 transition"
              >
                <Mail className="h-4 w-4 mr-2" />
                devin@agiledefensesystems.com
              </a>
            </div>
          </div>

          <p className="text-xs text-slate-500">
            &copy; 2025 Agile Defense Systems, LLC. All rights reserved. Interactive report generated for classified
            defense applications.
          </p>
        </div>
      </footer>
    </div>
  )
}
