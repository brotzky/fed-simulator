const defaultState = 5

export default (state = defaultState, action) => {
	state = JSON.parse(JSON.stringify(state))

	switch (action.type) {
		case "CHECK_VERSION":
			state = state
			break
		default:
			break
	}
	return state
}
