// SafeBite India — components/scanner/LoadingOverlay.tsx
import React from 'react';
import { Loader2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface LoadingOverlayProps {
  progress: number;
  step: number;
}

export default function LoadingOverlay({ progress, step }: LoadingOverlayProps) {
  const steps = [
    { label: "Reading food label...", sub: "Extracting text using AI vision" },
    { label: "Parsing ingredients...", sub: "Identifying additives and allergens" },
    { label: "Checking FSSAI standards...", sub: "Comparing against Indian regulations" },
    { label: "Computing safety score...", sub: "Finalizing your detailed report" }
  ];

  const currentStep = steps[step] || steps[3];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-md p-8 space-y-8 text-center">
        <div className="relative inline-block">
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
          <div className="relative bg-primary rounded-full p-6">
            <Loader2 className="h-12 w-12 text-white animate-spin" />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">{currentStep.label}</h2>
          <p className="text-slate-500">{currentStep.sub}</p>
        </div>

        <div className="space-y-4">
          <Progress value={progress} className="h-3 rounded-full" />
          <div className="flex justify-between text-xs font-medium text-slate-400 uppercase tracking-wider">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {[0, 1, 2, 3].map((i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i <= step ? 'bg-primary' : 'bg-slate-100'
              }`} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}
