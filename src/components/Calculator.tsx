import { Profession } from "@/lib/types/Profession";
import { ChevronsLeft } from "lucide-react";
import { ChangeEvent, ReactNode, useState } from "react";
import { Button } from "./ui/button";

import levelToXp from '@/assets/level-to-xp.json'

export type CalculatorProps = {
  profession: Profession,
  onBack: () => void
}

export default function Calculator({ profession, onBack }: CalculatorProps): ReactNode {
  const [currentLevel, setCurrentLevel] = useState<number>(0)
  const [currentXp, setCurrentXp] = useState<number>(0)
  const [targetLevel, setTargetLevel] = useState<number>(1)
  const [targetXp, setTargetXp] = useState<number>(500)
  const [xpYieldPerItem, setXpYieldPerItem] = useState<number>(1)

  const MAX_LEVEL = 500
  const MAX_XP = 1_861_867_939

  function getXpForLevel(level: number): number | undefined {
    if (level < 0 || level > 500) {
      return undefined
    }

    return levelToXp.find(entry => entry.level === level)?.xp
  }

  function getLevelForXp(xp: number): number | undefined {
    if (xp < 0 || xp > MAX_XP) {
      return undefined
    }

    return levelToXp.find(entry => entry.xp >= xp)?.level
  }

  function updateCurrentLevel(event: ChangeEvent<HTMLInputElement>) {
    const level = event.target.valueAsNumber
    if (level >= 500) {
      return
    }

    const xp = getXpForLevel(level)
    if (!xp) {
      return
    }

    setCurrentLevel(level)
    setCurrentXp(xp)
  }

  function updateCurrentXp(event: ChangeEvent<HTMLInputElement>) {
    const xp = event.target.valueAsNumber
    if (xp >= MAX_XP) {
      return
    }

    const level = getLevelForXp(xp)
    if (!level) {
      return
    }

    setCurrentXp(xp)
    setCurrentLevel(level)
  }

  function updateTargetLevel(event: ChangeEvent<HTMLInputElement>) {
    const level = event.target.valueAsNumber
    if (level > 500) {
      return
    }

    const xp = getXpForLevel(level)
    if (!xp) {
      return
    }

    setTargetLevel(level)
    setTargetXp(xp)
  }

  function updateTargetXp(event: ChangeEvent<HTMLInputElement>) {
    const xp = event.target.valueAsNumber
    if (xp > MAX_XP) {
      return
    }

    const level = getLevelForXp(xp)
    if (!level) {
      return
    }

    setTargetXp(xp)
    setTargetLevel(level)
  }

  function updateXpYieldPerItem(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.valueAsNumber
    if (value < 0 || value > MAX_XP) {
      return
    }

    setXpYieldPerItem(value)
  }

  const xpDelta = targetXp - currentXp
  const itemCount = Math.ceil(xpDelta / xpYieldPerItem)

  const invalid =
    (currentLevel > targetLevel) ||
    (currentXp > targetXp)

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex gap-x-4 items-center">
        <Button onClick={onBack}>
          <ChevronsLeft />
          Go back
        </Button>
        <h1 className="text-lg font-semibold">{profession.display}</h1>
      </div>
      <div className="p-4 border-2 border-dashed rounded-sm grid grid-cols-2 gap-y-2 gap-x-6">
        <p className="col-span-2 pb-2">Enter your current {profession.display} stats:</p>
        <div className="flex flex-row items-center justify-center">
          <p className="w-2/6">Current Level:</p>
          <input className="w-4/6 rounded-md p-2" type="number" min="0" max={MAX_LEVEL - 1} value={currentLevel} onChange={updateCurrentLevel} />
        </div>
        <div className="flex flex-row items-center justify-center">
          <p className="w-2/6">Current XP:</p>
          <input className="w-4/6 rounded-md p-2" type="number" min="0" max={MAX_XP} value={currentXp} onChange={updateCurrentXp} />
        </div>
        <div className="flex flex-row items-center justify-center">
          <p className="w-2/6">Target Level:</p>
          <input className="w-4/6 rounded-md p-2" type="number" min="0" max={MAX_LEVEL} value={targetLevel} onChange={updateTargetLevel} />
        </div>
        <div className="flex flex-row items-center justify-center">
          <p className="w-2/6">Target XP:</p>
          <input className="w-4/6 rounded-md p-2" type="number" min="0" max={MAX_XP} value={targetXp} onChange={updateTargetXp} />
        </div>
      </div>
      <div className="p-4 border-2 border-dashed rounded-sm flex flex-col gap-y-2">
        <p>Enter the XP per item your training method yields (item selector coming soon):</p>
        <input className="w-4/6 rounded-md p-2" type="number" min="1" value={xpYieldPerItem} onChange={updateXpYieldPerItem} />
      </div>
      <div className="p-4 border-2 border-dashed rounded-sm flex flex-col gap-y-2">
        {invalid ? (
          <p>Looks like something is wrong with your stats. Make sure your current level is less than your target level. You can't calculate back in time (sadly).</p>
        ) : (
          <>
            <p>Looks like you need {xpDelta} xp to go from {profession.display} level {currentLevel} to level {targetLevel}.</p>
            <p>Since your training method yields {xpYieldPerItem} xp per item, you need to create/harvest <strong>{itemCount}</strong> items.</p>
            <p><strong>NOTE: </strong>This calculation is not taking knowledge point xp redemptions nor first-time badge xp bonuses into account. You may get there faster if you exploit all available resources.</p>
          </>
        )}
      </div>
    </div>

  )
}