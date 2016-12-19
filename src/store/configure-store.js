import reducers from "../reducers"
import logger from "redux-diff-logger"
import reduxReset from "redux-reset"
import { batch, batching } from "redux-batch-middleware"
import persistState from "redux-localstorage"
import { createStore, applyMiddleware, compose } from "redux"

const storeEnhancer = compose(
  applyMiddleware(batch),
  applyMiddleware(logger),
  persistState(),
  reduxReset(),
  typeof window === "object" && typeof window.devToolsExtension !== "undefined"
    ? window.devToolsExtension()
    : f => f,
)

export default (initialState) => {
  return createStore(batching(reducers), initialState, storeEnhancer)
}
