import { combineReducers } from "redux"
import federation from "./federation/index"
import game from "./game"
import notifications from "./notifications"
import style from "./style"
import version from "./version"

const rootReducer = combineReducers({
  federation,
  game,
  notifications,
  style,
  version,
})

export default rootReducer
