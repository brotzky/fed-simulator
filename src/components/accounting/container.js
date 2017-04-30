import React, {Component} from 'react'
import {connect} from 'react-redux'
import Collection from './collection'

class AccountingContainer extends Component {
  render() {
    const events = this.props.events.filter(event => event.cost > 0)
    return <Collection events={events} />
  }
}

export default connect(state => ({
  events: state.events,
}))(AccountingContainer)
