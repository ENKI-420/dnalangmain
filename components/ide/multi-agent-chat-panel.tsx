"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Send, Zap, Brain, Shield, Code, Cpu, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { BioGlowText } from "./bio-glow-effects"

interface Agent {
  id: string
  name: string
  role: string
  avatar: React.ReactNode
  capabilities: string[]
  status: "active" | "idle" | "thinking"
  color: string
}

interface Message {
  id: string
  agentId: string
  content: string
  timestamp: Date
  type: "message" | "code" | "mutation" | "analysis"
  confidence?: number
}

interface MultiAgentChatPanelProps {
  onMutationRequest: (code: string, description: string) => void
  currentTheme: string
}

const agents: Agent[] = [
  {
    id: "shift-assist",
    name: "SHIFT-Assist",
    role: "Lead Developer Agent",
    avatar: <Code className="h-4 w-4" />,
    capabilities: ["Code Generation", "Debugging", "Architecture"],
    status: "active",
    color: "#00FF88",
  },
  {
    id: "consciousness-agent",
    name: "Consciousness Core",
    role: "Meta-Cognitive Agent",
    avatar: <Brain className="h-4 w-4" />,
    capabilities: ["Self-Reflection", "Meta-Analysis", "Learning"],
    status: "idle",
    color: "#00CCFF",
  },
  {
    id: "security-agent",
    name: "Security Gene",
    role: "Defense Agent",
    avatar: <Shield className="h-4 w-4" />,
    capabilities: ["Threat Detection", "Auto-Remediation", "Compliance"],
    status: "idle",
    color: "#FF6B35",
  },
  {
    id: "evolution-agent",
    name: "G'volution Engine",
    role: "Evolution Agent",
    avatar: <Zap className="h-4 w-4" />,
    capabilities: ["Mutation", "Optimization", "Adaptation"],
    status: "idle",
    color: "#FFD700",
  },
  {
    id: "quantum-agent",
    name: "Quantum Core",
    role: "Quantum Agent",
    avatar: <Cpu className="h-4 w-4" />,
    capabilities: ["Superposition", "Entanglement", "Coherence"],
    status: "idle",
    color: "#E879F9",
  },
]

