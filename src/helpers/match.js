import { List } from "immutable"
import includes from "lodash.includes"
import keyBy from "lodash.keyby"

import randomiseWrestlers from "./randomise-wrestlers"
import selectRandomResults from "./select-random-results"

export default class Match {
  constructor({ roster = [], championships = [], }) {
    this.roster = new List(roster)
    this.championships = new List(championships)
  }

  getQuickKeys() {
    this.winner = this.wrestlers.find(item => item.winner)
    this.loser = this.wrestlers.find(item => item.loser)

    this.winnerIds = this.wrestlers.reduce((prev, curr) => (curr.teamId === this.winner.teamId ? prev.concat(curr.id) : prev), [])
    this.loserIds = this.wrestlers.reduce((prev, curr) => (curr.teamId === this.loser.teamId ? prev.concat(curr.id) : prev), [])

    this.winners = this.roster.filter(item => includes(this.winnerIds, item.id))
    this.losers = this.roster.filter(item => includes(this.loserIds, item.id))
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

  switchChampionships() {
    const winnersHaveChampionships = this.winners.find(item => item.championshipId)

    if (!winnersHaveChampionships && this.loser && this.loser.championshipId) {
      const keyedChampionships = keyBy(this.championships.toJS(), "id")

      if (keyedChampionships[this.loser.championshipId]) {
        this.championship = keyedChampionships[this.loser.championshipId]

        this.processChampionships()
      }
    }

    return this
  }

  processChampionships() {
    const losers = this.losers.size
    const winners = this.winners.size

    if ((this.championship.tag === true && losers === 2 && winners === 2) || (this.championship.tag === false && losers === 1 && winners === 1)) {
      this.roster = this.roster.map(wrestler => {
        if (wrestler.get("championshipId") === this.championship.id) {
          wrestler = wrestler.set("championshipId", null)
        }
        if (includes(this.winnerIds, wrestler.id)) {
          wrestler = wrestler.set("championshipId", this.championship.id)
        } else if (includes(this.loserIds, wrestler.id)) {
          wrestler = wrestler.set("championshipId", null)
        }

        return wrestler
      })
    }

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
        wrestler = wrestler.set("wins", wrestler.get("wins") + 1)

        if (wrestler.get("wins") % 10 === 0) {
          wrestler = wrestler.set("points", wrestler.get("points") + 1)
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
