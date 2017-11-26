import weighted from "weighted"

const getWrestlerWeights = length => new Array(length).fill(1 / length)
const chooseRandomWrestler = wrestlers => weighted.select(wrestlers, getWrestlerWeights(wrestlers.length))

const defaultSettings = {
  male: {
    options: [true, false,],
    weights: [0.8, 0.2,],
  },
  amount: {
    options: [2, 3, 4, 5, 6,],
    weights: [0.5, 0.1, 0.1, 0.1, 0.1,],
  },
  tag: {
    options: [true, false,],
    weights: [0.5, 0.5,],
    perTeam: 2,
  },
}

export default function randomiseWrestlers({ wrestlers, settings = defaultSettings, randomisedWrestlers = [], ids = [], }) {
  const { tag, amount, male, } = settings

  let noWrestlers = weighted.select(amount.options, amount.weights)

  const isMaleOnly = weighted.select(male.options, male.weights)
  const isTagMatch = weighted.select(tag.options, tag.weights)

  wrestlers = wrestlers.filter(wrestler => wrestler.male === isMaleOnly)

  if (isTagMatch) {
    noWrestlers = noWrestlers * noWrestlers
  }

  // while amount to create is above one
  let teamId = 0,
    perTeam = 0
  while (noWrestlers > 0 && wrestlers.length > 0) {
    wrestlers = wrestlers.filter(wrestler => !ids.includes(wrestler.id))
    let chosenWrestler = chooseRandomWrestler(wrestlers)
    if (isTagMatch) {
      if (perTeam === tag.perTeam) {
        perTeam = 0
        teamId++
      }
      chosenWrestler.teamId = teamId
    } else {
      chosenWrestler.teamId = teamId++
    }

    wrestlers = wrestlers.filter(wrestler => wrestler.id !== chosenWrestler.id)
    randomisedWrestlers.push(chosenWrestler)

    perTeam++
    noWrestlers--
  }

  return randomisedWrestlers
}
