import reducer from "../src/reducers/brands"
import * as types from "../src/actions/types"

const defaultModel1 = {
  name: "Smackdown Live",
  style: {
    color: "blue",
    backgroundColor: "white",
  },
}
const defaultModel2 = {
  name: "Raw",
  style: {
    color: "red",
    backgroundColor: "white",
  },
}
const action = {
  type: types.RESET,
  payload: [],
}

describe("given a brands reducer", () => {
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
      expect(activeReducer[0].style.color).to.equal(defaultModel1.style.color)
    })

    it("should have a blue brand", () => {
      expect(activeReducer[1].style.color).to.equal(defaultModel2.style.color)
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

    describe("and UPDATE_BRAND is called", () => {
      let newName = "Jarrod"

      before(() => {
        action.payload = activeReducer[0]
        action.type = types.UPDATE_BRAND
        action.payload.name = newName

        activeReducer = reducer(activeReducer, action)
      })

      it("should still only have one brand", () => {
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
