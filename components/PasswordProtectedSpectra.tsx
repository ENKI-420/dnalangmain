"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock, Phone, DollarSign, Shield, Zap, Rocket } from "lucide-react"
import SpectraComponent from "./SpectraComponent"

const PasswordProtectedSpectra: React.FC = () => {
  const [password, setPassword] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [showPaymentInfo, setShowPaymentInfo] = useState(false)

  const correctPassword = "SPECTRA-DEFENSE-2025"

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (password === correctPassword) {
      setIsAuthenticated(true)
    } else {
      setAttempts((prev) => prev + 1)
      setPassword("")

      if (attempts >= 2) {
        setShowPaymentInfo(true)
      }
    }
  }

  if (isAuthenticated) {
    return <SpectraComponent />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        {/* Main Access Card */}
        <Card className="bg-black/40 backdrop-blur-lg border-blue-500/30 shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center">
              <Lock className="w-8 h-8 text-blue-400" />
            </div>
            <CardTitle className="text-3xl font-bold text-white">CLASSIFIED ACCESS</CardTitle>
            <p className="text-blue-200">SPECTRA Defense & Medical Technologies</p>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-2">Security Clearance Code</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter classified access code..."
                  className="bg-black/50 border-blue-500/50 text-white placeholder-blue-300/50"
                />
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3">
                <Shield className="w-4 h-4 mr-2" />
                ACCESS CLASSIFIED INTEL
              </Button>
            </form>

            {attempts > 0 && (
              <div className="text-center text-red-400 text-sm">Access Denied. Attempt {attempts}/3</div>
            )}
          </CardContent>
        </Card>

        {/* Payment/Contact Information */}
        {(showPaymentInfo || attempts === 0) && (
          <Card className="bg-red-900/20 backdrop-blur-lg border-red-500/30">
            <CardHeader>
              <CardTitle className="text-xl text-red-200 flex items-center">
                <DollarSign className="w-5 h-5 mr-2" />
                Exclusive Access Protocol
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-black/30 p-4 rounded-lg border border-red-500/30">
                <h3 className="font-semibold text-red-200 mb-2">Access Requirements:</h3>
                <ul className="text-red-100 text-sm space-y-1">
                  <li>• Security clearance verification: $100,000 USD</li>
                  <li>• Direct authorization required</li>
                  <li>• Investor qualification mandatory</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => window.open("tel:859-888-9819")}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call for Access
                </Button>
                <Button
                  onClick={() => window.open("mailto:devin@agiledefensesystems.com")}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  Request Clearance
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Teaser Information */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-green-900/20 backdrop-blur-lg border-green-500/30">
            <CardHeader>
              <CardTitle className="text-lg text-green-200 flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                Medical Breakthroughs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-green-100 text-sm space-y-2">
                <li>• Quantum-enhanced CRISPR systems</li>
                <li>• Biodefense immune protocols</li>
                <li>• Regenerative combat medicine</li>
                <li>• Neural interface technologies</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-purple-900/20 backdrop-blur-lg border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-lg text-purple-200 flex items-center">
                <Rocket className="w-5 h-5 mr-2" />
                Defense Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-purple-100 text-sm space-y-2">
                <li>• Directed energy weapon systems</li>
                <li>• Quantum propulsion technology</li>
                <li>• Autonomous tactical platforms</li>
                <li>• Space-time manipulation research</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Investment Opportunity */}
        <Card className="bg-yellow-900/20 backdrop-blur-lg border-yellow-500/30">
          <CardContent className="text-center py-8">
            <h2 className="text-2xl font-bold text-yellow-200 mb-4">🚀 SEEKING STRATEGIC INVESTORS 🚀</h2>
            <p className="text-yellow-100 mb-6 max-w-lg mx-auto">
              Revolutionary defense and medical technologies with trillion-dollar market potential. Join us in reshaping
              the future of human capability and planetary defense.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => window.open("tel:859-888-9819")}
                className="bg-yellow-600 hover:bg-yellow-700 text-black font-bold"
              >
                <Phone className="w-4 h-4 mr-2" />
                Schedule Investor Call
              </Button>
              <Button
                onClick={() =>
                  window.open("mailto:devin@agiledefensesystems.com?subject=Investment Inquiry - SPECTRA Technologies")
                }
                className="bg-yellow-600 hover:bg-yellow-700 text-black font-bold"
              >
                Investment Inquiry
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-slate-400 text-sm">
          <p>© 2025 Agile Defense Systems, LLC</p>
          <p>Devin Phillip Davis, MBA, PE | (859) 888-9819</p>
          <p className="mt-2 text-xs">
            This system is monitored. Unauthorized access attempts are logged and reported.
          </p>
        </div>
      </div>
    </div>
  )
}

export default PasswordProtectedSpectra
