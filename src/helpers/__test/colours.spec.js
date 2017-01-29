import {
  expect
} from "../test"
import { luminance } from "../colours"

describe("luminance", () => {
  const cases = {
    "standard": {
      before: "69C",
      percent: -0.5,
      after: "#334d66",
    },
    "darken": {
      before: "000",
      percent: 1,
      after: "#000000",
    },
  }
  it("Correct lightens", () => {
    let v = cases.standard
    expect(luminance(v.before, v.percent)).to.equal(v.after)
  })
  it("Correctly darkens", () => {
    let v = cases.darken
    expect(luminance(v.before, v.percent)).to.equal(v.after)
  })
})
