import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import levelXpMap from '@/assets/level-to-xp.json'
import { MAX_LEVEL, MAX_XP, MIN_LEVEL, MIN_XP } from "./constants"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getXpForLevel(level: number): number {
  const clampedLevel = Math.min(Math.max(level, MIN_LEVEL), MAX_LEVEL)
  return levelXpMap.find(entry => entry.level === clampedLevel)!.xp
}

export function getLevelForXp(xp: number): number {
  const clampedXp = Math.min(Math.max(xp, MIN_XP), MAX_XP)

  for (let i = 0; i < levelXpMap.length - 1; i++) {
    const current = levelXpMap[i];
    const next = levelXpMap[i + 1];

    if (clampedXp >= current.xp && clampedXp < next.xp) {
      return current.level;
    }
  }

  return levelXpMap[levelXpMap.length - 1].level;
}