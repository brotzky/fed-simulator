import reducer from "../src/reducers/brands"
import * as types from "../src/actions/types"

const defaultModel1 = {
  name: "First",
  color: "blue",
}
const defaultModel2 = {
  name: "Second",
  color: "red",
}
const action = {
  type: types.RESET,
  payload: [],
}

describe.only("given a brands reducer", () => {
  let activeReducer

  before(() => (activeReducer = reducer(undefined, action)))

  it("should return the initial state", () => {
    expect(activeReducer).to.be.empty
  })

  describe("and a collection is passed in", () => {
    before(() => {
      action.type = types.CREATE_BRAND

      action.payload = defaultModel1
      activeReducer = reducer(activeReducer, action)

      action.payload = defaultModel2
      activeReducer = reducer(activeReducer, action)
    })

    it("should now have two in the collection", () => {
      expect(activeReducer.length).to.equal(2)
    })

    it("should have a red brand", () => {
      expect(activeReducer[0].id).to.not.be.null
      expect(activeReducer[0].color).to.equal(defaultModel1.color)
    })

    it("should have a blue brand", () => {
      expect(activeReducer[1].color).to.equal(defaultModel2.color)
    })

    describe("and DELETE_BRAND is called", () => {
      before(() => {
        action.payload = activeReducer[0].id
        action.type = types.DELETE_BRAND

        activeReducer = reducer(activeReducer, action)
      })

      it("should have only one brand remaining", () => {
        expect(activeReducer.length).to.equal(1)
      })
    })

    describe("and reset is called", () => {
      before(() => {
        action.type = types.RESET
        activeReducer = reducer(activeReducer, action)
      })

      it("should have NO items in the collection", () => {
        expect(activeReducer.length).to.equal(0)
      })
    })
  })
})
