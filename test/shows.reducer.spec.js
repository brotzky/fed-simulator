import reducer from "../src/reducers/shows"
import * as types from "../src/actions/types"
import Model from "../src/models/show.model"

const defaultModel = new Model()
const defaultCollection = [
  {
    name: "Test",
  },
]
const action = {
  type: types.UPDATE_SHOWS,
  payload: [],
}

describe("given a shows reducer", () => {
  let showsReducer

  before(() => (showsReducer = reducer(undefined, action)))

  it("should return the initial state", () => {
    expect(showsReducer).to.be.empty
  })

  describe("and a collection of shows are passed in", () => {
    before(() => {
      action.payload = defaultCollection
      showsReducer = reducer(undefined, action)
    })

    it("should now have two in the collection", () => {
      expect(showsReducer.length).to.equal(1)
    })
  })

  describe("and the show has been passed through the model", () => {
    let showsReducer

    before(() => {
      action.payload = defaultCollection
      showsReducer = reducer(undefined, action)
    })

    it("should have a show with an id", () => {
      expect(showsReducer[0].id).to.not.be.empty
    })

    it("should have correct stats", () => {
      expect(showsReducer[0].size).to.equal(defaultModel.toJSON().size)
      expect(showsReducer[0].frequency).to.equal(
        defaultModel.toJSON().frequency
      )
    })

    describe("and reset is called", () => {
      before(() => {
        action.type = types.RESET
        showsReducer = reducer(undefined, action)
      })

      it("should have NO shows", () => {
        expect(showsReducer.length).to.equal(0)
      })
    })
  })
})
