// SafeBite India — lib/scoring.ts — Deterministic Rule Engine
import { 
  AnalysisResult, 
  CriterionKey, 
  CriterionScore, 
  Flag, 
  ScoreLevel, 
  AIAnalysisResponse 
} from './types';
import { 
  HARMFUL_ADDITIVES_MAP, 
  INGREDIENT_ORDER_FLAGS, 
  WHOLE_FOOD_POSITIVES, 
  ALLERGEN_LIST,
  GM_CROPS,
  PROCESSING_KEYWORDS,
  SCORING_WEIGHTS
} from './constants';

export function getScoreLevel(score: number): ScoreLevel {
  if (score >= 70) return 'good';
  if (score >= 40) return 'moderate';
  return 'poor';
}

/**
 * RULE: scoreNutrition
 * Deterministic scoring based on ingredient order and nutrition facts.
 */
export function scoreNutrition(text: string, nutritionFacts?: any): { score: number; flags: Flag[] } {
  let score = 60;
  const flags: Flag[] = [];
  const lower = text.toLowerCase();

  // RULE: Ingredient order penalties (first 3 matter most)
  const ingredients = lower.split(/,|\n/).map(i => i.trim()).filter(Boolean);
  if (ingredients.length > 0) {
    if (INGREDIENT_ORDER_FLAGS.some(f => ingredients[0]?.includes(f))) {
      score -= 20;
      flags.push({ ingredient: ingredients[0], reason: 'Primary ingredient is highly refined/unhealthy', severity: 'danger' });
    }
    if (ingredients[1] && INGREDIENT_ORDER_FLAGS.some(f => ingredients[1]?.includes(f))) {
      score -= 12;
      flags.push({ ingredient: ingredients[1], reason: 'Secondary ingredient is refined/unhealthy', severity: 'warning' });
    }
    if (ingredients[2] && INGREDIENT_ORDER_FLAGS.some(f => ingredients[2]?.includes(f))) {
      score -= 6;
      flags.push({ ingredient: ingredients[2], reason: 'Third ingredient is refined/unhealthy', severity: 'warning' });
    }
  }

  // RULE: Nutrition fact adjustments
  if (nutritionFacts) {
    if (nutritionFacts.sugar > 20) { score -= 15; flags.push({ ingredient: 'Sugar', reason: 'Very high sugar content (>20g)', severity: 'danger' }); }
    else if (nutritionFacts.sugar > 10) { score -= 8; flags.push({ ingredient: 'Sugar', reason: 'High sugar content (>10g)', severity: 'warning' }); }
    
    if (nutritionFacts.sodium > 800) { score -= 15; flags.push({ ingredient: 'Sodium', reason: 'Very high sodium (>800mg)', severity: 'danger' }); }
    else if (nutritionFacts.sodium > 400) { score -= 8; flags.push({ ingredient: 'Sodium', reason: 'High sodium (>400mg)', severity: 'warning' }); }
    
    if (nutritionFacts.saturatedFat > 10) { score -= 12; flags.push({ ingredient: 'Saturated Fat', reason: 'High saturated fat (>10g)', severity: 'warning' }); }
    
    if (nutritionFacts.fat > 0 && nutritionFacts.fat < 0.5) { /* trans fat check would go here if specific field existed */ }
    
    if (nutritionFacts.protein >= 10) { score += 10; flags.push({ ingredient: 'Protein', reason: 'Good protein source', severity: 'info' }); }
    if (nutritionFacts.fibre >= 5) { score += 10; flags.push({ ingredient: 'Fibre', reason: 'High fibre content', severity: 'info' }); }
    if (nutritionFacts.calories > 500) { score -= 8; flags.push({ ingredient: 'Calories', reason: 'High calorie density (>500kcal)', severity: 'warning' }); }
  }

  // RULE: Label claim bonuses
  if (WHOLE_FOOD_POSITIVES.some(p => ingredients[0]?.includes(p))) { score += 15; flags.push({ ingredient: 'Whole Grain', reason: 'Primary ingredient is whole food', severity: 'info' }); }
  if (lower.includes('no added sugar') || lower.includes('zero sugar')) { score += 10; flags.push({ ingredient: 'No Added Sugar', reason: 'Verified claim', severity: 'info' }); }
  if (lower.includes('high protein')) { score += 8; }
  if (lower.includes('high fibre')) { score += 8; }

  return { score: Math.max(0, Math.min(100, score)), flags };
}

