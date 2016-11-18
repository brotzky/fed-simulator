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


const moves = [
  {name: "Punch", weight: 0.5, damage: 1},
  {"name": "Kick", weight: 0.5, damage: 2},
  // "Suplex": {weight: 0.08, damage: 5},
  // "Bodyslam": {weight: 0.02, damage: 5},
  // "Powerbomb": {weight: 0.03, damage: 5},
  // "Arm bar": {weight: 0.05, damage: 5},
  // "Big back body drop": {weight: 0.08, damage: 5},
  // "Clothesline": {weight: 0.05, damage: 5},
  // "Eyepoke": {weight: 0.08, damage: 5},
  // "Locked in a submission": {weight: 0.1, damage: 7},
  // "Superkick": {weight: 0.05, damage: 9},
  // "Back suplex": {weight: 0.05, damage: 2},
  // "Back rake": {weight: 0.05, damage: 2},
  // "Came off the top rope": {weight: 0.05, damage: 10},
  // "Signature move": {weight: 0.01, damage: 12},
  // "Finishing move": {weight: 0.09, damage: 29},
  // "PILEDRIVER!": {weight: 0.02, damage: 15},
]

const wrestlers = [
  {
    name: "Jericho",
    damage: 89,
    moves,
  },
  {
    name: "HHH",
    damage: 91,
    moves,
  },
]

export { moves, wrestlers, randomEvents, maxMoves }
