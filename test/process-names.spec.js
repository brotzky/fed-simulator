import processNames from "../src/components/wrestler/process-names"

describe("Given a process names function", () => {
  let result

  describe("Given a name with one part", () => {
    before(() => (result = processNames("Undertaker")))

    it("should have the right length", () => {
      expect(result).to.have.length(1)
    })
  })

  describe("Given a name with two parts", () => {
    before(() => (result = processNames("Apollo Crews")))

    it("should have the right length", () => {
      expect(result).to.have.length(2)
    })
  })

  describe("Given a name with three parts", () => {
    before(() => (result = processNames("Titus O Neil")))

    it("should have the right length", () => {
      expect(result).to.have.length(3)
    })
  })
})
