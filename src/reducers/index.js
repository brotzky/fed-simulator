import buckets from "./buckets.js"
import drops from "./drops.js"
import match from "./match.js"
import { combineReducers } from "redux"

const rootReducer = combineReducers({
  buckets,
  drops,
  match,
})

export default rootReducer
