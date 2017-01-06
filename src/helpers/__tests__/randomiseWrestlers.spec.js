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
  },
  tag: {
    perTeam: 2,
    options: [true, false],
    weights: [0, 1],
  }
}

let isTagMatch = true

describe("randomiseWrestlers", () => {
  it("Correctly chose female wrestlers only", () => {
    const result = randomiseWrestlers({ wrestlers, settings: defaultSettings })
    expect(
      result[0].male
    ).to.equal(false)
    expect(
      result[1].male
    ).to.equal(false)
  })
  it("Correctly chose male wrestlers only", () => {
    defaultSettings.male.weights = [1, 0]
    const result = randomiseWrestlers({ wrestlers, settings: defaultSettings })
    expect(
      result[0].male
    ).to.equal(true)
    expect(
      result[1].male
    ).to.equal(true)
  })
  it("Correctly chose 1 vs 1", () => {
    const result = randomiseWrestlers({ wrestlers, settings: defaultSettings })
    expect(
      result.length
    ).to.equal(2)
  })
  it("Correctly chose a fatal fourway", () => {
    defaultSettings.amount.weights = [0, 0, 1]
    const total = defaultSettings.amount.weights.reduce((sum, weight) => sum + weight)
    expect(total).to.equal(1)

    const result = randomiseWrestlers({ wrestlers, settings: defaultSettings })
    expect(result.length).to.equal(4)
  })
  it("Correctly chose a fatal fourway", () => {
    defaultSettings.amount.weights = [0, 1, 0]
    const total = defaultSettings.amount.weights.reduce((sum, weight) => sum + weight)
    expect(total).to.equal(1)

    const result = randomiseWrestlers({ wrestlers, settings: defaultSettings })
    expect(result.length).to.equal(3)
  })
  it("Correctly created a 2 vs 2 tag match with 4 wrestlers", () => {
    defaultSettings.amount.weights = [1, 0, 0]
    const result = randomiseWrestlers({ wrestlers, settings: defaultSettings, isTagMatch })
    expect(result.length).to.equal(4)
  })
  it("Correctly created a 2 vs 2 tag match with team 0 with 2 wrestlers", () => {
    defaultSettings.amount.weights = [1, 0, 0]
    const result = randomiseWrestlers({ wrestlers, settings: defaultSettings, isTagMatch })
    expect(result.filter(wrestler => wrestler.teamId === 0).length).to.equal(2)
  })
  it("Correctly created a 2 vs 2 tag match with team 1 with 2 wrestlers", () => {
    defaultSettings.amount.weights = [1, 0, 0]
    const result = randomiseWrestlers({ wrestlers, settings: defaultSettings, isTagMatch })
    expect(result.filter(wrestler => wrestler.teamId === 1).length).to.equal(2)
  })
  it("Correctly created a 3 vs 3 vs 3 womens match match", () => {
    defaultSettings.amount.weights = [0, 1, 0]
    defaultSettings.male.weights = [0, 1]
    defaultSettings.tag.perTeam = 3
    const result = randomiseWrestlers({ wrestlers, settings: defaultSettings, isTagMatch })
    expect(result.filter(wrestler => wrestler.teamId === 0).length).to.equal(3)
    expect(result.filter(wrestler => wrestler.teamId === 1).length).to.equal(3)
    // expect(result.filter(wrestler => wrestler.teamId === 2).length).to.equal(3)
  })
})
