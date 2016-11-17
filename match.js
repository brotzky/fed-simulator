import { wrestlers, randomEvents, maxMoves } from "./match.config"
import chalk from "chalk"
import "./match.prototype"

let
  log = console.log,
  good = chalk.green,
  bad = chalk.red,
  neutral = chalk.yellow

class Match {

  constructor(wrestlers) {
    this.wrestlers = wrestlers
    this.maxMoves = maxMoves
    log(neutral(wrestlers.map((wrestler) => wrestler.name)))
  }

  hitMove = () => {
    let
      wrestler = this.wrestlers.random(),
      move = wrestler.moves.random()
    log(`${wrestler.name} hit a ${move.name} for ${move.damage} damage`)
    if (this.maxMoves-- === 0) {
      clearInterval(this.currentInterval)
      this.endMatch()
    }
  }

  endMatch() {
    log(good("Match ended with a time out"))
  }

  ringBell() {
    log(good("Bell Rings"))
    this.currentInterval = setInterval(
      this.hitMove
      , 200
    )
  }

}


let currentMatch = new Match(wrestlers)
currentMatch.ringBell()
