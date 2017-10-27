import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import Collection from '../src/components/collection/collection'
import ColorPickers from "../src/components/color-pickers/color-pickers"
import ColorPicker from "../src/components/color-pickers/color-picker"
import GenderIcon from "../src/components/icons/gender"
import Input from "../src/components/form/input"

const newStyle = { color: "red", backgroundColor: "white" }
const defaultStyle = { color: "purple", backgroundColor: "black" }

const defaultCollection = [
  {
    id: 1,
    name: "Aaron",
    style: defaultStyle,
  },
  {
    id: 2,
    name: "Lenny",
    style: defaultStyle,
  }
]
let testProps = {
	canUpdateColors: false,
  brands: [],
  canDelete: false,
  canUpdateBrand: false,
  canUpdateGender: false,
  canUpdateName: false,
  collection: defaultCollection,
  onChangeBackgroundColor: sinon.spy(),
  onChangeBrand: sinon.spy(),
  onChangeColor: sinon.spy(),
  onChangeGender: sinon.spy(),
  onChangeName: sinon.spy(),
  onDelete: sinon.spy(),
}

const getValuesTrueFor = (key, oldProps) => {
  let newProps = {
    canDelete: false,
    canUpdateName: false,
    canUpdateGender: false,
    canUpdateColors: false,
    canUpdateBrand: false,
    collection: [ defaultCollection[0] ],
  }

  if (newProps[key] !== undefined) {
    newProps[key] = true
  }

  return Object.assign({}, oldProps, newProps)
}

describe('Given the Collection component', () => {
	let component

	beforeEach(() => component = shallow(<Collection { ...testProps } />))

	it('should render a Collection component', () => {
		expect(component.find('.collection')).to.have.length(1)
	})

  describe('and a collection is passed in', () => {
    it('should render 2 amounts of rows', () => {
      const expectedResult = component.find('.item')

      expect(expectedResult).to.have.length(2)
    })
  })

  describe('and a style is passed in', () => {
    before(() => testProps.collection[0].style = newStyle)

    it('should render with style', () => {
      const expectedResult = component.find('.item').get(0).props.style

      expect(expectedResult).to.equal(newStyle)
    })
  })

  describe('and name update is enabled', () => {
    before(() => testProps = getValuesTrueFor('canUpdateName', testProps))

    it('should show an Input field called name', () => {
      expect(component.find(Input)).to.have.length(1)
    })
    it('should not show other fields', () => {
      expect(component.find(component.find('.delete'))).to.have.length(0)
			expect(component.find(ColorPickers)).to.have.length(0)
      expect(component.find(GenderIcon)).to.have.length(0)
    })

    describe('and input is updated', () => {
      before(() => {
        component.find(Input).simulate('change', {target: {value: 'My new value'}});
      })

      it('should call onChangeName', () => {
        expect(testProps.onChangeName).to.be.calledOnce
      })
    })
  })

  describe('and gender update is enabled', () => {
		before(() => testProps = getValuesTrueFor('canUpdateGender', testProps))

    it('should show a GenderIcon', () => {
			expect(GenderIcon).to.have.length(1)
    })
    it('should not show other fields', () => {
      expect(component.find(Input)).to.have.length(0)
			expect(component.find(component.find('.delete'))).to.have.length(0)
			expect(component.find(ColorPickers)).to.have.length(0)
    })

    describe('and gender is clicked', () => {
      before(() => component.find(GenderIcon).simulate('click'))

      it('should call onChangeGender with id', () => {
        expect(testProps.onChangeGender).to.be.calledOnce
      })
    })
  })

  describe('and the color picker is is enabled', () => {
    before(() => testProps = getValuesTrueFor('canUpdateColors', testProps))

    it('should show the ColorPicker', () => {
      expect(ColorPickers).to.have.length(1)
    })

    it('should not show other fields', () => {
      expect(component.find(GenderIcon)).to.have.length(0)
      expect(component.find(Input)).to.have.length(0)
			expect(component.find(component.find('.delete'))).to.have.length(0)
    })

    describe.skip('and colorpickers is clicked', () => {
      let colorPickers, color, backgroundColor

      before(() => {
        console.log("HI", shallow(component.find(ColorPickers)))
        colorPickers = component.find(".color-pickers").simulate('click')
      })

      describe("and color is clicked", () => {
        before(() => {
          color = component.find(".color")
          color.simulate("click")
        })

        it('should call onColorChange with id', () => {
          expect(testProps.onColorChange).to.be.calledOnce
        })
      })

      describe("and backgroundColor is clicked", () => {
        before(() => {
          backgroundColor = component.find(".background-color")
          backgroundColor.simulate("click")
        })

        it('should call onColorChange with id', () => {
          expect(testProps.onChangeBackgroundColorChange).to.be.calledOnce
        })
      })
    })
  })

  describe('and delete is enabled', () => {
    before(() => testProps = getValuesTrueFor('canDelete', testProps))

    it('should show the delete icon', () => {
      expect(component.find('.fa-trash-o')).to.have.length(1)
    })

    it('should not show other fields', () => {
      expect(component.find(Input)).to.have.length(0)
      expect(component.find(GenderIcon)).to.have.length(0)
      expect(component.find(ColorPickers)).to.have.length(0)
    })

    describe('and delete is clicked', () => {
      before(() => component.find('.delete').simulate('click'))

      it('should call onDelete with an id', () => {
        expect(testProps.onDelete).to.be.calledOnce
      })
    })
  })
})
