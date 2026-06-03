// SafeBite India — components/scanner/ScannerTabs.tsx — Mode switcher with OCR + Manual Review
"use client"

import React, { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Scan, Type, CheckCircle2, AlertTriangle, Edit3, Sparkles } from "lucide-react"
import ImageUploader from "./ImageUploader"
import ManualInputForm from "./ManualInputForm"
import { Button } from "@/components/ui/button"
import { ScanInput } from "@/lib/types"
import LoadingOverlay from "./LoadingOverlay"

interface ScannerTabsProps {
  onAnalyze: (input: ScanInput) => Promise<void>
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

  // Manual mode state
  const [manualText, setManualText] = useState<string>('')
  const [productName, setProductName] = useState<string>('')

  // Analysis loading state
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [step, setStep] = useState(0)

  // Auto-trigger OCR when an image is selected
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

      setOcrText(data.extractedText || '')
      setShowOcrEditor(true)
    } catch (err: any) {
      console.error('OCR error:', err)
      setOcrError(err.message || 'Could not extract text from image. You can type the ingredients manually below.')
      setShowOcrEditor(true) // Still show editor so user can type manually
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
  }

  // Progress animation effect
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

  const canSubmitImage = mode === 'image' && imageBase64 && !isOcrLoading
  const canSubmitManual = mode === 'manual' && manualText.length >= 20

  const handleAnalyze = async () => {
    if (mode === 'image') {
      if (!imageBase64) {
        alert('Please upload an image first.')
        return
      }
      if (isOcrLoading) {
        alert('Please wait for the label extraction to complete.')
        return
      }
    }

    if (mode === 'manual') {
      if (!manualText) {
        alert('Please enter ingredient text.')
        return
      }
      if (manualText.length < 20) {
        alert('Please enter at least 20 characters for a reliable analysis.')
        return
      }
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
      // For image mode: use OCR text (which user may have edited) as manualText
      // The backend analyze route uses manualText if provided with mode=image
      const analysisInput: ScanInput = mode === 'image'
        ? {
            mode: 'image',
            imageBase64,
            imageMimeType,
            // Pass the (possibly edited) OCR text as manualText so backend skips re-OCR
            manualText: ocrText || undefined,
            productName: productName || undefined
          }
        : {
            mode: 'manual',
            manualText,
            productName: productName || undefined
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

  return (
    <div className="space-y-8 animate-fade-in relative">
      {isLoading && <LoadingOverlay progress={progress} step={step} />}

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

          {/* Manual Checking / Review Form — shown after OCR completes */}
          {showOcrEditor && (
            <div className="w-full max-w-2xl mx-auto space-y-5 animate-fade-in">
              {/* Header */}
              <div className="flex items-center gap-3 p-4 rounded-2xl border border-emerald-200 bg-emerald-50">
                {ocrError ? (
                  <>
                    <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-amber-700">OCR Partial — Manual Review Required</p>
                      <p className="text-xs text-amber-600 mt-0.5">{ocrError}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-emerald-700">Label extracted successfully!</p>
                      <p className="text-xs text-emerald-600 mt-0.5">Review and correct the extracted text before scanning.</p>
                    </div>
                  </>
                )}
              </div>

              {/* Product Name */}
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
                  placeholder="e.g., Maggi Masala Noodles"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white"
                />
              </div>

              {/* OCR Text Editor — Manual Checking Procedure */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label htmlFor="ocr-text-editor" className="text-sm font-semibold flex items-center gap-2">
                    <Edit3 className="h-4 w-4 text-primary" />
                    Extracted Label Text — Verify &amp; Correct
                  </label>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${ocrText.length >= 20 ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                    {ocrText.length} chars
                  </span>
                </div>
                <textarea
                  id="ocr-text-editor"
                  value={ocrText}
                  onChange={(e) => setOcrText(e.target.value)}
                  placeholder={ocrError
                    ? "OCR extraction failed. Please type or paste the ingredients list from the label manually..."
                    : "Extracted text will appear here. Edit to correct any mistakes..."}
                  className="w-full min-h-[250px] px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white resize-y font-mono text-sm"
                />
                <p className="text-[11px] text-muted-foreground flex items-start gap-1.5 mt-1">
                  <span className="text-primary font-bold shrink-0">Tip:</span>
                  Check ingredient order, E-codes (E621, E102...), nutrition values, and FSSAI license number. Accurate text gives more precise safety scores.
                </p>
              </div>
            </div>
          )}
        </TabsContent>

        {/* ── MANUAL TAB ── */}
        <TabsContent value="manual">
          {/* Product name for manual tab */}
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
                placeholder="e.g., Maggi Masala Noodles"
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

      {/* Analyse Button */}
      <div className="flex flex-col items-center gap-4 py-8 border-t">
        <Button
          id="scan-analyze-btn"
          onClick={handleAnalyze}
          disabled={
            isLoading ||
            isOcrLoading ||
            (mode === 'image' && !imageBase64) ||
            (mode === 'image' && showOcrEditor && ocrText.length < 5) ||
            (mode === 'manual' && manualText.length < 20)
          }
          size="lg"
          className="h-16 px-12 text-xl font-bold rounded-full shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all bg-primary w-full max-w-md"
        >
          {isLoading
            ? "Processing..."
            : isOcrLoading
              ? "Extracting label..."
              : mode === 'image' && !imageBase64
                ? "Upload an image to scan"
                : "Scan & Analyze Safety"}
        </Button>
        {mode === 'image' && showOcrEditor && ocrText.length > 0 && (
          <p className="text-xs text-muted-foreground text-center">
            Review the extracted label text above before scanning
          </p>
        )}
      </div>
    </div>
  )
}
