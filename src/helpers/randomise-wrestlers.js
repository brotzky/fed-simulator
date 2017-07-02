import weighted from "weighted"

const getWeightedArrayOfLength = length => new Array(length).fill(1 / length)
const getWrestler = wrestlers =>
  weighted.select(wrestlers, getWeightedArrayOfLength(wrestlers.length))

const defaultSettings = {
  male: {
    options: [true, false,],
    weights: [0.8, 0.2,],
  },
  amount: {
    options: [2, 3, 4, 5, 6,],
    weights: [0.5, 0.2, 0.2, 0.05, 0.05,],
  },
  tag: {
    options: [true, false,],
    weights: [0.1, 0.8,],
    perTeam: 2,
  },
}

export function randomiseWrestlers({
  wrestlers,
  settings = defaultSettings,
  matchWrestlers = [],
  ids = [],
  isTagMatch = "",
}) {
  let amountOfWrestlers = weighted.select(
    settings.amount.options,
    settings.amount.weights
  ),
    isMaleOnly = weighted.select(settings.male.options, settings.male.weights)
  isTagMatch = isTagMatch === ""
    ? weighted.select(settings.tag.options, settings.tag.weights)
    : isTagMatch
  wrestlers = wrestlers.filter(wrestler => wrestler.male === isMaleOnly)

  if (isTagMatch) {
    amountOfWrestlers = amountOfWrestlers * amountOfWrestlers
  }

  // while amount to create is above one
  let teamId = 0, perTeam = 0
  while (amountOfWrestlers > 0 && wrestlers.length > 0) {
    wrestlers = wrestlers.filter(wrestler => !ids.includes(wrestler.id))
    let chosenWrestler = getWrestler(wrestlers)
    if (isTagMatch && perTeam === settings.tag.perTeam) {
      perTeam = 0
      teamId = teamId + 1
    }
    chosenWrestler.teamId = isTagMatch ? teamId : null
    // we don't want the same wrestler in the match, so drop them out
    wrestlers = wrestlers.filter(wrestler => wrestler.id !== chosenWrestler.id)
    matchWrestlers.push(chosenWrestler)
    perTeam++
    amountOfWrestlers--
  }

  return matchWrestlers
}
