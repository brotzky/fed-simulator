import weighted from "weighted"
import _maxBy from "lodash.maxby"
import _minBy from "lodash.minby"

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

  ringBell() {
    // while the minimum damage done is stil above zero
    while(_minBy(this.wrestlers, "damage").damage > 0) {
      let
        getWrestlersWeights = (wrestlers) => new Array(wrestlers.length).fill((1 / wrestlers.length)),
        attacker = weighted.select(this.wrestlers, getWrestlersWeights(this.wrestlers)),
        defenders = this.wrestlers.filter((wrestler) => wrestler.name !== attacker.name),
        defender = weighted.select(defenders, getWrestlersWeights(defenders)),
        move =  weighted.select(this.moves, this.movesWeights)
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
      winner = _maxBy(this.wrestlers, "damage"),
      loser = _minBy(this.wrestlers, "damage")
    this.logAction("winner", {
      winner,
      loser,
    })
  }
}
