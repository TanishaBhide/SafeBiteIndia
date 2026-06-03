// SafeBite India — components/scanner/ImageUploader.tsx — Upload interface
"use client"

import React, { useState, useRef } from "react"
import { Upload, X, ImageIcon, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface ImageUploaderProps {
  onImageSelect: (base64: string, mimeType: string) => void
  onClear: () => void
  isOcrLoading?: boolean
  showOcrEditor?: boolean
}

export default function ImageUploader({ 
  onImageSelect, 
  onClear, 
  isOcrLoading = false, 
  showOcrEditor = false 
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File) => {
    if (isOcrLoading) return
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file.')
      return
    }
    
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB.')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      setPreview(result)
      const base64 = result.split(',')[1]
      onImageSelect(base64, file.type)
    }
    reader.readAsDataURL(file)
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    if (isOcrLoading) return
    setIsDragging(true)
  }

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (isOcrLoading) return
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  const clearImage = () => {
    if (isOcrLoading) return
    setPreview(null)
    onClear()
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {!preview ? (
        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => { if (!isOcrLoading) fileInputRef.current?.click(); }}
          className={cn(
            "relative group cursor-pointer border-2 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center gap-4 transition-all",
            isDragging 
              ? "border-primary bg-primary/5 scale-[1.02]" 
              : "border-slate-200 hover:border-primary/50 hover:bg-slate-50",
            isOcrLoading && "pointer-events-none opacity-50"
          )}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={onFileChange}
            accept="image/*"
            className="hidden"
            disabled={isOcrLoading}
          />
          
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
            <Upload className="h-8 w-8" />
          </div>
          
          <div className="text-center">
            <p className="text-lg font-semibold">Drop your food label image here</p>
            <p className="text-sm text-muted-foreground mt-1">or click to browse from your device</p>
          </div>
          
          <div className="flex items-center gap-4 text-xs text-muted-foreground mt-4">
            <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Max 5MB</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> JPG, PNG, WEBP</span>
          </div>
        </div>
      ) : (
        <div className="relative rounded-2xl overflow-hidden border-2 border-primary/20 bg-slate-50 group">
          <div className="relative overflow-hidden w-full max-h-[400px] flex items-center justify-center bg-slate-900/5">
            <img 
              src={preview} 
              alt="Label Preview" 
              className="w-full max-h-[400px] object-contain mx-auto p-4"
            />
            
            {/* Laser scanning line overlay */}
            {isOcrLoading && (
              <>
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex flex-col items-center justify-center text-white gap-3 z-10">
                  <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <div className="text-center">
                    <p className="font-bold tracking-wide">Reading food label...</p>
                    <p className="text-xs text-slate-300 mt-0.5">Groq AI is processing ingredients & nutrition</p>
                  </div>
                </div>
                <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_4px_rgba(52,211,153,0.8)] animate-scan-laser z-20" style={{ top: 0, bottom: 0 }} />
              </>
            )}
          </div>
          
          {!isOcrLoading && (
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <Button variant="secondary" onClick={() => fileInputRef.current?.click()}>
                Replace Image
              </Button>
              <Button variant="destructive" onClick={clearImage}>
                <X className="h-4 w-4 mr-2" /> Remove
              </Button>
            </div>
          )}
          
          <div className="bg-white p-4 border-t flex items-center gap-3">
            <div className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center",
              showOcrEditor ? "bg-emerald-100 text-emerald-600" : "bg-green-100 text-green-600"
            )}>
              <ImageIcon className="h-5 w-5" />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium truncate">
                {isOcrLoading 
                  ? "Extracting label contents..." 
                  : showOcrEditor 
                    ? "Label read successfully!" 
                    : "Image ready for analysis"}
              </p>
              <p className="text-xs text-muted-foreground">
                {isOcrLoading 
                  ? "Please wait while we perform OCR" 
                  : showOcrEditor 
                    ? "Review and edit the extracted details below" 
                    : "We will automatically extract the text using AI"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