/**
 * RULE: scoreAdditives
 * Scores based on detected E-codes and specific additive names.
 */
export function scoreAdditives(text: string, detectedEcodes: string[]): { score: number; flags: Flag[] } {
  let score = 100;
  const flags: Flag[] = [];
  const lower = text.toLowerCase();

  detectedEcodes.forEach(code => {
    const info = HARMFUL_ADDITIVES_MAP[code];
    if (info) {
      if (info.severity === 'banned_in_eu') score -= 30;
      else if (info.severity === 'danger') score -= 22;
      else if (info.severity === 'warning') score -= 12;
      else score -= 3;
      flags.push({ ingredient: info.name, reason: info.concern, severity: info.severity === 'info' ? 'info' : info.severity === 'warning' ? 'warning' : 'danger' });
    } else {
      // RULE: Unrecognised E-codes
      score -= 4;
      flags.push({ ingredient: code, reason: 'Unrecognised additive/E-code', severity: 'warning' });
    }
  });

  // RULE: Artificial additives signals
  if (lower.includes('artificial colour') || lower.includes('added colour')) { score -= 10; flags.push({ ingredient: 'Artificial Colour', reason: 'Contains synthetic dyes', severity: 'warning' }); }
  if (lower.includes('aspartame') || lower.includes('sucralose') || lower.includes('saccharin')) { score -= 8; flags.push({ ingredient: 'Artificial Sweetener', reason: 'Synthetic sweetener detected', severity: 'warning' }); }
  if (lower.includes('tbhq') || lower.includes('bha') || lower.includes('bht')) { score -= 15; flags.push({ ingredient: 'Antioxidant', reason: 'Contains synthetic preservatives (TBHQ/BHA/BHT)', severity: 'danger' }); }

  // RULE: Positive additive signals
  if (lower.includes('no artificial colours')) { score += 5; }
  if (lower.includes('no preservatives')) { score += 5; }
  if (lower.includes('no artificial flavours')) { score += 5; }

  return { score: Math.max(0, Math.min(100, score)), flags };
}

/**
 * RULE: scoreAllergens
 * Lower starting point (85) due to inherent risk.
 */
export function scoreAllergens(text: string, detectedAllergens: string[]): { score: number; flags: Flag[] } {
  let score = 85;
  const flags: Flag[] = [];
  const lower = text.toLowerCase();

  detectedAllergens.forEach(allergen => {
    if (allergen.includes('peanut') || allergen.includes('nut')) { score -= 20; flags.push({ ingredient: allergen, reason: 'High-risk allergen', severity: 'danger' }); }
    else if (allergen.includes('milk') || allergen.includes('dairy')) { score -= 10; }
    else if (allergen.includes('wheat') || allergen.includes('gluten')) { score -= 10; }
    else if (allergen.includes('egg')) { score -= 8; }
    else if (allergen.includes('soy')) { score -= 8; }
    else if (allergen.includes('fish') || allergen.includes('shellfish')) { score -= 12; }
    else { score -= 6; }
    flags.push({ ingredient: allergen, reason: 'Allergen detected', severity: 'warning' });
  });

  // RULE: Cross-contamination signals
  if (lower.includes('may contain') || lower.includes('traces of') || lower.includes('manufactured in a facility')) {
    score -= 8;
    flags.push({ ingredient: 'Cross-contamination', reason: 'May contain allergen traces', severity: 'warning' });
  }

  if (lower.includes('allergen free')) { score += 10; }

  return { score: Math.max(0, Math.min(100, score)), flags };
}

