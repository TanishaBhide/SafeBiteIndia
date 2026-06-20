// SafeBite India — components/scanner/ScannerTabs.tsx — Unified Action Lane
"use client"

import React, { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Scan, Type, CheckCircle2, AlertTriangle, Edit3, Sparkles, Skull, ShieldX } from "lucide-react"
import ImageUploader from "./ImageUploader"
import ManualInputForm from "./ManualInputForm"
import { Button } from "@/components/ui/button"
import { ScanInput } from "@/lib/types"
import LoadingOverlay from "./LoadingOverlay"

interface ScannerTabsProps {
  onAnalyze: (input: ScanInput & { isSpoiled?: boolean; spoilageWarning?: string }) => Promise<void>
}

export default function ScannerTabs({ onAnalyze }: ScannerTabsProps) {
  const [mode, setMode] = useState<'image' | 'manual'>('image')

  // Image mode state
  const [imageBase64, setImageBase64] = useState<string>('')
  const [imageMimeType, setImageMimeType] = useState<string>('')
  const [isOcrLoading, setIsOcrLoading] = useState(false)
  const [ocrText, setOcrText] = useState<string>('')
  const [showOcrEditor, setShowOcrEditor] = useState(false)
  const [ocrError, setOcrError] = useState<string>('')

  // Spoilage detection state
  const [spoilageResult, setSpoilageResult] = useState<{
    isSpoiled: boolean;
    confidence: string;
    spoilageType: string;
    warningMessage: string;
  } | null>(null)

  // Manual mode state
  const [manualText, setManualText] = useState<string>('')
  const [productName, setProductName] = useState<string>('')

  // Analysis loading state
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [step, setStep] = useState(0)

  // Reset internal tracking states whenever high-level modes switch
  useEffect(() => {
    setOcrText('')
    setShowOcrEditor(false)
    setOcrError('')
    setSpoilageResult(null)
  }, [mode])

  // Process selected images and trigger initial text extraction layer
  const handleImageSelect = async (base64: string, mime: string) => {
    setImageBase64(base64)
    setImageMimeType(mime)
    setOcrText('')
    setShowOcrEditor(false)
    setOcrError('')
    setIsOcrLoading(true)

    try {
      const response = await fetch('/api/ocr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: base64, imageMimeType: mime }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'OCR failed')
      }

      // Handle spoilage detection result
      if (data.spoilageResult) {
        setSpoilageResult(data.spoilageResult)
      }

      setOcrText(data.extractedText || '')
      setShowOcrEditor(true)
    } catch (err: any) {
      console.error('OCR error:', err)
      setOcrError(err.message || 'Could not extract text from image. You can type details manually below.')
      setShowOcrEditor(true) 
    } finally {
      setIsOcrLoading(false)
    }
  }

  const handleClearImage = () => {
    setImageBase64('')
    setImageMimeType('')
    setOcrText('')
    setShowOcrEditor(false)
    setOcrError('')
    setSpoilageResult(null)
  }

  // Progress loading sequence engine
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      interval = setInterval(() => {
        setProgress(prev => {
          const next = prev + (Math.random() * 2);
          const target = (step + 1) * 25;
          if (next >= target) return target - 1;
          return next;
        });
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isLoading, step]);

  const handleAnalyze = async () => {
    if (mode === 'image' && !imageBase64) {
      alert('Please upload an image first.')
      return
    }

    if (mode === 'manual' && (!manualText || manualText.length < 20)) {
      alert('Please enter at least 20 characters for a reliable analysis.')
      return
    }

    setIsLoading(true)
    setProgress(0)
    setStep(0)

    const stepInterval = setInterval(() => {
      setStep(prev => {
        if (prev < 3) return prev + 1;
        return prev;
      });
    }, 4000);

    try {
      const analysisInput = mode === 'image'
        ? {
            mode: 'image' as const,
            imageBase64,
            imageMimeType,
            manualText: ocrText || undefined,
            productName: productName || undefined,
            isSpoiled: spoilageResult?.isSpoiled || false,
            spoilageWarning: spoilageResult?.warningMessage || '',
          }
        : {
            mode: 'manual' as const,
            manualText,
            productName: productName || undefined,
          }

      await onAnalyze(analysisInput)
      setProgress(100)
      setStep(3)
    } catch (error: any) {
      console.error(error)
      alert(error.message || 'Analysis failed. Please try again.')
    } finally {
      clearInterval(stepInterval)
      setIsLoading(false)
    }
  }

  const spoilageTypeLabels: Record<string, string> = {
    fungal_mould: 'Fungal Mould / Mycotoxin Contamination',
    rot_decay: 'Rot & Putrefactive Decay',
    expired_packaging: 'Expired / Past Best-Before Date',
    contamination: 'Foreign Contamination Detected',
    none: 'No Spoilage'
  }

  return (
    <div className="space-y-8 animate-fade-in relative">
      {isLoading && <LoadingOverlay progress={progress} step={step} />}

      {/* ── SPOILAGE DANGER BANNER ── */}
      {spoilageResult?.isSpoiled && (
        <div className="w-full max-w-2xl mx-auto animate-fade-in">
          <div
            className="relative overflow-hidden rounded-3xl border-2 border-red-500 bg-gradient-to-br from-red-950 via-red-900 to-rose-950 p-6 shadow-2xl shadow-red-900/50"
            role="alert"
            aria-live="assertive"
          >
            {/* Pulsing background glow */}
            <div className="absolute inset-0 bg-red-500/10 animate-pulse rounded-3xl" />
            
            <div className="relative flex flex-col gap-4">
              {/* Header */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-red-500 flex items-center justify-center shrink-0 shadow-lg shadow-red-500/50">
                  <ShieldX className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-red-400">⚠ FOOD SAFETY HAZARD DETECTED</p>
                  <h3 className="text-xl font-black text-white leading-tight">DO NOT CONSUME THIS FOOD</h3>
                </div>
              </div>

              {/* Spoilage type badge */}
              <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-bold px-4 py-2 rounded-full w-fit">
                <Skull className="h-3.5 w-3.5" />
                {spoilageTypeLabels[spoilageResult.spoilageType] || 'Spoilage Detected'}
                <span className="ml-1 opacity-60">· {spoilageResult.confidence} confidence</span>
              </div>

              {/* Warning message */}
              <p className="text-sm text-red-200 leading-relaxed font-medium border-l-2 border-red-500 pl-4">
                {spoilageResult.warningMessage || 'This food item shows clear signs of spoilage. Consuming it may cause food poisoning, mycotoxin exposure, or serious gastrointestinal illness. Discard immediately.'}
              </p>

              {/* Action chips */}
              <div className="flex flex-wrap gap-2 pt-1">
                {['Discard Immediately', 'Do Not Taste or Smell Closely', 'Wash Hands After Handling', 'Check Other Items in Batch'].map(tip => (
                  <span key={tip} className="text-[10px] font-bold bg-red-500/20 border border-red-500/30 text-red-300 px-3 py-1.5 rounded-full">
                    {tip}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <Tabs defaultValue="image" onValueChange={(v) => { setMode(v as any); }} className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 h-14 bg-slate-100 p-1.5 rounded-2xl">
          <TabsTrigger value="image" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm h-full gap-2">
            <Scan className="h-4 w-4" /> Upload Image
          </TabsTrigger>
          <TabsTrigger value="manual" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm h-full gap-2">
            <Type className="h-4 w-4" /> Manual Entry
          </TabsTrigger>
        </TabsList>

        {/* ── IMAGE TAB ── */}
        <TabsContent value="image" className="space-y-6">
          <ImageUploader
            onImageSelect={handleImageSelect}
            onClear={handleClearImage}
            isOcrLoading={isOcrLoading}
            showOcrEditor={showOcrEditor}
          />

          {/* Verification Workspace Component Panel */}
          {showOcrEditor && (
            <div className="w-full max-w-2xl mx-auto space-y-5 animate-fade-in">
              <div className="flex items-center gap-3 p-4 rounded-2xl border border-emerald-200 bg-emerald-50">
                {ocrError ? (
                  <>
                    <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-amber-700">Scan Notice — Verification Path Enabled</p>
                      <p className="text-xs text-amber-600 mt-0.5">{ocrError}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-emerald-700">Label text extracted successfully!</p>
                      <p className="text-xs text-emerald-600 mt-0.5">Review, verify, or adjust the context text content window below before running analytics.</p>
                    </div>
                  </>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="ocr-product-name" className="text-sm font-semibold flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Product Name (Optional)
                </label>
                <input
                  id="ocr-product-name"
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="e.g., Masala Munch Snacks"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label htmlFor="ocr-text-editor" className="text-sm font-semibold flex items-center gap-2">
                    <Edit3 className="h-4 w-4 text-primary" />
                    Extracted Content Data — Review &amp; Verify
                  </label>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${ocrText.length >= 20 ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                    {ocrText.length} chars
                  </span>
                </div>
                <textarea
                  id="ocr-text-editor"
                  value={ocrText}
                  onChange={(e) => setOcrText(e.target.value)}
                  placeholder="Extracted data markers will show up here. Add items or fix text manually..."
                  className="w-full min-h-[250px] px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white resize-y font-mono text-sm"
                />
              </div>
            </div>
          )}
        </TabsContent>

        {/* ── MANUAL TAB ── */}
        <TabsContent value="manual">
          <div className="w-full max-w-2xl mx-auto space-y-4 mb-4">
            <div className="space-y-2">
              <label htmlFor="manual-product-name" className="text-sm font-semibold flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                Product Name (Optional)
              </label>
              <input
                id="manual-product-name"
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter item name..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white"
              />
            </div>
          </div>
          <ManualInputForm
            text={manualText}
            setText={setManualText}
            productName={productName}
            setProductName={setProductName}
          />
        </TabsContent>
      </Tabs>

      {/* Unified Action Launch Point */}
      <div className="flex flex-col items-center gap-4 py-8 border-t">
        <Button
          id="scan-analyze-btn"
          onClick={handleAnalyze}
          disabled={
            isLoading ||
            isOcrLoading ||
            (mode === 'image' && !imageBase64) ||
            (mode === 'image' && showOcrEditor && ocrText.length < 3) ||
            (mode === 'manual' && manualText.length < 20)
          }
          size="lg"
          className="h-16 px-12 text-xl font-bold rounded-full shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all bg-primary w-full max-w-md text-white"
        >
          {isLoading
            ? "Processing..."
            : isOcrLoading
              ? "Extracting..."
              : mode === 'image' && !imageBase64
                ? "Upload an image to scan"
                : "Scan Here"}
        </Button>
      </div>
    </div>
  )
}