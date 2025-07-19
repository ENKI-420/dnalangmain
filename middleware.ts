import { NextResponse, type NextRequest } from "next/server"
import crypto from "crypto"

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Add security headers
  response.headers.set("X-DNS-Prefetch-Control", "on")
  response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains")
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-XSS-Protection", "1; mode=block")
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")

  // Add DNA-Lang specific headers
  response.headers.set("X-DNA-Lang-Version", "2.0.0")
  response.headers.set("X-iCRISPR-Workbench", "active")
  response.headers.set("X-Strategic-Brief", "living-software-evolution")
  response.headers.set("X-Powered-By-DNA", "Living Software Evolution")

  // CORS for API routes
  if (request.nextUrl.pathname.startsWith("/api/")) {
    response.headers.set("Access-Control-Allow-Origin", "*")
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization")
  }

  // Handle preflight requests
  if (request.method === "OPTIONS") {
    return new NextResponse(null, { status: 200, headers: response.headers })
  }

  // Add request ID for tracing
  const requestId = crypto.randomUUID()
  response.headers.set("X-Request-ID", requestId)

  // Log API requests in development
  if (process.env.NODE_ENV === "development" && request.nextUrl.pathname.startsWith("/api/")) {
    console.log(`[${new Date().toISOString()}] ${request.method} ${request.nextUrl.pathname} - ${requestId}`)
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
