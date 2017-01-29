import weighted from "weighted"
import _maxBy from "lodash.maxby"
import _minBy from "lodash.minby"
import { getPercentageAmount } from "./math"
const getWrestlersWeights = (arrayLength) => new Array(arrayLength).fill((1 / arrayLength))

export class SimMatch {

  state = []

  constructor(
    wrestlers = [],
    moves = [],
    byPassMoves = false
  ) {
    wrestlers.forEach((wrestler, wrestlerKey) => {
      wrestlers[wrestlerKey] = wrestler
    })
    this.wrestlers = wrestlers
    this.byPassMoves = byPassMoves

    if (!this.byPassMoves) {
      this.moves = moves
      this.movesWeights = moves.reduce((a, b) => a.concat(b.weight), [])
    }
  }

  logAction = (action, details) => {
    this.state.push({
      action,
      details,
    })
  }

  getWinnerWeights(defaults) {
    let index = this.wrestlers.findIndex(wrestler => wrestler.winner)
    defaults.forEach((weight, key) => {
      defaults[key] = 0
    })
    defaults[index] = 1
    return defaults
  }

  ringBell() {
    if (this.wrestlers.length === 0) return
    let lowest = this.wrestlers.sort((a, b) => a.damage > b.damage)[0],
      highest = this.wrestlers.filter(wrestler => wrestler.id !== lowest.id).sort((a, b) => a.damage < b.damage)[0],
      lowestId = lowest.id,
      highestId = highest.id,
      lowestIndex = this.wrestlers.findIndex(wrestler => wrestler.id === lowestId),
      highestIndex = this.wrestlers.findIndex(wrestler => wrestler.id === highestId),
      attackersWeights = getWrestlersWeights(this.wrestlers.length),
      highestAttackersPercentageGain =  getPercentageAmount(attackersWeights[lowestIndex], 20)

    if (lowest.damage !== highest.damage) {
      attackersWeights[lowestIndex] = attackersWeights[lowestIndex] - highestAttackersPercentageGain
      attackersWeights[highestIndex] = attackersWeights[highestIndex] + highestAttackersPercentageGain
    }

    if (this.byPassMoves) {
      // make the top ranked guy the winner for quicker sim
      this.finalAttacker = highest
    } else {
      // while the minimum damage done is stil above zero
      while(_minBy(this.wrestlers, "damage").damage > 0) {
        let attacker = weighted.select(this.wrestlers, attackersWeights),
          defender

        // just in case
        this.finalAttacker = attacker

        let defenders = this.wrestlers.filter((wrestler) => wrestler.id !== attacker.id && (wrestler.teamId == null || wrestler.teamId !== attacker.teamId) )

        if (defenders.length > 1) {
          let defendersWeights = getWrestlersWeights(defenders.length)
          defender = weighted.select(defenders, defendersWeights)
        } else {
          defender = defenders[0]
        }

        let move = weighted.select(this.moves, this.movesWeights)
        this.hitMove(attacker, defender, move)
      }
    }
    // loop done, now lets log the end
    this.endMatch()
    // return the log
    return this.state
  }

  hitMove = (attacker, defender, move) => {
    this.wrestlers.forEach((wrestler, key) => {
      // wrestler we are looping is the defender
      if (defender.name === wrestler.name) {
        // damage the defender
        this.wrestlers[key].damage = wrestler.damage - move.damage
        this.logAction("move", {
          attacker,
          defender,
          move,
        })
      }
    })
  }

  endMatch = () => {
    let
      potentialWinners = [
        _maxBy(this.wrestlers, "damage"),
        this.finalAttacker
      ]

    let overwriteWinner = this.wrestlers.find(wrestler => wrestler.winner),
      winner = overwriteWinner ? overwriteWinner : weighted.select(potentialWinners, [0.2, 0.8]),
      loser = _minBy(this.wrestlers.filter(wrestler => !wrestler.winner), "damage"),
      losers = this.wrestlers.filter((wrestler) => wrestler.id !== winner.id)
    this.logAction("winner", {
      wrestlers: this.wrestlers,
      winner,
      loser,
      losers,
    })
  }
}
