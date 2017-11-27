import reducer from "../src/reducers/federation/roster"

const championships = [
  {
    id: "x",
    name: "x",
    tag: true,
  },
  {
    id: "z",
    name: "z",
    tag: false,
  },
]

const roster = [
  {
    id: "1",
    championshipId: null,
    wins: 0,
    male: true,
    losses: 0,
  },
  {
    id: "2",
    championshipId: null,
    wins: 0,
    male: true,
    losses: 0,
  },
  {
    id: "3",
    championshipId: "z",
    male: true,
    wins: 0,
    losses: 0,
  },
  {
    id: "4",
    championshipId: "z",
    wins: 0,
    male: true,
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
    amountOfMatches: 5,
  },
}

const getState = storeName => storeStates[storeName]

describe("given a roster reducer", () => {
  let activeReducer

  describe("and a SIMULATE_RANDOM_MATCHES action is called", () => {
    before(() => (activeReducer = reducer(roster, action, getState)))

    it("should have 1 winner", () => {
      expect(activeReducer.filter(item => item.wins > 0).length).to.be.above(1)
    })
    it("should have 1 loser", () => {
      expect(activeReducer.filter(item => item.losses > 0).length).to.be.above(1)
    })
  })
})
