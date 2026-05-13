// SafeBite India — components/scanner/ManualInputForm.tsx — Text input interface
"use client"

import React from "react"
import { ScrollText, LayoutList, AlertCircle } from "lucide-react"

interface ManualInputFormProps {
  text: string
  setText: (text: string) => void
  productName: string
  setProductName: (name: string) => void
}

export default function ManualInputForm({ text, setText, productName, setProductName }: ManualInputFormProps) {
  const minChars = 20;
  const isTooShort = text.length > 0 && text.length < minChars;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="space-y-2">
        <label htmlFor="productName" className="text-sm font-semibold flex items-center gap-2">
          <LayoutList className="h-4 w-4 text-primary" />
          Product Name (Optional)
        </label>
        <input
          id="productName"
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="e.g., Maggi Masala Noodles"
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white"
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label htmlFor="manualText" className="text-sm font-semibold flex items-center gap-2">
            <ScrollText className="h-4 w-4 text-primary" />
            Ingredient List
          </label>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${text.length >= minChars ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
            {text.length} characters
          </span>
        </div>
        <textarea
          id="manualText"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type the ingredients exactly as shown on the label..."
          className={`w-full min-h-[250px] px-4 py-3 rounded-xl border transition-all bg-white resize-y focus:outline-none focus:ring-2 focus:ring-primary/20 ${
            isTooShort ? 'border-amber-400' : 'border-slate-200 focus:border-primary'
          }`}
        />
        {isTooShort && (
          <p className="text-amber-600 text-xs flex items-center gap-1 mt-1">
            <AlertCircle className="h-3 w-3" />
            Please enter at least {minChars} characters for a reliable analysis.
          </p>
        )}
      </div>
      
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex gap-3">
        <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
          i
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          For better results, include any E-codes (e.g., E621, E102) and percentage values mentioned on the packaging.
        </p>
      </div>
    </div>
  )
}
