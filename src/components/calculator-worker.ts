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
  debugLog.push(`Initial current level = ${currentLevel}, XP = ${currentLevelXp}`)

  let nextLevelXp = getXpForLevel(currentLevelTmp + 1)
  debugLog.push(`Initial next level = ${currentLevel + 1}, XP = ${nextLevelXp}`)

  const totalXpPerItem = xpYieldPerItem * (1 + (xpBoostPercent / 100))
  debugLog.push(`Total XP per item: ${totalXpPerItem} XP; Formula = [xp yield * (1 + ((xp boost) / 100))]`)

  let itemsNeeded = 0
  let knowledgePointPercent = currentKpPercent
  let kpsRedeemed = 0

  const kpXpRedemptionModifier = (lvl: number): number => lvl < 200 ? 0.25 : 0.0625;

  const addXpWithPotentialLevelUp = (xp: number): void => {
    currentXpTmp += xp

    debugLog.push(`> XP is now ${currentXpTmp}`)

    if (currentXpTmp >= nextLevelXp) {
      debugLog.push(`> This caused a level up from ${currentLevelTmp} to ${currentLevelTmp + 1}`)

      currentLevelTmp++
      currentLevelXp = nextLevelXp
      debugLog.push(`> New current level = ${currentLevelTmp}, XP = ${currentLevelXp}`)

      nextLevelXp = getXpForLevel(currentLevelTmp + 1)
      debugLog.push(`> New next level = ${currentLevelTmp + 1}, XP = ${nextLevelXp}`)
    }
  }

  while ((currentLevelTmp < targetLevel) || (currentXpTmp < targetXp)) {
    debugLog.push(`Created one item, adding ${totalXpPerItem} XP:`)
    addXpWithPotentialLevelUp(totalXpPerItem)

    debugLog.push(`Adding ${kpPercentGainPerItem}% kp for creating this item:`)
    knowledgePointPercent += kpPercentGainPerItem
    if (knowledgePointPercent >= 100) {
      debugLog.push(`KP has reached 100%...`)

      const modifier = kpXpRedemptionModifier(currentLevelTmp)
      debugLog.push(`> Current KP redemption modifier is ${modifier}; formula = if level < 200 return 0.25 else return 0.0625`)

      const xpRedemption = modifier * (nextLevelXp - currentLevelXp)
      debugLog.push(`> Redeeming for ${xpRedemption} XP...`)
      addXpWithPotentialLevelUp(xpRedemption)

      kpsRedeemed++
      knowledgePointPercent = 0

      debugLog.push(`> Reset knowledge points to 0, continuing...`)
    }

    itemsNeeded++
  }

  debugLog.push("Calculation has finished!")
  debugLog.push(`Items needed: ${itemsNeeded}`)
  debugLog.push(`KPs redeemed: ${kpsRedeemed}`)

  postMessage({ itemsNeeded, kpsRedeemed, debugLog })
}