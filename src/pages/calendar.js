import React, { Component } from "react"
import { connect } from "react-redux"
import moment from "moment"
import { SlideRight, SlideLeft } from "animate-components"
import PropTypes from "prop-types"

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
  CALENDAR_CONFIRM_SIMULATE
} from "../constants/confirmations"

import "./stylesheets/calendar.scss"

class CalendarPage extends Component {
  state = {
    confirmAction: true,
  }

  componentWillMount() {
    const {
      calendar,
      dispatch,
      currentMonth: month,
      currentYear: year,
    } = this.props

    if (calendar.length === 0) {
      dispatch(generateLiveShowsForMonth({ month, year, }))
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      calendar,
      dispatch,
      currentMonth: month,
      currentYear: year,
    } = nextProps

    if (calendar.length === 0) {
      dispatch(generateLiveShowsForMonth({ month, year, }))
    }
  }

  shouldComponentUpdate() {
    return true
  }

  render() {
    const { animations, date, canPlan, } = this.props
    const title = moment(date).format(MONTH_YEAR_FORMAT)

    return (
      <section className="page page-calendar">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8">
            <div className="box">
              <HeaderOne>
                {title}&nbsp;
                <a onClick={this.onClear}>
                  <div className="icon fa fa-trash-o fa-md" />
                </a>
              </HeaderOne>
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
                <Accounting />
                <Choose>
                  <When condition={canPlan}>
                    <Button
                      value="Simulate liveshows"
                      onClick={this.onSimulateMonth}
                    />
                  </When>
                  <Otherwise>
                    <Button
                      value="Next month..."
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
    const { dispatch, } = this.props

    if (confirm(CALENDAR_CONFIRM_CLEAR)) {
      dispatch(resetCalendar())
      dispatch(resetGame())
    }
  }

  onSimulateMonth = () => {
    const { dispatch, } = this.props
    const { confirmAction, } = this.state

    if (!confirmAction || confirm(CALENDAR_CONFIRM_SIMULATE)) {
      dispatch(togglePlan())
      dispatch(simulateLiveShows())
    }
  }

  onToggleConfirmations = () => {
    this.setState({
      confirmAction: !this.state.confirmAction,
    })
  }

  onStartNextMonth = () => {
    const { dispatch, calendar, } = this.props
    const { confirmAction, } = this.state

    const profit = calendar.reduce((prev, currentDate) => {
      if (currentDate.showId) {
        return prev + (currentDate.gross - currentDate.cost)
      }
      return prev
    }, 0)

    dispatch(addProfitToTotal(profit))
    dispatch(togglePlan())
    dispatch(addOneMonth())
    dispatch(resetCalendar())

    if (confirmAction) {
      this.setState({
        confirmAction: false,
      })
    }
  }
}

CalendarPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  animations: PropTypes.bool.isRequired,
  date: PropTypes.object.isRequired,
  canPlan: PropTypes.bool.isRequired,
  calendar: PropTypes.object.isRequired,
  currentMonth: PropTypes.number.isRequired,
  currentYear: PropTypes.number.isRequired,
}

CalendarPage.displayName = "CalendarPage"

export default connect(state => ({
  calendar: state.calendar,
  ...state.game,
}))(CalendarPage)
