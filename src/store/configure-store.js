import reducers from "../reducers"
import { batch, batching } from "redux-batch-middleware"
import persistState from "redux-localstorage"
import { createStore, applyMiddleware, compose } from "redux"

const storeEnhancer = compose(
  applyMiddleware(batch),
  persistState(),
  typeof window === "object" && typeof window.devToolsExtension !== "undefined"
    ? window.devToolsExtension()
    : f => f,
)

export default (initialState) => {
  return createStore(batching(reducers), initialState, storeEnhancer)
}
