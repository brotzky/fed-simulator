import React, { Component } from "react"
import { connect } from "react-redux"
import groupBy from "lodash.groupby"
import moment from "moment"
import PropTypes from "prop-types"

import EmptyDate from "./empty-date"
import Liveshow from "../liveshow/liveshow"
import { deleteLiveShow } from "../../actions/calendar"
import { DAY_FORMAT } from "../../constants/calendar"
import * as itemType from "../../actions/types"
import { updateCalendarLiveShow } from "../../actions/calendar"
import Dustbin from "./dustbin"
import Box from "./box"
import WeekDays from "./weekdays"
import getAcceptedSizes from "../../helpers/get-accepted-sizes"

import "./calendar.scss"

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
    if (!this.props.canPlan) return
    const { shows, dispatch, } = this.props

    const { name, size, } = item
    const show = shows.find(show => show.name === name)

    dispatch(
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
    const { canPlan, style, } = this.props
    const groupedBoxes = groupBy(boxes, "size")

    return (
      <div className="calendar">
        {Object.keys(groupedBoxes).map(size => {
          return (
            <div key={`calendar-show-${size}`} className="row">
              {groupedBoxes[size].map(({ name, size, type, }) => {
                return (
                  <Box
                    key={`calendar-box-${name}`}
                    name={name}
                    type={type}
                    canDrag={canPlan}
                  >
                    <Liveshow
                      shortenName={true}
                      shortenNameLength={18}
                      name={name}
                      size={size}
                      style={style}
                    />
                  </Box>
                )
              })}
            </div>
          )
        })}
        <WeekDays />
        <div className="row">
          {this._getOffsetDustbins().map((dustbin, key) => {
            const date = new Date(dustbin.date).getDate()
            return <EmptyDate date={date} key={key} />
          })}
          {dustbins.map(dustbin => {
            return (
              <Dustbin
                key={`calendar-dustbin-${dustbin.date}`}
                name={dustbin.name}
                previous={dustbin.previous}
                style={style}
                accepts={dustbin.accepts}
                droppedItem={dustbin.droppedItem}
                canDelete={canPlan}
                onClickDelete={item => this.onClickDelete(dustbin.date, item)}
                onDrop={item => this.onHandleDrop(dustbin.date, item)}
              />
            )
          })}
        </div>
      </div>
    )
  }

  _getOffsetDustbins() {
    const { calendar, } = this.props
    const firstDate = new Date(calendar[0].date)
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

    this.setState({
      boxes,
      dustbins,
    })
  }

  onClickDelete = date => {
    this.props.dispatch(deleteLiveShow(date))
  }
}

Container.propTypes = {
  canPlan: PropTypes.bool.isRequired,
  style: PropTypes.object.isRequired,
  shows: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  calendar: PropTypes.array.isRequired,
}

export default connect(state => ({
  shows: state.shows,
  style: state.style,
  canPlan: state.game.canPlan,
  calendar: state.calendar,
}))(Container)
