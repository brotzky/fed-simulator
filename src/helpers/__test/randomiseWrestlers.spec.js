import {
  React,
  expect,
} from "../test"
import { randomiseWrestlers } from "../match"
import wrestlers from "./wrestlers.json"

let defaultSettings = {
  male: {
    options: [true, false],
    weights: [0, 1],
  },
  amount: {
    options: [2, 3, 4],
    weights: [1, 0, 0]
  }
}

describe("randomiseWrestlers", () => {
  it("Correctly chose female wrestlers only", () => {
    const result = randomiseWrestlers(wrestlers, defaultSettings)
    expect(
      result[0].male
    ).to.equal(false)
    expect(
      result[1].male
    ).to.equal(false)
  })
  it("Correctly chose male wrestlers only", () => {
    defaultSettings.male.weights = [1, 0]
    const result = randomiseWrestlers(wrestlers, defaultSettings)
    expect(
      result[0].male
    ).to.equal(true)
    expect(
      result[1].male
    ).to.equal(true)
  })
  it("Correctly chose 1 vs 1", () => {
    const result = randomiseWrestlers(wrestlers, defaultSettings)
    expect(
      result.length
    ).to.equal(2)
  })
  it("Correctly chose a fatal fourway", () => {
    defaultSettings.amount.weights = [0, 0, 1]
    const total = defaultSettings.amount.weights.reduce((sum, weight) => sum + weight)
    expect(total).to.equal(1)

    const result = randomiseWrestlers(wrestlers, defaultSettings)
    expect(result.length).to.equal(4)
  })
  it("Correctly chose a fatal fourway", () => {
    defaultSettings.amount.weights = [0, 1, 0]
    const total = defaultSettings.amount.weights.reduce((sum, weight) => sum + weight)
    expect(total).to.equal(1)

    const result = randomiseWrestlers(wrestlers, defaultSettings)
    expect(result.length).to.equal(3)
  })
})
