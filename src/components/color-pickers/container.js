import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import ColorPickers from "./color-pickers"
import { updateStyle } from "../../actions/style"

class ColorPickersContainer extends Component {
  onChangeColor = newColor => {
    const { backgroundColor, color, dispatch, } = this.props

    const newState = Object.assign(
      {},
      { backgroundColor, color, },
      {
        color: newColor,
      }
    )

    dispatch(updateStyle(newState))
  }

  onChangeBackgroundColor = newBackgroundColor => {
    const { backgroundColor, color, dispatch, } = this.props

    const newState = Object.assign(
      {},
      { backgroundColor, color, },
      {
        backgroundColor: newBackgroundColor,
      }
    )

    dispatch(updateStyle(newState))
  }

  shouldComponentUpdate() {
    return true
  }

  render() {
    const { backgroundColor, color, } = this.props
    return (
      <ColorPickers
        backgroundColor={backgroundColor}
        color={color}
        onChangeBackgroundColor={this.onChangeBackgroundColor}
        onChangeColor={this.onChangeColor}
      />
    )
  }
}

ColorPickersContainer.displayName = "ColorPickersContainer"

ColorPickersContainer.propTypes = {
  dispatch: PropTypes.func,
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
}

export default connect(state => ({
  ...state.style,
}))(ColorPickersContainer)
