// SafeBite India — lib/constants.ts — Centralized data constants
import { CriterionKey } from './types';

export const HARMFUL_ADDITIVES_MAP: Record<string, {
  name: string;
  category: string;
  concern: string;
  severity: 'info' | 'warning' | 'danger' | 'banned_in_eu';
  fssaiPermitted: boolean;
  maxDailyIntake?: string;
}> = {
  'E102': { name: 'Tartrazine', category: 'Artificial Colour', concern: 'Linked to hyperactivity in children; banned in Norway and Austria', severity: 'danger', fssaiPermitted: true, maxDailyIntake: '7.5mg/kg body weight' },
  'E104': { name: 'Quinoline Yellow', category: 'Artificial Colour', concern: 'Banned in USA and Australia', severity: 'danger', fssaiPermitted: true },
  'E110': { name: 'Sunset Yellow FCF', category: 'Artificial Colour', concern: 'May cause hyperactivity; banned in Finland and Norway', severity: 'danger', fssaiPermitted: true },
  'E122': { name: 'Carmoisine', category: 'Artificial Colour', concern: 'Banned in several countries; hyperactivity risk', severity: 'danger', fssaiPermitted: true },
  'E124': { name: 'Ponceau 4R', category: 'Artificial Colour', concern: 'Banned in USA; carcinogen risk in high doses', severity: 'danger', fssaiPermitted: true },
  'E127': { name: 'Erythrosine', category: 'Artificial Colour', concern: 'Contains iodine; thyroid disruption concerns', severity: 'warning', fssaiPermitted: true },
  'E129': { name: 'Allura Red AC', category: 'Artificial Colour', concern: 'Banned in Denmark, Belgium, France, Germany, Switzerland', severity: 'danger', fssaiPermitted: true },
  'E133': { name: 'Brilliant Blue FCF', category: 'Artificial Colour', concern: 'Banned in several EU countries', severity: 'warning', fssaiPermitted: true },
  'E211': { name: 'Sodium Benzoate', category: 'Preservative', concern: 'Forms benzene with Vitamin C; carcinogen risk', severity: 'danger', fssaiPermitted: true },
  'E212': { name: 'Potassium Benzoate', category: 'Preservative', concern: 'Same concerns as Sodium Benzoate', severity: 'danger', fssaiPermitted: true },
  'E220': { name: 'Sulphur Dioxide', category: 'Preservative', concern: 'Asthma trigger; destroys Vitamin B1', severity: 'warning', fssaiPermitted: true },
  'E249': { name: 'Potassium Nitrite', category: 'Preservative', concern: 'Potential carcinogen; forms nitrosamines', severity: 'danger', fssaiPermitted: true },
  'E250': { name: 'Sodium Nitrite', category: 'Preservative', concern: 'Linked to colorectal cancer', severity: 'danger', fssaiPermitted: true },
  'E319': { name: 'TBHQ', category: 'Antioxidant', concern: 'Linked to immune suppression; banned in Japan', severity: 'danger', fssaiPermitted: true },
  'E320': { name: 'BHA (Butylated Hydroxyanisole)', category: 'Antioxidant', concern: 'Possible carcinogen; endocrine disruptor', severity: 'danger', fssaiPermitted: true },
  'E321': { name: 'BHT (Butylated Hydroxytoluene)', category: 'Antioxidant', concern: 'Possible carcinogen', severity: 'warning', fssaiPermitted: true },
  'E407': { name: 'Carrageenan', category: 'Thickener', concern: 'Inflammatory bowel concerns', severity: 'warning', fssaiPermitted: true },
  'E466': { name: 'Carboxymethyl Cellulose (CMC)', category: 'Thickener', concern: 'Gut microbiome disruption in animal studies', severity: 'info', fssaiPermitted: true },
  'E471': { name: 'Mono and Diglycerides of Fatty Acids', category: 'Emulsifier', concern: 'May contain trans fats; origin unclear (animal/plant)', severity: 'info', fssaiPermitted: true },
  'E621': { name: 'Monosodium Glutamate (MSG)', category: 'Flavour Enhancer', concern: 'Headaches and sensitivity in some individuals', severity: 'warning', fssaiPermitted: true },
  'E951': { name: 'Aspartame', category: 'Artificial Sweetener', concern: 'IARC classified as possibly carcinogenic (Group 2B) in 2023', severity: 'danger', fssaiPermitted: true, maxDailyIntake: '40mg/kg body weight' },
  'E952': { name: 'Cyclamate', category: 'Artificial Sweetener', concern: 'Banned in USA; suspected carcinogen', severity: 'banned_in_eu', fssaiPermitted: false },
  'E954': { name: 'Saccharin', category: 'Artificial Sweetener', concern: 'Bladder cancer risk in animal studies', severity: 'warning', fssaiPermitted: true },
  'E955': { name: 'Sucralose', category: 'Artificial Sweetener', concern: 'Alters gut microbiome; recent DNA damage studies', severity: 'warning', fssaiPermitted: true },
  'E322': { name: 'Lecithin', category: 'Emulsifier', concern: 'Generally safe; flag if soy-derived (allergen)', severity: 'info', fssaiPermitted: true },
};

