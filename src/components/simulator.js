import React from "react"
import { connect } from "react-redux"

import { simulateRandomMatch } from "../actions/roster"
import { toggleSimulation } from "../actions/game"

const TIME_PER_SIMULATED_MATCH = 200

class Simulator extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
  }

  displayName = "PageSecondary"

  state = {
    active: false,
  }

  looper = () => {}

  onToggleSimulation = () => {
    this.props.dispatch(toggleSimulation())
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
    if (nextState.active === false) {
      clearInterval(this.looper)
    } else {
      this.onSimulateMatches()
    }
  }

  componentWillUnmount() {
    clearInterval(this.looper)
  }

  render() {
    return null
    return (
      <span className="cursor-pointer" onKeyPress={this.onToggleSimulation} onClick={this.onToggleSimulation}>
        <Choose>
          <When condition={!this.state.active}>
            <i className="icon fa fa-play-circle" />
          </When>
          <Otherwise>
            <i className="icon red fa fa-stop-circle" />
          </Otherwise>
        </Choose>{" "}
        Auto Sim Matches
      </span>
    )
  }
}

export default connect()(Simulator)
