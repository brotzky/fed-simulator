import React, {Component} from 'react'
import {connect} from 'react-redux'
import './stylesheets/calendar'
import moment from 'moment'
import {generateArrayOfLength} from '../helpers/generate'
import {YEAR_FORMAT} from '../constants/calendar'

class CalendarPage extends Component {
  displayName = 'CalendarPage'

  render() {
    return (
      <section className="page calendar">
        <h1>Calendar</h1>
        <h3>
          Current date: {moment().format(YEAR_FORMAT)}
        </h3>
        <div className="row">
          {generateArrayOfLength(6).map((name, key) => {
            return (
              <div className="col-xs-2">
                <div
                  className={`box show ${key === 0 ? 'active' : 'inactive'}`}
                >
                  <h3>TV</h3>
                </div>
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
