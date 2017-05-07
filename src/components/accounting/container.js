import React, {Component} from 'react'
import {connect} from 'react-redux'

import Collection from './collection'

import './accounting.scss'

function amount(item) {
  return item.cost
}

function sum(current, next) {
  return current + next
}

class AccountingContainer extends Component {
  render() {
    let liveShows = this.props.liveShows.filter(event => event.cost > 0)

    if (liveShows.length === 0) {
      return null
    }

    let totalCost = liveShows.map(amount).reduce(sum)
    return (
      <Collection
        liveShows={liveShows}
        totalCost={totalCost}
        federationCash={this.props.federation.cash}
      />
    )
  }
}

export default connect(state => ({
  liveShows: state.calendar.collection,
  federation: state.federation,
}))(AccountingContainer)
