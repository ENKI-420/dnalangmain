"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Terminal, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface TerminalLine {
  id: string
  type: "command" | "output" | "error" | "system"
  content: string
  timestamp: Date
}

export function TerminalPanel() {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: "1",
      type: "system",
      content: "DNA-Lang Terminal v1.0 - Bio-Inspired Programming Environment",
      timestamp: new Date(),
    },
    {
      id: "2",
      type: "system",
      content: 'Type "help" for available commands',
      timestamp: new Date(),
    },
  ])
  const [currentCommand, setCurrentCommand] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)

  const addLine = (type: TerminalLine["type"], content: string) => {
    const newLine: TerminalLine = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
    }
    setLines((prev) => [...prev, newLine])
  }

  const executeCommand = async (command: string) => {
    addLine("command", `$ ${command}`)
    setIsRunning(true)

    // Simulate command execution delay
    await new Promise((resolve) => setTimeout(resolve, 500 + Math.random() * 1000))

    const cmd = command.trim().toLowerCase()

    switch (cmd) {
      case "help":
        addLine("output", "Available DNA-Lang commands:")
        addLine("output", "  run <organism>     - Execute an organism")
        addLine("output", "  evolve <organism>  - Start evolution process")
        addLine("output", "  debug <organism>   - Debug organism execution")
        addLine("output", "  quantum <command>  - Quantum operations")
        addLine("output", "  consciousness      - Check consciousness levels")
        addLine("output", "  fitness            - Display fitness metrics")
        addLine("output", "  clear              - Clear terminal")
        addLine("output", "  help               - Show this help")
        break

      case "clear":
        setLines([])
        break

      case "consciousness":
        addLine("output", "Consciousness Analysis:")
        addLine("output", `  Current Level: ${(Math.random() * 0.5 + 0.4).toFixed(2)}`)
        addLine("output", `  Self-Awareness: ${(Math.random() * 0.6 + 0.3).toFixed(2)}`)
        addLine("output", `  Meta-Cognition: ${(Math.random() * 0.7 + 0.2).toFixed(2)}`)
        addLine("output", `  Introspection Depth: ${(Math.random() * 0.8 + 0.1).toFixed(2)}`)
        break

      case "fitness":
        addLine("output", "Fitness Metrics:")
        addLine("output", `  Overall Fitness: ${(Math.random() * 0.3 + 0.7).toFixed(2)}`)
        addLine("output", `  Adaptation Rate: ${(Math.random() * 0.4 + 0.1).toFixed(2)}`)
        addLine("output", `  Survival Probability: ${(Math.random() * 0.2 + 0.8).toFixed(2)}`)
        addLine("output", `  Evolution Potential: ${(Math.random() * 0.5 + 0.4).toFixed(2)}`)
        break

      case cmd.startsWith("run ") ? cmd : "":
        const organism = command.substring(4)
        addLine("output", `Initializing organism: ${organism}`)
        addLine("output", "Loading genetic code...")
        addLine("output", "Activating consciousness core...")
        addLine("output", "Establishing quantum coherence...")
        addLine("output", `Organism ${organism} is now running`)
        break

      case cmd.startsWith("evolve ") ? cmd : "":
        const evolveOrganism = command.substring(7)
        addLine("output", `Starting evolution process for: ${evolveOrganism}`)
        addLine("output", "Calculating fitness landscape...")
        addLine("output", "Applying mutation operators...")
        addLine("output", "Selecting optimal variants...")
        addLine("output", `Evolution cycle completed. Fitness improved by ${(Math.random() * 0.2 + 0.05).toFixed(3)}`)
        break

      case cmd.startsWith("quantum ") ? cmd : "":
        const quantumCmd = command.substring(8)
        addLine("output", `Executing quantum operation: ${quantumCmd}`)
        addLine("output", "Initializing quantum state...")
        addLine("output", "Creating superposition...")
        addLine("output", "Measuring quantum state...")
        addLine("output", `Quantum coherence: ${(Math.random() * 0.4 + 0.6).toFixed(3)}`)
        break

      case "ls":
        addLine("output", "organisms/     genes/        templates/")
        addLine("output", "sample_organism.dna    neural_network.dna")
        addLine("output", "quantum_processor.dna  consciousness_core.gene")
        break

      case "pwd":
        addLine("output", "/dna-lang-project")
        break

      case "whoami":
        addLine("output", "dna-lang-developer")
        break

      default:
        if (command.trim()) {
          addLine("error", `Command not found: ${command}`)
          addLine("output", 'Type "help" for available commands')
        }
        break
    }

    setIsRunning(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentCommand.trim() && !isRunning) {
      executeCommand(currentCommand)
      setCurrentCommand("")
    }
  }

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [lines])

  const getLineColor = (type: TerminalLine["type"]) => {
    switch (type) {
      case "command":
        return "text-cyan-400"
      case "output":
        return "text-green-400"
      case "error":
        return "text-red-400"
      case "system":
        return "text-yellow-400"
      default:
        return "text-green-400"
    }
  }

  return (
    <div className="h-full flex flex-col bg-black text-green-400 font-mono text-sm">
      <div className="border-b border-gray-700 p-2 bg-gray-900">
        <div className="flex items-center space-x-2">
          <Terminal className="h-4 w-4" />
          <span className="font-semibold">DNA-Lang Terminal</span>
          <div className="flex-1" />
          <Button size="sm" variant="ghost" className="h-6 text-gray-400 hover:text-white" onClick={() => setLines([])}>
            Clear
          </Button>
        </div>
      </div>

      <div ref={terminalRef} className="flex-1 overflow-auto p-2 space-y-1">
        {lines.map((line) => (
          <div key={line.id} className={getLineColor(line.type)}>
            {line.content}
          </div>
        ))}
        {isRunning && <div className="text-yellow-400 animate-pulse">Processing...</div>}
      </div>

      <div className="border-t border-gray-700 p-2">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <span className="text-cyan-400">$</span>
          <Input
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            placeholder="Enter DNA-Lang command..."
            className="flex-1 bg-transparent border-none text-green-400 placeholder-gray-500 focus:ring-0"
            disabled={isRunning}
          />
          <Button
            type="submit"
            size="sm"
            variant="ghost"
            disabled={isRunning || !currentCommand.trim()}
            className="text-green-400 hover:text-white"
          >
            <Play className="h-3 w-3" />
          </Button>
        </form>
      </div>
    </div>
  )
}
