import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import { toggleDarkMode } from "../actions/game"

class DarkMode extends Component {
  handleClick = () => this.props.dispatch(toggleDarkMode())

  render() {
    const active = this.props.darkMode ? "toggle-on" : "toggle-off"
    return (
      <span className="cursor-pointer" onClick={this.handleClick}>
        <i className={`icon fa fa-${active}`} /> {this.props.children}
      </span>
    )
  }
}

DarkMode.propTypes = {
  animations: PropTypes.bool.isrequired,
  children: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
}

export default connect(state => ({
  darkMode: state.game.darkMode,
}))(DarkMode)
