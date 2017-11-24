import { List } from "immutable"

import { getId } from "../src/models/model.helper"
import reducer from "../src/reducers/federation/match.wrestlers"
import Model from "../src/models/match.wrestler.model"
import * as types from "../src/actions/types"

const defaultWrestlers = new List([
  new Model({
    name: "One",
    id: getId(),
    teamId: 1,
  }),
  new Model({
    name: "Two",
    id: getId(),
    teamId: 1,
  }),
  new Model({
    name: "Three",
    id: getId(),
    teamId: 2,
  }),
  new Model({
    name: "Four",
    id: getId(),
    teamId: 2,
  }),
]).toJS()

const storeStates = {
  roster: defaultWrestlers,
}

const getState = storeName => storeStates[storeName]

const reducerCreator = (activeReducer, type = types.RESET, payload = false) => {
  const action = {
    type,
    payload,
  }

  return reducer(activeReducer, action, getState)
}

describe("given a match wrestler reducer", () => {
  let activeReducer, winner, loser

  before(() => (activeReducer = reducerCreator()))

  describe("and a wrestler is added to the match", () => {
    before(() => {
      const payload = { wrestler: defaultWrestlers[0] }

      activeReducer = reducerCreator(activeReducer, types.ADD_WRESTLER_TO_MATCH, payload)
    })
    it("should have one extra wrestler", () => {
      expect(activeReducer).to.have.length(1)
    })
    describe("and the same wrestler is added to the match", () => {
      before(() => {
        const payload = { wrestler: defaultWrestlers[0] }

        activeReducer = reducerCreator(activeReducer, types.ADD_WRESTLER_TO_MATCH, payload)
      })
      it("should have the same amount of wrestlers", () => {
        expect(activeReducer).to.have.length(1)
      })
    })
    describe("and a different wrestler is added to the match", () => {
      before(() => {
        const payload = { wrestler: defaultWrestlers[2] }

        activeReducer = reducerCreator(activeReducer, types.ADD_WRESTLER_TO_MATCH, payload)
      })
      it("should have two wrestlers", () => {
        expect(activeReducer).to.have.length(2)
      })
    })
  })
  describe("and a match simulated", () => {
    let winner, loser

    before(() => {
      activeReducer = reducerCreator(activeReducer, types.SIMULATE_MATCH)
      loser = activeReducer.filter(item => item.loser)
      winner = activeReducer.filter(item => item.winner)
    })
    it("should have one winner", () => {
      expect(winner).to.have.length(1)
    })
    it("should have one loser", () => {
      expect(loser).to.have.length(1)
    })
    it("should be seperate wrestlers who win and lose", () => {
      expect(winner[0].id).to.not.equal(loser[0].id)
    })
  })
  describe("and a random match simulated", () => {
    before(() => {
      activeReducer = reducerCreator(activeReducer, types.SIMULATE_RANDOM_MATCHES)
      loser = activeReducer.filter(item => item.loser)
      winner = activeReducer.filter(item => item.winner)
    })
    it("should have one winner", () => {
      expect(winner).to.have.length(1)
    })
    it("should have one loser", () => {
      expect(loser).to.have.length(1)
    })
    it("should be seperate wrestlers who win and lose", () => {
      expect(winner[0].id).to.not.equal(loser[0].id)
    })
  })
  describe("and a winner is sent", () => {
    before(() => {
      const payload = { wrestlerId: defaultWrestlers[2].id }

      activeReducer = reducerCreator(activeReducer, types.ADD_WRESTLER_TO_MATCH, { wrestler: defaultWrestlers[2] })
      activeReducer = reducerCreator(activeReducer, types.SELECT_WINNER_IN_MATCH, payload)
      winner = activeReducer.find(item => item.winner)
    })
    it("should have one winner with the same id", () => {
      expect(winner.id).to.equal(defaultWrestlers[2].id)
    })
    describe("and the same winner is set again", () => {
      let winners

      before(() => {
        const payload = { wrestlerId: defaultWrestlers[2].id }

        activeReducer = reducerCreator(activeReducer, types.SELECT_WINNER_IN_MATCH, payload)
        winners = activeReducer.filter(item => item.winner)
      })
      it("should have no winner", () => {
        expect(winners).to.have.length(0)
      })
      it("should have no winner", () => {
        const previousWinner = activeReducer.find(item => item.id === defaultWrestlers[2].id)

        expect(previousWinner.winner).to.equal(false)
      })
    })
  })
  // REMOVE_WRESTLER_FROM_MATCH: action.payload.wrestlerId
  describe("and a wrestler is removed from the match", () => {
    let numberOfWrestlers

    before(() => {
      const payload = { wrestler: defaultWrestlers[3] }

      activeReducer = reducerCreator(activeReducer, types.ADD_WRESTLER_TO_MATCH, { wrestler: defaultWrestlers[3] })
      activeReducer = reducerCreator(activeReducer, types.ADD_WRESTLER_TO_MATCH, { wrestler: defaultWrestlers[4] })

      numberOfWrestlers = activeReducer.length

      activeReducer = reducerCreator(activeReducer, types.REMOVE_WRESTLER_FROM_MATCH, payload)
      winner = activeReducer.find(item => item.winner)
    })
    it("should have one less wrestler", () => {
      expect(activeReducer).to.have.length(numberOfWrestlers - 1)
    })
    it("should NOT have a winner", () => {
      expect(winner).to.equal(undefined)
    })
  })
})
