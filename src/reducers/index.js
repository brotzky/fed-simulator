import { combineReducers } from "redux"
import brands from "./brands"
import championships from "./championships"
import game from "./game"
import matches from "./matches"
import notifications from "./notifications"
import roster from "./roster"
import shows from "./shows"
import style from "./style"
import version from "./version"

const rootReducer = combineReducers({
  brands,
  championships,
  game,
  matches,
  notifications,
  roster,
  style,
  shows,
  version,
})

export default rootReducer
