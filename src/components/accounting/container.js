import React, { Component } from "react"
import { connect } from "react-redux"

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
    let calendarEvents = this.props.calendar.filter(
      calendarEvent => calendarEvent.cost > 0
    )

    if (calendarEvents.length === 0) {
      return null
    }

    let totalCost = calendarEvents.map(cost).reduce(sum)
    let totalGross = calendarEvents.map(gross).reduce(sum)
    return (
      <Collection
        onClickDelete={this.onClickDelete}
        calendarEvents={calendarEvents}
        totalCost={totalCost}
        showDelete={this.props.showDelete}
        totalGross={totalGross}
        cash={this.props.game.cash}
      />
    )
  }
}

export default connect(state => ({
  calendar: state.calendar,
  federation: state.federation,
  game: state.game,
}))(AccountingContainer)
