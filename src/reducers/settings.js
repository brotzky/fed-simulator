const defaultState = {}

export default (state = defaultState, action) => {
	state = JSON.parse(JSON.stringify(state))

	switch (action.type) {
		case "RESET":
			state = defaultState
			break
		default:
			break
	}
	return state
}
