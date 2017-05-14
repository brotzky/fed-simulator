import reducer from "../src/reducers/federation"
import * as types from "../src/actions/types"
import Model from "../src/reducers/federation.model"

const defaultModel = new Model()
const defaultFederation = { name: "WWE", }

const action = {
  type: types.UPDATE_FEDERATION,
  payload: defaultFederation,
}

describe("given a federation reducer", () => {
  let federationReducer

  before(() => (federationReducer = reducer(undefined, action)))

  it("should return the initial state", () => {
    expect(federationReducer).to.be.empty
  })

  describe("and the name of federation is passed in", () => {
    before(() => {
      action.payload = defaultFederation
      federationReducer = reducer(federationReducer, action)
    })
  })

  describe("and the federation has been passed through the model", () => {
    let federationReducer

    before(() => {
      action.payload = defaultFederation
      federationReducer = reducer(undefined, action)
    })

    it("should have a show with an id", () => {
      expect(federationReducer.id).to.not.be.empty
    })

    it("should have correct stats", () => {
      expect(federationReducer.size).to.equal(defaultModel.toJSON().size)
      expect(federationReducer.cash).to.equal(defaultModel.toJSON().cash)
      expect(federationReducer.backgroundColor).to.equal(
        defaultModel.toJSON().backgroundColor
      )
      expect(federationReducer.color).to.equal(defaultModel.toJSON().color)
    })

    describe("and reset is called", () => {
      before(() => {
        action.type = types.RESET
        federationReducer = reducer(undefined, action)
      })

      it("should have NO federation", () => {
        expect(federationReducer).to.be.empty
      })
    })
  })
})
