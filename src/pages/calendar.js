import React, {Component} from 'react'
import {connect} from 'react-redux'
import './stylesheets/calendar'
import moment from 'moment'
import {getDateRange} from '../helpers/get-date-range'
import {YEAR_FORMAT, DATE_FORMAT} from '../constants/calendar'

class CalendarPage extends Component {
  displayName = 'CalendarPage'

  render() {
    const date = new Date(this.props.federation.currentDate)
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0)
    const dateRange = getDateRange(firstDay, lastDay)
    const activeDate = moment(this.props.federation.currentDate).format(
      DATE_FORMAT
    )
    return (
      <section className="page calendar">
        <h1>Calendar</h1>
        <h3>
          Current date:
          {' '}
          {moment(this.props.federation.currentDate).format(YEAR_FORMAT)}
        </h3>
        <div className="row">
          {dateRange.map((date, key) => {
            const currentDate = moment(date).format(DATE_FORMAT)
            const isActive = currentDate === activeDate ? 'active' : 'inactive'
            return (
              <div key={key} className={`box show ${isActive}`}>
                <h3>
                  {currentDate}
                </h3>
              </div>
            )
          })}
        </div>
      </section>
    )
  }
}

export default connect(state => ({
  shows: state.shows,
  federation: state.federation,
}))(CalendarPage)
