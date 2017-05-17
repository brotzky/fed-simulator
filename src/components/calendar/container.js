import React, { Component } from "react"
import { DragDropContext } from "react-dnd"
import HTML5Backend from "react-dnd-html5-backend"
import { connect } from "react-redux"
import groupBy from "lodash.groupby"
import moment from "moment"

import { DAY_FORMAT } from "../../constants/calendar"
import * as itemType from "../../actions/types"
import { updateCalendarLiveShow } from "../../actions/calendar"
import Dustbin from "./dustbin"
import Box from "./box"
import getAcceptedSizes from "../../helpers/get-accepted-sizes"

import "./calendar.scss"

@DragDropContext(HTML5Backend)
class Container extends Component {
  componentWillMount() {
    const { calendar, shows, } = this.props

    this.generateDropzones({ liveShows: calendar, shows, })
  }

  componentWillReceiveProps(nextProps) {
    const { calendar, shows, } = nextProps

    this.generateDropzones({ liveShows: calendar, shows, })
  }

  shouldComponentUpdate() {
    return true
  }

  render() {
    const { boxes, dustbins, } = this.state
    const { backgroundColor, color, } = this.props.federation
    const style = { backgroundColor, color, }
    const groupedBoxes = groupBy(boxes, "size")
    return (
      <div className="calendar-inline">
        {Object.keys(groupedBoxes).map(index => {
          return (
            <div key={index} className="row">
              {groupedBoxes[index].map(({ name, size, date, type, }, index) => {
                return (
                  <Box
                    key={date}
                    style={style}
                    name={name}
                    size={size}
                    type={type}
                    key={index}
                    canDrag={!this.props.calendar.isComplete}
                  />
                )
              })}
            </div>
          )
        })}
        <div className="row">
          {dustbins.map(({ name, accepts, droppedItem, }, index) => (
            <Dustbin
              name={name}
              style={style}
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

  generateDropzones({ liveShows, shows, }) {
    const dustbins = liveShows.map(liveShow => {
      const name = moment(liveShow.date).format(DAY_FORMAT)
      const date = liveShow.date
      const accepts = getAcceptedSizes(liveShow.date)
      const droppedItem = liveShow.showId
        ? { name: liveShow.name, size: liveShow.size, }
        : {}

      return {
        accepts,
        date,
        droppedItem,
        name,
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
    if (this.props.calendar.isComplete) return
    const { name, size, } = item
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
  federation: state.federation,
  game: state.game,
  calendar: state.calendar,
}))(Container)
