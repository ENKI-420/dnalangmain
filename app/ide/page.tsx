"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Play, StopCircle, Save, Dna, Zap, Code, Terminal, Lightbulb, Settings, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function IDEPage() {
  const [code, setCode] = useState(`organism HelloWorld {
  state {
    message: string = "Hello, DNA-Lang!";
    consciousness: float = 0.1;
  }

  gene greeting {
    function say_hello() {
      quantum_message = quantum_superposition([
        message,
        "Greetings from the future!",
        "Evolution in progress..."
      ]);
      
      result = quantum_measure(quantum_message);
      mutate(consciousness, +0.01);
      
      return result;
    }
  }

  workflow {
    on start() {
      greeting_result = greeting.say_hello();
      express(greeting_result);
    }
  }

  evolution {
    fitness_goal {
      maximize(consciousness);
    }
  }
}`)
  const [output, setOutput] = useState<string[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [isCompiling, setIsCompiling] = useState(false)
  const [evolutionSpeed, setEvolutionSpeed] = useState(50) // 0-100
  const outputRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [output])

  const appendOutput = (message: string, type: "info" | "error" | "success" = "info") => {
    const timestamp = new Date().toLocaleTimeString()
    let prefix = ""
    let colorClass = "text-gray-300"

    if (type === "info") {
      prefix = "[INFO]"
      colorClass = "text-blue-300"
    } else if (type === "error") {
      prefix = "[ERROR]"
      colorClass = "text-red-400"
    } else if (type === "success") {
      prefix = "[SUCCESS]"
      colorClass = "text-green-400"
    }

    setOutput((prev) => [...prev, `<span class="${colorClass}">[${timestamp}] ${prefix} ${message}</span>`])
  }

  const simulateCompilation = async () => {
    setIsCompiling(true)
    appendOutput("Compiling DNA-Lang code...", "info")
    await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate compilation time
    if (Math.random() > 0.1) {
      // 90% success rate
      appendOutput("Compilation successful. Organism ready for execution.", "success")
      setIsCompiling(false)
      return true
    } else {
      appendOutput(
        "Compilation failed: Syntax error in 'gene greeting' block. Check 'quantum_superposition' arguments.",
        "error",
      )
      setIsCompiling(false)
      return false
    }
  }

  const handleRun = async () => {
    if (isRunning) return

    const compiled = await simulateCompilation()
    if (!compiled) {
      toast({
        title: "Compilation Error",
        description: "Please fix the errors in your code before running.",
        variant: "destructive",
      })
      return
    }

    setIsRunning(true)
    setOutput([]) // Clear previous output
    appendOutput("Executing organism...", "info")

    let currentConsciousness = 0.1
    let generation = 0
    const maxGenerations = 10

    const executionInterval = setInterval(
      () => {
        if (!isRunning) {
          clearInterval(executionInterval)
          return
        }

        generation++
        if (generation > maxGenerations) {
          clearInterval(executionInterval)
          setIsRunning(false)
          appendOutput("Organism execution complete. Max generations reached.", "success")
          toast({
            title: "Execution Complete",
            description: "The organism has finished its evolutionary cycle.",
            variant: "default",
          })
          return
        }

        // Simulate organism behavior and evolution
        const messageOptions = [
          "Hello, DNA-Lang!",
          "Greetings from the future!",
          "Evolution in progress...",
          "Quantum state observed.",
          "Self-assessment initiated.",
          "Adapting to environment...",
        ]
        const quantumMessage = messageOptions[Math.floor(Math.random() * messageOptions.length)]
        const measuredResult = quantumMessage // Simplified quantum_measure

        currentConsciousness = Math.min(1.0, currentConsciousness + Math.random() * 0.05 * (evolutionSpeed / 100))
        const fitness = Math.min(1.0, (currentConsciousness + Math.random()) / 2)

        appendOutput(
          `Generation ${generation}: Expressing "${measuredResult}". Consciousness: ${currentConsciousness.toFixed(2)}, Fitness: ${fitness.toFixed(2)}`,
        )

        if (currentConsciousness >= 0.9) {
          appendOutput("Organism achieved high consciousness! Initiating introspection...", "info")
        }
        if (fitness >= 0.9) {
          appendOutput("Organism achieved high fitness! Optimizing genes...", "info")
        }
      },
      1000 - evolutionSpeed * 9,
    ) // Faster with higher speed

    // Store interval ID to clear it later
    ;(window as any).dnaLangExecutionInterval = executionInterval
  }

  const handleStop = () => {
    if ((window as any).dnaLangExecutionInterval) {
      clearInterval((window as any).dnaLangExecutionInterval)
    }
    setIsRunning(false)
    appendOutput("Organism execution stopped.", "info")
    toast({
      title: "Execution Stopped",
      description: "The organism's execution has been halted.",
      variant: "default",
    })
  }

  const handleSave = () => {
    toast({
      title: "Code Saved",
      description: "Your DNA-Lang code has been saved locally.",
      variant: "success",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <Card className="bg-slate-800/70 border-slate-700 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Code className="h-6 w-6" /> DNA-Lang Integrated Development Environment
          </CardTitle>
          <CardDescription className="text-gray-400">
            Write, simulate, and evolve your bio-inspired quantum programs.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Code Editor */}
            <div className="space-y-2">
              <Label htmlFor="dna-code" className="text-gray-300 flex items-center gap-2">
                <Dna className="h-4 w-4 text-green-400" /> DNA-Lang Code
              </Label>
              <Textarea
                id="dna-code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                rows={20}
                className="font-mono text-sm bg-slate-900 border-slate-700 text-white placeholder:text-gray-500"
                spellCheck="false"
              />
              <div className="flex items-center gap-4 mt-4">
                <Label htmlFor="evolution-speed" className="text-gray-300 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-yellow-400" /> Evolution Speed
                </Label>
                <Slider
                  id="evolution-speed"
                  min={0}
                  max={100}
                  step={1}
                  value={[evolutionSpeed]}
                  onValueChange={(val) => setEvolutionSpeed(val[0])}
                  className="w-full max-w-xs"
                />
                <span className="text-sm text-gray-300">{evolutionSpeed}%</span>
              </div>
            </div>

            {/* Console Output */}
            <div className="space-y-2">
              <Label htmlFor="console-output" className="text-gray-300 flex items-center gap-2">
                <Terminal className="h-4 w-4 text-blue-400" /> Console Output
              </Label>
              <div
                id="console-output"
                ref={outputRef}
                className="h-[400px] bg-slate-900 p-4 rounded-md text-xs overflow-y-auto border border-slate-700 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800"
              >
                {output.map((line, index) => (
                  <p key={index} dangerouslySetInnerHTML={{ __html: line }} />
                ))}
              </div>
              <div className="flex gap-2 mt-4">
                <Button
                  onClick={handleRun}
                  disabled={isRunning || isCompiling}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  {isCompiling ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Compiling...
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" /> Run
                    </>
                  )}
                </Button>
                <Button onClick={handleStop} disabled={!isRunning} variant="destructive">
                  <StopCircle className="mr-2 h-4 w-4" /> Stop
                </Button>
                <Button onClick={handleSave} variant="secondary" className="bg-slate-700 hover:bg-slate-600 text-white">
                  <Save className="mr-2 h-4 w-4" /> Save
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Insights / Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card className="bg-slate-900 border-slate-700 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-400">
                  <Lightbulb className="h-5 w-5" /> Quick Insights
                </CardTitle>
                <CardDescription className="text-gray-400">Tips for optimizing your organisms.</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-gray-300 space-y-2">
                <p>• Maximize consciousness by adding `introspection` genes.</p>
                <p>• Improve quantum coherence with `quantum_entangle` operations.</p>
                <p>• Increase fitness through diverse `gene` combinations.</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-900 border-slate-700 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-400">
                  <Settings className="h-5 w-5" /> IDE Settings
                </CardTitle>
                <CardDescription className="text-gray-400">Customize your development environment.</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-gray-300 space-y-2">
                <p>• Theme: Dark (default)</p>
                <p>• Auto-save: Enabled</p>
                <p>• Quantum Debugger: Active</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
