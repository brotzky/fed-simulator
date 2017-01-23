const defaultState = []
import Model from "./ppv.model"

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state)),
    getIndexById = (id) => newState.findIndex(item => item.id === id)

  switch (action.type) {
    case "CREATE_PPV":
      if (getIndexById(action.ppv.id) < 0) {
        newState.push(
          new Model(action.ppv).toJSON()
        )
      }
      break
    default:
      break
  }
  return newState
}
