import React, {Component} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'

import {MONTH_YEAR_FORMAT} from '../constants/calendar'
import {generateLiveShowsForMonth, resetCalendar} from '../actions/calendar'
import Calendar from '../components/calendar/container'
import Accounting from '../components/accounting/container'
import {simulateLiveShows, startNextCalendarMonth} from '../actions/calendar'
import Button from '../components/button/button'
import './stylesheets/calendar'

const CONFIRM_SIMULATE =
  'Are you sure you want to simulate the live shows for the month?'
const CONFIRM_START = 'Are you sure you want to move onto the new month?'

class CalendarPage extends Component {
  displayName = 'CalendarPage'

  componentWillMount() {
    if (!this.props.calendar.inProgress) {
      this.props.dispatch(generateLiveShowsForMonth())
    }
  }

  onClear = () => {
    this.props.dispatch(resetCalendar())
    this.props.dispatch(generateLiveShowsForMonth())
  }

  onSimulateMonth = () => {
    confirm(CONFIRM_SIMULATE, this.props.dispatch(simulateLiveShows()))
  }

  onStartNextMonth = () => {
    confirm(CONFIRM_START, this.props.dispatch(startNextCalendarMonth()))
  }

  shouldComponentUpdate() {
    return true
  }

  render() {
    const title = moment(this.props.calendar.firstDay).format(MONTH_YEAR_FORMAT)
    return (
      <section className="page calendar">
        <div className="row">
          <div className="col-xs-12 col-md-8 col-lg-10">
            <h1>
              {title}&nbsp;
              <a onClick={this.onClear}>
                <div className="fa fa-trash-o fa-md" />
              </a>
            </h1>
            <If condition={this.props.calendar.inProgress}>
              <Calendar />
            </If>
          </div>
          <div className="col-xs-12 col-md-4 col-lg-2">
            <div>
              <Accounting
                isComplete={this.props.calendar.isComplete}
                showDelete={!this.props.calendar.isComplete}
              />
              <If
                condition={
                  this.props.calendar.collection.filter(
                    show => show.showId !== false
                  ).length > 0
                }
              >
                <br />
                <If condition={!this.props.calendar.isComplete}>
                  <Button
                    value="Simulate Live Shows for the Month"
                    onClick={this.onSimulateMonth}
                  />
                </If>
                <If condition={this.props.calendar.isComplete}>
                  <Button
                    value="Start the new month"
                    onClick={this.onStartNextMonth}
                  />
                </If>
              </If>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default connect(state => ({
  calendar: state.calendar,
}))(CalendarPage)
