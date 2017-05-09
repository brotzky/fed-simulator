import reducer from '../src/reducers/version'
import * as types from '../src/actions/types'

const action = {
	type: types.CHECK_VERSION,
}

describe('version reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, action)
    ).to.equal(5)
  })

	it('should return the updated state', () => {
		expect(
			reducer(6, action)
		).to.equal(6)
	})
})
