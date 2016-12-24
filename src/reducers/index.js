import brands from "./brands.js"
import championships from "./championships.js"
import shows from "./shows.js"
import moves from "./moves.js"
import ppvs from "./ppvs.js"
import wrestlers from "./wrestlers.js"
import version from "./version.js"
import { combineReducers } from "redux"

const rootReducer = combineReducers({
  moves,
  shows,
  brands,
  ppvs,
  championships,
  wrestlers,
  version,
})

export default rootReducer
