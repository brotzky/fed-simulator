import buckets from "./buckets.js"
import wrestlers from "./wrestlers.js"
import match from "./match.js"
import { combineReducers } from "redux"

const rootReducer = combineReducers({
  buckets,
  wrestlers,
  match,
})

export default rootReducer
