import { List } from "immutable"
import includes from "lodash.includes"

import randomiseWrestlers from "./randomise-wrestlers"
import selectRandomResults from "./select-random-results"

export default class Match {
  constructor({ roster = [], }) {
    this.roster = new List(roster)
  }

  getQuickKeys() {
    this.winner = this.wrestlers.find(item => item.winner)
    this.loser = this.wrestlers.find(item => item.loser)

    this.winnerIds = this.wrestlers.reduce((prev, curr) => (curr.teamId === this.winner.teamId ? prev.concat(curr.id) : prev), [])
    this.loserIds = this.wrestlers.reduce((prev, curr) => (curr.teamId === this.loser.teamId ? prev.concat(curr.id) : prev), [])

    this.winners = this.roster.find(item => includes(this.winnerIds, item.id))
    this.losers = this.roster.find(item => includes(this.loserIds, item.id))
  }

  generate() {
    const wrestlers = this.roster.toJS()
    this.wrestlers = new List(randomiseWrestlers({ wrestlers, }))

    return this
  }

  simulate() {
    this.wrestlers = selectRandomResults(this.wrestlers.toJS())

    return this
  }

  savePoints() {
    this.getQuickKeys()

    if (!this.winner || !this.loser) {
      return this
    }

    this.roster = this.roster.map(wrestler => {
      if (includes(this.loserIds, wrestler.id)) {
        wrestler = wrestler.set("losses", wrestler.get("losses") + 1)
        if (wrestler.get("losses") % 10 === 0) {
          wrestler = wrestler.set("points", wrestler.get("points") - 1)
        }
      } else if (includes(this.winnerIds, wrestler.id)) {
        const wins = wrestler.get("wins") + 1

        wrestler = wrestler.set("wins", wins)
        if (wrestler.get("wins") % 10 === 0) {
          const points = wrestler.get("points") + 1

          wrestler = wrestler.set("points", points)
        }
      }
      return wrestler
    })

    return this
  }

  getRoster() {
    return this.roster
  }

  getWrestlers() {
    return this.wrestlers
  }
}

// let championships = getState("championships")
// let championship
// const existingChampions = winners.filter(item => item.championshipId).length === 0
// if (loser.championshipId && !existingChampions) {
//   championship = championships.find(item => item.id === loser.championshipId)
// }
//
// if (championship && championship.tag && loserIds.length === 2 && winnerIds.length === 2) {
//   switchChampionship = true
// } else if (championship && loserIds.length === 1 && winnerIds.length === 1) {
//   switchChampionship = true
// } else {
//   switchChampionship = false
// }

// if (switchChampionship) {
//   console.log(`New ${championship.name} champion`)
//   item = item.set("championshipId", championship.id)
// }

// if (switchChampionship) {
//   item = item.set("championshipId", null)
// }
