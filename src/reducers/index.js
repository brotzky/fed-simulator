import brands from "./brands.js"
import wrestlers from "./wrestlers.js"
import match from "./match.js"
import { combineReducers } from "redux"

const rootReducer = combineReducers({
  brands,
  wrestlers,
  match,
})

export default rootReducer
