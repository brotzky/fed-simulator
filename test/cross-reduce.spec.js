import reducer from "../src/reducers/roster"
import * as types from "../src/actions/types"

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
const matches = [
  {
    id: "1",
    simulated: true,
    resultStored: false,
    wrestlers: [
      {
        teamId: "a",
        id: "1",
        winner: true,
        loser: false,
      },
      {
        teamId: "a",
        id: "2",
        winner: false,
        loser: false,
      },
      {
        teamId: "b",
        id: "3",
        winner: false,
        loser: true,
      },
      {
        teamId: "b",
        id: "4",
        winner: false,
        loser: false,
      },
    ],
  },
]
const action = {
  type: "STORE_MATCH_DATA",
  payload: {
    matches,
    championships,
  },
}

describe("given a roster reducer", () => {
  let activeReducer

  describe("and a STORE_MATCH_DATA acton is called", () => {
    before(() => (activeReducer = reducer(roster, action)))

    // 1
    it("should set the first winning wrestler a win", () => {
      expect(activeReducer[0].wins).to.equal(1)
    })
    it("should NOT set the first winning wrestler a loss", () => {
      expect(activeReducer[0].losses).to.equal(0)
    })
    it("should set the championship id", () => {
      expect(activeReducer[0].championshipId).to.equal("z")
    })
    // 2
    it("should set the second winning wrestler a win", () => {
      expect(activeReducer[1].wins).to.equal(1)
    })
    it("should NOT set the second winning wrestler a loss", () => {
      expect(activeReducer[1].losses).to.equal(0)
    })
    it("should set the championship id", () => {
      expect(activeReducer[1].championshipId).to.equal("z")
    })
    // 3
    it("should set the third losing wrestler a loss", () => {
      expect(activeReducer[2].losses).to.equal(1)
    })
    it("should NOT set the third winning wrestler a win", () => {
      expect(activeReducer[2].wins).to.equal(0)
    })
    it("should remove the championship id", () => {
      expect(activeReducer[2].championshipId).to.equal(null)
    })
    // 4
    it("should set the fourth losing wrestler a loss", () => {
      expect(activeReducer[3].losses).to.equal(1)
    })
    it("should NOT set the fourth winning wrestler a win", () => {
      expect(activeReducer[3].wins).to.equal(0)
    })
    it("should remove the championship id", () => {
      expect(activeReducer[3].championshipId).to.equal(null)
    })
  })
})
