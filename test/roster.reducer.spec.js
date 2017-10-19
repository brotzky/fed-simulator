import reducer from "../src/reducers/roster"
import * as types from "../src/actions/types"
import { schema } from "../src/models/wrestler.model"

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
  type: types.RESET,
  payload: [],
}

describe("given a roster reducer", () => {
  let activeReducer

  before(() => (activeReducer = reducer(undefined, action)))

  it("should be empty", () => {
    expect(activeReducer).to.be.empty
  })

  describe("and two wrestlers are created", () => {
    before(() => {
      action.type = types.CREATE_WRESTLER

      action.payload = defaultMale
      activeReducer = reducer(activeReducer, action)

      action.payload = defaultFemale
      activeReducer = reducer(activeReducer, action)
    })

    it("should now have two in the collection", () => {
      expect(activeReducer.length).to.equal(2)
    })

    it("should have a male with an id", () => {
      expect(activeReducer[0].male).to.equal(defaultMale.male)
      expect(activeReducer[0].id).to.not.be.empty
    })

    it("should have a female with an id", () => {
      expect(activeReducer[1].male).to.equal(defaultFemale.male)
      expect(activeReducer[1].id).to.not.be.empty
    })

    it("should have correct stats", () => {
      expect(activeReducer[0].wins).to.equal(schema.wins)
      expect(activeReducer[0].losses).to.equal(schema.losses)
      expect(activeReducer[0].points).to.equal(schema.points)
    })
  })

  describe("and update wrestler is called", () => {
    let updatedWrestler

    before(() => {
      updatedWrestler = Object.assign({}, activeReducer[0], { name: "Nothing", })

      action.type = types.UPDATE_WRESTLER
      action.payload = updatedWrestler
      activeReducer = reducer(activeReducer, action)
    })

    it("should have an updated name", () => {
      expect(activeReducer[0].name).to.equal(updatedWrestler.name)
    })
  })

  describe("and reset is called", () => {
    before(() => {
      action.type = types.RESET
      activeReducer = reducer(undefined, action)
    })

    it("should have NO wrestlers", () => {
      expect(activeReducer.length).to.equal(0)
    })
  })
})
