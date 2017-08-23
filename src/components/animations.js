import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import { toggleAnimations } from "../actions/game"

class Animations extends Component {
  handleClick = () => this.props.dispatch(toggleAnimations())

  render() {
    const { children, animations, } = this.props
    const active = animations ? "fa-pulse active" : ""
    return (
      <span className="cursor-pointer" onClick={this.handleClick}>
        <i className={`icon fa fa-spinner ${active}`} /> {children}
      </span>
    )
  }
}

Animations.displayName = "Animations"

Animations.propTypes = {
  animations: PropTypes.bool,
  children: PropTypes.any,
  dispatch: PropTypes.func.isRequired,
}

Animations.defaultProps = {
  animations: true,
}
export default connect(state => ({
  animations: state.game.animations,
}))(Animations)
