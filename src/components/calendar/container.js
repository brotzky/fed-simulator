import React, {Component} from 'react'
import update from 'react/lib/update'
import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import groupBy from 'lodash.groupby'
import {connect} from 'react-redux'

import {updateEvents} from '../../actions/events'
import showsOptions from '../../pages/shows.options.json'
import {getRandomArbitrary} from '../../helpers/math.js'
import Dustbin from './dustbin'
import Box from './box'

const groupedShowOptions = groupBy(showsOptions, 'size')

import './calendar.scss'

@DragDropContext(HTML5Backend)
class Container extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dustbins: this.props.dustbins,
      boxes: this.props.boxes,
      droppedBoxNames: [],
    }
  }

  isDropped(boxName) {
    return this.state.droppedBoxNames.indexOf(boxName) > -1
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
              lastDroppedItem={lastDroppedItem}
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
    const events = Object.assign([], this.props.events)
    events[index].name = name
    events[index].cost = getRandomArbitrary(
      groupedShowOptions[events[index].size][0].min_cost,
      groupedShowOptions[events[index].size][0].max_cost
    )
    this.props.dispatch(updateEvents(events))
  }
}

export default connect(state => ({
  events: state.events,
}))(Container)
