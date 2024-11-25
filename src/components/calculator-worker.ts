import { getXpForLevel } from "@/lib/utils";
import { CalculatorResultProps } from "./CalculatorResult";

onmessage = (event: MessageEvent<CalculatorResultProps>) => {
  const debugLog: string[] = []

  const {
    currentLevel, currentXp, targetLevel, targetXp,
    xpYieldPerItem, xpBoostPercent, currentKpPercent,
    kpPercentGainPerItem
  } = event.data

  debugLog.push(`Beginning calculation with data: ${JSON.stringify(event.data)}`)

  let currentXpTmp = currentXp
  let currentLevelTmp = currentLevel

  let currentLevelXp = getXpForLevel(currentLevelTmp)
  let nextLevelXp = getXpForLevel(currentLevelTmp + 1)

  const totalXpPerItem = xpYieldPerItem * (1 + (xpBoostPercent / 100))
  debugLog.push(`XP/item = ${totalXpPerItem.toFixed(2)}`)

  let itemsNeeded = 0
  let knowledgePointPercent = currentKpPercent
  let kpsRedeemed = 0

  const kpXpRedemptionModifier = (lvl: number): number => lvl < 200 ? 0.25 : 0.0625;

  const addXpWithPotentialLevelUp = (xp: number): void => {
    currentXpTmp += xp

    debugLog.push(`+${xp.toFixed(2)} XP`)

    if (currentXpTmp >= nextLevelXp) {
      debugLog.push(`> Level up from ${currentLevelTmp} to ${currentLevelTmp + 1}`)

      currentLevelTmp++
      currentLevelXp = nextLevelXp

      nextLevelXp = getXpForLevel(currentLevelTmp + 1)
    }
  }

  while ((currentLevelTmp < targetLevel) || (currentXpTmp < targetXp)) {
    debugLog.push(`+1 action`)
    addXpWithPotentialLevelUp(totalXpPerItem)

    debugLog.push(`+${kpPercentGainPerItem}% KP`)
    knowledgePointPercent += kpPercentGainPerItem
    if (knowledgePointPercent >= 100) {
      debugLog.push(`> KP >= 100%`)

      const modifier = kpXpRedemptionModifier(currentLevelTmp)
      debugLog.push(`> KP redemption modifier = ${modifier}`)

      const xpRedemption = modifier * (nextLevelXp - currentLevelXp)
      addXpWithPotentialLevelUp(xpRedemption)

      kpsRedeemed++
      knowledgePointPercent -= 100

      debugLog.push(`-= 100% KP; ${knowledgePointPercent}% remains`)
    }

    itemsNeeded++
  }

  debugLog.push("------------")
  debugLog.push(`Items needed: ${itemsNeeded}`)
  debugLog.push(`KPs redeemed: ${kpsRedeemed}`)

  postMessage({ itemsNeeded, kpsRedeemed, debugLog })
}