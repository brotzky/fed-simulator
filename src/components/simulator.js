import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import { Icon } from "./icons"

import { simulateRandomMatches } from "../actions/matches"
import { SIMULATE_MATCHES_AMOUNT, SIMULATE_MATCHES_PERIOD } from "../constants/game"

const NOOP = () => {}

class Simulator extends Component {
  state = {
    active: false,
    counter: 0,
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
    this.setState({ counter: this.state.counter + SIMULATE_MATCHES_AMOUNT, })
    this.props.dispatch(simulateRandomMatches())
  }

  startInterval = () => {
    this._interval = setInterval(this.startSimulations, SIMULATE_MATCHES_PERIOD)
  }

  clearInterval = () => {
    this.setState({
      counter: 0,
    })
    clearInterval(this._interval)
  }

  componentWillUnmount() {
    this.clearInterval()
  }

  render() {
    const color = !this.state.active ? "white" : "gold"
    const icon = !this.state.active ? "play-circle" : "stop-circle"
    const title = !this.state.active ? "Start simulations" : "Stop simulating"
    return (
      <span className={color} onClick={this.onToggleActive}>
        <Icon icon={icon} /> {title}
        <If condition={this.state.active}>&nbsp;({this.state.counter.toLocaleString("en")})</If>
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
