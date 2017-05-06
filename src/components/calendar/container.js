import React, {Component} from 'react'
import update from 'react/lib/update'
import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import {connect} from 'react-redux'

import {updateCalendar} from '../../actions/calendar'
import {updateEvent} from '../../actions/events'
import Dustbin from './dustbin'
import Box from './box'

import './calendar.scss'

@DragDropContext(HTML5Backend)
class Container extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dustbins: this.props.events.dustbins,
      boxes: this.props.events ? this.props.events.boxes : [],
      droppedBoxNames: this.props.events.droppedBoxNames
        ? this.props.events.droppedBoxNames
        : [],
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

    let event = this.props.events.find(event => event.name === name)
    event = Object.assign({name,}, event)

    this.props.dispatch(updateEvent({event,}))
    this.props.dispatch(updateCalendar(this.state))
  }
}

export default connect(state => ({
  events: state.events,
  calendar: state.calendar,
}))(Container)
