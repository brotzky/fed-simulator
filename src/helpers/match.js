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
    if (this.loser && this.loser.championshipId) {
      const keyedChampionships = keyBy(this.championships.toJS(), "id")

      if (keyedChampionships[this.loser.championshipId]) {
        this.championship = keyedChampionships[this.loser.championshipId]

        this.resetCurrentChampionshipId(this.loser.championshipId)
        this.processTitleChanges()
      }
    }

    return this
  }

  resetCurrentChampionshipId(championshipId) {
    this.roster = this.roster.map(item => {
      if (item.get("championshipId") === championshipId) {
        item.set("championshipId", null)
      }
      return item
    })
    return this
  }

  processTitleChanges() {
    const winnersHaveChampionships = this.winners.find(item => item.championshipId)

    // if one winner is already a champion we don't switch the titles
    if (!winnersHaveChampionships) {
      const losers = this.losers.size
      const winners = this.winners.size
      let switchChampionship = false

      if (this.championship.tag === true && losers === 2 && winners === 2) {
        switchChampionship = true
      } else if (this.championship.tag === false && losers === 1 && winners === 1) {
        switchChampionship = true
      }

      if (switchChampionship) {
        this.roster = this.roster.map(wrestler => {
          if (includes(this.winnerIds, wrestler.id)) {
            wrestler = wrestler.set("championshipId", this.championship.id)
          } else if (includes(this.loserIds, wrestler.id)) {
            wrestler = wrestler.set("championshipId", null)
          }

          return wrestler
        })
      }
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
