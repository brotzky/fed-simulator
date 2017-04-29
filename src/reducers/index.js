import {combineReducers} from 'redux'
import championships from './championships'
import events from './events'
import federation from './federation'
import roster from './roster'
import settings from './settings'
import shows from './shows'
import version from './version'

const rootReducer = combineReducers({
  championships,
  events,
  federation,
  roster,
  settings,
  shows,
  version,
})

export default rootReducer