/**
 * RULE: scoreProcessing
 * Categorical base score with adjustments.
 */
export function scoreProcessing(text: string, category: string): { score: number; flags: Flag[] } {
  let score = 55; // Default processed
  const flags: Flag[] = [];
  const lower = text.toLowerCase();
  const lowerCat = category.toLowerCase();

  // RULE: Ultra-processed triggers
  if (PROCESSING_KEYWORDS.ULTRA_PROCESSED_CATEGORIES.some(c => lowerCat.includes(c))) {
    score = 25;
    flags.push({ ingredient: category, reason: 'Highly processed product category', severity: 'danger' });
  } else if (PROCESSING_KEYWORDS.MINIMALLY_PROCESSED_CATEGORIES.some(c => lowerCat.includes(c))) {
    score = 82;
    flags.push({ ingredient: category, reason: 'Minimally processed category', severity: 'info' });
  }

  // Adjustments
  PROCESSING_KEYWORDS.ULTRA_PROCESSED_SIGNALS.forEach(s => {
    if (lower.includes(s)) {
      score -= 5;
      flags.push({ ingredient: s, reason: 'Ultra-processing signal', severity: 'warning' });
    }
  });

  return { score: Math.max(0, Math.min(100, score)), flags };
}

/**
 * RULE: scoreBiosafetyGMO
 */
export function scoreBiosafetyGMO(text: string, isGMO: boolean, hasFSSAILicense: boolean): { score: number; flags: Flag[] } {
  let score = 75;
  const flags: Flag[] = [];
  const lower = text.toLowerCase();

  if (isGMO || lower.includes('genetically modified') || lower.includes('gm ingredient')) {
    score -= 25;
    flags.push({ ingredient: 'GMO', reason: 'Contains genetically modified ingredients', severity: 'danger' });
  }

  GM_CROPS.forEach(crop => {
    if (lower.includes(crop.toLowerCase())) {
      score -= 15;
      flags.push({ ingredient: crop, reason: 'Potential GM crop detected', severity: 'warning' });
    }
  });

  if (lower.includes('non-gmo') || lower.includes('gmo-free')) {
    score += 15;
    flags.push({ ingredient: 'Non-GMO', reason: 'Certified GMO-free', severity: 'info' });
  }

  if (!hasFSSAILicense && !lower.includes('fssai')) {
    score -= 20;
    flags.push({ ingredient: 'FSSAI', reason: 'No FSSAI license detected', severity: 'danger' });
  } else {
    score += 10;
  }

  if (lower.includes('organic certified')) { score += 10; }
  if (lower.includes('jaivik bharat')) { score += 8; }

  return { score: Math.max(0, Math.min(100, score)), flags };
}

/**
 * RULE: scoreEthics
 */
export function scoreEthics(text: string): { score: number; flags: Flag[] } {
  let score = 65;
  const flags: Flag[] = [];
  const lower = text.toLowerCase();

  if (lower.includes('organic')) { score += 12; flags.push({ ingredient: 'Organic', reason: 'Certified organic', severity: 'info' }); }
  if (lower.includes('fair trade')) { score += 10; }
  if (lower.includes('made in india') || lower.includes('product of india')) { score += 6; }
  if (lower.includes('recyclable packaging')) { score += 8; }
  if (lower.includes('palm oil')) { 
    score -= 12; 
    flags.push({ ingredient: 'Palm Oil', reason: 'Environmental/sustainability concern', severity: 'warning' }); 
  }
  if (!lower.includes('ingredient')) { score -= 15; }

  return { score: Math.max(0, Math.min(100, score)), flags };
}

