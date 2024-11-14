import { ReactNode } from "react";
import { getXpForLevel } from "@/lib/utils";

export type CalculatorResultProps = {
  currentLevel: number,
  currentXp: number,
  targetLevel: number,
  targetXp: number,
  xpYieldPerItem: number,
  xpBoostPercent: number,
  currentKpPercent: number,
  kpPercentGainPerItem: number
}

export default function CalculatorResult({
  currentLevel, currentXp, targetLevel, targetXp,
  xpYieldPerItem, xpBoostPercent, currentKpPercent,
  kpPercentGainPerItem
}: CalculatorResultProps): ReactNode {
  let currentXpTmp = currentXp
  let currentLevelTmp = currentLevel

  let currentLevelXp = getXpForLevel(currentLevelTmp)
  let nextLevelXp = getXpForLevel(currentLevelTmp + 1)

  const totalXpPerItem = xpYieldPerItem * (1 + (xpBoostPercent / 100))

  let itemsNeeded = 0
  let knowledgePointPercent = currentKpPercent
  let kpsRedeemed = 0

  const kpXpRedemptionModifier = (lvl: number): number => lvl < 200 ? 0.25 : 0.0625;

  const addXpWithPotentialLevelUp = (xp: number): void => {
    currentXpTmp += xp

    if (currentXpTmp >= nextLevelXp) {
      currentLevelTmp++
      currentLevelXp = nextLevelXp
      nextLevelXp = getXpForLevel(currentLevelTmp + 1)
    }
  }

  while ((currentLevelTmp < targetLevel) || (currentXpTmp < targetXp)) {
    addXpWithPotentialLevelUp(totalXpPerItem)

    knowledgePointPercent += kpPercentGainPerItem
    if (knowledgePointPercent >= 100) {
      addXpWithPotentialLevelUp(kpXpRedemptionModifier(currentLevelTmp) * currentLevelXp)
      kpsRedeemed++
      knowledgePointPercent = 0
    }

    itemsNeeded++
  }

  return (
    <>
      <p>Starting with level {currentLevel} ({currentXp} xp) to reach level {targetLevel} ({targetXp} xp) with an XP yield per item of {xpYieldPerItem} xp/item, an XP boost of {xpBoostPercent}%, initial knowledge points of {currentKpPercent}% and earning {kpPercentGainPerItem}% knowledge points per item, you will need to create {itemsNeeded} items (assuming you maintain your {xpBoostPercent}% XP boost and redeem all ({kpsRedeemed}) knowledge points for XP).</p>
    </>
  )
}