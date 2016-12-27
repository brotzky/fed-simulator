import weighted from "weighted"
import _maxBy from "lodash.maxby"
import _minBy from "lodash.minby"
import { getPercentageAmount } from "./math"
const getWrestlersWeights = (arrayLength) => new Array(arrayLength).fill((1 / arrayLength))

export class SimMatch {

  state = []

  constructor(wrestlers, moves) {
    wrestlers.forEach((wrestler, wrestlerKey) => {
      wrestlers[wrestlerKey] = wrestler
    })
    this.wrestlers = wrestlers
    this.moves = moves
    this.movesWeights = moves.reduce((a, b) => a.concat(b.weight), [])
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
    let lowest = this.wrestlers.sort((a, b) => a.damage > b.damage)[0],
      highest = this.wrestlers.sort((a, b) => a.damage < b.damage)[0],
      lowestId = lowest.id,
      highestId = highest.id,
      lowestIndex = this.wrestlers.findIndex(wrestler => wrestler.id === lowestId),
      highestIndex = this.wrestlers.findIndex(wrestler => wrestler.id === highestId),
      attackersWeights = getWrestlersWeights(this.wrestlers.length),
      highestAttackersPercentageGain =  getPercentageAmount(attackersWeights[lowestIndex], 20),
      foundWinner = false

    if (foundWinner = this.wrestlers.find(wrestler => wrestler.winner)) {
      attackersWeights = this.getWinnerWeights(attackersWeights)
    }

    if (lowest.damage !== highest.damage) {
      attackersWeights[lowestIndex] = attackersWeights[lowestIndex] - highestAttackersPercentageGain
      attackersWeights[highestIndex] = attackersWeights[highestIndex] + highestAttackersPercentageGain
    }

    // while the minimum damage done is stil above zero
    while(_minBy(this.wrestlers, "damage").damage > 0) {
      let attacker = weighted.select(this.wrestlers, attackersWeights),
        defender
      this.finalAttacker = attacker

      let defenders = this.wrestlers.filter((wrestler) => wrestler.name !== attacker.name)

      if (defenders.length > 1) {
        let defendersWeights = attackersWeights.slice()
          defendersWeights = defendersWeights.filter((weight, key) => key !== highestIndex)
        defender = weighted.select(defenders, defendersWeights)
      } else {
        defender = defenders[0]
      }

      let move = weighted.select(this.moves, this.movesWeights)
      this.hitMove(attacker, defender, move)
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
      ],
      winner = weighted.select(potentialWinners, [0.2, 0.8]),
      loser = _minBy(this.wrestlers, "damage"),
      losers = this.wrestlers.filter((wrestler) => wrestler.id !== winner.id)
    this.logAction("winner", {
      wrestlers: this.wrestlers,
      winner,
      loser,
      losers,
    })
  }
}
