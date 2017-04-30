import React, {Component} from 'react'
import {connect} from 'react-redux'
import groupBy from 'lodash/groupBy'
import moment from 'moment'
import {NativeTypes} from 'react-dnd-html5-backend'

import {DATE_FORMAT, DAY_FORMAT, MONTH_YEAR_FORMAT} from '../constants/calendar'
import {generateEventsForMonth} from '../actions/events'
import {getDateRange} from '../helpers/get-date-range'
import Calendar from '../components/calendar/container'
import * as itemType from '../actions/types'
import './stylesheets/calendar'

class CalendarPage extends Component {
  displayName = 'CalendarPage'

  componentWillMount() {
    this._getCalendarInformation()
  }

  componentDidMount() {
    if (this.props.events.length === 0) {
      this.props.dispatch(generateEventsForMonth())
    }
  }

  _getCalendarInformation() {
    const date = new Date(this.props.federation.currentDate)
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)
    const activeDateObj = moment(this.props.federation.currentDate)

    this.setState({
      date,
      firstDay,
      lastDay,
      dateRange: getDateRange(firstDay, lastDay),
      activeDateObj,
      activeDate: activeDateObj.format(DATE_FORMAT),
      showsGroupedBySize: groupBy(this.props.shows, show => show.size),
    })
  }

  render() {
    const dustbins = this.state.dateRange.map(date => {
      let accepts = [itemType['xs'], itemType['sm'], itemType['md'],]
      date = moment(date)
      let day = date.day()

      if (day === 0) {
        accepts = [itemType['lg'],]
      }
      return {
        name: date.format(DAY_FORMAT),
        accepts,
        lastDroppedItem: null,
      }
    })
    const boxes = this.props.shows.map(event => {
      return {
        name: `${event.name} (${event.size})`,
        type: itemType[event.size],
      }
    })
    return (
      <section className="page calendar">
        <h1>{moment(this.state.date).format(MONTH_YEAR_FORMAT)}</h1>
        <div className="row">
          <div className="col-xs-10">
            <Calendar dustbins={dustbins} boxes={boxes} />
          </div>
          <div className="col-xs-2">
            Accounting
          </div>
        </div>
      </section>
    )
  }
}

export default connect(state => ({
  shows: state.shows,
  events: state.events,
  federation: state.federation,
}))(CalendarPage)
