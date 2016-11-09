import search from "./search.js"
import buckets from "./buckets.js"
import drops from "./drops.js"
import { combineReducers } from "redux"

const rootReducer = combineReducers({
  search,
  buckets,
  drops,
})

export default rootReducer
