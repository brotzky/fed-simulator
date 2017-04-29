const defaultState = []
import Model from './show.model'

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case 'RESET':
      newState = defaultState
      break
    case 'UPDATE_SHOWS':
      newState = action.payload
      break
    default:
      break
  }
  return newState.map(show => new Model(show).toJSON())
}
