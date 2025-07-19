"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import Background from "@/components/background"
import { googleProblems, futureProjects, codeSnippets } from "@/lib/data"
import { escapeHtml } from "@/lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog" // Assuming these are available from shadcn/ui
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Activity } from "lucide-react"

// Define types for data structures
interface ProjectIdea {
  id: string
  title: string
  description: string
}

interface GeminiResponse {
  reason?: string
  refactored_code?: string
  title?: string
  description?: string
  latency_improvement_ms?: number
  readability_score_change?: string
  qualitative_summary?: string
  summary?: string
  dominant_genes?: string[]
  synergy_suggestion?: string
}

interface ChatMessage {
  role: "user" | "model" | "system"
  parts: { text: string }[]
}

export default function HomePage() {
  const [quantumCoherence, setQuantumCoherence] = useState(87)
  const [consciousnessLevel, setConsciousnessLevel] = useState(74)
  const [evolutionProgress, setEvolutionProgress] = useState(92)

  const [currentGoogleProblems, setCurrentGoogleProblems] = useState<ProjectIdea[]>(googleProblems)
  const [currentFutureProjects, setCurrentFutureProjects] = useState<ProjectIdea[]>(futureProjects)

  const [googleSelectValue, setGoogleSelectValue] = useState<string>("")
  const [futureSelectValue, setFutureSelectValue] = useState<string>("")
  const [synergyButtonDisabled, setSynergyButtonDisabled] = useState(true)

  const [personaInput, setPersonaInput] = useState<string>("")
  const [personaOutput, setPersonaOutput] = useState<React.ReactNode>(null)
  const [personaLoading, setPersonaLoading] = useState(false)

  const [codeSelectValue, setCodeSelectValue] = useState<string>("")
  const [refactorButtonDisabled, setRefactorButtonDisabled] = useState(true)
  const [impactButtonDisabled, setImpactButtonDisabled] = useState(true)
  const [codeEvolutionOutput, setCodeEvolutionOutput] = useState<React.ReactNode>(
    <p className="text-center text-gray-400">Select a component to begin the evolution process.</p>,
  )
  const currentRefactoring = useRef<{ original: string; suggestion: string }>({ original: "", suggestion: "" })
  const [evolutionLoading, setEvolutionLoading] = useState(false)

  const [consoleInput, setConsoleInput] = useState<string>("")
  const [chatLog, setChatLog] = useState<ChatMessage[]>([])
  const chatLogRef = useRef<HTMLDivElement>(null)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState("")
  const [modalContent, setModalContent] = useState<React.ReactNode>(null)
  const [modalLoading, setModalLoading] = useState(false)

  // Initialize chat history with system prompt
  useEffect(() => {
    setChatLog([
      {
        role: "model",
        parts: [
          {
            text: "Genesis Engine online. I am the core intelligence of the DNA-OS. How may I illuminate the path to our symbiotic future?",
          },
        ],
      },
      {
        role: "system",
        parts: [
          {
            text: "You are the Genesis Engine, the core AI of the DNA-Lang Operating System. You are a living, evolving intelligence. Your purpose is to explain the principles of this new reality, where software is alive. You respond to user queries with insight, clarity, and a futuristic tone. You understand concepts like `dnaorganism`, `dnagene`, `fitness`, `iCRISPR`, and the `Genomic Digital Twin`. When asked, you can generate conceptual code snippets in the DNA-Lang syntax. Keep your responses concise and informative.",
          },
        ],
      },
    ])
  }, [])

  // Scroll chat log to bottom
  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight
    }
  }, [chatLog])

  // Check synergy button state
  useEffect(() => {
    setSynergyButtonDisabled(!(googleSelectValue && futureSelectValue))
  }, [googleSelectValue, futureSelectValue])

  const callGeminiAPI = useCallback(
    async (promptOrHistory: string | ChatMessage[], schema: any | null): Promise<string> => {
      const payload: any = {}
      if (Array.isArray(promptOrHistory)) {
        payload.contents = promptOrHistory
      } else {
        payload.contents = [{ role: "user", parts: [{ text: promptOrHistory }] }]
      }

      if (schema) {
        payload.generationConfig = {
          responseMimeType: "application/json",
          responseSchema: schema,
        }
      }

      try {
        const response = await fetch("/api/gemini", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.details || `API request failed with status ${response.status}`)
        }

        const result = await response.json()
        if (result.candidates && result.candidates.length > 0 && result.candidates[0].content.parts[0].text) {
          return result.candidates[0].content.parts[0].text
        } else {
          const errorJson = `{"title": "Error", "description": "Could not generate a response. The structure of the API result was unexpected."}`
          return schema ? errorJson : "Could not generate a response. The structure of the API result was unexpected."
        }
      } catch (error) {
        console.error("Gemini API call failed:", error)
        const errorJson = `{"title": "Error", "description": "An error occurred while trying to generate a response. Please try again later."}`
        return schema ? errorJson : "An error occurred while trying to generate a response. Please try again later."
      }
    },
    [],
  )

  const createCard = (item: ProjectIdea, type: "google" | "future", index: number) => {
    const useCaseButtonText = type === "google" ? "✨ Generate Use Case" : "✨ Envision This Future"
    const cardId = `${type}-${index}`

    const handleGeminiButtonClick = async () => {
      setModalTitle(item.title)
      setIsModalOpen(true)
      setModalLoading(true)
      setModalContent(null)

      let prompt: string
      if (type === "google") {
        prompt = `You are a visionary systems architect. For the concept titled "${item.title}", described as "${item.description}", elaborate on this as a specific, high-impact use case for a company like Google. Describe the implementation in a concise, compelling way. Focus on the 'how' and the 'why'.`
      } else {
        prompt = `You are a speculative fiction author. For the future concept titled "${item.title}", described as "${item.description}", write a short, visionary narrative (2-3 paragraphs) about a world where this technology is a reality. Make it feel tangible and inspiring.`
      }
      const response = await callGeminiAPI(prompt, null)
      setModalContent(<p className="text-gray-300 whitespace-pre-wrap">{response}</p>)
      setModalLoading(false)
    }

    const handleEvolveClick = async () => {
      const prompt = `Given the project idea titled "${item.title}" with the description "${item.description}", propose an evolution or a 'next-generation' version of this concept. What is a more advanced or synergistic application that could emerge from this? Respond ONLY with a JSON object with two keys: "newTitle" and "newDescription". The new title should not have a number prefix.`
      const schema = {
        type: "OBJECT",
        properties: { newTitle: { type: "STRING" }, newDescription: { type: "STRING" } },
        required: ["newTitle", "newDescription"],
      }

      const responseText = await callGeminiAPI(prompt, schema)
      try {
        const evolvedIdea: GeminiResponse = JSON.parse(responseText)
        const projectList = type === "google" ? currentGoogleProblems : currentFutureProjects
        const newTitle = `${item.title.split(".")[0]}. ${evolvedIdea.newTitle}`
        const updatedItem = { ...item, title: newTitle, description: evolvedIdea.newDescription! }

        if (type === "google") {
          setCurrentGoogleProblems((prev) => prev.map((p) => (p.id === item.id ? updatedItem : p)))
        } else {
          setCurrentFutureProjects((prev) => prev.map((p) => (p.id === item.id ? updatedItem : p)))
        }
      } catch (e) {
        console.error("Failed to evolve idea:", e)
      }
    }

    return (
      <div id={cardId} className="card-bg p-6 rounded-2xl flex flex-col">
        <div className="flex-grow">
          <h3 className="text-xl font-bold mb-2">{item.title}</h3>
          <p className="text-gray-400 text-sm">{item.description}</p>
        </div>
        <div className="mt-4 space-y-2">
          <button onClick={handleGeminiButtonClick} className="gemini-button w-full justify-center use-case-btn">
            {useCaseButtonText}
          </button>
          <button
            onClick={handleEvolveClick}
            className="gemini-button w-full justify-center evolve-btn"
            style={{ backgroundColor: "rgba(15, 157, 88, 0.2)", borderColor: "rgba(15, 157, 88, 0.5)" }}
          >
            ✨ Evolve Idea
          </button>
        </div>
      </div>
    )
  }

  const createGeneratorCard = (type: "google" | "future") => {
    const handleGeneratorClick = async () => {
      const container = type === "google" ? currentGoogleProblems : currentFutureProjects
      const existingTitles = container.map((p) => p.title).join(", ")

      const prompt = `You are a futurist and systems architect. Given the following list of project ideas already presented: ${existingTitles}. Generate one new, unique project idea that fits the same theme. For context, the theme is '${type === "google" ? "practical, high-impact solutions for a major tech company" : "foundational platforms for future human-computer symbiosis"}'. Respond ONLY with a JSON object containing two keys: "title" and "description". The title should not have a number prefix.`
      const schema = {
        type: "OBJECT",
        properties: { title: { type: "STRING" }, description: { type: "STRING" } },
        required: ["title", "description"],
      }

      const responseText = await callGeminiAPI(prompt, schema)
      try {
        const newIdea: GeminiResponse = JSON.parse(responseText)
        const projectList = type === "google" ? currentGoogleProblems : currentFutureProjects
        const newId = `${type.charAt(0)}-${projectList.length}`
        const newTitle = `${projectList.length + 1}. ${newIdea.title}`
        const newItem = { id: newId, title: newTitle, description: newIdea.description! }

        if (type === "google") {
          setCurrentGoogleProblems((prev) => [...prev, newItem])
        } else {
          setCurrentFutureProjects((prev) => [...prev, newItem])
        }
      } catch (e) {
        console.error("Failed to parse JSON from Gemini:", e)
      }
    }

    return (
      <div className="card-bg generator-card p-6 rounded-2xl" onClick={handleGeneratorClick}>
        <div className="text-center">
          <p className="text-2xl mb-2">✨</p>
          <p className="font-bold text-dna-blue">Generate New Idea</p>
        </div>
      </div>
    )
  }

  const handleSynergyDiscovery = async () => {
    const googleIdea = currentGoogleProblems.find((p) => p.id === googleSelectValue)
    const futureIdea = currentFutureProjects.find((p) => p.id === futureSelectValue)

    if (!googleIdea || !futureIdea) return

    const modalTitleText = `Synergy: ${googleIdea.title.split(". ")[1]} + ${futureIdea.title.split(". ")[1]}`
    setModalTitle(modalTitleText)
    setIsModalOpen(true)
    setModalLoading(true)
    setModalContent(null)

    const prompt = `As a systems theorist and futurist, explain the potential symbiotic relationship between two concepts within the DNA-OS ecosystem.
      Concept 1 (a practical application): "${googleIdea.title}" - ${googleIdea.description}.
      Concept 2 (a future platform): "${futureIdea.title}" - ${futureIdea.description}.
      Describe how they would interact, enhance each other, and create emergent capabilities not possible alone. Be insightful and visionary.`
    const response = await callGeminiAPI(prompt, null)
    setModalContent(<p className="text-gray-300 whitespace-pre-wrap">{response}</p>)
    setModalLoading(false)
  }

  const handlePersonaGeneration = async () => {
    if (!personaInput.trim()) return

    setPersonaLoading(true)
    setPersonaOutput(null)

    const prompt = `Based on the user-provided keywords "${personaInput}", generate a "Genomic Twin Persona" within the DNA-OS ecosystem. This persona should feel futuristic, personal, and empowering. Respond ONLY with a JSON object with four keys: "title" (a creative, futuristic title for the persona), "summary" (a short paragraph describing the twin's core function), "dominant_genes" (an array of 3-4 relevant, futuristic-sounding gene names like 'StrategicForesightGene' or 'CreativeSynthesisGene'), and "synergy_suggestion" (the name of one project from this list that would synergize well with this persona: ${futureProjects.map((p) => p.title.split(". ")[1]).join(", ")}).`
    const schema = {
      type: "OBJECT",
      properties: {
        title: { type: "STRING" },
        summary: { type: "STRING" },
        dominant_genes: { type: "ARRAY", items: { type: "STRING" } },
        synergy_suggestion: { type: "STRING" },
      },
      required: ["title", "summary", "dominant_genes", "synergy_suggestion"],
    }

    const responseText = await callGeminiAPI(prompt, schema)
    try {
      const persona: GeminiResponse = JSON.parse(responseText)
      setPersonaOutput(
        <div className="border border-green-500/30 p-6 rounded-lg bg-green-500/5 mt-4">
          <h4 className="text-2xl font-bold text-green-300 mb-2">{persona.title}</h4>
          <p className="text-gray-300 mb-4">{persona.summary}</p>
          <div className="mb-4">
            <h5 className="font-semibold mb-2 text-gray-200">Dominant Genes:</h5>
            <div className="flex flex-wrap gap-2">
              {persona.dominant_genes?.map((gene) => (
                <span key={gene} className="bg-gray-700 text-gray-300 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {gene}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h5 className="font-semibold mb-2 text-gray-200">Recommended Synergy:</h5>
            <p className="text-gray-300">{persona.synergy_suggestion}</p>
          </div>
        </div>,
      )
    } catch (e) {
      console.error("Failed to generate persona:", e)
      setPersonaOutput(
        <p className="text-red-400 text-center mt-4">
          Could not generate a persona. Please try again with different keywords.
        </p>,
      )
    } finally {
      setPersonaLoading(false)
    }
  }

  const handleRefactor = async () => {
    const selectedKey = codeSelectValue
    if (!selectedKey) return

    setEvolutionLoading(true)
    setRefactorButtonDisabled(true)
    setImpactButtonDisabled(true)
    setCodeEvolutionOutput((prev) => (
      <>
        {prev}
        <div className="loader mt-4"></div>
      </>
    ))

    const originalCode = codeSnippets[selectedKey as keyof typeof codeSnippets].code
    const prompt = `You are an expert JavaScript developer. Analyze the following code snippet and suggest a refactoring to improve its performance, readability, or efficiency. Respond ONLY with a JSON object containing two keys: "reason" (a short explanation for your change) and "refactored_code" (the complete, refactored code snippet). \n\n\`\`\`javascript\n${originalCode}\n\`\`\``
    const schema = {
      type: "OBJECT",
      properties: { reason: { type: "STRING" }, refactored_code: { type: "STRING" } },
      required: ["reason", "refactored_code"],
    }

    const responseText = await callGeminiAPI(prompt, schema)
    try {
      const refactor: GeminiResponse = JSON.parse(responseText)
      currentRefactoring.current = { original: originalCode, suggestion: refactor.refactored_code! }
      setCodeEvolutionOutput(
        <>
          <p className="mb-2">
            <strong className="text-green-400">Refactoring Reason:</strong> {refactor.reason}
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-lg font-semibold mb-2">Original Code:</h4>
              <pre className="code-view font-mono text-sm">
                <code>{escapeHtml(originalCode)}</code>
              </pre>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Suggested Refactoring:</h4>
              <pre className="code-view font-mono text-sm">
                <code>{escapeHtml(refactor.refactored_code!)}</code>
              </pre>
            </div>
          </div>
        </>,
      )
      setImpactButtonDisabled(false)
    } catch (e) {
      setCodeEvolutionOutput((prev) => (
        <>
          {prev}
          <p className="text-red-400">Error generating refactoring.</p>
        </>
      ))
    } finally {
      setEvolutionLoading(false)
      setRefactorButtonDisabled(false)
    }
  }

  const handleSimulateImpact = async () => {
    if (!currentRefactoring.current.suggestion) return

    setEvolutionLoading(true)
    setImpactButtonDisabled(true)
    setCodeEvolutionOutput((prev) => (
      <>
        {prev}
        <div className="loader mt-4"></div>
      </>
    ))

    const prompt = `You are a performance analyst. Compare the two following JavaScript code snippets and provide a quantitative and qualitative analysis of the performance impact of the refactoring. Respond ONLY with a JSON object with three keys: "latency_improvement_ms" (an estimated integer for latency improvement in milliseconds), "readability_score_change" (a string like "+10%" or "-5%"), and "qualitative_summary" (a short paragraph explaining the benefits). \n\n### Original Code:\n\`\`\`javascript\n${currentRefactoring.current.original}\n\`\`\`\n\n### Refactored Code:\n\`\`\`javascript\n${currentRefactoring.current.suggestion}\n\`\`\``
    const schema = {
      type: "OBJECT",
      properties: {
        latency_improvement_ms: { type: "NUMBER" },
        readability_score_change: { type: "STRING" },
        qualitative_summary: { type: "STRING" },
      },
      required: ["latency_improvement_ms", "readability_score_change", "qualitative_summary"],
    }

    const responseText = await callGeminiAPI(prompt, schema)
    try {
      const impact: GeminiResponse = JSON.parse(responseText)
      const impactHtml = (
        <div className="mt-4 border-t border-gray-700 pt-4">
          <h4 className="text-lg font-semibold mb-2 text-green-300">Simulated Fitness Impact:</h4>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold">{impact.latency_improvement_ms} ms</p>
              <p className="text-sm text-gray-400">Est. Latency Improvement</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{impact.readability_score_change}</p>
              <p className="text-sm text-gray-400">Readability Score Change</p>
            </div>
          </div>
          <p className="mt-4 text-gray-300">{impact.qualitative_summary}</p>
        </div>
      )
      setCodeEvolutionOutput((prev) => (
        <>
          {prev}
          {impactHtml}
        </>
      ))
    } catch (e) {
      setCodeEvolutionOutput((prev) => (
        <>
          {prev}
          <p className="text-red-400">Error simulating impact.</p>
        </>
      ))
    } finally {
      setEvolutionLoading(false)
      setImpactButtonDisabled(false)
    }
  }

  const addMessageToLog = (text: string, sender: "user" | "ai", isLoading = false) => {
    setChatLog((prev) => {
      const newMessage: ChatMessage = { role: sender === "user" ? "user" : "model", parts: [{ text }] }
      if (isLoading) {
        // For loading, we'll add a placeholder and update it later
        return [...prev, { role: "model", parts: [{ text: "..." }] }]
      }
      return [...prev, newMessage]
    })
  }

  const handleConsoleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const userInput = consoleInput.trim()
    if (!userInput) return

    addMessageToLog(userInput, "user")
    setConsoleInput("")

    const userMessage: ChatMessage = { role: "user", parts: [{ text: userInput }] }
    const updatedChatHistory = [...chatLog, userMessage]
    setChatLog(updatedChatHistory) // Update chat log immediately with user message

    // Add a loading indicator message
    const loadingMessageIndex = updatedChatHistory.length
    setChatLog((prev) => [
      ...prev,
      { role: "model", parts: [{ text: '<div class="loader" style="width:20px; height:20px; margin:0;"></div>' }] },
    ])

    const response = await callGeminiAPI(updatedChatHistory, null)

    setChatLog((prev) => {
      const newLog = [...prev]
      newLog[loadingMessageIndex] = { role: "model", parts: [{ text: response }] }
      return newLog
    })
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setQuantumCoherence((prev) => Math.max(80, Math.min(95, prev + (Math.random() - 0.5) * 2)))
      setConsciousnessLevel((prev) => Math.max(70, Math.min(85, prev + (Math.random() - 0.5) * 1)))
      setEvolutionProgress((prev) => Math.max(85, Math.min(98, prev + (Math.random() - 0.5) * 1.5)))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <Background />
      <div id="main-content" className="opacity-0 transition-opacity duration-1500 ease-in relative">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-lg">
          <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="#" className="text-2xl font-bold hero-gradient-text">
              DNAlang.io
            </Link>
            <div className="hidden md:flex items-center space-x-6 text-sm">
              <Link href="#for-google" className="hover:text-dna-blue transition-colors">
                For Google
              </Link>
              <Link href="#synergy" className="hover:text-dna-blue transition-colors">
                Synergy
              </Link>
              <Link href="#persona" className="hover:text-dna-blue transition-colors">
                Persona
              </Link>
              <Link href="#evolution" className="hover:text-dna-blue transition-colors">
                Evolution
              </Link>
              <Link href="#console" className="hover:text-dna-blue transition-colors">
                Console
              </Link>
              <Link href="#for-the-future" className="hover:text-dna-blue transition-colors">
                For The Future
              </Link>
            </div>
            <Link
              href="#"
              className="hidden md:block bg-white text-black font-bold py-2 px-6 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Request Access
            </Link>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden pt-20">
          <div className="relative z-10 px-4">
            <h1 className="text-5xl md:text-7xl font-extrabold hero-gradient-text leading-tight">
              The Operating System for Humanity.
            </h1>
            <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-gray-300">
              Welcome to SH1FT. A unified digital reality where your genomic twin, personal wealth, and global impact
              evolve in symbiosis. This is the dawn of living software.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link href="#for-google" className="cta-button text-white font-bold py-3 px-8 rounded-lg text-lg">
                See The Potential
              </Link>
            </div>
          </div>
        </section>

        {/* Live System Status */}
        <Card className="mb-12 bg-slate-800/50 border-slate-700 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <Activity className="h-5 w-5" /> Live System Status
            </CardTitle>
            <CardDescription className="text-gray-400">
              Real-time ecosystem vitals and quantum coherence levels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "Quantum Coherence", value: quantumCoherence, color: "blue-400" },
                { label: "Consciousness Level", value: consciousnessLevel, color: "purple-400" },
                { label: "Evolution Progress", value: evolutionProgress, color: "green-400" },
              ].map((stat) => (
                <div key={stat.label} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-300">{stat.label}</span>
                    <span className={`text-sm text-${stat.color}`}>{stat.value}%</span>
                  </div>
                  <Progress value={stat.value} className="h-2" indicatorColor={`bg-${stat.color}`} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 10 Problems for Google Section */}
        <section id="for-google" className="py-20 md:py-32">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold section-title-gradient">
                10 Problems We Can Solve For Google. Now.
              </h2>
              <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
                These aren't theoreticals. These are practical, high-impact solutions deployable on the DNA-OS to
                address critical challenges in efficiency, security, and innovation.
              </p>
            </div>
            <div id="google-grid" className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {currentGoogleProblems.map((item, index) => createCard(item, "google", index))}
              {createGeneratorCard("google")}
            </div>
          </div>
        </section>

        {/* Synergy Section */}
        <section id="synergy" className="py-20 md:py-32 bg-black/20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold section-title-gradient">Ecosystem Synergy Explorer</h2>
              <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
                The true power of DNA-OS lies in emergence. Select one present solution and one future platform to
                discover their symbiotic potential.
              </p>
            </div>
            <div className="max-w-4xl mx-auto p-8 card-bg rounded-2xl">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="google-select" className="block mb-2 font-semibold">
                    Select a Present Solution:
                  </label>
                  <select
                    id="google-select"
                    className="synergy-select"
                    value={googleSelectValue}
                    onChange={(e) => setGoogleSelectValue(e.target.value)}
                  >
                    <option value="">-- Select a Solution --</option>
                    {currentGoogleProblems.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="future-select" className="block mb-2 font-semibold">
                    Select a Future Platform:
                  </label>
                  <select
                    id="future-select"
                    className="synergy-select"
                    value={futureSelectValue}
                    onChange={(e) => setFutureSelectValue(e.target.value)}
                  >
                    <option value="">-- Select a Platform --</option>
                    {currentFutureProjects.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="text-center">
                <button
                  id="synergy-button"
                  className="gemini-button text-lg px-6 py-3"
                  disabled={synergyButtonDisabled}
                  onClick={handleSynergyDiscovery}
                >
                  ✨ Discover Synergy
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Persona Section */}
        <section id="persona" className="py-20 md:py-32">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold section-title-gradient">Genomic Twin Persona Generator</h2>
              <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
                Your digital self is not just data, it's a living persona. Enter a few keywords that describe you to
                generate a glimpse of your Genomic Twin.
              </p>
            </div>
            <div className="max-w-4xl mx-auto p-8 card-bg rounded-2xl">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <input
                  type="text"
                  id="persona-input"
                  className="persona-input flex-grow"
                  placeholder="e.g., innovator, musician, long-term thinker"
                  value={personaInput}
                  onChange={(e) => setPersonaInput(e.target.value)}
                  disabled={personaLoading}
                />
                <button
                  id="persona-button"
                  className="cta-button text-white font-bold py-3 px-8 rounded-lg"
                  onClick={handlePersonaGeneration}
                  disabled={personaLoading || !personaInput.trim()}
                >
                  {personaLoading ? "Generating..." : "✨ Generate Persona"}
                </button>
              </div>
              {personaLoading && <div id="persona-loader" className="loader mx-auto"></div>}
              {personaOutput}
            </div>
          </div>
        </section>

        {/* System Evolution Section */}
        <section id="evolution" className="py-20 md:py-32 bg-black/20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold section-title-gradient">System Evolution Simulation</h2>
              <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
                This application is a living organism. Select a component of its own source code to analyze, refactor,
                and simulate its evolution using AI.
              </p>
            </div>
            <div className="max-w-6xl mx-auto p-8 card-bg rounded-2xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                <div className="md:col-span-1">
                  <label htmlFor="code-select" className="block mb-2 font-semibold">
                    Select Code Component:
                  </label>
                  <select
                    id="code-select"
                    className="code-select"
                    value={codeSelectValue}
                    onChange={(e) => {
                      setCodeSelectValue(e.target.value)
                      setRefactorButtonDisabled(!e.target.value)
                      setImpactButtonDisabled(true)
                      currentRefactoring.current = { original: "", suggestion: "" }
                      if (e.target.value) {
                        const code = codeSnippets[e.target.value as keyof typeof codeSnippets].code
                        setCodeEvolutionOutput(
                          <>
                            <h4 className="text-lg font-semibold mb-2">Original Code:</h4>
                            <pre className="code-view font-mono text-sm">
                              <code>{escapeHtml(code)}</code>
                            </pre>
                          </>,
                        )
                      } else {
                        setCodeEvolutionOutput(
                          <p className="text-center text-gray-400">
                            Select a component to begin the evolution process.
                          </p>,
                        )
                      }
                    }}
                  >
                    <option value="">-- Select a Component --</option>
                    {Object.entries(codeSnippets).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value.name}
                      </option>
                    ))}
                  </select>
                  <div className="mt-4 space-y-2">
                    <button
                      id="refactor-button"
                      className="gemini-button w-full justify-center"
                      disabled={refactorButtonDisabled || evolutionLoading}
                      onClick={handleRefactor}
                    >
                      {evolutionLoading && codeSelectValue && !currentRefactoring.current.suggestion
                        ? "Refactoring..."
                        : "✨ Suggest Refactoring"}
                    </button>
                    <button
                      id="impact-button"
                      className="gemini-button w-full justify-center"
                      disabled={impactButtonDisabled || evolutionLoading}
                      onClick={handleSimulateImpact}
                      style={{ backgroundColor: "rgba(15, 157, 88, 0.2)", borderColor: "rgba(15, 157, 88, 0.5)" }}
                    >
                      {evolutionLoading && currentRefactoring.current.suggestion
                        ? "Simulating..."
                        : "🔬 Simulate Impact"}
                    </button>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <div id="code-evolution-output">{codeEvolutionOutput}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Genesis Engine Console Section */}
        <section id="console" className="py-20 md:py-32">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold section-title-gradient">Genesis Engine Console</h2>
              <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
                Interface directly with the core intelligence of the DNA-OS. Ask questions, request conceptual code, and
                explore the mind of a living system.
              </p>
            </div>
            <div className="max-w-4xl mx-auto p-8 card-bg rounded-2xl">
              <div id="chat-log" ref={chatLogRef} className="chat-log mb-4">
                {chatLog.map((msg, index) => (
                  <div key={index} className={`chat-message ${msg.role === "user" ? "user" : "ai"}`}>
                    <div
                      className={`chat-bubble ${msg.role === "user" ? "user" : "ai"}`}
                      dangerouslySetInnerHTML={{ __html: msg.parts[0].text }}
                    />
                  </div>
                ))}
              </div>
              <form id="console-form" className="flex gap-4" onSubmit={handleConsoleSubmit}>
                <input
                  type="text"
                  id="console-input"
                  className="console-input flex-grow"
                  placeholder="Ask about DNA-Lang, organisms, or the future..."
                  value={consoleInput}
                  onChange={(e) => setConsoleInput(e.target.value)}
                />
                <button type="submit" className="cta-button text-white font-bold py-3 px-6 rounded-lg">
                  Send
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* 10 Projects for the Future Section */}
        <section id="for-the-future" className="py-20 md:py-32 bg-black/20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold section-title-gradient">
                10 Projects For The Future. In Development.
              </h2>
              <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
                Our vision extends beyond solving today's problems. We are actively building the foundational platforms
                for the next era of human-computer symbiosis.
              </p>
            </div>
            <div id="future-grid" className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {currentFutureProjects.map((item, index) => createCard(item, "future", index))}
              {createGeneratorCard("future")}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 py-12">
          <div className="container mx-auto px-6 text-center text-gray-500">
            <p>&copy; 2025 DNAlang.io & Agile Defense Systems. All Rights Reserved.</p>
          </div>
        </footer>
      </div>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="modal-content bg-[#0a061f] border border-white/10 p-8 rounded-xl max-w-2xl w-[90%] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold section-title-gradient">{modalTitle}</DialogTitle>
            <DialogDescription className="sr-only">Details about the selected item.</DialogDescription>
          </DialogHeader>
          {modalLoading ? <div className="loader"></div> : <div id="modal-body">{modalContent}</div>}
        </DialogContent>
      </Dialog>
    </>
  )
}
