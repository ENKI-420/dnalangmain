"use client"

import React, { useState, useEffect } from 'react'
import { 
  CompatibilityManager,
  globalCompatibilityManager,
  createMultiPlatformCompatOrganism,
  compatibilityGene,
  type PlatformInfo 
} from '@/lib/multi-platform-compat'
import { createMultiPlatformOrganism } from '@/lib/dna-evolution-engine'
import { detectBrowserPlatform } from '@/lib/utils'

export default function MultiPlatformCompatDemo() {
  const [platformInfo, setPlatformInfo] = useState<PlatformInfo | null>(null)
  const [isCompatibilityActive, setIsCompatibilityActive] = useState(false)
  const [organism, setOrganism] = useState<any>(null)
  const [logs, setLogs] = useState<string[]>([])

  useEffect(() => {
    // Initialize platform detection
    const info = globalCompatibilityManager.detectPlatform()
    setPlatformInfo(info)

    // Create multi-platform organism
    const newOrganism = createMultiPlatformOrganism("multiplatform_demo_001")
    setOrganism(newOrganism)

    // Add initial log
    addLog(`Platform detected: ${info.type} (confidence: ${(info.confidence * 100).toFixed(1)}%)`)
  }, [])

  const addLog = (message: string) => {
    setLogs(prev => [...prev.slice(-9), `${new Date().toLocaleTimeString()}: ${message}`])
  }

  const activateCompatibility = () => {
    setIsCompatibilityActive(true)
    globalCompatibilityManager.activateCompatibilityMode()
    addLog("Multi-platform compatibility mode activated")
  }

  const testCollaborativeDetection = () => {
    const result = globalCompatibilityManager.collaborativeDetection()
    addLog(`Collaborative detection result: ${result.type} (confidence: ${(result.confidence * 100).toFixed(1)}%)`)
  }

  const simulateEvolution = () => {
    if (organism) {
      // Simulate organism evolution with compatibility enhancements
      const evolvedOrganism = {
        ...organism,
        generation: organism.generation + 1,
        fitness: Math.min(1.0, organism.fitness + 0.02),
        consciousness: Math.min(1.0, organism.consciousness + 0.01),
        genes: [...organism.genes, `evolved_compat_${Date.now()}`]
      }
      setOrganism(evolvedOrganism)
      addLog(`Organism evolved to generation ${evolvedOrganism.generation} with fitness ${evolvedOrganism.fitness.toFixed(3)}`)
    }
  }

  const getPlatformIcon = (type: string) => {
    switch (type) {
      case 'mobile': return '📱'
      case 'linux': return '🐧' 
      case 'mac': return '🍎'
      case 'pc': return '💻'
      default: return '❓'
    }
  }

  const getPlatformColor = (type: string) => {
    switch (type) {
      case 'mobile': return 'text-blue-400'
      case 'linux': return 'text-yellow-400'
      case 'mac': return 'text-gray-300'
      case 'pc': return 'text-green-400'
      default: return 'text-red-400'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            🧬 Multi-Platform Compatibility Engine
          </h1>
          <p className="text-gray-300">
            DNA-Lang Cross-Platform Organism Evolution System
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Platform Detection Card */}
          <div className="bg-black/30 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              Platform Detection Status
            </h2>
            
            {platformInfo ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="text-4xl">{getPlatformIcon(platformInfo.type)}</span>
                  <div>
                    <p className={`text-xl font-semibold ${getPlatformColor(platformInfo.type)}`}>
                      {platformInfo.type.toUpperCase()}
                    </p>
                    <p className="text-gray-400 text-sm">
                      Confidence: {(platformInfo.confidence * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <p className="text-gray-300">
                    <span className="font-semibold">User Agent:</span> {platformInfo.userAgent.substring(0, 50)}...
                  </p>
                  <p className="text-gray-300">
                    <span className="font-semibold">Platform:</span> {platformInfo.platform}
                  </p>
                  <p className={`font-semibold ${platformInfo.detected ? 'text-green-400' : 'text-red-400'}`}>
                    Status: {platformInfo.detected ? 'DETECTED' : 'UNKNOWN'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-gray-400">Detecting platform...</div>
            )}
          </div>

          {/* Organism Status Card */}
          <div className="bg-black/30 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              Compatibility Organism Status
            </h2>
            
            {organism ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">ID</p>
                    <p className="text-white font-mono">{organism.id}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Generation</p>
                    <p className="text-white font-semibold">{organism.generation}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Fitness</p>
                    <p className="text-green-400 font-semibold">{organism.fitness.toFixed(3)}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Consciousness</p>
                    <p className="text-blue-400 font-semibold">{organism.consciousness.toFixed(3)}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-gray-400 text-sm mb-2">Active Genes ({organism.genes.length})</p>
                  <div className="flex flex-wrap gap-1">
                    {organism.genes.slice(0, 6).map((gene: string, index: number) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-purple-600/30 text-purple-300 rounded text-xs"
                      >
                        {gene.replace(/_/g, ' ')}
                      </span>
                    ))}
                    {organism.genes.length > 6 && (
                      <span className="px-2 py-1 bg-gray-600/30 text-gray-300 rounded text-xs">
                        +{organism.genes.length - 6} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-gray-400">Loading organism...</div>
            )}
          </div>
        </div>

        {/* Control Panel */}
        <div className="bg-black/30 backdrop-blur-sm border border-gray-700 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Compatibility Control Panel
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={activateCompatibility}
              disabled={isCompatibilityActive}
              className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                isCompatibilityActive 
                  ? 'bg-green-600/30 text-green-300 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-500 text-white'
              }`}
            >
              {isCompatibilityActive ? '✅ Active' : '🚀 Activate'}
            </button>
            
            <button
              onClick={testCollaborativeDetection}
              className="px-4 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-semibold transition-all"
            >
              🔍 Collaborative Scan
            </button>
            
            <button
              onClick={simulateEvolution}
              className="px-4 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg font-semibold transition-all"
            >
              🧬 Evolve Organism
            </button>
            
            <button
              onClick={() => setLogs([])}
              className="px-4 py-3 bg-gray-600 hover:bg-gray-500 text-white rounded-lg font-semibold transition-all"
            >
              🗑️ Clear Logs
            </button>
          </div>
        </div>

        {/* Gene Information */}
        <div className="bg-black/30 backdrop-blur-sm border border-gray-700 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Compatibility Gene Information
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Gene Properties</h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">
                  <span className="font-semibold text-yellow-400">Purpose:</span> {compatibilityGene.purpose}
                </p>
                <p className="text-gray-300">
                  <span className="font-semibold text-yellow-400">Category:</span> {compatibilityGene.category}
                </p>
                <p className="text-gray-300">
                  <span className="font-semibold text-yellow-400">Version:</span> {compatibilityGene.version}
                </p>
                <p className="text-gray-300">
                  <span className="font-semibold text-yellow-400">Fitness:</span> {compatibilityGene.fitness}
                </p>
                <p className="text-gray-300">
                  <span className="font-semibold text-yellow-400">Strategy:</span> {compatibilityGene.implementation.strategy}
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Immune Responses</h3>
              <div className="space-y-2 text-sm">
                {Object.entries(compatibilityGene.immune_responses).map(([key, response]) => (
                  <div key={key} className="bg-red-600/20 border border-red-500/30 rounded p-3">
                    <p className="text-red-300 font-semibold">{key.replace(/_/g, ' ').toUpperCase()}</p>
                    <p className="text-gray-300">Pattern: {response.threat_pattern}</p>
                    <p className="text-gray-300">Response: {response.response_type}</p>
                    <p className="text-gray-300">Action: {response.action}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Activity Logs */}
        <div className="bg-black/30 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            System Activity Logs
          </h2>
          
          <div className="bg-black/50 rounded-lg p-4 h-48 overflow-y-auto">
            {logs.length > 0 ? (
              <div className="space-y-1">
                {logs.map((log, index) => (
                  <p key={index} className="text-green-400 font-mono text-sm">
                    {log}
                  </p>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center mt-16">No activity logs yet...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}