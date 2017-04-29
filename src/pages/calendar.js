import React, {Component} from 'react'
import {connect} from 'react-redux'
import './stylesheets/calendar'
import {getDateRange} from '../helpers/get-date-range'
import moment from 'moment'

import {YEAR_FORMAT, DATE_FORMAT} from '../constants/calendar'

class CalendarPage extends Component {
  displayName = 'CalendarPage'

  render() {
    return (
      <section className="page calendar">
        <h1>Calendar</h1>
        <h3>
          Current date:
          {' '}
          {moment().format(YEAR_FORMAT)}
        </h3>
      </section>
    )
  }
}

export default connect(state => ({
  shows: state.shows,
  federation: state.federation,
}))(CalendarPage)
