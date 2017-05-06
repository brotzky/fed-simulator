import React, {Component} from 'react'
import update from 'react/lib/update'
import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import {connect} from 'react-redux'
import moment from 'moment'

import {DAY_FORMAT} from '../../constants/calendar'

import * as itemType from '../../actions/types'
import {updateCalendar} from '../../actions/calendar'
import {updateEvent} from '../../actions/events'
import Dustbin from './dustbin'
import Box from './box'

import './calendar.scss'

const getAcceptedSizes = date => {
  let accepts = [itemType['xs'], itemType['sm'], itemType['md'],]
  const day = moment(date).day()

  if (day === 0) {
    accepts = [itemType['lg'], itemType['md'],]
  } else if (day > 0 && day < 6) {
    accepts = [itemType['sm'], itemType['xs'],]
  } else {
    accepts = [itemType['md'],]
  }
  return accepts
}

@DragDropContext(HTML5Backend)
class Container extends Component {
  constructor(props) {
    super(props)

    const dustbins = props.events.dateRange.map(date => {
      const name = moment(date).format(DAY_FORMAT)
      const accepts = getAcceptedSizes(date)
      return {
        name,
        accepts,
        lastDroppedItem: props.events.collection.find(
          event => moment(event.date).format() === moment(date).format()
        ),
      }
    })

    const boxes = props.events.collection.map(event => {
      return {
        name: event.name,
        type: itemType[event.size],
      }
    })
    const droppedBoxNames = props.events.collection.map(event => event.name)

    this.state = {
      dustbins,
      boxes,
      droppedBoxNames,
    }
  }

  isDropped(boxName) {
    return (
      this.state.droppedBoxNames &&
      this.state.droppedBoxNames.indexOf(boxName) > -1
    )
  }

  render() {
    const {boxes, dustbins,} = this.state
    return (
      <div className="calendar-inline">
        <div className="row">
          {boxes.map(({name, type,}, index) => (
            <Box
              name={name}
              type={type}
              isDropped={this.isDropped(name)}
              key={index}
            />
          ))}
        </div>
        <div className="row">
          {dustbins.map(({name, accepts, lastDroppedItem,}, index) => (
            <Dustbin
              name={name}
              accepts={accepts}
              lastDroppedItem={boxes[index]}
              onDrop={item => this.handleDrop(index, item)}
              key={index}
            />
          ))}
        </div>
      </div>
    )
  }

  handleDrop(index, item) {
    const {name,} = item

    this.setState(
      update(this.state, {
        dustbins: {
          [index]: {
            lastDroppedItem: {
              $set: item,
            },
          },
        },
        droppedBoxNames: name
          ? {
              $push: [name,],
            }
          : {},
      })
    )

    let event = this.props.events.collection.find(event => event.name === name)
    event = Object.assign({name,}, event)

    this.props.dispatch(updateEvent({event,}))
    this.props.dispatch(updateCalendar(this.state))
  }
}

export default connect(state => ({
  events: state.events,
  calendar: state.calendar,
}))(Container)
