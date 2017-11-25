import { combineReducers } from "redux"
import federation from "./federation/index"
import game from "./game"
import style from "./style"
import version from "./version"

const rootReducer = combineReducers({
  federation,
  game,
  style,
  version,
})

export default rootReducer
