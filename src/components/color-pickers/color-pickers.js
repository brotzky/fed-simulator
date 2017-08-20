import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import ColorPicker from "../color-pickers/color-picker"
import { updateStyle } from "../../actions/style"
import chromatism from "chromatism"

const noop = () => {}

import "./color-pickers.scss"

class ColorPickers extends Component {
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

  onChangeBGColor = newBackgroundColor => {
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
    const colorContainer = {
      backgroundColor: color,
    }
    const bgColorContainer = {
      backgroundColor,
    }
    return (
      <div className="row around-xs cursor-pointer colorPickers">
        <div className="col-xs-6 col" style={bgColorContainer}>
          <ColorPicker onChange={this.onChangeBGColor} />
        </div>
        <div className="col-xs-6 col" style={colorContainer}>
          <ColorPicker onChange={this.onChangeColor} />
        </div>
      </div>
    )
  }
}

ColorPickers.displayName = "ColorPickers"

ColorPickers.propTypes = {
  onClick: PropTypes.func,
  dispatch: PropTypes.func,
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
}

ColorPickers.defaultProps = {
  onClick: noop,
}

export default connect(state => ({
  ...state.style,
}))(ColorPickers)
