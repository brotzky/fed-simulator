import buckets from './buckets.js'
import drops from './drops.js'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  buckets,
  drops,
})

export default rootReducer
