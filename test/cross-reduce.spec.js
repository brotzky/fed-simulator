import reducer from "../src/reducers/federation/roster"
import sinon from "sinon"

const championships = [
  {
    id: "z",
    tag: true,
  },
  {
    id: "z",
    tag: true,
  },
]
const roster = [
  {
    id: "1",
    championshipId: null,
    wins: 0,
    losses: 0,
  },
  {
    id: "2",
    championshipId: null,
    wins: 0,
    losses: 0,
  },
  {
    id: "3",
    championshipId: "z",
    wins: 0,
    losses: 0,
  },
  {
    id: "4",
    championshipId: "z",
    wins: 0,
    losses: 0,
  },
]

const storeStates = {
  championships,
  roster,
}

const action = {
  type: "SIMULATE_RANDOM_MATCHES",
  payload: {
    amountOfMatches: 1,
  },
}

const getState = storeName => storeStates[storeName]

describe("given a roster reducer", () => {
  let activeReducer

  describe("and a SIMULATE_RANDOM_MATCHES action is called", () => {
    before(() => (activeReducer = reducer(roster, action, getState)))

    it("should have 2 winners", () => {
      expect(activeReducer.filter(item => item.wins > 0)).to.have.length(1)
    })
    it("should have 2 losers", () => {
      expect(activeReducer.filter(item => item.losses > 0)).to.have.length(1)
    })
  })
})
