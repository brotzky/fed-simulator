import React, {Component} from 'react'
import {connect} from 'react-redux'

import Collection from './collection'

function amount(item) {
  return item.cost
}

function sum(current, next) {
  return current + next
}

class AccountingContainer extends Component {
  render() {
    let events = this.props.events.filter(event => event.cost > 0)

    if (events.length === 0) {
      return null
    }

    let totalCost = events.map(amount).reduce(sum)
    return (
      <Collection
        events={events}
        totalCost={totalCost}
        federationCash={this.props.federation.cash}
      />
    )
  }
}

export default connect(state => ({
  events: state.events,
  federation: state.federation,
}))(AccountingContainer)
