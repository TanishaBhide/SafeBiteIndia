// SafeBite India — app/api/ocr/route.ts — AI OCR + Spoilage Detection Route
import { NextRequest, NextResponse } from "next/server"
import Groq from "groq-sdk"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "",
})

const OCR_SYSTEM_PROMPT = `You are a specialized OCR, visual recognition, and food safety engine.

TASK 1 — TEXT EXTRACTION:
- PACKAGED FOOD: Extract all visible text exactly as printed.
- COOKED MEAL / FRESH FOOD: Describe the items present concisely. Do not hallucinate labels.

TASK 2 — SPOILAGE DETECTION:
Examine the image for fungal mould, rot, decay, discolouration, or visible expiry. 

OUTPUT FORMAT:
Do NOT output JSON. You must output exactly four lines in the following plain-text format:

TEXT: [Extracted text or meal description]
SPOILED: [true or false]
TYPE: [fungal_mould, rot_decay, expired_packaging, contamination, or none]
WARNING: [Warning message if spoiled, otherwise leave blank]

EXAMPLE 1 (Fresh Food):
TEXT: A bowl of fresh cooked white rice.
SPOILED: false
TYPE: none
WARNING: 

EXAMPLE 2 (Spoiled Food):
TEXT: A plate of rice with green patches.
SPOILED: true
TYPE: fungal_mould
WARNING: Visible mould growth detected. Do not consume.`

export async function POST(req: NextRequest) {
  try {
    const { imageBase64, imageMimeType } = await req.json()

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "GROQ_API_KEY is not configured on the server." },
        { status: 500 }
      )
    }

    if (!imageBase64 || !imageMimeType) {
      return NextResponse.json(
        { error: "Image data is missing." },
        { status: 400 }
      )
    }

    // Call Groq API without JSON mode — this prevents 400 JSON validation errors
    const ocrResponse = await groq.chat.completions.create({
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      messages: [
        { role: "system", content: OCR_SYSTEM_PROMPT },
        {
          role: "user",
          content: [
            { type: "text", text: "Analyze this food image and output the 4 required lines." },
            {
              type: "image_url",
              image_url: { url: `data:${imageMimeType};base64,${imageBase64}` },
            },
          ],
        },
      ],
      temperature: 0.1,
    })

    const rawContent = ocrResponse.choices[0]?.message?.content || ""

    // Parse the plain text output robustly using RegEx
    const textMatch = rawContent.match(/TEXT:\s*(.*)/i)
    const spoiledMatch = rawContent.match(/SPOILED:\s*(true|false)/i)
    const typeMatch = rawContent.match(/TYPE:\s*(.*)/i)
    const warningMatch = rawContent.match(/WARNING:\s*(.*)/i)

    const isSpoiledStr = spoiledMatch ? spoiledMatch[1].toLowerCase() : "false"
    const isSpoiled = isSpoiledStr === "true"

    let spoilageType = typeMatch ? typeMatch[1].trim() : "none"
    const validTypes = ["fungal_mould", "rot_decay", "expired_packaging", "contamination", "none"]
    if (!validTypes.includes(spoilageType)) spoilageType = "none"

    const warningMessage = warningMatch ? warningMatch[1].trim() : ""

    const extractedText = textMatch ? textMatch[1].trim() : rawContent.replace(/TEXT:|SPOILED:|TYPE:|WARNING:/gi, '').trim()

    const spoilageResult = {
      isSpoiled,
      confidence: "high", // We enforce high confidence for this simplified structure
      spoilageType,
      warningMessage: isSpoiled ? warningMessage : "",
    }

    return NextResponse.json({ extractedText, spoilageResult })
  } catch (error: any) {
    console.error("OCR API Route Error:", error)
    return NextResponse.json(
      { error: error.message || "Failed to perform OCR on image." },
      { status: 500 }
    )
  }
}