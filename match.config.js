const maxMoves = 10

const randomEvents = [
  {
    name: "Used a weapon",
    result: "DQ",
    winner: "victim",
  },
  {
    name: "Interference",
    result: "DQ",
    winner: "victim",
  },
]

const commonMoves = [
  {
    name: "punch",
    damage: 3,
    stamina: 0.1,
  },
  {
    name: "kick",
    damage: 3,
    stamina: 0.1,
  },
  {
    name: "finisher",
    damage: 8,
    stamina: 0.5,
  },
]

const wrestlers = [
  {
    name: "Jericho",
    stamina: 0.9,
    damage: 89,
    moves: commonMoves,
  },
  {
    name: "HHH",
    stamina: 1,
    damage: 91,
    moves: commonMoves,
  },
]

export { wrestlers, randomEvents, maxMoves }
