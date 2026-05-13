// SafeBite India — lib/utils.ts — cn() helper and misc utilities
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { ScoreLevel } from './types';

/** Merges Tailwind classes safely, resolving conflicts. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Maps a ScoreLevel to its Tailwind colour classes. */
export function scoreLevelColors(level: ScoreLevel): {
  text: string;
  bg: string;
  border: string;
  ring: string;
} {
  switch (level) {
    case 'good':
      return {
        text: 'text-green-700',
        bg: 'bg-green-50',
        border: 'border-green-200',
        ring: 'ring-green-500',
      };
    case 'moderate':
      return {
        text: 'text-amber-700',
        bg: 'bg-amber-50',
        border: 'border-amber-200',
        ring: 'ring-amber-500',
      };
    case 'poor':
      return {
        text: 'text-red-700',
        bg: 'bg-red-50',
        border: 'border-red-200',
        ring: 'ring-red-500',
      };
  }
}

/** Maps a ScoreLevel to its hex colour for SVG / inline styles. */
export function scoreLevelHex(level: ScoreLevel): string {
  switch (level) {
    case 'good':
      return '#16a34a';
    case 'moderate':
      return '#d97706';
    case 'poor':
      return '#dc2626';
  }
}

/** Clamps a number to [min, max]. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** Formats an ISO timestamp for display. */
export function formatTimestamp(iso: string): string {
  try {
    return new Date(iso).toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  } catch {
    return iso;
  }
}

/** Converts a score 0-100 to a ScoreLevel. */
export function scoreToLevel(score: number): ScoreLevel {
  if (score >= 70) return 'good';
  if (score >= 40) return 'moderate';
  return 'poor';
}
