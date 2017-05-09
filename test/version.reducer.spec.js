import reducer from '../src/reducers/roster'
import * as types from '../src/actions/types'

const defaultMaleWrestler = {
	name: "man",
	male: true,
}
const defaultFemaleWrestler = {
        name: "woman",
        male: false,
}
const defaultCollection = [defaultMaleWrestler, defaultFemaleWrestler,]
const action = {
	type: types.CHECK_VERSION,
}

describe('version reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, action)
    ).to.be.empty
  })

	it('should return the updated state', () => {
		expect(
			reducer(defaultCollection, action).length
		).to.equal(2)
	})
})
