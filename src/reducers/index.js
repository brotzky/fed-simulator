import brands from "./brands.js"
import moves from "./moves.js"
import wrestlers from "./wrestlers.js"
import match from "./match.js"
import { combineReducers } from "redux"

const rootReducer = combineReducers({
  moves,
  brands,
  wrestlers,
  match,
})

export default rootReducer
