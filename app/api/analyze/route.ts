// SafeBite India — app/api/analyze/route.ts — AI Analysis Route (Groq optimized)
import { NextRequest, NextResponse } from "next/server"
import Groq from "groq-sdk"
import { computeScores } from "@/lib/scoring"
import { ScanInput, AnalysisResult, AIAnalysisResponse } from "@/lib/types"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "",
})

/**
 * SYSTEM PROMPT: OCR Extraction
 */
const OCR_SYSTEM_PROMPT = `You are an OCR engine for Indian food labels. Extract ALL visible text exactly as printed. 
Include: product name, ingredients list, nutrition facts table (all values), FSSAI license number, allergen declarations, additive codes (E-numbers), net weight, MRP, manufacturer. 
Output as plain text, preserving structure. If something is unclear, write [unclear].`;

/**
 * SYSTEM PROMPT: Analysis & Scoring
 */
const ANALYSIS_SYSTEM_PROMPT = `You are a food safety analyst trained on FSSAI (Food Safety and Standards Authority of India) regulations, Codex Alimentarius, and Indian dietary guidelines. 
Analyze the label and return ONLY a valid JSON object with NO markdown, NO explanation, NO preamble.

{
  "productName": string,
  "extractedIngredients": string[],
  "nutritionFacts": { "calories": number, "protein": number, "carbs": number, "sugar": number, "fat": number, "saturatedFat": number, "sodium": number, "fibre": number },
  "detectedEcodes": string[],
  "detectedAllergens": string[],
  "isGMO": boolean,
  "hasFSSAILicense": boolean,
  "fssaiNumber": string | null,
  "productCategory": string,
  "aiScores": {
    "nutrition": number,
    "additives": number,
    "allergens": number,
    "processing": number,
    "biosafety_gmo": number,
    "ethics": number
  },
  "aiRecommendations": string[],
  "aiAlternatives": string[],
  "ethicsNotes": string[],
  "regulatoryFindings": string[]
}

Score each criterion 0–100 strictly based on the label content and FSSAI context. DO NOT invent ingredients not present in the label. 
FSSAI 2024 UPDATE: All saturated fat, total sugar, and sodium values must be scrutinized against RDA limits (Sugar < 50g/day, Sodium < 2000mg/day). 
Be conservative — if you are unsure, score lower.`;

export async function POST(req: NextRequest) {
  try {
    const input: ScanInput = await req.json()
    let labelText = input.manualText || ""
    
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: "GROQ_API_KEY is missing" }, { status: 500 })
    }

    // STEP 1 — Extract label text (if image)
    if (input.mode === 'image' && input.imageBase64 && input.imageMimeType) {
      const ocrResponse = await groq.chat.completions.create({
        model: "llama-3.2-11b-vision-preview",
        messages: [
          { role: "system", content: OCR_SYSTEM_PROMPT },
          {
            role: "user",
            content: [
              { type: "text", text: "Extract text from this food label." },
              {
                type: "image_url",
                image_url: { url: `data:${input.imageMimeType};base64,${input.imageBase64}` },
              },
            ],
          },
        ],
        temperature: 0.1,
      })
      labelText = ocrResponse.choices[0]?.message?.content || ""
    }

    if (!labelText || labelText.trim().length < 5) {
      return NextResponse.json({ error: "Failed to extract text from label or manual input too short." }, { status: 400 })
    }

    // STEP 2 — Regulatory Context Enrichment
    // In this Groq implementation, we embed the context directly into the analysis prompt 
    // to simulate the "live" enrichment since Groq doesn't have a web search tool.
    const productCategory = labelText.toLowerCase().includes('noodle') ? 'Noodles' : 
                            labelText.toLowerCase().includes('biscuit') ? 'Biscuits' : 
                            labelText.toLowerCase().includes('chip') ? 'Chips' : 'General';

    // STEP 3 — AI Analysis Call
    const analysisResponse = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: ANALYSIS_SYSTEM_PROMPT },
        { 
          role: "user", 
          content: `PRODUCT: ${input.productName || 'Unknown'}\nLABEL TEXT:\n${labelText}\n\nENRICHMENT: Identify FSSAI standard for ${productCategory} and check compliance.` 
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.2,
    })

    let aiContent = analysisResponse.choices[0]?.message?.content || "{}"
    // Clean up potential markdown formatting if the model ignored the json_object constraint
    if (aiContent.includes('```')) {
      aiContent = aiContent.replace(/```json/g, '').replace(/```/g, '').trim()
    }
    
    const aiJson: AIAnalysisResponse = JSON.parse(aiContent)

    // STEP 4 — Rule engine override (lib/scoring.ts)
    // Pass the AI JSON response + raw label text to computeScores()
    const finalResult: AnalysisResult = computeScores(labelText, aiJson)

    // STEP 5 — Return complete AnalysisResult JSON
    return NextResponse.json(finalResult)

  } catch (error: any) {
    console.error("API Analysis Route Error:", error)
    return NextResponse.json(
      { error: error.message || "Failed to analyze food label" },
      { status: 500 }
    )
  }
}
