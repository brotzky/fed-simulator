import { combineReducers } from "redux"
import calendar from "./calendar"
import championships from "./championships"
import federation from "./federation"
import game from "./game"
import roster from "./roster"
import settings from "./settings"
import shows from "./shows"
import version from "./version"

const rootReducer = combineReducers({
  calendar,
  championships,
  federation,
  game,
  roster,
  settings,
  shows,
  version,
})

export default rootReducer
