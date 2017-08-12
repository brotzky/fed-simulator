import React from "react"
import { connect } from "react-redux"

import { simulateRandomMatch } from "../../actions/roster"

const TIME_PER_SIMULATED_MATCH = 100

class PageSecondary extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
  }

  displayName = "PageSecondary"

  state = {
    active: false,
  }

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
    if (nextState.active === false) {
      clearInterval(this.looper)
    } else {
      this.onSimulateMatches()
    }
  }

  render() {
    return (
      <span className="cursor-pointer" onClick={this.onToggleSimulation}>
        {this.state.active ? "Stop Simulating" : "Simulate"} Matches
      </span>
    )
  }
}

export default connect()(PageSecondary)
