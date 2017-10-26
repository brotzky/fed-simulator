import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import Collection from '../src/components/collection/collection'
import ColorPickers from "../src/components/color-pickers/color-pickers"
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

	beforeEach(() => {
    component = shallow(<Collection { ...testProps } />)
  })

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
    it('should show an Input field called name', () => {

    })
    it('should not show other fields', () => {
      // (gender, brands, delete, colors)
    })

    describe('and input is updated', () => {
      it('should call onChangeName', () => {
       })
    })
  })

  describe('and gender update is enabled', () => {
    it('should show a GenderIcon', () => {

    })
    it('should not show other fields', () => {
      // (name, brands, delete, colors)
    })

    describe('and gender is clicked', () => {
      it('should call onChangeGender with id', () => {

      })
    })
  })

  describe('and color update is enabled', () => {
    it('should show the ColorPicker', () => {

    })
    it('should not show other fields', () => {
      // (name gender, brands, delete)
    })

    describe('and color change is called', () => {
      it('should call onColorChange with id', () => {

      })

      describe('and backgroundColor change is called', () => {
        it('should call onChangeBackgroundColor with id', () => {

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
