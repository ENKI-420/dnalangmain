"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Zap, Rocket, Brain, Target, Phone, Mail, ChevronDown, ChevronUp, Lock, Atom } from "lucide-react"

const SpectraComponent: React.FC = () => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Mobile optimization: Close menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [mobileMenuOpen])

  const applications = [
    {
      id: "materials",
      icon: <Shield className="w-6 h-6" />,
      title: "Next-Gen Materials",
      description: "Quantum-coated ceramics resistant to extreme heat and radiation, metamaterial energy shields.",
      details:
        "Advanced metamaterial composites utilizing tetrahedral lattice structures for unprecedented durability. Applications include hypersonic vehicle hulls, directed energy weapon housings, and quantum-resistant armor systems. Current prototypes demonstrate 300% improvement in heat dissipation and 85% reduction in electromagnetic signature.",
      color: "blue",
    },
    {
      id: "propulsion",
      icon: <Rocket className="w-6 h-6" />,
      title: "Quantum Gravity Propulsion",
      description: "Harnessing space-time distortions for propellant-free thrust generation.",
      details:
        "Revolutionary propulsion system based on controlled gravitational field manipulation. Eliminates traditional fuel requirements while achieving theoretical specific impulse values exceeding 10,000 seconds. Current research focuses on miniaturization for tactical applications and scaling for interstellar missions.",
      color: "green",
    },
    {
      id: "weapons",
      icon: <Zap className="w-6 h-6" />,
      title: "Directed Energy Weapons",
      description: "Quantum-locked resonances for precision energy transfer over vast distances.",
      details:
        "Next-generation DEW systems utilizing scalar wave propagation and quantum entanglement for instantaneous target engagement. Capable of selective molecular disruption, EMP generation, and kinetic energy transfer without traditional beam divergence limitations. Range: Unlimited with quantum relay stations.",
      color: "red",
    },
    {
      id: "energy",
      icon: <Atom className="w-6 h-6" />,
      title: "Tactical Energy Resilience",
      description: "Mobile microgrids and modular plasma-waste reactors for battlefield power.",
      details:
        "Self-sustaining energy systems converting battlefield waste into tactical power. Modular fusion reactors with 99.7% efficiency, capable of processing organic and inorganic materials. Deployable units provide 50MW continuous power with zero logistical footprint.",
      color: "yellow",
    },
    {
      id: "ai",
      icon: <Brain className="w-6 h-6" />,
      title: "AI-Driven Reconnaissance",
      description: "Quantum neural networks controlling autonomous drone swarms with target locking.",
      details:
        "Distributed AI consciousness across swarm networks utilizing quantum processing nodes. Capabilities include real-time battlefield analysis, predictive threat assessment, and autonomous mission adaptation. Current swarms demonstrate 99.97% target identification accuracy with sub-millisecond response times.",
      color: "indigo",
    },
    {
      id: "timetech",
      icon: <Target className="w-6 h-6" />,
      title: "Temporal Manipulation Research",
      description: "Metric engineering for time dilation and causality manipulation applications.",
      details:
        "Theoretical framework for localized spacetime manipulation enabling tactical time dilation fields. Applications include accelerated decision-making, temporal reconnaissance, and causality-based defense systems. Current research phase focuses on containment and control mechanisms.",
      color: "purple",
    },
  ]

  const roadmapPhases = [
    {
      phase: "Phase 1",
      title: "Theoretical Validation",
      description: "Validate tetrahedral determinant equations and quantum lattice models.",
      timeline: "6 months",
      status: "active",
    },
    {
      phase: "Phase 2",
      title: "Prototype Development",
      description: "Develop working prototypes of key technologies and conduct field testing.",
      timeline: "18 months",
      status: "planned",
    },
    {
      phase: "Phase 3",
      title: "Military Integration",
      description: "Deploy systems for military evaluation and operational testing.",
      timeline: "24 months",
      status: "planned",
    },
    {
      phase: "Phase 4",
      title: "Full Deployment",
      description: "Scale production and implement across defense and aerospace sectors.",
      timeline: "36 months",
      status: "planned",
    },
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-500/20 border-blue-500/30 text-blue-200",
      green: "bg-green-500/20 border-green-500/30 text-green-200",
      red: "bg-red-500/20 border-red-500/30 text-red-200",
      yellow: "bg-yellow-500/20 border-yellow-500/30 text-yellow-200",
      indigo: "bg-indigo-500/20 border-indigo-500/30 text-indigo-200",
      purple: "bg-purple-500/20 border-purple-500/30 text-purple-200",
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
      {/* Header */}
      <header className="bg-black/40 backdrop-blur-lg sticky top-0 z-50 border-b border-blue-500/30">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="font-bold text-xl text-blue-400">SPECTRA Initiative</div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <a href="#introduction" className="hover:text-blue-400 transition">
              Introduction
            </a>
            <a href="#applications" className="hover:text-blue-400 transition">
              Applications
            </a>
            <a href="#roadmap" className="hover:text-blue-400 transition">
              Roadmap
            </a>
            <Button onClick={() => window.open("tel:859-888-9819")} className="bg-blue-600 hover:bg-blue-700">
              Contact
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <ChevronUp /> : <ChevronDown />}
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pb-4 space-y-2 bg-black/60 backdrop-blur-lg">
            <a href="#introduction" className="block py-2 hover:text-blue-400 transition">
              Introduction
            </a>
            <a href="#applications" className="block py-2 hover:text-blue-400 transition">
              Applications
            </a>
            <a href="#roadmap" className="block py-2 hover:text-blue-400 transition">
              Roadmap
            </a>
            <Button
              onClick={() => window.open("tel:859-888-9819")}
              className="w-full mt-2 bg-blue-600 hover:bg-blue-700"
            >
              Contact
            </Button>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section id="introduction" className="py-12 sm:py-20 text-center">
          <div className="container mx-auto px-4">
            <Badge className="mb-4 bg-red-600/20 text-red-200 border-red-500/30">
              <Lock className="w-3 h-3 mr-1" />
              CLASSIFIED
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tighter mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
                SPECTRA Defense Technologies
              </span>
            </h1>
            <p className="text-lg md:text-xl text-blue-200 max-w-4xl mx-auto mb-8">
              Revolutionary quantum-enhanced defense and medical systems utilizing tetrahedral dynamics for
              unprecedented tactical advantages and life-saving capabilities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => document.getElementById("applications")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
              >
                Explore Technologies
              </Button>
              <Button
                onClick={() => window.open("mailto:devin@agiledefensesystems.com?subject=SPECTRA Investment Inquiry")}
                variant="outline"
                className="border-green-500 text-green-400 hover:bg-green-500/10 px-8 py-3"
              >
                Investment Opportunity
              </Button>
            </div>
          </div>
        </section>

        {/* Core Principle */}
        <section className="py-12 sm:py-16 bg-black/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Tetrahedral Dynamics Framework</h2>
              <p className="text-blue-200 max-w-3xl mx-auto">
                Our breakthrough research reveals fundamental connections between quantum mechanics, relativity, and
                thermodynamics through geometric spacetime structures.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <Card className="bg-black/40 border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-blue-200">The Tetrahedral Determinant</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-slate-900/50 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <div className="text-center text-blue-300">det(Tetrahedral Matrix) = 0</div>
                    <div className="text-xs text-slate-400 mt-2 text-center">
                      Linking h, c, G, k_B through geometric constraints
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-slate-300">
                    This equation represents the fundamental geometric relationship governing energy conversion
                    efficiency at the quantum level.
                  </p>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-200 mb-2">Energy Efficiency Gains</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      Coal Combustion: <span className="text-green-400 font-bold">+37%</span>
                    </div>
                    <div>
                      Solar Power: <span className="text-green-400 font-bold">+44%</span>
                    </div>
                    <div>
                      Waste Processing: <span className="text-green-400 font-bold">+42%</span>
                    </div>
                    <div>
                      CO₂ Recycling: <span className="text-green-400 font-bold">+83%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Applications */}
        <section id="applications" className="py-12 sm:py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Revolutionary Applications</h2>
              <p className="text-blue-200 max-w-3xl mx-auto">
                Transforming defense and medical capabilities through quantum-enhanced technologies
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {applications.map((app) => (
                <Card
                  key={app.id}
                  className={`${getColorClasses(app.color)} backdrop-blur-lg hover:scale-105 transition-all duration-300 cursor-pointer`}
                  onClick={() => setExpandedCard(expandedCard === app.id ? null : app.id)}
                >
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      {app.icon}
                      <CardTitle className="text-lg">{app.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4 opacity-90">{app.description}</p>

                    {expandedCard === app.id && (
                      <div className="mt-4 p-3 bg-black/30 rounded-lg">
                        <p className="text-xs leading-relaxed">{app.details}</p>
                      </div>
                    )}

                    <Button variant="ghost" size="sm" className="w-full mt-3 text-xs">
                      {expandedCard === app.id ? (
                        <>
                          Less Details <ChevronUp className="w-3 h-3 ml-1" />
                        </>
                      ) : (
                        <>
                          More Details <ChevronDown className="w-3 h-3 ml-1" />
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Roadmap */}
        <section id="roadmap" className="py-12 sm:py-16 bg-black/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Implementation Roadmap</h2>
              <p className="text-blue-200 max-w-3xl mx-auto">
                Strategic development phases for bringing revolutionary technologies to operational readiness
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-6">
                {roadmapPhases.map((phase, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6"
                  >
                    <div className="flex-shrink-0">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                          phase.status === "active"
                            ? "bg-green-500 text-black"
                            : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                        }`}
                      >
                        {index + 1}
                      </div>
                    </div>

                    <Card className="flex-grow bg-black/40 border-blue-500/30">
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex-grow">
                            <h3 className="font-semibold text-blue-200 mb-1">
                              {phase.phase}: {phase.title}
                            </h3>
                            <p className="text-sm text-slate-300 mb-2">{phase.description}</p>
                          </div>
                          <div className="flex-shrink-0">
                            <Badge variant="outline" className="border-blue-500/30 text-blue-300">
                              {phase.timeline}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Investment CTA */}
        <section className="py-12 sm:py-16 bg-gradient-to-r from-green-900/20 to-blue-900/20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">🚀 Strategic Investment Opportunity 🚀</h2>
            <p className="text-lg text-green-200 max-w-3xl mx-auto mb-8">
              Join us in revolutionizing defense and medical technologies. Trillion-dollar market potential with
              paradigm-shifting applications.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card className="bg-black/40 border-green-500/30">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-400">$50T+</div>
                  <div className="text-sm text-green-200">Market Potential</div>
                </CardContent>
              </Card>
              <Card className="bg-black/40 border-blue-500/30">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-400">15+</div>
                  <div className="text-sm text-blue-200">Patent Applications</div>
                </CardContent>
              </Card>
              <Card className="bg-black/40 border-purple-500/30">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-400">6</div>
                  <div className="text-sm text-purple-200">Core Technologies</div>
                </CardContent>
              </Card>
              <Card className="bg-black/40 border-yellow-500/30">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-400">2025</div>
                  <div className="text-sm text-yellow-200">First Deployments</div>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => window.open("tel:859-888-9819")}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 font-bold"
              >
                <Phone className="w-4 h-4 mr-2" />
                Schedule Investor Call
              </Button>
              <Button
                onClick={() => window.open("mailto:devin@agiledefensesystems.com?subject=SPECTRA Investment Inquiry")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 font-bold"
              >
                <Mail className="w-4 h-4 mr-2" />
                Investment Inquiry
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black/60 backdrop-blur-lg border-t border-blue-500/30">
        <div className="container mx-auto px-4 py-8 text-center">
          <h3 className="text-xl font-bold text-blue-200 mb-2">Contact Leadership</h3>
          <p className="font-semibold text-white">Devin Phillip Davis, MBA, PE</p>
          <p className="text-blue-300">Agile Defense Systems, LLC</p>

          <div className="mt-4 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
            <a href="tel:859-888-9819" className="flex items-center text-green-400 hover:text-green-300 transition">
              <Phone className="w-4 h-4 mr-2" />
              (859) 888-9819
            </a>
            <a
              href="mailto:devin@agiledefensesystems.com"
              className="flex items-center text-blue-400 hover:text-blue-300 transition"
            >
              <Mail className="w-4 h-4 mr-2" />
              devin@agiledefensesystems.com
            </a>
          </div>

          <p className="mt-6 text-xs text-slate-500">
            © 2025 Agile Defense Systems, LLC. All rights reserved.
            <br className="sm:hidden" />
            Classified technologies under development.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default SpectraComponent
