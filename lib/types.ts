// SafeBite India — lib/types.ts — All TypeScript interfaces and type definitions

/**
 * Input payload sent to the /api/analyze endpoint.
 * Either imageBase64 or manualText must be provided.
 */
export interface ScanInput {
  mode: 'image' | 'manual';
  /** Base64-encoded image bytes (no data URI prefix) */
  imageBase64?: string;
  /** MIME type of the uploaded image, e.g. "image/jpeg" */
  imageMimeType?: string;
  /** Raw text pasted or typed by the user */
  manualText?: string;
  /** Optional product name override */
  productName?: string;
}

/**
 * Three-tier safety rating used throughout the UI.
 * - good: score >= 70
 * - moderate: score >= 40
 * - poor: score < 40
 */
export type ScoreLevel = 'good' | 'moderate' | 'poor';

/**
 * The six evaluation axes used in SafeBite India scoring.
 */
export type CriterionKey =
  | 'nutrition'
  | 'additives'
  | 'allergens'
  | 'processing'
  | 'biosafety_gmo'
  | 'ethics';

/**
 * A single flagged ingredient or concern within a criterion.
 */
export interface Flag {
  /** Name of the ingredient or additive flagged */
  ingredient: string;
  /** Human-readable explanation of the concern */
  reason: string;
  /** Severity tier for colour coding */
  severity: 'info' | 'warning' | 'danger';
}

/**
 * Score and metadata for one of the six evaluation criteria.
 */
export interface CriterionScore {
  criterion: CriterionKey;
  /** Numeric score 0–100 */
  score: number;
  level: ScoreLevel;
  /** Display label, e.g. "Nutrition Quality" */
  label: string;
  /** One-sentence human-readable summary */
  summary: string;
  /** List of specific concerns found */
  flags: Flag[];
}

/**
 * Full analysis result returned by the API and stored in sessionStorage.
 */
export interface AnalysisResult {
  productName: string;
  overallScore: number;
  overallLevel: ScoreLevel;
  criteria: CriterionScore[];
  recommendations: string[];
  alternatives: string[];
  ethicsNotes: string[];
  rawLabel: string;
  analyzedAt: string;
  summary: string;
  // New fields for dynamic FSSAI grounding
  extractedIngredients: string[];
  nutritionFacts: {
    calories?: number;
    protein?: number;
    carbs?: number;
    sugar?: number;
    fat?: number;
    saturatedFat?: number;
    transFat?: number;
    sodium?: number;
    fibre?: number;
  };
  aiInsights: string;
  detectedEcodes: string[];
  detectedAllergens: string[];
  isGMO: boolean;
  hasFSSAILicense: boolean;
  fssaiNumber: string | null;
  productCategory: string;
  regulatoryFindings: string[];
  confidence: 'low' | 'high';
}

/**
 * Shape of the JSON object AI returns in the analysis step.
 */
export interface AIAnalysisResponse {
  productName: string;
  extractedIngredients: string[];
  nutritionFacts: {
    calories?: number;
    protein?: number;
    carbs?: number;
    sugar?: number;
    fat?: number;
    saturatedFat?: number;
    transFat?: number;
    sodium?: number;
    fibre?: number;
  };
  aiInsights: string;
  detectedEcodes: string[];
  detectedAllergens: string[];
  isGMO: boolean;
  hasFSSAILicense: boolean;
  fssaiNumber: string | null;
  productCategory: string;
  aiScores: {
    nutrition: number;
    additives: number;
    allergens: number;
    processing: number;
    biosafety_gmo: number;
    ethics: number;
  };
  aiRecommendations: string[];
  aiAlternatives: string[];
  ethicsNotes: string[];
  regulatoryFindings: string[];
}
