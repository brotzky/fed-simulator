import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import { Icon } from "./icons"

import { generateRandomMatch, simulateRandomMatch, resetMatches } from "../actions/matches"
import { storeMatchData } from "../actions/roster"

const NOOP = () => {}

class Simulator extends Component {
  state = {
    active: false,
    stage: 0,
  }

  onToggleActive = () => {
    const active = !this.state.active
    let stage = 0

    if (active) {
      this.props.dispatch(generateRandomMatch({ roster: this.props.roster }))
      stage = 1
    }

    this.setState({
      active,
      stage,
    })
  }

  componentDidUpdate(nextProps, nextState) {
    if (nextState.active) {
      switch (nextState.stage) {
        // stage 1: simulate random matches
        case 1:
          nextProps.dispatch(simulateRandomMatch())
          break
        // stage 2: store match data
        case 2:
          nextProps.dispatch(storeMatchData(
            championships: nextProps.championships,
            matches: nextProps.matches,
          ))
          break
        // stage 3: clear simulated matches
        case 3:
          nextProps.dispatch(resetMatches())
          break
      }

      const stage = nextState.stage + 1

      this.setState({
        stage,
      })
    }
  }

  render() {
    return null;
    const icon = !this.state.active ? "play-circle" : "stop-circle red"

    return (
      <span>
        <Icon icon={icon} onClick={this.onToggleActive} /> Auto Sim Matches
      </span>
    )
  }
}

Simulator.displayName = "PageSecondary"

Simulator.propTypes = {
  dispatch: PropTypes.func,
  roster: PropTypes.array,
  matches: PropTypes.array,
  championships: PropTypes.array,
}

Simulator.defaultProps = {
  dispatch: NOOP,
  roster: [],
  matches: [],
  championships: [],
}

export default connect(state => ({
  roster: state.roster,
  championships: state.championships,
  matches: state.matches,
}))(Simulator)
