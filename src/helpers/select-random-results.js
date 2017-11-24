import weighted from "weighted"
import groupBy from "lodash.groupby"

import arrayOfLength from "./array-of-length"
import getPercentageAmount from "./get-percentage-amount"

import { PERCENT_GAIN_FOR_HIGHEST_WRESTLER } from "../constants/game"

export default function selectRandomResults(wrestlers = []) {
  const numberOfTeams = Object.keys(groupBy(wrestlers, "teamId")).length
  const numberOfWrestlers = wrestlers.length
  const hasWinner = wrestlers.findIndex(wrestler => wrestler.winner) > -1

  if (numberOfWrestlers > 1 && numberOfTeams > 1) {
    let weightedWrestlers = arrayOfLength(wrestlers.length)

    const lowest = wrestlers.sort((a, b) => a.points > b.points)[0],
      highest = wrestlers.filter(wrestler => wrestler.id !== lowest.id).sort((a, b) => a.points < b.points)[0],
      lowestId = lowest.id,
      highestId = highest.id,
      lowestIndex = wrestlers.findIndex(wrestler => wrestler.id === lowestId),
      highestIndex = wrestlers.findIndex(wrestler => wrestler.id === highestId)

    if (lowest.points !== highest.points) {
      const highestAttackersPercentageGain = getPercentageAmount(weightedWrestlers[lowestIndex], PERCENT_GAIN_FOR_HIGHEST_WRESTLER)

      weightedWrestlers[lowestIndex] = weightedWrestlers[lowestIndex] - highestAttackersPercentageGain
      weightedWrestlers[highestIndex] = weightedWrestlers[highestIndex] + highestAttackersPercentageGain
    }

    const winner = hasWinner ? wrestlers.find(wrestler => wrestler.winner) : weighted.select(wrestlers, weightedWrestlers)
    const losers = wrestlers.filter(loser => loser.teamId !== winner.teamId)
    const losersRandomWeighting = arrayOfLength(losers.length)
    const loser = weighted.select(losers, losersRandomWeighting)

    return wrestlers.map(item => {
      item.winner = item.id === winner.id
      item.loser = item.id === loser.id
      return item
    })
  }
  return wrestlers
}
