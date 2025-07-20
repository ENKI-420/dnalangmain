"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Lock,
  Shield,
  AlertTriangle,
  Phone,
  Mail,
  DollarSign,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle,
  XCircle,
} from "lucide-react"
import SpectraComponent from "./SpectraComponent"

const PasswordProtectedSpectra: React.FC = () => {
  const [password, setPassword] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isMobile, setIsMobile] = useState(false)

  const CORRECT_PASSWORD = "SPECTRA-DEFENSE-2025"
  const MAX_ATTEMPTS = 3

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (attempts >= MAX_ATTEMPTS) {
      setError("MAXIMUM ATTEMPTS EXCEEDED - SECURITY PROTOCOL ACTIVATED")
      return
    }

    setIsLoading(true)
    setError("")

    // Simulate authentication delay for security
    await new Promise((resolve) => setTimeout(resolve, isMobile ? 1000 : 2000))

    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true)
      setError("")
    } else {
      setAttempts((prev) => prev + 1)
      setPassword("")

      if (attempts + 1 >= MAX_ATTEMPTS) {
        setError("MAXIMUM ATTEMPTS EXCEEDED - CONTACT REQUIRED FOR ACCESS")
      } else {
        setError(`ACCESS DENIED - ${MAX_ATTEMPTS - (attempts + 1)} attempts remaining`)
      }
    }

    setIsLoading(false)
  }

  if (isAuthenticated) {
    return <SpectraComponent />
  }

  const isLocked = attempts >= MAX_ATTEMPTS

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-red-600/20 text-red-200 border-red-500/30 text-sm">
            <Lock className="w-3 h-3 mr-1" />
            CLASSIFIED ACCESS REQUIRED
          </Badge>

          <h1 className={`font-extrabold tracking-tighter mb-4 ${isMobile ? "text-3xl" : "text-4xl md:text-6xl"}`}>
            <span className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
              SPECTRA DEFENSE SYSTEMS
            </span>
          </h1>

          <p className={`text-red-200 max-w-3xl mx-auto ${isMobile ? "text-base" : "text-lg"}`}>
            Revolutionary quantum-enhanced defense and medical technologies. Security clearance required for classified
            technical specifications.
          </p>
        </div>

        <div className={`grid gap-8 ${isMobile ? "grid-cols-1" : "md:grid-cols-2"} items-start`}>
          {/* Authentication Panel */}
          <Card className="bg-black/60 border-red-500/30 backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-red-200">
                <Shield className="w-5 h-5" />
                <span>Security Authentication</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {!isLocked ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-red-200">Access Code</label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter security clearance code"
                        className="bg-black/40 border-red-500/30 text-white placeholder-red-300/50 pr-10"
                        disabled={isLoading}
                        autoComplete="off"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0 text-red-300 hover:text-red-200"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading || !password.trim()}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Authenticating...
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 mr-2" />
                        Authenticate
                      </>
                    )}
                  </Button>
                </form>
              ) : (
                <div className="text-center space-y-4">
                  <XCircle className="w-16 h-16 text-red-500 mx-auto" />
                  <h3 className="text-xl font-bold text-red-200">Access Locked</h3>
                  <p className="text-red-300 text-sm">
                    Security protocol activated. Contact required for access restoration.
                  </p>
                </div>
              )}

              {error && (
                <div className="flex items-center space-x-2 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
                  <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <p className="text-red-200 text-sm font-medium">{error}</p>
                </div>
              )}

              {/* Attempt Counter */}
              <div className="flex justify-between items-center text-xs text-red-300">
                <span>
                  Attempts: {attempts}/{MAX_ATTEMPTS}
                </span>
                <span className="flex items-center space-x-1">
                  {Array.from({ length: MAX_ATTEMPTS }).map((_, i) => (
                    <div key={i} className={`w-2 h-2 rounded-full ${i < attempts ? "bg-red-500" : "bg-red-500/20"}`} />
                  ))}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Access Information */}
          <div className="space-y-6">
            {/* Payment Requirements */}
            <Card className="bg-black/60 border-yellow-500/30 backdrop-blur-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-yellow-200">
                  <DollarSign className="w-5 h-5" />
                  <span>Access Requirements</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">$100,000</div>
                  <p className="text-yellow-200 text-sm">Security Clearance Fee</p>
                </div>

                <div className="space-y-2 text-sm text-yellow-100">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Full technical specifications</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Implementation roadmaps</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Investment opportunities</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Direct contact with development team</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="bg-black/60 border-blue-500/30 backdrop-blur-lg">
              <CardHeader>
                <CardTitle className="text-blue-200">Authorization Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="font-semibold text-white">Devin Phillip Davis, MBA, PE</p>
                  <p className="text-blue-300 text-sm">Agile Defense Systems, LLC</p>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={() => window.open("tel:859-888-9819")}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call for Access: (859) 888-9819
                  </Button>

                  <Button
                    onClick={() => window.open("mailto:devin@agiledefensesystems.com?subject=SPECTRA Access Request")}
                    variant="outline"
                    className="w-full border-blue-500 text-blue-400 hover:bg-blue-500/10"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email Authorization Request
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Teaser Information */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-black/40 border-green-500/30 backdrop-blur-lg">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-400 mb-2">Medical Breakthroughs</div>
              <p className="text-green-200 text-sm">
                Quantum-enhanced surgical precision, cellular regeneration, and disease eradication technologies
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-red-500/30 backdrop-blur-lg">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-red-400 mb-2">Defense Systems</div>
              <p className="text-red-200 text-sm">
                Next-generation weapons, armor, and tactical systems with unprecedented capabilities
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-purple-500/30 backdrop-blur-lg">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-purple-400 mb-2">$50T+ Market</div>
              <p className="text-purple-200 text-sm">
                Revolutionary technologies targeting trillion-dollar defense and healthcare markets
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-xs text-slate-500">
          © 2025 Agile Defense Systems, LLC. Classified technologies under development.
          <br />
          Unauthorized access attempts are monitored and logged.
        </div>
      </div>
    </div>
  )
}

export default PasswordProtectedSpectra
