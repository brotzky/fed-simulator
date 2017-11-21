import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { chain } from "redux-chain"

import { Icon } from "./icons"

import { generateRandomMatch, simulateRandomMatch, resetMatches } from "../actions/matches"
import { storeMatchData } from "../actions/roster"

const NOOP = () => {}

class Simulator extends Component {
  state = {
    active: false,
  }

  onToggleActive = () => {
    const active = !this.state.active

    if (active) {
      this.generateMatches()
    }

    this.setState({
      active,
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.matches.length > 0) {
      this.clearMatches(nextProps)
    }
  }

  generateMatches = () => {
    const { dispatch, roster } = this.props

    dispatch(chain(generateRandomMatch({ roster }), simulateRandomMatch()))
  }

  clearMatches = nextProps => {
    const { dispatch, matches, championships } = nextProps

    dispatch(chain(storeMatchData({ matches, championships }), resetMatches()))
  }

  render() {
    const icon = !this.state.active ? "play-circle green" : "stop-circle red"

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
