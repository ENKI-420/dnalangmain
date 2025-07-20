"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Lock, Phone, Mail, DollarSign, AlertTriangle, Eye, EyeOff } from "lucide-react"
import SpectraComponent from "./SpectraComponent"

const CORRECT_PASSWORD = "SPECTRA-DEFENSE-2025"
const MAX_ATTEMPTS = 3

export default function PasswordProtectedSpectra() {
  const [password, setPassword] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLocked, setIsLocked] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isLocked) return

    setIsLoading(true)
    setError("")

    // Simulate authentication delay (shorter on mobile)
    const isMobile = window.innerWidth < 768
    await new Promise((resolve) => setTimeout(resolve, isMobile ? 1000 : 2000))

    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true)
    } else {
      const newAttempts = attempts + 1
      setAttempts(newAttempts)

      if (newAttempts >= MAX_ATTEMPTS) {
        setIsLocked(true)
        setError("MAXIMUM ATTEMPTS EXCEEDED - SECURITY PROTOCOL ACTIVATED")
      } else {
        setError(`ACCESS DENIED - ${MAX_ATTEMPTS - newAttempts} attempts remaining`)
      }
    }

    setIsLoading(false)
  }

  if (isAuthenticated) {
    return <SpectraComponent />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-32 h-32 bg-red-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-500 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-green-500 rounded-full blur-2xl animate-pulse delay-500" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-12 w-12 text-red-500 mr-4" />
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">CLASSIFIED ACCESS</h1>
          </div>
          <p className="text-xl text-slate-300">SPECTRA Defense Technologies</p>
          <Badge variant="destructive" className="mt-2">
            SECURITY CLEARANCE REQUIRED
          </Badge>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Authentication Panel */}
          <Card className="bg-slate-800/50 border-slate-600">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Lock className="h-5 w-5 mr-2" />
                Security Clearance Code
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!isLocked ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter clearance code..."
                      className="bg-slate-700 border-slate-600 text-white pr-10"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700"
                    disabled={isLoading || !password.trim()}
                  >
                    {isLoading ? "AUTHENTICATING..." : "AUTHENTICATE"}
                  </Button>
                </form>
              ) : (
                <div className="text-center p-6 bg-red-900/20 border border-red-500 rounded">
                  <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                  <p className="text-red-400 font-bold">SECURITY LOCKOUT ACTIVATED</p>
                  <p className="text-sm text-slate-400 mt-2">Contact authorized personnel for access restoration</p>
                </div>
              )}

              {error && (
                <div className="p-3 bg-red-900/20 border border-red-500 rounded">
                  <p className="text-red-400 text-sm font-mono">{error}</p>
                </div>
              )}

              <div className="text-xs text-slate-500 space-y-1">
                <p>
                  • Attempts: {attempts}/{MAX_ATTEMPTS}
                </p>
                <p>• Security Level: CLASSIFIED</p>
                <p>• Access Fee: $100,000 USD</p>
              </div>
            </CardContent>
          </Card>

          {/* Access Information */}
          <Card className="bg-slate-800/50 border-slate-600">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <DollarSign className="h-5 w-5 mr-2" />
                Investment Opportunity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-4 bg-green-900/20 border border-green-500 rounded">
                  <h3 className="font-bold text-green-400 mb-2">Market Potential</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Defense: $50T+</div>
                    <div>Medical: $25T+</div>
                    <div>Energy: $15T+</div>
                    <div>Aerospace: $10T+</div>
                  </div>
                </div>

                <div className="p-4 bg-blue-900/20 border border-blue-500 rounded">
                  <h3 className="font-bold text-blue-400 mb-2">Breakthrough Technologies</h3>
                  <ul className="text-sm space-y-1">
                    <li>• Quantum Gravity Propulsion</li>
                    <li>• Directed Energy Weapons</li>
                    <li>• Medical Nanotechnology</li>
                    <li>• Temporal Manipulation</li>
                  </ul>
                </div>

                <div className="p-4 bg-purple-900/20 border border-purple-500 rounded">
                  <h3 className="font-bold text-purple-400 mb-2">Access Requirements</h3>
                  <ul className="text-sm space-y-1">
                    <li>• Security Clearance: $100,000</li>
                    <li>• Minimum Investment: $1M</li>
                    <li>• Background Check Required</li>
                    <li>• NDA Mandatory</li>
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-600">
                <h3 className="font-bold mb-3">Authorized Contact</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-green-400" />
                    <a href="tel:859-888-9819" className="text-green-400 hover:text-green-300">
                      (859) 888-9819
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-blue-400" />
                    <a href="mailto:devin@agiledefensesystems.com" className="text-blue-400 hover:text-blue-300">
                      devin@agiledefensesystems.com
                    </a>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-3">
                  Devin Phillip Davis, MBA, PE
                  <br />
                  Agile Defense Systems, LLC
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Teaser Information */}
        <div className="mt-12 max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Revolutionary Capabilities</h2>
            <p className="text-slate-300">Glimpse into the future of defense and medical technology</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-slate-800/30 border-slate-600">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">🛡️</div>
                <h3 className="font-bold mb-2">Defense Systems</h3>
                <p className="text-sm text-slate-400">
                  Next-generation weapons and protection systems using quantum field manipulation
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/30 border-slate-600">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">🧬</div>
                <h3 className="font-bold mb-2">Medical Breakthroughs</h3>
                <p className="text-sm text-slate-400">
                  Revolutionary treatments using tetrahedral dynamics and quantum biology
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/30 border-slate-600">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="font-bold mb-2">Aerospace Innovation</h3>
                <p className="text-sm text-slate-400">
                  Propulsion systems that manipulate space-time for interstellar travel
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-red-900/20 to-blue-900/20 border-slate-600 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Change the World?</h3>
              <p className="text-slate-300 mb-6">
                Join us in developing technologies that will reshape defense, medicine, and space exploration. Contact
                us today to discuss investment opportunities and security clearance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-green-600 hover:bg-green-700">
                  <a href="tel:859-888-9819">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-slate-600 text-white hover:bg-slate-700 bg-transparent"
                >
                  <a href="mailto:devin@agiledefensesystems.com">
                    <Mail className="h-4 w-4 mr-2" />
                    Email Us
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
