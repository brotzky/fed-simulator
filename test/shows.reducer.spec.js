import reducer from "../src/reducers/shows"
import { schema } from "../src/models/show.model"
import * as types from "../src/actions/types"

const defaultModel1 = {
  name: "Primary Show",
  payPerView: true,
}
const defaultModel2 = {
  name: "Secondary Show",
}
const action = {
  type: types.RESET,
  payload: [],
}

describe("given a shows reducer", () => {
  let activeReducer

  before(() => (activeReducer = reducer(undefined, action)))

  it("should return the initial state", () => {
    expect(activeReducer).to.be.empty
  })

  describe("and items are created", () => {
    let firstItem, lastItem

    before(() => {
      action.type = types.CREATE_SHOW

      action.payload = defaultModel1
      activeReducer = reducer(activeReducer, action)

      action.payload = defaultModel2
      activeReducer = reducer(activeReducer, action)
    })

    it("should now have two in the collection", () => {
      expect(activeReducer.length).to.equal(2)
    })

    it("should set an id and default payPerReview", () => {
      expect(activeReducer[0].id).to.not.be.nul;
      expect(activeReducer[0].payPerView).to.equal(defaultModel1.payPerView)
    })

    it("should have the models default payPerView value", () => {
      expect(activeReducer[1].payPerView).to.equal(schema.payPerView)
    })

    describe("and delete request is called", () => {
      before(() => {
        action.payload = activeReducer[0].id
        action.type = types.DELETE_SHOW

        activeReducer = reducer(activeReducer, action)
      })

      it("should have only one show remaining", () => {
        expect(activeReducer.length).to.equal(1)
      })
    })

    describe("and an update is called", () => {
      let newName = "Jarrod"

      before(() => {
        action.payload = activeReducer[0]
        action.type = types.UPDATE_SHOW
        action.payload.name = newName

        activeReducer = reducer(activeReducer, action)
      })

      it("should still only have one show", () => {
        expect(activeReducer.length).to.equal(1)
      })

      it("should update the name on that one item", () => {
        expect(activeReducer[0].name).to.equal(newName)
      })
    })

    describe("and reset is called", () => {
      before(() => {
        action.type = types.RESET
        activeReducer = reducer(activeReducer, action)
      })

      it("should have NO items in the collection", () => {
        expect(activeReducer).to.have.length(0)
      })
    })
  })
})
