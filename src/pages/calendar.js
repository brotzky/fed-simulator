import React, { Component } from "react"
import { connect } from "react-redux"
import moment from "moment"

import { MONTH_YEAR_FORMAT } from "../constants/calendar"
import { generateLiveShowsForMonth, resetCalendar } from "../actions/calendar"
import {
  togglePlan,
  addOneMonth,
  resetGame,
  addProfitToTotal
} from "../actions/game"
import Calendar from "../components/calendar/container"
import Accounting from "../components/accounting/container"
import { simulateLiveShows } from "../actions/calendar"
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.calendar.length === 0) {
      const { currentMonth: month, currentYear: year, } = nextProps.game

      this.props.dispatch(generateLiveShowsForMonth({ month, year, }))
    }
  }

  onClear = () => {
    if (confirm(CONFIRM_CLEAR)) {
      this.props.dispatch(resetCalendar())
      this.props.dispatch(resetGame())
    }
  }

  onSimulateMonth = () => {
    if (confirm(CONFIRM_SIMULATE)) {
      this.props.dispatch(togglePlan())
      this.props.dispatch(simulateLiveShows())
    }
  }

  onStartNextMonth = () => {
    if (confirm(CONFIRM_START)) {
      const { calendar, } = this.props
      const profit = calendar.reduce((prev, el) => {
        return prev + (el.gross - el.cost)
      }, 0)
      this.props.dispatch(addProfitToTotal(profit))
      this.props.dispatch(togglePlan())
      this.props.dispatch(addOneMonth())
      this.props.dispatch(resetCalendar())
    }
  }

  shouldComponentUpdate() {
    return true
  }

  render() {
    const { calendar, game, } = this.props
    const title = moment(game.date).format(MONTH_YEAR_FORMAT)
    const liveShows = calendar.filter(liveShow => liveShow.cost > 0)
    const hasLiveShows = liveShows.length > 0
    return (
      <section className="page calendar">
        <h1>
          {title}&nbsp;
          <a onClick={this.onClear}>
            <div className="fa fa-trash-o fa-md" />
          </a>
        </h1>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-8 col-lg-9">
            <div className="box">
              <Calendar />
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-3">
            <div className="box">
              <Accounting />
              <br />
              <If condition={hasLiveShows}>
                <Choose>
                  <When condition={this.props.game.canPlan}>
                    <Button
                      value="Simulate liveshows"
                      onClick={this.onSimulateMonth}
                    />
                  </When>
                  <Otherwise>
                    <Button
                      value="Move onto next month"
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
