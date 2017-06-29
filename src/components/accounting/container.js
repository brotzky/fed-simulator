import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import { deleteLiveShow, clearLiveShows } from "../../actions/calendar"
import Collection from "./index"

import "./accounting.scss"

function cost(item) {
  return item.cost
}

function gross(item) {
  return item.gross
}

function sum(current, next) {
  return current + next
}

class AccountingContainer extends Component {
  render() {
    const { game, style, } = this.props
    const calendarEvents = this.props.calendar.filter(
      calendarEvent => calendarEvent.cost > 0
    )
    const hasEvents = calendarEvents.length > 0

    const totalCost = hasEvents ? calendarEvents.map(cost).reduce(sum) : ""
    const totalGross = hasEvents ? calendarEvents.map(gross).reduce(sum) : ""

    return (
      <Collection
        calendarEvents={calendarEvents}
        cash={game.cash}
        currency={game.currency}
        onClearLiveShows={this.onClearLiveShows}
        onClickDelete={this.onClickDelete}
        showDelete={game.canPlan}
        style={style}
        totalCost={totalCost}
        totalGross={totalGross}
      />
    )
  }

  onClickDelete = el => {
    const date = el.currentTarget.dataset.date

    this.props.dispatch(deleteLiveShow(date))
  }

  onClearLiveShows = () => {
    this.props.dispatch(clearLiveShows())
  }
}

AccountingContainer.propTypes = {
  calendar: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
  game: PropTypes.object,
  style: PropTypes.object.isRequired,
}

AccountingContainer.defaultProps = {
  calendar: [],
}

export default connect(state => ({
  calendar: state.calendar,
  game: state.game,
  style: state.style,
}))(AccountingContainer)
