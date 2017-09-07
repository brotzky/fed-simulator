import React from "react"
import { connect } from "react-redux"
const Idle = require("react-idle").default

import { simulateRandomMatch } from "../actions/roster"

const TIME_PER_SIMULATED_MATCH = 100
const NOOP = () => {}

class Simulator extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
  }

  displayName = "PageSecondary"

  state = {
    active: false,
    idle: false,
  }

  looper = () => {}

  onToggleSimulation = () => {
    this.setState({
      active: !this.state.active,
    })
  }

  onSimulateMatches = () => {
    this.looper = setInterval(() => {
      this.props.dispatch(simulateRandomMatch())
    }, TIME_PER_SIMULATED_MATCH)
  }

  componentWillUpdate(nextProps, nextState) {
    const { active, } = nextState

    if (!active) {
      clearInterval(this.looper)
    } else {
      this.onSimulateMatches()
    }
  }

  componentWillUnmount() {
    clearInterval(this.looper)
  }

  render() {
    return (
      <span className="cursor-pointer">
        <Idle
          onChange={({ idle, }) =>
            this.setState({
              active: idle,
            })}
        />
        <If condition={!this.state.active}>
          <i className="icon red fa fa-stop-circle" />
          {"  "}
          Simulating...
        </If>
      </span>
    )
  }
}

export default connect()(Simulator)
