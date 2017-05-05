import React, {Component} from 'react'
import {connect} from 'react-redux'
import groupBy from 'lodash/groupBy'
import moment from 'moment'

import {DATE_FORMAT, DAY_FORMAT, MONTH_YEAR_FORMAT} from '../constants/calendar'
import {generateEventsForMonth, resetEvents} from '../actions/events'
import {resetCalendar} from '../actions/calendar'
import {getDateRange} from '../helpers/get-date-range'
import Calendar from '../components/calendar/container'
import * as itemType from '../actions/types'
import Accounting from '../components/accounting/container'

import './stylesheets/calendar'

class CalendarPage extends Component {
  displayName = 'CalendarPage'

  componentWillMount() {
    this._getCalendarInformation()

    if (this.props.events.length === 0) {
      this.props.dispatch(
        generateEventsForMonth({dateRange: this.state.dateRange,})
      )
    }
  }

  _getAcceptedSizes(date) {
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

  onClear = () => {
    this.props.dispatch(resetCalendar())
    this.props.dispatch(resetEvents())
  }

  _getCalendarInformation() {
    const date = new Date(this.props.federation.currentDate)
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)
    const activeDate = moment(this.props.federation.currentDate).format(
      DATE_FORMAT
    )
    const dateRange = getDateRange(firstDay, lastDay)
    const showsGroupedBySize = groupBy(this.props.shows, show => show.size)
    const dustbins = dateRange.map(date => {
      let accepts = this._getAcceptedSizes(date)
      return {
        name: moment(date).format(DAY_FORMAT),
        accepts,
        lastDroppedItem: this.props.events.find(
          event => moment(event.date).format() === moment(date).format()
        ),
      }
    })
    const boxes = this.props.shows.map(event => {
      return {
        name: event.name,
        type: itemType[event.size],
      }
    })

    this.setState({
      date,
      firstDay,
      dustbins,
      boxes,
      lastDay,
      dateRange,
      activeDate,
      showsGroupedBySize,
    })
  }

  render() {
    return (
      <section className="page calendar">
        <div className="row">
          <div className="col-xs-10">
            <h1>
              {moment(this.state.date).format(MONTH_YEAR_FORMAT)}
              <a onClick={this.onClear}>
                <div className="fa fa-trash-o fa-md" />
              </a>
            </h1>
            <Calendar
              dustbins={this.state.dustbins}
              boxes={this.state.boxes}
              calendar={this.props.calendar}
            />
          </div>
          <div className="col-xs-2">
            <Accounting />
          </div>
        </div>
      </section>
    )
  }
}

export default connect(state => ({
  shows: state.shows,
  calendar: state.calendar,
  events: state.events,
  federation: state.federation,
}))(CalendarPage)