export const INGREDIENT_ORDER_FLAGS = [
  'maida', 'refined flour', 'sugar', 'glucose syrup', 'corn syrup', 'palm oil', 'hydrogenated vegetable oil', 'modified starch'
];

export const WHOLE_FOOD_POSITIVES = [
  'whole wheat atta', 'oats', 'ragi', 'jowar', 'bajra', 'brown rice', 'quinoa', 'lentils', 'dal'
];

export const ALLERGEN_LIST = [
  'peanuts', 'tree nuts', 'milk', 'dairy', 'wheat', 'gluten', 'eggs', 'soy', 'fish', 'shellfish', 'sesame', 'mustard', 'sulphites'
];

export const GM_CROPS = ['Bt cotton', 'GM soy', 'GM corn', 'GM canola', 'Golden Rice'];

export const PROCESSING_KEYWORDS = {
  ULTRA_PROCESSED_CATEGORIES: [
    'instant noodles', 'chips', 'crisps', 'wafers', 'biscuits', 'cookies',
    'candy', 'chocolate bar', 'energy drink', 'carbonated drink', 'cola', 'packaged snack',
    'flavoured milk drink', 'instant soup', 'frozen snack', 'ready-to-eat', 'microwave meal'
  ],
  ULTRA_PROCESSED_SIGNALS: [
    'artificial flavour', 'artificial colour', 'flavour enhancer', 'hydrolysed',
    'maltodextrin', 'modified starch', 'emulsifier blend'
  ],
  PROCESSED_CATEGORIES: [
    'bread', 'cheese', 'yogurt', 'canned vegetables', 'canned fruit',
    'packaged juice', 'fruit drink', 'jam', 'ketchup', 'sauce', 'pickle', 'smoked', 'cured'
  ],
  MINIMALLY_PROCESSED_CATEGORIES: [
    'raw nuts', 'seeds', 'dried fruits', 'oats', 'quinoa', 'lentils', 'pulses',
    'whole grain', 'cold-pressed oil', 'organic produce', 'fresh'
  ]
};

export const FSSAI_CATEGORY_STANDARDS: Record<string, { standardRef: string; keyLimit: string; source: string }> = {
  'biscuits': {
    standardRef: 'FSS 2.4.15',
    keyLimit: 'Max ash 2%, moisture 5%',
    source: 'FSSAI Manual of Cereals'
  },
  'noodles': {
    standardRef: 'FSS 2.4.10',
    keyLimit: 'No synthetic colours permitted',
    source: 'FSSAI Cereals Standards'
  },
  'dairy': {
    standardRef: 'FSS 2.1.1',
    keyLimit: 'Milk fat and SNF requirements vary by type',
    source: 'FSSAI Dairy Standards'
  },
  'chips': {
    standardRef: 'FSS 2.3.47',
    keyLimit: 'Acid value of extracted fat max 2.0',
    source: 'FSSAI Fruit & Veg Regulations'
  },
  'bread': {
    standardRef: 'FSS 2.4.15',
    keyLimit: 'Potassium bromate banned since 2016',
    source: 'FSSAI Food Additives'
  },
  'juice': {
    standardRef: 'FSS 2.3.6',
    keyLimit: 'Fruit content min 20% for nectar',
    source: 'FSSAI Juice Standards'
  },
  'confectionery': {
    standardRef: 'FSS 2.7.2',
    keyLimit: 'Sucrose content min 55% for candy',
    source: 'FSSAI Sweets Standards'
  },
  'sauce': {
    standardRef: 'FSS 2.3.35',
    keyLimit: 'Total soluble solids min 25% for tomato sauce',
    source: 'FSSAI Sauces Standards'
  }
};

export const SCORING_WEIGHTS: Record<CriterionKey, number> = {
  nutrition: 0.25,
  additives: 0.20,
  processing: 0.20,
  allergens: 0.15,
  biosafety_gmo: 0.10,
  ethics: 0.10
};

export const SAMPLE_RESULTS: any[] = [
  {
    productName: 'Instant Noodles',
    overallScore: 38,
    overallLevel: 'poor',
    summary: 'Ultra-processed with high sodium and additives.',
    recommendations: ['Limit consumption', 'Choose whole-grain alternatives'],
    analyzedAt: new Date().toISOString()
  },
  {
    productName: 'Organic Oats',
    overallScore: 84,
    overallLevel: 'good',
    summary: 'Minimally processed, high fibre, organic.',
    recommendations: ['Great breakfast choice', 'High in complex carbs'],
    analyzedAt: new Date().toISOString()
  }
];
