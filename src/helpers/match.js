import weighted from "weighted"

const getWeightedArrayOfLength = (length) => {
  return new Array(length).fill((1 / length))
}

const getWrestler = (wrestlers) => {
  return weighted.select(wrestlers, getWeightedArrayOfLength(wrestlers.length))
}

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

export function randomiseWrestlers({
  wrestlers,
  settings = defaultSettings,
  brandName = "Default",
}) {
  let matchWrestlers = [],
    randomBool = weighted.select(settings.male.options, settings.male.weights),
    amountOfWrestlers = weighted.select(settings.amount.options, settings.amount.weights),
    filteredWrestlers = wrestlers.filter(wrestler => wrestler.male === randomBool)

  while (amountOfWrestlers > 0) {
    let chosenWrestler = getWrestler(filteredWrestlers)
    filteredWrestlers = filteredWrestlers.filter((wrestler) => wrestler.id !== chosenWrestler.id)
    matchWrestlers.push(
      chosenWrestler
    )
    amountOfWrestlers--
  }

  return matchWrestlers
}
