import { moves, wrestlers, randomEvents, maxMoves } from "./match.config"
import chalk from "chalk"
import util from "util"
import "./match.prototype"
import weighted from "weighted"

let
  log = console.log,
  standout = chalk.cyan,
  good = chalk.green,
  bad = chalk.red,
  neutral = chalk.yellow

log(neutral(
  "Common Moves Count: ",

))

class Match {
  constructor(wrestlers, moves) {
    wrestlers.forEach((wrestler, wrestlerKey) => {
      wrestlers[wrestlerKey] = wrestler
    })
    this.wrestlers = wrestlers
    this.moves = moves
    this.movesWeights = moves.reduce((a, b) => a.concat(b.weight), [])
    this.maxMoves = maxMoves
    log(neutral(
      "Common Moves Count: ", this.countTotalMoveDamage(moves)
    ))
    log(standout(wrestlers.map((wrestler) => wrestler.name)))
  }

  countTotalMoveDamage(moves) {
    return Object.keys(moves).reduce((previous, key) => {
      return previous + moves[key].weight
    }, 0)
  }
  endMatch = () => {
    log(good("Match ended with a time out"))
  }

  hitMove = (attacker, defender, move) => {
    this.wrestlers.forEach((wrestler, key) => {
      if (defender.name === wrestler.name) {
        this.wrestlers[key].damage = wrestler.damage - move.damage
        log(neutral(`
          ${attacker.name}(${attacker.damage}) used ${move.name} on ${defender.name}(${defender.damage}) for ${move.damage} damage
        `))
      }
    })
  }

  ringBell() {
    log(good("Bell Rings"))
    while(this.wrestlers[0].damage > 10 || this.wrestlers[1].damage > 10) {
      let
        attacker = weighted.select(this.wrestlers, [0.5, 0.5]),
        defender = this.wrestlers.filter((wrestler) => wrestler.name !== attacker.name)[0],
        move =  weighted.select(this.moves, this.movesWeights)
      this.hitMove(attacker, defender, move)
    }
  }
}

let currentMatch = new Match(wrestlers, moves)
currentMatch.ringBell()
