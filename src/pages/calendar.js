import React, { Component } from "react"
import { connect } from "react-redux"
import moment from "moment"
import { SlideRight, SlideLeft } from "animate-components"
import HeaderOne from "../components/h1/h1"

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

import { ANIMATION_SPEED } from "../constants/animation"
import { MONTH_YEAR_FORMAT } from "../constants/calendar"
import {
  CALENDAR_CONFIRM_CLEAR,
  CALENDAR_CONFIRM_SIMULATE,
  CALENDAR_CONFIRM_START
} from "../constants/confirmations"

import "./stylesheets/calendar.scss"

class CalendarPage extends Component {
  state = {
    confirmAction: true,
  }

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

  shouldComponentUpdate() {
    return true
  }

  render() {
    const { game, } = this.props
    const animations = game.animations
    const title = moment(game.date).format(MONTH_YEAR_FORMAT)

    return (
      <section className="page page-calendar">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8">
            <div className="box">
              <SlideLeft
                iterations={Number(animations)}
                duration={ANIMATION_SPEED}
              >
                <Calendar />
              </SlideLeft>
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 sidebar">
            <div className="box">
              <SlideRight
                iterations={Number(animations)}
                duration={ANIMATION_SPEED}
              >
                <HeaderOne>
                  {title}&nbsp;
                  <a onClick={this.onClear}>
                    <div className="icon fa fa-trash-o fa-md" />
                  </a>
                </HeaderOne>
                <Accounting />
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
              </SlideRight>
            </div>
          </div>
        </div>
      </section>
    )
  }

  onClear = () => {
    if (confirm(CALENDAR_CONFIRM_CLEAR)) {
      this.props.dispatch(resetCalendar())
      this.props.dispatch(resetGame())
    }
  }

  onSimulateMonth = () => {
    const { confirmAction, } = this.state

    if (!confirmAction || confirm(CALENDAR_CONFIRM_SIMULATE)) {
      this.props.dispatch(togglePlan())
      this.props.dispatch(simulateLiveShows())
    }
  }

  onToggleConfirmations = () => {
    this.setState({
      confirmAction: !this.state.confirmAction,
    })
  }

  onStartNextMonth = () => {
    const { confirmAction, } = this.state

    if (!confirmAction || confirm(CALENDAR_CONFIRM_START)) {
      const { calendar, } = this.props
      const profit = calendar.reduce((prev, currentDate) => {

      if (currentDate.showId) {
        return prev + (currentDate.gross - currentDate.cost)
      }
        return prev
      }, 0)

      this.props.dispatch(addProfitToTotal(profit))
      this.props.dispatch(togglePlan())
      this.props.dispatch(addOneMonth())
      this.props.dispatch(resetCalendar())

      if (confirmAction) {
        this.setState({
          confirmAction: false,
        })
      }
    }
  }
}

CalendarPage.displayName = "CalendarPage"

export default connect(state => ({
  game: state.game,
  calendar: state.calendar,
}))(CalendarPage)
