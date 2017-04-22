import {combineReducers} from 'redux'
import champions from './champions'
import events from './events'
import federation from './federation'
import roster from './roster'
import settings from './settings'
import shows from './shows'
import version from './version'

const rootReducer = combineReducers({
  champions,
  events,
  federation,
  roster,
  settings,
  shows,
  version,
})

export default rootReducer
