// SafeBite India — app/api/meals/lookup/route.ts — Meal name lookup and vision tracking hub
import { NextRequest, NextResponse } from "next/server"
import { listMealNames } from "@/lib/meals"
import Groq from "groq-sdk"
import { foodDatabase } from "@/data/foodDatabase"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "",
})

/**
 * GET /api/meals/lookup
 * Returns a JSON array of known meal names for autocomplete.
 */
export async function GET() {
  try {
    const meals = listMealNames()
    return NextResponse.json({ meals })
  } catch (error) {
    console.error("Meal lookup error:", error)
    return NextResponse.json({ error: "Failed to fetch meal names" }, { status: 500 })
  }
}

/**
 * POST /api/meals/lookup
 * Processes a base64 meal/fruit image, identifies contents via Vision AI,
 * and matches items against the local nutrient database to extract accurate calories.
 */
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
        { error: "Image payload markers are missing." },
        { status: 400 }
      )
    }

    const dataUrl = `data:${imageMimeType};base64,${imageBase64}`

    // Call Groq Vision to classify items and match them directly against known database keys
    const response = await groq.chat.completions.create({
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `You are a visual nutrition assistant. Identify cooked dishes, global cuisines, fresh fruits, or vegetables present in the image.
          
          Cross-reference whatever you see against these known database keys:
          [${Object.keys(foodDatabase).join(", ")}]

          If you identify an item that exactly matches a key above, use that key in the "dbKey" field. If an item is a generic food or outside this list (e.g., a specific fruit or global dish not listed), create a clean slug name for it and calculate an accurate fallback macro profile based on standard USDA nutritional values.

          You MUST return a valid JSON object matching this schema layout exactly:
          {
            "identifiedItems": [
              {
                "dbKey": "matching_database_key_or_new_fallback_slug",
                "displayName": "Clean human-readable name (e.g., Fresh Avocado)",
                "portionFraction": 1.0, 
                "isFallback": false,
                "fallbackNutrients": {
                  "calories": 0,
                  "protein": 0,
                  "carbs": 0,
                  "fats": 0,
                  "fiber": 0
                },
                "fallbackBenefits": ["Benefit statement"],
                "fallbackConcerns": ["Concern statement or empty array"]
              }
            ],
            "visualNotes": "A brief summary of the meal's preparation quality, balance, or nutritional composition."
          }`
        },
        {
          role: "user",
          content: [
            { type: "text", text: "Identify the foods present in this plate/image, estimate portions, and cross-reference them with database definitions." },
            { type: "image_url", image_url: { url: dataUrl } }
          ]
        }
      ],
      temperature: 0.2,
    })

    const rawContent = response.choices[0]?.message?.content || "{}"
    const visionResult = JSON.parse(rawContent)

    // Aggregate values calculated from the local food database to wipe out inaccurate poor scores
    let totalCalories = 0
    let totalProtein = 0
    let totalCarbs = 0
    let totalFats = 0
    let totalFiber = 0
    let totalSodium = 0
    
    let aggregatedBenefits: string[] = []
    let aggregatedConcerns: string[] = []
    let totalScoreSum = 0
    let validItemsCount = 0

    const itemsBreakdown = visionResult.identifiedItems.map((item: any) => {
      let targetProfile: any = null

      // Check if item exists in database; if not, safely adopt the generated fallback
      if (foodDatabase[item.dbKey]) {
        targetProfile = foodDatabase[item.dbKey]
      } else {
        targetProfile = {
          name: item.displayName,
          nutrientsPerServing: item.fallbackNutrients || { calories: 150, protein: 4, carbs: 20, fats: 5, fiber: 2 },
          healthMetrics: {
            score: 80, // Default baseline health score for standard fresh preparations
            benefits: item.fallbackBenefits || ["Fresh natural source of whole food energy."],
            concerns: item.fallbackConcerns || []
          }
        }
      }

      const ratio = item.portionFraction || 1.0
      
      // Calculate dynamic nutrient values adjusted for the parsed portion multiplier
      totalCalories += targetProfile.nutrientsPerServing.calories * ratio
      totalProtein += targetProfile.nutrientsPerServing.protein * ratio
      totalCarbs += targetProfile.nutrientsPerServing.carbs * ratio
      totalFats += targetProfile.nutrientsPerServing.fats * ratio
      totalFiber += (targetProfile.nutrientsPerServing.fiber || 0) * ratio
      totalSodium += (targetProfile.nutrientsPerServing.sodium || 150) * ratio // Default safety baseline sodium

      aggregatedBenefits.push(...targetProfile.healthMetrics.benefits)
      if (targetProfile.healthMetrics.concerns) {
        aggregatedConcerns.push(...targetProfile.healthMetrics.concerns)
      }

      totalScoreSum += targetProfile.healthMetrics.score
      validItemsCount++

      return {
        name: targetProfile.name,
        portion: ratio,
        calories: Math.round(targetProfile.nutrientsPerServing.calories * ratio)
      }
    })

    // Calculate a balanced safety score reflecting pure nutritional density
    const dynamicSafetyScore = validItemsCount > 0 ? Math.round(totalScoreSum / validItemsCount) : 85

    return NextResponse.json({
      success: true,
      productName: visionResult.identifiedItems.map((i: any) => i.displayName).join(" & ") || "Identified Meal",
      safetyScore: Math.min(100, Math.max(0, dynamicSafetyScore)),
      calories: Math.round(totalCalories),
      macros: {
        protein: Math.round(totalProtein),
        carbs: Math.round(totalCarbs),
        fats: Math.round(totalFats),
        fiber: Math.round(totalFiber)
      },
      sodium: Math.round(totalSodium),
      breakdown: itemsBreakdown,
      benefits: Array.from(new Set(aggregatedBenefits)).slice(0, 4),
      concerns: Array.from(new Set(aggregatedConcerns)).slice(0, 3),
      verdict: visionResult.visualNotes || "Nutritious selection verified through verified database parameters."
    })

  } catch (error: any) {
    console.error("Meal Vision POST Processing Error:", error)
    return NextResponse.json(
      { error: error.message || "Failed to process meal image metrics accurately." },
      { status: 500 }
    )
  }
}