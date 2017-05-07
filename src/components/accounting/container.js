import React, {Component} from 'react'
import {connect} from 'react-redux'

import {deleteLiveShow} from '../../actions/calendar'
import Collection from './collection'

import './accounting.scss'

function amount(item) {
  return item.cost
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
    let liveShows = this.props.liveShows.filter(liveShow => liveShow.cost > 0)

    if (liveShows.length === 0) {
      return null
    }

    let totalCost = liveShows.map(amount).reduce(sum)
    return (
      <Collection
        onClickDelete={this.onClickDelete}
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
