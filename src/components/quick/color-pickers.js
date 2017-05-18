import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import QuickColorPicker from "../quick/color-picker"
import { updateFederation } from "../../actions/federation"
import invertHex from "../../helpers/invert-hex"

const noop = () => {}

import "./color-pickers.scss"

class ColorPickers extends React.Component {
  onChangeColor = color => {
    const newState = Object.assign({}, this.props.federation, {
      color,
    })

    this.props.dispatch(updateFederation(newState))
  }

  onChangeBGColor = backgroundColor => {
    const newState = Object.assign({}, this.props.federation, {
      backgroundColor,
    })

    this.props.dispatch(updateFederation(newState))
  }

  shouldComponentUpdate() {
    return true
  }

  render() {
    const { backgroundColor, color, } = this.props.federation
    const bgColorContainer = {
      border: `.1rem solid ${invertHex(backgroundColor)}`,
      backgroundColor,
    }
    const colorContainer = {
      border: `.1rem solid ${invertHex(color)}`,
      backgroundColor: color,
    }
    return (
      <div className="colorPickers">
        <QuickColorPicker
          style={bgColorContainer}
          onChange={this.onChangeBGColor}
        />
        <QuickColorPicker
          style={colorContainer}
          onChange={this.onChangeColor}
        />
      </div>
    )
  }
}

ColorPickers.displayName = "ColorPickers"

ColorPickers.propTypes = {
  onClick: PropTypes.func,
}

ColorPickers.defaultProps = {
  onClick: noop,
}

export default connect(state => ({
  federation: state.federation,
}))(ColorPickers)
