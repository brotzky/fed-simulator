import groupBy from 'lodash.groupby'
import moment from 'moment'

import {DAY_FORMAT} from '../constants/calendar'

import * as itemType from '../actions/types'
import showsOptions from '../pages/shows.options.json'
import {getRandomArbitrary} from '../helpers/math.js'
import {getDateRange} from '../helpers/get-date-range'
import Model from './event.model'

const firstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
const lastDay = new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, 0)
const inProgress = false

const defaultState = {
  inProgress,
  firstDay,
  lastDay,
  currentDate: firstDay,
  droppedBoxNames: [],
  dateRange: [],
  collection: [],
  dustbins: [],
  boxes: [],
}

const getAcceptedSizes = date => {
  let accepts = [itemType['xs'], itemType['sm'], itemType['md'],]
  let day = moment(date).day()

  if (day === 0) {
    accepts = [itemType['lg'], itemType['md'],]
  } else if (day > 0 && day < 6) {
    accepts = [itemType['sm'], itemType['xs'],]
  } else {
    accepts = [itemType['md'],]
  }
  return accepts
}

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case 'RESET':
    case 'RESET_EVENTS':
      newState = defaultState
      break
    case 'CREATE_EVENTS':
      newState.dateRange.forEach(date => {
        newState.collection.push(new Model({date: date,}).toJSON())
      })
      break
    case 'UPDATE_EVENTS':
      newState.collection = action.payload
      break
    case 'UPDATE_EVENT':
      const groupedShowOptions = groupBy(showsOptions, 'size')
      const index = newState.collection.findIndex(
        event => event.id === action.payload.event.id
      )
      newState.collection[index].cost = getRandomArbitrary(
        groupedShowOptions[newState.collection[index].size][0].min_cost,
        groupedShowOptions[newState.collection[index].size][0].max_cost
      )
      break
    case 'SIMULATE_EVENT':
      break
    default:
      break
  }

  newState.dateRange = getDateRange(newState.firstDay, newState.lastDay)
  console.log('1')
  newState.dustbins = newState.dateRange.map(date => {
    let accepts = getAcceptedSizes(date)
    return {
      name: moment(date).format(DAY_FORMAT),
      accepts,
      lastDroppedItem: newState.collection.find(
        event => moment(event.date).format() === moment(date).format()
      ),
    }
  })
  newState.boxes = newState.collection.map(event => {
    return {
      name: event.name,
      type: itemType[event.size],
    }
  })
  newState.collection = newState.collection.map(event =>
    new Model(event).toJSON()
  )
  return newState
}
