import weighted from "weighted"
import { SimMatch } from "./sim-match.helper"
import { awardMatchPoints } from "../actions/wrestlers"
import { shouldTheChampionshipMove } from "../actions/championship"

const between = (number, lower, upper) => number > lower && number < upper
const getWeightedArrayOfLength = (length) => new Array(length).fill((1 / length))
const getWrestler = (wrestlers) => weighted.select(wrestlers, getWeightedArrayOfLength(wrestlers.length))

const defaultSettings = {
  male: {
    options: [true, false],
    weights: [0.8, 0.2],
  },
  amount: {
    options: [2, 3, 4, 5, 6],
    weights: [0.5, 0.2, 0.2, 0.05, 0.05]
  }
}

export function randomiseWrestlers(
  wrestlers,
  settings = defaultSettings,
) {
    let matchWrestlers = [],
    ids = [],
    randomBool = weighted.select(settings.male.options, settings.male.weights),
    amountOfWrestlers = weighted.select(settings.amount.options, settings.amount.weights)
    wrestlers = wrestlers.filter(wrestler => wrestler.male === randomBool)

    // pick our first wrestler, we do this so we can get a fair match
    let firstWrestler = getWrestler(wrestlers)
      // push first wrestler to match
      matchWrestlers.push(
        firstWrestler
      )
      ids.push(
        firstWrestler.id
      )

  // while amount to create is above one
  while (amountOfWrestlers > 1) {
    wrestlers = wrestlers.filter(wrestler => !ids.includes(wrestler.id))
    let chosenWrestler = getWrestler(wrestlers)
    // we don't want the same wrestler in the match, so drop them out
    wrestlers = wrestlers.filter((wrestler) => wrestler.id !== chosenWrestler.id)
    matchWrestlers.push(
      chosenWrestler
    )
    amountOfWrestlers--
  }

  return matchWrestlers
}

export function simulateMatch(wrestlers, moves) {
  // ensure they have a damage attribute
  wrestlers.forEach((wrestler, key) => {
    wrestlers[key].damage = wrestler.rating
  })
  // create the match
  return new SimMatch(
    wrestlers,
    moves,
  ).ringBell()
}

export function logMatch(dispatch, story) {
  let winnersAction = story.slice(-1).pop().details

  dispatch([
    awardMatchPoints({...winnersAction}),
    shouldTheChampionshipMove({...winnersAction}),
  ])
}
