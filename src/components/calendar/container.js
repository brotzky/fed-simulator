import React, {Component} from 'react'
import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import {connect} from 'react-redux'
import moment from 'moment'

import {DAY_FORMAT} from '../../constants/calendar'

import * as itemType from '../../actions/types'
import {updateCalendarLiveShow} from '../../actions/calendar'
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

    this.generateDropzones(props.calendar, props.shows)
  }

  componentWillReceieveProps(nextProps) {
    this.generateDropzones(nextProps.calendar, nextProps.shows)
  }

  render() {
    const {boxes, dustbins,} = this.state
    return (
      <div className="calendar-inline">
        <div className="row">
          {boxes.map(({name, type,}, index) => (
            <Box name={name} type={type} key={index} />
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

  generateDropzones(calendar, shows) {
    const dustbins = calendar.dateRange.map(date => {
      const name = moment(date).format(DAY_FORMAT)
      const accepts = getAcceptedSizes(date)
      const droppedItem = calendar.collection.find(event => {
        return Date(event.date) === Date(date)
      })
      return {
        name,
        accepts,
        droppedItem,
      }
    })

    const boxes = shows.map(show => {
      return {
        name: show.name,
        type: itemType[show.size],
      }
    })

    this.state = {
      dustbins,
      boxes,
    }
  }

  handleDrop(index, item) {
    const {name,} = item

    let show = this.props.shows.find(show => show.name === name)
    let liveShow = this.props.calendar.collection[index]
    liveShow = Object.assign(liveShow, {name, showId: show.id,})

    this.props.dispatch(updateCalendarLiveShow({liveShow,}))
  }
}

export default connect(state => ({
  shows: state.shows,
  calendar: state.calendar,
}))(Container)
