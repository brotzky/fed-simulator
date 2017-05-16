import reducer from "../src/reducers/game"
import * as types from "../src/actions/types"

const action = {
  type: types.RESET,
  payload: false,
}

describe.only("given a game reducer", () => {
  let gameReducer
  before(() => (gameReducer = reducer(undefined, action)))

  it("and the canPlan is defaulted to true", () => {
    expect(gameReducer.canPlan).to.equal(true)
  })

  describe("and I call ADD_ONE_MONTH", () => {
    it("should add one month", () => {
      let oldCurrentMonth = gameReducer.currentMonth

      action.type = types.ADD_ONE_MONTH
      gameReducer = reducer(gameReducer, action)

      expect(gameReducer.currentMonth).to.equal(oldCurrentMonth + 1)
    })
  })

  describe("and I want to TOGGLE_PLAN", () => {
    beforeEach(() => {
      action.type = types.TOGGLE_PLAN
      gameReducer = reducer(gameReducer, action)
    })

    it("and I toggle it, so it should be false", () => {
      expect(gameReducer.canPlan).to.equal(false)
    })

    it("and I toggle it, so it should be true", () => {
      expect(gameReducer.canPlan).to.equal(true)
    })

    it("and I toggle it, so it should be false", () => {
      expect(gameReducer.canPlan).to.equal(false)
    })
  })
})
