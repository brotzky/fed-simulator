import weighted from "weighted"
import _maxBy from "lodash.maxby"

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
    while(this.wrestlers[0].damage > 0 && this.wrestlers[1].damage > 0) {
      let
        attacker = weighted.select(this.wrestlers, [0.5, 0.5]),
        defender = this.wrestlers.filter((wrestler) => wrestler.name !== attacker.name)[0],
        move =  weighted.select(this.moves, this.movesWeights)
      this.hitMove(attacker, defender, move)
    }
    this.endMatch()
    return this.state
  }
}
