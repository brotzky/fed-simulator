import React, {Component} from 'react'
import {connect} from 'react-redux'
import groupBy from 'lodash/groupBy'
import moment from 'moment'

import {DATE_FORMAT, DAY_FORMAT, MONTH_YEAR_FORMAT} from '../constants/calendar'
import {generateEventsForMonth, resetEvents} from '../actions/events'
import {resetCalendar} from '../actions/calendar'
import Calendar from '../components/calendar/container'
import Accounting from '../components/accounting/container'

import './stylesheets/calendar'

class CalendarPage extends Component {
  displayName = 'CalendarPage'

  componentWillMount() {
    if (!this.props.events.inProgress) {
      this.props.dispatch(generateEventsForMonth())
    }
  }

  onClear = () => {
    this.props.dispatch(resetCalendar())
    this.props.dispatch(resetEvents())
  }

  render() {
    return (
      <section className="page calendar">
        <div className="row">
          <div className="col-xs-10">
            <h1>
              {moment(this.props.events.firstDay).format(
                MONTH_YEAR_FORMAT
              )}&nbsp;
              <a onClick={this.onClear}>
                <div className="fa fa-trash-o fa-md" />
              </a>
            </h1>
            <Calendar
              dustbins={this.props.events.dustbins}
              boxes={this.props.events.boxes}
              calendar={{...this.props.events,}}
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
  events: state.events,
  federation: state.federation,
}))(CalendarPage)
