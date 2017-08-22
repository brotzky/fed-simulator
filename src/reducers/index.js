import { combineReducers } from "redux"
import brands from "./brands"
import calendar from "./calendar"
import championships from "./championships"
import game from "./game"
import matches from "./matches"
import notifications from "./notifications"
import roster from "./roster"
import settings from "./settings"
import shows from "./shows"
import style from "./style"
import version from "./version"

const rootReducer = combineReducers({
  brands,
  calendar,
  championships,
  game,
  matches,
  notifications,
  roster,
  settings,
  shows,
  style,
  version,
})

export default rootReducer
