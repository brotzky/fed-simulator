import React from "react"
import { ChromePicker } from "react-color"
import PropTypes from "prop-types"

import "./color-picker.scss"

const noop = () => {}

class ColorPicker extends React.Component {
  state = {
    displayColorPicker: false,
  }

  handleClick = () => {
    this.setState({
      displayColorPicker: !this.state.displayColorPicker,
    })
  }

  handleClose = () => {
    this.setState({
      displayColorPicker: false,
    })
    this.props.onHandleChange()
  }

  render() {
    return (
      <div className="color-picker">
        <button onClick={this.handleClick}>something</button>
        {this.state.displayColorPicker
          ? <div className="popover">
              <div className="cover" onClick={this.handleClose} />
              <ChromePicker onChange={this.onHandleChange} />
            </div>
          : null}
      </div>
    )
  }
}

ColorPicker.displayName = "ColorPicker"

ColorPicker.propTypes = {
  onClick: PropTypes.func,
  onHandleChange: PropTypes.func,
}

ColorPicker.defaultProps = {
  onClick: noop,
  onHandleChange: noop,
}

export default ColorPicker
