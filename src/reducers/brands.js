import defaultState from "./brands.default"

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  const getIndexById = (id) => newState.findIndex(item => item.id === id)

  switch (action.type) {
    case "UPDATE_BRAND":
      let index = getIndexById(action.brand.id)
      newState[index] = action.brand
      break
    default:
      break
  }
  return newState
}
