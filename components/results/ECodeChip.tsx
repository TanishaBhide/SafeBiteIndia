// SafeBite India — components/results/ECodeChip.tsx
import React from 'react';
import { HARMFUL_ADDITIVES_MAP } from '@/lib/constants';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { Info } from 'lucide-react';

interface ECodeChipProps {
  code: string;
}

export default function ECodeChip({ code }: ECodeChipProps) {
  const info = HARMFUL_ADDITIVES_MAP[code.toUpperCase()];
  
  if (!info) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold border border-slate-200">
        {code}
      </span>
    );
  }

  const severityColors = {
    info: 'bg-blue-50 text-blue-700 border-blue-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    danger: 'bg-red-50 text-red-700 border-red-200',
    banned_in_eu: 'bg-purple-50 text-purple-700 border-purple-200'
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border cursor-help transition-colors ${severityColors[info.severity]}`}>
            {code}
            <Info className="h-3 w-3 opacity-50" />
          </span>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs p-4 space-y-2 bg-white shadow-xl border-slate-100">
          <div className="flex items-center justify-between">
            <p className="font-bold text-slate-900">{info.name}</p>
            <span className="text-[10px] uppercase tracking-wider font-black text-slate-400">{info.category}</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">{info.concern}</p>
          <div className="pt-2 flex flex-col gap-1 border-t border-slate-50">
            <p className="text-[10px] text-slate-500">
              <span className="font-bold">FSSAI Status:</span> {info.fssaiPermitted ? 'Permitted within limits' : 'Not permitted'}
            </p>
            {info.maxDailyIntake && (
              <p className="text-[10px] text-slate-500">
                <span className="font-bold">Max Daily Intake:</span> {info.maxDailyIntake}
              </p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
