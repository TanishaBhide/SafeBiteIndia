// SafeBite India — app/about/page.tsx — Premium Educational & Syllabus Hub
"use client"

import React, { useState } from "react"
import { 
  BookOpen, 
  ShieldAlert, 
  Dna, 
  ClipboardCheck, 
  FileText, 
  Leaf, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle, 
  RotateCcw,
  AlertTriangle,
  FileCheck,
  TrendingUp,
  Globe2
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Definition of types for syllabus data
interface SubSection {
  title: string
  content: string
  bullets?: string[]
}

interface UnitData {
  id: string
  num: string
  title: string
  shortDesc: string
  icon: React.ReactNode
  colorClass: string
  bgClass: string
  borderClass: string
  textClass: string
  overview: string
  sections: SubSection[]
  quiz: {
    question: string
    options: string[]
    answerIndex: number
    explanation: string
  }
}

export default function AboutPage() {
  const [activeUnit, setActiveUnit] = useState<string>("unit1")
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState<boolean>(false)

  // Quiz reset helper when changing units
  const handleUnitChange = (unitId: string) => {
    setActiveUnit(unitId)
    setSelectedAnswer(null)
    setShowExplanation(false)
  }

  const units: UnitData[] = [
    {
      id: "unit1",
      num: "Unit I",
      title: "Introduction to Biosafety",
      shortDesc: "Understanding biological containment levels (BSL-1 to BSL-4), biohazards, and core containment principles.",
      icon: <ShieldAlert className="h-6 w-6" />,
      colorClass: "from-blue-500 to-indigo-600",
      bgClass: "bg-blue-50/50",
      borderClass: "border-blue-100",
      textClass: "text-blue-700",
      overview: "Biosafety is the application of safety precautions, containment measures, and laboratory practices to prevent accidental exposure to or release of infectious agents and biohazards. This unit details the four Biosafety Levels (BSL-1 to BSL-4) established by international health guidelines.",
      sections: [
        {
          title: "Biosafety Levels (BSL-1 to BSL-4) Matrix",
          content: "Laboratories are classified based on the infectivity, severity of disease, transmission mechanism, and the nature of the work being performed:",
          bullets: [
            "BSL-1 (Basic Containment): For well-characterized agents not known to consistently cause disease in immunocompetent adult humans (e.g., non-pathogenic E. coli). Requires standard microbiological practices, personal protective equipment (PPE), and an open bench.",
            "BSL-2 (Moderate Containment): For agents associated with human disease of moderate severity (e.g., Salmonella, Hepatitis B, Influenza). Requires BSL-1 practices plus biohazard signs, restricted access, autoclave facilities, and Biosafety Cabinets (BSCs) for aerosol-generating procedures.",
            "BSL-3 (High Containment): For indigenous or exotic agents causing serious or potentially lethal diseases through respiratory transmission (e.g., Mycobacterium tuberculosis, SARS-CoV-2). Requires controlled access, directional airflow (negative pressure), HEPA filtration, and double-door entry.",
            "BSL-4 (Maximum Containment): For dangerous/exotic agents posing high risk of life-threatening disease, aerosol transmission, or with no vaccine/therapy (e.g., Ebola virus, Marburg virus). Requires dedicated supply/exhaust air, vacuum lines, shower rooms, and positive-pressure protective suits (space suits)."
          ]
        },
        {
          title: "Core Containment Principles",
          content: "Containment refers to safe methods for managing infectious agents in the laboratory. It consists of three primary elements:",
          bullets: [
            "Primary Containment: Protection of laboratory personnel and the immediate laboratory environment. Achieved through good microbiological techniques and safety equipment (like Class I, II, and III Biosafety Cabinets).",
            "Secondary Containment: Protection of the environment external to the laboratory. Achieved through facility design, HVAC ventilation control (directional airflow), air locks, and waste treatment systems.",
            "Biohazard Waste Management: Strict protocol of autoclaving (steam sterilization under pressure), chemical inactivation, or incineration before disposal to prevent environmental contamination."
          ]
        }
      ],
      quiz: {
        question: "Which Biosafety Level (BSL) is strictly required for handling aerosol-transmitted, highly lethal pathogens like Mycobacterium tuberculosis?",
        options: ["BSL-1", "BSL-2", "BSL-3", "BSL-4"],
        answerIndex: 2,
        explanation: "BSL-3 is required for pathogens that cause serious or lethal disease through inhalation/aerosols. BSL-4 is reserved for agents with no known vaccine or therapy (like Ebola) and requires positive-pressure space suits."
      }
    },
    {
      id: "unit2",
      num: "Unit II",
      title: "GMOs & Biosafety Regulation",
      shortDesc: "Genetically Modified Organisms (GMOs), national regulatory frameworks (GEAC), Cartagena Protocol, and risk assessment.",
      icon: <Dna className="h-6 w-6" />,
      colorClass: "from-purple-500 to-pink-600",
      bgClass: "bg-purple-50/50",
      borderClass: "border-purple-100",
      textClass: "text-purple-700",
      overview: "With the rise of recombinant DNA technology, the release of Genetically Modified Organisms (GMOs) requires rigorous regulatory oversight. This unit covers the scientific principles of GMO assessment, the Cartagena Protocol on Biosafety, and India's regulatory bodies.",
      sections: [
        {
          title: "India's Apex Regulatory Body: GEAC",
          content: "The Genetic Engineering Appraisal Committee (GEAC) under the Ministry of Environment, Forest and Climate Change (MoEFCC) is responsible for approving activities involving large-scale use of hazardous microorganisms and recombinants in research and industrial production. It is also the statutory body that permits environmental release of GM crops (such as Bt Cotton and GM Mustard).",
        },
        {
          title: "Cartagena Protocol on Biosafety",
          content: "An international treaty governing the movements of Living Modified Organisms (LMOs) resulting from modern biotechnology from one country to another. Key pillars include:",
          bullets: [
            "Advance Informed Agreement (AIA) Procedure: Ensures that importing countries have the opportunity to assess safety risks before consenting to import LMOs meant for intentional release.",
            "Biosafety Clearing-House (BCH): A platform to facilitate the exchange of scientific, technical, environmental, and legal information on LMOs.",
            "Precautionary Approach: Lack of scientific certainty due to insufficient relevant scientific information shall not prevent a party from taking a decision in order to avoid or minimize adverse effects."
          ]
        },
        {
          title: "Environmental Risk Assessment (ERA)",
          content: "Before a GMO is commercialized, researchers must conduct ERA covering potential ecological hazards:",
          bullets: [
            "Gene Flow & Outcrossing: The risk of transgene transfer to wild relatives or conventional crops (leading to 'superweeds' or genetic contamination).",
            "Non-Target Organism Effects: Evaluating if insecticidal proteins (e.g., Bt toxins) harm beneficial insects like honeybees or butterflies.",
            "Development of Resistance: The likelihood of target pests developing resistance to genetically engineered traits over time."
          ]
        }
      ],
      quiz: {
        question: "Which committee is the apex authority in India for approving the environmental release of genetically modified crops?",
        options: ["RCGM (Review Committee on Genetic Manipulation)", "GEAC (Genetic Engineering Appraisal Committee)", "FSSAI (Food Safety Standards Authority)", "NBPGR (National Bureau of Plant Genetic Resources)"],
        answerIndex: 1,
        explanation: "GEAC (Genetic Engineering Appraisal Committee) is the statutory body in India responsible for appraisal of proposals relating to release of genetically engineered organisms and products into the environment."
      }
    },
    {
      id: "unit3",
      num: "Unit III",
      title: "Food Biosafety Standards & HACCP",
      shortDesc: "Hazard Analysis Critical Control Point (HACCP) principles, biological/chemical foodborne hazards, and safety assurance.",
      icon: <ClipboardCheck className="h-6 w-6" />,
      colorClass: "from-emerald-500 to-teal-600",
      bgClass: "bg-emerald-50/50",
      borderClass: "border-emerald-100",
      textClass: "text-emerald-700",
      overview: "Food safety relies on preventative control systems rather than end-product testing. The Hazard Analysis Critical Control Point (HACCP) is a systematic approach to identifying, evaluating, and controlling food safety hazards.",
      sections: [
        {
          title: "The 7 Principles of HACCP",
          content: "HACCP is implemented globally to secure food manufacturing chains from farm to fork:",
          bullets: [
            "1. Conduct a Hazard Analysis: Identify potential hazards (biological, chemical, physical) that could cause illness or injury.",
            "2. Determine Critical Control Points (CCPs): Locate points in the process where control can be applied to prevent, eliminate, or reduce a safety hazard to acceptable levels.",
            "3. Establish Critical Limits: Set maximum or minimum values (e.g., temperature, time, pH) to which a hazard must be controlled at each CCP.",
            "4. Establish Monitoring Procedures: Implement systemized observations or measurements to assess if a CCP is under control.",
            "5. Establish Corrective Actions: Define steps to take when monitoring indicates that a critical limit has been breached.",
            "6. Establish Verification Procedures: Perform audits, tests, and reviews to confirm that the HACCP plan is working effectively.",
            "7. Establish Record-Keeping Procedures: Maintain comprehensive documentation including hazard analysis, written HACCP plans, and monitoring logs."
          ]
        },
        {
          title: "Foodborne Hazards Classification",
          content: "SafeBite evaluates labels to detect risks stemming from these hazards:",
          bullets: [
            "Biological Hazards: Pathogenic bacteria (Salmonella, Listeria), viruses (Norovirus), and toxins produced by molds (Mycotoxins like Aflatoxin).",
            "Chemical Hazards: Heavy metals, pesticide residues, veterinary drug residues, and unapproved food coloring or excessive chemical preservatives.",
            "Physical Hazards: Foreign objects like glass, metal shards, or stones that accidentally enter food processing streams."
          ]
        }
      ],
      quiz: {
        question: "Which HACCP principle involves setting maximum or minimum limits (such as cooking temperature or pH) to prevent food hazards?",
        options: ["Principle 1: Hazard Analysis", "Principle 2: Determine CCPs", "Principle 3: Establish Critical Limits", "Principle 5: Corrective Actions"],
        answerIndex: 2,
        explanation: "Principle 3 is establishing Critical Limits. A critical limit represents the safety boundaries (e.g. heating food to minimum 74°C) to ensure control at a Critical Control Point."
      }
    },
    {
      id: "unit4",
      num: "Unit IV",
      title: "Food Labeling Regulations in India",
      shortDesc: "FSSAI standards, deciphering E-codes, allergen declarations, and identifying clean labels.",
      icon: <FileText className="h-6 w-6" />,
      colorClass: "from-amber-500 to-orange-600",
      bgClass: "bg-amber-50/50",
      borderClass: "border-amber-100",
      textClass: "text-amber-700",
      overview: "Food labels are legal documents governed in India by the Food Safety and Standards Authority of India (FSSAI). Under FSSAI (Labelling and Display) Regulations, food packages must convey key allergen, nutritional, and ingredient warnings.",
      sections: [
        {
          title: "FSSAI Mandatory Labeling Requirements",
          content: "Every pre-packaged food sold in India must display the following details:",
          bullets: [
            "FSSAI License Number: A 14-digit registration code verifying the safety compliance of the manufacturing facility.",
            "Veg/Non-Veg Logo: A green filled circle inside a green outline square for vegetarian food, and a brown filled triangle inside a brown outline square for non-vegetarian food.",
            "Nutrition Information Panel: Declaration of energy (kcal), protein, carbohydrates (including added sugars), and sodium per 100g or per single serving.",
            "Allergen Declaration: Bold warning statements for common food allergens (e.g., 'Contains Wheat, Gluten, Milk' or 'May contain traces of Peanuts')."
          ]
        },
        {
          title: "Deciphering Food Additive E-Codes",
          content: "E-codes are international codes for food additives approved in Europe and widely adopted in India. They indicate substances added for specific functions:",
          bullets: [
            "E100–E199 (Colorings): Additives that restore or add visual color. (e.g., E102 Tartrazine - an azo dye linked to hyperactivity in kids).",
            "E200–E299 (Preservatives): Extend shelf-life by preventing microbial growth. (e.g., E211 Sodium Benzoate, E220 Sulfur Dioxide).",
            "E300–E399 (Antioxidants/Acidity Regulators): Prevent fat oxidation and maintain product stability. (e.g., E300 Ascorbic Acid / Vitamin C, E322 Lecithin).",
            "E600–E699 (Flavor Enhancers): Intensify umami or savory taste. (e.g., E621 Monosodium Glutamate / MSG)."
          ]
        }
      ],
      quiz: {
        question: "What does an E-code in the 200 range (e.g., E211, E202) typically represent on a food ingredient label?",
        options: ["Food Colorings", "Preservatives", "Antioxidants", "Flavor Enhancers"],
        answerIndex: 1,
        explanation: "The E200-E299 range is dedicated to Preservatives (such as Sodium Benzoate E211 or Potassium Sorbate E202) which inhibit bacteria, yeast, and molds."
      }
    },
    {
      id: "unit5",
      num: "Unit V",
      title: "Ethical & Environmental Concerns",
      shortDesc: "Socio-ethical concerns of bio-patenting, environmental footprint of palm oil, and sustainable consumption.",
      icon: <Leaf className="h-6 w-6" />,
      colorClass: "from-teal-500 to-green-600",
      bgClass: "bg-teal-50/50",
      borderClass: "border-teal-100",
      textClass: "text-teal-700",
      overview: "Food safety extends beyond human toxicology to the safety of our planet. Modern industrial agriculture raises critical questions regarding genetic patents, resource exploitation, biodiversity loss, and climate change.",
      sections: [
        {
          title: "Bio-patenting & Ethics",
          content: "The patenting of life forms and gene sequences raises significant ethical debates:",
          bullets: [
            "Biopiracy: The exploitation of indigenous biodiversity and traditional knowledge by multinational corporations without fair compensation (e.g., attempts to patent neem or basmati traits).",
            "Monopolization of Seeds: Seed patents prevent farmers from saving and reusing seeds, forcing yearly purchases from biotechnology firms and creating financial distress.",
            "Equity in Biotechnology: Disparities in access to advanced agricultural benefits between developed nations and smallholder farmers in developing nations."
          ]
        },
        {
          title: "The Palm Oil Crisis & Carbon Footprint",
          content: "Palm oil is the cheapest and most widely used vegetable oil, found in 50% of packaged supermarket products. However, its production causes significant environmental damage:",
          bullets: [
            "Deforestation & Biodiversity Loss: Clearing tropical rainforests in Southeast Asia to establish oil palm plantations destroys habitats for endangered species like orangutans, tigers, and elephants.",
            "Greenhouse Gas Emissions: Draining and burning carbon-rich peatlands releases massive quantities of CO2, driving global heating.",
            "Identifying Alternatives: Looking for sustainable certifications (like RSPO - Roundtable on Sustainable Palm Oil) or products using local, less carbon-intensive oils like mustard, sunflower, or peanut oil."
          ]
        }
      ],
      quiz: {
        question: "What major environmental issue is primarily associated with the uncertified, mass-scale cultivation of oil palms?",
        options: ["Peatland burning & destruction of critical orangutan habitats", "Ozone layer depletion", "Acid rain formation", "Eutrophication of deep sea oceans"],
        answerIndex: 0,
        explanation: "Uncertified palm oil cultivation leads to massive deforestation in tropical rainforests (particularly Indonesia and Malaysia), peatland drainage/burning, and destruction of habitats for endangered wildlife."
      }
    }
  ]

  const activeUnitData = units.find(u => u.id === activeUnit) || units[0]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header Hero Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Badge className="px-3 py-1 text-xs font-semibold tracking-wide uppercase bg-primary/10 text-primary border border-primary/20 rounded-full">
            Educational Hub
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            Biosafety, Food Standards &amp; Ethics
          </h1>
          <p className="text-lg text-slate-600 font-medium">
            An interactive educational companion mapping the curriculum of Biosafety &amp; Food safety standards. Discover containment guidelines, FSSAI rules, and ecological ethics.
          </p>
        </div>

        {/* Unit Selector Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {units.map((unit) => {
            const isActive = unit.id === activeUnit
            return (
              <button
                key={unit.id}
                onClick={() => handleUnitChange(unit.id)}
                className={`relative flex flex-col items-start text-left p-5 rounded-2xl border transition-all duration-300 hover:scale-[1.03] hover:shadow-md ${
                  isActive 
                    ? `bg-white border-slate-300 shadow-lg ring-2 ring-primary/20` 
                    : `bg-white/80 border-slate-200/60 opacity-70 hover:opacity-100`
                }`}
              >
                {/* Visual Accent Bar */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl bg-gradient-to-r ${unit.colorClass}`} />
                
                <div className="mt-2 flex items-center justify-between w-full">
                  <span className="text-[11px] font-bold tracking-wider uppercase text-muted-foreground">{unit.num}</span>
                  <div className={`p-1.5 rounded-lg bg-slate-100 ${isActive ? unit.textClass + ' bg-slate-50' : ''}`}>
                    {unit.icon}
                  </div>
                </div>
                
                <h3 className="font-bold text-sm text-slate-800 mt-4 line-clamp-2 leading-snug">
                  {unit.title}
                </h3>
              </button>
            )
          })}
        </div>

        {/* Detailed Unit Viewer */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-slate-200/80 shadow-md bg-white overflow-hidden rounded-3xl">
              <CardHeader className="relative p-6 sm:p-8 border-b border-slate-100 bg-slate-50/50">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <Badge variant="outline" className={`px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider rounded-md border ${activeUnitData.borderClass} ${activeUnitData.bgClass} ${activeUnitData.textClass}`}>
                      {activeUnitData.num} Syllabus Module
                    </Badge>
                    <CardTitle className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                      {activeUnitData.title}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 sm:p-8 space-y-8">
                {/* Overview Box */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wide text-slate-500 flex items-center gap-1.5">
                    <BookOpen className="h-3.5 w-3.5 text-primary" /> Module Overview
                  </h4>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {activeUnitData.overview}
                  </p>
                </div>

                {/* Subsections list */}
                <div className="space-y-8">
                  {activeUnitData.sections.map((section, idx) => (
                    <div key={idx} className="space-y-3">
                      <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary text-xs font-bold">
                          {idx + 1}
                        </span>
                        {section.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed pl-8">
                        {section.content}
                      </p>
                      {section.bullets && (
                        <ul className="space-y-2.5 pl-8 mt-2">
                          {section.bullets.map((bullet, bidx) => {
                            // Extract title if structured like 'Title: content'
                            const parts = bullet.split(": ")
                            if (parts.length > 1) {
                              return (
                                <li key={bidx} className="text-slate-600 text-sm leading-relaxed flex items-start gap-2">
                                  <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                  <span>
                                    <strong className="text-slate-900 font-semibold">{parts[0]}</strong>: {parts.slice(1).join(": ")}
                                  </span>
                                </li>
                              )
                            }
                            return (
                              <li key={bidx} className="text-slate-600 text-sm leading-relaxed flex items-start gap-2">
                                <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                <span>{bullet}</span>
                              </li>
                            )
                          })}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Interactive Visual Feature depending on active unit */}
            {activeUnit === "unit1" && (
              <Card className="border-blue-100 bg-gradient-to-br from-blue-50/30 to-indigo-50/20 rounded-3xl p-6 shadow-sm border">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5 text-indigo-600" /> Containment Facility Reference Chart
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  {[
                    { lvl: "BSL-1", agent: "E. coli (K12)", barrier: "Open bench, lab coat", hazard: "Minimal / Low" },
                    { lvl: "BSL-2", agent: "Influenza / Salmonella", barrier: "BSC Class II, restricted access", hazard: "Moderate" },
                    { lvl: "BSL-3", agent: "SARS-CoV-2 / TB", barrier: "Negative air, double doors", hazard: "High respiratory" },
                    { lvl: "BSL-4", agent: "Ebola / Lassa", barrier: "Positive-pressure suits", hazard: "Lethal / Exotic" }
                  ].map((x, i) => (
                    <div key={i} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
                      <span className="text-xs font-black text-indigo-600">{x.lvl}</span>
                      <span className="font-bold text-sm text-slate-800 mt-2">{x.agent}</span>
                      <span className="text-[11px] text-slate-500 mt-1">{x.barrier}</span>
                      <span className="text-[10px] mt-2 inline-block px-1.5 py-0.5 rounded bg-slate-100 font-bold self-start">{x.hazard}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {activeUnit === "unit3" && (
              <Card className="border-emerald-100 bg-gradient-to-br from-emerald-50/30 to-teal-50/20 rounded-3xl p-6 shadow-sm border">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <ClipboardCheck className="h-5 w-5 text-emerald-600" /> HACCP Workflow Cycle
                </h3>
                <div className="flex flex-col sm:flex-row gap-2 justify-between items-stretch">
                  {[
                    { step: "1. Identify Hazards", desc: "Chemical, biological or physical list" },
                    { step: "2. Locate CCPs", desc: "Critical stages to lock safety limits" },
                    { step: "3. Monitor Limits", desc: "Continuous testing and logging" },
                    { step: "4. Verify & Audit", desc: "Periodic review of the safety cycle" }
                  ].map((x, i) => (
                    <div key={i} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex-1 flex flex-col">
                      <span className="text-[11px] font-bold text-emerald-600">{x.step}</span>
                      <span className="text-xs text-slate-500 mt-1">{x.desc}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {activeUnit === "unit4" && (
              <Card className="border-amber-100 bg-gradient-to-br from-amber-50/30 to-orange-50/20 rounded-3xl p-6 shadow-sm border">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <FileCheck className="h-5 w-5 text-amber-600" /> Typical Food Label Structure (FSSAI)
                </h3>
                <div className="bg-white border rounded-2xl p-5 shadow-sm space-y-4 max-w-md mx-auto font-mono text-xs text-slate-600">
                  <div className="border-b pb-2 flex justify-between items-center">
                    <span className="font-bold text-slate-800">NUTRI-PACK FLAKES</span>
                    <span className="h-3 w-3 rounded-full bg-green-600 border flex items-center justify-center" title="Veg Mark" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400">INGREDIENTS:</span>
                    <p className="leading-relaxed">Whole Wheat (62%), Added Sugar (8%), High Fructose Corn Syrup, Preservative (E211), Emulsifier (E322), Synthetic Colors (E102, E129)</p>
                  </div>
                  <div className="border-t border-b py-2 space-y-1">
                    <div className="flex justify-between"><span>Energy</span><span>380 kcal</span></div>
                    <div className="flex justify-between"><span>Total Fat</span><span>1.2 g</span></div>
                    <div className="flex justify-between font-bold text-slate-800"><span>Added Sugars</span><span className="text-red-500">12 g * High</span></div>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-slate-400">
                    <span>LIC NO: 10020011000142</span>
                    <span className="border px-1 rounded border-slate-300">FSSAI APPROVED</span>
                  </div>
                </div>
              </Card>
            )}

            {activeUnit === "unit5" && (
              <Card className="border-teal-100 bg-gradient-to-br from-teal-50/30 to-green-50/20 rounded-3xl p-6 shadow-sm border">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Globe2 className="h-5 w-5 text-teal-600" /> Vegetable Oil Ecological Comparison
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-rose-100 shadow-sm">
                    <h4 className="font-bold text-rose-700 text-sm flex items-center gap-1.5">
                      <AlertTriangle className="h-4 w-4" /> Industrial Palm Oil
                    </h4>
                    <ul className="text-xs text-slate-600 space-y-1.5 mt-2 list-disc pl-4">
                      <li>Extreme biodiversity impact (orangutan habitat lost)</li>
                      <li>High peat soil CO2 release when cleared</li>
                      <li>Often linked to biopiracy &amp; land rights abuse</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-sm">
                    <h4 className="font-bold text-emerald-700 text-sm flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4" /> Sustainable Alternates (RSPO/Local)
                    </h4>
                    <ul className="text-xs text-slate-600 space-y-1.5 mt-2 list-disc pl-4">
                      <li>Local oils (Mustard, Peanut, Sesame) have low transport miles</li>
                      <li>RSPO-certified sources guarantee zero-deforestation</li>
                      <li>Supports smaller local agricultural systems in India</li>
                    </ul>
                  </div>
                </div>
              </Card>
            )}

          </div>

          {/* Sidebar Interactive Quiz */}
          <div className="space-y-6">
            <Card className="border-slate-200/80 shadow-md bg-white rounded-3xl overflow-hidden">
              <CardHeader className="bg-slate-50 border-b border-slate-100 p-6">
                <CardTitle className="text-lg font-bold flex items-center gap-2 text-slate-800">
                  <HelpCircle className="h-5 w-5 text-primary" />
                  Knowledge Check
                </CardTitle>
                <CardDescription className="text-xs">
                  Test your understanding of the {activeUnitData.num} curriculum.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-5">
                <p className="font-bold text-sm text-slate-900 leading-snug">
                  {activeUnitData.quiz.question}
                </p>
                
                <div className="space-y-2">
                  {activeUnitData.quiz.options.map((option, idx) => {
                    const isSelected = selectedAnswer === idx
                    const isCorrect = idx === activeUnitData.quiz.answerIndex
                    
                    let optionBtnClass = "border-slate-200 text-slate-700 bg-white hover:bg-slate-50"
                    if (showExplanation) {
                      if (isCorrect) {
                        optionBtnClass = "border-green-300 text-green-700 bg-green-50/50"
                      } else if (isSelected) {
                        optionBtnClass = "border-red-300 text-red-700 bg-red-50/50"
                      } else {
                        optionBtnClass = "border-slate-100 text-slate-400 bg-slate-50/30"
                      }
                    } else if (isSelected) {
                      optionBtnClass = "border-primary text-primary bg-primary/5 ring-1 ring-primary/20"
                    }

                    return (
                      <button
                        key={idx}
                        disabled={showExplanation}
                        onClick={() => setSelectedAnswer(idx)}
                        className={`w-full text-left px-4 py-3 rounded-xl border text-xs font-semibold transition-all flex items-center justify-between ${optionBtnClass}`}
                      >
                        <span>{option}</span>
                        {showExplanation && isCorrect && (
                          <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                        )}
                        {showExplanation && isSelected && !isCorrect && (
                          <AlertTriangle className="h-4 w-4 text-red-600 shrink-0" />
                        )}
                      </button>
                    )
                  })}
                </div>

                {!showExplanation ? (
                  <button
                    disabled={selectedAnswer === null}
                    onClick={() => setShowExplanation(true)}
                    className="w-full py-3 bg-primary hover:bg-primary/95 disabled:bg-slate-100 disabled:text-slate-400 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center justify-center gap-1"
                  >
                    Submit Answer <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                ) : (
                  <div className="space-y-4 pt-2">
                    <div className={`p-4 rounded-xl text-xs leading-relaxed border ${
                      selectedAnswer === activeUnitData.quiz.answerIndex 
                        ? "bg-green-50 border-green-100 text-green-800" 
                        : "bg-red-50 border-red-100 text-red-800"
                    }`}>
                      <span className="font-bold block mb-1">
                        {selectedAnswer === activeUnitData.quiz.answerIndex ? "Correct!" : "Incorrect"}
                      </span>
                      {activeUnitData.quiz.explanation}
                    </div>
                    
                    <button
                      onClick={() => {
                        setSelectedAnswer(null)
                        setShowExplanation(false)
                      }}
                      className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                    >
                      <RotateCcw className="h-3.5 w-3.5" /> Reset Quiz
                    </button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-slate-200/80 shadow-md bg-white rounded-3xl p-6 text-center space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto text-primary">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-slate-900">Scan Real Products</h4>
                <p className="text-xs text-slate-500 leading-normal">
                  Put your biosafety knowledge to the test by uploading ingredients labels or entering list texts in our safety scanner.
                </p>
              </div>
              <a
                href="/scanner"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline pt-1"
              >
                Go to Safety Scanner <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </Card>
          </div>

        </div>

      </div>
    </div>
  )
}
