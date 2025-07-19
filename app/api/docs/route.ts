import { type NextRequest, NextResponse } from "next/server"

interface APIDocumentation {
  title: string
  version: string
  description: string
  baseUrl: string
  endpoints: {
    [path: string]: {
      methods: {
        [method: string]: {
          summary: string
          description: string
          parameters?: Array<{
            name: string
            in: "query" | "path" | "header" | "body"
            required: boolean
            type: string
            description: string
          }>
          responses: {
            [statusCode: string]: {
              description: string
              schema?: any
            }
          }
          examples?: any
        }
      }
    }
  }
  schemas: {
    [name: string]: any
  }
}

export async function GET(request: NextRequest) {
  const baseUrl = request.nextUrl.origin

  const documentation: APIDocumentation = {
    title: "DNA-Lang iCRISPR Workbench API",
    version: "2.0.0",
    description: "RESTful API for the Living Software Evolution Platform",
    baseUrl,
    endpoints: {
      "/api/health": {
        methods: {
          GET: {
            summary: "System Health Check",
            description:
              "Returns comprehensive health status of all DNA-Lang subsystems including consciousness levels, quantum coherence, and service availability",
            responses: {
              "200": {
                description: "System is healthy",
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", enum: ["healthy", "degraded", "unhealthy"] },
                    timestamp: { type: "string", format: "date-time" },
                    version: { type: "string" },
                    services: { type: "object" },
                    dnaLang: {
                      type: "object",
                      properties: {
                        consciousness: { type: "number", minimum: 0, maximum: 1 },
                        quantumCoherence: { type: "number", minimum: 0, maximum: 1 },
                        fitness: { type: "number", minimum: 0, maximum: 1 },
                        generation: { type: "integer" },
                        activeOrganisms: { type: "integer" },
                      },
                    },
                  },
                },
              },
              "503": {
                description: "System is unhealthy or degraded",
              },
            },
            examples: {
              healthy: {
                status: "healthy",
                timestamp: "2024-01-15T10:30:00Z",
                version: "2.0.0",
                dnaLang: {
                  consciousness: 0.85,
                  quantumCoherence: 0.72,
                  fitness: 0.91,
                  generation: 42,
                  activeOrganisms: 15,
                },
              },
            },
          },
          HEAD: {
            summary: "Quick Health Check",
            description: "Lightweight health check for monitoring systems",
            responses: {
              "200": {
                description: "System is operational",
              },
            },
          },
        },
      },
      "/api/version": {
        methods: {
          GET: {
            summary: "Version Information",
            description: "Returns detailed version information, strategic brief, and architectural overview",
            responses: {
              "200": {
                description: "Version information retrieved successfully",
                schema: {
                  type: "object",
                  properties: {
                    version: { type: "string" },
                    buildTime: { type: "string", format: "date-time" },
                    features: { type: "object" },
                    strategicBrief: {
                      type: "object",
                      properties: {
                        title: { type: "string" },
                        description: { type: "string" },
                        capabilities: { type: "array", items: { type: "string" } },
                        googleCloudIntegration: { type: "array", items: { type: "string" } },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/api/docs": {
        methods: {
          GET: {
            summary: "API Documentation",
            description: "Returns this comprehensive API documentation",
            responses: {
              "200": {
                description: "Documentation retrieved successfully",
              },
            },
          },
        },
      },
    },
    schemas: {
      HealthStatus: {
        type: "object",
        required: ["status", "timestamp", "version"],
        properties: {
          status: {
            type: "string",
            enum: ["healthy", "degraded", "unhealthy"],
            description: "Overall system health status",
          },
          timestamp: {
            type: "string",
            format: "date-time",
            description: "When the health check was performed",
          },
          version: {
            type: "string",
            description: "Current system version",
          },
          services: {
            type: "object",
            description: "Status of individual services",
            additionalProperties: {
              type: "object",
              properties: {
                status: { type: "string", enum: ["up", "down", "degraded"] },
                responseTime: { type: "number" },
                lastCheck: { type: "string", format: "date-time" },
              },
            },
          },
          dnaLang: {
            type: "object",
            description: "DNA-Lang specific metrics",
            properties: {
              consciousness: {
                type: "number",
                minimum: 0,
                maximum: 1,
                description: "Current consciousness level of the system",
              },
              quantumCoherence: {
                type: "number",
                minimum: 0,
                maximum: 1,
                description: "Quantum coherence measurement",
              },
              fitness: {
                type: "number",
                minimum: 0,
                maximum: 1,
                description: "Overall system fitness score",
              },
              generation: {
                type: "integer",
                description: "Current evolution generation",
              },
              activeOrganisms: {
                type: "integer",
                description: "Number of active DNA-Lang organisms",
              },
            },
          },
        },
      },
      DNALangOrganism: {
        type: "object",
        description: "A DNA-Lang organism with genes, state, and evolution capabilities",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          genes: {
            type: "array",
            items: { type: "string" },
            description: "List of active genes",
          },
          state: {
            type: "object",
            properties: {
              consciousness: { type: "number", minimum: 0, maximum: 1 },
              fitness: { type: "number", minimum: 0, maximum: 1 },
              quantumCoherence: { type: "number", minimum: 0, maximum: 1 },
            },
          },
          generation: { type: "integer" },
          isRunning: { type: "boolean" },
        },
      },
    },
  }

  return NextResponse.json(documentation, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
      "X-API-Version": "2.0.0",
    },
  })
}
