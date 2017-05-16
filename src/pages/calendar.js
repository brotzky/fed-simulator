import React, { Component } from "react"
import { connect } from "react-redux"
import moment from "moment"

import { MONTH_YEAR_FORMAT } from "../constants/calendar"
import { generateLiveShowsForMonth, resetCalendar } from "../actions/calendar"
import Calendar from "../components/calendar/container"
import Accounting from "../components/accounting/container"
import { simulateLiveShows, startNextCalendarMonth } from "../actions/calendar"
import Button from "../components/button/button"
import "./stylesheets/calendar"

const CONFIRM_CLEAR = "Are you sure you want to clear your calendar history?"
const CONFIRM_SIMULATE =
  "Are you sure you want to simulate the live shows for the month?"
const CONFIRM_START = "Are you sure you want to move onto the new month?"

class CalendarPage extends Component {
  componentWillMount() {
    if (this.props.calendar.length === 0) {
      const { currentMonth: month, currentYear: year, } = this.props.game
      this.props.dispatch(generateLiveShowsForMonth({ month, year, }))
    }
  }

  onClear = () => {
    if (confirm(CONFIRM_CLEAR)) {
      const { currentMonth: month, currentYear: year, } = this.props.game

      this.props.dispatch(resetCalendar())
      this.props.dispatch(generateLiveShowsForMonth({ month, year, }))
    }
  }

  onSimulateMonth = () => {
    if (confirm(CONFIRM_SIMULATE)) {
      this.props.dispatch(simulateLiveShows())
    }
  }

  onStartNextMonth = () => {
    if (confirm(CONFIRM_START)) {
      this.props.dispatch(startNextCalendarMonth())
    }
  }

  shouldComponentUpdate() {
    return true
  }

  render() {
    const { calendar, game, } = this.props
    const liveShows = calendar.filter(liveShow => liveShow.cost > 0)
    const title = moment(game.date).format(MONTH_YEAR_FORMAT)
    const hasLiveShows = liveShows.length > 0
    const classes = `col-xs-12 ${hasLiveShows ? "col-sm-12 col-md-8 col-lg-9" : ""}`
    return (
      <section className="page calendar">
        <h1>
          {title}&nbsp;
          <a onClick={this.onClear}>
            <div className="fa fa-trash-o fa-md" />
          </a>
        </h1>
        <div className="row">
          <div className={classes}>
            <div className="box">
              <If condition={this.props.game.canPlan}>
                <Calendar />
              </If>
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-3">
            <div className="box">
              <Accounting showDelete={!this.props.game.canPlan} />
              <br />
              <If condition={hasLiveShows}>
                <Choose>
                  <When condition={this.props.game.canPlan}>
                    <Button
                      value="Simulate Live Shows for the Month"
                      onClick={this.onSimulateMonth}
                    />
                  </When>
                  <Otherwise>
                    <Button
                      value="Start the new month"
                      onClick={this.onStartNextMonth}
                    />
                  </Otherwise>
                </Choose>
              </If>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

CalendarPage.displayName = "CalendarPage"

export default connect(state => ({
  game: state.game,
  calendar: state.calendar,
}))(CalendarPage)
