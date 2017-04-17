import {combineReducers} from 'redux'
import champions from './champions'
import federation from './federation'
import events from './events'
import ppvs from './ppvs'
import roster from './roster'
import settings from './settings'
import version from './version'

const rootReducer = combineReducers({
  champions,
  events,
  federation,
  ppvs,
  roster,
  settings,
  version,
})

export default rootReducer
