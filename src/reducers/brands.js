import defaultState from "./brands.default"

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  const getBrandIndexById = (id) => newState.findIndex(brand => brand.id === id)

  switch (action.type) {
    case "UPDATE_BRAND":
      let index = getBrandIndexById(action.brand.id)
      newState[index] = action.brand
      break
    default:
      break
  }
  return newState
}
