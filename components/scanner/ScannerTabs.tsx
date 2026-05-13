// SafeBite India — components/scanner/ScannerTabs.tsx — Mode switcher
"use client"

import React, { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Scan, Type } from "lucide-react"
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
  const [imageBase64, setImageBase64] = useState<string>('')
  const [imageMimeType, setImageMimeType] = useState<string>('')
  const [manualText, setManualText] = useState<string>('')
  const [productName, setProductName] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [step, setStep] = useState(0)

  // Simulation of progress based on steps
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

    // Manual step progression (simulated for UI, but real steps in API)
    const stepInterval = setInterval(() => {
      setStep(prev => {
        if (prev < 3) return prev + 1;
        return prev;
      });
    }, 4000);

    try {
      await onAnalyze({
        mode,
        imageBase64: mode === 'image' ? imageBase64 : undefined,
        imageMimeType: mode === 'image' ? imageMimeType : undefined,
        manualText: mode === 'manual' ? manualText : undefined,
        productName: productName || undefined
      })
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
      
      <Tabs defaultValue="image" onValueChange={(v) => setMode(v as any)} className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 h-14 bg-slate-100 p-1.5 rounded-2xl">
          <TabsTrigger value="image" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm h-full gap-2">
            <Scan className="h-4 w-4" /> Upload Image
          </TabsTrigger>
          <TabsTrigger value="manual" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm h-full gap-2">
            <Type className="h-4 w-4" /> Manual Entry
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="image">
          <ImageUploader 
            onImageSelect={(base64, mime) => { setImageBase64(base64); setImageMimeType(mime); }}
            onClear={() => { setImageBase64(''); setImageMimeType(''); }}
          />
        </TabsContent>
        
        <TabsContent value="manual">
          <ManualInputForm 
            text={manualText} 
            setText={setManualText}
            productName={productName}
            setProductName={setProductName}
          />
        </TabsContent>
      </Tabs>

      <div className="flex flex-col items-center gap-4 py-8 border-t">
        <Button 
          onClick={handleAnalyze} 
          disabled={isLoading || (mode === 'manual' && manualText.length < 20) || (mode === 'image' && !imageBase64)}
          size="lg" 
          className="h-16 px-12 text-xl font-bold rounded-full shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all bg-primary w-full max-w-md"
        >
          {isLoading ? "Processing..." : "Scan & Analyze Safety"}
        </Button>
      </div>
    </div>
  )
}
