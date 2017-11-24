import reducer from "../src/reducers/version"
import * as types from "../src/actions/types"

const action = {
  type: types.CHECK_VERSION,
}

describe("given a version reducer", () => {
  it("should set a default version of 5", () => {
    expect(reducer(undefined, action)).to.equal(5.5)
  })

  it("and the version number is now 6", () => {
    expect(reducer(6, action)).to.equal(6)
  })
})
