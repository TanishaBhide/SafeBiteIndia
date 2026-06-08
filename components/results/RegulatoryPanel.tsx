// SafeBite India — components/results/RegulatoryPanel.tsx — Resilient Matcher Hub
"use client"

import React from 'react';
import { Scale, CheckCircle2, AlertTriangle, ExternalLink } from 'lucide-react';
import { FSSAI_CATEGORY_STANDARDS } from '@/lib/constants';

interface RegulatoryPanelProps {
  category: string;
  findings: string[];
  hasLicense: boolean;
  fssaiNumber: string | null;
}

// Structured mapping dictionary to safely catch our new dynamic classifications
const INLINE_FALLBACK_STANDARDS = {
  junkFood: {
    standardRef: "FSS 2.3.35 / HFSS",
    keyLimit: "Mandatory warning limits on added empty sugars, high sodium, and trans-fat saturation levels.",
    source: "FSSAI Labelling Regulations",
    linkUrl: "https://www.fssai.gov.in/cms/food-safety-and-standards-regulations.php"
  },
  freshWholeFood: {
    standardRef: "FSSAI Fresh Produce Rules",
    keyLimit: "Exempt from mandatory nutrition panels if single-ingredient. Must comply with pesticide residue ceilings and artificial ripening bans.",
    source: "FSSAI Fruits & Veg Regulations",
    linkUrl: "https://www.fssai.gov.in/cms/food-safety-and-standards-regulations.php"
  },
  preparedMeal: {
    standardRef: "FSS Catering 2018",
    keyLimit: "Requires balanced nutritional serving profiles and safe preparation hygiene ratings.",
    source: "FSSAI Catering Guidelines",
    linkUrl: "https://www.fssai.gov.in/cms/guidance-documents.php"
  },
  sauceDefault: {
    standardRef: "FSS 2.3.35",
    keyLimit: "Total soluble solids min 25% for tomato sauce.",
    source: "FSSAI Sauces Standards",
    linkUrl: "https://www.fssai.gov.in/"
  }
};

export default function RegulatoryPanel({ category, findings, hasLicense, fssaiNumber }: RegulatoryPanelProps) {
  const currentCategory = category || "";
  const lowerCategory = currentCategory.toLowerCase();
  
  // 1. INTELLIGENT MATCHING MATRIX: Resolves partial text variations cleanly
  let standard = FSSAI_CATEGORY_STANDARDS[lowerCategory];

  if (!standard) {
    if (
      lowerCategory.includes("junk") || 
      lowerCategory.includes("ultra-processed") || 
      lowerCategory.includes("snack")
    ) {
      standard = INLINE_FALLBACK_STANDARDS.junkFood;
    } else if (
      lowerCategory.includes("fruit") || 
      lowerCategory.includes("vegetable") || 
      lowerCategory.includes("produce") || 
      lowerCategory.includes("raw") ||
      lowerCategory.includes("meal") && lowerCategory.includes("meals") === false // Safety edge case check
    ) {
      standard = INLINE_FALLBACK_STANDARDS.freshWholeFood;
    } else if (
      lowerCategory.includes("meal") || 
      lowerCategory.includes("cooked") || 
      lowerCategory.includes("catering")
    ) {
      standard = INLINE_FALLBACK_STANDARDS.preparedMeal;
    } else {
      // Ultimate baseline default standard fallback if all lookups miss
      standard = INLINE_FALLBACK_STANDARDS.sauceDefault;
    }
  }

  // Resolve the destination URL safely
  const targetUrl = (standard as any).linkUrl || "https://www.fssai.gov.in/";

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
            <Scale className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Regulatory Context</h3>
            <p className="text-sm text-slate-500">Based on FSSAI 2024 Guidelines</p>
          </div>
        </div>
        
        {hasLicense ? (
          <div className="flex flex-col items-end">
            <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="h-3 w-3" /> FSSAI Verified
            </div>
            <p className="text-[10px] text-slate-400 mt-1 font-mono">{fssaiNumber}</p>
          </div>
        ) : (
          <div className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5">
            <AlertTriangle className="h-3 w-3" /> No License Found
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Category Standard</h4>
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold capitalize">{currentCategory}</span>
              <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-slate-200">{standard.standardRef}</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              <span className="font-bold text-slate-900">Key Requirement:</span> {standard.keyLimit}
            </p>
            
            {/* Real working link pointing out to a fresh window safely */}
            <a 
              href={targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[10px] text-indigo-600 font-bold hover:underline transition-all mt-1"
            >
              View Source: {standard.source} <ExternalLink className="h-2.5 w-2.5" />
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">AI Compliance Findings</h4>
          <div className="space-y-2">
            {findings && findings.length > 0 ? (
              findings.map((finding, i) => (
                <div key={i} className="flex gap-3 text-xs text-slate-600 leading-relaxed p-2 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                  {finding}
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 italic">No specific regulatory violations identified from label text.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}