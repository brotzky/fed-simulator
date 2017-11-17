import React from "react"
import { shallow } from "enzyme"
import sinon from "sinon"

import { schema } from "../src/models/wrestler.model"
import Wrestlers from "../src/components/wrestlers/wrestlers"
import Wrestler from "../src/components/wrestler/wrestler"
// import { Visible, Gender, SortBy, Direction } from "../src/components/icons"

// const sandbox = sinon.sandbox.create()
//
const testProps = {
  collection: [{ ...schema, id: "123" }, { ...schema, id: "456" }],
}

describe("Given the Wrestlers component", () => {
  let component

  beforeEach(() => (component = shallow(<Wrestlers {...testProps} />)))

  it("should render a wrestlers container div", () => {
    expect(component.find(".wrestlers")).to.have.length(1)
  })

  it("should render two wrestlers", () => {
    expect(component.find(Wrestler)).to.have.length(2)
  })
})
