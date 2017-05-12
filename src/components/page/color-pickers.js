import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import QuickColorPicker from "../quick/color-picker"
import { updateFederation } from "../../actions/federation"

const noop = () => {}

class ColorPickers extends React.Component {
  onHandleColorChange = color => {
    const newState = Object.assign({}, this.props.federation, {
      color: color.hex,
    })

    this.props.dispatch(updateFederation(newState))
  }

  onHandleColorChange = color => {
    const newState = Object.assign({}, this.props.federation, {
      color: color.hex,
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
      <div>
        <span style={style}>{name}</span>
        <span><QuickColorPicker onChange={this.handleChange} /></span>
        <span><QuickColorPicker onChange={this.onHandleColorChange} /></span>
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
