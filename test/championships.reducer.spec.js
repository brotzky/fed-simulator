import reducer from "../src/reducers/championships"
import * as types from "../src/actions/types"

const defaultModel1 = {
  name: "Main Title",
  male: false,
}
const defaultModel2 = {
  name: "Secondary Title",
  male: true,
}
const action = {
  type: types.RESET,
  payload: [],
}

describe("given a championships reducer", () => {
  let activeReducer

  before(() => (activeReducer = reducer(undefined, action)))

  it("should return the initial state", () => {
    expect(activeReducer).to.be.empty
  })

  describe("and a collection is passed in", () => {
    before(() => {
      action.type = types.CREATE_CHAMPIONSHIP

      action.payload = defaultModel1
      activeReducer = reducer(activeReducer, action)

      action.payload = defaultModel2
      activeReducer = reducer(activeReducer, action)
    })

    it("should now have two in the collection", () => {
      expect(activeReducer.length).to.equal(2)
    })

    it("should have a red championship", () => {
      expect(activeReducer[0].id).to.not.be.null
      expect(activeReducer[0].male).to.equal(defaultModel1.male)
    })

    it("should have a blue championship", () => {
      expect(activeReducer[1].male).to.equal(defaultModel2.male)
    })

    describe("and delete request is called", () => {
      before(() => {
        action.payload = activeReducer[0].id
        action.type = types.DELETE_CHAMPIONSHIP

        activeReducer = reducer(activeReducer, action)
      })

      it("should have only one championship remaining", () => {
        expect(activeReducer.length).to.equal(1)
      })
    })

    describe("and an update is called", () => {
      let newName = "Jarrod"

      before(() => {
        action.payload = activeReducer[0]
        action.type = types.UPDATE_CHAMPIONSHIP
        action.payload.name = newName

        activeReducer = reducer(activeReducer, action)
      })

      it("should still only have one championship", () => {
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
