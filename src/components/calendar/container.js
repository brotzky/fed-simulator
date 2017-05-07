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
  componentWillMount() {
    const {calendar, shows,} = this.props
    const {dateRange, collection,} = calendar

    this.generateDropzones({dateRange, liveShows: collection, shows,})
  }

  componentWillReceiveProps(nextProps) {
    const {calendar, shows,} = nextProps
    const {dateRange, collection,} = calendar

    this.generateDropzones({dateRange, liveShows: collection, shows,})
  }

  shouldComponentUpdate() {
    return true
  }

  render() {
    const {boxes, dustbins,} = this.state
    return (
      <div className="calendar-inline">
        <div className="row">
          {boxes.map(({name, size, type,}, index) => (
            <Box name={name} size={size} type={type} key={index} />
          ))}
        </div>
        <div className="row">
          {dustbins.map(({name, accepts, droppedItem,}, index) => (
            <Dustbin
              name={name}
              accepts={accepts}
              droppedItem={droppedItem}
              onDrop={item => this.handleDrop(index, item)}
              key={index}
            />
          ))}
        </div>
      </div>
    )
  }

  generateDropzones({liveShows, shows,}) {
    const dustbins = liveShows.map(liveShow => {
      const name = moment(liveShow.date).format(DAY_FORMAT)
      const accepts = getAcceptedSizes(liveShow.date)
      const droppedItem = liveShow.showId
        ? {name: liveShow.name, size: liveShow.size,}
        : {}

      return {
        name,
        accepts,
        droppedItem,
      }
    })

    const boxes = shows.map(show => {
      return {
        name: show.name,
        size: show.size,
        type: itemType[show.size],
      }
    })

    this.setState({
      boxes,
      dustbins,
    })
  }

  handleDrop(dateIndex, item) {
    const {name, size,} = item
    const show = this.props.shows.find(show => show.name === name)

    this.props.dispatch(
      updateCalendarLiveShow({
        dateIndex,
        show,
        name,
        size,
      })
    )
  }
}

export default connect(state => ({
  shows: state.shows,
  calendar: state.calendar,
}))(Container)
