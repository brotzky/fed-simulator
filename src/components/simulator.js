import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import { Icon } from "./icons"

import { simulateRandomMatches } from "../actions/matches"

const NOOP = () => {}
const INTERVAL_AMOUNT = 800

class Simulator extends Component {
  state = {
    active: false,
  }

  onToggleActive = () => {
    const active = !this.state.active

    this.setState({
      active,
    })

    if (active) {
      this.startInterval()
    } else {
      this.clearInterval()
    }
  }

  startSimulations = () => {
    this.props.dispatch(simulateRandomMatches())
  }

  startInterval = () => {
    this._interval = setInterval(this.startSimulations, INTERVAL_AMOUNT)
  }

  clearInterval = () => {
    clearInterval(this._interval)
  }

  componentWillUnmount() {
    this.clearInterval()
  }

  render() {
    const color = !this.state.active ? "white" : "red"
    const icon = !this.state.active ? "play-circle" : "stop-circle"
    const title = !this.state.active ? "Start simulations" : "Stop simulating"
    return (
      <span className={color}>
        <Icon icon={icon} onClick={this.onToggleActive} />
        {title}
      </span>
    )
  }
}

Simulator.displayName = "PageSecondary"

Simulator.propTypes = {
  dispatch: PropTypes.func,
}

Simulator.defaultProps = {
  dispatch: NOOP,
}

export default connect(null)(Simulator)
