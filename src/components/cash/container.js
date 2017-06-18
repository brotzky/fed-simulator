import React, { Component } from "react"
import { connect } from "react-redux"

import Cash from "./cash"

class CashContainer extends Component {
  render() {
    const { cash, currency, } = this.props.game

    return <Cash currency={currency} cash={cash} />
  }
}

export default connect(state => ({
  game: state.game,
}))(CashContainer)
