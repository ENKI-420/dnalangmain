import { NextResponse } from "next/server"

export const runtime = "edge" // Use Edge Runtime for faster responses

export async function POST(req: Request) {
  try {
    const { contents, generationConfig } = await req.json()

    if (!contents) {
      return NextResponse.json({ error: "Request body must contain 'contents'" }, { status: 400 })
    }

    // IMPORTANT: Replace with your actual Google Gemini API Key from environment variables
    // Ensure GEMINI_API_KEY is set in your Vercel project settings.
    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey) {
      return NextResponse.json({ error: "GEMINI_API_KEY is not set in environment variables." }, { status: 500 })
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`

    const payload = {
      contents: contents,
      generationConfig: generationConfig || {
        responseMimeType: "text/plain", // Default to text if no schema
      },
    }

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Gemini API error: ${response.status} - ${errorText}`)
      return NextResponse.json(
        { error: "Failed to get response from Gemini API", details: errorText },
        { status: response.status },
      )
    }

    const result = await response.json()

    // Extract the text content from the Gemini response
    if (result.candidates && result.candidates.length > 0 && result.candidates[0].content.parts[0].text) {
      return NextResponse.json({ candidates: result.candidates })
    } else {
      console.warn("Gemini API response did not contain expected text content:", result)
      return NextResponse.json({ error: "No text content found in Gemini API response" }, { status: 500 })
    }
  } catch (error) {
    console.error("Server-side API handler error:", error)
    return NextResponse.json(
      { error: "An unexpected error occurred", details: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}
