import React, {Component} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'

import {MONTH_YEAR_FORMAT} from '../constants/calendar'
import {generateLiveShowsForMonth, resetCalendar} from '../actions/calendar'
import Calendar from '../components/calendar/container'
import Accounting from '../components/accounting/container'

import './stylesheets/calendar'

class CalendarPage extends Component {
  displayName = 'CalendarPage'

  componentWillMount() {
    if (!this.props.calendar.inProgress) {
      this.props.dispatch(generateLiveShowsForMonth())
    }
  }

  onClear = () => {
    this.props.dispatch(resetCalendar())
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
            <Accounting />
          </div>
        </div>
      </section>
    )
  }
}

export default connect(state => ({
  calendar: state.calendar,
}))(CalendarPage)
