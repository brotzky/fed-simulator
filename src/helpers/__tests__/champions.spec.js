import {
  React,
  expect,
} from "../test"
import {
  getChampions,
  getChampionsIds,
  getKeyedChampions,
  getWrestlersWithChampionships,
} from "../championships"
import defaultSettings from "./championships.json"

describe("championships", () => {

  it("getWrestlersWithChampionships", () => {
    const result = getWrestlersWithChampionships(defaultSettings)
    // console.log("getWrestlersWithChampionships", result)
    expect(
      Object.keys(result).length
    ).to.equal(7)
  })

  it("getChampions", () => {
    const result = getChampions(defaultSettings)
    // console.log("getChampions", result)
    expect(
      result.length
    ).to.equal(7)
  })

  it("getChampionsIds", () => {
    const result = getChampionsIds(defaultSettings)
    // console.log("getChampionsIds", result)
    expect(
      result.length
    ).to.equal(5)
  })

  it("getKeyedChampions", () => {
    const result = getKeyedChampions(defaultSettings)
    // console.log(result)
    expect(
      Object.keys(result).length
    ).to.equal(5)
  })
})
