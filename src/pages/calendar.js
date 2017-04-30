import {connect} from 'react-redux'
import groupBy from 'lodash/groupBy'
import moment from 'moment'
import React, {Component} from 'react'

import {DATE_FORMAT} from '../constants/calendar'
import {generateEventsForMonth} from '../actions/events'
import {getDateRange} from '../helpers/get-date-range'
import Show from '../components/show/show'

import './stylesheets/calendar'

class CalendarPage extends Component {
  displayName = 'CalendarPage'

  componentWillMount() {
    this._getCalendarInformation()
  }

  componentDidMount() {
    if (this.props.events.length === 0) {
      this.props.dispatch(
        generateEventsForMonth({
          ...this.state,
        })
      )
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
    return (
      <section className="page calendar">
        <h1>{this.state.activeDateObj.format('MMMM YYYY')}</h1>
        {this.props.shows.map(show => {
          return <div>{show.name} ({show.size})</div>
        })}
        <div className="row">
          {this.state.dateRange.map((date, key) => {
            const currentDate = moment(date).format('Do')
            const isActive = currentDate === this.state.activeDate
              ? 'active'
              : 'inactive'
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
  events: state.events,
  federation: state.federation,
}))(CalendarPage)
