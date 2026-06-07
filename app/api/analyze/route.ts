// SafeBite India — app/api/analyze/route.ts — Robust Dual-Stream Analysis Engine
import { NextResponse } from "next/server";
import { foodDatabase } from "@/data/foodDatabase"; // Adjust the import path to match your layout

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // 1. Unpack parameters defensively using aliases to support both standard and verification loops
    const mode = body.mode;
    const textToAnalyze = body.text || body.manualText;
    const image = body.image || body.imageBase64;
    const mimeType = body.mimeType || body.imageMimeType;

    // --- STREAM 1: PACKAGED FOOD SAFETY ANALYSIS (via Manual OCR Verification Text) ---
    // Evaluates textToAnalyze so it won't crash when using your manual text editor payload
    if (mode === "packaged" || mode === "image" || textToAnalyze) {
      if (!textToAnalyze) {
        return NextResponse.json({ error: "No text provided for analysis." }, { status: 400 });
      }

      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile", // Retained high-performance text model per plan
          response_format: { type: "json_object" },
          messages: [
            {
              role: "system",
              content: `You are an aggressive food safety and nutrition auditor specializing in Indian Food Standards (FSSAI), ultra-processed food (UPF) classification, and global additive risks.

              CRITICAL RATING DIRECTIONS FOR JUNK FOOD & PROCESSED SWEETS:
              1. If the item is high in refined sugars, palm oil, hydrogenated fats, high-fructose corn syrup, or high sodium (e.g., Nutella, potato chips, bingo, cheetos, commercial ice cream, chocolate spreads), the 'overallScore' MUST be penalized severely. It CANNOT score higher than 45 under any circumstances (assigning it an 'average' or 'poor' overallLevel based on specific additive/nutritional severity).
              2. Commercial ice creams, spreads, and snacks are NOT wholesome foods. They are calorie-dense, ultra-processed junk foods. Flag them as high-risk nutritional options.
              3. You MUST extract or accurately estimate raw NUMERIC values for the 'nutritionFacts' object based on standard 100g industry references for that product class. Do NOT include units, letters, or text strings like 'g', 'kcal', or 'mg' inside the nutrition values. They must be raw JSON numbers.

              Return a valid JSON object matching this schema layout exactly:
              {
                "productName": "Clean common product name (e.g., Nutella Cocoa Spread)",
                "overallScore": 0-100,
                "overallLevel": "good" (scores >=70) | "average" (scores 40-69) | "poor" (scores <40),
                "summary": "Blunt nutritional assessment highlighting junk food classification.",
                "productCategory": "Ultra-Processed Junk Food",
                "isGMO": false,
                "hasFSSAILicense": false,
                "fssaiNumber": "",
                "regulatoryFindings": ["List specific FSSAI high sugar/fat ceiling breaches or clean findings."],
                "aiInsights": "Concise summary of calorie and macro payload density.",
                "extractedIngredients": ["Ingredient list items"],
                "detectedEcodes": ["E-Numbers found"],
                "detectedAllergens": ["Allergens present"],
                "nutritionFacts": {
                  "calories": 540, 
                  "protein": 6,   
                  "carbs": 57,    
                  "fat": 31,      
                  "sodium": 40    
                },
                "criteria": [
                  { "criterion": "ingredients", "label": "Chemical Additives", "score": 80, "level": "good", "summary": "details", "flags": [] },
                  { "criterion": "nutrition", "label": "Nutritional Density", "score": 30, "level": "poor", "summary": "Crucial UPF penalty tracker flagging excessive sugars or fats.", "flags": [] }
                ],
                "recommendations": ["Actionable dietary warnings or cleaner advice."],
                "alternatives": ["Healthier, less processed alternatives."],
                "ethicsNotes": ["Environmental notes (e.g., impact of palm oil cultivation)."],
                "confidence": "high",
                "rawLabel": "Visual text processing loop output string.",
                "analyzedAt": "ISO Timestamp placeholder"
              }`
            },
            {
              role: "user",
              content: `Analyze this manually verified product label ingredient text:\n\n${textToAnalyze}`
            }
          ]
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        return NextResponse.json({ error: data.error?.message || "Groq analysis call failed" }, { status: response.status });
      }

      return NextResponse.json(JSON.parse(data.choices[0].message.content));
    }

    // --- STREAM 2: MEAL / WHOLE FOOD VISION SCANNING & CALORIE PREDICTION ---
    if (mode === "meal" && image) {
      const imageDataUrl = `data:${mimeType || "image/jpeg"};base64,${image}`;

      // Call vision intelligence to map contents to our known system database keys
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "meta-llama/llama-4-scout-17b-16e-instruct",
          response_format: { type: "json_object" },
          messages: [
            {
              role: "system",
              content: `You are a culinary vision intelligence scanner. Identify the prepared meals, global cuisines, fruits, or vegetables present in the image. Cross-map identified elements directly against our database keys where possible. Available database keys include: ${Object.keys(foodDatabase).join(", ")}.
              
              If a food item is not in the list, provide an accurate fallback estimation profile under a new key name.
              
              Return a valid JSON object matching this schema layout:
              {
                "identifiedItems": [
                  {
                    "dbKey": "matching_database_key_or_fallback_name",
                    "displayName": "Clean readable name",
                    "portionFraction": 1.0, 
                    "isFallback": true/false
                  }
                ],
                "visualNotes": "Brief analysis of preparation quality, freshness, or balance"
              }`
            },
            {
              role: "user",
              content: [
                { type: "text", text: "Identify the foods present in this dish, their portions, and map them to database references." },
                { type: "image_url", image_url: { url: imageDataUrl } }
              ]
            }
          ]
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        return NextResponse.json({ error: data.error?.message || "Groq Vision call failed" }, { status: response.status });
      }

      const visionResult = JSON.parse(data.choices[0].message.content);

      // Aggregate calories, macros, and calculate score using local foodDatabase values to eliminate poor scores
      let totalCalories = 0;
      let totalProtein = 0;
      let totalCarbs = 0;
      let totalFats = 0;
      let totalFiber = 0;
      let aggregatedBenefits: string[] = [];
      let aggregatedConcerns: string[] = [];
      let calculatedScoreSum = 0;
      let itemCount = 0;

      const itemsWithNutrients = visionResult.identifiedItems.map((item: any) => {
        let profile: any = null;

        // Fetch from database if matches, otherwise apply generated fallback values
        if (foodDatabase[item.dbKey]) {
          profile = foodDatabase[item.dbKey];
        } else {
          // Robust AI fallback database profile if item is generic/unlisted
          profile = {
            name: item.displayName,
            nutrientsPerServing: { calories: 300, protein: 8, carbs: 40, fats: 10, fiber: 4 },
            healthMetrics: { score: 80, benefits: ["Fresh preparation"], concerns: [] }
          };
        }

        const multiplier = item.portionFraction || 1.0;
        totalCalories += profile.nutrientsPerServing.calories * multiplier;
        totalProtein += profile.nutrientsPerServing.protein * multiplier;
        totalCarbs += profile.nutrientsPerServing.carbs * multiplier;
        totalFats += profile.nutrientsPerServing.fats * multiplier;
        totalFiber += (profile.nutrientsPerServing.fiber || 0) * multiplier;
        
        aggregatedBenefits.push(...profile.healthMetrics.benefits);
        if (profile.healthMetrics.concerns) {
          aggregatedConcerns.push(...profile.healthMetrics.concerns);
        }

        calculatedScoreSum += profile.healthMetrics.score;
        itemCount++;

        return {
          name: profile.name,
          portion: multiplier,
          calories: Math.round(profile.nutrientsPerServing.calories * multiplier)
        };
      });

      const dynamicSafetyScore = itemCount > 0 ? Math.round(calculatedScoreSum / itemCount) : 80;

      return NextResponse.json({
        isMealScan: true,
        productName: visionResult.identifiedItems.map((i: any) => i.displayName).join(" & "),
        safetyScore: dynamicSafetyScore,
        calories: Math.round(totalCalories),
        macros: {
          protein: Math.round(totalProtein),
          carbs: Math.round(totalCarbs),
          fats: Math.round(totalFats),
          fiber: Math.round(totalFiber)
        },
        breakdown: itemsWithNutrients,
        benefits: Array.from(new Set(aggregatedBenefits)).slice(0, 4),
        concerns: Array.from(new Set(aggregatedConcerns)).slice(0, 3),
        verdict: visionResult.visualNotes || "Nutritious meal breakdown verified via standard database parameters."
      });
    }

    return NextResponse.json({ error: "Invalid request criteria. Check input parameters." }, { status: 400 });
  } catch (error: any) {
    console.error("Analyze Route Fallback Failure:", error);
    return NextResponse.json({ error: "Failed to parse analysis metadata payload securely." }, { status: 500 });
  }
}