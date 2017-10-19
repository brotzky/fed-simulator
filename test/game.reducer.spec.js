import reducer from "../src/reducers/game"
import * as types from "../src/actions/types"

const action = {
  type: types.RESET,
  payload: false,
}

describe("given a game reducer", () => {
  let activeReducer

  before(() => (activeReducer = reducer(undefined, action)))

  it("and the started is defaulted to false", () => {
    expect(activeReducer.started).to.equal(false)
  })

  describe("and a toggleStarted request is sent", () => {
    before(() => {
      action.type = types.TOGGLE_STARTED
      activeReducer = reducer(activeReducer, action)
    })

    it("and the started is defaulted to true", () => {
      expect(activeReducer.started).to.equal(true)
    })

    describe("and a toggleStarted request is sent", () => {
      before(() => (activeReducer = reducer(activeReducer, action)))

      it("and the started is defaulted to true", () => {
        expect(activeReducer.started).to.equal(true)
      })
    })
  })

  describe("and a updateName request is sent", () => {
    before(() => {
      action.type = types.UPDATE_NAME
      action.payload = { name: "Aaron", }
      activeReducer = reducer(activeReducer, action)
    })

    it("and the started is defaulted to true", () => {
      expect(activeReducer.name).to.equal(action.payload.name)
    })
  })
})
