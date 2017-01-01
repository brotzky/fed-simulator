import { combineReducers } from "redux"
import brands from "./brands.js"
import championships from "./championships.js"
import moves from "./moves.js"
import ppvs from "./ppvs.js"
import settings from "./settings.js"
import shows from "./shows.js"
import version from "./version.js"
import wrestlers from "./wrestlers.js"

const rootReducer = combineReducers({
  brands,
  championships,
  moves,
  ppvs,
  settings,
  shows,
  version,
  wrestlers,
})

export default rootReducer
