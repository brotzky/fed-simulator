import { List } from "immutable"

import { getId } from "../src/models/model.helper"
import reducer from "../src/reducers/federation/matches"
import WrestlerModel from "../src/models/wrestler.model"
import * as types from "../src/actions/types"
import listOfWrestlers from "./wrestlers.json"

const defaultWrestlers = new List([
  new WrestlerModel({
    name: "First",
    id: getId(),
  }),
  new WrestlerModel({
    name: "Second",
    id: getId(),
  }),
  new WrestlerModel({
    name: "Third",
    id: getId(),
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

describe("given a matches reducer", () => {
  let activeReducer,
    currentMatch,
    teamId = 22

  before(() => (activeReducer = reducerCreator()))

  it("should return the initial state", () => {
    expect(activeReducer).to.be.empty
  })

  describe("and a match is created", () => {
    before(() => {
      activeReducer = reducerCreator(activeReducer, types.CREATE_MATCH)
      currentMatch = activeReducer[0]
    })

    it("should now have one item", () => {
      expect(activeReducer.length).to.equal(1)
    })

    it("should have one item with an id", () => {
      expect(currentMatch.id).to.not.be(undefined)
    })

    describe("should have one item modeled correctly", () => {
      it("should be an array", () => expect(currentMatch.wrestlers).to.be.an("array"))
      it("should be empty", () => expect(currentMatch.wrestlers).to.have.length(0))
    })

    describe("and a match is created", () => {
      before(() => {
        activeReducer = reducerCreator(activeReducer, types.CREATE_MATCH)
      })

      it("should now have two items", () => {
        expect(activeReducer.length).to.equal(2)
      })
    })
  })

  describe("and a wrestler is added to the match", () => {
    before(() => {
      const payload = {
        wrestler: defaultWrestlers[0],
        matchId: activeReducer[0].id,
      }
      activeReducer = reducerCreator(activeReducer, types.ADD_WRESTLER_TO_MATCH, payload)
      currentMatch = activeReducer[0]
    })

    it("should have one wrestler in the first match", () => {
      const expectedWrestlers = currentMatch.wrestlers

      expect(expectedWrestlers).to.have.length(1)
    })

    it("should have an id on the first wrestler", () => {
      const currentId = currentMatch.wrestlers[0].id
      const expectedId = defaultWrestlers[0].id

      expect(currentId).to.equal(expectedId)
    })

    // TODO set match to simulated

    describe("and the same wrestler is added to the match with a different teamId", () => {
      before(() => {
        const wrestler = Object.assign({}, defaultWrestlers[1], { teamId })
        const payload = {
          wrestler,
          matchId: currentMatch.id,
        }

        // activeReducer = reducerCreator(activeReducer, types.CLEAR_WRESTLERS_FROM_MATCH, payload)
        activeReducer = reducerCreator(activeReducer, types.ADD_WRESTLER_TO_MATCH, payload)
        currentMatch = activeReducer[0]
      })

      it("should have two wrestler in the match", () => {
        const expectedWrestlers = currentMatch.wrestlers

        expect(expectedWrestlers).to.have.length(2)
      })

      it("should have the the new teamId on the only wrestler ", () => {
        const actualTeamId = currentMatch.wrestlers[1].teamId

        expect(actualTeamId).to.equal(teamId)
      })

      it("should set simulated back to false", () => {
        expect(currentMatch.simulated).to.equal(false)
      })

      describe("and another wrestler is added to the match", () => {
        before(() => {
          teamId = 33
          const wrestler = Object.assign({}, defaultWrestlers[2], { teamId })
          const payload = { wrestler, matchId: currentMatch.id }

          activeReducer = reducerCreator(activeReducer, types.ADD_WRESTLER_TO_MATCH, payload)
          currentMatch = activeReducer[0]
        })

        it("should have two wrestlers", () => {
          expect(currentMatch.wrestlers).to.have.length(3)
        })

        it("should set the correct team and match id", () => {
          expect(currentMatch.wrestlers[2].id).to.equal(defaultWrestlers[2].id)
          expect(currentMatch.wrestlers[2].teamId).to.equal(teamId)
        })
      })

      describe("and a winner is chosen", () => {
        before(() => {
          const payload = {
            matchId: currentMatch.id,
            wrestlerId: currentMatch.wrestlers[0].id,
          }

          activeReducer = reducerCreator(activeReducer, types.SELECT_WINNER_IN_MATCH, payload)
          currentMatch = activeReducer[0]
        })

        it("should have one wrestler as a winner", () => {
          expect(currentMatch.wrestlers[0].winner).to.equal(true)
        })

        describe("and a new winner is chosen", () => {
          before(() => {
            const payload = {
              matchId: currentMatch.id,
              wrestlerId: currentMatch.wrestlers[1].id,
            }

            activeReducer = reducerCreator(activeReducer, types.SELECT_WINNER_IN_MATCH, payload)
            currentMatch = activeReducer[0]
          })

          it("should have a new winner", () => {
            expect(currentMatch.wrestlers[1].winner).to.equal(true)
          })

          it("should have only have one winner", () => {
            const winners = currentMatch.wrestlers.filter(item => item.winner)

            expect(winners).to.have.length(1)
          })
        })
      })

      describe("and a remove wrestler from match is triggered", () => {
        before(() => {
          const payload = {
            matchId: currentMatch.id,
            wrestlerId: currentMatch.wrestlers[0].id,
          }

          activeReducer = reducerCreator(activeReducer, types.REMOVE_WRESTLER_FROM_MATCH, payload)
          currentMatch = activeReducer[0]
        })

        it("should have 1 wrestler", () => {
          expect(currentMatch.wrestlers).to.have.length(2)
        })
      })
    })
  })

  describe("and reset is called", () => {
    before(() => (activeReducer = reducerCreator(activeReducer, types.RESET)))

    it("should have NO items in the collection", () => {
      expect(activeReducer).to.have.length(0)
    })
  })

  describe.skip("and a request to generate matches is called", () => {
    const payload = {
      roster: listOfWrestlers,
      amountOfMatches: 50,
    }
    before(() => (activeReducer = reducerCreator(activeReducer, types.GENERATE_RANDOM_MATCHES, payload)))

    it(`should have ${payload.amountOfMatches} items in the collection`, () => {
      expect(activeReducer).to.have.length(payload.amountOfMatches)
    })
    describe("and a request to generate matches is called", () => {
      before(() => (activeReducer = reducerCreator(activeReducer, types.GENERATE_RANDOM_MATCHES, payload)))

      it(`should have ${payload.amountOfMatches} items in the collection`, () => {
        expect(activeReducer).to.have.length(payload.amountOfMatches * 2)
      })

      // TODO
      // it("should have an item with an id", () => {
      //   expect(activeReducer[0].wrestlers[0].id).to.not.be(undefined)
      // })
    })
    describe("and a simulate random match is requested", () => {
      before(() => (activeReducer = reducerCreator(activeReducer, types.SIMULATE_RANDOM_MATCH)))

      it("should have one match marked as simulate", () => {
        const simulatedMatches = activeReducer.filter(item => item.simulated)

        expect(simulatedMatches).to.have.length(1)
      })

      describe("and a simulate random match is requested", () => {
        before(() => (activeReducer = reducerCreator(activeReducer, types.SIMULATE_RANDOM_MATCH)))

        it("should have two matches marked as simulated", () => {
          const simulatedMatches = activeReducer.filter(item => item.simulated)

          expect(simulatedMatches).to.have.length(2)
        })
      })

      describe("and a simulate random match with id is requested", () => {
        let id
        before(() => {
          id = activeReducer.filter(item => !item.simulated)[0].id

          activeReducer = reducerCreator(activeReducer, types.SIMULATE_MATCH, id)
          currentMatch = activeReducer.find(item => item.id === id)
        })
        it("should have an updated simulated status", () => {
          expect(currentMatch.simulated).to.have.equal(true)
        })
        describe("and a new person is added to the match", () => {
          before(() => {
            const wrestler = defaultWrestlers[1]
            const payload = { wrestler, matchId: currentMatch.id }

            activeReducer = reducerCreator(activeReducer, types.ADD_WRESTLER_TO_MATCH, payload)
            currentMatch = activeReducer.find(item => item.id === id)
          })
          it("it should be marked as NOT simulated", () => {
            expect(currentMatch.simulated).to.have.equal(false)
          })
          describe("and its resimulated", () => {
            before(() => {
              activeReducer = reducerCreator(activeReducer, types.SIMULATE_MATCH, id)
              currentMatch = activeReducer.find(item => item.id === id)
            })
            it("it should be marked as simulated", () => {
              expect(currentMatch.simulated).to.have.equal(true)
            })
          })
          describe("and a person is removed from the match", () => {
            before(() => {
              const payload = {
                matchId: currentMatch.id,
                wrestlerId: currentMatch.wrestlers[0].id,
              }

              activeReducer = reducerCreator(activeReducer, types.REMOVE_WRESTLER_FROM_MATCH, payload)
              currentMatch = activeReducer.find(item => item.id === id)
            })
            it("it should be marked as NOT simulated", () => {
              expect(currentMatch.simulated).to.have.equal(false)
            })
          })
        })
      })
    })
  })
})
