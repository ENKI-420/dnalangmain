"use client"

import { useState } from "react"
import { ChevronRight, ChevronDown, File, Plus, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FileNode {
  id: string
  name: string
  type: "file" | "folder"
  path: string
  children?: FileNode[]
  content?: string
}

interface IDEFile {
  id: string
  name: string
  path: string
  content: string
  language: string
  modified: boolean
}

interface FileExplorerProps {
  onFileSelect: (file: IDEFile) => void
}

const sampleFileTree: FileNode[] = [
  {
    id: "root",
    name: "DNA-Lang Project",
    type: "folder",
    path: "/",
    children: [
      {
        id: "organisms",
        name: "organisms",
        type: "folder",
        path: "/organisms",
        children: [
          {
            id: "sample_organism",
            name: "sample_organism.dna",
            type: "file",
            path: "/organisms/sample_organism.dna",
            content: "organism SampleOrganism { ... }",
          },
          {
            id: "neural_network",
            name: "neural_network.dna",
            type: "file",
            path: "/organisms/neural_network.dna",
            content: "organism NeuralNetwork { ... }",
          },
          {
            id: "quantum_processor",
            name: "quantum_processor.dna",
            type: "file",
            path: "/organisms/quantum_processor.dna",
            content: "organism QuantumProcessor { ... }",
          },
        ],
      },
      {
        id: "genes",
        name: "genes",
        type: "folder",
        path: "/genes",
        children: [
          {
            id: "consciousness_core",
            name: "consciousness_core.gene",
            type: "file",
            path: "/genes/consciousness_core.gene",
            content: "gene consciousness_core { ... }",
          },
          {
            id: "neural_processor",
            name: "neural_processor.gene",
            type: "file",
            path: "/genes/neural_processor.gene",
            content: "gene neural_processor { ... }",
          },
        ],
      },
      {
        id: "templates",
        name: "templates",
        type: "folder",
        path: "/templates",
        children: [
          {
            id: "basic_organism",
            name: "basic_organism.template",
            type: "file",
            path: "/templates/basic_organism.template",
            content: "template BasicOrganism { ... }",
          },
        ],
      },
      {
        id: "config",
        name: "dna.config.json",
        type: "file",
        path: "/dna.config.json",
        content: '{ "version": "1.0", "evolution": { "enabled": true } }',
      },
      {
        id: "readme",
        name: "README.md",
        type: "file",
        path: "/README.md",
        content: "# DNA-Lang Project\n\nThis is a DNA-Lang project...",
      },
    ],
  },
]

export function FileExplorer({ onFileSelect }: FileExplorerProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(["root", "organisms"]))
  const [selectedFile, setSelectedFile] = useState<string | null>(null)

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders)
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId)
    } else {
      newExpanded.add(folderId)
    }
    setExpandedFolders(newExpanded)
  }

  const handleFileClick = (node: FileNode) => {
    if (node.type === "file") {
      setSelectedFile(node.id)

      const language = node.name.endsWith(".dna")
        ? "dna-lang"
        : node.name.endsWith(".gene")
          ? "dna-lang"
          : node.name.endsWith(".json")
            ? "json"
            : "markdown"

      onFileSelect({
        id: node.id,
        name: node.name,
        path: node.path,
        content: node.content || "",
        language,
        modified: false,
      })
    }
  }

  const getFileIcon = (node: FileNode) => {
    if (node.type === "folder") {
      return expandedFolders.has(node.id) ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
    }

    if (node.name.endsWith(".dna")) {
      return (
        <div className="h-4 w-4 rounded bg-purple-500 text-white text-xs flex items-center justify-center font-bold">
          D
        </div>
      )
    }
    if (node.name.endsWith(".gene")) {
      return (
        <div className="h-4 w-4 rounded bg-green-500 text-white text-xs flex items-center justify-center font-bold">
          G
        </div>
      )
    }

    return <File className="h-4 w-4" />
  }

  const renderNode = (node: FileNode, depth = 0) => (
    <div key={node.id}>
      <div
        className={cn(
          "flex items-center space-x-2 py-1 px-2 hover:bg-muted/50 cursor-pointer text-sm",
          selectedFile === node.id && "bg-muted",
          node.type === "folder" && "font-medium",
        )}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        onClick={() => {
          if (node.type === "folder") {
            toggleFolder(node.id)
          } else {
            handleFileClick(node)
          }
        }}
      >
        {getFileIcon(node)}
        <span className="flex-1 truncate">{node.name}</span>
      </div>

      {node.type === "folder" && expandedFolders.has(node.id) && node.children && (
        <div>{node.children.map((child) => renderNode(child, depth + 1))}</div>
      )}
    </div>
  )

  return (
    <div className="h-full flex flex-col">
      <div className="p-2 border-b">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-sm">Explorer</h3>
          <div className="flex space-x-1">
            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
              <Plus className="h-3 w-3" />
            </Button>
            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
              <Edit className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">{sampleFileTree.map((node) => renderNode(node))}</div>
    </div>
  )
}
