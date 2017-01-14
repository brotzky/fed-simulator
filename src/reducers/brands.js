const defaultState = []
const defaultBrand = {
  id: 1,
  name: "Default",
  default: true,
  bgColour: "black",
  textColor: "white",
}

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  const getIndexById = (id) => newState.findIndex(item => item.id === id)

  switch (action.type) {
    case "UPDATE_BRAND":
      let index = getIndexById(action.brand.id)
      newState[index] = action.brand
      break
    case "CREATE_BRAND":
      if (newState.length === 0) {
        newState.push({
          ...defaultBrand
        })
      }
      if (getIndexById(action.brand.id) < 0) {
        newState.push({
          ...action.brand,
        })
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
