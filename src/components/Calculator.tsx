import { Profession } from "@/lib/types/Profession";
import { ChevronsLeft, ShieldAlert } from "lucide-react";
import { ChangeEvent, ReactNode, useState } from "react";
import { Button } from "./ui/button";

import ProfessionIcon from "./ProfessionIcon";
import { Episode } from "@/lib/types/Episode";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import CalculatorInput from "./CalculatorInput";
import { MAX_LEVEL, MAX_XP } from "@/lib/constants";
import { getLevelForXp, getXpForLevel } from "@/lib/utils";
import CalculatorResult from "./CalculatorResult";

export type CalculatorProps = {
  episode: Episode,
  profession: Profession,
  onBack: () => void
}

export default function Calculator({ episode, profession, onBack }: CalculatorProps): ReactNode {
  const [currentLevel, setCurrentLevel] = useState<number | null>(0)
  const [currentXp, setCurrentXp] = useState<number | null>(0)
  const [targetLevel, setTargetLevel] = useState<number | null>(1)
  const [targetXp, setTargetXp] = useState<number | null>(500)
  const [xpYieldPerItem, setXpYieldPerItem] = useState<number | null>(1)
  const [xpBoostPercent, setXpBoostPercent] = useState<number | null>(0)
  const [currentKpPercent, setCurrentKpPercent] = useState<number | null>(0)
  const [kpPercentGainPerItem, setKpPercentGainPerItem] = useState<number | null>(0)

  function updateCurrentLevel(event: ChangeEvent<HTMLInputElement>) {
    const level = event.target.valueAsNumber

    if (isNaN(level)) {
      setCurrentLevel(null)
      setCurrentXp(null)
      return
    }

    if (level < 0 || level > 500) {
      return
    }

    const xp = getXpForLevel(level)
    if (xp !== null) {
      setCurrentLevel(level)
      setCurrentXp(xp)
    }
  }

  function updateCurrentXp(event: ChangeEvent<HTMLInputElement>) {
    const xp = event.target.valueAsNumber

    if (isNaN(xp)) {
      setCurrentXp(null)
      setCurrentLevel(null)
      return
    }

    if (xp < 0 || xp >= MAX_XP) {
      return
    }

    const level = getLevelForXp(xp)
    if (level !== null) {
      setCurrentXp(xp)
      setCurrentLevel(level)
    }
  }

  function updateTargetLevel(event: ChangeEvent<HTMLInputElement>) {
    const level = event.target.valueAsNumber

    if (isNaN(level)) {
      setTargetLevel(null)
      setTargetXp(null)
      return
    }

    if (level < 0 || level > 500) {
      return
    }

    const xp = getXpForLevel(level)
    if (xp !== null) {
      setTargetLevel(level)
      setTargetXp(xp)
    }
  }

  function updateTargetXp(event: ChangeEvent<HTMLInputElement>) {
    const xp = event.target.valueAsNumber

    if (isNaN(xp)) {
      setTargetXp(null)
      setTargetLevel(null)
      return
    }

    if (xp < 0 || xp > MAX_XP) {
      return
    }

    const level = getLevelForXp(xp)
    if (level !== null) {
      setTargetXp(xp)
      setTargetLevel(level)
    }
  }

  function updateXpYieldPerItem(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.valueAsNumber

    if (isNaN(value)) {
      setXpYieldPerItem(null)
      return
    }

    if (value < 0 || value > MAX_XP) {
      return
    }

    setXpYieldPerItem(value)
  }

  function updateXpBoostPercent(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.valueAsNumber

    if (isNaN(value)) {
      setXpBoostPercent(null)
      return
    }

    if (value < 0 || value > 100) {
      return
    }

    setXpBoostPercent(value)
  }

  function updateCurrentKpPercent(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.valueAsNumber

    if (isNaN(value)) {
      setCurrentKpPercent(null)
      return
    }

    if (value < 0 || value > 100) {
      return
    }

    setCurrentKpPercent(value)
  }

  function updateKpPercentGainPerItem(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.valueAsNumber

    if (isNaN(value)) {
      setKpPercentGainPerItem(null)
      return
    }

    if (value < 0 || value > 100) {
      return
    }

    setKpPercentGainPerItem(value)
  }

  const valid =
    (currentLevel !== null && currentXp !== null && targetLevel !== null
      && targetXp != null && xpYieldPerItem !== null && xpBoostPercent !== null
      && currentKpPercent !== null && kpPercentGainPerItem !== null
    ) && (currentLevel < targetLevel)
    && (currentXp < targetXp)

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex gap-x-6 items-center">
        <Button onClick={onBack}>
          <ChevronsLeft />
          Go back
        </Button>
        <div className="flex gap-x-3 items-center">
          <ProfessionIcon episode={episode} profession={profession} heightPx={25} widthPx={25} />
          <h1 className="text-lg font-semibold">{profession.display}</h1>
        </div>
      </div>
      <Alert variant="destructive">
        <ShieldAlert className="h-4 w-4" />
        <AlertTitle>Heads up {profession.display}, we're in uncharted waters...</AlertTitle>
        <AlertDescription>
          Level-to-XP mapping is currently best-effort. If you notice an inconsistency, please ping @simpleauthority in the Brighter Shores community discord. Also, coordinate the proper value of the XP for the Level with Luca's XP table (also found in the Discord.) As time goes on, the dataset will improve!
        </AlertDescription>
      </Alert>
      <div className="p-4 border-2 border-dashed rounded-sm grid grid-cols-2 gap-y-2 gap-x-6">
        <p className="text-lg font-semibold col-span-2 pb-2">Enter your current and desired {profession.display} stats:</p>
        <CalculatorInput label="Current Level" max={MAX_LEVEL - 1} control={currentLevel} onChange={updateCurrentLevel} />
        <CalculatorInput label="Current XP" max={MAX_XP - 1} control={currentXp} onChange={updateCurrentXp} />
        <CalculatorInput label="Target Level" max={MAX_LEVEL} control={targetLevel} onChange={updateTargetLevel} />
        <CalculatorInput label="Target XP" max={MAX_LEVEL} control={targetXp} onChange={updateTargetXp} />
      </div>
      <div className="p-4 border-2 border-dashed rounded-sm grid grid-cols-2 gap-y-2 gap-x-6">
        <p className="text-lg font-semibold col-span-2 pb-2">Modify calculation parameters:</p>
        <CalculatorInput label="XP/Item" tooltip="The amount of XP killing/harvesting/creating one enemy/item gives you. You can find this on the wiki. Later, this tool will let you select the enemy/item instead." min={1} max={MAX_XP} control={xpYieldPerItem} onChange={updateXpYieldPerItem} />
        <CalculatorInput label="XP Boost %" tooltip="How much XP boost you have from your higher tier tool, enchantment, or xp potion. If none, use 0." min={0} max={100} control={xpBoostPercent} onChange={updateXpBoostPercent} />
        <CalculatorInput label="Current KP %" tooltip="How far along your current KP percentage is. 0 is the default." min={0} max={100} control={currentKpPercent} onChange={updateCurrentKpPercent} />
        <CalculatorInput label="KP Gain %/Item" tooltip="How much KP% you gain per enemy/item killed/harvested/created (this is a guess for now)." min={0} max={100} control={kpPercentGainPerItem} onChange={updateKpPercentGainPerItem} />
      </div>
      <div className="p-4 border-2 border-dashed rounded-sm flex flex-col gap-y-2">
        <p className="text-lg font-semibold pb-2">Results:</p>
        {valid ? (
          <CalculatorResult
            currentLevel={currentLevel!}
            currentXp={currentXp!}
            targetLevel={targetLevel!}
            targetXp={targetXp!}
            xpYieldPerItem={xpYieldPerItem!}
            xpBoostPercent={xpBoostPercent!}
            currentKpPercent={currentKpPercent!}
            kpPercentGainPerItem={kpPercentGainPerItem!}
          />
        ) : (
          <Alert>
            <AlertTitle>Something's not right...</AlertTitle>
            <AlertDescription>Seems like something is wrong with your stats. Make sure you have filled in values for all fields, even if that value is 0 (where applicable). Also, make sure your current level is less than your target level.</AlertDescription>
          </Alert>
        )}

      </div>
    </div>

  )
}