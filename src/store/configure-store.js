import reducers from "../reducers"
import persistState from "redux-localstorage"
import { createStore, compose, applyMiddleware } from "redux"
import { chainMiddleware } from "redux-chain"

const storeEnhancer = compose(
  persistState(),
  applyMiddleware(chainMiddleware),
  typeof window === "object" && typeof window.devToolsExtension !== "undefined" ? window.devToolsExtension() : f => f
)

export default initialState => {
  return createStore(reducers, initialState, storeEnhancer)
}
