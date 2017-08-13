import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import { toggleAnimations } from "../actions/game"

class Animation extends Component {
  handleClick = () => this.props.dispatch(toggleAnimations())

  render() {
    const animationsActive = this.props.animations ? "fa-pulse active" : ""
    return (
      <span className="cursor-pointer" onClick={this.handleClick}>
        <i className={`icon fa fa-spinner ${animationsActive}`} />{" "}
        {this.props.children}
      </span>
    )
  }
}

Animation.propTypes = {
  animations: PropTypes.bool.isrequired,
  children: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
}

export default connect(state => ({
  animations: state.game.animations,
}))(Animation)
