const defaultState = []
import Model from "./show.model"

export default (state = defaultState, action) => {
	state = JSON.parse(JSON.stringify(state))

	switch (action.type) {
		case "RESET":
			state = defaultState
			break
		case "UPDATE_SHOWS":
			state = action.payload
			break
		default:
			break
	}
	return state.map(show => new Model(show).toJSON())
}
