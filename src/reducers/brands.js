const defaultState = []
import Model from "./brand.model"

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  const getIndexById = (id) => newState.findIndex(item => item.id === id)

  switch (action.type) {
    case "UPDATE_BRAND":
      let index = getIndexById(action.brand.id)
      newState[index] = new Model(action.brand).toJSON()
      break
    case "CREATE_BRAND":
      if (newState.length === 0) {
        newState.push(
          new Model().toJSON(),
        )
      }
      if (getIndexById(action.brand.id) < 0) {
        newState.push(
          new Model(action.brand).toJSON(),
        )
      }
      break
    case "RESET":
      newState = defaultState
      break
    default:
      break
  }
  return newState
}
