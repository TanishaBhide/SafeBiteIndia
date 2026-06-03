// SafeBite India — app/api/ocr/route.ts — AI OCR Route
import { NextRequest, NextResponse } from "next/server"
import Groq from "groq-sdk"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "",
})

const OCR_SYSTEM_PROMPT = `You are an OCR engine for Indian food labels. Extract ALL visible text exactly as printed. 
Include: product name, ingredients list, nutrition facts table (all values), FSSAI license number, allergen declarations, additive codes (E-numbers), net weight, MRP, manufacturer. 
Output as plain text, preserving structure. If something is unclear, write [unclear].`

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

    const ocrResponse = await groq.chat.completions.create({
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      messages: [
        { role: "system", content: OCR_SYSTEM_PROMPT },
        {
          role: "user",
          content: [
            { type: "text", text: "Extract text from this food label." },
            {
              type: "image_url",
              image_url: { url: `data:${imageMimeType};base64,${imageBase64}` },
            },
          ],
        },
      ],
      temperature: 0.1,
    })

    const extractedText = ocrResponse.choices[0]?.message?.content || ""

    return NextResponse.json({ extractedText })
  } catch (error: any) {
    console.error("OCR API Route Error:", error)
    return NextResponse.json(
      { error: error.message || "Failed to perform OCR on image." },
      { status: 500 }
    )
  }
}
