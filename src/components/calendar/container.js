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

    this._generateDropzones({ liveShows: calendar, shows, })
  }

  componentWillReceiveProps(nextProps) {
    const { calendar, shows, } = nextProps

    this._generateDropzones({ liveShows: calendar, shows, })
  }

  shouldComponentUpdate() {
    return true
  }

  onHandleDrop(date, item) {
    if (!this.props.game.canPlan) return
    const { name, size, } = item
    const show = this.props.shows.find(show => show.name === name)

    this.props.dispatch(
      updateCalendarLiveShow({
        date,
        show,
        name,
        size,
      })
    )
  }

  render() {
    const { boxes, dustbins, } = this.state
    const style = this._getStyle()
    const groupedBoxes = groupBy(boxes, "size")
    const weekDays = this._getWeekdaysNames()
    return (
      <div className="calendar-inline">
        {Object.keys(groupedBoxes).map(index => {
          return (
            <div key={index} className="row">
              {groupedBoxes[index].map(({ name, size, date, type, }) => {
                return (
                  <Box
                    key={date}
                    style={style}
                    name={name}
                    size={size}
                    type={type}
                    canDrag={!this.props.calendar.isComplete}
                  />
                )
              })}
            </div>
          )
        })}
        <div className="row">
          {weekDays.map(day => {
            return (
              <div className="header">
                {day}
              </div>
            )
          })}
        </div>
        <div className="row">
          {dustbins.map(
            ({ name, accepts, previous, droppedItem, date, }, index) => (
              <Dustbin
                name={name}
                previous={previous}
                style={style}
                accepts={accepts}
                droppedItem={droppedItem}
                onDrop={item => this.onHandleDrop(date, item)}
                key={index}
              />
            )
          )}
        </div>
      </div>
    )
  }

  _getStyle() {
    const { backgroundColor, color, } = this.props.federation

    return { backgroundColor, color, }
  }

  _getWeekdaysNames() {
    return [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ]
  }

  _getOffsetDustbins() {
    const firstDate = new Date(this.props.calendar[0].date)
    const daysOffset = firstDate.getDay()
    const oneDay = 24 * 60 * 60 * 1000

    let emptyDates = []
    let accepts = []
    let droppedItem = {}
    let date = firstDate

    for (let i = 0; i < daysOffset; i++) {
      date = new Date(date.getTime() - oneDay)
      emptyDates.push({
        date,
        accepts,
        name: moment(date).format(DAY_FORMAT),
        droppedItem,
        previous: true,
      })
    }

    return emptyDates.reverse()
  }

  _generateDropzones({ liveShows, shows, }) {
    let dustbins = liveShows.map(liveShow => {
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
        previous: false,
      }
    })

    const boxes = shows.map(show => {
      return {
        name: show.name,
        size: show.size,
        type: itemType[show.size],
      }
    })

    const previousMonthDustbins = this._getOffsetDustbins()

    dustbins = previousMonthDustbins.concat(dustbins)

    this.setState({
      boxes,
      dustbins,
    })
  }
}

export default connect(state => ({
  shows: state.shows,
  federation: state.federation,
  game: state.game,
  calendar: state.calendar,
}))(Container)
