const defaultState = []
import Model from "./championship.model"

export default (state = defaultState, action) => {
	state = JSON.parse(JSON.stringify(state))

	switch (action.type) {
		case "RESET":
			state = defaultState
			break
		case "UPDATE_CHAMPIONS":
			state = action.payload
			break
		default:
			break
	}
	return state.map(championship => new Model(championship).toJSON())
}
