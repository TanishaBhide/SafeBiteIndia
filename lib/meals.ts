// SafeBite India — lib/meals.ts — Simple meal nutrition lookup

/**
 * Basic nutrition facts for common Indian meals and dishes.
 * Values are approximations per typical serving size.
 */
export interface MealNutrition {
  calories?: number;
  protein?: number; // grams
  carbs?: number;   // grams
  sugar?: number;  // grams
  fat?: number;    // grams
  saturatedFat?: number;
  transFat?: number;
  sodium?: number; // mg
  fibre?: number;  // grams
}

export const MEAL_DATABASE: Record<string, MealNutrition> = {
  // South Indian breakfast
  dosa: {
    calories: 150,
    protein: 3,
    carbs: 22,
    sugar: 0.5,
    fat: 6,
    saturatedFat: 1,
    transFat: 0,
    sodium: 200,
    fibre: 1,
  },
  idli: {
    calories: 120,
    protein: 4,
    carbs: 24,
    sugar: 1,
    fat: 0.5,
    saturatedFat: 0,
    transFat: 0,
    sodium: 150,
    fibre: 1,
  },
  "poha": {
    calories: 250,
    protein: 5,
    carbs: 45,
    sugar: 2,
    fat: 4,
    saturatedFat: 1,
    transFat: 0,
    sodium: 300,
    fibre: 3,
  },
  "paratha": {
    calories: 300,
    protein: 6,
    carbs: 35,
    sugar: 2,
    fat: 12,
    saturatedFat: 3,
    transFat: 0,
    sodium: 350,
    fibre: 2,
  },
  "rice": {
    calories: 200,
    protein: 4,
    carbs: 44,
    sugar: 0,
    fat: 0.4,
    saturatedFat: 0,
    transFat: 0,
    sodium: 0,
    fibre: 0.6,
  },
  "chapati": {
    calories: 120,
    protein: 4,
    carbs: 22,
    sugar: 0,
    fat: 3,
    saturatedFat: 0.5,
    transFat: 0,
    sodium: 100,
    fibre: 2,
  },
  // Additional dishes
  burger: {
    calories: 295,
    protein: 7,
    carbs: 30,
    sugar: 5,
    fat: 12,
    saturatedFat: 4,
    transFat: 0.1,
    sodium: 500,
    fibre: 2,
  },
  "nuggets": {
    calories: 250,
    protein: 10,
    carbs: 20,
    sugar: 2,
    fat: 15,
    saturatedFat: 5,
    transFat: 0.5,
    sodium: 600,
    fibre: 1,
  },
  // Add more meals as needed
};

/**
 * Attempts to detect a known meal name within the provided text and returns its nutrition.
 * The detection is case‑insensitive and matches whole words.
 */
export function getMealNutrition(text: string): MealNutrition | null {
  const lower = text.toLowerCase();
  for (const meal of Object.keys(MEAL_DATABASE)) {
    const regex = new RegExp(`\\b${meal}\\b`, 'i');
    if (regex.test(lower)) {
      return MEAL_DATABASE[meal];
    }
  }
  return null;
}

/**
 * Returns an array of available meal names for lookup/autocomplete.
 */
export function listMealNames(): string[] {
  return Object.keys(MEAL_DATABASE);
}
