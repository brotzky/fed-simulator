import React from "react"
import { shallow } from "enzyme"
import sinon from "sinon"

import Create from "../src/components/create/create"
import Input from "../src/components/form/input"

const newInputValue = { target: { value: 'My new value' } }
let testProps = {
  name: "NAME",
	placeholder: "PLACEHOLDER",
  style: { color: "red", backgroundColor: "orange" },
  updateName: sinon.spy(),
}

describe("Given the create component", () => {
	let component

	beforeEach(() => component = shallow(<Create { ...testProps } />))

	it("should render a Create component", () => {
		expect(component.find(".create.wrapper")).to.have.length(1)
	})
	it("should render an Input component", () => {
		expect(component.find(Input)).to.have.length(1)
	})
	it("should render a placeholder on the Input", () => {
		expect(component.find(Input).prop("placeholder")).to.equal(testProps.placeholder)
	})
	it("should add the style", () => {
		const expectedResult = component.find(Input).props().style

		expect(expectedResult).to.equal(testProps.style)
	})
	describe("and the input is updated", () => {
		before(() => component.find(Input).simulate('change', newInputValue))

		it('should call updateName', () => {
			expect(testProps.updateName).to.be.calledOnce
		})
	})
})
