import React from "react"
import { ChromePicker } from "react-color"
import PropTypes from "prop-types"

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
  }

  render() {
    return (
      <div className="color-picker">
        <button onClick={this.handleClick}>Pick Color</button>
        {this.state.displayColorPicker
          ? <div className="popover">
              <div className="cover" onClick={this.handleClose} />
              <ChromePicker />
            </div>
          : null}
      </div>
    )
  }
}

ColorPicker.displayName = "ColorPicker"

ColorPicker.propTypes = {
  onClick: PropTypes.func,
}

ColorPicker.defaultProps = {
  onClick: noop,
}

export default ColorPicker
