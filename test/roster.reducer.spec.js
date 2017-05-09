import reducer from '../src/reducers/roster'
import * as types from '../src/actions/types'
import Model from '../src/reducers/wrestler.model'

const defaultModel = new Model()
const defaultMaleWrestler = {
	name: 'man',
	male: true,
}
const defaultFemaleWrestler = {
	name: 'woman',
	male: false,
}
const defaultCollection = [defaultMaleWrestler, defaultFemaleWrestler]
const action = {
	type: types.UPDATE_ROSTER,
	payload: [],
}

describe('given a roster reducer', () => {
	let rosterReducer

	before(() => (rosterReducer = reducer(undefined, action)))

	it('should return the initial state', () => {
		expect(rosterReducer).to.be.empty
	})

	describe('and a roster collection is passed in', () => {
		before(() => {
			action.payload = defaultCollection
			rosterReducer = reducer(undefined, action)
		})

		it('should now two wrestlers', () => {
			expect(rosterReducer.length).to.equal(2)
		})
	})

	describe('and the roster has been passed through the model', () => {
		let rosterReducer

		before(() => {
			action.payload = defaultCollection
			rosterReducer = reducer(undefined, action)
		})

		it('should have id', () => {
			expect(rosterReducer[0].id).to.not.be.empty
			expect(rosterReducer[1].id).to.not.be.empty
		})

		it('should have correct stats', () => {
			expect(rosterReducer[0].losses).to.equal(defaultModel.toJSON().losses)
			expect(rosterReducer[0].points).to.equal(defaultModel.toJSON().points)
		})
	})
})
