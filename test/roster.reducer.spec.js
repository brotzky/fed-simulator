import reducer from "../src/reducers/roster"
import * as types from "../src/actions/types"
import Model from "../src/models/wrestler.model"

const defaultModel = new Model()
const defaultMale = {
  name: "man",
  male: true,
}
const defaultFemale = {
  name: "woman",
  male: false,
}
const defaultCollection = [defaultMale, defaultFemale,]
const action = {
  type: types.UPDATE_ROSTER,
  payload: [],
}

describe("given a roster reducer", () => {
  let rosterReducer

  before(() => (rosterReducer = reducer(undefined, action)))

  it("should return the initial state", () => {
    expect(rosterReducer).to.be.empty
  })

  describe("and a collection is passed in", () => {
    before(() => {
      action.payload = defaultCollection
      rosterReducer = reducer(undefined, action)
    })

    it("should now have two in the collection", () => {
      expect(rosterReducer.length).to.equal(2)
    })
  })

  describe("and the roster has been passed through the model", () => {
    let rosterReducer

    before(() => {
      action.payload = defaultCollection
      rosterReducer = reducer(undefined, action)
    })

    it("should have a male with an id", () => {
      expect(rosterReducer[0].male).to.equal(true)
      expect(rosterReducer[0].id).to.not.be.empty
    })

    it("should have a female with an id", () => {
      expect(rosterReducer[1].male).to.equal(false)
      expect(rosterReducer[1].id).to.not.be.empty
    })

    it("should have correct stats", () => {
      expect(rosterReducer[0].wins).to.equal(defaultModel.toJSON().wins)
      expect(rosterReducer[0].losses).to.equal(defaultModel.toJSON().losses)
      expect(rosterReducer[0].points).to.equal(defaultModel.toJSON().points)
    })

    describe("and reset is called", () => {
      before(() => {
        action.type = types.RESET
        rosterReducer = reducer(undefined, action)
      })

      it("should have NO wrestlers", () => {
        expect(rosterReducer.length).to.equal(0)
      })
    })
  })
})
