import reducer from "../src/reducers/federation/index"

const defaultState = {
  championships: [{ id: 1 }],
  brands: [{ id: 1 }],
  roster: [{ id: 1 }],
  matches: [{ id: 1 }],
}

describe("given a federation reducer", () => {
  let activeReducer

  before(() => (activeReducer = reducer(defaultState, { type: "RESET" })))

  it("should have the same amount of keys", () => {
    expect(activeReducer.length).to.equal(defaultState.length)
  })
})
