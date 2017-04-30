import React, {Component} from 'react'
import {connect} from 'react-redux'

import Collection from './collection'

class AccountingContainer extends Component {
  render() {
    return <Collection collection={this.props.events} />
  }
}

export default connect(state => ({
  events: state.events,
}))(AccountingContainer)
