import reducer from "../src/reducers/championships"
import * as types from "../src/actions/types"
import Model from "../src/reducers/championship.model"

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
  type: types.UPDATE_CHAMPIONS,
  payload: [],
}

describe("given a championships reducer", () => {
  let championshipsReducer

  before(() => (championshipsReducer = reducer(undefined, action)))

  it("should return the initial state", () => {
    expect(championshipsReducer).to.be.empty
  })

  describe("and a collection is passed in", () => {
    before(() => {
      action.payload = defaultCollection
      championshipsReducer = reducer(undefined, action)
    })

    it("should now have two in the collection", () => {
      expect(championshipsReducer.length).to.equal(2)
    })
  })

  describe("and the championships has been passed through the model", () => {
    let championshipsReducer

    before(() => {
      action.payload = defaultCollection
      championshipsReducer = reducer(undefined, action)
    })

    it("should have a male championship with an id", () => {
      expect(championshipsReducer[0].male).to.equal(true)
      expect(championshipsReducer[0].id).to.not.be.empty
    })

    it("should have a female championship with an id", () => {
      expect(championshipsReducer[1].male).to.equal(false)
      expect(championshipsReducer[1].id).to.not.be.empty
    })

    it("should have correct stats", () => {
      expect(championshipsReducer[0].losses).to.equal(
        defaultModel.toJSON().losses
      )
    })

    describe("and reset is called", () => {
      before(() => {
        action.type = types.RESET
        championshipsReducer = reducer(undefined, action)
      })

      it("should have NO wrestlers", () => {
        expect(championshipsReducer.length).to.equal(0)
      })
    })
  })
})
