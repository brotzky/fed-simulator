import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import QuickColorPicker from "../quick/color-picker"
import { updateFederation } from "../../actions/federation"

const noop = () => {}

import "./color-pickers.scss"

class ColorPickers extends React.Component {
  onHandleColorChange = color => {
    console.log("onHandleColorChange")
    const newState = Object.assign({}, this.props.federation, {
      color: color.hex,
    })

    this.props.dispatch(updateFederation(newState))
  }

  handleBackgroundColorChange = color => {
    console.log("handleBackgroundColorChange")
    const newState = Object.assign({}, this.props.federation, {
      backgroundColor: color.hex,
    })

    this.props.dispatch(updateFederation(newState))
  }

  render() {
    const { backgroundColor, color, name, } = this.props.federation
    const style = {
      backgroundColor,
      color,
    }
    return (
      <div className="color-picker" style={style}>
        <span>
          {name}
        </span>
        <span style={style}>
          <QuickColorPicker
            style={style}
            onChange={this.handleBackgroundColorChange}
          />
        </span>
        <span style={style}>
          <QuickColorPicker style={style} onChange={this.onHandleColorChange} />
        </span>
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
