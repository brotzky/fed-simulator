import {
  expect
} from "./test"
import { toPercent } from "../src/helpers/match"

describe("toPercent", () => {
  const totals = {
    "75": {
      total: 100,
      percent: 75,
      result: 75,
    },
    "50": {
      total: 100,
      percent: 50,
      result: 50,
    },
    "25": {
      total: 100,
      percent: 25,
      result: 25,
    },
  }
  it("Correctly figures out 75 percent", () => {
    let { total, percent, result, } = totals[75]
    expect(toPercent(percent, total)).to.equal(result)
  })
  it("Correctly figures out 50 percent", () => {
    let { total, percent, result, } = totals[50]
    expect(toPercent(percent, total)).to.equal(result)
  })
  it("Correctly figures out 25 percent", () => {
    let { total, percent, result, } = totals[25]
    expect(toPercent(percent, total)).to.equal(result)
  })
})
