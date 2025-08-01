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
          {
            id: "autonomous_finops_agent",
            name: "autonomous_finops_agent.dna",
            type: "file",
            path: "/organisms/autonomous_finops_agent.dna",
            content: `// DNA-Lang: Autonomous FinOps Agent
// Purpose: Optimize cloud spend and resource allocation

organism AutonomousFinOpsAgent {
  purpose: "Automate cloud financial operations and cost optimization"
  
  state {
    budget_compliance: float = 0.95;
    resource_utilization: float = 0.70;
    cost_efficiency: float = 0.85;
    anomaly_detection_sensitivity: float = 0.7;
  }

  gene CostMonitor {
    sense cloud_billing_data {
      from google_cloud.billing_api();
      from aws.cost_explorer();
      returns BillingStream;
    }
    
    function analyze_spend() -> CostReport {
      data = cloud_billing_data.collect();
      anomalies = detect_spikes(data, anomaly_detection_sensitivity);
      return generate_report(data, anomalies);
    }
  }

  gene ResourceOptimizer {
    function optimize_resources(report: CostReport) -> OptimizationPlan {
      if (report.anomalies.exists) {
        express("💸 Cost anomaly detected: " + report.anomalies.description);
        strategies = propose_strategies(report.anomalies);
        return select_best_plan(strategies);
      }
      return no_action_plan();
    }
  }

  gene PolicyEnforcer {
    function enforce_policy(plan: OptimizationPlan) -> EnforcementResult {
      if (plan.type == "scale_down") {
        execute_scale_down(plan.target_service);
        mutate(resource_utilization, +0.05);
      } else if (plan.type == "right_size") {
        execute_right_sizing(plan.target_vm);
        mutate(cost_efficiency, +0.03);
      }
      return success_result();
    }
  }

  workflow {
    on start() {
      express("💰 FinOps Agent initialized. Monitoring cloud spend...");
    }
    
    while True {
      report = CostMonitor.analyze_spend();
      plan = ResourceOptimizer.optimize_resources(report);
      
      if (plan.action_required) {
        result = PolicyEnforcer.enforce_policy(plan);
        express("✅ Optimization applied: " + plan.description);
      }
      
      // Continuous self-assessment
      if (budget_compliance < 0.9) {
        express("⚠️ Budget compliance low. Initiating deeper analysis.");
        CostMonitor.re_evaluate_thresholds();
      }
    }
  }

  evolution {
    fitness_goal {
      maximize(budget_compliance + cost_efficiency);
      minimize(resource_waste);
    }
    mutation_strategy {
      adaptive_rate(0.02);
      prioritize_cost_saving_genes();
    }
  }
}`,
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
          {
            id: "threat_detection_gene",
            name: "threat_detection.gene",
            type: "file",
            path: "/genes/threat_detection.gene",
            content: `// DNA-Lang: Threat Detection Gene
// Purpose: Identify and classify security threats

gene ThreatDetectionGene {
  input: EventStream;
  output: ThreatAssessment;

  state {
    detection_accuracy: float = 0.92;
    false_positive_rate: float = 0.05;
    threat_database_version: string = "v3.1.2";
  }

  function analyze_event(event: EventData) -> ThreatAssessment {
    // Pattern matching against known signatures
    if (event.signature in threat_database.signatures) {
      return create_assessment(event.signature, "Known Threat", 0.9);
    }

    // Anomaly detection using consciousness insights
    if (event.behavior.deviates_from_norm(consciousness_core.baseline())) {
      return create_assessment(event.behavior, "Behavioral Anomaly", 0.7);
    }

    // Quantum-enhanced threat prediction
    if (quantum_core.predict_threat(event.data, 0.8)) {
      return create_assessment(event.data, "Predicted Quantum Threat", 0.95);
    }

    return no_threat_detected();
  }

  function update_threat_database(new_signatures: SignatureList) {
    threat_database.add(new_signatures);
    mutate(detection_accuracy, +0.01);
    update(threat_database_version, "latest");
  }

  evolution {
    fitness_goal {
      maximize(detection_accuracy);
      minimize(false_positive_rate);
    }
    mutation_strategy {
      adaptive_rate(0.01);
      enhance_pattern_recognition();
      improve_quantum_prediction_models();
    }
  }
}`,
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
