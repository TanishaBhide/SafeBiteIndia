export interface NutritionalProfile {
  calories: number;     // kcal
  protein: number;      // grams
  carbs: number;        // grams
  fats: number;         // grams
  fiber: number;        // grams
  sodium?: number;      // mg
}

export interface FoodItem {
  id: string;
  name: string;
  category: 'indian_cooked' | 'global_cooked' | 'fruit' | 'vegetable' | 'beverage' | 'snack';
  cuisine?: string;
  standardServing: {
    quantity: number;
    unit: string;
    description: string;
  };
  nutrientsPerServing: NutritionalProfile;
  healthMetrics: {
    score: number;       // 1 to 100 rating
    benefits: string[];
    concerns: string[];
  };
  tags: string[];
}

export interface GlobalFoodDatabase {
  [foodKey: string]: FoodItem;
}

export const foodDatabase: GlobalFoodDatabase = {
  // --- Indian Cooked Meals ---
  "ambur_mutton_biriyani": {
    id: "ind_mutton_biriyani",
    name: "Ambur Mutton Dum Biriyani",
    category: "indian_cooked",
    cuisine: "South Indian",
    standardServing: { quantity: 1, unit: "plate", description: "1 regular plate (approx 350g)" },
    nutrientsPerServing: { calories: 620, protein: 28, carbs: 65, fats: 26, fiber: 4, sodium: 780 },
    healthMetrics: {
      score: 75,
      benefits: ["High protein from quality mutton mutton", "Traditional spices aid digestion"],
      concerns: ["Moderate saturated fats from ghee", "Calorie dense"]
    },
    tags: ["high-protein", "non-vegetarian"]
  },
  "poha": {
    id: "ind_poha",
    name: "Kanda Poha",
    category: "indian_cooked",
    cuisine: "West Indian",
    standardServing: { quantity: 1, unit: "plate", description: "1 plate (approx 200g)" },
    nutrientsPerServing: { calories: 250, protein: 4, carbs: 45, fats: 6, fiber: 3, sodium: 340 },
    healthMetrics: {
      score: 85,
      benefits: ["Low calorie", "Easy to digest carbohydrate source", "Rich in iron"],
      concerns: ["Low in protein if eaten without sprouts/peanuts"]
    },
    tags: ["vegetarian", "breakfast", "low-fat"]
  },
  "idli_sambar": {
    id: "ind_idli_sambar",
    name: "Idli with Sambar (2 pcs)",
    category: "indian_cooked",
    cuisine: "South Indian",
    standardServing: { quantity: 1, unit: "serving", description: "2 idlis with 1 bowl of sambar" },
    nutrientsPerServing: { calories: 230, protein: 8, carbs: 42, fats: 3, fiber: 6, sodium: 480 },
    healthMetrics: {
      score: 92,
      benefits: ["Fermented food good for gut health", "Very low fat", "Good protein-carb balance from lentils"],
      concerns: []
    },
    tags: ["vegetarian", "fermented", "breakfast"]
  },

  // --- Whole Foods, Fruits & Vegetables ---
  "avocado": {
    id: "fruit_avocado",
    name: "Avocado",
    category: "fruit",
    standardServing: { quantity: 1, unit: "medium", description: "1 medium avocado (150g)" },
    nutrientsPerServing: { calories: 240, protein: 3, carbs: 12, fats: 22, fiber: 10, sodium: 10 },
    healthMetrics: {
      score: 98,
      benefits: ["Excellent source of heart-healthy monounsaturated fats", "Incredibly high fiber", "Potassium rich"],
      concerns: []
    },
    tags: ["vegan", "keto-friendly", "gluten-free", "high-fiber"]
  },
  "apple": {
    id: "fruit_apple",
    name: "Apple",
    category: "fruit",
    standardServing: { quantity: 1, unit: "medium", description: "1 medium apple (182g)" },
    nutrientsPerServing: { calories: 95, protein: 0.5, carbs: 25, fats: 0.3, fiber: 4.4, sodium: 2 },
    healthMetrics: {
      score: 96,
      benefits: ["High pectin fiber for gut health", "Rich in Vitamin C and antioxidants", "Hydrating"],
      concerns: []
    },
    tags: ["vegan", "clean-eating", "low-calorie"]
  },

  // --- Global Cuisines ---
  "mediterranean_greek_salad": {
    id: "glob_greek_salad",
    name: "Greek Salad with Feta & Olives",
    category: "global_cooked",
    cuisine: "Mediterranean",
    standardServing: { quantity: 1, unit: "bowl", description: "1 large salad bowl (approx 250g)" },
    nutrientsPerServing: { calories: 190, protein: 6, carbs: 9, fats: 15, fiber: 3, sodium: 520 },
    healthMetrics: {
      score: 88,
      benefits: ["Rich in protective antioxidants", "Healthy fats from olive oil", "Low glycemic index"],
      concerns: ["Higher sodium from feta cheese and brined olives"]
    },
    tags: ["vegetarian", "gluten-free", "low-carb"]
  }
};