export function computeScores(labelText: string, aiResponse?: AIAnalysisResponse): AnalysisResult {
  // 1. Rule-based scores (Deterministic)
  const ruleNutrition = scoreNutrition(labelText, aiResponse?.nutritionFacts);
  const ruleAdditives = scoreAdditives(labelText, aiResponse?.detectedEcodes || []);
  const ruleAllergens = scoreAllergens(labelText, aiResponse?.detectedAllergens || []);
  const ruleProcessing = scoreProcessing(labelText, aiResponse?.productCategory || 'unknown');
  const ruleBiosafety = scoreBiosafetyGMO(labelText, aiResponse?.isGMO || false, aiResponse?.hasFSSAILicense || false);
  const ruleEthics = scoreEthics(labelText);

  // 2. Blend logic: finalScore = (aiScore * 0.6) + (ruleScore * 0.4)
  const blend = (ai: number | undefined, rule: number) => {
    if (ai === undefined) return rule;
    return Math.round((ai * 0.6) + (rule * 0.4));
  };

  const finalScores: Record<CriterionKey, { score: number; flags: Flag[]; label: string }> = {
    nutrition: { 
      score: blend(aiResponse?.aiScores?.nutrition, ruleNutrition.score), 
      flags: ruleNutrition.flags, 
      label: 'Nutrition Quality' 
    },
    additives: { 
      score: blend(aiResponse?.aiScores?.additives, ruleAdditives.score), 
      flags: ruleAdditives.flags, 
      label: 'Additive Safety' 
    },
    allergens: { 
      score: blend(aiResponse?.aiScores?.allergens, ruleAllergens.score), 
      flags: ruleAllergens.flags, 
      label: 'Allergen Risk' 
    },
    processing: { 
      score: blend(aiResponse?.aiScores?.processing, ruleProcessing.score), 
      flags: ruleProcessing.flags, 
      label: 'Processing Level' 
    },
    biosafety_gmo: { 
      score: blend(aiResponse?.aiScores?.biosafety_gmo, ruleBiosafety.score), 
      flags: ruleBiosafety.flags, 
      label: 'Biosafety & GMO' 
    },
    ethics: { 
      score: blend(aiResponse?.aiScores?.ethics, ruleEthics.score), 
      flags: ruleEthics.flags, 
      label: 'Ethics & Transparency' 
    },
  };

  const criteria: CriterionScore[] = (Object.entries(finalScores) as [CriterionKey, any][]).map(([key, data]) => ({
    criterion: key,
    score: data.score,
    level: getScoreLevel(data.score),
    label: data.label,
    summary: `${data.label}: ${data.score}/100`,
    flags: data.flags
  }));

  const overallScore = Math.round(
    criteria.reduce((acc, cur) => acc + (cur.score * SCORING_WEIGHTS[cur.criterion]), 0)
  );

  return {
    productName: aiResponse?.productName || 'Analyzed Product',
    overallScore,
    overallLevel: getScoreLevel(overallScore),
    criteria,
    recommendations: aiResponse?.aiRecommendations || [],
    alternatives: aiResponse?.aiAlternatives || [],
    ethicsNotes: aiResponse?.ethicsNotes || [],
    rawLabel: labelText,
    analyzedAt: new Date().toISOString(),
    summary: `Analyzed against FSSAI 2024 standards. Overall safety rating is ${getScoreLevel(overallScore).toUpperCase()}.`,
    extractedIngredients: aiResponse?.extractedIngredients || [],
    nutritionFacts: aiResponse?.nutritionFacts || {},
    detectedEcodes: aiResponse?.detectedEcodes || [],
    detectedAllergens: aiResponse?.detectedAllergens || [],
    isGMO: aiResponse?.isGMO || false,
    hasFSSAILicense: aiResponse?.hasFSSAILicense || false,
    fssaiNumber: aiResponse?.fssaiNumber || null,
    productCategory: aiResponse?.productCategory || 'unknown',
    regulatoryFindings: aiResponse?.regulatoryFindings || [],
    confidence: aiResponse ? 'high' : 'low'
  };
}
