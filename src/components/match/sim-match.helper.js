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

  countTotalMoveDamage(moves) {
    return Object.keys(moves).reduce((previous, key) => {
      return previous + moves[key].weight
    }, 0)
  }

  endMatch = () => {
    const winner = _maxBy(this.wrestlers, "damage")
    this.logAction("winner", { winner })
  }

  hitMove = (attacker, defender, move) => {
    this.wrestlers.forEach((wrestler, key) => {
      if (defender.name === wrestler.name) {
        this.wrestlers[key].damage = wrestler.damage - move.damage
        this.logAction(
          "move",
          {
            attacker,
            defender,
            move,
          }
        )
      }
    })
  }

  ringBell() {

    while(_minBy(this.wrestlers, "damage").damage > 0) {
      let
        getWrestlersWeights = function(wrestlers) {return new Array(wrestlers.length).fill((1 / wrestlers.length))},
        attacker = weighted.select(this.wrestlers, getWrestlersWeights(this.wrestlers)),
        defenders = this.wrestlers.filter((wrestler) => wrestler.name !== attacker.name)[0],
        defender = weighted.select(defenders, getWrestlersWeights(defenders)),
        move =  weighted.select(this.moves, this.movesWeights)
      this.hitMove(attacker, defender, move)
    }
    this.endMatch()
    return this.state
  }
}
