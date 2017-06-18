import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import { deleteLiveShow } from "../../actions/calendar"
import Collection from "./collection"

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
  onClickDelete = el => {
    const date = el.currentTarget.dataset.date

    this.props.dispatch(deleteLiveShow(date))
  }

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
        currency={game.currency}
        onClickDelete={this.onClickDelete}
        calendarEvents={calendarEvents}
        totalCost={totalCost}
        showDelete={game.canPlan}
        totalGross={totalGross}
        cash={game.cash}
        style={style}
      />
    )
  }
}

AccountingContainer.propTypes = {
  game: PropTypes.object,
  calendar: PropTypes.array,
}

AccountingContainer.defaultProps = {
  calendar: [],
}

export default connect(state => ({
  calendar: state.calendar,
  style: state.style,
  game: state.game,
}))(AccountingContainer)
