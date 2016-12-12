import {
  React,
  expect,
} from "../test"
import { groupWrestlersByChampionshipId, groupWrestlersByChampionships, groupByWrestlerIds } from "../championships"
import defaultSettings from "./championships.json"

describe("championships", () => {
  it("groupWrestlersByChampionshipId", () => {
    const result = groupWrestlersByChampionshipId(defaultSettings)
    console.log(result)
    expect(
      result.length
    ).to.equal(5)
  })
  // it("groupWrestlersByChampionships", () => {
  //   const result = groupWrestlersByChampionships(defaultSettings)
  //   // console.log(result)
  //   expect(
  //     result.length
  //   ).to.equal(5)
  // })
  // it("groupByWrestlerIds", () => {
  //   const result = groupByWrestlerIds(defaultSettings)
  //   // console.log(result)
  //   expect(
  //     result.length
  //   ).to.equal(7)
  // })
})
