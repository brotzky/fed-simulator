import {combineReducers} from 'redux'
import version from './version.js'
import settings from './settings.js'

const rootReducer = combineReducers({
  version,
  settings,
})

export default rootReducer
