const defaultState = []
import Model from "./wrestler.model"

export default (state = defaultState, action) => {
	state = JSON.parse(JSON.stringify(state))

	switch (action.type) {
		case "RESET":
			state = defaultState
			break
		case "UPDATE_ROSTER":
			state = action.payload
			break
		default:
			break
	}
	return state.map(wrestler => new Model(wrestler).toJSON())
}
