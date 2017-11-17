import reducers from "../reducers"
import persistState from "redux-localstorage"
import { createStore, compose } from "redux"

const storeEnhancer = compose(
  persistState(),
  typeof window === "object" && typeof window.devToolsExtension !== "undefined" ? window.devToolsExtension() : f => f
)

export default initialState => {
  return createStore(reducers, initialState, storeEnhancer)
}
