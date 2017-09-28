import reducer from "../src/reducers/game"
import * as types from "../src/actions/types"

const action = {
  type: types.RESET,
  payload: false,
}

describe("given a game reducer", () => {
  let gameReducer
  before(() => (gameReducer = reducer(undefined, action)))

  it("and the started is defaulted to false", () => {
    expect(gameReducer.started).to.equal(false)
  })
})
