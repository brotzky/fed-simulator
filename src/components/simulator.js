import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import { Icon } from "./icons"

import { generateRandomMatch, simulateRandomMatch } from "../actions/matches"

const NOOP = () => {}

class Simulator extends React.Component {
  state = { active: false, }

  _intervalId = null

  onToggleActive = () => {
    const { dispatch, roster, } = this.props
    const active = !this.state.active

    this.setState({
      active,
    })

    if (active) {
      this._intervalId = setInterval(() => {
        dispatch(generateRandomMatch({ roster, }))
        dispatch(simulateRandomMatch())
      }, 2000)
    } else {
      clearInterval(this._intervalId)
    }
  }

  componentWillUnmount() {
    clearInterval(this._intervalId)
  }

  render() {
    return null
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
  setInterval: PropTypes.func,
  dispatch: PropTypes.func,
  roster: PropTypes.array,
  clearIntervals: PropTypes.func,
}

Simulator.defaultProps = {
  setInterval: NOOP,
  dispatch: NOOP,
  roster: [],
  clearIntervals: NOOP,
}

export default connect(state => ({
  roster: state.roster,
}))(Simulator)