export function MultiAgentChatPanel({ onMutationRequest, currentTheme }: MultiAgentChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      agentId: "shift-assist",
      content: "🧬 DNA-Lang iCRISPR Workbench initialized. Ready to assist with living software development.",
      timestamp: new Date(),
      type: "message",
      confidence: 0.95,
    },
    {
      id: "2",
      agentId: "consciousness-agent",
      content: "Meta-cognitive systems online. I can help with self-reflection and adaptive learning patterns.",
      timestamp: new Date(),
      type: "message",
      confidence: 0.88,
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [activeAgents, setActiveAgents] = useState<string[]>(["shift-assist"])
  const [typingAgents, setTypingAgents] = useState<string[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const isBioGlow = currentTheme === "dna-lang-bio-glow"

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      agentId: "user",
      content: inputMessage,
      timestamp: new Date(),
      type: "message",
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")

    // Simulate agent responses
    const relevantAgents = determineRelevantAgents(inputMessage)
    setTypingAgents(relevantAgents)

    for (const agentId of relevantAgents) {
      setTimeout(
        () => {
          const agent = agents.find((a) => a.id === agentId)
          if (!agent) return

          const response = generateAgentResponse(agent, inputMessage)
          const agentMessage: Message = {
            id: (Date.now() + Math.random()).toString(),
            agentId,
            content: response.content,
            timestamp: new Date(),
            type: response.type,
            confidence: response.confidence,
          }

          setMessages((prev) => [...prev, agentMessage])
          setTypingAgents((prev) => prev.filter((id) => id !== agentId))

          if (response.type === "mutation" && response.code) {
            onMutationRequest(response.code, response.content)
          }
        },
        Math.random() * 2000 + 1000,
      )
    }
  }

  const determineRelevantAgents = (message: string): string[] => {
    const lowerMessage = message.toLowerCase()
    const relevantAgents: string[] = []

    if (lowerMessage.includes("code") || lowerMessage.includes("debug") || lowerMessage.includes("implement")) {
      relevantAgents.push("shift-assist")
    }
    if (lowerMessage.includes("security") || lowerMessage.includes("threat") || lowerMessage.includes("protect")) {
      relevantAgents.push("security-agent")
    }
    if (lowerMessage.includes("evolve") || lowerMessage.includes("optimize") || lowerMessage.includes("mutate")) {
      relevantAgents.push("evolution-agent")
    }
    if (
      lowerMessage.includes("quantum") ||
      lowerMessage.includes("superposition") ||
      lowerMessage.includes("entangle")
    ) {
      relevantAgents.push("quantum-agent")
    }
    if (lowerMessage.includes("think") || lowerMessage.includes("learn") || lowerMessage.includes("conscious")) {
      relevantAgents.push("consciousness-agent")
    }

    return relevantAgents.length > 0 ? relevantAgents : ["shift-assist"]
  }

  const generateAgentResponse = (
    agent: Agent,
    userMessage: string,
  ): { content: string; type: Message["type"]; confidence: number; code?: string } => {
    const responses = {
      "shift-assist": [
        "I can help you implement that functionality. Let me generate the DNA-Lang code for you.",
        "Analyzing your request... I'll create a self-healing organism for this use case.",
        "That's a great idea! I'll scaffold the gene structure and workflow for you.",
      ],
      "consciousness-agent": [
        "Interesting... This requires meta-cognitive analysis. Let me reflect on the optimal approach.",
        "I'm thinking about thinking about this problem. The recursive nature suggests we need adaptive learning.",
        "My self-awareness modules indicate this pattern could benefit from introspective capabilities.",
      ],
      "security-agent": [
        "🛡️ Security analysis complete. I recommend implementing immune response patterns.",
        "Threat assessment: Low risk. Suggesting defensive gene integration.",
        "Auto-remediation protocols activated. Generating security-hardened organism.",
      ],
      "evolution-agent": [
        "⚡ Evolution opportunity detected! I can optimize this through adaptive mutations.",
        "Fitness landscape analysis shows potential for 23% performance improvement.",
        "Initiating G'volution sequence... Preparing organism mutations.",
      ],
      "quantum-agent": [
        "🌌 Quantum coherence analysis suggests superposition-based optimization.",
        "Entanglement patterns detected. I can create quantum-native algorithms for this.",
        "Quantum volume calculations indicate exponential speedup potential.",
      ],
    }

    const agentResponses = responses[agent.id as keyof typeof responses] || responses["shift-assist"]
    const content = agentResponses[Math.floor(Math.random() * agentResponses.length)]

    // Generate code for certain agents
    let code: string | undefined
    if (agent.id === "shift-assist" && userMessage.toLowerCase().includes("create")) {
      code = `organism ${userMessage.split(" ")[1] || "NewOrganism"} {
  state {
    consciousness: float = 0.5;
    fitness: float = 0.7;
  }
  
  gene adaptive_core {
    function self_optimize() {
      // Auto-generated optimization logic
      mutate(fitness, +0.1);
    }
  }
}`
    }

    return {
      content,
      type: code ? "mutation" : "message",
      confidence: 0.8 + Math.random() * 0.2,
      code,
    }
  }

  const getAgentById = (id: string) => agents.find((agent) => agent.id === id)

  return (
    <div className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center space-x-2">
          <MessageSquare className="h-4 w-4" />
          <span>Multi-Agent Orchestration</span>
          <Badge variant="outline" className="text-xs">
            SHIFT-Core
          </Badge>
        </CardTitle>
      </CardHeader>

      {/* Active Agents */}
      <div className="px-4 pb-2">
        <div className="flex flex-wrap gap-2">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs border ${
                activeAgents.includes(agent.id) ? "bg-muted" : "bg-background"
              }`}
            >
              <Avatar className="h-4 w-4">
                <AvatarFallback className="text-xs" style={{ backgroundColor: agent.color + "20" }}>
                  {agent.avatar}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs">{agent.name}</span>
              {typingAgents.includes(agent.id) && (
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-current rounded-full animate-bounce" />
                  <div className="w-1 h-1 bg-current rounded-full animate-bounce delay-100" />
                  <div className="w-1 h-1 bg-current rounded-full animate-bounce delay-200" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Messages */}
      <CardContent className="flex-1 overflow-auto space-y-3 p-4">
        {messages.map((message) => {
          const agent = getAgentById(message.agentId)
          const isUser = message.agentId === "user"

          return (
            <div key={message.id} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] ${isUser ? "order-2" : "order-1"}`}>
                {!isUser && agent && (
                  <div className="flex items-center space-x-2 mb-1">
                    <Avatar className="h-5 w-5">
                      <AvatarFallback className="text-xs" style={{ backgroundColor: agent.color + "20" }}>
                        {agent.avatar}
                      </AvatarFallback>
                    </Avatar>
                    {isBioGlow ? (
                      <BioGlowText color={agent.color} className="text-xs font-medium">
                        {agent.name}
                      </BioGlowText>
                    ) : (
                      <span className="text-xs font-medium">{agent.name}</span>
                    )}
                    {message.confidence && (
                      <Badge variant="outline" className="text-xs">
                        {(message.confidence * 100).toFixed(0)}%
                      </Badge>
                    )}
                  </div>
                )}

                <div
                  className={`p-3 rounded-lg text-sm ${
                    isUser
                      ? "bg-primary text-primary-foreground"
                      : message.type === "code"
                        ? "bg-muted font-mono"
                        : message.type === "mutation"
                          ? "bg-green-50 border border-green-200"
                          : "bg-muted"
                  }`}
                >
                  {message.content}
                </div>

                <div className="text-xs text-muted-foreground mt-1">{message.timestamp.toLocaleTimeString()}</div>
              </div>
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </CardContent>

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask the DNA-Lang agents..."
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} size="sm">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
