import React, { Component } from "react"
import { connect } from "react-redux"
import moment from "moment"
import PropTypes from "prop-types"

import HeaderOne from "../components/h1/h1"
import { generateLiveShowsForMonth, resetCalendar } from "../actions/calendar"
import { togglePlan, addOneMonth, addProfitToTotal } from "../actions/game"
import Calendar from "../components/calendar/container"
import Accounting from "../components/accounting/container"
import { simulateLiveShows } from "../actions/calendar"
import Button from "../components/button/button"

import { MONTH_YEAR_FORMAT } from "../constants/calendar"
import { CALENDAR_CONFIRM_CLEAR, CALENDAR_CONFIRM_SIMULATE } from "../constants/confirmations"

import "./stylesheets/calendar.scss"

function cost(item) {
  return item.cost
}

function sum(current, next) {
  return current + next
}

class CalendarPage extends Component {
  state = {
    confirmAction: true,
  }

  componentWillMount() {
    const { calendar, dispatch, currentMonth: month, currentYear: year, } = this.props

    if (calendar.length === 0) {
      dispatch(generateLiveShowsForMonth({ month, year, }))
    }
  }

  componentWillReceiveProps(nextProps) {
    const { calendar, dispatch, currentMonth: month, currentYear: year, } = nextProps

    if (calendar.length === 0) {
      dispatch(generateLiveShowsForMonth({ month, year, }))
    }
  }

  shouldComponentUpdate() {
    return true
  }

  render() {
    const { date, canPlan, } = this.props
    const title = moment(date).format(MONTH_YEAR_FORMAT)

    return (
      <section className="page page-calendar">
        <HeaderOne>
          {title}&nbsp;
          <i onClick={this.onClear} className="icon fa fa-trash-o fa-md" />&nbsp;
          <span className="medium-title">
            <Choose>
              <When condition={canPlan}>
                <i className="icon fa fa-unlock" /> Drag & drop shows onto dates, then simulate
              </When>
              <Otherwise>
                <i className="icon fa fa-lock" /> Month complete, bank & move onto the next month
              </Otherwise>
            </Choose>
          </span>
        </HeaderOne>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-8 col-lg-9">
            <div className="box">
              <Calendar />
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-3 sidebar">
            <div className="box">
              <Choose>
                <When condition={canPlan}>
                  <Button value="Simulate shows" onClick={this.onSimulateMonth} />
                </When>
                <Otherwise>
                  <Button value="Next month..." onClick={this.onStartNextMonth} />
                </Otherwise>
              </Choose>
              <br />
              <Accounting />
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
    const { dispatch, calendar, roster, } = this.props
    const { confirmAction, } = this.state

    let profit = calendar.reduce((prev, currentDate) => {
      if (currentDate.showId) {
        return prev + (currentDate.gross - currentDate.cost)
      }
      return prev
    }, 0)
    profit -= roster.map(cost).reduce(sum)

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
  roster: PropTypes.array.isRequired,
  canPlan: PropTypes.bool.isRequired,
  calendar: PropTypes.array.isRequired,
  currentMonth: PropTypes.number.isRequired,
  currentYear: PropTypes.number.isRequired,
}

CalendarPage.displayName = "CalendarPage"

export default connect(state => ({
  calendar: state.calendar,
  roster: state.roster,
  ...state.game,
}))(CalendarPage)
